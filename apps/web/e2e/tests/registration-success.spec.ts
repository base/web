import { expect } from '@playwright/test';
import { test } from '../testFixture';
import { handleTransaction, prepareBasenameFlow } from '../appSession';
import { initiateRegistration, SELECTORS } from '../basenameHelpers';

// Main test
test.describe('Basename Registration', () => {

  test.skip('should successfully register a basename', async ({ page, metamask }) => {
    // Validate prerequisites
    if (!metamask) {
      throw new Error('MetaMask is not defined');
    }

    // Common preparation steps (connect wallet, switch network, navigate & select basename)
    const { mainPage } = await prepareBasenameFlow(page, metamask);


    await mainPage.waitForTimeout(2000);

    // Complete registration
    await initiateRegistration(mainPage);
    await page.waitForLoadState('networkidle');
    await handleTransaction(metamask);

    // Verify success
    await page.waitForLoadState('networkidle');

    await expect(page.getByText(SELECTORS.SUCCESS_MESSAGE)).toBeVisible();
  });
});
