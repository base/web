import { SectionProps } from '../types.js'
import { Card } from './Card.js'

export function Section({ title, cards }: SectionProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-500 uppercase tracking-wide mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  )
} 