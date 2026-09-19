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

    // The inline script in index.html has already applied the class before
    // first paint. Read back from the DOM rather than re-deriving it, so the
    // two can never disagree.
    this.isDark.set(this.document.documentElement.classList.contains('dark'));
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
