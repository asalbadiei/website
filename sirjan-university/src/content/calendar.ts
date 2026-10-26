import type { CalendarEvent, L } from '@/types/content';

/**
 * DEMONSTRATION DATES for the 1405–1406 academic year. They are not the official academic
 * calendar; replace them with the dates published by the Vice-Presidency for Education.
 */
const term1: L = { fa: 'نیم‌سال اول ۱۴۰۶–۱۴۰۵', en: 'First term 2026–27' };
const term2: L = { fa: 'نیم‌سال دوم ۱۴۰۶–۱۴۰۵', en: 'Second term 2026–27' };

export const calendarEvents: CalendarEvent[] = [
  { id: 't1-registration', type: 'registration', term: term1, start: '2026-09-06', end: '2026-09-17',
    title: { fa: 'انتخاب واحد نیم‌سال اول', en: 'First-term course registration' },
    details: { fa: 'انتخاب واحد از طریق سامانه آموزشی بر اساس زمان‌بندی ورودی‌ها.', en: 'Registration through the online academic system according to the intake timetable.' }, provenance: 'sample' },
  { id: 't1-classes-start', type: 'classes-start', term: term1, start: '2026-09-23',
    title: { fa: 'آغاز کلاس‌های نیم‌سال اول', en: 'First-term classes begin' }, provenance: 'sample' },
  { id: 't1-add-drop', type: 'add-drop', term: term1, start: '2026-10-04', end: '2026-10-08',
    title: { fa: 'حذف و اضافه نیم‌سال اول', en: 'First-term add/drop' },
    details: { fa: 'تغییر دروس انتخاب‌شده در بازه حذف و اضافه.', en: 'Changes to registered courses during the add/drop window.' }, provenance: 'sample' },
  { id: 't1-classes-end', type: 'classes-end', term: term1, start: '2027-01-06',
    title: { fa: 'پایان کلاس‌های نیم‌سال اول', en: 'First-term classes end' }, provenance: 'sample' },
  { id: 't1-exams', type: 'exams', term: term1, start: '2027-01-09', end: '2027-01-27',
    title: { fa: 'امتحانات پایان نیم‌سال اول', en: 'First-term final examinations' },
    details: { fa: 'برنامه امتحانات هر درس در سامانه آموزشی قابل مشاهده است.', en: 'The examination timetable for each course is available in the academic system.' }, provenance: 'sample' },
  { id: 't2-registration', type: 'registration', term: term2, start: '2027-01-30', end: '2027-02-10',
    title: { fa: 'انتخاب واحد نیم‌سال دوم', en: 'Second-term course registration' }, provenance: 'sample' },
  { id: 't2-classes-start', type: 'classes-start', term: term2, start: '2027-02-13',
    title: { fa: 'آغاز کلاس‌های نیم‌سال دوم', en: 'Second-term classes begin' }, provenance: 'sample' },
  { id: 't2-add-drop', type: 'add-drop', term: term2, start: '2027-02-24', end: '2027-02-28',
    title: { fa: 'حذف و اضافه نیم‌سال دوم', en: 'Second-term add/drop' }, provenance: 'sample' },
  { id: 't2-classes-end', type: 'classes-end', term: term2, start: '2027-05-29',
    title: { fa: 'پایان کلاس‌های نیم‌سال دوم', en: 'Second-term classes end' }, provenance: 'sample' },
  { id: 't2-exams', type: 'exams', term: term2, start: '2027-06-01', end: '2027-06-19',
    title: { fa: 'امتحانات پایان نیم‌سال دوم', en: 'Second-term final examinations' }, provenance: 'sample' },
];
