import type { Locale } from '@/i18n/config';

/** A string in both site languages. Every user-facing content field uses this. */
export type L = Record<Locale, string>;

/**
 * Where a piece of content came from.
 * - `verified`: confirmed against an official source (see docs/CONTENT-VERIFICATION.md).
 * - `sample`: illustrative demonstration content that must be replaced before launch.
 * - `pending`: the field is required but the official value has not been supplied yet.
 */
export type Provenance = 'verified' | 'sample' | 'pending';

export type ImageRef = {
  src: string;
  alt: L;
  /** Illustrative artwork rather than a photograph of the Sirjan Branch. */
  illustrative?: boolean;
};

export type Attachment = {
  title: L;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'zip';
  /** Omitted until the real file is uploaded; the UI then shows "file pending". */
  href?: string;
  sizeKb?: number;
};

export type NewsCategory = 'university' | 'research' | 'student' | 'culture' | 'event';

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  date: string; // ISO yyyy-mm-dd
  title: L;
  summary: L;
  body: L[];
  image: ImageRef;
  attachments?: Attachment[];
  featured?: boolean;
  /** Events carry a start date and venue. */
  event?: { start: string; end?: string; venue: L };
  provenance: Provenance;
};

export type AnnouncementCategory = 'education' | 'admissions' | 'exams' | 'student-affairs' | 'research' | 'general';

export type Announcement = {
  slug: string;
  category: AnnouncementCategory;
  date: string;
  title: L;
  excerpt: L;
  body: L[];
  urgent?: boolean;
  attachments?: Attachment[];
  provenance: Provenance;
};

export type Department = {
  slug: string;
  name: L;
  intro: L;
  provenance: Provenance;
};

export type Faculty = {
  slug: string;
  name: L;
  shortName: L;
  intro: L;
  icon: 'engineering' | 'humanities' | 'law' | 'management';
  image: ImageRef;
  departments: Department[];
  dean?: L;
  /** Supplied structure; official names still need confirmation. */
  provenance: Provenance;
};

export type DegreeLevel = 'associate' | 'bachelor' | 'master' | 'doctorate';

export type Program = {
  slug: string;
  title: L;
  level: DegreeLevel;
  faculty: string; // Faculty.slug
  department: string; // Department.slug
  field: L;
  intro: L;
  requirements?: L[];
  durationYears?: number;
  provenance: Provenance;
};

export type CalendarEventType = 'registration' | 'add-drop' | 'classes-start' | 'classes-end' | 'exams';

export type CalendarEvent = {
  id: string;
  type: CalendarEventType;
  term: L;
  title: L;
  start: string;
  end?: string;
  details?: L;
  provenance: Provenance;
};

export type ExternalLink = {
  id: string;
  title: L;
  description: L;
  category: string;
  /** Present only when the destination has been verified. */
  href?: string;
  icon: string;
};

export type DocumentCategory = 'education' | 'research' | 'student' | 'administrative' | 'graduate' | 'regulations';

export type DocumentItem = {
  id: string;
  title: L;
  description: L;
  category: DocumentCategory;
  department: L;
  fileType: Attachment['fileType'];
  revised?: string;
  href?: string;
  provenance: Provenance;
};

export type Person = {
  id: string;
  /** Unverified names are never published; the UI shows "name pending verification". */
  name?: L;
  position: L;
  unit: L;
  unitSlug?: string;
  group: 'leadership' | 'administration' | 'faculty' | 'board' | 'staff';
  extension?: string;
  email?: string;
  bio?: L;
  provenance: Provenance;
};

export type OrgUnit = {
  slug: string;
  name: L;
  summary: L;
  intro: L[];
  responsibilities: L[];
  services?: { title: L; description: L }[];
  head?: { position: L; name?: L };
  icon: string;
  provenance: Provenance;
};

export type Publication = {
  slug: string;
  title: L;
  description: L;
  issue: L;
  date: string;
  kind: 'newsletter' | 'journal' | 'report' | 'guide';
  cover: ImageRef;
  href?: string;
  provenance: Provenance;
};

export type Gallery = {
  slug: string;
  title: L;
  date: string;
  category: 'campus' | 'ceremony' | 'research' | 'education' | 'event';
  images: ImageRef[];
  provenance: Provenance;
};

export type FaqItem = { q: L; a: L; topic: 'admissions' | 'education' | 'administrative' | 'welfare' };
