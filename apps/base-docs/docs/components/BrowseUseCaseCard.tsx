type BrowseUseCaseCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
};

export function BrowseUseCaseCard({ title, description, icon, href }: BrowseUseCaseCardProps) {
  const CardWrapper = href ? 'a' : 'div';

  return (
    <CardWrapper href={href} className="block h-[420px]">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex h-[280px] w-full items-center justify-center rounded-lg dark:bg-zinc-900">
          <div className="mx-auto flex w-[60%] items-center justify-center">{icon}</div>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="mb-1 text-lg font-bold text-white">{title}</h3>
          <p className="text-zinc-400">{description}</p>
        </div>
      </div>
    </CardWrapper>
  );
}
