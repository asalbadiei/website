import type { Announcement } from '@/types/content';

/** SAMPLE DATASET — illustrative notices. No date or instruction here is official. */
export const announcements: Announcement[] = [
  {
    slug: 'course-registration-schedule',
    category: 'education',
    date: '2026-10-21',
    urgent: true,
    title: { fa: 'زمان‌بندی انتخاب واحد نیم‌سال دوم', en: 'Course registration timetable for the second term' },
    excerpt: { fa: 'زمان‌بندی انتخاب واحد بر اساس ورودی و مقطع تحصیلی اعلام شد. دانشجویان پیش از انتخاب واحد وضعیت مالی خود را بررسی کنند.', en: 'The registration timetable by intake year and degree level has been published. Students should check their account status before registering.' },
    body: [
      { fa: 'انتخاب واحد نیم‌سال دوم بر اساس جدول زمان‌بندی پیوست و فقط از طریق سامانه آموزشی انجام می‌شود.', en: 'Course registration for the second term follows the attached timetable and is carried out only through the online academic system.' },
      { fa: 'دانشجویانی که در زمان مقرر انتخاب واحد نکنند باید برای انتخاب واحد با تأخیر به اداره آموزش مراجعه کنند.', en: 'Students who miss their registration slot must contact the Education Office for late registration.' },
    ],
    attachments: [{ title: { fa: 'جدول زمان‌بندی انتخاب واحد', en: 'Registration timetable' }, fileType: 'pdf' }],
    provenance: 'sample',
  },
  {
    slug: 'midterm-exam-guidelines',
    category: 'exams',
    date: '2026-10-15',
    title: { fa: 'شیوه‌نامه برگزاری امتحانات میان‌ترم', en: 'Guidelines for mid-term examinations' },
    excerpt: { fa: 'نکات مربوط به حضور در جلسات امتحان، همراه داشتن کارت دانشجویی و مقررات جلسه امتحان را مطالعه کنید.', en: 'Read the guidance on attending examinations, carrying your student card and examination-room rules.' },
    body: [
      { fa: 'همراه داشتن کارت دانشجویی در جلسات امتحان الزامی است.', en: 'Students must carry their student card to every examination.' },
      { fa: 'زمان و محل امتحانات میان‌ترم توسط استاد هر درس اعلام می‌شود.', en: 'The time and place of each mid-term examination will be announced by the course instructor.' },
    ],
    provenance: 'sample',
  },
  {
    slug: 'new-student-document-submission',
    category: 'admissions',
    date: '2026-10-10',
    urgent: true,
    title: { fa: 'تحویل مدارک دانشجویان ورودی جدید', en: 'Document submission for new students' },
    excerpt: { fa: 'دانشجویان ورودی جدید برای تکمیل پرونده تحصیلی، اصل مدارک خود را به اداره پذیرش تحویل دهند.', en: 'New students should submit their original documents to the Admissions Office to complete their academic file.' },
    body: [
      { fa: 'فهرست مدارک لازم در صفحه پذیرش وب‌سایت درج شده است. پرونده دانشجویانی که مدارک را تحویل ندهند ناقص باقی می‌ماند.', en: 'The list of required documents is on the Admissions page. Files of students who do not submit their documents will remain incomplete.' },
    ],
    attachments: [{ title: { fa: 'فهرست مدارک لازم', en: 'List of required documents' }, fileType: 'pdf' }],
    provenance: 'sample',
  },
  {
    slug: 'research-grant-call',
    category: 'research',
    date: '2026-10-08',
    title: { fa: 'فراخوان طرح‌های پژوهشی اعضای هیئت علمی', en: 'Call for faculty research proposals' },
    excerpt: { fa: 'معاونت پژوهش و فناوری از اعضای هیئت علمی برای ارائه طرح‌های پژوهشی کاربردی دعوت می‌کند.', en: 'The Vice-Presidency for Research and Technology invites faculty members to submit applied research proposals.' },
    body: [
      { fa: 'طرح‌ها باید مطابق فرم پیشنهاد طرح پژوهشی تهیه و از طریق سامانه پژوهشی ارسال شوند.', en: 'Proposals must use the research proposal form and be submitted through the research system.' },
    ],
    attachments: [{ title: { fa: 'فرم پیشنهاد طرح پژوهشی', en: 'Research proposal form' }, fileType: 'docx' }],
    provenance: 'sample',
  },
  {
    slug: 'student-housing-application',
    category: 'student-affairs',
    date: '2026-09-28',
    title: { fa: 'درخواست خوابگاه دانشجویی', en: 'Student housing applications' },
    excerpt: { fa: 'شرایط و نحوه ثبت درخواست خوابگاه پس از تأیید از سوی معاونت دانشجویی اعلام می‌شود.', en: 'Eligibility and the application process will be announced by the Vice-Presidency for Student Affairs once confirmed.' },
    body: [
      { fa: 'این اطلاعیه نمونه است. شرایط واقعی استفاده از خوابگاه فقط از طریق معاونت دانشجویی اعلام می‌شود.', en: 'This is a sample notice. Actual housing eligibility will be announced only by the Vice-Presidency for Student Affairs.' },
    ],
    provenance: 'sample',
  },
  {
    slug: 'graduate-thesis-defence-procedure',
    category: 'education',
    date: '2026-09-24',
    title: { fa: 'روند درخواست جلسه دفاع از پایان‌نامه', en: 'Procedure for requesting a thesis defence' },
    excerpt: { fa: 'دانشجویان کارشناسی ارشد برای درخواست جلسه دفاع، فرم مربوط را پس از تأیید استاد راهنما تکمیل کنند.', en: 'Master’s students should complete the defence request form after approval by their supervisor.' },
    body: [
      { fa: 'فرم درخواست جلسه دفاع در بخش فرم‌ها و آیین‌نامه‌ها قرار دارد.', en: 'The defence request form is available in the Forms and Regulations section.' },
    ],
    provenance: 'sample',
  },
  {
    slug: 'website-redesign-preview',
    category: 'general',
    date: '2026-09-15',
    title: { fa: 'پیش‌نمایش وب‌سایت جدید دانشگاه', en: 'Preview of the new university website' },
    excerpt: { fa: 'نسخه جدید وب‌سایت با ساختار ساده‌تر و دسترسی آسان‌تر به خدمات در حال آماده‌سازی است.', en: 'A new version of the website with a simpler structure and easier access to services is in preparation.' },
    body: [
      { fa: 'پیشنهادهای خود درباره وب‌سایت جدید را از طریق صفحه تماس با ما ارسال کنید.', en: 'Please send suggestions about the new website through the Contact page.' },
    ],
    provenance: 'sample',
  },
];

export const sortedAnnouncements = [...announcements].sort((a, b) => b.date.localeCompare(a.date));

export function getAnnouncement(slug: string) {
  return announcements.find((a) => a.slug === slug);
}
