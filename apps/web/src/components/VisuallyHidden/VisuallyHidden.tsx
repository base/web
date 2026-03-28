import { ReactNode } from 'react';

/**
 * VisuallyHidden Component
 *
 * Hides content visually but keeps it accessible to screen readers.
 * Useful for providing additional context that's redundant visually
 * but necessary for screen reader users.
 *
 * @example
 * ```tsx
 * <button>
 *   <Icon name="close" />
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 * </button>
 * ```
 *
 * @see https://www.w3.org/WAI/WCAG21/Techniques/css/C7
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <span
      className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
      style={{ clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)' }}
    >
      {children}
    </span>
  );
}

/**
 * Live Region Component
 *
 * Announces dynamic content changes to screen readers.
 * Use for status messages, notifications, and other live updates.
 *
 * @param assertive - If true, interrupts current announcement (use sparingly)
 *
 * @example
 * ```tsx
 * <LiveRegion>
 *   {copySuccess && "Address copied to clipboard"}
 * </LiveRegion>
 * ```
 */
export function LiveRegion({
  children,
  assertive = false,
}: {
  children: ReactNode;
  assertive?: boolean;
}) {
  if (!children) return null;

  return (
    <div
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}
