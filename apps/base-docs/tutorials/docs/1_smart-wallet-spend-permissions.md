---
title: 'Create Onchain Subscription Payments with Spend Permissions'
slug: /create-subscription-payments-with-spend-permissions
description: Implement a smart wallet signer for a subscription payment application.
author: hughescoin
keywords: [smart wallet, onchain, spend permissions, account abstraction]
tags: ['frontend', 'account abstraction']
difficulty: medium
hide_table_of_contents: false
displayed_sidebar: null
---

# Create Onchain Subscription Payments with Spend Permissions

## Overview

Spend Permissions are a new onchain primitive that allows any user to grant an application permission to spend a specified amount of funds from their wallet. Spend Permissions are similar to **Session Keys**, where temporary permissions enable seamless user interaction without repeatedly prompting signatures. However, Spend Permissions are more secure because they are scoped and controlled by parameters such as **token**, **start time**, **end time**, **period**, and **allowance**, which a user signs off on when approving a Spend Permission.

Existing Smart Wallets without Spend Permissions enabled will be asked to enable Spend Permissions the first time they interact with an application that requests a Spend Permission approval. Enabling Spend Permissions is easily done via a one-click, one-time approval flow.

A typical flow is as follows:

1. The user logs into an app with their Smart Wallet.
2. The app requests approval by presenting the user with the spend permissions.
3. The user reviews the scopes and either confirms or denies the request.
4. Upon approval, the app calls the **SpendPermission singleton contract** to initiate transactions, spending funds from the user's Smart Wallet under the granted scope.

At any point, the user can revoke their Spend Permission.

### Use Cases for Spend Permissions

Spend Permissions allow for the following onchain functionalities:

- **Subscription Payments**: Apps can collect recurring payments (e.g., monthly subscriptions) without requiring the user to re-sign each time.
- **Seamless In-App Purchases**: E-commerce stores and apps can spend funds directly for purchases without popup interruptions.
- **Gas Sponsorship**: Spend Permissions can be used alongside paymasters to sponsor gas fees for user transactions.
- **One-Click Mints**: Users can allocate an amount of funds for an app to spend on their behalf, enabling a series of onchain actions without requiring repeated approvals.

---

## Objectives

In this tutorial, we’ll walk through a demo application that uses Spend Permissions to enable onchain subscription payments. Specifically, you will:

- Create a smart wallet from a public/private keypair.
- Enable an EOA to receive subscription payments.
- Implement a **Subscribe** button that:
  - Calls the **spend** function to initiate transactions.
  - Adds the **SpendPermission singleton contract** as an owner to the user’s Smart Wallet.

By the end of this tutorial, your application will seamlessly request and utilize Spend Permissions to facilitate recurring onchain payments.

## Prerequisites:

### Coinbase CDP account[](https://docs.base.org/tutorials/gasless-transaction-on-base-using-a-paymaster/#coinbase-cdp-account 'Direct link to Coinbase CDP account')

This is your access point to the Coinbase Cloud Developer Platform, where you can manage projects and utilize tools like the Paymaster.

### Familiarity with Smart Wallets and ERC 4337[​](https://docs.base.org/tutorials/gasless-transaction-on-base-using-a-paymaster/#familiarity-with-smart-accounts-and-erc-4337 'Direct link to Familiarity with Smart Accounts and ERC 4337')

Understand the basics of Smart Wallets and the ERC-4337 standard for advanced transaction patterns and account abstraction.

### Familiarity with wagmi/viem

Wagmi/viem are two libraries that enable smart contract interaction using typescript. It makes onchain development smoother and what you will use to create smart wallets, functions, etc. It easily allows onchain developers to use the same skillsets from Javascript/typescript and frontend development and bring it onchain.

## Template Project

Let's first start at a common place. Clone the template e-commerce store:

```bash
git clone https://github.com/hughescoin/learn-spend-permissions.git

cd learn-spend-permissions

bun install
```

Create a .env file from the example provided:

```bash
cp env.local.example .env
```

If you don’t have an existing keypair, follow these steps to generate one using Foundry:

Install foundry if you don't have it.

```sh
curl -L https://foundry.paradigm.xyz | bash
```

Then, create a private key pair:

```bash
cast wallet new
```

Your terminal should output something similar to this:

