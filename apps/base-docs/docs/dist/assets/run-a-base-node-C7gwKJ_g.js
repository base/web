import{u as r,j as e}from"./index-Dlxm52NL.js";import d from"./node-snapshots-BtwUFcYu.js";const c={title:"Running a Base Node",slug:"/run-a-base-node",description:"A tutorial that teaches how to set up and run a Base Node."};function i(s){const n={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"running-a-base-node",children:["Running a Base Node",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#running-a-base-node",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.p,{children:["This tutorial walks you through setting up and running your own ",e.jsx(n.a,{href:"https://github.com/base-org/node",children:"Base Node"})," using Docker."]}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this tutorial, you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Configure and deploy a Base node using Docker Compose."}),`
`,e.jsx(n.li,{children:"Select the network (Mainnet or Sepolia Testnet)."}),`
`,e.jsx(n.li,{children:"Choose a client implementation (Geth, Reth, Nethermind)."}),`
`,e.jsx(n.li,{children:"Start the synchronization process."}),`
`]}),`
`,e.jsxs(n.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.aside,{"data-callout":"warning",children:[e.jsx(n.p,{children:"Is Running a Node Necessary?"}),e.jsx(n.p,{children:"Running your own node is time-consuming, resource-intensive, and can be costly. If you don't have a specific reason, you might not need one."}),e.jsx(n.p,{children:"For development or basic needs, consider using the free public Base endpoints:"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mainnet"}),": ",e.jsx(n.code,{children:"https://mainnet.base.org"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Testnet (Sepolia)"}),": ",e.jsx(n.code,{children:"https://sepolia.base.org"})]}),`
`]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Public RPCs are rate-limited and not suitable for production applications. For production needs, consider using a dedicated ",e.jsx(n.a,{href:"/chain/node-providers",children:"Node Provider"}),"."]})]}),`
`,e.jsxs(n.h3,{id:"hardware-requirements",children:["Hardware Requirements",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hardware-requirements",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Refer to the ",e.jsx(n.a,{href:"/node-performance",children:"Node Performance"})," guide for detailed hardware recommendations. Minimums include:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A modern multi-core CPU."}),`
`,e.jsx(n.li,{children:"32 GB RAM (64 GB recommended)."}),`
`,e.jsx(n.li,{children:"A locally attached NVMe SSD drive."}),`
`,e.jsxs(n.li,{children:["Sufficient storage: ",e.jsx(n.code,{children:"(2 * [current chain size](https://base.org/stats) + [snapshot size](https://basechaindata.vercel.app) + 20% buffer)"}),"."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"docker",children:["Docker",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#docker",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["This section assumes you are familiar with ",e.jsx(n.a,{href:"https://www.docker.com/",children:"Docker"})," and have Docker and Docker Compose installed and running."]}),`
`,e.jsxs(n.h4,{id:"l1-endpoints",children:["L1 Endpoints",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#l1-endpoints",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"You need access to synced Ethereum L1 (execution and consensus) endpoints. These can be self-hosted or from a third-party provider. You will need:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"L1 Execution RPC URL"}),": An HTTP(S) endpoint for the L1 execution client."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"L1 Beacon API URL"}),": An HTTP(S) endpoint for the L1 consensus client Beacon API."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"L1 Beacon Archiver API URL"}),": An HTTP(S) endpoint for an L1 consensus client Beacon API with archival capabilities."]}),`
`]}),`
`,e.jsxs(n.p,{children:["These URLs will be configured in your ",e.jsx(n.code,{children:".env.mainnet"})," or ",e.jsx(n.code,{children:".env.testnet"})," file later."]}),`
`,e.jsxs(n.h4,{id:"setting-up-and-running-the-node",children:["Setting Up and Running the Node",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-and-running-the-node",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Clone the Repository"}),": Clone the official ",e.jsx(n.a,{href:"https://github.com/base-org/node",children:"Base Node repository"}),":"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"git"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" clone"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://github.com/base/node.git"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"cd"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" node"})]})]})})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Choose Network and Configure L1 Endpoints"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Select the environment file for your desired network:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Mainnet: ",e.jsx(n.code,{children:".env.mainnet"})]}),`
`,e.jsxs(n.li,{children:["Testnet: ",e.jsx(n.code,{children:".env.sepolia"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Open the chosen ",e.jsx(n.code,{children:".env"})," file (e.g., ",e.jsx(n.code,{children:".env.mainnet"}),") and configure your L1 endpoints:",`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# .env.mainnet or .env.sepolia"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"OP_NODE_L1_ETH_RPC"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"<your-L1-execution-rpc-url>"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"OP_NODE_L1_BEACON"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"<your-L1-beacon-api-url>"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"OP_NODE_L1_BEACON_ARCHIVER"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"<your-L1-beacon-archiver-api-url>"})]})]})})}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Optional"}),": Also set ",e.jsx(n.code,{children:"OP_NODE_L1_RPC_KIND"})," based on your L1 provider (e.g., ",e.jsx(n.code,{children:"alchemy"}),", ",e.jsx(n.code,{children:"quicknode"}),", ",e.jsx(n.code,{children:"infura"}),", ",e.jsx(n.code,{children:"debug_geth"}),", ",e.jsx(n.code,{children:"erigon"}),", ",e.jsx(n.code,{children:"basic"}),", ",e.jsx(n.code,{children:"any"}),"). See the ",e.jsx(n.code,{children:".env"})," file comments for supported values."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Start the Node with Docker Compose"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Use the following commands to build and start the node containers."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Mainnet (Default Client - Geth)"}),":"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" compose"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" up"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --build"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"})]})})})}),`
`,e.jsx(n.p,{children:e.jsxs(n.em,{children:["The ",e.jsx(n.code,{children:"-d"})," flag runs the containers in detached mode (in the background)."]})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Sepolia Testnet (Default Client - Geth)"}),":"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"NETWORK_ENV"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:".env.sepolia"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" compose"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" up"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --build"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"})]})})})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Specifying a Client (e.g., Reth on Mainnet)"}),`:
Choose between `,e.jsx(n.code,{children:"geth"})," (default), ",e.jsx(n.code,{children:"reth"}),", or ",e.jsx(n.code,{children:"nethermind"}),"."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"CLIENT"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"reth"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" compose"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" up"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --build"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"})]})})})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Sepolia Testnet with a Specific Client (e.g., Reth)"}),":"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"NETWORK_ENV"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:".env.sepolia"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" CLIENT"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"reth"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" docker"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" compose"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" up"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --build"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"})]})})})}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Verify Node is Running"}),`:
Check if the node is responding to RPC requests. It might take a few minutes for the services to start.`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:` '{"id":0,"jsonrpc":"2.0","method":"eth_chainId"}'`}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -H"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "Content-Type: application/json"'}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" http://localhost:8545"})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:'# Expected Mainnet output: {"jsonrpc":"2.0","id":0,"result":"0x2105"}'})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:'# Expected Sepolia output: {"jsonrpc":"2.0","id":0,"result":"0xaa36a7"}'})})]})})}),`
`]}),`
`]}),`
`,e.jsx(n.div,{children:e.jsxs(n.p,{children:["Syncing your node can take ",e.jsx(n.strong,{children:"hours to days"}),", depending on hardware, network, and whether you use a snapshot. It consumes significant resources."]})}),`
`,e.jsx(d,{}),`
`,e.jsxs(n.h2,{id:"monitoring-sync-progress",children:["Monitoring Sync Progress",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#monitoring-sync-progress",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["You can monitor the sync status using the ",e.jsx(n.code,{children:"optimism_syncStatus"})," RPC method:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"echo"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" Latest"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" synced"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" block"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" behind"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" by:"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" $((($("}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"date"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" +%s"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:")-$( "}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"\\"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"  curl"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:` '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}'`}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -H"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "Content-Type: application/json"'}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" http://localhost:7545"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" |"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"  jq"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -r"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" .result.unsafe_l2.timestamp"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"))"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"/60"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:")) "}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"minutes"})]})]})})}),`
`,e.jsxs(n.p,{children:["If you attempt transactions or deployments before the node is fully synced, you might encounter errors like ",e.jsx(n.code,{children:"Error: nonce has already been used"}),"."]}),`
`,e.jsxs(n.h2,{id:"optional-features",children:["Optional Features",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#optional-features",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The Base Node configuration supports optional features like EthStats monitoring and Trusted RPC mode. These can be enabled by uncommenting the relevant sections in your ",e.jsx(n.code,{children:".env"})," file (",e.jsx(n.code,{children:".env.mainnet"})," or ",e.jsx(n.code,{children:".env.sepolia"}),")."]}),`
`,e.jsxs(n.h2,{id:"advanced-configuration-and-networking-geth",children:["Advanced Configuration and Networking (Geth)",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#advanced-configuration-and-networking-geth",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.aside,{"data-callout":"warning",children:e.jsx(n.p,{children:"Modifying the settings below requires familiarity with Geth configuration and Docker. Incorrect settings can impact node stability and performance. Proceed with caution."})}),`
`,e.jsx(n.p,{children:"The standard Base Node Docker setup for Geth uses specific configurations and exposes several ports. Understanding these can be helpful for firewall rules, monitoring, and advanced tuning."}),`
`,e.jsxs(n.h3,{id:"default-network-ports-geth-container",children:["Default Network Ports (Geth Container)",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#default-network-ports-geth-container",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HTTP RPC"}),": ",e.jsx(n.code,{children:"8545"})," (Configurable via ",e.jsx(n.code,{children:"$RPC_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"WebSocket RPC"}),": ",e.jsx(n.code,{children:"8546"})," (Configurable via ",e.jsx(n.code,{children:"$WS_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Authenticated RPC (Engine API)"}),": ",e.jsx(n.code,{children:"8551"})," (Configurable via ",e.jsx(n.code,{children:"$AUTHRPC_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Metrics"}),": ",e.jsx(n.code,{children:"6060"})," (Configurable via ",e.jsx(n.code,{children:"$METRICS_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"P2P Discovery/Connection"}),": ",e.jsx(n.code,{children:"30303"})," (Configurable via ",e.jsx(n.code,{children:"$P2P_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Ensure these ports are accessible as needed, especially the P2P port (",e.jsx(n.code,{children:"30303"}),") for peer discovery if your node is behind a firewall."]}),`
`,e.jsxs(n.h3,{id:"improving-peer-connectivity",children:["Improving Peer Connectivity",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#improving-peer-connectivity",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["For better peer discovery, especially if running behind NAT, you can specify your external IP address. Add the following line to your ",e.jsx(n.code,{children:".env.mainnet"})," or ",e.jsx(n.code,{children:".env.sepolia"})," file:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# .env.mainnet or .env.sepolia"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"ADDITIONAL_ARGS"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"--nat=extip:<your-external-ip-address>"'})]})]})})}),`
`,e.jsxs(n.p,{children:["Replace ",e.jsx(n.code,{children:"<your-external-ip-address>"})," with your actual public IP. You also need to ensure the P2P port (default ",e.jsx(n.code,{children:"30303"}),") is open and forwarded correctly in your firewall/router configuration."]}),`
`,e.jsxs(n.h3,{id:"geth-configuration-via-environment-variables",children:["Geth Configuration via Environment Variables",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#geth-configuration-via-environment-variables",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Several Geth parameters can be tuned by setting environment variables in your ",e.jsx(n.code,{children:".env.mainnet"})," or ",e.jsx(n.code,{children:".env.sepolia"})," file:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Verbosity"}),": ",e.jsx(n.code,{children:"GETH_VERBOSITY"})," (Default: ",e.jsx(n.code,{children:"3"}),") - Controls log level."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sync Mode"}),": ",e.jsx(n.code,{children:"OP_GETH_SYNCMODE"})," (Default: ",e.jsx(n.code,{children:"full"}),") - Geth sync strategy."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"GC Mode"}),": ",e.jsx(n.code,{children:"OP_GETH_GCMODE"})," (Default: ",e.jsx(n.code,{children:"full"}),") - Garbage collection mode."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cache Settings"}),": ",e.jsx(n.code,{children:"GETH_CACHE"}),", ",e.jsx(n.code,{children:"GETH_CACHE_DATABASE"}),", etc. (See ",e.jsx(n.a,{href:"/node-performance",children:"Node Performance"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Transaction Pool"}),": ",e.jsx(n.code,{children:"GETH_TXPOOL_GLOBALQUEUE"}),", ",e.jsx(n.code,{children:"GETH_TXPOOL_GLOBALSLOTS"}),", ",e.jsx(n.code,{children:"GETH_TXPOOL_LIFETIME"}),", ",e.jsx(n.code,{children:"TXPOOL_PRICE_LIMIT"}),". Fine-tuning these requires understanding Geth's transaction pool mechanics."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Refer to the ",e.jsx(n.a,{href:"https://geth.ethereum.org/docs/interface/command-line-options",children:"official Geth documentation"})," for details on these parameters."]}),`
`,e.jsxs(n.h3,{id:"baserollup-specific-flags",children:["Base/Rollup Specific Flags",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#baserollup-specific-flags",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The entrypoint script passes rollup-specific flags necessary for Base operation, such as:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--rollup.disabletxpoolgossip=true"}),": Disables standard L1 transaction gossip over P2P."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--rollup.halt=major"}),": Halts the node on major configuration mismatches with the L1 chain."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'--op-network="$OP_NODE_NETWORK"'}),": Sets the specific OP Stack network configuration (e.g., ",e.jsx(n.code,{children:"base-mainnet"}),")."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"advanced-configuration-and-networking-reth",children:["Advanced Configuration and Networking (Reth)",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#advanced-configuration-and-networking-reth",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.aside,{"data-callout":"warning",children:e.jsx(n.p,{children:"Modifying the settings below requires familiarity with Reth configuration and Docker. Incorrect settings can impact node stability and performance. Proceed with caution."})}),`
`,e.jsx(n.p,{children:"The standard Base Node Docker setup for Reth also uses specific configurations."}),`
`,e.jsxs(n.h3,{id:"default-network-ports--sockets-reth-container",children:["Default Network Ports & Sockets (Reth Container)",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#default-network-ports--sockets-reth-container",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HTTP RPC"}),": ",e.jsx(n.code,{children:"8545"})," (Configurable via ",e.jsx(n.code,{children:"$RPC_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"WebSocket RPC"}),": ",e.jsx(n.code,{children:"8546"})," (Configurable via ",e.jsx(n.code,{children:"$WS_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Authenticated RPC (Engine API)"}),": ",e.jsx(n.code,{children:"8551"})," (Configurable via ",e.jsx(n.code,{children:"$AUTHRPC_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Metrics"}),": ",e.jsx(n.code,{children:"6060"})," (Configurable via ",e.jsx(n.code,{children:"$METRICS_PORT"})," in ",e.jsx(n.code,{children:".env"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"IPC Socket"}),": ",e.jsx(n.code,{children:"/data/reth.ipc"})," (Path configurable via ",e.jsx(n.code,{children:"--ipcpath"})," flag, see Reth docs)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"P2P Discovery/Connection"}),": Default ",e.jsx(n.code,{children:"30303"})," (Configurable via ",e.jsx(n.code,{children:"--port"})," flag, see Reth docs)"]}),`
`]}),`
`,e.jsx(n.p,{children:"Ensure these ports/sockets are accessible as needed."}),`
`,e.jsxs(n.h3,{id:"node-type-and-flashblocks",children:["Node Type and Flashblocks",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#node-type-and-flashblocks",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"NODE_TYPE"})," environment variable (default: ",e.jsx(n.code,{children:"vanilla"}),") determines the Reth binary used:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"vanilla"}),": Uses the standard ",e.jsx(n.code,{children:"op-reth"})," binary."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"base"}),": Uses the ",e.jsx(n.code,{children:"base-reth-node"})," binary."]}),`
`]}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"NODE_TYPE"})," is set to ",e.jsx(n.code,{children:"base"}),", you can enable Flashblocks support by setting the ",e.jsx(n.code,{children:"RETH_FB_WEBSOCKET_URL"})," environment variable in your ",e.jsx(n.code,{children:".env"})," file to your Flashblocks relay endpoint."]}),`
`,e.jsxs(n.h3,{id:"reth-configuration-via-environment-variables",children:["Reth Configuration via Environment Variables",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reth-configuration-via-environment-variables",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Key Reth parameters are configured via environment variables in ",e.jsx(n.code,{children:".env.mainnet"})," or ",e.jsx(n.code,{children:".env.sepolia"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Chain Spec"}),": ",e.jsx(n.code,{children:"RETH_CHAIN"})," (Required, e.g., ",e.jsx(n.code,{children:"base"}),", ",e.jsx(n.code,{children:"base_sepolia"}),") - Specifies the network configuration."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sequencer Endpoint"}),": ",e.jsx(n.code,{children:"RETH_SEQUENCER_HTTP"})," (Required) - URL of the Base sequencer."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Other Reth CLI flags can often be passed via ",e.jsx(n.code,{children:"ADDITIONAL_ARGS"})," in the ",e.jsx(n.code,{children:".env"})," file, but consult the ",e.jsx(n.a,{href:"https://paradigmxyz.github.io/reth/",children:"official Reth documentation"})," for available options and syntax."]}),`
`,e.jsxs(n.h3,{id:"verbosity",children:["Verbosity",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verbosity",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The default Reth entrypoint runs with high verbosity (",e.jsx(n.code,{children:"-vvv"}),"). This can be adjusted by modifying the entrypoint script directly or potentially overriding the command in a custom ",e.jsx(n.code,{children:"docker-compose.override.yml"})," file."]}),`
`,e.jsxs(n.h3,{id:"baserollup-specific-flags-1",children:["Base/Rollup Specific Flags",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#baserollup-specific-flags-1",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The entrypoint script passes rollup-specific flags necessary for Base operation, such as:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--rollup.sequencer-http"}),": Configures the sequencer endpoint."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--rollup.disable-tx-pool-gossip"}),": Disables standard L1 transaction gossip over P2P."]}),`
`]})]})}function a(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{a as default,c as frontmatter};
