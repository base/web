---
title: Deploying a smart contract using Hardhat
slug: /deploy-with-hardhat
description: "A tutorial that teaches how to deploy a smart contract on the Base test network using Hardhat. Includes instructions for setting up the environment, compiling, and deploying the smart contract."
author: taycaldwell
---

This section will guide you through deploying an NFT smart contract (ERC-721) on the Base test network using [Hardhat](https://hardhat.org/).

Hardhat is a developer tool that provides a simple way to deploy, test, and debug smart contracts.



## Objectives

By the end of this tutorial, you should be able to do the following:

- Setup Hardhat for Base
- Create an NFT smart contract for Base
- Compile a smart contract for Base
- Deploy a smart contract to Base
- Interact with a smart contract deployed on Base



## Prerequisites

### Node v18+

This tutorial requires you have Node version 18+ installed.

- Download [Node v18+](https://nodejs.org/en/download/)

If you are using `nvm` to manage your node versions, you can just run `nvm install 18`.

### Coinbase Wallet

In order to deploy a smart contract, you will first need a web3 wallet. You can create a wallet by downloading the Coinbase Wallet browser extension.

- Download [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)

### Wallet funds

Deploying contracts to the blockchain requires a gas fee. Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this tutorial, you will be deploying a contract to the Base Sepolia test network. You can fund your wallet with Base Sepolia ETH using one of the faucets listed on the Base [Network Faucets](https://docs.base.org/tools/network-faucets) page.



## Creating a project

Before you can begin deploying smart contracts to Base, you need to set up your development environment by creating a Node.js project.

To create a new Node.js project, run:

```bash
npm init --y
```

Next, you will need to install Hardhat and create a new Hardhat project

To install Hardhat, run:

```bash
npm install --save-dev hardhat
```

To create a new Hardhat project, run:

```bash
npx hardhat init
```

Select `Create a TypeScript project` then press _enter_ to confirm the project root.

Select `y` for both adding a `.gitignore` and loading the sample project. It will take a moment for the project setup process to complete.



## Configuring Hardhat with Base

In order to deploy smart contracts to the Base network, you will need to configure your Hardhat project and add the Base network.

To configure Hardhat to use Base, add Base as a network to your project's `hardhat.config.ts` file:

```tsx
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.23',
  },
  networks: {
    // for mainnet
    'base-mainnet': {
      url: 'https://mainnet.base.org',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
    },
    // for testnet
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
    },
    // for local dev environment
    'base-local': {
      url: 'http://localhost:8545',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
    },
  },
  defaultNetwork: 'hardhat',
};

export default config;
```

### Install Hardhat toolbox

The above configuration uses the `@nomicfoundation/hardhat-toolbox` plugin to bundle all the commonly used packages and Hardhat plugins recommended to start developing with Hardhat.

To install `@nomicfoundation/hardhat-toolbox`, run:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

### Loading environment variables

The above configuration also uses [dotenv](https://www.npmjs.com/package/dotenv) to load the `WALLET_KEY` environment variable from a `.env` file to `process.env.WALLET_KEY`. You should use a similar method to avoid hardcoding your private keys within your source code.

To install `dotenv`, run:

```bash
npm install --save-dev dotenv
```

Once you have `dotenv` installed, you can create a `.env` file with the following content:

```
WALLET_KEY="<YOUR_PRIVATE_KEY>"
```

Substituting `<YOUR_PRIVATE_KEY>` with the private key for your wallet.

:::caution

`WALLET_KEY` is the private key of the wallet to use when deploying a contract. For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key). **It is critical that you do NOT commit this to a public repo**

:::

### Local Networks

You can run the Base network locally, and deploy using it. If this is what you are looking to do, see the [repo containing the relevant Docker builds](https://github.com/base-org/node).

It will take a **very** long time for your node to sync with the network. If you get errors that the `nonce has already been used` when trying to deploy, you aren't synced yet.

For quick testing, such as if you want to add unit tests to the below NFT contract, you may wish to leave the `defaultNetwork` as `'hardhat'`.



## Compiling the smart contract

Below is a simple NFT smart contract (ERC-721) written in the Solidity programming language:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public currentTokenId;

    constructor() ERC721("NFT Name", "NFT") {}

    function mint(address recipient) public payable returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

The Solidity code above defines a smart contract named `NFT`. The code uses the `ERC721` interface provided by the [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/) to create an NFT smart contract. OpenZeppelin allows developers to leverage battle-tested smart contract implementations that adhere to official ERC standards.

To add the OpenZeppelin Contracts library to your project, run:

```bash
npm install --save @openzeppelin/contracts
```

In your project, delete the `contracts/Lock.sol` contract that was generated with the project and add the above code in a new file called `contracts/NFT.sol`. (You can also delete the `test/Lock.ts` test file, but you should add your own tests ASAP!).

To compile the contract using Hardhat, run:

```bash
npx hardhat compile
```



## Deploying the smart contract

Once your contract has been successfully compiled, you can deploy the contract to the Base Sepolia test network.

To deploy the contract to the Base Sepolia test network, you'll need to modify the `scripts/deploy.ts` in your project:

```tsx
import { ethers } from 'hardhat';

async function main() {
  const nft = await ethers.deployContract('NFT');

  await nft.waitForDeployment();

  console.log('NFT Contract Deployed at ' + nft.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

You'll also need testnet ETH in your wallet. See the [prerequisites](#prerequisites) if you haven't done that yet. Otherwise, the deployment attempt will fail.

Finally, run:

```bash
npx hardhat run scripts/deploy.ts --network base-sepolia
```

The contract will be deployed on the Base Sepolia test network. You can view the deployment status and contract by using a [block explorer](/chain/block-explorers) and searching for the address returned by your deploy script. If you've deployed an exact copy of the NFT contract above, it will already be verified and you'll be able to read and write to the contract using the web interface.

:::info

If you'd like to deploy to mainnet, you'll modify the command like so:

```bash
npx hardhat run scripts/deploy.ts --network base-mainnet
```

:::

Regardless of the network you're deploying to, if you're deploying a new or modified contract, you'll need to verify it first.



## Verifying the Smart Contract

If you want to interact with your contract on the block explorer, you, or someone, needs to verify it first. The above contract has already been verified, so you should be able to view your version on a block explorer already. For the remainder of this tutorial, we'll walk through how to verify your contract on Base Sepolia testnet.

In `hardhat.config.ts`, configure Base Sepolia as a custom network. Add the following to your `HardhatUserConfig`:


```tsx
etherscan: {
   apiKey: {
    "base-sepolia": "PLACEHOLDER_STRING"
   },
   customChains: [
     {
       network: "base-sepolia",
       chainId: 84532,
       urls: {
        apiURL: "https://api-sepolia.basescan.org/api",
        browserURL: "https://sepolia.basescan.org"
       }
     }
   ]
 },
```

:::info

You can get your Basescan API key from [basescan.org](https://basescan.org/myapikey) when you sign up for an account.

:::

</TabItem>
<TabItem value="blockscout" label="Blockscout">

```tsx
// Hardhat expects etherscan here, even if you're using Blockscout.
etherscan: {
   apiKey: {
    "base-sepolia": process.env.BLOCKSCOUT_KEY as string
   },
   customChains: [
     {
       network: "base-sepolia",
       chainId: 84532,
       urls: {
        apiURL: "https://base-sepolia.blockscout.com/api",
        browserURL: "https://base-sepolia.blockscout.com"
       }
     }
   ]
 },
```

:::info

You can get your Blockscout API key from [here](https://base-sepolia.blockscout.com/account/api_key) after you sign up for an account.

:::



Now, you can verify your contract. Grab the deployed address and run:

```bash
npx hardhat verify --network base-sepolia <deployed address>
```

You should see an output similar to:


```
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/NFT.sol:NFT at 0x6527E5052de5521fE370AE5ec0aFCC6cD5a221de
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFT on Etherscan.
```

</TabItem>
<TabItem value="blockscout" label="Blockscout">

```
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/NFT.sol:NFT at 0x6527E5052de5521fE370AE5ec0aFCC6cD5a221de
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFT on Etherscan.
```

</TabItem>

:::info

You can't re-verify a contract identical to one that has already been verified. If you attempt to do so, such as verifying the above contract, you'll get an error similar to:

```text
Error in plugin @nomiclabs/hardhat-etherscan: The API responded with an unexpected message.
Contract verification may have succeeded and should be checked manually.
Message: Already Verified
```

:::

Search for your contract on [Blockscout](https://base-sepolia.blockscout.com/) or [Basescan](https://sepolia.basescan.org/) to confirm it is verified.

## Interacting with the Smart Contract

If you verified on Basescan, you can use the `Read Contract` and `Write Contract` tabs to interact with the deployed contract. You'll need to connect your wallet first, by clicking the Connect button.


