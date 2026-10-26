import { FileSpreadsheet, FileText, FileType2, FolderArchive } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { formatDate } from '@/lib/format';
import type { DocumentItem } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { FileAction } from './FileAction';

const fileIcon = { pdf: FileText, docx: FileType2, xlsx: FileSpreadsheet, zip: FolderArchive };

export function DocumentRow({ doc, locale }: { doc: DocumentItem; locale: Locale }) {
  const dict = getDictionary(locale);
  const Icon = fileIcon[doc.fileType];
  return (
    <li className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-navy">{doc.title[locale]}</h3>
        <p className="mt-0.5 text-sm text-muted">{doc.description[locale]}</p>
        <dl className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-ink-2">
          <div className="flex gap-1">
            <dt className="sr-only">{dict.common.category}</dt>
            <dd>
              <Badge>{dict.documents.categories[doc.category]}</Badge>
            </dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-muted">{dict.documents.fileType}:</dt>
            <dd className="uppercase">{doc.fileType}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-muted">{dict.documents.department}:</dt>
            <dd>{doc.department[locale]}</dd>
          </div>
          {doc.revised ? (
            <div className="flex gap-1">
              <dt className="text-muted">{dict.documents.revised}:</dt>
              <dd>{formatDate(doc.revised, locale)}</dd>
            </div>
          ) : null}
        </dl>
      </div>
      <FileAction href={doc.href} locale={locale} />
    </li>
  );
}
