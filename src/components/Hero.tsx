import { useState } from 'react';
import { TOKENS, HandDrawnArrow, PushPin, TapeStrip } from '../tokens';
import { Utensils, ArrowRight, Check, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartSketching: () => void;
}

export default function Hero({ onStartSketching }: HeroProps) {
  const [recipeSaved, setRecipeSaved] = useState(false);

  const handleSaveCard = () => {
    setRecipeSaved(true);
    setTimeout(() => setRecipeSaved(false), 2200);
  };

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Simple Nigerian Bakery & Small Chops Pitch */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-left relative z-10">
            <div className="text-base md:text-lg font-bold text-[#2d5da1] -rotate-1">
              <span>Lagos &amp; Abuja</span>
              <span className="mx-2">·</span>
              <span>Custom Cakes</span>
              <span className="mx-2">·</span>
              <span>Small Chops &amp; Surprise Trays</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2d2d2d] leading-[1.08] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Fresh birthday cakes, hot small chops, and surprise trays made
              with love
              <span className="inline-block transform hover:rotate-12 transition-transform text-[#ff4d4d] ml-1">
                !
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#2d2d2d]/85 leading-relaxed max-w-xl">
              Planning a birthday surprise, office hangout, or weekend Owambe?
              Build your custom cake, small chops platter, or breakfast tray on
              our board below and get fast delivery right to your doorstep.
            </p>

            <div className="pt-2 relative">
              <div className="hidden md:block absolute -top-11 left-56 w-28 h-16 pointer-events-none -rotate-12">
                <HandDrawnArrow color="#ff4d4d" className="w-full h-full" />
                <span
                  className="absolute -top-4 right-0 text-sm font-bold text-[#ff4d4d] whitespace-nowrap rotate-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Customize yours!
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onStartSketching}
                  className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 text-2xl font-bold text-[#2d2d2d] bg-[#fff9c4] border-[3px] border-[#2d2d2d] shadow-hard hover:bg-[#ff4d4d] hover:text-white hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer min-h-[52px] whitespace-nowrap shrink-0"
                  style={{ borderRadius: TOKENS.radii.wobbly }}
                >
                  <Sparkles className="w-5 h-5 stroke-[2.5] group-hover:rotate-12 transition-transform" />
                  <span>Build Cake or Chops Box</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('notes');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xl font-bold text-[#2d2d2d] bg-white border-[3px] border-[#2d2d2d] shadow-hard hover:bg-[#2d5da1] hover:text-white hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer min-h-[52px] whitespace-nowrap shrink-0"
                  style={{ borderRadius: TOKENS.radii.wobblyMd }}
                >
                  <Utensils className="w-5 h-5 stroke-[2.5]" />
                  <span>See Menu &amp; Prices</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-[#2d2d2d]/75 pt-3">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-[#ff4d4d] stroke-[3]" />
                  Same-day small chops &amp; parfait
                </span>
                <span>·</span>
                <span>24-hr birthday cakes</span>
                <span>·</span>
                <span>Island &amp; Mainland delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pinned Nigerian Surprise Tray & Small Chops Showcase */}
          <div className="md:col-span-5 relative flex items-center">
            <div
              className="hidden md:flex absolute -top-7 -right-5 w-22 h-22 bg-[#fff9c4] border-[3px] border-[#2d2d2d] shadow-hard items-center justify-center text-center p-2 text-sm font-bold rotate-12 z-20 animate-doodle-bounce"
              style={{ borderRadius: TOKENS.radii.wobblyCircle1 }}
            >
              <span className="leading-tight">
                Same-Day<br />Delivery!
              </span>
            </div>

            <div
              className="w-full relative bg-white border-[3px] border-[#2d2d2d] shadow-hard-lg p-5 sm:p-6 rotate-1 hover:rotate-0 transition-transform duration-150"
              style={{ borderRadius: TOKENS.radii.wobblyMd }}
            >
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#2d2d2d]/60 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#2d2d2d]/60 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#2d2d2d]/60 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#2d2d2d]/60 pointer-events-none" />

              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <TapeStrip rotation="-1.5deg" />
              </div>

              <div className="absolute -top-2 right-4">
                <PushPin color="red" />
              </div>

              <div
                className="bg-[#fdfbf7] border-2 border-dashed border-[#2d2d2d]/50 p-4 relative overflow-hidden"
                style={{
                  borderRadius: TOKENS.radii.wobblySm,
                  backgroundImage:
                    'radial-gradient(#e5e0d8 1.5px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                }}
              >
                <div className="space-y-3.5 relative z-10">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#2d2d2d]/30 pb-2">
                    <span
                      className="text-lg font-bold text-[#2d2d2d]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Top Seller: Birthday Surprise Tray
                    </span>
                    <span className="text-xs font-bold text-[#ff4d4d] uppercase tracking-wider tabular-nums">
                      ₦45,000
                    </span>
                  </div>

                  {/* Main Photo: Nigerian Birthday Surprise Tray */}
                  <div className="relative bg-white p-2 border-2 border-[#2d2d2d] shadow-[2px_2px_0px_#2d2d2d] -rotate-1">
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-[#e5e0d8]">
                      <img
                        src="/src/assets/images/naija_birthday_surprise_tray_1794235122638.jpg"
                        alt="Nigerian birthday surprise breakfast tray with mini cake, waffles, parfait, and zobo juice"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-1.5 flex items-center justify-between text-xs font-bold text-[#2d2d2d]/80 px-1">
                      <span>Mini Cake + Waffles + Parfait + Zobo</span>
                      <span className="text-[#2d5da1]">Free Card</span>
                    </div>
                  </div>

                  {/* Secondary Mini Photo Strip: Small Chops & Parfait */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className="bg-white p-1.5 border-2 border-[#2d2d2d] shadow-[2px_2px_0px_#2d2d2d] -rotate-1"
                      style={{ borderRadius: TOKENS.radii.wobblySm }}
                    >
                      <div className="aspect-4/3 w-full overflow-hidden bg-[#e5e0d8] mb-1">
                        <img
                          src="/src/assets/images/naija_small_chops_platter_1794235122128.jpg"
                          alt="Small chops platter with puff-puff, samosa, spring rolls, and peppered gizzard"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-bold text-[#2d2d2d] text-center tabular-nums">
                        Small Chops Box · ₦18,500
                      </div>
                    </div>

                    <div
                      className="bg-[#fff9c4] p-1.5 border-2 border-[#2d2d2d] shadow-[2px_2px_0px_#2d2d2d] rotate-1"
                      style={{ borderRadius: TOKENS.radii.wobblySm }}
                    >
                      <div className="aspect-4/3 w-full overflow-hidden bg-[#e5e0d8] mb-1">
                        <img
                          src="/src/assets/images/naija_cake_parfait_cups_1794235123177.jpg"
                          alt="Creamy red velvet and chocolate cake parfait cups"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-bold text-[#2d2d2d] text-center tabular-nums">
                        3 Parfait Cups · ₦15,000
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-between items-center">
                    <button
                      onClick={onStartSketching}
                      className="text-sm font-bold text-[#2d2d2d] underline hover:text-[#ff4d4d] cursor-pointer inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <span>Customize in Builder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleSaveCard}
                      className="text-xs font-bold px-2.5 py-1 bg-white border border-[#2d2d2d] shadow-[1px_1px_0px_#2d2d2d] hover:bg-[#fff9c4] cursor-pointer whitespace-nowrap"
                      style={{ borderRadius: TOKENS.radii.wobblySm }}
                    >
                      {recipeSaved ? '✓ Saved!' : 'Save Idea'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
