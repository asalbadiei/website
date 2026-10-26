import type { ExternalLink, L } from '@/types/content';

/**
 * Central registry of outbound destinations. A link gets an `href` only when its destination is a
 * well-established official address; everything else renders as "address pending verification"
 * rather than guessing a URL. Confirm all addresses with the ICT directorate before launch.
 */
const l = (fa: string, en: string): L => ({ fa, en });

export const systemCategories: Record<string, L> = {
  students: l('سامانه‌های آموزشی دانشجویان', 'Student academic systems'),
  staff: l('سامانه‌های کارکنان و اعضای هیئت علمی', 'Faculty and staff systems'),
  research: l('سامانه‌های پژوهشی', 'Research systems'),
  library: l('کتابخانه', 'Library'),
  central: l('خدمات مرکزی دانشگاه', 'Central university services'),
  lms: l('سامانه آموزش مجازی', 'Learning management'),
};

export const systems: ExternalLink[] = [
  { id: 'education-portal', category: 'students', icon: 'graduation',
    title: l('سامانه آموزشی دانشجویان', 'Student academic portal'),
    description: l('انتخاب واحد، کارنامه و برنامه کلاسی.', 'Course registration, transcripts and timetables.') },
  { id: 'admissions-system', category: 'students', icon: 'clipboard', href: 'https://azmoon.iau.ac.ir',
    title: l('مرکز سنجش و پذیرش', 'Admissions and Assessment Centre'),
    description: l('ثبت‌نام و انتخاب رشته داوطلبان دانشگاه آزاد اسلامی.', 'Applications and programme choice for Islamic Azad University applicants.') },
  { id: 'staff-portal', category: 'staff', icon: 'briefcase',
    title: l('سامانه کارکنان', 'Staff portal'),
    description: l('خدمات اداری کارکنان دانشگاه.', 'Administrative services for university staff.') },
  { id: 'faculty-portal', category: 'staff', icon: 'user',
    title: l('سامانه اعضای هیئت علمی', 'Faculty portal'),
    description: l('ثبت نمرات و امور آموزشی استادان.', 'Grade entry and teaching administration for faculty.') },
  { id: 'research-system', category: 'research', icon: 'flask',
    title: l('سامانه پژوهشی', 'Research system'),
    description: l('ثبت طرح‌ها، پایان‌نامه‌ها و فعالیت‌های پژوهشی.', 'Registration of projects, theses and research activities.') },
  { id: 'library-catalogue', category: 'library', icon: 'book',
    title: l('فهرست کتابخانه', 'Library catalogue'),
    description: l('جستجوی منابع کتابخانه دانشگاه.', 'Search the university library’s holdings.') },
  { id: 'iau-central', category: 'central', icon: 'landmark', href: 'https://iau.ac.ir',
    title: l('سازمان مرکزی دانشگاه آزاد اسلامی', 'Islamic Azad University central portal'),
    description: l('درگاه رسمی سازمان مرکزی دانشگاه.', 'Official portal of the university’s central organisation.') },
  { id: 'lms', category: 'lms', icon: 'monitor',
    title: l('سامانه آموزش مجازی', 'Virtual learning system'),
    description: l('کلاس‌های برخط و محتوای آموزشی دروس.', 'Online classes and course materials.') },
];

export const portalCategories: Record<string, L> = {
  university: l('درگاه‌های دانشگاه آزاد اسلامی', 'Islamic Azad University portals'),
  national: l('نهادهای ملی', 'National institutions'),
  research: l('منابع پژوهشی', 'Research resources'),
};

export const portals: ExternalLink[] = [
  { id: 'iau', category: 'university', icon: 'landmark', href: 'https://iau.ac.ir',
    title: l('دانشگاه آزاد اسلامی', 'Islamic Azad University'), description: l('سازمان مرکزی دانشگاه آزاد اسلامی.', 'Central organisation of Islamic Azad University.') },
  { id: 'iau-azmoon', category: 'university', icon: 'clipboard', href: 'https://azmoon.iau.ac.ir',
    title: l('مرکز سنجش و پذیرش', 'Admissions and Assessment Centre'), description: l('اطلاع‌رسانی و ثبت‌نام پذیرش دانشجو.', 'Admissions information and applications.') },
  { id: 'sirjan-legacy', category: 'university', icon: 'globe', href: 'https://sirjan.iau.ir',
    title: l('وب‌سایت فعلی واحد سیرجان', 'Current Sirjan Branch website'), description: l('نشانی رسمی کنونی وب‌سایت واحد.', 'The branch’s current official web address.') },
  { id: 'msrt', category: 'national', icon: 'building', href: 'https://www.msrt.ir',
    title: l('وزارت علوم، تحقیقات و فناوری', 'Ministry of Science, Research and Technology'), description: l('وزارت متولی آموزش عالی.', 'The ministry responsible for higher education.') },
  { id: 'sanjesh', category: 'national', icon: 'clipboard', href: 'https://www.sanjesh.org',
    title: l('سازمان سنجش آموزش کشور', 'National Organization of Educational Testing'), description: l('برگزاری آزمون‌های سراسری.', 'Administers national entrance examinations.') },
  { id: 'irandoc', category: 'research', icon: 'book', href: 'https://irandoc.ac.ir',
    title: l('پژوهشگاه علوم و فناوری اطلاعات ایران (ایرانداک)', 'Iranian Research Institute for Information Science and Technology (IranDoc)'), description: l('ثبت و جستجوی پایان‌نامه‌ها و طرح‌های پژوهشی.', 'Registration and search of theses and research projects.') },
  { id: 'isc', category: 'research', icon: 'flask', href: 'https://isc.ac',
    title: l('پایگاه استنادی علوم جهان اسلام', 'Islamic World Science Citation Center (ISC)'), description: l('نمایه‌سازی و ارزیابی نشریات علمی.', 'Indexing and evaluation of scientific journals.') },
  { id: 'sid', category: 'research', icon: 'search', href: 'https://www.sid.ir',
    title: l('مرکز اطلاعات علمی جهاد دانشگاهی', 'Scientific Information Database (SID)'), description: l('دسترسی به مقالات نشریات علمی فارسی.', 'Access to articles from Persian-language journals.') },
];
