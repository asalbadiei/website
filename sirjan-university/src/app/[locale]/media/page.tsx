import Link from 'next/link';
import { Images, PlayCircle } from 'lucide-react';
import { ImageFrame } from '@/components/content/ImageFrame';
import { PageHeader } from '@/components/content/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { SampleNotice } from '@/components/ui/Provenance';
import { galleries, videos } from '@/content/media';
import { publications } from '@/content/publications';
import { fill, getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { formatDate, formatNumber, localizeDigits } from '@/lib/format';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'مرکز رسانه', en: 'Media centre' };
const intro = { fa: 'گالری تصاویر، ویدئوها، منابع رسانه‌ای و نشریات دانشگاه.', en: 'Photo galleries, videos, media resources and university publications.' };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/media', { title: title[locale], description: intro[locale] });
}

export default async function MediaPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} intro={intro[locale]} />
      <div className="container-site space-y-14 py-10 lg:py-14">
        <SampleNotice locale={locale}>{d.common.illustrativeNote} {d.common.sampleNotice}</SampleNotice>

        <section aria-labelledby="galleries">
          <h2 id="galleries" className="mb-5 text-h2 font-bold text-navy">{d.media.galleries}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((g) => (
              <li key={g.slug}>
                <article className="card card-link group relative overflow-hidden">
                  <ImageFrame image={g.images[0]} locale={locale} />
                  <div className="p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge tone="brand">{d.media.categories[g.category]}</Badge>
                      <span className="inline-flex items-center gap-1 text-caption text-muted">
                        <Images size={13} aria-hidden="true" />
                        {fill(d.media.photos, { count: formatNumber(g.images.length, locale) })}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy group-hover:text-brand">
                      <Link href={localizedPath(locale, `/media/${g.slug}`)} className="after:absolute after:inset-0">
                        {g.title[locale]}
                      </Link>
                    </h3>
                    <time dateTime={g.date} className="text-caption text-muted">{formatDate(g.date, locale)}</time>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="videos">
          <h2 id="videos" className="mb-5 text-h2 font-bold text-navy">{d.media.videos}</h2>
          <ul className="grid gap-5 sm:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id} className="card overflow-hidden">
                <div className="relative">
                  <ImageFrame image={v.poster} locale={locale} showLabel={false} />
                  <span className="absolute inset-0 grid place-items-center bg-navy/35">
                    <PlayCircle size={48} strokeWidth={1.25} aria-hidden="true" className="text-white/80" />
                  </span>
                  <span className="absolute bottom-2 end-2 rounded-[var(--radius-sm)] bg-navy/80 px-1.5 text-xs text-white" dir="ltr">{localizeDigits(v.duration, locale)}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-navy">{v.title[locale]}</h3>
                  <p className="mt-1 text-sm italic text-muted">{d.media.videoPending}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="media-publications">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 id="media-publications" className="text-h2 font-bold text-navy">{d.media.publications}</h2>
            <Link href={localizedPath(locale, '/publications')} className="text-sm font-semibold text-brand hover:underline">{d.common.viewAll}</Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {publications.slice(0, 3).map((p) => (
              <li key={p.slug} className="card p-4">
                <p className="text-caption text-muted">{d.publications.kinds[p.kind]} · {p.issue[locale]}</p>
                <p className="font-bold text-navy">{p.title[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="resources" className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <h2 id="resources" className="text-h3 font-bold text-navy">{d.media.resources}</h2>
          <p className="mt-2 text-sm text-muted">
            {locale === 'fa'
              ? 'نشان رسمی، راهنمای هویت بصری و تصاویر رسمی برای استفاده رسانه‌ها پس از تأیید روابط عمومی در این بخش قرار می‌گیرد.'
              : 'The official logo, visual identity guidelines and official images for media use will be provided here once approved by Public Relations.'}
          </p>
          <Link href={localizedPath(locale, '/presidency/public-relations')} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
            {locale === 'fa' ? 'روابط عمومی' : 'Public Relations'}
          </Link>
        </section>
      </div>
    </>
  );
}
