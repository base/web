# Security Best Practices for Smart Contract Development

## Overview

This document outlines security best practices for developing, testing, and deploying smart contracts in this repository.

## 🔐 Private Keys and Sensitive Data Protection

### Never Commit Private Keys

**CRITICAL:** Never commit private keys, mnemonics, seed phrases, or any sensitive credentials to version control.

### Protected by .gitignore

The following sensitive file patterns are automatically excluded:

#### Private Keys & Certificates
- `*.pem`, `*.key`, `*.p8`, `*.p12`, `*.pfx`
- `*.id_rsa`, `*.id_ed25519`, `*.id_ecdsa`, `*.ppk`
- `id_rsa`, `id_rsa.pub`, `id_ed25519`, `id_ed25519.pub`, `id_ecdsa`, `id_ecdsa.pub` - Specific SSH key files
- `**/.ssh/id_*` - SSH keys in .ssh directories
- `privatekey*`, `private-key*`
- `*.gpg`, `*.asc`, `*.sig` - GPG keys and signatures
- `*.jks`, `*.truststore`, `truststore.json` - Java keystores
- `known_hosts.local` - Local SSH known hosts

#### Blockchain & Crypto Specific
- `**/mnemonic.*`, `**/seed-phrase.*`
- `wallet-keys*.json`, `wallet-private*.json`
- `*.wallet.json`, `*.wallet.dat`, `*.wallet`
- `**/keystore/`, `**/keystores/`, `*.keystore`, `keystore.json`
- `account-keys*.json`, `private-account*.json`
- `**/accounts.json`, `**/wallets.json`
- `.secret`, `**/.secret-*`, `**/.secrets/`
- `deployment-keys*.json`, `signer-keys*.json`
- `.brownie/`, `brownie-config.local.yaml` - Brownie framework
- `ape-config.local.yaml` - Ape framework
- `**/contracts/.env`, `**/scripts/.env` - Environment files in contract/script directories

#### Development Environment Files
- `.env`, `.env.*`, `.env.*.local` (except `.env.example`)
- `hardhat.config.local.js`, `hardhat.config.local.ts`
- `truffle-config.local.js`
- `foundry.toml.local`

#### API Keys & Credentials
- `credentials.json`, `secrets.json`, `secret.json`
- `*.secret`, `*.secrets`, `*.credentials`
- `api-keys.json`, `api-secrets.json`
- `*-token.json`, `*-tokens.json`, `access-token*.json`
- `oauth-credentials*.json`, `auth.json`, `auth.config.json`
- `service-account*.json`, `gcp-key*.json`
- `.netrc`, `.git-credentials`
- `**/config/secrets.yml`, `**/config/credentials.yml`, `**/config/master.key`
- `jwt-secret*.txt`, `session-secret*.txt`
- `passwords.txt`, `my-password*.txt`, `password-list*.txt`, `**/passwords/` - Password files (specific patterns to avoid false positives)
- `.aws/credentials`, `.aws/config.local` - AWS credentials
- `.gcp/credentials`, `**/.gcloud/` - GCP credentials
- `.azure/credentials`, `.azure/config` - Azure credentials

#### Database & Data Files
- Database files: `*.db`, `*.sqlite`, `*.sql`, `*.dump`, `*.backup`
- Backup files: `*.bak`, `*.old`, `*.orig`, `*.bak.gz` - Backup file extensions
- Database directories: `**/db/backups/`, `pgdata/`, `postgres-data/`
- Data files: `*.dat`, `*.data`, `data/`
- Private data directories: `**/private-data/`, `**/sensitive-data/`, `**/user-data/`, `**/private/`, `**/confidential/`
- Backups and exports: `**/backups/`, `**/exports/`

#### CI/CD & Deployment
- CI configuration: `.circleci/local.yml`, `.travis.local.yml`, `gitlab-ci.local.yml`
- Deploy keys: `**/.deploy-keys/`, `deploy-key*.pem`, `deploy-key*.key`, `deploy-key*.json`, `deployment-config.local.*`
- Ansible vault: `ansible-vault-password*.txt`, `vault-password*.txt`, `**/ansible/vault-pass`
- Docker secrets: `**/secrets/` (covers all secret directories including `.docker/secrets/`, `docker-secrets/`)

