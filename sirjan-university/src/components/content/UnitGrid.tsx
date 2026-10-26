import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/path';
import type { OrgUnit } from '@/types/content';
import { Icon } from '@/components/ui/Icon';

export function UnitGrid({ units, base, locale }: { units: OrgUnit[]; base: string; locale: Locale }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {units.map((u) => (
        <li key={u.slug}>
          <Link href={localizedPath(locale, `${base}/${u.slug}`)} className="card card-link group flex h-full flex-col p-6">
            <span className="mb-4 grid size-11 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
              <Icon name={u.icon} />
            </span>
            <span className="text-h3 font-bold text-navy group-hover:text-brand">{u.name[locale]}</span>
            <span className="mt-2 text-sm text-muted">{u.summary[locale]}</span>
            <ArrowRight size={18} aria-hidden="true" className="flip-rtl mt-auto pt-4 text-brand" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
