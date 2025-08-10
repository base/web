import{u as s,j as e}from"./index-Dlxm52NL.js";const r={title:"Block Building",slug:"/block-building",description:"This page outlines how Base blocks are built."};function t(n){const i={a:"a",div:"div",h1:"h1",h2:"h2",h3:"h3",h5:"h5",header:"header",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"block-building",children:["Block Building",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#block-building",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(i.h2,{id:"overview",children:["Overview",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:`This section describes how blocks are ordered on the Base networks. The ordering is separate from the UX,
for example the sequencer could be building Flashblocks every 200ms, without these Flashblocks being exposed publicly. In this scenario, block ordering
would change but the user experience would remain consistent.`}),`
`,e.jsx(i.p,{children:"The Base networks are currently configured in the following ways:"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Network"}),e.jsx(i.th,{children:"Current Configuration"}),e.jsx(i.th,{children:"Upcoming Deployments"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Base Mainnet"}),e.jsx(i.td,{children:e.jsx(i.a,{href:"#vanilla",children:"Vanilla"})}),e.jsxs(i.td,{children:[e.jsx(i.a,{href:"#flashblocks",children:"Flashblocks"})," (Summer 2025)"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Base Sepolia"}),e.jsx(i.td,{children:e.jsx(i.a,{href:"#flashblocks",children:"Flashblocks"})}),e.jsx(i.td,{children:"None"})]})]})]}),`
`,e.jsxs(i.h2,{id:"configurations",children:["Configurations",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configurations",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"flashblocks",children:["Flashblocks",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#flashblocks",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Currently, blocks are built using ",e.jsx(i.a,{href:"https://github.com/flashbots/op-rbuilder",children:"op-rbuilder"}),` and priority fee auctions occur
every 200ms. There are two changes from the vanilla ordering to be aware of:`]}),`
`,e.jsxs(i.h5,{id:"timing",children:["Timing",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#timing",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Flashblocks are built every 200ms, each ordering a portion of the block. Unlike the current system where later-arriving transactions with higher priority fees can be placed at the top of the block, Flashblocks creates a time-based constraint. Once a Flashblock is built and broadcast, its transaction ordering is locked even if a transaction with a higher priority fee arrives later, it cannot be included in earlier, already built Flashblocks."}),`
`,e.jsxs(i.h5,{id:"high-gas-limits",children:["High Gas Limits",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#high-gas-limits",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"If your app creates transactions with large gas limits, we recommend monitoring to detect any changes in inclusion latency. Transactions with gas limits over 1/10 of the current block gas limit (currently 14 million gas), face additional constraints:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Each Flashblock can only use a portion of the block's total gas limit"}),`
`,e.jsx(i.li,{children:"Flashblock 1: up to 1/10 of the total gas"}),`
`,e.jsx(i.li,{children:"Flashblock 2: up to 2/10 of the total gas"}),`
`]}),`
`,e.jsx(i.p,{children:"And so on for subsequent Flashblocks"}),`
`,e.jsx(i.p,{children:"Consequently, transactions with large gas requirements must wait for later Flashblocks with sufficient gas capacity. For example, a transaction exceeding 1/10 of the block's gas limit cannot be included in Flashblock 1 and must wait for Flashblock 2 or later."}),`
`,e.jsxs(i.h3,{id:"vanilla",children:["Vanilla",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#vanilla",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Blocks are built every 2s by ",e.jsx(i.a,{href:"https://github.com/ethereum-optimism/op-geth",children:"op-geth"}),`. Transactions within those blocks are ordered by
priority fee, see the (`,e.jsx(i.a,{href:"https://github.com/ethereum-optimism/op-geth/blob/optimism/miner/worker.go#L627",children:"code"}),"."]}),`
`,e.jsxs(i.h2,{id:"changelog",children:["Changelog",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#changelog",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"15th May: Ended testing Flashblocks on Base Mainnet"}),`
`,e.jsx(i.li,{children:"15th May: Started testing Flashblocks on Base Mainnet"}),`
`,e.jsx(i.li,{children:"25th Feb: Enabled Flashblocks on Base Sepolia"}),`
`]})]})}function l(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{l as default,r as frontmatter};
