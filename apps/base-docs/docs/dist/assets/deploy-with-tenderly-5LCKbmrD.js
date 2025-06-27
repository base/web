import{u as r,j as e}from"./index-Dlxm52NL.js";const a={title:"Deploying a smart contract using Tenderly",slug:"/deploy-with-tenderly",description:"A tutorial that teaches how to deploy smart contracts using Tenderly DevNets. This page covers setup, debugging, transaction simulations, and continuous integration for smart contract development on Base Network.",author:"tenderly"};function i(n){const s={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"deploying-a-smart-contract-using-tenderly",children:["Deploying a smart contract using Tenderly",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deploying-a-smart-contract-using-tenderly",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(s.p,{children:["This tutorial shows you how to set up a private environment for smart contract ",e.jsx(s.strong,{children:"development on Base Network"})," using ",e.jsx(s.strong,{children:"Tenderly DevNets"}),"."]}),`
`,e.jsxs(s.p,{children:["Learn how to configure a DevNet, use built-in tools for ",e.jsx(s.strong,{children:"smart contract debugging,"})," run ",e.jsx(s.strong,{children:"transaction simulations"})," to validate your fixes, and introduce a DevNet into your ",e.jsx(s.strong,{children:"continuous integration"}),"."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.a,{href:"https://docs.tenderly.co/devnets/intro-to-devnets",children:"Tenderly DevNets are a zero-setup environment"})," for developing and testing smart contracts against production data. As a private replica of 30+ EVM networks, a DevNet environment allows you to instantly deploy, execute, and debug smart contracts. With an unlimited faucet, unlocked public accounts, and built-in debugging tools, you get full control over your environment while getting the latest network states. Additionally, you can integrate a DevNet RPC URL into your existing development and CI flows, automating setups with reusable and customizable YAML templates."]}),`
`,e.jsxs(s.h2,{id:"objectives",children:["Objectives",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"By the end of this tutorial, you should be able to:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Create a ",e.jsx(s.strong,{children:"DevNet"})," with the most recent ",e.jsx(s.strong,{children:"Base network"})," states."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Deploy, verify, and execute"})," your contracts on a DevNet."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Debug"})," smart contracts instantly and optimize their gas usage."]}),`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.strong,{children:"transaction"})," ",e.jsx(s.strong,{children:"simulations"})," to validate fixes prior to deployment."]}),`
`,e.jsxs(s.li,{children:["Integrate a DevNet into your ",e.jsx(s.strong,{children:"Continuous Integration (CI)"})," to automate your testing."]}),`
`]}),`
`,e.jsxs(s.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"1-set-up-a-tenderly-account",children:["1. Set up a Tenderly account",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-set-up-a-tenderly-account",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["To begin developing on Tenderly, you must first set up an account. You can easily create one by visiting the ",e.jsx(s.a,{href:"https://dashboard.tenderly.co/register",children:"registration page"}),"."]}),`
`,e.jsxs(s.h3,{id:"2-install-the-tenderly-cli",children:["2. Install the Tenderly CLI",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-install-the-tenderly-cli",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"After setting up your account, you should install the Tenderly Command Line Interface (CLI). This will allow you to interact with your DevNet environments directly from your terminal."}),`
`,e.jsxs(s.p,{children:["Follow these ",e.jsx(s.a,{href:"https://github.com/Tenderly/tenderly-cli#installation",children:"instructions to install the Tenderly CLI"}),"."]}),`
`,e.jsxs(s.h3,{id:"3-create-a-devnet-template",children:["3. Create a DevNet template",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-create-a-devnet-template",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Before developing a smart contract, you must create a DevNet template via Tenderly."}),`
`,e.jsx(s.p,{children:"Follow these steps to set up your DevNet template for Base Network:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Visit the ",e.jsx(s.a,{href:"https://dashboard.tenderly.co/",children:"Tenderly Dashboard"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["From the lefthand menu, navigate to ",e.jsx(s.strong,{children:"DevNets"})," and click ",e.jsx(s.strong,{children:"Create Template"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"When prompted:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Choose ",e.jsx(s.strong,{children:"Base"})," for your Network."]}),`
`,e.jsxs(s.li,{children:["Give your Base DevNet a unique ",e.jsx(s.strong,{children:"Name"}),"."]}),`
`,e.jsxs(s.li,{children:["Click ",e.jsx(s.strong,{children:"Create"}),"."]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/create-template.png",alt:"Template Creation Dialogue"})}),`
`]}),`
`]}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsxs(s.p,{children:["If needed, check out the Tenderly documentation for more information on ",e.jsx(s.a,{href:"https://docs.tenderly.co/devnets/intro-to-devnets#basic-devnet-usage",children:"setting up a Devnet template"}),"."]})}),`
`,e.jsxs(s.ol,{start:"4",children:[`
`,e.jsxs(s.li,{children:["Click ",e.jsx(s.strong,{children:"Spawn DevNet,"})," and that's about it - you've got your own private replica of Base Network."]}),`
`]}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsxs(s.p,{children:["If needed, check out the Tenderly documentation for more alternative ",e.jsx(s.a,{href:"https://docs.tenderly.co/devnets/advanced/automated-devnet-spawning-bash-and-javascript",children:"methods to spawn a DevNet"}),"."]})}),`
`,e.jsxs(s.h3,{id:"4-customize-your-devnet-environment",children:["4. Customize your DevNet environment",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-customize-your-devnet-environment",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["You can also ",e.jsx(s.a,{href:"https://docs.tenderly.co/devnets/yaml-template",children:"use the YAML editor in DevNets to create reusable templates"}),' that allow you to configure your environment. As a "blueprint" for your DevNets, the reusable YAML templates enable you to quickly spawn your DevNets with preset configurations. You can use them to override on-chain data for wallets and contracts of interest with custom values, including ',e.jsx(s.code,{children:"balances"}),", ",e.jsx(s.code,{children:"erc20"}),", ",e.jsx(s.code,{children:"storage"}),", ",e.jsx(s.code,{children:"wallets"}),", and ",e.jsx(s.code,{children:"contracts"}),"."]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/configuration.png",alt:"Template Configuration Button"})}),`
`,e.jsxs(s.h4,{id:"yaml-template-configuration",children:["YAML Template Configuration",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#yaml-template-configuration",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Learn how to configure DevNet templates using YAML here: https://docs.tenderly.co/devnets/yaml-template"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"version"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"v0"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"template"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"greeter"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  block-number"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"latest"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  visibility"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"TEAM"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  network-id"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"8453"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  execution"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"    chain-config"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"      chain-id"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"8453"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"    block-gas-limit"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"10000000"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"    base-fee-per-gas"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"1000000000"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #   contracts:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - address: 0x395eD9ffd32b255dBD128092ABa40200159d664b"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       bytecode: 0x123412341234123124123143"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       balance: 100"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       slots:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #         - 0x3459054d09ae8631455b798b2b5d106e17bb4e68a39d2d2a935f5f1b7253988c: 0x0000000000000000000000000000000000000000000000000000000000000000"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #         - 0x3459054d09ae8631455b798b2b5d106e17bb4e68a39d2d2a935f5f1b7253988d: 0x0000000000000000000000000000000000000000000000000000000000000001"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #   wallets:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - address: 0x395eD9ffd32b255dBD128092ABa40200159d664b"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       balance: 100"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - private-key: 0x3459054d09ae8631455b798b2b5d106e17bb4e68a39d2d2a935f5f1b7253988c"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       balance: 100"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #   storage:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - address: 0x395eD9ffd32b255dBD128092ABa40200159d664b"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       slots:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #         - 0x1459054d09ae8631455b798b2b5d106e17bb4e68a39d2d2a935f5f1b7253988c: 0x0000000000000000000000000000000000000000000000000000000000000001"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #         - 0x2459054d09ae8631455b798b2b5d106e17bb4e68a39d2d2a935f5f1b7253988c: 0x0000000000000000000000000000000000000000000000000000000000000002"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - address: 0xabcde9ffd32b255dBD128092ABa40200159d665a"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       slots:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #         - 0x3459054d09ae8631455b798b2b5d106e17bb4e68a39d2d2a935f5f1b7253988c: 0x0000000000000000000000000000000000000000000000000000000000000003"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #   balances:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - address: 0x395eD9ffd32b255dBD128092ABa40200159d664b"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       amount: 1000"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - address: 0x395eD9ffd32b255dBD128092ABa40200159d664b"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       amount: 1000"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #   erc20:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #     - contract: 0x6B175474E89094C44Da98b954EedeAC495271d0F # DAI"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #       balances:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #         - address: 0x0000000000000000000000000000000000000000"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  #           amount: 100"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  display-name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"Greeter"})]})]})})}),`
`,e.jsxs(s.h3,{id:"5-set-up-hardhat-and-add-a-devnet-rpc",children:["5. Set up Hardhat and add a DevNet RPC",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#5-set-up-hardhat-and-add-a-devnet-rpc",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Next, let's extend your HardHat environment by connecting it to a Tenderly DevNet. All transactions from your scripts and tests will be recorded for later viewing in the Tenderly DevNet Dashboard."}),`
`,e.jsx(s.p,{children:"First, you must modify a code example to use the new DevNet you created."}),`
`,e.jsxs(s.p,{children:["The rest of this tutorial assumes you're either using the ",e.jsx(s.a,{href:"https://github.com/Tenderly/devnet-examples.git",children:"devnet-examples repository"})," or that you have a Hardhat project set up with these dependencies included:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:'"@nomicfoundation/hardhat-toolbox": "^2.0.2"'})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:'"@nomiclabs/hardhat-ethers": "^2.2.3"'})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:'"@tenderly/hardhat-tenderly": "^1.7.7"'})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:'"ethers": "^5.7.2"'})}),`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:'"hardhat": "^2.17.1"'})}),`
`]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"First, download the example code from the Tenderly Github repo:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"git"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" clone"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://github.com/Tenderly/devnet-examples.git"})]})})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Navigate to the ",e.jsx(s.code,{children:"local-development"})," directory ",e.jsxs(s.em,{children:["(make sure ",e.jsx(s.code,{children:"@tenderly/hardhat-tenderly"})," is set to: ",e.jsx(s.code,{children:'"^1.7.7"'}),")"]})," and execute the following:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"cd"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" local-development"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"yarn"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" install"})]})]})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Modify your ",e.jsx(s.code,{children:"hardhat.config.ts"})," file by adding the items below:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {HardhatUserConfig} "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "hardhat/config"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@nomicfoundation/hardhat-toolbox"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" *"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" as"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" tdly "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@tenderly/hardhat-tenderly"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" *"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" as"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" dotenv "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "dotenv"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"dotenv."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"config"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"tdly."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"setup"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"		**"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// TODO: Prefer manual over automatic verification**"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    automaticVerifications: "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"false"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" config"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" HardhatUserConfig"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    solidity: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0.8.18"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    defaultNetwork: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"tenderly"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    networks: {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"				**"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:'// TODO: Make sure this is named "tenderly" as it is here.**'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        tenderly: {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"						**"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// TODO: Add your Base DevNet RPC URL here (created during the spawn step)**"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"            url: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'PASTE RPC LINK HERE'"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"            chainId: "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"8453"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" // (Base ChainID)"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    },"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    tenderly: {"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"				**"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// TODO: Add your tenderly username (from the Dashboard)**"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        username: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'""'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"				**"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// TODO: Add your project name (from the Dashboard)**"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        project: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'""'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        privateVerification: "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"false"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"};"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" default"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" config;"})]})]})})}),`
`]}),`
`]}),`
`,e.jsxs(s.h2,{id:"verify-your-smart-contract",children:["Verify your smart contract",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verify-your-smart-contract",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["You can ",e.jsx(s.a,{href:"https://docs.tenderly.co/monitoring/smart-contract-verification#methods-of-verification",children:"verify your smart contract on Tenderly"})," using several methods. In this tutorial, we ",e.jsx(s.a,{href:"https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin",children:"use the Tenderly Hardhat plugin method"}),", but feel free to choose a different one if it better suits your project."]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["In ",e.jsx(s.code,{children:"deployGreeter.ts"}),", add the following code after the ",e.jsx(s.code,{children:"greeter.setGreeting()"}),"."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"await"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" greeter."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"deployed"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"();"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"await"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" greeter."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"setGreeting"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'hello'"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:");"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Add this"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"await"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" tenderly."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"verify"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  name: "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'Greeter'"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  address: greeter.address,"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"});"})})]})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Also, make sure to update the Tenderly import at the top of the file as well."}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { ethers, "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"**"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"tenderly"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"**"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "hardhat"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Add tenderly"})]})})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Deploy your smart contract:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npx"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" hardhat"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" run"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" scripts/deployGreeter.ts"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --network"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" tenderly"})]})})})}),`
`,e.jsx(s.p,{children:"If successful, you should get an output similar to:"}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/output.png",alt:"output"})}),`
`,e.jsxs(s.p,{children:["You can see the result of the deployment in ",e.jsx(s.a,{href:"https://dashboard.tenderly.co/shared/devnet/transaction/7811f867-2af4-4136-8c75-f77fbb4e17ed",children:"this example on a publicly shared DevNet"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Test your smart contract to make sure there are no errors (It is always best practice to run the included tests)."}),`
`]}),`
`]}),`
`,e.jsxs(s.h2,{id:"use-tenderly-debugger",children:["Use Tenderly Debugger",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#use-tenderly-debugger",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.a,{href:"https://docs.tenderly.co/debugger",children:"Tenderly Debugger"})," allows you to pinpoint the exact line of code causing an issue and speed up your debugging process. With Debugger, you can step through code and inspect stack traces, filter internal and external calls, see decoded events and logs, examine state changes, and more."]}),`
`,e.jsx(s.p,{children:"To use it, follow these steps:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Open the Transaction tab in your DevNet."}),`
`,e.jsxs(s.li,{children:["Click on the ",e.jsx(s.strong,{children:"setGreeting"})," transaction."]}),`
`,e.jsx(s.li,{children:"Click Debugger."}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/setgreeting.png",alt:"Devnet Transaction Capture"})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Click the ",e.jsx(s.strong,{children:"Debugger"})," button."]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/debugger-button.png",alt:"Debugger Screen"})}),`
`,e.jsxs(s.p,{children:["Notice the current line (line 14 in this example) is highlighted. Use Debugger to examine the ",e.jsx(s.strong,{children:"setGreeting"})," function."]}),`
`,e.jsxs(s.p,{children:["Next, click the ",e.jsx(s.strong,{children:"Evaluate"})," button to evaluate complex expressions, global and local variables, functions, and other relevant parameters in a human-readable format."]}),`
`,e.jsx(s.p,{children:"To try it out, follow these steps:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Click the ",e.jsx(s.strong,{children:"Evaluate"})," button."]}),`
`,e.jsxs(s.li,{children:["In the modal that appears, type ",e.jsx(s.code,{children:"_greeting"})," and see what is being passed into the ",e.jsx(s.strong,{children:"setGreeting"})," function call."]}),`
`]}),`
`,e.jsxs(s.p,{children:["You should see the output ",e.jsx(s.code,{children:'{"result": "hello"}'}),"!"]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/result-of-expression.png",alt:"Result from evaluating an expression in Tenderly"})}),`
`,e.jsxs(s.h2,{id:"simulate-transactions-with-updated-contract-source-code",children:["Simulate transactions with updated contract source code",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#simulate-transactions-with-updated-contract-source-code",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["After detecting the exact cause of a bug, you can immediately try out a potential solution and make sure it works ",e.jsx(s.a,{href:"https://docs.tenderly.co/simulations-and-forks/intro-to-simulations",children:"using Transaction Simulator"}),". This feature allows you to simulate transaction execution against real-time and historical Base data, as well as any other supported network, without actually deploying it on-chain."]}),`
`,e.jsxs(s.p,{children:["You can ",e.jsx(s.strong,{children:"simulate transactions"})," with updated contract source code and modified transaction parameters within your DevNet to see what would happen if the transaction got executed on Base Network. Running a transaction simulation with ",e.jsx(s.a,{href:"https://docs.tenderly.co/simulations-and-forks/how-to-simulate-a-transaction/editing-contract-source",children:"modified contract source code"})," allows you to change compilation parameters, such as compiler version, optimization settings, or EVM version, to test your bug fixes."]}),`
`,e.jsx(s.p,{children:"Follow these steps to try it out:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Click the ",e.jsx(s.strong,{children:"New Simulation"}),` button.
`,e.jsx(s.img,{src:"/images/deployment-with-tenderly/simulator-button.png",alt:"DevNet Simulation Button"})]}),`
`,e.jsxs(s.li,{children:["Then, from the Simulation screen, find the ",e.jsx(s.strong,{children:"Select address"})," drop-down menu and click ",e.jsx(s.strong,{children:"Greeter"}),"."]}),`
`,e.jsxs(s.li,{children:["Click ",e.jsx(s.strong,{children:"Edit Source"}),"."]}),`
`,e.jsxs(s.li,{children:["Modify the console.log to say ",e.jsx(s.code,{children:"You changed the"})," to the console.log within ",e.jsx(s.strong,{children:"SetGreeting"})," in the ",e.jsx(s.code,{children:"Greeter.sol"})," smart contract and click the ",e.jsx(s.strong,{children:"Apply"}),` button.
`,e.jsx(s.img,{src:"/images/deployment-with-tenderly/modifying-source.png",alt:"Editing Source Code of your smart contract"})]}),`
`,e.jsxs(s.li,{children:["From the ",e.jsx(s.strong,{children:"Select Option"}),' drop-down menu, select "',e.jsx(s.strong,{children:"Set Greeting"}),'."']}),`
`,e.jsxs(s.li,{children:["Change the greeting to something like, ",e.jsx(s.code,{children:"Hello from Base!"}),`
`,e.jsx(s.img,{src:"/images/deployment-with-tenderly/simulation.png",alt:"Simulation using a new parameter as an input"})]}),`
`,e.jsxs(s.li,{children:["Click ",e.jsx(s.strong,{children:"Simulate Transaction"}),"."]}),`
`]}),`
`,e.jsx(s.p,{children:"Notice the smart contract edit you made is now reflected in the console.log. In addition, you simulated transaction execution under this new condition of a modified smart contract."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/result-of-simulation.png",alt:"Smart Contract Edit in Simulated Transaction"})}),`
`,e.jsxs(s.h2,{id:"override-the-contract-state",children:["Override the contract state",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#override-the-contract-state",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["In addition, we can ",e.jsx(s.strong,{children:"change the state of the contract"})," before simulating a transaction. This is important because it allows you to mock contract states and execute highly specific simulation scenarios. Note that state overrides are valid for the simulation you're running. Subsequent simulations will be unaware of the state override."]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["To change the execution state, click on ",e.jsx(s.strong,{children:"Simulator"})," from the DevNet menu."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Click ",e.jsx(s.strong,{children:"New Simulation"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Head over to ",e.jsx(s.strong,{children:"State Overrides"}),", select your contract, and assign a ",e.jsx(s.strong,{children:"KEY"})," and ",e.jsx(s.strong,{children:"VALUE"})," pair."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["For ",e.jsx(s.strong,{children:"KEY"}),", enter ",e.jsx(s.code,{children:"0x0000000000000000000000000000000000000000000000000000000000000000"})]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["For ",e.jsx(s.strong,{children:"VALUE"}),", enter ",e.jsx(s.code,{children:"0x48656c6c6f2066726f6d2054656e6465726c79"})]}),`
`,e.jsxs(s.p,{children:["Note: The ",e.jsx(s.strong,{children:"VALUE"})," is hex for ",e.jsx(s.code,{children:"Hello from Tenderly."})," You can get a generated hex value ",e.jsx(s.a,{href:"https://string-functions.com/string-hex.aspx",children:"using a string-to-hex converter"}),"."]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/overrides.png",alt:"State Override Portion of the Transaction Simulation Screen"})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Click ",e.jsx(s.strong,{children:"Add"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Click ",e.jsx(s.strong,{children:"Simulate"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsx(s.p,{children:"Note that this has overridden the existing state with a new default greeting. This functionality allows you to run transaction simulations under custom conditions."})}),`
`,e.jsxs(s.h2,{id:"use-devnets-in-continuous-integration-ci",children:["Use DevNets in Continuous Integration (CI)",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#use-devnets-in-continuous-integration-ci",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Production-level code requires constant testing and monitoring. You can integrate a Tenderly DevNet into your CI pipeline to generate a staging environment for precisely that purpose."}),`
`,e.jsxs(s.p,{children:["Follow along using the ",e.jsx(s.a,{href:"https://github.com/Tenderly/devnet-examples.git",children:"DevNet example project"})," to set up a CI using GitHub Actions."]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Clone the devnets-example project if you haven't already:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"git"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" clone"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://github.com/Tenderly/devnet-examples.git"})]})})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Install the Tenderly CLI if you haven't already. Follow the ",e.jsx(s.a,{href:"https://github.com/Tenderly/tenderly-cli#installation",children:"provided instructions to install the CLI"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Adapt the ",e.jsx(s.code,{children:".github/workflows/smart-contract-ci.yml"})," with the following configuration, and replace ",e.jsx(s.code,{children:"???"})," with ",e.jsx(s.a,{href:"https://www.notion.so/o/-LeLQOwIQG3HndcULLU2/s/-LeLQaB11_TIOtLg8tIW/other/platform-access/how-to-find-the-project-slug-username-and-organization-name",children:"project slug"}),", ",e.jsx(s.a,{href:"https://www.notion.so/o/-LeLQOwIQG3HndcULLU2/s/-LeLQaB11_TIOtLg8tIW/other/platform-access/how-to-find-the-project-slug-username-and-organization-name",children:"username"}),", and a DevNet template slug."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"Smart Contracts CI"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"on"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  push"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"    branches"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      - "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"main"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  pull_request"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"    branches"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      - "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"main"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"jobs"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"  build-and-test"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"    runs-on"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"ubuntu-latest"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"    steps"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      - "}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"Checkout code"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        uses"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"actions/checkout@v3"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      - "}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"Set up Node.js"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        uses"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"actions/setup-node@v3"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        with"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"          node-version"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"16"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      - "}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"Install dependencies"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        run"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"yarn install"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        working-directory"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"./CI-project"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" # hardhat location"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      - "}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"Install Tenderly CLI"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        run"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sudo sh"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      - "}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"Run tests"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        run"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"yarn run test:devnet"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        working-directory"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"./CI-project"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" # hardhat location"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"        env"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"          TENDERLY_ACCESS_KEY"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"${{ secrets.TENDERLY_ACCESS_KEY }}"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"          TENDERLY_PROJECT_SLUG"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'???'"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" # your project slug"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"          TENDERLY_DEVNET_TEMPLATE"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'???'"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" # your devnet template slug"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:"          TENDERLY_ACCOUNT_ID"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'???'"}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" # your username or organization name"})]})]})})}),`
`,e.jsxs(s.p,{children:["You can find the DevNet template slug (needed for ",e.jsx(s.code,{children:"TENDERLY_DEVNET_TEMPLATE"}),") in the DevNets UI. Here is an example:"]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/devnet-project-slug.png",alt:"Showing how to find TENDERLY_DEVNET_TEMPLATE"})}),`
`,e.jsx(s.p,{children:"Showing how to find TENDERLY_DEVNET_TEMPLATE"}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["From your terminal, run the tests locally. The ",e.jsx(s.code,{children:"test:devnet"})," script will ",e.jsx(s.a,{href:"https://github.com/Tenderly/devnet-examples/blob/main/spawn-devnet-auto/js/spawn-devnet.js",children:"spawn a new DevNet automatically"})," and run tests against it."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npx"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" hardhat"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" test:devnet"})]})})})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"To test, change any file, commit, and push the changes. Any time you push a change, your Tenderly DevNet tests will execute."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Head over to your project repository on GitHub."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Click the ",e.jsx(s.strong,{children:"Actions"})," tab."]}),`
`]}),`
`]}),`
`,e.jsx(s.p,{children:"Note that you should now have a workflow run in progress. After the build finishes, you can see all the transactions in a DevNet run."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/deployment-with-tenderly/github-actions.png",alt:"Github Actions Linked with Tenderly"})}),`
`,e.jsxs(s.h2,{id:"conclusion",children:["Conclusion",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Congrats! In this tutorial, you've learned how to set up your own private replica of Base with Tenderly DevNets. You can now use it to instantly deploy, execute, and debug your smart contracts."}),`
`,e.jsx(s.p,{children:"Plus, you can validate your fixes using transaction simulations before deploying them on-chain. Finally, you can integrate a DevNet environment into your CI flow to speed up and automate your testing process."}),`
`,e.jsx(s.strong,{children:"Further guidance"}),`
`,e.jsx(s.p,{children:"For more information on the Tenderly full-stack infrastructure, check out the following resources:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://docs.tenderly.co/",children:"Documentation"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://blog.tenderly.co/",children:"Blog"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://twitter.com/TenderlyApp",children:"Twitter"})}),`
`]})]})}function t(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{t as default,a as frontmatter};
