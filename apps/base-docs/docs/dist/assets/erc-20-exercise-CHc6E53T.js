import{u as r,j as e}from"./index-Dlxm52NL.js";import{C as i}from"./index-Dd5MgiBM.js";import"./OnchainKitProvider-BMiQl1rP.js";/* empty css               */import"./Wallet-ZJuZDvIz.js";import"./useIsMounted-oytDHuHo.js";import"./isApplePaySupported-CKnrYHmE.js";import"./getSwapErrorCode-Rcq4QZsj.js";import"./useAccount-BLyN9GYK.js";import"./Name-BQXefeTI.js";import"./attestations-CryG6VVa.js";import"./useValue-BadCClMc.js";import"./useOnchainKit-BS9QuBF4.js";import"./waitForTransactionReceipt-DqmUmnvq.js";import"./parseAbi-DHKPviCp.js";import"./isAddressEqual-DsE_vq1q.js";import"./secp256k1-B-O1ujgT.js";import"./constants-cvMn9d8Y.js";import"./useChainId-d5iqIE3x.js";import"./useIcon-C51nxPJS.js";import"./Spinner-DJZ1Iw6h.js";import"./useGetETHBalance-Be2rjpzo.js";import"./useGetTokenBalance-D84Q7gP2.js";import"./getWindowDimensions-iG_J0Zn9.js";import"./useTheme-DG4jZ5Gt.js";import"./ConnectWallet-BZ56ys6q.js";import"./FocusTrap-C4EZ6vry.js";import"./closeSvg--Ik2tSBz.js";import"./FundCardPaymentMethodSelectorToggle-Bf15ueU3.js";import"./caretUpSvg-DYRHzkJF.js";import"./TokenImage-C5Bcv8Gy.js";import"./TextInput-QLQFuuli.js";import"./Address-Db7MZz8P.js";import"./TokenChip-DXi-Bogr.js";import"./TokenSelectDropdown-xGJCx3bS.js";import"./TokenRow-9hxCt2AH.js";import"./formatAmount-VbJdmdo2.js";import"./Popover-WpjJ--IT.js";import"./errorSvg-CqKVj3B9.js";import"./Transaction-BX8KSxqx.js";import"./useWaitForTransactionReceipt-C_3LN241.js";import"./TransactionStatus-aSJkH5zK.js";import"./useIsWalletACoinbaseSmartWallet-CaXUzJZY.js";import"./Identity-DbNDIy-p.js";import"./WalletDropdownBasename-Cl-zc6EU.js";const L={title:"ERC-20 Tokens Exercise",description:"Exercise - Create your own ERC-20 token!",hide_table_of_contents:!1};function t(s){const n={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"erc-20-tokens-exercise",children:["ERC-20 Tokens Exercise",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#erc-20-tokens-exercise",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"Create a contract that adheres to the following specifications."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"contract",children:["Contract",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#contract",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Create a contract called ",e.jsx(n.code,{children:"WeightedVoting"}),". Add the following:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.code,{children:"maxSupply"})," of 1,000,000"]}),`
`,e.jsxs(n.li,{children:["Errors for:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"TokensClaimed"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"AllTokensClaimed"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"NoTokensHeld"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"QuorumTooHigh"}),", returning the quorum amount proposed"]}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"AlreadyVoted"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"VotingClosed"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["A struct called ",e.jsx(n.code,{children:"Issue"})," containing:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["An OpenZeppelin Enumerable Set storing addresses called ",e.jsx(n.code,{children:"voters"})]}),`
`,e.jsxs(n.li,{children:["A string ",e.jsx(n.code,{children:"issueDesc"})]}),`
`,e.jsxs(n.li,{children:["Storage for the number of ",e.jsx(n.code,{children:"votesFor"}),", ",e.jsx(n.code,{children:"votesAgainst"}),", ",e.jsx(n.code,{children:"votesAbstain"}),", ",e.jsx(n.code,{children:"totalVotes"}),", and ",e.jsx(n.code,{children:"quorum"})]}),`
`,e.jsxs(n.li,{children:["Bools storing if the issue is ",e.jsx(n.code,{children:"passed"})," and ",e.jsx(n.code,{children:"closed"})]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.div,{children:e.jsxs(n.p,{children:["The unit tests require this ",e.jsx(n.code,{children:"struct"})," to be constructed with the variables in the order above."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["An array of ",e.jsx(n.code,{children:"Issue"}),"s called ",e.jsx(n.code,{children:"issues"})]}),`
`,e.jsxs(n.li,{children:["An ",e.jsx(n.code,{children:"enum"})," for ",e.jsx(n.code,{children:"Vote"})," containing:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"AGAINST"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"FOR"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"ABSTAIN"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Anything else needed to complete the tasks"}),`
`]}),`
`,e.jsx(n.p,{children:"Add the following functions."}),`
`,e.jsxs(n.h3,{id:"constructor",children:["Constructor",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#constructor",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Initialize the ERC-20 token and burn the zeroeth element of ",e.jsx(n.code,{children:"issues"}),"."]}),`
`,e.jsxs(n.h3,{id:"claim",children:["Claim",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#claim",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Add a ",e.jsx(n.code,{children:"public"})," function called ",e.jsx(n.code,{children:"claim"}),". When called, so long as a number of tokens equalling the ",e.jsx(n.code,{children:"maximumSupply"})," have not yet been distributed, any wallet ",e.jsx(n.em,{children:"that has not made a claim previously"})," should be able to claim 100 tokens. If a wallet tries to claim a second time, it should revert with ",e.jsx(n.code,{children:"TokensClaimed"}),"."]}),`
`,e.jsxs(n.p,{children:["Once all tokens have been claimed, this function should revert with an error ",e.jsx(n.code,{children:"AllTokensClaimed"}),"."]}),`
`,e.jsxs(n.div,{children:[e.jsxs(n.p,{children:["In our simple token, we used ",e.jsx(n.code,{children:"totalSupply"})," to mint our tokens up front. The ERC20 implementation we're using also tracks ",e.jsx(n.code,{children:"totalSupply"}),", but does it differently."]}),e.jsx(n.p,{children:"Review the docs and code comments to learn how."})]}),`
`,e.jsxs(n.h3,{id:"create-issue",children:["Create Issue",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#create-issue",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Implement an ",e.jsx(n.code,{children:"external"})," function called ",e.jsx(n.code,{children:"createIssue"}),". It should add a new ",e.jsx(n.code,{children:"Issue"})," to ",e.jsx(n.code,{children:"issues"}),", allowing the user to set the description of the issue, and ",e.jsx(n.code,{children:"quorum"})," - which is how many votes are needed to close the issue."]}),`
`,e.jsxs(n.p,{children:["Only token holders are allowed to create issues, and issues cannot be created that require a ",e.jsx(n.code,{children:"quorum"})," greater than the current total number of tokens."]}),`
`,e.jsx(n.p,{children:"This function must return the index of the newly-created issue."}),`
`,e.jsx(n.div,{children:e.jsxs(n.p,{children:["One of the unit tests will break if you place your check for ",e.jsx(n.code,{children:"quorum"})," before the check that the user holds a token. The test compares encoded error names, which are ",e.jsx(n.strong,{children:"not"})," human-readable. If you are getting ",e.jsx(n.code,{children:"-> AssertionError: �s is not equal to �9�"})," or similar, this is likely the issue."]})}),`
`,e.jsxs(n.h3,{id:"get-issue",children:["Get Issue",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#get-issue",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Add an ",e.jsx(n.code,{children:"external"})," function called ",e.jsx(n.code,{children:"getIssue"})," that can return all of the data for the issue of the provided ",e.jsx(n.code,{children:"_id"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"EnumerableSet"})," has a ",e.jsx(n.code,{children:"mapping"})," underneath, so it can't be returned outside of the contract. You'll have to figure something else out."]}),`
`,e.jsx(n.p,{children:":::info Hint"}),`
`,e.jsxs(n.p,{children:["The return type for this function should be a ",e.jsx(n.code,{children:"struct"})," very similar to the one that stores the issues."]}),`
`,e.jsx(n.p,{children:":::"}),`
`,e.jsxs(n.h3,{id:"vote",children:["Vote",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#vote",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Add a ",e.jsx(n.code,{children:"public"})," function called ",e.jsx(n.code,{children:"vote"})," that accepts an ",e.jsx(n.code,{children:"_issueId"})," and the token holder's vote. The function should revert if the issue is closed, or the wallet has already voted on this issue."]}),`
`,e.jsx(n.p,{children:"Holders must vote all of their tokens for, against, or abstaining from the issue. This amount should be added to the appropriate member of the issue and the total number of votes collected."}),`
`,e.jsxs(n.p,{children:["If this vote takes the total number of votes to or above the ",e.jsx(n.code,{children:"quorum"})," for that vote, then:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The issue should be set so that ",e.jsx(n.code,{children:"closed"})," is true"]}),`
`,e.jsxs(n.li,{children:["If there are ",e.jsx(n.strong,{children:"more"})," votes for than against, set ",e.jsx(n.code,{children:"passed"})," to ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h3,{id:"submit-your-contract-and-earn-an-nft-badge-beta",children:["Submit your Contract and Earn an NFT Badge! (BETA)",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#submit-your-contract-and-earn-an-nft-badge-beta",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.aside,{"data-callout":"info",children:[e.jsxs(n.h4,{id:"hey-whered-my-nft-go",children:["Hey, where'd my NFT go!?",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hey-whered-my-nft-go",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),e.jsxs(n.p,{children:[e.jsx(n.a,{href:"/learn/deployment-to-testnet/test-networks",children:"Testnets"})," are not permanent! Base Goerli ",e.jsx(n.a,{href:"https://base.mirror.xyz/kkz1-KFdUwl0n23PdyBRtnFewvO48_m-fZNzPMJehM4",children:"will soon be sunset"}),", in favor of Base Sepolia."]}),e.jsxs(n.p,{children:["As these are separate networks with separate data, your NFTs ",e.jsx(n.strong,{children:"will not"})," transfer over."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Don't worry!"})," We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!"]})]}),`
`,e.jsxs(n.div,{children:[e.jsxs(n.p,{children:["The contract specification contains actions that can only be performed once by a given address. As a result, the unit tests for a passing contract will only be successful the ",e.jsx(n.strong,{children:"first"})," time you test."]}),e.jsx(n.strong,{children:"You may need to submit a fresh deployment to pass"})]}),`
`,`
`,e.jsx(i,{nftNum:14})]})}function Q(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{Q as default,L as frontmatter};
