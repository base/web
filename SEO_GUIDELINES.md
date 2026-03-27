# SEO Guidelines for Base.org Development

## Table of Contents
1. [Introduction](#introduction)
2. [Metadata Best Practices](#metadata-best-practices)
3. [Structured Data](#structured-data)
4. [Content SEO](#content-seo)
5. [Technical SEO](#technical-seo)
6. [Link Building](#link-building)
7. [Tools & Resources](#tools--resources)

---

## Introduction

This document provides SEO guidelines for developers working on base.org. Following these guidelines ensures consistent, search-engine-friendly implementation across all pages.

### Why SEO Matters

- **60-70% of traffic** comes from organic search
- **First page rankings** capture 90% of clicks
- **Top 3 positions** get 60% of all organic clicks
- **Good SEO** = Better user experience + discoverability

### Core SEO Principles

1. **Mobile-first**: Google indexes mobile version first
2. **Fast loading**: Page speed is a ranking factor
3. **Quality content**: Comprehensive, useful, unique
4. **User intent**: Match content to search queries
5. **Technical excellence**: Clean code, proper metadata

---

## Metadata Best Practices

### Page Titles

```typescript
// ✅ Good: Descriptive, keyword-rich, under 60 characters
export const metadata: Metadata = {
  title: 'Build on Base | Ethereum L2 Developer Tools',
};

// ❌ Bad: Generic, too long, no keywords
export const metadata: Metadata = {
  title: 'Welcome to our amazing platform where you can build great things',
};
```

#### Title Rules

1. **Length**: 50-60 characters (mobile SERPs cut at ~50)
2. **Keywords**: Include primary keyword near the beginning
3. **Brand**: Use template `%s | Base` for consistency
4. **Uniqueness**: Every page must have unique title
5. **Compelling**: Make it click-worthy

#### Title Formula

```
[Primary Keyword] - [Benefit/Feature] | Base
```

**Examples**:
- `Ethereum L2 Scaling | Fast, Secure, Low-Cost | Base`
- `DeFi Development Platform | Build on Base L2`
- `Base Ecosystem | 1000+ Decentralized Apps`

---

### Meta Descriptions

```typescript
// ✅ Good: Compelling, keyword-rich, 150-160 characters
description:
  'Build decentralized apps on Base, a secure Ethereum L2. Get started with low gas fees, EVM compatibility, and Coinbase integration.',

// ❌ Bad: Too short, no keywords, not compelling
description: 'Base is great. Start building today.'
```

#### Description Rules

1. **Length**: 150-160 characters
2. **Keywords**: Include 2-3 target keywords naturally
3. **Call-to-action**: Include action words (build, discover, learn)
4. **Benefits**: Highlight key differentiators
5. **Accuracy**: Match actual page content

#### Description Formula

```
[What it is] + [Key benefit] + [Unique feature] + [CTA]
```

**Example**:
```
Base is a secure Ethereum L2 blockchain with low fees and fast transactions.
Build dApps with EVM compatibility and Coinbase integration. Start building today.
```

---

### Keywords

```typescript
// ✅ Good: Relevant, specific, varied
keywords: [
  'ethereum l2',          // Primary
  'layer 2 blockchain',   // Primary
  'base blockchain',      // Branded
  'smart contracts',      // Secondary
  'defi platform',        // Secondary
  'build onchain',        // Long-tail
  'evm compatible',       // Technical
]

// ❌ Bad: Too many, irrelevant, stuffed
keywords: [
  'blockchain', 'crypto', 'bitcoin', 'nft', 'web3', 'defi',
  'metaverse', 'gaming', 'dao', 'token', 'wallet', 'exchange',
  // ... 50 more keywords
]
```

#### Keyword Rules

1. **Quantity**: 10-20 keywords per page
2. **Relevance**: Only keywords matching page content
3. **Mix**: Primary (3-5), secondary (5-10), long-tail (5-10)
4. **Specificity**: "ethereum l2" > "blockchain"
5. **Natural**: How users actually search

#### Keyword Research Process

1. **Use tools**: Google Keyword Planner, Ahrefs, SEMrush
2. **Check competitors**: What keywords rank for Optimism, Arbitrum?
3. **Analyze intent**: Informational, navigational, transactional
4. **Long-tail focus**: Less competition, higher conversion

---

### Open Graph Tags

```typescript
// ✅ Complete Open Graph implementation
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://base.org/page-path',
  siteName: 'Base',
  title: 'Page Title - Same as meta title',
  description: 'Same as meta description',
  images: [
    {
      url: 'https://base.org/images/og-page-specific.png',
      width: 1200,
      height: 630,
      alt: 'Descriptive alt text',
      type: 'image/png',
    },
  ],
},
```

#### Open Graph Rules

1. **Images**: 1200x630px (Facebook/LinkedIn standard)
2. **Alt text**: Describe the image for accessibility
3. **URL**: Absolute URLs, not relative
4. **Uniqueness**: Custom OG image per major page
5. **Testing**: Validate with [OpenGraph.xyz](https://www.opengraph.xyz/)

---

### Twitter Cards

```typescript
// ✅ Complete Twitter Card implementation
twitter: {
  card: 'summary_large_image',  // Use large image format
  site: '@base',
  creator: '@base',
  title: 'Twitter-optimized title (can differ from OG)',
  description: 'Shorter description for Twitter (under 200 chars)',
  images: ['https://base.org/images/twitter-card.png'],
},
```

#### Twitter Card Rules

1. **Card type**: Always use `summary_large_image`
2. **Images**: Same 1200x630px format as OG
3. **Handles**: Include @base for attribution
4. **Testing**: Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

### Canonical URLs

```typescript
// ✅ Always specify canonical URL
alternates: {
  canonical: 'https://base.org/page-path',
}

// Use for:
// - Preventing duplicate content
// - Consolidating similar pages
// - Specifying preferred URL
```

#### Canonical Rules

1. **Always absolute**: `https://base.org/path`, not `/path`
2. **One per page**: Each page should have exactly one
3. **Self-referential**: Page can be its own canonical
4. **Consistency**: Match sitemap URLs exactly

---

## Structured Data

### Organization Schema (Site-wide)

```typescript
import { OrganizationSchema } from 'apps/web/src/components/SEO/StructuredData';

// Add to layout.tsx
<OrganizationSchema />
```

**When to use**: Main layout, included on every page

**Benefits**:
- Knowledge Graph eligibility
- Brand recognition
- Social profiles in SERPs

---

### Website Schema (Homepage)

```typescript
import { WebsiteSchema } from 'apps/web/src/components/SEO/StructuredData';

// Add to homepage
<WebsiteSchema />
```

**Benefits**:
- Site search box in Google
- Better site understanding
- Enhanced SERP features

---

### Article Schema (Blog posts)

```typescript
import { ArticleSchema } from 'apps/web/src/components/SEO/StructuredData';

// Add to blog post pages
<ArticleSchema
  title="How to Build on Base: Complete Guide"
  description="Learn how to build decentralized applications on Base L2..."
  url="https://base.org/blog/how-to-build-on-base"
  datePublished="2026-01-05"
  dateModified="2026-01-05"
  authorName="Base Team"
  imageUrl="https://base.org/images/blog/build-guide.png"
/>
```

**Benefits**:
- Rich snippets in news results
- Author attribution
- Publication date display

---

### FAQ Schema (FAQ sections)

```typescript
import { FAQPageSchema } from 'apps/web/src/components/SEO/StructuredData';

const faqs = [
  {
    question: 'What is Base?',
    answer: 'Base is a secure, low-cost Ethereum L2 blockchain...',
  },
  {
    question: 'How do I start building on Base?',
    answer: 'You can start building on Base by...',
  },
];

<FAQPageSchema faqs={faqs} />
```

**Benefits**:
- FAQ rich snippets
- Expanded SERP real estate
- Higher CTR

---

### Breadcrumb Schema (Navigation)

```typescript
import { BreadcrumbSchema } from 'apps/web/src/components/SEO/StructuredData';

const breadcrumbs = [
  { name: 'Home', url: 'https://base.org', position: 1 },
  { name: 'Build', url: 'https://base.org/build', position: 2 },
  { name: 'Tutorials', url: 'https://base.org/build/tutorials', position: 3 },
];

<BreadcrumbSchema items={breadcrumbs} />
```

**Benefits**:
- Breadcrumb navigation in SERPs
- Better user orientation
- Improved crawlability

---

## Content SEO

### Heading Hierarchy

```tsx
// ✅ Proper heading structure
<h1>Main Page Title</h1>  {/* Only ONE h1 per page */}
  <h2>Major Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
  <h2>Another Major Section</h2>
    <h3>Subsection</h3>

// ❌ Bad: Multiple h1s, skipped levels
<h1>Title One</h1>
<h1>Title Two</h1>  {/* Don't do this */}
<h4>Subsection</h4>  {/* Skipped h2 and h3 */}
```

#### Heading Rules

1. **One H1**: Only one per page (usually page title)
2. **Hierarchy**: Don't skip levels (h1 → h2 → h3)
3. **Keywords**: Include keywords in h1 and h2 tags
4. **Length**: Keep under 60 characters
5. **Descriptive**: Clear, accurate section labels

---

### Content Quality

#### Content Checklist

- [ ] **Length**: Minimum 300 words for basic pages, 1500+ for pillar content
- [ ] **Uniqueness**: 100% original, not duplicated
- [ ] **Value**: Answers user questions comprehensively
- [ ] **Keywords**: Natural inclusion of target keywords (1-2% density)
- [ ] **Readability**: Short paragraphs, bullet points, clear language
- [ ] **Media**: Include images, videos, diagrams
- [ ] **Links**: Internal links to related pages, external to authoritative sources
- [ ] **Freshness**: Update regularly, add "Last updated" dates

#### Content Formula (for tutorials/guides)

1. **Introduction** (10%)
   - What problem does this solve?
   - What will the reader learn?

2. **Prerequisites** (5%)
   - What knowledge is needed?
   - What tools are required?

3. **Step-by-step Guide** (70%)
   - Clear numbered steps
   - Code examples
   - Screenshots/diagrams

4. **Conclusion** (10%)
   - Summary of what was covered
   - Next steps
   - Call to action

5. **FAQ** (5%)
   - Common questions
   - Troubleshooting

---

### Internal Linking

```tsx
// ✅ Good: Descriptive anchor text, relevant links
<Link href="/build/tutorials">
  Learn how to build on Base with our comprehensive tutorials
</Link>

// ❌ Bad: Generic anchor text
<Link href="/build/tutorials">
  Click here
</Link>
```

#### Internal Linking Rules

1. **Anchor text**: Descriptive, include keywords
2. **Relevance**: Only link to related content
3. **Quantity**: 2-5 internal links per page
4. **Dofollow**: Internal links should always be dofollow
5. **Strategy**: Link from high-authority pages to important pages

#### Internal Linking Strategy

- **Pillar pages**: Link to all related cluster pages
- **Cluster pages**: Link back to pillar page
- **Navigation**: Consistent site-wide navigation
- **Contextual**: In-content links more valuable than sidebar/footer

---

### Image Optimization

```tsx
// ✅ Good: Descriptive alt text, optimized dimensions
<Image
  src="/images/base-architecture.png"
  alt="Base blockchain architecture diagram showing Optimism rollup integration"
  width={1200}
  height={600}
  loading="lazy"
/>

// ❌ Bad: No alt text, oversized
<Image
  src="/images/img123.png"
  alt="image"
  width={4000}
  height={3000}
/>
```

#### Image SEO Rules

1. **Alt text**: Descriptive, include keywords when relevant
2. **File names**: `base-architecture.png`, not `img123.png`
3. **Dimensions**: Specify width/height to prevent layout shift
4. **Format**: WebP for best compression, PNG for logos
5. **Size**: Keep under 200KB per image
6. **Lazy loading**: Use for below-fold images

---

## Technical SEO

### URL Structure

```
// ✅ Good: Clean, descriptive URLs
https://base.org/build/tutorials/deploy-smart-contract
https://base.org/ecosystem/defi
https://base.org/blog/ethereum-l2-comparison

// ❌ Bad: ID-based, unclear
https://base.org/page?id=123
https://base.org/article-1234567
https://base.org/p/a/b/c/d
```

#### URL Rules

1. **Lowercase**: Always use lowercase
2. **Hyphens**: Use hyphens, not underscores (`-` not `_`)
3. **Keywords**: Include primary keyword when relevant
4. **Short**: Keep under 60 characters
5. **Logical**: Reflect site hierarchy

---

### Sitemap Management

**File**: `apps/web/app/sitemap.ts`

```typescript
// When adding new pages, update sitemap
{
  url: `${baseUrl}/new-page`,
  lastModified: new Date(),
  changeFrequency: 'weekly',  // How often page updates
  priority: 0.8,              // Importance (0.0-1.0)
}
```

#### Sitemap Rules

1. **Include all pages**: Every indexable page should be in sitemap
2. **Priority**: Homepage = 1.0, important pages = 0.8-0.9
3. **Change frequency**: Align with actual update schedule
4. **Last modified**: Use accurate dates
5. **Validate**: Test with [XML Sitemaps](https://www.xml-sitemaps.com/)

---

### Robots.txt

**File**: `apps/web/app/robots.ts`

```typescript
// Don't block important pages
disallow: [
  '/api/',           // Block API endpoints
  '/_next/',         // Block Next.js internal
  '/admin/',         // Block admin areas
  '*.json',          // Block JSON files
],

// Allow crawling of public pages
allow: '/',
```

#### Robots Rules

1. **Test first**: Use Google Search Console to test
2. **Don't block CSS/JS**: Googlebot needs to render pages
3. **Allow images**: Don't block image URLs
4. **Sitemap reference**: Always include sitemap URL
5. **Review regularly**: Audit quarterly

---

### Performance Optimization

#### Core Web Vitals Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **LCP** | < 2.5s | 2.1s | ✅ |
| **FID** | < 100ms | 45ms | ✅ |
| **CLS** | < 0.1 | 0.08 | ✅ |

#### Performance Checklist

- [ ] Images optimized (WebP, lazy loading)
- [ ] Code splitting implemented
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Server-side rendering (SSR) for critical pages
- [ ] CDN for static assets
- [ ] Caching headers configured
- [ ] Font optimization (font-display: swap)

---

### Mobile Optimization

```tsx
// ✅ Responsive images
<Image
  src="/hero.png"
  alt="Base homepage"
  width={800}
  height={600}
  srcSet="/hero-mobile.png 480w, /hero-tablet.png 768w, /hero.png 1200w"
  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
/>

// ✅ Mobile-first CSS
<div className="text-base sm:text-lg md:text-xl">
  Responsive text
</div>
```

#### Mobile SEO Rules

1. **Responsive design**: Mobile-first approach
2. **Touch targets**: Minimum 44x44px
3. **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
4. **No popups**: Avoid intrusive interstitials
5. **Fast loading**: Optimize for slow connections

---

## Link Building

### Internal Link Building

**Strategy**: Create topic clusters

```
Pillar Page: "Building on Base"
    ↓
Cluster Pages:
- "Deploy Smart Contract on Base"
- "Base Development Tools"
- "Base Gas Optimization"
- "Base Security Best Practices"
```

**Implementation**:
- Link cluster pages to pillar page
- Link pillar page to all clusters
- Cross-link related cluster pages

---

### External Link Building

#### High-Value Link Opportunities

1. **Developer Documentation**
   - Link to official Ethereum docs
   - Reference Optimism documentation
   - Cite Web3 standards (EIPs)

2. **Educational Content**
   - Tutorial citations
   - Academic papers
   - Research articles

3. **Industry Resources**
   - DeFi Llama
   - L2Beat
   - DappRadar

#### Link Building Tactics

1. **Guest Posting**
   - Write for crypto/blockchain blogs
   - Target sites with DA > 40
   - Include natural links to base.org

2. **Resource Pages**
   - Get listed on "Ethereum L2 resources"
   - Developer tool directories
   - Blockchain comparisons

3. **PR & News**
   - Product launches
   - Partnership announcements
   - Community milestones

4. **Community Engagement**
   - Answer questions on Reddit, Stack Overflow
   - Participate in GitHub discussions
   - Engage on crypto Twitter

---

## Tools & Resources

### Essential SEO Tools

1. **Google Search Console** (Free)
   - Monitor search performance
   - Check indexation status
   - Identify technical issues

2. **Google Analytics 4** (Free)
   - Track organic traffic
   - Measure conversions
   - Analyze user behavior

3. **Schema Markup Validator** (Free)
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org Validator](https://validator.schema.org/)

4. **Page Speed Tools** (Free)
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)
   - [WebPageTest](https://www.webpagetest.org/)

5. **SEO Browser Extensions**
   - SEO Meta in 1 Click
   - Detailed SEO Extension
   - Lighthouse (Chrome DevTools)

### Paid SEO Tools (Optional)

1. **Ahrefs** ($99-$999/mo)
   - Keyword research
   - Backlink analysis
   - Competitor research

2. **SEMrush** ($119-$449/mo)
   - All-in-one SEO platform
   - Position tracking
   - Content optimization

3. **Screaming Frog** ($259/year)
   - Technical SEO audit
   - Crawl website
   - Find issues

---

## PR Checklist

### Before Submitting PR

- [ ] Page title is 50-60 characters
- [ ] Meta description is 150-160 characters
- [ ] Keywords are relevant and not stuffed
- [ ] Open Graph tags are complete
- [ ] Twitter Card tags are present
- [ ] Canonical URL is set
- [ ] Structured data is implemented (if applicable)
- [ ] Images have alt text
- [ ] Internal links use descriptive anchor text
- [ ] Heading hierarchy is correct (h1 → h2 → h3)
- [ ] No duplicate content
- [ ] URLs are clean and descriptive
- [ ] Sitemap is updated (if new page)
- [ ] Robots.txt allows crawling
- [ ] Core Web Vitals are within targets
- [ ] Mobile-responsive

### Testing

```bash
# Test metadata locally
yarn dev
# Open http://localhost:3000/your-page
# Check <head> tags in browser DevTools

# Validate structured data
# Paste page HTML into: https://validator.schema.org/

# Check Open Graph
# Test at: https://www.opengraph.xyz/

# Verify Twitter Card
# Test at: https://cards-dev.twitter.com/validator
```

---

## Common Mistakes to Avoid

### ❌ Duplicate Titles/Descriptions

Every page must have unique metadata. Don't reuse the same title/description.

### ❌ Keyword Stuffing

```
// ❌ Bad
"Base Ethereum L2 blockchain Base L2 Base blockchain Ethereum Base"

// ✅ Good
"Base: A secure Ethereum L2 blockchain for developers"
```

### ❌ Missing Alt Text

All images must have descriptive alt text for accessibility and SEO.

### ❌ Broken Links

Check internal and external links regularly. Broken links hurt SEO.

### ❌ Thin Content

Pages with < 300 words rarely rank well. Provide comprehensive content.

### ❌ Slow Loading

Page speed is a ranking factor. Keep pages under 3 seconds load time.

### ❌ No Mobile Optimization

70%+ of searches are mobile. Always test on mobile devices.

---

## Getting Help

### Questions?

- Review this guide and [SEO_AUDIT_REPORT.md](./SEO_AUDIT_REPORT.md)
- Check Google Search Console for issues
- Test with online validation tools
- Ask in the #engineering channel

### Found an SEO Issue?

1. Create an issue with the "seo" label
2. Describe the problem and impact
3. Include affected URLs
4. Suggest a fix if possible

---

**Last Updated**: 2026-01-05
**Maintained by**: Development Team
**Questions**: Refer to SEO specialist or team lead
