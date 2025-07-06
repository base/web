import{u as r,j as e}from"./index-Dlxm52NL.js";const a={title:"Builder Anniversary NFT",description:"A comprehensive list of L2 contract addresses for Base Mainnet and Base Testnet, including links to their respective blockchain explorers."};function i(n){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"builder-anniversary-nft",children:["Builder Anniversary NFT",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#builder-anniversary-nft",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:`In 2023, we launched an onchain Builder Quest shortly after we brought Base to
testnet. Builders who completed the quest got a commemorative NFT on Base testnet
designed by Andre Oshea. Our vision was to enable builders to keep a piece of
onchain history with them as the earliest Base builders.`}),`
`,e.jsx(s.p,{children:`Since the anniversary of the Quest in 2024, holders of the testnet NFT have been
able to claim a commemorative NFT on Base mainnet:`}),`
`,e.jsx("div",{className:"w-80 mx-auto",children:e.jsx("img",{alt:"Builder Anniversary NFT",src:"/images/builder-anniversary-nft/builder-anniversary-nft-preview.webp"})}),`
`,e.jsxs(s.h2,{id:"faq",children:["FAQ",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#faq",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.strong,{children:"Who is Andre Oshea?"}),`
`,e.jsx(s.p,{children:`Andre Oshea is a digital 3D artist who makes art for those “who want to build
the future.” Andre's art explores new worlds and realities, and inspires people
to think about the possibilities of the future - exactly the type of curiosity
and inspiration that we're hoping to spark among Based builders.`}),`
`,e.jsx(s.strong,{children:"Who is eligible to claim the Base Quest Anniversary NFT?"}),`
`,e.jsx(s.p,{children:`Builders who completed last year's onchain quest and claimed the Base Goerli
testnet NFT. (Please make sure you're connecting the same wallet that holds the
testnet NFT, otherwise you won't be able to claim.)`}),`
`,e.jsx(s.strong,{children:"How do I claim my NFT?"}),`
`,e.jsx(s.p,{children:"For builders like you, it's easy!"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"First, pull the Merkel proof associated with your wallet address:"}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -X"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" POST"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -H"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "Content-Type: application/json"'}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -d"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:` '{"address":"<<YOUR_WALLET_ADDRESS>>"}'`}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" \\"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://www.base.org/api/checkNftProof"})})]})})}),`
`,e.jsxs(s.ol,{start:"2",children:[`
`,e.jsxs(s.li,{children:[`This curl returns JSON but the NFT contract expects raw hex values. So you'll
need to parse the JSON, extract the `,e.jsx(s.code,{children:"result"}),` array, and convert each value to
raw hex.`]}),`
`]}),`
`,e.jsx(s.p,{children:"API response format:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'   "result"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:":["}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0x123...ABC"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0x456...ZYX"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0x789...MNO"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"0x000...PQR"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"]"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsx(s.p,{children:"NFT contract format:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"["}),e.jsx(s.span,{style:{color:"#032F62",textDecoration:"underline","--shiki-dark":"#DBEDFF","--shiki-dark-text-decoration":"underline"},children:"0x123...ABC,0x456...ZYX,0x789...MNO,0x000...PQR"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"]"})]})})})}),`
`,e.jsxs(s.ol,{start:"3",children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Next, navigate to the Basescan page for the ",e.jsx(s.a,{href:"https://basescan.org/token/0x8DC80A209A3362f0586e6C116973Bb6908170c84#writeContract",children:"Base Builder NFT"})]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:'Connect your wallet by clicking the "Connect to Web3" button.'}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Under the ",e.jsx(s.code,{children:"mint"}),` method, paste the formatted Merkle proof from step 2 into the
`,e.jsx(s.code,{children:"proof"})," parameter."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:'Click "Write" and confirm the transaction in your wallet.'}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"That's it! Your NFT will be minted and appear in your wallet."}),`
`]}),`
`]}),`
`,e.jsx(s.strong,{children:"Why can't I claim my NFT?"}),`
`,e.jsx(s.p,{children:`Only builders who completed 2023's onchain quest and claimed the NFT on the Base
Goerli testnet are eligible to claim the mainnet NFT. Please use the wallet that
holds the testnet NFT, otherwise you won't be able to claim.`}),`
`,e.jsx(s.strong,{children:"I'm bummed to miss the chance. Will Base do more NFTs?"}),`
`,e.jsx(s.p,{children:`Yes! While there is only one Base Quest Anniversary NFT (for those who have
completed 2023's quest), the Base team as well as Based artists worldwide
continue to create and distribute digital collectibles that showcase their
creativity. Follow Base on X and Warpcast for updates around upcoming mints, and
join the /base channel to catch mints from the community.`}),`
`,e.jsx(s.strong,{children:"What is the value of the NFT? The benefit of me holding one?"}),`
`,e.jsx(s.p,{children:`This special commemorative NFT is only for the earliest Base builders and holds
no other value.`}),`
`,e.jsx(s.strong,{children:"Where should I go for support/questions?"}),`
`,e.jsx(s.p,{children:`For any support and questions, please join the Base Discord and visit the
#general-support channel.`}),`
`,e.jsxs(s.h2,{id:"disclaimer",children:["Disclaimer",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#disclaimer",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:`You acknowledge that ownership of the NFT does not carry with it any rights,
express or implied, including (without limitation) copyright, trademarks or
other intellectual property or proprietary rights in and to the underlying
artwork. The copyright to the digital artwork remains with the copyright holder.`}),`
`,e.jsx(s.p,{children:`The NFT may in the future provide utility tied to unique goods, services or
experiences; however, we disclaim any investment, resale or speculation related
to the NFT. There can be no assurance as to their present or future value,
transferability or marketability.`})]})}function l(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{l as default,a as frontmatter};
