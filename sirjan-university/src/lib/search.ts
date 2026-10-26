import { announcements } from '@/content/announcements';
import { documents } from '@/content/documents';
import { faculties } from '@/content/faculties';
import { navigation } from '@/content/navigation';
import { news } from '@/content/news';
import { people } from '@/content/people';
import { programs } from '@/content/programs';
import { growthCenter, innovationHouse, presidencyUnits, vicePresidencies } from '@/content/units';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import type { SearchDoc } from './search-client';

export type { SearchDoc, SearchType } from './search-client';

/**
 * Builds the client-side search index for a locale from the structured content.
 * To add a new content type, map it to `SearchDoc` here; to move to a server search engine,
 * serve the same shape from an API and keep the UI unchanged.
 */
export function buildSearchIndex(locale: Locale): SearchDoc[] {
  const dict = getDictionary(locale);
  const docs: SearchDoc[] = [];

  for (const n of news) {
    docs.push({ type: 'news', title: n.title[locale], excerpt: n.summary[locale], href: `/news/${n.slug}`, keywords: dict.news.categories[n.category], date: n.date });
  }
  for (const a of announcements) {
    docs.push({ type: 'announcement', title: a.title[locale], excerpt: a.excerpt[locale], href: `/announcements/${a.slug}`, keywords: dict.announcements.categories[a.category], date: a.date });
  }
  for (const f of faculties) {
    docs.push({ type: 'faculty', title: f.name[locale], excerpt: f.intro[locale], href: `/faculties/${f.slug}`, keywords: f.shortName[locale] });
    for (const d of f.departments) {
      docs.push({ type: 'department', title: d.name[locale], excerpt: f.name[locale], href: `/faculties/${f.slug}/${d.slug}`, keywords: d.intro[locale] });
    }
  }
  for (const p of programs) {
    const faculty = faculties.find((f) => f.slug === p.faculty);
    docs.push({
      type: 'program',
      title: `${p.title[locale]} — ${dict.programs.levels[p.level]}`,
      excerpt: p.intro[locale],
      href: `/programs/${p.slug}`,
      keywords: `${p.field[locale]} ${faculty?.name[locale] ?? ''}`,
    });
  }
  for (const person of people) {
    docs.push({
      type: 'person',
      title: person.name?.[locale] ?? person.position[locale],
      excerpt: `${person.position[locale]} — ${person.unit[locale]}`,
      href: `/people?q=${encodeURIComponent(person.position[locale])}`,
      keywords: person.unit[locale],
    });
  }
  for (const u of presidencyUnits) docs.push({ type: 'unit', title: u.name[locale], excerpt: u.summary[locale], href: `/presidency/${u.slug}`, keywords: u.responsibilities.map((r) => r[locale]).join(' ') });
  for (const u of vicePresidencies) docs.push({ type: 'unit', title: u.name[locale], excerpt: u.summary[locale], href: `/vice-presidencies/${u.slug}`, keywords: u.responsibilities.map((r) => r[locale]).join(' ') });
  for (const u of [growthCenter, innovationHouse]) docs.push({ type: 'unit', title: u.name[locale], excerpt: u.summary[locale], href: `/${u.slug}`, keywords: u.responsibilities.map((r) => r[locale]).join(' ') });
  for (const d of documents) {
    docs.push({ type: 'document', title: d.title[locale], excerpt: d.description[locale], href: `/forms?q=${encodeURIComponent(d.title[locale])}`, keywords: `${d.department[locale]} ${dict.documents.categories[d.category]}` });
  }
  const seen = new Set<string>();
  for (const group of navigation) {
    for (const col of group.columns) {
      for (const link of col.links) {
        if (link.href.includes('#') || link.href.includes('?') || seen.has(link.href)) continue;
        seen.add(link.href);
        if (docs.some((d) => d.href === link.href)) continue;
        docs.push({ type: 'page', title: link.label[locale], excerpt: group.intro[locale], href: link.href, keywords: group.label[locale] });
      }
    }
  }
  return docs;
}
