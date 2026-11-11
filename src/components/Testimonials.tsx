import { TOKENS, PushPin } from '../tokens';

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rotation: string;
  bg: string;
  tailDirection: 'left' | 'right';
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'I live in London and wanted to surprise my mum in Surulere for her 60th birthday. I built her cake and breakfast tray on this site in 2 minutes. They arrived at 7:30 AM with a saxophonist and sent me the sweetest video on WhatsApp!',
    author: 'Damilola Okafor',
    role: 'Diaspora Client',
    company: 'London / Surulere, Lagos',
    initials: 'DO',
    rotation: '-rotate-1',
    bg: '#ffffff',
    tailDirection: 'left',
  },
  {
    quote:
      'Their small chops platter is unmatched! The samosas actually have plenty of minced beef inside, not just cabbage, and the peppered gizzard was still hot when the rider reached our office in Victoria Island.',
    author: 'Chinedu Eze',
    role: 'People & Culture Lead',
    company: 'Paystack / VI Tech Hub',
    initials: 'CE',
    rotation: 'rotate-1',
    bg: '#fff9c4',
    tailDirection: 'right',
  },
  {
    quote:
      'We booked the Owambe package for my sister’s traditional wedding in Ikeja. Both the 2-tier cake and the 100 packs of small chops were 10/10. Guests were even asking to take extra parfait cups home!',
    author: 'Zainab Bello',
    role: 'Event Host',
    company: 'Ikeja GRA, Lagos',
    initials: 'ZB',
    rotation: '-rotate-2',
    bg: '#ffffff',
    tailDirection: 'left',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24 bg-[#fdfbf7] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block rotate-1 mb-2">
            <span
              className="text-base md:text-lg font-bold text-[#2d5da1] tracking-wide"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ✦ SWEET REVIEWS FROM OUR CUSTOMERS ✦
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#2d2d2d]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Why Nigerians keep coming back
          </h2>
          <p className="text-xl text-[#2d2d2d]/80 mt-3">
            Real feedback from birthday surprises, VI offices, and Owambe hosts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-start">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className={`relative flex flex-col ${t.rotation}`}>
              <div className="absolute -top-3 left-8 z-20">
                <PushPin color={idx === 1 ? 'blue' : 'red'} />
              </div>

              <div
                className="relative p-6 sm:p-7 border-[3px] border-[#2d2d2d] shadow-hard hover:shadow-hard-lift transition-all duration-150"
                style={{
                  backgroundColor: t.bg,
                  borderRadius: TOKENS.radii.wobblyBubble,
                }}
              >
                <p className="text-lg text-[#2d2d2d] leading-relaxed relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div
                  className={`absolute -bottom-5 w-0 h-0 z-10 ${
                    t.tailDirection === 'left' ? 'left-8' : 'right-12'
                  }`}
                  style={{
                    borderLeft: '14px solid transparent',
                    borderRight: '14px solid transparent',
                    borderTop: '20px solid #2d2d2d',
                  }}
                />
                <div
                  className={`absolute -bottom-4 w-0 h-0 z-11 ${
                    t.tailDirection === 'left' ? 'left-8' : 'right-12'
                  }`}
                  style={{
                    borderLeft: '11px solid transparent',
                    borderRight: '11px solid transparent',
                    borderTop: `16px solid ${t.bg}`,
                  }}
                />
              </div>

              <div className="mt-7 pt-1 px-4 flex items-center gap-3">
                <div
                  className="w-12 h-12 bg-white border-2 border-[#2d2d2d] flex items-center justify-center text-lg font-extrabold text-[#2d2d2d] shadow-[2px_2px_0px_#2d2d2d] shrink-0"
                  style={{
                    borderRadius: TOKENS.radii.wobblyCircle1,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="text-xl font-bold text-[#2d2d2d] leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t.author}
                  </div>
                  <div className="text-sm font-semibold text-[#2d2d2d]/80 leading-tight">
                    {t.role} · <span className="text-[#2d5da1]">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
