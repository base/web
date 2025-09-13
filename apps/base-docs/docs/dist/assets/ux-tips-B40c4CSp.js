import{u as l,j as e}from"./index-Dlxm52NL.js";const o={title:"UX Guidelines",sidebar_label:"UX Guidelines",slug:"ux-tips"};function t(i){const n={a:"a",aside:"aside",code:"code",div:"div",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.aside,{"data-callout":"tip",children:e.jsx(n.p,{children:"Coinbase Wallet SDK, or Wallet SDK, has been fully rebranded from its former name of WalletLink."})}),`
`,e.jsxs(n.h2,{id:"mobile-ux-guidance",children:["Mobile UX guidance",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mobile-ux-guidance",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://developer.mozilla.org/docs/Learn/CSS/CSS_layout/Responsive_Design",children:"responsive web design"})," to ensure your app is easy to use on mobile."]}),`
`,e.jsxs(n.li,{children:["Consider implementing autoconnect/1-click connect on mobile, to simplify the wallet connection experience.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Autoconnect:"})," Your app automatically connects to the injected provider with no user action needed.",`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"On page load, check if an injected wallet is present"}),`
`,e.jsxs(n.li,{children:["If yes, then on page load immediately call ",e.jsx(n.code,{children:"ethereum.request({ method: 'eth_requestAccounts' })"})," using either",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Coinbase Wallet SDK or"}),`
`,e.jsx(n.li,{children:"the injected provider"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"1-click connect:"}),' Your app provides one "Connect to Wallet" button.',`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Provide one button for the user to press to connect their wallet"}),`
`,e.jsxs(n.li,{children:["On click, check if an injected wallet is present and if so, call ",e.jsx(n.code,{children:"ethereum.request({ method: 'eth_requestAccounts' })"})," using either",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Coinbase Wallet SDK or"}),`
`,e.jsx(n.li,{children:"the injected provider"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,"For either option, if no injected wallet is present, use whatever wallet flow you prefer."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"other-guidance",children:["Other guidance",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#other-guidance",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Label the connection as “Coinbase Wallet” for clarity to users."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Download the Coinbase Wallet icon set: ",e.jsx(n.a,{href:"https://github.com/coinbase/coinbase-wallet-sdk/raw/master/assets/coinbase_wallet_logo_kit.zip",children:"coinbase_wallet_logo_kit.zip"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Have Coinbase Wallet appear above the fold for users to discover without clicking on “Show More”."}),`
`]}),`
`]})]})}function r(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{r as default,o as frontmatter};
