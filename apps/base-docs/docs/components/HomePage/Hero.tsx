import { ArrowRight, FileText, Rocket } from 'lucide-react'

const topGuides = [
  {
    title: 'Build an E-commerce App',
    path: '/guides/use-case-guides/commerce/build-an-ecommerce-app'
  },
  {
    title: 'Add an In-App Onramp ',
    path: '/guides/use-case-guides/finance/build-a-smart-wallet-funding-app'
  },
  {
    title: 'Run a Base Node',
    path: '/docs/chain/run-a-base-node'
  }
] as const

type Guide = typeof topGuides[number]

function TopGuidesCard() {
  return (
    <div className="max-home-hero:hidden w-full max-w-sm">
      <div className="relative p-6">
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[rgb(0,82,255)]/20 to-[rgb(77,136,255)]/20 blur-xl dark:from-[rgb(0,82,255)]/10 dark:to-[rgb(77,136,255)]/10" />
        <div className="relative bg-white dark:bg-black shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200/50 dark:border-zinc-800 rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(0, 82, 255)' }} />
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Popular Guides
              </h3>
            </div>
            <a 
              href="/docs/guides" 
              className="text-xs hover:opacity-80 font-medium"
              style={{ color: 'rgb(0, 82, 255)' }}
            >
              View all
            </a>
          </div>
          <div className="space-y-0.5">
            {topGuides.map((item: Guide) => (
              <a
                key={item.path}
                href={item.path}
                className="block group"
              >
                <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-[rgb(0,82,255)] line-clamp-1 font-normal">
                    {item.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-[rgb(0,82,255)] flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <div className="relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" style={{ color: 'rgb(0, 82, 255)' }} />
              <span className="text-sm font-medium" style={{ color: 'rgb(0, 82, 255)' }}>
                Documentation
              </span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              Build on {' '}
              <span className="text-transparent bg-clip-text font-bold" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, rgb(0, 82, 255), rgb(77, 136, 255))'
                }}>
                Base
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl font-normal">
              Explore our comprehensive guides and examples to integrate our platform
              and create exceptional experiences.
            </p>
            <div className="mt-6 flex flex-row items-center gap-4 flex-wrap">
              <a
                href="/get-started"
                className="touch-feedback group flex justify-center items-center px-5 py-2.5 text-sm font-medium rounded-md text-white active:opacity-90"
                style={{ backgroundColor: 'rgb(255, 255, 255)', color: '#000' }}
              >
                Get started!
                <Rocket className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/docs"
                className="touch-feedback group flex justify-center items-center px-5 py-2.5 text-sm font-medium rounded-md border-2 border-white text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                style={{ 
                  '--hover-color': 'rgb(0, 82, 255)',
                  '--active-color': 'rgb(0, 82, 255)'
                } as React.CSSProperties}
              >
                Explore Dev Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <TopGuidesCard />
          </div>
        </div>
      </div>
    </div>
  )
}