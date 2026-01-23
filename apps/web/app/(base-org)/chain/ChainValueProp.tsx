import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

interface ChainValuePropProps {
  eyebrow: string;
  pill?: string;
  header: string;
  subheader: string;
  icon: React.ReactNode;
}

export function ChainValueProp({ eyebrow, pill, header, subheader, icon }: ChainValuePropProps) {
  return (
    <div className="group flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8">{icon}</div>
          <Text
            variant={TextVariant.Caption}
            className="!text-xs !font-medium uppercase tracking-wide !text-base-gray-200"
          >
            {eyebrow}
          </Text>
        </div>
        {pill && (
          <span
            className="rounded-full bg-black/5 px-3 py-1.5 font-sans
           text-xs font-medium uppercase leading-none tracking-wide text-base-gray-200"
          >
            {pill}
          </span>
        )}
      </div>
      {/* <Title level={TitleLevel.H1Regular} as="h3">
        {header}
      </Title> */}
      <Text variant={TextVariant.BodyLarge} className="max-w-2xl !text-base-gray-200">
        <span className="whitespace-pre-wrap !text-black">{header}. </span> {subheader}
      </Text>
    </div>
  );
}
