import { createOnchainTest } from '@coinbase/onchaintestkit'
import { CoinbaseSpecificActionType, BaseActionType, ActionApprovalType } from '@coinbase/onchaintestkit'
import { coinbaseWalletConfig } from 'apps/web/e2e/walletConfig/coinbaseWalletConfig'
import { Page } from '@playwright/test';
import { getMainPage, switchToBaseNetworkIfNeeded } from '../appSession';
import {
  validateBasename,
  navigateToBasenameRegistration,
  searchForBasename,
  SELECTORS,
} from '../basenameHelpers';
import { expect } from '@playwright/test';
import { getBalance } from '../basenameHelpers';




// const test = createCoinbaseTestWithRpcInterception(coinbaseWalletConfig)
const test = createOnchainTest(coinbaseWalletConfig)

test.describe("basenames tests", () => {
    test.only("sandbox basenames", async ({ page, coinbase, node }: { page: Page; coinbase: any; node: any }) => {
      
      if (!coinbase) throw new Error("Coinbase is not defined")
      // Fund the smart wallet before running the test

      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000)
      // Get the RPC URL from the node fixture
      const rpcUrl = node?.rpcUrl || `http://localhost:${node?.port || 8545}`;
      console.log("RPC URL", rpcUrl)
      console.log("Node fixture debug:", {
        nodeExists: !!node,
        nodePort: node?.port,
        nodeKeys: node ? Object.keys(node) : 'no node'
      })

      // await fundAccount('0xdFdfe1b0F32e957F18EE4Fd411A88a19e89E7439', 1000000000000000000n, rpcUrl) // 1 ETH
      console.log('Funded account:', Number(await getBalance('0xdFdfe1b0F32e957F18EE4Fd411A88a19e89E7439', rpcUrl)) / 1e18, 'ETH')
        // 1. Click to open the first popup
      await page.getByTestId("ockConnectButton").click()
      const [firstPopup] = await Promise.all([
        page.context().waitForEvent("page"),
        await page.locator('button:has-text("Coinbase Wallet")').click(),
      ])
      
      await firstPopup.waitForLoadState("domcontentloaded")
      // Also inject logger into the first popup and forward its console
      // await firstPopup.addInitScript(injectLogger)
      // firstPopup.on('console', (msg) => { try { console.log('[POPUP-1]', msg.text()); } catch {} })

      
  
      // 2. Use handleAction to perform registration/sign-in
      await coinbase.handleAction(
        CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
        {
          mainPage: page,
          popup: firstPopup,
          passkeyAction: "signInWithCBExtension",
          passkeyConfig: {
            name: "",
            rpId: "keys.coinbase.com",
            rpName: "",
            userId: "",
          },
        },
      )
      
      
      
      
      
      const authenticator = coinbase.passkeyAuthenticator
        ? coinbase.passkeyAuthenticator
        : coinbase.authenticator
      if (!authenticator)
        throw new Error("Authenticator is null after registration")


      const mainPage = await getMainPage(page);
      // Skip network switching - wallet should already be on local fork
      await page.waitForTimeout(1000)
      await switchToBaseNetworkIfNeeded(mainPage); 

      const basename = validateBasename(process.env.TEST_BASENAME);
      console.log('[prepareBasenameFlow] Starting flow for basename:', basename);

      console.log('[prepareBasenameFlow] Checking wallet address visibility');

      await expect(mainPage.getByText(SELECTORS.WALLET_ADDRESS)).toBeVisible();
      console.log('[prepareBasenameFlow] Wallet address visible');
      // Begin registration flow
      await navigateToBasenameRegistration(mainPage);
      console.log('[prepareBasenameFlow] Navigated to basename registration');

      await page.getByText("Switch to Testnet").click();

      await searchForBasename(mainPage, basename);

      console.log('[prepareBasenameFlow] Searched for basename');
      // await selectBasenameFromResults(mainPage, basename);
      const resultButton = page
    .getByRole('button', { name: new RegExp(`${basename}\.basetest\.eth`, 'i') })
    .first();
  await expect(resultButton).toBeVisible({ timeout: 120000 });
  await resultButton.click();
      console.log('[prepareBasenameFlow] Selected basename from results');
    
      await page.waitForLoadState('networkidle');
      const registerButton = page.getByRole('button', { name: SELECTORS.REGISTER_BUTTON });
      await expect(registerButton).toBeVisible();
      await page.waitForLoadState('networkidle');
 
      const [popup] = await Promise.all([
        page.context().waitForEvent("page"),
        registerButton.click(),
      ])
      await page.pause()

      // Approve the transaction in the popup
      await coinbase.handleAction(
        CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
        {
          popup: popup,
          passkeyAction: "approve",
          passkeyConfig: {
            name: "",
            rpId: "keys.coinbase.com",
            rpName: "",
            userId: "",
          },
        },
      )
      await page.waitForLoadState('networkidle');
      await expect(page.getByText("Registration successful")).toBeVisible();

      
    })
  })

// Clean up any remaining routes to avoid "Target page closed" warnings
test.afterEach(async ({ page }: { page: Page }) => {
  try {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await page.context().unrouteAll({ behavior: 'ignoreErrors' });
  } catch { /* ignore */ }
});