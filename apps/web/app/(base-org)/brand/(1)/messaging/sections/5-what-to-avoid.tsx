import { ListContent, ListGrid } from 'apps/web/src/components/Brand/ListGrid';

export function WhatToAvoid() {
  return <ListGrid content={sectionContent} />;
}

const sectionContent: ListContent = {
  id: 'what-to-avoid',
  label: 'What to Avoid',
  description:
    'The Base core team does its best to amplify builders who positively contribute to the Base ecosystem. To increase your chances of amplification on social channels, please avoid the following (including in any linked content).',
  items: [
    {
      title: 'Using Financial Terminology',
      content: (
        <span className="text-base-gray-200">
          Refrain from financial terms indicating gains, profits, investments, high yields,
          leverage, lucrative opportunities, etc. Avoid providing investment recommendations or
          strategies.
        </span>
      ),
    },
    {
      title: 'Mentioning Specific Tokens',
      content: (
        <span className="text-base-gray-200">
          Focus on your utility, gameplay, or experience instead of specific tokens, token rewards,
          etc.
        </span>
      ),
    },
    {
      title: 'No Context of Underlying Project',
      content: (
        <span className="text-base-gray-200">
          This might be the first time someone in the Base ecosystem is learning about your project.
          Avoid solely focusing on specific products, isolated milestones, or new features, without
          readers understanding the context of your underlying project.
        </span>
      ),
    },
    {
      title: 'Disputable Superlatives',
      content: (
        <span className="text-base-gray-200">
          Avoid using unverified superlatives like “the best”, “the first”, “maximize”, “ensure”,
          etc.
        </span>
      ),
    },
    {
      title: 'Unapproved Partnerships',
      content: (
        <span className="text-base-gray-200">
          Avoid references to a “partnership” or “collaboration” with Base and instead reference
          that your project is launched on, built on, or integrated with Base.
        </span>
      ),
    },
    {
      title: 'Overly Aggressive Marketing',
      content: (
        <span className="text-base-gray-200">
          Avoid aggressive marketing tactics (e.g., overuse all caps, overuse of emojis, etc.),
          promotions, and discounts, as they may send the wrong message within the Base ecosystem.
        </span>
      ),
    },
    {
      title: 'False or Misleading Information',
      content: (
        <span className="text-base-gray-200">
          Ensure all information shared is accurate, truthful, and does not mislead readers.
        </span>
      ),
    },
    {
      title: 'Unsupported Data',
      content: <span className="text-base-gray-200">Share the source of any data presented.</span>,
    },
    {
      title: 'Focuses on Coinbase instead of Base',
      content: (
        <span className="text-base-gray-200">
          Base is an open, permissionless Ethereum L2 incubated at Coinbase with a commitment to
          decentralization. Focus on Base itself, rather than an exaggerated nexus to Coinbase.
        </span>
      ),
    },
    {
      title: 'Negative Comparisons',
      content: (
        <span className="text-base-gray-200">
          Refrain from putting down other projects or competitors.
        </span>
      ),
    },
    {
      title: 'NSFW Content',
      content: (
        <span className="text-base-gray-200">
          Refrain from using offensive, NSFW, explicit language or content in any communication,
          including your website.
        </span>
      ),
    },
    {
      title: 'Unreleased Products',
      content: (
        <span className="text-base-gray-200">
          Avoid teasers of products that are unavailable for immediate use.
        </span>
      ),
    },
    {
      title: 'Incomplete Posts',
      content: (
        <span className="text-base-gray-200">
          Include all content (i.e., videos, images, linked content, etc.) in your submitted post.
        </span>
      ),
    },
    {
      title: 'Unlicensed IP',
      content: (
        <span className="text-base-gray-200">
          Remove any IP in your post and website that is not properly licensed.
        </span>
      ),
    },
    {
      title: 'Non-Compliant Terms',
      content: (
        <span className="text-base-gray-200">
          Do not promote applications that transfer value without terms of service/use that include
          compliance with applicable laws, including sanctions laws.
        </span>
      ),
    },
    {
      title: 'No Geofencing (in Certain Cases)',
      content: (
        <span className="text-base-gray-200">
          Certain applications may be subject to US geofencing requirements and a clear indication
          in the beginning of your post that the application is only available to non-US users in
          order to be eligible for amplification at our sole discretion.
        </span>
      ),
    },
    {
      title: 'No KYC (in Certain Cases)',
      content: (
        <span className="text-base-gray-200">
          Certain applications may be subject to KYC obligations and a clear indication in the
          beginning of your post that the application is only available to KYC&apos;d/qualified
          users in order to be eligible for amplification at our sole discretion.
        </span>
      ),
    },
  ],
};
