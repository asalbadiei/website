'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { localeConfig, locales } from '@/i18n/config';
import { switchLocalePath } from '@/i18n/path';
import { cn } from '@/lib/format';

/** Header language picker: "فارسی ⌄" opening a small menu of languages (same page in each). */
export function LanguageMenu() {
  const { locale, dict } = useLocale();
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${dict.common.language}: ${localeConfig[locale].label}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-navy transition-colors duration-300 hover:bg-brand-50 hover:text-brand"
      >
        <Languages size={20} strokeWidth={1.75} aria-hidden="true" className="text-brand" />
        <span>{localeConfig[locale].label}</span>
        <ChevronDown size={16} aria-hidden="true" className={cn('transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <ul
        id={id}
        hidden={!open}
        className="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface p-1 shadow-[var(--shadow-raised)]"
      >
        {locales.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <Link
                href={switchLocalePath(pathname, l)}
                hrefLang={localeConfig[l].htmlLang}
                lang={localeConfig[l].htmlLang}
                aria-current={current ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors',
                  current ? 'bg-brand-50 font-bold text-brand' : 'text-ink-2 hover:bg-canvas hover:text-brand',
                )}
              >
                {localeConfig[l].label}
                {current ? <Check size={15} aria-hidden="true" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