#### Test Data
- Private test data: `**/test-data/private/`, `**/fixtures/private/`
- Test credentials: `test-keys*.json`, `test-credentials*.json`, `mock-private-keys*.json`
- Note: Files matching `*.example.*` patterns are allowed for documentation purposes

## 🛡️ Smart Contract Security Best Practices

### 1. Use Latest Stable Solidity Version

For new projects, prefer the latest stable version with built-in security features:

```solidity
// Recommended for new projects
pragma solidity ^0.8.0;
```

For legacy or compatibility requirements, document the reason:

```solidity
// ONLY use older versions when required for compatibility
// Example: Integration with existing 0.4.x contracts
pragma solidity ^0.4.18;
```

**Note:** This repository's Test12345.sol uses ^0.4.18 for demonstration purposes and compatibility with legacy systems. For production smart contracts, always prefer Solidity 0.8.x or later which includes:
- Built-in overflow/underflow protection
- Better error handling with custom errors
- Improved security features

### 2. SPDX License Identifier

Always include an SPDX license identifier at the top of your contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
```

### 3. Access Control

Implement proper access control for sensitive functions:

```solidity
address public owner;
address public pendingOwner;

modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this");
    _;
}

function criticalFunction() public onlyOwner {
    // Protected code
}

// Two-step ownership transfer prevents accidental transfers
function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0), "Invalid address");
    pendingOwner = newOwner;
}

function acceptOwnership() public {
    require(msg.sender == pendingOwner, "Not pending owner");
    owner = pendingOwner;
    pendingOwner = address(0);
}
```

### 4. Input Validation

Always validate inputs to prevent unexpected behavior:

```solidity
function setValue(string _value) public {
    require(bytes(_value).length > 0, "Value cannot be empty");
    require(bytes(_value).length <= 256, "Value too long");
    // Process value
}
```

### 5. Event Emission

Emit events for all state changes for transparency and monitoring:

```solidity
event ValueUpdated(bytes32 indexed valueHash, address indexed updatedBy);

function setValue(string _value) public {
    value = _value;
    // Emit hash for privacy - blockchain data is public and permanent
    // Note: 'emit' keyword requires Solidity 0.4.21+
    // For 0.4.18-0.4.20, omit 'emit': ValueUpdated(keccak256(bytes(_value)), msg.sender);
    emit ValueUpdated(keccak256(bytes(_value)), msg.sender);
}
```

**Important:** Remember that all blockchain data is public and permanent. Consider privacy implications when emitting event data. Use hashes for sensitive information.

### 6. Reentrancy Protection

For functions that make external calls, use reentrancy guards:

```solidity
bool private locked;

modifier nonReentrant() {
    require(!locked, "No reentrancy");
    locked = true;
    _;
    locked = false;
}
```

### 7. Integer Overflow/Underflow

For Solidity < 0.8.0, use SafeMath library. Solidity 0.8.0+ has built-in checks.

### 8. Gas Optimization

- Use `constant` and `immutable` keywords where appropriate
- Pack storage variables efficiently
- Avoid unbounded loops
- Consider gas costs for string operations

### 9. Blockchain Privacy

**Remember:** All blockchain data is public and permanent.

- **Events:** Consider emitting hashes instead of raw sensitive data
- **Storage:** Never store private keys, passwords, or personal data on-chain
- **Function Parameters:** Be aware that all transaction data is visible
- **Privacy Patterns:** Use zero-knowledge proofs or off-chain storage when needed

```solidity
// ❌ BAD: Exposes sensitive data permanently
event UserRegistered(string email, string password);

// ✅ GOOD: Uses hash for privacy
event UserRegistered(bytes32 indexed emailHash, address indexed user);
```

### 10. Two-Step Ownership Transfer

Always implement two-step ownership transfers to prevent accidental loss of control:

```solidity
// Step 1: Current owner initiates transfer
function transferOwnership(address newOwner) public onlyOwner {
    pendingOwner = newOwner;
}

