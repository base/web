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
    title: 'Base builder rewards',
    description:
      'Connect to Talent Protocol and build to be eligible for a share of 2 ETH in weekly rewards.',
    href: 'https://mirror.xyz/talentprotocol.eth/aVAJ0vDVj7wB3MNRAmC_Q6EXuXUh2rt5SEU24hDnza4?utm_source=dotorg&urm_medium=builderkit',
  },
  {
    title: 'Gas credits',
    description: 'Eligible projects may receive up to $15K in gas credits for their users.',
    href: 'https://www.smartwallet.dev/base-gasless-campaign/?utm_source=dotorg&utm_medium=builderkit',
  },
];
