import { TOKENS, TapeStrip, PushPin, HandDrawnSquiggle } from '../tokens';
import { Utensils, Flame, Truck } from 'lucide-react';

const STEPS = [
  {
    number: '1',
    title: 'Pick Your Cake or Chops',
    description:
      'Choose from our menu or use the Builder above to pick your cake flavor, small chops mix, birthday writing, and surprise extras.',
    icon: Utensils,
    bg: '#ffffff',
    pinColor: 'red' as const,
    rotation: '-rotate-2',
    tag: '60-Second Setup',
  },
  {
    number: '2',
    title: 'Fried & Baked Fresh',
    description:
      'No cold puff-puff or dry cake! We bake your cake and fry your small chops hot and fresh right before dispatch.',
    icon: Flame,
    bg: '#fff9c4',
    pinColor: 'blue' as const,
    rotation: 'rotate-1',
    tag: '100% Fresh Daily',
  },
  {
    number: '3',
    title: 'Fast Doorstep Delivery',
    description:
      'Our riders deliver across Lekki, VI, Ikeja, Surulere, Yaba, Ajah, and Abuja—or you can pick up directly from our kitchen.',
    icon: Truck,
    bg: '#ffffff',
    pinColor: 'red' as const,
    rotation: '-rotate-1',
    tag: 'Island & Mainland',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block -rotate-1 mb-2">
            <span
              className="text-base md:text-lg font-bold text-[#ff4d4d] tracking-wide"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ✎ HOW TO ORDER ✎
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#2d2d2d]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            From our kitchen to your party in 3 easy steps
          </h2>
          <p className="text-xl text-[#2d2d2d]/80 mt-3">
            Whether you are in Lagos, Abuja, or ordering from abroad for someone
            special back home, we make it super simple.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-16 right-16 z-0 pointer-events-none opacity-40">
            <HandDrawnSquiggle className="w-full h-12" color="#2d2d2d" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className={`relative p-6 sm:p-7 border-[3px] border-[#2d2d2d] shadow-hard hover:shadow-hard-lift transition-all duration-150 group cursor-default ${step.rotation}`}
                  style={{
                    backgroundColor: step.bg,
                    borderRadius: TOKENS.radii.wobblyMd,
                  }}
                >
                  {idx === 1 ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <TapeStrip rotation="-1deg" />
                    </div>
                  ) : (
                    <div className="absolute -top-2 left-6">
                      <PushPin color={step.pinColor} />
                    </div>
                  )}

                  <div
                    className="w-12 h-12 border-[2.5px] border-[#2d2d2d] bg-[#fdfbf7] flex items-center justify-center text-2xl font-black text-[#2d2d2d] shadow-[2px_2px_0px_#2d2d2d] mb-4 z-10 relative"
                    style={{
                      borderRadius: TOKENS.radii.wobblyCircle1,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-[#ff4d4d] stroke-[2.5]" />
                    <h3
                      className="text-2xl font-bold text-[#2d2d2d]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-lg text-[#2d2d2d]/85 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-dashed border-[#2d2d2d]/25 text-sm font-bold text-[#2d5da1]">
                    ✦ {step.tag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
