'use client';

import { cn } from '@/lib/utils';

type Category = 'all' | 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories';

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
  counts: { all: number; phones: number; tablets: number; laptops: number; smartwatches: number; headphones: number; chargers: number; cases: number; 'screen-protectors': number; accessories: number };
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'phones', label: 'Phones' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'smartwatches', label: 'Smartwatches' },
  { value: 'headphones', label: 'Headphones' },
  { value: 'chargers', label: 'Chargers' },
  { value: 'cases', label: 'Cases' },
  { value: 'screen-protectors', label: 'Screen Protectors' },
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
