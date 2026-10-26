'use client';

import { useMemo } from 'react';
import { useLocale } from '@/i18n/client';
import { fill } from '@/i18n';
import { formatNumber } from '@/lib/format';
import { searchDocs, type SearchType } from '@/lib/search-client';
import { useSearchIndex } from '@/lib/use-search-index';
import { SearchResults, searchTypeOrder } from '@/components/navigation/SearchResults';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { ChipFilter, SearchField, useQueryState } from './controls';

export function SearchPageClient() {
  const { locale, dict } = useLocale();
  const { values, set } = useQueryState(['q', 'type'] as const);
  const { docs, error, retry } = useSearchIndex(locale);
  const all = useMemo(() => (docs ? searchDocs(docs, values.q) : []), [docs, values.q]);
  const results = values.type ? all.filter((r) => r.type === values.type) : all;
  const present = searchTypeOrder.filter((t) => all.some((r) => r.type === t));
  const q = values.q.trim();

  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchField value={values.q} onChange={(v) => set({ q: v })} label={dict.search.label} placeholder={dict.search.placeholder} />
        {present.length > 1 ? (
          <ChipFilter
            label={dict.common.category}
            value={values.type}
            onChange={(type) => set({ type })}
            options={present.map((t: SearchType) => ({ value: t, label: dict.search.types[t] }))}
          />
        ) : null}
      </div>
      <p role="status" aria-live="polite" className="mb-4 text-sm text-muted">
        {q.length < 2
          ? dict.search.empty
          : docs
            ? results.length
              ? fill(dict.search.resultsFor, { count: formatNumber(results.length, locale), q })
              : ''
            : error
              ? dict.common.errorBody
              : dict.common.loading}
      </p>
      {error ? (
        <Button variant="secondary" onClick={retry}>
          {dict.common.retry}
        </Button>
      ) : !docs && q.length >= 2 ? (
        <div className="space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : q.length >= 2 && !results.length ? (
        <EmptyState title={fill(dict.search.noResults, { q })} hint={dict.common.noResultsHint} />
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}
