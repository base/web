import { expect, Page, Locator } from '@playwright/test';
import {
  BaseActionType,
  ActionApprovalType,
  CoinbaseWallet,
  MetaMask,
} from '@coinbase/onchaintestkit';
import {
  validateBasename,
  navigateToBasenameRegistration,
  searchForBasename,
  selectBasenameFromResults,
  SELECTORS,
} from './basenameHelpers';

// Helper function to find a reliable connect button, preferring uniqueness.
function getConnectButton(page: Page): Locator {
    return page.getByTestId('ockConnectButton').first();
}

/**
 * Connects MetaMask wallet to the app and accepts Terms of Service.
 * This represents the standard onboarding flow for first-time users.
 *
 * @param page - The Playwright page object.
 * @param metamask - The MetaMask wallet instance.
 */
export async function connectWallet(page: Page, metamask: MetaMask): Promise<void> {
  // Navigate to the names path if not already there, assuming wallet connection is only supported here.
  if (!page.url().includes('/names')) {
    await page.goto('/names');
  }

  // Check and acknowledge any new privacy policy/TOS modal if visible.
  const newPrivacyPolicyButton = page.getByText('I Acknowledge');
  if (await newPrivacyPolicyButton.isVisible()) {
    await newPrivacyPolicyButton.click();
  }

  // Open wallet connect modal. Use a reliable selector, falling back to .first().
  await getConnectButton(page).click();

  // Select MetaMask from wallet options.
  const modalOverlay = page.getByTestId('ockModalOverlay').first();
  await modalOverlay.getByRole('button', { name: 'MetaMask' }).click();

  // Handle MetaMask connection request.
  await metamask.handleAction(BaseActionType.CONNECT_TO_DAPP);
}

/**
 * Connects Coinbase wallet to the app.
 * This represents the standard onboarding flow for first-time users.
 *
 * @param page - The Playwright page object.
 * @param coinbase - The Coinbase wallet instance.
 */
export async function connectCoinbaseWallet(page: Page, coinbase: CoinbaseWallet): Promise<void> {
  // Open wallet connect modal.
  await getConnectButton(page).click();

  // Select Coinbase Wallet from wallet options.
  const modalOverlay = page.getByTestId('ockModalOverlay').first();
  await modalOverlay.getByRole('button', { name: 'Coinbase Wallet' }).click();

  // Handle Coinbase wallet connection request.
  await coinbase.handleAction(BaseActionType.CONNECT_TO_DAPP);
}

/**
 * Handles a MetaMask transaction approval.
 *
 * @param metamask - The MetaMask wallet instance.
 * @param approvalType - The type of approval (default: APPROVE).
 */
export async function handleTransaction(
  metamask: MetaMask,
  approvalType: ActionApprovalType = ActionApprovalType.APPROVE,
): Promise<void> {
  await metamask.handleAction(BaseActionType.HANDLE_TRANSACTION, { approvalType });
}

/**
 * Switches to Base network if not already connected.
 * This function avoids fixed delays, preferring state-based waiting.
 *
 * @param page - The Playwright page object.
 * @returns true if network switch was needed, false otherwise.
 */
export async function switchToBaseNetworkIfNeeded(page: Page): Promise<boolean> {
  // Wait for the application state to settle after wallet connection.
  await page.waitForLoadState('networkidle');
  
  // Prefer the explicit "Connect to Base" button if present.
  const explicitSelector = page.locator('button:has-text("Connect to Base")');

  const hasExplicit = await explicitSelector.isVisible().catch(() => false);

  if (hasExplicit) {
    await explicitSelector.click();
    
    // Wait for the DOM element indicating the network change is complete (e.g., the button disappearing or a success message appearing).
    // Using networkidle as a fallback for the post-click state change.
    await page.waitForLoadState('networkidle'); 
    
    return true;
  }

  return false;
}

/**
 * Gets the main page from a context, excluding extension pages (like MetaMask/Coinbase).
 *
 * @param page - The Playwright page object.
 * @returns The main application page.
 */
export async function getMainPage(page: Page): Promise<Page> {
  const pages = page.context().pages();
  
  // Filter out extension URLs to find the DApp page.
  const mainPage = pages.find((p) => !p.url().startsWith('chrome-extension://')) || page;
  
  await mainPage.bringToFront();
  await mainPage.waitForLoadState('networkidle');
  return mainPage;
}

/**
 * Performs the common steps for basename registration tests:
 * 1. Validates Metamask fixture.
 * 2. Navigates to the app and waits for network idle.
 * 3. Connects the wallet and switches to the Base network if needed.
 * 4. Navigates to the basename registration flow and selects the desired basename.
 *
 * @param page - Playwright page.
 * @param metamask - MetaMask wallet fixture.
 * @returns An object containing the mainPage after setup and the basename used.
 */
export async function prepareBasenameFlow(
  page: Page,
  metamask: MetaMask,
): Promise<{ mainPage: Page; basename: string }> {
  if (!metamask) {
    // Ensuring the fixture is available before starting.
    throw new Error('MetaMask wallet instance is required but not defined.');
  }

  const basename = validateBasename(process.env.TEST_BASENAME);

  // Navigate to application root and wait for initial load.
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Connect wallet and ensure we are on the correct network.
  await connectWallet(page, metamask);
  const mainPage = await getMainPage(page);
  await switchToBaseNetworkIfNeeded(mainPage);

  // Wait until the app is fully stable after all initialization steps.
  await mainPage.waitForLoadState('networkidle');

  // Ensure wallet address is visible, confirming successful connection.
  await expect(mainPage.getByText(SELECTORS.WALLET_ADDRESS)).toBeVisible();

  // Begin registration flow by navigating, searching, and selecting the basename.
  await navigateToBasenameRegistration(mainPage);
  await searchForBasename(mainPage, basename);
  await selectBasenameFromResults(mainPage, basename);

  return { mainPage, basename };
}
