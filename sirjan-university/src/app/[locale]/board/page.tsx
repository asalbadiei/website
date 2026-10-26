import { AboutShell } from '@/components/content/AboutShell';
import { PersonCard } from '@/components/content/PersonCard';
import { SampleNotice } from '@/components/ui/Provenance';
import { boardMembers } from '@/content/people';
import { getDictionary } from '@/i18n';
import type { LocaleParams } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const title = { fa: 'هیئت امنا', en: 'Board of Trustees' };
const intro = {
  fa: 'هیئت امنا بالاترین مرجع سیاست‌گذاری واحد است. ترکیب اعضا فقط پس از تأیید رسمی منتشر می‌شود.',
  en: 'The Board of Trustees is the branch’s highest policy-making body. Its membership is published only after official confirmation.',
};

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  return pageMetadata(locale, '/board', { title: title[locale], description: intro[locale] });
}

export default async function BoardPage({ params }: LocaleParams) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <AboutShell locale={locale} route="/board" title={title[locale]} intro={intro[locale]}>
      <SampleNotice locale={locale}>{d.people.privacyNote}</SampleNotice>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {boardMembers.map((p) => (
          <li key={p.id}>
            <PersonCard person={p} locale={locale} />
          </li>
        ))}
      </ul>
    </AboutShell>
  );
}
