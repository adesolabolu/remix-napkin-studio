/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import InteractiveStudio, { type CustomCakeSpec } from './components/InteractiveStudio';
import ProductDetail from './components/ProductDetail';
import FeatureCards from './components/FeatureCards';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import BlogGallery, { type BakeryMenuItem } from './components/BlogGallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedPricingTier, setSelectedPricingTier] = useState<string>(
    'VIP Birthday Surprise Combo (₦85,000)'
  );
  const [customCakeSpec, setCustomCakeSpec] = useState<CustomCakeSpec | null>(
    null
  );
  const [pinnedMenuItems, setPinnedMenuItems] = useState<BakeryMenuItem[]>([]);

  const scrollToStudio = () => {
    const el = document.getElementById('studio');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleMenuItem = (item: BakeryMenuItem) => {
    setPinnedMenuItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleRemoveMenuItem = (id: string) => {
    setPinnedMenuItems((prev) => prev.filter((i) => i.id !== id));
  };

  const totalOrderCount =
    pinnedMenuItems.length + (customCakeSpec ? 1 : 0);

  return (
    <div className="min-h-screen text-[#2d2d2d] flex flex-col font-['Patrick_Hand',cursive] selection:bg-[#fff9c4] selection:text-[#2d2d2d]">
      {/* Top Bar following 3-Zone Contract */}
      <Navbar
        onOpenStudio={() => {
          const targetId = totalOrderCount > 0 ? 'contact' : 'studio';
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }}
        orderCount={totalOrderCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Nigerian Birthday Surprise Tray & Small Chops Platter */}
        <Hero onStartSketching={scrollToStudio} />

        {/* Quantified Lagos & Abuja Stats */}
        <Stats />

        {/* Filterable Nigerian Menu & Naira Prices */}
        <BlogGallery
          onAddMenuItem={handleToggleMenuItem}
          addedItemIds={pinnedMenuItems.map((i) => i.id)}
        />

        {/* Interactive Cake, Small Chops & Surprise Tray Builder */}
        <InteractiveStudio
          onSendSpecToOrder={(spec) => setCustomCakeSpec(spec)}
        />

        {/* How It Works */}
        <HowItWorks />

        {/* Lagos Kitchen Story with Chef Tolu Photo */}
        <ProductDetail />

        {/* Nigerian Celebration & Surprise Features */}
        <FeatureCards />

        {/* Owambe, VIP Surprise & Office Chops Packages */}
        <Pricing onSelectTier={(tier) => setSelectedPricingTier(tier)} />

        {/* Nigerian Customer Reviews */}
        <Testimonials />

        {/* Order Ticket & Lagos/Abuja Delivery Zone Calculator */}
        <ContactSection
          initialTier={selectedPricingTier}
          customCakeSpec={customCakeSpec}
          onClearCakeSpec={() => setCustomCakeSpec(null)}
          pinnedMenuItems={pinnedMenuItems}
          onRemoveMenuItem={handleRemoveMenuItem}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
