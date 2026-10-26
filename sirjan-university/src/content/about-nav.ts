import type { Locale } from '@/i18n/config';

export const aboutTitle = { fa: 'درباره واحد', en: 'About the branch' };

export function aboutNav(locale: Locale) {
  const l = (fa: string, en: string) => (locale === 'fa' ? fa : en);
  return [
    { label: l('معرفی دانشگاه', 'Overview'), href: '/about' },
    { label: l('تاریخچه', 'History'), href: '/about/history' },
    { label: l('موقعیت پردیس', 'Campus location'), href: '/about/location' },
    { label: l('تماس با ما', 'Contact us'), href: '/contact' },
    { label: l('راهنمای تلفن دانشگاه', 'Telephone directory'), href: '/about/phone-directory' },
    { label: l('هیئت امنا', 'Board of Trustees'), href: '/board' },
  ];
}
