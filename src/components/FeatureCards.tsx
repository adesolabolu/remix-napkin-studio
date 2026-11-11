import React from 'react';
import { TOKENS, TapeStrip, PushPin } from '../tokens';
import {
  Flame,
  Sparkles,
  Gift,
  Music,
  Clock,
  Globe,
} from 'lucide-react';

interface FeatureCardItem {
  title: string;
  description: string;
  decoration: 'tape' | 'tack' | 'none';
  pinColor?: 'red' | 'blue';
  bg: string;
  rotation: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const FEATURES: FeatureCardItem[] = [
  {
    title: 'Hot & Crunchy Small Chops',
    description:
      'Golden puff-puff, meat-filled samosas, crispy spring rolls, and spicy peppered gizzard fried fresh so they never arrive soggy.',
    decoration: 'tape',
    bg: '#ffffff',
    rotation: '-rotate-1',
    icon: Flame,
    tag: 'Party Favorite',
  },
  {
    title: 'Whipped Cream Frosting',
    description:
      'Don’t like heavy, sugary icing? Our light whipped cream and smooth buttercream frostings are soft, creamy, and balanced.',
    decoration: 'tack',
    pinColor: 'red',
    bg: '#fff9c4',
    rotation: 'rotate-2',
    icon: Sparkles,
    tag: 'Not Too Sweet',
  },
  {
    title: '7:00 AM Surprise Trays',
    description:
      'Wake your partner, friend, or mum up with a loaded breakfast tray, mini cake, chilled Zobo, fresh roses, and a handwritten card.',
    decoration: 'tack',
    pinColor: 'blue',
    bg: '#ffffff',
    rotation: '-rotate-2',
    icon: Gift,
    tag: 'Early Morning Drop',
  },
  {
    title: 'Saxophonist & Money Towers',
    description:
      'Want to go all out? Add a live birthday saxophonist, talking drummer, or crisp Naira money bouquet to any surprise tray order.',
    decoration: 'tape',
    bg: '#ffffff',
    rotation: 'rotate-1',
    icon: Music,
    tag: 'Full Vibe',
  },
  {
    title: '2-Hour Express Dispatch',
    description:
      'Need cake parfaits, cupcakes, or small chops urgently for guests or an office meeting? We deliver across Island and Mainland in 2 hours.',
    decoration: 'tack',
    pinColor: 'red',
    bg: '#ffffff',
    rotation: '-rotate-1',
    icon: Clock,
    tag: 'Fast Riders',
  },
  {
    title: 'Diaspora Friendly Ordering',
    description:
      'Living in the UK, US, or Canada? Easily book a birthday surprise for family in Nigeria and get a full video reaction on WhatsApp.',
    decoration: 'tape',
    bg: '#ffd6e0',
    rotation: 'rotate-2',
    icon: Globe,
    tag: 'Reaction Video Included',
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block -rotate-1 mb-2">
            <span
              className="text-base md:text-lg font-bold text-[#ff4d4d] tracking-wide"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ✦ WHY EVERYBODY ORDERS FROM US ✦
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#2d2d2d]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Made for Nigerian celebrations
          </h2>
          <p className="text-xl text-[#2d2d2d]/80 mt-3">
            From Friday office small chops to big Owambe weddings and 7 AM
            birthday surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative p-6 sm:p-7 border-[3px] border-[#2d2d2d] shadow-hard hover:shadow-hard-lift transition-all duration-150 group cursor-default ${item.rotation} hover:rotate-0`}
                style={{
                  backgroundColor: item.bg,
                  borderRadius: TOKENS.radii.wobblyMd,
                }}
              >
                {item.decoration === 'tape' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
                    <TapeStrip rotation="-1.5deg" />
                  </div>
                )}
                {item.decoration === 'tack' && (
                  <div className="absolute -top-2 left-6 pointer-events-none">
                    <PushPin color={item.pinColor || 'red'} />
                  </div>
                )}

                <div
                  className="w-12 h-12 border-2 border-[#2d2d2d] bg-white flex items-center justify-center mb-4 shadow-[2px_2px_0px_#2d2d2d] group-hover:rotate-6 transition-transform"
                  style={{ borderRadius: TOKENS.radii.wobblyCircle1 }}
                >
                  <Icon className="w-6 h-6 text-[#2d2d2d] stroke-[2.5]" />
                </div>

                <h3
                  className="text-2xl font-bold text-[#2d2d2d] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>

                <p className="text-lg text-[#2d2d2d]/85 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5 pt-3 border-t border-dashed border-[#2d2d2d]/25 flex items-center justify-between text-sm font-bold text-[#2d5da1]">
                  <span>✦ {item.tag}</span>
                  <span className="text-[#2d2d2d]/40 group-hover:text-[#ff4d4d] transition-colors">
                    #0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
