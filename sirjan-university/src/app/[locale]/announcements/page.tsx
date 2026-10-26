import { Suspense } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { AnnouncementArchive } from '@/components/listing/AnnouncementArchive';
import { ListSkeleton } from '@/components/listing/ListSkeleton';
import { SampleNotice } from '@/components/ui/Provenance';
import { sortedAnnouncements } from '@/content/announcements';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMetadata(locale, '/announcements', { title: d.home.announcementsTitle });
}

export default async function AnnouncementsPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: d.home.announcementsTitle }]} title={d.home.announcementsTitle} />
      <div className="container-site max-w-5xl space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale} />
        <Suspense fallback={<ListSkeleton />}>
          <AnnouncementArchive items={sortedAnnouncements} />
        </Suspense>
      </div>
    </>
  );
}
