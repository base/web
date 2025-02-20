import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
import background1 from './bg1.png';
import background2 from './bg2.png';
import background3 from './bg3.png';
import Image from 'next/image';
import { FEATURE_TEMPLATE_LINK } from 'apps/web/src/components/Builders/Onchainkit/links';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

const TEMPLATES = [
  {
    title: 'Quickstart Template',
    href: 'https://github.com/coinbase/onchainkit',
    background: background1,
  },
  {
    title: 'Onchain Store Template',
    href: 'https://github.com/coinbase/onchain-commerce-template',
    background: background2,
  },
  {
    title: 'Onchain Social Template',
    href: 'https://github.com/fakepixels/ock-identity',
    background: background3,
  },
];
export function Templates() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>
        Start with a template — fork, customize, and deploy in minutes
      </Title>
      <div className="grid w-full grid-cols-3 gap-6 max-sm:grid-cols-1">
        {TEMPLATES.map((template) => {
          return (
            <Link
              href={template.href}
              key={template.title}
              className="relative flex h-[220px] flex-col justify-between overflow-hidden rounded-xl bg-[purple] p-6"
              target="_blank"
            >
              <Image
                src={template.background}
                alt="Template background"
                layout="fill"
                objectFit="cover"
              />
              <Title level={TitleLevel.Title3} className="z-10 font-bold">
                {template.title}
              </Title>
              <div className="z-10 flex gap-2 text-[#818CF8]">
                <Title level={TitleLevel.Headline}>Fork the template</Title>
                <Icon name="fork" color="currentColor" />
              </div>
            </Link>
          );
        })}
      </div>
      <div>
        <ButtonWithLinkAndEventLogging
          href={FEATURE_TEMPLATE_LINK}
          variant={ButtonVariants.SecondaryOutline}
          iconName="github"
          target="_blank"
          eventName="onchainkit-feature-template"
          buttonClassNames="flex items-center justify-between px-4 pb-2.5 pt-3 group font-medium"
        >
          Feature your template
        </ButtonWithLinkAndEventLogging>
      </div>
    </div>
  );
}
