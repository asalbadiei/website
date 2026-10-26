'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useLocale } from '@/i18n/client';
import { localeConfig } from '@/i18n/config';
import { switchLocalePath } from '@/i18n/path';
import { cn } from '@/lib/format';

/** Links to the same page in the other language. Every route exists in both locales. */
export function LanguageSwitcher({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const { locale, dict } = useLocale();
  const pathname = usePathname() || `/${locale}`;
  const other = locale === 'fa' ? 'en' : 'fa';
  return (
    <Link
      href={switchLocalePath(pathname, other)}
      hrefLang={localeConfig[other].htmlLang}
      lang={localeConfig[other].htmlLang}
      aria-label={dict.common.switchLanguage}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-sm font-semibold transition-colors',
        tone === 'dark' ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-brand-50',
        className,
      )}
    >
      <Languages size={16} aria-hidden="true" />
      <span>{localeConfig[other].label}</span>
    </Link>
  );
}
