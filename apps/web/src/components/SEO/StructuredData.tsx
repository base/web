import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Base',
    alternateName: 'Base Blockchain',
    url: 'https://base.org',
    logo: 'https://base.org/images/base-logo.svg',
    description:
      'Base is a secure, low-cost Ethereum Layer 2 blockchain built on Optimism. Empowering builders to create decentralized applications with EVM compatibility.',
    sameAs: [
      'https://twitter.com/base',
      'https://github.com/base-org',
      'https://discord.gg/buildonbase',
      'https://warpcast.com/base',
    ],
    foundingDate: '2023',
    founder: {
      '@type': 'Organization',
      name: 'Coinbase',
      url: 'https://www.coinbase.com',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://base.org/about',
    },
  };

  return <StructuredData data={schema} />;
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Base',
    alternateName: 'Base Blockchain',
    url: 'https://base.org',
    description:
      'Base is an Ethereum Layer 2 blockchain offering a secure, low-cost platform for building decentralized applications.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://base.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Base',
      logo: {
        '@type': 'ImageObject',
        url: 'https://base.org/images/base-logo.svg',
      },
    },
  };

  return <StructuredData data={schema} />;
}

// SoftwareApplication Schema (for developer platform)
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Base Blockchain Platform',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, Ethereum',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Base is an Ethereum Layer 2 blockchain platform for building secure, scalable decentralized applications with low transaction costs.',
    screenshot: 'https://base.org/images/base-open-graph.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'Base',
      url: 'https://base.org',
    },
  };

  return <StructuredData data={schema} />;
}

// FAQPage Schema
export function FAQPageSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <StructuredData data={schema} />;
}

// BreadcrumbList Schema
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string; position: number }>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={schema} />;
}

// Article Schema (for blog posts)
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  imageUrl?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://base.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Base',
      logo: {
        '@type': 'ImageObject',
        url: 'https://base.org/images/base-logo.svg',
      },
    },
    image: imageUrl || 'https://base.org/images/base-open-graph.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return <StructuredData data={schema} />;
}

// Product Schema (for ecosystem apps)
export function ProductSchema({
  name,
  description,
  image,
  url,
  category,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    image: image,
    url: url,
    applicationCategory: category,
    operatingSystem: 'Ethereum, Base',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Base Ecosystem',
      url: 'https://base.org/ecosystem',
    },
  };

  return <StructuredData data={schema} />;
}
