'use client';

import Link from 'next/link';
import { Compass } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { localizedPath } from '@/i18n/path';
import { buttonClass } from '@/components/ui/Button';

export default function NotFound() {
  const { locale, dict } = useLocale();
  return (
    <div className="container-site flex flex-col items-center py-24 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand">
        <Compass size={30} aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold text-brand">404</p>
      <h1 className="mt-2 text-h1 font-bold text-navy">{dict.notFound.title}</h1>
      <p className="mt-3 max-w-md text-muted">{dict.notFound.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={localizedPath(locale, '/')} className={buttonClass('primary')}>
          {dict.notFound.home}
        </Link>
        <Link href={localizedPath(locale, '/search')} className={buttonClass('secondary')}>
          {dict.notFound.search}
        </Link>
      </div>
    </div>
  );
}
