'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { SearchDoc } from './search-client';

const cache = new Map<Locale, Promise<SearchDoc[]>>();

function load(locale: Locale) {
  let p = cache.get(locale);
  if (!p) {
    p = fetch(`/api/search/${locale}`).then((r) => {
      if (!r.ok) throw new Error(`Search index ${r.status}`);
      return r.json() as Promise<SearchDoc[]>;
    });
    p.catch(() => cache.delete(locale));
    cache.set(locale, p);
  }
  return p;
}

/** Lazily loads the static search index; `enabled` defers the request until search is opened. */
export function useSearchIndex(locale: Locale, enabled = true) {
  const [state, setState] = useState<{ docs: SearchDoc[] | null; error: boolean }>({ docs: null, error: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    load(locale)
      .then((docs) => alive && setState({ docs, error: false }))
      .catch(() => alive && setState({ docs: null, error: true }));
    return () => {
      alive = false;
    };
  }, [locale, enabled, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
