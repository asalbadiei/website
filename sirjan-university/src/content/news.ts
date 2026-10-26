import type { ImageRef, NewsItem } from '@/types/content';

/** SAMPLE DATASET — illustrative news and events for the design. Replace with official news. */
const img = (name: string, fa: string, en: string): ImageRef => ({
  src: `/illustrations/${name}.svg`,
  alt: { fa, en },
  illustrative: true,
});

export const news: NewsItem[] = [
  {
    slug: 'new-academic-year-opening-ceremony',
    category: 'university',
    date: '2026-09-27',
    featured: true,
    title: { fa: 'آیین آغاز سال تحصیلی جدید با حضور دانشجویان ورودی برگزار شد', en: 'New academic year opens with a welcome ceremony for incoming students' },
    summary: { fa: 'در این آیین، مسئولان دانشگاه ضمن خوشامدگویی به دانشجویان جدید، برنامه‌های آموزشی و خدمات دانشجویی سال پیش رو را معرفی کردند.', en: 'University leaders welcomed new students and outlined the academic programmes and student services for the year ahead.' },
    body: [
      { fa: 'آیین آغاز سال تحصیلی با حضور دانشجویان ورودی، اعضای هیئت علمی و کارکنان دانشگاه در سالن اجتماعات برگزار شد.', en: 'The opening ceremony of the academic year was held in the main auditorium, attended by incoming students, faculty members and staff.' },
      { fa: 'در این مراسم، معاونت‌های آموزشی و دانشجویی درباره فرایند انتخاب واحد، سامانه‌های آموزشی، خدمات مشاوره و فعالیت‌های فوق‌برنامه توضیح دادند.', en: 'The vice-presidencies for education and student affairs explained course registration, the online academic systems, counselling services and extracurricular activities.' },
      { fa: 'دانشجویان جدید پس از مراسم با همراهی راهنمایان دانشجویی از بخش‌های مختلف پردیس، کتابخانه و آزمایشگاه‌ها بازدید کردند.', en: 'After the ceremony, student guides led new students on a tour of the campus, the library and the laboratories.' },
    ],
    image: img('ceremony', 'تصویر نمادین مراسم دانشگاهی', 'Illustration of a university ceremony'),
    provenance: 'sample',
  },
  {
    slug: 'regional-industry-research-agreement',
    category: 'research',
    date: '2026-10-18',
    featured: true,
    title: { fa: 'تفاهم‌نامه همکاری پژوهشی با صنایع منطقه امضا شد', en: 'Research cooperation agreement signed with regional industry' },
    summary: { fa: 'این تفاهم‌نامه زمینه تعریف پروژه‌های پژوهشی مشترک، کارآموزی دانشجویان و استفاده از توان آزمایشگاهی دانشگاه را فراهم می‌کند.', en: 'The agreement provides for joint research projects, student internships and use of the university’s laboratory capacity.' },
    body: [
      { fa: 'معاونت پژوهش و فناوری دانشگاه تفاهم‌نامه‌ای برای همکاری در زمینه پژوهش‌های کاربردی با مجموعه‌ای از واحدهای صنعتی منطقه امضا کرد.', en: 'The Vice-Presidency for Research and Technology signed an agreement with a group of regional industrial organisations on applied research cooperation.' },
      { fa: 'بر اساس این تفاهم‌نامه، پایان‌نامه‌های تحصیلات تکمیلی می‌توانند بر نیازهای واقعی صنعت متمرکز شوند و دانشجویان از فرصت کارآموزی بهره‌مند شوند.', en: 'Under the agreement, graduate theses can focus on real industrial needs and students will benefit from internship opportunities.' },
    ],
    image: img('research', 'تصویر نمادین پژوهش آزمایشگاهی', 'Illustration of laboratory research'),
    attachments: [{ title: { fa: 'متن خلاصه تفاهم‌نامه', en: 'Summary of the agreement' }, fileType: 'pdf' }],
    provenance: 'sample',
  },
  {
    slug: 'student-scientific-association-elections',
    category: 'student',
    date: '2026-10-12',
    title: { fa: 'انتخابات انجمن‌های علمی دانشجویی برگزار می‌شود', en: 'Student scientific association elections announced' },
    summary: { fa: 'دانشجویان علاقه‌مند می‌توانند برای عضویت در شورای مرکزی انجمن‌های علمی دانشکده‌ها نامزد شوند.', en: 'Interested students may stand for the central councils of the faculties’ scientific associations.' },
    body: [
      { fa: 'معاونت دانشجویی و فرهنگی از برگزاری انتخابات انجمن‌های علمی دانشجویی در همه دانشکده‌ها خبر داد.', en: 'The Vice-Presidency for Student Affairs and Culture announced elections for student scientific associations in all faculties.' },
      { fa: 'جزئیات زمان ثبت‌نام نامزدها و برگزاری انتخابات از طریق اطلاعیه‌های دانشکده‌ها اعلام می‌شود.', en: 'Details of candidate registration and the election timetable will be published through faculty announcements.' },
    ],
    image: img('students', 'تصویر نمادین فعالیت دانشجویی', 'Illustration of student activity'),
    provenance: 'sample',
  },
  {
    slug: 'library-extended-hours-exams',
    category: 'university',
    date: '2026-10-05',
    title: { fa: 'افزایش ساعات خدمت‌رسانی کتابخانه مرکزی', en: 'Central library extends its opening hours' },
    summary: { fa: 'کتابخانه مرکزی برای پشتیبانی از مطالعه دانشجویان، ساعات فعالیت سالن‌های مطالعه را افزایش داد.', en: 'To support students’ studies, the central library has extended the opening hours of its reading rooms.' },
    body: [
      { fa: 'بر اساس تصمیم مدیریت کتابخانه، سالن‌های مطالعه در روزهای کاری با ساعات طولانی‌تری پذیرای دانشجویان خواهند بود.', en: 'Following a decision by library management, the reading rooms will be open for longer on working days.' },
      { fa: 'برنامه دقیق ساعات کاری در تابلوی اعلانات کتابخانه و اطلاعیه‌های دانشگاه منتشر می‌شود.', en: 'The detailed timetable will be posted on the library noticeboard and in university announcements.' },
    ],
    image: img('library', 'تصویر نمادین کتابخانه', 'Illustration of a library'),
    provenance: 'sample',
  },
  {
    slug: 'innovation-house-startup-weekend',
    category: 'event',
    date: '2026-10-20',
    title: { fa: 'رویداد ایده‌پردازی و کارآفرینی در خانه نوآوری', en: 'Ideation and entrepreneurship event at the Innovation House' },
    summary: { fa: 'خانه نوآوری دانشگاه رویدادی دو روزه برای تبدیل ایده‌های دانشجویی به طرح‌های کسب‌وکار برگزار می‌کند.', en: 'The university’s Innovation House is holding a two-day event to turn student ideas into business plans.' },
    body: [
      { fa: 'در این رویداد، تیم‌های دانشجویی با همراهی منتورها ایده‌های خود را توسعه داده و در پایان در برابر داوران ارائه می‌کنند.', en: 'Student teams will develop their ideas with mentors and present them to a judging panel at the close of the event.' },
      { fa: 'شرکت در این رویداد برای همه دانشجویان دانشگاه آزاد است و ثبت‌نام از طریق خانه نوآوری انجام می‌شود.', en: 'The event is open to all students of the university; registration is handled by the Innovation House.' },
    ],
    image: img('innovation', 'تصویر نمادین نوآوری و فناوری', 'Illustration of innovation and technology'),
    event: { start: '2026-11-11', end: '2026-11-12', venue: { fa: 'خانه نوآوری دانشگاه', en: 'University Innovation House' } },
    provenance: 'sample',
  },
  {
    slug: 'research-week-conference',
    category: 'event',
    date: '2026-10-22',
    title: { fa: 'همایش دانشجویی هفته پژوهش', en: 'Student conference for Research Week' },
    summary: { fa: 'به مناسبت هفته پژوهش، همایشی برای ارائه دستاوردهای پژوهشی دانشجویان و اعضای هیئت علمی برگزار می‌شود.', en: 'To mark Research Week, a conference will showcase the research of students and faculty members.' },
    body: [
      { fa: 'این همایش فرصتی برای ارائه مقالات، پوسترهای پژوهشی و گفت‌وگو درباره پژوهش‌های کاربردی منطقه است.', en: 'The conference offers an opportunity to present papers and research posters and to discuss applied research in the region.' },
    ],
    image: img('conference', 'تصویر نمادین همایش علمی', 'Illustration of an academic conference'),
    event: { start: '2026-12-15', venue: { fa: 'سالن اجتماعات دانشگاه', en: 'University auditorium' } },
    provenance: 'sample',
  },
  {
    slug: 'nursing-clinical-skills-workshop',
    category: 'university',
    date: '2026-09-30',
    title: { fa: 'کارگاه مهارت‌های بالینی برای دانشجویان پرستاری', en: 'Clinical skills workshop for nursing students' },
    summary: { fa: 'کارگاه آموزشی مهارت‌های بالینی پایه با هدف آمادگی دانشجویان برای آغاز کارآموزی برگزار شد.', en: 'A basic clinical skills workshop was held to prepare students for the start of their placements.' },
    body: [
      { fa: 'در این کارگاه، دانشجویان با اصول ایمنی بیمار، کنترل عفونت و مهارت‌های ارتباطی در محیط بالینی آشنا شدند.', en: 'Students learned the principles of patient safety, infection control and communication skills in clinical settings.' },
    ],
    image: img('lab', 'تصویر نمادین آموزش آزمایشگاهی', 'Illustration of laboratory teaching'),
    provenance: 'sample',
  },
  {
    slug: 'cultural-week-program',
    category: 'culture',
    date: '2026-09-20',
    title: { fa: 'برنامه‌های فرهنگی هفته آغاز سال تحصیلی', en: 'Cultural programme for the start of the academic year' },
    summary: { fa: 'نمایشگاه کتاب، مسابقات ورزشی و برنامه‌های هنری بخشی از برنامه‌های فرهنگی این هفته است.', en: 'A book fair, sports competitions and arts programmes form part of this week’s cultural events.' },
    body: [
      { fa: 'معاونت دانشجویی و فرهنگی مجموعه‌ای از برنامه‌های فرهنگی، هنری و ورزشی را برای دانشجویان تدارک دیده است.', en: 'The Vice-Presidency for Student Affairs and Culture has organised a series of cultural, artistic and sports events for students.' },
    ],
    image: img('sport', 'تصویر نمادین فعالیت ورزشی', 'Illustration of sports activity'),
    provenance: 'sample',
  },
  {
    slug: 'graduation-ceremony',
    category: 'event',
    date: '2026-09-10',
    title: { fa: 'جشن دانش‌آموختگی دانشجویان', en: 'Graduation ceremony for the graduating class' },
    summary: { fa: 'جشن دانش‌آموختگی با حضور دانش‌آموختگان، خانواده‌ها و اعضای هیئت علمی برگزار شد.', en: 'The graduation ceremony was attended by graduates, their families and faculty members.' },
    body: [
      { fa: 'در این جشن از دانش‌آموختگان ممتاز دانشکده‌ها تقدیر شد.', en: 'Outstanding graduates from each faculty were recognised during the ceremony.' },
    ],
    image: img('graduation', 'تصویر نمادین جشن دانش‌آموختگی', 'Illustration of a graduation ceremony'),
    event: { start: '2026-09-08', venue: { fa: 'سالن اجتماعات دانشگاه', en: 'University auditorium' } },
    provenance: 'sample',
  },
];

export const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));

export function getNews(slug: string) {
  return news.find((n) => n.slug === slug);
}
