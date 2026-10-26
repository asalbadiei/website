import { notFound } from 'next/navigation';
import { AlertCircle, CalendarDays } from 'lucide-react';
import { AnnouncementItem } from '@/components/content/AnnouncementItem';
import { Attachments } from '@/components/content/Attachments';
import { PageHeader } from '@/components/content/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { ProvenanceBadge, SampleNotice } from '@/components/ui/Provenance';
import { announcements, getAnnouncement, sortedAnnouncements } from '@/content/announcements';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { formatDate } from '@/lib/format';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => announcements.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const item = getAnnouncement(slug);
  if (!item) return {};
  return pageMetadata(locale, `/announcements/${slug}`, { title: item.title[locale], description: item.excerpt[locale], type: 'article' });
}

export default async function AnnouncementDetail({ params }: Props) {
  const { locale, slug } = await params;
  const item = getAnnouncement(slug);
  if (!item) notFound();
  const d = getDictionary(locale);
  const more = sortedAnnouncements.filter((a) => a.slug !== slug).slice(0, 3);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: d.home.announcementsTitle, href: '/announcements' }, { label: item.title[locale] }]}
        title={item.title[locale]}
        meta={
          <>
            {item.urgent ? (
              <Badge tone="accent">
                <AlertCircle size={12} aria-hidden="true" />
                {d.common.urgent}
              </Badge>
            ) : null}
            <Badge>{d.announcements.categories[item.category]}</Badge>
            <ProvenanceBadge provenance={item.provenance} locale={locale} />
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} aria-hidden="true" />
              <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
            </span>
          </>
        }
      />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <div className="lg:col-span-8">
          {item.provenance === 'sample' ? (
            <div className="mb-6">
              <SampleNotice locale={locale} />
            </div>
          ) : null}
          <p className="mb-6 text-lg leading-8 font-semibold text-ink">{item.excerpt[locale]}</p>
          <div className="prose-site">
            {item.body.map((p) => (
              <p key={p.en}>{p[locale]}</p>
            ))}
          </div>
          {item.attachments?.length ? <Attachments items={item.attachments} locale={locale} /> : null}
        </div>
        <aside className="lg:col-span-4" aria-labelledby="more-notices">
          <h2 id="more-notices" className="mb-4 text-h3 font-bold text-navy">
            {d.home.announcementsAll}
          </h2>
          <ul className="space-y-3">
            {more.map((a) => (
              <li key={a.slug}>
                <AnnouncementItem item={a} locale={locale} />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
