import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ResourcesGrid from 'apps/web/src/components/Resources/ResourcesGrid';

export default function ResourcesFundSection() {
  return (
    <Container id="get-funded">
      <Title level={TitleLevel.H4Regular} as="h2" className="col-span-full">
        Fund your project
      </Title>
      <ResourcesGrid items={ITEMS} accentColor="green" />
    </Container>
  );
}

const ITEMS = [
  {
    title: 'Base Ecosystem Fund',
    description:
      'Early stage projects (pre-seed to seed) building on Base can apply for investment.',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSeiSAod4PAbXlvvDGtHWu-GqzGpvHYfaTQR2f77AawD7GYc4Q/viewform',
  },
  {
    title: 'Base Builder Rewards',
    description:
      'The Base ecosystem offers multiple funding pathways designed specifically for builders at every stage, from weekend hacks to full-scale businesses.',
    href: 'https://docs.base.org/get-started/get-funded',
  },
  {
    title: 'Paymaster Gas Credits',
    description:
      'Get up to $600 in free Paymaster credits for signing up, and build gasless onchain apps that make it easier for your users to onboard.',
    href: 'https://www.coinbase.com/developer-platform/products/paymaster',
  },
];
