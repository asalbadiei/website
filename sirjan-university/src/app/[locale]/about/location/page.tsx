import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { AboutShell } from '@/components/content/AboutShell';
import { buttonClass } from '@/components/ui/Button';
import { SampleNotice } from '@/components/ui/Provenance';
import { contact, mapLinks } from '@/content/site';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'موقعیت پردیس', en: 'Campus location' };
const note = {
  fa: 'موقعیت دقیق پردیس هنوز تأیید نشده است؛ به همین دلیل نقشه تعبیه نشده و پیوند نقشه به جستجوی نام دانشگاه هدایت می‌شود. پس از تأیید مختصات، نقشه و مسیریابی فعال می‌شود.',
  en: 'The exact campus location has not been verified, so no map is embedded and the map link opens a search for the university’s name. A map and directions will be enabled once coordinates are confirmed.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/about/location', { title: title[locale] });
}

export default async function LocationPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <AboutShell locale={locale} route="/about/location" title={title[locale]}>
      <div className="relative grid aspect-[16/9] place-items-center overflow-hidden rounded-[var(--radius-lg)] border border-line bg-brand-50">
        <svg aria-hidden="true" className="absolute inset-0 size-full text-brand-100" preserveAspectRatio="none" viewBox="0 0 400 225">
          <path d="M0 160 C80 120 120 190 200 150 S320 90 400 130" stroke="currentColor" strokeWidth="10" fill="none" />
          <path d="M120 0 L160 225 M280 0 L250 225" stroke="currentColor" strokeWidth="6" fill="none" />
        </svg>
        <div className="relative flex flex-col items-center gap-2 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-brand text-white shadow-[var(--shadow-raised)]">
            <MapPin size={26} aria-hidden="true" />
          </span>
          <p className="max-w-xs px-4 font-semibold text-navy">{contact.address.value[locale]}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={mapLinks.view} target="_blank" rel="noopener noreferrer" className={buttonClass('primary')}>
          <MapPin size={16} aria-hidden="true" />
          {d.footer.viewMap}
          <ExternalLink size={14} aria-hidden="true" />
          <span className="sr-only">{d.common.externalLink}</span>
        </a>
        {mapLinks.directions ? (
          <a href={mapLinks.directions} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
            <Navigation size={16} aria-hidden="true" />
            {d.footer.directions}
          </a>
        ) : null}
      </div>
      <div className="mt-6">
        <SampleNotice locale={locale}>{note[locale]}</SampleNotice>
      </div>
    </AboutShell>
  );
}
