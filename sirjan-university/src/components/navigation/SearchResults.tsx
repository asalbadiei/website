'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Building2, FileText, GraduationCap, Layers, Megaphone, Newspaper, User, Users } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { localizedPath } from '@/i18n/path';
import type { SearchDoc, SearchType } from '@/lib/search-client';

const typeIcon: Record<SearchType, typeof Newspaper> = {
  news: Newspaper,
  announcement: Megaphone,
  faculty: Building2,
  department: Users,
  program: GraduationCap,
  person: User,
  unit: Layers,
  document: FileText,
  page: BookOpen,
};

export const searchTypeOrder: SearchType[] = ['program', 'faculty', 'department', 'news', 'announcement', 'unit', 'document', 'person', 'page'];

/** Results grouped by content type; groups follow their best-ranked result. */
export function SearchResults({ results, onNavigate }: { results: SearchDoc[]; onNavigate?: () => void }) {
  const { locale, dict } = useLocale();
  const order = [...new Set(results.map((r) => r.type))];
  const groups = order.map((type) => ({ type, items: results.filter((r) => r.type === type) }));

  return (
    <div className="space-y-6">
      {groups.map(({ type, items }) => {
        const Icon = typeIcon[type];
        return (
          <section key={type} aria-labelledby={`search-group-${type}`}>
            <h3 id={`search-group-${type}`} className="mb-2 flex items-center gap-2 text-caption font-bold text-muted">
              <Icon size={14} aria-hidden="true" />
              {dict.search.types[type]}
              <span className="font-normal">({items.length.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-GB')})</span>
            </h3>
            <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface">
              {items.map((item) => (
                <li key={`${item.type}-${item.href}-${item.title}`}>
                  <Link
                    href={localizedPath(locale, item.href)}
                    onClick={onNavigate}
                    className="group flex items-start gap-3 px-4 py-3 hover:bg-brand-50 focus-visible:bg-brand-50"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-navy group-hover:text-brand">{item.title}</span>
                      <span className="line-clamp-2 text-sm text-muted">{item.excerpt}</span>
                    </span>
                    <ArrowRight size={16} aria-hidden="true" className="flip-rtl mt-1 shrink-0 text-muted group-hover:text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
