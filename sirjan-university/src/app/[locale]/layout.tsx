import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
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
  themeColor: '#12345A',
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
    <html lang={htmlLang} dir={dir} className={`${vazirmatn.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-[var(--radius-md)] bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {dict.common.skipToContent}
        </a>
        <span id="top" tabIndex={-1} className="sr-only" />
        <LocaleProvider locale={locale} dict={dict}>
          <div role="note" className="bg-warning-50 text-center text-xs text-warning">
            <p className="container-site py-1.5">{dict.common.devBanner}</p>
          </div>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer locale={locale} />
        </LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
