import type { Metadata } from 'next';
import { siteUrl } from '@/content/site';
import { defaultLocale, localeConfig, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';

export function localeUrl(locale: Locale, route: string): string {
  return `${siteUrl}${localizedPath(locale, route)}`;
}

/**
 * Page metadata with a localized title and description, canonical URL, fa/en hreflang
 * alternates and Open Graph tags. `route` excludes the locale (`` for home).
 */
export function pageMetadata(
  locale: Locale,
  route: string,
  { title, description, image, type = 'website' }: { title?: string; description?: string; image?: string; type?: 'website' | 'article' },
): Metadata {
  const dict = getDictionary(locale);
  const brand = dict.brand.name;
  const fullTitle = title ? `${title} | ${brand}` : brand;
  const desc = description || dict.brand.description;
  const url = localeUrl(locale, route);
  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeConfig[l].htmlLang, localeUrl(l, route)])),
        'x-default': localeUrl(defaultLocale, route),
      },
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: brand,
      locale: localeConfig[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeConfig[l].og),
      type,
      images: image ? [{ url: `${siteUrl}${image}` }] : undefined,
    },
  };
}
