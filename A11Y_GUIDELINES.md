# Accessibility Guidelines for Base Web

## Table of Contents
1. [Introduction](#introduction)
2. [WCAG Compliance](#wcag-compliance)
3. [Component Patterns](#component-patterns)
4. [Testing](#testing)
5. [Common Pitfalls](#common-pitfalls)
6. [Tools and Resources](#tools-and-resources)

---

## Introduction

This document provides accessibility guidelines for developing components and features for the Base website. All new code should follow WCAG 2.2 Level AA standards at minimum.

### Why Accessibility Matters
- **13% of global population** has some form of disability
- Legal requirements (ADA, Section 508, AODA, etc.)
- Better UX for everyone (keyboard users, mobile, low bandwidth)
- SEO benefits
- Brand reputation

---

## WCAG Compliance

### Levels of Conformance
- **Level A** (Minimum): Basic accessibility - REQUIRED
- **Level AA** (Recommended): Enhanced accessibility - TARGET
- **Level AAA** (Optimal): Maximum accessibility - NICE TO HAVE

### Key Success Criteria

#### Perceivable
- **1.1.1 Non-text Content** (A): All images must have alt text
- **1.3.1 Info and Relationships** (A): Use semantic HTML
- **1.4.3 Contrast (Minimum)** (AA): 4.5:1 for normal text, 3:1 for large text
- **1.4.4 Resize Text** (AA): Support 200% zoom without loss of functionality

#### Operable
- **2.1.1 Keyboard** (A): All functionality available via keyboard
- **2.4.1 Bypass Blocks** (A): Provide skip links
- **2.4.3 Focus Order** (A): Logical tab order
- **2.4.7 Focus Visible** (AA): Clear focus indicators
- **2.5.8 Target Size** (AA): Minimum 44x44px touch targets

#### Understandable
- **3.1.1 Language of Page** (A): Declare language with `lang` attribute
- **3.2.1 On Focus** (A): No context changes on focus
- **3.3.1 Error Identification** (A): Clear error messages
- **3.3.2 Labels or Instructions** (A): Provide labels for inputs

#### Robust
- **4.1.2 Name, Role, Value** (A): Proper ARIA attributes
- **4.1.3 Status Messages** (AA): Announce dynamic content changes

---

## Component Patterns

### Buttons

```tsx
// ✅ Good: Accessible button with all states
<Button
  onClick={handleClick}
  disabled={isDisabled}
  isLoading={isLoading}
  aria-label="Optional descriptive label"
>
  Click me
</Button>

// ❌ Bad: Div used as button
<div onClick={handleClick}>Click me</div>

// ❌ Bad: Button without accessible loading state
<button disabled={isLoading}>
  {isLoading ? <Icon name="spinner" /> : 'Submit'}
</button>
```

#### Requirements
- Use `<button>` element or `role="button"`
- Include `type="button"` (or "submit"/"reset")
- Add `aria-busy` when loading
- Include `aria-disabled` for disabled state
- Provide `aria-label` if text isn't descriptive

### Links

```tsx
// ✅ Good: Descriptive link text
<a href="/docs">Read the documentation</a>

// ✅ Good: Context provided via VisuallyHidden
<a href="/docs">
  Learn more
  <VisuallyHidden>about Base documentation</VisuallyHidden>
</a>

// ❌ Bad: Generic link text
<a href="/docs">Click here</a>
```

### Forms

```tsx
// ✅ Good: Properly labeled input with error handling
<div>
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <span id="email-error" role="alert">
      Please enter a valid email address
    </span>
  )}
</div>

// ❌ Bad: Input without label
<input type="email" placeholder="Email" />

// ❌ Bad: Error not associated with input
<input type="email" />
<span>Error: Invalid email</span>
```

### Modals/Dialogs

```tsx
// ✅ Good: Using Radix UI Dialog (recommended)
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger>Open modal</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content aria-describedby="dialog-description">
      <Dialog.Title>Modal Title</Dialog.Title>
      <Dialog.Description id="dialog-description">
        Modal description text
      </Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

#### Modal Requirements
- Focus trap when open
- Return focus on close
- Escape key to close
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` pointing to title
- `aria-describedby` for description

### Loading States

```tsx
// ✅ Good: Accessible loading indicator
<div role="status" aria-label="Loading data">
  <Icon name="spinner" aria-hidden="true" />
</div>

// ✅ Good: Live region for status updates
<LiveRegion>
  {isLoading && "Loading..."}
  {isSuccess && "Data loaded successfully"}
</LiveRegion>

// ❌ Bad: No screen reader announcement
<Icon name="spinner" />
```

### Images

```tsx
// ✅ Good: Descriptive alt text
<Image
  src="/logo.png"
  alt="Base - Ethereum L2 blockchain"
/>

// ✅ Good: Decorative image
<Image
  src="/background.png"
  alt=""
  aria-hidden="true"
/>

// ❌ Bad: Missing alt attribute
<Image src="/logo.png" />

// ❌ Bad: Redundant alt text
<Image src="/logo.png" alt="logo.png image" />
```

### Live Regions

```tsx
// For non-critical updates (default)
<LiveRegion>
  {copySuccess && "Address copied to clipboard"}
</LiveRegion>

// For critical/urgent updates
<LiveRegion assertive>
  {error && "Error: Transaction failed"}
</LiveRegion>
```

### Skip Links

Already implemented globally in `layout.tsx`. Add landmark roles to your pages:

```tsx
<div id="main-content" role="main" tabIndex={-1}>
  {/* Main content */}
</div>

<nav id="navigation" aria-label="Main navigation">
  {/* Navigation */}
</nav>
```

---

## Testing

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify tab order is logical
- [ ] Shift+Tab works correctly
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals
- [ ] Arrow keys work in custom widgets (if applicable)
- [ ] No keyboard traps

#### Screen Reader Testing
- [ ] Test with NVDA (Windows - free)
- [ ] Test with JAWS (Windows - trial available)
- [ ] Test with VoiceOver (macOS/iOS - built-in)
- [ ] All content announced correctly
- [ ] Form labels announced
- [ ] Error messages announced
- [ ] Loading states announced
- [ ] Modal focus behavior correct

#### Visual Testing
- [ ] Check color contrast with browser devtools
- [ ] Test at 200% zoom
- [ ] Test in high contrast mode
- [ ] Check focus indicators are visible
- [ ] Verify no text truncation at 200% zoom

### Automated Testing

#### Unit Tests (Jest + jest-axe)

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MyComponent } from './MyComponent';

expect.extend(toHaveNoViolations);

it('should not have a11y violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### E2E Tests (Playwright + axe-core)

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

#### Running Tests

```bash
# Unit tests
yarn test

# E2E accessibility tests
yarn test:e2e accessibility.spec.ts

# E2E with UI
yarn test:e2e:ui accessibility.spec.ts
```

### Browser DevTools

1. **Chrome DevTools**
   - Lighthouse Accessibility Audit
   - Inspect Element > Accessibility panel

2. **axe DevTools Extension**
   - Install: https://www.deque.com/axe/devtools/
   - Run full page scan
   - Review violations by severity

3. **WAVE Extension**
   - Install: https://wave.webaim.org/extension/
   - Visual feedback for a11y issues

---

## Common Pitfalls

### 1. Div/Span as Interactive Elements

```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button type="button" onClick={handleClick}>
  Click me
</button>
```

### 2. Missing Focus Management in Modals

```tsx
// ❌ Bad: No focus management
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return <div>{children}</div>;
}

// ✅ Good: Use Radix UI or implement focus trap
import * as Dialog from '@radix-ui/react-dialog';
// Radix handles focus automatically
```

### 3. Icon-Only Buttons

```tsx
// ❌ Bad
<button>
  <Icon name="close" />
</button>

// ✅ Good
<button aria-label="Close dialog">
  <Icon name="close" aria-hidden="true" />
</button>
```

### 4. Insufficient Color Contrast

```tsx
// ❌ Bad: Light gray on white (2:1)
className="text-gray-300 bg-white"

// ✅ Good: Dark text on white (7:1)
className="text-gray-800 bg-white"
```

### 5. Form Inputs Without Labels

```tsx
// ❌ Bad
<input placeholder="Search" />

// ✅ Good
<>
  <label htmlFor="search">Search</label>
  <input id="search" placeholder="Search" />
</>

// ✅ Also Good (if label is visually redundant)
<input aria-label="Search" placeholder="Search" />
```

### 6. Non-Descriptive Link Text

```tsx
// ❌ Bad
<a href="/docs">Click here</a>

// ✅ Good
<a href="/docs">View documentation</a>
```

### 7. Missing Loading State Announcements

```tsx
// ❌ Bad
{isLoading && <Spinner />}

// ✅ Good
{isLoading && (
  <div role="status" aria-label="Loading">
    <Spinner aria-hidden="true" />
  </div>
)}
```

### 8. Animations Without Reduced Motion Support

```css
/* ❌ Bad */
.animated {
  animation: spin 1s infinite;
}

/* ✅ Good */
.animated {
  animation: spin 1s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
  }
}
```

---

## Tools and Resources

### Testing Tools
- **axe DevTools**: Browser extension for automated testing
- **WAVE**: Visual accessibility checker
- **NVDA**: Free Windows screen reader
- **VoiceOver**: Built-in macOS/iOS screen reader
- **Lighthouse**: Chrome DevTools audit
- **Color Contrast Analyzer**: Desktop app

### Libraries and Utilities
- **Radix UI**: Accessible component primitives (already in use)
- **React ARIA**: Adobe's a11y hooks
- **jest-axe**: Jest matchers for accessibility
- **@axe-core/playwright**: Playwright accessibility testing

### Documentation
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Web AIM Resources](https://webaim.org/resources/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)

### Internal Resources
- [A11Y_ISSUES.md](./A11Y_ISSUES.md) - Current accessibility audit
- [VisuallyHidden Component](./apps/web/src/components/VisuallyHidden/VisuallyHidden.tsx)
- [SkipLinks Component](./apps/web/src/components/SkipLinks/SkipLinks.tsx)
- [Accessibility Styles](./apps/web/src/styles/accessibility.css)

---

## Getting Help

### Questions?
- Review this guide and the WCAG quick reference
- Check existing accessible components in the codebase
- Ask in the #accessibility channel (if available)
- Reference Radix UI documentation for complex patterns

### Found an Accessibility Issue?
1. Create an issue with the "accessibility" label
2. Include WCAG criterion violated
3. Describe the user impact
4. Provide steps to reproduce
5. Suggest a fix if possible

---

## Checklist for Pull Requests

Before submitting a PR, verify:

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] All images have appropriate alt text
- [ ] Forms have proper labels
- [ ] Loading states are announced
- [ ] No automated test violations
- [ ] Tested with keyboard only
- [ ] Tested with screen reader (if complex interaction)
- [ ] Works at 200% zoom
- [ ] Respects prefers-reduced-motion

---

**Last Updated**: 2026-01-04
**Maintained by**: Development Team
**Questions**: Refer to accessibility specialist or team lead
