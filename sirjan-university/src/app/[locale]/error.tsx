'use client';

import { AlertTriangle } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { Button } from '@/components/ui/Button';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const { dict } = useLocale();
  return (
    <div role="alert" className="container-site flex flex-col items-center py-24 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-accent-50 text-accent">
        <AlertTriangle size={28} aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-h1 font-bold text-navy">{dict.common.errorTitle}</h1>
      <p className="mt-3 max-w-md text-muted">{dict.common.errorBody}</p>
      <Button className="mt-8" onClick={reset}>
        {dict.common.retry}
      </Button>
    </div>
  );
}
