import type { L, Provenance } from '@/types/content';

/**
 * Institutional contact details.
 *
 * The official website (sirjan.iau.ir) could not be reached while this site was built, so no
 * contact value could be verified. Every field below is `pending`: the UI shows a
 * "pending verification" label instead of a number. Fill `value` and set `provenance: 'verified'`
 * once the details are confirmed by the Public Relations office.
 */
type ContactField = { value?: string; provenance: Provenance };

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sirjan.iau.ir').replace(/\/$/, '');

export const contact = {
  phone: { provenance: 'pending' } as ContactField,
  fax: { provenance: 'pending' } as ContactField,
  email: { provenance: 'pending' } as ContactField,
  postalCode: { provenance: 'pending' } as ContactField,
  /** City and province are a matter of public record; the street address is not yet verified. */
  address: {
    value: { fa: 'سیرجان، استان کرمان — نشانی کامل در انتظار تأیید', en: 'Sirjan, Kerman Province, Iran — full street address pending verification' } as L,
    provenance: 'pending' as Provenance,
  },
  responseHours: { provenance: 'pending' } as ContactField,
  workingHours: { provenance: 'pending' } as ContactField,
};

/**
 * Map links use a place search rather than coordinates, because the exact campus location has not
 * been verified. Replace with a coordinate link (and enable the directions link) once confirmed.
 */
export const mapLinks = {
  view: 'https://www.openstreetmap.org/search?query=Islamic%20Azad%20University%20Sirjan',
  directions: undefined as string | undefined,
};

export type SocialNetwork = 'telegram' | 'instagram' | 'whatsapp' | 'linkedin';

export const socialLinks: { network: SocialNetwork; label: L; href?: string }[] = [
  { network: 'telegram', label: { fa: 'تلگرام', en: 'Telegram' } },
  { network: 'instagram', label: { fa: 'اینستاگرام', en: 'Instagram' } },
  { network: 'whatsapp', label: { fa: 'واتس‌اپ', en: 'WhatsApp' } },
  { network: 'linkedin', label: { fa: 'لینکدین', en: 'LinkedIn' } },
];
