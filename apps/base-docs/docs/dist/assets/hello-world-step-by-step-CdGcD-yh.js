import{u as r,j as e}from"./index-Dlxm52NL.js";const t={title:"Hello World",description:"Write your first contract with Solidity.",hide_table_of_contents:!1};function s(i){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"hello-world",children:["Hello World",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hello-world",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:`As is tradition, we'll begin coding with a variant of "Hello World" written as a smart contract. There isn't really a console to write to*, so instead, we'll write a contract that says hello to the sender, using the name they provide.`}),`
`,e.jsxs(n.p,{children:["*You will be able to use ",e.jsx(n.code,{children:"console.log"})," with ",e.jsx(n.em,{children:"Hardhat"}),", with some restrictions."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this lesson you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Construct a simple "Hello World" contract'}),`
`,e.jsx(n.li,{children:"List the major differences between data types in Solidity as compared to other languages"}),`
`,e.jsx(n.li,{children:"Select the appropriate visibility for a function"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"hello-world-1",children:["Hello World",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hello-world-1",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`Writing "Hello World" in a smart contract requires a little more consideration than in other languages. Your code is deployed remotely, but it isn't running on a server where you can access logs, or on your local machine where you have access to a console. One way to do it is to write a function that returns "Hello World".`}),`
`,e.jsxs(n.h3,{id:"creating-the-contract",children:["Creating the Contract",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-the-contract",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"To create a contract:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Create a new workspace in Remix."}),`
`,e.jsxs(n.li,{children:["Name it ",e.jsx(n.code,{children:"Hello World"})," and delete the ",e.jsx(n.code,{children:".deps"})," folder."]}),`
`,e.jsxs(n.li,{children:["Leave ",e.jsx(n.code,{children:".prettierrc.json"})," and click the settings gear in the bottom left."]}),`
`,e.jsxs(n.li,{children:["Uncheck the top option to ",e.jsx(n.em,{children:"Generate contract metadata..."})]}),`
`,e.jsxs(n.li,{children:["Open the ",e.jsx(n.em,{children:"Solidity Compiler"})," plugin and enable ",e.jsx(n.em,{children:"Auto compile"}),"."]}),`
`,e.jsxs(n.li,{children:["Create a new folder called ",e.jsx(n.code,{children:"contracts"}),", and within that folder, create a file called ",e.jsx(n.code,{children:"hello-world.sol"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Solidity files usually start with a comment containing an ",e.jsx(n.a,{href:"https://spdx.org/licenses/",children:e.jsx(n.em,{children:"SPDX-License-Identifier"})}),". It's not a requirement, but there are a couple of advantages to doing this. First, everything you deploy on the blockchain is public. This doesn't mean you are giving away everything you deploy for free, nor does it mean you have the right to use the code from any deployed contract. The license determines allowed usage and is generally protected by international copyright laws, the same as any other code."]}),`
`,e.jsxs(n.p,{children:["If you don't want to give a license, you can put ",e.jsx(n.code,{children:"UNLICENSED"}),". Common open source licenses, such as ",e.jsx(n.code,{children:"MIT"})," and ",e.jsx(n.code,{children:"GPL-3.0"})," are popular as well. Add your license identifier:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Solidity",children:`// SPDX-License-Identifier: MIT
`})}),`
`,e.jsxs(n.p,{children:["Below the license identifier, you need to specify which ",e.jsx(n.a,{href:"https://docs.soliditylang.org/en/v0.8.17/layout-of-source-files.html?#version-pragma",children:"version"})," of Solidity the compiler should use to compile your code. If by the time you read this, the version has advanced, you should try to use the most current version. Doing so may cause you to run into unexpected errors, but it's great practice for working in real-world conditions!"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Solidity",children:`pragma solidity 0.8.17;
`})}),`
`,e.jsxs(n.p,{children:["Finally, add a ",e.jsx(n.code,{children:"contract"})," called ",e.jsx(n.code,{children:"HelloWorld"}),". You should end up with:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Solidity",children:`// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract HelloWorld {

}
`})}),`
`,e.jsxs(n.h3,{id:"sayhello-function",children:["SayHello Function",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sayhello-function",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Add a function to your contract called ",e.jsx(n.code,{children:"SayHello"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Solidity",children:`function SayHello() {

}
`})}),`
`,e.jsxs(n.p,{children:["You'll get a compiler syntax error for ",e.jsx(n.em,{children:'No visibility specified. Did you intend to add "public"?'}),"."]}),`
`,e.jsxs(n.p,{children:["Is ",e.jsx(n.code,{children:"public"})," the most appropriate ",e.jsx(n.a,{href:"https://docs.soliditylang.org/en/v0.8.17/cheatsheet.html?#function-visibility-specifiers",children:"visibility specifier"}),"?"]}),`
`,e.jsxs(n.p,{children:["It would work, but you won't be calling this function from within the contract, so ",e.jsx(n.code,{children:"external"})," is more appropriate."]}),`
`,e.jsxs(n.p,{children:["You also need to specify a return type, and we've decided this function should return a string. You'll learn more about this later, but in Solidity, many of the more complex types require you to specify if they are ",e.jsx(n.code,{children:"storage"})," or ",e.jsx(n.code,{children:"memory"}),". You can then have your function return a string of ",e.jsx(n.code,{children:'"Hello World!"'}),"."]}),`
`,e.jsx(n.p,{children:"Don't forget your semicolon. They're mandatory in Solidity!"}),`
`,e.jsx(n.p,{children:"You should have:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Solidity",children:`function SayHello() external returns (string memory) {
    return "Hello World!";
}
`})}),`
`,e.jsxs(n.p,{children:["Before you deploy, check the ",e.jsx(n.code,{children:"Compiler"})," plugin. You've got one last warning:"]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Warning: Function state mutability can be restricted to pure"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://docs.soliditylang.org/en/v0.8.17/cheatsheet.html?#modifiers",children:"Modifiers"})," are used to modify the behavior of a function. The ",e.jsx(n.code,{children:"pure"})," modifier prevents the function from modifying, or even accessing state. While not mandatory, using these modifiers can help you and other programmers know the intention and impact of the functions you write. Your final function should be similar to:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Solidity",children:`function SayHello() external pure returns (string memory) {
    return "Hello World!";
}
`})}),`
`,e.jsxs(n.h3,{id:"deployment-and-testing",children:["Deployment and Testing",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deployment-and-testing",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Confirm that there is a green checkmark on the icon for the compiler plugin, and then switch to the ",e.jsx(n.em,{children:"Deploy & Run Transactions"})," plugin."]}),`
`,e.jsxs(n.p,{children:["Click the ",e.jsx(n.em,{children:"Deploy"})," button and your contract should appear in ",e.jsx(n.em,{children:"Deployed Contracts"}),". Open it up and then click the ",e.jsx(n.em,{children:"SayHello"})," button. Did it work?"]}),`
`,e.jsxs(n.p,{children:["You should see your message below the button. Another option to see the return for your ",e.jsx(n.code,{children:"HelloWorld"})," function is to expand the entry in the console. You should see a ",e.jsx(n.em,{children:"decoded output"})," of:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"{"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:'	"0": "string: Hello World!"'})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"greeter",children:["Greeter",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#greeter",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`Now, let's modify your say hello function to greet a user by name, instead of just saying "Hello World!"`}),`
`,e.jsxs(n.h3,{id:"first-pass-attempt",children:["First Pass Attempt",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#first-pass-attempt",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["You'd probably expect this to be pretty easy. Start by changing the name of the function (or adding a new one) to ",e.jsx(n.code,{children:"Greeter"})," and giving it a parameter for a ",e.jsx(n.code,{children:"string memory _name"}),". The underscore is a common convention to mark functions and variables as internal to their scope. Doing so helps you tell the difference between a storage variable, and a memory variable that only exists within the call."]}),`
`,e.jsxs(n.p,{children:["Finally, try creating a return string similar to how you might in another language with ",e.jsx(n.code,{children:'"Hello " + _name'}),". You should have:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Solidity",children:`// Bad code example: Does not work
function Greeter(string memory _name) external pure returns (string memory) {
    return "Hello " + _name + "!";
}
`})}),`
`,e.jsx(n.p,{children:"Unfortunately, this does not work in Solidity. The error message you receive is a little confusing:"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:'TypeError: Operator + not compatible with types literal_string "Hello" and string memory.'}),`
`]}),`
`,e.jsx(n.p,{children:"You might think that there is some sort of type casting or conversion error that could be solved by explicitly casting the string literal to string memory, or vice versa. This is a great instinct. Solidity is a very explicit language."}),`
`,e.jsxs(n.p,{children:["However, you receive a similar error with ",e.jsx(n.code,{children:'"Hello " + "world"'}),"."]}),`
`,e.jsx(n.p,{children:"String concatenation is possible in Solidity, but it's a bit more complicated than most languages, for good reason. Working with string costs a large amount of gas, so it's usually better to handle this sort of processing on the front end."}),`
`,e.jsxs(n.h3,{id:"plan-b",children:["Plan B",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#plan-b",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["We still want to return something with the name provided by the user, so let's try something a little different. Solidity is a ",e.jsx(n.em,{children:"variadic"})," language, which means it allows functions to return more than one value."]}),`
`,e.jsxs(n.p,{children:["Modify your return declaration: ",e.jsx(n.code,{children:"returns (string memory, string memory)"})]}),`
`,e.jsxs(n.p,{children:["Now, your function can return a ",e.jsx(n.a,{href:"https://en.wikipedia.org/wiki/Tuple",children:"tuple"})," containing two strings!"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:'return ("Hello", _name)'}),";"]}),`
`,e.jsxs(n.p,{children:["Deploy and test your contract. You should get a ",e.jsx(n.em,{children:"decoded output"})," with:"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"{"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:'	"string _name": "Your Name"'})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"}"})})]})})}),`
`,e.jsxs(n.h3,{id:"full-example-code",children:["Full Example Code",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#full-example-code",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// SPDX-License-Identifier: MIT"})}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"pragma"}),e.jsx(n.span,{style:{color:"#22863A","--shiki-dark":"#85E89D"},children:" solidity"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:" 0.8.17"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" HelloWorld"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    function"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" SayHello"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"() "}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"external"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" pure"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" returns"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" memory"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"        return"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:' "Hello World!"'}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:";"})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // Bad code example: Does not work"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // function Greeter(string memory _name) external pure returns (string memory) {"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:'    //     return "Hello " + _name;'})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // }"})}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    function"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" Greeter"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" memory"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" _name) "}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"external"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" pure"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" returns"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" memory"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"string"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" memory"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") {"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"        return"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" ("}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#9ECBFF"},children:'"Hello"'}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", _name);"})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"conclusion",children:["Conclusion",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Congratulations! You've written and tested your first smart contract! You selected a license and a version of Solidity. You declared a contract and added a function that returns a value."}),`
`,e.jsx(n.p,{children:"You also learned more about some of the ways in which Solidity is more challenging to work with than other languages, and the additional elements you sometimes need to declare functions and types."}),`
`,e.jsx(n.hr,{})]})}function o(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{o as default,t as frontmatter};
