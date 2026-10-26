import { CalendarItem } from '@/components/content/CalendarItem';
import { PageHeader } from '@/components/content/PageHeader';
import { SampleNotice } from '@/components/ui/Provenance';
import { calendarEvents } from '@/content/calendar';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const intro = {
  fa: 'زمان انتخاب واحد، حذف و اضافه، آغاز و پایان کلاس‌ها و امتحانات. تاریخ‌ها در تقویم هجری شمسی نمایش داده می‌شوند.',
  en: 'Dates for course registration, add/drop, the start and end of classes and examinations, shown in the Gregorian calendar.',
};
const note = {
  fa: 'تاریخ‌های این صفحه نمایشی‌اند و تقویم رسمی آموزشی نیستند. تقویم رسمی را معاونت آموزشی اعلام می‌کند.',
  en: 'The dates on this page are for demonstration only and are not the official academic calendar, which is issued by the Vice-Presidency for Education.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMetadata(locale, '/calendar', { title: d.home.calendarTitle, description: intro[locale] });
}

export default async function CalendarPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const terms = [...new Map(calendarEvents.map((e) => [e.term.en, e.term])).values()];
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: d.home.calendarTitle }]} title={d.home.calendarTitle} intro={intro[locale]} />
      <div className="container-site max-w-5xl space-y-10 py-10 lg:py-14">
        <SampleNotice locale={locale}>{note[locale]}</SampleNotice>
        <nav aria-label={d.common.onThisPage} className="flex flex-wrap gap-2">
          {terms.map((term, i) => (
            <a key={term.en} href={`#term-${i}`} className="rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink-2 hover:border-brand hover:text-brand">
              {term[locale]}
            </a>
          ))}
        </nav>
        {terms.map((term, i) => (
          <section key={term.en} aria-labelledby={`term-${i}`}>
            <h2 id={`term-${i}`} className="mb-4 text-h2 font-bold text-navy">
              {term[locale]}
            </h2>
            <ol className="space-y-3">
              {calendarEvents
                .filter((e) => e.term.en === term.en)
                .map((e) => (
                  <CalendarItem key={e.id} event={e} locale={locale} />
                ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
