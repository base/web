import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

type SolutionTextProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SolutionText({ eyebrow, title, description }: SolutionTextProps) {
  return (
    <div className="flex h-full flex-col justify-center space-y-4 p-0 font-sans md:max-w-sm">
      {/* <p className="text-xs uppercase leading-none tracking-widest">{eyebrow}</p> */}
      {/* <h3 className="text-3xl text-black">{title}</h3>
      <p className="text-sm text-black/60 sm:text-base">{description}</p> */}
      <Title level={TitleLevel.H1Regular}>{title}</Title>
      <Text variant={TextVariant.BodyLarge}>{description}</Text>
    </div>
  );
}
