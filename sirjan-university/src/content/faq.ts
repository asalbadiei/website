import type { FaqItem } from '@/types/content';

/** General guidance only. Answers point to official channels instead of stating policy. */
export const faqs: FaqItem[] = [
  { topic: 'admissions',
    q: { fa: 'ثبت‌نام در دانشگاه از چه طریقی انجام می‌شود؟', en: 'How do I apply to the university?' },
    a: { fa: 'ثبت‌نام و انتخاب رشته فقط از طریق سامانه رسمی مرکز سنجش و پذیرش دانشگاه آزاد اسلامی انجام می‌شود. این وب‌سایت اطلاع‌رسانی می‌کند و ثبت‌نام انجام نمی‌دهد.', en: 'Applications and programme choices are made only through the official admissions system of Islamic Azad University. This website provides information and does not process applications.' } },
  { topic: 'admissions',
    q: { fa: 'پس از پذیرش چه مدارکی باید تحویل دهم؟', en: 'Which documents must I submit after being admitted?' },
    a: { fa: 'فهرست کلی مدارک در صفحه پذیرش درج شده است. فهرست قطعی در اطلاعیه پذیرش هر دوره اعلام می‌شود.', en: 'A general list is on the Admissions page. The definitive list is published in each intake’s admissions announcement.' } },
  { topic: 'education',
    q: { fa: 'زمان انتخاب واحد را از کجا ببینم؟', en: 'Where can I find course registration dates?' },
    a: { fa: 'زمان‌بندی انتخاب واحد در تقویم آموزشی و اطلاعیه‌های آموزشی منتشر می‌شود.', en: 'Registration dates are published in the academic calendar and in academic announcements.' } },
  { topic: 'education',
    q: { fa: 'اگر در زمان حذف و اضافه نتوانم درسی را تغییر دهم چه کنم؟', en: 'What if I cannot change a course during add/drop?' },
    a: { fa: 'با کارشناس آموزش دانشکده خود تماس بگیرید. امکان رسیدگی به درخواست‌های خارج از بازه طبق مقررات آموزشی بررسی می‌شود.', en: 'Contact your faculty’s education officer. Requests outside the window are considered under the academic regulations.' } },
  { topic: 'administrative',
    q: { fa: 'فرم‌های اداری را از کجا دریافت کنم؟', en: 'Where can I get administrative forms?' },
    a: { fa: 'فرم‌ها در بخش فرم‌ها و آیین‌نامه‌ها دسته‌بندی شده‌اند. فرم‌هایی که هنوز بارگذاری نشده‌اند با برچسب «فایل هنوز بارگذاری نشده است» مشخص شده‌اند.', en: 'Forms are organised in the Forms and Regulations section. Forms not yet uploaded are marked “File not yet uploaded”.' } },
  { topic: 'administrative',
    q: { fa: 'برای پیگیری درخواست اداری با کدام واحد تماس بگیرم؟', en: 'Which office should I contact to follow up an administrative request?' },
    a: { fa: 'از راهنمای تلفن دانشگاه یا فهرست افراد برای یافتن واحد مسئول استفاده کنید.', en: 'Use the university telephone directory or the people directory to find the responsible office.' } },
  { topic: 'welfare',
    q: { fa: 'خدمات رفاهی دانشجویان شامل چه مواردی است؟', en: 'What welfare services are available to students?' },
    a: { fa: 'اطلاعات خدمات رفاهی پس از تأیید از سوی معاونت دانشجویی و فرهنگی منتشر می‌شود. تا آن زمان با این معاونت تماس بگیرید.', en: 'Information on welfare services will be published once confirmed by the Vice-Presidency for Student Affairs and Culture. Until then, please contact that office.' } },
];
