import{u as o,j as e}from"./index-Dlxm52NL.js";const s={title:"Introduction to Remix",description:"An introduction to the Remix online IDE.",hide_table_of_contents:!1};function i(t){const n={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"introduction-to-remix",children:["Introduction to Remix",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#introduction-to-remix",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"In this lesson, you'll be introduced to an online Solidity IDE called Remix. You'll tour the workspace and explore a sample smart contract."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this lesson you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"List the features, pros, and cons of using Remix as an IDE"}),`
`,e.jsx(n.li,{children:"Deploy and test the Storage.sol demo contract in Remix"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"remix-window-overview",children:["Remix Window Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#remix-window-overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Begin by opening a browser window and navigating to ",e.jsx(n.a,{href:"https://remix.ethereum.org",children:"remix.ethereum.org"}),". Open the project you created and cleaned up at the end of the last reading, and open ",e.jsx(n.code,{children:"1_Storage.sol"}),". The editor should be organized in a way that is familiar to you. It is divided into three areas:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Editor Pane"}),`
`,e.jsx(n.li,{children:"Terminal/Output"}),`
`,e.jsx(n.li,{children:"Left Panel"}),`
`]}),`
`,e.jsxs(n.h3,{id:"editor-pane",children:["Editor Pane",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#editor-pane",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The editor pane loads with the Remix home screen, which contains news, helpful links, and warnings about common scams. Double-click on ",e.jsx(n.code,{children:"1_Storage.sol"})," to open it in the editor. You can close the home tab if you'd like."]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/introduction-to-solidity/editor-pane.png",alt:"Remix Editor"})}),`
`,e.jsx(n.p,{children:"You'll edit your code in the editor pane. It also has most of the features you're expecting, such as syntax and error highlighting. Note that in Remix, errors are not underlined. Instead, you'll see an❗to the left of the line number where the error is present."}),`
`,e.jsxs(n.p,{children:["At the top, you'll see a large green arrow similar to the ",e.jsx(n.em,{children:"Run"})," button in other editors. In Solidity, this compiles your code, but it does not run it because you must first deploy your code to the simulated blockchain."]}),`
`,e.jsxs(n.h3,{id:"terminaloutput",children:["Terminal/Output",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#terminaloutput",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Below the editor pane, you'll find the terminal:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/introduction-to-solidity/remix-terminal.png",alt:"Remix Terminal"})}),`
`,e.jsx(n.p,{children:"You'll primarily use this panel to observe transaction logs from your smart contracts. It's also one way to access Remix's very powerful debugging tools."}),`
`,e.jsxs(n.h3,{id:"left-panel",children:["Left Panel",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#left-panel",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"As with many other editors, the left panel in Remix has a number of vertical tabs that allow you to switch between different tools and functions. You can explore the files in your current workspace, create and switch between workspaces, search your code, and access a number of plugins."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"plugins",children:["Plugins",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#plugins",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Most of the features in Remix are plugins and the ones you'll use the most are active by default. You can view and manage plugins by clicking the plug button in the lower-left corner, right above the settings gear. You can turn them off and on by clicking activate/deactivate, and some, such as the ",e.jsx(n.em,{children:"Debug"})," plugin will be automatically activated through other parts of the editor."]}),`
`,e.jsxs(n.h3,{id:"solidity-compiler",children:["Solidity Compiler",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#solidity-compiler",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The first default plugin (after the search function) is the ",e.jsx(n.em,{children:"Solidity Compiler"}),". Be sure to check the ",e.jsx(n.code,{children:"Auto compile"})," option. Smart contracts are almost always very small files, so this shouldn't ever cause a performance problem while editing code."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Compile and Run script"})," button in this plugin is a little misleading. This is ",e.jsx(n.strong,{children:"not"})," how you will usually run your contract through testing. You can click the ",e.jsx(n.code,{children:"I"})," button for more information on this feature."]}),`
`,e.jsxs(n.p,{children:["Finally, if you have errors in your contracts, the complete text for each error will appear at the bottom of the pane. Try it out by introducing some typos to ",e.jsx(n.code,{children:"1_Storage.sol"}),"."]}),`
`,e.jsxs(n.h3,{id:"deploy--run-transactions",children:["Deploy & Run Transactions",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deploy--run-transactions",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.em,{children:"Deploy & Run Transactions"})," plugin is what you'll use to deploy your contracts and then interact with them. At the top are controls to select which virtual machine to use, mock user wallets with test Ether, and a drop-down menu to select the contract you wish to deploy and test."]}),`
`,e.jsxs(n.p,{children:["Fix any errors you introduced to ",e.jsx(n.code,{children:"1_Storage.sol"})," and then click the orange ",e.jsx(n.code,{children:"Deploy"})," button. You'll see your contract appear below as ",e.jsx(n.em,{children:"STORAGE AT <address>"}),"."]}),`
`,e.jsxs(n.div,{children:[e.jsx(n.p,{children:"There are two common gotchas that can be very confusing when deploying contracts in Remix."}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Each time you hit the Deploy button, a new copy of your contract is deployed but the previous deployments remain. Unless you are comparing or debugging between different versions of a contract, or deploying multiple contracts at once, you should click the ",e.jsx(n.code,{children:"Trash"})," button to erase old deployments before deploying again."]}),`
`,e.jsxs(n.li,{children:["If your code will not compile, ",e.jsx(n.strong,{children:"clicking the deploy button will not generate an error!"})," Instead, the last compiled version will be deployed. Visually check and confirm that there are no errors indicated by a number in a red circle on top of the Compiler plugin."]}),`
`]})]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"conclusion",children:["Conclusion",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Remix is a robust editor with many features and one or two gotchas. It is an excellent tool to use at the beginning of your journey because you can jump right in and start writing code for smart contracts."}),`
`,e.jsxs(n.h2,{id:"see-also",children:["See also",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#see-also",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://remix.ethereum.org",children:"Remix"})})]})}function a(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,s as frontmatter};
