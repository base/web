import{u as s,j as e}from"./index-Dlxm52NL.js";import{G as a}from"./GithubRepoCard-8sJXaI5D.js";const c={title:"Creating Sub Accounts with Smart Wallet",description:"Learn how to create and manage Sub Accounts using Smart Wallet"};function t(i){const n={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"build-with-sub-accounts",children:["Build with Sub Accounts",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#build-with-sub-accounts",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Smart Wallet's self-custodial design requires a user passkey prompt for each wallet interaction that the user is presented with, such as a transaction or message signing. While this helps ensure the user is aware and required to approve of every interaction with their wallet, this also impacts user experience when using applications that may require frequent wallet interactions."}),`
`,e.jsxs(n.p,{children:["To support using Smart Wallet with user experiences that require more developer control over the wallet interactions, we've built Sub Accounts in conjunction with ",e.jsx(n.a,{href:"https://eip.tools/eip/7895",children:"ERC-7895"}),", a new wallet RPC for creating hierarchical relationships between wallet accounts."]}),`
`,e.jsx(n.p,{children:"Sub Accounts allow you to provision wallet accounts that are directly embedded in your application for your users. You can control when a Sub Account is created for your user, and can interact with them just as you would with another wallet via the wallet provider, or other popular web3 libraries like OnchainKit, wagmi, viem, etc."}),`
`,e.jsxs(n.p,{children:["These Sub Accounts are linked to the end user's Smart wallet through an onchain relationship. When combined with our ",e.jsx(n.a,{href:"/identity/smart-wallet/guides/spend-limits",children:"Spend Limits feature"}),", this creates a powerful foundation for provisioning and funding app accounts, securely, while giving you, the developer, ample control over building the user experience that makes the most sense for your application."]}),`
`,e.jsxs(n.p,{children:["If you would like to see a live demo of Sub Accounts in action, check out our ",e.jsx(n.a,{href:"https://sub-account-demo.com",children:"Sub Accounts Demo"}),"."]}),`
`,e.jsxs(n.aside,{"data-callout":"warning",children:[e.jsx(n.strong,{"data-callout-title":!0,children:"Sub Account scope"}),e.jsx(n.p,{children:`Sub Accounts are currently scoped to an application's fully qualified domain name (FQDN).
This means that a user has one sub account for your application,
and it cannot be used on other applications on separate domains.`})]}),`
`,e.jsxs(n.h2,{id:"what-youll-build",children:["What You'll Build",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-youll-build",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"In this guide, we'll set up a basic React app using NextJS and Wagmi that:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Lets users log in with their Smart Wallet"}),`
`,e.jsx(n.li,{children:"Creates a Sub Account scoped to the app with the a Spend Limit included in the configuration"}),`
`,e.jsx(n.li,{children:"Uses the Sub Account to perform popup-less transactions"}),`
`]}),`
`,e.jsxs(n.h3,{id:"skip-ahead",children:["Skip ahead",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#skip-ahead",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"If you want to skip ahead and just get the final code, you can find it here:"}),`
`,e.jsx(a,{title:"Sub Account Starter Template Demo",githubUrl:"https://github.com/base/demos/tree/master/smart-wallet/sub-accounts-demo"}),`
`,e.jsxs(n.h2,{id:"guide-sections",children:["Guide Sections",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#guide-sections",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"/identity/smart-wallet/guides/sub-accounts/setup",children:"Project Setup"})," - Learn how to set up a NextJS project with Wagmi and configure Smart Wallet Sub Accounts. This guide covers:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Creating a new NextJS+Wagmi project"}),`
`,e.jsx(n.li,{children:"Configuring Smart Wallet with development environment settings"}),`
`,e.jsx(n.li,{children:"Setting up Spend Limits for native ETH"}),`
`,e.jsx(n.li,{children:"Creating a basic wallet connection interface"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"/identity/smart-wallet/guides/sub-accounts/using-sub-accounts",children:"Using Sub Accounts"})," - Explore how to interact with Sub Accounts in your application. This guide demonstrates:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Signing messages with Sub Accounts using ",e.jsx(n.code,{children:"useSignMessage"})]}),`
`,e.jsxs(n.li,{children:["Sending transactions with spend limits using ",e.jsx(n.code,{children:"useSendTransaction"})]}),`
`,e.jsx(n.li,{children:"Building a complete interface for wallet connection and transactions"}),`
`,e.jsx(n.li,{children:"Understanding transaction limitations based on Spend Limits"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"/identity/smart-wallet/guides/sub-accounts/add-sub-accounts-to-onchainkit-minikit",children:"Using Sub Accounts with OnchainKit"})," - Learn how to use Sub Accounts with OnchainKit. This guide demonstrates:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Creating a new OnchainKit project"}),`
`,e.jsx(n.li,{children:"Configuring OnchainKit with development environment settings"}),`
`,e.jsx(n.li,{children:"Creating a basic wallet connection interface"}),`
`,e.jsx(n.li,{children:"Using Sub Accounts with OnchainKit"}),`
`]}),`
`]}),`
`]})]})}function l(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{l as default,c as frontmatter};
