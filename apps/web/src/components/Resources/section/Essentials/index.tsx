import Container from 'apps/web/src/components/base-org/Container';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Link from 'apps/web/src/components/Link';
import * as Accordion from '@radix-ui/react-accordion';

export default function ResourcesEssentials() {
  return (
    <Container>
      <Title level={TitleLevel.H4Regular} as="h2" className="col-span-full">
        The Essentials
      </Title>
      <Title level={TitleLevel.H6Regular} as="p" className="col-span-4 pt-6">
        Jump to our most frequently requested tools and resources.
      </Title>

      <div className="col-span-full mt-10">
        {/* Desktop version - hover effect */}
        <div className="hidden lg:block">
          {ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex items-center justify-between overflow-hidden border-t border-black px-2 py-5 last:border-b"
            >
              <span className="absolute inset-0 h-full w-full translate-y-full transform bg-black transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
              <Title
                level={TitleLevel.H6Regular}
                as="p"
                className="duration-250 relative z-10 transition-colors group-hover:text-white"
              >
                {item.title}
              </Title>
              <Text className="left-[48%] z-10 max-w-[350px] text-white lg:absolute">
                {item.description}
              </Text>
              <ArrowSVG className="relative z-10 size-4 transition-transform duration-300 group-hover:rotate-45 [&_path]:transition-all [&_path]:duration-200 [&_path]:group-hover:fill-white" />
            </Link>
          ))}
        </div>

        {/* mobile */}
        <Accordion.Root type="single" collapsible className="block lg:hidden" defaultValue="item-0">
          {ITEMS.map((item, index) => (
            <Accordion.Item
              key={item.title}
              value={`item-${index}`}
              className="group relative overflow-hidden border-t border-black last:border-b"
            >
              <span className="absolute inset-0 h-full w-full translate-y-full transform bg-black transition-transform duration-300 ease-in-out group-data-[state=open]:translate-y-0" />
              <Accordion.Header>
                <Accordion.Trigger className="relative z-10 flex w-full items-center justify-between px-2 py-5 text-left">
                  <Title
                    level={TitleLevel.H6Regular}
                    as="p"
                    className="transition-colors duration-300 group-data-[state=open]:text-white"
                  >
                    {item.title}
                  </Title>
                  <ArrowSVG className="mr-1 size-4 transition-all duration-300 group-data-[state=open]:rotate-45 [&_path]:transition-all [&_path]:duration-300 [&_path]:group-data-[state=open]:fill-white" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="relative z-10 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-2 pb-5">
                  <Text className="mb-3 text-sm transition-colors duration-300 group-data-[state=open]:text-white">
                    {item.description}
                  </Text>
                  <Link
                    href={item.href}
                    className="hover:text-blue-700 group-data-[state=open]:text-blue-300 group-data-[state=open]:hover:text-blue-200 inline-flex items-center gap-2 text-sm font-medium text-white"
                  >
                    Learn more
                    <ArrowSVG className="size-3 [&_path]:fill-white" />
                  </Link>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </Container>
  );
}

const ITEMS = [
  {
    title: 'Join the builder network',
    href: 'https://forms.gle/AQhuzEZvXx9VYrer7/?utm_source=dotorg&medium=builderkit',
    description: 'Apply to join the Builder Network to access community forums and programs.',
  },
  {
    title: 'Create your profile',
    href: 'https://www.base.org/names?utm_source=dotorg&utm_medium=builderkit',
    description: 'Claim a basename and create your based profile to connect with other builders.',
  },
  {
    title: 'Virtual events',
    href: 'https://lu.ma/base-virtualevents/?utm_source=dotorg&medium=builderkit',
    description: 'Check out our Virtual Events schedule to ask your questions live.',
  },
  {
    title: 'Get funded',
    href: '#get-funded',
    description: 'A collection of monetary programs to help you build or grow your project.',
  },
  {
    title: 'Get noticed',
    href: '#get-noticed',
    description:
      'Looking for help with distribution? Get noticed by millions of potential new users.',
  },
  {
    title: 'Build your project',
    href: '#start-building',
    description: 'Resources that make it easy to build and use your onchain project.',
  },
];

export function ArrowSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}
