import Link from 'next/link';
import { Building2, Clock } from 'lucide-react';
import { getFaculty } from '@/content/faculties';
import type { Locale } from '@/i18n/config';
import { getDictionary, fill } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { formatNumber } from '@/lib/format';
import type { Program } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { ProvenanceBadge } from '@/components/ui/Provenance';

export function ProgramCard({ program, locale }: { program: Program; locale: Locale }) {
  const dict = getDictionary(locale);
  const faculty = getFaculty(program.faculty);
  const dept = faculty?.departments.find((d) => d.slug === program.department);
  return (
    <article className="card card-link group relative flex h-full flex-col p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone="brand">{dict.programs.levels[program.level]}</Badge>
        <ProvenanceBadge provenance={program.provenance} locale={locale} />
      </div>
      <h3 className="text-h3 font-bold text-navy group-hover:text-brand">
        <Link href={localizedPath(locale, `/programs/${program.slug}`)} className="after:absolute after:inset-0">
          {program.title[locale]}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{program.intro[locale]}</p>
      <dl className="mt-auto space-y-1 pt-4 text-caption text-ink-2">
        <div className="flex items-start gap-1.5">
          <dt className="sr-only">{dict.programs.faculty}</dt>
          <Building2 size={14} aria-hidden="true" className="mt-1 shrink-0 text-muted" />
          <dd className="min-w-0">
            {faculty?.shortName[locale]}
            {dept ? ` — ${dept.name[locale]}` : ''}
          </dd>
        </div>
        {program.durationYears ? (
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">{dict.programs.duration}</dt>
            <Clock size={14} aria-hidden="true" className="shrink-0 text-muted" />
            <dd>{fill(dict.programs.years, { n: formatNumber(program.durationYears, locale) })}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
