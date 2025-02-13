const dotenv = require('dotenv');
dotenv.config();

const baseConfig = {
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'frontend',
  projectName: 'web',
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
  },
};

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

const APP_TITLE = 'Base';
const PRODUCT_NAME = 'Base';

const config = {
  ...baseConfig,
  title: APP_TITLE,
  tagline: '',
  url: 'https://docs.base.org',
  customFields: {
    nodeEnv: process.env.NODE_ENV,
    sprigEnvironmentId: 'Q2ppiEaeSEJI',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('@rainbow-me/rainbowkit/styles.css'),
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'base-learn',
        path: 'base-learn',
        routeBasePath: 'base-learn',
        sidebarPath: require.resolve('./base-learn/sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorials',
        path: 'tutorials',
        routeBasePath: 'tutorials',
        sidebarPath: require.resolve('./tutorials/sidebars.js'),
        breadcrumbs: false,
      },
    ],
    'docusaurus-node-polyfills',
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/tutorials')) {
            return [existingPath.replace('/tutorials', '/guides')];
          }
          return undefined;
        },
      },
    ],
  ],
  scripts: [
    {
      src: 'https://static-assets.coinbase.com/js/cca/v0.0.1.js',
      async: true,
    },
  ],
  clientModules: [require.resolve('./src/utils/initCCA.ts')],

  themeConfig: {
    image: 'img/base-open-graph.png',
    metadata: [
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: 'Base | Docs' },
      {
        name: 'og:description',
        content:
          'Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2',
      },
      { name: 'twitter:title', content: 'Base | Docs' },
      {
        name: 'twitter:description',
        content:
          'Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:domain', content: 'base.org' },
    ],

    ...baseConfig.themeConfig,
    navbar: {
      logo: {
        alt: `${PRODUCT_NAME} Docs`,
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
        {
          to: '/',
          exact: true,
          navposition: 'bottomLeft',
          label: 'Home',
          type: 'custom-navbarLink',
          eventLabel: 'home',
          eventContext: 'navbar',
        },
        {
          to: 'https://base.org/build',
          navposition: 'bottomLeft',
          label: 'Get Started',
          type: 'custom-navbarLink',
          eventLabel: 'build',
          eventContext: 'navbar',
        },
        {
          to: '/docs',
          navposition: 'bottomLeft',
          label: 'Docs',
          type: 'custom-navbarLink',
          eventLabel: 'docs',
          eventContext: 'navbar',
        },
        {
          to: '/base-learn/docs/welcome',
          navposition: 'bottomLeft',
          label: 'Learn',
          items: [
            {
              label: 'Learn to Build Onchain',
              to: '/base-learn/docs/welcome',
              type: 'custom-dropdownLink',
              eventLabel: 'camp_learn',
              eventContext: 'navbar',
            },
            {
              label: 'Tutorials',
              to: '/tutorials',
              type: 'custom-dropdownLink',
              eventLabel: 'tutorials',
              eventContext: 'navbar',
            },
            {
              label: 'Track your progress',
              to: '/base-learn/progress',
              type: 'custom-dropdownLink',
              eventLabel: 'camp_trackprogress',
              eventContext: 'navbar',
            },
            {
              label: 'Bootcamp',
              to: 'https://base.org/bootcamp',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'camp_bootcamp',
              eventContext: 'navbar',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Ecosystem',
          navposition: 'topRight',
          items: [
            {
              label: 'Apps',
              to: 'https://www.base.org/ecosystem',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'ecosystem_apps',
              eventContext: 'navbar',
            },
            {
              label: 'Grants',
              to: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'ecosystem_grants',
              eventContext: 'navbar',
            },
          ],
        },
        {
          label: 'Bridge',
          navposition: 'topRight',
          to: 'https://bridge.base.org/',
          type: 'custom-navbarLink',
          eventLabel: 'bridge',
          eventContext: 'navbar',
        },
        {
          type: 'dropdown',
          label: 'Builders',
          navposition: 'topRight',
          items: [
            {
              label: 'Block Explorer',
              to: 'https://base.blockscout.com/',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'builders_blockexplorer',
              eventContext: 'navbar',
            },
            {
              label: 'Status',
              to: 'https://status.base.org/',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'builders_status',
              eventContext: 'navbar',
            },
            {
              label: 'Bug Bounty',
              to: 'https://hackerone.com/coinbase',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'builders_bugbounty',
              eventContext: 'navbar',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'About',
          navposition: 'topRight',
          items: [
            {
              label: 'Mission',
              to: 'https://www.base.org/about',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'about_mission',
              eventContext: 'navbar',
            },
            {
              label: 'Blog',
              to: 'https://base.mirror.xyz/',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'about_blog',
              eventContext: 'navbar',
            },
            {
              label: 'Jobs',
              to: 'https://www.base.org/jobs',
              target: '_blank',
              type: 'custom-dropdownLink',
              eventLabel: 'about_jobs',
              eventContext: 'navbar',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Socials',
          navposition: 'topRight',
          items: [
            {
              label: 'Farcaster',
              icon: 'farcaster',
              type: 'custom-dropdownLink',
              target: '_blank',
              to: 'https://warpcast.com/base',
              eventLabel: 'socials_farcaster',
              eventContext: 'navbar',
            },
            {
              label: 'Discord',
              icon: 'discord',
              type: 'custom-dropdownLink',
              target: '_blank',
              to: 'https://discord.com/invite/buildonbase',
              eventLabel: 'socials_discord',
              eventContext: 'navbar',
            },
            {
              label: 'Social X',
              icon: 'twitter',
              type: 'custom-dropdownLink',
              target: '_blank',
              to: 'https://x.com/base',
              eventLabel: 'socials_twitter',
              eventContext: 'navbar',
            },
            {
              label: 'Github',
              icon: 'github',
              type: 'custom-dropdownLink',
              target: '_blank',
              to: 'https://www.github.com/base-org',
              eventLabel: 'socials_github',
              eventContext: 'navbar',
            },
          ],
        },
        // Language selection dropdown will be supported in the future
        // {
        //   type: 'localeDropdown',
        //   navposition: 'bottomRight',
        // },
      ],
    },
    algolia: {
      // Application ID
      appId: 'EG1Y9QIPP9',
      // Public API key - safe to commit
      apiKey: '59218c35b3c3e1aa3cdca101ca109839',
      indexName: 'prod',
      contextualSearch: false,
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['solidity'],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
  },
  // Language selection dropdown will be supported in the future
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'fr'],
  //   localeConfigs: {},
  // },
};

module.exports = config;
