import { UnitPage } from '@/components/content/UnitPage';
import { NewsCard } from '@/components/content/NewsCard';
import { innovationHouse } from '@/content/units';
import { sortedNews } from '@/content/news';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/innovation', { title: innovationHouse.name[locale], description: innovationHouse.summary[locale] });
}

export default async function InnovationPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const related = sortedNews.filter((n) => n.category === 'research' || n.category === 'event').slice(0, 2);
  return (
    <UnitPage
      unit={innovationHouse}
      locale={locale}
      route="/innovation"
      crumbs={[{ label: locale === 'fa' ? 'پژوهش و نوآوری' : 'Research & Innovation', href: '/vice-presidencies/research-technology' }, { label: innovationHouse.name[locale] }]}
      siblings={{
        title: locale === 'fa' ? 'پژوهش و نوآوری' : 'Research & Innovation',
        items: [
          { label: locale === 'fa' ? 'معاونت پژوهش و فناوری' : 'Research and Technology', href: '/vice-presidencies/research-technology' },
          { label: locale === 'fa' ? 'مرکز رشد' : 'Growth Center', href: '/growth-center' },
          { label: locale === 'fa' ? 'خانه نوآوری' : 'Innovation House', href: '/innovation' },
          { label: locale === 'fa' ? 'خبرنامه‌ها و نشریات' : 'Newsletters and publications', href: '/publications' },
        ],
      }}
    >
      <section aria-labelledby="unit-news" className="mt-10">
        <h2 id="unit-news" className="mb-4 text-h2 font-bold text-navy">
          {d.news.related}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {related.map((n) => (
            <li key={n.slug}>
              <NewsCard item={n} locale={locale} />
            </li>
          ))}
        </ul>
      </section>
    </UnitPage>
  );
}
