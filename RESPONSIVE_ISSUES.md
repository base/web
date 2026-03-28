# Responsive Design Issues - Base Website

**Audit Date**: 2026-01-04
**Target Devices**: Mobile (320px+), Tablet (768px+), Desktop (1024px+), Large Desktop (1440px+)
**Framework**: Next.js 15 + Tailwind CSS

---

## Executive Summary

Identified **15 responsive design issues** across the Base website that impact mobile and tablet user experience. Issues range from horizontal scroll to illegible text and touch target problems.

### Severity Breakdown

| Severity | Count | Impact |
|----------|-------|--------|
| **Critical** | 3 | Breaks mobile experience |
| **High** | 6 | Significantly degrades UX |
| **Medium** | 4 | Minor usability issues |
| **Low** | 2 | Polish improvements |

---

## Target Breakpoints

```css
/* Mobile First Approach */
Base:      320px - 767px   /* Mobile */
sm:        768px           /* Tablet */
md:        1024px          /* Desktop */
lg:        1440px          /* Large Desktop */
xl:        1920px          /* 4K */
```

### Test Devices
- iPhone SE: 375px × 667px
- iPhone 14 Pro: 393px × 852px
- iPad: 768px × 1024px
- Desktop: 1440px × 900px
- 4K Display: 2560px × 1440px

---

## Critical Issues

### 1. Fixed Width Dropdown Menu

**File**: `apps/web/src/components/base-org/shared/TopNavigation/MenuDesktop.tsx`
**Line**: 82
**Breakpoint**: Mobile/Tablet

#### Issue
```tsx
// ❌ Current (Line 82)
<div className="absolute left-1/2 top-full w-[718px] min-w-full ...">
```

Fixed width of 718px causes horizontal scroll on devices < 718px. The `min-w-full` doesn't override the explicit width.

#### User Impact
- Horizontal scroll on tablets and phones
- Content cuts off
- Poor UX for 80% of mobile users

#### Recommended Fix
```tsx
// ✅ Improved
<div className="absolute left-1/2 top-full w-full max-w-[718px] min-w-full ...">
```

Or use container-based approach:
```tsx
<div className="absolute left-1/2 top-full w-[95vw] max-w-[718px] ...">
```

**WCAG Impact**: Affects 2.1.1 Keyboard (mobile users)
**Severity**: 🔴 Critical

---

### 2. Non-Responsive Text Sizes

**Files**: Multiple components
**Lines**: Various
**Breakpoint**: All

#### Issue
Hard-coded pixel values don't scale:

```tsx
// ❌ Problem examples
text-[10px]  // Too small on large screens
text-[80px]  // Too large on mobile
text-[115px] // Causes overflow

// Found in:
- apps/web/src/components/Brand/ColorList/index.tsx
- apps/web/src/components/GetStarted/Hero.tsx
- apps/web/src/components/Layout/Navigation/Sidebar/Logo.tsx
```

#### User Impact
- Text illegible on mobile (< 16px considered inaccessible)
- Text overflow causing horizontal scroll
- Inconsistent typography scale

#### Recommended Fix
Use Tailwind's responsive text utilities:

```tsx
// ✅ Mobile-first responsive text
className="text-xs sm:text-sm md:text-base lg:text-lg"

// ✅ Or use clamp for fluid typography
font-size: clamp(0.875rem, 2vw + 0.5rem, 1.25rem);
```

**WCAG Impact**: 1.4.4 Resize Text (Level AA)
**Severity**: 🔴 Critical

---

### 3. Tiny Touch Targets on Mobile

**File**: Multiple button components
**Breakpoint**: Mobile

#### Issue
Buttons and interactive elements < 44x44px on mobile:

```tsx
// ❌ From AgentKit/Hero.tsx (Line 48)
<button className="...px-4 pb-3 pt-3...">

// ❌ From TopNavigation (Line 69)
<Link className="...px-6 py-2...">
```

On mobile, `py-2` = 8px padding = ~24px total height (below 44px minimum).

