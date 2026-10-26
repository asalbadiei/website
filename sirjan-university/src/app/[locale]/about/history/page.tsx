import { AboutShell } from '@/components/content/AboutShell';
import { SampleNotice } from '@/components/ui/Provenance';
import { about } from '@/content/pages';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'تاریخچه', en: 'History' };
const pending = {
  fa: 'تاریخ تأسیس واحد سیرجان و رویدادهای مهم آن هنوز از منبع رسمی دریافت نشده است و به همین دلیل خط زمانی منتشر نشده است.',
  en: 'The founding date of the Sirjan Branch and its key milestones have not yet been received from an official source, so no timeline is published.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/about/history', { title: title[locale] });
}

export default async function HistoryPage({ params }: LocaleParams) {
  const { locale } = await params;
  return (
    <AboutShell locale={locale} route="/about/history" title={title[locale]}>
      <div className="prose-site text-[1.0625rem]">
        {about.history.map((p) => (
          <p key={p.en}>{p[locale]}</p>
        ))}
      </div>
      <div className="mt-6">
        <SampleNotice locale={locale}>{pending[locale]}</SampleNotice>
      </div>
    </AboutShell>
  );
}
