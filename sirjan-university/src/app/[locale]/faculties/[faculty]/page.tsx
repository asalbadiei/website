import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Mail, UserRound } from 'lucide-react';
import { ImageFrame } from '@/components/content/ImageFrame';
import { NewsCard } from '@/components/content/NewsCard';
import { PageHeader } from '@/components/content/PageHeader';
import { ProgramCard } from '@/components/content/ProgramCard';
import { SideNav } from '@/components/content/SideNav';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProvenanceBadge, SampleNotice } from '@/components/ui/Provenance';
import { faculties, getFaculty } from '@/content/faculties';
import { sortedNews } from '@/content/news';
import { programs } from '@/content/programs';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ faculty: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => faculties.map((f) => ({ locale, faculty: f.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, faculty } = await params;
  const f = getFaculty(faculty);
  if (!f) return {};
  return pageMetadata(locale, `/faculties/${faculty}`, { title: f.name[locale], description: f.intro[locale] });
}

export default async function FacultyPage({ params }: Props) {
  const { locale, faculty: slug } = await params;
  const faculty = getFaculty(slug);
  if (!faculty) notFound();
  const d = getDictionary(locale);
  const facultyPrograms = programs.filter((p) => p.faculty === slug);
  // Sample news has no faculty tag yet; show the latest university news until it does.
  const latest = sortedNews.slice(0, 3);
  const facultiesTitle = locale === 'fa' ? 'دانشکده‌ها' : 'Faculties';

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: facultiesTitle, href: '/faculties' }, { label: faculty.name[locale] }]}
        title={faculty.name[locale]}
        intro={faculty.intro[locale]}
        meta={<ProvenanceBadge provenance={faculty.provenance} locale={locale} />}
      />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <div className="space-y-12 lg:col-span-8">
          <ImageFrame image={faculty.image} locale={locale} priority className="rounded-[var(--radius-lg)]" ratio="aspect-[16/7]" />

          <section aria-labelledby="departments">
            <h2 id="departments" className="mb-4 text-h2 font-bold text-navy">
              {d.faculties.departments}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {faculty.departments.map((dept) => (
                <li key={dept.slug}>
                  <Link
                    href={localizedPath(locale, `/faculties/${slug}/${dept.slug}`)}
                    className="card card-link group flex h-full items-start justify-between gap-3 p-5"
                  >
                    <span>
                      <span className="block font-bold text-navy group-hover:text-brand">{dept.name[locale]}</span>
                      <span className="mt-1 line-clamp-2 block text-sm text-muted">{dept.intro[locale]}</span>
                    </span>
                    <ArrowRight size={18} aria-hidden="true" className="flip-rtl mt-1 shrink-0 text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="programs">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 id="programs" className="text-h2 font-bold text-navy">
                {d.faculties.programs}
              </h2>
              <Link href={`${localizedPath(locale, '/programs')}?faculty=${slug}`} className="text-sm font-semibold text-brand hover:underline">
                {d.common.viewAll}
              </Link>
            </div>
            {facultyPrograms.length ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {facultyPrograms.map((p) => (
                  <li key={p.slug}>
                    <ProgramCard program={p} locale={locale} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title={d.faculties.noPrograms} />
            )}
          </section>

          <section aria-labelledby="faculty-news">
            <h2 id="faculty-news" className="mb-4 text-h2 font-bold text-navy">
              {d.faculties.news}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {latest.map((n) => (
                <li key={n.slug}>
                  <NewsCard item={n} locale={locale} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="card p-5">
            <p className="mb-3 text-caption font-bold text-muted">{d.faculties.dean}</p>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-brand-50 text-brand" aria-hidden="true">
                <UserRound size={22} />
              </span>
              <p className={faculty.dean ? 'font-bold text-navy' : 'italic text-muted'}>{faculty.dean?.[locale] ?? d.common.namePending}</p>
            </div>
          </div>
          <div className="card p-5">
            <p className="mb-2 flex items-center gap-2 font-bold text-navy">
              <Mail size={18} aria-hidden="true" className="text-brand" />
              {d.faculties.contact}
            </p>
            <p className="text-sm italic text-muted">{d.common.pendingVerification}</p>
          </div>
          <SampleNotice locale={locale}>{d.faculties.structureNote}</SampleNotice>
          <SideNav
            locale={locale}
            title={facultiesTitle}
            current={`/faculties/${slug}`}
            items={faculties.map((f) => ({ label: f.name[locale], href: `/faculties/${f.slug}` }))}
          />
        </aside>
      </div>
    </>
  );
}
