import Link from 'next/link';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { FaqList } from '@/components/content/FaqList';
import { LinkCard } from '@/components/content/LinkCard';
import { PageHeader } from '@/components/content/PageHeader';
import { ProgramCard } from '@/components/content/ProgramCard';
import { ButtonLink } from '@/components/ui/Button';
import { SampleNotice } from '@/components/ui/Provenance';
import { faqs } from '@/content/faq';
import { faculties } from '@/content/faculties';
import { portals } from '@/content/links';
import { programs } from '@/content/programs';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const L = {
  title: { fa: 'پذیرش و ثبت‌نام', en: 'Admissions and registration' },
  intro: {
    fa: 'راهنمای داوطلبان و دانشجویان ورودی جدید. این صفحه اطلاع‌رسانی می‌کند؛ ثبت‌نام و انتخاب رشته فقط در سامانه‌های رسمی دانشگاه آزاد اسلامی انجام می‌شود.',
    en: 'Guidance for applicants and new students. This page is informational; applications and programme choices are made only in Islamic Azad University’s official systems.',
  },
  sections: {
    overview: { fa: 'معرفی پذیرش', en: 'Admissions overview' },
    registration: { fa: 'ثبت‌نام دانشجویان جدید', en: 'New student registration' },
    documents: { fa: 'مدارک لازم', en: 'Required documents' },
    programs: { fa: 'آشنایی با رشته‌ها', en: 'Explore programmes' },
    deadlines: { fa: 'مهلت‌های مهم', en: 'Important deadlines' },
    systems: { fa: 'سامانه‌های رسمی ثبت‌نام', en: 'Official application systems' },
    faq: { fa: 'پرسش‌های متداول', en: 'Frequently asked questions' },
  },
  overview: {
    fa: 'دانشگاه آزاد اسلامی در مقاطع کاردانی، کارشناسی، کارشناسی ارشد و دکتری دانشجو می‌پذیرد. شیوه پذیرش، ظرفیت‌ها و شرایط هر دوره در اطلاعیه‌های مرکز سنجش و پذیرش دانشگاه آزاد اسلامی اعلام می‌شود.',
    en: 'Islamic Azad University admits students at associate, bachelor’s, master’s and doctoral levels. Admission routes, capacity and conditions for each intake are published by the university’s Admissions and Assessment Centre.',
  },
  steps: [
    { fa: 'اطلاعیه پذیرش دوره مورد نظر را در سامانه مرکز سنجش و پذیرش مطالعه کنید.', en: 'Read the admissions announcement for your intake on the Admissions and Assessment Centre system.' },
    { fa: 'در مهلت اعلام‌شده در سامانه ثبت‌نام و رشته‌های مورد نظر را انتخاب کنید.', en: 'Register and choose your programmes in the system within the published deadline.' },
    { fa: 'پس از اعلام نتایج، مراحل ثبت‌نام برخط پذیرفته‌شدگان را تکمیل کنید.', en: 'Once results are announced, complete the online enrolment steps for admitted students.' },
    { fa: 'اصل مدارک را طبق اطلاعیه به اداره پذیرش واحد سیرجان تحویل دهید.', en: 'Submit your original documents to the Sirjan Branch Admissions Office as instructed.' },
    { fa: 'پس از تکمیل پرونده، در زمان اعلام‌شده انتخاب واحد کنید.', en: 'After your file is complete, register for courses at the published time.' },
  ],
  documents: [
    { fa: 'اصل و تصویر مدرک تحصیلی مقطع قبل', en: 'Original and copy of your previous qualification' },
    { fa: 'اصل و تصویر شناسنامه و کارت ملی', en: 'Original and copy of birth certificate and national ID card' },
    { fa: 'عکس پرسنلی طبق مشخصات اعلام‌شده', en: 'Passport-style photographs to the published specification' },
    { fa: 'مدرک وضعیت نظام وظیفه (برای آقایان)', en: 'Military service status document (male applicants)' },
  ],
  documentsNote: {
    fa: 'این فهرست عمومی است؛ فهرست قطعی مدارک در اطلاعیه پذیرش هر دوره اعلام می‌شود.',
    en: 'This is a general list; the definitive list is published in each intake’s admissions announcement.',
  },
  deadlines: {
    fa: 'مهلت‌های ثبت‌نام هر دوره پس از اعلام رسمی در این بخش و در اطلاعیه‌ها درج می‌شود. هیچ مهلتی در حال حاضر به‌عنوان مهلت رسمی منتشر نشده است.',
    en: 'Registration deadlines for each intake will appear here and in announcements once officially published. No deadline is currently published as official.',
  },
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/admissions', { title: L.title[locale], description: L.intro[locale] });
}

