# MyContract Claim Function Test Guide

This document provides test scenarios and examples for the `claim` function with Merkle proof verification.

## Function Signature

```solidity
function claim(address account, uint256 totalAmount, bytes32[] calldata proof) public onlyOwner
```

## Test Scenarios

### 1. Valid Claim Test

**Setup:**
- Deploy contract
- Set merkle root using `setMerkleRoot()`
- Fund contract with ETH
- Generate valid Merkle proof for account and amount

**Expected Behavior:**
- Merkle proof is verified successfully
- Amount is transferred to account
- `hasClaimed[account]` is set to `true`
- `Claimed` event is emitted

### 2. Invalid Proof Test

**Setup:**
- Deploy contract
- Set merkle root
- Fund contract with ETH
- Use invalid/wrong Merkle proof

**Expected Behavior:**
- Transaction reverts with "Invalid proof"

### 3. Duplicate Claim Prevention Test

**Setup:**
- Deploy contract
- Set merkle root
- Fund contract with ETH
- Successfully claim once

**Action:**
- Attempt to claim again with same account

**Expected Behavior:**
- Second transaction reverts with "Already claimed"

### 4. Zero Amount Test

**Setup:**
- Deploy contract
- Set merkle root

**Action:**
- Try to claim with amount = 0

**Expected Behavior:**
- Transaction reverts with "Amount must be greater than 0"

### 5. Invalid Account Address Test

**Setup:**
- Deploy contract
- Set merkle root

**Action:**
- Try to claim with address(0)

**Expected Behavior:**
- Transaction reverts with "Invalid account address"

### 6. Merkle Root Not Set Test

**Setup:**
- Deploy contract (merkle root not set)

**Action:**
- Try to claim

**Expected Behavior:**
- Transaction reverts with "Merkle root not set"

### 7. Insufficient Balance Test

**Setup:**
- Deploy contract
- Set merkle root
- Don't fund contract or fund with insufficient amount

**Action:**
- Try to claim amount greater than contract balance

**Expected Behavior:**
- Transaction reverts with "Insufficient contract balance"

## Example Merkle Tree Construction

```javascript
// Example using ethers.js v6 and merkletreejs

const { MerkleTree } = require('merkletreejs');
const { ethers } = require('ethers');

// Define eligible accounts and amounts
const claims = [
  { account: '0x1111111111111111111111111111111111111111', amount: '1000000000000000000' }, // 1 ETH
  { account: '0x2222222222222222222222222222222222222222', amount: '2000000000000000000' }, // 2 ETH
  { account: '0x3333333333333333333333333333333333333333', amount: '500000000000000000' },  // 0.5 ETH
];

// Create leaf nodes - MUST match the Solidity implementation:
// bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, totalAmount))));
const leaves = claims.map(claim => {
  // First encode account and amount
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
    ['address', 'uint256'], 
    [claim.account, claim.amount]
  );
  // Hash the encoded data
  const firstHash = ethers.keccak256(encoded);
  // Hash again (double hashing)
  const leaf = ethers.keccak256(firstHash);
  return leaf;
});

// Create Merkle tree with sorted pairs (matching Solidity's _hashPair logic)
const tree = new MerkleTree(leaves, ethers.keccak256, { sortPairs: true });

// Get root
const root = tree.getHexRoot();

// Get proof for a specific claim
const leaf = leaves[0]; // For first account
const proof = tree.getHexProof(leaf);

console.log('Merkle Root:', root);
console.log('Proof:', proof);

// Verify proof off-chain
const isValid = tree.verify(proof, leaf, root);
console.log('Proof is valid:', isValid);
```

### Alternative: Helper function for leaf generation

```javascript
function generateLeaf(account, amount) {
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
    ['address', 'uint256'], 
    [account, amount]
  );
  const firstHash = ethers.keccak256(encoded);
  return ethers.keccak256(firstHash);
}

// Usage
const leaf = generateLeaf('0x1111111111111111111111111111111111111111', '1000000000000000000');
```

## Integration Example

```javascript
// 1. Deploy contract
const MyContract = await ethers.getContractFactory("MyContract");
const contract = await MyContract.deploy();

// 2. Set merkle root
await contract.setMerkleRoot(root);

// 3. Fund contract
await owner.sendTransaction({
  to: contract.address,
  value: ethers.parseEther("10.0")
});

// 4. Claim with valid proof
const account = '0x1111111111111111111111111111111111111111';
const amount = ethers.parseEther("1.0");
await contract.claim(account, amount, proof);

// 5. Verify claim was successful
const hasClaimed = await contract.hasClaimed(account);
assert(hasClaimed === true);
```

## Gas Optimization Notes

The implementation includes several gas optimizations:

1. **calldata for proof**: Using `calldata` instead of `memory` for the proof array saves gas
2. **Early validation**: Checks are ordered to fail fast on common errors
3. **Efficient hashing**: Uses sorted pair hashing to match standard Merkle tree implementations
4. **Minimal storage**: Only stores necessary state (merkleRoot and hasClaimed mapping)

## Security Considerations

1. **Reentrancy Protection**: The function follows checks-effects-interactions pattern. The `hasClaimed` state is updated before the external call, preventing reentrancy attacks.
2. **Double-claim Prevention**: Uses `hasClaimed` mapping to prevent duplicate claims
3. **Input Validation**: Validates all inputs before processing
4. **Merkle Proof Verification**: Uses standard sorted-pair hashing for proof verification
5. **Access Control**: Only owner can set merkle root, withdraw funds, and trigger claims
6. **ETH Transfer Method**: Uses `call` instead of `transfer()` or `send()` for ETH transfers. This is the modern Solidity best practice as `transfer()` has a 2300 gas limit which can break with future EVM changes. The checks-effects-interactions pattern protects against reentrancy.

## Important Design Notes

### Third-Party Claiming
The `claim()` function is restricted to the owner (`onlyOwner`). Only the contract owner can trigger claims on behalf of eligible accounts.

## Related Functions

- `setMerkleRoot(bytes32)`: Sets the Merkle root (owner only)
- `hasClaimed(address)`: Checks if an address has already claimed
- `withdraw(uint256)`: Allows owner to withdraw remaining funds
- `receive()`: Allows contract to receive ETH
