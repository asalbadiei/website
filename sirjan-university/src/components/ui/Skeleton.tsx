import { cn } from '@/lib/format';

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-[var(--radius-md)] bg-brand-100/60', className)} />;
}
