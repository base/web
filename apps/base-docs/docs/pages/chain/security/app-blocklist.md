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

Ensuring that your app is perceived as trustworthy and not flagged as malicious requires attention to best practices. Here’s a quick guide on how to build a secure and compliant app from day one.

## 1. Verify and reduce the risk of your smart contract

- **Verify Smart Contract**: Ensure that the source code of your contracts is verified and publicly available on [block explorers](https://docs.base.org/chain/block-explorers). For example, this can be done on [Etherscan](https://basescan.org/verifyContract) and [Basescan](https://basescan.org/verifyContract) under “Verify Contract”.
- **Limit Exposure of User Funds**: Design your contracts to minimize the exposure of user funds. Use efficient design to reduce any unnecessary risk. For example, request the minimum amount needed to fulfill the transaction.

---

## 2. Submit a verification request

After verifying your smart contract, consider [submitting a verification request](https://report.blockaid.io/). This step helps ensure that your app is recognized as safe and verified by trusted sources in the ecosystem.

---

## 3. Follow app best practices

- **Accessibility Across Regions**: Avoid geo-blocking or access restrictions that prevent certain regions or countries from accessing your app. Depending on legal or compliance reasons, this may be necessary which you can indicate in your verification request submission.
- **Consistent Behavior**: Avoid rapid or unexplained changes in UI that can make users feel uncertain about the app’s reliability.
- **Transparent Onchain Interactions**: Make sure your app’s onchain interactions are clear and match the UI actions. For example, a “Mint” button should clearly emit a mint transaction.
- **Standard Sign-in Methods**: Provide all standard connection methods for users to sign in, such as WalletConnect / Coinbase Wallet SDK or popular browser extension wallets.
- **Audit Your Contracts**: Have your contracts audited by a reputable firm. Publish the audit report and provide a reference link so users can easily find it. Audits show that you’ve taken extra steps to secure your smart contracts.

By following these recommendations, you’ll significantly reduce the chances of your app being flagged as malicious and foster a secure and trustworthy environment for your users.

---

**Still having trouble?**
Coinbase Wallet may report false positives when flagging apps. To avoid false positives, please make sure you have completed the recommended actions above. If your app is still flagged as suspicious or malicious, [report it to Blockaid](https://report.blockaid.io/mistake).

---
