import{u as i,j as e}from"./index-Dlxm52NL.js";import{C as a}from"./index-Dd5MgiBM.js";import"./OnchainKitProvider-BMiQl1rP.js";/* empty css               */import"./Wallet-ZJuZDvIz.js";import"./useIsMounted-oytDHuHo.js";import"./isApplePaySupported-CKnrYHmE.js";import"./getSwapErrorCode-Rcq4QZsj.js";import"./useAccount-BLyN9GYK.js";import"./Name-BQXefeTI.js";import"./attestations-CryG6VVa.js";import"./useValue-BadCClMc.js";import"./useOnchainKit-BS9QuBF4.js";import"./waitForTransactionReceipt-DqmUmnvq.js";import"./parseAbi-DHKPviCp.js";import"./isAddressEqual-DsE_vq1q.js";import"./secp256k1-B-O1ujgT.js";import"./constants-cvMn9d8Y.js";import"./useChainId-d5iqIE3x.js";import"./useIcon-C51nxPJS.js";import"./Spinner-DJZ1Iw6h.js";import"./useGetETHBalance-Be2rjpzo.js";import"./useGetTokenBalance-D84Q7gP2.js";import"./getWindowDimensions-iG_J0Zn9.js";import"./useTheme-DG4jZ5Gt.js";import"./ConnectWallet-BZ56ys6q.js";import"./FocusTrap-C4EZ6vry.js";import"./closeSvg--Ik2tSBz.js";import"./FundCardPaymentMethodSelectorToggle-Bf15ueU3.js";import"./caretUpSvg-DYRHzkJF.js";import"./TokenImage-C5Bcv8Gy.js";import"./TextInput-QLQFuuli.js";import"./Address-Db7MZz8P.js";import"./TokenChip-DXi-Bogr.js";import"./TokenSelectDropdown-xGJCx3bS.js";import"./TokenRow-9hxCt2AH.js";import"./formatAmount-VbJdmdo2.js";import"./Popover-WpjJ--IT.js";import"./errorSvg-CqKVj3B9.js";import"./Transaction-BX8KSxqx.js";import"./useWaitForTransactionReceipt-C_3LN241.js";import"./TransactionStatus-aSJkH5zK.js";import"./useIsWalletACoinbaseSmartWallet-CaXUzJZY.js";import"./Identity-DbNDIy-p.js";import"./WalletDropdownBasename-Cl-zc6EU.js";const Z={title:"Storage Exercise",description:"Exercise - Demonstrate your knowledge of storage.",hide_table_of_contents:!1};function r(n){const s={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"storage-exercise",children:["Storage Exercise",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#storage-exercise",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"Create a contract that adheres to the following specifications:"}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"contract",children:["Contract",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#contract",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["Create a single contract called ",e.jsx(s.code,{children:"EmployeeStorage"}),". It should not inherit from any other contracts. It should have the following functions:"]}),`
`,e.jsxs(s.h3,{id:"state-variables",children:["State Variables",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#state-variables",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The contract should have the following state variables, optimized to minimize storage:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["A private variable ",e.jsx(s.code,{children:"shares"})," storing the employee's number of shares owned",`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Employees with more than 5,000 shares count as directors and are stored in another contract"}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:["Public variable ",e.jsx(s.code,{children:"name"})," which stores the employee's name"]}),`
`,e.jsxs(s.li,{children:["A private variable ",e.jsx(s.code,{children:"salary"})," storing the employee's salary",`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Salaries range from 0 to 1,000,000 dollars"}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:["A public variable ",e.jsx(s.code,{children:"idNumber"})," storing the employee's ID number",`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Employee numbers are not sequential, so this field should allow any number up to 2^256-1"}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(s.h3,{id:"constructor",children:["Constructor",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#constructor",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["When deploying the contract, utilize the ",e.jsx(s.code,{children:"constructor"})," to set:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"shares"})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"name"})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"salary"})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"idNumber"})}),`
`]}),`
`,e.jsxs(s.p,{children:["For the purposes of the test, you ",e.jsx(s.strong,{children:"must"})," deploy the contract with the following values:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"shares"})," - 1000"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"name"})," - Pat"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"salary"})," - 50000"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"idNumber"})," - 112358132134"]}),`
`]}),`
`,e.jsxs(s.h3,{id:"view-salary-and-view-shares",children:["View Salary and View Shares",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#view-salary-and-view-shares",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.aside,{"data-callout":"danger",children:[e.jsxs(s.p,{children:["In the world of blockchain, nothing is ever secret!* ",e.jsx(s.code,{children:"private"})," variables prevent other contracts from reading the value. You should use them as a part of clean programming practices, but marking a variable as private ",e.jsxs(s.strong,{children:["does ",e.jsx(s.em,{children:"not"})," hide the value"]}),". All data is trivially available to anyone who knows how to fetch data from the chain."]}),e.jsx(s.p,{children:"*You can make clever use of encryption though!"})]}),`
`,e.jsxs(s.p,{children:["Write a function called ",e.jsx(s.code,{children:"viewSalary"})," that returns the value in ",e.jsx(s.code,{children:"salary"}),"."]}),`
`,e.jsxs(s.p,{children:["Write a function called ",e.jsx(s.code,{children:"viewShares"})," that returns the value in ",e.jsx(s.code,{children:"shares"}),"."]}),`
`,e.jsxs(s.h3,{id:"grant-shares",children:["Grant Shares",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#grant-shares",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["Add a public function called ",e.jsx(s.code,{children:"grantShares"})," that increases the number of shares allocated to an employee by ",e.jsx(s.code,{children:"_newShares"}),". It should:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Add the provided number of shares to the ",e.jsx(s.code,{children:"shares"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["If this would result in more than 5000 shares, revert with a custom error called ",e.jsx(s.code,{children:"TooManyShares"})," that returns the number of shares the employee would have with the new amount added"]}),`
`,e.jsxs(s.li,{children:["If the number of ",e.jsx(s.code,{children:"_newShares"}),' is greater than 5000, revert with a string message, "Too many shares"']}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(s.h3,{id:"check-for-packing-and-debug-reset-shares",children:["Check for Packing and Debug Reset Shares",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#check-for-packing-and-debug-reset-shares",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Add the following function to your contract exactly as written below."}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"/**"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* Do not modify this function.  It is used to enable the unit test for this pin"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* to check whether or not you have configured your storage variables to make"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* use of packing."})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"*"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* If you wish to cheat, simply modify this function to always return `0`"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* I'm not your boss ¯\\_(ツ)_/¯"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"*"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* Fair warning though, if you do cheat, it will be on the blockchain having been"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* deployed by your wallet....FOREVER!"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"*/"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" checkForPacking"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _slot) "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" view"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" returns"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint"}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" r"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    assembly"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        r "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":="}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" sload"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" (_slot)"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"/**"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"* Warning: Anyone can use this function at any time!"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"*/"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" debugResetShares"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    shares "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" 1000"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h3,{id:"submit-your-contract-and-earn-an-nft-badge-beta",children:["Submit your Contract and Earn an NFT Badge! (BETA)",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#submit-your-contract-and-earn-an-nft-badge-beta",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.aside,{"data-callout":"info",children:[e.jsxs(s.h4,{id:"hey-whered-my-nft-go",children:["Hey, where'd my NFT go!?",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hey-whered-my-nft-go",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),e.jsxs(s.p,{children:[e.jsx(s.a,{href:"/learn/deployment-to-testnet/test-networks",children:"Testnets"})," are not permanent! Base Goerli ",e.jsx(s.a,{href:"https://base.mirror.xyz/kkz1-KFdUwl0n23PdyBRtnFewvO48_m-fZNzPMJehM4",children:"will soon be sunset"}),", in favor of Base Sepolia."]}),e.jsxs(s.p,{children:["As these are separate networks with separate data, your NFTs ",e.jsx(s.strong,{children:"will not"})," transfer over."]}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Don't worry!"})," We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!"]})]}),`
`,`
`,e.jsx(a,{nftNum:3})]})}function Q(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{Q as default,Z as frontmatter};
