import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Music, UtensilsCrossed, Heart, Sparkles, ZoomIn, ZoomOut, Navigation, X } from 'lucide-react';
import { getStateById } from '@/data/states';
import { geoStates, VIEWBOX_W, VIEWBOX_H } from '@/data/indiaGeo';
import { LotusMotif, PeacockMotif, MandalaMotif } from '@/components/Decor';

type IndiaMapProps = {
  onSelectState: (stateId: string) => void;
};

export default function IndiaMap({ onSelectState }: IndiaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const hoveredState = hovered ? getStateById(hovered) : null;
  const selectedState = selected ? getStateById(selected) : null;

  const zoomIn = () => setZoom((z) => Math.min(z + 0.4, 2.5));
  const zoomOut = () => {
    setZoom((z) => {
      const nz = Math.max(z - 0.4, 1);
      if (nz === 1) setSelected(null);
      return nz;
    });
  };

  const handleStateClick = (stateId: string) => {
    setSelected(stateId);
    setZoom(2.25);
  };

  // Focus the selected state by translating the viewBox
  const focusTransform = useMemo(() => {
    const geo = selected ? geoStates.find((g) => g.id === selected) : null;
    if (!geo) return { x: 0, y: 0 };
    const tx = VIEWBOX_W / 2 - geo.labelX * zoom;
    const ty = VIEWBOX_H / 2 - geo.labelY * zoom;
    return { x: tx, y: ty };
  }, [selected, zoom]);

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Headline */}
      <div className="mb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 inline-block rounded-full bg-saffron-100 px-4 py-1.5 text-sm font-semibold text-saffron-700">
            Interactive Cultural Map
          </p>
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl md:text-5xl">
            India is not just a country.
            <br />
            <span className="bg-gradient-saffron bg-clip-text text-transparent">It is a collection of stories.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-700/70 sm:text-lg">
            Pick a state and discover the traditions, places, food, music and people that make it unique.
          </p>
        </motion.div>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="relative min-h-[520px] overflow-hidden rounded-3xl bg-gradient-warm card-shadow-lg sm:min-h-[620px] lg:min-h-[720px]"
      >
        {/* Decorative floating motifs */}
        <LotusMotif className="absolute left-4 top-4 h-16 w-16 text-saffron-400/30 animate-float-slow" />
        <PeacockMotif className="absolute right-8 top-8 h-20 w-20 text-peacock-500/25 animate-float-medium" />
        <MandalaMotif className="absolute bottom-4 right-4 h-24 w-24 text-maroon-500/15 animate-spin-slow" />
        <LotusMotif className="absolute bottom-8 left-8 h-14 w-14 text-royal-500/20 animate-float-slow" />

        {/* Zoom controls */}
        <div className="absolute right-4 top-20 z-20 flex flex-col gap-2">
          <button
            onClick={zoomIn}
            aria-label="Zoom in"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100/90 text-ink-800 shadow-md transition-all hover:bg-cream-200 active:scale-90"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={zoomOut}
            aria-label="Zoom out"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100/90 text-ink-800 shadow-md transition-all hover:bg-cream-200 active:scale-90"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
        </div>

        {/* SVG Map */}
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* India outline (background) */}
          <defs>
            <filter id="stateGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="folkDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.2" fill="#FFB366" opacity="0.25" />
            </pattern>
          </defs>

          {/* Ocean / background water hint */}
          <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#folkDots)" />

          {/* India landmass outline (simplified) */}
          <g
            transform={`translate(${focusTransform.x}, ${focusTransform.y}) scale(${zoom})`}
            style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            {geoStates.map((geo) => {
              const data = getStateById(geo.id);
              const isHovered = hovered === geo.id;
              const isSelected = selected === geo.id;
              const hasData = Boolean(data);
              return (
                <g key={geo.id}>
                  <path
                    d={geo.path}
                    fillRule="evenodd"
                    fill={
                      isSelected && data
                        ? data.color
                        : isHovered
                          ? '#FFCC99'
                          : hasData
                            ? '#FFE599'
                            : '#F7EBCB'
                    }
                    stroke={isSelected ? '#fff' : isHovered ? '#A02E3A' : '#B8860B'}
                    strokeWidth={isSelected ? 2 : isHovered ? 1.2 : 0.8}
                    filter={isHovered || isSelected ? 'url(#stateGlow)' : undefined}
                    className="india-state"
                    style={{
                      cursor: hasData ? 'pointer' : 'default',
                      transition: 'fill 0.3s ease, stroke 0.3s ease',
                    }}
                    onMouseEnter={hasData ? () => setHovered(geo.id) : undefined}
                    onMouseLeave={hasData ? () => setHovered(null) : undefined}
                    onClick={hasData ? () => handleStateClick(geo.id) : undefined}
                  />
                  {hasData && (
                    <text
                      x={geo.labelX}
                      y={geo.labelY}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      style={{
                        fontSize: isHovered || isSelected ? 11 : 8,
                        fontWeight: isSelected ? 800 : 600,
                        fill: isSelected ? '#fff' : '#80380A',
                        opacity: zoom > 1.3 || isHovered || isSelected ? 1 : 0.65,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {data?.name ?? geo.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Decorative compass rose */}
            <g transform="translate(680, 200)" opacity="0.3">
              <circle r="22" fill="none" stroke="#CC9900" strokeWidth="1" />
              <path d="M0,-20 L4,0 L0,20 L-4,0 Z" fill="#CC9900" />
              <text y="-26" textAnchor="middle" fontSize="10" fill="#80380A" fontWeight="bold">N</text>
            </g>
          </g>
        </svg>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredState && !selected && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-2xl bg-ink-900/90 px-5 py-3 text-center text-white shadow-xl"
            >
              <div className="text-lg font-bold">{hoveredState.name}</div>
              <div className="text-xs text-cream-200/80">{hoveredState.highlight}</div>
            </motion.div>
          )}
        </AnimatePresence>

         {/* Selected state stage */}
        <AnimatePresence>
          {selectedState && zoom > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.82 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ type: 'spring', damping: 18, stiffness: 160 }}
              className="absolute inset-x-3 bottom-3 z-30 bg-cream-100/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[360px]"
            >
              <button onClick={() => { setSelected(null); setZoom(1); }} aria-label="Close state preview" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-300 text-ink-800 transition-all hover:bg-saffron-100 active:scale-90">
                <X className="h-4 w-4" />
              </button>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedState.color }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: selectedState.color }}>
                  {selectedState.capital}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-ink-900">{selectedState.name}</h3>
              <p className="mt-1 text-sm italic text-ink-700/70">"{selectedState.tagline}"</p>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-ink-800">
                  <MapPin className="h-4 w-4 text-saffron-500" />
                  <span className="font-semibold">Iconic Highlight:</span> {selectedState.places[0]?.name}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Chip icon={MapPin} text={selectedState.places[0]?.city ?? ''} />
                  <Chip icon={Heart} text={selectedState.dances[0]?.name ?? ''} />
                  <Chip icon={Music} text={selectedState.music[0]?.name ?? ''} />
                  <Chip icon={UtensilsCrossed} text={selectedState.foods[0]?.name ?? ''} />
                </div>
              </div>

              <button
                onClick={() => onSelectState(selectedState.id)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-4 py-2.5 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95"
              >
                <Navigation className="h-4 w-4" />
                 Explore famous places
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-700/60">
        <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-saffron-500" /> Hover to discover</span>
         <span className="flex items-center gap-1.5"><ZoomIn className="h-4 w-4 text-saffron-500" /> Select a state to zoom in</span>
         <span className="flex items-center gap-1.5"><Navigation className="h-4 w-4 text-saffron-500" /> Open its famous places</span>
      </div>
    </div>
  );
}

function Chip({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  if (!text) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-saffron-100/80 px-2.5 py-1 text-xs font-medium text-saffron-700">
      <Icon className="h-3 w-3" />
      {text}
    </span>
  );
}
