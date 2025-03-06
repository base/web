import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Card, CardProps } from 'apps/web/src/components/Builders/Shared/Card';

const POSSIBILITIES: CardProps[] = [
  {
    title: 'Onchain Assistants',
    description:
      'Onchain assistants that help users perform onchain operations with natural language.',
  },
  {
    title: 'DeFi Agents',
    description: 'Trading agents that track market conditions and execute trades accordingly.',
  },
  {
    title: 'AI NPCs',
    description: 'Interactive, onchain NPCs that adapt based on user interactions.',
  },
  {
    title: 'AI-Driven Content Monetization',
    description:
      'Create automated systems that create, publish, and monetize content, and manage earnings as an autonomous entity.',
  },
  {
    title: 'NFT Portfolio Manager',
    description:
      'Autonomous manager that tracks, values, and suggests actions for NFT investments.',
  },
  {
    title: 'Self-Owned Autonomous Vehicle',
    description:
      'A self-driving vehicle that picks up drivers, receives payments, and pays for maintenance.',
  },
];

export function Possibilities() {
  return (
    <div className="flex flex-col gap-10">
      <Title level={TitleLevel.Title1}>
        Limitless possibilities.{' '}
        <Title level={TitleLevel.Title1} as="span" className="text-dark-palette-foregroundMuted">
          Launch your agent ideas in minutes.
        </Title>
      </Title>
      <div className="grid grid-cols-1 gap-20 max-sm:gap-12 sm:grid-cols-3">
        {POSSIBILITIES.map((pos) => {
          return (
            <Card
              key={pos.title}
              className="text-[#E66020]"
              title={pos.title}
              description={pos.description}
            />
          );
        })}
      </div>
    </div>
  );
}
