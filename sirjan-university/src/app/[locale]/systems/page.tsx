import { LinkCard } from '@/components/content/LinkCard';
import { PageHeader } from '@/components/content/PageHeader';
import { SampleNotice } from '@/components/ui/Provenance';
import { portalCategories, portals, systemCategories, systems } from '@/content/links';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const note = {
  fa: 'فقط نشانی‌های شناخته‌شده و رسمی پیوند داده شده‌اند. سامانه‌هایی که نشانی آن‌ها هنوز تأیید نشده، بدون پیوند و با برچسب «نشانی در انتظار تأیید» نمایش داده می‌شوند. پیوندهای خارجی در زبانه جدید باز می‌شوند.',
  en: 'Only well-established official addresses are linked. Systems whose address has not been verified are shown without a link and labelled “Address pending verification”. External links open in a new tab.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMetadata(locale, '/systems', { title: d.home.systemsTitle, description: d.home.systemsIntro });
}

export default async function SystemsPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: d.home.systemsTitle }]} title={d.home.systemsTitle} intro={d.home.systemsIntro} />
      <div className="container-site space-y-12 py-10 lg:py-14">
        <SampleNotice locale={locale}>{note[locale]}</SampleNotice>
        {Object.entries(systemCategories).map(([key, label]) => {
          const items = systems.filter((s) => s.category === key);
          if (!items.length) return null;
          return (
            <section key={key} aria-labelledby={`sys-${key}`}>
              <h2 id={`sys-${key}`} className="mb-4 text-h3 font-bold text-navy">{label[locale]}</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((link) => (
                  <li key={link.id}>
                    <LinkCard link={link} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <section aria-labelledby="portals" className="border-t border-line pt-12">
          <h2 id="portals" className="mb-2 text-h2 font-bold text-navy">{d.home.portalsTitle}</h2>
          <p className="mb-8 text-muted">{d.home.portalsIntro}</p>
          <div className="space-y-10">
            {Object.entries(portalCategories).map(([key, label]) => (
              <div key={key}>
                <h3 className="mb-4 text-h3 font-bold text-navy">{label[locale]}</h3>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {portals.filter((p) => p.category === key).map((link) => (
                    <li key={link.id}>
                      <LinkCard link={link} locale={locale} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
