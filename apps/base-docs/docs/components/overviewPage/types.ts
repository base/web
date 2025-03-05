export interface QuickstartLink {
  title: string
  href: string
  section: string
}

export interface CardProps {
  title: string
  description: string
  href: string
}

export interface SectionProps {
  title: string
  cards: CardProps[]
}

export interface FeaturedGuideProps {
  badge: string
  title: string
  description: string
  href: string
  imageUrl: string
  imageAlt: string
}

export interface HeaderProps {
  title: string
  description: string
  subtitle?: string
}

export interface DocsOverviewProps {
  header: HeaderProps
  sections: SectionProps[]
  featuredGuide?: FeaturedGuideProps
  className?: string
} 