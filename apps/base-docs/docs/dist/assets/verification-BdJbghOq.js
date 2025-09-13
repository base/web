import{u as s,j as e}from"./index-Dlxm52NL.js";const r={title:"Verification",description:"undefined"};function t(n){const i={a:"a",code:"code",div:"div",h1:"h1",header:"header",img:"img",li:"li",p:"p",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"verification",children:["Verification",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#verification",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(i.p,{children:["Decentralized verification of participating apps’ authenticity using ",e.jsx(i.a,{href:"https://en.wikipedia.org/wiki/Well-known_URI",children:".well-known"})," data without centralized registry"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://developer.apple.com/documentation/xcode/supporting-associated-domains",children:"apple-app-site-association"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://developer.android.com/training/app-links/verify-site-associations",children:"assetlinks.json"})}),`
`]}),`
`,e.jsx(i.p,{children:"3rd party client apps make requests to the wallet through universal links, whose authenticity is verified by the OS."}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Wallet sends responses through universal links as well."}),`
`,e.jsx(i.li,{children:"Application ID passed by caller should match the information on their domain."}),`
`]}),`
`,e.jsxs(i.p,{children:["MWP host wallets load metadata from the iOS App Store / Android package manager with the client app's ",e.jsx(i.code,{children:"appId"}),"."]}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"img/handshake.png",alt:""})})]})}function o(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{o as default,r as frontmatter};
