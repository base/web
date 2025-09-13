# WebAuthn Virtual Authenticator Integration for Playwright Passkey Testing

## Overview

This module provides a robust integration of the WebAuthn virtual authenticator for automated passkey (FIDO2/WebAuthn) testing using Playwright. It enables simulation of both passkey registration and authentication flows, supporting end-to-end testing of passkey-based login and transaction approval scenarios.

The core logic is implemented in two files:
- `PasskeyAuthenticator.ts`: Handles the low-level virtual authenticator setup, credential management, and simulation of WebAuthn operations.
- `SmartWallet.ts`: Provides a higher-level API for wallet flows, orchestrating registration and authentication using the authenticator.

## Features
- Automated setup and teardown of a virtual WebAuthn authenticator in Playwright browser contexts.
- Simulation of passkey registration and authentication (assertion) flows.
- Credential export/import to persist passkeys across popups and browser sessions.
- Clean, reusable API for E2E test scenarios.
- Handles WebAuthn edge cases and errors.

## Setup

1. **Install Playwright** (if not already):
   ```sh
   yarn add -D @playwright/test
   # or
   npm install --save-dev @playwright/test
   ```
2. **Ensure your test runner is configured to use Chromium** (WebAuthn virtual authenticator is only supported in Chromium-based browsers).

## Usage

### 1. Passkey Registration
```ts
const smartWallet = new CoinbaseSmartWallet(context, page);
const passkeyConfig = {
  name: "Minimal Test Passkey",
  rpId: "keys.coinbase.com",
  rpName: "Coinbase Smart Wallet",
  userId: "test-user-123",
  isUserVerified: true,
};
// Open registration popup and pass it to the wallet
await smartWallet.registerPasskey(passkeyConfig, registrationPopup);
```

### 2. Passkey Authentication (Transaction Approval)
```ts
// After registration, open a new popup for authentication
await smartWallet.approveTransactionWithPasskey(transactionPopup);
```

### 3. Persisting Credentials Across Popups
- Credentials are automatically exported after registration and imported into new authenticators for subsequent popups.

## API Reference

### `PasskeyAuthenticator`
- `constructor(page: Page)`
- `setPage(page: Page): Promise<void>` — Switches the authenticator to a new Playwright page (popup).
- `initialize(options?: VirtualAuthenticatorOptions): Promise<void>` — Sets up a new virtual authenticator in the current page context.
- `simulateSuccessfulPasskeyInput(operationTrigger: () => Promise<void>): Promise<void>` — Simulates a successful passkey operation (registration or authentication) by listening for WebAuthn events and triggering the user action.
- `exportCredentials(): Promise<WebAuthnCredential[]>` — Exports all credentials from the current authenticator.
- `importCredential(cred: WebAuthnCredential): Promise<void>` — Imports a credential into the current authenticator.
- `getCredentials(): Promise<WebAuthnCredential[]>` — Returns all credentials in the authenticator.

### `CoinbaseSmartWallet`
- `registerPasskey(config: PasskeyConfig, popup: Page): Promise<void>` — Registers a new passkey in the given popup.
- `approveTransactionWithPasskey(popup: Page): Promise<void>` — Approves a transaction using passkey authentication in the given popup.

## Example Test Flow
```ts
test("should register a passkey and complete a transaction", async ({ page, coinbase }) => {
  const smartWallet = new CoinbaseSmartWallet(coinbase.walletContext, coinbase.walletPage);
  // Registration
  const [registrationPopup] = await Promise.all([
    page.context().waitForEvent("page"),
    page.click("#wallet-type-smart"),
  ]);
  await smartWallet.registerPasskey(passkeyConfig, registrationPopup);

  // Transaction approval
  const [transactionPopup] = await Promise.all([
    page.context().waitForEvent("page"),
    page.locator('[data-testid="ockTransactionButton_Button"]').click(),
  ]);
  await smartWallet.approveTransactionWithPasskey(transactionPopup);

  // Assert success
  await expect(page.getByTestId("ockToast").getByText("Successful")).toBeVisible({ timeout: 30000 });
});
```

## Error Handling & Edge Cases
- The authenticator is always re-initialized for each new popup to ensure a valid virtual authenticator is present in the new CDP session.
- Credentials are exported after registration and re-imported for authentication in new popups.
- All WebAuthn operations are wrapped in robust event listeners and timeouts to avoid race conditions and ensure reliability.

## References
- [WebAuthn Virtual Authenticator Guide](https://www.corbado.com/blog/passkeys-e2e-playwright-testing-webauthn-virtual-authenticator#webauthn-virtual-authenticator-e2e-passkey-testing) 