export default function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">
              Base Docs
            </span>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} base.org. All rights reserved.
          </div>

          <div className="flex flex-row space-x-4">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>

        </div>
      </div>
    </footer>
  )
}
