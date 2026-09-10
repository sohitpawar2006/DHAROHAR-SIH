import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Heart, Bookmark, Play, X, UtensilsCrossed, Music, Sparkles, Star, Calendar, Navigation } from 'lucide-react';
import { getStateById, getStateName, type Place } from '@/data/states';
import { useApp } from '@/context/AppContext';
import { HorizontalScroll } from '@/components/Section';
import { useHappening } from '@/components/HappeningModal';
import { PlaceCard, CultureCard, DanceCard, MusicCard, FoodCard, RestaurantCard } from '@/components/Cards';
import { geoStates } from '@/data/indiaGeo';
import { DiyaMotif, LotusMotif, MandalaMotif, PeacockMotif, TempleMotif } from '@/components/Decor';

type StateDetailProps = {
  stateId: string;
  onBack: () => void;
  onOpenPlace: (placeId: string) => void;
  onPlanTrip: (place: { id: string; stateId: string; stateName: string; city: string; place: string; image: string }) => void;
};

export default function StateDetail({ stateId, onBack, onOpenPlace, onPlanTrip }: StateDetailProps) {
  const state = getStateById(stateId);
  const { profile, toggleTrip, isTripSaved, exploreState } = useApp();
  const { open: openHappening } = useHappening();
  const [activeTab, setActiveTab] = useState<'overview' | 'places' | 'culture' | 'food'>('overview');

  useEffect(() => {
    if (state && profile) exploreState(stateId);
  }, [state, stateId, profile, exploreState]);

  const stateGeo = useMemo(() => geoStates.find((item) => item.id === stateId), [stateId]);

  if (!state) return null;

  const tripFor = (place: Place) => ({
    id: `trip-${place.id}`,
    stateId: state.id,
    stateName: state.name,
    city: place.city,
    place: place.name,
    image: place.image,
  });

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'places' as const, label: 'Places' },
    { id: 'culture' as const, label: 'Culture' },
    { id: 'food' as const, label: 'Food' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream-100 pb-20"
    >
      {/* Cinematic hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={state.heroImage}
          alt={state.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/40 to-ink-900/20" />
        <CulturalBackdrop stateId={state.id} />
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ backgroundColor: state.color }}
        />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute left-4 top-20 z-20 flex items-center gap-2 rounded-full bg-ink-900/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-ink-900/60"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Map
        </button>

        {/* Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-10"
        >
          <div className="mx-auto max-w-5xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: state.color }}>
              {state.capital}
            </p>
            <h1 className="text-4xl font-extrabold text-white text-shadow-lg sm:text-6xl md:text-7xl">
              {state.name.toUpperCase()}
            </h1>
            <p className="mt-2 text-lg italic text-cream-200/90 sm:text-xl">"{state.tagline}"</p>
            <p className="mt-4 max-w-xl text-sm text-cream-100/80">Choose a famous place below to build a visit around that exact destination.</p>
          </div>
        </motion.div>
        {stateGeo && (
          <motion.svg
            initial={{ opacity: 0, scale: 0.45, rotate: -4 }}
            animate={{ opacity: 0.42, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, type: 'spring', damping: 16 }}
            viewBox={`${stateGeo.labelX - 105} ${stateGeo.labelY - 120} 210 240`}
            className="pointer-events-none absolute right-[4%] top-[12%] hidden h-[68%] w-[42%] text-cream-100 lg:block"
            aria-hidden="true"
          >
            <path d={stateGeo.path} fill="currentColor" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </motion.svg>
        )}
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 glass border-b border-saffron-200/40">
        <div className="mx-auto flex max-w-5xl gap-1 px-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative whitespace-nowrap px-5 py-4 text-sm font-semibold transition-colors ${
                activeTab === tab.id ? 'text-saffron-600' : 'text-ink-700/60 hover:text-ink-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="stateTab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-saffron-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Description */}
            <div className="rounded-2xl bg-gradient-warm p-6 card-shadow sm:p-8">
              <p className="text-lg leading-relaxed text-ink-800 sm:text-xl">{state.description}</p>
            </div>

            {/* Quick chips */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Explore {state.name}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  { label: 'Heritage & Places', icon: MapPin, count: state.places.length },
                  { label: 'Traditions', icon: Sparkles, count: state.traditions.length },
                  { label: 'Dance', icon: Heart, count: state.dances.length },
                  { label: 'Music', icon: Music, count: state.music.length },
                  { label: 'Famous Food', icon: UtensilsCrossed, count: state.foods.length },
                  { label: 'Festivals', icon: Calendar, count: state.festivals.length },
                  { label: 'Folk Art', icon: Sparkles, count: state.artForms.length },
                  { label: 'Restaurants', icon: Star, count: state.restaurants.length },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.label.includes('Place') ? 'places' : item.label.includes('Food') ? 'food' : 'culture')}
                    className="flex items-center gap-3 rounded-xl bg-cream-100 p-4 text-left card-shadow transition-all hover:-translate-y-1 hover:card-shadow-lg"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron-100">
                      <item.icon className="h-5 w-5 text-saffron-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink-900">{item.label}</div>
                      <div className="text-xs text-ink-700/60">{item.count} items</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview: Places */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Famous Places</h3>
              <HorizontalScroll>
                {state.places.map((p) => (
                  <PlaceCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    city={p.city}
                    stateName={state.name}
                    image={p.image}
                    description={p.description}
                    onOpen={() => onOpenPlace(p.id)}
                    onPlanTrip={() => onPlanTrip(tripFor(p))}
                  />
                ))}
              </HorizontalScroll>
            </div>

            {/* Preview: Dance */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Dance</h3>
              <HorizontalScroll>
                {state.dances.map((d) => (
                  <DanceCard key={d.name} name={d.name} origin={d.origin} state={state.name} description={d.description} image={d.image} onWatch={() => openHappening({ kind: 'dance', name: d.name, place: state.name, image: d.image, description: d.description, extra: [{ label: 'Origin', value: d.origin }] })} />
                ))}
              </HorizontalScroll>
            </div>

            {/* Preview: Food */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Food</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {state.foods.map((f) => (
                  <FoodCard key={f.name} name={f.name} origin={f.origin ?? ''} description={f.description} whereToTry={f.whereToTry} image={f.image} onOpen={() => openHappening({ kind: 'food', name: f.name, place: f.origin ?? state.name, image: f.image, description: f.description, extra: [{ label: 'Where to try', value: f.whereToTry }] })} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'places' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-ink-900">Places to Visit in {state.name}</h3>
              <p className="mt-1 text-ink-700/70">Explore the heritage, monuments, and natural wonders of {state.name}.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.places.map((p) => (
                <PlaceCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  city={p.city}
                  stateName={state.name}
                  image={p.image}
                  description={p.description}
                  onOpen={() => onOpenPlace(p.id)}
                  onPlanTrip={() => onPlanTrip(tripFor(p))}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'culture' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Traditions */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Living Traditions</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {state.traditions.map((t) => (
                  <CultureCard key={t.name} name={t.name} state={state.name} description={t.description} image={t.image} onOpen={() => openHappening({ kind: 'tradition', name: t.name, place: state.name, image: t.image, description: t.description })} />
                ))}
              </div>
            </div>
            {/* Dance */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">India in Motion — Dance</h3>
              <HorizontalScroll>
                {state.dances.map((d) => (
                  <DanceCard key={d.name} name={d.name} origin={d.origin} state={state.name} description={d.description} image={d.image} onWatch={() => openHappening({ kind: 'dance', name: d.name, place: state.name, image: d.image, description: d.description, extra: [{ label: 'Origin', value: d.origin }] })} />
                ))}
              </HorizontalScroll>
            </div>
            {/* Music */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Sounds of {state.name}</h3>
              <HorizontalScroll>
                {state.music.map((m) => (
                  <MusicCard key={m.name} name={m.name} region={m.region} instruments={m.instruments} description={m.description} image={m.image} onListen={() => openHappening({ kind: 'music', name: m.name, place: m.region, image: m.image, description: m.description, extra: [{ label: 'Instruments', value: m.instruments }] })} />
                ))}
              </HorizontalScroll>
            </div>
            {/* Festivals */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Festivals</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {state.festivals.map((f) => (
                  <div key={f.name} className="overflow-hidden rounded-2xl bg-cream-100 card-shadow">
                    <div className="relative h-40">
                      <img src={f.image} alt={f.name} loading="lazy" className="h-full w-full object-cover" />
                      <span className="absolute right-3 top-3 rounded-full bg-saffron-500 px-2.5 py-1 text-xs font-bold text-white">{f.month}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-ink-900">{f.name}</h4>
                      <p className="mt-1 text-sm text-ink-700/75">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Art forms */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Folk Art & Handicrafts</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {state.artForms.map((a) => (
                  <div key={a.name} className="overflow-hidden rounded-2xl bg-cream-100 card-shadow">
                    <div className="relative h-36">
                      <img src={a.image} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-ink-900">{a.name}</h4>
                      <p className="mt-1 text-sm text-ink-700/70">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'food' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Taste {state.name}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {state.foods.map((f) => (
                  <FoodCard key={f.name} name={f.name} origin={f.origin ?? ''} description={f.description} whereToTry={f.whereToTry} image={f.image} onOpen={() => openHappening({ kind: 'food', name: f.name, place: f.origin ?? state.name, image: f.image, description: f.description, extra: [{ label: 'Where to try', value: f.whereToTry }] })} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold text-ink-900">Where Should We Eat?</h3>
              <p className="mb-4 text-sm text-ink-700/60">Sample restaurant data for prototype purposes — not real ratings.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {state.restaurants.map((r) => (
                  <RestaurantCard key={r.id} name={r.name} city={r.city} cuisine={r.cuisine} rating={r.rating} priceRange={r.priceRange} image={r.image} description={r.description} onOpen={() => openHappening({ kind: 'restaurant', name: r.name, place: r.city, image: r.image, description: r.description, extra: [{ label: 'Cuisine', value: r.cuisine }, { label: 'Price', value: r.priceRange }] })} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function CulturalBackdrop({ stateId }: { stateId: string }) {
  const group = stateId.length % 4;
  const Main = group === 0 ? TempleMotif : group === 1 ? PeacockMotif : group === 2 ? LotusMotif : DiyaMotif;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-8 top-16 text-cream-100/30">
        <Main className="h-28 w-28 sm:h-40 sm:w-40" />
      </motion.div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }} className="absolute -bottom-24 -left-16 text-saffron-300/20">
        <MandalaMotif className="h-72 w-72" />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Place Detail Modal
// ─────────────────────────────────────────────
type PlaceDetailProps = {
  place: Place | null;
  onClose: () => void;
  onPlanTrip: (place: { id: string; stateId: string; stateName: string; city: string; place: string; image: string }) => void;
};

export function PlaceDetailModal({ place, onClose, onPlanTrip }: PlaceDetailProps) {
  const { toggleTrip, isTripSaved } = useApp();

  if (!place) return null;

  const stateName = getStateName(place.stateId);
  const state = getStateById(place.stateId);
  const tripData = {
    id: `trip-${place.id}`,
    stateId: place.stateId,
    stateName,
    city: place.city,
    place: place.name,
    image: place.image,
  };
  const saved = isTripSaved(tripData.id);

  // Nearby places from the same state
  const nearby = state?.places.filter((p) => p.id !== place.id) ?? [];
  // Local food from same state
  const localFood = state?.foods.slice(0, 3) ?? [];

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex items-start justify-center overflow-y-auto bg-ink-900/60 p-0 backdrop-blur-md sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-none bg-cream-100 shadow-2xl sm:rounded-3xl"
          >
            {/* Hero image */}
            <div className="relative h-64 sm:h-80">
              <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/40 text-white backdrop-blur-sm transition-all hover:bg-ink-900/60"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="flex items-center gap-1 text-sm text-cream-200/80">
                  <MapPin className="h-4 w-4" /> {place.city}, {stateName}
                </p>
                <h2 className="text-3xl font-extrabold text-white text-shadow-lg sm:text-4xl">{place.name}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[50vh] overflow-y-auto scrollbar-thin p-6 sm:p-8">
              {/* About */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-bold text-ink-900">About</h3>
                <p className="text-base leading-relaxed text-ink-800">{place.description}</p>
              </div>

              {/* Why it matters */}
              <div className="mb-6 rounded-2xl bg-peacock-50 p-5">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-peacock-700">
                  <Sparkles className="h-5 w-5" /> Why It Matters
                </h3>
                <p className="text-base text-ink-800">{place.significance}</p>
              </div>

              {/* Actions */}
              <div className="mb-6 flex flex-wrap gap-3">
                <button
                  onClick={() => toggleTrip(tripData)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                    saved ? 'bg-saffron-500 text-white' : 'border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${saved ? 'fill-white' : ''}`} />
                  {saved ? 'Saved!' : 'Save to Trip'}
                </button>
                <button
                  onClick={() => onPlanTrip(tripData)}
                  className="flex items-center gap-2 rounded-full bg-saffron-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95"
                >
                  <Navigation className="h-4 w-4" /> Plan Visit
                </button>
              </div>

              {/* Nearby */}
              {nearby.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-ink-900">Explore Nearby</h3>
                  <HorizontalScroll>
                    {nearby.map((p) => (
                      <PlaceCard
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        city={p.city}
                        stateName={stateName}
                        image={p.image}
                        description={p.description}
                      />
                    ))}
                  </HorizontalScroll>
                </div>
              )}

              {/* Local food */}
              {localFood.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-ink-900">Local Food</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {localFood.map((f) => (
                      <div key={f.name} className="flex items-center gap-3 rounded-xl bg-cream-50 p-3">
                        <img src={f.image} alt={f.name} loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
                        <div>
                          <div className="font-semibold text-ink-900">{f.name}</div>
                          <div className="text-xs text-ink-700/70 line-clamp-1">{f.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Community videos (demo) */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-bold text-ink-900">Community Videos</h3>
                <div className="rounded-2xl border-2 border-dashed border-saffron-200 bg-saffron-50/50 p-8 text-center">
                  <Play className="mx-auto h-8 w-8 text-saffron-400" />
                  <p className="mt-2 text-sm text-ink-700/60">Community videos tagged to {place.name} will appear here.</p>
                  <p className="text-xs text-ink-700/40">Be the first to share your experience!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
