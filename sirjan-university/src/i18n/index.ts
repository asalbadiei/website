import type { Locale } from './config';
import en from './dictionaries/en';
import fa, { type Dictionary } from './dictionaries/fa';

const dictionaries: Record<Locale, Dictionary> = { fa, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replace `{name}` placeholders: `fill('Page {page}', { page: 2 })`. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export type { Dictionary };
