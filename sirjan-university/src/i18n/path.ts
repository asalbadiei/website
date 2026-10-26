import { isLocale, type Locale } from './config';

const EXTERNAL = /^(https?:|mailto:|tel:|#)/;

/** Prefix an internal route (`/news`, `` for home) with its locale: `/fa/news`. */
export function localizedPath(locale: Locale, route: string): string {
  if (EXTERNAL.test(route)) return route;
  const clean = route === '/' ? '' : route.replace(/\/$/, '');
  return `/${locale}${clean.startsWith('/') || clean === '' ? clean : `/${clean}`}`;
}

/** Remove the leading locale segment: `/en/news/x` → `/news/x`. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && isLocale(segments[1])) {
    return `/${segments.slice(2).join('/')}`.replace(/\/$/, '') || '/';
  }
  return pathname || '/';
}

/** The same page in another locale. Every route exists in both languages. */
export function switchLocalePath(pathname: string, next: Locale): string {
  return localizedPath(next, stripLocale(pathname));
}

/** True when `pathname` is `href` or one of its descendants (for active-state styling). */
export function isActivePath(pathname: string, href: string, exact = false): boolean {
  const a = stripLocale(pathname);
  const b = stripLocale(href);
  if (exact || b === '/') return a === b;
  return a === b || a.startsWith(`${b}/`);
}
