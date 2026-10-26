import { Suspense } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { ListSkeleton } from '@/components/listing/ListSkeleton';
import { PublicationArchive } from '@/components/listing/PublicationArchive';
import { SampleNotice } from '@/components/ui/Provenance';
import { publications } from '@/content/publications';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'خبرنامه‌ها و نشریات', en: 'Newsletters and publications' };
const intro = { fa: 'آرشیو خبرنامه‌ها، نشریات علمی دانشجویی، گزارش‌ها و راهنماهای دانشگاه.', en: 'Archive of the university’s newsletters, student journals, reports and guides.' };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/publications', { title: title[locale], description: intro[locale] });
}

export default async function PublicationsPage({ params }: LocaleParams) {
  const { locale } = await params;
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale} />
        <Suspense fallback={<ListSkeleton />}>
          <PublicationArchive items={publications} />
        </Suspense>
      </div>
    </>
  );
}
