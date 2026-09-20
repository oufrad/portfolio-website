import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject,
  viewChild
} from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

/** Tunables. Everything visual is driven from here. */
const CONFIG = {
  maxPixelRatio: 2,
  cellWidth: 14,
  cellHeight: 18,
  fontSize: 12,
  /** ~20fps. The field drifts slowly; a higher rate buys nothing. */
  frameInterval: 50,
  timeScale: 0.00018,
  field: {
    xFrequency: 11,
    yFrequency: 2.4,
    speed: 1,
    verticalFrequency: 15,
    verticalAmplitude: 0.62,
    verticalSpeed: -0.7,
    diagonalFrequency: 24,
    diagonalAmplitude: 0.28,
    diagonalSpeed: 0.45,
    warpScale: 4,
    warpStrength: 0.4,
    warpDetailScale: 2.8,
    warpDetailStrength: 0.16,
    warpSpeed: 0.12,
    contourFrequency: 2.6,
    threshold: 0.86,
    thresholdVariation: 0.1,
    visibilityRange: 0.06
  },
  pointer: { easing: 0.12, radius: 0.3, strength: 0.6 },
  edgeFade: { x: 0.04, y: 0.05 }
} as const;

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

/** Deterministic per-cell pseudo-random in [0,1). */
function hash(column: number, row: number): number {
  const value = Math.sin(column * 12.9898 + row * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function valueNoise(x: number, y: number): number {
  const column = Math.floor(x);
  const row = Math.floor(y);
  const fx = smoothstep(x - column);
  const fy = smoothstep(y - row);
  const top = hash(column, row) * (1 - fx) + hash(column + 1, row) * fx;
  const bottom = hash(column, row + 1) * (1 - fx) + hash(column + 1, row + 1) * fx;
  return top * (1 - fy) + bottom * fy;
}

/**
 * A drifting field of ASCII glyphs tracing contour lines through layered sine
 * waves and value noise, with a local bulge that follows the pointer.
 *
 * Renders nothing on the server, never starts its loop under reduced motion,
 * and takes its colour from CSS custom properties so it follows the theme.
 */
@Component({
  selector: 'app-ascii-field',
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styleUrl: './ascii-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsciiFieldComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly theme = inject(ThemeService);

  private context: CanvasRenderingContext2D | null = null;
  private frameHandle = 0;
  private lastFrame = 0;
  private width = 0;
  private height = 0;
  private columns = 0;
  private rows = 0;

  private readonly pointer = { x: 0.5, y: 0.45 };
  private readonly pointerTarget = { x: 0.5, y: 0.45 };

  private colour = { hue: 30, saturation: 12, lightness: 45, alpha: 0.3 };

  private resizeObserver?: ResizeObserver;
  private motionQuery?: MediaQueryList;
  private reducedMotion = false;

  constructor() {
    // Re-read the palette whenever the theme flips and repaint immediately.
    effect(() => {
      this.theme.isDark();
      if (!this.context) return;
      this.readColour();
      this.draw(performance.now());
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const canvas = this.canvasRef().nativeElement;
    this.context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!this.context) return;

    this.readColour();

    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion = this.motionQuery.matches;
    this.motionQuery.addEventListener('change', this.onMotionChange);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.host.nativeElement);
    this.resize();

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });

    this.start();
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    this.stop();
    this.resizeObserver?.disconnect();
    this.motionQuery?.removeEventListener('change', this.onMotionChange);
    window.removeEventListener('pointermove', this.onPointerMove);
  }

  private readonly onMotionChange = (event: MediaQueryListEvent): void => {
    this.reducedMotion = event.matches;
    this.stop();
    this.start();
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.pointerTarget.x = event.clientX / window.innerWidth;
    this.pointerTarget.y = event.clientY / window.innerHeight;
  };

  private start(): void {
    if (this.reducedMotion) {
      // One static frame, no loop.
      this.pointer.x = this.pointerTarget.x;
      this.pointer.y = this.pointerTarget.y;
      this.draw(0);
      return;
    }
    this.zone.runOutsideAngular(() => {
      const loop = (now: number) => {
        this.frameHandle = requestAnimationFrame(loop);
        if (now - this.lastFrame < CONFIG.frameInterval) return;
        this.lastFrame = now;
        this.pointer.x += (this.pointerTarget.x - this.pointer.x) * CONFIG.pointer.easing;
        this.pointer.y += (this.pointerTarget.y - this.pointer.y) * CONFIG.pointer.easing;
        this.draw(now);
      };
      this.frameHandle = requestAnimationFrame(loop);
    });
  }

  private stop(): void {
    if (this.frameHandle) cancelAnimationFrame(this.frameHandle);
    this.frameHandle = 0;
  }

  /** Pulls --ascii-* tokens so the field tracks the active theme. */
  private readColour(): void {
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: number): number => {
      const raw = styles.getPropertyValue(name).trim().replace('%', '');
      const value = Number.parseFloat(raw);
      return Number.isFinite(value) ? value : fallback;
    };
    this.colour = {
      hue: read('--ascii-hue', 30),
      saturation: read('--ascii-sat', 12),
      lightness: read('--ascii-lightness', 45),
      alpha: read('--ascii-alpha', 0.3)
    };
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const rect = this.host.nativeElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const ratio = Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio);
    this.width = rect.width;
    this.height = rect.height;
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);

    this.columns = Math.ceil(rect.width / CONFIG.cellWidth);
    this.rows = Math.ceil(rect.height / CONFIG.cellHeight);

    const context = this.context;
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    this.draw(performance.now());
  }

  private draw(now: number): void {
    const context = this.context;
    if (!context || this.width === 0) return;

    const f = CONFIG.field;
    const time = now * CONFIG.timeScale;
    const aspect = this.width / this.height;
    const { hue, saturation, lightness, alpha: baseAlpha } = this.colour;

    context.clearRect(0, 0, this.width, this.height);
    context.font = `${CONFIG.fontSize}px "IBM Plex Mono", ui-monospace, monospace`;

    for (let row = 0; row <= this.rows; row++) {
      const py = row * CONFIG.cellHeight + CONFIG.cellHeight / 2;
      const ny = py / this.height;

      const fadeY =
        Math.min(1, ny / CONFIG.edgeFade.y) * Math.min(1, (1 - ny) / CONFIG.edgeFade.y);
      if (fadeY <= 0) continue;

      for (let column = 0; column <= this.columns; column++) {
        const px = column * CONFIG.cellWidth + CONFIG.cellWidth / 2;
        const nx = px / this.width;

        const fadeX =
          Math.min(1, nx / CONFIG.edgeFade.x) * Math.min(1, (1 - nx) / CONFIG.edgeFade.x);
        if (fadeX <= 0) continue;

        // Two octaves of drifting warp keep the contours from looking regular.
        const warp =
          (valueNoise(nx * f.warpScale + time * f.warpSpeed, ny * f.warpScale) - 0.5) *
            f.warpStrength +
          (valueNoise(nx * f.warpDetailScale, ny * f.warpDetailScale - time * f.warpSpeed) -
            0.5) *
            f.warpDetailStrength;

        // Local bulge around the pointer.
        const dx = (nx - this.pointer.x) * aspect;
        const dy = ny - this.pointer.y;
        const influence = clamp01(1 - Math.sqrt(dx * dx + dy * dy) / CONFIG.pointer.radius);
        const bulge = influence * influence * CONFIG.pointer.strength;

        const signal =
          Math.sin(nx * f.xFrequency + time * f.speed + ny * f.yFrequency) +
          f.verticalAmplitude * Math.sin(ny * f.verticalFrequency + time * f.verticalSpeed) +
          f.diagonalAmplitude *
            Math.sin((nx - ny) * f.diagonalFrequency + time * f.diagonalSpeed) +
          warp +
          bulge;

        const contour = Math.abs(Math.sin(signal * f.contourFrequency));
        const random = hash(column, row);
        const threshold = f.threshold - f.thresholdVariation * random;
        const visibility = clamp01((contour - threshold) / f.visibilityRange);
        if (visibility < 0.01) continue;

        const alpha = visibility * fadeX * fadeY * baseAlpha;
        if (alpha < 0.01) continue;

        context.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        context.fillText(random > 0.9 ? '+' : random > 0.62 ? ':' : '.', px, py);
      }
    }
  }
}
