import { notFound } from 'next/navigation';
import { UnitPage } from '@/components/content/UnitPage';
import { getVicePresidency, vicePresidencies } from '@/content/units';
import { locales } from '@/i18n/config';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ slug: string }>;

const title = { fa: 'معاونت‌ها', en: 'Vice-Presidencies' };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => vicePresidencies.map((u) => ({ locale, slug: u.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const unit = getVicePresidency(slug);
  if (!unit) return {};
  return pageMetadata(locale, `/vice-presidencies/${slug}`, { title: unit.name[locale], description: unit.summary[locale] });
}

export default async function VicePresidenciesUnitPage({ params }: Props) {
  const { locale, slug } = await params;
  const unit = getVicePresidency(slug);
  if (!unit) notFound();
  return (
    <UnitPage
      unit={unit}
      locale={locale}
      route={`/vice-presidencies/${slug}`}
      crumbs={[{ label: title[locale], href: '/vice-presidencies' }, { label: unit.name[locale] }]}
      siblings={{ title: title[locale], items: vicePresidencies.map((u) => ({ label: u.name[locale], href: `/vice-presidencies/${u.slug}` })) }}
    />
  );
}
