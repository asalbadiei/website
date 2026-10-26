'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { fill } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { cn, formatNumber } from '@/lib/format';
import type { HeroSlide } from '@/content/home';
import { buttonClass } from '@/components/ui/Button';

const INTERVAL = 7000;

/**
 * Accessible carousel: manual prev/next and dots, pause control, auto-rotation that stops for
 * reduced-motion users and while the carousel is hovered or focused.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const { locale, dict } = useLocale();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setPlaying(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!playing || paused) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, paused, index, go]);

  const PrevIcon = locale === 'fa' ? ChevronRight : ChevronLeft;
  const NextIcon = locale === 'fa' ? ChevronLeft : ChevronRight;

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label={dict.home.heroRegion}
      className="relative isolate overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !regionRef.current?.contains(e.relatedTarget as Node) && setPaused(false)}
    >
      <div className="relative h-[460px] sm:h-[480px] lg:h-[520px]">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${formatNumber(i + 1, locale)} / ${formatNumber(slides.length, locale)}`}
              aria-hidden={!active}
              inert={!active}
              className={cn('absolute inset-0 transition-opacity duration-700', active ? 'z-10 opacity-100' : 'z-0 opacity-0')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image.src}
                alt=""
                width={1600}
                height={1000}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-navy-900/95 via-navy-900/75 to-navy-900/20 ltr:bg-gradient-to-r max-md:bg-navy-900/80 max-md:bg-none" />
              <div className="container-site relative flex h-full items-center pb-12">
                <div className="max-w-xl text-white">
                  <p className="mb-3 text-sm font-semibold text-brand-100">{slide.eyebrow[locale]}</p>
                  <h2 className="text-display font-bold">{slide.title[locale]}</h2>
                  <p className="mt-4 max-w-lg text-base leading-8 text-white/85 sm:text-lg">{slide.body[locale]}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href={localizedPath(locale, slide.primary.href)} className={buttonClass('inverse', 'lg')}>
                      {slide.primary.label[locale]}
                    </Link>
                    {slide.secondary ? (
                      <Link href={localizedPath(locale, slide.secondary.href)} className={buttonClass('inverse-outline', 'lg')}>
                        {slide.secondary.label[locale]}
                      </Link>
                    ) : null}
                  </div>
                  <p className="mt-6 text-[0.6875rem] text-white/55">{dict.common.illustrativeNote}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="container-site flex items-center gap-3 pb-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={dict.home.heroPrev}
            className="grid size-10 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
          >
            <PrevIcon size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={dict.home.heroNext}
            className="grid size-10 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
          >
            <NextIcon size={20} aria-hidden="true" />
          </button>
          <ul className="flex items-center gap-1">
            {slides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={fill(dict.home.heroGoTo, { n: formatNumber(i + 1, locale) })}
                  aria-current={i === index ? 'true' : undefined}
                  className="grid h-10 w-8 place-items-center"
                >
                  <span className={cn('block h-1.5 rounded-full transition-all', i === index ? 'w-7 bg-white' : 'w-3 bg-white/45')} />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? dict.home.heroPause : dict.home.heroPlay}
            className="ms-auto grid size-10 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
          >
            {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live={playing && !paused ? 'off' : 'polite'}>
        {slides[index].title[locale]}
      </p>
    </section>
  );
}
