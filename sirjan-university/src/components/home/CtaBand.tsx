import Link from 'next/link';
import type { ReactNode } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { cn } from '@/lib/format';

/** Call-to-action band. `tone` switches between the navy and light institutional treatments. */
export function CtaBand({
  id,
  eyebrow,
  title,
  body,
  primary,
  secondary,
  tone = 'navy',
  aside,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  tone?: 'navy' | 'light';
  aside?: ReactNode;
}) {
  const dark = tone === 'navy';
  return (
    <section aria-labelledby={id} className={cn('section', !dark && 'pt-0')}>
      <div className="container-site">
        <div
          data-reveal
          className={cn(
            'relative grid gap-8 overflow-hidden rounded-[var(--radius-xl)] p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14',
            dark ? 'bg-navy text-white' : 'border border-brand-100 bg-brand-50 text-ink',
          )}
        >
          {dark ? <span aria-hidden="true" className="absolute -end-24 -top-24 size-72 rounded-full border-[40px] border-white/5" /> : null}
          <div className="relative lg:col-span-7">
            {eyebrow ? <p className={cn('eyebrow mb-3', dark && 'text-brand-100')}>{eyebrow}</p> : null}
            <h2 id={id} className={cn('text-h2 font-bold', dark ? 'text-white' : 'text-navy')}>
              {title}
            </h2>
            <p className={cn('mt-3 max-w-2xl leading-8', dark ? 'text-white/80' : 'text-ink-2')}>{body}</p>
          </div>
          <div className="relative flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            {aside}
            <Link href={primary.href} className={buttonClass(dark ? 'accent' : 'primary', 'lg')}>
              {primary.label}
            </Link>
            {secondary ? (
              <Link href={secondary.href} className={buttonClass(dark ? 'inverse-outline' : 'secondary', 'lg')}>
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
