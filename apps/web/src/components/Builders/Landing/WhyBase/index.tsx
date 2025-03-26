import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { type StaticImageData } from 'next/image';
import integration from 'apps/web/src/components/Builders/Shared/assets/WhyBase/integration.svg';
import megaphone from 'apps/web/src/components/Builders/Shared/assets/WhyBase/megaphone.svg';
import security from 'apps/web/src/components/Builders/Shared/assets/WhyBase/security.svg';

type ValuePropProps = {
  title: string;
  description: string;
  icon: StaticImageData;
};

export function WhyBase() {
  return (
    <section className="h-full w-full py-20">
      <div className="flex flex-col gap-6 md:gap-9">
        <div className="flex flex-col gap-1 pr-4">
          <Title level={TitleLevel.Title1} as="h2" >
            Base is for builders.{' '}
            <Title level={TitleLevel.Title1} className="text-dark-palette-foregroundMuted" as="span">
              We&apos;re committed to help builders shape the global onchain economy — from start to
              finish.
            </Title>
          </Title>
        </div>
        <div className="hidden flex-col gap-3 md:flex">
          <ValueProp
            title="Distribution & Growth"
            description="Reach millions of people across the Coinbase product ecosystem and social graph, plus opportunities for builder grants."
            icon={megaphone as StaticImageData}
          />
          <ValueProp
            title="Trust & Security"
            description="The most dependable way for ambitious projects to scale with the most trusted brand in crypto."
            icon={security as StaticImageData}
          />
          <ValueProp
            title="Powerful Integrations"
            description="Integrations with Coinbase Exchange allows seamless transfers of assets across the onchain ecosystem."
            icon={integration as StaticImageData}
          />
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          <ValueProp
            title="Distribution & Growth"
            description="Reach millions of unique users"
            icon={megaphone as StaticImageData}
          />
          <ValueProp
            title="Trust & Security"
            description="The most trusted brand in crypto"
            icon={security as StaticImageData}
          />
          <ValueProp
            title="Powerful Integrations"
            description="Seamless integration with Coinbase products and ecosystem"
            icon={integration as StaticImageData}
          />
        </div>
      </div>
    </section>
  );
}

function ValueProp({ title, description, icon }: ValuePropProps) {
  return (
    <div className="h-[200px] rounded-xl bg-dark-palette-backgroundAlternate p-6 md:h-[180px] md:px-6 md:py-4">
      <div className="flex h-full flex-col gap-2">
        {/* <div className="flex h-full min-w-[280px] flex-col items-start justify-between md:flex-row md:items-center md:justify-start"> */}
        <Image
          src={icon}
          alt={title}
          width={32}
          height={32}
          className="mb-auto h-5 w-5 md:h-8 md:w-8"
        />
        <Title level={TitleLevel.Title3} className="font-medium">
          {title}
        </Title>
        <Title level={TitleLevel.Title4} className="text-dark-palette-foreground">
          {description}
        </Title>
      </div>
    </div>
  );
}
