import{u as r,j as e,C as a}from"./index-Dlxm52NL.js";/* empty css                                */const c=void 0;function i(n){const s={a:"a",div:"div",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(s.h2,{id:"passkeys",children:["Passkeys",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#passkeys",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Passkeys enable instant account creation and seamless authentication for Smart Wallet users, dramatically simplifying onboarding. By leveraging FIDO2-compliant authentication, passkeys eliminate seed phrases while providing enterprise-grade security for both wallet access and onchain ownership."}),`
`,e.jsx(s.p,{children:"During account creation, a cryptographic key pair is generated and the private key is securely stored on the user's device, while the public key is registered onchain as an owner of the user's Smart Wallet. The passkey serves two core functions:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Authentication"}),": Replaces passwords for wallet access."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Transaction Signing"}),": Functions as the signing key for onchain transactions, replacing private keys and seed phrases."]}),`
`]}),`
`,e.jsxs(s.h3,{id:"cross-device-support",children:["Cross-Device Support",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cross-device-support",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"Passkeys leverage platform authenticator APIs for cross-device synchronization through:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"iCloud Keychain (Apple devices)"}),`
`,e.jsx(s.li,{children:"Google Password Manager"}),`
`,e.jsx(s.li,{children:"1Password"}),`
`,e.jsx(s.li,{children:"Any WebAuthn-compatible password manager"}),`
`]}),`
`,e.jsx(s.p,{children:"This enables seamless multi-device support without exposing the underlying cryptographic material."}),`
`,e.jsxs(a,{type:"warning",children:[e.jsx(s.p,{children:"Account Recovery Considerations"}),e.jsx(s.p,{children:"Without access to their passkey or a configured recovery key, users will permanently lose wallet access."})]})]})}function l(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{l as default,c as frontmatter};
