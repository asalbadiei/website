import type { CSSProperties } from 'react';
import { CalendarCheck, CalendarClock, CalendarRange, CalendarX, ClipboardPen } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { formatDate, formatNumber } from '@/lib/format';
import type { CalendarEvent, CalendarEventType } from '@/types/content';

const icons: Record<CalendarEventType, typeof CalendarCheck> = {
  registration: ClipboardPen,
  'add-drop': CalendarRange,
  'classes-start': CalendarCheck,
  'classes-end': CalendarX,
  exams: CalendarClock,
};

/* Desktop wave geometry, in a 1000 × 100 box stretched to the container. Nodes alternate between
   valleys and peaks; text always sits on the outer side (below valleys, above peaks). */
const PEAK = 34;
const VALLEY = 66;

function waveNodes(count: number) {
  const step = 1000 / count;
  return Array.from({ length: count }, (_, i) => ({ x: step * (i + 0.5), y: i % 2 === 0 ? VALLEY : PEAK }));
}

function wavePath(nodes: { x: number; y: number }[]) {
  const pts = [{ x: 0, y: (VALLEY + PEAK) / 2 + 6 }, ...nodes, { x: 1000, y: nodes.length % 2 ? PEAK + 8 : VALLEY - 8 }];
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mid = (b.x - a.x) / 2;
    d += ` C${a.x + mid} ${a.y} ${b.x - mid} ${b.y} ${b.x} ${b.y}`;
  }
  return d;
}

function dateRange(event: CalendarEvent, locale: Locale) {
  return event.end ? `${formatDate(event.start, locale, 'short')} – ${formatDate(event.end, locale)}` : formatDate(event.start, locale);
}

function Hexagon({ type }: { type: CalendarEventType }) {
  const Icon = icons[type];
  return (
    <span className="relative grid size-[72px] place-items-center">
      <span aria-hidden="true" className="absolute inset-x-2 -bottom-3 h-6 rounded-full bg-brand-2/35 blur-xl" />
      {/* The shadow lives on a wrapper: a clip-path would cut it off. */}
      <span className="relative size-full drop-shadow-[0_8px_16px_rgb(28_68_176/0.18)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
        <span className="hexagon grid size-full place-items-center bg-surface text-brand">
          <Icon size={26} strokeWidth={2} aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}

/** Academic-calendar steps on a red wave (horizontal on desktop, vertical on small screens). */
export function CalendarTimeline({ events, locale, label }: { events: CalendarEvent[]; locale: Locale; label: string }) {
  const nodes = waveNodes(events.length);
  const d = wavePath(nodes);

  return (
    <div>
      {/* Desktop: wave */}
      <ol aria-label={label} className="relative hidden h-[480px] lg:block">
        <svg aria-hidden="true" viewBox="0 0 1000 100" preserveAspectRatio="none" className="flip-rtl absolute inset-0 size-full overflow-visible">
          <path d={d} transform="translate(0 3)" fill="none" stroke="rgb(28 68 176 / 0.07)" strokeWidth="12" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          <path d={d} fill="none" stroke="var(--color-accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        </svg>
        {events.map((event, i) => {
          const node = nodes[i];
          const below = node.y === VALLEY;
          const pos = { insetInlineStart: `${node.x / 10}%`, top: `${node.y}%` } as CSSProperties;
          return (
            <li key={event.id} className="group absolute" style={pos} data-reveal>
              <div className="absolute start-0 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2">
                <Hexagon type={event.type} />
              </div>
              <div
                className={`absolute start-0 isolate w-[200px] -translate-x-1/2 text-center rtl:translate-x-1/2 ${below ? 'top-14' : 'bottom-14'}`}
              >
                <span aria-hidden="true" className="pointer-events-none absolute -end-5 -top-12 -z-10 text-[6rem] leading-none font-black text-brand-100 select-none">
                  {formatNumber(i + 1, locale)}
                </span>
                <h3 className="text-lg font-extrabold text-navy transition-colors duration-300 group-hover:text-brand">{event.title[locale]}</h3>
                <p className="mt-1.5 text-sm font-semibold text-muted">
                  <time dateTime={event.start}>{dateRange(event, locale)}</time>
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Small screens: vertical line */}
      <ol aria-label={label} className="relative space-y-8 lg:hidden">
        <span aria-hidden="true" className="absolute start-9 top-6 bottom-6 w-[3px] -translate-x-1/2 rounded-full bg-accent rtl:translate-x-1/2" />
        {events.map((event, i) => (
          <li key={event.id} className="group relative flex items-center gap-5" data-reveal>
            <Hexagon type={event.type} />
            <div className="relative isolate min-w-0">
              <span aria-hidden="true" className="pointer-events-none absolute -top-5 end-0 -z-10 text-6xl leading-none font-black text-brand-100 select-none">
                {formatNumber(i + 1, locale)}
              </span>
              <h3 className="font-extrabold text-navy">{event.title[locale]}</h3>
              <p className="mt-1 text-sm font-semibold text-muted">
                <time dateTime={event.start}>{dateRange(event, locale)}</time>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
