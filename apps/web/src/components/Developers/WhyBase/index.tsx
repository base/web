import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { type StaticImageData } from 'next/image';
import integration from 'apps/web/src/components/Developers/WhyBase/assets/integration.svg';
import support from 'apps/web/src/components/Developers/WhyBase/assets/support.svg';
import megaphone from 'apps/web/src/components/Developers/WhyBase/assets/megaphone.svg';
import security from 'apps/web/src/components/Developers/WhyBase/assets/security.svg';

type ValuePropProps = {
  title: string;
  description: string;
  icon: StaticImageData;
};

export function WhyBase() {
  return (
    <section className="h-full w-full py-20">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-1 pr-4">
          <Title level={TitleLevel.Title1} as="h2">
            Built by Base with the Coinbase connection.
          </Title>
          <Title level={TitleLevel.Title1} as="h2" className="text-dark-palette-foregroundMuted">
            Grow faster with distribution through Base&apos;s social graph and integrations with
            Coinbase products.
          </Title>
        </div>

        <div className="flex flex-col gap-3">
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
            title="Integrations"
            description="Seamless integration with Coinbase products and ecosystem"
            icon={integration as StaticImageData}
          />
          <ValueProp
            title="Enterprise Support"
            description="Developer documentation"
            icon={support as StaticImageData}
          />
        </div>
      </div>
    </section>
  );
}

function ValueProp({ title, description, icon }: ValuePropProps) {
  return (
    <div className="h-[345px] md:h-full rounded-xl bg-dark-palette-backgroundAlternate p-6 md:px-6 md:py-4">
      <div className="h-full flex flex-col gap-2 md:items-center md:flex-row md:gap-64">
        <div className="h-full flex flex-col items-start justify-between md:flex-row min-w-[280px] md:items-center">
          <Image src={icon} alt={title} width={32} height={32} className="md:h-5 md:w-5" />
          <Title level={TitleLevel.Title3} className="md:ml-14">
            {title}
          </Title>
        </div>
        <Title level={TitleLevel.Title4} className="text-dark-palette-foreground">
          {description}
        </Title>
      </div>
    </div>
  );
}
