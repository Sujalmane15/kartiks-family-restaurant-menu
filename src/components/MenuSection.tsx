import React from 'react';
import { MenuCategoryData, MenuItemData } from '../types.ts';
import { MenuItem } from './MenuItem.tsx';

interface MenuSectionProps {
  category: MenuCategoryData;
  items: MenuItemData[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ category, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section 
      id={category.id}
      className="scroll-mt-36 pt-5 pb-3"
      aria-labelledby={`heading-${category.id}`}
    >
      {/* Category Section Header */}
      <div className="mb-3.5 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-1 w-full max-w-xs">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
          <span className="text-xs text-[#d4af37] tracking-widest font-mono">✦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
        </div>

        <h2 
          id={`heading-${category.id}`}
          className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wide text-[#f7f3ea] flex items-center justify-center gap-2"
        >
          {category.isBar && <span className="text-[#d4af37] text-base">🍸</span>}
          <span>{category.name}</span>
        </h2>

        {category.columns && category.columns.length > 0 && (
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#9c978b]">
            <span>Sizes:</span>
            <div className="flex items-center gap-1">
              {category.columns.map((c) => (
                <span key={c} className="rounded bg-[#1a1b24] px-1.5 py-0.5 text-[#d4af37] font-semibold">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 gap-2.5">
        {items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            categoryType={category.type} 
            categoryColumns={category.columns}
          />
        ))}
      </div>
    </section>
  );
};
