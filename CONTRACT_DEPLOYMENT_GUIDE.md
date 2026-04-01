# MyContract Deployment Guide

Complete guide for deploying MyContract.sol with Merkle proof claim functionality.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Methods](#deployment-methods)
3. [Step-by-Step Deployment](#step-by-step-deployment)
4. [Post-Deployment Setup](#post-deployment-setup)
5. [Verification](#verification)
6. [Testing the Deployment](#testing-the-deployment)

## Prerequisites

### Required Information

- **Contract**: `contracts/MyContract.sol`
- **Solidity Version**: ^0.8.20
- **Owner Address**: `0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB` (kushmanmb.eth / yaketh.eth)
- **Constructor Arguments**: None (owner is hardcoded)

### Network Options

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Ethereum Mainnet | 1 | https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY | https://etherscan.io |
| Sepolia Testnet | 11155111 | https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY | https://sepolia.etherscan.io |
| Base Mainnet | 8453 | https://mainnet.base.org | https://basescan.org |
| Base Sepolia | 84532 | https://sepolia.base.org | https://sepolia.basescan.org |

### What You Need

1. A wallet with ETH for gas fees on your chosen network
2. MetaMask or another Web3 wallet
3. Optional: RPC API key from Alchemy, Infura, or similar provider

---

## Deployment Methods

### Method 1: Remix IDE (Recommended for Beginners)

**Pros:** User-friendly, no local setup required, visual interface
**Cons:** Requires manual steps, less automation

### Method 2: Foundry Cast CLI

**Pros:** Fast, scriptable, professional tool
**Cons:** Requires Foundry installation and command-line experience

### Method 3: Hardhat/Ethers Script

**Pros:** Highly customizable, good for complex deployments
**Cons:** Requires project setup and configuration

---

## Step-by-Step Deployment

### Using Remix IDE (Recommended)

#### 1. Prepare the Contract

1. Go to https://remix.ethereum.org
2. Create a new file: `MyContract.sol`
3. Copy the entire contract code from `contracts/MyContract.sol` and paste it into Remix

#### 2. Compile the Contract

1. Click on the "Solidity Compiler" tab (left sidebar)
2. Select compiler version: **0.8.20**
3. Enable optimization:
   - Check "Enable optimization"
   - Set runs to **200**
4. Click "Compile MyContract.sol"
5. Verify no compilation errors

#### 3. Deploy the Contract

1. Click on "Deploy & Run Transactions" tab (left sidebar)
2. Environment: Select **"Injected Provider - MetaMask"**
3. Connect your MetaMask wallet when prompted
4. In MetaMask, ensure you're connected to the correct network:
   - For testnet: Switch to Sepolia or Base Sepolia
   - For mainnet: Switch to Ethereum Mainnet or Base
5. Contract: Ensure "MyContract" is selected in the dropdown
6. Constructor arguments: **None needed** (owner is hardcoded)
7. Click the orange **"Deploy"** button
8. MetaMask will pop up:
   - Review the transaction details
   - Check gas fees are reasonable
   - Click "Confirm"
9. Wait for the transaction to be mined
10. Once deployed, the contract will appear under "Deployed Contracts"
11. **Copy and save the contract address** (e.g., `0x1234...5678`)

#### 4. Verify Deployment

In Remix, expand your deployed contract and verify:
- `owner()` returns `0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB`
- `merkleRoot()` returns `0x0000000000000000000000000000000000000000000000000000000000000000`
- Contract balance is 0

---

### Using Foundry Cast

#### Prerequisites

Install Foundry if you haven't already:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

#### Deployment Command

```bash
# Basic deployment
forge create contracts/MyContract.sol:MyContract \
    --rpc-url <RPC_URL> \
    --private-key <YOUR_PRIVATE_KEY>

# With optimization (recommended)
forge create contracts/MyContract.sol:MyContract \
    --rpc-url <RPC_URL> \
    --private-key <YOUR_PRIVATE_KEY> \
    --optimize \
    --optimizer-runs 200
```

#### Example for Base Sepolia

```bash
forge create contracts/MyContract.sol:MyContract \
    --rpc-url https://sepolia.base.org \
    --private-key $PRIVATE_KEY \
    --optimize \
    --optimizer-runs 200
```

**Important**: Never commit or share your private key!

#### Deployment Output

```
Deployer: 0xYourAddress...
Deployed to: 0x1234567890abcdef1234567890abcdef12345678
Transaction hash: 0xabcdef...
```

Save the deployed contract address!

---

### Using Ethers.js Script

Create a deployment script `deploy-contract.js`:

```javascript
const { ethers } = require('ethers');
const fs = require('fs');

async function main() {
  // Configuration
  const RPC_URL = 'https://sepolia.base.org';
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  
  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY environment variable not set');
  }
  
  // Setup provider and wallet
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  
  console.log('Deploying from:', wallet.address);
  console.log('Balance:', ethers.formatEther(await provider.getBalance(wallet.address)), 'ETH');
  
  // Read contract
  const contractSource = fs.readFileSync('./contracts/MyContract.sol', 'utf8');
  
  // Compile and deploy (requires solc)
  // Note: You'll need to compile the contract first with solc or use hardhat
  console.log('Please compile the contract first and use the bytecode/ABI');
  console.log('For a complete deployment script, consider using Hardhat or Foundry');
}

main().catch(console.error);
```

---

## Post-Deployment Setup

### 1. Fund the Contract

Send ETH to the contract address for claims:

```bash
# Using cast
cast send <CONTRACT_ADDRESS> \
    --value 10ether \
    --rpc-url <RPC_URL> \
    --private-key <PRIVATE_KEY>
```

Or send directly from your wallet to the contract address.

### 2. Set Merkle Root

Only the owner (`0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB`) can set the Merkle root.

#### Using Remix:
1. In the deployed contract section, find `setMerkleRoot`
2. Expand it
3. Enter your Merkle root (bytes32, e.g., `0x1234...`)
4. Click "transact"
5. Confirm in MetaMask

#### Using Cast:
```bash
cast send <CONTRACT_ADDRESS> \
    "setMerkleRoot(bytes32)" \
    <MERKLE_ROOT> \
    --rpc-url <RPC_URL> \
    --private-key <OWNER_PRIVATE_KEY>
```

**Example:**
```bash
cast send 0x1234567890abcdef1234567890abcdef12345678 \
    "setMerkleRoot(bytes32)" \
    0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890 \
    --rpc-url https://sepolia.base.org \
    --private-key $PRIVATE_KEY
```

### 3. Generate Merkle Tree and Proofs

See `contracts/MyContract.test.md` for instructions on:
- Creating a Merkle tree from eligible claims
- Generating proofs for each account
- Distributing proofs to users

---

## Verification

Verify your contract on the block explorer for transparency:

```bash
npm run verify -- \
    --address <DEPLOYED_CONTRACT_ADDRESS> \
    --source ./contracts/MyContract.sol \
    --name MyContract \
    --compiler v0.8.20+commit.a1b79de6 \
    --network <sepolia|base|base-sepolia|mainnet> \
    --optimization 1 \
    --runs 200
```

**Example for Base Sepolia:**
```bash
npm run verify -- \
    --address 0x1234567890abcdef1234567890abcdef12345678 \
    --source ./contracts/MyContract.sol \
    --name MyContract \
    --compiler v0.8.20+commit.a1b79de6 \
    --network base-sepolia \
    --optimization 1 \
    --runs 200
```

For detailed verification instructions, see [CONTRACT_VERIFICATION.md](../CONTRACT_VERIFICATION.md).

---

## Testing the Deployment

### 1. Check Basic Functions

Using Remix or block explorer:

1. **Check owner:**
   ```
   Call: owner()
   Expected: 0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB
   ```

2. **Check merkle root:**
   ```
   Call: merkleRoot()
   Expected: 0x0000... (zeros before you set it)
   ```

3. **Check contract balance:**
   ```
   View balance in block explorer or:
   Call: getBalance(contractAddress)
   ```

### 2. Test setMerkleRoot (Owner Only)

```solidity
// As owner (0x0540...DdB)
setMerkleRoot(0x1234567890123456789012345678901234567890123456789012345678901234)

// Verify it was set
merkleRoot() // Should return the value you set
```

### 3. Test Claim Function

Once you have:
- Merkle root set
- Contract funded with ETH
- Valid proof for a test account

```solidity
// Example claim
claim(
    0xTestAccountAddress,
    1000000000000000000, // 1 ETH in wei
    [0xProof1, 0xProof2, ...]
)
```

Check:
- `hasClaimed(testAccountAddress)` should return `true`
- Test account balance should increase by claim amount
- Contract balance should decrease by claim amount
- `Claimed` event should be emitted

---

## Deployment Checklist

Before deploying to mainnet:

- [ ] Contract compiled successfully with optimization
- [ ] Tested deployment on testnet (Sepolia or Base Sepolia)
- [ ] Verified owner address is correct (0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB)
- [ ] Tested setMerkleRoot function
- [ ] Tested claim function with valid proof
- [ ] Tested duplicate claim prevention
- [ ] Contract verified on block explorer
- [ ] Documentation prepared for users
- [ ] Merkle tree generated with all eligible claims
- [ ] Proofs generated and ready to distribute
- [ ] Sufficient ETH ready to fund contract for all claims
- [ ] Owner has access to wallet for post-deployment management

---

## Gas Cost Estimates

| Operation | Estimated Gas | Cost @ 20 gwei | Cost @ 50 gwei |
|-----------|---------------|----------------|----------------|
| Deployment | ~1,200,000 | ~0.024 ETH | ~0.060 ETH |
| setMerkleRoot | ~45,000 | ~0.0009 ETH | ~0.00225 ETH |
| First claim | ~80,000 | ~0.0016 ETH | ~0.004 ETH |
| Subsequent claims | ~50,000 | ~0.001 ETH | ~0.0025 ETH |

*Note: Gas costs vary based on network congestion and proof size*

---

## Troubleshooting

### Deployment Failed

- **Insufficient funds**: Ensure wallet has enough ETH for gas
- **Network mismatch**: Verify MetaMask is on the correct network
- **Compiler error**: Use Solidity 0.8.20 exactly

### Can't Set Merkle Root

- **Not owner**: Only `0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB` can call this
- **Invalid root**: Ensure root is a valid bytes32 value (not all zeros)

### Claim Failing

- **Invalid proof**: Verify proof was generated correctly
- **Already claimed**: Check `hasClaimed(account)`
- **Insufficient balance**: Ensure contract has enough ETH
- **Merkle root not set**: Check `merkleRoot()` is not all zeros

---

## Security Reminders

1. **Never share private keys** - Keep them secure and backed up
2. **Test on testnet first** - Always test before mainnet deployment
3. **Verify contract** - Verify source code on block explorer
4. **Audit if needed** - Consider professional audit for high-value contracts
5. **Monitor contract** - Watch for unexpected behavior post-deployment

---

## Next Steps

After successful deployment:

1. ✅ Save contract address
2. ✅ Verify on block explorer
3. ✅ Fund with ETH for claims
4. ✅ Set Merkle root
5. ✅ Distribute proofs to eligible users
6. ✅ Announce deployment and provide claiming instructions
7. ✅ Monitor claims and contract balance

---

## Support

For issues or questions:
- Review contract documentation: `contracts/MyContract.test.md`
- Check implementation summary: `IMPLEMENTATION_MERKLE_CLAIM.md`
- Verify contract: `CONTRACT_VERIFICATION.md`

## Contract Address

Once deployed, update this section with:
- **Network**: [Network Name]
- **Address**: `0x...`
- **Deployed**: [Date]
- **Verified**: [Block Explorer Link]
