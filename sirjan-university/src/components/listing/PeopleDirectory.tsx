'use client';

import { useMemo } from 'react';
import { useLocale } from '@/i18n/client';
import type { Person } from '@/types/content';
import { PersonCard } from '@/components/content/PersonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChipFilter, ResultCount, SearchField, normalize, useQueryState } from './controls';

export function PeopleDirectory({ items }: { items: Person[] }) {
  const { locale, dict } = useLocale();
  const { values, set } = useQueryState(['q', 'group'] as const);
  const groups = [...new Set(items.map((p) => p.group))];

  const filtered = useMemo(() => {
    const q = normalize(values.q);
    return items.filter(
      (p) =>
        (!values.group || p.group === values.group) &&
        (!q || normalize(`${p.name?.[locale] ?? ''} ${p.position[locale]} ${p.unit[locale]}`).includes(q)),
    );
  }, [items, values, locale]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchField value={values.q} onChange={(q) => set({ q })} label={dict.people.searchLabel} />
        <ChipFilter label={dict.people.unit} value={values.group} onChange={(group) => set({ group })} options={groups.map((g) => ({ value: g, label: dict.people.groups[g] }))} />
      </div>
      <ResultCount count={filtered.length} showClear={Boolean(values.q || values.group)} onClear={() => set({ q: '', group: '' })} />
      {filtered.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.id}>
              <PersonCard person={p} locale={locale} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={dict.common.noResults} hint={dict.common.noResultsHint} />
      )}
    </div>
  );
}
