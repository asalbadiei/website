'use client';

import { useMemo } from 'react';
import { useLocale } from '@/i18n/client';
import type { NewsCategory, NewsItem } from '@/types/content';
import { NewsCard } from '@/components/content/NewsCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChipFilter, Pagination, ResultCount, SearchField, normalize, paginate, useQueryState } from './controls';

const PER_PAGE = 6;
const CATEGORIES: NewsCategory[] = ['university', 'research', 'student', 'culture', 'event'];

export function NewsArchive({ items }: { items: NewsItem[] }) {
  const { locale, dict } = useLocale();
  const { values, set, page } = useQueryState(['q', 'category'] as const);

  const filtered = useMemo(() => {
    const q = normalize(values.q);
    return items.filter(
      (n) =>
        (!values.category || n.category === values.category) &&
        (!q || normalize(`${n.title[locale]} ${n.summary[locale]}`).includes(q)),
    );
  }, [items, values.q, values.category, locale]);

  const view = paginate(filtered, page, PER_PAGE);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchField value={values.q} onChange={(q) => set({ q })} label={dict.news.searchLabel} />
        <ChipFilter
          label={dict.common.category}
          value={values.category}
          onChange={(category) => set({ category })}
          options={CATEGORIES.map((c) => ({ value: c, label: dict.news.categories[c] }))}
        />
      </div>
      <ResultCount count={filtered.length} showClear={Boolean(values.q || values.category)} onClear={() => set({ q: '', category: '' })} />
      {view.items.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {view.items.map((item) => (
            <li key={item.slug}>
              <NewsCard item={item} locale={locale} headingLevel={2} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={dict.common.noResults} hint={dict.common.noResultsHint} />
      )}
      <Pagination
        page={view.page}
        pages={view.pages}
        onChange={(p) => {
          set({ page: String(p) });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
