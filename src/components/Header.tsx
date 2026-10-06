import React from 'react';
import { PHONE } from '../config.js';
import { Phone, UtensilsCrossed } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative w-full border-b border-[#2a2721] bg-gradient-to-b from-[#18171f] via-[#111216] to-[#0c0d10] px-4 pt-6 pb-4 text-center shadow-lg">
      {/* Subtle gold radial background glow */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.11),_transparent_75%)]" 
        aria-hidden="true" 
      />

      <div className="relative mx-auto max-w-xl flex flex-col items-center">
        {/* Restaurant Crest & Iconography */}
        <div className="mb-2 flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#1c1b24] text-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <UtensilsCrossed className="h-4 w-4" />
          </div>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
        </div>

        {/* Main Title */}
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold tracking-wider text-[#f7f2e7] drop-shadow-sm uppercase">
          Kartik&apos;s
        </h1>

        {/* Subtitle */}
        <h2 className="font-serif-luxury mt-0.5 text-sm sm:text-base font-bold tracking-widest text-[#d4af37] uppercase">
          Family Restaurant &amp; Bar
        </h2>

        {/* Digital Menu indicator */}
        <div className="mt-1 flex items-center justify-center gap-2 text-xs text-[#a39e93] font-medium tracking-widest uppercase">
          <span>Digital Menu</span>
          <span className="text-[#59554a]" aria-hidden="true">•</span>
          <span>Roadpali, Kalamboli</span>
        </div>

        {/* Quick Contact Link */}
        <a 
          href={`tel:${PHONE}`}
          className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] text-[#9b968c] hover:text-[#e5c158] transition-colors py-0.5 px-3 rounded-full bg-[#181820]/90 border border-[#2b2b36]"
          aria-label={`Call restaurant at ${PHONE}`}
        >
          <Phone className="h-3 w-3 text-[#d4af37]" />
          <span>Call: <strong className="font-semibold text-[#ded8cb] tracking-wide">{PHONE}</strong></span>
        </a>
      </div>
    </header>
  );
};
