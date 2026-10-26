'use client';

import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { formatWeekdayDate } from '@/lib/format';

/** Today's date in the visitor's locale; rendered after mount so static pages never show a stale day. */
export function HeaderDate() {
  const { locale, dict } = useLocale();
  const [text, setText] = useState('');
  useEffect(() => setText(formatWeekdayDate(new Date(), locale)), [locale]);
  return (
    <p className="flex items-center gap-1.5">
      <CalendarDays size={14} aria-hidden="true" />
      <span className="sr-only">{dict.common.today}:</span>
      <span className="min-w-[10rem]" suppressHydrationWarning>
        {text}
      </span>
    </p>
  );
}
