'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * A value that only exists in the browser (today's date, a status relative to now).
 * Returns `serverValue` during server render and hydration, then the client value, without a
 * setState-in-effect round trip. `read` must return a primitive so snapshots compare equal.
 */
export function useClientValue<T extends string | number | boolean | null>(read: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, read, () => serverValue);
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/** Live `prefers-reduced-motion` preference; `true` on the server so nothing animates before hydration. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  );
}
