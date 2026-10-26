import type { L, Program } from '@/types/content';

/**
 * SAMPLE DATASET. These programmes illustrate the directory and detail templates only.
 * They are not a statement of programmes currently offered by the Sirjan Branch, and the mapping
 * to academic groups is illustrative. Replace with the verified programme list.
 */
const req = (fa: string, en: string): L => ({ fa, en });

const common = {
  bachelor: [
    req('دارا بودن مدرک دیپلم و پیش‌دانشگاهی یا معادل آن', 'A secondary-school diploma or recognised equivalent'),
    req('پذیرش از طریق سامانه مرکز سنجش و پذیرش دانشگاه آزاد اسلامی', 'Admission through the Islamic Azad University admissions and assessment system'),
  ],
  master: [
    req('دارا بودن مدرک کارشناسی در رشته مرتبط', 'A bachelor’s degree in a related field'),
    req('پذیرش بر اساس ضوابط اعلام‌شده مرکز سنجش و پذیرش', 'Admission according to the criteria published by the admissions centre'),
  ],
};

export const programs: Program[] = [
  { slug: 'civil-engineering-bsc', level: 'bachelor', faculty: 'engineering', department: 'group-1', durationYears: 4,
    title: { fa: 'مهندسی عمران', en: 'Civil Engineering' }, field: { fa: 'فنی و مهندسی', en: 'Engineering' },
    intro: { fa: 'آموزش طراحی، اجرا و نگهداری سازه‌ها و زیرساخت‌های شهری با تأکید بر مبانی تحلیل سازه، مکانیک خاک و مدیریت پروژه.', en: 'Design, construction and maintenance of structures and urban infrastructure, with an emphasis on structural analysis, soil mechanics and project management.' },
    requirements: common.bachelor, provenance: 'sample' },
  { slug: 'structural-engineering-msc', level: 'master', faculty: 'engineering', department: 'group-1', durationYears: 2,
    title: { fa: 'مهندسی عمران — سازه', en: 'Civil Engineering — Structures' }, field: { fa: 'فنی و مهندسی', en: 'Engineering' },
    intro: { fa: 'تحلیل پیشرفته و طراحی لرزه‌ای سازه‌ها، روش‌های عددی و مدل‌سازی رفتار مصالح.', en: 'Advanced analysis and seismic design of structures, numerical methods and modelling of material behaviour.' },
    requirements: common.master, provenance: 'sample' },
  { slug: 'computer-engineering-bsc', level: 'bachelor', faculty: 'engineering', department: 'group-2', durationYears: 4,
    title: { fa: 'مهندسی کامپیوتر', en: 'Computer Engineering' }, field: { fa: 'فنی و مهندسی', en: 'Engineering' },
    intro: { fa: 'مبانی نرم‌افزار و سخت‌افزار، الگوریتم‌ها، شبکه‌های کامپیوتری و مهندسی نرم‌افزار.', en: 'Foundations of software and hardware, algorithms, computer networks and software engineering.' },
    requirements: common.bachelor, provenance: 'sample' },
  { slug: 'electrical-engineering-bsc', level: 'bachelor', faculty: 'engineering', department: 'group-2', durationYears: 4,
    title: { fa: 'مهندسی برق', en: 'Electrical Engineering' }, field: { fa: 'فنی و مهندسی', en: 'Engineering' },
    intro: { fa: 'مدارهای الکتریکی، الکترونیک، سیستم‌های قدرت و کنترل با تمرین‌های آزمایشگاهی.', en: 'Electrical circuits, electronics, power systems and control, supported by laboratory practice.' },
    provenance: 'sample' },
  { slug: 'nursing-bsc', level: 'bachelor', faculty: 'humanities', department: 'nursing', durationYears: 4,
    title: { fa: 'پرستاری', en: 'Nursing' }, field: { fa: 'علوم پزشکی', en: 'Health sciences' },
    intro: { fa: 'آموزش نظری و کارآموزی بالینی در مراقبت از بیمار، اخلاق حرفه‌ای و سلامت جامعه.', en: 'Theoretical teaching and clinical placements in patient care, professional ethics and community health.' },
    requirements: common.bachelor, provenance: 'sample' },
  { slug: 'psychology-ba', level: 'bachelor', faculty: 'humanities', department: 'group-4', durationYears: 4,
    title: { fa: 'روان‌شناسی', en: 'Psychology' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'شناخت فرایندهای ذهنی و رفتاری انسان، روش‌های پژوهش و کاربردهای روان‌شناسی در جامعه.', en: 'Human mental and behavioural processes, research methods and the applications of psychology in society.' },
    provenance: 'sample' },
  { slug: 'law-llb', level: 'bachelor', faculty: 'law-theology-political-science', department: 'group-7', durationYears: 4,
    title: { fa: 'حقوق', en: 'Law' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'مبانی حقوق خصوصی، عمومی و جزا، آیین دادرسی و مهارت‌های تحلیل حقوقی.', en: 'Foundations of private, public and criminal law, civil procedure and legal analysis skills.' },
    requirements: common.bachelor, provenance: 'sample' },
  { slug: 'private-law-llm', level: 'master', faculty: 'law-theology-political-science', department: 'group-7', durationYears: 2,
    title: { fa: 'حقوق خصوصی', en: 'Private Law' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'مطالعه پیشرفته حقوق قراردادها، مسئولیت مدنی و حقوق خانواده.', en: 'Advanced study of contract law, civil liability and family law.' },
    requirements: common.master, provenance: 'sample' },
  { slug: 'political-science-ba', level: 'bachelor', faculty: 'law-theology-political-science', department: 'group-8', durationYears: 4,
    title: { fa: 'علوم سیاسی', en: 'Political Science' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'اندیشه سیاسی، روابط بین‌الملل، سیاست‌گذاری عمومی و روش‌های تحلیل سیاسی.', en: 'Political thought, international relations, public policy and methods of political analysis.' },
    provenance: 'sample' },
  { slug: 'theology-ba', level: 'bachelor', faculty: 'law-theology-political-science', department: 'group-8', durationYears: 4,
    title: { fa: 'الهیات و معارف اسلامی', en: 'Theology and Islamic Studies' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'مطالعه متون دینی، فقه و مبانی حقوق اسلامی، فلسفه و کلام اسلامی.', en: 'Study of religious texts, Islamic jurisprudence and legal foundations, Islamic philosophy and theology.' },
    provenance: 'sample' },
  { slug: 'business-management-ba', level: 'bachelor', faculty: 'management-economics', department: 'group-5', durationYears: 4,
    title: { fa: 'مدیریت بازرگانی', en: 'Business Management' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'اصول مدیریت، بازاریابی، رفتار سازمانی و مدیریت مالی برای کسب‌وکارها.', en: 'Principles of management, marketing, organisational behaviour and financial management for business.' },
    requirements: common.bachelor, provenance: 'sample' },
  { slug: 'public-administration-ma', level: 'master', faculty: 'management-economics', department: 'group-5', durationYears: 2,
    title: { fa: 'مدیریت دولتی', en: 'Public Administration' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'خط‌مشی‌گذاری عمومی، مدیریت منابع انسانی در بخش عمومی و حکمرانی.', en: 'Public policy-making, human resource management in the public sector and governance.' },
    requirements: common.master, provenance: 'sample' },
  { slug: 'accounting-ba', level: 'bachelor', faculty: 'management-economics', department: 'group-6', durationYears: 4,
    title: { fa: 'حسابداری', en: 'Accounting' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'حسابداری مالی و مدیریت، حسابرسی، مالیات و سیستم‌های اطلاعاتی حسابداری.', en: 'Financial and management accounting, auditing, taxation and accounting information systems.' },
    provenance: 'sample' },
  { slug: 'accounting-associate', level: 'associate', faculty: 'management-economics', department: 'group-6', durationYears: 2,
    title: { fa: 'حسابداری (کاردانی)', en: 'Accounting (Associate)' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'دوره کاربردی دو ساله در مبانی حسابداری و نرم‌افزارهای مالی.', en: 'A two-year applied programme in accounting fundamentals and financial software.' },
    provenance: 'sample' },
  { slug: 'economics-ba', level: 'bachelor', faculty: 'management-economics', department: 'group-6', durationYears: 4,
    title: { fa: 'اقتصاد', en: 'Economics' }, field: { fa: 'علوم انسانی', en: 'Humanities' },
    intro: { fa: 'اقتصاد خرد و کلان، اقتصادسنجی و تحلیل سیاست‌های اقتصادی.', en: 'Microeconomics and macroeconomics, econometrics and economic policy analysis.' },
    provenance: 'sample' },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
