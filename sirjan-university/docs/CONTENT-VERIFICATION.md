# Content verification register

The official website (`https://sirjan.iau.ir/`) **could not be reached** while this site was
built: DNS resolution and the build environment's network policy blocked it, and web archives were
unavailable too. So no institutional fact on this site has been verified against the official
source. This register lists what must be confirmed before launch, and where each item lives.

Every content record has a `provenance` field:

| Value      | Meaning                                                      | How it renders                         |
| ---------- | ------------------------------------------------------------ | -------------------------------------- |
| `verified` | Confirmed against an official source                         | No marker                              |
| `sample`   | Illustrative demonstration content; replace before launch    | Amber **Sample / نمونه** badge         |
| `pending`  | Required field whose official value has not been supplied    | Outlined **Pending verification** badge |

When you verify a record, update its value and set `provenance: 'verified'`. The marker disappears
by itself.

## Must be supplied by the university

| Item | File | Current state |
| --- | --- | --- |
| Official logo | `src/components/layout/Logo.tsx`, `src/app/icon.svg` | Neutral interim emblem; does not imitate the IAU mark |
| Brand colours/typography | `src/app/globals.css` (`@theme`) | Initial palette from the brief |
| Telephone, fax, email, postal code | `src/content/site.ts` → `contact` | Empty; UI shows "Pending verification" |
| Street address, campus coordinates | `src/content/site.ts` → `contact.address`, `mapLinks` | City and province only; map link is a name search, directions disabled |
| Office response hours, working days/hours | `src/content/site.ts` | Empty |
| Social media accounts | `src/content/site.ts` → `socialLinks` | No URLs; icons render disabled |
| Institutional statistics | `src/content/home.ts` → `stats` | **Sample figures**, labelled as such |
| Branch history and founding date | `src/content/pages.ts` → `about.history` | Only the IAU-wide founding year (1982) is stated |
| Academic calendar dates | `src/content/calendar.ts` | **Demonstration dates** for 2026–27 |
| Names of the President, vice-presidents, directors, deans | `src/content/people.ts`, `src/content/units.ts` (`head.name`), `src/content/faculties.ts` (`dean`) | Positions only; names never published unverified |
| Board of Trustees members | `src/content/people.ts` → `boardMembers` | Seats by role only |
| Telephone extensions | `src/content/people.ts` (`extension`) | Empty |
| Office descriptions | `src/content/units.ts` | General descriptions of each office's typical remit; each office should review |
| Faculty and group names | `src/content/faculties.ts` | Exactly as supplied in the brief (Academic Group 1, 2, 4–8, Nursing Department) |
| Programme list and requirements | `src/content/programs.ts` | **Sample dataset**; mapping to groups is illustrative |
| News, events, announcements | `src/content/news.ts`, `src/content/announcements.ts` | **Sample** items |
| Forms and regulations files | `src/content/documents.ts` (`href`) | Titles only; downloads disabled ("File not yet uploaded") |
| Publications files | `src/content/publications.ts` (`href`) | **Sample**; read action disabled |
| Photography and video | `public/illustrations/*`, `src/content/media.ts` | Generated illustrative artwork, labelled on every image; videos not published |
| University system URLs | `src/content/links.ts` | Only well-known addresses linked (see below); others unlinked |

## Structural questions to resolve

- **Faculty of Management and Economics** lists a sub-item with the faculty's own name. It is kept
  as supplied (`slug: faculty-office`) and flagged on the page. Confirm whether it is the faculty
  office or an academic group.
- **Academic Group 3** does not appear in the supplied structure (groups run 1, 2, 4, 5, 6, 7, 8 plus
  Nursing). Confirm whether that is intentional.

## External links currently in use

These are long-established public addresses. Confirm each with the ICT directorate before launch.

| Destination | URL |
| --- | --- |
| Islamic Azad University (central organisation) | `https://iau.ac.ir` |
| IAU Admissions and Assessment Centre | `https://azmoon.iau.ac.ir` |
| Current Sirjan Branch website | `https://sirjan.iau.ir` |
| Ministry of Science, Research and Technology | `https://www.msrt.ir` |
| National Organization of Educational Testing | `https://www.sanjesh.org` |
| IranDoc | `https://irandoc.ac.ir` |
| Islamic World Science Citation Center | `https://isc.ac` |
| Scientific Information Database (SID) | `https://www.sid.ir` |
| OpenStreetMap place search (map link) | `https://www.openstreetmap.org/search?query=…` |

Student portal, staff portal, faculty portal, research system, library catalogue and LMS have **no
URL** until the branch confirms them.
