import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { formatNumber } from '@/lib/format';
import type { Faculty } from '@/types/content';
import { Icon } from '@/components/ui/Icon';
import { ImageFrame } from './ImageFrame';

export function FacultyCard({ faculty, locale, programCount }: { faculty: Faculty; locale: Locale; programCount: number }) {
  const dict = getDictionary(locale);
  return (
    <article className="card card-link group relative flex h-full flex-col overflow-hidden">
      <ImageFrame image={faculty.image} locale={locale} ratio="aspect-[16/8]" />
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 grid size-10 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
          <Icon name={faculty.icon} />
        </span>
        <h3 className="text-h3 font-bold text-navy group-hover:text-brand">
          <Link href={localizedPath(locale, `/faculties/${faculty.slug}`)} className="after:absolute after:inset-0">
            {faculty.name[locale]}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{faculty.intro[locale]}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-caption text-ink-2">
          <span>
            {formatNumber(faculty.departments.length, locale)} {dict.faculties.departments} · {formatNumber(programCount, locale)} {dict.faculties.programs}
          </span>
          <ArrowRight size={16} aria-hidden="true" className="flip-rtl text-brand" />
        </div>
      </div>
    </article>
  );
}
