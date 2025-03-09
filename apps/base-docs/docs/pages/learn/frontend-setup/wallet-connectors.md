---
title: Wallet Connectors
description: Learn about how wallet connector libraries aggregate wallets and make it easier to connect to them from your app.
hide_table_of_contents: false
---

# Wallet Connectors

One of the most intimidating tasks when building an onchain app is making that initial connection between your users' wallets, and your app. Initial research often surfaces a bewildering number of wallets, each with their own SDKs, and own methods to manage the connection. Luckily, you don't actually need to manage all of this on your own. There are a number of wallet connector libraries specialized in creating a smooth and beautiful user experience to facilitate this connection.

To further add to the confusion and difficulty, [Smart wallets] are growing in popularity. These advanced wallets allow users to create and manage wallets with [passkeys], and support, or will soon support, a growing array of features including session keys, account recovery, and more!

[RainbowKit], the aggregator you'll use for this lesson, works with the Coinbase Smart Wallet out of the box, but you'll need to do a little bit of extra configuration to support users of both traditional wallets and smart wallets.

---

## Objectives

By the end of this guide you should be able to:

- Identify the role of a wallet aggregator in an onchain app
- Debate the pros and cons of using a template
- Scaffold a new onchain app with RainbowKit
- Support users of EOAs and the Coinbase Smart Wallet with the same app

---

## Connecting to the Blockchain

One of the many challenging tasks of building a frontend that can interface with your smart contracts is managing the user's connection between your onchain app and their [EOA] wallet. Not only is there an ever-growing suite of different wallets, but users can (and probably should!) use several different addresses within the same wallet app.

[Rainbowkit] is one of several options that makes this a little bit easier by serving as an aggregator of wallets, and handling some of the details of connecting them. Alternatives include [ConnectKit], and [Dynamic], which are both excellent choices as well.

Each of these include customizable UI/UX components for inviting the user to connect, displaying connection status, and selecting which wallet they wish to use.

### Using the Quick Start

If you're just trying to get up and running as quickly as possible, you can use RainbowKit's [quick start] script to scaffold an app from their template, with a single command. If you're using Yarn:

```bash
yarn create @rainbow-me/rainbowkit
```

:::info

The script doesn't accept `.` as a project name, so you'll want to run this script in your `src` directory, or wherever you keep your projects. It will create a folder with the same name as your project, and install the project files inside.

:::

Once it's done, simply run the app with:

```bash
yarn run dev
```

Using the script is fast, but it does mean less choice. In this case, it builds the app on top of [Next.js], which is great if you want to use it, but not helpful if you prefer to work from a different framework, such as [Create React App], or [Remix] (the React framework, not the Solidity IDE). The script also doesn't help you if you want to add an onchain integration to an existing site.

:::info

The Rainbowkit template has been updated to wagmi 2.X, but it does **not** use the Next.js app router. You'll need to install it manually if you wish to use the latest patterns.

The [Building an Onchain App] tutorial will show you how to do this!

:::

### Coinbase Smart Wallet

If you have the Coinbase Wallet extension, you might be wondering where the smart wallet can be found. By default, the smart wallet will only be invoked if you click the `Coinbase Wallet` button to log in **and** you **don't** have the browser extension. To test, open a private window with extensions disabled and try to log in.

Selecting `Rainbow`, `MetaMask`, or `WalletConnect` will display a QR code so that the user can log in with their phone. Picking `Coinbase Wallet` will instead invoke the smart wallet login.

This flow can be improved upon, as new crypto users won't know that digging for the smart wallet is the best path forward, and existing users who are trying to migrate to the smart wallet don't have that option.

See our tutorial on how to [Use the Coinbase Smart Wallet and EOAs with OnchainKit] for more details!

---

## Conclusion

In this article, you've learned how libraries such as [Rainbowkit], [ConnectKit], and [Dynamic], aggregate wallets and make it easier for you to connect your app to your users' wallet of choice. You've also learned how you can use a template to quickly create the foundation of your app. Finally, you've learned that the cost of using a template is that it does make some choices for you.

---

[RainbowKit]: https://www.rainbowkit.com/
[wagmi]: https://wagmi.sh/
[wallet]: https://ethereum.org/en/developers/docs/accounts/
[ConnectKit]: https://ethereum.org/en/developers/docs/accounts/
[Dynamic]: https://www.dynamic.xyz/
[quick start]: https://www.rainbowkit.com/docs/installation
[Next.js]: https://nextjs.org/
[Create React App]: https://create-react-app.dev/
[Remix]: https://remix.run/
[Building an Onchain App]: ./building-an-onchain-app
[Smart wallets]: https://www.coinbase.com/wallet/smart-wallet
[passkeys]: https://safety.google/authentication/passkey/
[Use the Coinbase Smart Wallet and EOAs with OnchainKit]: https://docs.base.org/tutorials/smart-wallet-and-eoa-with-onchainkit
