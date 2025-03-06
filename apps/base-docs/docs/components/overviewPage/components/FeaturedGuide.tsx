import { ArrowRight, FileText } from 'lucide-react'
import { FeaturedGuideProps } from '../types.js'

export function FeaturedGuide({ 
  badge, 
  title, 
  description, 
  href, 
  imageUrl, 
  imageAlt 
}: FeaturedGuideProps) {
  return (
    <div className="relative mt-16">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                {badge}
              </span>
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl font-normal">
              {description}
            </p>
            <div className="mt-6">
              <a
                href={href}
                className="touch-feedback group inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 active:opacity-90"
              >
                Start Tutorial
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
            <div className="relative p-6 max-w-sm">
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-600/20 to-blue-500/20 blur-xl dark:from-blue-600/10 dark:to-blue-500/10" />
              <div className="relative bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200/50 dark:border-zinc-800 rounded-md p-3">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="rounded-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 