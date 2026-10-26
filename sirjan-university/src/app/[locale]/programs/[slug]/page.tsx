import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/content/PageHeader';
import { ProgramCard } from '@/components/content/ProgramCard';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink, buttonClass } from '@/components/ui/Button';
import { ProvenanceBadge, SampleNotice } from '@/components/ui/Provenance';
import { getFaculty } from '@/content/faculties';
import { getProgram, programs } from '@/content/programs';
import { locales } from '@/i18n/config';
import { fill, getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { formatNumber } from '@/lib/format';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => programs.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const p = getProgram(slug);
  if (!p) return {};
  const d = getDictionary(locale);
  return pageMetadata(locale, `/programs/${slug}`, { title: `${p.title[locale]} (${d.programs.levels[p.level]})`, description: p.intro[locale] });
}

export default async function ProgramPage({ params }: Props) {
  const { locale, slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  const d = getDictionary(locale);
  const faculty = getFaculty(program.faculty);
  const dept = faculty?.departments.find((x) => x.slug === program.department);
  const related = programs.filter((p) => p.slug !== slug && (p.department === program.department || p.faculty === program.faculty)).slice(0, 3);
  const programsTitle = locale === 'fa' ? 'رشته‌های تحصیلی' : 'Academic programmes';

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: d.programs.level, value: d.programs.levels[program.level] },
    { label: d.programs.faculty, value: faculty ? <Link className="text-brand hover:underline" href={localizedPath(locale, `/faculties/${faculty.slug}`)}>{faculty.name[locale]}</Link> : '—' },
    { label: d.programs.department, value: dept && faculty ? <Link className="text-brand hover:underline" href={localizedPath(locale, `/faculties/${faculty.slug}/${dept.slug}`)}>{dept.name[locale]}</Link> : '—' },
    { label: d.programs.field, value: program.field[locale] },
    ...(program.durationYears ? [{ label: d.programs.duration, value: fill(d.programs.years, { n: formatNumber(program.durationYears, locale) }) }] : []),
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: programsTitle, href: '/programs' }, { label: program.title[locale] }]}
        title={program.title[locale]}
        meta={
          <>
            <Badge tone="brand">{d.programs.levels[program.level]}</Badge>
            <ProvenanceBadge provenance={program.provenance} locale={locale} />
          </>
        }
      />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <div className="space-y-10 lg:col-span-8">
          {program.provenance === 'sample' ? <SampleNotice locale={locale} /> : null}
          <section aria-labelledby="overview">
            <h2 id="overview" className="mb-3 text-h2 font-bold text-navy">
              {d.programs.overview}
            </h2>
            <p className="text-lg leading-8 text-ink-2">{program.intro[locale]}</p>
          </section>
          <section aria-labelledby="requirements">
            <h2 id="requirements" className="mb-3 text-h2 font-bold text-navy">
              {d.programs.requirements}
            </h2>
            {program.requirements?.length ? (
              <ul className="space-y-2">
                {program.requirements.map((r) => (
                  <li key={r.en} className="flex items-start gap-3 text-ink-2">
                    <CheckCircle2 size={18} aria-hidden="true" className="mt-1 shrink-0 text-success" />
                    {r[locale]}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-muted">{d.programs.requirementsPending}</p>
            )}
          </section>
          <div className="rounded-[var(--radius-lg)] border border-brand-100 bg-brand-50 p-5">
            <p className="text-sm text-ink-2">{d.programs.applyNote}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="https://azmoon.iau.ac.ir" target="_blank" rel="noopener noreferrer" className={buttonClass('primary')}>
                azmoon.iau.ac.ir
                <ExternalLink size={15} aria-hidden="true" />
                <span className="sr-only">{d.common.externalLink}</span>
              </a>
              <ButtonLink href={localizedPath(locale, '/admissions')} variant="secondary">
                {d.home.admissionsPrimary}
              </ButtonLink>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-4">
          <dl className="card divide-y divide-line">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 p-4">
                <dt className="text-caption text-muted">{f.label}</dt>
                <dd className="font-semibold text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      {related.length ? (
        <section aria-labelledby="related-programs" className="border-t border-line bg-surface">
          <div className="container-site py-12">
            <h2 id="related-programs" className="mb-6 text-h2 font-bold text-navy">
              {d.programs.related}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProgramCard program={p} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
