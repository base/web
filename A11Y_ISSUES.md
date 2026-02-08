# Accessibility Audit Report - Base Website

**Audit Date**: 2026-01-04
**Auditor**: Accessibility Specialist
**Standard**: WCAG 2.2 Level AA/AAA
**Repository**: base/web (base.org)

---

## Executive Summary

This report documents accessibility issues found during a comprehensive audit of the Base website (base.org). Issues are categorized by severity and mapped to specific WCAG 2.2 success criteria.

### Severity Levels
- **Critical**: Prevents access to key functionality (WCAG Level A)
- **High**: Significantly impairs user experience (WCAG Level AA)
- **Medium**: Creates barriers but has workarounds (WCAG Level AA)
- **Low**: Minor issues or AAA enhancements

### Overview

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 4 | 🔴 Open |
| High | 8 | 🔴 Open |
| Medium | 6 | 🔴 Open |
| Low | 3 | 🔴 Open |
| **Total** | **21** | |

---

## Critical Issues (Level A)

### 1. Missing ARIA Labels on Loading States

**File**: `apps/web/src/components/Button/Button.tsx`
**Lines**: 75-79
**WCAG Criterion**: 1.1.1 Non-text Content (Level A), 4.1.2 Name, Role, Value (Level A)

#### Issue
Loading spinner lacks accessible name, making it invisible to screen readers.

```tsx
// ❌ Current Implementation (Lines 75-79)
{isLoading ? (
  <span className="flex justify-center">
    <Icon name="spinner" color="currentColor" />
  </span>
) : (
  children
)}
```

#### User Impact
- Screen reader users don't know the button is in a loading state
- No indication that action is being processed
- Confusion about whether interaction was successful

#### How to Reproduce
1. Trigger a button with `isLoading={true}`
2. Navigate with screen reader (NVDA/JAWS)
3. Observe: No announcement of loading state

#### Recommended Fix
```tsx
// ✅ Improved Implementation
{isLoading ? (
  <span className="flex justify-center" aria-label="Loading" role="status">
    <Icon name="spinner" color="currentColor" aria-hidden="true" />
  </span>
) : (
  children
)}
```

**Additional**: Add `aria-busy="true"` to button when loading.

---

### 2. Missing Disabled State Announcements

**File**: `apps/web/src/components/Button/Button.tsx`
**Line**: 74
**WCAG Criterion**: 4.1.2 Name, Role, Value (Level A)

#### Issue
Disabled buttons use visual-only indicators. While `disabled` attribute is present, additional ARIA attributes improve screen reader support.

```tsx
// ❌ Current Implementation (Line 74)
<button {...props} type="button" className={buttonClasses} disabled={disabled}>
```

#### User Impact
- Some screen readers may not consistently announce disabled state
- Visual-only opacity doesn't help non-visual users

#### Recommended Fix
```tsx
// ✅ Improved Implementation
<button
  {...props}
  type="button"
  className={buttonClasses}
  disabled={disabled}
  aria-disabled={disabled || isLoading}
  aria-busy={isLoading}
>
```

---

### 3. Clickable Element Without Keyboard Support

**File**: `apps/web/src/components/ConnectWalletButton/ConnectWalletButton.tsx`
**Line**: 151
**WCAG Criterion**: 2.1.1 Keyboard (Level A), 2.1.3 Keyboard (No Exception) (Level AAA)

#### Issue
`<Name>` component with `onClick` may not be keyboard accessible.

```tsx
// ❌ Current Implementation (Line 151)
<Name
  onClick={copyAddress}
  chain={basenameChain}
  className="cursor-pointer font-display transition-all hover:opacity-65"
/>
```

#### User Impact
- Keyboard-only users cannot copy address
- Violates fundamental keyboard accessibility

#### How to Reproduce
1. Tab through wallet dropdown
2. Try to activate copy function with Enter/Space
3. Observe: May not work if Name isn't a proper interactive element

#### Recommended Fix
```tsx
// ✅ Improved Implementation
<button
  onClick={copyAddress}
  className="cursor-pointer font-display transition-all hover:opacity-65 bg-transparent border-none p-0 text-left"
  aria-label="Copy wallet address"
>
  <Name chain={basenameChain} />
</button>
```

---

### 4. Missing Alternative Text Context

**File**: `apps/web/src/components/Builders/MiniKit/HeaderAnimation.tsx`
**Lines**: 41, 46, 49, 52
**WCAG Criterion**: 1.1.1 Non-text Content (Level A)

#### Issue
Images have generic alt text that doesn't convey context or purpose.

```tsx
// ❌ Current Implementation
<Image src={minikit2} alt="minikit2" width={32} height={32} />
<Image src={walletLogo} alt="walletLogo" width={32} height={32} />
<Image src={farcaster} alt="farcaster" width={32} height={32} />
<Image src={plus} alt="plus" width={32} height={32} />
```

