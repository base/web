import{u as s,j as t}from"./index-Dlxm52NL.js";const r={title:"Paymaster Security",sidebar_label:"Security",slug:"security"};function o(n){const e={a:"a",div:"div",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"It is important to understand where you are using your Paymaster endpoint as anyone who has your key can send requests to sponsor transactions."}),`
`,t.jsx(e.p,{children:"We strongly recommend setting up a contract allowlist on your paymaster configuration which will lock down your paymaster to only sponsor transactions on your wallet."}),`
`,t.jsx(e.p,{children:"Further security measures such as setting up a paymaster Proxy so that your api key is not leaked is also recommended."}),`
`,t.jsx(e.p,{children:"If you are in a situation where you can not add a contract allowlist due to dynamic calls to contracts that are not on policy then you must set up a paymaster proxy on your backend such that your api token does not get leaked."}),`
`,t.jsx(e.p,{children:"Set sponsorship limits to further ensure you're only sponsoring what you want to."}),`
`,t.jsxs(e.h2,{id:"paymaster-proxy",children:["Paymaster Proxy",t.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#paymaster-proxy",children:t.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,t.jsx(e.p,{children:"Creating an API to proxy calls to your paymaster service is important for two reasons."}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Allows you to protect any API secret."}),`
`,t.jsx(e.li,{children:"Allows you to add extra validation on what requests you want to sponsor."}),`
`]}),`
`,t.jsxs(e.p,{children:["You can see more details on implementing a paymaster proxy at ",t.jsx(e.a,{href:"https://www.smartwallet.dev/guides/paymasters",children:"smartwallet.dev"}),"."]})]})}function i(n={}){const{wrapper:e}={...s(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(o,{...n})}):o(n)}export{i as default,r as frontmatter};
