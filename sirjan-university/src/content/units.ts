import type { L, OrgUnit } from '@/types/content';

/**
 * Administrative units. Names follow the brief; descriptions describe the typical remit of each
 * office in general terms and must be reviewed by the office concerned. Heads are listed by
 * position only — names are published only once verified.
 */
const l = (fa: string, en: string): L => ({ fa, en });

export const presidencyUnits: OrgUnit[] = [
  {
    slug: 'president', icon: 'landmark', provenance: 'pending',
    name: l('ریاست واحد', 'President of the Branch'),
    summary: l('راهبری کلان آموزشی، پژوهشی و اداری واحد سیرجان.', 'Overall academic, research and administrative leadership of the Sirjan Branch.'),
    intro: [l('ریاست واحد مسئولیت هدایت راهبردی دانشگاه، هماهنگی معاونت‌ها و پیگیری برنامه‌های توسعه را بر عهده دارد.', 'The President of the Branch is responsible for the university’s strategic direction, coordination of the vice-presidencies and oversight of development plans.')],
    responsibilities: [
      l('تعیین اولویت‌ها و برنامه‌های راهبردی واحد', 'Setting the branch’s priorities and strategic plans'),
      l('هماهنگی میان معاونت‌ها و دانشکده‌ها', 'Coordinating the vice-presidencies and faculties'),
      l('نمایندگی دانشگاه در ارتباط با نهادهای استانی و ملی', 'Representing the university with provincial and national bodies'),
    ],
    head: { position: l('رئیس واحد', 'President') },
  },
  {
    slug: 'public-relations', icon: 'megaphone', provenance: 'pending',
    name: l('اداره کل حوزه ریاست و روابط عمومی', 'General Directorate of the Presidency and Public Relations'),
    summary: l('اطلاع‌رسانی رسمی، ارتباطات رسانه‌ای و امور دفتر ریاست.', 'Official communications, media relations and the President’s office.'),
    intro: [l('این اداره کل مسئول انتشار اخبار و اطلاعیه‌های رسمی، مدیریت وب‌سایت و ارتباط با رسانه‌ها و مخاطبان دانشگاه است.', 'This directorate publishes official news and announcements, manages the website and handles relations with the media and the university’s audiences.')],
    responsibilities: [
      l('انتشار اخبار و اطلاعیه‌های رسمی دانشگاه', 'Publishing official university news and announcements'),
      l('پوشش رسانه‌ای رویدادها و تولید محتوای تصویری', 'Media coverage of events and visual content production'),
      l('پاسخگویی به مراجعان و رسیدگی به پیشنهادها', 'Responding to enquiries and handling suggestions'),
    ],
    head: { position: l('مدیرکل حوزه ریاست و روابط عمومی', 'Director General') },
  },
  {
    slug: 'ict', icon: 'server', provenance: 'pending',
    name: l('اداره کل فناوری اطلاعات و ارتباطات', 'General Directorate of Information and Communications Technology'),
    summary: l('زیرساخت شبکه، سامانه‌های دانشگاهی و پشتیبانی فنی.', 'Network infrastructure, university systems and technical support.'),
    intro: [l('این اداره کل پشتیبانی از زیرساخت‌های فناوری اطلاعات، سامانه‌های آموزشی و اداری و امنیت اطلاعات را بر عهده دارد.', 'This directorate supports IT infrastructure, academic and administrative systems and information security.')],
    responsibilities: [
      l('پشتیبانی از شبکه و اینترنت دانشگاه', 'Supporting the university network and internet access'),
      l('پشتیبانی کاربران سامانه‌های آموزشی و اداری', 'User support for academic and administrative systems'),
      l('امنیت اطلاعات و نگهداری داده‌ها', 'Information security and data stewardship'),
    ],
    services: [
      { title: l('پشتیبانی سامانه‌ها', 'Systems support'), description: l('راهنمایی در ورود و استفاده از سامانه‌های دانشگاه.', 'Help with signing in to and using university systems.') },
      { title: l('شبکه بی‌سیم', 'Wireless network'), description: l('راهنمای اتصال به شبکه بی‌سیم پردیس.', 'Guidance on connecting to the campus wireless network.') },
    ],
    head: { position: l('مدیرکل فناوری اطلاعات و ارتباطات', 'Director General') },
  },
  {
    slug: 'international-affairs', icon: 'globe', provenance: 'pending',
    name: l('دفتر امور بین‌الملل', 'International Affairs Office'),
    summary: l('همکاری‌های علمی بین‌المللی و راهنمایی متقاضیان غیرایرانی.', 'International academic cooperation and guidance for international applicants.'),
    intro: [l('دفتر امور بین‌الملل زمینه همکاری با دانشگاه‌ها و مؤسسات خارجی و راهنمایی دانشجویان و پژوهشگران بین‌المللی را فراهم می‌کند.', 'The International Affairs Office supports cooperation with universities and institutions abroad and guides international students and researchers.')],
    responsibilities: [
      l('توسعه همکاری‌های علمی و تفاهم‌نامه‌های بین‌المللی', 'Developing academic cooperation and international agreements'),
      l('راهنمایی متقاضیان بین‌المللی', 'Guiding international applicants'),
      l('پشتیبانی از حضور اعضای هیئت علمی در رویدادهای بین‌المللی', 'Supporting faculty participation in international events'),
    ],
    head: { position: l('مدیر امور بین‌الملل', 'Director') },
  },
  {
    slug: 'security', icon: 'shield', provenance: 'pending',
    name: l('اداره کل حراست', 'General Directorate of University Security'),
    summary: l('حفظ امنیت و نظم پردیس و صیانت از اموال دانشگاه.', 'Campus safety, order and protection of university property.'),
    intro: [l('این اداره کل مسئول حفظ نظم و امنیت محیط دانشگاه و همکاری با واحدها در زمینه ایمنی است.', 'This directorate maintains order and security on campus and works with other offices on safety.')],
    responsibilities: [
      l('حفظ امنیت پردیس و ساختمان‌ها', 'Securing the campus and its buildings'),
      l('همکاری در برگزاری ایمن رویدادها', 'Supporting the safe running of events'),
    ],
    head: { position: l('مدیرکل حراست', 'Director General') },
  },
  {
    slug: 'legal-affairs', icon: 'scale', provenance: 'pending',
    name: l('دفتر امور حقوقی', 'Legal Affairs Office'),
    summary: l('مشاوره حقوقی، قراردادها و پیگیری دعاوی دانشگاه.', 'Legal advice, contracts and the university’s legal matters.'),
    intro: [l('دفتر امور حقوقی به واحدهای دانشگاه مشاوره حقوقی می‌دهد و قراردادها و امور حقوقی دانشگاه را پیگیری می‌کند.', 'The Legal Affairs Office advises university units and oversees contracts and legal matters.')],
    responsibilities: [
      l('بررسی و تنظیم قراردادها', 'Reviewing and drafting contracts'),
      l('ارائه مشاوره حقوقی به واحدها', 'Providing legal advice to offices'),
      l('پیگیری دعاوی حقوقی دانشگاه', 'Handling the university’s legal proceedings'),
    ],
    head: { position: l('مدیر امور حقوقی', 'Director') },
  },
];

