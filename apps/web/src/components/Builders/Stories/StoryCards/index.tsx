import Image, { StaticImageData } from 'next/image';
import mtsumi from 'apps/web/src/components/Builders/Stories/StoryCards/assets/mtsumi.webp';
import nguyen from 'apps/web/src/components/Builders/Stories/StoryCards/assets/nguyen.webp';
import kinya from 'apps/web/src/components/Builders/Stories/StoryCards/assets/kinya.webp';
import ivog from 'apps/web/src/components/Builders/Stories/StoryCards/assets/ivog.webp';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import classNames from 'classnames';

export function StoryCards() {
  return (
    <div className="z-1 flex flex-col gap-9 md:gap-[72px]">
      <StoryCard
        title="Aly Mtsumi of Element Pay"
        description="Enabling users to buy stablecoins through m-pesa and spend them."
        location="Nairobi, Kenya"
        date="January 11, 2025"
        href=""
        color="text-dark-green-60"
        image={mtsumi}
      />
      <StoryCard
        title="Ngan Nguyen of Onchain Buster"
        description="A persona builder that analyzes user preferences from their past onchain activities."
        location="Ho Chi Minh City, Vietnam"
        date="January 11, 2025"
        href=""
        color="text-dark-pink-60"
        image={nguyen}
      />
      <StoryCard
        title="Christine Kinya of PayFlip"
        description="Unlocking new markets for merchants in Kenya with stablecoin payments."
        location="Nairobi, Kenya"
        date="January 11, 2025"
        href=""
        color="text-dark-orange-70"
        image={kinya}
      />
      <StoryCard
        title="Ivo G of Allora Finance"
        description="Something about Allora Finance"
        location="Lier, Norway"
        date="January 11, 2025"
        href=""
        color="text-dark-yellow-80"
        image={ivog}
      />
    </div>
  );
}

function StoryCard({
  title,
  description,
  location,
  date,
  href,
  color,
  image,
}: {
  title: string;
  description: string;
  location: string;
  date: string;
  href: string;
  color: string;
  image: StaticImageData;
}) {
  return (
    <div className="z-1 flex w-full flex-col gap-6">
      <Image src={image} alt={title} />
      <div className="flex flex-col gap-4">
        <div className="hidden flex-col gap-2 md:flex">
          <Title level={TitleLevel.Title1}>{title}</Title>
          <Title level={TitleLevel.Title2} className="text-dark-palette-foregroundMuted">
            {description}
          </Title>
        </div>
        <div className="flex flex-col gap-2 md:hidden">
          <Title level={TitleLevel.Title3}>{title}</Title>
          <Title level={TitleLevel.Title4} className="text-dark-palette-foregroundMuted">
            {description}
          </Title>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex gap-1">
            <div className={classNames(color, 'hidden md:block')}>
              <Icon name="locationPin" color="currentColor" />
            </div>
            <div className={classNames(color, 'md:hidden')}>
              <Icon name="locationPin" color="currentColor" width={20} height={20} />
            </div>
            <Title level={TitleLevel.Headline} className={color}>
              {location}
            </Title>
          </div>
          <Title level={TitleLevel.Headline} className="text-dark-palette-foregroundMuted">
            {date}
          </Title>
        </div>
        <ButtonWithLinkAndEventLogging
          variant={ButtonVariants.SecondaryOutline}
          buttonClassNames="flex items-center justify-between px-4 py-3 group"
          href={href}
          eventName={`developers_stories_${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <div className="flex items-center gap-4">
            <span>Read</span>
            <div className="transition-transform duration-200 group-hover:translate-x-1">
              <Icon name="arrowRight" width={20} height={20} color="white" />
            </div>
          </div>
        </ButtonWithLinkAndEventLogging>
      </div>
    </div>
  );
}
