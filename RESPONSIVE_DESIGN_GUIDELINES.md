# Responsive Design Guidelines for Base Web

## Table of Contents
1. [Introduction](#introduction)
2. [Breakpoint Strategy](#breakpoint-strategy)
3. [Mobile-First Approach](#mobile-first-approach)
4. [Component Patterns](#component-patterns)
5. [Common Pitfalls](#common-pitfalls)
6. [Testing](#testing)
7. [Tools and Resources](#tools-and-resources)

---

## Introduction

This document provides responsive design guidelines for developing components and features for the Base website. All new code should follow a mobile-first approach and work seamlessly across all device sizes.

### Why Responsive Design Matters
- **60%+ of web traffic** comes from mobile devices
- Better user experience across all screen sizes
- SEO benefits (Google mobile-first indexing)
- Accessibility improvements
- Future-proof design

---

## Breakpoint Strategy

### Tailwind CSS Breakpoints

```css
/* Mobile First Approach */
Base:      0px - 767px     /* Mobile (default, no prefix) */
sm:        768px+          /* Tablet */
md:        1024px+         /* Desktop */
lg:        1440px+         /* Large Desktop */
xl:        1920px+         /* 4K */
2xl:       2560px+         /* Ultra-wide */
```

### Target Devices

| Device | Viewport | Breakpoint |
|--------|----------|------------|
| iPhone SE | 375px × 667px | Base |
| iPhone 14 Pro | 393px × 852px | Base |
| iPad | 768px × 1024px | sm |
| iPad Pro landscape | 1024px × 768px | md |
| Desktop | 1440px × 900px | lg |
| 4K Display | 2560px × 1440px | 2xl |

### Container Widths

```tsx
// ✅ Use container classes with max-width
<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>

// Container max-widths:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

---

## Mobile-First Approach

### Core Principle

**Start with mobile styles, then progressively enhance for larger screens.**

```tsx
// ✅ Good: Mobile-first
className="
  text-base          // Mobile: 16px
  sm:text-lg         // Tablet: 18px
  lg:text-xl         // Desktop: 20px
"

// ❌ Bad: Desktop-first (requires max-width)
className="
  text-xl            // Everything gets 20px
  max-md:text-lg     // Harder to maintain
  max-sm:text-base
"
```

### Why Mobile-First?

1. **Performance**: Mobile devices load base styles first
2. **Simplicity**: Easier to enhance than to reduce
3. **Accessibility**: Ensures core content works everywhere
4. **Maintenance**: Less code, clearer intent

---

## Component Patterns

### Typography

```tsx
// ✅ Responsive headings
<h1 className="
  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
  font-bold
  leading-tight sm:leading-snug md:leading-normal
">
  Responsive Heading
</h1>

// ✅ Body text (minimum 16px on mobile)
<p className="
  text-base sm:text-lg
  leading-relaxed
">
  Readable text across all devices
</p>

// ❌ Bad: Hard-coded pixel values
<h1 className="text-[80px]">Too large on mobile</h1>
<p className="text-[10px]">Too small to read</p>
```

### Spacing

```tsx
// ✅ Responsive padding and margin
<div className="
  p-4 sm:p-6 md:p-8 lg:p-12
  my-8 sm:my-12 md:my-16
">
  Content with appropriate spacing
</div>

// ✅ Responsive gaps
<div className="
  flex gap-2 sm:gap-4 md:gap-6 lg:gap-8
">
  Items with scaled spacing
</div>

// ❌ Bad: Fixed spacing that doesn't scale
<div className="p-12 gap-8">
  Too much spacing on mobile
</div>
```

### Layout

```tsx
// ✅ Stack on mobile, row on desktop
<div className="
  flex flex-col sm:flex-row
  items-stretch sm:items-center
  gap-4 sm:gap-6
">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅ Responsive grid
<div className="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  gap-4 sm:gap-6 md:gap-8
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// ❌ Bad: Fixed layout
<div className="flex flex-row gap-6">
  Breaks on mobile when items are wide
</div>
```

### Images

```tsx
// ✅ Responsive image sizing
<Image
  src={logo}
  alt="Base logo"
  width={200}
  height={50}
  className="
    w-24 h-auto sm:w-32 md:w-40 lg:w-48
  "
/>

// ✅ Full-width responsive image
<Image
  src={hero}
  alt="Hero image"
  width={1920}
  height={1080}
  className="w-full h-auto max-w-full"
/>

// ✅ Aspect ratio preservation
<div className="aspect-video w-full overflow-hidden rounded-lg">
  <Image
    src={thumbnail}
    alt="Video thumbnail"
    fill
    className="object-cover"
  />
</div>

// ❌ Bad: Fixed size
<Image src={logo} alt="Logo" className="w-48 h-12" />
```

### Buttons and Touch Targets

```tsx
// ✅ Mobile-friendly touch targets (min 44x44px)
<button className="
  px-4 py-3 sm:px-6 sm:py-2
  min-h-[44px] sm:min-h-0
  text-base font-medium
  rounded-lg
  w-full sm:w-auto
">
  Mobile-friendly button
</button>

// ✅ Full-width on mobile, auto on desktop
<Link
  href="/docs"
  className="
    inline-flex items-center justify-center
    px-6 py-3
    min-h-[44px]
    w-full sm:w-auto
    text-center
  "
>
  Get Started
</Link>

// ❌ Bad: Too small on mobile
<button className="px-4 py-2">
  Touch target too small (< 44px)
</button>
```

### Navigation

```tsx
// ✅ Mobile menu (hamburger) + desktop menu
<nav>
  {/* Mobile menu button */}
  <button
    className="sm:hidden"
    aria-label="Open menu"
  >
    <Icon name="menu" />
  </button>

  {/* Desktop navigation */}
  <div className="hidden sm:flex gap-6">
    {links.map(link => (
      <Link key={link.href} href={link.href}>
        {link.name}
      </Link>
    ))}
  </div>
</nav>

// ✅ Responsive dropdown
<div className="
  absolute left-1/2 top-full
  w-[95vw] max-w-[718px]
  transform -translate-x-1/2
">
  Dropdown content that doesn't cause horizontal scroll
</div>

// ❌ Bad: Fixed width dropdown
<div className="absolute left-1/2 top-full w-[718px]">
  Causes horizontal scroll on small screens
</div>
```

### Modals and Dialogs

```tsx
// ✅ Responsive modal using Radix UI
<Dialog.Root>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="
      fixed left-1/2 top-1/2
      -translate-x-1/2 -translate-y-1/2
      w-[90vw] max-w-md sm:max-w-lg
      max-h-[85vh]
      overflow-y-auto
      rounded-lg
      p-6 sm:p-8
    ">
      <Dialog.Title className="text-xl sm:text-2xl">
        Modal Title
      </Dialog.Title>
      <Dialog.Description className="text-sm sm:text-base">
        Modal content
      </Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### Cards

```tsx
// ✅ Responsive card
<div className="
  rounded-lg
  p-4 sm:p-6
  w-full
  max-w-sm sm:max-w-md
">
  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
    Card Title
  </h3>
  <p className="text-sm sm:text-base text-gray-600">
    Card description
  </p>
</div>
```

---

## Common Pitfalls

### 1. Fixed Width Elements

```tsx
// ❌ Bad: Fixed width causes overflow
<div className="w-[800px]">
  Content overflows on mobile
</div>

// ✅ Good: Responsive width with max-width
<div className="w-full max-w-[800px]">
  Fits on all screens
</div>
```

### 2. Hard-Coded Font Sizes

```tsx
// ❌ Bad: Hard-coded pixel values
<h1 className="text-[80px]">Huge on mobile</h1>
<p className="text-[10px]">Unreadable</p>

// ✅ Good: Tailwind responsive utilities
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
  Scales appropriately
</h1>
<p className="text-base sm:text-lg">
  Always readable (min 16px)
</p>
```

### 3. Excessive Padding on Mobile

```tsx
// ❌ Bad: Too much spacing on mobile
<div className="p-24 my-32">
  Wastes limited mobile screen space
</div>

// ✅ Good: Scaled spacing
<div className="p-4 sm:p-8 md:p-12 lg:p-24 my-8 sm:my-16 md:my-24 lg:my-32">
  Appropriate for each screen size
</div>
```

### 4. Non-Responsive Images

```tsx
// ❌ Bad: Fixed image size
<Image src={logo} alt="Logo" width={200} height={50} />

// ✅ Good: Responsive image
<Image
  src={logo}
  alt="Logo"
  width={200}
  height={50}
  className="w-24 h-auto sm:w-32 md:w-40"
/>
```

### 5. Touch Targets Too Small

```tsx
// ❌ Bad: Below 44x44px minimum
<button className="px-2 py-1 text-xs">
  Tap
</button>

// ✅ Good: Meets WCAG 2.5.8
<button className="px-4 py-3 min-h-[44px] text-base">
  Tap
</button>
```

### 6. Missing Horizontal Overflow Prevention

```tsx
// ❌ Bad: Can cause horizontal scroll
<div className="flex gap-4">
  <div className="min-w-[300px]">Item</div>
  <div className="min-w-[300px]">Item</div>
  <div className="min-w-[300px]">Item</div>
</div>

// ✅ Good: Prevents overflow
<div className="flex gap-4 overflow-x-auto max-w-full">
  <div className="min-w-[300px] flex-shrink-0">Item</div>
  <div className="min-w-[300px] flex-shrink-0">Item</div>
  <div className="min-w-[300px] flex-shrink-0">Item</div>
</div>

// ✅ Better: Stack on mobile
<div className="flex flex-col sm:flex-row gap-4">
  <div className="w-full sm:w-auto">Item</div>
  <div className="w-full sm:w-auto">Item</div>
  <div className="w-full sm:w-auto">Item</div>
</div>
```

### 7. Absolute Positioning Without Responsive Adjustments

```tsx
// ❌ Bad: Breaks on mobile
<div className="absolute left-1/2 top-full w-[600px]">
  Dropdown
</div>

// ✅ Good: Responsive positioning
<div className="
  absolute left-0 sm:left-1/2 top-full
  w-full sm:w-auto sm:min-w-[600px] sm:max-w-[600px]
  sm:-translate-x-1/2
">
  Dropdown
</div>
```

---

## Testing

### Manual Testing Checklist

#### Device Testing
- [ ] Test on iPhone SE (375px) - smallest modern phone
- [ ] Test on iPhone 14 Pro (393px)
- [ ] Test on iPad (768px)
- [ ] Test on iPad Pro landscape (1024px)
- [ ] Test on Desktop (1440px)
- [ ] Test on 4K (2560px)

#### Specific Checks
- [ ] No horizontal scroll at any breakpoint
- [ ] All text readable (min 16px on mobile)
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Images don't overflow containers
- [ ] Proper spacing at all sizes
- [ ] Navigation works on all devices
- [ ] Dropdowns don't cause scroll
- [ ] Modals fit on small screens
- [ ] Forms are usable on mobile

#### Browser DevTools
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test different devices from dropdown
4. Test custom viewport sizes
5. Test landscape and portrait orientations

### Automated Testing

#### Playwright Tests

Run responsive design tests:

```bash
# Run all responsive tests
yarn test:e2e responsive.spec.ts

# Run with UI mode
yarn test:e2e:ui responsive.spec.ts

# Run specific viewport test
yarn test:e2e responsive.spec.ts -g "iPhone SE"
```

#### Visual Regression Tests

```bash
# Take screenshots at different viewports
yarn test:e2e --update-snapshots

# Compare against baseline
yarn test:e2e
```

### Browser Testing

Test in multiple browsers:
- Chrome (primary)
- Safari (iOS behavior)
- Firefox
- Edge

---

## Tools and Resources

### Development Tools

1. **Chrome DevTools**
   - Device emulation
   - Responsive design mode
   - Network throttling

2. **Browser Extensions**
   - Responsive Viewer
   - Viewport Resizer
   - Polypane (paid)

3. **Testing Tools**
   - Playwright (already configured)
   - BrowserStack (cross-browser testing)
   - Percy (visual regression)

### Design Tokens

```typescript
// Tailwind config breakpoints
const screens = {
  sm: '768px',
  md: '1024px',
  lg: '1440px',
  xl: '1920px',
  '2xl': '2560px',
};

// Common spacing scale
const spacing = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
};
```

### Useful Tailwind Classes

```tsx
// Visibility
hidden sm:block              // Show on tablet+
block sm:hidden              // Show only on mobile

// Layout
flex-col sm:flex-row         // Stack on mobile
grid-cols-1 sm:grid-cols-2   // Responsive grid

// Sizing
w-full sm:w-auto             // Full width on mobile
h-screen sm:h-auto           // Full height on mobile

// Text
text-base sm:text-lg         // Responsive font size
leading-snug sm:leading-relaxed  // Responsive line height

// Spacing
p-4 sm:p-6 md:p-8            // Responsive padding
gap-2 sm:gap-4 md:gap-6      // Responsive gap
```

### Documentation

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [CSS Tricks: Responsive Design](https://css-tricks.com/responsive-web-design/)
- [A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

### Internal Resources

- [RESPONSIVE_ISSUES.md](./RESPONSIVE_ISSUES.md) - Current audit
- [A11Y_GUIDELINES.md](./A11Y_GUIDELINES.md) - Accessibility guidelines
- [Accessibility Summary](./ACCESSIBILITY_SUMMARY.md) - Previous work

---

## Checklist for Pull Requests

Before submitting a PR, verify:

- [ ] Tested on mobile (375px minimum)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1440px)
- [ ] No horizontal scroll at any viewport
- [ ] All text is readable (min 16px on mobile)
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Images scale appropriately
- [ ] Spacing looks good at all sizes
- [ ] Navigation works on all devices
- [ ] No automated test failures
- [ ] Follows mobile-first approach
- [ ] Uses Tailwind responsive utilities (not custom CSS)

---

## Advanced Patterns

### Fluid Typography with clamp()

```css
/* For special cases where Tailwind isn't enough */
.fluid-heading {
  font-size: clamp(1.5rem, 3vw + 1rem, 3rem);
  /* Min: 24px, Preferred: 3vw + 16px, Max: 48px */
}
```

### Container Queries (Future)

```tsx
// When container queries are stable
<div className="@container">
  <div className="@sm:flex @md:grid">
    Content that responds to container size
  </div>
</div>
```

### Responsive Utilities Helper

```typescript
// Helper for consistent responsive values
export const responsive = {
  padding: 'p-4 sm:p-6 md:p-8 lg:p-12',
  gap: 'gap-2 sm:gap-4 md:gap-6',
  text: {
    heading: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    body: 'text-base sm:text-lg',
    small: 'text-sm sm:text-base',
  },
};

// Usage
<div className={responsive.padding}>
  <h1 className={responsive.text.heading}>Title</h1>
</div>
```

---

**Last Updated**: 2026-01-04
**Maintained by**: Development Team
**Questions**: Refer to RESPONSIVE_ISSUES.md for specific fixes
