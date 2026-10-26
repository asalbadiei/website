'use client';

import { useId, useRef, useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/format';

type Field = 'name' | 'email' | 'subject' | 'message';

/**
 * DEMO FORM: validates input accessibly but sends nothing. To go live, replace `onSubmit`'s
 * success branch with a server action or API call (see README → Integration points).
 */
export function ContactForm() {
  const { dict } = useLocale();
  const t = dict.contactForm;
  const id = useId();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Partial<Record<Field, string>> = {};
    for (const f of ['name', 'email', 'subject', 'message'] as Field[]) {
      if (!String(data.get(f) ?? '').trim()) next[f] = t.required;
    }
    const email = String(data.get('email') ?? '').trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.invalidEmail;
    setErrors(next);
    setDone(Object.keys(next).length === 0);
    const first = Object.keys(next)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const input = (field: Field, label: string, type = 'text', multiline = false) => {
    const err = errors[field];
    const props = {
      id: `${id}-${field}`,
      name: field,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': err ? `${id}-${field}-err` : undefined,
      className: cn(
        'w-full rounded-[var(--radius-md)] border bg-surface px-3 text-[0.9375rem] focus:ring-3 focus:ring-brand-100 focus:outline-none',
        err ? 'border-accent focus:border-accent' : 'border-line-strong focus:border-brand',
        multiline ? 'min-h-36 py-2.5' : 'h-11',
      ),
    };
    return (
      <div>
        <label htmlFor={props.id} className="mb-1 block text-sm font-semibold text-ink-2">
          {label} <span aria-hidden="true" className="text-accent">*</span>
        </label>
        {multiline ? <textarea {...props} required aria-required /> : <input {...props} type={type} required aria-required dir={type === 'email' ? 'ltr' : undefined} />}
        {err ? (
          <p id={`${id}-${field}-err`} className="mt-1 text-sm text-accent">
            {err}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="card space-y-4 p-5 sm:p-6" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-h3 font-bold text-navy">
        {t.title}
      </h2>
      <p className="flex items-start gap-2 rounded-[var(--radius-md)] bg-warning-50 p-3 text-sm text-warning">
        <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
        {t.demo}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {input('name', t.name)}
        {input('email', t.email, 'email')}
      </div>
      {input('subject', t.subject)}
      {input('message', t.message, 'text', true)}
      <div role="status" aria-live="polite">
        {done ? (
          <p className="flex items-start gap-2 rounded-[var(--radius-md)] bg-success-50 p-3 text-sm text-success">
            <CheckCircle2 size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            {t.success}
          </p>
        ) : null}
      </div>
      <Button type="submit">{t.submit}</Button>
    </form>
  );
}
