import React from 'react';
import { CALL_HREF, WHATSAPP_URL, MAPS_URL, PHONE } from '../config.js';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export const BottomActions: React.FC = () => {
  return (
    <aside 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d12]/95 backdrop-blur-md border-t border-[#262734] px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_20px_rgba(0,0,0,0.6)]"
      aria-label="Quick contact and location actions"
    >
      <div className="mx-auto max-w-md flex items-center justify-between gap-2">
        {/* Call Now */}
        <a
          href={CALL_HREF}
          className="flex-1 min-h-[46px] h-[46px] px-2.5 rounded-xl bg-[#1b1c26] hover:bg-[#232532] border border-[#2e3042] text-[#f2efe9] hover:text-[#d4af37] flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98]"
          aria-label={`Call Kartik's Restaurant at ${PHONE}`}
        >
          <Phone className="h-4 w-4 text-[#d4af37] shrink-0" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[46px] h-[46px] px-2.5 rounded-xl bg-gradient-to-r from-[#205e3b] to-[#128C7E] hover:from-[#256c44] hover:to-[#179f8f] text-white flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950/40 transition-all active:scale-[0.98]"
          aria-label="Message on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-emerald-200 fill-emerald-200/20 shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Get Directions */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[46px] h-[46px] px-2.5 rounded-xl bg-[#1b1c26] hover:bg-[#232532] border border-[#2e3042] text-[#f2efe9] hover:text-[#d4af37] flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98]"
          aria-label="Get directions to restaurant on Google Maps"
        >
          <MapPin className="h-4 w-4 text-[#e5c158] shrink-0" />
          <span>Get Directions</span>
        </a>
      </div>
    </aside>
  );
};