export const vicePresidencies: OrgUnit[] = [
  {
    slug: 'research-technology', icon: 'flask', provenance: 'pending',
    name: l('معاونت پژوهش و فناوری', 'Vice-Presidency for Research and Technology'),
    summary: l('سیاست‌گذاری و پشتیبانی پژوهش، فناوری و ارتباط با صنعت.', 'Research and technology policy, support and industry engagement.'),
    intro: [l('معاونت پژوهش و فناوری طرح‌های پژوهشی، انتشارات علمی، کتابخانه و ارتباط با صنعت را پشتیبانی می‌کند و بر مرکز رشد و خانه نوآوری نظارت دارد.', 'The Vice-Presidency for Research and Technology supports research projects, scholarly publishing, the library and industry engagement, and oversees the Growth Center and Innovation House.')],
    responsibilities: [
      l('پشتیبانی از طرح‌ها و پایان‌نامه‌های پژوهشی', 'Supporting research projects and theses'),
      l('توسعه ارتباط با صنعت و جامعه', 'Developing links with industry and the community'),
      l('مدیریت کتابخانه و منابع علمی', 'Managing the library and scholarly resources'),
    ],
    head: { position: l('معاون پژوهش و فناوری', 'Vice-President') },
  },
  {
    slug: 'education-graduate-studies', icon: 'graduation', provenance: 'pending',
    name: l('معاونت آموزشی و تحصیلات تکمیلی', 'Vice-Presidency for Education and Graduate Studies'),
    summary: l('برنامه‌ریزی آموزشی، امور دانشجویان و تحصیلات تکمیلی.', 'Academic planning, student records and graduate studies.'),
    intro: [l('این معاونت برنامه‌ریزی دروس، تقویم آموزشی، امور ثبت‌نام و فارغ‌التحصیلی و تحصیلات تکمیلی را بر عهده دارد.', 'This vice-presidency is responsible for course planning, the academic calendar, enrolment and graduation, and graduate studies.')],
    responsibilities: [
      l('تدوین تقویم آموزشی و برنامه دروس', 'Preparing the academic calendar and course schedules'),
      l('امور ثبت‌نام، انتخاب واحد و فارغ‌التحصیلی', 'Enrolment, course registration and graduation'),
      l('نظارت بر دوره‌های تحصیلات تکمیلی', 'Oversight of graduate programmes'),
    ],
    head: { position: l('معاون آموزشی و تحصیلات تکمیلی', 'Vice-President') },
  },
  {
    slug: 'student-affairs-culture', icon: 'users', provenance: 'pending',
    name: l('معاونت دانشجویی و فرهنگی', 'Vice-Presidency for Student Affairs and Culture'),
    summary: l('خدمات رفاهی، مشاوره، فعالیت‌های فرهنگی و ورزشی دانشجویان.', 'Student welfare, counselling, and cultural and sports activities.'),
    intro: [l('این معاونت خدمات مشاوره، فعالیت‌های فرهنگی، هنری و ورزشی و انجمن‌های دانشجویی را پشتیبانی می‌کند.', 'This vice-presidency supports counselling services, cultural, artistic and sports activities and student associations.')],
    responsibilities: [
      l('خدمات مشاوره و سلامت دانشجویان', 'Counselling and student wellbeing services'),
      l('پشتیبانی از انجمن‌ها و تشکل‌های دانشجویی', 'Supporting student associations and societies'),
      l('برگزاری برنامه‌های فرهنگی و ورزشی', 'Organising cultural and sports programmes'),
    ],
    head: { position: l('معاون دانشجویی و فرهنگی', 'Vice-President') },
  },
  {
    slug: 'sama', icon: 'school', provenance: 'pending',
    name: l('معاونت سما', 'Vice-Presidency for Sama'),
    summary: l('امور مراکز آموزشی سما وابسته به دانشگاه.', 'Affairs of the university’s Sama educational centres.'),
    intro: [l('معاونت سما امور مدارس و مراکز آموزشی سمای وابسته به دانشگاه را هماهنگ می‌کند. معرفی کامل این معاونت پس از تأیید منتشر می‌شود.', 'The Vice-Presidency for Sama coordinates the Sama schools and educational centres affiliated with the university. A full introduction will be published once verified.')],
    responsibilities: [
      l('هماهنگی مراکز آموزشی سما', 'Coordinating Sama educational centres'),
      l('نظارت بر کیفیت آموزشی مراکز', 'Overseeing the quality of teaching in the centres'),
    ],
    head: { position: l('معاون سما', 'Vice-President') },
  },
  {
    slug: 'development-resources', icon: 'building', provenance: 'pending',
    name: l('معاونت توسعه مدیریت و منابع', 'Vice-Presidency for Development and Resource Management'),
    summary: l('امور مالی، منابع انسانی، عمرانی و پشتیبانی.', 'Finance, human resources, facilities and support services.'),
    intro: [l('این معاونت مدیریت منابع مالی و انسانی، طرح‌های عمرانی و خدمات پشتیبانی دانشگاه را بر عهده دارد.', 'This vice-presidency manages the university’s financial and human resources, construction projects and support services.')],
    responsibilities: [
      l('برنامه‌ریزی و مدیریت امور مالی', 'Financial planning and management'),
      l('امور منابع انسانی و کارکنان', 'Human resources and staff affairs'),
      l('توسعه و نگهداری فضاها و تجهیزات', 'Developing and maintaining facilities and equipment'),
    ],
    head: { position: l('معاون توسعه مدیریت و منابع', 'Vice-President') },
  },
];

