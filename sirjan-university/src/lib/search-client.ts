import { normalize } from './normalize';

/** Client-safe search types and matching (no content imports, so it adds nothing to bundles). */
export type SearchType = 'news' | 'announcement' | 'faculty' | 'department' | 'program' | 'person' | 'unit' | 'document' | 'page';

export type SearchDoc = {
  type: SearchType;
  title: string;
  excerpt: string;
  /** Route without locale prefix. */
  href: string;
  /** Extra searchable text (not displayed). */
  keywords: string;
  date?: string;
};

export function searchDocs(docs: SearchDoc[], query: string, limit?: number): SearchDoc[] {
  const q = normalize(query);
  if (q.length < 2) return [];
  const terms = q.split(' ').filter(Boolean);
  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of docs) {
    const title = normalize(doc.title);
    const hay = `${title} ${normalize(doc.excerpt)} ${normalize(doc.keywords)}`;
    if (!terms.every((term) => hay.includes(term))) continue;
    let score = 0;
    for (const term of terms) if (title.includes(term)) score += 3;
    if (title.startsWith(terms[0])) score += 2;
    if (title.includes(q)) score += 4;
    scored.push({ doc, score });
  }
  scored.sort((a, b) => b.score - a.score || (b.doc.date ?? '').localeCompare(a.doc.date ?? ''));
  const result = scored.map((s) => s.doc);
  return limit ? result.slice(0, limit) : result;
}
