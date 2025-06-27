import{u as i,j as e}from"./index-Dlxm52NL.js";const d={title:"Node Snapshots",slug:"/node-snapshots",description:"Information for how to restore a Base node from a snapshot"};function r(n){const s={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"snapshots",children:["Snapshots",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#snapshots",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"Using a snapshot significantly reduces the initial time required to sync a Base node. Snapshots are updated regularly."}),`
`,e.jsx(s.aside,{"data-callout":"warning",children:e.jsx(s.p,{children:"Geth Archive Nodes are no longer supported via snapshots due to performance limitations. For Archive functionality, please use Reth."})}),`
`,e.jsx(s.p,{children:"If you're a prospective or current Base node operator, you can restore from a snapshot to speed up your initial sync. Follow the steps below carefully."}),`
`,e.jsxs(s.h3,{id:"restoring-from-snapshot",children:["Restoring from Snapshot",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#restoring-from-snapshot",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["These steps assume you are in the cloned ",e.jsx(s.code,{children:"node"})," directory (the one containing ",e.jsx(s.code,{children:"docker-compose.yml"}),")."]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Prepare Data Directory"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Before running Docker for the first time"}),", create the data directory on your host machine that will be mapped into the Docker container. This directory must match the ",e.jsx(s.code,{children:"volumes"})," mapping in the ",e.jsx(s.code,{children:"docker-compose.yml"})," file for the client you intend to use.",`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["For Geth: ",e.jsx(s.code,{children:"mkdir ./geth-data"})]}),`
`,e.jsxs(s.li,{children:["For Reth: ",e.jsx(s.code,{children:"mkdir ./reth-data"})]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:["If you have previously run the node and have an existing data directory, ",e.jsx(s.strong,{children:"stop the node"})," (",e.jsx(s.code,{children:"docker compose down"}),"), remove the ",e.jsx(s.em,{children:"contents"})," of the existing directory (e.g., ",e.jsx(s.code,{children:"rm -rf ./geth-data/*"}),"), and proceed."]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Download Snapshot"}),": Choose the appropriate snapshot for your network and client from the table below. Use ",e.jsx(s.code,{children:"wget"})," or a similar tool to download it into the ",e.jsx(s.code,{children:"node"})," directory."]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Network"}),e.jsx(s.th,{children:"Client"}),e.jsx(s.th,{children:"Snapshot Type"}),e.jsxs(s.th,{children:["Download Command (",e.jsx(s.code,{children:"wget ..."}),")"]})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Testnet"}),e.jsx(s.td,{children:"Geth"}),e.jsx(s.td,{children:"Full"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"https://sepolia-full-snapshots.base.org/$(curl https://sepolia-full-snapshots.base.org/latest)"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Testnet"}),e.jsx(s.td,{children:"Reth"}),e.jsx(s.td,{children:"Archive"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"https://sepolia-reth-archive-snapshots.base.org/$(curl https://sepolia-reth-archive-snapshots.base.org/latest)"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Mainnet"}),e.jsx(s.td,{children:"Geth"}),e.jsx(s.td,{children:"Full"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"https://mainnet-full-snapshots.base.org/$(curl https://mainnet-full-snapshots.base.org/latest)"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Mainnet"}),e.jsx(s.td,{children:"Reth"}),e.jsx(s.td,{children:"Archive"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"https://mainnet-reth-archive-snapshots.base.org/$(curl https://mainnet-reth-archive-snapshots.base.org/latest)"})})]})]})]}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsxs(s.p,{children:["Ensure you have enough free disk space to download the snapshot archive (",e.jsx(s.code,{children:".tar.gz"})," file) ",e.jsx(s.em,{children:"and"})," extract its contents. The extracted data will be significantly larger than the archive."]})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Extract Snapshot"}),": Untar the downloaded snapshot archive. Replace ",e.jsx(s.code,{children:"<snapshot-filename.tar.gz>"})," with the actual downloaded filename."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"tar"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -xzvf"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" <"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"snapshot-filename.tar.g"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"z"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:">"})]})})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Move Data"}),": The extraction process will likely create a directory (e.g., ",e.jsx(s.code,{children:"geth"})," or similar, check the output of the ",e.jsx(s.code,{children:"tar"})," command)."]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Move the ",e.jsx(s.em,{children:"contents"})," of this extracted directory into the data directory you created in Step 1.",`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Example (if archive extracted to a ",e.jsx(s.code,{children:"geth"})," folder):",`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# For Geth"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"mv"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" ./geth/"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"*"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" ./geth-data/"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"rm"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -rf"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" ./geth"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" # Clean up empty extracted folder"})]})]})})}),`
`]}),`
`,e.jsxs(s.li,{children:["Example (if archive extracted to a ",e.jsx(s.code,{children:"reth"})," folder - ",e.jsx(s.strong,{children:"verify actual folder name"}),"):",`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# For Reth"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"mv"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" ./reth/"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"*"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" ./reth-data/"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"rm"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -rf"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" ./reth"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" # Clean up empty extracted folder"})]})]})})}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:["The goal is to have the chain data (directories like ",e.jsx(s.code,{children:"chaindata"}),", ",e.jsx(s.code,{children:"nodes"}),", ",e.jsx(s.code,{children:"segments"}),", etc.) directly inside ",e.jsx(s.code,{children:"./geth-data"})," or ",e.jsx(s.code,{children:"./reth-data"}),", not within an extra subfolder."]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Start the Node"}),": Now that the snapshot data is in place, start the node using the appropriate command (see the ",e.jsx(s.a,{href:"/chain/run-a-base-node#setting-up-and-running-the-node",children:"Running a Base Node"})," guide):"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Example for Mainnet Geth"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"docker"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" compose"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" up"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --build"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"})]})]})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Verify and Clean Up"}),": Monitor the node logs (",e.jsx(s.code,{children:"docker compose logs -f <service_name>"}),") or use the ",e.jsx(s.a,{href:"/chain/run-a-base-node#monitoring-sync-progress",children:"sync monitoring"})," command to ensure the node starts syncing from the snapshot's block height. Once confirmed, you can safely delete the downloaded snapshot archive (",e.jsx(s.code,{children:".tar.gz"})," file) to free up disk space."]}),`
`]}),`
`]})]})}function h(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{h as default,d as frontmatter};
