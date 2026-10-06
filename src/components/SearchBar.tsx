import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentMenuName: string;
  resultsCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  currentMenuName,
  resultsCount
}) => {
  return (
    <div className="sticky top-0 z-30 bg-[#0c0d10]/95 backdrop-blur-md border-b border-[#222129] px-4 py-2.5 shadow-md">
      <div className="mx-auto max-w-xl">
        {/* Search Input Box */}
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3.5 h-4 w-4 text-[#8a857a] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${currentMenuName}... (e.g. Paneer, Chicken, Biryani, Tuborg)`}
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#15161d] border border-[#2b2b38] text-sm text-[#f5f2eb] placeholder-[#7a766e] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 h-7 w-7 flex items-center justify-center rounded-full text-[#9c978d] hover:text-[#f5f0e6] hover:bg-[#252633] transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {searchQuery && typeof resultsCount === 'number' && (
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#c59b27] px-1 font-medium">
            <span>Found {resultsCount} {resultsCount === 1 ? 'item' : 'items'} in {currentMenuName}</span>
            <button 
              onClick={() => onSearchChange('')}
              className="underline hover:text-[#e5c158]"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