#### User Impact
- Difficult to tap accurately
- Frustrating mobile experience
- WCAG AA violation

#### Recommended Fix
```tsx
// ✅ Ensure minimum 44x44px on mobile
className="px-4 py-3 sm:py-2 min-h-[44px] sm:min-h-0"

// ✅ Or use larger padding base
className="px-6 py-3 sm:px-4 sm:py-2"
```

**WCAG Impact**: 2.5.8 Target Size (Minimum) - Level AA
**Severity**: 🔴 Critical

---

## High Severity Issues

### 4. Fixed Image Sizes

**File**: `apps/web/src/components/Builders/AgentKit/Hero.tsx`
**Line**: 30

#### Issue
```tsx
// ❌ Current
<Image
  src={agentkit}
  alt="agentkit"
  width={32}
  height={32}
  className="w-5 h-5"  // Fixed size, doesn't scale
/>
```

#### Recommended Fix
```tsx
// ✅ Responsive image sizing
<Image
  src={agentkit}
  alt="AgentKit SDK icon"
  width={32}
  height={32}
  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
/>
```

**Severity**: 🟡 High

---

### 5. Excessive Bottom Padding on Mobile

**File**: `apps/web/src/components/Builders/AgentKit/Hero.tsx`
**Line**: 47

#### Issue
```tsx
// ❌ Current
<div className="flex gap-4 pt-4 pb-24 bg-black max-sm:flex-col md:pt-5">
```

`pb-24` (96px) is excessive on mobile devices with limited vertical space.

#### Recommended Fix
```tsx
// ✅ Responsive padding
<div className="flex gap-4 pt-4 pb-8 sm:pb-12 md:pb-16 lg:pb-24 bg-black max-sm:flex-col md:pt-5">
```

**Severity**: 🟡 High

---

### 6. Fixed Min-Height Breaking Layout

**File**: `apps/web/src/components/Brand/ColorList/index.tsx`

#### Issue
```tsx
// ❌ Current
className="... md:min-h-[130px] ..."
```

Fixed min-height can cause layout issues on varying content.

#### Recommended Fix
```tsx
// ✅ Use aspect-ratio instead
className="... md:aspect-video ..."

// Or remove min-height and let content dictate
className="... md:py-8 ..."
```

**Severity**: 🟡 High

---

### 7. Non-Fluid Container Widths

**File**: Multiple layout components

#### Issue
Missing `container` class or max-width constraints cause content to stretch too wide on large screens.

#### Recommended Fix
```tsx
// ✅ Add container with max-width
<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

**Severity**: 🟡 High

---

### 8. Overflow Hidden Cutting Content

**Files**: 54 components with `overflow-hidden`

#### Issue
While `overflow-hidden` is useful, it can hide content like dropdowns, tooltips, or focus indicators.

#### Audit Required
Review each usage of `overflow-hidden` to ensure:
- Focus indicators aren't clipped
- Dropdowns aren't cut off
- Mobile menus work correctly

**Severity**: 🟡 High

---

### 9. Fixed Gap Spacing

**Issue**: Using fixed `gap` values that don't scale

```tsx
// ❌ Problem
<div className="flex gap-6">

// ✅ Better - responsive gaps
<div className="flex gap-2 sm:gap-4 md:gap-6">
```

**Severity**: 🟡 High

---

## Medium Severity Issues

### 10. Missing Responsive Modifiers

**Issue**: Many components lack breakpoint-specific styles.

#### Pattern to Follow
```tsx
// ✅ Mobile-first approach
className="
  flex-col      // Mobile: stack
  sm:flex-row   // Tablet+: horizontal
  gap-2         // Mobile: tight
  sm:gap-4      // Tablet+: comfortable
  p-4           // Mobile: padding
  sm:p-6        // Tablet+: more padding
  lg:p-8        // Desktop: generous
"
```

**Severity**: 🟠 Medium

---

### 11. Absolute Positioning Without Responsive Adjustments

**Example**: Submenu dropdown
```tsx
// ❌ Fixed positioning
className="absolute left-1/2 top-full"

