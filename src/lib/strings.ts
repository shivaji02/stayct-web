export function titleCaseFromSlug(value: string): string {
  return decodeURIComponent(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
