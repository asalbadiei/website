'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { fill } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { cn, formatNumber, formatWeekdayDate } from '@/lib/format';
import { useClientValue, usePrefersReducedMotion } from '@/lib/use-client-value';
import type { HeroSlide } from '@/content/home';

const INTERVAL = 7000;

/**
 * Homepage hero: a large rounded card with a notch in its top corner that holds today's date.
 * Slides cross-fade; rotation pauses on hover/focus, has a pause control, and never runs for
 * reduced-motion users. When `photo` is set, every slide uses that campus photograph.
 */
export function Hero({ slides, photo }: { slides: HeroSlide[]; photo?: { src: string; alt: string } }) {
  const { locale, dict } = useLocale();
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  // null until the visitor presses play/pause; reduced-motion visitors start paused but may still play.
  const [choice, setChoice] = useState<boolean | null>(null);
  const [paused, setPaused] = useState(false);
  const today = useClientValue(() => formatWeekdayDate(new Date(), locale), '');
  const regionRef = useRef<HTMLElement>(null);
  const playing = choice ?? !reduceMotion;

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!playing || paused || slides.length < 2) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, paused, index, go, slides.length]);

  // Inverted-corner pieces that round the notch into the card (see globals.css .hero-notch-corner).
  const notch = { '--notch-r': '34px' } as CSSProperties;

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label={dict.home.heroRegion}
      className="container-site pt-2 sm:pt-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !regionRef.current?.contains(e.relatedTarget as Node) && setPaused(false)}
    >
      <div className="relative" style={notch}>
        <div className="hero-card relative isolate h-[460px] overflow-hidden rounded-[32px] bg-navy sm:h-[540px] sm:rounded-[var(--radius-hero)] lg:h-[620px]">
          {slides.map((slide, i) => {
            const active = i === index;
            const src = photo?.src ?? slide.image.src;
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${formatNumber(i + 1, locale)} / ${formatNumber(slides.length, locale)}`}
                aria-hidden={!active}
                inert={!active}
                className={cn('absolute inset-0 transition-opacity duration-[1200ms] ease-out', active ? 'z-10 opacity-100' : 'z-0 opacity-0')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  width={1600}
                  height={1000}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  className={cn('absolute inset-0 size-full object-cover transition-transform duration-[8000ms] ease-out', active ? 'scale-105' : 'scale-100')}
                />
                {/* Blue tint, then a dark wash behind the text corner. */}
                <div className="absolute inset-0 bg-brand-2/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[radial-gradient(150%_115%_at_0%_100%,rgb(10_26_74/0.95)_0%,rgb(10_26_74/0.7)_45%,transparent_80%)] ltr:bg-[radial-gradient(150%_115%_at_100%_100%,rgb(10_26_74/0.95)_0%,rgb(10_26_74/0.7)_45%,transparent_80%)] max-sm:bg-[linear-gradient(to_top,rgb(10_26_74/0.92),rgb(10_26_74/0.35)_65%,transparent)]" />

                <div className="absolute inset-x-6 bottom-20 sm:inset-x-auto sm:end-12 sm:bottom-20 lg:end-20 lg:bottom-24">
                  <div className={cn('max-w-[48rem] text-white transition-all duration-700 ease-out', active ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0')}>
                    <p className="text-lg font-bold text-white/90 sm:text-2xl">{slide.eyebrow[locale]}</p>
                    <h2 className="mt-2 text-[2rem] leading-tight font-black sm:text-5xl lg:text-6xl">{slide.title[locale]}</h2>
                    <Link
                      href={localizedPath(locale, slide.primary.href)}
                      className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-brand"
                    >
                      {slide.primary.label[locale]}
                      <ArrowUpRight size={17} aria-hidden="true" className="flip-rtl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Slide controls */}
          <div className="absolute start-6 bottom-6 z-20 flex items-center gap-1 rounded-full bg-navy-900/35 p-1 backdrop-blur-sm sm:start-10 sm:bottom-8">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={fill(dict.home.heroGoTo, { n: formatNumber(i + 1, locale) })}
                aria-current={i === index ? 'true' : undefined}
                className="grid h-8 w-7 place-items-center"
              >
                <span className={cn('block h-1.5 rounded-full transition-all duration-500', i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80')} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setChoice(!playing)}
              aria-label={playing ? dict.home.heroPause : dict.home.heroPlay}
              className="grid size-8 place-items-center rounded-full text-white transition-colors hover:bg-white/15"
            >
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            </button>
          </div>

          {!photo ? (
            <span className="absolute start-6 top-6 z-20 rounded-full bg-navy-900/45 px-2.5 py-1 text-[0.6875rem] text-white/85 backdrop-blur-sm sm:start-10 sm:top-8">
              {dict.common.illustrative}
            </span>
          ) : null}
        </div>

        {/* Notch holding today's date */}
        <div className="absolute end-0 top-0 z-20 flex h-[58px] w-[170px] items-center justify-center rounded-es-[var(--notch-r)] bg-canvas sm:h-[78px] sm:w-[260px]">
          <p className="text-center text-xs font-bold text-navy sm:text-sm">
            <span className="sr-only">{dict.common.today}: </span>
            <span>{today || ' '}</span>
          </p>
          <span aria-hidden="true" className="hero-notch-corner absolute end-full top-0" />
          <span aria-hidden="true" className="hero-notch-corner absolute end-0 top-full" />
        </div>
      </div>
      <p className="sr-only" aria-live={playing && !paused ? 'off' : 'polite'}>
        {slides[index].title[locale]}
      </p>
    </section>
  );
}
