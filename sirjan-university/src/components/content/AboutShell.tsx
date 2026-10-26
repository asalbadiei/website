import type { ReactNode } from 'react';
import { aboutNav, aboutTitle } from '@/content/about-nav';
import type { Locale } from '@/i18n/config';
import { PageHeader } from './PageHeader';
import { SideNav } from './SideNav';

/** Shared frame for the About section: header, content column and section navigation. */
export function AboutShell({ locale, route, title, intro, children }: { locale: Locale; route: string; title: string; intro?: string; children: ReactNode }) {
  const crumbs = route === '/about' ? [{ label: aboutTitle[locale] }] : [{ label: aboutTitle[locale], href: '/about' }, { label: title }];
  return (
    <>
      <PageHeader locale={locale} crumbs={crumbs} title={title} intro={intro} />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
        <div className="min-w-0 lg:col-span-8">{children}</div>
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <SideNav locale={locale} title={aboutTitle[locale]} items={aboutNav(locale)} current={route} />
          </div>
        </aside>
      </div>
    </>
  );
}
