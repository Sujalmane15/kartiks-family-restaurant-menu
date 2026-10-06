import React from 'react';
import { Snowflake, Wind } from 'lucide-react';

interface MenuSwitcherProps {
  currentMenu: 'non-ac' | 'ac';
  onChangeMenu: (menu: 'non-ac' | 'ac') => void;
}

export const MenuSwitcher: React.FC<MenuSwitcherProps> = ({ currentMenu, onChangeMenu }) => {
  return (
    <div className="w-full px-4 pt-3 pb-2 bg-[#0e0f14] border-b border-[#22232e]">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-[11px] font-semibold tracking-wider text-[#a8a396] uppercase">
            Select Dining Section
          </span>
          <span className="text-[11px] text-[#d4af37] font-medium">
            {currentMenu === 'non-ac' ? 'Standard Hall Pricing' : 'Air Conditioned Hall Pricing'}
          </span>
        </div>

        {/* Premium Gold & Dark Switcher Toggle */}
        <div 
          className="relative grid grid-cols-2 rounded-xl border border-[#2e2f3d] bg-[#14151e] p-1 shadow-inner"
          role="radiogroup"
          aria-label="Menu pricing section"
        >
          {/* NON-AC MENU Tab */}
          <button
            type="button"
            role="radio"
            aria-checked={currentMenu === 'non-ac'}
            onClick={() => onChangeMenu('non-ac')}
            className={`relative flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 select-none ${
              currentMenu === 'non-ac'
                ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-[#0a0a0d] shadow-md shadow-[#d4af37]/25 font-extrabold'
                : 'text-[#9c978b] hover:text-[#ede8df] hover:bg-[#1a1b26]'
            }`}
          >
            <Wind className={`h-4 w-4 ${currentMenu === 'non-ac' ? 'text-[#0a0a0d]' : 'text-[#7d7970]'}`} />
            <span>NON-AC MENU</span>
          </button>

          {/* AC MENU Tab */}
          <button
            type="button"
            role="radio"
            aria-checked={currentMenu === 'ac'}
            onClick={() => onChangeMenu('ac')}
            className={`relative flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 select-none ${
              currentMenu === 'ac'
                ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-[#0a0a0d] shadow-md shadow-[#d4af37]/25 font-extrabold'
                : 'text-[#9c978b] hover:text-[#ede8df] hover:bg-[#1a1b26]'
            }`}
          >
            <Snowflake className={`h-4 w-4 ${currentMenu === 'ac' ? 'text-[#0a0a0d]' : 'text-[#7d7970]'}`} />
            <span>AC MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
