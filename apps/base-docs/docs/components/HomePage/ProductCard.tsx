import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export function ProductCard({ title, description, icon, link }: ProductCardProps) {
  return (
    <a href={link} className="block group">
      <div className="relative p-4 rounded-lg border border-transparent hover:border-white transition-all duration-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-medium text-white flex items-center">
              {title}
              <ArrowRight className="ml-2 h-4 w-4 text-zinc-400 transform transition-transform duration-200 group-hover:translate-x-1" />
            </h3>
            <p className="mt-2 text-sm text-zinc-400 font-normal">{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}