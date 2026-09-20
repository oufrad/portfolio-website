/**
 * Absolute origin of the deployed site.
 *
 * Open Graph and canonical URLs must be absolute, and this site is prerendered,
 * so the origin cannot be derived from `location` at build time.
 *
 * The same value is also written into `src/index.html` (canonical, og:url,
 * og:image, twitter:image and the JSON-LD block) and must be kept in sync
 * there — changing it in one place only will emit wrong canonical tags.
 */
export const SITE_URL = 'https://oufrad.com';

export const SITE_NAME = 'Mohamed Oufrad';

/** Used when a route declares no title of its own (i.e. the home page). */
export const DEFAULT_TITLE = 'Mohamed Oufrad — Software & Data Engineer';

export const DEFAULT_DESCRIPTION =
  'Mohamed Oufrad is a software and data engineer in Rabat, Morocco, building scalable systems and data pipelines.';

export const DEFAULT_OG_IMAGE = '/assets/og-image.png';
