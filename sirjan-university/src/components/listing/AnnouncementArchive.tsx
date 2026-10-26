'use client';

import { useMemo } from 'react';
import { useLocale } from '@/i18n/client';
import type { Announcement, AnnouncementCategory } from '@/types/content';
import { AnnouncementItem } from '@/components/content/AnnouncementItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { ChipFilter, ResultCount, SearchField, normalize, useQueryState } from './controls';

const STEP = 5;
const CATEGORIES: AnnouncementCategory[] = ['education', 'admissions', 'exams', 'student-affairs', 'research', 'general'];

/** Announcements use "load more" rather than numbered pages. */
export function AnnouncementArchive({ items }: { items: Announcement[] }) {
  const { locale, dict } = useLocale();
  const { values, set, page } = useQueryState(['q', 'category'] as const);

  const filtered = useMemo(() => {
    const q = normalize(values.q);
    return items.filter(
      (a) =>
        (!values.category || a.category === values.category) &&
        (!q || normalize(`${a.title[locale]} ${a.excerpt[locale]}`).includes(q)),
    );
  }, [items, values.q, values.category, locale]);

  const shown = filtered.slice(0, page * STEP);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchField value={values.q} onChange={(q) => set({ q })} label={dict.announcements.searchLabel} />
        <ChipFilter
          label={dict.common.category}
          value={values.category}
          onChange={(category) => set({ category })}
          options={CATEGORIES.map((c) => ({ value: c, label: dict.announcements.categories[c] }))}
        />
      </div>
      <ResultCount count={filtered.length} showClear={Boolean(values.q || values.category)} onClear={() => set({ q: '', category: '' })} />
      {shown.length ? (
        <ul className="space-y-3">
          {shown.map((item) => (
            <li key={item.slug}>
              <AnnouncementItem item={item} locale={locale} headingLevel={2} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={dict.common.noResults} hint={dict.common.noResultsHint} />
      )}
      {shown.length < filtered.length ? (
        <div className="mt-8 text-center">
          <Button variant="secondary" onClick={() => set({ page: String(page + 1) })}>
            {dict.common.loadMore}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
