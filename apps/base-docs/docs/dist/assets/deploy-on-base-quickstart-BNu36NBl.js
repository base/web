import{u as i,j as e}from"./index-Dlxm52NL.js";const t={title:"Quickstart: Deploy on Base",slug:"/quickstart",description:"A guide to help you get started with deploying your smart contracts on Base."};function r(n){const s={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"quick-start-deploy-on-base",children:["Quick Start: Deploy on Base",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#quick-start-deploy-on-base",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"Welcome to the Base deployment quickstart guide! This comprehensive walkthrough will help you set up your environment and deploy smart contracts on Base. Whether you're a seasoned developer or just starting out, this guide has got you covered."}),`
`,e.jsxs(s.h2,{id:"what-youll-achieve",children:["What You'll Achieve",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-youll-achieve",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"By the end of this quickstart, you'll be able to:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Set up your development environment to deploy on Base"}),`
`,e.jsx(s.li,{children:"Deploy your smart contracts to Base"}),`
`,e.jsx(s.li,{children:"Connect your frontend to your smart contracts"}),`
`]}),`
`,e.jsxs(s.aside,{"data-callout":"tip",children:[e.jsx(s.strong,{"data-callout-title":!0,children:"Why Base?"}),e.jsx(s.p,{children:"Base is a fast, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain. By following this guide, you'll join a vibrant ecosystem of developers, creators, and innovators who are building a global onchain economy."})]}),`
`,e.jsxs(s.h2,{id:"set-up-your-development-environment",children:["Set Up Your Development Environment",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#set-up-your-development-environment",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Create a new project directory"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"mkdir"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" my-base-project"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" && "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"cd"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" my-base-project"})]})})})}),`
`,e.jsxs(s.ol,{start:"2",children:[`
`,e.jsx(s.li,{children:"Install Foundry, a powerful framework for smart contract development"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -L"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://foundry.paradigm.xyz"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" |"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" bash"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"foundryup"})})]})})}),`
`,e.jsx(s.p,{children:"This installs Foundry and updates it to the latest version."}),`
`,e.jsxs(s.ol,{start:"3",children:[`
`,e.jsx(s.li,{children:"Initialize a new Solidity project"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"forge"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" init"})]})})})}),`
`,e.jsxs(s.p,{children:["Your Foundry project is now ready. You'll find an example contract in the ",e.jsx(s.code,{children:"src"})," directory, which you can replace with your own contracts. For the purposes of this guide, we'll use the Counter contract provided in ",e.jsx(s.code,{children:"/src/Counter.sol"})]}),`
`,e.jsx(s.aside,{"data-callout":"tip",children:e.jsxs(s.p,{children:["Foundry provides a suite of tools for Ethereum application development, including Forge (for testing), Cast (for interacting with the chain), and Anvil (for setting up a local node). You can learn more about Foundry ",e.jsx(s.a,{href:"https://book.getfoundry.sh/",children:"here"}),"."]})}),`
`,e.jsxs(s.h2,{id:"configure-foundry-with-base",children:["Configure Foundry with Base",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configure-foundry-with-base",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"To deploy your smart contracts to Base, you need two key components:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"A node connection to interact with the Base network"}),`
`,e.jsx(s.li,{children:"A funded private key to deploy the contract"}),`
`]}),`
`,e.jsx(s.p,{children:"Let's set up both of these:"}),`
`,e.jsxs(s.h3,{id:"1-set-up-your-node-connection",children:["1. Set up your node connection",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-set-up-your-node-connection",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Create a ",e.jsx(s.code,{children:".env"})," file in your project's root directory"]}),`
`,e.jsxs(s.li,{children:["Add the Base network RPC URL to your ",e.jsx(s.code,{children:".env"})," file"]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"BASE_RPC_URL"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://mainnet.base.org"'})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"BASE_SEPOLIA_RPC_URL"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://sepolia.base.org"'})]})]})})}),`
`,e.jsxs(s.ol,{start:"3",children:[`
`,e.jsx(s.li,{children:"Load your environment variables"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"source"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" .env"})]})})})}),`
`,e.jsx(s.aside,{"data-callout":"tip",children:e.jsxs(s.p,{children:["Base Sepolia is the test network for Base, which we will use for the rest of this guide. You can obtain free Base Sepolia ETH from one of the ",e.jsx(s.a,{href:"/chain/network-faucets",children:"faucets listed here"}),"."]})}),`
`,e.jsxs(s.h3,{id:"2-secure-your-private-key",children:["2. Secure your private key",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-secure-your-private-key",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Store your private key in Foundry's secure keystore"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"cast"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" wallet"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" import"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" deployer"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --interactive"})]})})})}),`
`,e.jsxs(s.ol,{start:"2",children:[`
`,e.jsx(s.li,{children:"When prompted enter your private key and a password."}),`
`]}),`
`,e.jsxs(s.p,{children:["Your private key is stored in ",e.jsx(s.code,{children:"~/.foundry/keystores"})," which is not tracked by git."]}),`
`,e.jsx(s.aside,{"data-callout":"warning",children:e.jsx(s.p,{children:"Never share or commit your private key. Always keep it secure and handle with care."})}),`
`,e.jsxs(s.h2,{id:"deploy-your-contracts",children:["Deploy Your Contracts",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deploy-your-contracts",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Now that your environment is set up, let's deploy your contracts to Base Sepolia."}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Use the following command to compile and deploy your contract"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"forge"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" create"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" ./src/Counter.sol:Counter"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --rpc-url"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" $BASE_SEPOLIA_RPC_URL "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"--account"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" deployer"})]})})})}),`
`,e.jsxs(s.p,{children:["Note the format of the contract being deployed is ",e.jsx(s.code,{children:"<contract-path>:<contract-name>"}),"."]}),`
`,e.jsxs(s.ol,{start:"2",children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"After successful deployment, the transaction hash will be printed to the console output"}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Copy the deployed contract address and add it to your ",e.jsx(s.code,{children:".env"})," file"]}),`
`]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"COUNTER_CONTRACT_ADDRESS"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0x..."'})]})})})}),`
`,e.jsxs(s.ol,{start:"4",children:[`
`,e.jsx(s.li,{children:"Load the new environment variable"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"source"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" .env"})]})})})}),`
`,e.jsxs(s.h3,{id:"verify-your-deployment",children:["Verify Your Deployment",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verify-your-deployment",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"To ensure your contract was deployed successfully:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Check the transaction on ",e.jsx(s.a,{href:"https://sepolia.basescan.org/",children:"Sepolia Basescan"}),"."]}),`
`,e.jsxs(s.li,{children:["Use the ",e.jsx(s.code,{children:"cast"})," command to interact with your deployed contract from the command line"]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"cast"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" call"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" $COUNTER_CONTRACT_ADDRESS "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"number()(uint256)"'}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --rpc-url"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" $BASE_SEPOLIA_RPC_URL"})]})})})}),`
`,e.jsxs(s.p,{children:["This will return the initial value of the Counter contract's ",e.jsx(s.code,{children:"number"})," storage variable, which will be ",e.jsx(s.code,{children:"0"}),"."]}),`
`,e.jsx(s.strong,{children:"Congratulations! You've deployed your smart contracts to Base Sepolia!"}),`
`,e.jsxs(s.h2,{id:"next-steps",children:["Next Steps",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#next-steps",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.a,{href:"https://onchainkit.com",children:"Onchainkit"})," to connect your frontend to your contracts! Onchainkit is a library of ready-to-use React components and Typescript utilities."]}),`
`,e.jsxs(s.li,{children:["Learn more about interacting with your contracts in the command line using Foundry from our ",e.jsx(s.a,{href:"/cookbook/smart-contract-development/foundry/deploy-with-foundry",children:"Foundry tutorial"}),"."]}),`
`]})]})}function l(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{l as default,t as frontmatter};
