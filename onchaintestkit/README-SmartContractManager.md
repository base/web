# SmartContractManager - CREATE2 Deployment and Testing Guide

This guide demonstrates how to use the `SmartContractManager` for deterministic smart contract deployment using CREATE2 opcodes. The examples are based on our comprehensive test suite that covers various deployment and interaction scenarios.

## Overview

The `SmartContractManager` provides:
- **Deterministic Deployment**: Deploy contracts at predictable addresses using CREATE2
- **Viem Integration**: Modern, type-safe Ethereum interactions
- **Test Framework Integration**: Seamless integration with Playwright and our custom test framework
- **State Management**: Snapshot and revert capabilities for testing

## Prerequisites

### 1. Install Foundry

Make sure you have Foundry installed. If not, install it:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Environment Setup

Set the following environment variable to tell the SmartContractManager where to find your compiled contracts:

```bash
export E2E_CONTRACT_PROJECT_ROOT=../smart-contracts
```

### 3. Install Dependencies & Build Contracts

Navigate to the smart contracts directory, install dependencies, and build:

```bash
cd example/smart-contracts
forge install foundry-rs/forge-std
forge install OpenZeppelin/openzeppelin-contracts
forge build
```

This will:
- Install forge-std and OpenZeppelin contracts libraries
- Compile all smart contracts
- Generate artifacts in the `out/` directory

### 4. Deterministic Deployment Proxy

The SmartContractManager automatically deploys the deterministic deployment proxy at address `0x4e59b44847b379578588920ca78fbf26c0b4956c` when needed. This proxy enables CREATE2 deployments.

## Test Examples Explained

Our test suite (`example/frontend/e2e/smartContractDeployment.spec.ts`) demonstrates various deployment scenarios:

### 1. Basic CREATE2 Deployment

```typescript
test("should deploy SimpleToken contract using CREATE2")
```

**What it does:**
- Deploys a SimpleToken contract using CREATE2 with a specific salt
- Verifies the contract was deployed at the expected address
- Checks that contract bytecode exists on-chain

**Key concepts:**
- CREATE2 produces deterministic addresses based on salt, bytecode, and constructor args
- The deployment address can be predicted before deployment

### 2. Deterministic Address Verification

```typescript
test("should deploy at deterministic address with same salt")
```

**What it does:**
- Deploys a contract with a specific salt
- Takes a blockchain snapshot
- Reverts to the snapshot (simulating a fresh chain)
- Deploys again with the same salt
- Verifies both deployments produce the same address

**Key concepts:**
- CREATE2 addresses are deterministic across different chains/states
- Useful for multi-chain deployments or factory patterns

### 3. Contract Interaction

```typescript
test("should interact with deployed contract")
```

**What it does:**
- Deploys a SimpleToken contract
- Reads various contract states:
  - Owner address
  - Owner's token balance (100k tokens from constructor)
  - Total supply
  - Token name and symbol

**Key concepts:**
- The contract owner is the proxy contract (`0x4e59b44847b379578588920ca78fbf26c0b4956c`)
- Read-only operations don't require special permissions
- Constructor logic executes during deployment (minting initial tokens)

### 4. Batch Operations

```typescript
test("should perform batch operations")
```

**What it does:**
- Demonstrates batch deployment of multiple contracts
- Uses `setContractState` for complex deployment scenarios
- Verifies deployments through event logs

**Key concepts:**
- Batch operations improve efficiency
- Useful for deploying interconnected contract systems

### 5. Constructor Arguments

```typescript
test("should handle contract with constructor arguments")
```

**What it does:**
- Shows how to deploy contracts with constructor parameters
- Verifies successful deployment

**Key concepts:**
- Constructor args are encoded with the bytecode for CREATE2
- Arguments affect the deterministic address

### 6. Wallet Integration

```typescript
test("should connect wallet and interact with deployed contract")
```

**What it does:**
- Deploys a contract
- Connects MetaMask wallet to the dApp
- Demonstrates end-to-end user interaction flow

**Key concepts:**
- Test framework provides wallet fixtures (MetaMask, Coinbase)
- Wallet connection enables user-initiated transactions

### 7. State Persistence

```typescript
test("should test contract state persistence across snapshots")
```

**What it does:**
- Deploys a first contract
- Takes a snapshot of the blockchain state
- Deploys a second contract
- Reverts to the snapshot
- Verifies the second contract no longer exists
- Confirms the first contract persists with original state

**Key concepts:**
- Snapshots capture complete blockchain state
- Useful for testing different scenarios from same starting point
- State includes balances, storage, and deployed code

## API Reference

### Deploy a Contract

```typescript
const address = await smartContractManager.deployContract({
  name: "ContractName",        // Must match .sol filename
  args: [],                    // Constructor arguments
  salt: "0x...",              // 32-byte hex string
  deployer: "0x...",          // Deployer address
})
```

### Execute Contract Calls

```typescript
const txHash = await smartContractManager.executeCall({
  target: "0x...",            // Contract address
  functionName: "transfer",    // Function to call
  args: [recipient, amount],  // Function arguments
  account: "0x...",           // Caller address
  value: 0n,                  // ETH to send (optional)
})
```

### Batch Operations

```typescript
await smartContractManager.setContractState({
  deployments: [
    { name: "Token", args: [], salt: "0x1...", deployer: "0x..." },
    { name: "NFT", args: ["MyNFT", "NFT"], salt: "0x2...", deployer: "0x..." },
  ],
  calls: [
    { target: "0x...", functionName: "initialize", args: [], account: "0x..." },
  ],
}, node)
```

## Important Notes

### Test Fixtures

The test framework automatically provides:
- `node`: Local blockchain node instance
- `smartContractManager`: Contract deployment manager
- `metamask`/`coinbase`: Wallet fixtures for testing user interactions
- `page`: Playwright page object for UI interactions

### Contract Ownership

When contracts are deployed via CREATE2 proxy:
- The proxy contract (`0x4e59b44847b379578588920ca78fbf26c0b4956c`) becomes the initial owner
- This affects functions with `onlyOwner` modifiers
- Plan your contract initialization accordingly

### TypeScript Considerations

The test fixtures may show TypeScript warnings about being possibly undefined. These are safe to ignore as the test framework ensures they're initialized before test execution.

## Troubleshooting

### Common Issues

1. **"Artifact not found" error**
   - Run `forge build` in the smart-contracts directory
   - Ensure `E2E_CONTRACT_PROJECT_ROOT` is set correctly

2. **"HTTP request failed" error**
   - Make sure you're using the `node` fixture from the test framework
   - Don't create new `LocalNodeManager` instances

3. **"Chain ID mismatch" error**
   - The framework automatically detects the correct chain ID
   - Don't hardcode chain configurations

4. **Permission errors when calling contract functions**
   - Remember the proxy is the owner, not your test accounts
   - Use read-only functions or design contracts with appropriate access control

## Running Tests

```bash
# Run all smart contract deployment tests
yarn test:e2e smartContractDeployment

# Run with UI mode for debugging
yarn test:e2e --ui smartContractDeployment

# Run a specific test
yarn test:e2e -g "should deploy SimpleToken contract"
```

## Next Steps

1. Study the test examples to understand different deployment patterns
2. Modify the SimpleToken contract to add your own functionality
3. Create new test cases for your specific use cases
4. Explore multi-contract deployments and interactions