import{u as i,j as s}from"./index-Dlxm52NL.js";const a={title:"eth_getProof",description:"undefined"};function r(n){const e={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...i(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"eth_getproof",children:["eth_getProof",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#eth_getproof",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(e.p,{children:["Defined in ",s.jsx(e.a,{href:"https://eips.ethereum.org/EIPS/eip-1186",children:"EIP-1186"})]}),`
`,s.jsxs(e.blockquote,{children:[`
`,s.jsx(e.p,{children:"Returns the account and storage values of the specified account including the Merkle-proof."}),`
`]}),`
`,s.jsxs(e.h2,{id:"parameters",children:["Parameters",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameters",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"type"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" GetProofParams"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ["}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[], "}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"]"})]})})})}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsx(e.li,{children:"The address of the account"}),`
`,s.jsx(e.li,{children:"Array of storage-keys which should be proofed and included"}),`
`,s.jsx(e.li,{children:"Block number or tag (as hexadecimal string)"}),`
`]}),`
`,s.jsxs(e.h2,{id:"returns",children:["Returns",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#returns",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(s.Fragment,{children:s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"interface"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" ProofResult"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * The address of the account being proved."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  address"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * The balance of the account."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  balance"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * The hash of the code of the account."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  codeHash"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * The nonce of the account."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  nonce"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * The storage hash of the account."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  storageHash"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * Array of storage entries as requested."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  storageProof"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" StorageProofEntry"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[]"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})}),`
`,s.jsx(e.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"interface"}),s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" StorageProofEntry"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * The storage key."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  key"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * The storage value."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  value"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  /**"})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   * Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node."})}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"   */"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"  proof"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:":"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" string"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[]"})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,s.jsxs(e.h2,{id:"errors",children:["Errors",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#errors",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.table,{children:[s.jsx(e.thead,{children:s.jsxs(e.tr,{children:[s.jsx(e.th,{children:"Code"}),s.jsx(e.th,{children:"Message"})]})}),s.jsx(e.tbody,{children:s.jsxs(e.tr,{children:[s.jsx(e.td,{children:"4200"}),s.jsx(e.td,{children:"Unsupported method"})]})})]})]})}function c(n={}){const{wrapper:e}={...i(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(r,{...n})}):r(n)}export{c as default,a as frontmatter};
