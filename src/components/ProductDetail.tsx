import { TOKENS, TapeStrip, PushPin, HandDrawnUnderline } from '../tokens';

export default function ProductDetail() {
  return (
    <section className="py-20 md:py-24 border-t-2 border-[#2d2d2d] bg-[#fdfbf7]/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="relative bg-white border-[3px] border-[#2d2d2d] shadow-hard-lg p-6 sm:p-10 rotate-[-0.5deg] hover:rotate-0 transition-transform"
          style={{ borderRadius: TOKENS.radii.wobblyLg }}
        >
          {/* Sticky-note tag */}
          <div
            className="absolute -top-6 -right-2 sm:-top-7 sm:right-8 bg-[#fff9c4] border-2 border-[#2d2d2d] shadow-[3px_3px_0px_#2d2d2d] px-4 py-2 rotate-6 z-20"
            style={{ borderRadius: TOKENS.radii.wobblySm }}
          >
            <span
              className="text-base sm:text-lg font-bold text-[#ff4d4d]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              No Dry Cake, No Cold Chops!
            </span>
          </div>

          <div className="absolute -top-3 left-10">
            <TapeStrip rotation="-2deg" />
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left side: Simple, relatable Nigerian bakery story */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-block">
                <span
                  className="text-base font-bold text-[#2d5da1] tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  ✦ Inside Our Lagos Kitchen
                </span>
                <HandDrawnUnderline color="#2d5da1" className="w-48 h-3 mt-1" />
              </div>

              <h2
                className="text-3xl sm:text-4xl font-bold text-[#2d2d2d] leading-snug text-balance"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Why our cakes stay moist and our small chops arrive hot &amp;
                crunchy
              </h2>

              <p className="text-xl text-[#2d2d2d]/90 leading-relaxed">
                <span
                  className="float-left text-5xl sm:text-6xl font-bold text-[#ff4d4d] leading-none pr-3 pt-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  W
                </span>
                e all know the heartbreak of ordering a birthday cake that looks
                pretty on Instagram but tastes dry inside—or getting small chops
                that are soggy and full of oil. At Chops &amp; Crumb, we bake
                every cake fresh with real butter, rich milk, and soft whipped
                cream frosting that melts in your mouth.
              </p>

              <p className="text-lg text-[#2d2d2d]/80 leading-relaxed">
                Our samosas and spring rolls are packed with real seasoned beef
                and chicken (not just cabbage!), and our peppered gizzard and
                turkey are grilled and tossed in our signature spicy pepper
                sauce right before the rider leaves.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#ff4d4d] font-bold text-xl">✓</span>
                  <span className="text-base font-bold text-[#2d2d2d]">
                    Soft, moist cakes with light whipped cream
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ff4d4d] font-bold text-xl">✓</span>
                  <span className="text-base font-bold text-[#2d2d2d]">
                    Crunchy samosas filled with real meat
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ff4d4d] font-bold text-xl">✓</span>
                  <span className="text-base font-bold text-[#2d2d2d]">
                    Easy ordering from UK, US &amp; Canada for loved ones
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#ff4d4d] font-bold text-xl">✓</span>
                  <span className="text-base font-bold text-[#2d2d2d]">
                    Video &amp; photo proof sent on delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: Photo of our Nigerian Baker in the Kitchen + Quote */}
            <div className="md:col-span-5 space-y-4">
              <div
                className="bg-[#fdfbf7] border-2 border-[#2d2d2d] p-3 shadow-hard relative rotate-1"
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <div className="aspect-4/3 w-full overflow-hidden border border-[#2d2d2d] mb-2 bg-[#e5e0d8]">
                  <img
                    src="/src/assets/images/naija_baker_decorating_cake_1794235124623.jpg"
                    alt="Head baker Tolu piping pink buttercream onto a two-tier birthday cake in our Lagos kitchen"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm font-bold text-[#2d2d2d] text-center">
                  Chef Tolu decorating a 2-tier birthday cake in Lekki
                </div>
              </div>

              <div
                className="bg-[#ffd6e0] border-2 border-[#2d2d2d] p-4 shadow-hard -rotate-1 relative"
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <div className="absolute -top-2 left-4">
                  <PushPin color="blue" />
                </div>
                <p className="text-base text-[#2d2d2d] font-bold mt-1">
                  &ldquo;When someone opens a box from our kitchen, we want the
                  whole room to smell like fresh cake and hot peppered
                  turkey!&rdquo;
                </p>
                <div className="text-xs text-[#2d2d2d]/70 mt-1 font-semibold">
                  — Chef Tolu Adeyemi, Founder of Chops &amp; Crumb NG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
