import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/** Wide rounded banner over the campus image, fading into brand blue behind the title. */
export function AdmissionsBanner({
  id,
  title,
  body,
  primary,
  secondary,
  image,
}: {
  id: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  image: string;
}) {
  return (
    <section aria-labelledby={id} className="container-site pb-14 sm:pb-20" data-reveal>
      <div className="group relative isolate overflow-hidden rounded-[32px] bg-brand sm:rounded-[var(--radius-hero)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          loading="lazy"
          width={1600}
          height={1000}
          className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 -z-10 bg-brand-2/25 mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-navy via-brand/85 to-brand-2/10 ltr:bg-gradient-to-r max-md:bg-brand/85 max-md:bg-none" />
        <div className="flex flex-col gap-6 px-7 py-9 sm:px-12 sm:py-11 md:flex-row md:items-center md:justify-between lg:px-16">
          <div className="max-w-2xl text-white">
            <h2 id={id} className="text-2xl font-black sm:text-[2rem] sm:leading-tight">
              {title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-7 text-white/80 sm:text-[0.9375rem]">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href={primary.href}
              className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-[0.9375rem] font-bold text-white shadow-[0_10px_24px_-12px_rgb(10_26_74/0.8)] ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand"
            >
              {primary.label}
              <ArrowUpRight size={17} aria-hidden="true" className="flip-rtl transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex h-12 items-center rounded-full border border-white/40 px-6 text-[0.9375rem] font-bold text-white transition-colors duration-300 hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
