import{u as n,j as e}from"./index-Dlxm52NL.js";const s={title:"Overview",slug:"/hardhat-tools-and-testing/overview",description:"What's in this learning material.",author:"Brian Doyle",keywords:["Hardhat Tools","Smart Contract Development","Gas Optimization","Debugging","Test Coverage","Contract Size","Solidity","Base network","Base blockchain","blockchain development"],hide_table_of_contents:!1,displayed_sidebar:null};function r(t){const i={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"overview-of-hardhat-tools-and-testing",children:["Overview of Hardhat Tools and Testing",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview-of-hardhat-tools-and-testing",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(i.p,{children:["This series of guides shows you how to use a number of ",e.jsx(i.a,{href:"https://hardhat.org/hardhat-runner/plugins",children:"Hardhat plugins"})," that will help you more effectively build and test your smart contracts."]}),`
`,e.jsx(i.p,{children:"Learn how to keep your contracts under the 24 kiB limit, improve gas costs for your users, make sure your unit tests fully cover your code, and practice debugging."}),`
`,e.jsx(i.hr,{}),`
`,e.jsxs(i.h2,{id:"objectives",children:["Objectives",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"By the end of these guides, you should be able to:"}),`
`,e.jsxs(i.h3,{id:"profiling-size",children:["Profiling Size",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#profiling-size",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Use Hardhat Contract Sizer plugin to profile contract size"}),`
`,e.jsx(i.li,{children:"Describe common strategies for managing the contract size limit"}),`
`,e.jsx(i.li,{children:"Describe the impact that inheritance has on the byte code size limit"}),`
`,e.jsx(i.li,{children:"Describe the impact that external contracts have on the byte code size limit"}),`
`,e.jsx(i.li,{children:"Describe the impact of using libraries has on the byte code size limit"}),`
`,e.jsx(i.li,{children:"Describe the impact of using the Solidity optimizer"}),`
`]}),`
`,e.jsxs(i.h3,{id:"profiling-gas",children:["Profiling Gas",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#profiling-gas",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Use the Hardhat Gas Reporter plugin to profile gas usage"}),`
`,e.jsx(i.li,{children:"Describe common strategies for improving the gas usage of a contract"}),`
`]}),`
`,e.jsxs(i.h3,{id:"debugging",children:["Debugging",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#debugging",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Use ",e.jsx(i.code,{children:"console.log"})," to write debugging logs"]}),`
`,e.jsx(i.li,{children:"List common errors and their resolutions"}),`
`,e.jsx(i.li,{children:"Determine if an error is a contract error or an error in the test"}),`
`]}),`
`,e.jsxs(i.h3,{id:"test-coverage",children:["Test Coverage",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#test-coverage",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Use the Solidity Coverage plugin to analyze the coverage of your test suite"}),`
`,e.jsx(i.li,{children:"Increase the coverage of your test suite"}),`
`]}),`
`,e.jsx(i.hr,{}),`
`,e.jsxs(i.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"1-basic-understanding-of-writing-smart-contracts",children:["1. Basic understanding of writing smart contracts",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-basic-understanding-of-writing-smart-contracts",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["These guides assume that you're reasonably comfortable writing basic smart contracts. If you're just getting started, jump over to our ",e.jsx(i.a,{href:"https://base.org/learn",children:"Base Learn"})," guides and start learning!"]}),`
`,e.jsxs(i.h3,{id:"2-familiarity-with-hardhat",children:["2. Familiarity with Hardhat",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-familiarity-with-hardhat",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["We also assume that you've got Hardhat up and running, and can write unit tests for your smart contracts. If you're not there yet, but already know Solidity, you can ",e.jsx(i.a,{href:"https://docs.base.org/base-learn/docs/hardhat-setup-overview/hardhat-setup-overview-sbs",children:"setup Hardhat here"}),"."]})]})}function o(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{o as default,s as frontmatter};
