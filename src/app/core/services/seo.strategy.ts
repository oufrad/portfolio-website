import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy
} from '@angular/router';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL
} from '../site.config';

/**
 * Sets the document title plus description, canonical and Open Graph tags from
 * each route's `title` and `data`. Runs during prerendering, so every static
 * page ships its own metadata rather than the single shared title the app
 * previously emitted on all six routes.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const route = this.deepestRoute(snapshot.root);
    const data = route?.data ?? {};

    const pageTitle = this.buildTitle(snapshot);
    const fullTitle = pageTitle ? `${pageTitle} — ${SITE_NAME}` : DEFAULT_TITLE;
    const description = (data['description'] as string) ?? DEFAULT_DESCRIPTION;
    const image = SITE_URL + ((data['ogImage'] as string) ?? DEFAULT_OG_IMAGE);
    const url = SITE_URL + this.normalisePath(snapshot.url);

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  private deepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }

  /** Strips query/fragment and guarantees a single trailing-slash-free path. */
  private normalisePath(url: string): string {
    const path = url.split(/[?#]/)[0];
    if (path === '/' || path === '') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
