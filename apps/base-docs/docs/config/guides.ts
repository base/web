export const topGuides = [
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

export type Guide = typeof topGuides[number] 