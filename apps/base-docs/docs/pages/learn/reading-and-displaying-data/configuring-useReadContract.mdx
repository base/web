---
title: Configuring `useReadContract`
description: Configure the properties of the `useReadContract` hook.
hide_table_of_contents: false
---

# Configuring `useReadContract`

The [`useReadContract`] hook has a number of configurable properties that will allow you to adapt it to your needs. You can combine the functionality of TanStack queries with [`useBlockNumber`] to watch the blockchain for changes, although doing so will consume a number of API calls.

---

## Objectives

By the end of this guide you should be able to:

- Use `useBlockNumber` and the `queryClient` to automatically fetch updates from the blockchain
- Describe the costs of using the above, and methods to reduce those costs
- Configure arguments to be passed with a call to a `pure` or `view` smart contract function
- Call an instance of `useReadContract` on demand
- Utilize `isLoading` and `isFetching` to improve user experience

---

## Fetching Updates from the Blockchain

You'll continue with the project you've been building and last updated while learning about the [`useReadContract` hook].

Once the excitement of your accomplishment of finally reading from your own contract subsides, try using BaseScan to add another issue, or vote on an existing issue. You'll notice that your frontend does **not** update. There are a few ways to handle this.

### The Watch Feature

The easiest is to use `useBlockNumber` with the `watch` feature to automatically keep track of the block number, then use the `queryClient` to update when that changes. **Make sure** you decompose the `queryKey` from the return of `useReadContract`.

```tsx
import { useEffect, useState } from 'react';
import { useReadContract, useBlockNumber } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';

// Other Code

export function IssueList() {
  // Other Code

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: issuesData,
    isError: issuesIsError,
    isPending: issuesIsPending,
    queryKey: issuesQueryKey,
  } = useReadContract({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: 'getAllIssues',
  });

  // Note that this is a separate `useEffect` from the one that handles the
  // update after the list of issues is returned
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: issuesQueryKey });
  }, [blockNumber, queryClient, issuesQueryKey]);

  // Return code
}
```

Try adding a new issue and it will automatically appear on the list, although it may take more time than you are used to. Blockchain is still slower than the web.

It works! Unfortunately, you can't really stop here, unless you're working on a hackathon prototype or a very early stage demo. The catch is that `wagmi` has a default [`pollingInterval`] of 4 seconds, so having this `watch` causes it to call `eth_blocknumber` constantly, which then triggers an `eth_call`, both of which use api credits.

If you were to take the obvious approach of adding a `useReadContract` for every function you wanted data from, and set it to `watch`, things would quickly get out of hand. A single open web page with 15 functions watched in this way will hit rate-limiting in as short as an hour.

:::info

Don't do this, either use multi-call via [`useReadContracts`], or consolidate your `view`s into a single function that fetches all the data you need in one call.

:::

Luckily, you have options to control these calls a little better.

### Pausing On Blur

One quick improvement is to simply stop watching the blockchain if the website doesn't have focus. To see this in action, add a state variable to count how many times the function has settled, and one for if the page is focused. You'll also need to set up event listeners to set the state of the latter when the page is focused or blurred.

```tsx
const [timesCalled, setTimesCalled] = useState(0);
const [pageIsFocused, setPageIsFocused] = useState(true);

useEffect(() => {
  const onFocus = () => setPageIsFocused(true);
  const onBlur = () => setPageIsFocused(false);

  window.addEventListener('focus', onFocus);
  window.addEventListener('blur', onBlur);

  return () => {
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('blur', onBlur);
  };
}, []);
```

Then, update the `watch` for `useBlockNumber` so that it only does so if `pageIsFocused`.

```tsx
const { data: blockNumber } = useBlockNumber({ watch: pageIsFocused });
```

Add a line to the `useEffect` for `blockNumber` and increment your counter as well.

```tsx
useEffect(() => {
  setTimesCalled((prev) => prev + 1);
  queryClient.invalidateQueries({ queryKey: issuesQueryKey });
}, [blockNumber, queryClient]);
```

Finally, surface your counter in the component.

```tsx
return (
  <div>
    <h2>Number of times called</h2>
    <p>{timesCalled.toString()}</p>
    <p>{'Has focus: ' + pageIsFocused}</p>
    <h2>All Issues</h2>
    <div>{renderIssues()}</div>
  </div>
);
```

Now, when you watch the page, the count will go up every four seconds. When you switch to another tab or window, the counter will pause until you switch back.

### Adjusting the Polling Rate

