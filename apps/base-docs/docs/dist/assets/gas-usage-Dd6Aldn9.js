import{u as s,j as e}from"./index-Dlxm52NL.js";const d={title:"Gas Usage",description:"undefined"};function r(t){const n={a:"a",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"gas-usage",children:["Gas Usage",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#gas-usage",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:`Smart Wallets use more gas for transactions than traditional Ethereum accounts. On L2 networks, the cost difference to the user is a matter of cents.
The gas difference is due to the additional overhead required for:`}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"ERC-4337 Bundling"}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Smart Contract Operations"}),", including one time deployment of the Smart Wallet contract"]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Signature Verification"}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"gas-usage-breakdown",children:["Gas Usage Breakdown",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#gas-usage-breakdown",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Here's a rough comparison of gas usage per account:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Operation Type"}),e.jsx(n.th,{children:"Traditional Ethereum Account"}),e.jsx(n.th,{children:"Smart Wallet"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Native Token Transfer"}),e.jsx(n.td,{children:"~21,000 gas"}),e.jsx(n.td,{children:"~100,000 gas"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"ERC-20 Token Transfer"}),e.jsx(n.td,{children:"~65,000 gas"}),e.jsx(n.td,{children:"~150,000 gas"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"First Deployment"}),e.jsx(n.td,{children:"N/A"}),e.jsx(n.td,{children:"~300,000+ gas"})]})]})]})]})}function i(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{i as default,d as frontmatter};
