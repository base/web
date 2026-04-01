# Contract Deployment Quick Start

This guide provides quick commands to deploy MyContract.sol.

## Quick Commands

```bash
# Get deployment help
npm run deploy -- --help

# Get network-specific deployment info
npm run deploy -- --network base-sepolia
npm run deploy -- --network sepolia
npm run deploy -- --network base
npm run deploy -- --network mainnet
```

## Recommended: Deploy with Remix IDE

1. Visit https://remix.ethereum.org
2. Create `MyContract.sol` and copy contract code from `contracts/MyContract.sol`
3. Compile with Solidity 0.8.20 (enable optimization, 200 runs)
4. Deploy using "Injected Provider - MetaMask"
5. No constructor arguments needed
6. Deployed! Save the contract address

## Verify After Deployment

```bash
npm run verify -- \
    --address <DEPLOYED_ADDRESS> \
    --source ./contracts/MyContract.sol \
    --name MyContract \
    --compiler v0.8.20+commit.a1b79de6 \
    --network <network-name> \
    --optimization 1 \
    --runs 200
```

## Complete Documentation

- **Full Deployment Guide**: [CONTRACT_DEPLOYMENT_GUIDE.md](CONTRACT_DEPLOYMENT_GUIDE.md)
- **Verification Guide**: [CONTRACT_VERIFICATION.md](CONTRACT_VERIFICATION.md)
- **Contract Testing**: [contracts/MyContract.test.md](contracts/MyContract.test.md)
- **Implementation Details**: [IMPLEMENTATION_MERKLE_CLAIM.md](IMPLEMENTATION_MERKLE_CLAIM.md)

## Contract Info

- **File**: `contracts/MyContract.sol`
- **Owner**: `0x0540e1dA908D032D2F74D50C06397cB5f2cbfDdB` (kushmanmb.eth / yaketh.eth)
- **Solidity**: ^0.8.20
- **Features**: Merkle proof-based claim system with reentrancy protection

## Post-Deployment Checklist

- [ ] Contract deployed and address saved
- [ ] Contract verified on block explorer
- [ ] Contract funded with ETH for claims
- [ ] Merkle root set using `setMerkleRoot()`
- [ ] Proofs generated and distributed to users
- [ ] Claiming instructions provided to users
