import { DocsOverviewProps, SectionProps } from './types.js'
import { Section } from './components/Section.js'
import { FeaturedGuide } from './components/FeaturedGuide.js'

export function DocsOverview({ 
  header,
  sections, 
  featuredGuide,
  className
}: DocsOverviewProps) {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
            {header.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            {header.description}
          </p>
          {header.subtitle && (
            <p className="mt-2 text-base text-gray-500 dark:text-gray-500">
              {header.subtitle}
            </p>
          )}
        </div>

        {/* Featured Guide */}
        {featuredGuide && <FeaturedGuide {...featuredGuide} />}

        {/* Product Sections */}
        <div className="mt-12 space-y-12">
          {sections.map((section: SectionProps, index: number) => (
            <Section 
              key={index}
              title={section.title} 
              cards={section.cards}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Re-export components for individual use if needed
export { Card } from './components/Card.js'
export { Section } from './components/Section.js'
export { FeaturedGuide } from './components/FeaturedGuide.js'
export type * from './types.js'
export { DevToolsOverview } from './devToolsOverview.js'
export type * from './types.js' 