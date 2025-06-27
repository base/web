import{u as r,j as e}from"./index-Dlxm52NL.js";const t={title:"Deploy an Onchain App with Fleek",description:"Learn how to deploy an onchain app using Fleek.",authors:["briandoyle81"],tags:["frontend"],difficulty:"hard",hide_table_of_contents:!1,image:"https://docs.base.org/img/base-learn-open-graph.png"};function i(s){const n={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"deploy-an-onchain-app-with-fleek",children:["Deploy an Onchain App with Fleek",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deploy-an-onchain-app-with-fleek",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:`One of the "secrets" of onchain apps is that they almost always have a very large web2 component that they're dependent on. Most onchain apps rely on traditional infrastructure for their frontends, APIs, and other parts of the architecture.`}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://fleek.xyz",children:"Fleek"}),"'s goal is to address this issue with the ",e.jsx(n.a,{href:"https://fleek.xyz/blog/announcements/introducing-fleek-network-and-fleek-xyz/",children:"Fleek Network"}),", a fast and trustless Content Delivery Network (CDN)."]}),`
`,e.jsxs(n.p,{children:["In this tutorial, you'll use ",e.jsx(n.a,{href:"https://fleek.xyz",children:"Fleek"})," to deploy a site built with the ",e.jsx(n.a,{href:"https://github.com/coinbase/onchain-app-template",children:"Onchain App Template"}),"."]}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this tutorial you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Deploy a ",e.jsx(n.a,{href:"https://nextjs.org/",children:"Next.js"})," using the Coinbase ",e.jsx(n.a,{href:"https://www.smartwallet.dev/why",children:"Smart Wallet"})," on ",e.jsx(n.a,{href:"https://fleek.xyz",children:"Fleek"})]}),`
`,e.jsx(n.li,{children:"Integrate with [Github] for CI/CD"}),`
`]}),`
`,e.jsxs(n.h2,{id:"prerequisites",children:["Prerequisites",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#prerequisites",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"nextjs",children:["Next.js",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#nextjs",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["You should be familiar with ",e.jsx(n.a,{href:"https://nextjs.org/",children:"Next.js"}),", but do not need to be an expert. If you are comfortable with other React libraries, the pattern should be relatively easy to follow."]}),`
`,e.jsxs(n.h3,{id:"onchain-apps",children:["Onchain Apps",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#onchain-apps",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The tutorial assumes you're comfortable with the basics of deploying an app and connecting it to a smart contract. If you're still learning this part, check out our tutorials in ",e.jsx(n.a,{href:"https://base.org/learn",children:"Base Learn"})," for [Building an Onchain App]."]}),`
`,e.jsxs(n.h2,{id:"setting-up-the-template",children:["Setting up the Template",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-the-template",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["You can skip this section if you've already built an app based off the template, such as our tutorial for ",e.jsx(n.a,{href:"/use-case-guides/creator/nft-minting-with-zora.mdx",children:"How to Mint on Zora with an App"}),"."]}),`
`,e.jsxs(n.p,{children:["Open ",e.jsx(n.a,{href:"https://github.com/coinbase/onchain-app-template",children:"Onchain App Template"}),", click the green ",e.jsx(n.code,{children:"Use  this template"})," button, and create a new repository from the template. Clone your repo and open it in an editor."]}),`
`,e.jsxs(n.p,{children:["Install ",e.jsx(n.em,{children:"bun"})," if you need to, and install dependencies."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Install bun in case you don't have it"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"curl"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -fsSL"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" https://bun.sh/install"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" |"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" bash"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Install packages"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"bun"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" i"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Run Next app"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"bun"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" run"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" dev"})]})]})})}),`
`,e.jsxs(n.p,{children:["Navigate to ",e.jsx(n.code,{children:"localhost:3000"})," and make sure that it's working, then shut down the server. For this tutorial, you ",e.jsx(n.strong,{children:"do not"})," need to set any environment variables."]}),`
`,e.jsxs(n.h2,{id:"installing-and-configuring-fleek",children:["Installing and Configuring Fleek",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installing-and-configuring-fleek",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://fleek.xyz",children:"Fleek"})," requires static pages, so you'll need to ensure that your build process produces them. In your editor, open ",e.jsx(n.code,{children:"next.config.js"})," and update the ",e.jsx(n.code,{children:"nextConfig"}),"."]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"/** "}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"@type"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" {import('next').NextConfig}"}),e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:" */"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"const"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" nextConfig"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  output: "}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:"'export'"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  reactStrictMode: "}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"true"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  images: {"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    unoptimized: "}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"true"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  },"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"  trailingSlash: "}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"true"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:","})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"};"})}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"module"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"."}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"exports"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" ="}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" nextConfig;"})]})]})})}),`
`,e.jsx(n.p,{children:"Save and close the file."}),`
`,e.jsxs(n.p,{children:["Run ",e.jsx(n.code,{children:"bun run build"})," and confirm that a directory called ",e.jsx(n.code,{children:"out"})," is created."]}),`
`,e.jsxs(n.p,{children:["Navigate to ",e.jsx(n.a,{href:"https://fleek.xyz",children:"Fleek"}),"'s website and create an account, or log in if you already have one."]}),`
`,e.jsxs(n.p,{children:["Click into ",e.jsx(n.code,{children:"First Project"}),". You can rename it if you want in the ",e.jsx(n.code,{children:"Settings"})," tab."]}),`
`,e.jsxs(n.p,{children:["The best way to start is to link Fleek to your repo from the beginning. Click ",e.jsx(n.code,{children:"Add New"})," from the upper right corner, then select ",e.jsx(n.code,{children:"Deploy My Site"}),". Select your code location, log into your Git provider, and accept installing the Fleek app."]}),`
`,e.jsx(n.p,{children:"You can either give it permissions for all repos, or add them one at a time."}),`
`,e.jsxs(n.p,{children:["Select your repo, and click the ",e.jsx(n.code,{children:"Deploy"})," button. The ",e.jsx(n.code,{children:"Configure Site"})," window should automatically populate with the appropriate information, but just in case:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Site Name: Your site name"}),`
`,e.jsx(n.li,{children:"Framework: Next.js"}),`
`,e.jsx(n.li,{children:"Branch: main"}),`
`,e.jsx(n.li,{children:"Publish Directory: out"}),`
`,e.jsx(n.li,{children:"Build Command: npm install && npm run build"}),`
`]}),`
`,e.jsxs(n.p,{children:["Click ",e.jsx(n.code,{children:"Deploy Site"}),". Your deploy will probably fail, but this is expected!"]}),`
`,e.jsx(n.p,{children:"Return to your code editor."}),`
`,e.jsx(n.p,{children:"Open a terminal and install the Fleek CLI with:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" install"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" -g"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" @fleek-platform/cli"})]})})})}),`
`,e.jsxs(n.p,{children:["Then, ",e.jsx(n.strong,{children:"in the root of your project"})," run:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"fleek"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" login"})]})})})}),`
`,e.jsxs(n.p,{children:["Click the link in your terminal, then click ",e.jsx(n.code,{children:"Confirm"})," in the web page that opens up. Once you are connected, click the ",e.jsx(n.code,{children:"Visit Dashboard"})," button. The site automatically creates a project called ",e.jsx(n.code,{children:"First Project"}),". If you'd like, you can rename it, or add a new one."]}),`
`,e.jsx(n.p,{children:"Each project can include more than one site."}),`
`,e.jsx(n.p,{children:"Return to your terminal in the app folder, and run:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"fleek"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" sites"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" init"})]})})})}),`
`,e.jsxs(n.p,{children:["Select ",e.jsx(n.code,{children:"First Project"})," from the list"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"⚠️ Warning! To proceed, please select a project..."})}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"✔ Select a project from the list: › First Project"})}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:'✅ Success! You have switched to project "First Project".'})})]})})}),`
`,e.jsxs(n.p,{children:["For ",e.jsx(n.code,{children:"We've found existing sites. Would you like to link to one of them?"}),", pick: ",e.jsx(n.code,{children:"Y"})]}),`
`,e.jsx(n.p,{children:"Find the site you just added and select it."}),`
`,e.jsx(n.div,{children:e.jsxs(n.p,{children:["You're using TypeScript, but ",e.jsx(n.strong,{children:"do not"})," select ",e.jsx(n.code,{children:"TypeScript (fleek.config.ts)"})," in the final prompt. Select ",e.jsx(n.code,{children:"JSON (fleek.config.json)"}),"."]})}),`
`,e.jsx(n.p,{children:"You'll get a few more prompts:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["? Please specify the directory containing the site files to be uploaded",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Enter ",e.jsx(n.code,{children:"out"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['? Would you like to include the optional "build" command?',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Pick ",e.jsx(n.code,{children:"Y"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["? Specify ",e.jsx(n.code,{children:"build"})," command:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Enter ",e.jsx(n.code,{children:"npm install && npm run build"})]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"JSON (fleek.config.json)"})]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"deployment",children:["Deployment",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deployment",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["You can deploy the site from the CLI as the docs describe, but you ",e.jsx(n.strong,{children:"do not need to"}),". There is a better way!"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"# Don't use, better method below!"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"fleek"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" sites"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" deploy"})]})]})})}),`
`,e.jsxs(n.p,{children:["Instead, trigger an automatic deploy by making a change to the text at ",e.jsx(n.code,{children:"src/app/page.tsx"}),", committing your changes, and pushing to your repo."]}),`
`,e.jsxs(n.h2,{id:"dashboard-overview-and-confirming-deployment",children:["Dashboard Overview and Confirming Deployment",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#dashboard-overview-and-confirming-deployment",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Return to your dashboard and click on the ",e.jsx(n.code,{children:"Sites"})," tab. Click on the card for your new site to open it. Here, you can see information about your site in a similar presentation to other deployment providers."]}),`
`,e.jsxs(n.p,{children:["Click on the ",e.jsx(n.code,{children:"<-> Deploys"})," tab and you'll see the automatic deploy you triggered by pushing the commit! Open your site by clicking on the build once it shifts from ",e.jsx(n.code,{children:"Pending"})," to ",e.jsx(n.code,{children:"Live"}),". You can then click on the link to view your site."]}),`
`,e.jsxs(n.p,{children:["Click on ",e.jsx(n.code,{children:"Settings"}),". If you'd like, you can change the slug for your site to a name that's more related to your project."]}),`
`,e.jsxs(n.h2,{id:"conclusion",children:["Conclusion",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["In this tutorial, you learned how to use ",e.jsx(n.a,{href:"https://fleek.xyz",children:"Fleek"})," to deploy a ",e.jsx(n.a,{href:"https://nextjs.org/",children:"Next.js"})," site based on ",e.jsx(n.a,{href:"https://github.com/coinbase/onchain-app-template",children:"Onchain App Template"}),". You also learned how to link Fleek to your Git provider to enable CI/CD."]})]})}function a(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{a as default,t as frontmatter};
