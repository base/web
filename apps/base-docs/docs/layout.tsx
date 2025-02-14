import type { ReactNode } from 'react'
import CardsProvider from './components/base-org/Card/context.tsx'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div 
      className="vocs-layout antialiased" 
      style={{ 
        fontFamily: 'CoinbaseSans !important'
      }}
    >
      <CardsProvider>
        {children}
      </CardsProvider>
    </div>
  )
} 