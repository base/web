import{u as r,j as e}from"./index-Dlxm52NL.js";const t={title:"Spend Limits",description:"undefined"};function i(s){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"spend-limits",children:["Spend Limits",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#spend-limits",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:`Spend Limits enable third-party signers to spend assets (native and ERC-20 tokens) from users' wallets. Once granted, spend limits
allow you to move your users' assets without any further signatures, unlocking use cases like subscriptions & trading bots. The reduced signing friction
can also be leveraged to enhance UX for high-frequency use cases such as onchain games.`}),`
`,e.jsx(n.p,{children:"Differences between Spend Limits and ERC-20 permits:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Spend Limits ",e.jsx(n.strong,{children:"supports all ERC-20 assets"}),", whereas permits only support ERC-20s that implement the permit standard"]}),`
`,e.jsxs(n.li,{children:["Spend Limits ",e.jsx(n.strong,{children:"enable spending native tokens"})]}),`
`,e.jsxs(n.li,{children:["Spend Limits offers granular ",e.jsx(n.strong,{children:"controls for recurrence"})]}),`
`,e.jsxs(n.li,{children:["The logic that controls asset movements is ",e.jsx(n.strong,{children:"implemented in the user's wallet"}),", not the asset contract"]}),`
`]}),`
`,e.jsxs(n.h2,{id:"the-spendpermission-details",children:["The ",e.jsx(n.code,{children:"SpendPermission"})," details",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#the-spendpermission-details",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"A spend limit is defined by the following parameters"}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark",style:{backgroundColor:"#fff","--shiki-dark-bg":"#24292e",color:"#24292e","--shiki-dark":"#e1e4e8"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F97583"},children:"struct"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#B392F0"},children:" SpendPermission"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" {"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    address"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" account;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    address"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" spender;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    address"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" token;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint160"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" allowance;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint48"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" period;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint48"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" start;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint48"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" end;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    uint256"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" salt;"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#79B8FF"},children:"    bytes"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:" extraData;"})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#E1E4E8"},children:"}"})})]})})}),`
`,e.jsxs(n.p,{children:["Spend Limits are managed by a single manager contract, the ",e.jsx(n.code,{children:"SpendLimitManager"}),`, which tracks the approval/revocation
statuses of all limits and enforces accurate spending limits and accounting.`]}),`
`,e.jsxs(n.h2,{id:"approving",children:["Approving",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#approving",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["A user approves a spend limit by signing an ",e.jsx(n.a,{href:"https://eips.ethereum.org/EIPS/eip-712",children:"ERC-712"}),` typed object that contains
the spend limit properties. This signature and the corresponding spend limit details are then submitted to
`,e.jsx(n.code,{children:"SpendPermissionManager.approveWithSignature"})," to approve the spend limit onchain."]}),`
`,e.jsxs(n.h2,{id:"revoking",children:["Revoking",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#revoking",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Users can revoke permissions at any time by calling ",e.jsx(n.code,{children:"SpendPermissionManager.revoke"}),`. Revocations are onchain calls that can be
batched similar to other ERC-4337 transactions.`]}),`
`,e.jsxs(n.p,{children:["Spenders can call ",e.jsx(n.code,{children:"SpendPermissionManager.revokeAsSpender"})," to revoke their own permissions without requiring user interaction."]}),`
`,e.jsxs(n.p,{children:[`Once a spend limit has been revoked, it can never be re-approved. Therefore, if a user wants to re-authorize a revoked spend limit,
the spender will need to generate a new spend limit that has a unique hash from the original spend limit.
If the parameters of the new spend limit are identical to the revoked limit, the `,e.jsx(n.code,{children:"salt"})," field of the limit can be used to generate a unique hash."]}),`
`,e.jsxs(n.h2,{id:"cycle-accounting",children:["Cycle accounting",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cycle-accounting",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[`Spend Limits offers granular controls for recurrence (e.g. 10 USDC / month).
As the third-party signer spends user assets, the `,e.jsx(n.code,{children:"SpendPermissionManager"}),` contract tracks cumulative spend and enforces the per-period
allowance. If there are multiple periods defined during the valid lifespan of the spend limit, the cumulative usage resets to 0
at the beginning of the next period, allowing the spender to once again spend up to the allowance.`]}),`
`,e.jsxs(n.p,{children:["This behavior is parameterized by the ",e.jsx(n.code,{children:"start"}),", ",e.jsx(n.code,{children:"end"}),", ",e.jsx(n.code,{children:"period"})," and ",e.jsx(n.code,{children:"allowance"})," properties of the permission."]}),`
`,e.jsx(n.p,{children:`Note that spend limits can be used for non-recurring allowances, either indefinite or with expiry, by setting
a period duration that spans the entire range between start and end.`}),`
`,e.jsxs(n.p,{children:["A comprehensive example of spend limit accounting can be found ",e.jsx(n.a,{href:"https://github.com/coinbase/spend-permissions/blob/main/docs/SpendPermissionAccounting.md",children:"here"}),"."]}),`
`,e.jsxs(n.h2,{id:"additional-resources",children:["Additional resources",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#additional-resources",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Contract sourcecode, diagrams, and additional documentation can be found in the open-source ",e.jsx(n.a,{href:"https://github.com/coinbase/spend-permissions",children:"contracts repository"}),"."]})]})}function d(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{d as default,t as frontmatter};
