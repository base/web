import Link from 'apps/web/src/components/Link';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ResourcesGrid from 'apps/web/src/components/Resources/ResourcesGrid';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

export default function ResourcesStartBuildingSection() {
  return (
    <Container id="start-building">
      <Title level={TitleLevel.H4Regular} as="h2" className="col-span-full mb-6">
        Start Building
      </Title>
      <Title level={TitleLevel.H6Regular} as="h3" className="col-span-full">
        Learn how to build a project
      </Title>
      <ResourcesGrid items={ITEMS01} accentColor="brown" />
      <Title level={TitleLevel.H6Regular} as="h3" className="col-span-full mt-2 lg:mt-14">
        Learn how to build a project
      </Title>
      <ResourcesGrid items={ITEMS02} accentColor="brown" />
      <Title level={TitleLevel.H6Regular} as="h3" className="col-span-full mt-2 lg:mt-14">
        Learn how to build a project
      </Title>
      <ResourcesGrid items={ITEMS03} accentColor="brown" />
      <Link
        href="https://www.coinbase.com/developer-platform/?utm_source=dotorg&utm_medium=builderkit"
        className="group col-span-full mt-2 flex w-fit items-center gap-1.5 lg:mt-14"
      >
        <Text
          variant={TextVariant.Body}
          className="transition-colors duration-200 group-hover:text-base-gray-200"
        >
          View all resources here
        </Text>
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-0.5 size-3 transition-transform duration-300 ease-in-out group-hover:rotate-45 [&_path]:transition-all [&_path]:duration-200 group-hover:[&_path]:fill-base-gray-200"
        >
          <path
            d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
            fill="black"
          />
        </svg>
      </Link>
    </Container>
  );
}

const ITEMS01 = [
  {
    title: 'Learn to build onchain',
    description: 'Become an onchain developer with our comprehensive smart contract curriculum.',
    href: 'https://docs.base.org/learn/welcome/?utm_source=dotorg&utm_medium=builderkit',
  },
  {
    title: 'Tutorials',
    description:
      'Build now with 1-2-3 quickstarts, then evolve your onchain app with advanced topics.',
    href: '/build/?utm_source=dotorg&utm_medium=builderkit',
  },
];
const ITEMS02 = [
  {
    title: 'OnchainKit',
    description:
      'Build your apps in minutes with off-the-shelf React components and onchain integrations.',
    href: 'https://onchainkit.xyz/?utm_source=dotorg&utm_medium=builderkit',
  },
  {
    title: 'Support team',
    description: `if you're ever in need, please reach out in a dedicated Discord support channel.`,
    href: 'https://discord.com/invite/buildonbase',
  },
];
const ITEMS03 = [
  {
    title: 'Coinbase smart wallet',
    description: 'Enable your users to create an account in seconds, without apps or seed phrases.',
    href: 'https://www.coinbase.com/wallet/smart-wallet/?utm_source=dotorg&utm_medium=builderkit',
  },
  {
    title: 'Gas sponsorship',
    description:
      'Reduce costs and sponsor gas for your users, with the Coinbase Paymaster and Bundler.',
    href: 'https://www.coinbase.com/developer-platform/products/paymaster/?utm_source=dotorg&utm_medium=builderkit',
  },
];
