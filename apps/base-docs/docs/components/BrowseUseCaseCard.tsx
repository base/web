interface BrowseUseCaseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

export function BrowseUseCaseCard({ title, description, icon, href }: BrowseUseCaseCardProps) {
  const CardWrapper = href ? 'a' : 'div';

  return (
    <CardWrapper
      href={href}
      className="block h-[420px]"
    >
      <div className="flex flex-col h-full">
        <div className="h-[280px] w-full flex items-center dark:bg-zinc-900 justify-center mb-4 rounded-lg">
          <div className="w-[60%] mx-auto flex items-center justify-center">
            {icon}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-zinc-400">{description}</p>
        </div>
      </div>
    </CardWrapper>
  );
}
