import React, { useState, useEffect } from 'react';
import { TOKENS, TapeStrip, PushPin } from '../tokens';
import { Send, AlertCircle, Trash2, Check, Copy } from 'lucide-react';
import type { CustomCakeSpec } from './InteractiveStudio';
import { formatNaira, type BakeryMenuItem } from './BlogGallery';

interface ContactSectionProps {
  initialTier?: string;
  customCakeSpec?: CustomCakeSpec | null;
  onClearCakeSpec?: () => void;
  pinnedMenuItems?: BakeryMenuItem[];
  onRemoveMenuItem?: (id: string) => void;
}

const DELIVERY_ZONES = [
  { id: 'pickup', label: 'Kitchen Pickup — Lekki Phase 1 (Free)', fee: 0 },
  { id: 'island', label: 'Victoria Island / Lekki / Ikoyi (+₦3,500)', fee: 3500 },
  { id: 'ajah', label: 'Ajah / Sangotedo / Chevron (+₦4,500)', fee: 4500 },
  { id: 'mainland', label: 'Ikeja / Surulere / Yaba / Gbagada (+₦4,000)', fee: 4000 },
  { id: 'abuja', label: 'Abuja — Wuse / Maitama / Gwarinpa (+₦3,500)', fee: 3500 },
];

export default function ContactSection({
  initialTier,
  customCakeSpec,
  onClearCakeSpec,
  pinnedMenuItems = [],
  onRemoveMenuItem,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('2026-11-21');
  const [deliveryZoneId, setDeliveryZoneId] = useState<string>('island');
  const [topic, setTopic] = useState(
    initialTier || 'VIP Birthday Surprise Combo (₦85,000)'
  );
  const [message, setMessage] = useState('');
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    message?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTier) {
      setTopic(initialTier);
    }
  }, [initialTier]);

  useEffect(() => {
    if (customCakeSpec) {
      setTopic(`Custom Builder Order (${customCakeSpec.sizeLabel})`);
      setMessage(
        `Custom Order: ${customCakeSpec.sizeLabel} | Main: ${customCakeSpec.sponge} | Frosting/Sides: ${customCakeSpec.filling} | Message on Cake/Card: "${customCakeSpec.inscription}" | Extras: ${
          customCakeSpec.addons.join(', ') || 'None'
        }`
      );
    }
  }, [customCakeSpec]);

  const selectedZone =
    DELIVERY_ZONES.find((z) => z.id === deliveryZoneId) || DELIVERY_ZONES[1];

  const menuSubtotal = pinnedMenuItems.reduce((sum, item) => sum + item.price, 0);
  const customCakeTotal = customCakeSpec ? customCakeSpec.totalPrice : 0;
  const itemsSubtotal = menuSubtotal + customCakeTotal;
  const grandTotal =
    itemsSubtotal > 0 ? itemsSubtotal + selectedZone.fee : 0;

  const handleCopySummary = () => {
    const summaryText = `Hello Chops & Crumb NG! I want to order:\n- Name: ${name || 'Customer'}\n- Date: ${eventDate}\n- Area: ${selectedZone.label}\n- Package: ${topic}\n- Details: ${message}\n- Est. Total: ${grandTotal > 0 ? formatNaira(grandTotal) : topic}`;
    navigator.clipboard?.writeText(summaryText);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name!';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      newErrors.phone = 'Please enter your WhatsApp phone number or email!';
    }
    if (!message.trim() && !customCakeSpec && pinnedMenuItems.length === 0) {
      newErrors.message =
        'Tell us the delivery address, cake message, or what you want to order!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#fdfbf7] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div
          className="relative bg-white border-[3px] border-[#2d2d2d] shadow-hard-lg p-6 sm:p-10 rotate-1 hover:rotate-0 transition-transform duration-150"
          style={{ borderRadius: TOKENS.radii.wobblyLg }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <TapeStrip rotation="-1.5deg" />
          </div>
          <div className="absolute -top-2 left-6 pointer-events-none">
            <PushPin color="red" />
          </div>
          <div className="absolute -top-2 right-6 pointer-events-none">
            <PushPin color="blue" />
          </div>

          <div className="text-center max-w-xl mx-auto mb-8">
            <span
              className="text-base font-bold text-[#ff4d4d] tracking-wide"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ✦ COMPLETE YOUR ORDER TICKET ✦
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#2d2d2d] mt-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Send your order to our kitchen
            </h2>
            <p className="text-lg text-[#2d2d2d]/80 mt-2">
              Fill in your details below and we will message you on WhatsApp
              within 15 minutes with your confirmation and account details.
            </p>
          </div>

          {/* Active Order Summary */}
          {(customCakeSpec || pinnedMenuItems.length > 0) && !submitted && (
            <div
              className="mb-6 p-4 bg-[#fff9c4] border-2 border-[#2d2d2d] shadow-hard-sm space-y-3"
              style={{ borderRadius: TOKENS.radii.wobblySm }}
            >
              <div className="flex items-center justify-between border-b border-dashed border-[#2d2d2d]/30 pb-2">
                <span
                  className="text-lg font-bold text-[#2d2d2d]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Your Selected Items:
                </span>
                <span className="text-lg font-extrabold text-[#ff4d4d] tabular-nums">
                  Total (with delivery): {formatNaira(grandTotal)}
                </span>
              </div>

              {customCakeSpec && (
                <div className="flex items-start justify-between gap-3 bg-white/80 p-2.5 border border-[#2d2d2d]">
                  <div className="text-sm">
                    <div className="font-bold text-[#2d2d2d]">
                      Custom Builder: {customCakeSpec.sizeLabel} (
                      {formatNaira(customCakeSpec.totalPrice)})
                    </div>
                    <div className="text-[#2d2d2d]/80">
                      {customCakeSpec.sponge} · {customCakeSpec.filling} · &ldquo;
                      {customCakeSpec.inscription}&rdquo;
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClearCakeSpec}
                    className="text-[#2d2d2d]/60 hover:text-[#ff4d4d] p-1 cursor-pointer"
                    title="Remove custom item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {pinnedMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 bg-white/80 p-2.5 border border-[#2d2d2d]"
                >
                  <div className="flex items-center gap-2.5 text-sm font-bold text-[#2d2d2d]">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded object-cover border border-[#2d2d2d]"
                    />
                    <div>
                      <div>{item.title}</div>
                      <div className="text-xs text-[#2d5da1] tabular-nums">
                        {formatNaira(item.price)} · {item.unit}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveMenuItem?.(item.id)}
                    className="text-[#2d2d2d]/60 hover:text-[#ff4d4d] p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {submitted ? (
            <div
              className="bg-[#fff9c4] border-2 border-[#2d2d2d] p-8 text-center shadow-hard space-y-4 -rotate-1"
              style={{ borderRadius: TOKENS.radii.wobblyMd }}
            >
              <div className="w-14 h-14 bg-white border-2 border-[#2d2d2d] rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-[#ff4d4d] shadow-[2px_2px_0px_#2d2d2d]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2d5da1]">
                Order Ticket #NG-1048 Confirmed!
              </div>
              <h3
                className="text-3xl font-bold text-[#2d2d2d]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your order ticket is ready!
              </h3>
              <p className="text-xl text-[#2d2d2d]/85 max-w-md mx-auto">
                Thank you, <span className="font-bold">{name}</span>! Our
                dispatch team has reserved your date (
                <span className="font-bold">{eventDate}</span> —{' '}
                {selectedZone.label.split('(')[0].trim()}) and will message{' '}
                <span className="underline">{phone}</span> right away.
              </p>
              {grandTotal > 0 && (
                <div className="inline-block bg-white px-4 py-1.5 border-2 border-[#2d2d2d] text-base font-bold text-[#2d2d2d] tabular-nums">
                  Total (Including Delivery): {formatNaira(grandTotal)}
                </div>
              )}
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-2 px-5 py-2 text-lg font-bold bg-[#dcfce7] text-[#2d2d2d] border-2 border-[#2d2d2d] shadow-hard hover:bg-[#bbf7d0] cursor-pointer"
                  style={{ borderRadius: TOKENS.radii.wobblySm }}
                >
                  <Copy className="w-4 h-4" />
                  <span>
                    {copiedWhatsApp
                      ? '✓ Copied for WhatsApp!'
                      : 'Copy Order for WhatsApp'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-6 py-2 text-lg font-bold bg-white text-[#2d2d2d] border-2 border-[#2d2d2d] shadow-hard hover:bg-[#ff4d4d] hover:text-white cursor-pointer"
                  style={{ borderRadius: TOKENS.radii.wobbly }}
                >
                  Place Another Order
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-[#2d2d2d] mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bolu Adeyemi"
                    className="w-full px-4 py-3 bg-white text-xl text-[#2d2d2d] placeholder-[#2d2d2d]/40 border-2 border-[#2d2d2d] focus:border-[#2d5da1] outline-none transition-colors"
                    style={{
                      borderRadius: TOKENS.radii.wobblySm,
                      fontFamily: 'var(--font-body)',
                    }}
                  />
                  {errors.name && (
                    <p className="text-sm font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-bold text-[#2d2d2d] mb-1">
                    WhatsApp Number or Email:
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full px-4 py-3 bg-white text-xl text-[#2d2d2d] placeholder-[#2d2d2d]/40 border-2 border-[#2d2d2d] focus:border-[#2d5da1] outline-none transition-colors"
                    style={{
                      borderRadius: TOKENS.radii.wobblySm,
                      fontFamily: 'var(--font-body)',
                    }}
                  />
                  {errors.phone && (
                    <p className="text-sm font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Date & Delivery Area Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-[#2d2d2d] mb-1">
                    Delivery / Pickup Date:
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white text-lg font-bold text-[#2d2d2d] border-2 border-[#2d2d2d] outline-none cursor-pointer"
                    style={{ borderRadius: TOKENS.radii.wobblySm }}
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-[#2d2d2d] mb-1">
                    Select Delivery Area:
                  </label>
                  <select
                    value={deliveryZoneId}
                    onChange={(e) => setDeliveryZoneId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white text-base font-bold text-[#2d2d2d] border-2 border-[#2d2d2d] outline-none cursor-pointer"
                    style={{ borderRadius: TOKENS.radii.wobblySm }}
                  >
                    {DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Package Select */}
              <div>
                <label className="block text-lg font-bold text-[#2d2d2d] mb-1">
                  Package or Order Type:
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-xl text-[#2d2d2d] border-2 border-[#2d2d2d] focus:border-[#2d5da1] outline-none transition-colors cursor-pointer"
                  style={{
                    borderRadius: TOKENS.radii.wobblySm,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {customCakeSpec && (
                    <option value={`Custom Builder Order (${customCakeSpec.sizeLabel})`}>
                      Custom Builder: {customCakeSpec.sizeLabel} (
                      {formatNaira(customCakeSpec.totalPrice)})
                    </option>
                  )}
                  <option value="Friday Office Chops Box (₦50,000)">
                    Friday Office Chops Box (₦50,000)
                  </option>
                  <option value="VIP Birthday Surprise Combo (₦85,000)">
                    VIP Birthday Surprise Combo (₦85,000)
                  </option>
                  <option value="Owambe Cake & 100 Chops Pack (₦250,000)">
                    Owambe Cake &amp; 100 Chops Pack (₦250,000)
                  </option>
                  <option value="Single Menu Item / Custom Inquiry">
                    Single Menu Item / Custom Request
                  </option>
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-lg font-bold text-[#2d2d2d] mb-1">
                  Delivery Address, Cake Writing &amp; Surprise Instructions:
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Write the house/office address, receiver's phone number, what to write on the cake, or if it's a surprise..."
                  className="w-full px-4 py-3 bg-white text-xl text-[#2d2d2d] placeholder-[#2d2d2d]/40 border-2 border-[#2d2d2d] focus:border-[#2d5da1] outline-none transition-colors"
                  style={{
                    borderRadius: TOKENS.radii.wobblySm,
                    fontFamily: 'var(--font-body)',
                  }}
                />
                {errors.message && (
                  <p className="text-sm font-bold text-[#ff4d4d] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-2xl font-bold text-white bg-[#ff4d4d] border-[3px] border-[#2d2d2d] shadow-hard hover:bg-[#e03a3a] hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer min-h-[50px] tabular-nums"
                  style={{ borderRadius: TOKENS.radii.wobbly }}
                >
                  <Send className="w-5 h-5 stroke-[2.5]" />
                  <span>
                    {grandTotal > 0
                      ? `Confirm My Order (${formatNaira(grandTotal)})`
                      : 'Confirm My Order'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
