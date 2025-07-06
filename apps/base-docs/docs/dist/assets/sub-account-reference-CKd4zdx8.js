import{u as r,j as s}from"./index-Dlxm52NL.js";const l={title:"Sub Accounts",description:"undefined"};function i(n){const e={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"sub-accounts",children:["Sub Accounts",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sub-accounts",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(e.h2,{id:"overview",children:["Overview",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:`The Coinbase Wallet SDK now supports Sub Accounts, allowing apps to create and manage additional smart contract accounts for users.
Sub Accounts can have multiple owners and operate as smart contract wallets with enhanced security and flexibility.`}),`
`,s.jsxs(e.aside,{"data-callout":"warning",children:[s.jsx(e.strong,{"data-callout-title":!0,children:"Sub Account scope"}),s.jsx(e.p,{children:`Sub Accounts are currently scoped to an application's fully qualified domain name (FQDN).
This means that a user has one sub account for your application,
and it cannot be used on other applications on separate domains.`})]}),`
`,s.jsxs(e.h2,{id:"getting-started",children:["Getting Started",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getting-started",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.h3,{id:"installation",children:["Installation",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installation",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" install"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" @coinbase/wallet-sdk@canary"})]})})})}),`
`,s.jsxs(e.aside,{"data-callout":"warning",children:[s.jsx(e.strong,{"data-callout-title":!0,children:"Canary version"}),s.jsx(e.p,{children:`Sub Accounts are currently only live on the Canary version of the SDK.
They will be released in the stable version of the SDK soon.`})]}),`
`,s.jsxs(e.h3,{id:"basic-setup-with-sub-account-support",children:["Basic Setup with Sub Account Support",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#basic-setup-with-sub-account-support",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"The following code shows how to initialize the SDK with Sub Account support. The configuration includes:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"appName"}),": Your application's name that will be displayed to users"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"appLogoUrl"}),": URL to your application's logo"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"paymasterUrls"}),": Optional configuration for ",s.jsx(e.a,{href:"/identity/smart-wallet/concepts/base-gasless-campaign",children:"gasless transactions"})," on supported networks"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"subAccounts"}),": Configuration for Sub Account support, including the ",s.jsx(e.code,{children:"toOwnerAccount"})," function that provides authentication"]}),`
`]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { createCoinbaseWalletSDK, getCryptoKeyAccount } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '@coinbase/wallet-sdk'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Initialize the SDK with Sub Account support"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" sdk"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" createCoinbaseWalletSDK"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  appName: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'My Dapp'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  appLogoUrl: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'https://example.com/logo.png'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  paymasterUrls: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    84532"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'https://<base-paymaster-url>'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // Set up Sub Account support with a signer function"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  subAccounts: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"    toOwnerAccount"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"async"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" () "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"=>"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"      // Return a signer that can be used to authenticate operations"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"      return"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" getCryptoKeyAccount"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Get the provider for regular wallet operations"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" provider"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" sdk."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"getProvider"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]})]})})}),`
`,s.jsxs(e.h2,{id:"creating-a-sub-account",children:["Creating a Sub Account",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-a-sub-account",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:[`To create a new Sub Account, you need to specify the type of account and provide the initial owner's key.
The example below shows how to create a Sub Account using WebAuthn keys,
but other types of keys are also supported as specified in the `,s.jsx(e.a,{href:"#sub-account-methods",children:"Sub Account Methods"}),` section
(i.e. `,s.jsx(e.code,{children:"address"}),", ",s.jsx(e.code,{children:"p256"}),", ",s.jsx(e.code,{children:"webcrypto-p256"}),", ",s.jsx(e.code,{children:"webauthn-p256"}),")."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Create a new Sub Account with WebAuthn keys"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" account"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" sdk.subaccount."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"create"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  type: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'create'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  keys: ["})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      type: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'webauthn-p256'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"      // The public key of the owner, this can be retrieved from the account object"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      key: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'0x7da44d4bc972affd138c619a211ef0afe0926b813fec67d15587cf8625b2bf185f5044ae96640a63b32aa1eb6f8f993006bbd26292b81cb07a0672302c69a866'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  ],"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Sub account created:'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", account.address);"})]})]})})}),`
`,s.jsxs(e.h2,{id:"getting-a-sub-account",children:["Getting a Sub Account",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getting-a-sub-account",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["The ",s.jsx(e.code,{children:"get()"})," method is used to retrieve the current Sub Account. If no Sub Account exists for the current domain, it will create a new one. This method is essential for ensuring you're always working with the correct Sub Account."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Get the current Sub Account if it exists, otherwise connect to one"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" account"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" sdk.subaccount."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"get"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Sub account address:'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", account.address);"})]})]})})}),`
`,s.jsxs(e.h2,{id:"adding-an-owner-to-a-sub-account",children:["Adding an Owner to a Sub Account",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#adding-an-owner-to-a-sub-account",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:`Sub Accounts support multiple owners, which can be added either by their Ethereum address or public key.
This flexibility allows for different types of ownership models, such as:`}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Adding existing Ethereum accounts as owners"}),`
`,s.jsx(e.li,{children:"Adding WebAuthn-based owners for enhanced security"}),`
`,s.jsx(e.li,{children:"Supporting both types of owners simultaneously"}),`
`]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Add an owner using an address"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" sdk.subaccount."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"addOwner"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  chainId: "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"84532"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Base Sepolia"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  address: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'0xE3cA9Cc9378143a26b9d4692Ca3722dc45910a15'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Or add an owner using a public key"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"account"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" getCryptoKeyAccount"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" sdk.subaccount."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"addOwner"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  chainId: "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"84532"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Base Sepolia"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  publicKey: account.publicKey,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})})]})})}),`
`,s.jsxs(e.h2,{id:"using-a-sub-account-for-transactions",children:["Using a Sub Account for Transactions",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-a-sub-account-for-transactions",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:`Once a Sub Account is set up, you can use it to perform blockchain transactions.
The example below demonstrates how to sign a message using the Sub Account.`}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Connect to the Sub Account"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" account"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" sdk.subaccount."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"get"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Use the provider to send transactions from the Sub Account"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" provider"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" sdk."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"getProvider"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" signature"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" await"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" provider."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"request"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  method: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'personal_sign'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  params: ["}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'0x48656c6c6f2c20776f726c6421'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", account.address],"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})})]})})}),`
`,s.jsxs(e.h2,{id:"api-reference",children:["API Reference",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#api-reference",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.h3,{id:"sdk-configuration",children:["SDK Configuration",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sdk-configuration",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"createCoinbaseWalletSDK"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  appName: string,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  appLogoUrl: string,"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  subAccount: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"    toOwnerAccount"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": () "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"=>"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" Promise"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"<"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{ account: { publicKey: string; address"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"?:"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" string } }"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:">"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})})]})})}),`
`,s.jsxs(e.h3,{id:"sub-account-methods",children:["Sub Account Methods",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sub-account-methods",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.h4,{id:"sdksubaccountcreateaccount",children:[s.jsx(e.code,{children:"sdk.subaccount.create(account)"}),s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sdksubaccountcreateaccount",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Creates a new Sub Account."}),`
`,s.jsx(e.p,{children:"Parameters:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"account"}),": An object with details about the account to create",`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"type"}),": 'create' | 'deployed' | 'undeployed'"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"keys"}),": Array of key objects (for 'create' type)",`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"type"}),": 'address' | 'p256' | 'webcrypto-p256' | 'webauthn-p256'"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"key"}),": Hex string of the public key"]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,s.jsxs(e.p,{children:["Returns: ",s.jsx(e.code,{children:"Promise<SubAccountInfo>"})]}),`
`,s.jsxs(e.h4,{id:"sdksubaccountget",children:[s.jsx(e.code,{children:"sdk.subaccount.get()"}),s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sdksubaccountget",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Gets the current Sub Account, or connects to one if none exists."}),`
`,s.jsxs(e.p,{children:["Returns: ",s.jsx(e.code,{children:"Promise<SubAccountInfo>"})]}),`
`,s.jsxs(e.h4,{id:"sdksubaccountaddowneroptions",children:[s.jsx(e.code,{children:"sdk.subaccount.addOwner(options)"}),s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sdksubaccountaddowneroptions",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Adds an owner to a Sub Account."}),`
`,s.jsx(e.p,{children:"Parameters:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"options"}),": Object with details about the owner to add",`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"chainId"}),": Chain ID (number)"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"address"}),": Address of the owner (optional)"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"publicKey"}),": Public key of the owner (optional)"]}),`
`]}),`
`]}),`
`]}),`
`,s.jsxs(e.p,{children:["Returns: ",s.jsx(e.code,{children:"Promise<string>"})," - Response from the smart contract call"]}),`
`,s.jsxs(e.h4,{id:"sdksubaccountsettoowneraccounttoowneraccount",children:[s.jsx(e.code,{children:"sdk.subaccount.setToOwnerAccount(toOwnerAccount)"}),s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sdksubaccountsettoowneraccounttoowneraccount",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Sets the signer function for Sub Account operations."}),`
`,s.jsx(e.p,{children:"Parameters:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"toOwnerAccount"}),": Function that returns a Promise resolving to a signer object"]}),`
`]}),`
`,s.jsxs(e.h2,{id:"ethereum-json-rpc-provider-methods",children:["Ethereum JSON-RPC Provider Methods",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#ethereum-json-rpc-provider-methods",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:`Sub accounts are implemented as smart contract wallets that support multiple owners.
The SDK provides a wrapper around the low-level Remote Procedure Call (RPC) methods used to interact with these accounts:`}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.a,{href:"/identity/smart-wallet/technical-reference/sdk/CoinbaseWalletProvider/wallet_addSubAccount",children:s.jsx(e.code,{children:"wallet_addSubAccount"})}),": Creates a new Sub Account"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.a,{href:"/identity/smart-wallet/technical-reference/sdk/CoinbaseWalletProvider/wallet_connect",children:s.jsx(e.code,{children:"wallet_connect"})}),": Connects to an existing Sub Account"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.a,{href:"/identity/smart-wallet/technical-reference/sdk/CoinbaseWalletProvider/wallet_sendCalls",children:s.jsx(e.code,{children:"wallet_sendCalls"})}),": Sends transactions from a Sub Account"]}),`
`]}),`
`,s.jsx(e.p,{children:"Each Sub Account can have multiple owners identified by either their address or public key. When performing operations with a Sub Account, the appropriate owner is used to sign the transaction."}),`
`,s.jsxs(e.h2,{id:"requirements",children:["Requirements",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#requirements",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Coinbase Wallet SDK v4.4.0-canary or higher"}),`
`,s.jsx(e.li,{children:"An app connected to an EVM-compatible chain"}),`
`]})]})}function c(n={}){const{wrapper:e}={...r(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(i,{...n})}):i(n)}export{c as default,l as frontmatter};
