import { ArrowRight } from 'lucide-react'
import { CardProps } from '../types.js'

export function Card({ title, description, href }: CardProps) {
  return (
    <a 
      href={href}
      className="block group"
    >
      <div className="relative bg-gray-50 dark:bg-gray-900 shadow-lg shadow-gray-300/50 dark:shadow-none border border-gray-200 dark:border-gray-800 rounded-md p-4 hover:bg-white dark:hover:bg-gray-800/50 transition-colors duration-200">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-[rgb(0,82,255)] flex items-center justify-between">
          <span className="line-clamp-1">{title}</span>
          <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-[rgb(0,82,255)] flex-shrink-0 ml-2" />
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  )
} 