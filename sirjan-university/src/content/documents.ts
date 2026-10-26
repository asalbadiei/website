import type { DocumentItem, L } from '@/types/content';

/**
 * Forms and regulations library. No official file has been supplied yet, so every item has no
 * `href` and renders "File not yet uploaded". Add files under /public/documents and set `href`.
 */
const l = (fa: string, en: string): L => ({ fa, en });
const edu = l('معاونت آموزشی و تحصیلات تکمیلی', 'Vice-Presidency for Education and Graduate Studies');
const res = l('معاونت پژوهش و فناوری', 'Vice-Presidency for Research and Technology');
const stu = l('معاونت دانشجویی و فرهنگی', 'Vice-Presidency for Student Affairs and Culture');
const dev = l('معاونت توسعه مدیریت و منابع', 'Vice-Presidency for Development and Resource Management');

export const documents: DocumentItem[] = [
  { id: 'course-withdrawal-form', category: 'education', fileType: 'pdf', department: edu, provenance: 'pending',
    title: l('فرم درخواست حذف اضطراری درس', 'Emergency course withdrawal request form'),
    description: l('برای درخواست حذف یک درس پس از پایان بازه حذف و اضافه.', 'To request withdrawal from a course after the add/drop window has closed.') },
  { id: 'leave-of-absence-form', category: 'education', fileType: 'pdf', department: edu, provenance: 'pending',
    title: l('فرم درخواست مرخصی تحصیلی', 'Leave of absence request form'),
    description: l('برای درخواست مرخصی تحصیلی یک نیم‌سال.', 'To request a leave of absence for one term.') },
  { id: 'transfer-request-form', category: 'education', fileType: 'pdf', department: edu, provenance: 'pending',
    title: l('فرم درخواست انتقال یا میهمانی', 'Transfer or visiting-student request form'),
    description: l('برای درخواست انتقال به واحد دیگر یا تحصیل به‌صورت میهمان.', 'To request a transfer to another branch or to study as a visiting student.') },
  { id: 'thesis-proposal-form', category: 'graduate', fileType: 'docx', department: edu, provenance: 'pending',
    title: l('فرم پیشنهاد پایان‌نامه کارشناسی ارشد', 'Master’s thesis proposal form'),
    description: l('قالب تدوین و تصویب پیشنهاد پایان‌نامه.', 'Template for preparing and approving a thesis proposal.') },
  { id: 'thesis-defence-request', category: 'graduate', fileType: 'pdf', department: edu, provenance: 'pending',
    title: l('فرم درخواست برگزاری جلسه دفاع', 'Thesis defence request form'),
    description: l('برای درخواست تعیین زمان جلسه دفاع پس از تأیید استاد راهنما.', 'To request a defence date after supervisor approval.') },
  { id: 'research-proposal-form', category: 'research', fileType: 'docx', department: res, provenance: 'pending',
    title: l('فرم پیشنهاد طرح پژوهشی', 'Research proposal form'),
    description: l('برای ارائه طرح‌های پژوهشی اعضای هیئت علمی.', 'For faculty members submitting research proposals.') },
  { id: 'conference-support-form', category: 'research', fileType: 'pdf', department: res, provenance: 'pending',
    title: l('فرم درخواست حمایت از شرکت در همایش', 'Conference attendance support request'),
    description: l('برای درخواست حمایت از ارائه مقاله در همایش‌های علمی.', 'To request support for presenting a paper at an academic conference.') },
  { id: 'student-loan-form', category: 'student', fileType: 'pdf', department: stu, provenance: 'pending',
    title: l('فرم درخواست خدمات رفاهی', 'Welfare services request form'),
    description: l('شرایط استفاده پس از تأیید معاونت دانشجویی اعلام می‌شود.', 'Eligibility will be announced once confirmed by the Vice-Presidency for Student Affairs.') },
  { id: 'association-registration', category: 'student', fileType: 'docx', department: stu, provenance: 'pending',
    title: l('فرم تأسیس انجمن علمی دانشجویی', 'Student scientific association registration form'),
    description: l('برای ثبت انجمن علمی جدید در دانشکده.', 'To register a new scientific association in a faculty.') },
  { id: 'facility-booking-form', category: 'administrative', fileType: 'pdf', department: dev, provenance: 'pending',
    title: l('فرم درخواست رزرو سالن', 'Venue booking request form'),
    description: l('برای رزرو سالن اجتماعات یا کلاس برای رویدادها.', 'To book the auditorium or a classroom for an event.') },
  { id: 'education-regulations', category: 'regulations', fileType: 'pdf', department: edu, provenance: 'pending',
    title: l('آیین‌نامه آموزشی دوره کارشناسی', 'Undergraduate academic regulations'),
    description: l('مقررات آموزشی حاکم بر دوره‌های کارشناسی.', 'Academic regulations governing bachelor’s programmes.') },
  { id: 'graduate-regulations', category: 'regulations', fileType: 'pdf', department: edu, provenance: 'pending',
    title: l('آیین‌نامه دوره کارشناسی ارشد', 'Master’s programme regulations'),
    description: l('مقررات آموزشی و پژوهشی دوره کارشناسی ارشد.', 'Academic and research regulations for master’s programmes.') },
  { id: 'disciplinary-regulations', category: 'regulations', fileType: 'pdf', department: stu, provenance: 'pending',
    title: l('آیین‌نامه انضباطی دانشجویان', 'Student disciplinary regulations'),
    description: l('مقررات و رویه‌های انضباطی دانشجویان.', 'Student disciplinary rules and procedures.') },
];
