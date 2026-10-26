'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/format';

/**
 * Thin wrapper over the native <dialog> element: modal focus containment, Escape to close and
 * an inert background come from the browser. Clicking the backdrop closes it too. The browser
 * focuses the first focusable child on open; mark a different initial target with `data-autofocus`.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  label,
  className,
  keepMounted = false,
  children,
}: {
  open: boolean;
  /** Keep children in the DOM while closed (a closed <dialog> is hidden), e.g. so menu links stay crawlable. */
  keepMounted?: boolean;
  onClose: () => void;
  labelledBy?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      el.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-label={label}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn('m-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-navy-900/55 backdrop:backdrop-blur-[2px]', className)}
    >
      {open || keepMounted ? children : null}
    </dialog>
  );
}
