import { isLocale, locales } from '@/i18n/config';
import { buildSearchIndex } from '@/lib/search';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Static JSON search index per locale, fetched lazily by the search UI. */
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response('Not found', { status: 404 });
  return Response.json(buildSearchIndex(locale));
}
