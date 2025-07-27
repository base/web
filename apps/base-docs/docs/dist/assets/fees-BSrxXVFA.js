import{u as o,j as e}from"./index-Dlxm52NL.js";const i={title:"Fees",description:"Documentation about network fees on Base. This page covers details of the two-component cost system involving L2 execution fees and L1 security fees, and offers insights on fee variations and cost-saving strategies."};function s(t){const n={a:"a",div:"div",h1:"h1",h2:"h2",header:"header",p:"p",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"fees",children:["Fees",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#fees",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"how-do-network-fees-on-base-work",children:["How do network fees on Base work?",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#how-do-network-fees-on-base-work",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`Every Base transaction consists of two costs: an L2 (execution) fee and an L1
(security) fee. The L2 fee is the cost to execute your transaction on the L2,
and the L1 fee is the estimated cost to publish the transaction on the L1.
Typically the L1 security fee is higher than the L2 execution fee.`}),`
`,e.jsx(n.p,{children:`The L1 fee will vary depending on the amount of transactions on the L1. If the
timing of your transaction is flexible, you can save costs by submitting
transactions during periods of lower gas on the L1 (for example, over the
weekend)`}),`
`,e.jsxs(n.p,{children:[`Similarly, the L2 fee can increase and decrease depending on how many
transactions are being submitted to the L2. This adjustment mechanism has the
same implementation as the L1; you can read more about it
`,e.jsx(n.a,{href:"https://help.coinbase.com/en/coinbase/getting-started/crypto-education/eip-1559",children:"here"}),"."]}),`
`,e.jsxs(n.p,{children:[`For additional details about fee calculation on Base, please refer to the
`,e.jsx(n.a,{href:"https://docs.optimism.io/stack/transactions/fees",children:`op-stack developer
documentation`}),"."]})]})}function r(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{r as default,i as frontmatter};
