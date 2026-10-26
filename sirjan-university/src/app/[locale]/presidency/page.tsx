import { PageHeader } from '@/components/content/PageHeader';
import { UnitGrid } from '@/components/content/UnitGrid';
import { SampleNotice } from '@/components/ui/Provenance';
import { presidencyUnits } from '@/content/units';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'حوزه ریاست', en: 'University Presidency' };
const intro = { fa: 'ریاست واحد و ادارات کل و دفاتر وابسته به حوزه ریاست.', en: 'The President of the Branch and the directorates and offices reporting to the Presidency.' };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/presidency', { title: title[locale], description: intro[locale] });
}

export default async function PresidencyPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale}>{d.people.privacyNote}</SampleNotice>
        <UnitGrid units={presidencyUnits} base="/presidency" locale={locale} />
      </div>
    </>
  );
}