export const growthCenter: OrgUnit = {
  slug: 'growth-center', icon: 'sprout', provenance: 'pending',
  name: l('مرکز رشد', 'Growth Center'),
  summary: l('حمایت از هسته‌های فناور و شرکت‌های دانش‌بنیان نوپا.', 'Support for technology teams and early-stage knowledge-based companies.'),
  intro: [
    l('مرکز رشد دانشگاه با فراهم کردن فضای کار، مشاوره تخصصی و ارتباط با سرمایه‌گذاران، به تبدیل ایده‌های فناورانه به کسب‌وکار کمک می‌کند.', 'The university’s Growth Center helps turn technological ideas into businesses by providing workspace, specialist advice and connections with investors.'),
    l('فهرست طرح‌های مستقر و شرایط پذیرش پس از تأیید از سوی مرکز منتشر می‌شود.', 'The list of resident projects and admission criteria will be published once confirmed by the centre.'),
  ],
  responsibilities: [
    l('پذیرش و ارزیابی هسته‌های فناور', 'Admitting and assessing technology teams'),
    l('ارائه مشاوره کسب‌وکار، حقوقی و مالی', 'Providing business, legal and financial advice'),
    l('ایجاد ارتباط با صنعت و سرمایه‌گذاران', 'Connecting teams with industry and investors'),
  ],
  services: [
    { title: l('فضای کار اشتراکی', 'Shared workspace'), description: l('فضای کار مجهز برای تیم‌های پذیرفته‌شده.', 'Equipped workspace for admitted teams.') },
    { title: l('منتورینگ تخصصی', 'Specialist mentoring'), description: l('جلسات مشاوره با متخصصان صنعت و کسب‌وکار.', 'Advisory sessions with industry and business experts.') },
    { title: l('دوره‌های آموزشی', 'Training courses'), description: l('دوره‌های کوتاه کارآفرینی و مدیریت کسب‌وکار.', 'Short courses on entrepreneurship and business management.') },
    { title: l('دسترسی به آزمایشگاه‌ها', 'Laboratory access'), description: l('استفاده از ظرفیت آزمایشگاهی دانشگاه برای نمونه‌سازی.', 'Use of the university’s laboratories for prototyping.') },
  ],
  head: { position: l('رئیس مرکز رشد', 'Head of the Growth Center') },
};

