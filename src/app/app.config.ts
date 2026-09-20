import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/services/seo.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    // v21 stopped wiring the zone.js scheduler implicitly; this keeps the app
    // zone-based rather than silently losing change detection.
    provideZoneChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: TitleStrategy, useClass: SeoTitleStrategy }
  ]
};
