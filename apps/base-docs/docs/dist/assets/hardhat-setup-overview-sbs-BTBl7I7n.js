import{u as a,j as s}from"./index-Dlxm52NL.js";const l={title:"Setup and Overview",description:"An overview of hardhat, a smart contract development framework",hide_table_of_contents:!1};function i(n){const e={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"setup-and-overview",children:["Setup and Overview",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup-and-overview",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsx(e.p,{children:"In this article, you'll learn about Hardhat: a development framework to create, test, and deploy smart contracts to Ethereum and other supported EVM chains."}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"objectives",children:["Objectives",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"By the end of this lesson, you should be able to:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Install and create a new Hardhat project with Typescript support"}),`
`,s.jsx(e.li,{children:"Describe the organization and folder structure of a Hardhat project"}),`
`,s.jsx(e.li,{children:"List the use and properties of hardhat.config.ts"}),`
`]}),`
`,s.jsx(e.hr,{}),`
`,s.jsxs(e.h2,{id:"overview",children:["Overview",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:[s.jsx(e.a,{href:"https://hardhat.org/",children:"Hardhat"})," is a development environment that allows you to develop and test Solidity on your local machine. It includes debugging and unit testing tools, and has an ecosystem of third-party-developed plugins that ease development and deployment."]}),`
`,s.jsx(e.p,{children:"Among other things, these plugins can help you deploy contracts, see the size of your compiled byte-code, and even see unit test coverage."}),`
`,s.jsxs(e.h2,{id:"installing-hardhat-and-creating-a-new-project",children:["Installing Hardhat and creating a new project",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installing-hardhat-and-creating-a-new-project",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"As a pre-requisite to start developing smart contracts with Hardhat, Node.js must be installed."}),`
`,s.jsxs(e.p,{children:["You can then simply type ",s.jsx(e.code,{children:"npx hardhat init"}),", which provides a set of options to bootstrap a Hardhat project:"]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"888    888                      888 888               888"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"888    888                      888 888               888"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"888    888                      888 888               888"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:'888    888     "88b 888P"  d88" 888 888 "88b     "88b 888'})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"888    888 .d888888 888    888  888 888  888 .d888888 888"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"888    888 888  888 888    Y88b 888 888  888 888  888 Y88b."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:'888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888'})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"👷 Welcome to Hardhat v2.11.2 👷‍"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"? What do you want to do? …"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"❯ Create a JavaScript project"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  Create a TypeScript project"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  Create an empty hardhat.config.js"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  Quit"})})]})})}),`
`,s.jsxs(e.p,{children:["You are encouraged to select ",s.jsx(e.strong,{children:"Create a TypeScript project"}),", since it provides you with some benefits such as static typing that can reduce the number of errors during development."]}),`
`,s.jsxs(e.p,{children:["You can then enter 'yes' for the remaining options, which include installing the ",s.jsx(e.code,{children:"@nomicfoundation/hardhat-toolbox"})," package that contains some of the most used Hardhat plugins."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"✔ What do you want to do? · Create a TypeScript project"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"✔ Hardhat project root: · {any location}"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"✔ Do you want to add a .gitignore? (Y/n) · y"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"✔ Do you want to install this sample project's dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) · y"})})]})})}),`
`,s.jsxs(e.h3,{id:"anatomy-of-a-hardhat-project",children:["Anatomy of a Hardhat project",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#anatomy-of-a-hardhat-project",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"After you complete the previous step, the folder structure looks like the following:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"contracts # contracts will go here"}),`
`,s.jsx(e.li,{children:"hardhat.config.ts # configuration file for hardhat"}),`
`,s.jsx(e.li,{children:"node_modules # node.js package folder"}),`
`,s.jsx(e.li,{children:"package-lock.json # node.js package lock file"}),`
`,s.jsx(e.li,{children:"package.json # node.js package file"}),`
`,s.jsx(e.li,{children:"scripts # place the scripts here"}),`
`,s.jsx(e.li,{children:"test # place the tests here"}),`
`,s.jsx(e.li,{children:"tsconfig.json # typescript configuration file"}),`
`]}),`
`,s.jsxs(e.p,{children:["It is also common to save hardhat tasks in a ",s.jsx(e.code,{children:"task"})," folder."]}),`
`,s.jsxs(e.p,{children:["It is important to mention that all these paths are fully configurable in the ",s.jsx(e.code,{children:"hardhat.config.ts"})," file. You can specify a different folder for the contracts, such as ",s.jsx(e.code,{children:"src"}),"."]}),`
`,s.jsxs(e.h3,{id:"configuration",children:["Configuration",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configuration",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["You can configure the Hardhat environment in the ",s.jsx(e.code,{children:"hardhat.config.ts"})," file."]}),`
`,s.jsx(e.p,{children:"Since the project uses Typescript, you have the benefit of using static typing."}),`
`,s.jsx(e.p,{children:"The following is the default configuration:"}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { HardhatUserConfig } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'hardhat/config'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '@nomicfoundation/hardhat-toolbox'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" config"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" HardhatUserConfig"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  solidity: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'0.8.17'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"};"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" default"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" config;"})]})]})})}),`
`,s.jsx(e.p,{children:"You can configure aspects such as:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"default network"}),`
`,s.jsx(e.li,{children:"networks"}),`
`,s.jsx(e.li,{children:"solidity"}),`
`,s.jsx(e.li,{children:"paths"}),`
`,s.jsx(e.li,{children:"mocha"}),`
`]}),`
`,s.jsx(e.p,{children:"For example:"}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { HardhatUserConfig } "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'hardhat/config'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '@nomicfoundation/hardhat-toolbox'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" config"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" HardhatUserConfig"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  defaultNetwork: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'base'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  networks: {"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    base_sepolia: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      url: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'https://sepolia.base.org'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      accounts: ["}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'<private key 1>'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"],"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    sepolia: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      url: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'https://sepolia.infura.io/v3/<key>'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      accounts: ["}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'<private key 1>'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'<private key 2>'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"],"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  solidity: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    version: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'0.8.17'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    settings: {"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      optimizer: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        enabled: "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"true"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        runs: "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"200"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  paths: {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    sources: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'./contracts'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    tests: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'./test'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    cache: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'./cache'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    artifacts: "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'./artifacts'"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"};"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" default"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" config;"})]})]})})}),`
`,s.jsxs(e.h2,{id:"compiling-smart-contracts",children:["Compiling smart contracts",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#compiling-smart-contracts",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["At this point, you should have a Hardhat project up and running to start developing smart contracts. You may notice Hardhat includes a sample contract called ",s.jsx(e.code,{children:"Lock.sol"}),"."]}),`
`,s.jsxs(e.p,{children:["To run your first command, enter ",s.jsx(e.code,{children:"npx hardhat compile"}),", which compiles the smart contracts and generates the correct ",s.jsx(e.a,{href:"https://hardhat.org/hardhat-runner/docs/advanced/artifacts",children:"artifacts"})," that includes the bytecode and ABI."]}),`
`,s.jsxs(e.p,{children:["After running the ",s.jsx(e.code,{children:"npx hardhat compile"}),` command, you should see a new folder named artifacts. This folder contains each contract name as a folder and a
`,s.jsx(e.code,{children:"{ContractName}.json"})," file."]}),`
`,s.jsx(e.hr,{})]})}function c(n={}){const{wrapper:e}={...a(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(i,{...n})}):i(n)}export{c as default,l as frontmatter};
