import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

interface ChainValuePropProps {
  eyebrow: string;
  pill?: string;
  header: string;
  subheader: string;
}

export function ChainValueProp({ eyebrow, pill, header, subheader }: ChainValuePropProps) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-3">
        <Text
          variant={TextVariant.CaptionMono}
          className="!text-xs uppercase tracking-widest !text-base-blue"
        >
          {eyebrow}
        </Text>
        {pill && (
          <span
            className="rounded-full bg-black/10 px-3 py-1.5 font-mono
           text-xs uppercase leading-none tracking-widest text-black "
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
