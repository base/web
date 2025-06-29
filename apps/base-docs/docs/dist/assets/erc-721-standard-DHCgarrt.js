import{u as s,j as e}from"./index-Dlxm52NL.js";const r={title:"The ERC-721 Token Standard",description:"An overview of the ERC-721 token standard",hide_table_of_contents:!1};function t(i){const n={a:"a",div:"div",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"the-erc-721-token-standard",children:["The ERC-721 Token Standard",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-erc-721-token-standard",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"In this article, we'll delve into the ERC-721 token standard, exploring its technical specs, applications, and how it differs from the ERC-20 standard."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"objectives",children:["Objectives:",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#objectives",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"By the end of this lesson you should be able to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Analyze the anatomy of an ERC-721 token"}),`
`,e.jsx(n.li,{children:"Compare and contrast the technical specifications of ERC-20 and ERC-721"}),`
`,e.jsx(n.li,{children:"Review the formal specification for ERC-721"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"introduction",children:["Introduction",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#introduction",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The development of the Ethereum ecosystem has been marked by key milestones, two of which are the inception of the ERC-20 and ERC-721 token standards. While ERC-20 provided a foundational framework for fungible tokens, ERC-721 established a flexible and adaptable infrastructure for non-fungible tokens (NFTs)."}),`
`,e.jsx(n.p,{children:"The ERC-721 token standard is pivotal in the Ethereum ecosystem for creating and managing unique digital assets. With its consistent rules and functions, it has greatly enhanced the user experience, solidifying its position as the go-to standard for non-fungible tokens. ERC-721 has been instrumental in expanding the digital collectibles market and spurring the development of new applications and services."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/erc-721/evolution-eth-erc721.png",alt:"The Evolution of the Ethereum Ecosystem"})}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"erc-721-specification",children:["ERC-721 Specification",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#erc-721-specification",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"EIP-721 (Ethereum Improvement Proposal 721) is the formal specification for ERC-721, defining the requirements for creating compliant non-fungible tokens on Ethereum. EIP-721 prescribes mandatory functions and events that a token must implement to achieve ERC-721 compliance. Adherence to EIP-721 ensures compatibility of unique tokens with existing Ethereum applications and services, simplifying integration."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"anatomy-of-an-erc-721-token",children:["Anatomy of an ERC-721 Token",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#anatomy-of-an-erc-721-token",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"An ERC-721 token comprises a smart contract implementing the standardized interface, which includes six primary functions:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"balanceOf(address owner)"})," Returns the number of tokens held by a specific address."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ownerOf(uint256):"})," Provides the owner of a specified token."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"safeTransferFrom(address, address, uint256):"})," Transfers a specific token's ownership from one address to another."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"transferFrom(address, address, uint256):"})," Allows a third party to transfer tokens on the token owner's behalf, given the owner's approval."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"approve(address, uint256):"})," Enables the token owner to permit a third party to transfer a specific token on their behalf."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"getApproved(uint256):"})," Shows the approved address for a specific token."]}),`
`]}),`
`,e.jsx(n.p,{children:"These functions ensure each ERC-721 token has a unique identifier and can be owned and transferred individually."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"erc-721-vs-erc-20",children:["ERC-721 Vs ERC-20",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#erc-721-vs-erc-20",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The ERC-721 and ERC-20 token standards share a common goal of providing a set of standards for tokens on the Ethereum network but diverge in terms of functionality and use cases."}),`
`,e.jsx(n.p,{children:"ERC-20 tokens are fungible, meaning each token is identical to every other token; they are interchangeable like currency. On the other hand, ERC-721 tokens are non-fungible, meaning each token is unique and not interchangeable with any other token. This uniqueness is made possible through the ownerOf() and getApproved() functions, which provide information about the ownership of each unique token."}),`
`,e.jsx(n.p,{children:"The ERC-20 standard has primarily found use in creating cryptocurrencies for apps, governance tokens, utility tokens, stablecoins, and more. The ERC-721 standard, conversely, has been adopted largely for creating unique digital assets like collectibles, digital art, and tokenized virtual real estate, among other applications."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"benefits-of-erc-721-standardization",children:["Benefits of ERC-721 Standardization",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#benefits-of-erc-721-standardization",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Standardizing non-fungible tokens via the ERC-721 token standard presents substantial benefits to developers and users in the Ethereum ecosystem. Developers have access to a standardized set of functions, leading to less code ambiguity, fewer errors, and a streamlined development process. This uniformity also ensures smooth integration with existing apps and platforms on Ethereum."}),`
`,e.jsx(n.p,{children:"For users, the ERC-721 standard offers an intuitive, consistent interface for interacting with a wide array of unique tokens. Regardless of the token's specific use or design, users can reliably check their ownership of tokens, transfer tokens to other addresses, and approve transactions. This consistency enhances usability across the Ethereum platform, from digital art marketplaces to tokenized real estate and gaming applications."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/learn/erc-721/erc-721-standard.png",alt:"The Benefits of ERC-721 Standardization"})}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"applications",children:["Applications",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#applications",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"ERC-721 tokens find wide-ranging applications in various categories:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Digital Art:"})," Artists can create unique digital artworks as ERC-721 tokens. These tokens can be sold or traded on platforms like OpenSea, Rarible, and Coinbase NFT. Examples include work by the digital artist Beeple."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Gaming:"})," Game assets such as characters, items, and land can be tokenized as ERC-721 tokens, providing players with true ownership of their in-game assets. Examples include Axie Infinity and Decentraland."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Collectibles:"})," ERC-721 tokens can represent unique collectible items in a digital space. Examples include NBA Top Shot moments and CryptoPunks."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Virtual Real Estate:"})," Virtual real estate can be tokenized as ERC-721 tokens, providing proof of ownership and facilitating trade on virtual platforms. Examples include parcels of land in Cryptovoxels and Decentraland."]}),`
`]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"conclusion",children:["Conclusion",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conclusion",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"ERC-721, with its consistent framework for non-fungible tokens, has revolutionized the unique digital asset space on Ethereum. This standard, when contrasted with ERC-20, highlights Ethereum's capacity for both fungible and unique asset types. Adhering to the EIP-721 specification, ERC-721 tokens have significantly influenced the Ethereum-based digital economy. From digital art to gaming, these tokens underscore their importance and role as catalysts in the burgeoning NFT revolution."}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.h2,{id:"see-also",children:["See Also",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#see-also",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://eips.ethereum.org/EIPS/eip-721",children:"EIP-721: ERC-721 Token Standard"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://ethereum.org/en/developers/docs/standards/tokens/erc-721/",children:"ERC-721 Token Standard"})}),`
`]})]})}function o(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{o as default,r as frontmatter};
