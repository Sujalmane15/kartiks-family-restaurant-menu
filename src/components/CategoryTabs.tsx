import React, { useRef, useEffect } from 'react';
import { MenuCategoryData } from '../types.ts';

interface CategoryTabsProps {
  categories: MenuCategoryData[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view horizontally
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current;
      const tab = activeTabRef.current;
      const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategoryId]);

  return (
    <div className="w-full bg-[#101116] border-b border-[#20212a] sticky top-[62px] z-20 shadow-sm">
      <div 
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 px-4 mx-auto max-w-xl"
        role="tablist"
        aria-label="Menu categories"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onSelectCategory(cat.id)}
              role="tab"
              aria-selected={isActive}
              className={`h-9 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 select-none ${
                isActive
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#e6be44] text-[#0c0d10] font-bold shadow-md shadow-[#d4af37]/20 scale-[1.02]'
                  : 'bg-[#161720] text-[#a19c8f] border border-[#262734] hover:text-[#f2efe9] hover:bg-[#1d1e2a]'
              }`}
            >
              {cat.isBar && <span className="text-[11px]">🍸</span>}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
