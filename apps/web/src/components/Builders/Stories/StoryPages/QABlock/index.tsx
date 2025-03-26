import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function QABlock({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="mb-14 flex w-full flex-col gap-4">
      <Title level={TitleLevel.Title3} className="text-dark-palette-foregroundMuted font-medium">
        {question}
      </Title>
      <Title level={TitleLevel.Title3}>&quot;{answer}&quot;</Title>
    </div>
  );
}
