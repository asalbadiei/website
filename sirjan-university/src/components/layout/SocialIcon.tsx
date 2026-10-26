import type { SocialNetwork } from '@/content/site';

/** Simplified network glyphs (Lucide ships no brand icons). */
export function SocialIcon({ network, size = 18 }: { network: SocialNetwork; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true } as const;
  switch (network) {
    case 'telegram':
      return (
        <svg {...common} fill="currentColor">
          <path d="M21.4 4.1 2.9 11.3c-1.2.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.4ZM8.2 14l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4L8.2 14Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M4 20.5 5.3 16A8.5 8.5 0 1 1 8.4 19L4 20.5Z" />
          <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.4 1.9 2.6 2.5l.6-.6c.2-.2.4-.2.6-.1l1.7.8c.3.1.3.3.3.5 0 .9-.8 1.7-1.8 1.7-2.9-.3-5.6-3-5.9-5.9 0-.6.1-1.2.4-1.6Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3h-15Zm2.3 4.1a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM5.6 10.6h2.5V18H5.6v-7.4Zm4.1 0h2.4v1c.4-.7 1.3-1.2 2.5-1.2 2.3 0 2.9 1.4 2.9 3.4V18H15v-3.8c0-1-.2-1.8-1.2-1.8-1.1 0-1.6.8-1.6 1.9V18H9.7v-7.4Z" />
        </svg>
      );
  }
}
