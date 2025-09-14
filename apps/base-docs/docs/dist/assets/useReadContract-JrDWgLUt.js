import{u as r,j as s}from"./index-Dlxm52NL.js";const a={title:"The `useReadContract` Hook",description:"Learn how to call view and pure functions from a smart contract.",hide_table_of_contents:!1};function n(i){const e={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...i.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"the-usereadcontract-hook",children:["The ",s.jsx(e.code,{children:"useReadContract"})," Hook",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-usereadcontract-hook",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(e.p,{children:["The ",s.jsx(e.code,{children:"useReadContract"})," hook is ",s.jsx(e.a,{href:"https://wagmi.sh/",children:"wagmi"}),"'s method of calling ",s.jsx(e.code,{children:"pure"})," and ",s.jsx(e.code,{children:"view"})," functions from your smart contracts. As with ",s.jsx(e.code,{children:"useAccount"}),", ",s.jsx(e.code,{children:"useReadContract"})," contains a number of helpful properties to enable you to manage displaying information to your users."]}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"objectives",children:["Objectives",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"By the end of this guide you should be able to:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["Implement wagmi's ",s.jsx(e.code,{children:"useReadContract"})," hook to fetch data from a smart contract"]}),`
`,s.jsx(e.li,{children:"Convert data fetched from a smart contract to information displayed to the user"}),`
`,s.jsx(e.li,{children:"Identify the caveats of reading data from automatically-generated getters"}),`
`]}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"contract-setup",children:["Contract Setup",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#contract-setup",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["For this guide, you'll be continuing from the project you started for the ",s.jsxs(e.a,{href:"./useAccount",children:[s.jsx(e.code,{children:"useAccount"})," hook"]}),". You'll work with an upgrade to the contract that you may have created if you completed the ",s.jsx(e.a,{href:"https://docs.base.org/base-learn/docs/erc-20-token/erc-20-exercise",children:"ERC 20 Tokens Exercise"}),". See below for an example you can use if you don't already have your own!"]}),`
`,s.jsxs(e.p,{children:["The contract creates a very simple DAO, in which users can create issues and vote for them, against them, or abstain. Anyone can ",s.jsx(e.code,{children:"claim"})," 100 tokens. This is an insecure system for demonstration purposes, since it would be trivial to claim a large number of tokens with multiple wallets, then transfer them to a single address and use that to dominate voting."]}),`
`,s.jsx(e.p,{children:"But it makes it much easier to test!"}),`
`,s.jsxs(e.div,{children:[s.jsxs(e.p,{children:["If you're using your own contract, please redeploy it with the following ",s.jsx(e.code,{children:"view"})," functions:"]}),s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" numberOfIssues"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" view"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" returns"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    return"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issues.length;"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" getAllIssues"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" view"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" returns"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"ReturnableIssue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[] "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"memory"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    ReturnableIssue[] "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"memory"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" allIssues "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" new"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ReturnableIssue[](issues.length);"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    for"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" i "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" 0"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"; i "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"<"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issues.length; i"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"++"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        allIssues[i] "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" getIssue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(i);"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    return"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" allIssues;"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),s.jsxs(e.strong,{children:["You also need to make the ",s.jsx(e.code,{children:"getIssue"})," function ",s.jsx(e.code,{children:"public"}),". The original spec called for it to be ",s.jsx(e.code,{children:"external"}),"."]})]}),`
`,s.jsxs(e.h3,{id:"create-demo-issues",children:["Create Demo Issues",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#create-demo-issues",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["To start, you'll need to put some data into your contract so that you can read it from your frontend. Open ",s.jsx(e.a,{href:"https://sepolia.basescan.org/",children:"Sepolia BaseScan"}),", find your contract, connect with your wallet, and call the ",s.jsx(e.code,{children:"claim"})," function."]}),`
`,s.jsx(e.p,{children:"Add the following two issues:"}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{children:"_issueDesc: We should enable light mode by default."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{children:"_quorum: 2"})})]})})}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{children:"_issueDesc: We should make inverted mouse controls the default selection."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{children:"_quorum: 2"})})]})})}),`
`,s.jsxs(e.p,{children:["Switch to a ",s.jsx(e.strong,{children:"different wallet address"}),". Claim your tokens with the new address, and add one more issue:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{children:"_issueDesc: Two spaces, not four, not tabs!"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{children:"_quorum: 2"})})]})})}),`
`,s.jsxs(e.p,{children:["Call the ",s.jsx(e.code,{children:"getAllIssues"})," function under the ",s.jsx(e.code,{children:"Read Contract"})," tab to make sure all three are there."]}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"reading-from-your-smart-contract",children:["Reading from your Smart Contract",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reading-from-your-smart-contract",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["To be able to read from your deployed smart contract, you'll need two pieces of information: the address and ",s.jsx(e.a,{href:"https://docs.soliditylang.org/en/latest/abi-spec.html",children:"ABI"}),". These are used as parameters in the ",s.jsx(e.code,{children:"useReadContract"})," hook."]}),`
`,s.jsxs(e.p,{children:["If you're using ",s.jsx(e.a,{href:"https://hardhat.org/",children:"Hardhat"}),", both of these can be conveniently found in a json file in the ",s.jsx(e.code,{children:"deployments/<network>"})," folder, named after your contract. For example, our contract is called ",s.jsx(e.code,{children:"FEWeightedVoting"}),", so the file is ",s.jsx(e.code,{children:"deployments/base-sepolia/FEWeightedVoting.json"}),"."]}),`
`,s.jsxs(e.p,{children:["If you're using something else, it should produce a similar artifact, or separate artifacts with the ",s.jsx(e.a,{href:"https://docs.soliditylang.org/en/latest/abi-spec.html",children:"ABI"})," and address. If this is the case, make the adjustments you need when you import this data."]}),`
`,s.jsxs(e.p,{children:["Either way, add a folder called ",s.jsx(e.code,{children:"deployments"})," and place a copy of the artifact file(s) inside."]}),`
`,s.jsxs(e.h3,{id:"using-the-usereadcontract-hook",children:["Using the ",s.jsx(e.code,{children:"useReadContract"})," Hook",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-the-usereadcontract-hook",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Add a file for a new component called ",s.jsx(e.code,{children:"IssueList.tsx"}),". You can start with:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { useReadContract } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'wagmi'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" IssueList"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  return"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"h2"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">All Issues</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"h2"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"/* TODO: List each issue */"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    </"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  );"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsxs(e.p,{children:["You'll need to do some prepwork to enable Typescript to more easily interpret the data returned from your contract. Add an ",s.jsx(e.code,{children:"interface"})," called ",s.jsx(e.code,{children:"Issue"})," that matches with the ",s.jsx(e.code,{children:"ReturnableIssue"})," type:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"interface"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" Issue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  voters"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[];"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  issueDesc"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  votesFor"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" bigint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  votesAgainst"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" bigint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  votesAbstain"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" bigint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  totalVotes"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" bigint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  quorum"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" bigint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  passed"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" boolean"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  closed"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" boolean"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsx(e.aside,{"data-callout":"warning",children:s.jsxs(e.p,{children:["Be very careful here! ",s.jsx(e.code,{children:"bigint"})," is the name of the type, ",s.jsx(e.code,{children:"BigInt"})," is the name of the constructor for that type. If you incorrectly use the constructor as the type, much of your code will still work, but other parts will express very confusing bugs."]})}),`
`,s.jsxs(e.p,{children:["Now, import ",s.jsx(e.code,{children:"useState"})," and add a state variable to hold your list of ",s.jsx(e.code,{children:"Issue"}),"s."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ["}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"issues"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"setIssues"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"] "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" useState"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"<"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"Issue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[]>([]);"})]})})})}),`
`,s.jsx(e.p,{children:"You'll also need to import your contract artifact:"}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" contractData "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '../deployments/FEWeightedVoting.json'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]})})})}),`
`,s.jsxs(e.p,{children:["Finally, the moment you've been waiting for: Time to read from your contract! Add an instance of the ",s.jsx(e.a,{href:"https://wagmi.sh/react/hooks/useReadContract",children:s.jsx(e.code,{children:"useReadContract"})})," hook. It works similarly to the ",s.jsx(e.a,{href:"https://wagmi.sh/react/hooks/useAccount",children:s.jsx(e.code,{children:"useAccount"})})," hook. Configure it with:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  data"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"issuesData"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  isError"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"issuesIsError"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  isPending"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"issuesIsPending"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"} "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" useReadContract"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  address: contractData.address "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"as"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" `0x${"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"}`"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  abi: contractData.abi,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  functionName: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'getAllIssues'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})})]})})}),`
`,s.jsxs(e.p,{children:["You can use ",s.jsx(e.code,{children:"useEffect"})," to do something when the call completes and the data. For now, just log it to the console:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"useEffect"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(() "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"=>"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  if"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" (issuesData) {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" issuesList"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issuesData "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"as"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" Issue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[];"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'issuesList'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", issuesList);"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"    setIssues"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(issuesList);"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}, [issuesData]);"})})]})})}),`
`,s.jsxs(e.p,{children:["Add in instance of your new component to ",s.jsx(e.code,{children:"index.tsx"}),":"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"<"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"main"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" className"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{styles.main}>"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  <"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"ConnectButton"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" />"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  <"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"ConnectionWindow"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" />"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  <"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"IssueList"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" />"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"main"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]})]})})}),`
`,s.jsx(e.p,{children:"Run your app, and you should see your list of issues fetched from the blockchain and displayed in the console!"}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/learn/reading-and-displaying-data/issues-console-log.png",alt:"Issues Console Log"})}),`
`,s.jsx(e.p,{children:"Breaking down the hook, you've:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["Renamed the properties decomposed from ",s.jsx(e.code,{children:"useReadContract"})," to be specific for our function. Doing so is helpful if you're going to read from more than one function in a file"]}),`
`,s.jsx(e.li,{children:"Configured the hook with the address and ABI for your contract"}),`
`,s.jsxs(e.li,{children:["Made use of ",s.jsx(e.code,{children:"useEffect"})," to wait for the data to be returned from the blockchain, log it to the console, and set the list of ",s.jsx(e.code,{children:"Issue"}),"s in state."]}),`
`]}),`
`,s.jsxs(e.h3,{id:"displaying-the-data",children:["Displaying the Data",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#displaying-the-data",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Now that you've got the data in state, you can display it via your component. One strategy to display a list of items is to compile a ",s.jsx(e.code,{children:"ReactNode"})," array in a render function."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" renderIssues"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  return"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issues."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"map"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(("}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"issue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"=>"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" key"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{issue.issueDesc}>"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"h3"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{issue.issueDesc}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"h3"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Voters: '"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" +"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issue.voters."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"toString"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"()}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Votes For: '"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" +"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issue.votesFor."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"toString"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"()}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Votes Against: '"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" +"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issue.votesAgainst."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"toString"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"()}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Votes Abstain: '"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" +"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issue.votesAbstain."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"toString"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"()}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Quorum: '"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" +"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issue.quorum."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"toString"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"()}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Passed: '"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" +"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issue.passed}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Closed: '"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" +"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issue.closed}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"p"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    </"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  ));"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsx(e.p,{children:"Then, call the render function in the return for your component:"}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"return"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"h2"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">All Issues</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"h2"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    <"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">{"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"renderIssues"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"()}</"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  </"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"div"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:");"})})]})})}),`
`,s.jsx(e.p,{children:"You'll now see your list of issues rendered in the browser! Congrats, you've finally made a meaningful connection between your smart contract and your frontend!"}),`
`,s.jsxs(e.h3,{id:"a-caveat-with-automatic-getters",children:["A Caveat with Automatic Getters",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#a-caveat-with-automatic-getters",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Remember how the Solidity compiler creates automatic getters for all of your public state variables? This feature is very helpful, but it can create bewildering results when you use it for ",s.jsx(e.code,{children:"struct"}),"s that contain ",s.jsx(e.code,{children:"mapping"}),"s. Remember, nesting mappings ",s.jsx(e.strong,{children:"cannot"})," be returned outside the blockchain. The ",s.jsx(e.code,{children:"enumerableSet"})," protects you from this problem, because it has private variables inside it, which prevents setting ",s.jsx(e.code,{children:"issues"})," as ",s.jsx(e.code,{children:"public"}),". Had we instead used a mapping, we'd lose this protection:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // Code for demo only"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  struct"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" Issue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"      mapping"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"address"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" =>"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" bool"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") voters;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      string"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" issueDesc;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      uint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" votesFor;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      uint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" votesAgainst;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      uint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" votesAbstain;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      uint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" totalVotes;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      uint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" quorum;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      bool"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" passed;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"      bool"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" closed;"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }"})})]})})}),`
`,s.jsxs(e.p,{children:["Redeploy with the above change, and add a second ",s.jsx(e.code,{children:"useReadContract"})," to fetch an individual issue using the getter:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Bad code for example, do not use"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  data"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"getOneData"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  isError"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"getOneIsError"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  isPending"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"getOneIsPending"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"} "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" useReadContract"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  address: contractData.address "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"as"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" `0x${"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"}`"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  abi: contractData.abi,"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  functionName: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'issues'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  args: ["}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"1"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"],"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"useEffect"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(() "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"=>"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  if"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" (getOneData) {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'getOneData'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", getOneData);"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" issueOne"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" getOneData "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"as"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" Issue"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    console."}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"log"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Issue One'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", issueOne);"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}, [getOneData]);"})})]})})}),`
`,s.jsxs(e.p,{children:["Everything appears to be working just fine, but how is ",s.jsx(e.code,{children:"issueOne.desc"})," undefined? You can see it right there in the log!"]}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/learn/reading-and-displaying-data/missing-data.png",alt:"Missing Data"})}),`
`,s.jsxs(e.p,{children:["If you look closely, you'll see that ",s.jsx(e.code,{children:"voters"})," is missing from the data in the logs. What's happening is that because the nested ",s.jsx(e.code,{children:"mapping"})," cannot be returned outside the blockchain, it simply isn't. TypeScript then gets the ",s.jsx(e.code,{children:"data"})," and does the best it can to cast it ",s.jsx(e.code,{children:"as"})," an ",s.jsx(e.code,{children:"Issue"}),". Since ",s.jsx(e.code,{children:"voters"})," is missing, this will fail and it instead does the JavaScript trick of simply tacking on the extra properties onto the object."]}),`
`,s.jsxs(e.p,{children:["Take a look at the working example above where you retrieved the list. Notice that the keys in your ",s.jsx(e.code,{children:"Issue"})," type are in that log, but are missing here. The assignment has failed, and all of the ",s.jsx(e.code,{children:"Issue"})," properties are ",s.jsx(e.code,{children:"null"}),"."]}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"conclusion",children:["Conclusion",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["In this guide, you've learned how to use the ",s.jsx(e.code,{children:"useReadContract"})," hook to call ",s.jsx(e.code,{children:"pure"})," and ",s.jsx(e.code,{children:"view"})," functions from your smart contracts. You then converted this data into React state and displayed it to the user. Finally, you explored a tricky edge case in which the presence of a nested ",s.jsx(e.code,{children:"mapping"})," can cause a confusing bug when using the automatically-generated getter."]}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"simple-dao-contract-example",children:["Simple DAO Contract Example",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#simple-dao-contract-example",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Use this contract if you don't have your own from the ",s.jsx(e.a,{href:"https://docs.base.org/base-learn/docs/erc-20-token/erc-20-exercise",children:"ERC 20 Tokens Exercise"}),". You can also use this if you want to cheat to get that badge. Doing so would be silly though!"]}),`
`,s.jsxs(e.div,{children:[s.jsxs(e.p,{children:["If you use your own contract, redeploy it with the ",s.jsx(e.code,{children:"numberOfIssues"})," and ",s.jsx(e.code,{children:"getAllIssues"})," functions from the bottom of the contract below. We'll need this for our first pass solution for getting all the ",s.jsx(e.code,{children:"Issues"})," in the contract."]}),s.jsxs(e.strong,{children:["You also need to make the ",s.jsx(e.code,{children:"getIssue"})," function ",s.jsx(e.code,{children:"public"}),". The original spec called for it to be ",s.jsx(e.code,{children:"external"}),"."]})]}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-Solidity",children:`// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract FEWeightedVoting is ERC20 {
    using EnumerableSet for EnumerableSet.AddressSet;

    mapping(address => bool) claimed;
    uint public maxSupply = 1000000;
    uint totalClaimed;

    uint constant claimAmount = 100;

    error TokensClaimed();
    error AllTokensClaimed();
    error NoTokensHeld();
    error QuorumTooHigh(uint);
    error AlreadyVoted();
    error VotingClosed();

    enum Vote {
        AGAINST,
        FOR,
        ABSTAIN
    }

    struct Issue {
        EnumerableSet.AddressSet voters;
        string issueDesc;
        uint votesFor;
        uint votesAgainst;
        uint votesAbstain;
        uint totalVotes;
        uint quorum;
        bool passed;
        bool closed;
    }

    // EnumerableSets are mappings and cannot be returned outside a contract
    struct ReturnableIssue {
        address[] voters;
        string issueDesc;
        uint votesFor;
        uint votesAgainst;
        uint votesAbstain;
        uint totalVotes;
        uint quorum;
        bool passed;
        bool closed;
    }

    Issue[] issues;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        // Burn Issue 0
        issues.push();
    }

    function claim() public {
        if (claimed[msg.sender] == true) {
            revert TokensClaimed();
        }

        if (totalSupply() >= maxSupply) {
            revert AllTokensClaimed();
        }

        _mint(msg.sender, claimAmount);
        claimed[msg.sender] = true;
    }

    function createIssue(
        string memory _issueDesc,
        uint _quorum
    ) public returns (uint) {
        if (balanceOf(msg.sender) == 0) {
            revert NoTokensHeld();
        }

        if (_quorum > totalSupply()) {
            revert QuorumTooHigh(_quorum);
        }

        Issue storage newIssue = issues.push();
        newIssue.issueDesc = _issueDesc;
        newIssue.quorum = _quorum;
        return issues.length - 1;
    }

    function getIssue(uint _id) public view returns (ReturnableIssue memory) {
        Issue storage issue = issues[_id];
        return
            ReturnableIssue(
                issue.voters.values(),
                issue.issueDesc,
                issue.votesFor,
                issue.votesAgainst,
                issue.votesAbstain,
                issue.totalVotes,
                issue.quorum,
                issue.closed,
                issue.passed
            );
    }

    function vote(uint _issueId, Vote _vote) public {
        Issue storage issue = issues[_issueId];
        if (issue.voters.contains(msg.sender)) {
            revert AlreadyVoted();
        }
        if (issue.closed) {
            revert VotingClosed();
        }
        issue.voters.add(msg.sender);

        if (_vote == Vote.FOR) {
            issue.votesFor += balanceOf(msg.sender);
        } else if (_vote == Vote.AGAINST) {
            issue.votesAgainst += balanceOf(msg.sender);
        } else if (_vote == Vote.ABSTAIN) {
            issue.votesAbstain += balanceOf(msg.sender);
        } else {
            revert("Error...");
        }

        issue.totalVotes += balanceOf(msg.sender);

        if (issue.totalVotes >= issue.quorum) {
            issue.closed = true;
            if (issue.votesFor > issue.votesAgainst) {
                issue.passed = true;
            }
        }
    }

    function numberOfIssues() public view returns(uint) {
        return issues.length;
    }

    function getAllIssues() public view returns(ReturnableIssue[] memory) {
        ReturnableIssue[] memory allIssues = new ReturnableIssue[](issues.length);

        for(uint i = 0; i < issues.length; i++) {
            allIssues[i] = getIssue(i);
        }

        return allIssues;
    }
}
`})}),`
`,s.jsx(e.hr,{})]})}function o(i={}){const{wrapper:e}={...r(),...i.components};return e?s.jsx(e,{...i,children:s.jsx(n,{...i})}):n(i)}export{o as default,a as frontmatter};
