export default function sanitizeEventString(str: string | undefined) {
  if (!str) {
    return '';
  }

  return str.toLowerCase().replace(/[ \-\/\.]/g, '_');
}
