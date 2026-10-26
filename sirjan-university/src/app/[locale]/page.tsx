import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { AnnouncementItem } from '@/components/content/AnnouncementItem';
import { CalendarTimeline } from '@/components/content/CalendarTimeline';
import { LinkCard } from '@/components/content/LinkCard';
import { NewsCard } from '@/components/content/NewsCard';
import { AdmissionsBanner } from '@/components/home/AdmissionsBanner';
import { CtaBand } from '@/components/home/CtaBand';
import { Hero } from '@/components/home/Hero';
import { QuickAccess } from '@/components/home/QuickAccess';
import { StatsBand } from '@/components/home/StatsBand';
import { GalleryGrid } from '@/components/media/GalleryGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProvenanceBadge } from '@/components/ui/Provenance';
import { sortedAnnouncements } from '@/content/announcements';
import { calendarEvents } from '@/content/calendar';
import { heroSlides } from '@/content/home';
import { portalCategories, portals, systems } from '@/content/links';
import { galleries } from '@/content/media';
import { sortedNews } from '@/content/news';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

/**
 * Official campus photo. Drop the file at public/images/hero-campus.jpg and the hero and
 * admissions banner use it automatically (checked at build time); otherwise they fall back to
 * the labelled illustrative artwork.
 */
const CAMPUS_PHOTO = '/images/hero-campus.jpg';
const hasCampusPhoto = existsSync(join(process.cwd(), 'public', CAMPUS_PHOTO));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, '', {});
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const lp = (route: string) => localizedPath(locale, route);

  const featuredNews = sortedNews.slice(0, 4);
  const notices = sortedAnnouncements.slice(0, 6);
  // The first term that has not finished yet (evaluated when the page is built).
  const today = new Date().toISOString().slice(0, 10);
  const currentTerm = (calendarEvents.find((e) => (e.end ?? e.start) >= today) ?? calendarEvents[0]).term;
  const termEvents = calendarEvents.filter((e) => e.term.en === currentTerm.en);
  const galleryImages = galleries
    .flatMap((g) => g.images.slice(0, 2))
    .slice(0, 7);

  return (
    <>
      <h1 className="sr-only">{dict.brand.name}</h1>
      {/* 1 — Hero */}
      <Hero
        slides={heroSlides}
        photo={hasCampusPhoto ? { src: CAMPUS_PHOTO, alt: dict.brand.name } : undefined}
      />

      {/* 2 — Statistics */}
      <StatsBand locale={locale} />

      {/* 3 — Quick access */}
      <QuickAccess locale={locale} />

      {/* 4 — Admissions CTA */}
      <AdmissionsBanner
        id="admissions-cta"
        title={dict.home.admissionsTitle}
        body={dict.home.admissionsBody}
        image={hasCampusPhoto ? CAMPUS_PHOTO : '/illustrations/campus.svg'}
        primary={{ href: lp('/admissions'), label: dict.home.admissionsPrimary }}
        secondary={{ href: lp('/programs'), label: dict.home.admissionsSecondary }}
      />

      {/* 5 — Announcements */}
      <section aria-labelledby="announcements-title" className="section pt-0">
        <div className="container-site">
          <SectionHeading id="announcements-title" title={dict.home.announcementsTitle} link={{ href: lp('/announcements'), label: dict.home.announcementsAll }} />
          <ul data-reveal className="grid gap-3 lg:grid-cols-2">
            {notices.map((item) => (
              <li key={item.slug}>
                <AnnouncementItem item={item} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Secondary CTA: student services */}
      <CtaBand
        id="services-cta"
        tone="light"
        eyebrow={dict.home.servicesEyebrow}
        title={dict.home.servicesTitle}
        body={dict.home.servicesBody}
        primary={{ href: lp('/student-support'), label: dict.home.servicesPrimary }}
        secondary={{ href: lp('/systems'), label: dict.home.servicesSecondary }}
      />

      {/* 7 — News and events */}
      <section aria-labelledby="news-title" className="section border-y border-line bg-surface">
        <div className="container-site">
          <SectionHeading id="news-title" title={dict.home.newsTitle} link={{ href: lp('/news'), label: dict.home.newsAll }} />
          <ul data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredNews.map((item) => (
              <li key={item.slug}>
                <NewsCard item={item} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Academic calendar */}
      <section aria-labelledby="calendar-title" className="section">
        <div className="container-site">
          <SectionHeading
            id="calendar-title"
            title={dict.home.calendarTitle}
            link={{ href: lp('/calendar'), label: dict.home.calendarAll }}
            aside={<ProvenanceBadge provenance="sample" locale={locale} />}
          />
          <p className="mb-6 text-center font-bold text-brand lg:-mb-6">{currentTerm[locale]}</p>
          <CalendarTimeline events={termEvents} locale={locale} label={`${dict.home.calendarTitle} — ${currentTerm[locale]}`} />
        </div>
      </section>

      {/* 9 — Related systems */}
      <section aria-labelledby="systems-title" className="section border-y border-line bg-surface">
        <div className="container-site">
          <SectionHeading id="systems-title" title={dict.home.systemsTitle} intro={dict.home.systemsIntro} link={{ href: lp('/systems'), label: dict.common.viewAll }} />
          <ul data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((link) => (
              <li key={link.id}>
                <LinkCard link={link} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 — Gallery */}
      <section aria-labelledby="gallery-title" className="section">
        <div className="container-site">
          <SectionHeading id="gallery-title" title={dict.home.galleryTitle} link={{ href: lp('/media#galleries'), label: dict.home.galleryAll }} />
          <div data-reveal>
            <GalleryGrid images={galleryImages} columns="sm:grid-cols-4" featureFirst />
          </div>
        </div>
      </section>

      {/* 11 — Related portals */}
      <section aria-labelledby="portals-title" className="section border-t border-line bg-brand-50/60">
        <div className="container-site">
          <SectionHeading id="portals-title" title={dict.home.portalsTitle} intro={dict.home.portalsIntro} />
          <div data-reveal className="grid gap-8 lg:grid-cols-3">
            {Object.entries(portalCategories).map(([key, label]) => (
              <div key={key}>
                <h3 className="mb-3 text-caption font-bold text-muted">{label[locale]}</h3>
                <ul className="space-y-3">
                  {portals
                    .filter((p) => p.category === key)
                    .map((link) => (
                      <li key={link.id}>
                        <LinkCard link={link} locale={locale} />
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
