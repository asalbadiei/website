import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { siteUrl } from '@/content/site';
import { LocaleProvider } from '@/i18n/client';
import { isLocale, localeConfig, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { inter, vazirmatn } from '@/lib/fonts';
import { pageMetadata } from '@/lib/seo';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#1C44B0',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(siteUrl),
    ...pageMetadata(locale, '', {}),
    applicationName: getDictionary(locale).brand.name,
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: param } = await params;
  if (!isLocale(param)) notFound();
  const locale: Locale = param;
  const dict = getDictionary(locale);
  const { htmlLang, dir } = localeConfig[locale];

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: dict.brand.name,
    alternateName: dict.brand.altName,
    url: `${siteUrl}/${locale}`,
    parentOrganization: { '@type': 'CollegeOrUniversity', name: locale === 'fa' ? 'دانشگاه آزاد اسلامی' : 'Islamic Azad University', url: 'https://iau.ac.ir' },
    address: { '@type': 'PostalAddress', addressLocality: locale === 'fa' ? 'سیرجان' : 'Sirjan', addressRegion: locale === 'fa' ? 'کرمان' : 'Kerman', addressCountry: 'IR' },
  };

  return (
    <html lang={htmlLang} dir={dir} className={`${vazirmatn.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* Marks JS as available before first paint, so scroll-reveal never hides content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#main"
          className="sr-only z-50 rounded-[var(--radius-md)] bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {dict.common.skipToContent}
        </a>
        <span id="top" tabIndex={-1} className="sr-only" />
        <LocaleProvider locale={locale} dict={dict}>
          <div aria-hidden="true" className="h-1 bg-gradient-to-l from-brand via-brand-2 to-brand-200" />
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer locale={locale} />
          <RevealObserver />
        </LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
