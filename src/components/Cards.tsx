import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Play, Heart, Bookmark, UtensilsCrossed, Music, Sparkles, Navigation } from 'lucide-react';
import { useApp } from '@/context/AppContext';

// ─────────────────────────────────────────────
// Place Card
// ─────────────────────────────────────────────
type PlaceCardProps = {
  id: string;
  name: string;
  city: string;
  stateName: string;
  image: string;
  description: string;
  significance?: string;
  onOpen?: () => void;
  onPlanTrip?: () => void;
};

export function PlaceCard({ name, city, stateName, image, description, onOpen, onPlanTrip }: PlaceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow sm:w-80"
      onClick={onOpen}
    >
      <div className="relative h-48 overflow-hidden sm:h-52">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white text-shadow-md">{name}</h3>
          <p className="flex items-center gap-1 text-sm text-cream-200">
            <MapPin className="h-3.5 w-3.5" /> {city}, {stateName}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm text-ink-700/80">{description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <button onClick={(event) => { event.stopPropagation(); onOpen?.(); }} className="flex items-center gap-1 text-sm font-semibold text-saffron-600 transition-all group-hover:gap-2">
            Explore <ArrowRight className="h-4 w-4" />
          </button>
          {onPlanTrip && (
            <button
              onClick={(event) => { event.stopPropagation(); onPlanTrip(); }}
              className="flex items-center gap-1 rounded-full bg-saffron-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95"
            >
              <Navigation className="h-3.5 w-3.5" /> Plan Trip
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Culture/Tradition Card
// ─────────────────────────────────────────────
export function CultureCard({ name, state, description, image, onOpen }: { name: string; state: string; description: string; image: string; onOpen?: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow sm:w-72"
      onClick={onOpen}
    >
      <div className="relative h-40 overflow-hidden">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-cream-100/90 px-2.5 py-1 text-xs font-semibold text-saffron-700">
          {state}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-ink-900">{name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-700/75">{description}</p>
        <button className="mt-3 flex items-center gap-1 text-sm font-semibold text-peacock-600 transition-all group-hover:gap-2">
          Discover Story <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Dance Card
// ─────────────────────────────────────────────
export function DanceCard({ name, origin, state, description, image, onWatch }: { name: string; origin: string; state: string; description: string; image: string; onWatch?: () => void }) {
  return (
    <motion.div
      onClick={onWatch}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl card-shadow sm:w-72"
    >
      <div className="relative h-80 overflow-hidden">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="mb-2 inline-block rounded-full bg-saffron-500/90 px-2.5 py-0.5 text-xs font-semibold text-white">
            {state}
          </span>
          <h3 className="text-xl font-bold text-white text-shadow-md">{name}</h3>
          <p className="text-xs text-cream-200/80">{origin}</p>
          <p className="mt-2 line-clamp-2 text-sm text-cream-100/90">{description}</p>
          <button
            onClick={onWatch}
            className="mt-3 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
          >
            <Play className="h-4 w-4 fill-white" /> Watch Performance
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Music Card
// ─────────────────────────────────────────────
export function MusicCard({ name, region, instruments, description, image, onListen }: { name: string; region: string; instruments: string; description: string; image: string; onListen?: () => void }) {
  return (
    <motion.div
      onClick={onListen}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-royal-500 to-royal-700 p-5 text-white card-shadow sm:w-72"
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <Music className="absolute right-4 top-4 h-8 w-8 text-white/20" />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="mt-1 text-sm text-cream-200/80">{region}</p>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
        <Sparkles className="h-3 w-3" /> {instruments}
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-cream-100/85">{description}</p>
      <button
        onClick={onListen}
        className="mt-4 flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/30"
      >
        <Play className="h-4 w-4 fill-white" /> Watch / Listen
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Food Card
// ─────────────────────────────────────────────
export function FoodCard({ name, origin, description, whereToTry, image, onOpen }: { name: string; origin: string; description: string; whereToTry: string; image: string; onOpen?: () => void }) {
  return (
    <motion.div
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-cream-100/90 px-2.5 py-1 text-xs font-semibold text-saffron-700">
          <UtensilsCrossed className="h-3 w-3" /> {origin}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-ink-900">{name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-700/75">{description}</p>
        <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-saffron-50 px-3 py-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron-500" />
          <p className="text-xs text-ink-700/80"><span className="font-semibold">Where to try:</span> {whereToTry}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Restaurant Card
// ─────────────────────────────────────────────
export function RestaurantCard({ name, city, cuisine, rating, priceRange, image, description, onOpen }: { name: string; city: string; cuisine: string; rating: number; priceRange: string; image: string; description: string; onOpen?: () => void }) {
  return (
    <motion.div
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow"
    >
      <div className="flex">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden sm:h-32 sm:w-32">
          <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-ink-900">{name}</h3>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-mustard-100 px-2 py-0.5 text-xs font-bold text-mustard-700">
              <Star className="h-3 w-3 fill-mustard-500 text-mustard-500" /> {rating}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-700/70">
            <MapPin className="h-3 w-3" /> {city}
          </p>
          <p className="mt-0.5 text-xs font-medium text-peacock-600">{cuisine} · {priceRange}</p>
          <p className="mt-1.5 line-clamp-2 text-xs text-ink-700/70">{description}</p>
          <button className="mt-2 text-xs font-semibold text-saffron-600 transition-all group-hover:underline">
            View Place →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Event Card
// ─────────────────────────────────────────────
export function EventCard({ name, location, date, category, image, description, onOpen }: { name: string; location: string; date: string; category: string; image: string; description: string; onOpen?: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl card-shadow sm:w-80"
      onClick={onOpen}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-saffron-500 px-2.5 py-1 text-xs font-bold text-white">
          {category}
        </span>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-semibold text-mustard-300">{date}</p>
          <h3 className="text-lg font-bold text-white text-shadow-md">{name}</h3>
          <p className="text-xs text-cream-200/80">{location}</p>
        </div>
      </div>
      <div className="bg-ink-900 p-4">
        <p className="line-clamp-2 text-sm text-cream-200/80">{description}</p>
        <button className="mt-2 flex items-center gap-1 text-sm font-semibold text-saffron-400 transition-all group-hover:gap-2">
          Explore Event <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// State Card (for "Popular States" grid)
// ─────────────────────────────────────────────
export function StateCard({ state, onOpen }: { state: { id: string; name: string; tagline: string; heroImage: string; color: string; highlight: string }; onOpen: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl card-shadow"
      onClick={onOpen}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={state.heroImage} alt={state.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: state.color }}
        />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-extrabold text-white text-shadow-md">{state.name}</h3>
          <p className="text-xs italic text-cream-200/85">"{state.tagline}"</p>
          <p className="mt-1.5 text-xs text-cream-200/70">{state.highlight}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Trip Card (saved trips)
// ─────────────────────────────────────────────
export function TripCard({ trip, onPlan, onRemove }: { trip: { id: string; stateName: string; city: string; place: string; image: string }; onPlan: () => void; onRemove: () => void }) {
  const { toggleTrip, isTripSaved } = useApp();
  const saved = isTripSaved(trip.id);

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative w-72 shrink-0 overflow-hidden rounded-2xl bg-cream-100 card-shadow sm:w-80"
    >
      <div className="relative h-40 overflow-hidden">
        <img src={trip.image} alt={trip.place} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
        <button
          onClick={onRemove}
          aria-label="Remove trip"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/40 text-white backdrop-blur-sm transition-all hover:bg-maroon-500"
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-saffron-500 text-saffron-500' : ''}`} />
        </button>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs text-cream-200/80">{trip.stateName}</p>
          <h3 className="text-lg font-bold text-white text-shadow-md">{trip.city}</h3>
          <p className="text-xs text-cream-200/70">{trip.place}</p>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={onPlan}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95"
        >
          Plan Trip <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Reel Card (vertical feed item)
// ─────────────────────────────────────────────
export function ReelCard({ reel, isActive }: { reel: { id: string; title: string; creator: string; avatar: string; city: string; place: string; category: string; thumbnail: string; likes: number; comments: number; saves: number; caption: string; hashtags: string[] }; isActive: boolean }) {
  const { toggleLike, isLiked } = useApp();
  const liked = isLiked(reel.id);
  const [localLikes, setLocalLikes] = useState(reel.likes);

  const handleLike = () => {
    toggleLike({ id: reel.id, type: 'reel', title: reel.title });
    setLocalLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <div className="reel-item relative flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full max-w-md overflow-hidden rounded-3xl bg-ink-900">
        <img src={reel.thumbnail} alt={reel.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/30" />

        {/* Right action bar */}
        <div className="absolute bottom-24 right-3 flex flex-col items-center gap-4 z-10">
          <ReelAction icon={Heart} active={liked} onClick={handleLike} label={formatCount(localLikes)} />
          <ReelAction icon={Sparkles} label={formatCount(reel.comments)} />
          <ReelAction icon={Bookmark} label={formatCount(reel.saves)} />
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-16 p-4">
          <div className="mb-2 flex items-center gap-2">
            <img src={reel.avatar} alt={reel.creator} className="h-8 w-8 rounded-full border-2 border-white/50" />
            <span className="text-sm font-semibold text-white">{reel.creator}</span>
          </div>
          <p className="text-sm text-white text-shadow-md">{reel.caption}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
              <MapPin className="h-2.5 w-2.5" /> {reel.city}
            </span>
            {reel.hashtags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-saffron-300">{tag}</span>
            ))}
          </div>
        </div>

        {/* Play indicator */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
              <Play className="h-7 w-7 fill-white text-white" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ReelAction({ icon: Icon, active, onClick, label }: { icon: typeof Heart; active?: boolean; onClick?: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <div className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm transition-all active:scale-90 ${active ? 'bg-saffron-500/30' : 'bg-white/15 hover:bg-white/25'}`}>
        <Icon className={`h-5 w-5 text-white ${active ? 'fill-saffron-500 text-saffron-500' : ''}`} />
      </div>
      <span className="text-xs font-semibold text-white text-shadow-md">{label}</span>
    </button>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// useState import needed for ReelCard
import { useState } from 'react';
