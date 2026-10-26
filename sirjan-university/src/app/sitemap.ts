import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { allRoutes } from '@/lib/routes';
import { localeUrl } from '@/lib/seo';

/** Every route in both languages, each listing its fa/en alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = allRoutes;
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: localeUrl(locale, route),
      changeFrequency: route === '' || route === '/news' || route === '/announcements' ? ('daily' as const) : ('monthly' as const),
      priority: route === '' ? 1 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l === 'fa' ? 'fa-IR' : 'en', localeUrl(l, route)])) },
    })),
  );
}
