import{u as a,j as e}from"./index-Dlxm52NL.js";const c={title:"Contract Verification",description:"Verify your contract and interact with it.",hide_table_of_contents:!1};function i(n){const t={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",p:"p",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.header,{children:e.jsxs(t.h1,{id:"contract-verification",children:["Contract Verification",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#contract-verification",children:e.jsx(t.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(t.p,{children:"Once your contract is deployed, you can verify it using a number of popular services. Doing so will let your users have confidence that your contract does what you claim, and will allow you to interact with it using a similar interface to what you used in Remix."}),`
`,e.jsx(t.hr,{}),`
`,e.jsxs(t.h2,{id:"objectives",children:["Objectives",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:"By the end of this lesson you should be able to:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Verify a contract on the Base Sepolia testnet and interact with it in [BaseScan]"}),`
`]}),`
`,e.jsx(t.hr,{}),`
`,e.jsxs(t.h3,{id:"verify-the-contract",children:["Verify the Contract",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verify-the-contract",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:"Make sure you still have the address of the contract you deployed in the last article copied to the clipboard."}),`
`,e.jsx(t.p,{children:"You can interact with your deployed contract using Remix, the same as before, but it's also possible to interact with it through BaseScan. Paste your address in the search field to find it."}),`
`,e.jsx(t.p,{children:"On this page, you can review the balance, information about, and all the transactions that have ever occurred with your contract."}),`
`,e.jsxs(t.p,{children:["Click the ",e.jsx(t.em,{children:"Contract"})," tab in the main panel. At the top is a message asking you to ",e.jsx(t.em,{children:"Verify and Publish"})," your contract source code."]}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/learn/deployment-to-testnet/verify-and-publish.png",alt:"Verify"})}),`
`,e.jsx(t.p,{children:"Verifying your contract maps the names of your functions and variables to the compiled byte code, which makes it possible to interact with the contract using a human-readable interface."}),`
`,e.jsx(t.p,{children:"Click the link. Your contract address is already entered."}),`
`,e.jsxs(t.p,{children:["Under ",e.jsx(t.em,{children:"Please select Compiler Type"})," choose Solidity (Single file)"]}),`
`,e.jsxs(t.p,{children:["For ",e.jsx(t.em,{children:"Please Select Compiler Version"})," select the version matching the ",e.jsx(t.code,{children:"pragma"})," at the top of your source file. Our examples are currently using ",e.jsx(t.em,{children:"v0.8.17+commit.8df45f5f"}),"."]}),`
`,e.jsxs(t.p,{children:["For ",e.jsx(t.em,{children:"Please select Open Source License Type"})," pick the license that matches what you selected for your contract as the ",e.jsx(t.code,{children:"SPDX-License-Identifier"}),". Pick ",e.jsx(t.em,{children:"None"})," if you followed the Solidity-recommended practice of using ",e.jsx(t.code,{children:"UNLICENSED"}),"."]}),`
`,e.jsxs(t.p,{children:["On the next page, copy and paste your source code in the window. Verify that you are not a robot, and click ",e.jsx(t.em,{children:"Verify and Publish"}),". You should see a success message."]}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"/images/learn/deployment-to-testnet/compiler-debug-log.png",alt:"Success"})}),`
`,e.jsx(t.p,{children:"Click the linked address to your contract to return to the contract page. You'll now see your code!"}),`
`,e.jsx(t.aside,{"data-callout":"tip",children:e.jsxs(t.p,{children:["If you have imports, you'll need to right-click on the name of the file and choose ",e.jsx(t.code,{children:"Flatten"}),". Submit the newly generated ",e.jsx(t.code,{children:"filename_flattened.sol"})," for verification."]})}),`
`,e.jsxs(t.h3,{id:"interact-with-the-contract",children:["Interact with the Contract",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#interact-with-the-contract",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.p,{children:["You can now interact with your contract using BaseScan. Click the ",e.jsx(t.em,{children:"Read Contract"})," button. Both of your functions will be listed here and can be tested using the web interface."]}),`
`,e.jsxs(t.p,{children:["You won't have anything under ",e.jsx(t.em,{children:"Write Contract"})," because this contract doesn't have any functions that save data to state."]}),`
`,e.jsx(t.hr,{}),`
`,e.jsxs(t.h2,{id:"conclusion",children:["Conclusion",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:"With your contracts verified, you can interact with them using online tools and your users can be secure that your code does what you claim."}),`
`,e.jsx(t.hr,{}),`
`,e.jsxs(t.p,{children:[`[set up]:
[coinbase settings]: `,e.jsx(t.a,{href:"https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings",children:"https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings"}),`
[BaseScan]: `,e.jsx(t.a,{href:"https://sepolia.basescan.org/",children:"https://sepolia.basescan.org/"}),`
[faucets on the web]: `,e.jsx(t.a,{href:"https://coinbase.com/faucets",children:"https://coinbase.com/faucets"})]})]})}function o(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{o as default,c as frontmatter};
