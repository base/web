import{u as s,j as e}from"./index-Dlxm52NL.js";const r={title:"Signature Verification",description:"undefined"};function t(n){const i={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",span:"span",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"signature-verification",children:["Signature Verification",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#signature-verification",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(i.p,{children:`There are important details to verifying smart contract wallet signatures. The smart contract itself
cannot produce a signature. Instead, the contract has a function`}),`
`,e.jsx(e.Fragment,{children:e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"function"}),e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" isValidSignature"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"bytes32"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _hash, "}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"bytes"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" memory"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _signature) "}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"returns"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"bytes4"}),e.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" magicValue"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:");"})]})})})}),`
`,e.jsxs(i.p,{children:["which can be called to determine if signature should be considered valid (defined in ",e.jsx(i.a,{href:"https://eips.ethereum.org/EIPS/eip-1271",children:"EIP-1271"}),")."]}),`
`,e.jsxs(i.p,{children:[`In the case of Smart Wallet, a signature is considered valid if it was signed by a current signer (aka "owner") of the Smart Wallet.
For example, a user can sign a message with their passkey, and when `,e.jsx(i.code,{children:"isValidSignature"}),` is called on their Smart Wallet,
it would return that the signature is valid because their passkey is an owner.`]}),`
`,e.jsx(i.p,{children:`There is also an additional complexity: users receive their Smart Wallet address immediately upon passkey registration,
and are able to begin signing for their Smart Wallet,
but their Smart Wallet is not deployed on a chain until the first transaction on that chain.`}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"https://eips.ethereum.org/EIPS/eip-6492",children:"ERC-6492"})," describes"]}),`
`,e.jsxs(i.blockquote,{children:[`
`,e.jsx(i.p,{children:`With the rising popularity of account abstraction, we often find that the best user experience
for contract wallets is to defer contract deployment until the first user transaction,
therefore not burdening the user with an additional deploy step before they can use their account.
However, at the same time, many dApps expect signatures, not only for interactions, but also just for logging in.`}),`
`]}),`
`,e.jsx(i.p,{children:`So the challenge is, how do we verify signatures in a way that works for both deployed and undeployed Smart Wallets?
ERC-6492 has a solution for this, which Smart Wallet has adopted.
We won't go unto all the details here, read the ERC linked above, if you're looking for that.
Below we cover the minimum work needed to support on and off chain signature validation for Smart Wallet.`}),`
`,e.jsxs(i.h2,{id:"offchain",children:["Offchain",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#offchain",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[`For purely offchain signature verification––such as "Sign-In With Ethereum"––ensure you are using
a ERC-6492-compliant signature verification library.
We recommend Viem's `,e.jsx(i.a,{href:"https://viem.sh/docs/actions/public/verifyMessage#verifymessage",children:e.jsx(i.code,{children:"verifyMessage"})})," (",e.jsx(i.a,{href:"https://github.com/base/demos/blob/master/smart-wallet/wagmi-demo/src/components/SignMessage.tsx",children:"example"}),`)
and `,e.jsx(i.a,{href:"https://viem.sh/docs/actions/public/verifyTypedData",children:"verifyTypedData"})," (",e.jsx(i.a,{href:"https://github.com/base/demos/blob/master/smart-wallet/wagmi-demo/src/components/TypedSign.tsx",children:"example"}),")."]}),`
`,e.jsxs(i.h2,{id:"onchain",children:["Onchain",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#onchain",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["For signatures that will be used onchain, such as with ",e.jsx(i.a,{href:"https://github.com/Uniswap/permit2",children:"Permit2"}),`
or `,e.jsx(i.a,{href:"https://github.com/ProjectOpenSea/seaport",children:"Seaport"}),` developers will need to inspect the signature offchain
and remove unneeded ERC-6492 data, if it is present.
We recommend using the `,e.jsx(i.a,{href:"https://viem.sh/docs/utilities/parseErc6492Signature#parseerc6492signature",children:"parseErc6492Signature"}),`
util from Viem.`]})]})}function o(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{o as default,r as frontmatter};
