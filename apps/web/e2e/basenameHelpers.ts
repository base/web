import { Page, expect } from '@playwright/test';
import { createWalletClient, http, type WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains';


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

  await page.waitForTimeout(2000);
  const searchInput = page.locator(SELECTORS.SEARCH_INPUT).first();
  await expect(searchInput).toBeVisible();
  await searchInput.clear();
  await searchInput.fill(basename);
  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2000);

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





export const account = privateKeyToAccount(process.env.TEST_PRIVATE_KEY as `0x${string}`);


export const walletClient: WalletClient = createWalletClient({
  chain: baseSepolia,
  transport: http("http://localhost:8545/"),
  // transport: http(process.env.E2E_TEST_FORK_URL),

})

/**
 * Send ETH from the test account to the target address
 * @param to The recipient address (e.g., your smart wallet)
 * @param value The amount to send in wei (as bigint)
 * @param rpcUrl The RPC URL to use (optional, defaults to localhost:8545)
 * @returns The transaction hash
 */
export async function fundAccount(to: `0x${string}`, value: bigint, rpcUrl?: string) {
  const client = createWalletClient({
    chain: baseSepolia,
    transport: http(rpcUrl || "http://localhost:8545/"),
  })
  
  return client.sendTransaction({
    account,
    to,
    value,
    chain: baseSepolia,
  })
} 

/**
 * Check the balance of an address
 * @param address The address to check
 * @param rpcUrl The RPC URL to use
 * @returns The balance in wei as bigint
 */
export async function getBalance(address: `0x${string}`, rpcUrl?: string): Promise<bigint> {
  const { createPublicClient } = await import('viem');
  
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(rpcUrl || "http://localhost:8545/"),
  });
  
  return client.getBalance({ address });
} 

