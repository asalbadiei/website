import type { CSSProperties } from 'react';
import { stats } from '@/content/home';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { ProvenanceBadge } from '@/components/ui/Provenance';
import { CountUp } from './CountUp';

export function StatsBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section aria-labelledby="stats-title" className="container-site pt-12 pb-4 sm:pt-16">
      <h2 id="stats-title" className="sr-only">
        {dict.home.statsTitle}
      </h2>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <div
            key={s.id}
            data-reveal
            style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
            className="group flex flex-col-reverse items-center text-center last:col-span-2 sm:last:col-span-1"
          >
            <dt className="mt-2 text-[0.9375rem] font-semibold text-ink-2">{s.label[locale]}</dt>
            <dd className="text-[2.75rem] leading-none font-black text-navy transition-colors duration-300 group-hover:text-brand sm:text-[3.25rem]">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-caption text-muted">
        <ProvenanceBadge provenance="sample" locale={locale} />
        {dict.home.statsNote}
      </p>
    </section>
  );
}
