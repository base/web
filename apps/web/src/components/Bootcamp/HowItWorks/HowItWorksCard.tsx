import Card from 'apps/web/src/components/base-org/Card';
import { isValidElement, ReactNode } from 'react';

type FeatureCardProps = {
  featureItem: {
    number: string;
    title?: string | JSX.Element;
    description?: string | ReactNode;
  };
};

export function HowItWorksCard({ featureItem: { number, title, description } }: FeatureCardProps) {
  return (
    <Card innerClassName="flex w-full flex-col space-y-10 bg-gray-90 p-8">
      <p className="font-mono text-2xl uppercase text-white">{number}</p>
      <div className="flex flex-col space-y-4">
        {isValidElement(title) ? (
          title
        ) : (
          <p className="font-mono text-lg uppercase text-white">{title}</p>
        )}
        {isValidElement(description) ? (
          description
        ) : (
          <p className="font-sans text-gray-60 text-white">{description}</p>
        )}
      </div>
    </Card>
  );
}
