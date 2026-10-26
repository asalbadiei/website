import { Suspense } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { ListSkeleton } from '@/components/listing/ListSkeleton';
import { NewsArchive } from '@/components/listing/NewsArchive';
import { SampleNotice } from '@/components/ui/Provenance';
import { sortedNews } from '@/content/news';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMetadata(locale, '/news', { title: d.home.newsTitle, description: d.home.newsTitle });
}

export default async function NewsPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: d.home.newsTitle }]} title={d.home.newsTitle} />
      <div className="container-site space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale} />
        <Suspense fallback={<ListSkeleton />}>
          <NewsArchive items={sortedNews} />
        </Suspense>
      </div>
    </>
  );
}
