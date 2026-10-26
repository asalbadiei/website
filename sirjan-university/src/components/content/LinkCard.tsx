import { ExternalLink, Hourglass } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import type { ExternalLink as ExternalLinkType } from '@/types/content';
import { Icon } from '@/components/ui/Icon';

/** Outbound destination card. Verified links open in a new tab and say so; others are inert. */
export function LinkCard({ link, locale }: { link: ExternalLinkType; locale: Locale }) {
  const dict = getDictionary(locale);
  const host = link.href ? new URL(link.href).host : null;
  const inner = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
        <Icon name={link.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-navy group-hover:text-brand">{link.title[locale]}</span>
        <span className="mt-0.5 block text-sm text-muted">{link.description[locale]}</span>
        {host ? (
          <span dir="ltr" className="mt-2 inline-flex items-center gap-1 text-caption text-brand">
            {host}
            <ExternalLink size={12} aria-hidden="true" />
          </span>
        ) : (
          <span className="mt-2 inline-flex items-center gap-1 text-caption italic text-muted">
            <Hourglass size={12} aria-hidden="true" />
            {dict.common.linkPending}
          </span>
        )}
      </span>
    </>
  );
  return link.href ? (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      title={dict.common.leavingSite}
      className="card card-link group flex h-full items-start gap-4 p-4"
    >
      {inner}
      <span className="sr-only">{dict.common.externalLink}</span>
    </a>
  ) : (
    <div className="flex h-full items-start gap-4 rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-surface/60 p-4">{inner}</div>
  );
}
