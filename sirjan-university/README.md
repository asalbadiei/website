# Islamic Azad University, Sirjan Branch — bilingual website

A redesigned, bilingual (Persian RTL / English LTR) website for Islamic Azad University, Sirjan
Branch, built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Lucide icons.

> **Status: development preview.** The official site (`sirjan.iau.ir`) could not be reached during
> the build, so no institutional fact has been verified. All such content is marked **Sample** or
> **Pending verification** in the UI. See [`docs/CONTENT-VERIFICATION.md`](docs/CONTENT-VERIFICATION.md)
> before publishing.

This app is self-contained in `sirjan-university/` and does not share code, dependencies or
build output with the Vite site at the repository root.

## Run it

Requires Node.js 20+ and pnpm.

```bash
cd sirjan-university
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /fa
```

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build (pre-renders ~180 pages) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm illustrations` | Regenerate the illustrative SVG artwork in `public/illustrations` |

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the public origin; it drives
canonical URLs, hreflang, Open Graph and the sitemap.

## Deploy

Any Node.js host that runs `next start` works (Vercel, a container, or a VM behind a reverse
proxy). On Vercel set the project's root directory to `sirjan-university`. Every content page is
static; only unknown URLs render on demand (to return the localized 404 page).

## What is implemented

- **Two complete languages**: `/fa/...` (default, RTL, Solar Hijri dates, Persian digits) and
  `/en/...` (LTR, Gregorian dates). `/` redirects to `/fa`. The header switch keeps the current
  page, since every route exists in both languages. `lang`/`dir` are set per locale.
- **Homepage** in the specified order: hero slider → statistics → quick-access cards → admissions
  CTA → announcements → student-services CTA → news and events → academic calendar → related
  systems → image gallery → related portals → footer.
- **Navigation**: the header stays minimal (hamburger, emblem, search, language menu); every
  section lives in the hamburger menu, a full-site panel on desktop that becomes an accordion
  drawer on mobile. Breadcrumbs with structured data and active-page states.
- **Search**: overlay (also opened with `/`) and a `/search` page over news, announcements,
  faculties, academic groups, programmes, people, offices, forms and pages. The index is a static
  JSON file per locale (`/api/search/fa`, `/api/search/en`), loaded only when search opens.
  Matching normalises Arabic/Persian letter variants, digits and ZWNJ.
- **Listings with URL-synced filters**: news (category, search, pagination), announcements
  (category, search, load more), programmes (faculty, group, level, field, search), forms
  (category, file type, search), people, publications.
- **Templates**: faculty → academic group hierarchy, programme detail, news/event detail with
  related items and attachments, announcement detail, shared office/unit template (presidency,
  vice-presidencies, Growth Center, Innovation House), About section, admissions, student support,
  media centre and galleries with a keyboard lightbox, systems and portals, accessibility and
  privacy statements, localized 404 (with a real 404 status) and error pages.
- **SEO**: per-page localized titles and descriptions, canonical URLs, `fa-IR`/`en`/`x-default`
  hreflang, Open Graph, `sitemap.xml` (170 URLs with alternates), `robots.txt`, JSON-LD for the
  organisation, breadcrumbs, news articles and events.
- **Accessibility**: semantic landmarks, one H1 per page, skip link, visible focus, native
  `<dialog>` for modals, ARIA on menus/carousel/filters, reduced-motion support (carousel does not
  auto-rotate), and urgency/status never conveyed by colour alone.

## Routes

`/fa` and `/en` prefixes apply to every route.

| Area | Routes |
| --- | --- |
| Home | `/` |
| About | `/about`, `/about/history`, `/about/location`, `/about/phone-directory`, `/contact`, `/board` |
| Presidency | `/presidency`, `/presidency/{president, public-relations, ict, international-affairs, security, legal-affairs}` |
| Vice-presidencies | `/vice-presidencies`, `/vice-presidencies/{research-technology, education-graduate-studies, student-affairs-culture, sama, development-resources}` |
| Faculties | `/faculties`, `/faculties/{faculty}`, `/faculties/{faculty}/{group}` |
| Programmes | `/programs`, `/programs/{slug}` |
| Admissions & students | `/admissions`, `/student-support`, `/calendar`, `/forms` |
| Research | `/growth-center`, `/innovation`, `/publications` |
| News & media | `/news`, `/news/{slug}`, `/announcements`, `/announcements/{slug}`, `/media`, `/media/{gallery}` |
| Other | `/people`, `/systems`, `/search`, `/accessibility`, `/privacy` |

## Project structure

```
src/
  app/[locale]/        routes (the locale layout is the root layout: sets lang/dir)
  app/api/search/      static per-locale search index
  app/sitemap.ts, robots.ts
  components/
    layout/            header, footer, logo, language switcher, breadcrumbs
    navigation/        menu drawer, search overlay
    home/              hero slider, stats, quick access, CTA band
    content/           cards, page header, unit template, FAQ, file actions
    listing/           client-side filterable listings + shared controls
    media/             gallery grid + lightbox
    forms/             contact form (demo)
    ui/                buttons, badges, dialog, provenance markers, empty state
  content/             typed bilingual content (single source for every listing)
  i18n/                locale config, path helpers, fa/en dictionaries, client provider
  lib/                 formatting (dates, digits), SEO, search, routes, fonts
  types/content.ts     content model
docs/                  design system, content verification register
scripts/               illustration generator
```

Content files hold both languages side by side (`{ fa, en }`) and carry a `provenance` field.
Interface strings live in `src/i18n/dictionaries/{fa,en}.ts`; `en` is typed against `fa`, so a
missing translation is a type error.

## Integration points (not live)

| Feature | Current behaviour | To make it live |
| --- | --- | --- |
| Contact form | Validates accessibly, sends nothing, says so | Replace the success branch in `src/components/forms/ContactForm.tsx` with a server action or API call |
| Forms/regulations downloads | Disabled "File not yet uploaded" | Put files in `public/documents/` (or a CMS) and set `href` in `src/content/documents.ts` |
| Publications | Read action disabled | Set `href` in `src/content/publications.ts` |
| University systems | Only verified URLs linked | Add `href` in `src/content/links.ts` once confirmed |
| Social media | Icons disabled | Add `href` in `src/content/site.ts` |
| Map / directions | Place-search link; no embed | Add coordinates and a directions URL in `src/content/site.ts` |
| Videos | Posters only | Add video sources to `src/content/media.ts` and a player |
| CMS | Content is TypeScript data | Map a CMS (e.g. Strapi) onto the types in `src/types/content.ts`; components consume only those types |
| Search backend | Static client-side index | Serve the same `SearchDoc[]` shape from a search service; the UI is unchanged |

No authentication, registration transaction or external API is implemented; admissions links go
to the official IAU admissions system.

## Known limitations

- **Imagery is illustrative**: generated SVG artwork in the institutional palette, labelled on
  every image. No photo is presented as the Sirjan campus.
- **Logo is an interim emblem**: replace with the official file.
- **No performance score is claimed**: no Lighthouse run was performed.
- **Unknown-URL renders**: unknown URLs render on demand, and Next logs a harmless
  `NoFallbackError` line for each one.
