import { ApplicationConfig } from '@angular/core';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/services/seo.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: TitleStrategy, useClass: SeoTitleStrategy }
  ]
};
