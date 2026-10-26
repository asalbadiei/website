import { AboutShell } from '@/components/content/AboutShell';
import { SampleNotice } from '@/components/ui/Provenance';
import { phoneDirectory } from '@/content/people';
import { getDictionary } from '@/i18n';
import { localizeDigits } from '@/lib/format';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'راهنمای تلفن دانشگاه', en: 'University telephone directory' };
const note = {
  fa: 'شماره‌های داخلی و تلفن مستقیم واحدها هنوز تأیید نشده‌اند و پس از دریافت از روابط عمومی منتشر می‌شوند.',
  en: 'Extensions and direct lines have not yet been verified and will be published once received from Public Relations.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/about/phone-directory', { title: title[locale] });
}

export default async function PhoneDirectoryPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <AboutShell locale={locale} route="/about/phone-directory" title={title[locale]}>
      <SampleNotice locale={locale}>{note[locale]}</SampleNotice>
      <div className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-surface">
        <table className="w-full min-w-[540px] text-sm">
          <caption className="sr-only">{title[locale]}</caption>
          <thead className="bg-canvas text-start text-caption text-muted">
            <tr>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{d.people.unit}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{d.people.position}</th>
              <th scope="col" className="px-4 py-3 text-start font-semibold">{d.people.extension}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {phoneDirectory.map((p) => (
              <tr key={p.id}>
                <th scope="row" className="px-4 py-3 text-start font-semibold text-navy">{p.unit[locale]}</th>
                <td className="px-4 py-3 text-ink-2">{p.position[locale]}</td>
                <td className="px-4 py-3">
                  {p.extension ? localizeDigits(p.extension, locale) : <span className="italic text-muted">{d.common.pendingVerification}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AboutShell>
  );
}
