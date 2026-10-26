'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { footerLinks, navigation } from '@/content/navigation';
import { useLocale } from '@/i18n/client';
import { localizedPath } from '@/i18n/path';
import { cn } from '@/lib/format';
import { Dialog } from '@/components/ui/Dialog';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

/**
 * Full-site menu. On small screens it is a drawer with one accordion per section; from `lg`
 * up it widens into a panel showing every section at once.
 */
export function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const titleId = useId();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      className="fixed inset-y-0 end-0 start-auto h-dvh w-full max-w-[min(100vw,1100px)] sm:w-[440px] lg:w-[1100px]"
    >
      <div className="flex h-full flex-col bg-surface shadow-[var(--shadow-raised)]">
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
          <h2 id={titleId} className="text-h3 font-bold text-navy">
            {dict.nav.fullMenu}
          </h2>
          <div className="flex items-center gap-2">
            <LanguageSwitcher tone="light" />
            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-[var(--radius-md)] text-navy hover:bg-brand-50"
              aria-label={dict.common.closeMenu}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav aria-label={dict.nav.fullMenu} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:py-8">
          <ul className="divide-y divide-line lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-8 lg:divide-y-0">
            {navigation.map((group) => {
              const isOpen = expanded === group.id;
              const panelId = `${titleId}-${group.id}`;
              return (
                <li key={group.id} className="py-1 lg:py-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 py-3 text-start font-bold text-navy lg:hidden"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? null : group.id)}
                  >
                    {group.label[locale]}
                    <ChevronDown size={18} aria-hidden="true" className={cn('transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  <p className="mb-3 hidden font-bold text-navy lg:block">
                    <Link href={localizedPath(locale, group.href)} className="hover:text-brand">
                      {group.label[locale]}
                    </Link>
                  </p>
                  <div id={panelId} className={cn('pb-3 lg:block lg:pb-0', isOpen ? 'block' : 'hidden')}>
                    {group.columns.map((col) => (
                      <div key={col.title.en} className="mb-3">
                        <p className="mb-1 text-caption font-semibold text-muted">{col.title[locale]}</p>
                        <ul>
                          {col.links.map((link) => {
                            const href = localizedPath(locale, link.href);
                            return (
                              <li key={link.href}>
                                <Link
                                  href={href}
                                  aria-current={pathname === href ? 'page' : undefined}
                                  className={cn(
                                    'block rounded-[var(--radius-sm)] px-2 py-2 text-[0.9375rem] lg:py-1',
                                    pathname === href ? 'bg-brand-50 font-semibold text-brand' : 'text-ink-2 hover:bg-canvas hover:text-brand',
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
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-line pt-6">
            <p className="mb-2 text-caption font-semibold text-muted">{dict.nav.quickLinks}</p>
            <ul className="flex flex-wrap gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizedPath(locale, link.href)}
                    className="inline-block rounded-full border border-line px-3 py-1.5 text-sm text-ink-2 hover:border-brand hover:text-brand"
                  >
                    {link.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </Dialog>
  );
}
