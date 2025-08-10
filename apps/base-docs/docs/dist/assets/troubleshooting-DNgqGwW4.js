import{u as r,j as n}from"./index-Dlxm52NL.js";const d={title:"Troubleshooting",description:"undefined"};function e(i){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(s.header,{children:n.jsxs(s.h1,{id:"troubleshooting",children:["Troubleshooting",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#troubleshooting",children:n.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,n.jsxs(s.p,{children:["This guide covers common issues you may encounter while using OnchainKit. If you don't find your issue here, try searching our ",n.jsx(s.a,{href:"https://github.com/coinbase/onchainkit/issues",children:"GitHub Issues"})," or joining our ",n.jsx(s.a,{href:"https://discord.gg/invite/cdp",children:"Discord Community"}),"."]}),`
`,n.jsxs(s.h2,{id:"common-issues",children:["Common Issues",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#common-issues",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.h3,{id:"environment-setup",children:["Environment Setup",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#environment-setup",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Missing API Key"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "Project ID is required for this component"'}),`
`,n.jsxs(s.li,{children:["Solution: Add your Client API Key to ",n.jsx(s.code,{children:".env"}),":"]}),`
`]}),`
`,n.jsx(n.Fragment,{children:n.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:n.jsx(s.code,{children:n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"NEXT_PUBLIC_CDP_API_KEY"}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"YOUR_PUBLIC_API_KEY"})]})})})}),`
`]}),`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Invalid Environment Variables"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "Cannot find environment variable"'}),`
`,n.jsxs(s.li,{children:["Solution: Use the correct variable name for your framework:",`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["Next.js: ",n.jsx(s.code,{children:"NEXT_PUBLIC_CDP_API_KEY"})]}),`
`,n.jsxs(s.li,{children:["Vite: ",n.jsx(s.code,{children:"VITE_PUBLIC_ONCHAINKIT_API_KEY"})]}),`
`,n.jsxs(s.li,{children:["Astro: ",n.jsx(s.code,{children:"PUBLIC_ONCHAINKIT_API_KEY"})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Contracts Not Available"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "Contracts are not available" or "Contracts not available for LifecycleStatus"'}),`
`,n.jsxs(s.li,{children:["Solutions:",`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["Verify ",n.jsx(s.code,{children:"NEXT_PUBLIC_ONCHAINKIT_API_KEY"})," is set correctly"]}),`
`,n.jsxs(s.li,{children:["For Checkout component with ",n.jsx(s.code,{children:"chargeHandler"}),", also set:",`
`,n.jsx(n.Fragment,{children:n.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:n.jsx(s.code,{children:n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY"}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"YOUR_COMMERCE_API_KEY"})]})})})}),`
`]}),`
`,n.jsx(s.li,{children:"Ensure API keys are properly exposed in your environment"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.h3,{id:"dependencies",children:["Dependencies",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dependencies",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Version Compatibility"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"Issue: Unexpected behavior or type errors"}),`
`,n.jsxs(s.li,{children:["Solution: Ensure compatible versions:",`
`,n.jsx(n.Fragment,{children:n.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:n.jsxs(s.code,{children:[n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{"})}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'  "dependencies"'}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": {"})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "@coinbase/onchainkit"'}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),n.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"latest"'}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "viem"'}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),n.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"^2.0.0"'}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:'    "@wagmi/core"'}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:": "}),n.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"^2.0.0"'})]}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  }"})}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.h3,{id:"provider-configuration",children:["Provider Configuration",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#provider-configuration",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Missing OnchainKitProvider"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "OnchainKit context not found"'}),`
`,n.jsxs(s.li,{children:["Solution: Wrap your app with OnchainKitProvider and ",n.jsx(s.a,{href:"/builderkits/onchainkit/getting-started",children:"configure"})," properly:"]}),`
`]}),`
`,n.jsx(n.Fragment,{children:n.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:n.jsxs(s.code,{children:[n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { OnchainKitProvider } "}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),n.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" '@coinbase/onchainkit'"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"import"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" { base } "}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"from"}),n.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" 'viem/chains'"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,n.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"export"}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" default"}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" function"}),n.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" App"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"({ "}),n.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"children"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" }) {"})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"  return"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    <"}),n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"OnchainKitProvider"})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"      apiKey"}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{process.env."}),n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"NEXT_PUBLIC_CDP_API_KEY"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"      chain"}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"{base}"})]}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    >"})}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"      {children}"})}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    </"}),n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"OnchainKitProvider"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:">"})]}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  );"})}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`]}),`
`]}),`
`,n.jsxs(s.h3,{id:"wallet-connection",children:["Wallet Connection",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#wallet-connection",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Connection Failed"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "Unable to connect wallet"'}),`
`,n.jsxs(s.li,{children:["Solutions:",`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"Verify wallet extension is installed and unlocked"}),`
`,n.jsxs(s.li,{children:["Check ",n.jsx(s.a,{href:"/builderkits/onchainkit/wallet/wallet",children:"supported chains configuration"})]}),`
`,n.jsx(s.li,{children:"Ensure proper network selection in wallet"}),`
`,n.jsx(s.li,{children:"Verify RPC endpoints are accessible"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Chain Switching Issues"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "Failed to switch chain"'}),`
`,n.jsxs(s.li,{children:["Solutions:",`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"Verify chain ID is supported by OnchainKit"}),`
`,n.jsx(s.li,{children:"Check wallet has required permissions"}),`
`,n.jsx(s.li,{children:"Ensure RPC endpoints are configured correctly"}),`
`,n.jsx(s.li,{children:"Add chain to wallet if not already added"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.h3,{id:"transaction-issues",children:["Transaction Issues",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#transaction-issues",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Gas Estimation Failed"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "Gas estimation failed"'}),`
`,n.jsxs(s.li,{children:["Solutions:",`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"Verify sufficient balance for gas"}),`
`,n.jsx(s.li,{children:"Check transaction parameters are valid"}),`
`,n.jsxs(s.li,{children:["Ensure proper network ",n.jsx(s.a,{href:"/builderkits/onchainkit/transaction/transaction",children:"configuration"})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.h3,{id:"identity-components",children:["Identity Components",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#identity-components",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.h3,{id:"theme-issues",children:["Theme Issues",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#theme-issues",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Dark Mode Not Working"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:'Error: "Dark mode styles not applying"'}),`
`,n.jsx(s.li,{children:"Solution: Configure Tailwind and OnchainKit properly:"}),`
`]}),`
`,n.jsx(n.Fragment,{children:n.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:n.jsxs(s.code,{children:[n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// tailwind.config.js"})}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"module"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"."}),n.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"exports"}),n.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  darkMode: ["}),n.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'class'"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"],"})]}),`
`,n.jsxs(s.span,{className:"line",children:[n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  safelist: ["}),n.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'dark'"}),n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"],"})]}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"  // ... rest of config"})}),`
`,n.jsx(s.span,{className:"line",children:n.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`]}),`
`]}),`
`,n.jsxs(s.h3,{id:"react-native",children:["React Native",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#react-native",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["** React Native Support **",`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["OnchainKit's components are not supported for use in React Native, however, you can use utility functions, like ",n.jsx(s.code,{children:"getName"}),", as well as some hooks in your React Native app. When using these utility functions, you may need to import them directly rather than through the export file."]}),`
`,n.jsxs(s.li,{children:["Example: ",n.jsx(s.code,{children:"import { getName } from '@coinbase/onchainkit/esm/identity/utils/getName.js';"})," rather than ",n.jsx(s.code,{children:"import { getName } from '@coinbase/onchainkit/identity;"})]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.h3,{id:"module-resolution",children:["Module Resolution",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#module-resolution",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.strong,{children:"Module Resolution Errors"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:`Error: "Cannot find module ... or its corresponding type declarations. Consider updating to 'node16', 'nodenext', or 'bundler'"`}),`
`,n.jsxs(s.li,{children:["Solution: Update your Node.js version or use a compatible bundler. We recommend using Node 18+ and ",n.jsx(s.code,{children:'"moduleResolution": "NodeNext"'})," for the best developer experience. OnchainKit supports only ES Modules and does not support CommonJS modules."]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(s.h2,{id:"getting-help",children:["Getting Help",n.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getting-help",children:n.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,n.jsx(s.p,{children:"Need more help?"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:n.jsx(s.a,{href:"https://discord.gg/invite/cdp",children:"Discord Community"})}),`
`,n.jsx(s.li,{children:n.jsx(s.a,{href:"https://x.com/onchainkit",children:"X/Twitter Support"})}),`
`,n.jsx(s.li,{children:n.jsx(s.a,{href:"https://github.com/coinbase/onchainkit/issues",children:"GitHub Issues"})}),`
`]})]})}function a(i={}){const{wrapper:s}={...r(),...i.components};return s?n.jsx(s,{...i,children:n.jsx(e,{...i})}):e(i)}export{a as default,d as frontmatter};
