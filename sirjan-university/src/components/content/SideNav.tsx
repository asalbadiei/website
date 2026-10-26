import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/path';
import { cn } from '@/lib/format';

/** Contextual section navigation shown beside internal pages. */
export function SideNav({
  locale,
  title,
  items,
  current,
}: {
  locale: Locale;
  title: string;
  items: { label: string; href: string }[];
  current: string;
}) {
  return (
    <nav aria-label={title} className="card p-2">
      <p className="px-3 pt-2 pb-1 text-caption font-bold text-muted">{title}</p>
      <ul>
        {items.map((item) => {
          const active = item.href === current;
          return (
            <li key={item.href}>
              <Link
                href={localizedPath(locale, item.href)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'block rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors',
                  active ? 'bg-brand-50 font-semibold text-brand' : 'text-ink-2 hover:bg-canvas hover:text-brand',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
