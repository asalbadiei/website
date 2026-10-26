'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/i18n/client';
import { formatNumber } from '@/lib/format';

const DURATION = 1300;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts quickly from 0 to `value` the first time it is on screen (on load for the stats band).
 * The final value is server-rendered, so it is correct without JavaScript; reduced-motion users
 * see it immediately. Screen readers always get the final value.
 */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { locale } = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setCurrent(0);
    let frame = 0;
    const run = () => {
      // Start from the first frame's own timestamp: rAF times can precede performance.now().
      let start: number | null = null;
      const tick = (now: number) => {
        start ??= now;
        const t = Math.min(1, Math.max(0, (now - start) / DURATION));
        setCurrent(Math.round(easeOutExpo(t) * value));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {formatNumber(current, locale)}
        {suffix}
      </span>
      <span className="sr-only">
        {formatNumber(value, locale)}
        {suffix}
      </span>
    </span>
  );
}
