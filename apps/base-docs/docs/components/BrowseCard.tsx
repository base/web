interface BrowseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

export function BrowseCard({ title, description, icon, href }: BrowseCardProps) {
  const CardWrapper = href ? 'a' : 'div';
  
  return (
    <CardWrapper 
      href={href}
      className="block h-full p-6 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
    >
      <div className="flex flex-col gap-4">
        <div className="h-12 w-12 text-blue-500">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1 my-4">{title}</h3>
          <p className="text-zinc-400">{description}</p>
        </div>
      </div>
    </CardWrapper>
  );
} 