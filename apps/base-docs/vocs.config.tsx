import { defineConfig } from 'vocs'
import { sidebar } from './sidebar.ts'
import { ModuleKind, ModuleResolutionKind } from 'typescript'
import React from 'react'
import path from 'path'

const baseConfig = {
  //basePath: "https://docs.base.org/docs", // Comment out in local dev
  baseUrl: '/',
  title: 'Base Docs',
  description: 'Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2',
  iconUrl: {
    light: 'img/favicon.ico',
    dark: 'img/favicon.ico',
  },
  // logoUrl: {
  //   // light: ,
  //   // dark: ,
  // }
}

// used for global dismissable announcements, etc
const bannerConfig = {
  // If we don't fork vocs, the banner can be overridden as seen below to add a header
  // banner: {
  //   content: (
  //     <div className="vocs_banner_content">
  //       <div className="left-column">
  //         {/* Optional: Add content here if needed in the future */}
  //       </div>
  //       <div className="center-column">
  //         <nav className="navigation-links">
  //           <a href="/">API</a>
  //           <a href="/docs">Tools</a>
  //           <a href="/blog">Blog</a>
  //           <a href="/community">Community</a>
  //         </nav>
  //       </div>
  //       <div className="right-column">
  //         <button
  //           className="connect-wallet-button"
  //           onClick={() => {
  //             // Add your wallet connection logic here
  //           }}
  //         >
  //           Connect Wallet
  //         </button>
  //       </div>
  //     </div>
  //   ),
  //   height: '99px', // Must match height in CSS
  //   dismissable: 'false', // Make it permanent
  //   backgroundColor: '#232225', // Charcoal color
  // }
}

// Reusable nav link styles (if not using Tailwind)
const navLinkStyle: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
  transition: 'opacity 0.2s',
  ':hover': { opacity: 0.7 },
}

const twoslashConfig = {
  twoslash: {
    compilerOptions: {
      allowUmdGlobalAccess: true,
      esModuleInterop: true,
      module: ModuleKind.NodeNext, //ModuleKind.Preserve
      moduleResolution: ModuleResolutionKind.NodeNext,
    },
  }
}

const sidebarConfig = {
  sidebar: sidebar
}

const topNavConfig = {
  topNav: [
    { text: 'Get Help', link: 'https://discord.com/invite/buildonbase?utm_source=dotorg&utm_medium=nav'},
    {
      text: 'base.org',
      link: 'https://base.org',
    }
  ],
  layout: 'right',
}

const markdownConfig = {
  code: {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    }
  }
}

// plugins for transforming markdown: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
const pluggableConfig ={
  markdown: {
    remarkPlugins: [
      // Add your remark plugins here
    ]
  }
}


const blogConfig = {
  blogDir: "./blog"
}

// Can define path objects which return different meta tags for more control
const headConfig = {
  head: (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Base | Docs" />
      <meta property="og:image" content="https://docs.base.org/img/base-open-graph.png" />
      <meta property="og:description" content="Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2" />
      <meta property="twitter:title" content="Base | Docs" />
      <meta property="twitter:image" content="https://docs.base.org/img/base-open-graph.png" />
      <meta property="twitter:description" content="Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="base.org" />
    </>
  ),
}

// vocs uses MiniSearch, check configs
const searchConfig = { 
  search: {
    fields: ['title', 'content', 'productLine', 'docType', 'userType'],  // Fields to index
    storeFields: ['title', 'snippet', 'productLine', 'docType'], // Fields to return in results
    searchOptions: {
      prefix: true, // Autocomplete
      fuzzy: 0.2,  // Typo tolerance
      boost: { docType: { 'API': 2, 'Guide': 1.5 }, recencyScore: 2 }, // Boosting by document type and recency
      filter: (doc: { productLine: string }) => 
        doc.productLine === 'Base Protocol' || doc.productLine === 'OnchainKit', // Faceted search
      highlight: true, // Instant search result preview
      limit: 10 // Pagination
    }
  }
}

export default defineConfig({
  ...baseConfig,
  ...bannerConfig,
  ...sidebarConfig,
  ...topNavConfig,
  ...blogConfig,
  ...headConfig,
  ...markdownConfig,
  ...pluggableConfig,
  ...searchConfig,
  ...twoslashConfig,
  vite: {
    resolve: {
      alias: {
        '@': path.join(process.cwd(), 'docs'),
        '@/components': path.join(process.cwd(), 'docs/components'),
        '@/pages': path.join(process.cwd(), 'docs/pages'),
        '@/styles': path.join(process.cwd(), 'docs/styles'),
        '@/lib': path.join(process.cwd(), 'docs/lib'),
        '@/utils': path.join(process.cwd(), 'docs/utils'),
        '@/types': path.join(process.cwd(), 'docs/types')
      }
    }
  }
})

