import Link from 'next/link';
import { Mail, Phone, UserRound } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { localizeDigits } from '@/lib/format';
import type { Person } from '@/types/content';

/** Directory card. Unverified names are never shown; portraits use a neutral placeholder. */
export function PersonCard({ person, locale }: { person: Person; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <article className="card flex h-full gap-4 p-5">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-50 text-brand" aria-hidden="true">
        <UserRound size={26} strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <h3 className={person.name ? 'font-bold text-navy' : 'font-semibold italic text-muted'}>
          {person.name?.[locale] ?? dict.common.namePending}
        </h3>
        <p className="text-sm font-semibold text-ink-2">{person.position[locale]}</p>
        <p className="mt-1 text-sm text-muted">
          {person.unitSlug ? (
            <Link href={localizedPath(locale, person.unitSlug)} className="hover:text-brand hover:underline">
              {person.unit[locale]}
            </Link>
          ) : (
            person.unit[locale]
          )}
        </p>
        {person.extension || person.email ? (
          <ul className="mt-2 space-y-1 text-sm text-ink-2">
            {person.extension ? (
              <li className="flex items-center gap-1.5">
                <Phone size={14} aria-hidden="true" />
                {dict.people.extension} {localizeDigits(person.extension, locale)}
              </li>
            ) : null}
            {person.email ? (
              <li className="flex items-center gap-1.5">
                <Mail size={14} aria-hidden="true" />
                <a href={`mailto:${person.email}`} className="hover:text-brand">
                  {person.email}
                </a>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
