import { TOKENS } from '../tokens';

interface StatItem {
  value: string;
  label: string;
  context: string;
  rotation: string;
  radius: string;
  bg: string;
}

const STATS: StatItem[] = [
  {
    value: '3,500+',
    label: 'Cakes & Trays Sent',
    context: 'Across Lekki, VI, Ikeja, Surulere, Yaba & Abuja',
    rotation: '-rotate-2',
    radius: TOKENS.radii.wobblyCircle1,
    bg: '#ffffff',
  },
  {
    value: '2 Hrs',
    label: 'Express Delivery',
    context: 'For hot small chops platters & fresh cake parfaits',
    rotation: 'rotate-2',
    radius: TOKENS.radii.wobblyCircle2,
    bg: '#fff9c4',
  },
  {
    value: '100%',
    label: 'Fresh & Hot',
    context: 'Fried and baked only when you place your order',
    rotation: '-rotate-1',
    radius: TOKENS.radii.wobblyCircle3,
    bg: '#ffffff',
  },
  {
    value: '4.9 ★',
    label: 'Customer Rating',
    context: 'Trusted by diaspora clients, offices & party hosts',
    rotation: 'rotate-3',
    radius: TOKENS.radii.wobblyCircle4,
    bg: '#ffd6e0',
  },
];

export default function Stats() {
  return (
    <section className="py-12 md:py-16 border-y-2 border-[#2d2d2d] bg-[#fdfbf7]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span
            className="text-base font-bold text-[#2d5da1] tracking-wide"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ✦ WHY LAGOS &amp; ABUJA CUSTOMERS TRUST US ✦
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`w-full max-w-[210px] aspect-square flex flex-col items-center justify-center p-4 border-[3px] border-[#2d2d2d] shadow-hard text-center transition-transform hover:scale-105 hover:rotate-0 duration-150 cursor-default ${stat.rotation}`}
              style={{
                borderRadius: stat.radius,
                backgroundColor: stat.bg,
              }}
            >
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2d2d2d] tracking-tight tabular-nums"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </div>

              <div className="text-base sm:text-lg font-bold text-[#2d2d2d] mt-1 leading-tight">
                {stat.label}
              </div>

              <div className="text-xs text-[#2d2d2d]/75 mt-1 leading-tight hidden sm:block">
                {stat.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
