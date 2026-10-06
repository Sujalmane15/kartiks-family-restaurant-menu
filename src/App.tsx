import React, { useState, useMemo, useEffect, useRef } from 'react';
import { nonAcMenu } from './data/nonAcMenu.js';
import { acMenu } from './data/acMenu.js';
import { MenuCategoryData } from './types.ts';
import { Header } from './components/Header.tsx';
import { MenuSwitcher } from './components/MenuSwitcher.tsx';
import { SearchBar } from './components/SearchBar.tsx';
import { CategoryTabs } from './components/CategoryTabs.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { BottomActions } from './components/BottomActions.tsx';
import { QRCodeSection } from './components/QRCodeSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ArrowUp, AlertCircle, Snowflake, Wind } from 'lucide-react';

export default function App() {
  const [currentMenuType, setCurrentMenuType] = useState<'non-ac' | 'ac'>('non-ac');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const isUserClickingTabRef = useRef<boolean>(false);

  // Active raw menu dataset strictly according to selected mode
  const currentMenuDataset = useMemo<MenuCategoryData[]>(() => {
    return (currentMenuType === 'ac' ? acMenu : nonAcMenu) as unknown as MenuCategoryData[];
  }, [currentMenuType]);

  // Set default active category whenever the menu type changes
  useEffect(() => {
    if (currentMenuDataset.length > 0) {
      setActiveCategoryId(currentMenuDataset[0].id);
    }
  }, [currentMenuType, currentMenuDataset]);

  // Monitor scroll for back-to-top button and category active state tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // If user recently clicked a tab, don't override immediately with scroll spy
      if (isUserClickingTabRef.current) return;

      const headerOffset = 160;
      for (const cat of currentMenuDataset) {
        const el = document.getElementById(cat.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom > headerOffset) {
            setActiveCategoryId(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentMenuDataset]);

  // Filter categories and items based on search query ONLY for the active menu
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return currentMenuDataset.map((category) => {
      const filteredItems = category.items.filter((item) => {
        if (!query) return true;

        const nameMatches = item.name.toLowerCase().includes(query);
        const descMatches = item.description?.toLowerCase().includes(query);
        const categoryMatches = category.name.toLowerCase().includes(query);
        
        return nameMatches || descMatches || categoryMatches;
      });

      return {
        ...category,
        items: filteredItems
      };
    }).filter((category) => category.items.length > 0);
  }, [currentMenuDataset, searchQuery]);

  // Total results count for search display
  const totalResultsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  // Handle category selection via tab click
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    isUserClickingTabRef.current = true;

    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      isUserClickingTabRef.current = false;
    }, 800);
  };

  const handleMenuSwitch = (newMenu: 'non-ac' | 'ac') => {
    if (newMenu === currentMenuType) return;
    setCurrentMenuType(newMenu);
    // Smoothly scroll back to top of menu list so customer sees the new menu from beginning
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMenuLabel = currentMenuType === 'ac' ? 'AC MENU' : 'NON-AC MENU';

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f2efe9] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f8f4eb]">
      {/* Header */}
      <Header />

      {/* Prominent AC / NON-AC Menu Switcher */}
      <MenuSwitcher 
        currentMenu={currentMenuType} 
        onChangeMenu={handleMenuSwitch} 
      />

      {/* Sticky Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentMenuName={currentMenuLabel}
        resultsCount={searchQuery ? totalResultsCount : undefined}
      />

      {/* Horizontal Category Tabs */}
      {filteredCategories.length > 0 && (
        <CategoryTabs
          categories={filteredCategories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto max-w-xl px-4 py-2">
        {/* Active Menu Notification Banner */}
        {!searchQuery && (
          <div className="my-3 rounded-xl border border-[#272520] bg-gradient-to-r from-[#17161c] via-[#1a1820] to-[#17161c] p-3 text-center shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#d4af37]/40 bg-[#121319] text-[#e5c158] text-[11px] font-bold uppercase tracking-wider mb-1">
              {currentMenuType === 'ac' ? (
                <>
                  <Snowflake className="h-3 w-3 text-sky-400" />
                  <span>Viewing Air Conditioned (AC) Menu</span>
                </>
              ) : (
                <>
                  <Wind className="h-3 w-3 text-amber-400" />
                  <span>Viewing Non-AC Menu</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-[#8e897e] mt-1">
              All prices in Indian Rupees (₹) as per official menu card. No service charge.
            </p>
          </div>
        )}

        {/* Search status banner */}
        {searchQuery && (
          <div className="my-3 flex items-center justify-between rounded-lg border border-[#2b2b38] bg-[#14151c] px-3 py-2 text-xs">
            <span className="text-[#bfb9ad]">
              Searching {currentMenuLabel} for:{' '}
              <strong className="text-[#f5f1e8]">&ldquo;{searchQuery}&rdquo;</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#d4af37] hover:underline font-medium"
            >
              Reset search
            </button>
          </div>
        )}

        {/* Render menu sections */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <MenuSection
                key={category.id}
                category={category}
                items={category.items}
              />
            ))}
          </div>
        ) : (
          /* Empty search state */
          <div className="my-14 flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-[#282732] bg-[#12131a]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1f2b] text-[#c59b27] mb-3">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="font-serif-luxury text-base font-bold text-[#ede8de]">
              No dishes found in {currentMenuLabel}
            </h3>
            <p className="mt-1 text-xs text-[#8c877b] max-w-xs leading-relaxed">
              We couldn't find any items matching &ldquo;{searchQuery}&rdquo; in the {currentMenuLabel}. Try a different term or clear the search.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 h-9 px-4 rounded-lg bg-[#d4af37] text-[#0c0d10] text-xs font-bold hover:bg-[#e6be44] transition-all"
            >
              View Full {currentMenuLabel}
            </button>
          </div>
        )}

        {/* QR Code Section */}
        <QRCodeSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 bottom-20 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#161720]/90 text-[#d4af37] shadow-lg backdrop-blur-md hover:bg-[#d4af37] hover:text-[#0c0d10] transition-all active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* Fixed Mobile Bottom Action Bar (Call, WhatsApp, Directions) */}
      <BottomActions />
    </div>
  );
}
