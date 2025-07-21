import{u as r,j as e}from"./index-Dlxm52NL.js";const l={title:"Verifying Smart Contracts",description:"Verifying smart contracts with Hardhat.",hide_table_of_contents:!1};function i(n){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"verifying-smart-contracts",children:["Verifying Smart Contracts",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verifying-smart-contracts",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"In this article, you'll learn how to verify smart contracts in Etherscan with hardhat and the hardhat deploy plugin."}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"objectives",children:["Objectives",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"By the end of this lesson, you should be able to:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Verify a deployed smart contract on Etherscan"}),`
`,e.jsx(s.li,{children:"Connect a wallet to a contract in Etherscan"}),`
`,e.jsx(s.li,{children:"Use etherscan to interact with your own deployed contract"}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"overview",children:["Overview",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Verifying smart contracts plays an important role in providing security and certainty to the users of your decentralized applications. By offering full visibility of the source code of your smart contract, you provide confidence and transparency of the intention of the code that is being executed."}),`
`,e.jsx(s.p,{children:"The way smart contracts are verified is by simply uploading the source code and contract address to services such as Etherscan."}),`
`,e.jsx(s.p,{children:"Once the contract is verified, the Etherscan explorer shows a status like the following image:"}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://github.com/base/web/blob/master/apps/base-docs/docs/public/images/learn/hardhat-verify/hardhat-verify.png",alt:"Verified contract"})}),`
`,e.jsx(s.p,{children:"Luckily, Hardhat and Hardhat-deploy already contain a built-in capability to do this task easily on your behalf."}),`
`,e.jsx(s.p,{children:"This process involves the following steps:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Getting an Etherscan key"}),`
`,e.jsx(s.li,{children:"Configuring Hardhat"}),`
`,e.jsx(s.li,{children:"Verifying"}),`
`]}),`
`,e.jsxs(s.h2,{id:"getting-an-etherscan-key",children:["Getting an Etherscan key",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getting-an-etherscan-key",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["In order to obtain an Etherscan API key, visit ",e.jsx(s.a,{href:"https://etherscan.io/",children:"Etherscan"})," and create an account."]}),`
`,e.jsxs(s.p,{children:["Then, go to ",e.jsx(s.a,{href:"https://etherscan.io/myapikey",children:"https://etherscan.io/myapikey"})," and create an API key by clicking the ",e.jsx(s.strong,{children:"Add"})," button:"]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://github.com/base/web/blob/master/apps/base-docs/docs/public/images/learn/hardhat-verify/harhat-verify-create-key.png",alt:"Add key"})}),`
`,e.jsx(s.p,{children:"Bear in mind that different networks have other Blockchain explorers. For example:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://basescan.org/",children:"Base"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://sepolia.etherscan.io/",children:"Sepolia"})}),`
`]}),`
`,e.jsx(s.p,{children:"You'll need to go to that particular explorer and get the API Key following a similar process as mentioned previously (except for Sepolia Etherscan, where you can use the Etherscan mainnet one instead)."}),`
`,e.jsxs(s.h2,{id:"configuring-hardhat",children:["Configuring Hardhat",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configuring-hardhat",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["You can configure the Etherscan API Key for each different network. For example, include the following to the ",e.jsx(s.code,{children:"hardhat.config.ts"})," file for Base Sepolia:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"base_sepolia"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"  url"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://sepolia.base.org"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"  accounts"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"    mnemonic"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": process.env."}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"MNEMONIC"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ??"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' ""'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"  verify"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"    etherscan"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"      apiUrl"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://api-sepolia.basescan.org"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"      apiKey"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": process.env."}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"ETHERSCAN_API_KEY"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsxs(s.p,{children:["Include in your ",e.jsx(s.code,{children:".env"})," file the following:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"ETHERSCAN_API_KEY=<"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"YOUR_ETHERSCAN_API_KEY"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]})})})}),`
`,e.jsxs(s.h2,{id:"verifying",children:["Verifying",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verifying",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"You verify in base, and to do so, simply run the following command:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npx"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" hardhat"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --network"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" base_sepolia"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" etherscan-verify"})]})})})}),`
`,e.jsx(s.p,{children:"You should receive the following response:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"verifying Lock ..."})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"waiting for result..."})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" => contract Lock is now verified"})})]})})}),`
`,e.jsx(s.p,{children:"You can now go to Basescan and search for your contract address, where you'll see the following:"}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/learn/hardhat-verify/hardhat-verify-success.png",alt:"Base scan success"})}),`
`,e.jsxs(s.h2,{id:"conclusion",children:["Conclusion",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"In this lesson, you've learned how to verify smart contracts using Hardhat and Hardhat-deploy. You learned how to configure Hardhat to support multiple networks and verify by using a simple command."}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"see-also",children:["See also",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#see-also",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})]})}function t(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{t as default,l as frontmatter};
