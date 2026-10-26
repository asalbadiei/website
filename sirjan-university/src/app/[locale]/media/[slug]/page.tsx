import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/content/PageHeader';
import { GalleryGrid } from '@/components/media/GalleryGrid';
import { Badge } from '@/components/ui/Badge';
import { ProvenanceBadge } from '@/components/ui/Provenance';
import { galleries, getGallery } from '@/content/media';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { formatDate } from '@/lib/format';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => galleries.map((g) => ({ locale, slug: g.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const g = getGallery(slug);
  if (!g) return {};
  return pageMetadata(locale, `/media/${slug}`, { title: g.title[locale], image: g.images[0]?.src });
}

export default async function GalleryPage({ params }: Props) {
  const { locale, slug } = await params;
  const g = getGallery(slug);
  if (!g) notFound();
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: locale === 'fa' ? 'مرکز رسانه' : 'Media centre', href: '/media' }, { label: g.title[locale] }]}
        title={g.title[locale]}
        meta={
          <>
            <Badge tone="brand">{d.media.categories[g.category]}</Badge>
            <ProvenanceBadge provenance={g.provenance} locale={locale} />
            <time dateTime={g.date}>{formatDate(g.date, locale)}</time>
          </>
        }
      />
      <div className="container-site py-10 lg:py-14">
        <GalleryGrid images={g.images.map((img) => ({ ...img, caption: img.alt[locale] }))} columns="sm:grid-cols-2 lg:grid-cols-3" />
      </div>
    </>
  );
}
