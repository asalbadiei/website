import Link from 'next/link';
import { ArrowRight, BookOpenCheck, ClipboardList, HeartHandshake, Phone } from 'lucide-react';
import { DocumentRow } from '@/components/content/DocumentRow';
import { FaqList } from '@/components/content/FaqList';
import { LinkCard } from '@/components/content/LinkCard';
import { PageHeader } from '@/components/content/PageHeader';
import { SampleNotice } from '@/components/ui/Provenance';
import { documents } from '@/content/documents';
import { faqs } from '@/content/faq';
import { systems } from '@/content/links';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const l = (fa: string, en: string) => ({ fa, en });
const T = {
  title: l('پشتیبانی دانشجویان', 'Student support'),
  intro: l('راهنمایی آموزشی و اداری، پرسش‌های متداول، فرم‌های پرکاربرد و راه‌های ارتباط با واحدهای دانشگاه.', 'Academic and administrative guidance, FAQs, frequently used forms and ways to reach university offices.'),
  faq: l('پرسش‌های متداول', 'Frequently asked questions'),
  forms: l('فرم‌های پرکاربرد', 'Frequently used forms'),
  channels: l('راه‌های ارتباطی', 'Contact channels'),
  systems: l('سامانه‌های دانشجویی', 'Student systems'),
  welfareNote: l('اطلاعات خدمات رفاهی، تسهیلات و شرایط برخورداری از آن‌ها فقط پس از تأیید معاونت دانشجویی و فرهنگی منتشر می‌شود.', 'Information on welfare services, support schemes and eligibility will be published only once confirmed by the Vice-Presidency for Student Affairs and Culture.'),
};

const guides = [
  { icon: BookOpenCheck, title: l('راهنمایی آموزشی', 'Academic guidance'), body: l('انتخاب واحد، حذف و اضافه، مرخصی تحصیلی و فارغ‌التحصیلی.', 'Course registration, add/drop, leave of absence and graduation.'), href: '/vice-presidencies/education-graduate-studies' },
  { icon: ClipboardList, title: l('راهنمایی اداری', 'Administrative guidance'), body: l('درخواست‌ها، گواهی‌ها و پیگیری امور اداری.', 'Requests, certificates and following up administrative matters.'), href: '/forms' },
  { icon: HeartHandshake, title: l('رفاه و مشاوره', 'Welfare and counselling'), body: l('مشاوره، فعالیت‌های فرهنگی و خدمات رفاهی دانشجویان.', 'Counselling, cultural activities and student welfare services.'), href: '/vice-presidencies/student-affairs-culture' },
  { icon: Phone, title: l('تماس با واحدها', 'Contact an office'), body: l('یافتن واحد مسئول و راه ارتباط با آن.', 'Find the responsible office and how to reach it.'), href: '/about/phone-directory' },
];

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/student-support', { title: T.title[locale], description: T.intro[locale] });
}

export default async function StudentSupportPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: T.title[locale] }]} title={T.title[locale]} intro={T.intro[locale]} />
      <div className="container-site space-y-14 py-10 lg:py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <li key={g.href}>
              <Link href={localizedPath(locale, g.href)} className="card card-link group flex h-full flex-col p-5">
                <span className="mb-4 grid size-11 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
                  <g.icon size={20} aria-hidden="true" />
                </span>
                <span className="font-bold text-navy group-hover:text-brand">{g.title[locale]}</span>
                <span className="mt-1 text-sm text-muted">{g.body[locale]}</span>
                <ArrowRight size={16} aria-hidden="true" className="flip-rtl mt-auto pt-3 text-brand" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="grid gap-10 lg:grid-cols-12">
          <section aria-labelledby="faq" className="lg:col-span-7">
            <h2 id="faq" className="mb-5 text-h2 font-bold text-navy">{T.faq[locale]}</h2>
            <FaqList items={faqs} locale={locale} />
            <div className="mt-6">
              <SampleNotice locale={locale}>{T.welfareNote[locale]}</SampleNotice>
            </div>
          </section>
          <section aria-labelledby="forms" className="lg:col-span-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 id="forms" className="text-h2 font-bold text-navy">{T.forms[locale]}</h2>
              <Link href={localizedPath(locale, '/forms')} className="text-sm font-semibold text-brand hover:underline">{d.common.viewAll}</Link>
            </div>
            <ul className="divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-surface">
              {documents.filter((x) => x.category === 'education' || x.category === 'student').slice(0, 4).map((doc) => (
                <DocumentRow key={doc.id} doc={doc} locale={locale} />
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="systems">
          <h2 id="systems" className="mb-5 text-h2 font-bold text-navy">{T.systems[locale]}</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {systems.filter((s) => s.category === 'students' || s.category === 'lms' || s.category === 'library').map((s) => (
              <li key={s.id}>
                <LinkCard link={s} locale={locale} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="channels" className="rounded-[var(--radius-lg)] border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 id="channels" className="text-h2 font-bold text-navy">{T.channels[locale]}</h2>
          <p className="mt-2 text-ink-2">{d.common.contact}: <span className="italic text-muted">{d.common.pendingVerification}</span></p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={localizedPath(locale, '/contact')} className="font-semibold text-brand hover:underline">{d.footer.contact}</Link>
            <Link href={localizedPath(locale, '/people')} className="font-semibold text-brand hover:underline">{locale === 'fa' ? 'فهرست افراد' : 'People directory'}</Link>
          </div>
        </section>
      </div>
    </>
  );
}
