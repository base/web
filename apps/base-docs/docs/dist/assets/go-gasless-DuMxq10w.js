import{u as r,j as s}from"./index-Dlxm52NL.js";const a={title:"Gasless Transactions on Base using a Paymaster",slug:"/gasless-transaction-on-base-using-a-paymaster",description:"Learn how to leverage the Base Paymaster for seamless, gasless transactions on the Coinbase Cloud Developer Platform."};function i(n){const e={a:"a",aside:"aside",blockquote:"blockquote",br:"br",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"gasless-transactions-on-base-using-base-paymaster",children:["Gasless Transactions on Base using Base Paymaster",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#gasless-transactions-on-base-using-base-paymaster",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(e.p,{children:["Base transaction fees are typically less than a penny, but the concept of gas can still be confusing for new users and lead to poor user experience when users don't have gas funds in their wallet. You can abstract this away and improve your UX by using the ",s.jsx(e.strong,{children:"Base Paymaster"}),". The Paymaster allows you to:"]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Batch multi-step transactions"}),`
`,s.jsx(e.li,{children:"Create custom gasless experiences"}),`
`,s.jsx(e.li,{children:"Sponsor up to $15k monthly on mainnet (unlimited on testnet)"}),`
`]}),`
`,s.jsx(e.aside,{"data-callout":"tip",children:s.jsxs(e.p,{children:["If you need an increase in your sponsorship limit, please ",s.jsx(e.a,{href:"https://discord.com/invite/cdp",children:"reach out on Discord"}),"!"]})}),`
`,s.jsxs(e.h2,{id:"objectives",children:["Objectives",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsx(e.li,{children:"Configure security measures to ensure safe and reliable transactions."}),`
`,s.jsx(e.li,{children:"Manage and allocate resources for sponsored transactions."}),`
`,s.jsx(e.li,{children:"Subsidize transaction fees for users, enhancing the user experience by making transactions free."}),`
`,s.jsx(e.li,{children:"Set up and manage sponsored transactions on various schedules, including weekly, monthly, and daily cadences."}),`
`]}),`
`,s.jsxs(e.h2,{id:"prerequisites",children:["Prerequisites",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"This tutorial assumes you have:"}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"A Coinbase Cloud Developer Platform Account"}),s.jsx(e.br,{}),`
`,"If not, sign up on the ",s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/",children:"CDP site"}),". Once you have your account, you can manage projects and utilize tools like the Paymaster."]}),`
`]}),`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Familiarity with Smart Accounts and ERC 4337"}),s.jsx(e.br,{}),`
`,"Smart Accounts are the backbone of advanced transaction patterns (e.g., bundling, sponsorship). If you’re new to ERC 4337, check out external resources like the official ",s.jsx(e.a,{href:"https://eips.ethereum.org/EIPS/eip-4337",children:"EIP-4337 explainer"})," before starting."]}),`
`]}),`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Foundry"}),s.jsx(e.br,{}),`
`,"Foundry is a development environment, testing framework, and smart contract toolkit for Ethereum. You’ll need it installed locally for generating key pairs and interacting with smart contracts."]}),`
`]}),`
`]}),`
`,s.jsx(e.aside,{"data-callout":"tip",children:s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Testnet vs. Mainnet"}),s.jsx(e.br,{}),`
`,"If you prefer not to spend real funds, you can switch to ",s.jsx(e.strong,{children:"Base Sepolia"})," (testnet). The steps below are conceptually the same. Just select ",s.jsx(e.em,{children:"Base Sepolia"})," in the Coinbase Developer Platform instead of ",s.jsx(e.em,{children:"Base Mainnet"}),", and use a contract deployed on Base testnet for your allowlisted methods."]})}),`
`,s.jsxs(e.h2,{id:"set-up-a-base-paymaster--bundler",children:["Set Up a Base Paymaster & Bundler",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#set-up-a-base-paymaster--bundler",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"In this section, you will configure a Paymaster to sponsor payments on behalf of a specific smart contract for a specified amount."}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.strong,{children:["Navigate to the ",s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/",children:"Coinbase Developer Platform"}),"."]}),`
`]}),`
`,s.jsx(e.li,{children:"Create or select your project from the upper left corner of the screen."}),`
`,s.jsxs(e.li,{children:["Click on the ",s.jsx(e.strong,{children:"Paymaster"})," tool from the left navigation."]}),`
`,s.jsxs(e.li,{children:["Go to the ",s.jsx(e.strong,{children:"Configuration"})," tab and copy the ",s.jsx(e.strong,{children:"RPC URL"})," to your clipboard — you’ll need this shortly in your code."]}),`
`]}),`
`,s.jsxs(e.h3,{id:"screenshots",children:["Screenshots",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#screenshots",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Selecting your project"}),s.jsx(e.br,{}),`
`,s.jsx(e.img,{src:"/images/gasless-transaction-on-base/cdp-select-project.png",alt:"cdp-home.png"})]}),`
`]}),`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Navigating to the Paymaster tool"}),s.jsx(e.br,{}),`
`,s.jsx(e.img,{src:"/images/gasless-transaction-on-base/cdp-paymaster.png",alt:"cdp-paymaster-tool.png"})]}),`
`]}),`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Configuration screen"}),s.jsx(e.br,{}),`
`,s.jsx(e.img,{src:"/images/gasless-transaction-on-base/cdp-config.png",alt:"cdp-paymaster-tool.png"})]}),`
`]}),`
`]}),`
`,s.jsxs(e.h3,{id:"allowlist-a-sponsorable-contract",children:["Allowlist a Sponsorable Contract",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#allowlist-a-sponsorable-contract",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:["From the Configuration page, ensure ",s.jsx(e.strong,{children:"Base Mainnet"})," (or ",s.jsx(e.strong,{children:"Base Sepolia"})," if you’re testing) is selected."]}),`
`,s.jsx(e.li,{children:"Enable your paymaster by clicking the toggle button."}),`
`,s.jsxs(e.li,{children:["Click ",s.jsx(e.strong,{children:"Add"})," to add an allowlisted contract."]}),`
`,s.jsxs(e.li,{children:["For this example, add ",s.jsx(e.a,{href:"https://basescan.org/token/0x83bd615eb93ee1336aca53e185b03b54ff4a17e8",children:s.jsx(e.code,{children:"0x83bd615eb93eE1336acA53e185b03B54fF4A17e8"})}),", and add the function ",s.jsx(e.code,{children:"mintTo(address)"}),"."]}),`
`]}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/gasless-transaction-on-base/cdp-allowlist-contract.png",alt:"cdp-allowlist-contracts.png"})}),`
`,s.jsx(e.aside,{"data-callout":"info",children:s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Use your own contract"}),s.jsx(e.br,{}),`
`,"We use a ",s.jsx(e.a,{href:"https://basescan.org/token/0x83bd615eb93ee1336aca53e185b03b54ff4a17e8",children:"simple NFT contract"})," on Base mainnet as an example. Feel free to substitute your own."]})}),`
`,s.jsxs(e.h3,{id:"global--per-user-limits",children:["Global & Per User Limits",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#global--per-user-limits",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Scroll down to the ",s.jsx(e.strong,{children:"Per User Limit"})," section. You can set:"]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Dollar amount limit"})," or ",s.jsx(e.strong,{children:"number of UserOperations"})," per user"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Limit cycles"})," that reset daily, weekly, or monthly"]}),`
`]}),`
`,s.jsx(e.p,{children:"For example, you might set:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"max USD"})," to ",s.jsx(e.code,{children:"$0.05"})]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"max UserOperation"})," to ",s.jsx(e.code,{children:"1"})]}),`
`]}),`
`,s.jsxs(e.p,{children:["This means ",s.jsx(e.strong,{children:"each user"})," can only have $0.05 in sponsored gas and ",s.jsx(e.strong,{children:"1"})," user operation before the cycle resets."]}),`
`,s.jsx(e.aside,{"data-callout":"info",children:s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Limit Cycles"}),s.jsx(e.br,{}),`
`,"These reset based on the selected cadence (daily, weekly, monthly)."]})}),`
`,s.jsxs(e.p,{children:["Next, ",s.jsx(e.strong,{children:"set the Global Limit"}),". For example, set this to ",s.jsx(e.code,{children:"$0.07"})," so that once the entire paymaster has sponsored $0.07 worth of gas (across all users), no more sponsorship occurs unless you raise the limit."]}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/gasless-transaction-on-base/cdp-global-user-limits.png",alt:"cdp-global-user-limits.png"})}),`
`,s.jsxs(e.h2,{id:"test-your-paymaster-policy",children:["Test Your Paymaster Policy",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#test-your-paymaster-policy",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Now let’s verify that these policies work. We’ll:"}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsx(e.li,{children:"Create two local key pairs (or use private keys you own)."}),`
`,s.jsx(e.li,{children:"Generate two Smart Accounts."}),`
`,s.jsx(e.li,{children:"Attempt to sponsor multiple transactions to see your policy in action."}),`
`]}),`
`,s.jsxs(e.h3,{id:"installing-foundry",children:["Installing Foundry",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installing-foundry",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:["Ensure you have ",s.jsx(e.strong,{children:"Rust"})," installed",`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --proto"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '=https'"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --tlsv1.2"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -sSf"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://sh.rustup.rs"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" |"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" sh"})]})})})}),`
`]}),`
`,s.jsxs(e.li,{children:["Install Foundry",`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -L"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://foundry.paradigm.xyz"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" |"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" bash"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"foundryup"})})]})})}),`
`]}),`
`,s.jsxs(e.li,{children:["Verify it works",`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"cast"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --help"})]})})})}),`
`,"If you see Foundry usage info, you’re good to go!"]}),`
`]}),`
`,s.jsxs(e.h3,{id:"create-your-project--generate-key-pairs",children:["Create Your Project & Generate Key Pairs",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#create-your-project--generate-key-pairs",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:["Make a new folder and install dependencies, ",s.jsx(e.code,{children:"viem"})," and ",s.jsx(e.code,{children:"permissionless"}),":",`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"mkdir"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" sponsored_transactions"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"cd"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" sponsored_transactions"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" init"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" es6"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" install"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" permissionless"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" install"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" viem"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"touch"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" index.js"})]})]})})}),`
`]}),`
`,s.jsxs(e.li,{children:["Generate two key pairs with Foundry:",`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"cast"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" wallet"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" new"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"cast"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" wallet"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" new"})]})]})})}),`
`,"You’ll see something like:",`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"Successfully"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" created"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" new"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" keypair."})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"Address:"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 0xD440D746..."})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"Private"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" key:"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 0x01c9720c1dfa3c9..."})]})]})})}),`
`,s.jsx(e.strong,{children:"Store these private keys somewhere safe"}),`
`]}),`
`]}),`
`,s.jsxs(e.h3,{id:"project-structure-with-environment-variables",children:["Project Structure With Environment Variables",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#project-structure-with-environment-variables",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Create a ",s.jsx(e.code,{children:".env"})," file in the ",s.jsx(e.code,{children:"sponsored_transactions"})," directory. In the ",s.jsx(e.code,{children:".env"}),", you'll add the rpcURL for your paymaster and the private keys for your accounts:"]}),`
`,s.jsxs(e.aside,{"data-callout":"note",children:[s.jsx(e.strong,{"data-callout-title":!0,children:"Find your Paymaster & Bundler endpoint"}),s.jsxs(e.p,{children:[`The Paymaster & Bundler endpoint is the URL for your Coinbase Developer Platform (CDP) Paymaster.
This was saved in the previous section and follows this format: `,s.jsx(e.code,{children:"https://api.developer.coinbase.com/rpc/v1/base/<SPECIAL-KEY>"}),`
Navigate to the `,s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/products/bundler-and-paymaster",children:"Paymaster Tool"})," and select the ",s.jsx(e.code,{children:"Configuration"})," tab at the top of the screen to obtain your RPC URL."]})]}),`
`,s.jsxs(e.aside,{"data-callout":"danger",children:[s.jsx(e.strong,{"data-callout-title":!0,children:"Secure your endpoints"}),s.jsxs(e.p,{children:["You will create a constant for our Paymaster & Bundler endpoint obtained from cdp.portal.coinbase.com. The most secure way to do this is by using a proxy. For the purposes of this demo, hardcode it into our ",s.jsx(e.code,{children:"index.js"})," file. For product, we highly recommend using a ",s.jsx(e.a,{href:"https://www.smartwallet.dev/guides/paymasters",children:"proxy service"}),"."]})]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"PAYMASTER_RPC_URL"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"https://api.developer.coinbase.com/rpc/v1/base/"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"<"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"SPECIAL-KEY"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"PRIVATE_KEY_1"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"0x01c9720c1dfa3c9..."})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"PRIVATE_KEY_2"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"0xbcd6fbc1dfa3c9..."})]})]})})}),`
`,s.jsx(e.aside,{"data-callout":"danger",children:s.jsxs(e.p,{children:["Never commit ",s.jsx(e.code,{children:".env"})," files to a public repo!"]})}),`
`,s.jsxs(e.h2,{id:"example-indexjs",children:["Example ",s.jsx(e.code,{children:"index.js"}),s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#example-indexjs",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Below is a full example of how you might structure ",s.jsx(e.code,{children:"index.js"}),"."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// --- index.js ---"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// @noErrors"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 1. Import modules and environment variables"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'dotenv/config'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { http, createPublicClient, encodeFunctionData } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'viem'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { base } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'viem/chains'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { createSmartAccountClient } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'permissionless'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { privateKeyToSimpleSmartAccount } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'permissionless/accounts'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { createPimlicoPaymasterClient } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'permissionless/clients/pimlico'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 2. Retrieve secrets from .env"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Highlight: environment variables for paymaster, private keys"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" rpcUrl"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" process.env."}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"PAYMASTER_RPC_URL"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"; "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// highlight"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" firstPrivateKey"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" process.env."}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"PRIVATE_KEY_1"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"; "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// highlight"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" secondPrivateKey"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" process.env."}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"PRIVATE_KEY_2"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"; "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// highlight"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 3. Declare Base addresses (entrypoint & factory)"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" baseEntryPoint"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" baseFactoryAddress"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '0x15Ba39375ee2Ab563E8873C8390be6f2E2F50232'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 4. Create a public client for Base"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" publicClient"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" createPublicClient"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  chain: base,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  transport: "}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"http"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(rpcUrl),"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 5. Setup Paymaster client"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" cloudPaymaster"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" createPimlicoPaymasterClient"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  chain: base,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  transport: "}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"http"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(rpcUrl),"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  entryPoint: baseEntryPoint,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 6. Create Smart Accounts from the private keys"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"async"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" initSmartAccounts"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" simpleAccount"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" privateKeyToSimpleSmartAccount"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(publicClient, {"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    privateKey: firstPrivateKey,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    factoryAddress: baseFactoryAddress,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    entryPoint: baseEntryPoint,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  });"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" simpleAccount2"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" privateKeyToSimpleSmartAccount"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(publicClient, {"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    privateKey: secondPrivateKey,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    factoryAddress: baseFactoryAddress,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    entryPoint: baseEntryPoint,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  });"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // 7. Create SmartAccountClient for each"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" smartAccountClient"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" createSmartAccountClient"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    account: simpleAccount,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    chain: base,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    bundlerTransport: "}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"http"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(rpcUrl),"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    middleware: {"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      sponsorUserOperation: cloudPaymaster.sponsorUserOperation,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  });"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" smartAccountClient2"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" createSmartAccountClient"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    account: simpleAccount2,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    chain: base,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    bundlerTransport: "}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"http"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(rpcUrl),"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    middleware: {"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      sponsorUserOperation: cloudPaymaster.sponsorUserOperation,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  });"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  return"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { smartAccountClient, smartAccountClient2 };"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 8. ABI for the NFT contract"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" nftAbi"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ["})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // ..."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // truncated for brevity"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"];"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 9. Example function to send a transaction from a given SmartAccountClient"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"async"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" sendTransaction"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"client"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"recipientAddress"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  try"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:'    // encode the "mintTo" function call'})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" callData"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" encodeFunctionData"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      abi: nftAbi,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      functionName: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'mintTo'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      args: [recipientAddress], "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// highlight: specify who gets the minted NFT"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    });"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" txHash"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" client."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"sendTransaction"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      account: client.account,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      to: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'0x83bd615eb93eE1336acA53e185b03B54fF4A17e8'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// address of the NFT contract"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      data: callData,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      value: "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"0"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"n"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    });"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"`✅ Transaction successfully sponsored for ${"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"client"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"."}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"account"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"."}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"address"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"}`"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:");"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"`🔍 View on BaseScan: https://basescan.org/tx/${"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"txHash"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"}`"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:");"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"catch"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" (error) {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"error"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Transaction failed:'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", error);"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 10. Main flow: init accounts, send transactions"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"async"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" () "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"=>"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  const"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"smartAccountClient"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"smartAccountClient2"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" initSmartAccounts"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // Send a transaction from the first account"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  await"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" sendTransaction"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(smartAccountClient, smartAccountClient.account.address);"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // Send a transaction from the second account"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // For variety, let’s also mint to the second account's own address"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  await"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" sendTransaction"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(smartAccountClient2, smartAccountClient2.account.address);"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"})();"})})]})})}),`
`,s.jsxs(e.p,{children:[`Now that the code is implemented, lets run it:
Run this via `,s.jsx(e.code,{children:"node index.js"})," from your project root."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"node"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" index.js"})]})})})}),`
`,s.jsx(e.p,{children:'You should see a "Transaction successfully sponsored" output.'}),`
`,s.jsx(e.p,{children:"To confirm that your spend policies are correctly in place, try running the script again. If your Paymaster settings are strict (e.g., limit 1 transaction per user), the second time you run the script, you may get a “request denied” error, indicating the policy is working."}),`
`,s.jsxs(e.h2,{id:"hitting-policy-limits--troubleshooting",children:["Hitting Policy Limits & Troubleshooting",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hitting-policy-limits--troubleshooting",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Per-User Limit"}),s.jsx(e.br,{}),`
`,"If you see an error like:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "code"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"-32001"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "message"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"request denied - rejected due to maximum per address transaction count reached"'})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsxs(e.p,{children:["That means you’ve hit your ",s.jsx(e.strong,{children:"UserOperation"})," limit for a single account. Return to the ",s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/",children:"Coinbase Developer Platform"})," UI to adjust the policy."]}),`
`]}),`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Global Limit"}),s.jsx(e.br,{}),`
`,"If you repeatedly run transactions and eventually see:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "code"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"-32001"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "message"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"request denied - rejected due to max global usd spend limit reached"'})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsxs(e.p,{children:["You’ve hit the ",s.jsx(e.strong,{children:"global"})," limit of sponsored gas. Increase it in the CDP dashboard and wait a few minutes for changes to take effect."]}),`
`]}),`
`]}),`
`,s.jsxs(e.h2,{id:"verifying-token-ownership-optional",children:["Verifying Token Ownership (Optional)",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verifying-token-ownership-optional",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Want to confirm the token actually minted? You can read the NFT’s ",s.jsx(e.code,{children:"balanceOf"})," function:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { readContract } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'viem'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"; "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// highlight"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// example function"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"async"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" checkNftBalance"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"publicClient"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"contractAddress"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"abi"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"ownerAddress"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" balance"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" publicClient."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"readContract"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    address: contractAddress,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    abi,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    functionName: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'balanceOf'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    args: [ownerAddress],"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  });"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"`NFT balance of ${"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"ownerAddress"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"} is now: ${"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"balance"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"}`"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:");"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsxs(e.h2,{id:"conclusion",children:["Conclusion",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"In this tutorial, you:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["Set up and ",s.jsx(e.strong,{children:"configured"})," a Base Paymaster on the Coinbase Developer Platform."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Allowlisted"})," a contract and specific function (",s.jsx(e.code,{children:"mintTo"}),") for sponsorship."]}),`
`,s.jsxs(e.li,{children:["Established ",s.jsx(e.strong,{children:"per-user"})," and ",s.jsx(e.strong,{children:"global"})," sponsorship ",s.jsx(e.strong,{children:"limits"})," to control costs."]}),`
`,s.jsxs(e.li,{children:["Demonstrated the ",s.jsx(e.strong,{children:"sponsorship flow"})," with Smart Accounts using ",s.jsx(e.code,{children:"permissionless"}),", ",s.jsx(e.code,{children:"viem"}),", and Foundry-generated private keys."]}),`
`]}),`
`,s.jsx(e.p,{children:"This approach can greatly improve your dApp’s user experience by removing gas friction. For more complex sponsorship schemes (like daily or weekly cycles), simply tweak your per-user and global limit settings in the Coinbase Developer Platform."}),`
`,s.jsxs(e.blockquote,{children:[`
`,s.jsx(e.strong,{children:"Next Steps"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["Use a ",s.jsx(e.a,{href:"https://www.smartwallet.dev/guides/paymasters",children:"proxy service"})," for better endpoint security."]}),`
`,s.jsx(e.li,{children:"Deploy your own contracts and allowlist them."}),`
`,s.jsx(e.li,{children:"Experiment with bundling multiple calls into a single sponsored transaction."}),`
`]}),`
`]}),`
`,s.jsxs(e.h2,{id:"references",children:["References",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#references",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://docs.alchemy.com/reference/factory-addresses",children:"list of factory addresses"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://discord.com/invite/cdp",children:"Discord"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/",children:"CDP site"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/",children:"Coinbase Developer Platform"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/products/bundler-and-paymaster",children:"UI"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://www.smartwallet.dev/guides/paymasters",children:"proxy service"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://portal.cdp.coinbase.com/products/bundler-and-paymaster",children:"Paymaster Tool"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://book.getfoundry.sh/getting-started/installation",children:"Foundry Book installation guide"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://basescan.org/token/0x83bd615eb93ee1336aca53e185b03b54ff4a17e8",children:"simple NFT contract"})}),`
`]}),`
`,s.jsx(e.strong,{children:"Happy Building on Base!"})]})}function c(n={}){const{wrapper:e}={...r(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(i,{...n})}):i(n)}export{c as default,a as frontmatter};
