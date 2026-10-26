import { notFound } from 'next/navigation';
import { UnitPage } from '@/components/content/UnitPage';
import { getPresidencyUnit, presidencyUnits } from '@/content/units';
import { locales } from '@/i18n/config';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ slug: string }>;

const title = { fa: 'حوزه ریاست', en: 'University Presidency' };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => presidencyUnits.map((u) => ({ locale, slug: u.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const unit = getPresidencyUnit(slug);
  if (!unit) return {};
  return pageMetadata(locale, `/presidency/${slug}`, { title: unit.name[locale], description: unit.summary[locale] });
}

export default async function PresidencyUnitPage({ params }: Props) {
  const { locale, slug } = await params;
  const unit = getPresidencyUnit(slug);
  if (!unit) notFound();
  return (
    <UnitPage
      unit={unit}
      locale={locale}
      route={`/presidency/${slug}`}
      crumbs={[{ label: title[locale], href: '/presidency' }, { label: unit.name[locale] }]}
      siblings={{ title: title[locale], items: presidencyUnits.map((u) => ({ label: u.name[locale], href: `/presidency/${u.slug}` })) }}
    />
  );
}
