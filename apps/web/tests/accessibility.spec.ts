import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility End-to-End Tests
 *
 * These tests run automated accessibility checks using axe-core
 * against the live application.
 */

test.describe('Homepage Accessibility', () => {
  test('should not have automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have skip links that are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');

    // Check if skip link is visible when focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    // Press Enter to skip to main content
    await page.keyboard.press('Enter');

    // Verify focus moved to main content
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Get all headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check no heading levels are skipped
    const levels: number[] = [];
    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName);
      const level = parseInt(tagName.charAt(1));
      levels.push(level);
    }

    // Verify no skipped levels (e.g., h1 -> h3 without h2)
    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });
});

test.describe('Keyboard Navigation', () => {
  test('should be fully keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through the page
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).toBeTruthy();
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus-visible');

    // Check if focus indicator is visible
    await expect(focusedElement).toHaveCSS('outline-style', /solid|auto/);
    await expect(focusedElement).toHaveCSS('outline-width', /2px|3px/);
  });

  test('should trap focus in modal dialogs', async ({ page }) => {
    await page.goto('/');

    // Find and open a modal (adjust selector based on your modals)
    const modalTrigger = page.locator('[role="button"]').first();
    if (await modalTrigger.count() > 0) {
      await modalTrigger.click();

      // Check if modal is open and has focus
      const modal = page.locator('[role="dialog"]');
      if (await modal.count() > 0) {
        // Tab through modal elements
        await page.keyboard.press('Tab');
        const focusedInModal = await page.evaluate(() => {
          const modal = document.querySelector('[role="dialog"]');
          return modal?.contains(document.activeElement);
        });

        expect(focusedInModal).toBe(true);

        // Press Escape to close
        await page.keyboard.press('Escape');
        await expect(modal).not.toBeVisible();
      }
    }
  });
});

test.describe('Button Accessibility', () => {
  test('should have accessible loading states', async ({ page }) => {
    await page.goto('/');

    // Find a button with loading state (if any)
    const loadingButton = page.locator('button[aria-busy="true"]');
    if (await loadingButton.count() > 0) {
      expect(await loadingButton.getAttribute('aria-busy')).toBe('true');
      expect(await loadingButton.getAttribute('aria-disabled')).toBe('true');

      // Check for loading status message
      const status = loadingButton.locator('[role="status"]');
      await expect(status).toBeAttached();
    }
  });

  test('should announce state changes to screen readers', async ({ page }) => {
    await page.goto('/');

    // Look for live regions
    const liveRegions = page.locator('[aria-live]');
    const count = await liveRegions.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const region = liveRegions.nth(i);
        const ariaLive = await region.getAttribute('aria-live');
        expect(['polite', 'assertive']).toContain(ariaLive);
      }
    }
  });
});

test.describe('Form Accessibility', () => {
  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');

    // Get all inputs
    const inputs = await page.locator('input:not([type="hidden"])').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');

      // Check if input has a label
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;
        const hasAriaLabel = ariaLabel !== null || ariaLabelledby !== null;

        expect(hasLabel || hasAriaLabel).toBe(true);
      }
    }
  });
});

test.describe('Color Contrast', () => {
  test('should meet WCAG AA contrast requirements', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter((v) =>
      v.id.includes('color-contrast'),
    );

    expect(contrastViolations).toEqual([]);
  });
});

test.describe('Images and Media', () => {
  test('should have alt text for all images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');

      // Image should either have alt text or be aria-hidden
      expect(alt !== null || ariaHidden === 'true').toBe(true);
    }
  });
});

test.describe('Responsive Design', () => {
  test('should support 200% text zoom', async ({ page }) => {
    await page.goto('/');

    // Simulate 200% zoom
    await page.setViewportSize({ width: 640, height: 480 });
    await page.evaluate(() => {
      document.body.style.zoom = '2';
    });

    // Check for accessibility violations at 200% zoom
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be accessible on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Motion Preferences', () => {
  test('should respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Check if animations are reduced
    const animated = await page.locator('[class*="animate"]').first();
    if (await animated.count() > 0) {
      const animationDuration = await animated.evaluate((el) =>
        window.getComputedStyle(el).animationDuration,
      );

      // Animation should be very short or none
      expect(parseFloat(animationDuration)).toBeLessThan(0.1);
    }
  });
});
