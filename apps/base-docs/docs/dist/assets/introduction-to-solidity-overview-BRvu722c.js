import{u as r,j as e}from"./index-Dlxm52NL.js";const a={title:"Overview",description:"An overview of this module.",hide_table_of_contents:!1};function t(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"The course you are about to begin is designed to rapidly and thoroughly teach web3 concepts and language to web2 developers. It specifically highlights similarities and differences found in web3 vs. web2 and contains background information, guided coding practices, and independent exercises."}),`
`,e.jsxs(n.p,{children:["This program is ",e.jsx(n.strong,{children:"not"})," suitable for people who are new to programming in general. While the explanations are thorough, they often rely on an expectation that you are familiar with the underlying concepts. We will not teach you what arrays are and how they are used, but we will show you how they work in this environment."]}),`
`,e.jsxs(n.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Before these lessons, you should:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Have several years of experience as a programmer in an object-oriented language"}),`
`,e.jsx(n.li,{children:"Be familiar with the uses and properties of the Ethereum blockchain and the EVM"}),`
`,e.jsxs(n.li,{children:["Ideally, be familiar with at least one ",e.jsx(n.a,{href:"https://en.wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages",children:"curly-bracket"})," programming language"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this module, you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Introduction to Solidity"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Describe why languages like Solidity are used to write smart contracts"}),`
`,e.jsx(n.li,{children:"Relate an overview of the history (and pace of change) of Solidity and its strengths and weaknesses"}),`
`,e.jsx(n.li,{children:"Deploy and test the Storage.sol demo contract in Remix"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Contracts and Basic Functions"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Construct a simple ""Hello World"" contract'}),`
`,e.jsx(n.li,{children:"Categorize basic data types"}),`
`,e.jsx(n.li,{children:"List the major differences between data types in Solidity as compared to other languages"}),`
`,e.jsx(n.li,{children:"Compare and contrast signed and unsigned integers"}),`
`,e.jsx(n.li,{children:"Write a pure function that accepts argument and returns a value"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Deploying Smart Contracts to a Testnet"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Describe the uses and properties of the Ethereum testnet"}),`
`,e.jsx(n.li,{children:"Compare and contrast Ropsten, Rinkeby, Goerli, and Sepolia"}),`
`,e.jsx(n.li,{children:"Deploy a contract to the Sepolia testnet and interact with it in Etherscan"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Control Structures"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Control code flow with if, else, while, and for"}),`
`,e.jsx(n.li,{children:"List the unique constraints for control flow in Solidity"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Storage in Solidity"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Diagram how a contract's data is stored on the blockchain (Contract -> Blockchain)"}),`
`,e.jsx(n.li,{children:"Order variable declarations to use storage efficiently"}),`
`,e.jsx(n.li,{children:"Diagram how variables in a contract are stored (Variable -> Contract)"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Arrays in Solidity"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Construct then store and retrieve values in storage and memory arrays"}),`
`,e.jsx(n.li,{children:"Describe the difference between storage and memory arrays"}),`
`,e.jsx(n.li,{children:"Diagram how arrays are stored"}),`
`,e.jsx(n.li,{children:"Write a function that can return a filtered subset of an array"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"The Mapping Type"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Construct a Map (dictionary) data type"}),`
`,e.jsx(n.li,{children:"Diagram the storage of the Mapping data type"}),`
`,e.jsx(n.li,{children:"Recall that assignment of the Map data type is not as flexible as for other data types/in other languages"}),`
`,e.jsxs(n.li,{children:["Restrict function calls with the ",e.jsx(n.code,{children:"msg.sender"})," global variable"]}),`
`,e.jsx(n.li,{children:"Recall that there is no collision protection in the EVM and why this (probably) ok"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Advanced Functions"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Describe how pure and view functions are different than functions that modify storage"}),`
`,e.jsx(n.li,{children:"Categorize functions as public, private, internal, or external based on their usage"}),`
`,e.jsx(n.li,{children:"Use modifiers to efficiently add functionality to multiple functions"}),`
`,e.jsx(n.li,{children:"Utilize require to write a function that can only be used when a variable is set to 'True'"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Structs"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Construct a struct (user-defined type) that contains several different data types"}),`
`,e.jsx(n.li,{children:"Declare members of the struct to maximize storage efficiency"}),`
`,e.jsx(n.li,{children:"Describe constraints related to assignment of structs depending on the types they contain"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Inheritance"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Write a smart contract that inherits from another contract"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Imports"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Import and use code from another file"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"Errors"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Debug common solidity errors including execution reverted, out of gas, stack overflow, value overflow/underflow, index out of range, and so on"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.strong,{children:"New Keyword"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Write a contract that creates a new contract with the new keyword"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.hr,{})]})}function l(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{l as default,a as frontmatter};
