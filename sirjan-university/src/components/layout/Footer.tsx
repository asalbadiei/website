import Link from 'next/link';
import { Clock, ExternalLink, Mail, MapPin, Navigation, Phone, Printer, Mailbox } from 'lucide-react';
import type { ReactNode } from 'react';
import { footerLinks } from '@/content/navigation';
import { contact, mapLinks, socialLinks } from '@/content/site';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { formatNumber, localizeDigits } from '@/lib/format';
import { Emblem } from './Logo';
import { SocialIcon } from './SocialIcon';
import { BackToTop } from './BackToTop';

function ContactRow({ icon, label, value, pending }: { icon: ReactNode; label: string; value?: string; pending: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-brand-100">{icon}</span>
      <div>
        <dt className="text-xs text-white/60">{label}</dt>
        <dd className={value ? 'text-sm text-white' : 'text-sm italic text-white/60'}>{value ?? pending}</dd>
      </div>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pending = dict.common.pendingVerification;
  const year = formatNumber(new Date().getFullYear(), locale).replace(/[٬,]/g, '');
  const v = (field: { value?: string }) => (field.value ? localizeDigits(field.value, locale) : undefined);

  return (
    <footer className="mt-auto bg-navy text-white/80">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3">
            <Emblem className="size-12" />
            <p className="font-bold leading-snug text-white">{dict.brand.name}</p>
          </div>
          <p className="mt-4 text-sm leading-7">{dict.brand.tagline}</p>
          <h2 className="mt-8 mb-3 text-sm font-bold text-white">{dict.footer.social}</h2>
          <ul className="flex gap-2">
            {socialLinks.map((s) => (
              <li key={s.network}>
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-10 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10"
                    aria-label={`${s.label[locale]} ${dict.common.externalLink}`}
                  >
                    <SocialIcon network={s.network} />
                  </a>
                ) : (
                  <span
                    className="grid size-10 cursor-not-allowed place-items-center rounded-full border border-dashed border-white/25 text-white/45"
                    title={`${s.label[locale]} — ${dict.footer.socialPending}`}
                    role="img"
                    aria-label={`${s.label[locale]} — ${dict.footer.socialPending}`}
                  >
                    <SocialIcon network={s.network} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-related" className="lg:col-span-3">
          <h2 id="footer-related" className="mb-4 text-sm font-bold text-white">
            {dict.footer.related}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm lg:grid-cols-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={localizedPath(locale, link.href)} className="hover:text-white hover:underline">
                  {link.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-4 text-sm font-bold text-white">{dict.footer.contact}</h2>
          <dl className="space-y-3">
            <ContactRow icon={<Phone size={16} aria-hidden="true" />} label={dict.footer.phone} value={v(contact.phone)} pending={pending} />
            <ContactRow icon={<Printer size={16} aria-hidden="true" />} label={dict.footer.fax} value={v(contact.fax)} pending={pending} />
            <ContactRow icon={<Mail size={16} aria-hidden="true" />} label={dict.footer.email} value={contact.email.value} pending={pending} />
            <ContactRow icon={<Mailbox size={16} aria-hidden="true" />} label={dict.footer.postalCode} value={v(contact.postalCode)} pending={pending} />
            <ContactRow icon={<Clock size={16} aria-hidden="true" />} label={dict.footer.responseHours} value={v(contact.responseHours)} pending={pending} />
            <ContactRow icon={<Clock size={16} aria-hidden="true" />} label={dict.footer.workingHours} value={v(contact.workingHours)} pending={pending} />
          </dl>
        </div>

        <div className="lg:col-span-3">
          <h2 className="mb-4 text-sm font-bold text-white">{dict.footer.location}</h2>
          <p className="flex items-start gap-3 text-sm leading-7">
            <MapPin size={16} aria-hidden="true" className="mt-1.5 shrink-0 text-brand-100" />
            <span>
              <span className="sr-only">{dict.footer.address}: </span>
              {contact.address.value[locale]}
            </span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={mapLinks.view}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-white/25 px-3 py-2 text-sm text-white hover:bg-white/10"
            >
              <MapPin size={15} aria-hidden="true" />
              {dict.footer.viewMap}
              <ExternalLink size={13} aria-hidden="true" />
              <span className="sr-only">{dict.common.externalLink}</span>
            </a>
            {mapLinks.directions ? (
              <a
                href={mapLinks.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-white/25 px-3 py-2 text-sm text-white hover:bg-white/10"
              >
                <Navigation size={15} aria-hidden="true" />
                {dict.footer.directions}
                <span className="sr-only">{dict.common.externalLink}</span>
              </a>
            ) : null}
          </div>
          <Link href={localizedPath(locale, '/about/location')} className="mt-3 inline-block text-sm underline hover:text-white">
            {dict.common.learnMore}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-3 py-5 text-xs text-white/65 sm:flex-row sm:items-center">
          <p>
            © {year} — {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={localizedPath(locale, '/accessibility')} className="hover:text-white hover:underline">
              {dict.footer.accessibility}
            </Link>
            <Link href={localizedPath(locale, '/privacy')} className="hover:text-white hover:underline">
              {dict.footer.privacy}
            </Link>
            <a href="/sitemap.xml" className="hover:text-white hover:underline">
              {dict.footer.sitemap}
            </a>
            <BackToTop label={dict.common.backToTop} />
          </div>
        </div>
      </div>
    </footer>
  );
}
