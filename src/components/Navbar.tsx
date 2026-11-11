import { useState } from 'react';
import { TOKENS } from '../tokens';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenStudio?: () => void;
  orderCount?: number;
}

export default function Navbar({ onOpenStudio, orderCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-xs border-b-2 border-[#2d2d2d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-3xl font-bold tracking-tight text-[#2d2d2d] hover:rotate-1 transition-transform whitespace-nowrap shrink-0"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Chops &amp; Crumb
        </a>

        {/* Zone 2: 5 simple single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-lg text-[#2d2d2d]">
          <a
            href="#notes"
            className="hover:text-[#ff4d4d] hover:wavy-underline transition-all whitespace-nowrap shrink-0"
          >
            Menu &amp; Prices
          </a>
          <a
            href="#studio"
            className="hover:text-[#2d5da1] hover:wavy-underline-blue transition-all whitespace-nowrap shrink-0"
          >
            Cake &amp; Tray Builder
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#ff4d4d] hover:wavy-underline transition-all whitespace-nowrap shrink-0"
          >
            How to Order
          </a>
          <a
            href="#pricing"
            className="hover:text-[#ff4d4d] hover:wavy-underline transition-all whitespace-nowrap shrink-0"
          >
            Owambe &amp; Surprise Packs
          </a>
          <a
            href="#contact"
            className="hover:text-[#ff4d4d] hover:wavy-underline transition-all whitespace-nowrap shrink-0"
          >
            Order Now
          </a>
        </nav>

        {/* Zone 3: 1 Primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={
              onOpenStudio ||
              (() => {
                const el = document.getElementById('studio');
                el?.scrollIntoView({ behavior: 'smooth' });
              })
            }
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-lg font-bold text-[#2d2d2d] bg-[#fff9c4] border-[3px] border-[#2d2d2d] shadow-hard hover:bg-[#ff4d4d] hover:text-white hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer whitespace-nowrap shrink-0"
            style={{ borderRadius: TOKENS.radii.wobbly }}
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>
              {orderCount > 0 ? `Your Order (${orderCount})` : 'Build Your Order'}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2d2d2d] border-2 border-[#2d2d2d] bg-white shadow-[2px_2px_0px_#2d2d2d] cursor-pointer"
            style={{ borderRadius: TOKENS.radii.wobblySm }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-[#2d2d2d] bg-[#fdfbf7] px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-3 text-xl">
            <a
              href="#notes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#2d2d2d] hover:text-[#ff4d4d]"
            >
              Menu &amp; Prices
            </a>
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#2d2d2d] hover:text-[#2d5da1]"
            >
              Cake &amp; Tray Builder
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#2d2d2d] hover:text-[#ff4d4d]"
            >
              How to Order
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#2d2d2d] hover:text-[#ff4d4d]"
            >
              Owambe &amp; Surprise Packs
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#2d2d2d] hover:text-[#ff4d4d]"
            >
              Order Now
            </a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const el = document.getElementById('studio');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full flex items-center justify-center gap-2 py-3 text-xl font-bold text-[#2d2d2d] bg-[#fff9c4] border-[3px] border-[#2d2d2d] shadow-hard hover:bg-[#ff4d4d] hover:text-white transition-all cursor-pointer whitespace-nowrap"
            style={{ borderRadius: TOKENS.radii.wobbly }}
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            <span>
              {orderCount > 0 ? `Your Order (${orderCount})` : 'Build Your Order'}
            </span>
          </button>
        </div>
      )}
    </header>
  );
}
