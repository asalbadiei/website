import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import type { ImageRef } from '@/types/content';
import { cn } from '@/lib/format';

/**
 * Fixed-ratio image. Illustrative artwork carries a small visible label so it is never mistaken
 * for a photograph of the campus.
 */
export function ImageFrame({
  image,
  locale,
  ratio = 'aspect-[16/10]',
  priority = false,
  className,
  showLabel = true,
  sizes,
}: {
  image: ImageRef;
  locale: Locale;
  ratio?: string;
  priority?: boolean;
  className?: string;
  showLabel?: boolean;
  sizes?: string;
}) {
  const dict = getDictionary(locale);
  return (
    <div className={cn('relative overflow-hidden bg-brand-100', ratio, className)}>
      {/* SVG artwork scales without resampling, so a plain <img> is used instead of next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt[locale]}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        sizes={sizes}
        width={1600}
        height={1000}
        className="absolute inset-0 size-full object-cover"
      />
      {image.illustrative && showLabel ? (
        <span className="absolute bottom-2 start-2 rounded-[var(--radius-sm)] bg-navy/75 px-1.5 py-0.5 text-[0.6875rem] text-white">
          {dict.common.illustrative}
        </span>
      ) : null}
    </div>
  );
}
