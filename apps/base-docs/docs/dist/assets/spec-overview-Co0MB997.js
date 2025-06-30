import{u as r,j as e}from"./index-Dlxm52NL.js";const s={title:"Overview",slug:"spec",description:"undefined"};function i(n){const t={a:"a",div:"div",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.header,{children:e.jsxs(t.h1,{id:"overview",children:["Overview",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(t.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(t.h2,{id:"mobile-wallet-protocol",children:["Mobile Wallet Protocol",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mobile-wallet-protocol",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"spec/img/overview.png",alt:""})}),`
`,e.jsx(t.p,{children:`MWP is a protocol to allow mobile web3 apps to interact with wallet apps and access users' web3 accounts.
It creates a direct channel between client and wallet apps, removing the need for an intermediary bridge or relay server.`}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Simple: The messages sent by the client app are called requests and the ones returned by the wallet host are called responses."}),`
`,e.jsx(t.li,{children:"Direct: The protocol uses deep links as its transport layer to let participating apps deliver messages directly to their peer without external entities such as a bridge server."}),`
`,e.jsx(t.li,{children:"Secure: It provides an encrypted P2P communication channel between client and server (wallet host) to exchange discrete stateless messages."}),`
`,e.jsx(t.li,{children:"Efficient: Reduces the number of hops between client applications and wallet via support for batch requests."}),`
`,e.jsx(t.li,{children:"Decentralized and reliable: It defines a decentralized verification procedure to check authenticity of each other using well-known URI standard for universal link without a centralized registry."}),`
`]})]})}function l(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{l as default,s as frontmatter};
