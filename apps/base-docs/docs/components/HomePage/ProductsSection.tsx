import { Code2, Terminal, Smartphone, Send } from 'lucide-react';
import { ProductCard } from './ProductCard.tsx';

export function ProductsSection() {
  return (
    <div className="mt-24">
      <h2 className="text-sm font-semibold text-white uppercase tracking-wide mb-8">
        Base Building Blocks
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProductCard
          title="Builder Kits"
          description="Ready-to-use components and tools to accelerate your development"
          icon={<Code2 className="h-6 w-6 text-blue-600" />}
          link="builderkits/onchainkit/getting-started"
        />
        <ProductCard
          title="Identity"
          description="Modern wallet solutions and identity tools for seamless user experiences"
          icon={<Smartphone className="h-6 w-6 text-blue-600" />}
          link="/docs/identity/smart-wallet/quick-start"
        />
        <ProductCard
          title="Base Chain"
          description="Run nodes, access data feeds, and build directly on Base"
          icon={<Terminal className="h-6 w-6 text-blue-600" />}
          link="/docs/chain/network-information"
        />
      </div>
    </div>
  );
}