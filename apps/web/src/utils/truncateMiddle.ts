export function truncateMiddle(
  str: string | null | undefined,
  charactersAtFront: number,
  charactersAtEnd: number,
): string {
  if (!str) {
    return '';
  }

  const truncationString = '…';
  const trimmed = str.trim();

  if (trimmed.length <= charactersAtFront + charactersAtEnd + truncationString.length) {
    return str;
  }

  const startOfEnd = trimmed.length - charactersAtEnd;
  const firstChars = trimmed.substring(0, charactersAtFront);
  const lastChars = trimmed.substring(startOfEnd);

  return firstChars + truncationString + lastChars;
}
