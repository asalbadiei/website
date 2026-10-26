import { SearchX } from 'lucide-react';
import type { ReactNode } from 'react';

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-12 text-center" role="status">
      <span className="grid size-12 place-items-center rounded-full bg-brand-50 text-brand">
        <SearchX size={22} aria-hidden="true" />
      </span>
      <p className="font-semibold text-navy">{title}</p>
      {hint ? <p className="max-w-md text-sm text-muted">{hint}</p> : null}
      {action}
    </div>
  );
}
