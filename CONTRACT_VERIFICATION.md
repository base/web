# Contract Verification CLI

A command-line tool for verifying smart contracts on blockchain explorers (Etherscan, Basescan).

## Installation

The verification script is available at the root of the repository via npm scripts.

## Usage

```bash
npm run verify -- \
  --address <contract-address-or-ens-name> \
  --source <path-to-source-file> \
  --name <contract-name> \
  --compiler <compiler-version> \
  --network <network-name> \
  [--optimization <0|1>] \
  [--runs <number>] \
  [--constructor-args <hex-encoded-args>]
```

The `--address` parameter accepts:
- Hex addresses (e.g., `0x1234567890abcdef1234567890abcdef12345678`)
- ENS names (e.g., `kushmanmb.eth`, `yaketh.eth`) *
- Basenames (e.g., `kushmanmb.base.eth`) *

**\* Note on ENS/Basename Support:** While the script recognizes ENS and Basename formats, it does not perform automatic resolution. When you provide an ENS or Basename, the script will provide instructions for manual resolution. Automatic resolution would require additional cryptographic libraries not included by default.

### Example

Using hex address:
```bash
npm run verify -- \
  --address 0x1234567890abcdef1234567890abcdef12345678 \
  --source ./contracts/MyContract.sol \
  --name MyContract \
  --compiler v0.8.20+commit.a1b79de6 \
  --network sepolia \
  --optimization 1 \
  --runs 200
```

Using ENS name:
```bash
npm run verify -- \
  --address kushmanmb.eth \
  --source ./contracts/MyContract.sol \
  --name MyContract \
  --compiler v0.8.20+commit.a1b79de6 \
  --network mainnet \
  --optimization 1 \
  --runs 200
```

Using Basename:
```bash
npm run verify -- \
  --address yaketh.base.eth \
  --source ./contracts/MyContract.sol \
  --name MyContract \
  --compiler v0.8.20+commit.a1b79de6 \
  --network base \
  --optimization 1 \
  --runs 200
```

## Parameters

### Required Parameters

- `--address`: The deployed contract address
  - Can be a hex address: `0x1234567890abcdef1234567890abcdef12345678`
  - Can be an ENS name: `kushmanmb.eth`, `vitalik.eth`
  - Can be a Basename: `kushmanmb.base.eth`, `yaketh.base.eth`
- `--source`: Path to the Solidity source code file (relative or absolute)
- `--name`: The name of the contract as it appears in the source code
- `--compiler`: The Solidity compiler version (e.g., `v0.8.20+commit.a1b79de6`)
- `--network`: The blockchain network to verify on

### Optional Parameters

- `--optimization`: Whether optimization was enabled during compilation (`0` or `1`, default: `0`)
- `--runs`: Number of optimization runs (default: `200`)
- `--constructor-args`: Hex-encoded constructor arguments (if any)
- `--evmversion`: EVM version used during compilation
- `--license`: License type code (default: `1` for No License)

## Supported Networks

- `mainnet` - Ethereum Mainnet
- `sepolia` - Sepolia Testnet
- `base` - Base Mainnet
- `base-sepolia` - Base Sepolia Testnet

## Environment Setup

### API Key Configuration

The verification tool requires an Etherscan API key. Set it in your environment:

1. **For local development**, add to `apps/web/.env.local`:
   ```bash
   ETHERSCAN_API_KEY=your_api_key_here
   ```

2. **For command line**, export the environment variable:
   ```bash
   export ETHERSCAN_API_KEY=your_api_key_here
   ```

### Getting an API Key

- **Etherscan**: Visit https://etherscan.io/myapikey
- **Basescan**: Visit https://basescan.org/myapikey

Note: The same API key works for both Etherscan and Basescan networks.

## How It Works

1. The tool validates all input parameters
2. Reads the source code from the specified file
3. Submits a verification request to the blockchain explorer API
4. Polls the verification status until complete
5. Displays the verification result and explorer link

## Compiler Version

The compiler version must match exactly what was used to compile and deploy the contract. You can find the exact compiler version in:

