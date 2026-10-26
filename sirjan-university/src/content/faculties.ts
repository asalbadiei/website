import type { Faculty } from '@/types/content';

/**
 * Faculty and academic-group structure exactly as supplied in the project brief.
 * Group numbers are kept as given; official names must be confirmed before launch
 * (see docs/CONTENT-VERIFICATION.md). Do not rename these without an official source.
 */
export const faculties: Faculty[] = [
  {
    slug: 'engineering',
    icon: 'engineering',
    name: { fa: 'دانشکده فنی و مهندسی', en: 'Faculty of Engineering' },
    shortName: { fa: 'فنی و مهندسی', en: 'Engineering' },
    intro: {
      fa: 'دانشکده فنی و مهندسی با تکیه بر آموزش کاربردی، آزمایشگاه‌های تخصصی و ارتباط با صنایع منطقه، دانشجویان را برای حل مسائل واقعی مهندسی آماده می‌کند.',
      en: 'The Faculty of Engineering prepares students to solve real engineering problems through applied teaching, specialist laboratories and links with industry in the region.',
    },
    image: { src: '/illustrations/engineering.svg', alt: { fa: 'تصویر نمادین آزمایشگاه مهندسی', en: 'Illustration of an engineering laboratory' }, illustrative: true },
    departments: [
      { slug: 'group-1', name: { fa: 'گروه آموزشی ۱', en: 'Academic Group 1' }, intro: { fa: 'معرفی این گروه آموزشی پس از تأیید نام رسمی و حوزه تخصصی منتشر می‌شود.', en: 'An introduction to this academic group will be published once its official name and discipline are confirmed.' }, provenance: 'pending' },
      { slug: 'group-2', name: { fa: 'گروه آموزشی ۲', en: 'Academic Group 2' }, intro: { fa: 'معرفی این گروه آموزشی پس از تأیید نام رسمی و حوزه تخصصی منتشر می‌شود.', en: 'An introduction to this academic group will be published once its official name and discipline are confirmed.' }, provenance: 'pending' },
    ],
    provenance: 'pending',
  },
  {
    slug: 'humanities',
    icon: 'humanities',
    name: { fa: 'دانشکده علوم انسانی', en: 'Faculty of Humanities' },
    shortName: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: {
      fa: 'دانشکده علوم انسانی در حوزه‌های علوم انسانی و علوم سلامت، از جمله پرستاری، به تربیت نیروی متخصص و متعهد برای جامعه می‌پردازد.',
      en: 'The Faculty of Humanities educates committed professionals in the humanities and health sciences, including nursing.',
    },
    image: { src: '/illustrations/library.svg', alt: { fa: 'تصویر نمادین کتابخانه', en: 'Illustration of a library' }, illustrative: true },
    departments: [
      { slug: 'nursing', name: { fa: 'گروه پرستاری', en: 'Nursing Department' }, intro: { fa: 'گروه پرستاری با آموزش نظری و بالینی، دانشجویان را برای ارائه مراقبت ایمن و انسانی آماده می‌کند. جزئیات برنامه پس از تأیید منتشر می‌شود.', en: 'The Nursing Department combines theoretical and clinical teaching to prepare students to deliver safe, compassionate care. Programme details will be published once verified.' }, provenance: 'pending' },
      { slug: 'group-4', name: { fa: 'گروه آموزشی ۴', en: 'Academic Group 4' }, intro: { fa: 'معرفی این گروه آموزشی پس از تأیید نام رسمی و حوزه تخصصی منتشر می‌شود.', en: 'An introduction to this academic group will be published once its official name and discipline are confirmed.' }, provenance: 'pending' },
    ],
    provenance: 'pending',
  },
  {
    slug: 'law-theology-political-science',
    icon: 'law',
    name: { fa: 'دانشکده حقوق، الهیات و علوم سیاسی', en: 'Faculty of Law, Theology and Political Science' },
    shortName: { fa: 'حقوق، الهیات و علوم سیاسی', en: 'Law, Theology & Political Science' },
    intro: {
      fa: 'این دانشکده با برنامه‌های آموزشی در حقوق، الهیات و علوم سیاسی، به پرورش دانش‌آموختگانی با بینش تحلیلی و تعهد اخلاقی می‌پردازد.',
      en: 'Through programmes in law, theology and political science, the faculty develops graduates with analytical insight and ethical commitment.',
    },
    image: { src: '/illustrations/law.svg', alt: { fa: 'تصویر نمادین ترازوی عدالت و کتاب', en: 'Illustration of scales of justice and books' }, illustrative: true },
    departments: [
      { slug: 'group-7', name: { fa: 'گروه آموزشی ۷', en: 'Academic Group 7' }, intro: { fa: 'معرفی این گروه آموزشی پس از تأیید نام رسمی و حوزه تخصصی منتشر می‌شود.', en: 'An introduction to this academic group will be published once its official name and discipline are confirmed.' }, provenance: 'pending' },
      { slug: 'group-8', name: { fa: 'گروه آموزشی ۸', en: 'Academic Group 8' }, intro: { fa: 'معرفی این گروه آموزشی پس از تأیید نام رسمی و حوزه تخصصی منتشر می‌شود.', en: 'An introduction to this academic group will be published once its official name and discipline are confirmed.' }, provenance: 'pending' },
    ],
    provenance: 'pending',
  },
  {
    slug: 'management-economics',
    icon: 'management',
    name: { fa: 'دانشکده مدیریت و اقتصاد', en: 'Faculty of Management and Economics' },
    shortName: { fa: 'مدیریت و اقتصاد', en: 'Management & Economics' },
    intro: {
      fa: 'دانشکده مدیریت و اقتصاد با تمرکز بر مهارت‌های تحلیلی، مدیریتی و مالی، دانشجویان را برای فعالیت در سازمان‌ها، کسب‌وکارها و نهادهای عمومی آماده می‌کند.',
      en: 'With a focus on analytical, managerial and financial skills, the Faculty of Management and Economics prepares students for careers in organisations, businesses and public institutions.',
    },
    image: { src: '/illustrations/management.svg', alt: { fa: 'تصویر نمادین نمودار و تحلیل داده', en: 'Illustration of charts and data analysis' }, illustrative: true },
    departments: [
      // Listed in the brief as a sub-item with the faculty's own name; kept as supplied and flagged for clarification.
      { slug: 'faculty-office', name: { fa: 'دانشکده مدیریت و اقتصاد', en: 'Faculty of Management and Economics' }, intro: { fa: 'این مورد در ساختار اولیه با نام خود دانشکده درج شده است. نقش دقیق آن (دفتر دانشکده یا گروه آموزشی) باید تأیید شود.', en: 'This item appears in the initial structure under the faculty’s own name. Its exact role (faculty office or academic group) needs confirmation.' }, provenance: 'pending' },
      { slug: 'group-5', name: { fa: 'گروه آموزشی ۵', en: 'Academic Group 5' }, intro: { fa: 'معرفی این گروه آموزشی پس از تأیید نام رسمی و حوزه تخصصی منتشر می‌شود.', en: 'An introduction to this academic group will be published once its official name and discipline are confirmed.' }, provenance: 'pending' },
      { slug: 'group-6', name: { fa: 'گروه آموزشی ۶', en: 'Academic Group 6' }, intro: { fa: 'معرفی این گروه آموزشی پس از تأیید نام رسمی و حوزه تخصصی منتشر می‌شود.', en: 'An introduction to this academic group will be published once its official name and discipline are confirmed.' }, provenance: 'pending' },
    ],
    provenance: 'pending',
  },
];

export function getFaculty(slug: string) {
  return faculties.find((f) => f.slug === slug);
}

export function getDepartment(facultySlug: string, deptSlug: string) {
  return getFaculty(facultySlug)?.departments.find((d) => d.slug === deptSlug);
}
