import{u as a,j as e}from"./index-Dlxm52NL.js";const r={title:"MagicSpend",description:"undefined"};function i(s){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"magicspend",children:["MagicSpend",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#magicspend",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"MagicSpend enables Smart Wallet users to spend their Coinbase balances directly onchain. Users can connect their Coinbase account during the transaction flow, eliminating the need for manual onramps or transfers."}),`
`,e.jsxs(n.h2,{id:"benefits-for-your-app",children:["Benefits for Your App",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#benefits-for-your-app",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Remove funding friction for new users"}),`
`,e.jsx(n.li,{children:"Tap into Coinbase's massive user base"}),`
`,e.jsx(n.li,{children:"Enable instant transactions without waiting for onramps"}),`
`]}),`
`,e.jsxs(n.h2,{id:"supported-assets-and-networks",children:["Supported Assets and Networks",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-assets-and-networks",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Assets: ETH"}),`
`,e.jsx(n.li,{children:"Networks: Base"}),`
`]}),`
`,e.jsxs(n.h2,{id:"best-practices",children:["Best Practices",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#best-practices",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`Some apps check user's onchain balance and block certain interactions if the user
has insufficient funds. This is a problem for MagicSpend users, who can access
their Coinbase funds during the transaction flow.`}),`
`,e.jsxs(n.p,{children:[`Apps can detect whether the connected address may have other funds accessible
via `,e.jsx(n.code,{children:"auxiliaryFunds"})," capability, which can be discovered via a ",e.jsxs(n.a,{href:"https://eip5792.xyz/reference/getCapabilities",children:[e.jsx(n.code,{children:"wallet_getCapabilities"})," RPC call"]}),`.
If a user has `,e.jsx(n.code,{children:"auxiliaryFunds"}),", apps should not block interactions based on onchain balance."]})]})}function d(s={}){const{wrapper:n}={...a(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{d as default,r as frontmatter};
