import { FlaskConical, Hourglass } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import type { Provenance } from '@/types/content';
import { Badge } from './Badge';

/** Visible marker for content that is not yet official. Renders nothing for verified content. */
export function ProvenanceBadge({ provenance, locale, className }: { provenance: Provenance; locale: Locale; className?: string }) {
  if (provenance === 'verified') return null;
  const d = getDictionary(locale).common;
  return provenance === 'sample' ? (
    <Badge tone="warning" className={className}>
      <FlaskConical size={12} aria-hidden="true" />
      {d.sample}
    </Badge>
  ) : (
    <Badge tone="outline" className={className}>
      <Hourglass size={12} aria-hidden="true" />
      {d.pendingVerification}
    </Badge>
  );
}

export function SampleNotice({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const d = getDictionary(locale).common;
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[#f0dcb4] bg-warning-50 px-4 py-3 text-sm text-warning"
    >
      <FlaskConical size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
      <p>{children ?? d.sampleNotice}</p>
    </div>
  );
}
