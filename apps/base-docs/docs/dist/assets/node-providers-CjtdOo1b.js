import{u as r,j as e}from"./index-Dlxm52NL.js";const l={title:"Flashblocks",slug:"/flashblocks/node-providers",description:"Experience lightning-fast transaction confirmations on Base by using Flashblocks. Preconfirmations happen in just 200 milliseconds—designed for real-time apps, games, and seamless UX."};function i(n){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"how-to-host-flashblocks-aware-rpc-nodes",children:["How to host Flashblocks-aware RPC nodes",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-host-flashblocks-aware-rpc-nodes",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(s.h2,{id:"quick-start",children:["Quick Start",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#quick-start",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Prerequisites"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Docker and Docker Compose"}),`
`,e.jsxs(s.li,{children:["Minimum hardware requirements (see ",e.jsx(s.a,{href:"https://github.com/base/node?tab=readme-ov-file#hardware-requirements",children:"node README"}),")"]}),`
`,e.jsx(s.li,{children:"Access to a Flashblocks websocket endpoint, we provide public endpoints in the env files in the repo"}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Set Up Environment"}),":"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Clone the repository"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"git"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" clone"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://github.com/base/node.git"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"cd"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" node"})]})]})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Start the Node with Flashblocks Support"}),":"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"NODE_TYPE"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"base"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" CLIENT"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"reth"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" docker-compose"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" up"})]})})})}),`
`]}),`
`]}),`
`,e.jsxs(s.h2,{id:"configuration-options",children:["Configuration Options",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configuration-options",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Node Type"}),": Use ",e.jsx(s.code,{children:"NODE_TYPE=base"})," to enable base reth node withFlashblocks functionality"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Network"}),": Use ",e.jsx(s.code,{children:"NETWORK_ENV=.env.mainnet"})," for mainnet or ",e.jsx(s.code,{children:"NETWORK_ENV=.env.sepolia"})," for testnet"]}),`
`]}),`
`,e.jsxs(s.h2,{id:"verifying-flashblocks-functionality",children:["Verifying Flashblocks Functionality",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verifying-flashblocks-functionality",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Test that your node is properly supporting Flashblocks by querying a pending block:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -X"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" POST"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --data"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:` '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["pending", false],"id":1}'`}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"  http://localhost:8545"})})]})})}),`
`,e.jsxs(s.h2,{id:"available-rpc-methods",children:["Available RPC Methods",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#available-rpc-methods",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["Flashblocks-aware nodes provide all standard Ethereum JSON-RPC methods plus specialized Flashblocks endpoints. For more details, see the ",e.jsx(s.a,{href:"https://docs.base.org/chain/flashblocks/apps#rpc-api",children:"Flashblocks RPC API documentation"}),"."]}),`
`,e.jsxs(s.h2,{id:"further-resources",children:["Further Resources",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#further-resources",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["For detailed information about node setup, including hardware requirements and additional configuration options, refer to the ",e.jsx(s.a,{href:"https://github.com/base/node/tree/main/reth#readme",children:"Reth node README"}),"."]})]})}function o(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{o as default,l as frontmatter};
