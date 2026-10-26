'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Reveals every `[data-reveal]` element once it scrolls into view (see globals.css).
 * New elements added later (client-side lists, route changes) are picked up too.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = (el: Element) => el.classList.add('is-visible');

    if (reduce || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const watch = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
    };
    watch(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('[data-reveal]:not(.is-visible)')) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
