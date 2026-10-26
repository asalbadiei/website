'use client';

import { useMemo } from 'react';
import { faculties } from '@/content/faculties';
import { useLocale } from '@/i18n/client';
import type { DegreeLevel, Program } from '@/types/content';
import { ProgramCard } from '@/components/content/ProgramCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination, ResultCount, SearchField, SelectFilter, normalize, paginate, useQueryState } from './controls';

const LEVELS: DegreeLevel[] = ['associate', 'bachelor', 'master', 'doctorate'];
const PER_PAGE = 9;

export function ProgramDirectory({ items }: { items: Program[] }) {
  const { locale, dict } = useLocale();
  const { values, set, page } = useQueryState(['q', 'faculty', 'department', 'level', 'field'] as const);

  const faculty = faculties.find((f) => f.slug === values.faculty);
  const fields = useMemo(() => {
    const map = new Map<string, string>();
    items.forEach((p) => map.set(p.field.en, p.field[locale]));
    return [...map].map(([value, label]) => ({ value, label }));
  }, [items, locale]);

  const filtered = useMemo(() => {
    const q = normalize(values.q);
    return items.filter(
      (p) =>
        (!values.faculty || p.faculty === values.faculty) &&
        (!values.department || p.department === values.department) &&
        (!values.level || p.level === values.level) &&
        (!values.field || p.field.en === values.field) &&
        (!q || normalize(`${p.title.fa} ${p.title.en} ${p.intro[locale]}`).includes(q)),
    );
  }, [items, values, locale]);

  const view = paginate(filtered, page, PER_PAGE);
  const active = Boolean(values.q || values.faculty || values.department || values.level || values.field);

  return (
    <div>
      <div className="card mb-6 space-y-4 p-4 sm:p-5">
        <SearchField value={values.q} onChange={(q) => set({ q })} label={dict.programs.searchLabel} placeholder={dict.programs.searchPlaceholder} />
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <SelectFilter
            label={dict.programs.faculty}
            value={values.faculty}
            onChange={(v) => set({ faculty: v, department: '' })}
            options={faculties.map((f) => ({ value: f.slug, label: f.name[locale] }))}
          />
          <SelectFilter
            label={dict.programs.department}
            value={values.department}
            onChange={(v) => set({ department: v })}
            options={(faculty ? faculty.departments : faculties.flatMap((f) => f.departments)).map((d) => ({ value: d.slug, label: d.name[locale] }))}
          />
          <SelectFilter label={dict.programs.level} value={values.level} onChange={(v) => set({ level: v })} options={LEVELS.map((l) => ({ value: l, label: dict.programs.levels[l] }))} />
          <SelectFilter label={dict.programs.field} value={values.field} onChange={(v) => set({ field: v })} options={fields} />
        </div>
      </div>
      <ResultCount count={filtered.length} showClear={active} onClear={() => set({ q: '', faculty: '', department: '', level: '', field: '' })} />
      {view.items.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {view.items.map((p) => (
            <li key={p.slug}>
              <ProgramCard program={p} locale={locale} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={dict.common.noResults} hint={dict.common.noResultsHint} />
      )}
      <Pagination page={view.page} pages={view.pages} onChange={(p) => set({ page: String(p) })} />
    </div>
  );
}
