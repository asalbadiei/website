/**
 * INTERIM EMBLEM. The official university logo could not be retrieved, so this neutral mark
 * (an open book beneath an arch) stands in. Replace with the official logo file at
 * /public/brand/logo.svg and swap this component's markup for an <img>.
 */
export function Emblem({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <circle cx="32" cy="32" r="30" fill="#12345A" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="1" />
      <path d="M20 30a12 12 0 0 1 24 0v3H20z" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
      <path d="M32 18v-4" stroke="#C62836" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 37c6-2.5 12-2.5 18 1 6-3.5 12-3.5 18-1v11c-6-2.5-12-2.5-18 1-6-3.5-12-3.5-18-1z" fill="#FFFFFF" />
      <path d="M32 38v11" stroke="#155AA8" strokeWidth="1.6" />
    </svg>
  );
}