// Step 2: New owner accepts ownership
function acceptOwnership() public {
    require(msg.sender == pendingOwner);
    owner = pendingOwner;
    pendingOwner = address(0);
}
```

## 🔍 Pre-Deployment Checklist

Before deploying any smart contract:

- [ ] All tests pass
- [ ] Code reviewed by at least one other developer
- [ ] Security audit completed (for production contracts)
- [ ] All access controls properly implemented
- [ ] Events emitted for all state changes
- [ ] Input validation on all public/external functions
- [ ] Gas optimization reviewed
- [ ] No hardcoded addresses or private keys
- [ ] Deployment scripts reviewed
- [ ] Documentation updated

## 🌐 Environment Variables

### Required API Keys

Store API keys in `.env.local` (never commit this file):

```bash
# Blockchain explorers
ETHERSCAN_API_KEY=your_etherscan_key_here
BASESCAN_API_KEY=your_basescan_key_here

# For development only - NEVER use real mnemonics
FARCASTER_DEVELOPER_MNEMONIC=test test test test test test test test test test test junk

# Other services
ALCHEMY_API_KEY=your_alchemy_key
WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Creating .env.local

Copy from the example file:

```bash
cp apps/web/.env.local.example apps/web/.env.local
```

Then edit with your actual keys (never commit the .env.local file).

## 🚨 Incident Response

If sensitive data is accidentally committed:

1. **DO NOT** just delete the file and commit
2. Rotate all exposed credentials immediately
3. Use `git filter-branch` or BFG Repo-Cleaner to remove from history
4. Force push after cleaning (coordinate with team)
5. Notify security team
6. Review access logs for any unauthorized usage

### Quick Fix (Not Recommended for Sensitive Data)

```bash
# Remove file from tracking
git rm --cached sensitive-file.key

# Add to .gitignore
echo "sensitive-file.key" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove sensitive file from tracking"

# IMPORTANT: Still visible in history!
```

### Proper Cleanup

```bash
# Install BFG Repo-Cleaner
brew install bfg  # or download from https://rtyley.github.io/bfg-repo-cleaner/

# Remove sensitive file from all history
bfg --delete-files sensitive-file.key

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (DANGEROUS - coordinate with team)
git push --force
```

## 📚 Additional Resources

- [Solidity Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)
- [Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Ethereum Smart Contract Security Best Practices](https://consensys.net/diligence/blog/)
- [SWC Registry - Smart Contract Weakness Classification](https://swcregistry.io/)

## 🔗 Tools

### Static Analysis
- [Slither](https://github.com/crytic/slither) - Static analyzer
- [Mythril](https://github.com/ConsenSys/mythril) - Security analysis tool
- [Securify](https://securify.chainsecurity.com/) - Online security scanner

### Testing
- [Hardhat](https://hardhat.org/) - Development environment
- [Foundry](https://book.getfoundry.sh/) - Fast development framework
- [Truffle](https://trufflesuite.com/) - Development suite

### Auditing
- [Trail of Bits](https://www.trailofbits.com/)
- [OpenZeppelin](https://www.openzeppelin.com/security-audits)
- [ConsenSys Diligence](https://consensys.net/diligence/)

## 📝 Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Contact the repository maintainers privately through GitHub Security Advisories
3. For critical issues, also email the repository owner directly
4. Include detailed information about the vulnerability
5. Allow reasonable time for the issue to be addressed
6. Follow responsible disclosure practices

**GitHub Security Advisory:** Navigate to the repository's Security tab and click "Report a vulnerability"

For more information on responsible disclosure, see [GitHub's guide on coordinated disclosure](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability).

## ✅ Summary

**Remember:**
- 🔒 Never commit private keys or secrets
- 📋 Use .env.local for sensitive configuration
- ✨ Follow smart contract best practices
- 🔍 Review code before deployment
- 📢 Emit events for transparency
- 🛡️ Implement access controls
- ✅ Validate all inputs
- 🧪 Test thoroughly

**When in doubt, ask for a security review!**
