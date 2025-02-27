import { defineConfig } from 'vocs';
import { sidebar } from './sidebar.ts';
import { ModuleKind, ModuleResolutionKind } from 'typescript';
import path from 'path';

const baseConfig = {
  //basePath: "https://docs.base.org/docs", // Comment out in local dev
  baseUrl: '/',
  title: 'Base Docs',
  description:
    'Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2',
  iconUrl: {
    light: 'img/favicon.ico',
    dark: 'img/favicon.ico',
  },
  theme: {
    colorScheme: 'dark',
    accentColor: '#578BFA',
    textAccent: '578BFA',
  },
  logoUrl: '/logo.svg',
};

const socialConfig = {
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/base',
    },
    {
      icon: 'x',
      link: 'http://x.com/buildonbase',
    },
    {
      icon: 'warpcast',
      link: 'https://warpcast.com/buildonbase',
    },
    {
      icon: 'discord',
      link: 'https://discord.com/invite/buildonbase',
    },
  ],
};

const twoslashConfig = {
  twoslash: {
    compilerOptions: {
      allowUmdGlobalAccess: true,
      esModuleInterop: true,
      module: ModuleKind.NodeNext,
      moduleResolution: ModuleResolutionKind.NodeNext,
      // allowImportingTsExtensions: true,
      // allowArbitraryExtensions: true,
      // resolveJsonModule: true,
    },
  },
};

const sidebarConfig = {
  sidebar: sidebar,
};

const topNavConfig = {
  topNav: [
    {
      text: 'Get help',
      link: 'https://discord.com/invite/buildonbase?utm_source=dotorg&utm_medium=nav',
    },
    {
      text: 'base.org',
      link: 'https://base.org',
    },
  ],
  layout: 'right',
};

const markdownConfig = {
  code: {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
};

const blogConfig = {
  blogDir: './blog',
};

// Can define path objects which return different meta tags for more control
const headConfig = {
  head: (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Base | Docs" />
      <meta property="og:image" content="https://docs.base.org/img/base-open-graph.png" />
      <meta
        property="og:description"
        content="Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2"
      />
      <meta property="twitter:title" content="Base | Docs" />
      <meta property="twitter:image" content="https://docs.base.org/img/base-open-graph.png" />
      <meta
        property="twitter:description"
        content="Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="base.org" />
    </>
  ),
};

// vocs uses MiniSearch, check configs
const searchConfig = {
  search: {
    fields: ['title', 'content', 'productLine', 'docType', 'userType'], // Fields to index
    storeFields: ['title', 'snippet', 'productLine', 'docType'], // Fields to return in results
    searchOptions: {
      prefix: true, // Autocomplete
      fuzzy: 0.2, // Typo tolerance
      boost: { docType: { API: 2, Guide: 1.5 }, recencyScore: 2 }, // Boosting by document type and recency
      filter: (doc: { productLine: string }) =>
        doc.productLine === 'Base Protocol' || doc.productLine === 'OnchainKit', // Faceted search
      highlight: true, // Instant search result preview
      limit: 10, // Pagination
    },
  },
};

export default defineConfig({
  ...baseConfig,
  ...sidebarConfig,
  ...topNavConfig,
  ...blogConfig,
  ...headConfig,
  ...markdownConfig,
  ...searchConfig,
  ...twoslashConfig,
  ...socialConfig,
  async head({ path }) {
    const analytics = (
      <>
        <script src="https://www.googletagmanager.com/gtag/js?id=G-TKCM02YFWN" async defer />
        <script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TKCM02YFWN');
            `,
          }}
        />
      </>
    );
    return <>{analytics}</>;
  },
  vite: {
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.mdx'],
      alias: {
        '@': path.join(process.cwd(), 'docs'),
        '@/components': path.join(process.cwd(), 'docs/components'),
        '@/pages': path.join(process.cwd(), 'docs/pages'),
        '@/styles': path.join(process.cwd(), 'docs/styles'),
        '@/lib': path.join(process.cwd(), 'docs/lib'),
        '@/utils': path.join(process.cwd(), 'docs/utils'),
        '@/types': path.join(process.cwd(), 'docs/types'),
        '@/images': path.join(process.cwd(), 'docs/public/images'),
      },
    },
  },
});
