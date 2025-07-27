import{u as r,j as e}from"./index-Dlxm52NL.js";const t={title:"Building an onchain app using thirdweb",slug:"/build-with-thirdweb",description:"A tutorial that teaches how to build an NFT gallery app using thirdweb, including steps for creating an NFT collection, minting NFTs, and configuring the app for the Base testnet.",author:"taycaldwell"};function n(i){const s={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"building-an-onchain-app-using-thirdweb",children:["Building an onchain app using thirdweb",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#building-an-onchain-app-using-thirdweb",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(s.p,{children:["In this tutorial you will learn how to build an app on Base using the ",e.jsx(s.a,{href:"https://portal.thirdweb.com/",children:"thirdweb"})," platform."]}),`
`,e.jsx(s.p,{children:"To achieve this, you will deploy a smart contract for a NFT collection and create an NFT gallery app for viewing the metadata details of each NFT within the collection."}),`
`,e.jsxs(s.h2,{id:"objectives",children:["Objectives",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"By the end of this tutorial, you should be able to:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Create an NFT collection and mint new NFTs using thirdweb."}),`
`,e.jsx(s.li,{children:"Develop an NFT gallery app using a prebuilt thirdweb templates."}),`
`]}),`
`,e.jsxs(s.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"1-setting-up-a-coinbase-wallet",children:["1. Setting Up a Coinbase Wallet",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-setting-up-a-coinbase-wallet",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"To begin developing an app on Base, you first need to set up a web3 wallet. We recommend using the Coinbase Wallet, which can be easily created by downloading the Coinbase Wallet browser extension."}),`
`,e.jsx(s.p,{children:e.jsx(s.a,{href:"https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en",children:"Download Coinbase Wallet"})}),`
`,e.jsxs(s.h3,{id:"2-wallet-funding",children:["2. Wallet Funding",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-wallet-funding",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Blockchain transactions, including deploying smart contracts, necessitate a gas fee. Therefore, you will need to fund your wallet with ETH to cover those gas fees."}),`
`,e.jsxs(s.p,{children:["For this tutorial, you will be deploying a contract to the Base Sepolia test network. You can fund your wallet with Base Sepolia ETH using one of the faucets listed on the Base ",e.jsx(s.a,{href:"https://docs.base.org/tools/network-faucets",children:"Network Faucets"})," page."]}),`
`,e.jsxs(s.h2,{id:"creating-an-nft-collection",children:["Creating an NFT Collection",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-an-nft-collection",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Before developing an app, you need to create an NFT collection via thirdweb."}),`
`,e.jsx(s.p,{children:"Follow these steps to set up your NFT collection:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Visit the ",e.jsx(s.a,{href:"https://thirdweb.com/dashboard",children:"thirdweb dashboard"}),"."]}),`
`,e.jsxs(s.li,{children:["Click the ",e.jsx(s.strong,{children:"Connect Wallet"})," button located in the upper right corner to connect your wallet."]}),`
`,e.jsxs(s.li,{children:["From the dashboard, select ",e.jsx(s.strong,{children:e.jsx(s.a,{href:"https://thirdweb.com/explore",children:"Browse contracts"})})," to explore a list of deployable smart contracts."]}),`
`,e.jsxs(s.li,{children:["Navigate to the ",e.jsx(s.strong,{children:"NFTs"})," section and select the ",e.jsx(s.strong,{children:e.jsx(s.a,{href:"https://thirdweb.com/thirdweb.eth/TokenERC721",children:"NFT Collection"})})," smart contract."]}),`
`,e.jsxs(s.li,{children:["Click the ",e.jsx(s.strong,{children:"Deploy now"})," button."]}),`
`,e.jsxs(s.li,{children:["Provide the required details for your NFT collection:",`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Contract metadata (i.e. image, name, symbol, description)"}),`
`,e.jsxs(s.li,{children:["Network (Choose ",e.jsx(s.strong,{children:"Base Sepolia Testnet"}),")"]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:["Click ",e.jsx(s.strong,{children:"Deploy Now"}),"."]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/build-with-thirdweb/deploy-contract.png",alt:"Thirdweb Deploy Contract"})}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsxs(s.p,{children:["For production / mainnet deployments select ",e.jsx(s.code,{children:"Base"})," (mainnet) as the network rather than ",e.jsx(s.code,{children:"Base Sepolia"}),"."]})}),`
`,e.jsxs(s.p,{children:["Post-deployment, you can manage your smart contract via the ",e.jsx(s.a,{href:"https://thirdweb.com/dashboard/contracts",children:"thirdweb dashboard"}),"."]}),`
`,e.jsx(s.p,{children:"Currently, your NFT Collection lacks NFTs. To populate our upcoming NFT Gallery app, we will need to create several NFTs."}),`
`,e.jsx(s.p,{children:"Follow the steps below to mint new NFTs:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Visit the ",e.jsx(s.a,{href:"https://thirdweb.com/dashboard",children:"thirdweb dashboard"}),"."]}),`
`,e.jsxs(s.li,{children:["From the dashboard, select ",e.jsx(s.strong,{children:e.jsx(s.a,{href:"https://thirdweb.com/dashboard/contracts",children:"View contracts"})})," to view all your previously deployed contracts."]}),`
`,e.jsx(s.li,{children:"Select the NFT Collection smart contract you deployed."}),`
`,e.jsxs(s.li,{children:["Navigate to the ",e.jsx(s.strong,{children:"NFTs"})," tab on the left-hand sidebar."]}),`
`,e.jsxs(s.li,{children:["Click ",e.jsx(s.strong,{children:"Mint"}),"."]}),`
`,e.jsx(s.li,{children:"Fill in the metadata details for the NFT (name, media, description, properties)."}),`
`,e.jsxs(s.li,{children:["Click ",e.jsx(s.strong,{children:"Mint NFT"}),"."]}),`
`]}),`
`,e.jsx(s.p,{children:"Repeat these steps to mint as many NFTs as you'd like."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/build-with-thirdweb/mint-nft.png",alt:"Thirdweb Mint NFT"})}),`
`,e.jsxs(s.h2,{id:"building-an-nft-gallery-app",children:["Building an NFT Gallery App",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#building-an-nft-gallery-app",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["With an NFT Collection in place, it's time to construct an NFT Gallery App. The ",e.jsx(s.a,{href:"https://portal.thirdweb.com/cli",children:"thirdweb CLI"})," provides various prebuilt and starter ",e.jsx(s.a,{href:"https://portal.thirdweb.com/templates",children:"templates"})," for popular app use-cases, which can significantly expedite your app development process."]}),`
`,e.jsxs(s.p,{children:["In this tutorial, we'll use the ",e.jsx(s.a,{href:"https://portal.thirdweb.com/cli",children:"thirdweb CLI"})," to generate a new app project using the ",e.jsx(s.a,{href:"https://github.com/thirdweb-example/nft-gallery",children:"NFT Gallery template"}),"."]}),`
`,e.jsx(s.p,{children:"Run the following command:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npx"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" thirdweb"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" create"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --template"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" nft-gallery"})]})})})}),`
`,e.jsx(s.p,{children:"By default, the template is configured for an NFT collection on the Ethereum Mainnet. We will modify the code to adapt our NFT collection on the Base Sepolia Testnet."}),`
`,e.jsx(s.p,{children:"Follow these steps to update the template:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Open the project using your preferred code editor."}),`
`,e.jsxs(s.li,{children:["Open the ",e.jsx(s.code,{children:"src/consts/parameters.ts"})," file.",`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Update the ",e.jsx(s.code,{children:"contractAddress"})," variable to your NFT collection's contract address (found on the thirdweb dashboard)."]}),`
`,e.jsxs(s.li,{children:["Update the ",e.jsx(s.code,{children:"chain"})," variable to ",e.jsx(s.code,{children:"base-sepolia"}),"."]}),`
`,e.jsxs(s.li,{children:["Update the ",e.jsx(s.code,{children:"blockExplorer"})," variable to ",e.jsx(s.code,{children:"https://sepolia.basescan.org"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:["Open the ",e.jsx(s.code,{children:"src/main.tsx"})," file."]}),`
`,e.jsx(s.li,{children:"Replace the file contents with the following code:"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" React "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "react"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ReactDOM "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "react-dom/client"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" App "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "./App"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "./index.css"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { ThirdwebProvider } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@thirdweb-dev/react"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { BaseSepoliaTestnet } "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@thirdweb-dev/chains"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"ReactDOM."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"createRoot"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(document."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"getElementById"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"root"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"as"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" HTMLElement"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:")."}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"render"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  <"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"React.StrictMode"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    <"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"ThirdwebProvider"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" activeChain"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{BaseSepoliaTestnet}>"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      <"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"App"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" />"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    </"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"ThirdwebProvider"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  </"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"React.StrictMode"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">,"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:");"})})]})})}),`
`,e.jsxs(s.p,{children:["The above code imports and uses ",e.jsx(s.code,{children:"BaseSepoliaTestnet"})," to be the ",e.jsx(s.code,{children:"activeChain"}),"."]}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsxs(s.p,{children:["For production / mainnet deployments, update the information above so that the ",e.jsx(s.code,{children:"chain"})," variable is ",e.jsx(s.code,{children:"base"})," (step ii), the ",e.jsx(s.code,{children:"blockExplorer"})," is ",e.jsx(s.code,{children:"https://basescan.org"})," (step iii), and update both instances of ",e.jsx(s.code,{children:"BaseSepoliaTestnet"})," to ",e.jsx(s.code,{children:"Base"})," in the example javascript code."]})}),`
`,e.jsxs(s.h2,{id:"running-the-application",children:["Running the Application",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#running-the-application",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"With the updated Base Sepolia Testnet chain and your NFT collection's address, you can view your NFT collection from the application."}),`
`,e.jsx(s.p,{children:"To start the application, run the following command from the root directory:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"yarn"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" dev"})]})})})}),`
`,e.jsxs(s.h2,{id:"conclusion",children:["Conclusion",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Congratulations on reaching the end of this tutorial! You've now learned how to create an NFT collection using Thirdweb, mint new NFTs, and build an NFT gallery app on the Base blockchain!"}),`
`,e.jsxs(s.p,{children:["As a next step, check out other prebuilt ",e.jsx(s.a,{href:"https://thirdweb.com/explore",children:"smart contracts"})," and starter ",e.jsx(s.a,{href:"https://portal.thirdweb.com/templates",children:"templates"})," provided by the ",e.jsx(s.a,{href:"https://portal.thirdweb.com",children:"thirdweb"})," platform that can help you build your next onchain app on Base."]})]})}function a(i={}){const{wrapper:s}={...r(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(n,{...i})}):n(i)}export{a as default,t as frontmatter};
