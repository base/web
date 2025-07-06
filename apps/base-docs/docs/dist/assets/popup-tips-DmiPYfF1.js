import{u as t,j as e}from"./index-Dlxm52NL.js";const o={title:"Popup Tips",description:"undefined"};function r(i){const n={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"popup-tips",children:["Popup Tips",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#popup-tips",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[`When a Smart Wallet is connected and Coinbase Wallet SDK receives a request, it opens
`,e.jsx(n.a,{href:"https://keys.coinbase.com/",children:"keys.coinbase.com"}),` in a popup window and passes the request to the popup for handling.
Keep the following points in mind when working with the Smart Wallet popup.`]}),`
`,e.jsxs(n.h2,{id:"default-blocking-behavior",children:["Default blocking behavior",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#default-blocking-behavior",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Most modern browsers block all popups by default, unless they are triggered by a click."}),`
`,e.jsx(n.li,{children:"If a popup is blocked the browser shows a notification to the user, allowing them to manage popup settings."}),`
`]}),`
`,e.jsxs(n.h3,{id:"what-to-do-about-it",children:["What to do about it",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-to-do-about-it",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`Ensure there is no additional logic between the button click and the request to open the Smart Wallet popup,
as browsers might perceive the request as programmatically initiated.`}),`
`,e.jsx(n.li,{children:"If logic is unavoidable, keep it minimal and test thoroughly in all supported browsers."}),`
`]}),`
`,e.jsxs(n.h2,{id:"cross-origin-opener-policy",children:[e.jsx(n.code,{children:"Cross-Origin-Opener-Policy"}),e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cross-origin-opener-policy",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["If the Smart Wallet popup opens and displays an error or infinite spinner, it may be due to the dapp's ",e.jsx(n.code,{children:"Cross-Origin-Opener-Policy"}),". Be sure to use a directive that allows the Smart Wallet popup to function."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["✅ Allows Smart Wallet popup to function",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"unsafe-none"})," (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"same-origin-allow-popups"})," (recommended)"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["❌ Breaks Smart Wallet popup",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"same-origin"})}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["For more detailed information refer to the ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy",children:"MDN docs"}),"."]}),`
`,e.jsxs(n.h2,{id:"smart-wallet-popup-linger-behavior",children:["Smart Wallet popup 'linger' behavior",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#smart-wallet-popup-linger-behavior",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`Sometimes a dapp may programmatically make a followup request based on the response to a previous request.
Normally, browsers block these programmatic requests to open popups.`}),`
`,e.jsxs(n.li,{children:["To address this, after the Smart Wallet popup responds to a request, it will linger for 200ms to listen for another incoming request before closing.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If a request is received ",e.jsx(n.em,{children:"during"})," this 200ms window, it will be received and handled within the same popup window."]}),`
`,e.jsxs(n.li,{children:["If a request is received ",e.jsx(n.em,{children:"after"})," the 200ms window and the popup has closed, opening the Smart Wallet popup will be blocked by the browser."]}),`
`]}),`
`]}),`
`]})]})}function a(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{a as default,o as frontmatter};
