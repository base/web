import { Page, expect } from '@playwright/test';

// Constants
export const BASENAME_REGEX = /^[a-z0-9]{3,}$/;

export const SELECTORS = {
  WALLET_ADDRESS: /^0x/,
  GET_BASENAME_BUTTON: 'Get a Basename',
  SEARCH_INPUT: 'input[placeholder*="Search for a name" i]',
  REGISTER_BUTTON: 'Register name',
  SUCCESS_MESSAGE: 'This name is yours!',
};

/**
 * Validates that a basename meets the requirements
 * @param basename - The basename to validate
 * @returns The validated basename
 * @throws Error if basename is invalid
 */
export function validateBasename(basename: string | undefined): string {
  if (!basename) {
    throw new Error('TEST_BASENAME environment variable is required');
  }

  if (!BASENAME_REGEX.test(basename)) {
    throw new Error(
      'TEST_BASENAME must be at least 3 characters long and contain only lowercase letters and numbers',
    );
  }

  return basename;
}

/**
 * Navigates to the basename registration page
 * @param page - The Playwright page object
 */
export async function navigateToBasenameRegistration(page: Page): Promise<void> {
  const getBasenameButton = page.getByRole('button', { name: SELECTORS.GET_BASENAME_BUTTON });
  await getBasenameButton.click();
  await page.waitForLoadState('networkidle');
}

/**
 * Searches for a specific basename
 * @param page - The Playwright page object
 * @param basename - The basename to search for
 */
export async function searchForBasename(page: Page, basename: string): Promise<void> {
  const searchInput = page.locator(SELECTORS.SEARCH_INPUT).first();
  await expect(searchInput).toBeVisible();
  await searchInput.clear();
  await searchInput.fill(basename);
  await page.waitForLoadState('networkidle');
}

/**
 * Selects a basename from the search results
 * @param page - The Playwright page object
 * @param basename - The basename to select
 */
export async function selectBasenameFromResults(page: Page, basename: string): Promise<void> {
  const resultButton = page
    .getByRole('button', { name: new RegExp(`${basename}\\.base\\.eth`, 'i') })
    .first();
  await expect(resultButton).toBeVisible({ timeout: 120000 });
  await resultButton.click();
}

/**
 * Initiates the registration process for a basename
 * @param page - The Playwright page object
 */
export async function initiateRegistration(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  const registerButton = page.getByRole('button', { name: SELECTORS.REGISTER_BUTTON });
  await expect(registerButton).toBeVisible();
  await page.waitForLoadState('networkidle');
  await registerButton.click();
}
