import{u as r,j as e}from"./index-Dlxm52NL.js";const i={title:"Unsupported Calls",description:"undefined"};function s(a){const t={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...r(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.header,{children:e.jsxs(t.h1,{id:"unsupported-calls",children:["Unsupported Calls",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#unsupported-calls",children:e.jsx(t.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(t.p,{children:["Smart Wallet implements an Ethereum Provider JavaScript API (as detailed in ",e.jsx(t.a,{href:"https://eips.ethereum.org/EIPS/eip-1193",children:"EIP-1193"}),`)
and follows the `,e.jsx(t.a,{href:"https://eips.ethereum.org/EIPS/eip-4337",children:"ERC-4337"})," standard for account abstraction."]}),`
`,e.jsx(t.p,{children:`This means that apps interacting with Smart Wallet can expect it to behave like a regular Ethereum Virtual Machine (EVM) account.
However, there are some calls that are not supported by Smart Wallets for incompatibility or security reasons.
This is a list of calls that are not supported:`}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"#self-calls",children:"Self Calls"}),": This refers to the ability of an app to use the user's account to call itself."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.a,{href:"#create",children:"CREATE"}),": This refers to the ability of an app to create a new contract using the OPCODE ",e.jsx(t.code,{children:"CREATE"}),"."]}),`
`]}),`
`,e.jsxs(t.h2,{id:"self-calls",children:["Self Calls",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#self-calls",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:`For security reasons, we do not allow 3rd party apps to make calls to a user's own Smart Wallet address.
This could allow apps to change owners, upgrade the user's account, or cause other issues.`}),`
`,e.jsxs(t.h2,{id:"create",children:["CREATE",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#create",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.p,{children:[`This is a limitation of the ERC-4337 standard and smart accounts.
Currently, we do not support the `,e.jsx(t.code,{children:"CREATE"}),` opcode for smart contracts deployment.
Future versions of Smart Wallet may support it.`]}),`
`,e.jsx(t.aside,{"data-callout":"success",children:e.jsxs(t.p,{children:["You can use a factory contract or a transaction with the ",e.jsx(t.code,{children:"CREATE2"})," opcode to deploy a smart contract."]})})]})}function o(a={}){const{wrapper:t}={...r(),...a.components};return t?e.jsx(t,{...a,children:e.jsx(s,{...a})}):s(a)}export{o as default,i as frontmatter};
