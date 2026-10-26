'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { navigation } from '@/content/navigation';
import { useLocale } from '@/i18n/client';
import { fill } from '@/i18n';
import { isActivePath, localizedPath } from '@/i18n/path';
import { cn } from '@/lib/format';
import { Dialog } from '@/components/ui/Dialog';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

/**
 * Full-site menu: a drawer that slides in from the reading-start edge (right in Persian), with
 * every section stacked. Each section title links to its landing page; a separate +/− button
 * opens or closes its submenu, and all submenus start closed.
 */
export function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, dict } = useLocale();
  const pathname = usePathname() || '';
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const titleId = useId();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      keepMounted
      className="fixed inset-y-0 start-0 end-auto h-dvh w-full sm:w-[420px]"
    >
      <div className="drawer-panel flex h-full flex-col bg-surface shadow-[var(--shadow-raised)]">
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-5">
          <h2 id={titleId} className="text-h3 font-extrabold text-navy">
            {dict.common.menu}
          </h2>
          <div className="flex items-center gap-1">
            <LanguageSwitcher tone="light" />
            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-full text-navy transition-colors duration-300 hover:bg-brand-50 hover:text-brand"
              aria-label={dict.common.closeMenu}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav aria-label={dict.nav.fullMenu} className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {navigation.map((group) => {
              const isOpen = expanded.has(group.id);
              const panelId = `${titleId}-${group.id}`;
              const groupActive = group.columns.some((c) => c.links.some((l) => isActivePath(pathname, localizedPath(locale, l.href.split(/[?#]/)[0]))));
              return (
                <li key={group.id} className={cn('rounded-[var(--radius-md)] transition-colors duration-300', isOpen && 'bg-canvas')}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={localizedPath(locale, group.href)}
                      className={cn(
                        'flex min-h-12 flex-1 items-center gap-3 rounded-[var(--radius-md)] px-3 text-base font-bold transition-colors duration-300 hover:text-brand',
                        groupActive ? 'text-brand' : 'text-navy',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn('size-1.5 shrink-0 rounded-full transition-colors', groupActive ? 'bg-accent' : 'bg-brand-200')}
                      />
                      {group.label[locale]}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-label={fill(dict.nav.submenu, { name: group.label[locale] })}
                      onClick={() => toggle(group.id)}
                      className={cn(
                        'grid size-10 shrink-0 place-items-center rounded-full transition-all duration-300',
                        isOpen ? 'bg-brand text-white' : 'bg-brand-50 text-brand hover:bg-brand-100',
                      )}
                    >
                      <Plus size={18} aria-hidden="true" className={cn('transition-transform duration-300', isOpen && 'rotate-45')} />
                    </button>
                  </div>

                  {/* Height animates via grid rows; closed panels are inert so their links can't be focused. */}
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={cn('grid transition-[grid-template-rows] duration-300 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 px-3 pt-1 pb-4">
                        {group.columns.map((col) => (
                          <div key={col.title.en}>
                            <p className="mb-1 ps-5 text-caption font-semibold text-muted">{col.title[locale]}</p>
                            <ul className="ms-[0.6875rem] border-s-2 border-brand-100">
                              {col.links.map((link) => {
                                const href = localizedPath(locale, link.href);
                                const current = pathname === href;
                                return (
                                  <li key={link.href}>
                                    <Link
                                      href={href}
                                      aria-current={current ? 'page' : undefined}
                                      className={cn(
                                        '-ms-0.5 block border-s-2 py-2 ps-4 pe-2 text-[0.9375rem] transition-colors duration-300',
                                        current ? 'border-accent font-bold text-brand' : 'border-transparent text-ink-2 hover:border-brand-2 hover:text-brand',
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
      </div>
    </Dialog>
  );
}
