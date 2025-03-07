---
title: How to avoid getting your app flagged as malicious
slug: /security/app-blocklist
description: The Base bug bounty program and procedures for reporting vulnerabilities.
keywords:
  [
    Base,
    Coinbase Wallet,
    dapp,
    app,
    malicious warning,
    browser,
    dapp developer,
    app developer,
    best practice,
    unblock,
    remove warning,
  ]
hide_table_of_contents: true
---

# How to avoid getting your app flagged as malicious

---

Ensuring that your app is perceived as trustworthy and not flagged as malicious requires attention to best practices. Here’s a quick guide on how to build a secure and compliant app from day one

## Smart Contracts

- **Verify Source Code:** Ensure that the source code of your contracts is verified and publicly available on [block explorers](https://docs.base.org/docs/tools/block-explorers/).
- **Audit Your Contracts**: Having your contracts audited by a reputable firm is crucial. Publish the audit report and provide a reference link to it, so users can easily find it. Audits show that you’ve taken extra steps to secure your smart contracts.
- **Limit User Funds Exposure**: Design your contracts to minimize the exposure of user funds. Use efficient design to reduce any unnecessary risk. For example, request the minimum amount needed to fulfill the transaction.

---

## App Best Practices

- **Accessibility Across Regions**: Avoid geo-blocking or access restrictions that prevent certain regions or countries from accessing your app.
- **Consistent Web2 Behavior**: Avoid rapid or unexplained changes in UI that can make users feel uncertain about the app’s reliability.
- **Transparent Web3 Interactions**: Make sure your app’s web3 interactions are clear and match the UI actions. For example, a “Mint” button should clearly emit a mint transaction.
- **Standard Sign-in Methods**: Provide all standard connection methods for users to sign in, such as WalletConnect / Coinbase Wallet SDK or popular browser extension wallets.

---

## Verification Request

Once you’ve implemented these best practices, consider submitting a verification request through the following [form](https://report.blockaid.io/). This step helps ensure that your app is recognized as safe and verified by trusted sources in the ecosystem.

By following these recommendations, you’ll significantly reduce the chances of your app being flagged as malicious and foster a secure and trustworthy environment for your users.

---