export const innovationHouse: OrgUnit = {
  slug: 'innovation', icon: 'lightbulb', provenance: 'pending',
  name: l('خانه نوآوری', 'Innovation House'),
  summary: l('فضایی برای ایده‌پردازی، کارآفرینی و همکاری میان‌رشته‌ای دانشجویان.', 'A space for ideation, entrepreneurship and interdisciplinary collaboration among students.'),
  intro: [
    l('خانه نوآوری محلی برای آشنایی دانشجویان با کارآفرینی، شکل‌گیری تیم‌های میان‌رشته‌ای و آزمودن ایده‌ها پیش از ورود به مرکز رشد است.', 'The Innovation House is where students discover entrepreneurship, form interdisciplinary teams and test ideas before moving on to the Growth Center.'),
  ],
  responsibilities: [
    l('برگزاری رویدادهای ایده‌پردازی و کارگاه‌های نوآوری', 'Running ideation events and innovation workshops'),
    l('همراهی تیم‌های دانشجویی در مراحل اولیه', 'Supporting student teams at an early stage'),
    l('معرفی تیم‌های آماده به مرکز رشد', 'Referring ready teams to the Growth Center'),
  ],
  services: [
    { title: l('رویدادهای ایده‌پردازی', 'Ideation events'), description: l('رویدادهای کوتاه برای توسعه ایده در قالب تیمی.', 'Short events for developing ideas in teams.') },
    { title: l('کارگاه‌های مهارتی', 'Skills workshops'), description: l('آموزش طراحی محصول، ارائه و مدل کسب‌وکار.', 'Training in product design, pitching and business models.') },
    { title: l('فضای کار دانشجویی', 'Student workspace'), description: l('فضای همکاری برای تیم‌های دانشجویی.', 'A collaboration space for student teams.') },
  ],
  head: { position: l('مسئول خانه نوآوری', 'Innovation House coordinator') },
};

export function getPresidencyUnit(slug: string) {
  return presidencyUnits.find((u) => u.slug === slug);
}

export function getVicePresidency(slug: string) {
  return vicePresidencies.find((u) => u.slug === slug);
}
