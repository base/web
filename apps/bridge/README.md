# Base Bridge Has Been Deprecated

In May 2024, the Base native bridge was deprecated.

In March 2025, the Base Bridge website was deprecated.

This code is maintained for educational purposes, but is not actively maintained.

## Base Bridge App

The Base Bridge App is a Next.js app.

## Getting started

```shell
cd apps/bridge
cp .env.goerli.example .env.local
cd ../..
yarn workspace @app/bridge dev
```

### Wallet Connect Project ID

Additionally you will need to create a [Wallet Connect](https://walletconnect.org/) project and add the project ID to the `.env.local` file for the `WALLET_CONNECT_PROJECT_ID` env var.
