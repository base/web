import Link from 'apps/web/src/components/Link';

interface CaseStudyCardProps {
  name: string;
  tag: string;
  description: string;
  slug: string;
  image: string;
}

export function CaseStudyCard({ name, tag, description, slug, image }: CaseStudyCardProps) {
  return (
    <Link
      href={slug}
      className="hover:bg-neutral-200/50 group relative flex min-h-[300px] flex-col justify-between rounded-md bg-gray-5 p-4 font-sans text-sm"
    >
      <div className="absolute inset-0 z-0 flex h-full w-full items-end justify-end overflow-hidden mix-blend-multiply">
        <div className="mb-1.5 flex h-full w-full items-end justify-end">
          <img
            style={{ filter: 'grayscale(100%) contrast(500%)' }}
            src={image}
            alt={name}
            className="h-full w-1/2 translate-y-1/2 object-contain"
          />
        </div>
      </div>
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-black">{name}</h3>
          <span className="rounded-full bg-gray-100/10 px-2 py-1 text-[10px] leading-tight text-black/60">
            {tag}
          </span>
        </div>
        <p className="hidden text-base font-light text-black/60">{description}</p>
      </div>
      <div className="relative z-10 mt-4 flex items-center justify-between text-[11px] text-black/50 group-hover:text-black">
        <span className="inline-flex items-center gap-1">
          View case study
          <span className="transition-transform group-hover:translate-x-0.5">↗</span>
        </span>
      </div>
    </Link>
  );
}
