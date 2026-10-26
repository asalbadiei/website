import { Suspense } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { ListSkeleton } from '@/components/listing/ListSkeleton';
import { ProgramDirectory } from '@/components/listing/ProgramDirectory';
import { SampleNotice } from '@/components/ui/Provenance';
import { programs } from '@/content/programs';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'رشته‌های تحصیلی', en: 'Academic programmes' };
const intro = {
  fa: 'رشته‌ها را بر اساس دانشکده، گروه آموزشی، مقطع و حوزه تحصیلی جستجو و فیلتر کنید.',
  en: 'Search and filter programmes by faculty, academic group, degree level and field of study.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/programs', { title: title[locale], description: intro[locale] });
}

export default async function ProgramsPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale}>
          {d.common.sampleNotice} {d.programs.applyNote}
        </SampleNotice>
        <Suspense fallback={<ListSkeleton />}>
          <ProgramDirectory items={programs} />
        </Suspense>
      </div>
    </>
  );
}
