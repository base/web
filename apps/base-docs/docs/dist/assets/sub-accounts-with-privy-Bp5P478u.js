import{u as l,j as s,C as n}from"./index-Dlxm52NL.js";import{G as a}from"./GithubRepoCard-8sJXaI5D.js";/* empty css                                */const d={title:"Using Sub Accounts with Privy",description:"How to enable Smart Wallet Sub Accounts in a Privy project"};function r(i){const e={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l(),...i.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"using-sub-accounts-with-privy",children:["Using Sub Accounts with Privy",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-sub-accounts-with-privy",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(e.p,{children:["In this guide, you'll learn how to enable ",s.jsx(e.a,{href:"/identity/smart-wallet/concepts/features/optional/sub-accounts",children:"Smart Wallet Sub Accounts"})," in a ",s.jsx(e.a,{href:"https://www.privy.io/",children:"Privy"}),` project.
This allows your users to automatically create a Sub Account with Spend Limits when connecting their wallet via Privy.`]}),`
`,s.jsxs(e.h2,{id:"skip-ahead",children:["Skip ahead",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#skip-ahead",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"If you want to skip the setup and see a working demo, check out the Sub Accounts Privy Demo:"}),`
`,s.jsx(a,{title:"Sub Accounts Privy Demo",githubUrl:"https://github.com/base/demos/tree/master/smart-wallet/sub-accounts-privy"}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"what-youll-achieve",children:["What you'll achieve",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-youll-achieve",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"By the end of this guide, you will:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Enable automatic Smart Wallet Sub Account creation for users authenticating with Privy"}),`
`,s.jsx(e.li,{children:"Set up Spend Limits for Sub Accounts on Base Sepolia"}),`
`,s.jsx(e.li,{children:"Understand the required package versions and configuration"}),`
`]}),`
`,s.jsxs(e.h2,{id:"requirements",children:["Requirements",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#requirements",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["A ",s.jsx(e.a,{href:"https://docs.privy.io/guide/quickstart",children:"Privy project"})]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.a,{href:"/identity/smart-wallet/concepts/features/optional/sub-accounts",children:"Smart Wallet Sub Accounts"})," are ",s.jsx(e.strong,{children:"only available on the canary version"})," of the Coinbase Wallet SDK and on ",s.jsx(e.strong,{children:"Base Sepolia"})]}),`
`,s.jsxs(e.li,{children:["For now, you must also use a specific beta version of ",s.jsx(e.code,{children:"@privy-io/react-auth"})," (see below)"]}),`
`]}),`
`,s.jsxs(e.h2,{id:"1-override-required-package-versions",children:["1. Override Required Package Versions",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-override-required-package-versions",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Sub Accounts require the latest canary version of ",s.jsx(e.code,{children:"@coinbase/wallet-sdk"})," and a specific beta version of Privy React Auth. ",s.jsxs(e.strong,{children:["You must override these versions ",s.jsx(e.em,{children:"before"})," installing packages."]})]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# If you have an existing node_modules or lock file, delete them first"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"rm"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -rf"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" node_modules"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" package-lock.json"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" yarn.lock"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" pnpm-lock.yaml"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Set the required overrides in your package.json"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" pkg"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" set"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" overrides.@coinbase/wallet-sdk=canary"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" pkg"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" set"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" overrides.@privy-io/react-auth=2.13.1-beta-20250512172154"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Now install dependencies"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" install"})]})]})})}),`
`,s.jsx(n,{type:"warning",children:s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Important:"}),`
If you already have a lock file or `,s.jsx(e.code,{children:"node_modules"}),", you ",s.jsx(e.em,{children:"must"})," delete them before setting the overrides and reinstalling. Otherwise, the correct versions will not be installed and Sub Accounts will not work."]})}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"2-update-your-privy-provider-configuration",children:["2. Update Your Privy Provider Configuration",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-update-your-privy-provider-configuration",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["To enable Sub Accounts, update your Privy ",s.jsx(e.code,{children:"Provider"})," configuration (usually in ",s.jsx(e.code,{children:"providers.tsx"})," or similar):"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0","data-title":"providers.tsx","data-lang":"tsx",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { PrivyProvider } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@privy-io/react-auth"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { toHex, parseEther } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "viem"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"<"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"PrivyProvider"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"  appId"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{process.env."}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"NEXT_PUBLIC_PRIVY_APP_ID"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ||"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' ""'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"  config"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{{"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    embeddedWallets: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      createOnLogin: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"all-users"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    externalWallets: {"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      coinbaseWallet: {"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        config: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          appName: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"Privy Sub Accounts"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          appLogoUrl: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://example.com/logo.png"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Replace with your logo"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          preference: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"            keysUrl: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://keys-dev.coinbase.com/connect"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Use the Smart Wallet dev environment"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"            options: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"smartWalletOnly"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Only allow Smart Wallet"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"          // Enable Sub Account support with spend limits"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          subAccounts: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"            enableAutoSubAccounts: "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"true"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Automatically create a sub account on connect"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"            defaultSpendLimits: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"              84532"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": [ "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Base Sepolia Chain ID"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"                {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"                  token: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Native ETH"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"                  allowance: "}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"toHex"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"parseEther"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0.01"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:")), "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 0.01 ETH"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"                  period: "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"86400"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 24 hours"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"                },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"              ],"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"            },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"          },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }}"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  {"}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"/* ... your app ... */"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"</"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"PrivyProvider"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]})]})})}),`
`,s.jsxs(e.h3,{id:"explanation-of-key-parameters",children:["Explanation of Key Parameters",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#explanation-of-key-parameters",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"keysUrl"}),": Points to the Smart Wallet development environment. ",s.jsx(e.strong,{children:"Sub Accounts only work in this environment."})]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"options: 'smartWalletOnly'"}),": Ensures only Smart Wallet mode is used."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"enableAutoSubAccounts: true"}),": Automatically creates a Sub Account when the user connects."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"defaultSpendLimits"}),": Sets Spend Limits from the global Smart Wallet to the Sub Account on Base Sepolia (",s.jsx(e.code,{children:"84532"}),").",`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"token"}),": The token address (native ETH in this example)."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"allowance"}),": The max amount (in hex WEI) the Sub Account can spend in the period."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"period"}),": The time window for the allowance (in seconds, e.g., 86400 for 24h)."]}),`
`]}),`
`]}),`
`]}),`
`,s.jsx(n,{type:"info",children:s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Note:"}),`
This guide only covers the `,s.jsx(e.em,{children:"automatic"})," Sub Account creation flow, where a Sub Account is created and Spend Limits are set as soon as the user connects their wallet. We are working with Privy to support flows where the user can first authenticate with their global Smart Wallet account and then create a Sub Account after. For now, only the automatic Sub Accounts flow is supported."]})}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"3-test-your-setup",children:["3. Test Your Setup",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-test-your-setup",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsx(e.li,{children:"Start your development server:"}),`
`]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" run"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" dev"})]})})})}),`
`,s.jsxs(e.ol,{start:"2",children:[`
`,s.jsx(e.li,{children:"Open your app and connect with Coinbase Wallet via Privy."}),`
`,s.jsx(e.li,{children:"You should see a prompt to create a Sub Account and Spend Limits."}),`
`,s.jsx(e.li,{children:"You can now use the Sub Account to send transactions without pop-up confirmations."}),`
`]}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"additional-resources",children:["Additional Resources",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#additional-resources",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://github.com/base/demos/tree/master/smart-wallet/sub-accounts-privy",children:"Sub Accounts Privy Demo"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"/identity/smart-wallet/guides/sub-accounts/setup",children:"Sub Accounts Setup Guide"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"/identity/smart-wallet/concepts/features/optional/sub-accounts",children:"Smart Wallet Sub Accounts Feature"})}),`
`,s.jsx(e.li,{children:s.jsx(e.a,{href:"https://docs.privy.io/guide/quickstart",children:"Privy Quickstart"})}),`
`,s.jsxs(e.li,{children:[s.jsx(e.a,{href:"https://discord.com/invite/cdp",children:"Discord #smart-wallet"})," for questions or feedback"]}),`
`]})]})}function h(i={}){const{wrapper:e}={...l(),...i.components};return e?s.jsx(e,{...i,children:s.jsx(r,{...i})}):r(i)}export{h as default,d as frontmatter};
