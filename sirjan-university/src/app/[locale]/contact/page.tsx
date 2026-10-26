import { Clock, Mail, Mailbox, MapPin, Phone, Printer } from 'lucide-react';
import type { ReactNode } from 'react';
import { AboutShell } from '@/components/content/AboutShell';
import { ContactForm } from '@/components/forms/ContactForm';
import { contact, mapLinks } from '@/content/site';
import { getDictionary } from '@/i18n';
import { localizeDigits } from '@/lib/format';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'تماس با ما', en: 'Contact us' };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/contact', { title: title[locale] });
}

export default async function ContactPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const rows: { icon: ReactNode; label: string; value?: string; href?: string }[] = [
    { icon: <Phone size={18} />, label: d.footer.phone, value: contact.phone.value && localizeDigits(contact.phone.value, locale), href: contact.phone.value && `tel:${contact.phone.value}` },
    { icon: <Printer size={18} />, label: d.footer.fax, value: contact.fax.value && localizeDigits(contact.fax.value, locale) },
    { icon: <Mail size={18} />, label: d.footer.email, value: contact.email.value, href: contact.email.value && `mailto:${contact.email.value}` },
    { icon: <Mailbox size={18} />, label: d.footer.postalCode, value: contact.postalCode.value && localizeDigits(contact.postalCode.value, locale) },
    { icon: <Clock size={18} />, label: d.footer.responseHours, value: contact.responseHours.value },
    { icon: <Clock size={18} />, label: d.footer.workingHours, value: contact.workingHours.value },
  ];
  return (
    <AboutShell locale={locale} route="/contact" title={title[locale]}>
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="card flex items-start gap-3 p-4">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
              {r.icon}
            </span>
            <div>
              <dt className="text-caption text-muted">{r.label}</dt>
              <dd className={r.value ? 'font-semibold text-navy' : 'italic text-muted'}>
                {r.value ? r.href ? <a href={r.href} className="hover:text-brand">{r.value}</a> : r.value : d.common.pendingVerification}
              </dd>
            </div>
          </div>
        ))}
        <div className="card flex items-start gap-3 p-4 sm:col-span-2">
          <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
            <MapPin size={18} />
          </span>
          <div>
            <dt className="text-caption text-muted">{d.footer.address}</dt>
            <dd className="font-semibold text-navy">{contact.address.value[locale]}</dd>
            <a href={mapLinks.view} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-brand hover:underline">
              {d.footer.viewMap}
              <span className="sr-only"> {d.common.externalLink}</span>
            </a>
          </div>
        </div>
      </dl>
      <div className="mt-10">
        <ContactForm />
      </div>
    </AboutShell>
  );
}
