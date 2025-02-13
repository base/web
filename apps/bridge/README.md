# Base Bridge App

The Base Bridge App is a Next.js application that facilitates asset transfers between Ethereum and Base networks. This bridge interface provides a secure and user-friendly way to move assets across chains.

## ✨ Features

- Cross-chain asset transfers between Ethereum and Base
- Support for multiple networks (Mainnet, Goerli, Sepolia)
- Integration with popular Web3 wallets
- Real-time transaction tracking
- Gas fee estimation

## 🚀 Getting Started

### Prerequisites

- Node.js (version in `.nvmrc`)
- Yarn package manager
- A Web3 wallet (MetaMask, etc.)
- [WalletConnect](https://walletconnect.org/) Project ID

### Installation

1. **Clone and Install Dependencies**
   ```shell
   cd apps/bridge
   yarn install
   ```

2. **Environment Setup**
   ```shell
   # For Goerli testnet
   cp .env.goerli.example .env.local
   # OR for mainnet
   cp .env.mainnet.example .env.local
   # OR for Sepolia testnet
   cp .env.sepolia.example .env.local
   ```

3. **Configure WalletConnect**
   - Create a project at [WalletConnect](https://walletconnect.org/)
   - Add your project ID to `.env.local`:
     ```
     WALLET_CONNECT_PROJECT_ID=your_project_id_here
     ```

4. **Start Development Server**
   ```shell
   cd ../..
   yarn workspace @app/bridge dev
   ```

## 🔧 Configuration

### Environment Variables

The app supports different configurations for various networks:
- `.env.mainnet.example` - Ethereum mainnet configuration
- `.env.goerli.example` - Goerli testnet configuration
- `.env.sepolia.example` - Sepolia testnet configuration

Copy the appropriate example file and configure the following key variables:
- `WALLET_CONNECT_PROJECT_ID` - Your WalletConnect project ID
- `NEXT_PUBLIC_ENABLE_TESTNETS` - Enable/disable testnet support
- Network RPC endpoints and chain IDs

## 🏗 Project Structure

```
apps/bridge/
├── src/           # Source code
│   ├── components/  # React components
│   └── utils/      # Utility functions
├── pages/         # Next.js pages
├── public/        # Static assets
├── chains.ts      # Chain configurations
└── assets.ts      # Asset configurations
```

## 📦 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run linter

## 🔒 Security

- Always verify transaction details before confirming
- Use official RPC endpoints
- Keep your private keys secure
- Never share sensitive information

## 🤝 Contributing

Please read the [Contributing Guidelines](../../CONTRIBUTING.md) before submitting any pull requests.

## 📄 License

This project is licensed under the terms specified in the [LICENSE](../../LICENSE.md) file.

## 🆘 Support

For support and questions about using the Base Bridge, please visit our [Documentation](https://docs.base.org) or join our [Discord community](https://discord.gg/buildonbase).
