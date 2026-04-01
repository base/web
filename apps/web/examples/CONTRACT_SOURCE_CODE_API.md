# Contract Source Code API

This feature adds support for fetching verified contract source code from blockchain explorers (Etherscan and Basescan).

## Overview

The proxy API route has been extended to support retrieving contract source code verification data from Etherscan-compatible APIs. This allows you to fetch:

- Smart contract source code
- Contract ABI (Application Binary Interface)
- Compiler version and settings
- Verification metadata (license, optimization, etc.)

## API Endpoints

### Fetch from Etherscan (Ethereum Mainnet)

```
GET /api/proxy?apiType=etherscan-sourcecode&address={contractAddress}
```

### Fetch from Basescan (Base Mainnet)

```
GET /api/proxy?apiType=basescan-sourcecode&address={contractAddress}
```

## Parameters

- `apiType`: Must be either `etherscan-sourcecode` or `basescan-sourcecode`
- `address`: The Ethereum address of the verified contract (must be a valid Ethereum address)

## Response Format

The API returns data in the Etherscan API format:

```typescript
{
  status: "1",              // "1" for success, "0" for error
  message: "OK",            // Status message
  result: [
    {
      SourceCode: string,          // The Solidity source code
      ABI: string,                 // JSON string of the contract ABI
      ContractName: string,        // Name of the contract
      CompilerVersion: string,     // Solidity compiler version used
      CompilerType: string,        // Compiler type (e.g., "solc")
      OptimizationUsed: string,    // "1" if optimization was used, "0" otherwise
      Runs: string,                // Number of optimization runs
      ConstructorArguments: string,// Constructor arguments if any
      EVMVersion: string,          // EVM version used
      Library: string,             // External libraries used
      ContractFileName: string,    // Original contract file name
      LicenseType: string,         // License type (e.g., "MIT", "None")
      Proxy: string,               // "1" if it's a proxy contract
      Implementation: string,      // Implementation address if proxy
      SwarmSource: string,         // Swarm hash
      SimilarMatch: string         // Similar contract address if found
    }
  ]
}
```

## Example Usage

See `examples/contract-source-code-api.ts` for a complete example.

### Basic Usage

```typescript
import { ContractSourceCodeResponse } from '../src/types/ContractSourceCode';

async function getContractSource(address: string) {
  const response = await fetch(
    `/api/proxy?apiType=basescan-sourcecode&address=${address}`
  );
  const data = await response.json();
  const contractData = data.data as ContractSourceCodeResponse;
  
  if (contractData.status === '1' && contractData.result.length > 0) {
    const contract = contractData.result[0];
    console.log('Contract:', contract.ContractName);
    console.log('Source:', contract.SourceCode);
    console.log('ABI:', JSON.parse(contract.ABI));
  }
}
```

## Test Contract Example

The implementation was tested with the Test12345 contract (available in `Test12345.sol`). The contract demonstrates best practices including:

- SPDX license identifier
- Owner-based access control
- Event emission for state changes
- Input validation
- Two-step ownership transfer pattern for safety
- Privacy-preserving event emission (hashes instead of raw data)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.4.18;

contract Test12345 {
    address public owner;
    address public pendingOwner;
    string public test;
    
    // Events for transparency and auditability
    event ValueUpdated(bytes32 indexed valueHash, address indexed updatedBy);
    event OwnershipTransferInitiated(address indexed currentOwner, address indexed pendingOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferCancelled(address indexed owner, address indexed cancelledPendingOwner);
    
    function Test12345() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyPendingOwner() {
        require(msg.sender == pendingOwner, "Only pending owner can call this function");
        _;
    }
    
    function enterValue(string _c) public onlyOwner {
        require(bytes(_c).length > 0, "Value cannot be empty");
        require(bytes(_c).length <= 256, "Value too long");
        test = _c;
        emit ValueUpdated(keccak256(bytes(_c)), msg.sender);
    }
    
    // Two-step ownership transfer for safety
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        require(newOwner != owner, "Already the owner");
        pendingOwner = newOwner;
        emit OwnershipTransferInitiated(owner, newOwner);
    }
    
    function acceptOwnership() public onlyPendingOwner {
        address previousOwner = owner;
        owner = pendingOwner;
        pendingOwner = address(0);
        emit OwnershipTransferred(previousOwner, owner);
    }
    
    function cancelOwnershipTransfer() public onlyOwner {
        require(pendingOwner != address(0), "No pending transfer");
        address cancelled = pendingOwner;
        pendingOwner = address(0);
        emit OwnershipTransferCancelled(owner, cancelled);
    }
}
```

## Environment Variables

⚠️ **Security Note:** Never commit API keys or private keys to version control. Always use environment variables.

The API requires the `ETHERSCAN_API_KEY` environment variable to be set. This key is used for both Etherscan and Basescan API calls.

### Setup

1. Copy the example environment file:
   ```bash
   cp apps/web/.env.local.example apps/web/.env.local
   ```

2. Add your API key to `.env.local`:
   ```bash
   ETHERSCAN_API_KEY=your_api_key_here
   ```

3. The `.env.local` file is already included in `.gitignore` and will not be committed.

## Type Safety

TypeScript types are provided in `src/types/ContractSourceCode.ts` for type-safe usage of the API response.

## Use Cases

- Display verified contract source code on a contract details page
- Verify contract bytecode matches source code
- Extract contract ABI for interaction
- Check contract verification status
- Compare implementations of similar contracts
