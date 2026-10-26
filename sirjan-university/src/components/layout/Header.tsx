'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { localizedPath } from '@/i18n/path';
import { MenuDrawer } from '@/components/navigation/MenuDrawer';
import { SearchOverlay } from '@/components/navigation/SearchOverlay';
import { cn } from '@/lib/format';
import { Emblem } from './Logo';
import { LanguageMenu } from './LanguageMenu';

export function Header() {
  const { locale, dict } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // "/" opens search from anywhere except text fields.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
      e.preventDefault();
      setSearchOpen(true);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // A hairline and soft shadow appear once the page scrolls under the sticky header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b bg-canvas/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300',
          scrolled ? 'border-line shadow-[0_8px_24px_-20px_rgb(28_68_176/0.5)]' : 'border-transparent',
        )}
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="group inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full px-2.5 transition-colors duration-300 hover:bg-brand-50"
              aria-label={dict.common.openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
                <span className="h-0.5 w-full rounded-full bg-navy transition-colors group-hover:bg-brand" />
                <span className="h-0.5 w-2/3 rounded-full bg-navy transition-all duration-300 group-hover:w-full group-hover:bg-brand" />
              </span>
              <span aria-hidden="true" className="hidden text-sm font-bold text-navy transition-colors group-hover:text-brand lg:inline">
                {dict.common.menu}
              </span>
            </button>
            <Link href={localizedPath(locale, '/')} className="flex min-w-0 items-center gap-3" aria-label={`${dict.brand.name} — ${dict.common.home}`}>
              <Emblem className="size-12 shrink-0 transition-transform duration-500 hover:scale-105" />
              <span className="hidden min-w-0 leading-tight sm:block">
                <span className="block truncate text-[0.95rem] font-extrabold text-navy">{dict.brand.shortName}</span>
                <span lang={locale === 'fa' ? 'en' : 'fa'} className="block truncate text-xs text-muted">
                  {dict.brand.altName}
                </span>
              </span>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-11 place-items-center rounded-full text-brand transition-colors duration-300 hover:bg-brand-50"
              aria-label={dict.common.search}
              aria-haspopup="dialog"
              title={dict.search.shortcut}
            >
              <Search size={24} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <LanguageMenu />
          </div>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
