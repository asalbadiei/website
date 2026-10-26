import { notFound } from 'next/navigation';

/**
 * Unknown paths inside a locale render the localized 404 page with a 404 status.
 * `dynamicParams` overrides the `false` inherited from the locale layout so this route can match.
 */
export const dynamicParams = true;

export default function CatchAll() {
  notFound();
}
