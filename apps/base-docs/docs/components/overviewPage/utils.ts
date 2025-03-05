export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
} 