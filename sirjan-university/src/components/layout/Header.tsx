'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { localizedPath } from '@/i18n/path';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { MenuDrawer } from '@/components/navigation/MenuDrawer';
import { SearchOverlay } from '@/components/navigation/SearchOverlay';
import { Emblem } from './Logo';
import { HeaderDate } from './HeaderDate';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { locale, dict } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <>
      <div className="bg-navy-900 text-[0.8125rem] text-white/85">
        <div className="container-site flex h-9 items-center justify-between gap-4">
          <HeaderDate />
          <div className="flex items-center gap-1">
            <Link href={localizedPath(locale, '/systems')} className="hidden rounded-[var(--radius-sm)] px-2 py-1 hover:bg-white/10 hover:text-white sm:inline-block">
              {dict.nav.systems}
            </Link>
            <Link href={localizedPath(locale, '/contact')} className="hidden rounded-[var(--radius-sm)] px-2 py-1 hover:bg-white/10 hover:text-white sm:inline-block">
              {dict.footer.contact}
            </Link>
            <span aria-hidden="true" className="mx-1 hidden h-4 w-px bg-white/25 sm:block" />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/90">
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href={localizedPath(locale, '/')} className="flex min-w-0 items-center gap-3" aria-label={`${dict.brand.name} — ${dict.common.home}`}>
            <Emblem className="size-11 shrink-0" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[0.95rem] font-bold text-navy sm:text-base">{dict.brand.name}</span>
              <span lang={locale === 'fa' ? 'en' : 'fa'} className="hidden truncate text-xs text-muted sm:block">
                {dict.brand.altName}
              </span>
            </span>
          </Link>

          <MegaMenu />

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-[var(--radius-md)] text-navy hover:bg-brand-50 hover:text-brand"
              aria-label={dict.common.search}
              aria-haspopup="dialog"
              title={dict.search.shortcut}
            >
              <Search size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] px-2.5 text-navy hover:bg-brand-50 hover:text-brand"
              aria-label={dict.common.openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Menu size={22} aria-hidden="true" />
              <span className="hidden text-sm font-semibold xl:inline">{dict.common.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
