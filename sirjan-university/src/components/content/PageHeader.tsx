import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs';

/** Title band used by every internal page: breadcrumbs, H1, intro and optional meta/actions. */
export function PageHeader({
  locale,
  crumbs,
  title,
  intro,
  eyebrow,
  meta,
  actions,
}: {
  locale: Locale;
  crumbs: Crumb[];
  title: string;
  intro?: string;
  eyebrow?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-site py-8 lg:py-12">
        <Breadcrumbs locale={locale} items={crumbs} />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
            <h1 className="text-h1 font-bold text-navy">{title}</h1>
            {intro ? <p className="mt-3 text-lg leading-8 text-ink-2">{intro}</p> : null}
            {meta ? <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">{meta}</div> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}
