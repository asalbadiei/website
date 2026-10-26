import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { siteUrl } from '@/content/site';

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail with BreadcrumbList structured data. Home is prepended automatically. */
export function Breadcrumbs({ locale, items, tone = 'light' }: { locale: Locale; items: Crumb[]; tone?: 'light' | 'dark' }) {
  const dict = getDictionary(locale);
  const all: Crumb[] = [{ label: dict.common.home, href: '/' }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${siteUrl}${localizedPath(locale, c.href)}` } : {}),
    })),
  };
  const muted = tone === 'dark' ? 'text-white/70 hover:text-white' : 'text-muted hover:text-brand';
  return (
    <nav aria-label={dict.common.breadcrumb}>
      <ol className="flex flex-wrap items-center gap-1 text-caption">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight size={14} aria-hidden="true" className={`flip-rtl ${tone === 'dark' ? 'text-white/40' : 'text-line-strong'}`} /> : null}
              {last || !c.href ? (
                <span aria-current={last ? 'page' : undefined} className={tone === 'dark' ? 'text-white' : 'font-semibold text-ink-2'}>
                  {c.label}
                </span>
              ) : (
                <Link href={localizedPath(locale, c.href)} className={`inline-flex items-center gap-1 ${muted}`}>
                  {i === 0 ? <Home size={14} aria-hidden="true" /> : null}
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
