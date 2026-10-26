import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/content/PageHeader';
import { ProgramCard } from '@/components/content/ProgramCard';
import { SideNav } from '@/components/content/SideNav';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProvenanceBadge, SampleNotice } from '@/components/ui/Provenance';
import { faculties, getFaculty } from '@/content/faculties';
import { programs } from '@/content/programs';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

type Props = LocaleParams<{ faculty: string; department: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => faculties.flatMap((f) => f.departments.map((d) => ({ locale, faculty: f.slug, department: d.slug }))));
}

export async function generateMetadata({ params }: Props) {
  const { locale, faculty, department } = await params;
  const f = getFaculty(faculty);
  const dept = f?.departments.find((d) => d.slug === department);
  if (!f || !dept) return {};
  return pageMetadata(locale, `/faculties/${faculty}/${department}`, { title: `${dept.name[locale]} — ${f.name[locale]}`, description: dept.intro[locale] });
}

export default async function DepartmentPage({ params }: Props) {
  const { locale, faculty: fSlug, department: dSlug } = await params;
  const faculty = getFaculty(fSlug);
  const dept = faculty?.departments.find((d) => d.slug === dSlug);
  if (!faculty || !dept) notFound();
  const d = getDictionary(locale);
  const deptPrograms = programs.filter((p) => p.faculty === fSlug && p.department === dSlug);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[
          { label: locale === 'fa' ? 'دانشکده‌ها' : 'Faculties', href: '/faculties' },
          { label: faculty.name[locale], href: `/faculties/${fSlug}` },
          { label: dept.name[locale] },
        ]}
        eyebrow={faculty.name[locale]}
        title={dept.name[locale]}
        intro={dept.intro[locale]}
        meta={<ProvenanceBadge provenance={dept.provenance} locale={locale} />}
      />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <section aria-labelledby="dept-programs" className="lg:col-span-8">
          <h2 id="dept-programs" className="mb-4 text-h2 font-bold text-navy">
            {d.faculties.programs}
          </h2>
          {deptPrograms.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {deptPrograms.map((p) => (
                <li key={p.slug}>
                  <ProgramCard program={p} locale={locale} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title={d.faculties.noPrograms} />
          )}
        </section>
        <aside className="space-y-6 lg:col-span-4">
          <SampleNotice locale={locale}>{d.faculties.structureNote}</SampleNotice>
          <SideNav
            locale={locale}
            title={d.faculties.departments}
            current={`/faculties/${fSlug}/${dSlug}`}
            items={faculty.departments.map((x) => ({ label: x.name[locale], href: `/faculties/${fSlug}/${x.slug}` }))}
          />
        </aside>
      </div>
    </>
  );
}
