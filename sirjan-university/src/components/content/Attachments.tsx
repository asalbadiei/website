import { FileText } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import type { Attachment } from '@/types/content';
import { FileAction } from './FileAction';

export function Attachments({ items, locale }: { items: Attachment[]; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section aria-labelledby="attachments-title" className="mt-10">
      <h2 id="attachments-title" className="mb-3 text-h3 font-bold text-navy">
        {dict.common.attachments}
      </h2>
      <ul className="divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-surface">
        {items.map((a) => (
          <li key={a.title.en} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <span className="flex items-center gap-3">
              <FileText size={20} aria-hidden="true" className="text-brand" />
              <span>
                <span className="block font-semibold text-navy">{a.title[locale]}</span>
                <span className="text-caption uppercase text-muted">{a.fileType}</span>
              </span>
            </span>
            <FileAction href={a.href} locale={locale} />
          </li>
        ))}
      </ul>
    </section>
  );
}
