import { Smartphone, Headphones } from 'lucide-react';

interface ProductPlaceholderProps {
  category: 'phones' | 'accessories';
  className?: string;
}

export default function ProductPlaceholder({ category, className = '' }: ProductPlaceholderProps) {
  const Icon = category === 'phones' ? Smartphone : Headphones;

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