#### User Impact
- Screen reader users hear "minikit2 image" instead of meaningful description
- Decorative vs functional distinction unclear

#### Recommended Fix
```tsx
// ✅ Improved Implementation
<Image src={minikit2} alt="MiniKit SDK integration" width={32} height={32} />
<Image src={walletLogo} alt="Wallet connection" width={32} height={32} />
<Image src={farcaster} alt="Farcaster social integration" width={32} height={32} />
<Image src={plus} alt="Additional integrations" width={32} height={32} />
```

Or if purely decorative:
```tsx
<Image src={minikit2} alt="" width={32} height={32} aria-hidden="true" />
```

---

## High Severity Issues (Level AA)

### 5. Missing Focus Indicators

**File**: Multiple components
**WCAG Criterion**: 2.4.7 Focus Visible (Level AA), 2.4.13 Focus Appearance (Level AAA)

#### Issue
Custom focus styles may not meet minimum contrast requirements or visibility.

#### Components Affected
- `Button.tsx` - No custom focus-visible styles
- `ConnectWalletButton.tsx` - Generic hover states
- All interactive elements

#### User Impact
- Keyboard users cannot see where focus is
- Violates WCAG AA minimum

#### Recommended Fix
Add to `globals.css`:
```css
/* Enhanced focus indicators */
*:focus-visible {
  outline: 2px solid #0052FF; /* Base blue */
  outline-offset: 2px;
  border-radius: 4px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  *:focus-visible {
    outline-width: 3px;
    outline-color: currentColor;
  }
}
```

---

### 6. Insufficient Color Contrast

**File**: `apps/web/src/components/Button/Button.tsx`
**Lines**: 24-27
**WCAG Criterion**: 1.4.3 Contrast (Minimum) (Level AA), 1.4.6 Contrast (Enhanced) (Level AAA)

#### Issue
Some button variants may not meet 4.5:1 contrast ratio.

```tsx
// ⚠️ Needs Verification
[ButtonVariants.Secondary]:
  'text-white bg-transparent border border-white hover:bg-translucent-100',
[ButtonVariants.Gray]:
  'text-black bg-[#EEF0F3] hover:bg-[#EEF0F3]/60',
```

#### User Impact
- Low vision users cannot read button text
- Affects users with color blindness

#### Testing Required
- Test against backgrounds using contrast checker
- Verify translucent colors meet requirements
- Check hover/focus states

#### Recommended Action
1. Run automated contrast testing
2. Adjust colors to meet 4.5:1 minimum
3. Aim for 7:1 (AAA) where possible

---

### 7. Missing Form Labels and Error Handling

**Location**: Search/Input components
**WCAG Criterion**: 3.3.2 Labels or Instructions (Level A), 3.3.3 Error Suggestion (Level AA)

#### Issue
Need to audit form components for proper labeling and error messaging.

#### Required Checks
- [ ] All inputs have associated `<label>` or `aria-label`
- [ ] Error messages use `aria-invalid` and `aria-describedby`
- [ ] Required fields marked with `aria-required`
- [ ] Instructions provided before input

---

### 8. Missing Skip Links

**Location**: Main layout/navigation
**WCAG Criterion**: 2.4.1 Bypass Blocks (Level A)

#### Issue
No skip navigation link detected for keyboard users.

#### User Impact
- Keyboard users must tab through entire navigation each page
- Severely impacts efficiency

#### Recommended Implementation
```tsx
// Add to layout component
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// CSS
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0052FF;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

### 9. Insufficient Touch Target Sizes

**File**: Multiple components
**WCAG Criterion**: 2.5.8 Target Size (Minimum) (Level AAA, upgraded to AA in 2.2)

#### Issue
Interactive elements may not meet 44x44px minimum.

#### Components to Check
- Icon buttons
- Close buttons in modals
- Mobile navigation items

#### Recommended Fix
```tsx
// Ensure minimum touch target
className="min-h-[44px] min-w-[44px] flex items-center justify-center"
```

---

### 10. Missing Live Region Announcements

**Location**: Dynamic content updates
**WCAG Criterion**: 4.1.3 Status Messages (Level AA)

#### Issue
Status changes (wallet connected, copy success, etc.) not announced.

#### Recommended Implementation
```tsx
// Add VisuallyHidden component
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Usage for announcements
<div role="status" aria-live="polite" aria-atomic="true">
  <VisuallyHidden>{statusMessage}</VisuallyHidden>
</div>
```

---

### 11. Modal Focus Trap Issues

**Files**: Modal components
**WCAG Criterion**: 2.4.3 Focus Order (Level A)

#### Issue
Modals need proper focus management:
- Focus trap when open
- Return focus on close
- Escape key handler

#### Recommended Pattern
```tsx
// Using radix-ui Dialog (already in dependencies)
import * as Dialog from '@radix-ui/react-dialog';

