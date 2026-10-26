import type { L } from '@/types/content';
import { faculties } from './faculties';
import { presidencyUnits, vicePresidencies } from './units';

/** Single source for the header mega-menu, the mobile drawer and the full-site menu panel. */
export type NavLink = { label: L; href: string; description?: L };
export type NavColumn = { title: L; href?: string; links: NavLink[] };
export type NavGroup = { id: string; label: L; href: string; intro: L; columns: NavColumn[] };

const l = (fa: string, en: string): L => ({ fa, en });

export const navigation: NavGroup[] = [
  {
    id: 'about',
    label: l('درباره واحد', 'About'),
    href: '/about',
    intro: l('آشنایی با دانشگاه، تاریخچه، موقعیت و راه‌های ارتباطی.', 'The university, its history, location and contact channels.'),
    columns: [
      {
        title: l('درباره واحد', 'About the branch'),
        href: '/about',
        links: [
          { label: l('معرفی دانشگاه', 'Overview'), href: '/about' },
          { label: l('تاریخچه', 'History'), href: '/about/history' },
          { label: l('موقعیت پردیس', 'Campus location'), href: '/about/location' },
          { label: l('هیئت امنا', 'Board of Trustees'), href: '/board' },
        ],
      },
      {
        title: l('ارتباط با ما', 'Get in touch'),
        links: [
          { label: l('تماس با ما', 'Contact us'), href: '/contact' },
          { label: l('راهنمای تلفن دانشگاه', 'Telephone directory'), href: '/about/phone-directory' },
          { label: l('فهرست افراد', 'People directory'), href: '/people' },
        ],
      },
    ],
  },
  {
    id: 'organization',
    label: l('ساختار سازمانی', 'Organisation'),
    href: '/presidency',
    intro: l('حوزه ریاست، معاونت‌ها و واحدهای اداری دانشگاه.', 'The Presidency, vice-presidencies and administrative offices.'),
    columns: [
      {
        title: l('حوزه ریاست', 'University Presidency'),
        href: '/presidency',
        links: presidencyUnits.map((u) => ({ label: u.name, href: `/presidency/${u.slug}` })),
      },
      {
        title: l('معاونت‌ها', 'Vice-Presidencies'),
        href: '/vice-presidencies',
        links: vicePresidencies.map((u) => ({ label: u.name, href: `/vice-presidencies/${u.slug}` })),
      },
    ],
  },
  {
    id: 'academics',
    label: l('آموزش', 'Academics'),
    href: '/faculties',
    intro: l('دانشکده‌ها، رشته‌های تحصیلی، تقویم آموزشی و آیین‌نامه‌ها.', 'Faculties, programmes, the academic calendar and regulations.'),
    columns: [
      {
        title: l('دانشکده‌ها', 'Faculties'),
        href: '/faculties',
        links: faculties.map((f) => ({ label: f.name, href: `/faculties/${f.slug}` })),
      },
      {
        title: l('منابع آموزشی', 'Academic resources'),
        links: [
          { label: l('رشته‌های تحصیلی', 'Academic programmes'), href: '/programs' },
          { label: l('تقویم آموزشی', 'Academic calendar'), href: '/calendar' },
          { label: l('فرم‌ها و آیین‌نامه‌ها', 'Forms and regulations'), href: '/forms' },
          { label: l('سامانه‌های مرتبط', 'Related systems'), href: '/systems' },
        ],
      },
    ],
  },
  {
    id: 'admissions',
    label: l('پذیرش و دانشجویان', 'Admissions & Students'),
    href: '/admissions',
    intro: l('راهنمای پذیرش، ثبت‌نام دانشجویان جدید و پشتیبانی دانشجویان.', 'Admissions guidance, new-student registration and student support.'),
    columns: [
      {
        title: l('پذیرش', 'Admissions'),
        href: '/admissions',
        links: [
          { label: l('معرفی پذیرش', 'Admissions overview'), href: '/admissions' },
          { label: l('ثبت‌نام دانشجویان جدید', 'New student registration'), href: '/admissions#registration' },
          { label: l('مدارک لازم', 'Required documents'), href: '/admissions#documents' },
          { label: l('پرسش‌های متداول پذیرش', 'Admissions FAQ'), href: '/admissions#faq' },
        ],
      },
      {
        title: l('دانشجویان', 'Students'),
        links: [
          { label: l('پشتیبانی دانشجویان', 'Student support'), href: '/student-support' },
          { label: l('تقویم آموزشی', 'Academic calendar'), href: '/calendar' },
          { label: l('اطلاعیه‌ها', 'Announcements'), href: '/announcements' },
          { label: l('فرم‌ها و آیین‌نامه‌ها', 'Forms and regulations'), href: '/forms' },
        ],
      },
    ],
  },
  {
    id: 'research',
    label: l('پژوهش و نوآوری', 'Research & Innovation'),
    href: '/vice-presidencies/research-technology',
    intro: l('پژوهش، فناوری، مرکز رشد، خانه نوآوری و نشریات.', 'Research, technology, the Growth Center, Innovation House and publications.'),
    columns: [
      {
        title: l('پژوهش و فناوری', 'Research & technology'),
        links: [
          { label: l('معاونت پژوهش و فناوری', 'Research and Technology'), href: '/vice-presidencies/research-technology' },
          { label: l('مرکز رشد', 'Growth Center'), href: '/growth-center' },
          { label: l('خانه نوآوری', 'Innovation House'), href: '/innovation' },
        ],
      },
      {
        title: l('انتشارات', 'Publishing'),
        links: [
          { label: l('خبرنامه‌ها و نشریات', 'Newsletters and publications'), href: '/publications' },
          { label: l('درگاه‌های پژوهشی', 'Research portals'), href: '/systems#portals' },
        ],
      },
    ],
  },
  {
    id: 'news',
    label: l('اخبار و رسانه', 'News & Media'),
    href: '/news',
    intro: l('اخبار، رویدادها، اطلاعیه‌ها و مرکز رسانه دانشگاه.', 'News, events, announcements and the media centre.'),
    columns: [
      {
        title: l('اخبار', 'News'),
        href: '/news',
        links: [
          { label: l('همه اخبار', 'All news'), href: '/news' },
          { label: l('رویدادها', 'Events'), href: '/news?category=event' },
          { label: l('اطلاعیه‌ها', 'Announcements'), href: '/announcements' },
        ],
      },
      {
        title: l('مرکز رسانه', 'Media centre'),
        href: '/media',
        links: [
          { label: l('گالری تصاویر', 'Photo galleries'), href: '/media#galleries' },
          { label: l('ویدئوها', 'Videos'), href: '/media#videos' },
          { label: l('نشریات', 'Publications'), href: '/publications' },
        ],
      },
    ],
  },
];

export const footerLinks: NavLink[] = [
  { label: l('درباره دانشگاه', 'About the university'), href: '/about' },
  { label: l('دانشکده‌ها', 'Faculties'), href: '/faculties' },
  { label: l('رشته‌های تحصیلی', 'Academic programmes'), href: '/programs' },
  { label: l('پذیرش', 'Admissions'), href: '/admissions' },
  { label: l('اخبار', 'News'), href: '/news' },
  { label: l('اطلاعیه‌ها', 'Announcements'), href: '/announcements' },
  { label: l('فرم‌ها و آیین‌نامه‌ها', 'Forms and regulations'), href: '/forms' },
  { label: l('تقویم آموزشی', 'Academic calendar'), href: '/calendar' },
  { label: l('پشتیبانی دانشجویان', 'Student support'), href: '/student-support' },
  { label: l('فهرست افراد', 'People directory'), href: '/people' },
];
