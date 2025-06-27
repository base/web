import{u as r,j as e}from"./index-Dlxm52NL.js";const a={title:"AI Prompting Guide",description:"Learn practical AI prompting techniques to enhance your coding workflow and get better results from AI coding assistants.",author:"sohey"};function i(n){const s={a:"a",aside:"aside",br:"br",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"developers-guide-to-effective-ai-prompting",children:["Developer's Guide to Effective AI Prompting",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#developers-guide-to-effective-ai-prompting",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:`This guide helps developers leverage AI tools effectively in their coding workflow. Whether you're using Cursor, GitHub Copilot, or other AI assistants,
these strategies will help you get better results and integrate AI smoothly into your development process.`}),`
`,e.jsxs(s.h2,{id:"understanding-context-windows",children:[e.jsx(s.strong,{children:"Understanding Context Windows"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#understanding-context-windows",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"why-context-matters",children:[e.jsx(s.strong,{children:"Why Context Matters"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#why-context-matters",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:`AI coding assistants have what's called a "context window" - the amount of text they can "see" and consider when generating responses. Think of it as the AI's working memory:`}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Most modern AI assistants can process thousands of tokens (roughly 4-5 words per token)"}),`
`,e.jsx(s.li,{children:"Everything you share and everything the AI responds with consumes this limited space"}),`
`,e.jsx(s.li,{children:"Once the context window fills up, parts of your conversational history may be lost."}),`
`]}),`
`,e.jsx(s.p,{children:'This is why providing relevant context upfront is crucial - the AI can only work with what it can "see" in its current context window.'}),`
`,e.jsxs(s.h3,{id:"optimizing-for-context-windows",children:[e.jsx(s.strong,{children:"Optimizing for Context Windows"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#optimizing-for-context-windows",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"To get the most out of AI assistants:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Prioritize relevant information"}),": Focus on sharing the most important details first."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Remove unnecessary content"}),": Avoid pasting irrelevant code or documentation."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Structure your requests"}),": Use clear sections and formatting to make information easy to process."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Reference external resources"}),": For large codebases, consider sharing only the most relevant files."]}),`
`]}),`
`,e.jsx(s.p,{children:"For larger projects, create and reference a central documentation file that summarizes key information, rather than repeatedly explaining the same context."}),`
`,e.jsxs(s.h2,{id:"setting-up-ai-tools",children:[e.jsx(s.strong,{children:"Setting Up AI Tools"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-ai-tools",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"configuring-cursor-rules",children:[e.jsx(s.strong,{children:"Configuring Cursor Rules"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#configuring-cursor-rules",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Cursor Rules allow you to provide consistent context to Cursor AI, making it more effective at understanding your codebase and providing relevant suggestions."}),`
`,e.jsxs(s.h4,{id:"creating-cursor-rules",children:[e.jsx(s.strong,{children:"Creating Cursor Rules"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-cursor-rules",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Open the Command Palette in Cursor:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Mac: ",e.jsx(s.code,{children:"Cmd + Shift + P"})]}),`
`,e.jsxs(s.li,{children:["Windows/Linux: ",e.jsx(s.code,{children:"Ctrl + Shift + P"})]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:'Search for "Cursor Rules" and select the option to create or edit rules'}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Add project-specific rules that help Cursor understand your project:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://raw.githubusercontent.com/PatrickJS/awesome-cursorrules/refs/heads/main/rules/nextjs-tailwind-typescript-apps-cursorrules-prompt/.cursorrules",children:"Next.js"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://raw.githubusercontent.com/PatrickJS/awesome-cursorrules/refs/heads/main/rules/astro-typescript-cursorrules-prompt-file/.cursorrules",children:"Astro"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://raw.githubusercontent.com/PatrickJS/awesome-cursorrules/refs/heads/main/rules/typescript-vite-tailwind-cursorrules-prompt-file/.cursorrules",children:"Vite"})}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Save your rules file and Cursor will apply these rules to its AI suggestions"}),`
`]}),`
`]}),`
`,e.jsxs(s.h3,{id:"setting-up-an-onchainkit-project",children:[e.jsx(s.strong,{children:"Setting Up an OnchainKit Project"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-an-onchainkit-project",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"To create a new OnchainKit project:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:"npm"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" create"}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:" onchain@latest"})]})})})}),`
`,e.jsx(s.p,{children:"After creating your project, prompt to generate comprehensive documentation for your new OnchainKit project."}),`
`,e.jsxs(s.h3,{id:"creating-project-documentation",children:[e.jsx(s.strong,{children:"Creating Project Documentation"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-project-documentation",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"A comprehensive instructions file helps AI tools understand your project better. This should be created early in your project and updated regularly."}),`
`,e.jsx(s.strong,{children:"Ready-to-Use Prompt for Creating Instructions.md:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Create a detailed instructions.md file for my project with the following sections:"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Overview: Summarize the project goals, problem statements, and core functionality."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Tech Stack: List all technologies, libraries, frameworks with versions."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Project Structure: Document the file organization with explanations."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"4."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Coding Standards: Document style conventions, linting rules, and patterns."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"5."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" User Stories: Key functionality from the user perspective."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"6."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" APIs and Integrations: External services and how they connect."})]})]})})}),`
`,e.jsx(s.aside,{"data-callout":"info",children:e.jsx(s.p,{children:"Note: When planning architecture or making complex design decisions, use AI models with strong reasoning—like o4 mini or Claude 3.7 Sonnet. They excel at thinking through tradeoffs, edge cases, and long-term planning."})}),`
`,e.jsxs(s.h2,{id:"effective-prompting-strategies",children:[e.jsx(s.strong,{children:"Effective Prompting Strategies"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#effective-prompting-strategies",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"be-specific-and-direct",children:[e.jsx(s.strong,{children:"Be Specific and Direct"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#be-specific-and-direct",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Start with clear commands and be specific about what you want. AI tools respond best to clear, direct instructions."}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Example:"}),' ❌ "Help me with my code"',e.jsx(s.br,{}),`
`,'✅ "Refactor this authentication function to use async/await instead of nested then() calls"']}),`
`,e.jsxs(s.h3,{id:"provide-context-for-complex-tasks",children:[e.jsx(s.strong,{children:"Provide Context for Complex Tasks"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#provide-context-for-complex-tasks",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.strong,{children:"Ready-to-Use Prompt:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" I'm working on a onchainkit project using ["}),e.jsx(s.span,{style:{color:"#032F62",textDecoration:"underline","--shiki-dark":"#DBEDFF","--shiki-dark-text-decoration":"underline"},children:"frameworks/libraries"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"]. I need your help with:"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Problem: [describe specific issue]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Current approach: [explain what you've tried]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Constraints: [mention any technical limitations]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"4."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Expected outcome: [describe what success looks like]"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Here's the relevant documentation @https://docs.base.org/builderkits/onchainkit/llms.txt"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Here's the relevant code:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[paste your code]"})})]})})}),`
`,e.jsxs(s.h3,{id:"ask-for-iterations",children:[e.jsx(s.strong,{children:"Ask for Iterations"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#ask-for-iterations",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Start simple and refine through iterations rather than trying to get everything perfect in one go."}),`
`,e.jsx(s.strong,{children:"Ready-to-Use Prompt:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Let's approach this step by step:"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" First, implement a basic version of ["}),e.jsx(s.span,{style:{color:"#032F62",textDecoration:"underline","--shiki-dark":"#DBEDFF","--shiki-dark-text-decoration":"underline"},children:"feature"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"] with minimal functionality."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Then, we'll review and identify areas for improvement."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Next, let's add error handling and edge cases."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"4."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Finally, we'll optimize for performance."})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Please start with step 1 now."})})]})})}),`
`,e.jsxs(s.h2,{id:"working-with-onchainkit",children:[e.jsx(s.strong,{children:"Working with OnchainKit"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#working-with-onchainkit",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"leveraging-llmstxt-for-documentation",children:[e.jsx(s.strong,{children:"Leveraging LLMs.txt for Documentation"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#leveraging-llmstxt-for-documentation",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The OnchainKit project provides optimized documentation in the form of LLMs.txt files. These files are specifically formatted to be consumed by AI models:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.a,{href:"https://docs.base.org/builderkits/onchainkit/llms.txt",children:"OnchainKit Documentation"})]}),`
`,e.jsx(s.li,{children:"Find the component you want to implement"}),`
`,e.jsx(s.li,{children:"Copy the corresponding LLMs.txt url"}),`
`,e.jsx(s.li,{children:"Paste it into your prompt to provide context"}),`
`]}),`
`,e.jsx(s.strong,{children:"Example LLMs.txt Usage:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"I'm implementing a swap component with OnchainKit. Here's the relevant LLMs.txt:"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"@https://docs.base.org/builderkits/onchainkit/llms.txt"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Based on this documentation, please show me how to implement a wallet connector that:"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Swap from Base USDC to Base ETH."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Handles connection states properly."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Includes error handling."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"4."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Follows best practices for user experience."})]})]})})}),`
`,e.jsxs(s.h3,{id:"component-integration-example",children:[e.jsx(s.strong,{children:"Component Integration Example"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#component-integration-example",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.strong,{children:"Ready-to-Use Prompt for Token Balance Display:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"I need to implement a new feature in my project."})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Shows the connected wallet's balance of our {ERC20 token}."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" It updates when the balance changes."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Handles loading and error states appropriately."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"4."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Follows our project's coding standards."})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"5."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Update the instructions.md to reflect this new implementation."})]})]})})}),`
`,e.jsx(s.strong,{children:e.jsx(s.em,{children:"*update the prompt a token of your choice"})}),`
`,e.jsxs(s.h2,{id:"debugging-with-ai",children:[e.jsx(s.strong,{children:"Debugging with AI"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#debugging-with-ai",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"effective-debugging-prompts",children:[e.jsx(s.strong,{children:"Effective Debugging Prompts"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#effective-debugging-prompts",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.strong,{children:"Ready-to-Use Prompt for Bug Analysis:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"I'm encountering an issue with my code:"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Expected behavior: [what should happen]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Actual behavior: [what's happening instead]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Error messages: [include any errors]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"4."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Relevant code: [paste the problematic code]"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Please analyze this situation step by step and help me:"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Identify potential causes of this issue"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Suggest debugging steps to isolate the problem"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Propose possible solutions"})]})]})})}),`
`,e.jsx(s.strong,{children:"Ready-to-Use Prompt for Adding Debug Logs:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"I need to debug the following function. Please add comprehensive logging statements that will help me trace:"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Input values and their types"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Function execution flow"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Intermediate state changes"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"4."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" Output values or errors"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Here's my code:"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"[paste your code]"})})]})})}),`
`,e.jsxs(s.h3,{id:"when-youre-stuck",children:[e.jsx(s.strong,{children:"When You're Stuck"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#when-youre-stuck",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"If you're uncertain how to proceed:"}),`
`,e.jsx(s.strong,{children:"Ready-to-Use Clarification Prompt:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"I'm unsure how to proceed with [specific task]. Here's what I know:"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"1."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" [context about the problem]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"2."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" [what you've tried]"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:"3."}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" [specific areas where you need guidance]"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"What additional information would help you provide better assistance?"})})]})})}),`
`,e.jsxs(s.h2,{id:"advanced-prompting-techniques",children:[e.jsx(s.strong,{children:"Advanced Prompting Techniques"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#advanced-prompting-techniques",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Modern AI assistants have capabilities that you can leverage with these advanced techniques:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Step-by-step reasoning"}),": Ask the AI to work through problems systematically"]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Please analyze this code step by step and identify potential issues."})})})})}),`
`,e.jsxs(s.ol,{start:"2",children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Format specification"}),": Request specific formats for clarity"]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Please structure your response as a tutorial with code examples and explanations."})})})})}),`
`,e.jsxs(s.ol,{start:"3",children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Length guidance"}),": Indicate whether you want brief or detailed responses"]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"Please provide a concise explanation in 2-3 paragraphs."})})})})}),`
`,e.jsxs(s.ol,{start:"4",children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Clarify ambiguities"}),": Help resolve unclear points when you receive multiple options"]}),`
`]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsx(s.code,{children:e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"I notice you suggested two approaches. To clarify, I'd prefer to use the first approach with TypeScript."})})})})}),`
`,e.jsxs(s.h2,{id:"best-practices-summary",children:[e.jsx(s.strong,{children:"Best Practices Summary"}),e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#best-practices-summary",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Understand context limitations"}),": Recognize that AI tools have finite context windows and prioritize information accordingly"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Provide relevant context"}),": Share code snippets, error messages, and project details that matter for your specific question"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Be specific in requests"}),": Clear, direct instructions yield better results than vague questions"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Break complex tasks into steps"}),": Iterative approaches often work better for complex problems"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Request explanations"}),": Ask the AI to explain generated code or concepts you don't understand"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Use formatting for clarity"}),": Structure your prompts with clear sections and formatting"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Reference documentation"}),": When working with specific libraries like OnchainKit, share relevant documentation"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Test and validate"}),": Always review and test AI-generated code before implementing"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Build on previous context"}),": Refer to earlier parts of your conversation when iterating"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Provide feedback"}),": Let the AI know what worked and what didn't to improve future responses"]}),`
`]})]})}function l(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{l as default,a as frontmatter};
