import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { formatDate } from '@/lib/format';
import type { NewsItem } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { ProvenanceBadge } from '@/components/ui/Provenance';
import { ImageFrame } from './ImageFrame';

export function NewsCard({ item, locale, headingLevel = 3 }: { item: NewsItem; locale: Locale; headingLevel?: 2 | 3 }) {
  const dict = getDictionary(locale);
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article className="card card-link group relative flex h-full flex-col overflow-hidden">
      <ImageFrame image={item.image} locale={locale} />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="brand">{dict.news.categories[item.category]}</Badge>
          <ProvenanceBadge provenance={item.provenance} locale={locale} />
        </div>
        <H className="text-h3 font-bold text-navy group-hover:text-brand">
          <Link href={localizedPath(locale, `/news/${item.slug}`)} className="after:absolute after:inset-0">
            {item.title[locale]}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{item.summary[locale]}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-caption text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} aria-hidden="true" />
            <time dateTime={item.event?.start ?? item.date}>{formatDate(item.event?.start ?? item.date, locale)}</time>
          </span>
          {item.event ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" />
              {item.event.venue[locale]}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
