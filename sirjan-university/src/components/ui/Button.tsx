import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/format';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'inverse' | 'inverse-outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-600',
  secondary: 'border border-line-strong bg-surface text-navy hover:border-brand hover:text-brand',
  ghost: 'text-brand hover:bg-brand-50',
  accent: 'bg-accent-ink text-white hover:bg-[#a51c22]',
  inverse: 'bg-white text-navy hover:bg-brand-50',
  'inverse-outline': 'border border-white/50 text-white hover:bg-white/10',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: { href: string; variant?: Variant; size?: Size; children: ReactNode } & Omit<ComponentProps<typeof Link>, 'href'>) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  ...rest
}: { variant?: Variant; size?: Size } & ComponentProps<'button'>) {
  return <button type="button" className={buttonClass(variant, size, className)} {...rest} />;
}
