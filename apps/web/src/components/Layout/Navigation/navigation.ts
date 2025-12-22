type BrandSubItem = {
  label: string;
  link: string;
};

type BrandItemWithSubitems = {
  label: string;
  link: string;
  subitems: BrandSubItem[];
};

type BrandRoute = {
  label: string;
  href: string;
  newTab?: boolean;
  items?: (BrandSubItem | BrandItemWithSubitems)[];
};

type DefaultRouteItem = {
  icon?: string;
  label: string;
  href?: string;
  newTab?: boolean;
  isSubheader?: boolean;
  isDivider?: boolean;
};

type DefaultRoute = {
  label: string;
  href: string;
  newTab?: boolean;
  items?: DefaultRouteItem[];
  appendix?: DefaultRouteItem[];
};

export const BRAND_ROUTES: BrandRoute[] = [
  {
    label: 'Introduction',
    href: '/brand',
  },
  {
    label: 'Messaging',
    href: '/brand/messaging',
    items: [
      {
        label: 'Critical Style Conventions',
        link: '#critical-style-conventions',
      },
      {
        label: 'Taglines',
        link: '#taglines',
      },
      {
        label: 'Copy',
        link: '#copy',
      },
      {
        label: 'Writing Guidelines',
        link: '#writing-guidelines',
      },
      {
        label: 'Tone & Voice',
        link: '#tone-and-voice',
      },
      {
        label: 'Clarity, Concision & Flow',
        link: '#clarity-concision-and-flow',
      },
      {
        label: 'Nuances',
        link: '#nuances',
      },
      {
        label: 'What to Avoid',
        link: '#what-to-avoid',
      },
    ],
  },
  {
    label: 'Core Identifiers',
    href: '/brand/core-identifiers',
    items: [
      {
        label: 'The Square',
        link: '#the-square',
        subitems: [
          {
            label: 'Shape',
            link: '#the-square-shape',
          },
          {
            label: 'Origin',
            link: '#the-square-origin',
          },
          {
            label: 'Unicode',
            link: '#the-square-unicode',
          },
          {
            label: 'Favicon',
            link: '#the-square-favicon',
          },
          {
            label: 'App Icons',
            link: '#the-square-app-icons',
          },
          {
            label: 'Color',
            link: '#the-square-color',
          },
          {
            label: 'Misuse',
            link: '#the-square-misuse',
          },
          {
            label: 'In-use',
            link: '#the-square-in-use',
          },
        ],
      },
      {
        label: 'Basemark',
        link: '#basemark',
        subitems: [
          {
            label: 'Construction',
            link: '#basemark-construction',
          },
          {
            label: 'Color',
            link: '#basemark-color',
          },
          {
            label: 'Misuse',
            link: '#basemark-misuse',
          },
          {
            label: 'In-use',
            link: '#basemark-in-use',
          },
        ],
      },
      {
        label: 'Logotype',
        link: '#logotype',
        subitems: [
          {
            label: 'Lockup',
            link: '#logotype-lockup',
          },
          {
            label: 'Lockup Correction',
            link: '#logotype-lockup-correction',
          },
          {
            label: 'Usage',
            link: '#logotype-usage',
          },
          {
            label: 'Safe-space',
            link: '#logotype-safe-space',
          },
          {
            label: 'Color',
            link: '#logotype-color',
          },
          {
            label: 'Misuse',
            link: '#logotype-misuse',
          },
          {
            label: 'In-use',
            link: '#logotype-in-use',
          },
        ],
      },
      {
        label: 'Usage',
        link: '#usage',
        subitems: [
          {
            label: 'Layouts',
            link: '#usage-layouts',
          },
        ],
      },
    ],
  },
  {
    label: 'Color',
    href: '/brand/color',
    items: [
      {
        label: 'Our Palette',
        link: '#our-palette',
      },
      {
        label: 'Base Blue',
        link: '#base-blue',
      },
      {
        label: 'Color Values -> HEX, RGB',
        link: '#color-values-hex-rgb',
      },
      {
        label: 'Color Values -> Pantone, CMYK',
        link: '#color-values-pantone-cmyk',
      },
      {
        label: 'Using Color',
        link: '#using-color',
      },
      {
        label: 'Using Secondary Color',
        link: '#using-secondary-color',
      },
      {
        label: 'Using Color on Web',
        link: '#using-color-on-web',
      },
      {
        label: 'Color Interaction and Legibility',
        link: '#color-interaction-and-legibility',
      },
      {
        label: 'Product',
        link: '#product',
      },
      {
        label: 'Misuse',
        link: '#color-misuse',
      },
      {
        label: 'In-use',
        link: '#color-in-use',
      },
    ],
  },
  {
    label: 'Typography',
    href: '/brand/typography',
    items: [
      {
        label: 'Primary Typeface',
        link: '#primary-typeface',
        subitems: [
          {
            label: 'Introducing Base Sans',
            link: '#primary-typeface-introducing-base-sans',
          },
          {
            label: 'Character Set',
            link: '#primary-typeface-character-set',
          },
          {
            label: 'Features',
            link: '#primary-typeface-features',
          },
          {
            label: 'Accessing Brand Elements',
            link: '#accessing-brand-elements',
          },
          {
            label: 'Type System',
            link: '#primary-typeface-type-system',
          },
          {
            label: 'Type System -> Examples',
            link: '#primary-typeface-type-system-examples',
          },
          {
            label: 'Fallback / System Font',
            link: '#primary-typeface-fallback-system-font',
          },
        ],
      },
      {
        label: 'Secondary Typeface',
        link: '#secondary-typeface',
        subitems: [
          {
            label: 'Typetesting',
            link: '#secondary-typeface-typetesting',
          },
          {
            label: 'Styling',
            link: '#secondary-typeface-styling',
          },
          {
            label: 'Roundness',
            link: '#secondary-typeface-roundness',
          },
          {
            label: 'Hierarchy',
            link: '#secondary-typeface-hierarchy',
          },
        ],
      },
    ],
  },
  {
    label: 'Sub Brands',
    href: '/brand/sub-brands',
    items: [
      {
        label: 'Lockup',
        link: '#sub-brands-lockup',
      },
      {
        label: 'Structure',
        link: '#sub-brands-structure',
      },
      {
        label: 'Lockups',
        link: '#sub-brands-lockups',
      },
      {
        label: 'Abstract Lockups',
        link: '#sub-brands-abstract-lockups',
      },
      {
        label: 'In-use',
        link: '#sub-brands-in-use',
      },
    ],
  },
  {
    label: 'Motion',
    href: '/brand/motion',
    items: [
      {
        label: 'Motion',
        link: '#motion',
      },
      {
        label: 'Principle',
        link: '#principle',
      },
      {
        label: 'Type',
        link: '#type',
      },
      {
        label: 'The Square',
        link: '#the-square',
      },
      {
        label: 'Logotype',
        link: '#logotype',
      },
      {
        label: 'Intro/Outro',
        link: '#intro-outro',
      },
      {
        label: 'Misuse',
        link: '#misuse',
      },
    ],
  },
  {
    label: 'Partnerships',
    href: '/brand/partnerships',
    items: [
      {
        label: 'Lockup',
        link: '#lockup',
      },
      {
        label: 'Construction',
        link: '#construction',
      },
      {
        label: 'Lockup System',
        link: '#lockup-system',
      },
      {
        label: 'Lockup Examples',
        link: '#lockup-examples',
      },
    ],
  },
  {
    label: 'In Use',
    href: '/brand/in-use',
  },
];

