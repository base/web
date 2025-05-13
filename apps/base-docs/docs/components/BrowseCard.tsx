type BrowseCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
};

export function BrowseCard({ title, description, icon, href }: BrowseCardProps) {
  const CardWrapper = href ? 'a' : 'div';

  return (
    <CardWrapper
      href={href}
      className="block h-full rounded-lg bg-zinc-100 p-6 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
    >
      <div className="flex flex-col gap-4">
        <div className="h-12 w-12 text-blue-500">{icon}</div>
        <div>
          <h3 className="my-4 mb-1 text-lg font-semibold text-white">{title}</h3>
          <p className="text-zinc-400">{description}</p>
        </div>
      </div>
    </CardWrapper>
  );
}
