import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
import background1 from './bg1.png';
import background2 from './bg2.png';
import background3 from './bg3.png';
import Image from 'next/image';
import { FEATURE_TEMPLATE_LINK } from 'apps/web/src/components/Developers/Onchainkit/links';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

const TEMPLATES = [
  {
    title: 'Quickstart Template',
    href: '',
    background: background1,
  },
  {
    title: 'Onchain Store Template',
    href: '',
    background: background2,
  },
  {
    title: 'Onchain Social Template',
    href: '',
    background: background3,
  },
];
export function Templates() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>
        Start with a template.{' '}
        <Title level={TitleLevel.Title1} as="span" className="text-dark-palette-foregroundMuted">
          Fork, customize, and deploy in minutes.
        </Title>
      </Title>
      <div className="grid w-full grid-cols-3 gap-6 max-sm:grid-cols-1">
        {TEMPLATES.map((template) => {
          return (
            <div
              key={template.title}
              className="relative flex h-[220px] flex-col justify-between overflow-hidden rounded-xl bg-[purple] p-6"
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
              <Link href={template.href} className="z-10 flex gap-2 text-[#C9A4FA]">
                <Title level={TitleLevel.Headline}>Fork the template</Title>
                <Icon name="fork" color="currentColor" />
              </Link>
            </div>
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
          buttonClassNames="rounded-xl"
        >
          Feature your template
        </ButtonWithLinkAndEventLogging>
      </div>
    </div>
  );
}
