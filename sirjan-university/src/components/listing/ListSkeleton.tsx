import { Skeleton } from '@/components/ui/Skeleton';

export function ListSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-11" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}
