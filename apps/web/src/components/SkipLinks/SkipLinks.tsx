/**
 * SkipLinks Component
 *
 * Provides keyboard users a way to skip repetitive navigation and jump directly
 * to main content areas. This is a WCAG 2.4.1 Level A requirement.
 *
 * The links are visually hidden until focused, appearing at the top of the page
 * when a keyboard user tabs into them.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html
 */
export function SkipLinks() {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
    </div>
  );
}