- Hardhat/Truffle config files
- Remix compiler version selector
- Deployment scripts output

Format: `v<version>+commit.<commit-hash>` (e.g., `v0.8.20+commit.a1b79de6`)

## Optimization Settings

Ensure the optimization settings match your deployment:

- If you compiled with optimization enabled, set `--optimization 1`
- Specify the number of `--runs` used during compilation (common values: 200, 1000)
- If no optimization was used, set `--optimization 0` (or omit, as this is the default)

## Troubleshooting

### ENS/Basename Resolution

The script recognizes ENS and Basename formats but provides guided manual resolution:

- **ENS names** (e.g., `kushmanmb.eth`, `vitalik.eth`)
- **Basenames** (e.g., `kushmanmb.base.eth`, `yaketh.base.eth`)

When you provide an ENS or Basename, the script will:
1. Recognize the format
2. Provide links to resolve the name:
   - https://app.ens.domains/ (for ENS names)
   - https://www.base.org/names (for Basenames)
3. Ask you to re-run the command with the resolved hex address

**Why manual resolution?** Automatic ENS resolution requires cryptographic libraries (keccak256) not included in Node.js by default. To keep the tool dependency-free, we guide you through manual resolution instead.

### "Source file not found"
- Verify the path to the source file is correct
- Use relative paths from the repository root or absolute paths

### "Invalid Ethereum address format"
- Ensure the address starts with `0x` and is 42 characters long (including `0x`)
- Check for typos in the address

### "Verification failed"
- Ensure the compiler version matches exactly
- Verify optimization settings match your deployment
- Check that the contract address is correct and the contract is deployed
- Ensure constructor arguments are correctly encoded (if used)

### "ETHERSCAN_API_KEY environment variable not set"
- Set the API key as described in the Environment Setup section

## Security Notes

⚠️ **Never commit API keys to version control**

- API keys should be stored in `.env.local` (already in `.gitignore`)
- Use environment variables for CI/CD environments
- Keep your API keys secure and rotate them if exposed

## Examples

### Basic verification (no optimization)

```bash
npm run verify -- \
  --address 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0 \
  --source ./contracts/SimpleToken.sol \
  --name SimpleToken \
  --compiler v0.8.19+commit.7dd6d404 \
  --network mainnet
```

### Using ENS name

```bash
npm run verify -- \
  --address kushmanmb.eth \
  --source ./contracts/MyContract.sol \
  --name MyContract \
  --compiler v0.8.20+commit.a1b79de6 \
  --network mainnet \
  --optimization 1 \
  --runs 200
```

### Using Basename on Base network

```bash
npm run verify -- \
  --address yaketh.base.eth \
  --source ./contracts/BaseContract.sol \
  --name BaseContract \
  --compiler v0.8.20+commit.a1b79de6 \
  --network base \
  --optimization 1 \
  --runs 1000
```

### With optimization and constructor arguments

```bash
npm run verify -- \
  --address 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0 \
  --source ./contracts/TokenWithArgs.sol \
  --name TokenWithArgs \
  --compiler v0.8.20+commit.a1b79de6 \
  --network base \
  --optimization 1 \
  --runs 1000 \
  --constructor-args 0000000000000000000000001234567890123456789012345678901234567890
```

### Testnet verification

```bash
npm run verify -- \
  --address 0x1234567890abcdef1234567890abcdef12345678 \
  --source ./contracts/MyContract.sol \
  --name MyContract \
  --compiler v0.8.20+commit.a1b79de6 \
  --network sepolia \
  --optimization 1 \
  --runs 200
```

## Implementation Details

The verification script is located at `apps/web/scripts/verify-contract.js` and uses:

- Node.js built-in `https` and `http` modules for API requests
- No external dependencies (uses only Node.js standard library)
- Follows Etherscan API verification standards
- Automatic verification status polling with timeout

## Related Documentation

- See `apps/web/examples/CONTRACT_SOURCE_CODE_API.md` for information on fetching verified contract source code
- See `apps/web/examples/contract-source-code-api.ts` for TypeScript usage examples
