import { Download, FileClock } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buttonClass } from '@/components/ui/Button';

/** A real download link when the file exists; otherwise a disabled control that says so. */
export function FileAction({ href, locale, label, size = 'sm' }: { href?: string; locale: Locale; label?: string; size?: 'sm' | 'md' }) {
  const dict = getDictionary(locale);
  if (href) {
    return (
      <a href={href} download className={buttonClass('secondary', size)}>
        <Download size={16} aria-hidden="true" />
        {label ?? dict.common.download}
      </a>
    );
  }
  return (
    <span className={buttonClass('secondary', size, 'cursor-not-allowed border-dashed text-muted hover:border-line-strong hover:text-muted')} aria-disabled="true">
      <FileClock size={16} aria-hidden="true" />
      {dict.common.filePending}
    </span>
  );
}
