import { stats } from '@/content/home';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { formatNumber } from '@/lib/format';
import { Icon } from '@/components/ui/Icon';
import { ProvenanceBadge } from '@/components/ui/Provenance';

export function StatsBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section aria-labelledby="stats-title" className="relative z-10 -mt-px border-b border-line bg-surface">
      <div className="container-site py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 id="stats-title" className="text-h3 font-bold text-navy">
            {dict.home.statsTitle}
          </h2>
          <p className="flex items-center gap-2 text-caption text-muted">
            <ProvenanceBadge provenance="sample" locale={locale} />
            {dict.home.statsNote}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.id} className="flex items-center gap-3 bg-surface p-4 sm:p-5">
              <span className="hidden size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand sm:grid">
                <Icon name={s.icon} />
              </span>
              <div className="flex flex-col-reverse">
                <dt className="text-sm text-muted">{s.label[locale]}</dt>
                <dd className="text-2xl font-bold text-navy">
                  {formatNumber(s.value, locale)}
                  {s.suffix}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
