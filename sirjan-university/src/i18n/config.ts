export const locales = ['fa', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fa';

export const localeConfig: Record<
  Locale,
  { htmlLang: string; dir: 'rtl' | 'ltr'; intl: string; og: string; label: string }
> = {
  fa: { htmlLang: 'fa-IR', dir: 'rtl', intl: 'fa-IR', og: 'fa_IR', label: 'فارسی' },
  en: { htmlLang: 'en', dir: 'ltr', intl: 'en-GB', og: 'en_GB', label: 'English' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
