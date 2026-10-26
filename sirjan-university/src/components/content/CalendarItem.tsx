import { CalendarCheck, CalendarClock, CalendarRange, CalendarX, ClipboardPen } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { formatDate } from '@/lib/format';
import type { CalendarEvent, CalendarEventType } from '@/types/content';
import { ProvenanceBadge } from '@/components/ui/Provenance';
import { CalendarStatus } from './CalendarStatus';

const icons: Record<CalendarEventType, typeof CalendarCheck> = {
  registration: ClipboardPen,
  'add-drop': CalendarRange,
  'classes-start': CalendarCheck,
  'classes-end': CalendarX,
  exams: CalendarClock,
};

export function CalendarItem({ event, locale, compact = false }: { event: CalendarEvent; locale: Locale; compact?: boolean }) {
  const dict = getDictionary(locale);
  const Icon = icons[event.type];
  return (
    <li className="flex gap-4 rounded-[var(--radius-lg)] border border-line bg-surface p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-caption text-muted">
              {dict.calendar.types[event.type]} · {event.term[locale]}
            </p>
            <h3 className="font-bold text-navy">{event.title[locale]}</h3>
          </div>
          <CalendarStatus start={event.start} end={event.end} />
        </div>
        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
          <div className="flex gap-1">
            <dt className="text-muted">{dict.calendar.start}:</dt>
            <dd>
              <time dateTime={event.start}>{formatDate(event.start, locale)}</time>
            </dd>
          </div>
          {event.end ? (
            <div className="flex gap-1">
              <dt className="text-muted">{dict.calendar.end}:</dt>
              <dd>
                <time dateTime={event.end}>{formatDate(event.end, locale)}</time>
              </dd>
            </div>
          ) : null}
        </dl>
        {!compact && event.details ? <p className="mt-2 text-sm text-muted">{event.details[locale]}</p> : null}
        {!compact ? <ProvenanceBadge provenance={event.provenance} locale={locale} className="mt-2" /> : null}
      </div>
    </li>
  );
}
