import{u as r,j as e}from"./index-Dlxm52NL.js";const i={title:"Etherscan",description:"Learn about Etherscan",hide_table_of_contents:!1};function a(t){const n={a:"a",aside:"aside",div:"div",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"etherscan",children:["Etherscan",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#etherscan",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"In this article, you'll learn about Etherscan, a blockchain explorer to inspect the Blockchain state and activity."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this lesson, you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"List some of the features of Etherscan"}),`
`,e.jsx(n.li,{children:"Read data from the Bored Ape Yacht Club contract on Etherscan"}),`
`,e.jsx(n.li,{children:"Write data to a contract using Etherscan."}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://etherscan.io",children:"Etherscan"})," is a popular Blockchain explorer that works for several different networks. In it, you can explore the state and activity of a particular network."]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/etherscan-user-interface.png",alt:"Etherscan"})}),`
`,e.jsx(n.p,{children:"You can explore:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Blocks"}),`
`,e.jsx(n.li,{children:"Transactions"}),`
`,e.jsx(n.li,{children:"Smart contracts"}),`
`,e.jsx(n.li,{children:"And more!"}),`
`]}),`
`,e.jsx(n.p,{children:"For instance, the following shows the details of a Block:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/blocks.png",alt:"Block"})}),`
`,e.jsx(n.p,{children:"Where you see information such as:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Timestamp"}),`
`,e.jsx(n.li,{children:"Transactions"}),`
`,e.jsx(n.li,{children:"Block height"}),`
`,e.jsx(n.li,{children:"And other details"}),`
`]}),`
`,e.jsx(n.p,{children:"There are many variations of Etherscan for different networks. For example:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://basescan.org",children:"Base"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sepolia.basescan.org",children:"Base Sepolia"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sepolia.etherscan.io",children:"Sepolia Etherscan"})}),`
`]}),`
`,e.jsxs(n.h2,{id:"reading-data-from-smart-contracts-using-etherscan",children:["Reading data from smart contracts using Etherscan",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reading-data-from-smart-contracts-using-etherscan",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"One of the things you can do with Etherscan is interact with already-deployed contracts."}),`
`,e.jsxs(n.p,{children:["For example, if you want to read information from a famous contract such as ",e.jsx(n.a,{href:"https://etherscan.io/token/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",children:"BAYC"}),", you can simply go to Etherscan and explore the contract:"]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/bayc.png",alt:"BAYC"})}),`
`,e.jsx(n.p,{children:"You are able to see information such as:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The ETH balance it holds"}),`
`,e.jsx(n.li,{children:"The contract creator"}),`
`,e.jsx(n.li,{children:"The transaction when it was created"}),`
`,e.jsx(n.li,{children:"Latest transactions"}),`
`,e.jsx(n.li,{children:"And the verified contract"}),`
`]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.strong,{children:"Contract"})," tab, you can see the full source code of BAYC:"]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/bayc-verified.png",alt:"BAYC Verified"})}),`
`,e.jsx(n.p,{children:"For a developer, verifying contracts is important since it gives transparency to your users. However, there are some risks because this means that bad actors can see the full source code and can try to exploit it."}),`
`,e.jsxs(n.p,{children:["In order to read the state of the BAYC, you can go to the main menu and select the option ",e.jsx(n.strong,{children:"Read Contract"}),":"]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/bayc-read.png",alt:"BAYC Read"})}),`
`,e.jsx(n.p,{children:"After you select that option, you are able to see all of the read functions of the contract."}),`
`,e.jsx(n.p,{children:"You can also query who is the owner of the BAYC with id 150:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/bayc-query.png",alt:"BAYC Query"})}),`
`,e.jsxs(n.h2,{id:"writing-data-to-smart-contracts-using-etherscan",children:["Writing data to smart contracts using Etherscan",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#writing-data-to-smart-contracts-using-etherscan",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"In a similar fashion, you can read data from smart contracts using Etherscan. It is also possible to write data."}),`
`,e.jsxs(n.p,{children:["To write data, go to the ",e.jsx(n.strong,{children:"Write Contract"})," tab:"]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/bayc-write.png",alt:"Write Contract"})}),`
`,e.jsxs(n.p,{children:["From there, connect your wallet by clicking the ",e.jsx(n.strong,{children:"Connect with web3"})," button."]}),`
`,e.jsx(n.p,{children:"After you connect, the following UI appears:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/etherscan/bayc-write-connected.png",alt:"Write BAYC Connected"})}),`
`,e.jsx(n.p,{children:"You can then call the functions you wish to write to."}),`
`,e.jsx(n.aside,{"data-callout":"info",children:e.jsx(n.p,{children:"Be aware that you may need to have real Ethereum in case you want to write to a contract in Ethereum mainnet. Also, any logic that the smart contract defines will be respected. This means that if you try to write to a contract that verifies certain conditions during the transaction (e.g., a function where only the owner of the contract can write information), then you won't be able to execute the transaction if you are not the owner."})}),`
`,e.jsxs(n.h2,{id:"conclusion",children:["Conclusion",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"In this lesson, you've learned some of the main features of Etherscan, including interacting with already-deployed contracts such as BAYC in order to read and write data."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"see-also",children:["See also",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#see-also",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})]})}function c(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{c as default,i as frontmatter};
