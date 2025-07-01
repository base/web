import { test } from '../testFixture';
import { expect } from '@playwright/test';
import { prepareBasenameFlow, handleTransaction } from '../appSession';
import { initiateRegistration } from '../basenameHelpers';
import { ActionApprovalType } from '@coinbase/onchaintestkit';

test.describe('Basename Registration', () => {
  test('should fail registration when wallet has insufficient funds', async ({
    page,
    metamask,
    node,
  }) => {
    // Validate prerequisites
    if (!metamask) {
      throw new Error('MetaMask is not defined');
    }

    if (!node) {
      throw new Error('Node fixture is not defined');
    }

    // Common preparation steps (wallet needs funds to connect)
    const { mainPage } = await prepareBasenameFlow(page, metamask);

    // Get the first default wallet address from Anvil (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
    const walletAddress = (await node.getAccounts())[0];
    console.log('[test] Using default Anvil wallet address:', walletAddress);

    // NOW set wallet balance to 0 after connection is established
    await node.setBalance(walletAddress, 0n);
    console.log('[test] Set wallet balance to 0');

    // Attempt registration with no funds
    await initiateRegistration(mainPage);
    await page.waitForLoadState('networkidle');

    // Approve the transaction (it should fail due to insufficient funds)
    await handleTransaction(metamask, ActionApprovalType.APPROVE);
    await page.waitForLoadState('networkidle');

    // Look for failure message
    await expect(page.getByText(/failed|rejected|insufficient/i)).toBeVisible({ timeout: 30000 });
  });
});
