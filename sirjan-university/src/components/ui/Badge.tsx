import type { ReactNode } from 'react';
import { cn } from '@/lib/format';

type Tone = 'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'outline';

const tones: Record<Tone, string> = {
  neutral: 'bg-canvas text-ink-2 border-line',
  brand: 'bg-brand-50 text-brand-600 border-brand-100',
  accent: 'bg-accent-50 text-accent-ink border-[#f5c9cd]',
  success: 'bg-success-50 text-success border-[#bfe3d3]',
  warning: 'bg-warning-50 text-warning border-[#f0dcb4]',
  outline: 'bg-transparent text-muted border-line-strong',
};

export function Badge({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--radius-sm)] border px-2 py-0.5 text-xs font-semibold leading-5',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
