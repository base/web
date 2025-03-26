---
title: The `useWriteContract` hook
description: Write to your smart contracts with the `useWriteContract` hook.
hide_table_of_contents: false
---

# The `useWriteContract` hook

The [`useWriteContract`] hook allows you to call your `public` and `external` smart contract functions that write to state and create a permanent modification to the data on chain.

---

## Objectives

By the end of this guide you should be able to:

- Implement wagmi's `useWriteContract` hook to send transactions to a smart contract
- Configure the options in `useWriteContract`
- Display the execution, success, or failure of a function with button state changes, and data display

---

## Sending a Transaction to the Blockchain

:::warning

In this step-by-step, you're going to start with the [`useWriteContract`] hook. You probably won't want to use this method in production. In the next step-by-step, we'll show you the [`useSimulateContract`] hook, how it works with `useWriteContract`, and how you can use it to create a better user experience.

Exploring them separately will highlight the functionality provided by the prepare hook.

:::

:::caution

In this module, you'll extend the onchain app you build in the previous module, [Reading and Displaying Data].

:::

You've built an app that can read from your Simple DAO smart contract, but so far, you've used BaseScan to send transactions that call your write functions. You can use the [`useWriteContract`] hook in a similar way to call those functions directly from your app.

### Setting up the Component

Add a new component called `TokenInfo` to the project, and a state variable for `tokenBalance`.

```tsx
import { useState } from 'react';

export function TokenInfo() {
  const [tokenBalance, setTokenBalance] = useState(0);
}
```

### Reading the Token Balance

You'll need to know how many tokens the user has to be able to make decisions on what UI controls to display, so start by adding a `useReadContract`. You don't have a function for this directly in your contract, but your contract inherits from the [OpenZeppelin ERC20] contract, which has a function called `balanceOf` that takes an address and returns the balance for that address.

You'll need the user's address to use in `args`, which you can conveniently get from the [`useAccount`] hook using the pattern below.

```tsx
const { data: balanceData, queryKey: balanceQueryKey } =
  useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: "balanceOf",
    args: [useAccount().address],
  });

useEffect(() => {
  if (balanceData) {
    setTokenBalance(balanceData as number);
  }
}, [balanceData]);

useEffect(() => {
  queryClient.invalidateQueries({ queryKey: balanceQueryKey });
}, [blockNumber, queryClient]);
```

:::caution

Remember, this is an expensive method to watch for data to change on the blockchain. In this case, a more production-suitable solution might be to call `balanceOf` after the user has done something that might change the balance.

:::

Set the `return` for your component to display this balance to the user:

```tsx
return (
  <div>
    <p>{'Token Balance: ' + tokenBalance}</p>
  </div>
);
```

Then, add the component to your app in `index.tsx`.

```tsx
return (
  <div className={styles.container}>
    <main className={styles.main}>
      <ConnectButton />
      <ConnectionWindow />
      <TokenInfo />
      <IssueList />
    </main>
);
```

Run the app and make sure you see the expected balance displayed on the page.

### Setting up `useWriteContract`

The [`useWriteContract`] hook is configured similarly to the [`useReadContract`] hook, with one important difference. You'll need to decompose the `write` property from the function call. This is a function that you can use to call your smart contract function whenever you'd like!

```tsx
const { writeContract: claim, isPending: claimIsPending } = useWriteContract();
```

Add an event handler function and a button. As with the `useReadContract` hook, you can use `isPending` and other state helpers to adjust your UI. The name of this one is a little misleading. `isPending` will be `true` starting from the moment the transaction gets sent to the user's wallet.

You can use this to nudge them to look to their wallet to complete the transaction. Additionally, add a `useEffect` to watch for an error state.

```tsx
const handleClaimClick = () => {
  claim({
    abi: contractData.abi,
    address: contractData.address as `0x${string}`,
    functionName: 'claim',
  });
};

return (
  <div>
    <p>{'Token Balance: ' + tokenBalance}</p>
    <button disabled={claimIsPending} onClick={handleClaimClick}>
      {claimIsPending ? 'Complete In Wallet' : 'Claim Tokens'}
    </button>
  </div>
);
```

Try it out. Notice that the button text briefly changes without the wallet window popping up if you click the `Claim Tokens` button while connected with a wallet that already owns the tokens. The reason this happens is that viem, which underlies wagmi, runs a simulation of the transaction to estimate gas costs. If that simulation fails, it triggers the fail mechanism immediately, rather than allowing the app to send a bad transaction to the blockchain and cost the user gas for a call doomed to fail. You will fix this in the next tutorial.

In the meantime, you'll need to change to a new wallet or redeploy your contract a couple of times to complete your testing. Do that, and try out the call on a wallet that hasn't claimed any tokens. Notice that the button is disabled and the text now prompts the user to look to their wallet to approve the transaction.

---

## Conclusion

In this step-by-step, you've learned how to use the [`useWriteContract`] hook to call your smart contract functions on demand. You've also tested methods to manage the UI/UX experience for your users, based on the state of the transaction, as well as its success or failure.

---

[wagmi]: https://wagmi.sh/
[`useWriteContract`]: https://wagmi.sh/react/hooks/useWriteContract
[`usePrepareContractWrite`]: https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite
[Reading and Displaying Data]: ../reading-and-displaying-data/useAccount
[`useReadContract`]: https://wagmi.sh/react/hooks/useReadContract
[OpenZeppelin ERC20]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol
[`useAccount`]: https://wagmi.sh/react/hooks/useAccount
