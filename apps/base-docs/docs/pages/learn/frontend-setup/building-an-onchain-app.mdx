---
title: Building an Onchain App
description: Learn step-by-step how to turn a regular template app into an onchain app with a wallet connection.
hide_table_of_contents: false
---

# Building an Onchain App

While it's convenient and fast to start from a template, the template may not fit your needs. Whether you prefer a different stack, or have already started building the traditional web components of your app, it's common to need to manually add onchain libraries to get your app working.

In this guide, you'll build the beginnings of an app similar to the one created by the [RainbowKit] quick start, but you'll do it piece by piece. You can follow along, and swap out any of our library choices with the ones you prefer.

---

## Objectives

By the end of this guide you should be able to:

- Identify the role of a wallet aggregator in an onchain app
- Debate the pros and cons of using a template
- Add a wallet connection to a standard template app

---

## Creating the Traditional App

Start by running the [Next.js] script to create a Next.js app:

```bash
npx create-next-app@latest --use-yarn
```

This script will accept `.`, if you want to add the project to the root of a folder you've already created. Otherwise, name your project. Select each option in the generation script as you see fit. We recommend the following selections:

- Use Typescript?: Yes
- Use ESLint?: Yes
- Use Tailwind?: Your preference
- Use `src/` directory?: Yes
- Use App Router?: Yes
- Customize the default import alias?: No

:::info

The default Next.js script installs [Tailwind]. [RainbowKit]'s does not.

:::

Run your app with `yarn dev` to make sure it generated correctly.

### Manually Installing RainbowKit, Wagmi, and Viem

The [quick start] guide for RainbowKit also contains step-by-step instructions for manual install. You'll be following an adjusted version here. Most of the setup is actually for configuring [wagmi], which sits on top of [viem] and makes it much easier to write React that interacts with the blockchain.

Start by installing the dependencies:

```bash
npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

:::info
Onchain libraries and packages tend to require very current versions of Node. If you're not already using it, you may want to install [nvm].
:::

## Adding Imports, Connectors, Config

In Next.js with the app router, the root of your app is found in `app/layout.tsx`, if you followed the recommended setup options. As you want the blockchain provider context to be available for the entire app, you'll add it here.

You'll need to set up your providers in a second file, so that you can add `'use client';` to the top. Doing so forces this code to be run client side, which is necessary since your server won't have access to your users' wallet information.

:::caution

You must configure these wrappers in a separate file. It will not work if you try to add them and `'use client';` directly in `layout.tsx`!

:::

Add a new file in the `app` folder called `providers.tsx`.

### Imports

As discussed above, add `'use client';` to the top of the file.

Continue with the imports:

```tsx
import '@rainbow-me/rainbowkit/styles.css';
import { useState, type ReactNode } from 'react';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
```

:::caution

If you're adapting this guide to a different set of libraries or platforms, you may need to import `styles.css` differently. You'll know this is the case if you get ugly text at the bottom of the page instead of a nice modal when you click the connect button.

:::

### Config

Now, you need to configure the chains, wallet connectors, and providers for your app. You'll use `getDefaultConfig` for now, to get started. See our guide on [Connecting to the Blockchain] for more information on blockchain providers.

:::info

To take advantage of a more advanced set of options with [OnchainKit], see our tutorial on how to [Use the Coinbase Smart Wallet and EOAs with OnchainKit]. If you just want to customize the list of wallets in [RainbowKit], see our tutorial for [Coinbase Smart Wallet with RainbowKit].

:::

You'll need a `projectId` from [Wallet Connect Cloud], which you can get for free on their site. Make sure to insert it in the appropriate place.

:::danger

Remember, everything on the frontend is public! Be sure to configure the allowlist for your WalletConnect id!

:::

```tsx
const config = getDefaultConfig({
  appName: 'Cool Onchain App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [base, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
```

### Returning the Context Providers

[TanStack Query] is now a required dependency for wagmi, and you need to add it as a React context provider. The short version is that it helps with state management. Read the docs for the long version!

Add an exported function for the providers. This sets up the `QueryClient` and returns `props.children` wrapped in all of your providers.

```tsx
export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Using Your new Providers

Open `layout.tsx`. Import your `Providers`, being careful if you use auto-import as there are many other things with similar names in the list. Wrap the `children` in your `return` with the new `Providers`.

```tsx
return (
  <html lang="en">
    <body className={inter.className}>
      <Providers>{children}</Providers>
    </body>
  </html>
);
```

## Adding the Connect Button

You're now ready to add your connect button. You can do this anywhere in your app, thanks to the `RainbowKitProvider`. Common practice would be to place the button in your app's header. Since the Next.js template doesn't have one, you can just add it to the top of the automatically generated page, rather than spending time implementing React components.

Open up `page.tsx`, and import the `ConnectButton`:

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
```

Then, simply add the `ConnectButton` component at the top of the first `<div>`:

```tsx
// This function has been simplified to save space.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ConnectButton />

        {/* Other Code...*/}
        </p>
      </div>
    </main>
  );
}
```

Run your app with `yarn dev`, and you should be able to use the RainbowKit connect button to connect with your wallet and switch between networks.

You use the [Connect Button] props to modify its properties, or you can [customize the connect button] extensively. Some users dislike having the connect button display their token balance. Try disabling it with:

```tsx
<ConnectButton showBalance={false} />
```

---

## Conclusion

In this guide, you've learned how to assemble your onchain app from several pieces. You can use this knowledge to integrate a wallet connection with an existing site, or adjust the stack to meet your preferences. Finally, you've learned how to insert and customize the connect button.

If you're looking to quickly bootstrap a simple app, you can always use a script, such as the RainbowKit [quick start]. If you're looking for a robust start for a consumer application, check out [OnchainKit]!

---

[RainbowKit]: https://www.rainbowkit.com/
[wagmi]: https://wagmi.sh/
[viem]: https://viem.sh/
[quick start]: https://www.rainbowkit.com/docs/installation
[Next.js]: https://nextjs.org/
[Tailwind]: https://tailwindcss.com/
[nvm]: https://github.com/nvm-sh/nvm
[WalletConnect]: https://cloud.walletconnect.com/
[Connecting to the Blockchain]: https://docs.base.org/connecting-to-the-blockchain/overview
[Wallet Connect Cloud]: https://cloud.walletconnect.com/
[Connect Button]: https://www.rainbowkit.com/docs/connect-button
[customize the connect button]: https://www.rainbowkit.com/docs/custom-connect-button
[TanStack Query]: https://tanstack.com/query/latest
[Coinbase Smart Wallet with RainbowKit]: https://docs.base.org/tutorials/smart-wallet-and-rainbowkit
[OnchainKit]: https://onchainkit.xyz/?utm_source=basedocs&utm_medium=tutorials&campaign=building-an-onchain-app
[Use the Coinbase Smart Wallet and EOAs with OnchainKit]: https://docs.base.org/tutorials/smart-wallet-and-eoa-with-onchainkit
