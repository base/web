import{u as i,j as e}from"./index-Dlxm52NL.js";const c={title:"Node Troubleshooting",slug:"/node-troubleshooting",description:"A guide to diagnosing and resolving common issues when running a Base node.",author:"hndvx"};function r(s){const n={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"node-troubleshooting",children:["Node Troubleshooting",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#node-troubleshooting",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.p,{children:["This guide covers common issues encountered when setting up and running a Base node using the official ",e.jsx(n.a,{href:"https://github.com/base/node",children:"Base Node Docker setup"})," and provides steps to diagnose and resolve them."]}),`
`,e.jsxs(n.h2,{id:"general-troubleshooting-steps",children:["General Troubleshooting Steps",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#general-troubleshooting-steps",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Before diving into specific issues, here are some general steps that often help:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check Container Logs"}),": This is usually the most informative step. Use ",e.jsx(n.code,{children:"docker compose logs -f <service_name>"})," to view the real-time logs for a specific container.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["L2 Client (Geth): ",e.jsx(n.code,{children:"docker compose logs -f op-geth"})]}),`
`,e.jsxs(n.li,{children:["L2 Client (Reth): ",e.jsx(n.code,{children:"docker compose logs -f op-reth"})]}),`
`,e.jsxs(n.li,{children:["Rollup Node: ",e.jsx(n.code,{children:"docker compose logs -f op-node"}),`
Look for errors, warnings, or repeated messages.`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check Container Status"}),": Ensure the relevant Docker containers are running: ",e.jsx(n.code,{children:"docker compose ps"}),". If a container is restarting frequently or exited, check its logs."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check Resource Usage"}),": Monitor your server's CPU, RAM, disk I/O, and network usage. Performance issues are often linked to insufficient resources. Tools like ",e.jsx(n.code,{children:"htop"}),", ",e.jsx(n.code,{children:"iostat"}),", and ",e.jsx(n.code,{children:"iftop"})," can be helpful."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Verify RPC Endpoints"}),": Use ",e.jsx(n.code,{children:"curl"})," to check if the L2 client's RPC endpoint is responding (see ",e.jsx(n.a,{href:"/run-a-base-node#verify-node-is-running",children:"Running a Base Node > Verify Node is Running"}),"). Also, verify your L1 endpoints are correct and accessible from the node server."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check L1 Node"}),": Ensure your configured L1 node (Execution and Consensus) is fully synced, healthy, and accessible. Issues with the L1 node will prevent the L2 node from syncing correctly."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"common-issues-and-solutions",children:["Common Issues and Solutions",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#common-issues-and-solutions",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"setup--configuration-issues",children:["Setup & Configuration Issues",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup--configuration-issues",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Docker command fails (",e.jsx(n.code,{children:"docker compose up ..."}),").",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Is Docker and Docker Compose installed and the Docker daemon running?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Are you in the correct directory (the cloned ",e.jsx(n.code,{children:"node"})," directory containing ",e.jsx(n.code,{children:"docker-compose.yml"}),")?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Syntax errors in the command (e.g., misspelled ",e.jsx(n.code,{children:"NETWORK_ENV"})," or ",e.jsx(n.code,{children:"CLIENT"}),")."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Container fails to start, logs show errors related to ",e.jsx(n.code,{children:".env"})," files or environment variables.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Did you correctly configure the L1 endpoints (",e.jsx(n.code,{children:"OP_NODE_L1_ETH_RPC"}),", ",e.jsx(n.code,{children:"OP_NODE_L1_BEACON"}),") in the correct ",e.jsx(n.code,{children:".env"})," file (",e.jsx(n.code,{children:".env.mainnet"})," or ",e.jsx(n.code,{children:".env.sepolia"}),")?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Is the ",e.jsx(n.code,{children:"OP_NODE_L1_BEACON_ARCHIVER"})," endpoint set if required by your configuration or L1 node?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Is ",e.jsx(n.code,{children:"OP_NODE_L1_RPC_KIND"})," set correctly for your L1 provider?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": (Reth) Are ",e.jsx(n.code,{children:"RETH_CHAIN"})," and ",e.jsx(n.code,{children:"RETH_SEQUENCER_HTTP"})," correctly set in the ",e.jsx(n.code,{children:".env"})," file?"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Errors related to JWT secret or authentication between ",e.jsx(n.code,{children:"op-node"})," and L2 client.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Ensure you haven't manually modified the ",e.jsx(n.code,{children:"OP_NODE_L2_ENGINE_AUTH"})," variable or the JWT file path (",e.jsx(n.code,{children:"$OP_NODE_L2_ENGINE_AUTH"}),") unless you know what you're doing. The ",e.jsx(n.code,{children:"docker-compose"})," setup usually handles this automatically."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Permission errors related to data volumes (",e.jsx(n.code,{children:"./geth-data"}),", ",e.jsx(n.code,{children:"./reth-data"}),").",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Ensure the user running ",e.jsx(n.code,{children:"docker compose"})," has write permissions to the directory where the ",e.jsx(n.code,{children:"node"})," repository was cloned. Docker needs to be able to write to ",e.jsx(n.code,{children:"./geth-data"})," or ",e.jsx(n.code,{children:"./reth-data"}),". Sometimes running Docker commands with ",e.jsx(n.code,{children:"sudo"})," can cause permission issues later; try running as a non-root user added to the ",e.jsx(n.code,{children:"docker"})," group."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"syncing-problems",children:["Syncing Problems",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#syncing-problems",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Node doesn't start syncing or appears stuck (block height not increasing).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": ",e.jsx(n.code,{children:"op-node"})," logs. Look for errors connecting to L1 endpoints or the L2 client."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": L2 client (",e.jsx(n.code,{children:"op-geth"}),"/",e.jsx(n.code,{children:"op-reth"}),") logs. Look for errors connecting to ",e.jsx(n.code,{children:"op-node"})," via the Engine API (port ",e.jsx(n.code,{children:"8551"}),") or P2P issues."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": L1 node health and sync status. Is the L1 node accessible and fully synced?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": System time. Ensure the server's clock is accurately synchronized (use ",e.jsx(n.code,{children:"ntp"})," or ",e.jsx(n.code,{children:"chrony"}),"). Significant time drift can cause P2P issues."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Syncing is extremely slow.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Hardware specifications. Are you meeting the recommended specs (especially RAM and ",e.jsx(n.strong,{children:"NVMe SSD"}),") outlined in the ",e.jsx(n.a,{href:"/chain/node-performance",children:"Node Performance"})," guide? Disk I/O is often the bottleneck."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": L1 node performance. Is your L1 RPC endpoint responsive? A slow L1 node will slow down L2 sync."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Network connection quality and bandwidth."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": ",e.jsx(n.code,{children:"op-node"})," and L2 client logs for any performance warnings or errors."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": ",e.jsx(n.code,{children:"optimism_syncStatus"})," (port ",e.jsx(n.code,{children:"7545"})," on ",e.jsx(n.code,{children:"op-node"}),") shows a large time difference or errors.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action"}),": Check the logs for both ",e.jsx(n.code,{children:"op-node"})," and the L2 client (",e.jsx(n.code,{children:"op-geth"}),"/",e.jsx(n.code,{children:"op-reth"}),") around the time the status was checked to identify the root cause (e.g., L1 connection issues, L2 client issues)."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": ",e.jsx(n.code,{children:"Error: nonce has already been used"})," when trying to send transactions.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cause"}),": The node is not yet fully synced to the head of the chain."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action"}),": Wait for the node to fully sync. Monitor progress using ",e.jsx(n.code,{children:"optimism_syncStatus"})," or logs."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"performance-issues",children:["Performance Issues",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#performance-issues",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": High CPU, RAM, or Disk I/O usage.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Hardware specifications against recommendations in ",e.jsx(n.a,{href:"/chain/node-performance",children:"Node Performance"}),". Upgrade if necessary. Local NVMe SSDs are critical."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": (Geth) Review Geth cache settings and LevelDB tuning options mentioned in ",e.jsx(n.a,{href:"/chain/node-performance#geth-performance-tuning",children:"Node Performance"})," and ",e.jsx(n.a,{href:"/chain/run-a-base-node#geth-configuration-via-environment-variables",children:"Advanced Configuration"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Review client logs for specific errors or bottlenecks."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action"}),": Consider using Reth if running Geth, as it's generally more performant for Base."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"snapshot-restoration-problems",children:["Snapshot Restoration Problems",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#snapshot-restoration-problems",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Refer to the ",e.jsx(n.a,{href:"/chain/node-snapshots",children:"Snapshots"})," guide for the correct procedure."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": ",e.jsx(n.code,{children:"wget"})," command fails or snapshot download is corrupted.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Network connectivity."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Available disk space."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action"}),": Retry the download. Verify the download URL is correct."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": ",e.jsx(n.code,{children:"tar"})," extraction fails.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Downloaded file integrity (is it corrupted?)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Available disk space (extraction requires much more space than the download)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": ",e.jsx(n.code,{children:"tar"})," command syntax."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Node fails to start after restoring snapshot; logs show database errors or missing files.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Did you stop the node (",e.jsx(n.code,{children:"docker compose down"}),") ",e.jsx(n.em,{children:"before"})," modifying the data directory?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Did you remove the ",e.jsx(n.em,{children:"contents"})," of the old data directory (",e.jsx(n.code,{children:"./geth-data/*"})," or ",e.jsx(n.code,{children:"./reth-data/*"}),") before extracting/moving the snapshot data?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Was the snapshot data moved correctly? The chain data needs to be directly inside ",e.jsx(n.code,{children:"./geth-data"})," or ",e.jsx(n.code,{children:"./reth-data"}),", not in a nested subfolder (e.g., ",e.jsx(n.code,{children:"./geth-data/geth/..."}),"). Verify the folder structure."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Ran out of disk space during download or extraction.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action"}),": Free up disk space or provision a larger volume. Remember the storage formula: ",e.jsx(n.code,{children:"(2 * chain_size + snapshot_size + 20% buffer)"}),"."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"networking--connectivity-issues",children:["Networking / Connectivity Issues",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#networking--connectivity-issues",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": RPC/WS connection refused (e.g., ",e.jsx(n.code,{children:"curl"})," to ",e.jsx(n.code,{children:"localhost:8545"})," fails).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Is the L2 client container (",e.jsx(n.code,{children:"op-geth"}),"/",e.jsx(n.code,{children:"op-reth"}),") running (",e.jsx(n.code,{children:"docker compose ps"}),")?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Are you using the correct port (",e.jsx(n.code,{children:"8545"})," for HTTP, ",e.jsx(n.code,{children:"8546"})," for WS by default)?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": L2 client logs. Did it fail to start the RPC server?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Are the ",e.jsx(n.code,{children:"--http.addr"})," and ",e.jsx(n.code,{children:"--ws.addr"})," flags set to ",e.jsx(n.code,{children:"0.0.0.0"})," in the client config/entrypoint to allow external connections (within the Docker network)?"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Node has low peer count.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": P2P port (default ",e.jsx(n.code,{children:"30303"}),") accessibility. Is it blocked by a firewall on the host or network?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Node logs for P2P errors."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action"}),": If behind NAT, configure the ",e.jsx(n.code,{children:"--nat=extip:<your-ip>"})," flag via ",e.jsx(n.code,{children:"ADDITIONAL_ARGS"})," in the ",e.jsx(n.code,{children:".env"})," file (see ",e.jsx(n.a,{href:"/chain/run-a-base-node#improving-peer-connectivity",children:"Advanced Configuration"}),")."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issue"}),": Port conflicts reported in logs or ",e.jsx(n.code,{children:"docker compose up"})," fails.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check"}),": Are other services running on the host using the default ports (",e.jsx(n.code,{children:"8545"}),", ",e.jsx(n.code,{children:"8546"}),", ",e.jsx(n.code,{children:"8551"}),", ",e.jsx(n.code,{children:"6060"}),", ",e.jsx(n.code,{children:"7545"}),", ",e.jsx(n.code,{children:"30303"}),")? Use ",e.jsx(n.code,{children:"sudo lsof -i -P -n | grep LISTEN"})," or ",e.jsx(n.code,{children:"sudo netstat -tulpn | grep LISTEN"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action"}),": Stop the conflicting service or change the ports used by the Base node containers by modifying the ",e.jsx(n.code,{children:"ports"})," section in ",e.jsx(n.code,{children:"docker-compose.yml"})," and updating the relevant environment variables (",e.jsx(n.code,{children:"$RPC_PORT"}),", ",e.jsx(n.code,{children:"$WS_PORT"}),", etc.) in the ",e.jsx(n.code,{children:".env"})," file if necessary."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"getting-further-help",children:["Getting Further Help",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getting-further-help",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"If you've followed this guide and are still encountering issues, seek help from the community:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Discord"}),": Join the ",e.jsx(n.a,{href:"https://discord.gg/buildonbase",children:"Base Discord"})," and post in the ",e.jsx(n.code,{children:"🛠｜node-operators"})," channel, providing details about your setup, the issue, and relevant logs."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"GitHub"}),": Check the ",e.jsx(n.a,{href:"https://github.com/base-org/node/issues",children:"Base Node repository issues"})," or open a new one if you suspect a bug."]}),`
`]})]})}function d(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{d as default,c as frontmatter};
