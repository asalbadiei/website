import { Suspense } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { ListSkeleton } from '@/components/listing/ListSkeleton';
import { PeopleDirectory } from '@/components/listing/PeopleDirectory';
import { SampleNotice } from '@/components/ui/Provenance';
import { people } from '@/content/people';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'فهرست افراد', en: 'People directory' };
const intro = { fa: 'مسئولان واحدها و دانشکده‌ها را بر اساس سمت یا واحد جستجو کنید.', en: 'Find office holders in the university’s offices and faculties by position or unit.' };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/people', { title: title[locale], description: intro[locale] });
}

export default async function PeoplePage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale}>{d.people.privacyNote}</SampleNotice>
        <Suspense fallback={<ListSkeleton />}>
          <PeopleDirectory items={people} />
        </Suspense>
      </div>
    </>
  );
}
