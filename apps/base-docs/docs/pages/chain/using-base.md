---
title: Using Base
description: 'How to integrate Base with popular wallets like Coinbase Wallet and MetaMask, covering both mainnet and testnet configurations.'

---

# Using Base with your wallet

## Coinbase Wallet

The [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en) browser extension provides support for Base by default.

To use Base with Coinbase Wallet:

1. Open the Coinbase Wallet browser extension and log in to your account.
2. Connect to an app using Coinbase Wallet.
3. Open the network selection menu by clicking the network icon in the upper right-hand corner.
4. Select **Base**.

Your active network should now be switched to Base.


## Other wallets

Base can be added as a custom network to any EVM-compatible wallet (i.e. [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)).

### MetaMask

To add Base as a custom network to MetaMask:

1. Open the MetaMask browser extension.
2. Open the network selection dropdown menu by clicking the dropdown button at the top of the extension.
3. Click the **Add network** button.
4. Click **Add a network manually**.
5. In the **Add a network manually** dialog that appears, enter the following information for Base mainnet:

   | Name            | Value                                                        |
   | :-------------- | :----------------------------------------------------------- |
   | Network Name    | Base Mainnet                                                 |
   | Description     | The public mainnet for Base.                                 |
   | RPC Endpoint    | [https://mainnet.base.org](https://mainnet.base.org)         |
   | Chain ID        | 8453                                                         |
   | Currency Symbol | ETH                                                          |
   | Block Explorer  | [https://base.blockscout.com/](https://base.blockscout.com/) |

6. Tap the Save button to save Base as a network.

You should now be able to connect to the Base by selecting it from the network selection dropdown menu.



## Testnet

#### Coinbase Wallet browser extension provides support for Base Sepolia testnet by default.

To use Base Sepolia with Coinbase Wallet:

1. Open the Coinbase Wallet browser extension and log in to your account.
2. Connect to an app using Coinbase Wallet.
3. Open the network selection menu by clicking the network icon in the upper right-hand corner.
4. Click the **More networks** button.
5. Navigate to the **Testnets** tab.
6. Select **Base Sepolia**.

Your active network should now be switched to Base testnet.

#### Other wallets

Base Sepolia can be added as a custom network to any EVM-compatible wallet (e.g., [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)).

#### MetaMask

To add Base Sepolia as a custom network in MetaMask:

1. Open the MetaMask browser extension.
2. Open the network selection dropdown menu by clicking the dropdown button at the top of the extension.
3. Click the **Add network** button.
4. Click **Add a network manually**.
5. In the **Add a network manually** dialog that appears, enter the following information for the Base Sepolia testnet:

   | Name            | Sepolia                                                                |
   | :-------------- | :--------------------------------------------------------------------- |
   | Network Name    | Base Sepolia                                                           |
   | RPC Endpoint    | [https://sepolia.base.org](https://sepolia.base.org)                   |
   | Chain ID        | 84532                                                                  |
   | Currency Symbol | ETH                                                                    |
   | Block Explorer  | [https://sepolia-explorer.base.org](https://sepolia-explorer.base.org) |

6. Tap the Save button to save Base Sepolia as a network.

You should now be able to connect to the Base testnet by selecting it from the network selection dropdown menu.
