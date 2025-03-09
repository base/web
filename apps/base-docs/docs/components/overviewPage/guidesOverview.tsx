import { 
  ArrowRight,
  BookOpen,
  ShoppingBag,
  Brush,
  Coins,
  FileCode2,
  Link2,
  Box,
  Shield
} from 'lucide-react'

const quickstartLinks = [
  {
    title: "Deploy with Foundry",
    href: "/guides/general-development/smart-contract-development/foundry/deploy-with-foundry",
    section: "quickstart"
  },
  {
    title: "Create a Basename Profile Component",
    href: "/guides/life-cycle-guides/activating/create-a-basename-profile-component",
    section: "quickstart"
  },
  {
    title: "Gasless Transactions with Paymaster",
    href: "/guides/general-development/account-abstraction/gasless-transactions-with-paymaster",
    section: "quickstart"
  }
] as const

type QuickstartLink = typeof quickstartLinks[number]

function QuickStartCard() {
  return (
    <div className=" max-overview-hero:hidden overview-hero:sticky overview-hero:top-8 overview-hero:flex overview-hero:justify-center">
      <div className="w-[320px]">
        <div className="relative">
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[rgb(0,82,255)]/20 to-[rgb(77,136,255)]/20 blur-xl" />
          <div className="relative bg-white dark:bg-black shadow-lg border border-zinc-200 dark:border-zinc-800 rounded-md p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(0, 82,255)' }} />
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Popular Guides
              </h3>
            </div>
            <div className="space-y-1">
              {quickstartLinks.map((link: QuickstartLink) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block group"
                >
                  <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-[rgb(0,82,255)] line-clamp-1 font-normal">
                      {link.title}
                    </span>
                    <ArrowRight className="h-3 w-3 text-zinc-400 group-hover:text-[rgb(0,82,255)] flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useCaseGuides = [
  {
    title: "Commerce",
    description: "Build and deploy an eCommerce app on Base.",
    icon: ShoppingBag,
    href: "/guides/use-case-guides/commerce/build-an-ecommerce-app"
  },
  {
    title: "Creators",
    description: "Mint NFTs with Zora and expose them on Farcaster",
    icon: Brush,
    href: "/guides/use-case-guides/creator/nft-minting-with-zora"
  },
  {
    title: "Real World Data",
    description: "Bring real world data into your onchain finance apps.",
    icon: Coins,
    href: "/guides/use-case-guides/finance/access-real-world-data-chainlink"
  }
] as const

type UseCaseGuide = typeof useCaseGuides[number]

const generalGuides = [
  {
    title: "Smart Contracts",
    description: "Write and deploy secure smart contracts",
    icon: FileCode2,
    href: "/guides/general-development/smart-contract-development/foundry/deploy-with-foundry"
  },
  {
    title: "Cross-Chain",
    description: "Build applications that work across chains",
    icon: Link2,
    href: "/guides/general-development/cross-chain/bridge-tokens-with-layerzero"
  },
  {
    title: "NFTs",
    description: "Create and manage NFT collections",
    icon: Box,
    href: "/guides/general-development/nfts/simple-onchain-nfts"
  },
  {
    title: "Account Abstraction",
    description: "Implement smart accounts and meta-transactions",
    icon: Shield,
    href: "guides/general-development/account-abstraction/account-abstraction-on-base-using-biconomy"
  }
] as const

type GeneralGuide = typeof generalGuides[number]

export function GuidesOverview() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 xl:grid-cols-[480px,1fr] mb-12">
          {/* Left Column */}
          <div className="max-w-[480px]">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Development Guides</h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              Comprehensive guides for building onchain applications.
            </p>
            
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              From smart contract development to user onboarding, find detailed guides for common use cases and developer workflows.
            </p>
            
            {/* CTAs */}
            <div className="mt-6 flex flex-row items-center gap-4 flex-wrap">
              <a
                href="/guides/use-case-guides/finance/build-a-smart-wallet-funding-app"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[rgb(0,82,255)] text-white font-medium hover:bg-[rgb(0,82,255)]/90 transition-colors"
              >
                <FileCode2 className="mr-2 h-4 w-4" />
                Add In-App Funding
              </a>
              <a
                href="/guides/use-case-guides/commerce/accept-crypto-payments"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Accept Crypto Payments
              </a>
            </div>
          </div>

          <QuickStartCard />
        </div>

        {/* Use Case Guides */}
        <div className="mb-16">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Use Case Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCaseGuides.map((guide: UseCaseGuide) => {
              const Icon = guide.icon
              return (
                <a
                  key={guide.href}
                  href={guide.href}
                  className="block group h-full"
                >
                  <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:border-[rgb(0,82,255)] transition-colors h-full flex flex-col shadow-zinc-200/50 dark:shadow-none">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="h-5 w-5 text-[rgb(0,82,255)]" />
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[rgb(0,82,255)]">
                        {guide.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 flex-grow">
                      {guide.description}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* General Development */}
        <div className="mb-16">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">General Development</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalGuides.map((guide: GeneralGuide) => {
              const Icon = guide.icon
              return (
                <a
                  key={guide.href}
                  href={guide.href}
                  className="block group h-full"
                >
                  <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:border-[rgb(0,82,255)] transition-colors h-full flex flex-col shadow-zinc-200/50 dark:shadow-none">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="h-5 w-5 text-[rgb(0,82,255)]" />
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[rgb(0,82,255)]">
                        {guide.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 flex-grow">
                      {guide.description}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
} 