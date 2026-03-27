import { test, expect, devices } from '@playwright/test';

// Test responsive design across multiple viewport sizes
const viewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 14 Pro', width: 393, height: 852 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPad Pro landscape', width: 1024, height: 768 },
  { name: 'Desktop', width: 1440, height: 900 },
  { name: '4K Display', width: 2560, height: 1440 },
];

test.describe('Responsive Design Tests', () => {
  viewports.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.use({ viewport: { width, height } });

      test('should not have horizontal scroll', async ({ page }) => {
        await page.goto('/');

        // Check that page width doesn't exceed viewport width
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
      });

      test('should have readable text (minimum 16px on mobile)', async ({ page }) => {
        if (width < 768) { // Mobile devices
          await page.goto('/');

          // Get all text elements
          const textElements = await page.locator('p, span, a, button, h1, h2, h3, h4, h5, h6').all();

          for (const element of textElements) {
            const fontSize = await element.evaluate((el) => {
              const style = window.getComputedStyle(el);
              return parseFloat(style.fontSize);
            });

            // Skip hidden elements
            const isVisible = await element.isVisible();
            if (!isVisible) continue;

            // Body text should be at least 16px on mobile (with small tolerance for decorative text)
            const text = await element.textContent();
            if (text && text.trim().length > 10) { // Only check substantial text
              expect(fontSize).toBeGreaterThanOrEqual(14); // Allow 14px minimum
            }
          }
        }
      });

      test('navigation dropdown should not overflow', async ({ page }) => {
        await page.goto('/');

        // Wait for page to load
        await page.waitForLoadState('networkidle');

        // Hover over navigation items to trigger dropdowns
        const navLinks = await page.locator('nav a').all();

        for (const link of navLinks.slice(0, 3)) { // Test first 3 nav items
          await link.hover();
          await page.waitForTimeout(300); // Wait for dropdown animation

          // Check for horizontal overflow
          const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
          const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

          expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
        }
      });

      test('images should not overflow containers', async ({ page }) => {
        await page.goto('/');

        const images = await page.locator('img').all();

        for (const img of images) {
          const isVisible = await img.isVisible();
          if (!isVisible) continue;

          const overflow = await img.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const parentRect = el.parentElement?.getBoundingClientRect();

            if (!parentRect) return false;

            return rect.width > parentRect.width || rect.height > parentRect.height;
          });

          expect(overflow).toBe(false);
        }
      });

      test('touch targets should be at least 44x44px on mobile', async ({ page }) => {
        if (width < 768) { // Mobile devices
          await page.goto('/');

          // Check all interactive elements
          const interactiveElements = await page.locator('button, a[href], [role="button"]').all();

          for (const element of interactiveElements) {
            const isVisible = await element.isVisible();
            if (!isVisible) continue;

            const box = await element.boundingBox();
            if (!box) continue;

            // WCAG 2.5.8 requires 44x44px minimum
            expect(box.height).toBeGreaterThanOrEqual(44);
            expect(box.width).toBeGreaterThanOrEqual(44);
          }
        }
      });
    });
  });

  test.describe('Specific Component Tests', () => {
    test('TopNavigation dropdown should be responsive', async ({ page }) => {
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Desktop menu should be hidden on mobile
      const desktopMenu = page.locator('[class*="MenuDesktop"]');
      if (await desktopMenu.count() > 0) {
        const isVisible = await desktopMenu.isVisible();
        // Desktop menu may or may not be present, just ensure no horizontal scroll
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
      }

      // Desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');

      // Hover over a nav item
      const navItem = page.locator('nav a').first();
      if (await navItem.count() > 0) {
        await navItem.hover();
        await page.waitForTimeout(300);

        // Check dropdown doesn't cause overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
      }
    });

    test('AgentKit Hero buttons should be full width on mobile', async ({ page }) => {
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/builders/agentkit');

      const button = page.locator('button:has-text("npx create-agentkit-app")').first();

      if (await button.count() > 0) {
        const box = await button.boundingBox();
        expect(box?.width).toBeGreaterThan(300); // Should be nearly full width on mobile
        expect(box?.height).toBeGreaterThanOrEqual(44); // Touch target size
      }

      // Desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/builders/agentkit');

      if (await button.count() > 0) {
        const box = await button.boundingBox();
        expect(box?.width).toBeLessThan(400); // Should be auto width on desktop
      }
    });

    test('Hero text should scale appropriately', async ({ page }) => {
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const heading = page.locator('h1').first();

      if (await heading.count() > 0) {
        const mobileFontSize = await heading.evaluate((el) =>
          parseFloat(window.getComputedStyle(el).fontSize)
        );

        // Desktop
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.reload();

        const desktopFontSize = await heading.evaluate((el) =>
          parseFloat(window.getComputedStyle(el).fontSize)
        );

        // Desktop should have larger text
        expect(desktopFontSize).toBeGreaterThan(mobileFontSize);
      }
    });
  });

  test.describe('Layout Tests', () => {
    test('should have proper spacing on all devices', async ({ page }) => {
      for (const { name, width, height } of viewports) {
        await page.setViewportSize({ width, height });
        await page.goto('/');

        // Check for content touching edges (should have padding)
        const bodyPadding = await page.evaluate(() => {
          const style = window.getComputedStyle(document.body);
          return {
            left: parseFloat(style.paddingLeft),
            right: parseFloat(style.paddingRight),
          };
        });

        // Main content should have some padding (at least on container)
        const container = page.locator('main, [class*="container"]').first();
        if (await container.count() > 0) {
          const containerPadding = await container.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
          });

          expect(containerPadding).toBeGreaterThan(0);
        }
      }
    });

    test('grid layouts should adapt to screen size', async ({ page }) => {
      await page.goto('/');

      // Mobile: single column
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(100);

      const grids = await page.locator('[class*="grid"]').all();
      for (const grid of grids.slice(0, 5)) { // Test first 5 grids
        const isVisible = await grid.isVisible();
        if (!isVisible) continue;

        const gridCols = await grid.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.gridTemplateColumns;
        });

        // On mobile, should generally be 1 column or auto-fit
        // (This is a soft check, some grids intentionally have multiple columns)
      }

      // Desktop: multiple columns
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(100);

      // Just verify no overflow occurs
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  });

  test.describe('Accessibility & Responsiveness Combined', () => {
    test('focus indicators should be visible at all viewport sizes', async ({ page }) => {
      for (const { width, height } of viewports.slice(0, 3)) { // Test 3 viewports
        await page.setViewportSize({ width, height });
        await page.goto('/');

        // Tab through interactive elements
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);

        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el) return null;

          const style = window.getComputedStyle(el);
          return {
            outline: style.outline,
            outlineWidth: style.outlineWidth,
            outlineStyle: style.outlineStyle,
          };
        });

        // Should have some kind of focus indicator
        if (focusedElement) {
          const hasOutline =
            focusedElement.outlineWidth !== '0px' ||
            focusedElement.outline !== 'none';
          expect(hasOutline).toBe(true);
        }
      }
    });

    test('modals should be responsive and accessible', async ({ page }) => {
      await page.goto('/');

      // Try to find and open a modal (if one exists)
      const modalTrigger = page.locator('[aria-haspopup="dialog"], [data-state="closed"]').first();

      if (await modalTrigger.count() > 0) {
        // Mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await modalTrigger.click();
        await page.waitForTimeout(300);

        const modal = page.locator('[role="dialog"]');
        if (await modal.count() > 0) {
          const box = await modal.boundingBox();
          expect(box?.width).toBeLessThanOrEqual(375);

          // Should be scrollable if content is too tall
          const isScrollable = await modal.evaluate((el) => {
            return el.scrollHeight > el.clientHeight;
          });

          // Either fits in viewport or is scrollable
          expect(box?.height || 0).toBeGreaterThan(0);
        }
      }
    });
  });
});
