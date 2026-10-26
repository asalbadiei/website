import { CheckCircle2, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import type { OrgUnit } from '@/types/content';
import type { Crumb } from '@/components/layout/Breadcrumbs';
import { Icon } from '@/components/ui/Icon';
import { ProvenanceBadge } from '@/components/ui/Provenance';
import { PageHeader } from './PageHeader';
import { SideNav } from './SideNav';

/** Shared template for administrative offices, vice-presidencies and centres. */
export function UnitPage({
  unit,
  locale,
  crumbs,
  siblings,
  route,
  children,
}: {
  unit: OrgUnit;
  locale: Locale;
  crumbs: Crumb[];
  siblings?: { title: string; items: { label: string; href: string }[] };
  route: string;
  children?: ReactNode;
}) {
  const dict = getDictionary(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={crumbs}
        title={unit.name[locale]}
        intro={unit.summary[locale]}
        meta={<ProvenanceBadge provenance={unit.provenance} locale={locale} />}
      />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <div className="lg:col-span-8">
          <div className="prose-site">
            {unit.intro.map((p) => (
              <p key={p.en}>{p[locale]}</p>
            ))}
          </div>

          <section aria-labelledby="resp" className="mt-10">
            <h2 id="resp" className="mb-4 text-h2 font-bold text-navy">
              {dict.units.responsibilities}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {unit.responsibilities.map((r) => (
                <li key={r.en} className="flex items-start gap-3 rounded-[var(--radius-md)] border border-line bg-surface p-4 text-sm text-ink-2">
                  <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                  {r[locale]}
                </li>
              ))}
            </ul>
          </section>

          {unit.services?.length ? (
            <section aria-labelledby="services" className="mt-10">
              <h2 id="services" className="mb-4 text-h2 font-bold text-navy">
                {dict.units.services}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {unit.services.map((s) => (
                  <li key={s.title.en} className="card p-5">
                    <h3 className="font-bold text-navy">{s.title[locale]}</h3>
                    <p className="mt-1 text-sm text-muted">{s.description[locale]}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {children}
        </div>

        <aside className="space-y-6 lg:col-span-4">
          {unit.head ? (
            <div className="card p-5">
              <p className="mb-3 text-caption font-bold text-muted">{dict.units.head}</p>
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-brand-50 text-brand" aria-hidden="true">
                  <UserRound size={22} />
                </span>
                <div>
                  <p className={unit.head.name ? 'font-bold text-navy' : 'italic text-muted'}>{unit.head.name?.[locale] ?? dict.common.namePending}</p>
                  <p className="text-sm text-ink-2">{unit.head.position[locale]}</p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="card flex items-start gap-3 p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
              <Icon name={unit.icon} />
            </span>
            <div className="text-sm">
              <p className="font-bold text-navy">{dict.common.contact}</p>
              <p className="mt-1 italic text-muted">{dict.common.pendingVerification}</p>
            </div>
          </div>
          {siblings ? <SideNav locale={locale} title={siblings.title} items={siblings.items} current={route} /> : null}
        </aside>
      </div>
    </>
  );
}
