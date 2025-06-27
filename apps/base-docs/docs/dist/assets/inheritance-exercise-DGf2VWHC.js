import{u as i,j as e}from"./index-Dlxm52NL.js";import{C as a}from"./index-Dd5MgiBM.js";import"./OnchainKitProvider-BMiQl1rP.js";/* empty css               */import"./Wallet-ZJuZDvIz.js";import"./useIsMounted-oytDHuHo.js";import"./isApplePaySupported-CKnrYHmE.js";import"./getSwapErrorCode-Rcq4QZsj.js";import"./useAccount-BLyN9GYK.js";import"./Name-BQXefeTI.js";import"./attestations-CryG6VVa.js";import"./useValue-BadCClMc.js";import"./useOnchainKit-BS9QuBF4.js";import"./waitForTransactionReceipt-DqmUmnvq.js";import"./parseAbi-DHKPviCp.js";import"./isAddressEqual-DsE_vq1q.js";import"./secp256k1-B-O1ujgT.js";import"./constants-cvMn9d8Y.js";import"./useChainId-d5iqIE3x.js";import"./useIcon-C51nxPJS.js";import"./Spinner-DJZ1Iw6h.js";import"./useGetETHBalance-Be2rjpzo.js";import"./useGetTokenBalance-D84Q7gP2.js";import"./getWindowDimensions-iG_J0Zn9.js";import"./useTheme-DG4jZ5Gt.js";import"./ConnectWallet-BZ56ys6q.js";import"./FocusTrap-C4EZ6vry.js";import"./closeSvg--Ik2tSBz.js";import"./FundCardPaymentMethodSelectorToggle-Bf15ueU3.js";import"./caretUpSvg-DYRHzkJF.js";import"./TokenImage-C5Bcv8Gy.js";import"./TextInput-QLQFuuli.js";import"./Address-Db7MZz8P.js";import"./TokenChip-DXi-Bogr.js";import"./TokenSelectDropdown-xGJCx3bS.js";import"./TokenRow-9hxCt2AH.js";import"./formatAmount-VbJdmdo2.js";import"./Popover-WpjJ--IT.js";import"./errorSvg-CqKVj3B9.js";import"./Transaction-BX8KSxqx.js";import"./useWaitForTransactionReceipt-C_3LN241.js";import"./TransactionStatus-aSJkH5zK.js";import"./useIsWalletACoinbaseSmartWallet-CaXUzJZY.js";import"./Identity-DbNDIy-p.js";import"./WalletDropdownBasename-Cl-zc6EU.js";const Q={title:"Inheritance Exercise",description:"Exercise - Demonstrate your knowledge of inheritance.",hide_table_of_contents:!1};function s(r){const n={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"inheritance-exercise",children:["Inheritance Exercise",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#inheritance-exercise",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"Create contracts that adhere to the following specifications."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"contracts",children:["Contracts",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#contracts",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"employee",children:["Employee",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#employee",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Create an ",e.jsx(n.code,{children:"abstract"})," contract called ",e.jsx(n.code,{children:"Employee"}),". It should have:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A public variable storing ",e.jsx(n.code,{children:"idNumber"})]}),`
`,e.jsxs(n.li,{children:["A public variable storing ",e.jsx(n.code,{children:"managerId"})]}),`
`,e.jsx(n.li,{children:"A constructor that accepts arguments for and sets both of these variables"}),`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.code,{children:"virtual"})," function called ",e.jsx(n.code,{children:"getAnnualCost"})," that returns a ",e.jsx(n.code,{children:"uint"})]}),`
`]}),`
`,e.jsxs(n.h3,{id:"salaried",children:["Salaried",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#salaried",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["A contract called ",e.jsx(n.code,{children:"Salaried"}),". It should:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Inherit from ",e.jsx(n.code,{children:"Employee"})]}),`
`,e.jsxs(n.li,{children:["Have a public variable for ",e.jsx(n.code,{children:"annualSalary"})]}),`
`,e.jsxs(n.li,{children:["Implement an ",e.jsx(n.code,{children:"override"})," function for ",e.jsx(n.code,{children:"getAnnualCost"})," that returns ",e.jsx(n.code,{children:"annualSalary"})]}),`
`,e.jsxs(n.li,{children:["An appropriate constructor that performs any setup, including setting ",e.jsx(n.code,{children:"annualSalary"})]}),`
`]}),`
`,e.jsxs(n.h3,{id:"hourly",children:["Hourly",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hourly",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Implement a contract called ",e.jsx(n.code,{children:"Hourly"}),". It should:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Inherit from ",e.jsx(n.code,{children:"Employee"})]}),`
`,e.jsxs(n.li,{children:["Have a public variable storing ",e.jsx(n.code,{children:"hourlyRate"})]}),`
`,e.jsx(n.li,{children:"Include any other necessary setup and implementation"}),`
`]}),`
`,e.jsx(n.aside,{"data-callout":"tip",children:e.jsx(n.p,{children:"The annual cost of an hourly employee is their hourly rate * 2080 hours."})}),`
`,e.jsxs(n.h3,{id:"manager",children:["Manager",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#manager",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Implement a contract called ",e.jsx(n.code,{children:"Manager"}),". It should:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Have a public array storing employee Ids"}),`
`,e.jsxs(n.li,{children:["Include a function called ",e.jsx(n.code,{children:"addReport"})," that can add id numbers to that array"]}),`
`,e.jsxs(n.li,{children:["Include a function called ",e.jsx(n.code,{children:"resetReports"})," that can reset that array to empty"]}),`
`]}),`
`,e.jsxs(n.h3,{id:"salesperson",children:["Salesperson",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#salesperson",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Implement a contract called ",e.jsx(n.code,{children:"Salesperson"})," that inherits from ",e.jsx(n.code,{children:"Hourly"}),"."]}),`
`,e.jsxs(n.h3,{id:"engineering-manager",children:["Engineering Manager",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#engineering-manager",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Implement a contract called ",e.jsx(n.code,{children:"EngineeringManager"})," that inherits from ",e.jsx(n.code,{children:"Salaried"})," and ",e.jsx(n.code,{children:"Manager"}),"."]}),`
`,e.jsxs(n.h2,{id:"deployments",children:["Deployments",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deployments",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"You'll have to do a more complicated set of deployments for this exercise."}),`
`,e.jsxs(n.p,{children:["Deploy your ",e.jsx(n.code,{children:"Salesperson"})," and ",e.jsx(n.code,{children:"EngineeringManager"})," contracts. You don't need to separately deploy the other contracts."]}),`
`,e.jsx(n.p,{children:"Use the following values:"}),`
`,e.jsxs(n.h3,{id:"salesperson-1",children:["Salesperson",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#salesperson-1",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Hourly rate is 20 dollars an hour"}),`
`,e.jsx(n.li,{children:"Id number is 55555"}),`
`,e.jsx(n.li,{children:"Manager Id number is 12345"}),`
`]}),`
`,e.jsxs(n.h3,{id:"manager-1",children:["Manager",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#manager-1",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Annual salary is 200,000"}),`
`,e.jsx(n.li,{children:"Id number is 54321"}),`
`,e.jsx(n.li,{children:"Manager Id is 11111"}),`
`]}),`
`,e.jsxs(n.h2,{id:"inheritance-submission",children:["Inheritance Submission",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#inheritance-submission",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Copy the below contract and deploy it using the addresses of your ",e.jsx(n.code,{children:"Salesperson"})," and ",e.jsx(n.code,{children:"EngineeringManager"})," contracts."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" InheritanceSubmission"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    address"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" public"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" salesPerson;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    address"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" public"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" engineeringManager;"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    constructor"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"address"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _salesPerson, "}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"address"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _engineeringManager) {"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        salesPerson "}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _salesPerson;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        engineeringManager "}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _engineeringManager;"})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"submit-your-contracts-and-earn-an-nft-badge-beta",children:["Submit your Contracts and Earn an NFT Badge! (BETA)",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#submit-your-contracts-and-earn-an-nft-badge-beta",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.aside,{"data-callout":"info",children:[e.jsxs(n.h4,{id:"hey-whered-my-nft-go",children:["Hey, where'd my NFT go!?",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hey-whered-my-nft-go",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),e.jsxs(n.p,{children:[e.jsx(n.a,{href:"/learn/deployment-to-testnet/test-networks",children:"Testnets"})," are not permanent! Base Goerli ",e.jsx(n.a,{href:"https://base.mirror.xyz/kkz1-KFdUwl0n23PdyBRtnFewvO48_m-fZNzPMJehM4",children:"will soon be sunset"}),", in favor of Base Sepolia."]}),e.jsxs(n.p,{children:["As these are separate networks with separate data, your NFTs ",e.jsx(n.strong,{children:"will not"})," transfer over."]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Don't worry!"})," We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!"]})]}),`
`,e.jsx(n.div,{children:e.jsxs(n.p,{children:["Submit your address for your copy of the ",e.jsx(n.code,{children:"InheritanceSubmission"})," contract that contains your other contract addresses."]})}),`
`,`
`,e.jsx(a,{nftNum:8})]})}function V(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{V as default,Q as frontmatter};
