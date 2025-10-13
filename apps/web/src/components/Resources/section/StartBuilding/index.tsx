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
        Learn how to build onchain
      </Title>
      <ResourcesGrid items={ITEMS01} accentColor="brown" />
      <Title level={TitleLevel.H6Regular} as="h3" className="col-span-full mt-2 lg:mt-14">
        Tools to help you build
      </Title>
      <ResourcesGrid items={ITEMS02} accentColor="brown" />
      <Title level={TitleLevel.H6Regular} as="h3" className="col-span-full mt-2 lg:mt-14">
        Guidance to help you succeed onchain
      </Title>
      <ResourcesGrid items={ITEMS03} accentColor="brown" />
      <Link
        href="https://www.base.org/build"
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
    title: 'Grow your app',
    description:
      'Get featured on the Base app, win builder rewards, and unlock insights to grow faster.',
    href: 'https://www.base.dev/',
  },
];
const ITEMS02 = [
  {
    title: 'Build on Base',
    description: 'Everything you need to build, grow, and earn onchain.',
    href: 'https://www.base.org/build',
  },
  {
    title: 'Base Services Hub',
    description:
      'Exclusive discounts on software and services that help projects ship faster, scale growth and build on Base.',
    href: 'https://docs.base.org/get-started/base-services-hub',
  },
];
const ITEMS03 = [
  {
    title: 'Launch on Base',
    description:
      'Your guide to launching and growing on Base from pre-launch, launch, to post launch.',
    href: 'https://www.launchonbase.xyz/',
  },
  {
    title: 'Get Mentorship',
    description:
      'Connect with experienced builders and industry leaders to accelerate your journey on Base.',
    href: 'https://docs.base.org/get-started/base-mentorship-program',
  },
];
