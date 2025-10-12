import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ResourcesGrid from 'apps/web/src/components/Resources/ResourcesGrid';

export default function ResourcesGetInvolvedSection() {
  return (
    <Container id="get-involved">
      <Title level={TitleLevel.H4Regular} as="h2" className="col-span-full">
        Get Involved
      </Title>
      <ResourcesGrid items={ITEMS} />
    </Container>
  );
}

const ITEMS = [
  {
    title: 'Join the Discord',
    description: 'Apply to join the builder network to access community forums and programs.',
    href: 'https://discord.com/invite/buildonbase',
  },
  {
    title: 'Base Country Leads',
    description:
      'Country Leads cultivate the local Base community and provide support to builders.',
    href: 'https://docs.base.org/get-started/country-leads-and-ambassadors#base-country-leads',
  },
  {
    title: 'Host a virtual event',
    description: 'Sign up to host a meetup with other Based builders anywhere in the world.',
    href: 'https://basedvirtualevents.deform.cc/',
  },
  // {
  //   title: 'Use apps on Base',
  //   description: 'Browse and use projects being built on the Base ecosystem.',
  //   href: 'https://www.base.org/ecosystem?utm_source=dotorg&utm_medium=builderkit',
  // },
];