```bash
Successfully created new keypair.

Address: 0x48155Eca1EC9e6986Eef6129A0024f84B8483B59

Private key: 0xcd57753bb4e308ba0c6f574e8af04a7bae0ca0aff5750ddd6275460f49635527
```

Now that you have your keypair, it's time to create a "`Spender` client". The **Spender** is the account that will receive funds from users granting Spend Permissions. We'll use the keypair generated earlier to set this up.

Start by opening the `.env` file in the Healing Honey project and adding your private key:

```bash
SPENDER_PRIVATE_KEY=0xcd57753bb4e308ba0c6f574e8af04a7bae0ca0aff5750ddd6275460f49635527
```

Next, navigate to the `src/app/lib/spender.ts` file. Here, you'll see the `privateKeyToAccount` function from Viem in use. This function creates a wallet from the private key, enabling it to sign transactions and messages. The generated `account` is then used to create a [Wallet Client], which allows signing and executing onchain transactions to interact with the Spend Permission contract.

With your Spender Client set up, ensure all other required environment variables are configured for the app to work when running the dev server.

Head over to [Coinbase Developer Platform](https://portal.cdp.coinbase.com/) to retrieve your Paymaster URL and API Key. These can be found under **Onchain Tools > Paymaster > Configuration**.
![cdp-config](../../assets/images/paymaster-tutorials/cdp-copy-endpoint.png)

Copy the **Base Sepolia** (Base testnet) Paymaster URL and API Key, then update your `.env` file as follows:

```bash
BASE_SEPOLIA_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base-sepolia/YOUR_API_KEY
CDP_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_ONCHAINKIT_API_KEY=YOUR_API_KEY
```

:::tip CDP API KEYS
For the `CDP_API_KEY` and `NEXT_PUBLIC_ONCHAINKIT_API_KEY`, extract the alphanumeric string from the Paymaster URL after the `base-sepolia` path.

For example, if your Paymaster URL is: https://api.developer.coinbase.com/rpc/v1/base-sepolia/JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0

The API Key would be: `JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0`
:::

:::warning
Please do not use these API Keys
:::

Your .env file should now look like this:

```
COINBASE_COMMERCE_API_KEY="f3cbce52-6f03-49b1-ab34-4fe9e1311d9a"

CDP_API_KEY="JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0"

NEXT_PUBLIC_ENVIRONMENT=localhost

SPENDER_PRIVATE_KEY=0xa72d316dd59a9e9a876b80fa2bbe825a9836e66fd45d87a2ea3c9924a5b131a1

NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Healing Honey Shop

NEXT_PUBLIC_ONCHAINKIT_API_KEY="JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0"

BASE_SEPOLIA_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base-sepolia/JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0

```

To ensure your app communicates with the correct server when a user interacts with their wallet, open the src/components/OnchainProviders.tsx file.

Replace the // TODO comment with the following value for the keysUrl property:

```json
keysUrl: "https://keys.coinbase.com/connect"
```

With these steps complete, your environment and Spender Client are ready to support onchain interactions. Now, let's move on to building the **Subscribe** button.

Navigate to `src/components/Subscribe.tsx`. You'll notice that the component is incomplete and currently shows multiple errors. We'll address these issues to enable Spend Permission functionality.

Spend Permissions rely on [EIP-712] signatures and include several parameters, or [scopes]. One key scope is the `allowance`, which defines the amount an app can spend on behalf of the user. For our application, this will be set to **85% of the user's cart total**, reflecting a **15% subscription discount**. To achieve this, add the following code to line 95 to calculate the `subscriptionAmountInWei` variable:

```ts
const subscriptionAmountInEther = price ? subscriptionAmount / price : 0;
const subscriptionAmountInWei = parseEther(subscriptionAmountInEther.toString());
```

By adding these lines of code, we enable the discounted price to be passed as the `allowance` in the Spend Permission.

Next, we need to define the `period` and `end` parameters. The `period` specifies the time interval for resetting the used allowance (recurring basis), and the `end` specifies the Unix timestamp until which the Spend Permission remains valid.

For this demo, we'll set:

- `period`: 2629743 seconds (equivalent to one month)
- `end`: 1767291546 (Unix timestamp for January 1, 2026)

Now, update the message constant to include these parameters. It should look like this:

```ts
const message = {
  account: accountAddress,
  spender: process.env.NEXT_PUBLIC_SPENDER_ADDRESS! as Address,
  token: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as Address,
  allowance: subscriptionAmountInWei,
  period: 2629743,
  start: Math.floor(Date.now() / 1000),
  end: 1767291546,
  salt: BigInt(0),
  extraData: '0x' as Hex,
} as const;
```

By setting these values, we have defined the essential parameters for the Spend Permission, allowing our **Subscribe** button to handle recurring payments with ease. Let's continue enhancing the functionality in the next steps.

You may have noticed that when the user clicks the **Subscribe** button, it sends data to the `/collect` route. However, this route is currently broken. Let's address this issue to complete the functionality of our application.

In its current state, the `/collect` route contains incomplete logic for interacting with the `Spend Permission Manager` singleton contract. Specifically, we need to update the `approvalTxnHash` and `spendTxnHash` functions to properly handle user approvals and spending operations.

The `approvalTxnHash` function is responsible for calling the `approveWithSignature` method on the `Spend Permission Manager` contract. Update it with the following properties and values:

```ts
const approvalTxnHash = await spenderBundlerClient.writeContract({
  address: spendPermissionManagerAddress,
  abi: spendPermissionManagerAbi,
  functionName: 'approveWithSignature',
  args: [spendPermission, signature],
});
```

Once the approval transaction completes, the app will have the user's permission to spend their funds.

Next, we need to call the `spend` function to utilize the user's approved funds. Update the `spendTxnHash` function with the following code:

```ts
const spendTxnHash = await spenderBundlerClient.writeContract({
  address: spendPermissionManagerAddress,
  abi: spendPermissionManagerAbi,
  functionName: 'spend',
  args: [spendPermission, BigInt(1)],
});
```

These updates ensure that the `/collect` route correctly processes both the approval and spending steps, enabling seamless interaction with the `Spend Permission Manager`. With these fixes in place, the backend can fully support the Spend Permission flow.

Excellent! You just added a Spender Client as a backend app wallet. Now, when users click the `Subscribe` button, the component will call the `handleCollectSubscription` function, and the request will be handled by the `route` function.

Go ahead and run your app locally to see your hard work come to life:

```bash
bun run dev
```

### Obtaining Wallet Spend Permissions (Optional)

I know what you're thinking: how can I see the valid (non-revoked) spend permissions for each user (wallet)? That's an easy one. Base provides an endpoint that allows you to retrieve valid spend permissions for an account by polling the utility API at: https://rpc.wallet.coinbase.com.

An optional step you can take is to create a "My Subscriptions" tab on your site to present users with their valid spend permissions. Below is an example of the curl request to the RPC endpoint. A sample response can be found [here](https://gist.github.com/hughescoin/d1566557f85cb2fafd281833affbe022).

```bash
curl --location 'https://rpc.wallet.coinbase.com' \
--header 'Content-Type: application/json' \
--data '{
  "jsonrpc": "2.0",
  "method": "coinbase_fetchPermissions",
  "params": [
    {
      "account": "0xfB2adc8629FC9F54e243377ffcECEb437a42934C",
      "chainId": "0x14A34",
      "spender": "0x2a83b0e4462449660b6e7567b2c81ac6d04d877d"
    }
  ],
  "id": 1
}'
```

## Conclusion

And there you have it - an onchain subscription application enabled by Spend Permissions. By combining Smart Wallets with scoped permissions, you’ve seen how we can streamline recurring payments, enable one-click purchases, and revolutionize how users interact with decentralized applications.

Now, it’s your turn! The code and concepts we’ve explored today are just the beginning. Start experimenting, integrate Spend Permissions into your app, and redefine what’s possible with blockchain technology.

We can’t wait to see what you’ll build. When you implement Spend Permissions, tag us on X/Farcaster [@Base](https://x.com/base) to share your creations. Let’s make 2025 the year of onchain apps—together! 🚀

---

[Paymaster]: https://portal.cdp.coinbase.com/products/bundler-and-paymaster
[Spender]: https://www.smartwallet.dev/guides/spend-permissions/api-reference/spendpermissionmanager#:~:text=spender,%27s%20tokens.
[Wallet Client]: https://viem.sh/docs/clients/wallet.html
[scopes]: https://www.smartwallet.dev/guides/spend-permissions/overview#the-spendpermission-details
[EIP-712]: https://eips.ethereum.org/EIPS/eip-712
