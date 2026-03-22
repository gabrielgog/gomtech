import { Smartphone, Headphones, Laptop, Watch, Zap, Package } from 'lucide-react';

interface ProductPlaceholderProps {
  category: 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories';
  className?: string;
}

export default function ProductPlaceholder({ category, className = '' }: ProductPlaceholderProps) {
  const categoryIcons: Record<typeof category, React.ComponentType<any>> = {
    phones: Smartphone,
    tablets: Smartphone,
    laptops: Laptop,
    smartwatches: Watch,
    headphones: Headphones,
    chargers: Zap,
    cases: Package,
    'screen-protectors': Package,
    accessories: Package,
  };
  const Icon = categoryIcons[category] || Package;

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-800 to-zinc-900 ${className}`}
    >
      <div className="rounded-2xl bg-zinc-700/50 p-5">
        <Icon className="h-12 w-12 text-zinc-500" strokeWidth={1.5} />
      </div>
      <span className="text-xs font-medium text-zinc-600">Image Coming Soon</span>
    </div>
  );
}
