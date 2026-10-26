/** Normalise Arabic/Persian letter variants, diacritics, digits and case for matching. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/‌/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
