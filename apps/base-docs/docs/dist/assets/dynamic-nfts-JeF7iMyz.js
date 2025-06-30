import{u as a,j as s}from"./index-Dlxm52NL.js";const l={title:"Building dynamic NFTs",description:"A tutorial that teaches how to make dynamic NFTs that evolve based on onchain or offchain actions.",authors:["lukecd"],tags:["nft"],difficulty:"intermediate",hide_table_of_contents:!1};function n(i){const e={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...i.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"build-a-dynamic-nft-on-base-with-irys",children:["Build a Dynamic NFT on Base with Irys",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#build-a-dynamic-nft-on-base-with-irys",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(e.p,{children:["In this tutorial, you will create a dynamic NFT using Irys's ",s.jsx(e.a,{href:"https://docs.irys.xyz/build/d/features/mutability",children:"mutability features"}),"."]}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/dynamic-nfts/all-characters.png",alt:"Overview"})}),`
`,s.jsx(e.p,{children:"Dynamic NFTs are NFTs whose metadata evolves over time. They are commonly used in:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Gaming projects where in-game assets evolve as players progress"}),`
`,s.jsx(e.li,{children:"Loyalty programs where NFTs evolve as users accumulate points"}),`
`]}),`
`,s.jsxs(e.h2,{id:"objectives",children:["Objectives",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"By the end of this tutorial, you should be able to:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Permanently upload data onchain using Irys"}),`
`,s.jsx(e.li,{children:"Create NFT metadata and use it to mint an NFT"}),`
`,s.jsx(e.li,{children:`"Mutate" (change) the NFT metadata using Irys's mutability features`}),`
`]}),`
`,s.jsxs(e.h2,{id:"prerequisites",children:["Prerequisites",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Setup a Coinbase Wallet:"})," You'll need a web3 wallet; you'll use it to deploy the NFT contract and to sign and pay for uploads to Irys. We recommend using the ",s.jsx(e.a,{href:"https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=e",children:"Coinbase Wallet"}),"."]}),`
`]}),`
`,s.jsxs(e.li,{children:[`
`,s.jsxs(e.p,{children:[s.jsx(e.strong,{children:"Wallet Funding:"})," You'll need to fund your wallet with some Base Sepolia tokens. You can do this for free using the ",s.jsx(e.a,{href:"https://docs.base.org/docs/tools/network-faucets/",children:"Base Faucet"}),"."]}),`
`]}),`
`]}),`
`,s.jsxs(e.h2,{id:"about-irys",children:["About Irys",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#about-irys",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:[s.jsx(e.a,{href:"https://www.irys.xyz/",children:"Irys"})," is a datachain, a blockchain optimized for data storage. Data uploaded to Irys is:"]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Permanent and immutable"}),`
`,s.jsx(e.li,{children:"Onchain"}),`
`,s.jsx(e.li,{children:"Censorship-resistant"}),`
`,s.jsx(e.li,{children:"Blockchain agnostic"}),`
`,s.jsx(e.li,{children:"Unconstrained (you can upload files of any size)"}),`
`]}),`
`,s.jsx(e.p,{children:"When you store your NFT assets on Irys and mint them using a smart contract on Base, you can guarantee the NFT will be retrievable forever. Creators can rest assured that their works will endure indefinitely, while collectors can feel secure knowing their NFTs are permanently preserved."}),`
`,s.jsxs(e.h3,{id:"irys--base",children:["Irys + Base",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#irys--base",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Irys has a pay-once-store-forever model and accepts payment for storage using multiple tokens, including ETH on Base."}),`
`,s.jsxs(e.h2,{id:"mutability",children:['"Mutability"',s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mutability",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Data on Irys is permanent and immutable, but you use Irys's ",s.jsx(e.a,{href:"https://docs.irys.xyz/build/d/features/mutability",children:"mutability features"})," to simulate mutability and create dynamic NFTs that evolve based on onchain or offchain actions."]}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/dynamic-nfts/mutable-references.png",alt:"Overview"})}),`
`,s.jsx(e.p,{children:"Using Irys's mutability features, you create a single, static URL that is linked to a series of transactions. Then, you can add a new transaction to the series at any time, and the URL will always resolve to the most recent transaction."}),`
`,s.jsx(e.p,{children:"You'll mint your NFT using a mutable-style URL, and then push updates to that URL. The URL won't change, but the metadata it resolves to will."}),`
`,s.jsxs(e.h2,{id:"about",children:["About",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#about",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:'This tutorial focuses on creating a SuperMon NFT, similar to one used in a web3 game that would evolve during gameplay. The NFT starts with a basic appearance and can be "upgraded" twice. You will use the Irys CLI to "mutate" the metadata, simulating the automatic changes that would occur through player interactions in an actual game.'}),`
`,s.jsxs(e.h2,{id:"smart-contract",children:["Smart contract",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#smart-contract",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"You're building an NFT, which means you need a smart contract. Here's a simple one you can use to mint the NFT you'll create."}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// SPDX-License-Identifier: MIT"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"pragma"}),s.jsx(e.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:" solidity"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" ^0.8.0"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// Import OpenZeppelin's ERC721 and ERC721URIStorage contracts"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// These URLs are compatible with Remix IDE"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@openzeppelin/contracts/token/ERC721/ERC721.sol"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "@openzeppelin/contracts/access/Ownable.sol"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" SuperMon"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" is"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" ERC721URIStorage"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint256"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" private"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _tokenIdCounter;"})]}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // No arguments in the constructor, the owner will be the contract deployer"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    constructor"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() "}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"ERC721"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:'("SuperMon", "SMON") {'})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        _tokenIdCounter "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" 0"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // Mint function to create a new NFT"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    function"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" mint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"address"}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" to"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" memory"}),s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" uri"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"        uint256"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" tokenId "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _tokenIdCounter;"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        _tokenIdCounter "}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"+="}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" 1"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"        _safeMint"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(to, tokenId);"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"        _setTokenURI"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"(tokenId, uri);"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsxs(e.p,{children:["Deploy the smart contract using ",s.jsx(e.a,{href:"https://docs.base.org/tutorials/deploy-with-remix",children:"Remix"}),"."]}),`
`,s.jsxs(e.h2,{id:"irys-cli",children:["Irys CLI",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#irys-cli",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["You'll use the ",s.jsx(e.a,{href:"https://docs.irys.xyz/build/d/storage-cli/installation",children:"Irys CLI"})," to upload images and metadata."]}),`
`,s.jsxs(e.h3,{id:"installing-the-cli",children:["Installing the CLI",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installing-the-cli",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Install the Irys CLI globally using the ",s.jsx(e.code,{children:"-g"})," flag. Depending on your setup, you may need to use sudo."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" i"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -g"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" @irys/cli"})]})})})}),`
`,s.jsx(e.p,{children:"Or:"}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"sudo"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" npm"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" i"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -g"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" @irys/cli"})]})})})}),`
`,s.jsxs(e.h3,{id:"using-private-keys",children:["Using private keys",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-private-keys",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["When executing CLI commands involving funding and signing, you must provide a private key. Use the ",s.jsx(e.code,{children:"-w"})," flag to specify a private key along with the ",s.jsx(e.code,{children:"-t"})," flag to signal you're using ETH on Base."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"irys -w <base-private-key> -t base-eth"})})})})}),`
`,s.jsxs(e.h2,{id:"uploading-the-images",children:["Uploading the images",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#uploading-the-images",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/dynamic-nfts/all-characters.png",alt:"All NFTs"})}),`
`,s.jsxs(e.p,{children:[s.jsx(e.a,{href:"https://gateway.irys.xyz/MoOvEzePMwFgc_v6Gw3U8ovV6ostgrkWb9tS4baAJhc",children:"Download a zip containing PNGs"})," for each level, and save them on your local drive."]}),`
`,s.jsx(e.p,{children:"Next, fund Irys with 0.1 [Base Sepolia ETH] to pay for your uploads."}),`
`,s.jsxs(e.blockquote,{children:[`
`,s.jsxs(e.p,{children:["In all of these CLI examples, make sure to replace the value of the ",s.jsx(e.code,{children:"-w"})," parameter with your own private key."]}),`
`]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"irys fund 100000000000000000 \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -n devnet \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -t base-eth \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -w 6dd5e....54a120201cb6a \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --provider-url https://sepolia.base.org"})})]})})}),`
`,s.jsxs(e.blockquote,{children:[`
`,s.jsxs(e.p,{children:["The ",s.jsx(e.code,{children:"fund"})," command accepts a value in atomic units, 0.1 ETH is equal to 100000000000000000 in atomic units."]}),`
`]}),`
`,s.jsx(e.p,{children:"Next, use the Irys CLI to upload each of the images to the Irys Devnet."}),`
`,s.jsxs(e.blockquote,{children:[`
`,s.jsxs(e.p,{children:["Uploads to Irys's devnet are kept for ~60 days and are paid for using free tokens available from ",s.jsx(e.a,{href:"https://docs.base.org/docs/tools/network-faucets/",children:"faucets"}),"."]}),`
`]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"irys upload image-level-1.png \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -n devnet \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -t base-eth \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -w 6dd5e....54a120201cb6a \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --provider-url https://sepolia.base.org"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"irys upload image-level-2.png \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -n devnet \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -t base-eth \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -w 6dd5e....54a120201cb6a \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --provider-url https://sepolia.base.org"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"irys upload image-level-3.png \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -n devnet \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -t base-eth \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -w 6dd5e....54a120201cb6a \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --provider-url https://sepolia.base.org"})})]})})}),`
`,s.jsxs(e.h2,{id:"uploading-the-metadata",children:["Uploading the metadata",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#uploading-the-metadata",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Create three metadata files similar to the ones below. Make sure to change the value of the image field to match the URLs generated in the previous step."}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "name"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"SuperMon"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "symbol"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"SMON"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "image"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://gateway.irys.xyz/3JE8cucmpLkXK1t84QwqDRv25FTB2EJWCUgpWdtvuJZd"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "description"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"Super dooper, changing shapes, changing power"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "attributes"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": ["})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "trait_type"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"supermon-level"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "value"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"1"'})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  ]"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "name"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"SuperMon"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "symbol"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"SMON"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "image"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://gateway.irys.xyz/3JE8cucmpLkXK1t84QwqDRv25FTB2EJWCUgpWdtvuJZd"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "description"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"Super dooper, changing shapes, changing power"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "attributes"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": ["})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "trait_type"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"supermon-level"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "value"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"2"'})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  ]"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "name"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"SuperMon"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "symbol"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"SMON"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "image"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://gateway.irys.xyz/3JE8cucmpLkXK1t84QwqDRv25FTB2EJWCUgpWdtvuJZd"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "description"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"Super dooper, changing shapes, changing power"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "attributes"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": ["})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    {"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "trait_type"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"supermon-level"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "value"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"3"'})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  ]"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsxs(e.p,{children:["And upload ",s.jsx(e.strong,{children:"just the first file"})," using the Irys CLI."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"irys upload metadata-level-1.json \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -n devnet \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -t base-eth \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -w 6dd5e....54a120201cb6a \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --provider-url https://sepolia.base.org"})})]})})}),`
`,s.jsxs(e.p,{children:["The CLI will return a URL similar to ",s.jsx(e.code,{children:"https://gateway.irys.xyz/94TNg3UUKyZ96Dj8eSo9DVkBiivAz9jT39jjMFeTFvm3"}),". To convert that to a mutable-style URL, interpolate it by adding ",s.jsx(e.code,{children:"/mutable/"})," after the domain and before the transaction ID."]}),`
`,s.jsxs(e.p,{children:["Your final URL will be similar to ",s.jsx(e.code,{children:"https://gateway.irys.xyz/mutable/94TNg3UUKyZ96Dj8eSo9DVkBiivAz9jT39jjMFeTFvm3"}),"."]}),`
`,s.jsxs(e.h2,{id:"minting-the-nft",children:["Minting the NFT",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#minting-the-nft",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"To mint your NFT in Remix:"}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsx(e.li,{children:"Return to Remix."}),`
`,s.jsx(e.li,{children:'Under "Deployed Contracts", locate your contract and expand it to see its functions.'}),`
`,s.jsxs(e.li,{children:["Under the ",s.jsx(e.code,{children:"Mint"})," function, enter the wallet address you want to mint the NFT to and the metadata URL (e.g. ",s.jsx(e.code,{children:"https://gateway.irys.xyz/mutable/94TNg3UUKyZ96Dj8eSo9DVkBiivAz9jT39jjMFeTFvm3"}),") from the previous step."]}),`
`,s.jsx(e.li,{children:"Click Transact."}),`
`]}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/dynamic-nfts/open-sea-mockup.jpg",alt:"Image Level 3"})}),`
`,s.jsxs(e.p,{children:["You can now view the NFT on the ",s.jsx(e.a,{href:"https://testnets.opensea.io/accoun",children:"Opensea Testnet"}),"."]}),`
`,s.jsxs(e.h2,{id:"mutating-the-metadata",children:["Mutating the metadata",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mutating-the-metadata",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:['To now "mutate" the NFT, upload a new version of the metadata tagging it as having a ',s.jsx(e.code,{children:"Root-TX"})," equal to the transaction ID of your first transaction. In my example, I pass the value of ",s.jsx(e.code,{children:"94TNg3UUKyZ96Dj8eSo9DVkBiivAz9jT39jjMFeTFvm3"}),", however make sure to change this to match your unique transaction ID."]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"irys upload metadata-level-2.json \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -n devnet \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -t base-eth \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  -w 6dd5e....54a120201cb6a \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --tags Root-TX 94TNg3UUKyZ96Dj8eSo9DVkBiivAz9jT39jjMFeTFvm3 \\"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"  --provider-url https://rpc.sepolia.org"})})]})})}),`
`,s.jsx(e.p,{children:"Return to Opensea and request that it refresh your metadata."}),`
`,s.jsx(e.p,{children:s.jsx(e.img,{src:"/images/dynamic-nfts/refresh-metadata.png",alt:"Image Level 3"})}),`
`,s.jsx(e.p,{children:"Give it a few minutes and your updated NFT should be visible."}),`
`,s.jsxs(e.h2,{id:"free-metadata-uploads",children:["Free metadata uploads",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#free-metadata-uploads",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:'Uploads of less than 100 KiB are free on Irys, which is more than enough for most metadata files. This means projects can let users "evolve" their NFTs without having to pay gas fees.'}),`
`,s.jsxs(e.h2,{id:"caching",children:["Caching",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#caching",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"Wallets and NFT websites typically cache metadata to optimize performance, this can affect the visibility of updates to dynamic NFTs. While OpenSea offers a feature for users to manually request metadata refreshes, not all platforms provide this level of control. When building dynamic NFT projects, make sure to thoroughly test and understand the implications of caching on your platform."}),`
`,s.jsxs(e.h2,{id:"irys-sdk",children:["Irys SDK",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#irys-sdk",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["This tutorial used the Irys CLI to permanently upload data. Irys also has a JS-SDK that can be used on the ",s.jsx(e.a,{href:"https://docs.irys.xyz/build/d/quickstart",children:"server"})," and in the ",s.jsx(e.a,{href:"https://docs.irys.xyz/build/d/irys-in-the-browser",children:"browser"}),"."]}),`
`,s.jsxs(e.h2,{id:"conclusion",children:["Conclusion",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:"In this tutorial, you learned how to permanently upload data to Irys using their CLI and how to create a dynamic NFT. Data on Irys is onchain, permanent and immutable. When your NFT images and metadata are on Irys, you can guarantee to your users that the NFT will be retrievable forever."}),`
`,s.jsx(e.p,{children:"Dynamic NFTs are commonly used with gaming projects, similar to the one we built in this tutorial. However, there are countless other applications too. For example:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Points programs"}),": Create an NFT representing a user's participation in a points program. As the user earns more points, the NFT evolves."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Sports NFTs"}),": Create an NFT from a sports team that changes whenever the team wins an important game."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Holiday NFTs"}),": Create an NFT that changes seasonally to represent different holidays."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Activity tracking"}),": Create a health and wellness NFT that changes based on data from an activity tracker."]}),`
`]})]})}function t(i={}){const{wrapper:e}={...a(),...i.components};return e?s.jsx(e,{...i,children:s.jsx(n,{...i})}):n(i)}export{t as default,l as frontmatter};