You likely need to share timely updates with your users, but how timely do those updates need to be to meet the requirements of your app? If you're doing instant messaging, 4 seconds may even be too long (though any faster is running into the speed blocks are added in most L2s).

A more robust DAO is going to have a voting period of at least a day or two, so those users probably don't need to see that there is a new issue within 4 seconds of it hitting the chain.

Adjust your [`pollingInterval`] by setting it in `getDefaultConfig` in `_app.tsx`:

```tsx
const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [baseSepolia],
  ssr: true,
  pollingInterval: 30_000,
});
```

Setting it to 30 seconds, or 30,000 milliseconds, will reduce your API calls dramatically, without negatively impacting members of the DAO.

You can also set `pollingInterval` if you're using `createConfig` instead of the default.

### Updating on Demand

You can use a similar system to call your update function on demand. First, add a button, a handler for that button, and a state variable for it to set:

```tsx
const [triggerRead, setTriggerRead] = useState(false);

const handleTriggerRead = () => {
  setTriggerRead(true);
};
```

```tsx
return (
  <div>
    <button onClick={handleTriggerRead}>Read Now</button>
    <h2>Number of times called</h2>
    <p>{timesCalled.toString()}</p>
    <p>{'Has focus: ' + pageIsFocused}</p>
    <h2>All Issues</h2>
    <div>{renderIssues()}</div>
  </div>
);
```

Finally, set `watch` to equal `triggerRead`, instead of `pageIsFocused`, and reset `triggerRead` in the `useEffect`.

```tsx
const { data: blockNumber } = useBlockNumber({ watch: triggerRead });

// Other code...

useEffect(() => {
  setTriggerRead(false);
  queryClient.invalidateQueries({ queryKey: issuesQueryKey });
}, [blockNumber, queryClient]);
```

Now, when the user clicks the button, the hook will call the read function a single time, then set `watch` back to false.

---

## Setting UI Elements

You can use the "is" return values to set UI elements depending on the status of the hook as it attempts to call a function on the blockchain.

Try to modify your button to provide feedback to the user that the function has been called.

```tsx
// Bad code example, do not use
<button disabled={issuesIsLoading} onClick={handleTriggerRead}>
  {issuesIsLoading ? 'Loading' : 'Read Now'}
</button>
```

The above code won't break anything, but nothing will appear to happen. This happens because `isLoading` is only `true` in circumstances where data is loading for the first time, but no data is present. You could use this to show a spinning wheel in place of the list of issues.

Instead, try decomposing `isFetching` in your `useReadContract`. This property is true while data is being fetched, even if data has already been loaded once.

```tsx
// Imperfect code example, do not use
<button disabled={issuesIsFetching} onClick={handleTriggerRead}>
  {issuesIsFetching ? 'Loading' : 'Read Now'}
</button>
```

You'll probably see the button flicker very quickly since the call doesn't take very long. For a production app, you'd need to add additional handling to smooth out the experience.

---

## Passing Arguments

Arguments are passed into a `useReadContract` hook by adding an array of arguments, in order, to the `args` property. Common practice is to use React state variables set by UI elements to enable the arguments to be set and modified. For example, you might create a drop-down to set `issueNumber`, then fetch that issue with:

```tsx
// Incomplete code stub
const [issueNumber, setIssueNumber] = useState(0);

const { isLoading: getIssueIsLoading } = useReadContract({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'getIssue',
  args: [issueNumber],
});
```

Depending on your design needs, you can use the techniques above to either watch constantly for updates, or fetch them on user action.

---

## Conclusion

In this guide, you've learned how to use the `watch` feature of `useBlockNumber` combined with `useEffect` and `queryClient.invalidateQueries` to enable your frontend to see updates to your smart contract. You've also learned the costs of doing so, and some strategies for mitigation. You've learned how to pass arguments to your functions. Finally, you've learned how to use the properties returned by `useReadContract` to adjust your UI to improve the experience for your users.

---

[wagmi]: https://wagmi.sh/
[`useReadContract`]: https://wagmi.sh/react/hooks/useReadContract
[`useReadContract` hook]: ./useReadContract
[`useBlockNumber`]: https://wagmi.sh/react/api/hooks/useBlockNumber
[removed]: https://wagmi.sh/react/guides/migrate-from-v1-to-v2#removed-watch-property
[`useReadContracts`]: https://wagmi.sh/react/hooks/useReadContracts
[`pollingInterval`]: https://wagmi.sh/react/api/createConfig#pollinginterval
