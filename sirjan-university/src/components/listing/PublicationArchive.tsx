'use client';

import { useMemo } from 'react';
import { CalendarDays } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { formatDate } from '@/lib/format';
import type { Publication } from '@/types/content';
import { FileAction } from '@/components/content/FileAction';
import { ImageFrame } from '@/components/content/ImageFrame';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProvenanceBadge } from '@/components/ui/Provenance';
import { ChipFilter, ResultCount, SearchField, normalize, useQueryState } from './controls';

export function PublicationArchive({ items }: { items: Publication[] }) {
  const { locale, dict } = useLocale();
  const { values, set } = useQueryState(['q', 'kind'] as const);
  const kinds = [...new Set(items.map((p) => p.kind))];

  const filtered = useMemo(() => {
    const q = normalize(values.q);
    return items
      .filter((p) => (!values.kind || p.kind === values.kind) && (!q || normalize(`${p.title[locale]} ${p.issue[locale]} ${p.description[locale]}`).includes(q)))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, values, locale]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchField value={values.q} onChange={(q) => set({ q })} label={dict.publications.searchLabel} />
        <ChipFilter label={dict.common.category} value={values.kind} onChange={(kind) => set({ kind })} options={kinds.map((k) => ({ value: k, label: dict.publications.kinds[k] }))} />
      </div>
      <ResultCount count={filtered.length} showClear={Boolean(values.q || values.kind)} onClear={() => set({ q: '', kind: '' })} />
      {filtered.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <article className="card flex h-full flex-col overflow-hidden">
                <ImageFrame image={p.cover} locale={locale} ratio="aspect-[3/2]" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge tone="brand">{dict.publications.kinds[p.kind]}</Badge>
                    <ProvenanceBadge provenance={p.provenance} locale={locale} />
                  </div>
                  <h2 className="text-h3 font-bold text-navy">{p.title[locale]}</h2>
                  <p className="text-sm font-semibold text-ink-2">{p.issue[locale]}</p>
                  <p className="mt-2 text-sm text-muted">{p.description[locale]}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-caption text-muted">
                      <CalendarDays size={14} aria-hidden="true" />
                      <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                    </span>
                    <FileAction href={p.href} locale={locale} label={dict.publications.read} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={dict.common.noResults} hint={dict.common.noResultsHint} />
      )}
    </div>
  );
}
