'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useId, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { fill } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { searchDocs } from '@/lib/search-client';
import { useSearchIndex } from '@/lib/use-search-index';
import { Dialog } from '@/components/ui/Dialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { SearchResults } from './SearchResults';

const POPULAR = {
  fa: ['پذیرش', 'انتخاب واحد', 'مهندسی', 'پرستاری', 'آیین‌نامه'],
  en: ['Admissions', 'Registration', 'Engineering', 'Nursing', 'Regulations'],
};

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { docs, error, retry } = useSearchIndex(locale, open);
  const titleId = useId();
  const inputId = useId();

  const results = useMemo(() => (docs ? searchDocs(docs, query) : []), [docs, query]);
  const shown = results.slice(0, 12);
  const trimmed = query.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed.length < 2) return;
    onClose();
    router.push(`${localizedPath(locale, '/search')}?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId} className="fixed inset-0 h-dvh w-full">
      <div className="flex h-full items-start justify-center overflow-y-auto px-4 pt-4 pb-10 sm:pt-[8vh]" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="w-full max-w-2xl rounded-[var(--radius-lg)] bg-canvas shadow-[var(--shadow-raised)]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 id={titleId} className="font-bold text-navy">
              {dict.search.title}
            </h2>
            <button type="button" onClick={onClose} aria-label={dict.common.close} className="grid size-9 place-items-center rounded-[var(--radius-md)] text-navy hover:bg-brand-50">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <form role="search" onSubmit={submit} className="p-4">
            <label htmlFor={inputId} className="sr-only">
              {dict.search.label}
            </label>
            <div className="relative">
              <Search size={20} aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id={inputId}
                type="search"
                data-autofocus
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.search.placeholder}
                aria-describedby={`${inputId}-status`}
                className="h-12 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface ps-10 pe-11 text-base text-ink placeholder:text-muted focus:border-brand focus:outline-none focus-visible:outline-none focus:ring-3 focus:ring-brand-100 [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={dict.search.clear}
                  className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-brand-50 hover:text-navy"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </form>

          <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
            <p id={`${inputId}-status`} role="status" aria-live="polite" className="mb-3 text-sm text-muted">
              {error
                ? dict.common.errorBody
                : !trimmed
                  ? dict.search.empty
                  : trimmed.length < 2
                    ? dict.search.hint
                    : docs
                      ? results.length
                        ? fill(dict.search.resultsFor, { count: results.length.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-GB'), q: trimmed })
                        : fill(dict.search.noResults, { q: trimmed })
                      : dict.common.loading}
            </p>
            {error ? (
              <button type="button" onClick={retry} className="text-sm font-semibold text-brand underline">
                {dict.common.retry}
              </button>
            ) : null}
            {!docs && !error && trimmed.length >= 2 ? (
              <div className="space-y-2">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            ) : null}
            {!trimmed ? (
              <div>
                <p className="mb-2 text-caption font-semibold text-muted">{dict.search.popular}</p>
                <ul className="flex flex-wrap gap-2">
                  {POPULAR[locale].map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-2 hover:border-brand hover:text-brand"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {shown.length ? <SearchResults results={shown} onNavigate={onClose} /> : null}
            {results.length > shown.length ? (
              <Link
                href={`${localizedPath(locale, '/search')}?q=${encodeURIComponent(trimmed)}`}
                onClick={onClose}
                className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
              >
                {dict.search.viewAllResults}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
