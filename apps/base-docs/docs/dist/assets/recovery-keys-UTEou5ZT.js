import{u as a,j as e}from"./index-Dlxm52NL.js";/* empty css                                */const o={title:"Recovery Keys",description:"undefined"};function r(n){const t={a:"a",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.header,{children:e.jsxs(t.h1,{id:"recovery-keys",children:["Recovery Keys",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#recovery-keys",children:e.jsx(t.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(t.p,{children:"Recovery keys provide a fallback authentication and signing mechanism for Smart Wallets when passkey access is lost."}),`
`,e.jsxs(t.h2,{id:"implementation",children:["Implementation",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#implementation",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:"A recovery key is a standard Ethereum private key. When generated, its corresponding Ethereum address is registered onchain as an owner of the Smart Wallet. This enables two key capabilities:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["In the event a user loses their passkey, the recovery key can be used to add new passkey owners to the Smart Wallet through the ",e.jsx(t.a,{href:"https://help.coinbase.com/en/wallet/getting-started/smart-wallet-recovery",children:"wallet recovery flow"}),"."]}),`
`,e.jsx(t.li,{children:"The recovery key can be used to sign transactions as an owner of the Smart Wallet without the use of our website (though specialized wallet software is needed to properly construct the Smart Wallet transactions)."}),`
`]}),`
`,e.jsxs(t.h2,{id:"technical-details",children:["Technical Details",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#technical-details",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The recovery key has equivalent permissions to passkey owners at the contract level."}),`
`,e.jsx(t.li,{children:"Recovery keys use standard ECDSA signatures, making them compatible with existing Ethereum tooling."}),`
`,e.jsx(t.li,{children:"Multiple recovery keys can be registered to a single Smart Wallet."}),`
`,e.jsx(t.li,{children:"Recovery keys can be added or removed by any existing owner of the Smart Wallet."}),`
`]})]})}function l(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{l as default,o as frontmatter};
