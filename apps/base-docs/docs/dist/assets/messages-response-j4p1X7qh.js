import{u as i,j as e}from"./index-Dlxm52NL.js";const a={title:"Response content",description:"undefined"};function r(n){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"response-content",children:["Response content",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#response-content",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(s.p,{children:["Response content can be either ",e.jsx(s.code,{children:"response"})," or ",e.jsx(s.code,{children:"failure"}),"."]}),`
`,e.jsxs(s.h2,{id:"response",children:[e.jsx(s.code,{children:"response"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#response",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:[`As long as the host wallet can derive a valid shared secret to decrypt the request from the sender and encrypt the response from itself,
the return message has `,e.jsx(s.code,{children:"response"})," as its ",e.jsx(s.code,{children:"content"}),"."]}),`
`,e.jsxs(s.p,{children:["The data of ",e.jsx(s.code,{children:"response"})," content are encrypted. More details on ",e.jsx(s.a,{href:"encryption",children:"encryption"}),"."]}),`
`,e.jsxs(s.h3,{id:"properties",children:["Properties",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#properties",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h4,{id:"requestid",children:[e.jsx(s.code,{children:"requestId"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#requestid",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"ID of the corresponding request"}),`
`,e.jsxs(s.h4,{id:"values",children:[e.jsx(s.code,{children:"values"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#values",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["Array of ",e.jsx(s.code,{children:"value"}),"s. More details on ",e.jsx(s.a,{href:"batch",children:"batch requests"}),"."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"Value"})," can be either:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"result"})," of JSON string type"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"error"})," with ",e.jsx(s.code,{children:"code"})," and ",e.jsx(s.code,{children:"message"})]}),`
`]}),`
`,e.jsxs(s.h3,{id:"example",children:["Example",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#example",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"coming soon"}),`
`,e.jsxs(s.h2,{id:"failure",children:[e.jsx(s.code,{children:"failure"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#failure",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"If the wallet fails to derive a valid shared secret, it returns a unencrypted failure message with following properties:"}),`
`,e.jsxs(s.h3,{id:"properties-1",children:["Properties",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#properties-1",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h4,{id:"requestid-1",children:[e.jsx(s.code,{children:"requestId"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#requestid-1",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"ID of the corresponding request"}),`
`,e.jsxs(s.h4,{id:"description",children:[e.jsx(s.code,{children:"description"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Error description"}),`
`,e.jsxs(s.h3,{id:"example-failure-response-message",children:["Example failure response message",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#example-failure-response-message",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "version"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"1.0.3"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "sender"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"lEC/X3K68rlgOoldMdk0D77738Y7W0mDbMMV5R6VyCE="'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "content"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "failure"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "requestId"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"B78F510E-DD5C-4477-8350-7550FAC7452E"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'      "description"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"Request denied"'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "timestamp"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"689611333.369556"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "uuid"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"E485820B-8F5E-4F8C-9A00-CE5B5B9C6F35"'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})})]})}function l(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{l as default,a as frontmatter};
