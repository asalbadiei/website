import { announcements } from '@/content/announcements';
import { faculties } from '@/content/faculties';
import { galleries } from '@/content/media';
import { news } from '@/content/news';
import { programs } from '@/content/programs';
import { presidencyUnits, vicePresidencies } from '@/content/units';

/** Every page route (without locale); drives the sitemap. */
export const staticRoutes = [
  '', '/about', '/about/history', '/about/location', '/about/phone-directory', '/contact', '/board', '/people',
  '/presidency', '/vice-presidencies', '/faculties', '/programs', '/admissions', '/announcements', '/news',
  '/calendar', '/forms', '/growth-center', '/innovation', '/publications', '/student-support', '/media',
  '/systems', '/accessibility', '/privacy',
];

export const allRoutes: string[] = [
  ...staticRoutes,
  ...presidencyUnits.map((u) => `/presidency/${u.slug}`),
  ...vicePresidencies.map((u) => `/vice-presidencies/${u.slug}`),
  ...faculties.flatMap((f) => [`/faculties/${f.slug}`, ...f.departments.map((d) => `/faculties/${f.slug}/${d.slug}`)]),
  ...programs.map((p) => `/programs/${p.slug}`),
  ...news.map((n) => `/news/${n.slug}`),
  ...announcements.map((a) => `/announcements/${a.slug}`),
  ...galleries.map((g) => `/media/${g.slug}`),
];
