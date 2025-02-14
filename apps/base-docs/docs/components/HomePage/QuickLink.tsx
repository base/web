import { ArrowRight } from 'lucide-react';

interface QuickLinkProps {
  href: string;
  children: React.ReactNode;
}

export function QuickLink({ href, children }: QuickLinkProps) {
  return (
    <a
      href={href}
      className="block w-full"
    >
      <div className="w-full flex items-center justify-between py-1.5 pl-0 pr-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
        <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-[rgb(0,82,255)] line-clamp-1 flex-1 pr-4">
          {children}
        </span>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[rgb(0,82,255)] flex-shrink-0" />
      </div>
    </a>
  );
}