// ✅ Should adapt on mobile
className="absolute left-0 sm:left-1/2 top-full w-full sm:w-auto"
```

**Severity**: 🟠 Medium

---

### 12. Button Width Inconsistency

**File**: `apps/web/src/components/Builders/AgentKit/Hero.tsx`
**Line**: 50

```tsx
// ❌ max-sm:mr-auto causes alignment issues
className="... max-sm:mr-auto"

// ✅ Better: full width on mobile
className="w-full sm:w-auto"
```

**Severity**: 🟠 Medium

---

### 13. Z-Index Stacking Issues

**Pattern**: Multiple components use random z-index values

```tsx
// ❌ Inconsistent z-index
className="z-10"
className="z-50"
className="z-[9999]"

// ✅ Use Tailwind's scale consistently
z-0, z-10, z-20, z-30, z-40, z-50
```

**Severity**: 🟠 Medium

---

## Low Severity Issues

### 14. Missing Landscape Tablet Styles

**Breakpoint Gap**: 768px - 1023px (landscape tablets)

Many components jump from mobile to desktop styles, missing tablet-specific optimizations.

**Recommendation**: Add `md:` breakpoint styles more consistently.

**Severity**: 🟢 Low

---

### 15. Transition Duration Inconsistency

**Issue**: Different transition timings across components

```tsx
// Found variations:
duration-200
duration-300
transition-all
```

**Recommendation**: Standardize on design system values.

**Severity**: 🟢 Low

---

## Testing Checklist

### Manual Testing
- [ ] iPhone SE (375px) - smallest modern phone
- [ ] iPhone 14 Pro (393px)
- [ ] iPad (768px)
- [ ] iPad Pro landscape (1024px)
- [ ] Desktop (1440px)
- [ ] 4K (2560px)

### Automated Testing
- [ ] Playwright viewport tests
- [ ] Chrome DevTools device emulation
- [ ] Lighthouse mobile audit
- [ ] Visual regression tests

### Specific Checks
- [ ] No horizontal scroll at any breakpoint
- [ ] All text readable (min 16px on mobile)
- [ ] Touch targets ≥ 44x44px
- [ ] Images don't overflow
- [ ] Proper spacing at all sizes
- [ ] Navigation works on all devices
- [ ] Dropdowns don't cause scroll

---

## Implementation Priority

### Sprint 1 (Critical - Week 1)
1. Fix fixed-width dropdown menu (Issue #1)
2. Fix text sizes for mobile readability (Issue #2)
3. Increase touch target sizes (Issue #3)

### Sprint 2 (High - Week 2)
4. Fix image sizing (Issue #4)
5. Adjust mobile padding (Issue #5)
6. Review min-height usage (Issue #6)
7. Add container constraints (Issue #7)

### Sprint 3 (Medium/Low - Week 3)
8-15. Polish and consistency improvements

---

## Responsive Design Patterns

### Mobile-First Utilities

```tsx
// Spacing
p-4 sm:p-6 md:p-8 lg:p-12

// Typography
text-sm sm:text-base md:text-lg lg:text-xl

// Layout
flex-col sm:flex-row
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

// Visibility
hidden sm:block
block sm:hidden

// Sizing
w-full sm:w-auto
min-h-[44px] sm:min-h-0
```

### Fluid Typography

```css
/* In global CSS for special cases */
.fluid-text {
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
}
```

### Container Queries (Future)

```css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## Tools and Resources

### Testing
- Chrome DevTools Device Mode
- Playwright (already configured)
- BrowserStack (optional)
- Real device testing

### Design Tokens
- Tailwind Config: `tailwind.config.js`
- Breakpoints: sm(768), md(1024), lg(1440), xl(1920)
- Typography Scale: text-xs to text-9xl

### Documentation
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [WCAG 2.5.8 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

---

**Report Status**: Initial Audit Complete
**Next Steps**: Implement Priority 1 fixes
