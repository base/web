import{u as s,j as e}from"./index-Dlxm52NL.js";const o={title:"Overview",description:"An overview of this course.",hide_table_of_contents:!1};function i(t){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"Welcome! The course you are about to begin will rapidly introduce you to frontend web development for onchain apps and enable you to write websites that can call your smart contract functions in a similar way to how traditional sites interact with APIs."}),`
`,e.jsxs(n.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Before these lessons, you should:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Be comfortable with traditional frontend development using React, ideally with NextJS"}),`
`,e.jsx(n.li,{children:"Possess a general understanding of the EVM and smart contracts"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this course, you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Frontend Setup"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Identify the role of a wallet aggregator in an onchain app"}),`
`,e.jsx(n.li,{children:"Debate the pros and cons of using a template"}),`
`,e.jsx(n.li,{children:"Scaffold a new onchain app with RainbowKit"}),`
`,e.jsx(n.li,{children:"Add a wallet connection to a standard template app"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Connecting to the Blockchain"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Compare and contrast public providers vs. vendor providers vs. wallet providers"}),`
`,e.jsx(n.li,{children:"Select the appropriate provider for several use cases"}),`
`,e.jsx(n.li,{children:"Set up a provider in wagmi and use it to connect a wallet"}),`
`,e.jsx(n.li,{children:"Protect API keys that will be exposed to the front end"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Reading and Displaying Data"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Implement the ",e.jsx(n.code,{children:"useAccount"})," hook to show the user's address, connection state, network, and balance"]}),`
`,e.jsxs(n.li,{children:["Implement an ",e.jsx(n.code,{children:"isMounted"})," hook to prevent hydration errors"]}),`
`,e.jsxs(n.li,{children:["Implement wagmi's ",e.jsx(n.code,{children:"useReadContract"})," hook to fetch data from a smart contract"]}),`
`,e.jsx(n.li,{children:"Convert data fetched from a smart contract to information displayed to the user"}),`
`,e.jsx(n.li,{children:"Identify the caveats of reading data from automatically-generated getters"}),`
`,e.jsxs(n.li,{children:["Enable the ",e.jsx(n.code,{children:"watch"})," feature of ",e.jsx(n.code,{children:"useReadContract"})," to automatically fetch updates from the blockchain"]}),`
`,e.jsxs(n.li,{children:["Describe the costs of using the ",e.jsx(n.code,{children:"watch"})," feature, and methods to reduce those costs"]}),`
`,e.jsxs(n.li,{children:["Configure arguments to be passed with a call to a ",e.jsx(n.code,{children:"pure"})," or ",e.jsx(n.code,{children:"view"})," smart contract function"]}),`
`,e.jsxs(n.li,{children:["Call an instance of ",e.jsx(n.code,{children:"useReadContract"})," on demand"]}),`
`,e.jsxs(n.li,{children:["Utilize ",e.jsx(n.code,{children:"isLoading"})," and ",e.jsx(n.code,{children:"isFetching"})," to improve user experience"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Writing to Contracts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Implement wagmi's ",e.jsx(n.code,{children:"useWriteContract"})," hook to send transactions to a smart contract"]}),`
`,e.jsxs(n.li,{children:["Configure the options in ",e.jsx(n.code,{children:"useWriteContract"})]}),`
`,e.jsx(n.li,{children:"Display the execution, success, or failure of a function with button state changes, and data display"}),`
`,e.jsxs(n.li,{children:["Implement Wagmi's ",e.jsx(n.code,{children:"usePrepareContractWrite"})," and ",e.jsx(n.code,{children:"useWriteContract"})," to send transactions to a smart contract"]}),`
`,e.jsxs(n.li,{children:["Configure the options in ",e.jsx(n.code,{children:"useSimulateContract"})," and ",e.jsx(n.code,{children:"useWriteContract"})]}),`
`,e.jsxs(n.li,{children:["Call a smart contract function on-demand using the write function from ",e.jsx(n.code,{children:"useWriteContract"}),", with arguments and a value"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.hr,{})]})}function a(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,o as frontmatter};
