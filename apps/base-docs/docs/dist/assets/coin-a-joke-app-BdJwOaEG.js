import{u as a,j as e,C as l}from"./index-Dlxm52NL.js";import{G as r}from"./GithubRepoCard-8sJXaI5D.js";/* empty css                                */const d={title:"Coin Your Bangers: Turn Your Jokes into Coins",description:"undefined"};function i(n){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"coin-your-bangers-turn-your-jokes-into-coins",children:["Coin Your Bangers: Turn Your Jokes into Coins",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#coin-your-bangers-turn-your-jokes-into-coins",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"In this guide we illustrate how to use Smart Wallet and Zora's content coin SDK to create an engaging consumer application with great UX."}),`
`,e.jsx(s.p,{children:"Memecoins and culturecoins have been catalysts of the onchain economy, allowing people to rally around concepts that are fun and engaging with a potential upside."}),`
`,e.jsx(s.p,{children:`Memecoins are great for long term community and culture building onchain.
Contentcoins are an emergent category of coins focused on valuing individual pieces of content and providing monetization for creators.`}),`
`,e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"2rem 0"},children:[e.jsx("img",{alt:"Table showing the difference between memecoins and contentcoins",src:"/images/smart-wallet/meme-vs-content.png",style:{maxWidth:"400px",width:"100%"}}),e.jsx("em",{style:{marginTop:"1rem"},children:"A Table showing the difference between memecoins and contentcoins"})]}),`
`,e.jsxs(s.p,{children:["Apps like ",e.jsx(s.a,{href:"https://zora.co/",children:"Zora"})," or ",e.jsx(s.a,{href:"https://flaunch.gg/",children:"Flaunch"}),` illustrate the power of contentcoins.
They create a new category of apps that we may call "contentcoin apps".`]}),`
`,e.jsxs(s.h2,{id:"overview",children:["Overview",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:'This example explains "Coin Your Bangers", a full onchain app that lets users turn their jokes into coins on Base.'}),`
`,e.jsx(s.p,{children:"Through this example, you can learn how to:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Use Wagmi to initialize an onchain app"}),`
`,e.jsx(s.li,{children:"Use Smart Wallet to sign in users"}),`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.a,{href:"/identity/smart-wallet/concepts/features/optional/sub-accounts",children:"Sub Accounts"})," for a better user experience"]}),`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.a,{href:"https://docs.zora.co/coins/sdk/create-coin",children:"Zora SDK"})," to create a new coin"]}),`
`,e.jsx(s.li,{children:"Use OpenAI to generate coin metadata"}),`
`]}),`
`,e.jsx(s.p,{children:"The full codebase of this app is available on Github:"}),`
`,e.jsx(r,{title:"Coin Your Bangers",githubUrl:"https://github.com/base/demos/tree/master/smart-wallet/coin-your-joke"}),`
`,e.jsxs(s.h2,{id:"why-use-smart-wallet-and-sub-accounts-to-build-your-onchain-app",children:["Why use Smart Wallet and Sub Accounts to build your onchain app?",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#why-use-smart-wallet-and-sub-accounts-to-build-your-onchain-app",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:`Onboarding users to consumer onchain apps has always been a challenge, mainly
due to the need for a wallet and the pop-up experience.
In the case of web apps, this has always come in the form of
a browser extension that users need to install and an annoying pop-up experience for every onchain action.
In order to solve this, Smart Wallet and Sub-Accounts were created.`}),`
`,e.jsx(s.p,{children:"Smart Wallet is a new way to universally sign in into any onchain app."}),`
`,e.jsx(s.p,{children:"Sub-Accounts are a new way to interact with onchain apps in a more user friendly way."}),`
`,e.jsxs(s.p,{children:["✨ ",e.jsx(s.strong,{children:"No more pop-ups, no more browser extensions, no more onboarding friction."})," ✨"]}),`
`,e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"2rem 0"},children:[e.jsx("img",{alt:"A Demo of Sub Accounts in action",src:"/images/smart-wallet/Area.gif",style:{maxWidth:"1000px",width:"100%"}}),e.jsx("em",{style:{marginTop:"1rem"},children:"A Demo of Sub Accounts in action"})]}),`
`,e.jsxs(l,{type:"success",children:[e.jsx(s.strong,{children:"Does Zora use Smart Wallet?"}),e.jsx(s.p,{children:`Yes, Zora integrates Smart Wallet smart contracts directly into their protocol.
This allows users to sign in to the app and create contentcoins without any additional steps.`}),e.jsxs(s.p,{children:["You can see the share of Zora from Smart Wallet transactions on the ",e.jsx(s.a,{href:"https://dune.com/wilsoncusack/coinbase-smart-wallet-kpis",children:"Dune Dashboard"}),"."]})]}),`
`,e.jsxs(s.h2,{id:"run-the-app",children:["Run the app",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#run-the-app",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Open a terminal and run the following commands:"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Clone the repository"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"git"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" clone"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://github.com/base/demos.git"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Navigate to the app"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"cd"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" demos/smart-wallet/coin-your-joke"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Install dependencies"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" install"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Copy the environment variables"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"cp"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" .env.example"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" .env"})]})]})})}),`
`,e.jsxs(s.ol,{start:"2",children:[`
`,e.jsxs(s.li,{children:["Open the repository in your favorite editor (eg. Cursor, VSCode, etc.) and edit the ",e.jsx(s.code,{children:".env"})," file with your own values as specified in the ",e.jsx(s.a,{href:"https://github.com/base/demos/blob/master/smart-wallet/coin-your-joke/README.md",children:"README"}),"."]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"ENV=local or prod"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"NEXT_PUBLIC_URL=your_deployment_url (http://localhost:3000 for local development)"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"OPENAI_API_KEY=your_openai_api_key"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"NEXT_TELEMETRY_DISABLED=1"})})]})})}),`
`,e.jsxs(s.ol,{start:"3",children:[`
`,e.jsx(s.li,{children:"Run the app"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" run"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" dev"})]})})})}),`
`,e.jsxs(s.h2,{id:"key-components",children:["Key Components",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#key-components",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"wagmi-config-wagmits",children:["Wagmi Config (",e.jsx(s.code,{children:"wagmi.ts"}),")",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#wagmi-config-wagmits",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The wagmi config is used to set up the Smart Wallet client."}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { parseEther } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "viem"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { http, cookieStorage, createConfig, createStorage } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "wagmi"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { baseSepolia } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "wagmi/chains"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { coinbaseWallet } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "wagmi/connectors"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { toHex } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "viem"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" const"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" cbWalletConnector"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" coinbaseWallet"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  appName: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"Coin Your Bangers"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  preference: {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    keysUrl: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://keys-dev.coinbase.com/connect"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    options: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"smartWalletOnly"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  subAccounts: {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    enableAutoSubAccounts: "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"true"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    defaultSpendLimits: {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      84532"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": [ "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Base Sepolia Chain ID"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          token: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          allowance: "}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"toHex"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"parseEther"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'0.01'"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:")), "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 0.01 ETH"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          period: "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"86400"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 24h"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        },"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      ],"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" getConfig"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  return"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" createConfig"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    chains: [base, baseSepolia],"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    connectors: [cbWalletConnector],"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // ... other config options"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  });"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// ... other wagmi config options"})})]})})}),`
`,e.jsxs(s.p,{children:["As you can see, we are using the ",e.jsx(s.code,{children:"subAccounts"}),` option to enable auto sub-accounts
for the `,e.jsx(s.code,{children:"cbWalletConnector"})," (Smart Wallet Wagmi connector)."]}),`
`,e.jsxs(s.p,{children:["As it's broken down in the ",e.jsx(s.a,{href:"/identity/smart-wallet/guides/sub-accounts/setup",children:"Sub Accounts"}),` guide,
the key preference parameters are:`]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"keysUrl"}),": Points to the development environment for Smart Wallet testing"]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"options: 'smartWalletOnly'"}),": Ensures only Smart Wallet mode is used"]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"enableAutoSubAccounts: true"}),": When set to true, automatically creates a Sub Account at connection"]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"defaultSpendLimits"}),": Configures Spend Limits for Sub Account for a network (eg. Base Sepolia ",e.jsx(s.code,{children:"84532"}),"), including:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Token address (In this case, ",e.jsx(s.code,{children:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"})," represents the native ETH)"]}),`
`,e.jsx(s.li,{children:"Allowance WEI amount (in Hex)"}),`
`,e.jsx(s.li,{children:"Time period for the allowance (in seconds, e.g., 86400 for 24 hours)"}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(s.h3,{id:"coinbutton-component-coinbuttontsx",children:["CoinButton Component (",e.jsx(s.code,{children:"CoinButton.tsx"}),")",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#coinbutton-component-coinbuttontsx",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The deployment button component handles the actual token creation:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" CoinButton"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  symbol"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  uri"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  initialPurchaseWei"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" BigInt"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"0"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"),"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  onSuccess"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  onError"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  className"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" CreateCoinArgs"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // ... implementation"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsx(s.p,{children:"Key components:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Using Zora's ",e.jsx(s.a,{href:"https://docs.zora.co/coins/sdk/create-coin",children:e.jsx(s.code,{children:"createCoin"})})," function to create a new coin"]}),`
`,e.jsx(s.li,{children:"Using Smart Wallet and Wagmi to submit the transaction"}),`
`,e.jsx(s.li,{children:"Loading states and error handling"}),`
`,e.jsx(s.li,{children:"Transaction status tracking"}),`
`]}),`
`,e.jsxs(s.h3,{id:"metadata-generation-api",children:["Metadata Generation API",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#metadata-generation-api",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The API endpoint uses OpenAI to generate creative coin metadata:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Example API structure"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"async"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" generateMetadata"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"joke"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // 1. Process the joke using OpenAI"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // 2. Generate coin name and symbol"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // 3. Create metadata JSON"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // 4. Return coin parameters"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsx(s.p,{children:"Key components:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"OpenAI integration for creative naming"}),`
`,e.jsx(s.li,{children:"Metadata JSON generation"}),`
`,e.jsx(s.li,{children:"URI creation for token metadata"}),`
`,e.jsx(s.li,{children:"Error handling and validation"}),`
`]}),`
`,e.jsxs(s.h2,{id:"deployment",children:["Deployment",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deployment",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["You can deploy your app to Vercel by following the instructions ",e.jsx(s.a,{href:"https://vercel.com/docs/deployments",children:"here"}),"."]}),`
`,e.jsxs(s.h2,{id:"conclusion",children:["Conclusion",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"This example demonstrates how to build a full-featured onchain application that combines:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Smart Wallet for Sign In"}),`
`,e.jsx(s.li,{children:"Sub Accounts for a better user experience"}),`
`,e.jsx(s.li,{children:"OpenAI for metadata generation"}),`
`,e.jsx(s.li,{children:"Zora's SDK for coin creation"}),`
`,e.jsx(s.li,{children:"Wagmi for onchain integration"}),`
`,e.jsx(s.li,{children:"Error handling"}),`
`,e.jsx(s.li,{children:"Transaction management"}),`
`]}),`
`,e.jsx(s.p,{children:"The modular architecture makes it easy to extend or modify for other use cases beyond joke tokenization."})]})}function h(n={}){const{wrapper:s}={...a(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{h as default,d as frontmatter};
