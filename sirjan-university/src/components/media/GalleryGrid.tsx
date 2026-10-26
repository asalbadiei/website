'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { fill } from '@/i18n';
import { cn, formatNumber } from '@/lib/format';
import type { ImageRef } from '@/types/content';
import { Dialog } from '@/components/ui/Dialog';

export type GalleryImage = ImageRef & { caption?: string };

/** Responsive image grid with a keyboard-operable lightbox (arrows, Home/End, Escape). */
export function GalleryGrid({ images, columns = 'sm:grid-cols-2 lg:grid-cols-4', featureFirst = false }: { images: GalleryImage[]; columns?: string; featureFirst?: boolean }) {
  const { locale, dict } = useLocale();
  const [open, setOpen] = useState<number | null>(null);
  const total = images.length;

  const step = useCallback((delta: number) => setOpen((i) => (i === null ? i : (i + delta + total) % total)), [total]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      const forward = locale === 'fa' ? 'ArrowLeft' : 'ArrowRight';
      const backward = locale === 'fa' ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === forward) step(1);
      else if (e.key === backward) step(-1);
      else if (e.key === 'Home') setOpen(0);
      else if (e.key === 'End') setOpen(total - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step, locale, total]);

  const PrevIcon = locale === 'fa' ? ChevronRight : ChevronLeft;
  const NextIcon = locale === 'fa' ? ChevronLeft : ChevronRight;
  const current = open === null ? null : images[open];

  return (
    <>
      <ul className={cn('grid grid-cols-2 gap-3 sm:gap-4', columns)}>
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`} className={cn(featureFirst && i === 0 && 'col-span-2 row-span-2')}>
            <figure className="flex h-full flex-col">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block aspect-[4/3] w-full flex-1 overflow-hidden rounded-[var(--radius-lg)] bg-brand-100"
                aria-label={fill(dict.media.openImage, { n: formatNumber(i + 1, locale) })}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt[locale]} loading="lazy" decoding="async" width={1600} height={1000} className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/20" />
                <span className="absolute end-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand size={15} aria-hidden="true" />
                </span>
                {img.illustrative ? (
                  <span className="absolute bottom-2 start-2 rounded-[var(--radius-sm)] bg-navy/75 px-1.5 py-0.5 text-[0.6875rem] text-white">{dict.common.illustrative}</span>
                ) : null}
              </button>
              {img.caption ? <figcaption className="mt-2 text-sm text-ink-2">{img.caption}</figcaption> : null}
            </figure>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onClose={() => setOpen(null)} label={dict.media.lightbox} className="fixed inset-0 h-dvh w-full">
        {current ? (
          <div className="flex h-full flex-col bg-navy-900/95 text-white" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm" aria-live="polite">
                {fill(dict.media.imageOf, { n: formatNumber((open ?? 0) + 1, locale), total: formatNumber(total, locale) })}
              </p>
              <button type="button" data-autofocus onClick={() => setOpen(null)} aria-label={dict.common.close} className="grid size-10 place-items-center rounded-full hover:bg-white/10">
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-14 pb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={current.alt[locale]} className="max-h-full max-w-full rounded-[var(--radius-md)] object-contain" />
              <figcaption className="text-center text-sm text-white/80">
                {current.caption ?? current.alt[locale]}
                {current.illustrative ? <span className="block text-xs text-white/55">{dict.common.illustrativeNote}</span> : null}
              </figcaption>
              {total > 1 ? (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label={dict.media.prevImage} className="absolute start-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                    <PrevIcon size={22} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label={dict.media.nextImage} className="absolute end-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                    <NextIcon size={22} aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </figure>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
