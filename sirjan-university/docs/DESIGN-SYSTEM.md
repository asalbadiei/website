# Design system

All tokens live in `src/app/globals.css` under `@theme`, so Tailwind exposes them as utilities
(`bg-navy`, `text-brand`, `border-line`, `text-h2` …).

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#12345A` | Institutional authority: footer, CTA bands, headings |
| `navy-900` | `#0B2340` | Utility bar, overlays |
| `brand` | `#155AA8` | Links, primary buttons, active states |
| `brand-2` | `#2878C8` | Focus ring, secondary accents |
| `brand-50` / `brand-100` | `#F1F6FC` / `#DCE8F6` | Tinted surfaces, icon tiles |
| `canvas` | `#F7F9FC` | Page background |
| `surface` | `#FFFFFF` | Cards, header |
| `ink` / `ink-2` | `#182638` / `#3C4B5F` | Body text |
| `muted` | `#5B6B80` | Secondary text (the brief's `#64748B` was darkened slightly to pass AA on `canvas`) |
| `line` / `line-strong` | `#E2E8F0` / `#CBD5E1` | Borders |
| `accent` | `#C62836` | Urgent notices and the main admissions action only |
| `success` | `#16805D` | "In progress" status, confirmations |
| `warning` | `#8A5A12` | Sample-content notices (the brief's `#B7791F` darkened for text contrast) |

Red is deliberately rare: an urgent notice gets a red start border, an icon **and** the word
"Urgent", so colour is never the only signal.

## Typography

- Persian: **Vazirmatn** (variable), self-hosted from `@fontsource-variable/vazirmatn`.
- English: **Inter** (variable), self-hosted from `@fontsource-variable/inter`.
- The active family switches on `html[lang]`, so components never branch on language.
- Scale: `text-display`, `text-h1`, `text-h2` (fluid with `clamp`), `text-h3`, `text-body`, `text-caption`.
- Persian body line height is 1.85, English 1.7.

## Layout and spacing

- `.container-site`: max width 1360px, 16/24/32px side gutters.
- `.section`: 56px vertical padding, 80px from `lg`.
- Spacing follows Tailwind's 4px scale.
- Radii: `sm` 4px (badges), `md` 6px (buttons, inputs), `lg` 10px (cards).
- Shadows: `shadow-card` (resting), `shadow-raised` (hover, menus, dialogs).

## Direction

Layout uses logical properties only (`ms-`, `pe-`, `start-`, `end-`, `border-s`), so one component
serves RTL and LTR. Icons that point "forward" are drawn for LTR and mirrored in RTL with the
`flip-rtl` class. Carousel and lightbox arrow keys swap meaning by direction.

## Components

| Area | Components |
| --- | --- |
| UI primitives | `Button`/`ButtonLink`, `Badge`, `ProvenanceBadge`, `SampleNotice`, `EmptyState`, `Skeleton`, `SectionHeading`, `Dialog`, `Icon` |
| Layout | `Header` (hamburger, emblem, search, `LanguageMenu`), `MenuDrawer` (all navigation), `SearchOverlay`, `LanguageSwitcher`, `Breadcrumbs`, `Footer`, `BackToTop` |
| Content | `PageHeader`, `NewsCard`, `AnnouncementItem`, `FacultyCard`, `ProgramCard`, `CalendarItem`, `DocumentRow`, `PersonCard`, `LinkCard`, `ImageFrame`, `Attachments`, `FaqList`, `SideNav`, `UnitPage`, `UnitGrid`, `AboutShell` |
| Listings | `NewsArchive`, `AnnouncementArchive`, `ProgramDirectory`, `DocumentLibrary`, `PeopleDirectory`, `PublicationArchive`, `SearchPageClient`, shared `controls` (search field, selects, chips, pagination, URL state) |
| Home | `HeroSlider`, `StatsBand`, `QuickAccess`, `CtaBand` |
| Media | `GalleryGrid` (with lightbox) |
