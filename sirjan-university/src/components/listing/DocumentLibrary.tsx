'use client';

import { useMemo } from 'react';
import { useLocale } from '@/i18n/client';
import type { DocumentCategory, DocumentItem } from '@/types/content';
import { DocumentRow } from '@/components/content/DocumentRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChipFilter, ResultCount, SearchField, SelectFilter, normalize, useQueryState } from './controls';

const CATEGORIES: DocumentCategory[] = ['education', 'graduate', 'research', 'student', 'administrative', 'regulations'];

export function DocumentLibrary({ items }: { items: DocumentItem[] }) {
  const { locale, dict } = useLocale();
  const { values, set } = useQueryState(['q', 'category', 'type'] as const);
  const types = [...new Set(items.map((d) => d.fileType))];

  const filtered = useMemo(() => {
    const q = normalize(values.q);
    return items.filter(
      (d) =>
        (!values.category || d.category === values.category) &&
        (!values.type || d.fileType === values.type) &&
        (!q || normalize(`${d.title[locale]} ${d.description[locale]} ${d.department[locale]}`).includes(q)),
    );
  }, [items, values, locale]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <SearchField value={values.q} onChange={(q) => set({ q })} label={dict.documents.searchLabel} />
          <SelectFilter label={dict.documents.fileType} value={values.type} onChange={(type) => set({ type })} options={types.map((t) => ({ value: t, label: t.toUpperCase() }))} />
        </div>
        <ChipFilter label={dict.common.category} value={values.category} onChange={(category) => set({ category })} options={CATEGORIES.map((c) => ({ value: c, label: dict.documents.categories[c] }))} />
      </div>
      <ResultCount count={filtered.length} showClear={Boolean(values.q || values.category || values.type)} onClear={() => set({ q: '', category: '', type: '' })} />
      {filtered.length ? (
        <ul className="divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-surface">
          {filtered.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} locale={locale} />
          ))}
        </ul>
      ) : (
        <EmptyState title={dict.common.noResults} hint={dict.common.noResultsHint} />
      )}
    </div>
  );
}
