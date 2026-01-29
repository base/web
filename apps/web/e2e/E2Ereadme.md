# End-to-End Tests for `apps/web`

This folder contains Playwright tests for the Base Web project against a local Next.js dev server...

## Contents

- [`testFixture.ts`](./testFixture.ts) – extends Playwright's fixture system with the On-chain Test Kit wallets.
- [`appSession.ts`](./appSession.ts) – helper functions for the common onboarding & registration steps.
- [`tests/*.spec.ts`](./tests) – individual test cases (successful registration, rejection flow, …).

---

## Prerequisites

Run:

```bash
yarn add -D @playwright/test @coinbase/onchaintestkit
```

> The scripts have been tested on macOS and Linux. Windows users should run the commands inside WSL 2.

---

## Environment variables

Create a file called **`.env`** in `apps/web/` (it is listed in `.gitignore`).

```dotenv
# E2E .env example  ───────────────────────────────────────────

# the basename that the test will try to register
TEST_BASENAME=mytestname123

# 12-word mnemonic that gets imported into MetaMask; **DO NOT USE A REAL WALLET**
E2E_TEST_SEED_PHRASE="test test test test test test test test test test test junk"

# RPC endpoint that Anvil will fork from (Base mainnet in this example)
E2E_TEST_FORK_URL=https://mainnet.base.org

# The block number to fork at. Omitting gives you the latest block.
E2E_TEST_FORK_BLOCK_NUMBER=31397553

NEXT_PUBLIC_CDP_BASE_RPC_ENDPOINT="http://localhost:8545/"
E2E_TEST="true"
```

- **`TEST_BASENAME`** must be at least 3 alphanumeric lower-case characters.
- Any ETH the flow spends comes from Anvil's default funded developer accounts, so there is **no cost**.

---

## Running the tests locally

1. **Install dependencies + build**

   ```bash
   # from repo root
   yarn install
   yarn prepare-metamask
   yarn playwright install --with-deps
   yarn build
   ```

2. **Run the E2E tests**

   ```bash
   yarn test:e2e
   ```

   The first time this runs it will download a MetaMask release (~60 MB) and start Anvil; subsequent runs are faster.

### CI parity

The GitHub Actions workflow (`.github/workflows/e2e.yml`) follows exactly the same steps – if it passes locally it should pass in CI.

---

## Running tests in headed mode (see the browser)

By default, Playwright runs tests in headless mode. To watch the tests execute:

```bash
# Run all tests with visible browser
yarn test:e2e --headed

# Run a specific test file
yarn test:e2e registration-success.spec.ts --headed

# Debug mode: opens Playwright Inspector, lets you step through each action
PWDEBUG=1 yarn test:e2e registration-success.spec.ts
```

**Note:** In headed mode, you'll see the MetaMask extension window pop up alongside your app. The test automation will click through it automatically—don't interfere or it may fail!

---

Feel free to extend this README if you run into anything else that others might find useful. Happy testing! 🎉
