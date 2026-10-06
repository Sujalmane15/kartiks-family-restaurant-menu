import React from 'react';
import { RESTAURANT_NAME, ADDRESS_LINES, GBP_ADDRESS, PHONE, CALL_HREF, MAPS_URL } from '../config.js';
import { Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 border-t border-[#23242f] bg-[#090a0d] px-4 pt-8 pb-32 text-center text-xs text-[#8c877b]">
      <div className="mx-auto max-w-md flex flex-col items-center">
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-4 w-40">
          <div className="h-[1px] flex-1 bg-[#d4af37]/30" />
          <span className="text-[#d4af37] text-xs">❦</span>
          <div className="h-[1px] flex-1 bg-[#d4af37]/30" />
        </div>

        {/* Restaurant Name */}
        <h3 className="font-serif-luxury text-base sm:text-lg font-bold tracking-wider text-[#ede8df] uppercase">
          {RESTAURANT_NAME}
        </h3>

        {/* PDF Printed Address */}
        <div className="mt-3 text-xs text-[#a8a396] leading-relaxed">
          <p className="text-[11px] text-[#d4af37] font-semibold uppercase tracking-wider mb-0.5">Address</p>
          {ADDRESS_LINES.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          <div className="mt-1 text-[11px] text-[#78746c] italic">
            Building: Indrayani Garden, Room No. 01
          </div>
        </div>

        {/* Get Directions link */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:underline font-medium bg-[#161722] border border-[#2b2c3c] px-3 py-1.5 rounded-lg transition-colors"
        >
          <MapPin className="h-3.5 w-3.5" />
          <span>Get Directions</span>
        </a>

        {/* Phone */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
          <span>Phone: </span>
          <a 
            href={CALL_HREF} 
            className="font-semibold text-[#f0ebe0] hover:text-[#d4af37] transition-colors tracking-wide"
          >
            {PHONE}
          </a>
        </div>

        {/* Simple Thank You note */}
        <div className="mt-6 pt-5 border-t border-[#1a1b24] w-full flex flex-col items-center">
          <p className="font-serif-luxury text-base font-bold tracking-widest text-[#d4af37] uppercase">
            Thank You
          </p>
          <p className="text-[11px] text-[#636058] mt-1">
            We look forward to serving you again.
          </p>
        </div>
      </div>
    </footer>
  );
};
