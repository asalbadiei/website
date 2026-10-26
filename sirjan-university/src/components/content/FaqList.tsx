import { ChevronDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { FaqItem } from '@/types/content';

/** Native <details> accordion: keyboard and screen-reader support without JavaScript. */
export function FaqList({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  return (
    <div className="divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-surface">
      {items.map((f) => (
        <details key={f.q.en} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-navy hover:text-brand sm:p-5 [&::-webkit-details-marker]:hidden">
            {f.q[locale]}
            <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-4 pb-5 text-ink-2 sm:px-5">{f.a[locale]}</p>
        </details>
      ))}
    </div>
  );
}
