import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

/** Section title with an optional "view all" link aligned to the opposite edge. */
export function SectionHeading({
  id,
  title,
  intro,
  link,
  aside,
}: {
  id?: string;
  title: string;
  intro?: string;
  link?: { href: string; label: string };
  aside?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h2 id={id} className="text-h2 font-bold text-navy">
          {title}
        </h2>
        {intro ? <p className="mt-2 text-muted">{intro}</p> : null}
      </div>
      {aside}
      {link ? (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600"
        >
          {link.label}
          <ArrowRight size={16} aria-hidden="true" className="flip-rtl transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
