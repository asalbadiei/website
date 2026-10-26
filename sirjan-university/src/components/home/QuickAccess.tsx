import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { quickAccess } from '@/content/home';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { localizedPath } from '@/i18n/path';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function QuickAccess({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section aria-labelledby="quick-title" className="section">
      <div className="container-site">
        <SectionHeading id="quick-title" title={dict.home.quickTitle} intro={dict.home.quickIntro} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((card) => (
            <li key={card.id}>
              <Link
                href={localizedPath(locale, card.href)}
                className="card card-link group flex h-full items-center gap-4 p-5 sm:flex-col sm:items-start sm:gap-0 sm:p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand text-white transition-colors group-hover:bg-navy sm:mb-5">
                  <Icon name={card.icon} size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-h3 font-bold text-navy group-hover:text-brand">{card.title[locale]}</span>
                  <span className="mt-1 block text-sm text-muted">{card.description[locale]}</span>
                </span>
                <ArrowRight size={18} aria-hidden="true" className="flip-rtl shrink-0 text-brand transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:mt-5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
