import { useState } from 'react';
import { TOKENS, TapeStrip, PushPin } from '../tokens';
import { Plus, Check, Eye } from 'lucide-react';

export interface BakeryMenuItem {
  id: string;
  category: 'cakes' | 'chops' | 'surprise' | 'parfait';
  categoryLabel: string;
  title: string;
  summary: string;
  tastingNotes: string;
  price: number;
  unit: string;
  bakeTime: string;
  image: string;
  rotation: string;
  bg: string;
}

export const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString('en-NG')}`;

const MENU_ITEMS: BakeryMenuItem[] = [
  {
    id: 'small-chops-platter',
    category: 'chops',
    categoryLabel: 'Small Chops',
    title: 'Big Party Small Chops Platter',
    summary:
      'Hot, golden puff-puff, crunchy beef samosas, crispy chicken spring rolls, and spicy peppered gizzard & turkey with our special pepper dip.',
    tastingNotes:
      'Fried fresh right before dispatch so it arrives hot and crunchy. Feeds 6 to 8 people for office hangouts, birthdays, or Friday chill.',
    price: 18500,
    unit: 'platter for 6–8',
    bakeTime: '2-hour express delivery',
    image: '/src/assets/images/naija_small_chops_platter_1794235122128.jpg',
    rotation: '-rotate-1',
    bg: '#ffffff',
  },
  {
    id: 'birthday-surprise-tray',
    category: 'surprise',
    categoryLabel: 'Surprise Trays',
    title: 'Royal Birthday Breakfast Surprise Tray',
    summary:
      'A wooden breakfast tray loaded with a custom mini birthday cake, waffles, grilled sausages, berry parfait cup, chilled Zobo drink, flowers, and card.',
    tastingNotes:
      'Ideal for surprising your partner, best friend, mum, or boss on their birthday morning! You can also add a live saxophonist or money bouquet.',
    price: 45000,
    unit: 'full luxury tray',
    bakeTime: '7:00 AM morning delivery',
    image: '/src/assets/images/naija_birthday_surprise_tray_1794235122638.jpg',
    rotation: 'rotate-1',
    bg: '#fff9c4',
  },
  {
    id: 'cake-parfait-trio',
    category: 'parfait',
    categoryLabel: 'Parfait & Cupcakes',
    title: 'Creamy Red Velvet & Chocolate Parfait (3 Cups)',
    summary:
      'Three big 500ml cups layered with moist red velvet and chocolate cake, rich whipped cream, strawberries, and caramel drizzle.',
    tastingNotes:
      'Super creamy and not overly sweet! Served chilled and ready to eat. Great as a quick treat or gift pack.',
    price: 15000,
    unit: 'pack of 3 large cups',
    bakeTime: 'Same-day delivery',
    image: '/src/assets/images/naija_cake_parfait_cups_1794235123177.jpg',
    rotation: '-rotate-1',
    bg: '#ffd6e0',
  },
  {
    id: 'two-tier-celebration-cake',
    category: 'cakes',
    categoryLabel: 'Custom Cakes',
    title: '2-Tier Wedding & Big Birthday Cake',
    summary:
      'Two tiers of moist vanilla, red velvet, or rich fruit cake frosted with smooth whipped buttercream and decorated with fresh berries and flowers.',
    tastingNotes:
      'Feeds 35 to 45 guests comfortably. You can choose different flavors for the top and bottom tiers in our Cake Builder below!',
    price: 65000,
    unit: '2-tier cake (35–45p)',
    bakeTime: 'Order 48 hrs ahead',
    image: '/src/assets/images/bakery_custom_berry_cake_1794227036774.jpg',
    rotation: 'rotate-1',
    bg: '#ffffff',
  },
  {
    id: 'chocolate-fudge-cake',
    category: 'cakes',
    categoryLabel: 'Custom Cakes',
    title: 'Rich Chocolate Fudge Birthday Cake (8 Inch)',
    summary:
      'Soft, super moist chocolate layer cake covered in glossy chocolate fudge frosting, chocolate curls, and fresh strawberries.',
    tastingNotes:
      'Includes free custom birthday writing on top and celebratory sparkler candles! Feeds 12 to 15 people.',
    price: 28000,
    unit: '8-inch cake (12–15p)',
    bakeTime: '24-hr notice',
    image: '/src/assets/images/bakery_chocolate_fudge_cake_1794228296289.jpg',
    rotation: '-rotate-1',
    bg: '#fff9c4',
  },
  {
    id: 'strawberry-cupcakes-box',
    category: 'parfait',
    categoryLabel: 'Parfait & Cupcakes',
    title: 'Box of 6 Whipped Cream Cupcakes',
    summary:
      'Six fluffy vanilla, red velvet, and chocolate cupcakes topped with tall swirls of strawberry buttercream and rainbow sprinkles.',
    tastingNotes:
      'Comes in a neat gift box with a free handwritten note card. Available for same-day pickup or dispatch rider delivery.',
    price: 12000,
    unit: 'box of 6 cupcakes',
    bakeTime: 'Same-day delivery',
    image: '/src/assets/images/bakery_strawberry_cupcakes_box_1794228297429.jpg',
    rotation: 'rotate-1',
    bg: '#ffffff',
  },
];

interface BlogGalleryProps {
  onAddMenuItem?: (item: BakeryMenuItem) => void;
  addedItemIds?: string[];
}

export default function BlogGallery({
  onAddMenuItem,
  addedItemIds = [],
}: BlogGalleryProps) {
  const [filter, setFilter] = useState<
    'all' | 'cakes' | 'chops' | 'surprise' | 'parfait'
  >('all');
  const [selectedItem, setSelectedItem] = useState<BakeryMenuItem | null>(null);

  const filteredItems =
    filter === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === filter);

  return (
    <section
      id="notes"
      className="py-20 md:py-24 border-t-2 border-[#2d2d2d] bg-[#fdfbf7]/70 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block -rotate-1 mb-2">
              <span
                className="text-base font-bold text-[#ff4d4d] tracking-wide"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                ✦ FRESH FROM OUR KITCHEN ✦
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#2d2d2d]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our Menu &amp; Prices
            </h2>
            <p className="text-xl text-[#2d2d2d]/80 mt-2">
              Tap any item to add it to your order, or build your own custom
              package below.
            </p>
          </div>

          {/* Simple Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border-2 border-[#2d2d2d] shadow-hard-sm"
            style={{ borderRadius: TOKENS.radii.wobblySm }}
          >
            {[
              { id: 'all', label: 'All Menu' },
              { id: 'chops', label: 'Small Chops' },
              { id: 'surprise', label: 'Surprise Trays' },
              { id: 'cakes', label: 'Birthday Cakes' },
              { id: 'parfait', label: 'Parfait & Cupcakes' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setFilter(
                    tab.id as 'all' | 'cakes' | 'chops' | 'surprise' | 'parfait'
                  )
                }
                className={`px-3 py-1 text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-[#2d2d2d] text-white'
                    : 'text-[#2d2d2d] hover:bg-[#e5e0d8]'
                }`}
                style={{ borderRadius: '4px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => {
            const isAdded = addedItemIds.includes(item.id);
            return (
              <article
                key={item.id}
                className={`relative p-5 border-[3px] border-[#2d2d2d] shadow-hard hover:shadow-hard-lg transition-all duration-150 flex flex-col justify-between group ${item.rotation} hover:rotate-0`}
                style={{
                  backgroundColor: item.bg,
                  borderRadius: TOKENS.radii.wobblyMd,
                }}
              >
                {idx % 2 === 0 ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                    <TapeStrip rotation="-1deg" />
                  </div>
                ) : (
                  <div className="absolute -top-2 left-6 pointer-events-none z-20">
                    <PushPin color="red" />
                  </div>
                )}

                <div>
                  <div
                    onClick={() => setSelectedItem(item)}
                    className="w-full aspect-4/3 bg-[#fdfbf7] border-2 border-[#2d2d2d] p-1.5 mb-4 shadow-[2px_2px_0px_#2d2d2d] cursor-pointer overflow-hidden relative"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
                    />
                  </div>

                  {/* Clean unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-[#2d2d2d]/70 mb-1.5">
                    <span className="uppercase tracking-wide text-[#2d5da1]">
                      {item.categoryLabel}
                    </span>
                    <span>·</span>
                    <span>{item.bakeTime}</span>
                    <span>·</span>
                    <span className="text-[#ff4d4d] tabular-nums">
                      {formatNaira(item.price)}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedItem(item)}
                    className="text-2xl font-bold text-[#2d2d2d] leading-snug group-hover:text-[#ff4d4d] transition-colors cursor-pointer"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-base text-[#2d2d2d]/85 mt-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Action Row */}
                <div className="mt-5 pt-3 border-t border-dashed border-[#2d2d2d]/30 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#2d2d2d] hover:text-[#2d5da1] underline cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onAddMenuItem?.(item)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-base font-bold border-2 border-[#2d2d2d] shadow-hard-sm transition-all cursor-pointer whitespace-nowrap tabular-nums ${
                      isAdded
                        ? 'bg-[#dcfce7] text-[#2d2d2d]'
                        : 'bg-white text-[#2d2d2d] hover:bg-[#ff4d4d] hover:text-white'
                    }`}
                    style={{ borderRadius: TOKENS.radii.wobblySm }}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3] text-[#2d2d2d]" />
                        <span>Added ({formatNaira(item.price)})</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Add ({formatNaira(item.price)})</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-[#2d2d2d]/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div
              className="bg-white border-[3px] border-[#2d2d2d] shadow-hard-lg max-w-xl w-full p-6 sm:p-8 relative"
              style={{ borderRadius: TOKENS.radii.wobblyMd }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <TapeStrip rotation="-1deg" />
              </div>

              <div className="flex justify-between items-start mb-3">
                <div className="text-xs text-[#2d5da1] font-bold uppercase tracking-wider">
                  {selectedItem.categoryLabel} · {selectedItem.bakeTime}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="text-2xl font-bold text-[#2d2d2d] hover:text-[#ff4d4d] cursor-pointer leading-none"
                >
                  ✕
                </button>
              </div>

              <h3
                className="text-3xl font-bold text-[#2d2d2d] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {selectedItem.title}
              </h3>

              <div className="aspect-4/3 w-full overflow-hidden border-2 border-[#2d2d2d] mb-4 bg-[#fdfbf7]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-lg text-[#2d2d2d] leading-relaxed mb-3">
                {selectedItem.summary}
              </p>

              <p className="text-base text-[#2d2d2d]/80 leading-relaxed mb-6 bg-[#fff9c4] p-3 border border-dashed border-[#2d2d2d]">
                <strong className="text-[#2d2d2d]">Good to know:</strong>{' '}
                {selectedItem.tastingNotes}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddMenuItem?.(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 py-2.5 px-4 text-lg font-bold bg-[#ff4d4d] text-white border-2 border-[#2d2d2d] shadow-hard hover:bg-[#e03a3a] cursor-pointer tabular-nums"
                  style={{ borderRadius: TOKENS.radii.wobbly }}
                >
                  Add to Order ({formatNaira(selectedItem.price)})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="py-2.5 px-5 text-lg font-bold bg-white text-[#2d2d2d] border-2 border-[#2d2d2d] shadow-hard hover:bg-[#e5e0d8] cursor-pointer"
                  style={{ borderRadius: TOKENS.radii.wobblySm }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
