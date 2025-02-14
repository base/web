---
title: Building Onchain
slug: /building-onchain
description: 'Learn how to get started building on Base'
keywords:
  [
    Base,
    Ethereum L2,
    Coinbase,
    onchain economy,
    builder grants,
    cryptoeconomy,
    EVM,
    blockchain,
    OP Stack,
    Optimism,
    decentralized apps,
    AI,
    onchain,
    kits,
    Onchainkit,
    how to build,
  ]
hide_table_of_contents: true
---

## Building on Base Overview

Building on Base means creating applications that read and write to the Base network. While Base powers the onchain logic of an application, frontends and traditional backends need reliable ways to interact with the chain.

If you’re familiar with a typical Web2 stack such as [MERN](https://www.mongodb.com/resources/languages/mern-stack), you might build a CRUD application by storing and querying data in MongoDB. The onchain stack replaces the database with the blockchain (Base), using libraries like [Viem](https://viem.sh/) to interact with onchain smart contracts from your React frontend. Instead of sending REST calls to create, read, update, or delete records in Mongo, your app sends requests and transactions to Base. To learn more about why adding Base to your tech stack is valuable, read our [Why Base](/docs/why-base) article.

Below are key components of onchain development on Base, as well as various tools (Kits) to help you get started quickly. Think of the chain as a new piece of infrastructure in your existing stack—much like a globally shared database—which can enhance functionality (e.g., displaying a user’s token balances or processing a payment).

### Kits

Kits are designed to solve specific problems for onchain development, letting you focus on building your app’s logic instead of worrying about low-level details.

- **OnchainKit**  
  Frontend clients and user interfaces require smooth, intuitive ways to interact with onchain smart contracts.  
  OnchainKit streamlines the connection between the frontend (browsers, mobile devices) and any smart contract deployed on Base. It reduces complexity so you can quickly build functional UIs that communicate with Base.

  Get started with [OnchainKit].

- **AgentKit**  
   [AgentKit] makes it easy to get started building AI Agents with onchain capabilities, bridging AI (LLMs) and crypto. Quickly deploy AI Agents that have wallets, can create tokens, execute transfers, perform token swaps, and generally carry out any task on Base.

  Read more about [building with AgentKit] provided by [Coinbase Developer Platform].

### Identity

Identity on Base consists of onchain solutions that allow for more readable addresses, trust, and advanced permissioning.

- **Basenames**  
  Wallet addresses are unreadable, creating confusion and the risk of errors when sending or receiving funds. Basenames function like DNS for IP addresses. You can send and receive tokens to human-readable names instead of "0x" addresses. Basenames are onchain and secure, and gas fees for name registration can be subsidized or fully covered.

  Learn more about [Basenames] and [register your name] today.

- **Onchain Verifications**  
   Coinbase provides onchain attestations and verifications, allowing applications to gate or grant privileges based on attestations rather than exposing private data. Verified wallets have access to special onchain experiences, rebates on gas, and access to exclusive services.

  Onchain Verifications give users a way to prove they have a valid Coinbase account or confirm their country of residence, all onchain, enabling more trust-based interactions in your app.

  [Verify a wallet] to get special privileges.

### Smart Wallets

Traditional seed-phrase wallets (EOAs) are tricky to manage. A lost seed phrase means permanently lost access to your funds. With smart wallets, users have simpler recovery processes, flexible security options, and can even delegate gas fees. Developers can provide better user experiences by eliminating many friction points of standard wallets as Smart Wallets require no extension or additional applications and are tied to a user's biometrics or security key. Smart Wallets will be the wallet of choice for novice users.

Learn more about integrating [Smart Wallets] and create one for yourself [here].

### Onramps/Funding

Moving from a local currency to crypto can be intimidating and challenging. Users need a straightforward way to get funds onchain so they can interact with onchain apps more intimately. Base offers multiple onramp options, including [MagicSpend] and [CDP Onramp]. This greatly simplifies getting started with real transactions and interacting with onchain apps. There are also components like the OnchainKit [FundButton Component](https://onchainkit.xyz/fund/fund-button) that allow developers to make funding easier for users of their application.

### Chain

Base includes specific features that improve user and developer experiences.

- **Paymaster**  
  Gas fees can deter new users from trying onchain apps by requiring them to have "gas" in their wallet to transact onchain. Paymaster makes this a thing of the past by allowing developers to sponsor transaction fees so that users don’t need gas to engage. This dramatically simplifies onboarding and expands your potential audience.

Paymasters also enable app’s users to pay for gas with tokens beyond ETH, like USDC or custom tokens, streamlining the user experience and making it easier to get onchain.

Paymaster is offered through the Coinbase Developer Platform. [Sign up for a CDP account] and view the [documentation](https://docs.cdp.coinbase.com/paymaster/docs/welcome).

- **Node**  
  You need an RPC endpoint for reading and writing to the chain. Base provides a free, high-throughput node with great uptime. Developers can query chain data (balances, transactions, blocks) and push new transactions easily using the same [Ethereum JSON RP-API methods].

  Network information for Base Mainnet and Testnet can be found on the network information page. For a Node with higher throughput than the free RPC checkout the [Base Node](https://portal.cdp.coinbase.com/products/node) from CDP.

### Building Onchain

At a high level, building onchain involves:

1. Reading from “the chain” via a block explorer or an RPC node.
2. Using a wallet (EOA or smart wallet) if you plan to send transactions or deploy contracts.
3. Funding that wallet through onramps so you can pay for transaction fees (if you’re not using a Paymaster).
4. Interacting with the chain in your front-end or back-end using Kits or other tools.

## What You'll Need to Get Started

1. **A Node / RPC Endpoint**  
   You can use the free Base provided node to query the chain for account balances, transaction details, and more. Most onchain SDKs will need an RPC endpoint to connect to Base.

   Sign up for CDP and get your free Base RPC Node.

2. **A Wallet**

   - **Externally Owned Accounts (EOAs)** are the classic wallet type secured by a private key. Use them if you want to deploy contracts.
   - **Smart Wallets** don’t have seed phrases and are programmable, making them easier to recover and more user-friendly. They’re ideal for onboarding new users.

3. **Funding (Onramps)**  
   Tools like [CDP Onramp] or [MagicSpend] let you or your users add funds to the wallet. This is essential for paying transaction costs unless you use a Paymaster solution.

4. **Your Preferred Frontend Framework**  
   For quickly building user-facing apps, check out [OnchainKit]. It uses libraries like [Viem] and [wagmi] under the hood to simplify interactions with Base.

## Client-side Development

If you’re focusing on the front end or building a user interface, Kits like OnchainKit provide an opinionated, model-agnostic setup for handling user authentication, contract interactions, and transaction status updates. With a client-side approach:

1. **Set up an RPC endpoint** to read chain data.
2. **Use OnchainKit** (or an equivalent framework) to handle function calls, sign messages, or sponsor gas if you’ve integrated Paymaster solutions.
3. **Incorporate Identity Solutions** like Basenames or Onchain Profiles for more user-friendly experiences.

**Check out these guides to quicky build Onchain Apps**:

- [Build an eCommerce Store with OnchainKit](https://docs.base.org/tutorials/coinbase-commerce-onchainkit-checkout/)
- [Base Learn: Onchain App Development](https://docs.base.org/base-learn/docs/frontend-setup/overview)
- [OnchainKit NFT App Template](https://ock-mint.vercel.app/)
- [AgentKit Quickstart](https://docs.cdp.coinbase.com/agentkit/docs/quickstart)
- [Add Frames to a Basename](https://docs.base.org/tutorials/add-frames-to-basename/)
- [Create a Basename Profile Component](https://docs.base.org/tutorials/create-basename-profile-component/)

## Smart Contract Development

Base is an EVM-equivalent chain, so you can build or reuse your smart contracts written in Solidity. Typical steps include:

1. **Choose a development environment** such as Hardhat or Foundry.
2. **Write and compile your contracts** in Solidity.
3. **Deploy to Base** using your EOA wallet (or specialized deployment tooling).
4. **Test locally** or on a testnet before pushing to mainnet.

Smart wallets, Paymaster services, and other infrastructure components on Base can significantly streamline the user experience around your onchain programs.

**Check out these guides to jump start your Smart Contract Development**:

- [Quickstart: Deploy on Base](https://docs.base.org/docs/quickstart)
- [Foundry Tutorial](https://docs.base.org/tutorials/deploy-with-foundry/)
- [Base Learn: Development with HardHat](https://docs.base.org/base-learn/docs/hardhat-setup-overview/hardhat-overview-vid)
- [Base Learn: Development with Foundry](https://docs.base.org/tutorials/intro-to-foundry-setup/)
- [Verify a Smart Contract using Basescan API](https://docs.base.org/tutorials/verify-smart-contract-using-basescan/)

## Developer Environments

Base offers multiple environments to help you iterate quickly:

- **Mainnet**: Production environment, where real-value transactions occur.
- **Testnets (e.g., Base testnet on Sepolia)**: Great for QA or staging.
- **Local Development**: You can run a local EVM environment with Hardhat or similar tools to test your contracts before deploying.

## Getting Support

Since Base is EVM-compatible, many issues or tutorials from the broader Ethereum ecosystem may also apply.

For questions about building on Base specifically, check out:

- **Base Documentation & Guides**:
  - [Base docs](https://docs.base.org/)
  - [CDP Docs](https://docs.cdp.coinbase.com/)
  - [Base Learn](https://docs.base.org/base-learn/docs/welcome/)
- **Community Channels**:
  - [Discord](https://discord.com/invite/buildonbase)
  - [OP Docs](https://docs.optimism.io/)

## Next Steps

You’re now ready to take the next leap and start building on Base. Whether you’re creating a small onchain app, a large-scale decentralized platform, or bridging AI with crypto via AgentKit, the Base ecosystem has the tooling and infrastructure to support your vision.

Check out the following links to continue your journey:

- [MagicSpend][MagicSpend]
- [CDP Onramp][CDP Onramp]
- [OnchainKit][OnchainKit]
- [Viem][Viem]
- [wagmi][wagmi]

Good luck, and happy building on Base!

[MagicSpend]: https://www.smartwallet.dev/guides/magic-spend
[CDP Onramp]: https://docs.cdp.coinbase.com/onramp/docs/getting-started
[OnchainKit]: https://onchainkit.xyz/
[Viem]: https://viem.sh
[wagmi]: https://wagmi.sh/react/getting-started
[Verify a wallet]: https://www.coinbase.com/onchain-verify
[Sign up for a CDP account]: https://cdp.coinbase.com/create-account
[Ethereum JSON RP-API methods]: https://ethereum.org/en/developers/docs/apis/json-rpc/
[AgentKit]: https://www.coinbase.com/developer-platform/discover/launches/introducing-agentkit
[building with AgentKit]: https://docs.cdp.coinbase.com/agentkit/docs/welcome
[Coinbase Developer Platform]: https://portal.cloud.coinbase.com/
[Basenames]: https://docs.base.org/docs/tools/basenames-faq/
[register your name]: https://www.base.org/names
[Smart Wallets]: https://www.smartwallet.dev/
[here]: http://wallet.coinbase.com/smart-wallet
