import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly isDark = signal(false);

  constructor() {
    this.init();
  }

  private init(): void {
    if (!this.isBrowser) return;

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored === 'dark' || (stored === null && prefersDark);
    this.apply(dark);
  }

  toggle(): void {
    this.apply(!this.isDark());
  }

  private apply(dark: boolean): void {
    this.isDark.set(dark);
    this.document.documentElement.classList.toggle('dark', dark);
    if (this.isBrowser) {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
  }
}