// Benefits:
// ✅ Automatic focus trapping
// ✅ Escape key handling
// ✅ Focus return on close
// ✅ Proper ARIA attributes
```

---

### 12. Language Declaration

**File**: Root layout
**WCAG Criterion**: 3.1.1 Language of Page (Level A)

#### Issue
Verify `lang` attribute is set correctly.

#### Required Check
```html
<html lang="en">
```

---

## Medium Severity Issues

### 13. Heading Hierarchy

**Location**: Various pages
**WCAG Criterion**: 1.3.1 Info and Relationships (Level A)

#### Issue
Verify logical heading hierarchy (h1 → h2 → h3, no skips).

#### Testing Required
- Audit with browser extension (HeadingsMap)
- Ensure single h1 per page
- No heading level skips

---

### 14. Link Purpose

**Location**: Navigation and content links
**WCAG Criterion**: 2.4.4 Link Purpose (In Context) (Level A)

#### Issue
Links like "Learn More" or "Click Here" need context.

#### Recommended Pattern
```tsx
// ❌ Bad
<a href="/docs">Learn More</a>

// ✅ Good
<a href="/docs">Learn More about Base Documentation</a>

// ✅ Better (visually hidden context)
<a href="/docs">
  Learn More
  <VisuallyHidden>about Base Documentation</VisuallyHidden>
</a>
```

---

### 15. Semantic HTML

**Location**: Component structure
**WCAG Criterion**: 4.1.1 Parsing (Level A)

#### Issue
Ensure proper semantic HTML usage.

#### Checks
- Navigation in `<nav>` with `aria-label`
- Main content in `<main>` landmark
- Sections use appropriate heading + landmark roles
- Lists use `<ul>`/`<ol>` where appropriate

---

### 16. Motion Preferences

**Location**: Animations
**WCAG Criterion**: 2.3.3 Animation from Interactions (Level AAA, recommended AA)

#### Issue
Respect `prefers-reduced-motion`.

#### Recommended Implementation
```tsx
// globals.css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 17. Loading State Announcements

**File**: Connect Wallet Button
**Line**: 114
**WCAG Criterion**: 4.1.2 Name, Role, Value (Level A)

#### Issue
```tsx
// ❌ Current (Line 114)
<Icon name="spinner" color="currentColor" />
```

#### Fix
```tsx
// ✅ Improved
<div role="status" aria-label="Connecting wallet">
  <Icon name="spinner" color="currentColor" aria-hidden="true" />
</div>
```

---

### 18. Error Identification

**Location**: Form components
**WCAG Criterion**: 3.3.1 Error Identification (Level A)

#### Required Pattern
```tsx
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? "error-msg" : undefined}
/>
{hasError && (
  <span id="error-msg" role="alert">
    {errorMessage}
  </span>
)}
```

---

## Low Severity Issues

### 19. Resize Text (200%)

**WCAG Criterion**: 1.4.4 Resize Text (Level AA)

#### Test
- Zoom browser to 200%
- Verify no text truncation or overlap
- Ensure horizontal scrolling minimal

---

### 20. Target Size Enhancement

**WCAG Criterion**: 2.5.5 Target Size (Enhanced) (Level AAA)

#### Recommendation
Aim for 48x48px targets (beyond 44x44 minimum).

---

### 21. Help Documentation

**WCAG Criterion**: 3.3.5 Help (Level AAA)

#### Recommendation
Provide context-sensitive help for complex interactions.

---

## Testing Checklist

### Automated Testing
- [ ] Run axe DevTools on all pages
- [ ] ESLint jsx-a11y rules enabled
- [ ] Lighthouse accessibility score > 90
- [ ] WAVE browser extension scan

### Manual Testing
- [ ] Keyboard-only navigation (no mouse)
- [ ] Screen reader testing (NVDA/JAWS/VoiceOver)
- [ ] High contrast mode
- [ ] 200% zoom test
- [ ] Color blindness simulation
- [ ] Touch device testing

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers

---

## Priority Implementation Order

1. **Sprint 1** (Critical fixes - Week 1)
   - Issues #1-4: ARIA labels, keyboard support, alt text
   - Issue #8: Skip links
   - Issue #12: Language declaration

2. **Sprint 2** (High severity - Week 2)
   - Issues #5-7: Focus indicators, contrast, form labels
   - Issues #9-11: Touch targets, live regions, modals

3. **Sprint 3** (Medium severity - Week 3)
   - Issues #13-18: Semantic HTML, headings, motion preferences

4. **Sprint 4** (Low severity + polish - Week 4)
   - Issues #19-21: AAA enhancements
   - Final testing and documentation

---

## Resources

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [React ARIA](https://react-spectrum.adobe.com/react-aria/)
- [MDN ARIA Best Practices](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Report Status**: Initial Audit Complete
**Next Steps**: Begin implementation of critical fixes

