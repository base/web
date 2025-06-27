import{u as n,j as e}from"./index-Dlxm52NL.js";const r={title:"How Storage Works",description:"An introduction to how storage works in Ethereum",hide_table_of_contents:!1};function a(i){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"how-storage-works",children:["How Storage Works",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#how-storage-works",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"In this article, we will delve into the workings of Ethereum storage, explore the nuances of variable declaration ordering, and provide examples of efficient and inefficient storage practices to create optimized smart contracts."}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"objectives",children:["Objectives:",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"By the end of this lesson you should be able to:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Diagram how a contract's data is stored on the blockchain (Contract -> Blockchain)"}),`
`,e.jsx(s.li,{children:"Order variable declarations to use storage efficiently"}),`
`,e.jsx(s.li,{children:"Diagram how variables in a contract are stored (Variable -> Contract)"}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"introduction",children:["Introduction",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#introduction",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Creating smart contracts that can operate efficiently requires a thorough understanding of how storage works in Ethereum. When designing a contract, you need to consider the storage requirements of the contract, including the types of storage needed, the gas costs associated with storage operations, and how to manage storage effectively. Poor storage management practices can lead to bloated contracts that consume excessive gas, making them more expensive to execute. By following best practices for storage management, you'll be equipped to create contracts that are lean, efficient, and cost-effective."}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"smart-contract-data-storage",children:["Smart Contract Data Storage",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#smart-contract-data-storage",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"key-value-store",children:["Key-Value Store",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#key-value-store",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Smart contracts on Ethereum store and manage data utilizing a key-value store model, where each piece of data is identified by a unique key and accompanied by its corresponding value."}),`
`,e.jsx(s.p,{children:"In this diagram, the keys (user addresses) are unique identifiers used to index the corresponding values (balances):"}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/learn/introduction-to-solidity/key-value-store.png",alt:"Key Value Store"})}),`
`,e.jsx(s.p,{children:"This model can be compared to a dictionary or a map where the key serves as the index and the value represents the data associated with that index. However, the key-value store has distinct characteristics that set it apart from these traditional data structures, which make it a more optimal choice for smart contracts on Ethereum."}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Simplicity:"})," It is simple and straightforward, which allows for easier implementation and maintenance within a contract."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Scalability:"})," It is highly scalable, making it well-suited for managing vast amounts of data typically associated with apps and smart contracts. This scalability helps maintain performance levels even as data storage requirements grow."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Fixed-size chunks:"})," Storing data in fixed-size 32-byte chunks optimizes storage space and ensures that data location calculations are more efficient. This feature is particularly beneficial in the context of Ethereum, where storage costs are a significant concern."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Efficient storage and retrieval:"})," It is optimized for storing and retrieving large volumes of data efficiently, which is essential for quick access to stored information."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Security and immutability:"})," Unlike other storage models that may allow direct data manipulation, key-value stores within Ethereum's environment ensure data integrity and security through transaction-based modifications. This feature aligns with the decentralized and trustless nature of blockchain technology."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Gas-efficiency:"})," In Ethereum, every operation within a smart contract execution consumes gas. The key-value store model is designed to be gas-efficient, minimizing the gas consumption for storage and retrieval operations, thus reducing the overall cost of contract execution."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Compatibility with decentralized environments:"})," It is particularly suitable for decentralized environments, where data consistency, integrity, and security are crucial. The model's design inherently addresses the challenges posed by multi-threaded or concurrent environments where multiple processes or functions may attempt to access or modify the same data simultaneously."]}),`
`]}),`
`]}),`
`,e.jsxs(s.h3,{id:"types-of-storage",children:["Types of Storage",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#types-of-storage",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"There are three primary types of storage in Ethereum smart contracts: storage, memory, and stack. Each type has its specific use case and characteristics, which make them suitable for different aspects of smart contract execution."}),`
`,e.jsxs(s.h4,{id:"storage",children:["Storage",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#storage",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Storage is the most persistent and expensive form of data storage. Data stored in the contract's storage persists across transaction executions and is accessible to any function within the smart contract. This storage is also visible on the blockchain and can be read by external sources, making it suitable for storing important and long-lasting information related to the contract's state."}),`
`,e.jsx(s.p,{children:"Key attributes of storage:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Persistent:"})," Data remains in storage even after the contract execution finishes, allowing for state continuity across multiple transactions."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Expensive:"})," Storing and modifying data in storage consumes more gas compared to other data locations, making it costly in terms of transaction fees."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Visible on the blockchain:"})," Storage data is publicly available and can be read by external parties."]}),`
`]}),`
`]}),`
`,e.jsx(s.p,{children:"Consider the following contract:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" StorageDemo"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // Declare a state variable to store data in storage"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint256"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" storedData;"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // Function to update the storedData variable in storage"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" updateData"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint256"}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" newData"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        storedData "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" newData;"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsxs(s.p,{children:["The contract includes a state variable called ",e.jsx(s.code,{children:"storedData"}),", which is stored in the contract's storage. The ",e.jsx(s.code,{children:"public"})," visibility modifier allows anyone to access this variable. The contract also includes a public function called ",e.jsx(s.code,{children:"updateData"}),", which can be called by anyone to modify the value of ",e.jsx(s.code,{children:"storedData"})," in storage."]}),`
`,e.jsxs(s.p,{children:["Any changes made to ",e.jsx(s.code,{children:"storedData"})," in storage will persist across multiple transactions and will be visible to anyone who reads the blockchain. Please note that storage is more expensive than other data locations, so it is important to use it judiciously to minimize gas costs."]}),`
`,e.jsxs(s.h4,{id:"memory",children:["Memory",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#memory",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Memory is a temporary and more affordable data location. It's used to save data during the execution of a single transaction. Once the transaction is complete, the memory is wiped clean and any data within it is lost. Memory is suitable for storing intermediate variables and temporary data that does not need to persist across multiple transactions."}),`
`,e.jsx(s.p,{children:"Key attributes of memory:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Temporary:"})," Data in memory is only available during a single transaction execution and is lost afterward."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Less expensive:"})," Saving and modifying data in memory consumes less gas compared to storage, making it more cost-effective for temporary data."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Not visible on the blockchain:"})," Memory data is not accessible to external parties and remains confined to the transaction execution."]}),`
`]}),`
`]}),`
`,e.jsx(s.p,{children:"Consider the following contract:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" MemoryDemo"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // Declare a state variable to store data in storage"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint256"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" storedData;"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // Function to update the storedData variable in memory"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" updateData"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint256"}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" newData"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"        // Declare a memory variable to store the new data"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"        uint256"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" tempData "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" newData;"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"        // Assign the value of the memory variable to the storage variable"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        storedData "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" tempData;"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsxs(s.p,{children:["In the contract, we declare a memory variable called ",e.jsx(s.code,{children:"tempData"})," and assign the input parameter ",e.jsx(s.code,{children:"newData"})," to it to update its value. The ",e.jsx(s.code,{children:"tempData"})," variable is then assigned to the ",e.jsx(s.code,{children:"storedData"})," variable to update its value in storage."]}),`
`,e.jsx(s.p,{children:"Unlike storage, data stored in memory is not persisted across transactions and is only accessible during the execution of the function. However, accessing and modifying data in memory is less expensive than doing so in storage, making it a more efficient option when dealing with temporary data. Additionally, any data stored in memory is not visible on the blockchain and cannot be read by external parties."}),`
`,e.jsxs(s.h4,{id:"stack",children:["Stack",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#stack",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The stack is another form of temporary data storage, specifically used for holding function arguments, local variables, and intermediate values during function execution. The stack follows a Last-In-First-Out (LIFO) structure, meaning that the most recently added item is the first to be removed. This storage type is highly efficient but has limited space, making it suitable for small-scale data manipulation during function execution."}),`
`,e.jsx(s.p,{children:"The stack is an internal data structure used by the EVM (Ethereum Virtual Machine) for computation during the execution of transactions. When a transaction is executed by the EVM, the bytecode of the smart contract is loaded into memory, and the EVM uses the stack to keep track of intermediate results and execute operations."}),`
`,e.jsx(s.p,{children:"In Solidity, developers do not interact with the stack directly, but can optimize their code to make the best use of it and minimize the amount of gas used during transaction execution. This can include using more efficient algorithms or data structures, or avoiding unnecessary operations that can increase the depth of the stack."}),`
`,e.jsx(s.p,{children:"Key attributes of the stack:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Temporary:"})," Like memory, stack data is only available during a single transaction execution and is lost afterward."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Highly efficient:"})," Stack operations consume minimal gas, making it the most cost-effective storage option for small-scale data manipulation."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"LIFO structure:"})," The stack follows the Last-In-First-Out order, which allows for efficient management of function arguments, local variables, and intermediate values."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Limited space:"})," The stack has a maximum depth of 1024, restricting the number of elements it can hold at a given time."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Limited visibility:"})," Only the top 16 elements in the stack are accessible, limiting how many variables and other elements can be in scope at one time."]}),`
`]}),`
`]}),`
`,e.jsx(s.p,{children:"Let's compare two versions of a function and analyze their gas efficiency with regard to stack usage and gas consumption:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" GasEfficiencyDemo"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint256"}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:" public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" result;"})]}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // Less efficient"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" sumLessEfficient"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint256"}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" a"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint256"}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" b"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"        uint256"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" temp "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" a "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"+"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" b;"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        result "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" temp;"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"    // More efficient"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"    function"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" sumMoreEfficient"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"("}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint256"}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" a"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:", "}),e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"uint256"}),e.jsx(s.span,{style:{color:"#E36209","--shiki-dark":"#FFAB70"},children:" b"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:") "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"public"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"        result "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"="}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" a "}),e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"+"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" b;"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"    }"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsxs(s.p,{children:["In the ",e.jsx(s.code,{children:"sumLessEfficient"})," function, the sum of the two input arguments ",e.jsx(s.code,{children:"a"})," and ",e.jsx(s.code,{children:"b"})," is first assigned to the temporary variable ",e.jsx(s.code,{children:"temp"})," before being assigned to the state variable ",e.jsx(s.code,{children:"result"}),". This additional step introduces an extra variable on the stack, which requires more gas for stack operations and consumes more gas overall."]}),`
`,e.jsxs(s.p,{children:["In contrast, the ",e.jsx(s.code,{children:"sumMoreEfficient"})," function directly assigns the sum of the input arguments ",e.jsx(s.code,{children:"a"})," and ",e.jsx(s.code,{children:"b"})," to the state variable result. This eliminates the need for the temporary variable and reduces the stack usage, leading to lower gas consumption for stack operations and a more gas-efficient execution."]}),`
`,e.jsx(s.p,{children:"Although the difference in gas consumption between these two functions may not be significant for such a simple example, the principle of minimizing stack usage and optimizing code to reduce gas consumption is essential for developing efficient smart contracts. By avoiding unnecessary variables and operations, you can improve the gas efficiency of your functions and reduce the cost of executing them on the EVM."}),`
`,e.jsxs(s.h2,{id:"variable-storage",children:["Variable Storage",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#variable-storage",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.h3,{id:"variable-packing",children:["Variable Packing",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#variable-packing",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"As we've learned, minimizing the storage footprint of a contract can substantially reduce gas costs. To make storage more efficient, Ethereum employs a concept called variable packing."}),`
`,e.jsx(s.p,{children:"Variable packing is the process of placing multiple smaller variables into a single storage slot to optimize storage usage. A storage slot is a fixed-size container that can hold up to 32 bytes of data. Ethereum's Solidity compiler automatically packs smaller variables together if they can fit into a single storage slot."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/learn/introduction-to-solidity/variable-packing.png",alt:"Variable Packing"})}),`
`,e.jsxs(s.h3,{id:"ordering-variable-declarations",children:["Ordering Variable Declarations",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#ordering-variable-declarations",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"When declaring variables in a contract, their order can impact a contract's gas usage. You can optimize storage by declaring variables of similar sizes together, such that they can be packed into the same storage slot."}),`
`,e.jsx(s.p,{children:"Let's illustrate how this works:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" StoragePackingExample"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint8"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" a; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 1 byte"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint8"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" b; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 1 byte"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint256"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" c; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 32 bytes"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsxs(s.p,{children:["In this example, the compiler will automatically pack ",e.jsx(s.code,{children:"a"})," and ",e.jsx(s.code,{children:"b"})," into the same storage slot, as they are both 1-byte variables and can fit into a single 32-byte storage slot. However, ",e.jsx(s.code,{children:"c"})," requires a separate storage slot due to its size (32 bytes)."]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/learn/introduction-to-solidity/variable-order-optimized.png",alt:"Variable Order Optimized"})}),`
`,e.jsx(s.p,{children:"If these variables were not in the correct order, the contract would not take advantage of variable packing. The variables would take up more storage and would potentially consume more gas to execute the contract."}),`
`,e.jsx(s.p,{children:"Let's consider an inefficient example:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"contract"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" StoragePackingBadExample"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint8"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" a; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 1 byte"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint256"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" b; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 32 bytes"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint8"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" c; "}),e.jsx(s.span,{style:{color:"#6A737D","--shiki-dark":"#6A737D"},children:"// 1 byte"})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsx(s.p,{children:"In this contract, the variables are not declared in the optimal order, and the compiler would store these variables in the following way:"}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"/images/learn/introduction-to-solidity/variable-order-inefficient.png",alt:"Variable Order Inefficient"})}),`
`,e.jsx(s.p,{children:"To make the most of variable packing, it's important to group variables of the same size together and avoid mixing variable sizes. ​By doing this, the compiler can store them more efficiently, reducing the overall storage usage of the contract. This optimization will not only reduce the gas costs associated with storage, but it will also improve the contract's execution speed."}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"conclusion",children:["Conclusion",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Creating efficient and optimized smart contracts on Ethereum requires a thorough understanding of how storage works. Smart contracts use a key-value store model to manage and store data, which is simple, scalable, gas-efficient, and suitable for decentralized environments. There are three types of storage in Ethereum smart contracts: storage, memory, and stack, each with specific characteristics. Developers can optimize storage usage by using variable packing and ordering variable declarations based on their size. By following best practices for storage management, developers can create contracts that are lean, efficient, cost-effective, and improve their execution speed."}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.h2,{id:"see-also",children:["See Also",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#see-also",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/",children:"Understanding Ethereum Smart Contract Storage"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://docs.alchemy.com/docs/smart-contract-storage-layout",children:"What is Smart Contract Storage Layout"})}),`
`]})]})}function o(i={}){const{wrapper:s}={...n(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(a,{...i})}):a(i)}export{o as default,r as frontmatter};
