import React from 'react';
import { MenuItemData } from '../types.ts';

interface MenuItemProps {
  item: MenuItemData;
  categoryType?: 'veg' | 'non-veg';
  categoryColumns?: string[];
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, categoryType, categoryColumns }) => {
  // Determine if item or category has explicit veg/non-veg classification
  const effectiveType = item.type || categoryType;

  return (
    <article className="group relative rounded-xl border border-[#22232f] bg-gradient-to-br from-[#14151c] to-[#0f1015] p-3.5 sm:p-4 shadow-sm transition-all hover:border-[#3d382e] hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        {/* Left side: Veg/Non-Veg icon (only if explicitly classified) + Item Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2.5">
            {effectiveType === 'veg' && (
              <span 
                className="mt-0.5 shrink-0 flex h-4 w-4 items-center justify-center rounded-[3px] border border-emerald-500 bg-[#0f2115]"
                title="Vegetarian"
                aria-label="Vegetarian"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            )}
            {effectiveType === 'non-veg' && (
              <span 
                className="mt-0.5 shrink-0 flex h-4 w-4 items-center justify-center rounded-[3px] border border-red-600 bg-[#251010]"
                title="Non-Vegetarian"
                aria-label="Non-Vegetarian"
              >
                <span className="h-2 w-2 rounded-full bg-red-600" />
              </span>
            )}

            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-[#f0ebe1] tracking-wide leading-snug group-hover:text-[#f8f5ee]">
                {item.name}
              </h3>

              {item.variantType === 'H/F' && !item.name.includes('(H/F)') && (
                <span className="inline-block mt-0.5 text-[11px] font-medium text-[#c59b27] uppercase tracking-wider">
                  H/F
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Multi-volume bar pegs OR Single/Variant Price */}
        {item.prices ? (
          /* Multi-column Bar prices (180ML, 90ML, 60ML, 30ML or 650ML, 500ML, 330ML) */
          <div className="flex flex-wrap items-center gap-1.5 shrink-0 pl-6 sm:pl-0">
            {categoryColumns && categoryColumns.length > 0 ? (
              categoryColumns.map((col) => {
                const val = item.prices?.[col] ?? '-';
                return (
                  <div
                    key={col}
                    className={`inline-flex flex-col items-center rounded-md border px-2 py-1 text-center min-w-[50px] ${
                      val === '-' 
                        ? 'border-[#22232d] bg-[#121319] opacity-40' 
                        : 'border-[#2b2c3a] bg-[#191a24]'
                    }`}
                  >
                    <span className="text-[10px] text-[#8c877b] uppercase">{col}</span>
                    <span className="text-xs font-bold text-[#e5c158] tabular-nums">
                      {val === '-' ? '—' : `₹${val}`}
                    </span>
                  </div>
                );
              })
            ) : (
              Object.entries(item.prices).map(([col, val]) => (
                <div
                  key={col}
                  className={`inline-flex flex-col items-center rounded-md border px-2 py-1 text-center min-w-[50px] ${
                    val === '-' 
                      ? 'border-[#22232d] bg-[#121319] opacity-40' 
                      : 'border-[#2b2c3a] bg-[#191a24]'
                  }`}
                >
                  <span className="text-[10px] text-[#8c877b] uppercase">{col}</span>
                  <span className="text-xs font-bold text-[#e5c158] tabular-nums">
                    {val === '-' ? '—' : `₹${val}`}
                  </span>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Single / H/F / APS price */
          <div className="shrink-0 text-left sm:text-right pl-6 sm:pl-0">
            {item.price === 'APS' ? (
              <span className="inline-block rounded-md border border-[#d4af37]/40 bg-[#241f14] px-2 py-0.5 text-xs font-bold text-[#e5c158] tracking-wider">
                APS
              </span>
            ) : item.price === '-' ? (
              <span className="text-xs font-medium text-[#7a766e]">
                Price on Request
              </span>
            ) : item.price !== undefined ? (
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-[#c59b27]">₹</span>
                <span className="text-base font-bold text-[#ede8df] tabular-nums tracking-wide">
                  {item.price}
                </span>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
};
