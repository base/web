import { test } from '../testFixture';
import { expect } from '@playwright/test';
import { prepareBasenameFlow, handleTransaction } from '../appSession';
import { initiateRegistration } from '../basenameHelpers';
import { ActionApprovalType } from '@coinbase/onchaintestkit';

test.describe('Basename Registration', () => {
  test.skip('should fail registration when wallet has insufficient funds', async ({
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

    // Add a small delay to ensure everything is stable
    console.log('[test] Waiting for network to stabilize...');
    await mainPage.waitForTimeout(2000);

    // Get the first default wallet address from Anvil (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
    let walletAddress;
    try {
      const accounts = await node.getAccounts();
      walletAddress = accounts[0];
      console.log('[test] Using default Anvil wallet address:', walletAddress);
    } catch (error) {
      console.error('[test] Failed to get accounts:', error);
      throw error;
    }

    // Set wallet balance to a tiny amount - enough for RPC calls but not for registration
    // Registration costs around 0.002 ETH, so 0.0001 ETH should be insufficient
    const insufficientBalance = BigInt('100000000000000'); // 0.0001 ETH in wei

    try {
      console.log('[test] About to set balance...');
      await node.setBalance(walletAddress, insufficientBalance);
      console.log('[test] Set wallet balance to 0.0001 ETH (insufficient for registration)');
    } catch (error) {
      console.error('[test] Failed to set balance:', error);
      throw error;
    }

    // Another small delay after balance change
    await mainPage.waitForTimeout(2000);

    // Attempt registration with no funds
    try {
      await initiateRegistration(mainPage);
      await page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('[test] Failed to initiate registration:', error);
      throw error;
    }

    // Approve the transaction (it should fail due to insufficient funds)
    try {
      await handleTransaction(metamask, ActionApprovalType.APPROVE);
      await page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('[test] Failed to handle transaction:', error);
      throw error;
    }

    // Look for failure message
    await expect(page.getByText(/failed|rejected|insufficient/i)).toBeVisible({ timeout: 30000 });
  });
});
