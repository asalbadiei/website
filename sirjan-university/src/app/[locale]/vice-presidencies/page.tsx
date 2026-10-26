import { PageHeader } from '@/components/content/PageHeader';
import { UnitGrid } from '@/components/content/UnitGrid';
import { SampleNotice } from '@/components/ui/Provenance';
import { vicePresidencies } from '@/content/units';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'معاونت‌ها', en: 'Vice-Presidencies' };
const intro = { fa: 'معاونت‌های دانشگاه و حوزه‌های مسئولیت هر یک.', en: 'The university’s vice-presidencies and their areas of responsibility.' };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/vice-presidencies', { title: title[locale], description: intro[locale] });
}

export default async function VicePresidenciesPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale}>{d.people.privacyNote}</SampleNotice>
        <UnitGrid units={vicePresidencies} base="/vice-presidencies" locale={locale} />
      </div>
    </>
  );
}
