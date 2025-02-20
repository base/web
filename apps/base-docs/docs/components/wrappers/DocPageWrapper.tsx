import { ReactNode } from 'react'

interface DocPageWrapperProps {
  children: ReactNode
}

export function DocPageWrapper({ children }: DocPageWrapperProps) {
  return (
    <div className="w-full min-h-screen">
      <div className="relative isolate">
        {children}
      </div>
    </div>
  )
} 