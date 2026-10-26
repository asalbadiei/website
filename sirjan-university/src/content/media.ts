import type { Gallery, ImageRef, L } from '@/types/content';

/**
 * SAMPLE GALLERIES using illustrative artwork. No photograph of the Sirjan Branch was available,
 * so nothing here is presented as a real campus photo. Replace with official photography.
 */
const im = (name: string, fa: string, en: string): ImageRef => ({ src: `/illustrations/${name}.svg`, alt: { fa, en }, illustrative: true });

export const galleries: Gallery[] = [
  { slug: 'campus', category: 'campus', date: '2026-09-01', provenance: 'sample',
    title: { fa: 'پردیس دانشگاه', en: 'The campus' },
    images: [
      im('campus', 'نمای نمادین ساختمان‌های پردیس', 'Illustration of campus buildings'),
      im('desert', 'منظره نمادین کوهستان و دشت', 'Illustration of mountains and plain'),
      im('library', 'تصویر نمادین کتابخانه', 'Illustration of the library'),
      im('lecture', 'تصویر نمادین کلاس درس', 'Illustration of a lecture hall'),
    ] },
  { slug: 'opening-ceremony', category: 'ceremony', date: '2026-09-27', provenance: 'sample',
    title: { fa: 'آیین آغاز سال تحصیلی', en: 'Opening ceremony' },
    images: [
      im('ceremony', 'تصویر نمادین مراسم', 'Illustration of the ceremony'),
      im('students', 'تصویر نمادین دانشجویان', 'Illustration of students'),
      im('conference', 'تصویر نمادین سالن اجتماعات', 'Illustration of the auditorium'),
    ] },
  { slug: 'research-labs', category: 'research', date: '2026-10-18', provenance: 'sample',
    title: { fa: 'آزمایشگاه‌ها و پژوهش', en: 'Laboratories and research' },
    images: [
      im('research', 'تصویر نمادین پژوهش', 'Illustration of research'),
      im('lab', 'تصویر نمادین آزمایشگاه', 'Illustration of a laboratory'),
      im('engineering', 'تصویر نمادین کارگاه مهندسی', 'Illustration of an engineering workshop'),
      im('innovation', 'تصویر نمادین نوآوری', 'Illustration of innovation'),
    ] },
  { slug: 'graduation-1405', category: 'event', date: '2026-09-08', provenance: 'sample',
    title: { fa: 'جشن دانش‌آموختگی', en: 'Graduation ceremony' },
    images: [
      im('graduation', 'تصویر نمادین جشن دانش‌آموختگی', 'Illustration of graduation'),
      im('ceremony', 'تصویر نمادین مراسم', 'Illustration of the ceremony'),
    ] },
  { slug: 'teaching', category: 'education', date: '2026-10-05', provenance: 'sample',
    title: { fa: 'آموزش و کلاس‌ها', en: 'Teaching and classes' },
    images: [
      im('lecture', 'تصویر نمادین کلاس درس', 'Illustration of a lecture'),
      im('management', 'تصویر نمادین کارگاه مدیریت', 'Illustration of a management workshop'),
      im('law', 'تصویر نمادین کلاس حقوق', 'Illustration of a law class'),
    ] },
];

export function getGallery(slug: string) {
  return galleries.find((g) => g.slug === slug);
}

export const videos: { id: string; title: L; duration: string; poster: ImageRef }[] = [
  { id: 'campus-tour', title: { fa: 'معرفی پردیس دانشگاه', en: 'Campus introduction' }, duration: '03:20', poster: im('campus', 'پوستر نمادین ویدئو', 'Illustrative video poster') },
  { id: 'research-week', title: { fa: 'گزارش هفته پژوهش', en: 'Research Week report' }, duration: '05:45', poster: im('research', 'پوستر نمادین ویدئو', 'Illustrative video poster') },
  { id: 'graduation', title: { fa: 'جشن دانش‌آموختگی', en: 'Graduation ceremony' }, duration: '08:10', poster: im('graduation', 'پوستر نمادین ویدئو', 'Illustrative video poster') },
];
