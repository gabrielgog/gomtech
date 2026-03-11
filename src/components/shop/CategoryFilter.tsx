'use client';

import { cn } from '@/lib/utils';

type Category = 'all' | 'phones' | 'accessories';

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
  counts: { all: number; phones: number; accessories: number };
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'phones', label: 'Phones' },
  { value: 'accessories', label: 'Accessories' },
];

export default function CategoryFilter({ selected, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all',
            selected === value
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
          )}
        >
          {label}
          <span
            className={cn(
              'rounded-full px-1.5 py-0.5 text-xs',
              selected === value
                ? 'bg-zinc-950/20 text-zinc-950'
                : 'bg-zinc-800 text-zinc-500'
            )}
          >
            {counts[value]}
          </span>
        </button>
      ))}
    </div>
  );
}
