import{u as r,j as e}from"./index-Dlxm52NL.js";const t={title:"Coinbase Wallet Injected Ethereum Provider",sidebar_label:"Coinbase Wallet Injected Ethereum Provider",slug:"injected-provider"};function n(s){const i={a:"a",code:"code",div:"div",h2:"h2",h4:"h4",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["The Coinbase Wallet browser extension injects an Ethereum provider, as specified by ",e.jsx(i.a,{href:"https://eips.ethereum.org/EIPS/eip-1193",children:"EIP-1193"}),", into the browser at ",e.jsx(i.code,{children:"window.ethereum"}),"."]}),`
`,e.jsx(i.p,{children:"You can use this provider in your app to request users' Ethereum accounts, read on-chain data, and have the user sign messages and transactions, without using the Coinbase Wallet SDK."}),`
`,e.jsxs(i.h2,{id:"benefits-of-using-coinbase-wallet-sdk-vs-the-injected-provider",children:["Benefits of using Coinbase Wallet SDK vs. the injected provider",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#benefits-of-using-coinbase-wallet-sdk-vs-the-injected-provider",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"The basic functionality between Coinbase Wallet SDK and the Coinbase Wallet injected provider is very similar. However, the SDK provides some additional helpful features:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If Coinbase Wallet extension isn't installed, calling ",e.jsx(i.code,{children:"ethereum.request({ method: 'eth_requestAccounts' })"})," will start a built-in onboarding flow."]}),`
`,e.jsxs(i.li,{children:["On mobile, calling ",e.jsx(i.code,{children:"ethereum.request({ method: 'eth_requestAccounts' })"})," will automatically deep-link to your app in the Coinbase Wallet native mobile app."]}),`
`]}),`
`,e.jsxs(i.h2,{id:"multiple-injected-providers",children:["Multiple injected providers",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#multiple-injected-providers",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[`If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., both MetaMask and Coinbase Wallet), Coinbase Wallet's injected provider will construct a "multiprovider" array at `,e.jsx(i.code,{children:"window.ethereum.providers"})," containing the injected provider from each wallet. Coinbase Wallet can be identified in this array by the ",e.jsx(i.code,{children:"isCoinbaseWallet"})," property."]}),`
`,e.jsxs(i.p,{children:["More information can be found in our doc on ",e.jsx(i.a,{href:"/injected-provider-guidance",children:"Handling Multiple Injected Extensions"}),"."]}),`
`,e.jsxs(i.h2,{id:"properties",children:["Properties",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#properties",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h4,{id:"iscoinbasewallet",children:[e.jsx(i.code,{children:"isCoinbaseWallet"}),e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#iscoinbasewallet",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Identifies if this provider is Coinbase Wallet."}),`
`,e.jsxs(i.h2,{id:"methods",children:["Methods",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#methods",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h4,{id:"requestargs",children:[e.jsx(i.code,{children:"request(args)"}),e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#requestargs",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(i.code,{children:[e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"interface"}),e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" RequestArguments"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  method"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  params"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"?:"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" any"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsx(i.span,{className:"line",children:e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})}),`
`,e.jsx(i.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"ethereum."}),e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"request"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"<"}),e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"T"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">(args: RequestArguments): "}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"Promise"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"<"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"T"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:">"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]})]})})}),`
`,e.jsxs(i.p,{children:["Coinbase Wallet uses ",e.jsx(i.code,{children:"request(args)"})," to wrap an RPC API. The params and return value vary by RPC method."]}),`
`,e.jsx(i.p,{children:"If the request fails for any reason, the Promise will reject with an Ethereum RPC Error."}),`
`,e.jsx(i.p,{children:"Coinbase Wallet supports many standardized Ethereum RPC methods, including:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/getting-eth-accounts",children:e.jsx(i.code,{children:"eth_requestAccounts"})})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/switching-chains",children:e.jsx(i.code,{children:"wallet_addEthereumChain"})})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/switching-chains",children:e.jsx(i.code,{children:"wallet_switchEthereumChain"})})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/tracking-assets",children:e.jsx(i.code,{children:"wallet_watchAsset"})})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_sendTransaction"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_sendRawTransaction"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_newFilter"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_newBlockFilter"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_newPendingTransactionFilter"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_getFilterChanges"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_getFilterLogs"})}),`
`]}),`
`,e.jsx(i.p,{children:"As well as all standard signing methods:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_sign"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"personal_sign"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_signTypedData"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"eth_signTransaction"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"signTypedData_v1"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"signTypedData_v3"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"signTypedData_v4"})}),`
`]})]})}function a(s={}){const{wrapper:i}={...r(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(n,{...s})}):n(s)}export{a as default,t as frontmatter};
