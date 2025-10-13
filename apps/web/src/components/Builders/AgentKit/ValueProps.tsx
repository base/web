import { ValueProp, ValuePropProps } from 'apps/web/src/components/Builders/Shared/ValueProp';
import coinbase from 'apps/web/src/components/Builders/Verifications/coinbase.svg';
import globe from 'apps/web/src/components/Builders/Verifications/globe.svg';
import coinbaseOne from 'apps/web/src/components/Builders/Verifications/coinbaseOne.svg';
import { StaticImageData } from 'next/image';

const VALUE_PROPS: ValuePropProps[] = [
  {
    title: 'Verified Account',
    description: 'A Coinbase user with a valid Coinbase trading account. ',
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
    <div className="flex w-full flex-col gap-3">
      {VALUE_PROPS.map((prop) => {
        return (
          <ValueProp
            key={prop.title}
            title={prop.title}
            icon={prop.icon}
            description={prop.description}
          />
        );
      })}
    </div>
  );
}
