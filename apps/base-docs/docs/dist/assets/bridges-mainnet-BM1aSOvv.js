import{u as n,j as e}from"./index-Dlxm52NL.js";const a={title:"Bridges",description:"Documentation for bridging assets to Base. This page covers how to bridge ETH and ERC-20s between Ethereum (L1) and Base along with essential information."};function i(s){const r={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r.header,{children:e.jsxs(r.h1,{id:"bridges",children:["Bridges",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#bridges",children:e.jsx(r.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(r.p,{children:`While the bridge on bridge.base.org has been deprecated, there are many bridges
that support moving assets between Base and other chains.`}),`
`,e.jsxs(r.p,{children:["For questions, see our ",e.jsx(r.a,{href:"#faq",children:"FAQ"}),"."]}),`
`,e.jsxs(r.h2,{id:"superbridge",children:["Superbridge",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#superbridge",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(r.p,{children:"Superbridge enables you to bridge ETH and other supported assets from Ethereum mainnet (L1) directly to Base."}),`
`,e.jsxs(r.h4,{id:"supported-networks",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://superbridge.app/base",children:"Base Mainnet"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://superbridge.app/base-sepolia",children:"Base Sepolia (Testnet)"})}),`
`]}),`
`,e.jsxs(r.h2,{id:"bridgg",children:["Brid.gg",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#bridgg",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(r.p,{children:"Brid.gg is another option that also helps you bridge ETH and supported assets between Ethereum mainnet (L1) and Base."}),`
`,e.jsxs(r.h4,{id:"supported-networks-1",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-1",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://brid.gg/base",children:"Base Mainnet"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://testnet.brid.gg/base-sepolia",children:"Base Sepolia (Testnet)"})}),`
`]}),`
`,e.jsxs(r.h2,{id:"disclaimer",children:["Disclaimer",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#disclaimer",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(r.p,{children:`Coinbase Technologies, Inc., provides links to these independent service providers for your
convenience but assumes no responsibility for their operations. Any interactions with these
providers are solely between you and the provider.`}),`
`,e.jsxs(r.h2,{id:"programmatic-bridging",children:["Programmatic Bridging",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#programmatic-bridging",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:["See the ",e.jsx(r.a,{href:"https://github.com/base-org/guides/tree/main/bridge/native",children:"sample code repository"})," to see how to bridge ETH and ERC-20s from Ethereum to Base."]}),`
`,e.jsx(r.div,{children:e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Double check the token address for ERC-20s"}),` You can use any ERC-20 that is
supported on the network. You can check what assets are on Base and the
corresponding contract address via `,e.jsx(r.a,{href:"https://github.com/ethereum-optimism/ethereum-optimism.github.io/tree/master/data",children:"this hub"}),`.
Ensure there is an address for `,e.jsx(r.code,{children:"base"}),", ",e.jsx(r.a,{href:"https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/WETH/data.json#L16-L18",children:"example"}),`.
Always test with small amounts to ensure the system is working as expected.`]})}),`
`,e.jsx(r.div,{children:e.jsx(r.p,{children:`This implementation can only bridge assets to Base. Do not attempt to alter the
code to withdraw the assets.`})}),`
`,e.jsxs(r.h2,{id:"faq",children:["FAQ",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#faq",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:e.jsx(r.strong,{children:"Can I still use the bridge on bridge.base.org?"})}),e.jsx("br",{}),e.jsx(r.p,{children:"No, the bridge on bridge.base.org has been deprecated."})]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:e.jsx(r.strong,{children:"I used bridge.base.org in the past, how do I find my deposit or withdrawal?"})}),e.jsx("br",{}),e.jsx(r.p,{children:"Navigate to one of the Superchain Bridges to look up your transaction."})]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:e.jsx(r.strong,{children:"Why has Base deprecated the bridge on bridge.base.org?"})}),e.jsx("br",{}),e.jsx(r.p,{children:"Base is committed to decentralization and the Superchain vision. Leveraging the community to bootstrap the Superchain bridges is a step in that direction; increasing censorship resistance and decentralization."})]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:e.jsx(r.strong,{children:"Who operates the Superchain Bridges like Superbridge.app and Brid.gg?"})}),e.jsx("br",{}),e.jsx(r.p,{children:'Superchain Bridges are operated by third parties, not by Coinbase Technologies, Inc. ("Coinbase"). Coinbase does not control, operate, or assume any responsibility for the performance of these external platforms. Before using any Superchain Bridge, you may be required to agree to their terms and conditions. We strongly recommend you review these terms carefully, as well as any privacy policies, to understand your rights and obligations. The integration or inclusion of the Superchain Bridges does not imply an endorsement or recommendation of any bridge by Coinbase.'})]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:e.jsx(r.strong,{children:"What if I have a question, issue, or problem?"})}),e.jsx("br",{}),e.jsxs(r.p,{children:["The ",e.jsx(r.a,{href:"https://base.org/discord",children:"Base Discord"}),` community is available around the clock for general questions,
assistance and support! You can create a support ticket in the #general-support
channel.`]})]})]})}function d(s={}){const{wrapper:r}={...n(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(i,{...s})}):i(s)}export{d as default,a as frontmatter};
