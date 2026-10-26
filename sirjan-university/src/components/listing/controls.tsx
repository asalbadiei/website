'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useId, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { fill } from '@/i18n';
import { cn, formatNumber } from '@/lib/format';

/**
 * URL-synced filter state: `?q=…&category=…&page=…`. Filters survive reloads, can be shared
 * and work with the browser back button.
 */
export function useQueryState<K extends string>(keys: readonly K[]) {
  const params = useSearchParams();
  const pathname = usePathname();
  const values = useMemo(
    () => Object.fromEntries(keys.map((k) => [k, params.get(k) ?? ''])) as Record<K | 'page', string>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params],
  );
  const set = useCallback(
    (patch: Partial<Record<K | 'page', string>>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch) as [string, string | undefined][]) {
        if (v) next.set(k, v);
        else next.delete(k);
      }
      if (!('page' in patch)) next.delete('page');
      const qs = next.toString();
      // Native history updates keep useSearchParams in sync without a server round trip.
      window.history.replaceState(null, '', qs ? `${pathname}?${qs}` : pathname);
    },
    [params, pathname],
  );
  const page = Math.max(1, Number(params.get('page')) || 1);
  return { values, set, page };
}

export function SearchField({ value, onChange, label, placeholder }: { value: string; onChange: (v: string) => void; label: string; placeholder?: string }) {
  const { dict } = useLocale();
  const id = useId();
  return (
    <div className="relative min-w-0 flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search size={18} aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? label}
        className="h-11 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface ps-10 pe-10 text-[0.9375rem] placeholder:text-muted focus:border-brand focus:ring-3 focus:ring-brand-100 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={dict.search.clear}
          className="absolute end-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-brand-50 hover:text-navy"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

export function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const { dict } = useLocale();
  const id = useId();
  return (
    <div className="min-w-0 sm:w-56">
      <label htmlFor={id} className="mb-1 block text-caption font-semibold text-ink-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface px-3 text-[0.9375rem] focus:border-brand focus:ring-3 focus:ring-brand-100 focus:outline-none"
      >
        <option value="">{dict.common.all}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Single-choice chips rendered as a radio-like button group. */
export function ChipFilter({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  const { dict } = useLocale();
  const all = [{ value: '', label: dict.common.all }, ...options];
  return (
    <div role="group" aria-label={label} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
      {all.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value || 'all'}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors',
              active ? 'border-brand bg-brand text-white' : 'border-line-strong bg-surface text-ink-2 hover:border-brand hover:text-brand',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ResultCount({ count, onClear, showClear }: { count: number; onClear: () => void; showClear: boolean }) {
  const { locale, dict } = useLocale();
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
      <p role="status" aria-live="polite">
        {fill(dict.common.resultsCount, { count: formatNumber(count, locale) })}
      </p>
      {showClear ? (
        <button type="button" onClick={onClear} className="font-semibold text-brand hover:underline">
          {dict.common.clearFilters}
        </button>
      ) : null}
    </div>
  );
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  const { locale, dict } = useLocale();
  if (pages <= 1) return null;
  const Prev = locale === 'fa' ? ChevronRight : ChevronLeft;
  const Next = locale === 'fa' ? ChevronLeft : ChevronRight;
  const btn = 'inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-[var(--radius-md)] border px-3 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40';
  return (
    <nav aria-label={dict.common.pagination} className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button type="button" className={cn(btn, 'border-line-strong bg-surface text-navy hover:border-brand')} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <Prev size={16} aria-hidden="true" />
        {dict.common.previous}
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          aria-label={fill(dict.common.page, { page: formatNumber(n, locale) })}
          className={cn(btn, n === page ? 'border-brand bg-brand text-white' : 'border-line-strong bg-surface text-navy hover:border-brand')}
        >
          {formatNumber(n, locale)}
        </button>
      ))}
      <button type="button" className={cn(btn, 'border-line-strong bg-surface text-navy hover:border-brand')} disabled={page >= pages} onClick={() => onChange(page + 1)}>
        {dict.common.next}
        <Next size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(page, pages);
  return { pages, page: current, items: items.slice((current - 1) * perPage, current * perPage) };
}

/** Text match against several localized fields, using the same normalisation as site search. */
export { normalize } from '@/lib/normalize';
