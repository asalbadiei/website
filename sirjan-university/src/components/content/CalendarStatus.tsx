'use client';

import { useLocale } from '@/i18n/client';
import { rangeStatus } from '@/lib/format';
import { useClientValue } from '@/lib/use-client-value';
import { Badge } from '@/components/ui/Badge';

const tone = { upcoming: 'brand', ongoing: 'success', finished: 'neutral' } as const;

/** Status relative to the visitor's current date, computed in the browser so static pages stay correct. */
export function CalendarStatus({ start, end }: { start: string; end?: string }) {
  const { dict } = useLocale();
  const status = useClientValue(() => rangeStatus(start, end, new Date()), null);
  if (!status) return <span className="inline-block h-6 w-16" aria-hidden="true" />;
  return <Badge tone={tone[status]}>{dict.calendar.status[status]}</Badge>;
}
