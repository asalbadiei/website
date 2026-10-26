import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, MapPin } from 'lucide-react';
import { Attachments } from '@/components/content/Attachments';
import { ImageFrame } from '@/components/content/ImageFrame';
import { NewsCard } from '@/components/content/NewsCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { ProvenanceBadge, SampleNotice } from '@/components/ui/Provenance';
import { getNews, news, sortedNews } from '@/content/news';
import { siteUrl } from '@/content/site';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { formatDate } from '@/lib/format';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => news.map((n) => ({ locale, slug: n.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const item = getNews(slug);
  if (!item) return {};
  return pageMetadata(locale, `/news/${slug}`, { title: item.title[locale], description: item.summary[locale], image: item.image.src, type: 'article' });
}

export default async function NewsDetail({ params }: Props) {
  const { locale, slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();
  const d = getDictionary(locale);
  const related = sortedNews.filter((n) => n.slug !== slug && n.category === item.category).concat(sortedNews.filter((n) => n.slug !== slug && n.category !== item.category)).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': item.event ? 'Event' : 'NewsArticle',
    ...(item.event
      ? { name: item.title[locale], startDate: item.event.start, endDate: item.event.end, location: { '@type': 'Place', name: item.event.venue[locale] } }
      : { headline: item.title[locale], datePublished: item.date }),
    description: item.summary[locale],
    image: `${siteUrl}${item.image.src}`,
    inLanguage: locale,
  };

  return (
    <article>
      <header className="border-b border-line bg-surface">
        <div className="container-site max-w-4xl py-8 lg:py-12">
          <Breadcrumbs locale={locale} items={[{ label: d.home.newsTitle, href: '/news' }, { label: item.title[locale] }]} />
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link href={`${localizedPath(locale, '/news')}?category=${item.category}`}>
              <Badge tone="brand">{d.news.categories[item.category]}</Badge>
            </Link>
            <ProvenanceBadge provenance={item.provenance} locale={locale} />
          </div>
          <h1 className="mt-3 text-h1 font-bold text-navy">{item.title[locale]}</h1>
          <p className="mt-3 text-lg leading-8 text-ink-2">{item.summary[locale]}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
            <CalendarDays size={16} aria-hidden="true" />
            <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
          </p>
        </div>
      </header>
      <div className="container-site max-w-4xl py-10">
        {item.provenance === 'sample' ? (
          <div className="mb-6">
            <SampleNotice locale={locale} />
          </div>
        ) : null}
        <ImageFrame image={item.image} locale={locale} priority className="rounded-[var(--radius-lg)]" />
        {item.event ? (
          <dl className="mt-6 grid gap-4 rounded-[var(--radius-lg)] border border-brand-100 bg-brand-50 p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CalendarDays size={20} aria-hidden="true" className="mt-0.5 text-brand" />
              <div>
                <dt className="text-caption text-muted">{d.news.eventDate}</dt>
                <dd className="font-semibold text-navy">
                  {formatDate(item.event.start, locale)}
                  {item.event.end ? ` – ${formatDate(item.event.end, locale)}` : ''}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} aria-hidden="true" className="mt-0.5 text-brand" />
              <div>
                <dt className="text-caption text-muted">{d.news.venue}</dt>
                <dd className="font-semibold text-navy">{item.event.venue[locale]}</dd>
              </div>
            </div>
          </dl>
        ) : null}
        <div className="prose-site mt-8 text-[1.0625rem]">
          {item.body.map((p) => (
            <p key={p.en}>{p[locale]}</p>
          ))}
        </div>
        {item.attachments?.length ? <Attachments items={item.attachments} locale={locale} /> : null}
      </div>
      {related.length ? (
        <section aria-labelledby="related-news" className="border-t border-line bg-surface">
          <div className="container-site py-12">
            <h2 id="related-news" className="mb-6 text-h2 font-bold text-navy">
              {d.news.related}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <li key={n.slug}>
                  <NewsCard item={n} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
