export type BlogPost = {
  title: string;
  subtitle: string;
  previewImage: string;
  href: string;
  /** When ascii efect is enabled, edit these values to change the brightness and contrast of the image */
  brightness: number;
  contrast: number;
};

export const blogPosts: BlogPost[] = [
  {
    title: 'Base’s Next Chapter: Everything We Announced At A New Day One',
    subtitle: 'Base is evolving to be more than a chain. Today, at A New Day One, we introduced Base App (formerly Coinbase Wallet), an everything app that brings together social, apps, chat, payments, and trading.',
    previewImage: '/images/blog/carousel/blog-asset-1.png',
    href: 'https://blog.base.org/a-new-day-one',
    brightness: 1.1,
    contrast: 1.2,
  },
  {
    title: 'J.P. Morgan is moving onchain with deposit tokens on Base',
    subtitle: 'J.P. Morgan is launching a USD-backed deposit token (JPMD) proof of concept on Base, marking a major milestone in bringing traditional banking institutions onchain.',
    previewImage: '/images/blog/carousel/blog-asset-2.png',
    href: 'https://blog.base.org/jpmorgan-is-moving-onchain-on-base',
    brightness: 1.2,
    contrast: 0.9,
  },
  {
    title: 'Base has reached Stage 1 Decentralization',
    subtitle: 'Base has achieved Stage 1 Decentralization, a critical milestone in our journey to build an open and global onchain economy.',
    previewImage: '/images/blog/carousel/blog-asset-3.png',
    href: 'https://blog.base.org/base-has-reached-stage-1-decentralization',
    brightness: 0.9,
    contrast: 1.5,
  },
  {
    title: 'Building for the long-term: making Base faster, simpler, and more powerful',
    subtitle: 'We’re introducing new building blocks that make it faster, simpler, and more powerful to build on Base: Flashblocks, Sub Accounts, and Base Appchains. Plus, a new home base for builders.',
    previewImage: '/images/blog/carousel/blog-asset-4.png',
    href: 'https://blog.base.org/building-for-the-long-term-making-base-faster-simpler-and-more-powerful',
    brightness: 0.9,
    contrast: 1.5,
  },
  {
    title: 'Base 2025 Mission, Vision, and Strategy',
    subtitle: 'Base is a global onchain economy and we’re building it together, in the open. This year, we’re focusing on growing the Base economy by investing in five key pillars.',
    previewImage: '/images/blog/carousel/blog-asset-5.png',
    href: 'https://blog.base.org/base-2025-mission-vision-and-strategy',
    brightness: 1.6,
    contrast: 0.8,
  },
];
