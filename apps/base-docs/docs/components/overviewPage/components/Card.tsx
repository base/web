import { ArrowRight } from 'lucide-react'
import { CardProps } from '../types.js'

export function Card({ title, description, href }: CardProps) {
  return (
    <a 
      href={href}
      className="block group"
    >
      <div className="relative bg-zinc-50 dark:bg-zinc-900 shadow-lg shadow-zinc-300/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800 rounded-md p-4 hover:bg-white dark:hover:bg-zinc-800/50 transition-colors duration-200">
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[rgb(0,82,255)] flex items-center justify-between">
          <span className="line-clamp-1">{title}</span>
          <ArrowRight className="h-3 w-3 text-zinc-400 group-hover:text-[rgb(0,82,255)] flex-shrink-0 ml-2" />
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  )
} 