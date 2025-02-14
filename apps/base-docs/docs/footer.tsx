export default function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              Base Docs
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} base.dev. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
