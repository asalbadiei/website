import Link from 'next/link';
import { ArrowRight, Target } from 'lucide-react';
import { AboutShell } from '@/components/content/AboutShell';
import { ImageFrame } from '@/components/content/ImageFrame';
import { aboutNav, aboutTitle } from '@/content/about-nav';
import { faculties } from '@/content/faculties';
import { about } from '@/content/pages';
import { localizedPath } from '@/i18n/path';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/about', { title: aboutTitle[locale], description: about.intro[locale] });
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale } = await params;
  const missionLabel = locale === 'fa' ? 'مأموریت' : 'Mission';
  const facultiesLabel = locale === 'fa' ? 'دانشکده‌ها' : 'Faculties';
  return (
    <AboutShell locale={locale} route="/about" title={aboutTitle[locale]} intro={about.intro[locale]}>
      <ImageFrame
        image={{ src: '/illustrations/campus.svg', alt: { fa: 'تصویر نمادین پردیس', en: 'Illustration of the campus' }, illustrative: true }}
        locale={locale}
        priority
        ratio="aspect-[16/7]"
        className="rounded-[var(--radius-lg)]"
      />
      <section aria-labelledby="mission" className="mt-10 flex gap-4 rounded-[var(--radius-lg)] border border-brand-100 bg-brand-50 p-6">
        <Target size={26} aria-hidden="true" className="shrink-0 text-brand" />
        <div>
          <h2 id="mission" className="text-h3 font-bold text-navy">
            {missionLabel}
          </h2>
          <p className="mt-1 text-ink-2">{about.mission[locale]}</p>
        </div>
      </section>
      <section aria-labelledby="about-faculties" className="mt-10">
        <h2 id="about-faculties" className="mb-4 text-h2 font-bold text-navy">
          {facultiesLabel}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {faculties.map((f) => (
            <li key={f.slug}>
              <Link href={localizedPath(locale, `/faculties/${f.slug}`)} className="card card-link group flex items-center justify-between gap-3 p-4 font-semibold text-navy">
                <span className="group-hover:text-brand">{f.name[locale]}</span>
                <ArrowRight size={16} aria-hidden="true" className="flip-rtl text-brand" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="about-more" className="mt-10">
        <h2 id="about-more" className="mb-4 text-h2 font-bold text-navy">
          {aboutTitle[locale]}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {aboutNav(locale)
            .slice(1)
            .map((item) => (
              <li key={item.href}>
                <Link href={localizedPath(locale, item.href)} className="card card-link group flex items-center justify-between gap-3 p-4 text-ink-2">
                  <span className="group-hover:text-brand">{item.label}</span>
                  <ArrowRight size={16} aria-hidden="true" className="flip-rtl text-brand" />
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </AboutShell>
  );
}
