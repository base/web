import { BuildersSection } from 'apps/web/app/(base-org-dark)/(builders)/BuildersSection';
import { Square } from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/Square';
import Link from 'apps/web/src/components/Link';
import { ReactNode } from 'react';

const appchainsFeatures = [
  {
    colorClass: 'text-[#FC401F]',
    title: 'High throughput, low costs',
    description:
      'Faster transactions with 1s block times and under 10s roundtrips — for fractions of cents.',
  },
  {
    colorClass: 'text-[#66C800]',
    title: 'Sustainable  growth',
    description: 'Deliver delightful, performant user experiences with dedicated blockspace.',
  },
  {
    colorClass: 'text-[#FEA8CD]',
    title: 'Builder-friendly fees',
    description:
      'Competitive, fixed monthly price. No complicated vendor commitments, no price negotiations.',
  },
  {
    colorClass: 'text-[#FFD12F]',
    title: 'Enterprise-grade infra',
    description:
      'Managed sequencers and nodes, with maintenance, upgrades, a block explorer, and real-time performance monitoring.',
  },
  {
    colorClass: 'text-[#7575FF]',
    title: 'Base Builder tools',
    description:
      'Seamless integration with Smart Wallet, Paymaster, OnchainKit, AgentKit, and other tools from Base and Coinbase Developer Platform.',
  },
  {
    colorClass: 'text-[#B8A581]',
    title: 'Open-source',
    description: (
      <div>
        Built on the{' '}
        <Link
          href="https://github.com/base/op-enclave"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          OP Enclave framework
        </Link>{' '}
        for fast withdrawals and a seamless integration between your Appchain and Base. 
      </div>
    ),
  },
];

const ockFeatures = [
  {
    colorClass: 'text-[#FC401F]',
    title: 'Full-stack',
    description: 'Abstract away complex configuration or setup. No blockchain knowledge required.',
  },
  {
    colorClass: 'text-[#66C800]',
    title: 'AI-friendly',
    description:
      'Leverage your favorite tools to deploy your app with components that work automatically on Base.',
  },
  {
    colorClass: 'text-[#FEA8CD]',
    title: 'Serverless',
    description: 'Just "npm create onchain" to start building, no backend infrastructure required.',
  },
  {
    colorClass: 'text-[#FFD12F]',
    title: 'Composable',
    description: 'Build apps that interact with and build upon other apps in the Base ecosystem.',
  },
  {
    colorClass: 'text-[#7575FF]',
    title: 'Ship faster',
    description:
      'Remove complexity with standard components, so you can focus on making your app stand out.',
  },
  {
    colorClass: 'text-[#B8A581]',
    title: 'Cost-effective',
    description: 'Base offers fast and affordable transactions, where fees are less than one cent.',
  },
];

const minikitFeatures = [
  {
    colorClass: 'text-[#FC401F]',
    title: 'Reach millions of users',
    description:
      "Grow off of the Base app's social graph where your mini app is just one click away.",
  },
  {
    colorClass: 'text-[#66C800]',
    title: 'Understand your users',
    description:
      "Access real-time analytics and user behavior insights to optimize your app's performance and engagement.",
  },
  {
    colorClass: 'text-[#FEA8CD]',
    title: 'Minimum configuration',
    description:
      'Kickstart your mini app in minutes - with pre-configured connectors and built-in utility features.',
  },
];

const baseAccountFeatures = [
  {
    colorClass: 'text-[#FC401F]',
    title: 'Universal account',
    description: 'An account that just works anywhere your users go.',
  },
  {
    colorClass: 'text-[#66C800]',
    title: 'Onchain made simple',
    description:
      'Build delightful login and payment experiences with sponsored transactions, spend permissions, and batch operations.',
  },
  {
    colorClass: 'text-[#FEA8CD]',
    title: 'Passkey security',
    description:
      'Sign with familiar interactions like fingerprints and Face ID. No password management for your users.',
  },
  {
    colorClass: 'text-[#FFD12F]',
    title: 'Built-in onramps',
    description:
      'Simple account funding for users — with Apple Pay, debit card, or Coinbase Exchange assets.',
  },
  {
    colorClass: 'text-[#7575FF]',
    title: 'Reduce friction',
    description:
      'Request user consent to provide details like name, address, or email to streamline onchain UX flows',
  },
  {
    colorClass: 'text-[#B8A581]',
    title: 'Safe and secure',
    description: 'Built using open standards by the most trusted brand in crypto.',
  },
];

function FeatureItem({
  feature,
}: {
  feature: { colorClass: string; title: string; description: ReactNode };
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className={feature.colorClass}>
        <Square />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl leading-[1.116] tracking-[-0.72px]">{feature.title}</div>
        <div className="text-base leading-[1.25] text-gray-30">{feature.description}</div>
      </div>
    </div>
  );
}

function FeaturesSection({
  features,
}: {
  features: { colorClass: string; title: string; description: ReactNode }[];
}) {
  return (
    <BuildersSection
      className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-x-4 md:gap-y-12"
      wrapperComponent="ul"
      contentComponent="li"
      contentBlocks={[
        ...features
          .slice(0, 3)
          .map((feature) => <FeatureItem key={feature.title} feature={feature} />),
        ...features
          .slice(3, 6)
          .map((feature) => <FeatureItem key={feature.title} feature={feature} />),
      ]}
    />
  );
}

export function AppchainsFeaturesSection() {
  return <FeaturesSection features={appchainsFeatures} />;
}

export function OCKFeaturesSection() {
  return <FeaturesSection features={ockFeatures} />;
}

export function MinikitFeaturesSection() {
  return <FeaturesSection features={minikitFeatures} />;
}

export function BaseAccountFeaturesSection() {
  return <FeaturesSection features={baseAccountFeatures} />;
}
