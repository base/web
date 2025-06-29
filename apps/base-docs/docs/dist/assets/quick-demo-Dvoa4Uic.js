import{u as a,j as e,C as s}from"./index-Dlxm52NL.js";/* empty css                                */const o={title:"Quick Demo using OnchainKit",description:"undefined"};function t(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"quick-demo-using-onchainkit",children:["Quick Demo using OnchainKit",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#quick-demo-using-onchainkit",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.p,{children:["This option uses the OnchainKit ",e.jsx(n.a,{href:"/builderkits/onchainkit/wallet/wallet",children:"Wallet component"}),". It is perfect for quickly experiencing Smart Wallet functionality with minimal setup."]}),`
`,e.jsxs(s,{type:"info",children:[e.jsx(n.strong,{children:"What is OnchainKit?"}),e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://www.base.org/builders/onchainkit",children:"OnchainKit"}),`
is a suite of components allowing you to build
your onchain app fast and quick. It is a
very popular solution to build on Base. You can learn more about it `,e.jsx(n.a,{href:"/builderkits/onchainkit/getting-started",children:"here"}),"."]})]}),`
`,e.jsxs(n.h2,{id:"step-1-clone-the-template-repository",children:["Step 1: Clone the Template Repository",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#step-1-clone-the-template-repository",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Let's start by cloning the ",e.jsx(n.a,{href:"https://github.com/coinbase/onchain-app-template",children:"repository"}),". Open a terminal and execute the following:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"git"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" clone"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://github.com/coinbase/onchain-app-template"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"cd"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" onchain-app-template"})]})]})})}),`
`,e.jsxs(n.h2,{id:"step-2-set-up-environment-variables",children:["Step 2: Set Up Environment Variables",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#step-2-set-up-environment-variables",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Before running your project, you need to set up your environment variables. Follow these steps:"}),`
`,e.jsxs(n.h3,{id:"get-a-reown-project-id",children:["Get a ReOwn Project ID",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#get-a-reown-project-id",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Sign up to ",e.jsx(n.a,{href:"https://www.reown.com/cloud",children:"ReOwn Cloud"})]}),`
`,e.jsxs(n.li,{children:["Click on Create, and go through the steps (screenshot below):",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Name your app (eg. OnchainKit-Template)"}),`
`,e.jsx(n.li,{children:"Select a product - Choose WalletKit"}),`
`,e.jsx(n.li,{children:"Select a platform - Choose JavaScript"}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("img",{alt:"ReOwn Project ID",src:"/images/smart-wallet/ReownSteps.png",width:"1000",loading:"lazy"}),e.jsx("em",{children:"Screenshot of the steps to get your ReOwn Project ID"})]}),`
`,e.jsxs(n.h3,{id:"get-a-coinbase-developer-platform-cdp-client-api-key",children:["Get a Coinbase Developer Platform (CDP) Client API Key",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#get-a-coinbase-developer-platform-cdp-client-api-key",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Sign up to ",e.jsx(n.a,{href:"https://portal.cdp.coinbase.com/",children:"Coinbase Developer Platform (CDP)"})]}),`
`,e.jsxs(n.li,{children:["Create a new project and copy the ",e.jsx(n.a,{href:"https://portal.cdp.coinbase.com/projects/api-keys/client-key",children:"Client API Key"})," (screenshot below)"]}),`
`]}),`
`,e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("img",{alt:"Coinbase Developer Platform Client API Key",src:"/images/smart-wallet/CDPSteps.png",width:"1000",loading:"lazy"}),e.jsx("em",{children:"Coinbase Developer Platform Client API Key"})]}),`
`,e.jsxs(n.h3,{id:"create-your-env-file",children:["Create your .env file",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#create-your-env-file",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Now that you have obtained your ReOwn Project ID and CDP API Key, it is time to create the .env file:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Copy ",e.jsx(n.code,{children:".env.local.default"})," from to the repository root and name it ",e.jsx(n.code,{children:".env"})]}),`
`,e.jsxs(n.li,{children:["Leave ",e.jsx(n.code,{children:"NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"})," and ",e.jsx(n.code,{children:"NEXT_PUBLIC_ENVIRONMENT"})," as they are"]}),`
`,e.jsxs(n.li,{children:["Replace ",e.jsx(n.code,{children:"NEXT_PUBLIC_CDP_API_KEY"})," and ",e.jsx(n.code,{children:"NEXT_PUBLIC_WC_PROJECT_ID"})," with their respective values obtained from the previous steps"]}),`
`]}),`
`,e.jsx(n.p,{children:"Congratulations! We are ready to run the application."}),`
`,e.jsxs(n.h2,{id:"step-3-install-dependencies-and-run",children:["Step 3: Install Dependencies and Run",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#step-3-install-dependencies-and-run",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Open your terminal, make sure you are at the directory ",e.jsx(n.code,{children:"/onchain-app-template"})," and execute the following:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Install packages"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"bun"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" i"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Run Next app"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"bun"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" run"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" dev"})]})]})})}),`
`,e.jsxs(s,{type:"warning",children:[e.jsx(n.strong,{children:"Make sure Bun is installed"}),e.jsxs(n.p,{children:["This example uses ",e.jsx(n.a,{href:"https://bun.sh/",children:"Bun"})," as a preferred package manager. If you run into an error because you don't have Bun installed you can run the following command to install it:"]}),e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -fsSL"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://bun.sh/install"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" |"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" bash"})]})})})})]}),`
`,e.jsxs(n.p,{children:["Your app will be available at ",e.jsx(n.a,{href:"http://localhost:3000",children:"http://localhost:3000"})]}),`
`,e.jsxs(n.h2,{id:"step-4-explore-smart-wallet-features",children:["Step 4: Explore Smart Wallet Features",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#step-4-explore-smart-wallet-features",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The template includes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Pre-integrated Wallet component"}),`
`,e.jsx(n.li,{children:"OnchainKit components for blockchain interactions"}),`
`,e.jsx(n.li,{children:"Basic authentication flow"}),`
`,e.jsx(n.li,{children:"Transaction handling (NFT Mint)"}),`
`]}),`
`,e.jsx(n.p,{children:"This setup is ideal for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Beginners exploring onchain apps and Smart Wallet functionality"}),`
`,e.jsx(n.li,{children:"Developers evaluating Smart Wallet capabilities"}),`
`,e.jsx(n.li,{children:"Quick prototyping"}),`
`]}),`
`,e.jsxs(n.p,{children:["If you are looking for a more in depth understanding of Smart Wallet, jump ahead to the ",e.jsx(n.a,{href:"/identity/smart-wallet/quickstart#explore-more-features",children:"Explore More Features"})," section."]})]})}function c(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{c as default,o as frontmatter};
