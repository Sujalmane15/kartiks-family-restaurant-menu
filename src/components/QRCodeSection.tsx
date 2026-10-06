import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { MENU_URL, RESTAURANT_NAME } from '../config.js';
import { QrCode, Copy, Check } from 'lucide-react';

export const QRCodeSection: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [effectiveUrl, setEffectiveUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Resolve dynamic URL: use MENU_URL if provided, else fallback to current window location
    const configuredUrl = String(MENU_URL || '').trim();
    const url = configuredUrl !== '' 
      ? configuredUrl 
      : (typeof window !== 'undefined' ? window.location.href : '');

    setEffectiveUrl(url);

    if (url) {
      QRCode.toDataURL(url, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#0c0d10',
          light: '#fbf9f4'
        }
      })
      .then((dataUri) => {
        setQrDataUrl(dataUri);
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
      });
    }
  }, []);

  const handleCopyLink = async () => {
    if (!effectiveUrl) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(effectiveUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch (e) {
      console.warn('Clipboard write error', e);
    }
  };

  return (
    <section 
      id="qr-code-section"
      className="mt-8 mb-6 rounded-2xl border border-[#2d2a22] bg-gradient-to-b from-[#18171f] via-[#121319] to-[#0d0e12] p-5 text-center shadow-xl relative overflow-hidden"
      aria-label="Scan to View Digital Menu"
    >
      {/* Subtle gold glow behind QR */}
      <div 
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full bg-[#d4af37]/10 blur-2xl" 
        aria-hidden="true" 
      />

      <div className="relative flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
          <QrCode className="h-4 w-4" />
          <span>Quick QR Access</span>
        </div>

        <h3 className="font-serif-luxury mt-1.5 text-lg sm:text-xl font-bold text-[#f7f3eb] uppercase tracking-wider">
          SCAN TO VIEW MENU
        </h3>

        <p className="mt-1 text-xs text-[#9e998e] max-w-xs">
          Open your phone camera to scan and view this digital menu card instantly on any phone.
        </p>

        {/* QR Code Canvas */}
        <div className="my-4 rounded-xl border-2 border-[#d4af37]/40 bg-white p-2.5 shadow-lg shadow-black/40">
          {qrDataUrl ? (
            <img 
              src={qrDataUrl} 
              alt={`QR Code to open ${RESTAURANT_NAME} Digital Menu`}
              className="h-44 w-44 object-contain rounded-lg"
            />
          ) : (
            <div className="flex h-44 w-44 items-center justify-center text-xs text-slate-500">
              Generating QR Code...
            </div>
          )}
        </div>

        {/* Copy Link Action */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xs">
          <button
            onClick={handleCopyLink}
            className="w-full h-10 px-3 rounded-lg bg-[#20212d] hover:bg-[#2b2d3d] border border-[#37384a] text-xs font-medium text-[#ede9df] hover:text-[#d4af37] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Copy Menu Link</span>
              </>
            )}
          </button>
        </div>

        <p className="mt-2.5 text-[11px] text-[#6d6960] truncate max-w-xs">
          {effectiveUrl}
        </p>
      </div>
    </section>
  );
};
