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
    <div className="flex h-full flex-col justify-center space-y-4 p-0 font-sans md:mx-auto md:max-w-sm">
      <Title level={TitleLevel.H1Regular}>{title}</Title>
      <Text variant={TextVariant.BodyLarge} className="!text-base-gray-200">
        {description}
      </Text>
    </div>
  );
}
