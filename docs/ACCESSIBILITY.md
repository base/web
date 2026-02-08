# Accessibility Best Practices

This document outlines guidelines to ensure the Base web experience
is inclusive and usable by as many people as possible.

## Keyboard navigation

- All interactive elements must be reachable via Tab and Shift+Tab.
- Provide visible focus styles for links, buttons and form controls.

## ARIA roles and labels

- Use semantic HTML elements where possible (e.g. `<button>`, `<nav>`, `<header>`).
- When semantics are insufficient, add appropriate ARIA roles.
- Always associate form inputs with `<label>` or `aria-label`.

## Colour contrast

- Text and interactive elements should have a minimum contrast ratio of 4.5:1.
- Avoid relying on colour alone to convey meaning.

## Testing

- Use screen readers (e.g. NVDA, VoiceOver) to test flows.
- Run automated tools such as axe-core as part of CI.
- Include accessibility considerations in code reviews.

Accessibility is a shared responsibility—following these best practices
helps provide a better experience for everyone.