export default async function AdmissionsPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const toc = Object.entries(L.sections) as [keyof typeof L.sections, { fa: string; en: string }][];
  const official = portals.filter((p) => p.id === 'iau-azmoon' || p.id === 'iau');
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: L.title[locale] }]} title={L.title[locale]} intro={L.intro[locale]} />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <aside className="lg:col-span-3">
          <nav aria-label={d.common.onThisPage} className="card p-2 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <p className="px-3 pt-2 pb-1 text-caption font-bold text-muted">{d.common.onThisPage}</p>
            <ul>
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="block rounded-[var(--radius-md)] px-3 py-2 text-sm text-ink-2 hover:bg-canvas hover:text-brand">
                    {label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="min-w-0 space-y-14 lg:col-span-9">
          <section aria-labelledby="overview">
            <h2 id="overview" className="mb-3 text-h2 font-bold text-navy">{L.sections.overview[locale]}</h2>
            <p className="text-lg leading-8 text-ink-2">{L.overview[locale]}</p>
          </section>

          <section aria-labelledby="registration">
            <h2 id="registration" className="mb-5 text-h2 font-bold text-navy">{L.sections.registration[locale]}</h2>
            <ol className="space-y-3">
              {L.steps.map((s, i) => (
                <li key={s.en} className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-line bg-surface p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">{(i + 1).toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-GB')}</span>
                  <p className="pt-0.5 text-ink-2">{s[locale]}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="documents">
            <h2 id="documents" className="mb-5 text-h2 font-bold text-navy">{L.sections.documents[locale]}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {L.documents.map((doc) => (
                <li key={doc.en} className="flex items-start gap-3 rounded-[var(--radius-md)] border border-line bg-surface p-4 text-ink-2">
                  <FileCheck2 size={18} aria-hidden="true" className="mt-1 shrink-0 text-brand" />
                  {doc[locale]}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">{L.documentsNote[locale]}</p>
          </section>

          <section aria-labelledby="programs">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 id="programs" className="text-h2 font-bold text-navy">{L.sections.programs[locale]}</h2>
              <ButtonLink href={localizedPath(locale, '/programs')} variant="secondary" size="sm">
                {d.home.admissionsSecondary}
              </ButtonLink>
            </div>
            <ul className="mb-5 flex flex-wrap gap-2">
              {faculties.map((f) => (
                <li key={f.slug}>
                  <Link href={`${localizedPath(locale, '/programs')}?faculty=${f.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm text-ink-2 hover:border-brand hover:text-brand">
                    {f.shortName[locale]}
                    <ArrowRight size={14} aria-hidden="true" className="flip-rtl" />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {programs.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <ProgramCard program={p} locale={locale} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="deadlines">
            <h2 id="deadlines" className="mb-3 text-h2 font-bold text-navy">{L.sections.deadlines[locale]}</h2>
            <SampleNotice locale={locale}>{L.deadlines[locale]}</SampleNotice>
          </section>

          <section aria-labelledby="systems">
            <h2 id="systems" className="mb-5 text-h2 font-bold text-navy">{L.sections.systems[locale]}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {official.map((link) => (
                <li key={link.id}>
                  <LinkCard link={link} locale={locale} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className="mb-5 text-h2 font-bold text-navy">{L.sections.faq[locale]}</h2>
            <FaqList items={faqs.filter((f) => f.topic === 'admissions' || f.topic === 'education')} locale={locale} />
          </section>
        </div>
      </div>
    </>
  );
}
