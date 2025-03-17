---
title: The `useSimulateContract` hook
description: Improve your user experience with the `useSimulateContract` hook.
hide_table_of_contents: false
---

# The `useSimulateContract` hook
The [`useSimulateContract`] hook simulates and validates a contract interaction without actually sending a transaction to the blockchain. Using it allows you to detect and respond to potential errors before the user tries to send a transaction.

---

## Objectives

By the end of this guide you should be able to:

- Implement wagmi's `useSimulateContract` and `useWriteContract` to send transactions to a smart contract
- Configure the options in `useSimulateContract` and `useWriteContract`
- Call a smart contract function on-demand using the write function from `useWriteContract`, with arguments and a value

---

## Refining the Claim Component

In the previous step-by-step, you used [`useWriteContract`] to set up a hook you can use to call the `claim` function in your smart contract when the user clicks a button. The component works well enough, but it can take a long time for the wallet to pop up, particularly if there is network congestion. You also have no way of responding to a problem with the transaction inputs until after the user tries to initiate a transaction.

### Using `useSimulateContract`

The `useSimulateContract` can be used in partnership with `useWriteContract`. To do so, you set up the transaction parameters in `useSimulateContract`, then use the `data?.request` returned by it as an argument in the call to write to the contract. Modify your `TokenInfo` component to test it:

```tsx
// Bad code for example.  See below for fix.
const {
  data: claimData,
  isFetching: claimIsFetching,
  isError: claimIsError,
} = useSimulateContract({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'claim',
});

useEffect(() => {
  if (claimIsError) {
    alert('Unable to claim'); // TODO: Better error handling
  }
}, [claimIsError]);

// No changes to `useWriteContract`
const { writeContract: claim, isPending: claimIsPending } = useWriteContract();

// Other code...

// Update the call to `claim`
const handleClaimClick = () => {
  claim(claimData?.request);
};
```

You'll also need to update your handler to use the TypeScript pre-check feature, because the claim function will be briefly `undefined`.

```tsx
const handleClaimClick = () => {
  claim(claimData!.request);
};
```

Reload the site and observe that the `alert` is triggered on load if you're signed in with an address that has already claimed tokens. You'll also see that the button is disabled, as though the user had clicked it and a transaction is loading in the wallet.

### Making Adjustments

The reason for this is a subtle difference in how `useWriteContract` and `useSimulateContract` work.

In the last step-by-step, you saw how viem runs a simulation of the transaction when the `write` function is called. `useSimulateContract` eagerly runs this simulation and updates it's variables.

You'll need to make some modifications for it to work. The `claimIsError` variable is being triggered when the data for the call is **simulated**, not when the call has settled. As a result, it immediately generates the error, and triggers the `alert` without requiring the user to click the button.

You can solve this a number of ways, including simply not rendering the button if the user has already claimed. You could also modify the code, and combine it with `isError`, to share this information to the user.

```tsx
const {
  data: claimData,
  isFetching: claimIsFetching,
  isError: claimIsError,
} = useSimulateContract({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'claim',
});

// Deleted `useEffect` for `claimIsError`

const { writeContract: claim, isPending: claimIsPending } = useWriteContract();

// Other code

return (
  <div>
    <p>{claimIsFetching.toString()}</p>
    <p>{'Token Balance: ' + tokenBalance}</p>
    <button disabled={claimIsPending || claimIsError} onClick={handleClaimClick}>
      {claimIsPending ? 'Complete In Wallet' : 'Claim Tokens'}
    </button>
    <p>{claimIsError ? 'Unable to claim tokens.' : 'Claim your tokens!'} </p>
  </div>
);
```

---

## Conclusion

In this step-by-step, you updated your app to use the `useSimulateContract` hook to provide a speedier wallet interaction for your users. You've also learned how you can predict and respond to potential errors without the user needing to attempt to send a transaction. You could use this functionality to let them know a username is already taken, a bid amount is not large enough, or an item is no longer available.

---

[wagmi]: https://wagmi.sh/
[`useWriteContract`]: https://wagmi.sh/react/hooks/useWriteContract
[`useSimulateContract`]: https://wagmi.sh/react/hooks/useSimulateContract
