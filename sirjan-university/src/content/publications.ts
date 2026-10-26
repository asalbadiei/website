import type { Publication } from '@/types/content';

/** SAMPLE DATASET — no publication file is available yet, so read/download stays disabled. */
const cover = (name: string, fa: string, en: string) => ({
  src: `/illustrations/${name}.svg`, alt: { fa, en }, illustrative: true,
});

export const publications: Publication[] = [
  { slug: 'newsletter-autumn-1405', kind: 'newsletter', date: '2026-10-01', provenance: 'sample',
    title: { fa: 'خبرنامه دانشگاه', en: 'University Newsletter' }, issue: { fa: 'شماره پاییز ۱۴۰۵', en: 'Autumn 2026 issue' },
    description: { fa: 'گزیده اخبار آموزشی، پژوهشی و دانشجویی آغاز سال تحصیلی.', en: 'Highlights of academic, research and student news from the start of the year.' },
    cover: cover('campus', 'جلد نمادین خبرنامه', 'Illustrative newsletter cover') },
  { slug: 'newsletter-summer-1405', kind: 'newsletter', date: '2026-07-01', provenance: 'sample',
    title: { fa: 'خبرنامه دانشگاه', en: 'University Newsletter' }, issue: { fa: 'شماره تابستان ۱۴۰۵', en: 'Summer 2026 issue' },
    description: { fa: 'مروری بر رویدادهای پایان سال تحصیلی و جشن دانش‌آموختگی.', en: 'A look back at end-of-year events and the graduation ceremony.' },
    cover: cover('graduation', 'جلد نمادین خبرنامه', 'Illustrative newsletter cover') },
  { slug: 'research-report-1404', kind: 'report', date: '2026-05-15', provenance: 'sample',
    title: { fa: 'گزارش عملکرد پژوهشی', en: 'Research Activity Report' }, issue: { fa: 'سال ۱۴۰۴', en: '2025–26' },
    description: { fa: 'گزارش طرح‌های پژوهشی، انتشارات و همکاری‌های صنعتی.', en: 'A report on research projects, publications and industry partnerships.' },
    cover: cover('research', 'جلد نمادین گزارش', 'Illustrative report cover') },
  { slug: 'new-student-guide', kind: 'guide', date: '2026-08-20', provenance: 'sample',
    title: { fa: 'راهنمای دانشجویان ورودی جدید', en: 'New Student Guide' }, issue: { fa: 'ویرایش ۱۴۰۵', en: '2026 edition' },
    description: { fa: 'آشنایی با پردیس، سامانه‌ها، مقررات آموزشی و خدمات دانشجویی.', en: 'An introduction to the campus, online systems, academic rules and student services.' },
    cover: cover('students', 'جلد نمادین راهنما', 'Illustrative guide cover') },
  { slug: 'student-journal-engineering', kind: 'journal', date: '2026-04-10', provenance: 'sample',
    title: { fa: 'نشریه علمی دانشجویی مهندسی', en: 'Student Engineering Journal' }, issue: { fa: 'شماره ۳', en: 'Issue 3' },
    description: { fa: 'مقالات کوتاه و گزارش پروژه‌های دانشجویان دانشکده فنی و مهندسی.', en: 'Short articles and project reports by Faculty of Engineering students.' },
    cover: cover('engineering', 'جلد نمادین نشریه', 'Illustrative journal cover') },
];
