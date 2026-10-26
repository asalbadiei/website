import { PageHeader } from '@/components/content/PageHeader';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'حریم خصوصی', en: 'Privacy' };
const body = { fa: ['این وب‌سایت در نسخه فعلی هیچ داده شخصی جمع‌آوری یا ذخیره نمی‌کند، از کوکی‌های ردیابی استفاده نمی‌کند و فرم تماس آن نمایشی است و اطلاعاتی ارسال نمی‌کند.', 'جستجوی وب‌سایت به‌طور کامل در مرورگر شما انجام می‌شود و عبارت‌های جستجو به سرور ارسال نمی‌شوند.', 'سیاست رسمی حریم خصوصی دانشگاه پس از تأیید واحد امور حقوقی در این صفحه منتشر می‌شود.'], en: ['In its current version this website does not collect or store personal data, uses no tracking cookies, and its contact form is a demonstration that sends no information.', 'Site search runs entirely in your browser; search terms are not sent to a server.', 'The university’s official privacy policy will be published on this page once approved by the Legal Affairs Office.'] };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/privacy', { title: title[locale] });
}

export default async function Page({ params }: LocaleParams) {
  const { locale } = await params;
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: title[locale] }]} title={title[locale]} />
      <div className="container-site max-w-3xl py-10 lg:py-14">
        <div className="prose-site text-[1.0625rem]">
          {body[locale].map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </>
  );
}
