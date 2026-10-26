import type { Locale } from '@/i18n/config';

/** Route props for `/[locale]/…` pages; the layout has already rejected unknown locales. */
export type LocaleParams<T extends Record<string, string> = Record<string, never>> = {
  params: Promise<{ locale: Locale } & T>;
};
