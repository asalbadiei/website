import Link from 'next/link';
import { AlertCircle, Paperclip } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { dateParts, formatDate, cn } from '@/lib/format';
import type { Announcement } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { ProvenanceBadge } from '@/components/ui/Provenance';

/** Notice row with a date block. Urgency is shown by a red rule, an icon and a text label. */
export function AnnouncementItem({ item, locale, headingLevel = 3 }: { item: Announcement; locale: Locale; headingLevel?: 2 | 3 }) {
  const dict = getDictionary(locale);
  const parts = dateParts(item.date, locale);
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article
      className={cn(
        'group relative flex gap-4 rounded-[var(--radius-lg)] border border-line bg-surface p-4 transition-colors hover:border-brand-100 sm:p-5',
        item.urgent && 'border-s-4 border-s-accent',
      )}
    >
      <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-[var(--radius-md)] bg-brand-50 py-2 text-center">
        <span className="text-xl font-bold leading-none text-brand">{parts.day}</span>
        <span className="mt-1 text-[0.6875rem] text-ink-2">{parts.month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          {item.urgent ? (
            <Badge tone="accent">
              <AlertCircle size={12} aria-hidden="true" />
              {dict.common.urgent}
            </Badge>
          ) : null}
          <Badge>{dict.announcements.categories[item.category]}</Badge>
          {item.attachments?.length ? (
            <span className="inline-flex items-center gap-1 text-caption text-muted">
              <Paperclip size={13} aria-hidden="true" />
              {dict.announcements.hasAttachment}
            </span>
          ) : null}
          <ProvenanceBadge provenance={item.provenance} locale={locale} />
        </div>
        <H className="font-bold leading-7 text-navy group-hover:text-brand">
          <Link href={localizedPath(locale, `/announcements/${item.slug}`)} className="after:absolute after:inset-0">
            {item.title[locale]}
          </Link>
        </H>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{item.excerpt[locale]}</p>
        <time dateTime={item.date} className="sr-only">
          {formatDate(item.date, locale)}
        </time>
      </div>
    </article>
  );
}
