# End-to-End Tests for `apps/web`

This folder contains comprehensive Playwright tests for the Base Web project, including wallet integration, user registration flows, and blockchain interactions using the On-chain Test Kit.

## 📁 Contents

- [`testFixture.ts`](./testFixture.ts) – Extends Playwright's fixture system with On-chain Test Kit wallets and blockchain simulation
- [`appSession.ts`](./appSession.ts) – Helper functions for common onboarding & registration steps
- [`basenameHelpers.ts`](./basenameHelpers.ts) – Utility functions for basename operations
- [`tests/*.spec.ts`](./tests) – Individual test cases covering registration flows, wallet connections, and error scenarios
- [`walletConfig/`](./walletConfig) – Configuration files for MetaMask and Coinbase Wallet testing

## 🎯 Test Coverage

### Current Test Scenarios
- ✅ **Successful Registration Flow** - Complete user onboarding with wallet connection
- ✅ **Registration Rejection** - Handling user rejection of registration
- ✅ **Registration Failure** - Error handling for failed registration attempts
- ✅ **Wallet Connection** - MetaMask and Coinbase Wallet integration
- ✅ **Basename Validation** - Input validation and error messaging

### Test Architecture
- **Playwright** for browser automation and testing
- **On-chain Test Kit** for blockchain simulation and wallet testing
- **Anvil** for local Ethereum node simulation
- **MetaMask** for wallet interaction testing

---

## 🚀 Prerequisites

### Required Dependencies
```bash
# Install Playwright and On-chain Test Kit
yarn add -D @playwright/test @coinbase/onchaintestkit

# Install Playwright browsers
yarn playwright install --with-deps
```

### System Requirements
- **Node.js 20+**
- **Yarn 1.22+**
- **Git** for cloning the repository

> **Note:** Scripts have been tested on macOS and Linux. Windows users should run commands inside WSL 2 for best compatibility.

---

## ⚙️ Environment Configuration

### Required Environment Variables

Create a file called **`.env`** in `apps/web/` (it is listed in `.gitignore`):

```dotenv
# E2E Test Configuration ────────────────────────────────────────

# Test basename for registration (must be unique and available)
TEST_BASENAME=mytestname123

# Test wallet mnemonic - NEVER USE A REAL WALLET!
E2E_TEST_SEED_PHRASE="test test test test test test test test test test test junk"

# RPC endpoint that Anvil will fork from (Base mainnet)
E2E_TEST_FORK_URL=https://mainnet.base.org

# Specific block number to fork at (optional - latest if omitted)
E2E_TEST_FORK_BLOCK_NUMBER=31397553

# Local Anvil RPC endpoint
NEXT_PUBLIC_CDP_BASE_RPC_ENDPOINT="http://localhost:8545/"

# Enable E2E test mode
E2E_TEST="true"

# Additional test configuration
E2E_TEST_TIMEOUT=30000
E2E_TEST_RETRIES=3
```

### Environment Variable Details

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `TEST_BASENAME` | Unique basename for test registration | ✅ | `mytestname123` |
| `E2E_TEST_SEED_PHRASE` | 12-word mnemonic for test wallet | ✅ | `"test test test..."` |
| `E2E_TEST_FORK_URL` | Base network RPC URL for forking | ✅ | `https://mainnet.base.org` |
| `E2E_TEST_FORK_BLOCK_NUMBER` | Specific block to fork from | ❌ | `31397553` |
| `NEXT_PUBLIC_CDP_BASE_RPC_ENDPOINT` | Local Anvil RPC endpoint | ✅ | `http://localhost:8545/` |
| `E2E_TEST` | Enable E2E test mode | ✅ | `true` |

### Important Notes

- **`TEST_BASENAME`** must be at least 3 alphanumeric lower-case characters and unique
- **Test wallet mnemonic** should NEVER be used for real funds - it's for testing only
- **No real ETH required** - tests use Anvil's default funded developer accounts
- **Block forking** allows testing against real blockchain state without costs

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
