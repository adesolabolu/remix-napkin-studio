import React, { useRef, useState, useEffect } from 'react';
import { TOKENS, TapeStrip, PushPin } from '../tokens';
import {
  Pencil,
  RotateCcw,
  Trash2,
  Download,
  Highlighter,
  Eraser,
  Move,
  X,
  Check,
  Send,
} from 'lucide-react';
import { formatNaira } from './BlogGallery';

export interface CustomCakeSpec {
  sizeLabel: string;
  basePrice: number;
  sponge: string;
  filling: string;
  inscription: string;
  addons: string[];
  totalPrice: number;
}

interface InteractiveStudioProps {
  onSendSpecToOrder?: (spec: CustomCakeSpec) => void;
}

interface StickyNote {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  rotation: string;
  pinned: boolean;
}

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  points: StrokePoint[];
  color: string;
  width: number;
  isHighlighter?: boolean;
}

const SIZE_OPTIONS = [
  {
    id: 'single-8',
    label: '8-Inch Birthday Cake (12–15p)',
    price: 28000,
    tiers: 1,
    previewImg: '/src/assets/images/bakery_chocolate_fudge_cake_1794228296289.jpg',
  },
  {
    id: 'two-tier',
    label: '2-Tier Party Cake (35–45p)',
    price: 65000,
    tiers: 2,
    previewImg: '/src/assets/images/bakery_custom_berry_cake_1794227036774.jpg',
  },
  {
    id: 'chops-box',
    label: 'Big Small Chops Platter (6–8p)',
    price: 18500,
    tiers: 0,
    previewImg: '/src/assets/images/naija_small_chops_platter_1794235122128.jpg',
  },
  {
    id: 'surprise-tray',
    label: 'Royal Birthday Surprise Tray',
    price: 45000,
    tiers: 0,
    previewImg: '/src/assets/images/naija_birthday_surprise_tray_1794235122638.jpg',
  },
];

const SPONGE_OPTIONS = [
  'Red Velvet & Vanilla (Half & Half)',
  'Rich Chocolate Fudge',
  'Classic Nigerian Fruit Cake',
  'Puff-Puff, Samosa & Spring Rolls Mix',
];

const FILLING_OPTIONS = [
  'Light Whipped Cream Frosting',
  'Smooth Buttercream & Strawberry Jam',
  'Spicy Peppered Gizzard & Turkey',
  'Waffles, Parfait Cup & Chilled Zobo',
];

const ADDON_OPTIONS = [
  { id: 'drinks', label: '4 Bottles Chilled Zobo & Tigernut', price: 6000 },
  { id: 'parfait', label: '2 Large Cake Parfait Cups', price: 10000 },
  { id: 'flowers', label: 'Fresh Roses & Helium Balloons', price: 15000 },
  { id: 'sax', label: 'Live Saxophonist Surprise', price: 30000 },
];

