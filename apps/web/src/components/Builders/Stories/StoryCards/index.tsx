import Image, { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

import baseLogo from 'apps/web/src/components/Builders/Stories/StoryCards/assets/baseLogo.svg';
import blocklords from 'apps/web/src/components/Builders/Stories/StoryCards/assets/blocklords.svg';
import cattown from 'apps/web/src/components/Builders/Stories/StoryCards/assets/catTown.svg';
import byte from 'apps/web/src/components/Builders/Stories/StoryCards/assets/byteAi.svg';
import morpho from 'apps/web/src/components/Builders/Stories/StoryCards/assets/morpho.svg';
import heyelsa from 'apps/web/src/components/Builders/Stories/StoryCards/assets/elsa.svg';
import aerodrome from 'apps/web/src/components/Builders/Stories/StoryCards/assets/aerodrome.svg';
import Link from 'apps/web/src/components/Link';

export function StoryCards() {
  return (
    <div className="z-1 flex flex-col gap-9 md:gap-[72px]">
      <StoryCard
        title="David Johansson of BLOCKLORDS"
        description="Building a medieval grand strategy game with a player-driven onchain economy."
        location="Stockholm, Sweden"
        onBaseSince="January, 2024"
        href="/builders/stories/blocklords"
        image={blocklords as StaticImageData}
      />
      <StoryCard
        title="Tara of Cat Town"
        description="Building a cozy onchain life sim game, combining gaming with DeFi to create a thriving community."
        location="United Kingdom"
        onBaseSince="April, 2024"
        href="/builders/stories/cat-town"
        image={cattown as StaticImageData}
      />
      <StoryCard
        title="AchillesHodl of Byte"
        description="Pioneering the future of food ordering with AI and crypto, transforming human language into the ultimate user interface."
        location="United States of America"
        onBaseSince="November, 2024"
        href="/builders/stories/byte"
        image={byte as StaticImageData}
      />
      <StoryCard
        title="Merlin Egalite of Morpho"
        description="Building the largest and most secure lending protocol on Base, leveraging the power of the Superchain ecosystem."
        location="Paris, France"
        onBaseSince="February, 2024"
        href="/builders/stories/morpho"
        image={morpho as StaticImageData}
      />
      <StoryCard
        title="Dhawal Shah of HeyElsa AI"
        description="Revolutionizing crypto trading with AI-driven intelligence, pushing boundaries in portfolio management."
        location="India"
        onBaseSince="August, 2024"
        href="/builders/stories/hey-elsa"
        image={heyelsa as StaticImageData}
      />
      <StoryCard
        title="Alexander of Aerodrome Finance"
        description="Serving as the essential trading and liquidity marketplace on Base, driving the future of decentralized exchanges."
        location="United States of America"
        onBaseSince="August, 2023"
        href="/builders/stories/aerodrome"
        image={aerodrome as StaticImageData}
      />
    </div>
  );
}

function StoryCard({
  title,
  description,
  location,
  onBaseSince,
  href,
  image,
}: {
  title: string;
  description: string;
  location: string;
  onBaseSince: string;
  href: string;
  image: StaticImageData;
}) {
  return (
    <div className="z-1 flex w-full flex-col gap-8">
      <Link href={href}>
        <Image src={image} alt={title} />
      </Link>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="hidden flex-col gap-2 md:flex">
            <Title level={TitleLevel.Title1}>{title}</Title>
            <Title level={TitleLevel.Title2} className="text-dark-palette-foregroundMuted">
              {description}
            </Title>
          </div>
          <div className="flex flex-col gap-2 md:hidden">
            <Title level={TitleLevel.Title3} className="font-medium">
              {title}
            </Title>
            <Title level={TitleLevel.Title4} className="text-dark-palette-foregroundMuted">
              {description}
            </Title>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex items-center gap-1">
              <div className="hidden h-5 w-5 items-center justify-center md:flex">
                <Image src={baseLogo as StaticImageData} alt="Base Logo" />
              </div>
              <div className="md:hidden">
                <Image src={baseLogo as StaticImageData} alt="Base Logo" />
              </div>
              <Title level={TitleLevel.Headline} className="font-normal">
                {onBaseSince}
              </Title>
            </div>
            <div className="flex items-center gap-1">
              <div className="hidden items-center justify-center md:flex">
                <Icon name="locationPin" color="currentColor" width={20} height={20} />
              </div>
              <div className="md:hidden">
                <Icon name="locationPin" color="currentColor" width={20} height={20} />
              </div>
              <Title level={TitleLevel.Headline} className="font-normal">
                {location}
              </Title>
            </div>
          </div>
        </div>
        <ButtonWithLinkAndEventLogging
          variant={ButtonVariants.SecondaryOutline}
          linkClassNames="w-fit"
          buttonClassNames="flex items-center justify-between px-4 pb-2.5 pt-3 group font-medium"
          href={href}
          eventName={`developers_stories_${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <div className="flex items-center gap-4">
            <span>Read</span>
            <div className="transition-transform duration-200 group-hover:translate-x-1">
              <Icon name="arrowRight" width={16} height={16} color="white" />
            </div>
          </div>
        </ButtonWithLinkAndEventLogging>
      </div>
    </div>
  );
}
