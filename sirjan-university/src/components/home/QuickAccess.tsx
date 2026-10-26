import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { quickAccess } from '@/content/home';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { Icon } from '@/components/ui/Icon';

export function QuickAccess({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section aria-labelledby="quick-title" className="container-site py-12 sm:py-16">
      <h2 id="quick-title" className="sr-only">
        {dict.home.quickTitle}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {quickAccess.map((card, i) => (
          <li key={card.id} data-reveal style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}>
            <Link
              href={localizedPath(locale, card.href)}
              className="card-link group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:min-h-[236px] sm:p-7"
            >
              {/* Soft glow that rises on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -end-16 -bottom-16 size-40 rounded-full bg-brand-200/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-200/40"
              />
              <span className="relative text-brand transition-transform duration-500 group-hover:-translate-y-0.5">
                <Icon name={card.icon} size={40} />
              </span>
              <span className="relative mt-auto pt-8">
                <span className="block text-2xl font-extrabold text-brand">{card.title[locale]}</span>
                <span className="mt-1.5 flex items-start justify-between gap-4">
                  <span className="line-clamp-2 min-h-[3.25rem] text-[0.9375rem] leading-[1.65rem] text-muted">{card.description[locale]}</span>
                  <ArrowDownRight
                    size={22}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="flip-rtl mt-auto shrink-0 self-end text-brand transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-accent rtl:group-hover:-translate-x-1"
                  />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
