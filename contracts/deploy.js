#!/usr/bin/env node

/**
 * MyContract Deployment Script
 * 
 * This script provides guidance for deploying MyContract.sol to various networks.
 * Since this repository doesn't have Hardhat or Foundry configured, deployment
 * should be done through one of these methods:
 * 
 * 1. Remix IDE (recommended for simple deployments)
 * 2. Manual deployment via web3/ethers scripts
 * 3. Cast (Foundry CLI tool)
 * 
 * Usage:
 *   node contracts/deploy.js [--network <network-name>] [--help]
 * 
 * Examples:
 *   node contracts/deploy.js --network sepolia
 *   node contracts/deploy.js --network base
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = {};
process.argv.slice(2).forEach((arg, index, arr) => {
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const value = arr[index + 1] && !arr[index + 1].startsWith('--') ? arr[index + 1] : true;
    args[key] = value;
  }
});

// Network configurations
const NETWORKS = {
  'mainnet': {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY',
    explorer: 'https://etherscan.io',
    currency: 'ETH'
  },
  'sepolia': {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY',
    explorer: 'https://sepolia.etherscan.io',
    currency: 'ETH'
  },
  'base': {
    name: 'Base Mainnet',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    currency: 'ETH'
  },
  'base-sepolia': {
    name: 'Base Sepolia Testnet',
    chainId: 84532,
    rpcUrl: 'https://sepolia.base.org',
    explorer: 'https://sepolia.basescan.org',
    currency: 'ETH'
  }
};

// Display help
function showHelp() {
  console.log(`
MyContract Deployment Guide
============================

This script provides guidance for deploying MyContract.sol.

DEPLOYMENT METHODS:

1. REMIX IDE (Recommended for beginners)
   ✓ Visit: https://remix.ethereum.org
   ✓ Create new file: MyContract.sol
   ✓ Copy contract code from ./contracts/MyContract.sol
   ✓ Compile with Solidity 0.8.20
   ✓ Deploy using "Injected Provider - MetaMask"
   ✓ No constructor arguments needed
   ✓ Owner is hardcoded: 0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB
   ✓ Authorized Address is hardcoded: 0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43

2. FOUNDRY CAST (For advanced users)
   ⚠️  SECURITY WARNING: Never expose your private key!
   ⚠️  Use environment variables or secure key management systems
   ⚠️  Never commit private keys to version control
   
   $ forge create contracts/MyContract.sol:MyContract \\
       --rpc-url <RPC_URL> \\
       --private-key <PRIVATE_KEY>
   
   Recommended: Use --private-key $PRIVATE_KEY instead of typing it directly

3. MANUAL DEPLOYMENT (Using ethers.js/web3.js)
   See: CONTRACT_DEPLOYMENT_GUIDE.md

OPTIONS:
  --network <name>   Display network-specific information (mainnet, sepolia, base, base-sepolia)
  --help             Show this help message

EXAMPLES:
  node contracts/deploy.js --network sepolia
  node contracts/deploy.js --network base

AFTER DEPLOYMENT:
  1. Note the deployed contract address
  2. Verify on block explorer using: npm run verify (see CONTRACT_VERIFICATION.md)
  3. Fund the contract with ETH for claims
  4. Set Merkle root using setMerkleRoot()
`);
}

// Display network-specific information
function showNetworkInfo(networkName) {
  const network = NETWORKS[networkName];
  
  if (!network) {
    console.error(`Error: Unknown network "${networkName}"`);
    console.error(`Available networks: ${Object.keys(NETWORKS).join(', ')}`);
    process.exit(1);
  }

  console.log(`
Deployment Information for ${network.name}
${'='.repeat(50)}

Network Details:
  Name:      ${network.name}
  Chain ID:  ${network.chainId}
  RPC URL:   ${network.rpcUrl}
  Explorer:  ${network.explorer}
  Currency:  ${network.currency}

Contract Details:
  Name:               MyContract
  File:               contracts/MyContract.sol
  Compiler:           Solidity ^0.8.20
  Owner:              [Hardcoded in contract - see MyContract.sol]
  Authorized Address: [Hardcoded in contract - see MyContract.sol]
  License:            MIT

Deployment Steps:

1. USING REMIX IDE:
   a. Go to https://remix.ethereum.org
   b. Create MyContract.sol and paste the contract code
   c. Go to "Solidity Compiler" tab
   d. Select compiler version 0.8.20
   e. Enable optimization (200 runs)
   f. Click "Compile MyContract.sol"
   g. Go to "Deploy & Run Transactions" tab
   h. Select "Injected Provider - MetaMask" as environment
   i. Ensure MetaMask is connected to ${network.name}
   j. Click "Deploy" (no constructor arguments needed)
   k. Note: Owner and authorized addresses are hardcoded in contract
   l. Confirm transaction in MetaMask
   m. Note the deployed contract address

2. USING FOUNDRY CAST:
   ⚠️  SECURITY WARNINGS:
   • Never type private keys directly in the terminal (they are saved in shell history)
   • Use environment variables: export PRIVATE_KEY="0x..." then use $PRIVATE_KEY
   • Consider using --ledger or --trezor for hardware wallet deployment
   • Never commit private keys to version control
   
   $ forge create contracts/MyContract.sol:MyContract \\
       --rpc-url ${network.rpcUrl} \\
       --private-key $PRIVATE_KEY \\
       --optimize --optimizer-runs 200
   
   Alternative (hardware wallet):
   $ forge create contracts/MyContract.sol:MyContract \\
       --rpc-url ${network.rpcUrl} \\
       --ledger \\
       --optimize --optimizer-runs 200

3. AFTER DEPLOYMENT:
   a. Copy the deployed contract address
   b. Verify the contract:
      $ npm run verify -- \\
          --address <DEPLOYED_ADDRESS> \\
          --source ./contracts/MyContract.sol \\
          --name MyContract \\
          --compiler v0.8.20+commit.a1b79de6 \\
          --network ${networkName} \\
          --optimization 1 \\
          --runs 200
   
   c. View on explorer: ${network.explorer}/address/<DEPLOYED_ADDRESS>
   
   d. Fund the contract:
      - Send ETH to the contract address for claims
   
   e. Set Merkle root (only owner can do this):
      - Call setMerkleRoot(bytes32 _merkleRoot)
      - Must use the owner address specified in the contract
   
   f. Authorized address functions:
      - setValueAuthorized(uint256): Can be called by authorized address
      - setAuthorizedAddress(address): Owner can update authorized address

Gas Estimates (approximate):
  Deployment:    ~1,200,000 gas
  setMerkleRoot: ~45,000 gas
  claim:         ~50,000-80,000 gas (varies with proof size)

Notes:
  - Ensure you have sufficient ${network.currency} for gas fees
  - Test on ${networkName === 'mainnet' || networkName === 'base' ? 'testnet first (sepolia or base-sepolia)' : 'this testnet before mainnet'}
  - ⚠️  SECURITY: Keep your private keys secure - never commit them or share them
  - ⚠️  Use hardware wallets (Ledger/Trezor) for mainnet deployments when possible
  - ⚠️  Store private keys in secure key management systems (not in .env files on servers)
  - Verify contract after deployment for transparency
`);
}

// Main execution
if (args.help) {
  showHelp();
} else if (args.network) {
  showNetworkInfo(args.network);
} else {
  console.log(`
MyContract Deployment Script
============================

For deployment guidance, use:
  node contracts/deploy.js --help
  node contracts/deploy.js --network <network-name>

Available networks: ${Object.keys(NETWORKS).join(', ')}

Quick Start:
  1. Review deployment methods: node contracts/deploy.js --help
  2. Choose a network: node contracts/deploy.js --network sepolia
  3. Deploy using your preferred method (Remix, Foundry, etc.)
  4. Verify the contract: npm run verify -- [options]

Contract Info:
  File:              contracts/MyContract.sol
  Owner:             [Set in contract - see MyContract.sol]
  Authorized Address: [Set in contract - see MyContract.sol]
`);
}