export default function InteractiveStudio({ onSendSpecToOrder }: InteractiveStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Custom Configurator State
  const [selectedSizeId, setSelectedSizeId] = useState<string>('two-tier');
  const [sponge, setSponge] = useState<string>(SPONGE_OPTIONS[0]);
  const [filling, setFilling] = useState<string>(FILLING_OPTIONS[0]);
  const [inscription, setInscription] = useState<string>('Happy Birthday Omolara!');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['drinks', 'parfait']);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'marker' | 'pen' | 'highlighter' | 'eraser'>('pencil');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  // Sticky notes state
  const [notes, setNotes] = useState<StickyNote[]>([
    {
      id: 'note-1',
      text: 'Kitchen Note:\nMake the peppered gizzard extra spicy & add sparkler candle!',
      x: 24,
      y: 24,
      color: '#fff9c4',
      rotation: '-rotate-2',
      pinned: true,
    },
    {
      id: 'note-2',
      text: 'Delivery Note:\nCall the gate security on arrival (It is a surprise!)',
      x: 24,
      y: 215,
      color: '#ffd6e0',
      rotation: 'rotate-1',
      pinned: true,
    },
  ]);

  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentSizeObj =
    SIZE_OPTIONS.find((s) => s.id === selectedSizeId) || SIZE_OPTIONS[1];

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = ADDON_OPTIONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = currentSizeObj.price + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getToolConfig = () => {
    switch (tool) {
      case 'pencil':
        return { color: '#2d2d2d', width: 2.8, isHighlighter: false };
      case 'marker':
        return { color: '#ff4d4d', width: 4.5, isHighlighter: false };
      case 'pen':
        return { color: '#2d5da1', width: 2.2, isHighlighter: false };
      case 'highlighter':
        return { color: 'rgba(255, 230, 80, 0.45)', width: 22, isHighlighter: true };
      case 'eraser':
        return { color: '#fdfbf7', width: 24, isHighlighter: false };
    }
  };

  // Draw the live hand-sketched cake / small chops platter blueprint
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw dotted paper grid
    ctx.fillStyle = '#e5e0d8';
    for (let x = 12; x < canvas.width; x += 24) {
      for (let y = 12; y < canvas.height; y += 24) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Draw hand-sketched Cake / Small Chops / Surprise Tray Blueprint
    const cx = Math.max(canvas.width * 0.58, 290);
    const cy = canvas.height * 0.54;

    ctx.save();
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (currentSizeObj.tiers === 0) {
      // Draw Small Chops Platter or Surprise Tray
      ctx.fillStyle = '#fff9c4';
      ctx.beginPath();
      ctx.roundRect(cx - 125, cy - 75, 250, 145, 10);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 42, cy - 75);
      ctx.lineTo(cx - 42, cy + 70);
      ctx.moveTo(cx + 42, cy - 75);
      ctx.lineTo(cx + 42, cy + 70);
      ctx.moveTo(cx - 125, cy - 2);
      ctx.lineTo(cx + 125, cy - 2);
      ctx.stroke();

      ctx.fillStyle = '#ff4d4d';
      ctx.font = 'bold 15px "Kalam", cursive';
      ctx.textAlign = 'center';
      if (selectedSizeId === 'chops-box') {
        ctx.fillText('Puff-Puff', cx - 82, cy - 34);
        ctx.fillText('Samosa', cx, cy - 34);
        ctx.fillText('Spring Roll', cx + 82, cy - 34);
        ctx.fillStyle = '#2d5da1';
        ctx.fillText('Gizzard', cx - 82, cy + 34);
        ctx.fillText('Pepper Sauce', cx, cy + 34);
        ctx.fillText('Turkey', cx + 82, cy + 34);
      } else {
        ctx.fillText('Mini Cake', cx - 82, cy - 34);
        ctx.fillText('Waffles', cx, cy - 34);
        ctx.fillText('Parfait Cup', cx + 82, cy - 34);
        ctx.fillStyle = '#2d5da1';
        ctx.fillText('Sausages', cx - 82, cy + 34);
        ctx.fillText('Zobo Drink', cx, cy + 34);
        ctx.fillText('Fresh Roses', cx + 82, cy + 34);
      }
    } else {
      // Draw Cake Stand Base
      ctx.beginPath();
      ctx.moveTo(cx - 135, cy + 85);
      ctx.quadraticCurveTo(cx, cy + 93, cx + 135, cy + 85);
      ctx.moveTo(cx - 45, cy + 88);
      ctx.lineTo(cx - 60, cy + 125);
      ctx.lineTo(cx + 60, cy + 125);
      ctx.lineTo(cx + 45, cy + 88);
      ctx.stroke();

      // Bottom Tier
      const bottomW = 210;
      const bottomH = 92;
      ctx.fillStyle = sponge.includes('Red Velvet')
        ? '#ffe4e6'
        : sponge.includes('Chocolate')
          ? '#f3e5dc'
          : '#ffffff';
      ctx.beginPath();
      ctx.roundRect(cx - bottomW / 2, cy - 8, bottomW, bottomH, 8);
      ctx.fill();
      ctx.stroke();

      // Filling lines inside bottom tier
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#ff4d4d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - bottomW / 2 + 10, cy + 22);
      ctx.lineTo(cx + bottomW / 2 - 10, cy + 22);
      ctx.moveTo(cx - bottomW / 2 + 10, cy + 52);
      ctx.lineTo(cx + bottomW / 2 - 10, cy + 52);
      ctx.stroke();
      ctx.restore();

      // Top Tier (if 2-tier)
      if (currentSizeObj.tiers === 2) {
        const topW = 140;
        const topH = 78;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(cx - topW / 2, cy - 8 - topH, topW, topH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#2d5da1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - topW / 2 + 10, cy - 8 - topH / 2);
        ctx.lineTo(cx + topW / 2 - 10, cy - 8 - topH / 2);
        ctx.stroke();
        ctx.restore();
      }

      // Addon Doodles on top
      const topY = currentSizeObj.tiers === 2 ? cy - 86 : cy - 8;
      ctx.fillStyle = '#ff4d4d';
      [-40, -15, 10, 35].forEach((offset) => {
        ctx.beginPath();
        ctx.arc(cx + offset, topY - 7, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }

    // 3. Draw Hand-Written Message & Flavor Labels
    ctx.fillStyle = '#2d2d2d';
    ctx.font = 'bold 17px "Kalam", cursive';
    ctx.textAlign = 'center';
    ctx.fillText(`Message: "${inscription || 'None'}"`, cx, cy - 115);

    ctx.font = 'bold 15px "Patrick Hand", cursive';
    ctx.fillStyle = '#2d5da1';
    ctx.fillText(`Main Choice: ${sponge}`, cx, cy + 148);
    ctx.fillStyle = '#ff4d4d';
    ctx.fillText(`Topping/Mix: ${filling}`, cx, cy + 168);

    ctx.restore();

    // 4. Render User Freehand Strokes
    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = stroke.isHighlighter ? 'square' : 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }
  };

  useEffect(() => {
    renderCanvas();
  }, [
    strokes,
    currentStroke,
    selectedSizeId,
    sponge,
    filling,
    inscription,
    selectedAddons,
  ]);

  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(300, rect.width - 36);
      canvas.height = 420;
      renderCanvas();
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const pos = getCanvasCoords(e);
    const config = getToolConfig();
    setCurrentStroke({
      points: [pos],
      color: config.color,
      width: config.width,
      isHighlighter: config.isHighlighter,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    const pos = getCanvasCoords(e);
    setCurrentStroke((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        points: [...prev.points, pos],
      };
    });
  };

  const handlePointerUp = () => {
    if (currentStroke && currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
  };

  const handleAddNote = (color: string) => {
    const randomRotations = ['-rotate-2', '-rotate-1', 'rotate-1', 'rotate-2'];
    const newNote: StickyNote = {
      id: Date.now().toString(),
      text: 'Type your note here...',
      x: 30 + Math.random() * 140,
      y: 60 + Math.random() * 120,
      color,
      rotation: randomRotations[Math.floor(Math.random() * randomRotations.length)],
      pinned: true,
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const startDragNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggingNoteId(id);
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    setDragOffset({
      x: e.clientX - note.x,
      y: e.clientY - note.y,
    });
  };

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (!draggingNoteId) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const newX = Math.max(10, Math.min(e.clientX - dragOffset.x, rect.width - 210));
    const newY = Math.max(10, Math.min(e.clientY - dragOffset.y, 260));

    setNotes((prev) =>
      prev.map((n) => (n.id === draggingNoteId ? { ...n, x: newX, y: newY } : n))
    );
  };

  const handleContainerMouseUp = () => {
    setDraggingNoteId(null);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#fdfbf7';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    notes.forEach((note) => {
      ctx.save();
      ctx.translate(note.x + 85, note.y + 60);
      ctx.rotate(note.rotation.includes('-') ? -0.03 : 0.03);
      ctx.fillStyle = note.color;
      ctx.strokeStyle = '#2d2d2d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-85, -60, 170, 120, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#2d2d2d';
      ctx.font = 'bold 14px "Patrick Hand", cursive';
      const lines = note.text.split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line.slice(0, 24), -72, -25 + i * 20);
      });
      ctx.restore();
    });

    ctx.fillStyle = '#2d2d2d';
    ctx.font = 'bold 14px "Kalam", cursive';
    ctx.fillText(
      `Chops & Crumb NG Order · ${formatNaira(totalPrice)}`,
      18,
      exportCanvas.height - 16
    );

    const dataUrl = exportCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `chops-and-crumb-order-${Date.now()}.png`;
    a.click();
  };

  const handleSendToOrderForm = () => {
    const addonLabels = selectedAddons
      .map((id) => ADDON_OPTIONS.find((a) => a.id === id)?.label)
      .filter(Boolean) as string[];

    onSendSpecToOrder?.({
      sizeLabel: currentSizeObj.label,
      basePrice: currentSizeObj.price,
      sponge,
      filling,
      inscription,
      addons: addonLabels,
      totalPrice,
    });

    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="studio" className="py-20 md:py-24 bg-[#fdfbf7] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block rotate-1 mb-2">
            <span
              className="text-base font-bold text-[#2d5da1] tracking-wide"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ✦ CUSTOM CAKE &amp; SURPRISE TRAY BUILDER ✦
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#2d2d2d]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Design Your Order in 60 Seconds
          </h2>
          <p className="text-xl text-[#2d2d2d]/80 mt-2">
            Pick your cake size, small chops platter, or surprise tray below,
            add extras like chilled Zobo or a saxophonist, and see your price in
            Naira immediately!
          </p>
        </div>

        <div
          className="border-[3px] border-[#2d2d2d] bg-white shadow-hard-lg relative p-4 sm:p-6"
          style={{ borderRadius: TOKENS.radii.wobblyLg }}
          onMouseMove={handleContainerMouseMove}
          onMouseUp={handleContainerMouseUp}
          ref={containerRef}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <TapeStrip rotation="-0.5deg" />
          </div>
          <div className="absolute -top-2 left-6 pointer-events-none">
            <PushPin color="red" />
          </div>
          <div className="absolute -top-2 right-6 pointer-events-none">
            <PushPin color="blue" />
          </div>

          {/* Step 1: Builder Controls */}
          <div className="grid md:grid-cols-12 gap-5 pb-5 mb-5 border-b-2 border-dashed border-[#2d2d2d]/30">
            <div className="md:col-span-5 space-y-2">
              <label className="block text-base font-bold text-[#2d2d2d]">
                1. Pick Cake, Small Chops or Surprise Tray:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSizeId(opt.id)}
                    className={`flex items-center justify-between px-3 py-2 text-left text-base font-bold border-2 border-[#2d2d2d] transition-all cursor-pointer ${
                      selectedSizeId === opt.id
                        ? 'bg-[#fff9c4] text-[#2d2d2d] shadow-hard-sm -translate-y-0.5'
                        : 'bg-[#fdfbf7] text-[#2d2d2d]/80 hover:bg-white'
                    }`}
                    style={{ borderRadius: TOKENS.radii.wobblySm }}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <img
                        src={opt.previewImg}
                        alt={opt.label}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded object-cover border border-[#2d2d2d] shrink-0"
                      />
                      <span className="truncate">{opt.label}</span>
                    </div>
                    <span className="text-[#ff4d4d] tabular-nums shrink-0">
                      {formatNaira(opt.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-base font-bold text-[#2d2d2d] mb-1">
                    2. Cake Flavor / Platter Mix:
                  </label>
                  <select
                    value={sponge}
                    onChange={(e) => setSponge(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdfbf7] text-base font-bold text-[#2d2d2d] border-2 border-[#2d2d2d] outline-none cursor-pointer"
                    style={{ borderRadius: TOKENS.radii.wobblySm }}
                  >
                    {SPONGE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-base font-bold text-[#2d2d2d] mb-1">
                    3. Frosting / Meat &amp; Sides:
                  </label>
                  <select
                    value={filling}
                    onChange={(e) => setFilling(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdfbf7] text-base font-bold text-[#2d2d2d] border-2 border-[#2d2d2d] outline-none cursor-pointer"
                    style={{ borderRadius: TOKENS.radii.wobblySm }}
                  >
                    {FILLING_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-base font-bold text-[#2d2d2d] mb-1">
                  4. Name or Message on Cake / Card:
                </label>
                <input
                  type="text"
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  maxLength={36}
                  placeholder="e.g. Happy Birthday Omolara!"
                  className="w-full px-3.5 py-2 bg-[#fdfbf7] text-base font-bold text-[#2d2d2d] border-2 border-[#2d2d2d] outline-none focus:bg-white"
                  style={{ borderRadius: TOKENS.radii.wobblySm }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2d2d2d]/80 mb-1.5">
                  5. Add Extra Surprise Goodies:
                </label>
                <div className="flex flex-wrap gap-2">
                  {ADDON_OPTIONS.map((addon) => {
                    const active = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold border-2 border-[#2d2d2d] cursor-pointer transition-all whitespace-nowrap ${
                          active
                            ? 'bg-[#ffd6e0] text-[#2d2d2d] shadow-[2px_2px_0px_#2d2d2d]'
                            : 'bg-white text-[#2d2d2d]/75 hover:bg-[#fdfbf7]'
                        }`}
                        style={{ borderRadius: TOKENS.radii.wobblySm }}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-[#ff4d4d] stroke-[3]" />}
                        <span>{addon.label}</span>
                        <span className="text-[#2d5da1] tabular-nums">
                          +{formatNaira(addon.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Sketchpad Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-[#2d2d2d] mr-1 hidden sm:inline">
                Sketch / Note Tool:
              </span>

              <button
                type="button"
                onClick={() => setTool('pencil')}
                className={`flex items-center gap-1.5 px-3 py-1 text-sm font-bold border-2 border-[#2d2d2d] shadow-hard-sm cursor-pointer whitespace-nowrap ${
                  tool === 'pencil'
                    ? 'bg-[#2d2d2d] text-white'
                    : 'bg-white text-[#2d2d2d] hover:bg-[#e5e0d8]'
                }`}
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <Pencil className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Pencil</span>
              </button>

              <button
                type="button"
                onClick={() => setTool('marker')}
                className={`flex items-center gap-1.5 px-3 py-1 text-sm font-bold border-2 border-[#2d2d2d] shadow-hard-sm cursor-pointer whitespace-nowrap ${
                  tool === 'marker'
                    ? 'bg-[#ff4d4d] text-white'
                    : 'bg-white text-[#ff4d4d] hover:bg-[#ffe5e5]'
                }`}
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <span>Red Icing Pen</span>
              </button>

              <button
                type="button"
                onClick={() => setTool('pen')}
                className={`flex items-center gap-1.5 px-3 py-1 text-sm font-bold border-2 border-[#2d2d2d] shadow-hard-sm cursor-pointer whitespace-nowrap ${
                  tool === 'pen'
                    ? 'bg-[#2d5da1] text-white'
                    : 'bg-white text-[#2d5da1] hover:bg-[#e0eaff]'
                }`}
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <span>Blue Pen</span>
              </button>

              <button
                type="button"
                onClick={() => setTool('highlighter')}
                className={`flex items-center gap-1.5 px-3 py-1 text-sm font-bold border-2 border-[#2d2d2d] shadow-hard-sm cursor-pointer whitespace-nowrap ${
                  tool === 'highlighter'
                    ? 'bg-[#facc15] text-[#2d2d2d]'
                    : 'bg-white text-[#2d2d2d] hover:bg-[#fff9c4]'
                }`}
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <Highlighter className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Highlight</span>
              </button>

              <button
                type="button"
                onClick={() => setTool('eraser')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-sm font-bold border-2 border-[#2d2d2d] shadow-hard-sm cursor-pointer ${
                  tool === 'eraser'
                    ? 'bg-[#e5e0d8] text-[#2d2d2d]'
                    : 'bg-white text-[#2d2d2d] hover:bg-[#f5f0e8]'
                }`}
                style={{ borderRadius: TOKENS.radii.wobblySm }}
                title="Eraser"
              >
                <Eraser className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#2d2d2d] hidden md:inline">
                + Add Note:
              </span>
              <button
                type="button"
                onClick={() => handleAddNote('#fff9c4')}
                className="w-6 h-6 bg-[#fff9c4] border-2 border-[#2d2d2d] shadow-[1px_1px_0px_#2d2d2d] hover:scale-110 transition-transform cursor-pointer"
                style={{ borderRadius: '4px' }}
                title="Add Yellow Note"
              />
              <button
                type="button"
                onClick={() => handleAddNote('#ffd6e0')}
                className="w-6 h-6 bg-[#ffd6e0] border-2 border-[#2d2d2d] shadow-[1px_1px_0px_#2d2d2d] hover:scale-110 transition-transform cursor-pointer"
                style={{ borderRadius: '4px' }}
                title="Add Pink Note"
              />
              <button
                type="button"
                onClick={() => handleAddNote('#dcfce7')}
                className="w-6 h-6 bg-[#dcfce7] border-2 border-[#2d2d2d] shadow-[1px_1px_0px_#2d2d2d] hover:scale-110 transition-transform cursor-pointer"
                style={{ borderRadius: '4px' }}
                title="Add Green Note"
              />

              <button
                type="button"
                onClick={handleUndo}
                className="p-1.5 text-[#2d2d2d] hover:text-[#ff4d4d] border border-[#2d2d2d] bg-white shadow-[1px_1px_0px_#2d2d2d] cursor-pointer"
                style={{ borderRadius: TOKENS.radii.wobblySm }}
                title="Undo last line"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-[#2d2d2d] hover:text-[#ff4d4d] border border-[#2d2d2d] bg-white shadow-[1px_1px_0px_#2d2d2d] cursor-pointer"
                style={{ borderRadius: TOKENS.radii.wobblySm }}
                title="Clear drawings"
              >
                <Trash2 className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Interactive Canvas Area */}
          <div
            className="relative border-2 border-[#2d2d2d] bg-[#fdfbf7] h-[420px] overflow-hidden select-none"
            style={{ borderRadius: TOKENS.radii.wobblyMd }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="absolute inset-0 w-full h-full cursor-crosshair z-0 touch-none"
            />

            {notes.map((note) => (
              <div
                key={note.id}
                className={`absolute w-44 sm:w-48 p-2.5 border-2 border-[#2d2d2d] shadow-hard z-10 transition-shadow ${note.rotation}`}
                style={{
                  left: `${note.x}px`,
                  top: `${note.y}px`,
                  backgroundColor: note.color,
                  borderRadius: TOKENS.radii.wobblySm,
                }}
              >
                <div className="flex items-center justify-between mb-1 pb-1 border-b border-dashed border-[#2d2d2d]/30">
                  <div
                    onMouseDown={(e) => startDragNote(note.id, e)}
                    className="flex items-center gap-1 cursor-grab active:cursor-grabbing text-xs text-[#2d2d2d]/80"
                  >
                    <Move className="w-3 h-3" />
                    <span className="font-bold">Move</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotes((prev) => prev.filter((n) => n.id !== note.id))
                    }
                    className="text-[#2d2d2d]/60 hover:text-[#ff4d4d] p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  value={note.text}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setNotes((prev) =>
                      prev.map((n) => (n.id === note.id ? { ...n, text: newText } : n))
                    );
                  }}
                  className="w-full bg-transparent resize-none outline-none font-bold text-sm leading-snug text-[#2d2d2d] border-none p-0 focus:ring-0"
                  rows={3}
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
            ))}

            <div className="absolute bottom-2.5 right-3 pointer-events-none text-xs text-[#2d2d2d]/65 bg-white/85 px-2.5 py-1 border border-[#2d2d2d] rounded">
              ✎ Draw on your cake · Drag sticky notes
            </div>
          </div>

          {/* Bottom Bar: Total Price in Naira & Add to Order Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-5 pt-3 border-t-2 border-dashed border-[#2d2d2d]/25">
            <div className="flex items-center gap-4">
              <div
                className="px-4 py-2 bg-[#fff9c4] border-2 border-[#2d2d2d] shadow-hard-sm"
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <div className="text-xs font-bold text-[#2d2d2d]/70 uppercase">
                  Estimated Total
                </div>
                <div
                  className="text-3xl font-extrabold text-[#2d2d2d] tabular-nums"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {formatNaira(totalPrice)}{' '}
                  <span className="text-sm font-normal text-[#2d2d2d]/75">
                    ({currentSizeObj.label.split('(')[0].trim()})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-base font-bold text-[#2d2d2d] bg-white border-2 border-[#2d2d2d] shadow-hard-sm hover:bg-[#e5e0d8] cursor-pointer whitespace-nowrap"
                style={{ borderRadius: TOKENS.radii.wobblySm }}
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Save Ticket Image</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSendToOrderForm}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xl font-bold text-white bg-[#ff4d4d] border-[3px] border-[#2d2d2d] shadow-hard hover:bg-[#2d5da1] hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer whitespace-nowrap tabular-nums"
              style={{ borderRadius: TOKENS.radii.wobbly }}
            >
              <Send className="w-5 h-5 stroke-[2.5]" />
              <span>Add to My Order ({formatNaira(totalPrice)})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
