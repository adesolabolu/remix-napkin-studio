import { useState } from 'react';
import {
  TOKENS,
  TapeStrip,
  PushPin,
  HandDrawnCircleHighlight,
  HandDrawnLoopArrow,
} from '../tokens';

interface PricingProps {
  onSelectTier?: (tierName: string) => void;
}

export default function Pricing({ onSelectTier }: PricingProps) {
  const [recurringClub, setRecurringClub] = useState(false);

  const tiers = [
    {
      name: 'Friday Office Chops Box',
      price: recurringClub ? '₦42,500' : '₦50,000',
      period: recurringClub ? '/week (office plan)' : '/bundle (feeds 15–20)',
      description:
        'Great for Friday TGIF office hangouts, team meetings, or house parties.',
      image: '/src/assets/images/naija_small_chops_platter_1794235122128.jpg',
      features: [
        '3 large platters of puff-puff, samosa & spring rolls',
        'Spicy peppered gizzard, turkey & pepper sauce dips',
        '6 chilled bottles of homemade Zobo or Tigernut milk',
        'Delivered hot in neat boxes with serviettes & toothpicks',
      ],
      popular: false,
      bg: '#ffffff',
      rotation: '-rotate-1',
      cta: 'Book Office Chops Box',
    },
    {
      name: 'VIP Birthday Surprise Combo',
      price: recurringClub ? '₦72,000' : '₦85,000',
      period: recurringClub ? '/surprise (VIP rate)' : '/full package',
      description:
        'Our #1 birthday surprise bundle with cake, breakfast tray, flowers & music!',
      image: '/src/assets/images/naija_birthday_surprise_tray_1794235122638.jpg',
      features: [
        '8-inch custom birthday cake + 1 small chops box',
        'Full breakfast tray (waffles, sausages, parfait & Zobo)',
        'Fresh rose bouquet, helium balloons & birthday card',
        'Includes live saxophonist visit & HD reaction video',
      ],
      popular: true,
      bg: '#fff9c4',
      rotation: 'rotate-0',
      cta: 'Book VIP Surprise Combo',
    },
    {
      name: 'Owambe Cake & 100 Chops Pack',
      price: recurringClub ? '₦212,500' : '₦250,000',
      period: recurringClub ? '/event (partner rate)' : '/event (100 guests)',
      description:
        'For weddings, traditional introductions, big birthdays, and naming ceremonies.',
      image: '/src/assets/images/bakery_custom_berry_cake_1794227036774.jpg',
      features: [
        'Tall 2- or 3-tier custom wedding or celebration cake',
        '100 individual party packs of hot small chops',
        '20 creamy cake parfait cups & 24 cupcakes for VIP table',
        'Event venue delivery & full dessert table setup',
      ],
      popular: false,
      bg: '#ffffff',
      rotation: 'rotate-1',
      cta: 'Book Owambe Package',
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 md:py-24 border-t-2 border-[#2d2d2d] bg-[#fdfbf7]/90 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block -rotate-1 mb-2">
            <span
              className="text-base font-bold text-[#ff4d4d] tracking-wide"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ✦ VALUE BUNDLES &amp; PARTY PACKAGES ✦
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#2d2d2d]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Packages for every celebration
          </h2>
          <p className="text-xl text-[#2d2d2d]/80 mt-3">
            Book a one-time surprise or party package, or sign your company up
            for weekly Friday office deliveries and save 15%.
          </p>

          {/* One-Time / Regular Client Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 relative">
            <span
              className={`text-lg font-bold cursor-pointer ${
                !recurringClub ? 'text-[#2d2d2d] wavy-underline' : 'text-[#2d2d2d]/60'
              }`}
              onClick={() => setRecurringClub(false)}
            >
              One-Time Order
            </span>

            <button
              type="button"
              onClick={() => setRecurringClub(!recurringClub)}
              className="w-14 h-8 bg-white border-2 border-[#2d2d2d] shadow-hard-sm p-1 cursor-pointer flex items-center transition-colors"
              style={{
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              }}
              aria-label="Toggle one-time or regular client pricing"
            >
              <div
                className={`w-5 h-5 bg-[#ff4d4d] border border-[#2d2d2d] transition-transform ${
                  recurringClub ? 'translate-x-6' : 'translate-x-0'
                }`}
                style={{ borderRadius: '50%' }}
              />
            </button>

            <span
              className={`text-lg font-bold cursor-pointer ${
                recurringClub ? 'text-[#2d2d2d] wavy-underline' : 'text-[#2d2d2d]/60'
              }`}
              onClick={() => setRecurringClub(true)}
            >
              Regular / Office Plan
            </span>

            <div className="hidden sm:flex items-center absolute -right-38 -top-5 gap-1 pointer-events-none">
              <HandDrawnLoopArrow className="w-12 h-8" color="#ff4d4d" />
              <span
                className="text-base font-bold text-[#ff4d4d] rotate-3 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Save 15%!
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
          {tiers.map((tier, idx) => {
            const isHighlighted = tier.popular;
            return (
              <div
                key={idx}
                className={`relative p-6 border-[3px] border-[#2d2d2d] shadow-hard transition-all duration-150 flex flex-col justify-between ${
                  tier.rotation
                } ${
                  isHighlighted
                    ? 'md:scale-105 z-20 shadow-hard-lg'
                    : 'hover:rotate-0 z-10'
                }`}
                style={{
                  backgroundColor: tier.bg,
                  borderRadius: TOKENS.radii.wobblyMd,
                }}
              >
                {isHighlighted && (
                  <>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
                      <TapeStrip rotation="-1deg" />
                    </div>

                    <div className="hidden md:block absolute -top-8 -right-6 pointer-events-none">
                      <div className="relative">
                        <HandDrawnCircleHighlight
                          className="w-28 h-16"
                          color="#ff4d4d"
                        />
                        <span
                          className="absolute top-4 left-5 text-sm font-bold text-[#ff4d4d] rotate-6"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          Best Seller!
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {!isHighlighted && (
                  <div className="absolute -top-2 left-6 pointer-events-none">
                    <PushPin color={idx === 0 ? 'red' : 'blue'} />
                  </div>
                )}

                <div>
                  <div className="w-full aspect-4/3 bg-[#fdfbf7] border-2 border-[#2d2d2d] p-1.5 mb-4 shadow-[2px_2px_0px_#2d2d2d] overflow-hidden">
                    <img
                      src={tier.image}
                      alt={tier.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3
                    className="text-2xl font-bold text-[#2d2d2d] mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {tier.name}
                  </h3>

                  <p className="text-base text-[#2d2d2d]/80 min-h-[44px]">
                    {tier.description}
                  </p>

                  <div className="my-4 pb-3 border-b-2 border-dashed border-[#2d2d2d]/30">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span
                        className="text-3xl sm:text-4xl font-extrabold text-[#2d2d2d] tabular-nums"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {tier.price}
                      </span>
                      <span className="text-sm font-bold text-[#2d2d2d]/70">
                        {tier.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2 text-base text-[#2d2d2d]"
                      >
                        <span className="text-[#ff4d4d] font-bold text-lg leading-tight">
                          ✓
                        </span>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTier?.(`${tier.name} (${tier.price})`);
                    const el = document.getElementById('contact');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 px-4 text-xl font-bold border-[3px] border-[#2d2d2d] shadow-hard transition-all cursor-pointer text-center min-h-[48px] whitespace-nowrap ${
                    isHighlighted
                      ? 'bg-[#ff4d4d] text-white hover:bg-[#e03a3a] hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
                      : 'bg-white text-[#2d2d2d] hover:bg-[#ff4d4d] hover:text-white hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
                  }`}
                  style={{ borderRadius: TOKENS.radii.wobbly }}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 text-[#2d2d2d]/75 text-base">
          <span>Pay via Bank Transfer or Card</span>
          <span className="mx-2">·</span>
          <span>Diaspora orders welcome</span>
          <span className="mx-2">·</span>
          <span>Delivery across Lagos Island, Mainland &amp; Abuja</span>
        </div>
      </div>
    </section>
  );
}
