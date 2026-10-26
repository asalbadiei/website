'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/format';

/** Footer link plus a floating button that appears after scrolling. Focus moves to the skip target. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('top')?.focus({ preventScroll: true });
  };

  return (
    <>
      <button type="button" onClick={toTop} className="inline-flex items-center gap-1 hover:text-white hover:underline">
        <ArrowUp size={14} aria-hidden="true" />
        {label}
      </button>
      <button
        type="button"
        onClick={toTop}
        aria-label={label}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={cn(
          'fixed bottom-5 end-5 z-30 grid size-11 place-items-center rounded-full bg-brand text-white shadow-[var(--shadow-raised)] transition-all hover:bg-brand-600',
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </>
  );
}
