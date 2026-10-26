import type { L } from '@/types/content';

/** Long-form copy for About pages. Branch-specific history must be supplied by Public Relations. */
const l = (fa: string, en: string): L => ({ fa, en });

export const about = {
  intro: l(
    'دانشگاه آزاد اسلامی واحد سیرجان یکی از واحدهای دانشگاه آزاد اسلامی در استان کرمان است که در حوزه‌های فنی و مهندسی، علوم انسانی، حقوق و علوم سیاسی، مدیریت و اقتصاد به آموزش و پژوهش می‌پردازد.',
    'Islamic Azad University, Sirjan Branch is one of the branches of Islamic Azad University in Kerman Province, offering teaching and research in engineering, the humanities, law and political science, and management and economics.',
  ),
  mission: l(
    'تربیت نیروی انسانی متخصص و متعهد، گسترش پژوهش‌های کاربردی متناسب با نیازهای منطقه و ارائه خدمات علمی به جامعه.',
    'To educate skilled and committed graduates, expand applied research that meets regional needs and provide academic services to society.',
  ),
  history: [
    l(
      'دانشگاه آزاد اسلامی در سال ۱۳۶۱ تأسیس شد و با گسترش واحدهای خود در سراسر کشور، دسترسی به آموزش عالی را در شهرهای مختلف فراهم کرد.',
      'Islamic Azad University was founded in 1982 and, by establishing branches across the country, widened access to higher education in many cities.',
    ),
    l(
      'تاریخچه تأسیس واحد سیرجان، روند توسعه دانشکده‌ها و رویدادهای مهم آن پس از دریافت اطلاعات رسمی از روابط عمومی دانشگاه در این بخش منتشر می‌شود.',
      'The founding history of the Sirjan Branch, the development of its faculties and its key milestones will be published here once official information is received from Public Relations.',
    ),
  ],
  milestonesPending: true,
};
