import{u as t,j as e}from"./index-Dlxm52NL.js";const i={title:"personal_sign",description:"undefined"};function s(r){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"personal_sign",children:["personal_sign",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#personal_sign",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.p,{children:["Defined in ",e.jsx(n.a,{href:"https://eips.ethereum.org/EIPS/eip-191",children:"EIP-191"})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Signs data using a specific account. This method calculates an Ethereum specific signature with: ",e.jsx(n.code,{children:'sign(keccak256("\\x19Ethereum Signed Message:\\n" + len(message) + message)))'}),"."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"parameters",children:["Parameters",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameters",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Array<string, string>"})}),`
`,e.jsx(n.p,{children:"An array containing two elements:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"The data to sign, in hexadecimal format"}),`
`,e.jsx(n.li,{children:"The address of the account that should sign the data"}),`
`]}),`
`,e.jsxs(n.h2,{id:"returns",children:["Returns",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#returns",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"string"})}),`
`,e.jsx(n.p,{children:"A signature string in hexadecimal format."}),`
`,e.jsxs(n.h2,{id:"errors",children:["Errors",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#errors",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Code"}),e.jsx(n.th,{children:"Message"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"4001"}),e.jsx(n.td,{children:"User denied signature request"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"4100"}),e.jsx(n.td,{children:"Requested method not supported"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"4200"}),e.jsx(n.td,{children:"Wallet not connected"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"4300"}),e.jsx(n.td,{children:"Invalid parameters"})]})]})]})]})}function a(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{a as default,i as frontmatter};
