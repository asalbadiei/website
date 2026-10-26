import { Suspense } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { DocumentLibrary } from '@/components/listing/DocumentLibrary';
import { ListSkeleton } from '@/components/listing/ListSkeleton';
import { SampleNotice } from '@/components/ui/Provenance';
import { documents } from '@/content/documents';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'فرم‌ها و آیین‌نامه‌ها', en: 'Forms and regulations' };
const intro = { fa: 'فرم‌های آموزشی، پژوهشی، دانشجویی و اداری و آیین‌نامه‌های دانشگاه.', en: 'Academic, research, student and administrative forms, and university regulations.' };
const note = {
  fa: 'فایل‌های رسمی هنوز بارگذاری نشده‌اند؛ به همین دلیل دکمه‌های دریافت غیرفعال‌اند و هیچ پیوند ساختگی نمایش داده نمی‌شود.',
  en: 'Official files have not been uploaded yet, so download buttons are disabled and no placeholder links are shown.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/forms', { title: title[locale], description: intro[locale] });
}

export default async function FormsPage({ params }: LocaleParams) {
  const { locale } = await params;
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site max-w-5xl space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale}>{note[locale]}</SampleNotice>
        <Suspense fallback={<ListSkeleton />}>
          <DocumentLibrary items={documents} />
        </Suspense>
      </div>
    </>
  );
}
