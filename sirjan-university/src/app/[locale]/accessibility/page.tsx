import { PageHeader } from '@/components/content/PageHeader';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'بیانیه دسترس‌پذیری', en: 'Accessibility statement' };
const body = { fa: ['این وب‌سایت با هدف انطباق با رهنمودهای دسترس‌پذیری محتوای وب (WCAG 2.2) در سطح AA طراحی شده است.', 'ساختار معنایی، ناوبری کامل با صفحه‌کلید، نشانگر تمرکز آشکار، متن جایگزین برای تصاویر، احترام به تنظیم کاهش حرکت و تعیین درست زبان و جهت صفحه از جمله اقدامات انجام‌شده است.', 'ارزیابی رسمی دسترس‌پذیری هنوز انجام نشده است. اگر با مانعی در استفاده از وب‌سایت روبه‌رو شدید، از طریق صفحه تماس با ما آن را گزارش کنید.'], en: ['This website is designed to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.', 'Measures include semantic structure, full keyboard navigation, visible focus indicators, text alternatives for images, respect for reduced-motion preferences, and correct page language and direction.', 'A formal accessibility audit has not yet been carried out. If you encounter a barrier using this website, please report it through the Contact page.'] };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/accessibility', { title: title[locale] });
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