export const DEFAULT_ROUTES: DefaultRoute[] = [
  {
    label: 'Chain',
    href: '/chain',
    items: [
      {
        icon: 'chain',
        label: 'Base Chain',
        href: '/chain',
      },
      {
        label: 'Status',
        href: 'https://status.base.org',
        newTab: true,
      },
      {
        label: 'Block Explorer',
        href: 'https://basescan.org',
        newTab: true,
      },
      {
        label: 'Big Bounty',
        href: 'http://hackerone.com/coinbase',
        newTab: true,
      },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    items: [
      {
        label: 'Base App',
        href: 'https://base.app',
        newTab: true,
      },
      {
        label: 'Base Pay',
        href: '/pay',
      },
    ],
  },
  {
    label: 'Developers',
    href: '/build',
    items: [
      {
        label: 'Base Build',
        href: '/build',
        newTab: true,
      },
      {
        label: 'Dashboard',
        href: 'https://base.dev/',
        newTab: true,
      },
      {
        label: 'Documentation',
        href: 'https://docs.base.org/',
        newTab: true,
      },
      {
        label: 'Github',
        href: 'https://github.com/base',
        newTab: true,
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    items: [
      {
        label: 'Enterprise',
        href: '/enterprises',
      },
      {
        label: 'Startups',
        href: '/startups',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    items: [
      {
        label: 'Vision',
        href: '/about/vision',
      },
      {
        label: 'Brand Kit',
        href: 'https://base.org/brand',
      },
      {
        label: 'Blog',
        href: 'https://blog.base.org',
        newTab: true,
      },
      {
        label: 'Jobs',
        href: '/jobs',
      },
    ],
  },
  {
    label: 'Community',
    href: '/community',
    items: [
      {
        label: 'Resources',
        href: '/resources',
      },
      {
        label: 'Batches',
        href: 'https://www.basebatches.xyz/',
        newTab: true,
      },
      {
        label: 'Events',
        href: 'https://luma.com/BaseEvents',
        newTab: true,
      },
    ],
  },
  {
    label: 'Ecosystem',
    href: '/ecosystem',
  },
];

export const APP_LINKS = [
  {
    label: 'Sign up',
    href: '/sign-up',
  },
  {
    label: 'Coinbase Wallet',
    href: '/wallet',
  },
  {
    label: 'Coinbase Wallet',
    href: '/wallet-2',
  },
  {
    label: 'Phantom',
    href: '/phantom',
  },
  {
    label: 'Rabby',
    href: '/rabby',
  },
  {
    label: 'Trust Wallet',
    href: '/trust-wallet',
  },
];
