import type { L, Person } from '@/types/content';

/**
 * People directory. No name has been verified, so entries list positions and offices only; the UI
 * shows "Name pending verification". Never add personal phone numbers or addresses.
 */
const l = (fa: string, en: string): L => ({ fa, en });
const p = (id: string, group: Person['group'], position: L, unit: L, unitSlug?: string): Person => ({
  id, group, position, unit, unitSlug, provenance: 'pending',
});

const presidency = l('حوزه ریاست', 'Presidency');

export const people: Person[] = [
  p('president', 'leadership', l('رئیس واحد', 'President of the Branch'), presidency, '/presidency/president'),
  p('vp-research', 'leadership', l('معاون پژوهش و فناوری', 'Vice-President for Research and Technology'), l('معاونت پژوهش و فناوری', 'Research and Technology'), '/vice-presidencies/research-technology'),
  p('vp-education', 'leadership', l('معاون آموزشی و تحصیلات تکمیلی', 'Vice-President for Education and Graduate Studies'), l('معاونت آموزشی و تحصیلات تکمیلی', 'Education and Graduate Studies'), '/vice-presidencies/education-graduate-studies'),
  p('vp-student', 'leadership', l('معاون دانشجویی و فرهنگی', 'Vice-President for Student Affairs and Culture'), l('معاونت دانشجویی و فرهنگی', 'Student Affairs and Culture'), '/vice-presidencies/student-affairs-culture'),
  p('vp-sama', 'leadership', l('معاون سما', 'Vice-President for Sama'), l('معاونت سما', 'Sama'), '/vice-presidencies/sama'),
  p('vp-development', 'leadership', l('معاون توسعه مدیریت و منابع', 'Vice-President for Development and Resource Management'), l('معاونت توسعه مدیریت و منابع', 'Development and Resource Management'), '/vice-presidencies/development-resources'),
  p('dg-pr', 'administration', l('مدیرکل حوزه ریاست و روابط عمومی', 'Director General, Presidency and Public Relations'), l('روابط عمومی', 'Public Relations'), '/presidency/public-relations'),
  p('dg-ict', 'administration', l('مدیرکل فناوری اطلاعات و ارتباطات', 'Director General, ICT'), l('فناوری اطلاعات و ارتباطات', 'Information and Communications Technology'), '/presidency/ict'),
  p('dir-international', 'administration', l('مدیر امور بین‌الملل', 'Director of International Affairs'), l('دفتر امور بین‌الملل', 'International Affairs Office'), '/presidency/international-affairs'),
  p('dg-security', 'administration', l('مدیرکل حراست', 'Director General, University Security'), l('حراست', 'University Security'), '/presidency/security'),
  p('dir-legal', 'administration', l('مدیر امور حقوقی', 'Director of Legal Affairs'), l('دفتر امور حقوقی', 'Legal Affairs Office'), '/presidency/legal-affairs'),
  p('head-growth', 'administration', l('رئیس مرکز رشد', 'Head of the Growth Center'), l('مرکز رشد', 'Growth Center'), '/growth-center'),
  p('head-innovation', 'administration', l('مسئول خانه نوآوری', 'Innovation House coordinator'), l('خانه نوآوری', 'Innovation House'), '/innovation'),
  p('dean-engineering', 'faculty', l('رئیس دانشکده فنی و مهندسی', 'Dean, Faculty of Engineering'), l('دانشکده فنی و مهندسی', 'Faculty of Engineering'), '/faculties/engineering'),
  p('dean-humanities', 'faculty', l('رئیس دانشکده علوم انسانی', 'Dean, Faculty of Humanities'), l('دانشکده علوم انسانی', 'Faculty of Humanities'), '/faculties/humanities'),
  p('dean-law', 'faculty', l('رئیس دانشکده حقوق، الهیات و علوم سیاسی', 'Dean, Faculty of Law, Theology and Political Science'), l('دانشکده حقوق، الهیات و علوم سیاسی', 'Faculty of Law, Theology and Political Science'), '/faculties/law-theology-political-science'),
  p('dean-management', 'faculty', l('رئیس دانشکده مدیریت و اقتصاد', 'Dean, Faculty of Management and Economics'), l('دانشکده مدیریت و اقتصاد', 'Faculty of Management and Economics'), '/faculties/management-economics'),
];

/** Board of Trustees seats by role. Members are published only after verification. */
export const boardMembers: Person[] = [
  p('board-chair', 'board', l('رئیس هیئت امنا', 'Chair of the Board of Trustees'), l('هیئت امنا', 'Board of Trustees')),
  p('board-secretary', 'board', l('دبیر هیئت امنا', 'Secretary of the Board'), l('هیئت امنا', 'Board of Trustees')),
  p('board-president', 'board', l('رئیس واحد (عضو هیئت امنا)', 'President of the Branch (board member)'), l('هیئت امنا', 'Board of Trustees')),
  p('board-member-1', 'board', l('عضو هیئت امنا', 'Board member'), l('هیئت امنا', 'Board of Trustees')),
  p('board-member-2', 'board', l('عضو هیئت امنا', 'Board member'), l('هیئت امنا', 'Board of Trustees')),
  p('board-member-3', 'board', l('عضو هیئت امنا', 'Board member'), l('هیئت امنا', 'Board of Trustees')),
];

/** Telephone directory rows: office + extension. Extensions are pending verification. */
export const phoneDirectory = [...people.filter((x) => x.group !== 'board')];
