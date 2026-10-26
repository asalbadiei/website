'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { navigation } from '@/content/navigation';
import { useLocale } from '@/i18n/client';
import { isActivePath, localizedPath } from '@/i18n/path';
import { cn } from '@/lib/format';

/**
 * Desktop navigation: one disclosure button per section that opens a full-width panel.
 * Escape closes and returns focus, clicking outside closes, and route changes close.
 */
export function MegaMenu() {
  const { locale, dict } = useLocale();
  const pathname = usePathname() || '';
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const baseId = useId();

  const close = useCallback((returnFocus = false) => {
    setOpen((current) => {
      if (returnFocus && current) triggers.current[current]?.focus();
      return null;
    });
  }, []);

  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close(true);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, close]);

  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = locale === 'fa' ? 'ArrowLeft' : 'ArrowRight';
    const backward = locale === 'fa' ? 'ArrowRight' : 'ArrowLeft';
    const ids = navigation.map((g) => g.id);
    if (e.key === forward || e.key === backward) {
      e.preventDefault();
      const next = (index + (e.key === forward ? 1 : -1) + ids.length) % ids.length;
      triggers.current[ids[next]]?.focus();
      if (open) setOpen(ids[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(ids[index]);
      requestAnimationFrame(() => {
        document.getElementById(`${baseId}-${ids[index]}`)?.querySelector<HTMLElement>('a')?.focus();
      });
    }
  };

  return (
    <nav ref={navRef} aria-label={dict.nav.primary} className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {navigation.map((group, index) => {
          const active = group.columns.some((c) => c.links.some((l) => isActivePath(pathname, localizedPath(locale, l.href.split(/[?#]/)[0]))));
          const expanded = open === group.id;
          return (
            <li key={group.id}>
              <button
                ref={(el) => {
                  triggers.current[group.id] = el;
                }}
                type="button"
                aria-expanded={expanded}
                aria-controls={`${baseId}-${group.id}`}
                onClick={() => setOpen(expanded ? null : group.id)}
                onKeyDown={(e) => onTriggerKey(e, index)}
                className={cn(
                  'relative inline-flex h-10 items-center gap-1 rounded-[var(--radius-md)] px-3 text-[0.9375rem] font-semibold transition-colors',
                  expanded ? 'bg-brand-50 text-brand' : 'text-ink hover:bg-brand-50 hover:text-brand',
                  active && !expanded && 'text-brand after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:bg-brand',
                )}
              >
                {group.label[locale]}
                <ChevronDown size={16} aria-hidden="true" className={cn('transition-transform', expanded && 'rotate-180')} />
              </button>
              <div
                id={`${baseId}-${group.id}`}
                hidden={!expanded}
                className="absolute inset-x-0 top-full border-y border-line bg-surface shadow-[var(--shadow-raised)]"
              >
                <div className="container-site grid grid-cols-12 gap-8 py-8">
                  <div className="col-span-4 border-e border-line pe-8">
                    <p className="text-h3 font-bold text-navy">{group.label[locale]}</p>
                    <p className="mt-2 text-sm text-muted">{group.intro[locale]}</p>
                    <Link
                      href={localizedPath(locale, group.href)}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600"
                    >
                      {dict.common.viewAll}
                      <ArrowRight size={16} aria-hidden="true" className="flip-rtl" />
                    </Link>
                  </div>
                  <div className="col-span-8 grid grid-cols-2 gap-8">
                    {group.columns.map((col) => (
                      <div key={col.title.en}>
                        <p className="mb-3 text-caption font-bold text-muted">
                          {col.href ? (
                            <Link className="hover:text-brand" href={localizedPath(locale, col.href)}>
                              {col.title[locale]}
                            </Link>
                          ) : (
                            col.title[locale]
                          )}
                        </p>
                        <ul className="space-y-1">
                          {col.links.map((link) => {
                            const href = localizedPath(locale, link.href);
                            const current = pathname === href;
                            return (
                              <li key={link.href}>
                                <Link
                                  href={href}
                                  aria-current={current ? 'page' : undefined}
                                  className={cn(
                                    'block rounded-[var(--radius-sm)] px-2 py-1.5 text-[0.9375rem] transition-colors',
                                    current ? 'bg-brand-50 font-semibold text-brand' : 'text-ink-2 hover:bg-canvas hover:text-brand',
                                  )}
                                >
                                  {link.label[locale]}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
