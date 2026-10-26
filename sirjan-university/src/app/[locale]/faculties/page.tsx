import { FacultyCard } from '@/components/content/FacultyCard';
import { PageHeader } from '@/components/content/PageHeader';
import { SampleNotice } from '@/components/ui/Provenance';
import { faculties } from '@/content/faculties';
import { programs } from '@/content/programs';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'دانشکده‌ها و گروه‌های آموزشی', en: 'Faculties and academic groups' };
const intro = {
  fa: 'دانشگاه آزاد اسلامی واحد سیرجان در چهار دانشکده به آموزش و پژوهش می‌پردازد.',
  en: 'Islamic Azad University, Sirjan Branch teaches and conducts research through four faculties.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/faculties', { title: title[locale], description: intro[locale] });
}

export default async function FacultiesPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site space-y-6 py-10 lg:py-14">
        <SampleNotice locale={locale}>{d.faculties.structureNote}</SampleNotice>
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {faculties.map((f) => (
            <li key={f.slug}>
              <FacultyCard faculty={f} locale={locale} programCount={programs.filter((p) => p.faculty === f.slug).length} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
