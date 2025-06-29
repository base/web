import{u as t,j as e}from"./index-Dlxm52NL.js";const i={title:"Oracles",slug:"/tools/oracles",description:"Documentation for various blockchain oracles for Base. Including support for price feeds and verifiable random functions (VRF)."};function n(s){const r={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r.header,{children:e.jsxs(r.h1,{id:"oracles",children:["Oracles",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#oracles",children:e.jsx(r.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(r.h2,{id:"api3",children:["API3",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#api3",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:["The API3 Market provides access to 200+ price feeds on ",e.jsx(r.a,{href:"https://market.api3.org/base",children:"Base Mainnet"})," and ",e.jsx(r.a,{href:"https://market.api3.org/base-sepolia-testnet",children:"Base Testnet"}),". The price feeds operate as a native push oracle and can be activated instantly via the Market UI."]}),`
`,e.jsxs(r.p,{children:["The price feeds are delivered by an aggregate of ",e.jsx(r.a,{href:"https://docs.api3.org/explore/airnode/why-first-party-oracles.html",children:"first-party oracles"})," using signed data and support ",e.jsx(r.a,{href:"https://docs.api3.org/oev-searchers/",children:"OEV recapture"}),"."]}),`
`,e.jsxs(r.p,{children:["Unlike traditional data feeds, reading ",e.jsx(r.a,{href:"https://docs.api3.org",children:"API3 price feeds"})," enables dApps to auction off the right to update the price feeds to searcher bots which facilitates more efficient liquidation processes for users and LPs of DeFi money markets. The OEV recaptured is returned to the dApp."]}),`
`,e.jsxs(r.p,{children:["Apart from data feeds, API3 also provides ",e.jsx(r.a,{href:"https://docs.api3.org/explore/qrng/",children:"Quantum Random Number Generation"})," on Base Mainnet and Testnet. QRNG is a free-to-use service that provides quantum randomness onchain. It is powered by ",e.jsx(r.a,{href:"https://docs.api3.org/reference/airnode/latest/understand/",children:"Airnode"}),", the first-party oracle that is directly operated by the ",e.jsx(r.a,{href:"https://docs.api3.org/reference/qrng/providers.html",children:"QRNG API providers"}),". Read more about QRNG ",e.jsx(r.a,{href:"https://docs.api3.org/reference/qrng",children:"here"}),"."]}),`
`,e.jsx(r.p,{children:"Check out these guides to learn more:"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.a,{href:"https://docs.api3.org/guides/dapis/subscribing-to-dapis/",children:"dAPIs"}),": First-party aggregated data feeds sourced directly from the data providers."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.a,{href:"https://docs.api3.org/guides/airnode/calling-an-airnode/",children:"Airnode"}),": The first-party serverless Oracle solution to bring any REST API onchain."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.a,{href:"https://docs.api3.org/guides/qrng/",children:"QRNG"}),": Quantum Random Number Generator for verifiable quantum RNG onchain."]}),`
`]}),`
`,e.jsxs(r.h4,{id:"supported-networks",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`,e.jsx(r.li,{children:"Base Sepolia (Testnet)"}),`
`]}),`
`,e.jsxs(r.h2,{id:"chainlink",children:["Chainlink",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#chainlink",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.a,{href:"https://chain.link/",children:"Chainlink"})," provides a number of ",e.jsx(r.a,{href:"https://docs.chain.link/data-feeds/price-feeds/addresses/?network=base",children:"price feeds"})," for Base."]}),`
`,e.jsxs(r.p,{children:["See ",e.jsx(r.a,{href:"https://docs.chain.link/docs/get-the-latest-price/",children:"this guide"})," to learn how to use the Chainlink feeds."]}),`
`,e.jsx(r.aside,{"data-callout":"info",children:e.jsxs(r.p,{children:["To use Chainlink datafeeds, you may need ",e.jsx(r.a,{href:"https://docs.chain.link/resources/link-token-contracts?parent=dataFeeds",children:"LINK"})," token."]})}),`
`,e.jsxs(r.h4,{id:"supported-networks-1",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-1",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`,e.jsx(r.li,{children:"Base Sepolia (Testnet)"}),`
`]}),`
`,e.jsxs(r.h2,{id:"chronicle",children:["Chronicle",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#chronicle",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.a,{href:"https://chroniclelabs.org/",children:"Chronicle"})," provides a number of ",e.jsx(r.a,{href:"https://chroniclelabs.org/dashboard",children:"Oracles"})," for Base."]}),`
`,e.jsxs(r.p,{children:["See ",e.jsx(r.a,{href:"https://docs.chroniclelabs.org/Builders/tutorials/Remix",children:"this guide"})," to learn how to use the Chronicle Oracles."]}),`
`,e.jsxs(r.h4,{id:"supported-networks-2",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-2",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`,e.jsx(r.li,{children:"Base Sepolia (Testnet)"}),`
`]}),`
`,e.jsxs(r.h2,{id:"dia",children:["DIA",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dia",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.a,{href:"https://www.diadata.org/",children:"DIA"})," provides 2000+ ",e.jsx(r.a,{href:"https://www.diadata.org/app/price/",children:"price feeds"}),` for Base.
See `,e.jsx(r.a,{href:"https://docs.diadata.org/introduction/intro-to-dia-oracles/request-an-oracle",children:"this guide"})," to learn how to use the DIA feeds."]}),`
`,e.jsxs(r.h4,{id:"supported-networks-3",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-3",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`,e.jsx(r.li,{children:"Base Sepolia (Testnet)"}),`
`]}),`
`,e.jsxs(r.h2,{id:"gelato",children:["Gelato",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#gelato",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(r.p,{children:"Gelato VRF (Verifiable Random Function) provides a unique system offering trustable randomness on Base."}),`
`,e.jsxs(r.p,{children:["See this guide to learn how to get started with ",e.jsx(r.a,{href:"https://docs.gelato.network/web3-services/vrf/quick-start",children:"Gelato VRF"}),"."]}),`
`,e.jsxs(r.h4,{id:"supported-networks-4",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-4",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`,e.jsx(r.li,{children:"Base Sepolia (Testnet)"}),`
`]}),`
`,e.jsxs(r.h2,{id:"ora",children:["ORA",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#ora",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.a,{href:"https://ora.io",children:"ORA"})," provides an ",e.jsx(r.a,{href:"https://docs.ora.io/doc/oao-onchain-ai-oracle/introduction",children:"Onchain AI Oracle"})," for Base."]}),`
`,e.jsxs(r.p,{children:["See ",e.jsx(r.a,{href:"https://docs.ora.io/doc/oao-onchain-ai-oracle/develop-guide/tutorials/interaction-with-oao-tutorial",children:"this guide"})," to learn how to use ORA Onchain AI Oracle."]}),`
`,e.jsxs(r.h4,{id:"supported-networks-5",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-5",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`]}),`
`,e.jsxs(r.h2,{id:"pyth",children:["Pyth",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pyth",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.a,{href:"https://pyth.network/",children:"Pyth Network"})," is one of the largest first-party Oracle network, delivering real-time data across ",e.jsx(r.a,{href:"https://docs.pyth.network/price-feeds/contract-addresses",children:"a vast number of chains"}),". Pyth introduces an innovative low-latency ",e.jsx(r.a,{href:"https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand",children:"pull oracle design"}),", where users can pull price updates onchain when needed, enabling everyone in the onchain environment to access that data point most efficiently. Pyth network updates the prices every ",e.jsx(r.strong,{children:"400ms"}),", making Pyth one of the fastest onchain oracles."]}),`
`,e.jsxs(r.h4,{id:"pyth-price-feeds-features",children:["Pyth Price Feeds Features:",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pyth-price-feeds-features",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"400ms latency"}),`
`,e.jsx(r.li,{children:"Efficient and cost-effective Oracle"}),`
`,e.jsxs(r.li,{children:[e.jsx(r.a,{href:"https://pyth.network/publishers",children:"First-party"})," data sourced directly from financial institutions"]}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://pyth.network/developers/price-feed-ids",children:"Price feeds ranging from Crypto, Stock, FX, Metals"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://docs.pyth.network/price-feeds/contract-addresses",children:"Available on all major chains"})}),`
`]}),`
`,e.jsxs(r.h4,{id:"supported-networks-for-base-pyth-price-feeds",children:["Supported Networks for Base (Pyth Price Feeds):",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-for-base-pyth-price-feeds",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Base Mainnet: ",e.jsx(r.a,{href:"https://basescan.org/address/0x8250f4aF4B972684F7b336503E2D6dFeDeB1487a",children:e.jsx(r.code,{children:"0x8250f4aF4B972684F7b336503E2D6dFeDeB1487a"})})]}),`
`,e.jsxs(r.li,{children:["Base Sepolia: ",e.jsx(r.a,{href:"https://base-sepolia.blockscout.com/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",children:e.jsx(r.code,{children:"0xA2aa501b19aff244D90cc15a4Cf739D2725B5729"})})]}),`
`]}),`
`,e.jsxs(r.h3,{id:"pyth-entropy",children:["Pyth Entropy",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pyth-entropy",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:["Pyth Entropy allows developers to quickly and easily generate secure ",e.jsx(r.strong,{children:"random numbers"})," onchain."]}),`
`,e.jsxs(r.p,{children:["Check ",e.jsx(r.a,{href:"https://docs.pyth.network/entropy/generate-random-numbers/evm",children:"how to generate random numbers in EVM contracts"})," for a detailed walkthrough."]}),`
`,e.jsxs(r.h4,{id:"supported-networks-for-base-pyth-entropy",children:["Supported Networks for Base (Pyth Entropy):",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-for-base-pyth-entropy",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Base Mainnet: ",e.jsx(r.a,{href:"https://basescan.org/address/0x6E7D74FA7d5c90FEF9F0512987605a6d546181Bb",children:e.jsx(r.code,{children:"0x6E7D74FA7d5c90FEF9F0512987605a6d546181Bb"})})]}),`
`,e.jsxs(r.li,{children:["Base Sepolia: ",e.jsx(r.a,{href:"https://base-sepolia.blockscout.com/address/0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c",children:e.jsx(r.code,{children:"0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c"})})]}),`
`]}),`
`,e.jsx(r.p,{children:"Check out the following links to get started with Pyth."}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://docs.pyth.network/price-feeds/use-real-time-data/evm",children:"Pyth Price Feed EVM Integration Guide"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://docs.pyth.network/home",children:"Pyth Docs"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://api-reference.pyth.network/price-feeds/evm/getPrice",children:"Pyth Price Feed API Reference"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://github.com/pyth-network/pyth-examples",children:"Pyth Examples"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://pyth.network/",children:"Website"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://x.com/PythNetwork",children:"Twitter"})}),`
`]}),`
`,e.jsxs(r.h2,{id:"redstone",children:["RedStone",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#redstone",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.a,{href:"https://redstone.finance/",children:"RedStone"})," provides 1200+ ",e.jsx(r.a,{href:"https://app.redstone.finance/",children:"price feeds"})," for Base."]}),`
`,e.jsxs(r.p,{children:["See ",e.jsx(r.a,{href:"https://docs.redstone.finance/",children:"this guide"})," to learn how to use the RedStone feeds."]}),`
`,e.jsxs(r.h4,{id:"supported-networks-6",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-6",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`]}),`
`,e.jsxs(r.h2,{id:"supra",children:["Supra",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supra",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.a,{href:"https://supraoracles.com",children:"Supra"})," provides VRF and decentralized oracle price feeds that can be used for onchain and offchain use-cases such as spot and perpetual DEXes, lending protocols, and payments protocols. Supra’s oracle chain and consensus algorithm makes it one of the fastest-to-finality oracle providers, with layer-1 security guarantees. The pull oracle has a sub-second response time. Aside from speed and security, Supra’s rotating node architecture gathers data from 40+ data sources and applies a robust calculation methodology to get the most accurate value. The node provenance on the data dashboard also provides a fully transparent historical audit trail. Supra’s Distributed Oracle Agreement (DORA) paper was accepted into ICDCS 2023, the oldest distributed systems conference."]}),`
`,e.jsxs(r.p,{children:["Visit the Supra ",e.jsx(r.a,{href:"https://docs.supra.com/",children:"documentation"})," to learn more about integrating Supra's oracle and VRF into your Base project."]}),`
`,e.jsxs(r.h4,{id:"supported-networks-7",children:["Supported Networks",e.jsx(r.a,{"aria-hidden":"true",tabIndex:"-1",href:"#supported-networks-7",children:e.jsx(r.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Base Mainnet"}),`
`,e.jsx(r.li,{children:"Base Sepolia (Testnet)"}),`
`]})]})}function d(s={}){const{wrapper:r}={...t(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(n,{...s})}):n(s)}export{d as default,i as frontmatter};
