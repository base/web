import { ValueProp, ValuePropProps } from 'apps/web/src/components/Developers/Shared/ValueProp';
import coinbase from 'apps/web/src/components/Developers/Verifications/coinbase.svg';
import globe from 'apps/web/src/components/Developers/Verifications/globe.svg';
import coinbaseOne from 'apps/web/src/components/Developers/Verifications/coinbaseOne.svg';
import { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

const VALUE_PROPS: ValuePropProps[] = [
  {
    title: 'Verified Account',
    description: 'A Coinbase user with a valid Coinbase trading account. ',
    icon: coinbase as StaticImageData,
  },
  {
    title: 'Verified Country',
    description: 'The user’s verified country of residence on Coinbase.',
    icon: globe as StaticImageData,
  },
  {
    title: 'Verified Coinbase One',
    description: 'A Coinbase user with an active Coinbase One membership.',
    icon: coinbaseOne as StaticImageData,
  },
];
export function ValueProps() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <Title level={TitleLevel.Title1}>
          Supported attestations.{' '}
          <Title level={TitleLevel.Title1} as="span" className="text-dark-palette-foregroundMuted">
            Coinbase trust with a few lines of code.
          </Title>
        </Title>
      </div>
      <div className="flex w-full flex-col gap-3">
        {VALUE_PROPS.map((item: ValuePropProps) => {
          return (
            <ValueProp
              key={item.title}
              title={item.title}
              icon={item.icon}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}
