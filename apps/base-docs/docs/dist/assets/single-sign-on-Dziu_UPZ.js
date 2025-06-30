import{u as t,j as e}from"./index-Dlxm52NL.js";const o={title:"Single Sign On",description:"undefined"};function i(s){const n={a:"a",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"single-sign-on",children:["Single Sign On",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#single-sign-on",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"Smart Wallet is a single sign on for onchain apps. Users bring the same account, identity, and assets across apps."}),`
`,e.jsxs(n.h2,{id:"how-it-works",children:["How it works",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#how-it-works",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Smart Wallet relies on ",e.jsx(n.a,{href:"/identity/smart-wallet/concepts/features/built-in/passkeys",children:"passkeys"}),", stored on users' devices, which can be used on our website (keys.coinbase.com) and ",e.jsx(n.a,{href:"https://www.coinbase.com/wallet",children:"mobile app"}),"."]}),`
`,e.jsx(n.li,{children:"Our SDK, which developers integrate into their apps, uses keys.coinbase.com popups to allow users to see requests and sign with their passkey."}),`
`,e.jsx(n.li,{children:"The SDK and the popup use cross domain messaging to share information back to the app."}),`
`]})]})}function r(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{r as default,o as frontmatter};
