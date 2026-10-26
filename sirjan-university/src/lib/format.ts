import { localeConfig, type Locale } from '@/i18n/config';
import type { L } from '@/types/content';

/** Pick the string for the current locale. */
export function t(value: L, locale: Locale): string {
  return value[locale];
}

/** Parse an ISO `yyyy-mm-dd` date at noon UTC, so no timezone shifts the day. */
export function parseISODate(iso: string): Date {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`);
}

function intlLocale(locale: Locale): string {
  // Persian pages use the Solar Hijri calendar with Persian digits; English uses Gregorian.
  return locale === 'fa' ? 'fa-IR-u-ca-persian-nu-arabext' : localeConfig.en.intl;
}

export function formatDate(
  iso: string | Date,
  locale: Locale,
  style: 'long' | 'short' | 'numeric' = 'long',
): string {
  const date = typeof iso === 'string' ? parseISODate(iso) : iso;
  const options: Intl.DateTimeFormatOptions =
    style === 'numeric'
      ? { year: 'numeric', month: '2-digit', day: '2-digit' }
      : style === 'short'
        ? { day: 'numeric', month: 'short' }
        : { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat(intlLocale(locale), { ...options, timeZone: 'Asia/Tehran' }).format(date);
}

/** Day number and month name, for calendar badges. */
export function dateParts(iso: string, locale: Locale): { day: string; month: string; year: string } {
  const date = parseISODate(iso);
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(intlLocale(locale), { ...o, timeZone: 'Asia/Tehran' }).format(date);
  return { day: fmt({ day: 'numeric' }), month: fmt({ month: 'long' }), year: fmt({ year: 'numeric' }) };
}

export function formatWeekdayDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Tehran',
  }).format(date);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-GB').format(value);
}

/** Convert Latin digits inside a string (phone numbers, extensions) for Persian display. */
export function localizeDigits(value: string, locale: Locale): string {
  if (locale !== 'fa') return value;
  return value.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

export type DateRangeStatus = 'upcoming' | 'ongoing' | 'finished';

export function rangeStatus(start: string, end: string | undefined, now: Date): DateRangeStatus {
  const s = parseISODate(start).getTime() - 12 * 3600_000;
  const e = parseISODate(end ?? start).getTime() + 12 * 3600_000;
  const n = now.getTime();
  if (n < s) return 'upcoming';
  if (n > e) return 'finished';
  return 'ongoing';
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
