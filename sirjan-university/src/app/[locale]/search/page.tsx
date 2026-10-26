import { Suspense } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { ListSkeleton } from '@/components/listing/ListSkeleton';
import { SearchPageClient } from '@/components/listing/SearchPageClient';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return { ...pageMetadata(locale, '/search', { title: d.search.title }), robots: { index: false, follow: true } };
}

export default async function SearchPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: d.common.search }]} title={d.search.title} />
      <div className="container-site max-w-4xl py-10 lg:py-14">
        <Suspense fallback={<ListSkeleton />}>
          <SearchPageClient />
        </Suspense>
      </div>
    </>
  );
}
