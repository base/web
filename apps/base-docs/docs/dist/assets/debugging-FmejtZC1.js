import{u as r,j as e}from"./index-Dlxm52NL.js";const l={title:"Common Issues & Debugging",description:"undefined"};function n(i){const s={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"common-issues--debugging",children:["Common Issues & Debugging",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#common-issues--debugging",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"This section outlines frequent issues encountered during the development of Mini Apps and how to resolve them."}),`
`,e.jsxs(s.h2,{id:"previews-not-rendering",children:["Previews Not Rendering",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#previews-not-rendering",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Issue:"})," The app embed does not appear when previewed."]}),`
`,e.jsx("img",{alt:"Manifest Embed Example",src:"/images/minikit/example_embed.png",height:"364"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Cause:"})," This is typically due to an incorrectly formatted or unreachable splashImageUrl in the farcaster.json manifest."]}),`
`,e.jsxs(s.h3,{id:"correct-format",children:["Correct Format",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#correct-format",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"splashImageUrl"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://www.example.com/splash_image.png"'})]})})})}),`
`,e.jsxs(s.h3,{id:"common-mistake",children:["Common Mistake",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#common-mistake",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"splashImageUrl"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://www.example.com//splash_image.png"'})]})})})}),`
`,e.jsxs(s.h3,{id:"best-practices",children:["Best Practices:",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#best-practices",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure the url is correct without typos. Double slashes, like seen above, will break the mini app preview."}),`
`,e.jsx(s.li,{children:"Ensure the image is hosted at a publicly accessible URL."}),`
`,e.jsx(s.li,{children:"Confirm that the image meets the requirements: 200x200 pixels, under 1MB, and in PNG or JPG format."}),`
`]}),`
`,e.jsxs(s.h3,{id:"preview-tool",children:["Preview Tool",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#preview-tool",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"To verify your embed, use the Warpcast Frame Developer Tool:"}),`
`,e.jsx(s.p,{children:e.jsx(s.a,{href:"https://warpcast.com/~/developers/mini-apps/embed",children:"Embed Debugging"})}),`
`,e.jsxs(s.h2,{id:"manifest-debugging-farcasterjson",children:["Manifest Debugging (farcaster.json)",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#manifest-debugging-farcasterjson",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["Ensure your domain's manifest at ",e.jsx(s.code,{children:"/.well-known/farcaster.json"})," is properly configured."]}),`
`,e.jsxs(s.h3,{id:"example-manifest",children:["Example Manifest",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#example-manifest",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "accountAssociation"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "header"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"BASE64_HEADER_STRING"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "payload"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"BASE64_PAYLOAD_STRING"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "signature"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"BASE64_SIGNATURE_STRING"'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "frame"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "version"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"next"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "name"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"MiniKit"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "iconUrl"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://example.com/icon.png"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "splashImageUrl"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://example.com/splash.png"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "splashBackgroundColor"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"#000000"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "homeUrl"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"https://your-app.com"'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsxs(s.h3,{id:"checklist",children:["Checklist:",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#checklist",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"The domain in the payload must match the domain serving the manifest."}),`
`,e.jsx(s.li,{children:"Ensure all asset URLs (icon, splash) are reachable and correctly formatted."}),`
`]}),`
`,e.jsxs(s.h2,{id:"incorrect-fid-or-signature-errors",children:["Incorrect FID or Signature Errors",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#incorrect-fid-or-signature-errors",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"This is often caused by a farcaster.json file that was signed using the wrong wallet. The signing wallet must match the custody address associated with your Farcaster account."}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Issue:"})," You encounter errors related to an invalid FID or failed signature validation."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Cause:"})," The signing wallet does not match the Farcaster custody wallet."]}),`
`,e.jsxs(s.h3,{id:"resolution",children:["Resolution",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#resolution",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"To sign with the correct identity, import your Farcaster custody key into an external wallet:"}),`
`,e.jsxs(s.aside,{"data-callout":"info",children:[e.jsx(s.p,{children:"To sign with the correct identity, import your Farcaster custody key into an external wallet:"}),e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Open the Warpcast mobile app"}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Navigate to: ",e.jsx(s.code,{children:"Settings → Advanced → Farcaster Recovery Phrase"})]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Copy the 24-word seed phrase"}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Import the phrase into a compatible wallet (e.g., Coinbase Wallet Mobile App, MetaMask or Rabby)"}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Use this wallet for signing the ",e.jsx(s.code,{children:"accountAssociation"})," payload"]}),`
`]}),`
`]})]}),`
`,e.jsxs(s.h3,{id:"manifest-signing-utility",children:["Manifest Signing Utility",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#manifest-signing-utility",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Run the following to initiate the manifest signing workflow:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" npx"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" create-onchain"}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" --manifest"})]})})})}),`
`,e.jsx(s.p,{children:"This CLI will open the signing UI in your browser and update local .env values automatically."}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsx(s.p,{children:"This is required for generating valid signed manifests that link your domain to your Farcaster identity."})}),`
`,e.jsxs(s.h2,{id:"developer-tools",children:["Developer Tools",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#developer-tools",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"warpcast-frame-debugger",children:["Warpcast Frame Debugger",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#warpcast-frame-debugger",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Preview how your Mini App renders inside Farcaster:"}),`
`,e.jsx(s.p,{children:e.jsx(s.a,{href:"https://warpcast.com/~/developers/frames",children:"Farcaster Debugging"})})]})}function d(i={}){const{wrapper:s}={...r(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(n,{...i})}):n(i)}export{d as default,l as frontmatter};
