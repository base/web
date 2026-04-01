# Smart Contract Examples

This directory contains example smart contracts and API integration code demonstrating best practices for blockchain development.

## 📁 Contents

### Smart Contracts

- **Test12345.sol** - Example Solidity contract demonstrating security best practices
  - Owner-based access control
  - Event emission for transparency
  - Input validation
  - SPDX license identifier
  - Compatible with Solidity ^0.4.18

### API Integration Examples

- **contract-source-code-api.ts** - TypeScript example for fetching verified contract source code
- **CONTRACT_SOURCE_CODE_API.md** - Full documentation for the contract source code API

### Security Documentation

- **SECURITY.md** - Comprehensive security best practices guide
  - Private key protection
  - Smart contract security patterns
  - Environment variable management
  - Pre-deployment checklist

## 🚀 Quick Start

### Using the Contract Source Code API

```typescript
import { ContractSourceCodeResponse } from '../src/types/ContractSourceCode';

async function getContractSource(address: string) {
  const response = await fetch(
    `/api/proxy?apiType=basescan-sourcecode&address=${address}`
  );
  const data = await response.json();
  return data.data as ContractSourceCodeResponse;
}
```

### Deploying the Example Contract

1. **Review security best practices:**
   ```bash
   cat SECURITY.md
   ```

2. **Set up environment variables:**
   ```bash
   cp ../../../.env.local.example ../.env.local
   # Edit .env.local with your API keys
   ```

3. **Never commit private keys:**
   - All sensitive files are already in `.gitignore`
   - Use environment variables for configuration
   - Review the security checklist before deployment

## 🔐 Security First

**Before deploying any contract:**

1. ✅ Review [SECURITY.md](./SECURITY.md)
2. ✅ Verify no private keys in code
3. ✅ Check all API keys are in `.env.local`
4. ✅ Run security analysis tools
5. ✅ Complete pre-deployment checklist
6. ✅ Get code reviewed

## 📚 Documentation

- [Contract Source Code API](./CONTRACT_SOURCE_CODE_API.md) - API documentation
- [Security Best Practices](./SECURITY.md) - Security guidelines
- [Repository README](../../../README.md) - Main project documentation

## 🛡️ Protected Files

The `.gitignore` automatically protects:

- Private keys (`*.key`, `*.pem`, etc.)
- Mnemonics and seed phrases
- Wallet files
- Environment variables (`.env.local`)
- API credentials
- All blockchain-specific sensitive data

See [SECURITY.md](./SECURITY.md) for the complete list.

## 🤝 Contributing

When adding examples:

1. Follow security best practices
2. Include comprehensive documentation
3. Add appropriate error handling
4. Use TypeScript types where applicable
5. Never commit sensitive data

## ⚠️ Disclaimer

These examples are for educational purposes. Always:

- Audit code before production use
- Use appropriate security measures
- Test thoroughly on testnets first
- Follow industry best practices
- Consider professional security audits for production contracts

## 📞 Questions?

- Review the [SECURITY.md](./SECURITY.md) guide
- Check the [CONTRACT_SOURCE_CODE_API.md](./CONTRACT_SOURCE_CODE_API.md) documentation
- Open an issue in the repository
