import { motion } from 'framer-motion';
import { Compass, UtensilsCrossed, Sparkles, Shield, ArrowRight, Upload, Video, FileText, Bookmark, MapPin, Calendar } from 'lucide-react';
import { states, famousPlaces, allDances, allMusic, allFoods, allTraditions, allEvents, allRestaurants, preservationItems, getStateName } from '@/data/states';
import { useApp, type SavedTrip } from '@/context/AppContext';
import IndiaMap from '@/components/IndiaMap';
import { SectionHeader, HorizontalScroll } from '@/components/Section';
import { PlaceCard, CultureCard, DanceCard, MusicCard, FoodCard, RestaurantCard, EventCard, StateCard, TripCard } from '@/components/Cards';
import { useHappening } from '@/components/HappeningModal';
import { LotusMotif, PeacockMotif, MandalaMotif, DiyaMotif, TempleMotif } from '@/components/Decor';

type HomepageProps = {
  onSelectState: (stateId: string) => void;
  onOpenPlace: (placeId: string) => void;
  onOpenReels: () => void;
  onOpenUpload: () => void;
  onPlanTrip: (trip: SavedTrip) => void;
};

export default function Homepage({ onSelectState, onOpenPlace, onOpenReels, onOpenUpload, onPlanTrip }: HomepageProps) {
  const { savedTrips, removeTrip, addPoints, uploads } = useApp();
  const { open: openHappening } = useHappening();

  return (
    <div className="bg-cream-100">
      {/* ── Hero / Interactive Map ── */}
      <section className="relative overflow-hidden bg-folk-pattern px-4 pb-16 pt-24 sm:px-6">
        <PeacockMotif className="absolute right-4 top-24 h-24 w-24 text-peacock-500/15 animate-float-slow" />
        <LotusMotif className="absolute left-4 top-32 h-20 w-20 text-saffron-400/15 animate-float-medium" />
        <IndiaMap onSelectState={onSelectState} />
      </section>

      {/* ── Discover/Experience/Contribute/Preserve ── */}
      <section className="bg-cream-100 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="Explore India's Cultural Heart"
            subtitle="Discover, Experience, Contribute, and Preserve the heritage of the world's most diverse civilization."
            decorativeVariant="lotus"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Compass, title: 'Discover', desc: "Making India's cultural heritage accessible to every citizen.", bgClass: 'bg-saffron-100', textClass: 'text-saffron-600', barClass: 'bg-saffron-500' },
              { icon: Sparkles, title: 'Experience', desc: 'Explore places, food, music, dance, and traditions interactively.', bgClass: 'bg-peacock-100', textClass: 'text-peacock-600', barClass: 'bg-peacock-500' },
              { icon: Upload, title: 'Contribute', desc: 'Upload stories, photos, and videos to document culture.', bgClass: 'bg-maroon-100', textClass: 'text-maroon-600', barClass: 'bg-maroon-500' },
              { icon: Shield, title: 'Preserve', desc: "Building a digital repository of India's diverse heritage.", bgClass: 'bg-royal-100', textClass: 'text-royal-600', barClass: 'bg-royal-500' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-cream-50 p-6 card-shadow transition-all hover:-translate-y-2 hover:card-shadow-lg"
              >
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${item.bgClass}`}>
                  <item.icon className={`h-6 w-6 ${item.textClass}`} />
                </div>
                <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-700/70">{item.desc}</p>
                <div className={`absolute bottom-0 left-0 h-1 w-full ${item.barClass} opacity-0 transition-opacity group-hover:opacity-100`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular States ── */}
      <section id="explore" className="bg-folk-pattern px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Popular States"
            subtitle="Ten states, a thousand stories. Start your journey from any corner of India."
            decorativeVariant="mandala"
            decorColor="#C13A47"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {states.map((state, i) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.08 }}
              >
                <StateCard state={state} onOpen={() => onSelectState(state.id)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Famous Places ── */}
      <section id="places" className="bg-cream-100 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Places That Tell India's Story"
            subtitle="From the Taj Mahal to Kerala's backwaters — monuments, temples, and wonders across the land."
            decorativeVariant="temple"
            decorColor="#3D5AFE"
          />
          <HorizontalScroll>
            {famousPlaces.map((p) => (
              <PlaceCard
                key={p.id}
                id={p.id}
                name={p.name}
                city={p.city}
                stateName={getStateName(p.stateId)}
                image={p.image}
                description={p.description}
                onOpen={() => onOpenPlace(p.id)}
              />
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ── Living Traditions ── */}
      <section id="culture" className="bg-folk-pattern px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Living Traditions"
            subtitle="Art forms and customs kept alive by generations of artisans, storytellers, and communities."
            decorativeVariant="warli"
            decorColor="#0BA884"
          />
          <HorizontalScroll>
            {allTraditions.map((t) => (
              <CultureCard key={t.name + t.stateId} name={t.name} state={t.stateName} description={t.description} image={t.image} onOpen={() => openHappening({ kind: 'tradition', name: t.name, place: t.stateName, image: t.image, description: t.description })} />
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ── India in Motion — Dance ── */}
      <section className="relative overflow-hidden bg-ink-900 px-4 py-16 sm:px-6">
        <MandalaMotif className="absolute right-4 top-4 h-32 w-32 text-saffron-500/10 animate-spin-slow" />
        <DiyaMotif className="absolute bottom-8 left-8 h-16 w-16 text-saffron-500/15" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <div className="mb-3 flex items-center justify-center gap-3 text-saffron-400">
              <div className="h-px w-12 bg-saffron-400/40" />
              <span className="text-lg">❉</span>
              <div className="h-px w-12 bg-saffron-400/40" />
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">India in Motion</h2>
            <p className="mt-3 max-w-2xl text-base text-cream-200/70 sm:text-lg">From Kathak to Bharatanatyam, Bhangra to Odissi — eight classical and folk dances that tell India's stories.</p>
          </div>
          <HorizontalScroll>
            {allDances.map((d) => (
              <DanceCard key={d.name + d.stateId} name={d.name} origin={d.origin} state={d.stateName} description={d.description} image={d.image} onWatch={() => openHappening({ kind: 'dance', name: d.name, place: d.stateName, image: d.image, description: d.description, extra: [{ label: 'Origin', value: d.origin }] })} />
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ── Sounds of India — Music ── */}
      <section className="bg-cream-100 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Sounds of India"
            subtitle="Classical ragas, mystic Baul songs, desert ballads — the musical soul of a civilization."
            decorativeVariant="tabla"
            decorColor="#3D5AFE"
          />
          <HorizontalScroll>
            {allMusic.map((m) => (
              <MusicCard key={m.name + m.stateId} name={m.name} region={m.region} instruments={m.instruments} description={m.description} image={m.image} onListen={() => openHappening({ kind: 'music', name: m.name, place: m.region, image: m.image, description: m.description, extra: [{ label: 'Instruments', value: m.instruments }] })} />
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ── Taste India — Food ── */}
      <section id="food" className="bg-folk-pattern px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Taste India"
            subtitle="Every dish carries a story — of royal kitchens, street corners, harvest festivals, and home hearths."
            decorativeVariant="lotus"
            decorColor="#C13A47"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allFoods.slice(0, 8).map((f, i) => (
              <motion.div
                key={f.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
              >
                <FoodCard name={f.name} origin={f.origin ?? ''} description={f.description} whereToTry={f.whereToTry} image={f.image} onOpen={() => openHappening({ kind: 'food', name: f.name, place: f.origin ?? '', image: f.image, description: f.description, extra: [{ label: 'Where to try', value: f.whereToTry }] })} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where Should We Eat? ── */}
      <section className="bg-cream-100 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Where Should We Eat?"
            subtitle="Sample restaurant data for prototype purposes — ratings shown are demo data, not real reviews."
            decorativeVariant="diya"
            decorColor="#F5B800"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allRestaurants.slice(0, 9).map((r) => (
              <RestaurantCard key={r.id} name={r.name} city={r.city} cuisine={r.cuisine} rating={r.rating} priceRange={r.priceRange} image={r.image} description={r.description} onOpen={() => openHappening({ kind: 'restaurant', name: r.name, place: r.city, image: r.image, description: r.description, extra: [{ label: 'Cuisine', value: r.cuisine }, { label: 'Price', value: r.priceRange }] })} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Happening Across India ── */}
      <section id="events" className="bg-folk-pattern px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Happening Across India"
            subtitle="Festivals, fairs, and cultural events you can experience across the country."
            decorativeVariant="mandala"
            decorColor="#FF8C2A"
          />
          <HorizontalScroll>
            {allEvents.map((e) => (
              <EventCard key={e.id} name={e.name} location={e.location} date={e.date} category={e.category} image={e.image} description={e.description} onOpen={() => openHappening({ kind: 'event', name: e.name, place: e.location, image: e.image, description: e.description, date: e.date, extra: [{ label: 'Category', value: e.category }] })} />
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ── Explore Reels ── */}
      <section className="relative overflow-hidden bg-ink-900 px-4 py-16 sm:px-6">
        <PeacockMotif className="absolute left-4 bottom-4 h-24 w-24 text-peacock-400/10 animate-float-slow" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-3 flex items-center gap-3 text-saffron-400">
              <div className="h-px w-12 bg-saffron-400/40" />
              <span className="text-lg">✦</span>
              <div className="h-px w-12 bg-saffron-400/40" />
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">Explore Reels</h2>
            <p className="mt-3 max-w-2xl text-base text-cream-200/70 sm:text-lg">Vertical short videos from travelers, creators, and culture enthusiasts across India.</p>
            <button onClick={onOpenReels} className="mt-5 flex items-center gap-2 rounded-full bg-saffron-500 px-6 py-3 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95">
              Open Reels Feed <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-10 text-center">
            <Video className="mx-auto h-10 w-10 text-white/40" />
            <p className="mt-3 text-sm font-semibold text-white">No videos posted yet</p>
            <p className="text-xs text-cream-200/60">Reels shared by the community will appear here.</p>
            <button onClick={onOpenUpload} className="mt-4 rounded-full bg-saffron-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-saffron-600">Post the first reel</button>
          </div>
        </div>
      </section>

      {/* ── Stories Worth Preserving ── */}
      <section className="bg-cream-100 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Stories Worth Preserving"
            subtitle="Lesser-known traditions, endangered folk arts, and vanishing crafts that deserve to be remembered."
            decorativeVariant="temple"
            decorColor="#A02E3A"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {preservationItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-cream-50 card-shadow"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white ${
                    item.status === 'Endangered' ? 'bg-maroon-500' :
                    item.status === 'Declining' ? 'bg-saffron-500' :
                    item.status === 'Reviving' ? 'bg-peacock-500' : 'bg-royal-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="chip bg-saffron-100 text-saffron-700"><Shield className="h-3 w-3" /> Cultural Preservation</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
                  <p className="text-xs text-ink-700/60">{item.state} · {item.category}</p>
                  <p className="mt-2 text-sm text-ink-700/75">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── India Through Your Eyes (UGC) ── */}
      <section className="bg-folk-pattern px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="India Through Your Eyes"
            subtitle="Photos, videos, and stories shared by our community of cultural explorers."
            decorativeVariant="warli"
            decorColor="#0BA884"
          />
          {uploads.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-peacock-200 bg-cream-50 p-10 text-center">
              <Upload className="mx-auto h-10 w-10 text-peacock-300" />
              <p className="mt-3 text-sm font-medium text-ink-700/70">Nothing shared yet.</p>
              <p className="text-xs text-ink-700/50">Be the first to post a photo, video, or story from your travels.</p>
              <button onClick={onOpenUpload} className="mt-4 btn-primary">Share something <ArrowRight className="h-4 w-4" /></button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {uploads.map((u) => (
                <div key={u.id} className="rounded-2xl bg-cream-50 p-4 card-shadow">
                  <span className="chip bg-peacock-100 text-peacock-700">{u.type === 'video' ? <Video className="h-3 w-3" /> : u.type === 'photo' ? <Sparkles className="h-3 w-3" /> : <FileText className="h-3 w-3" />} {u.type}</span>
                  <h3 className="mt-2 text-sm font-bold text-ink-900">{u.title}</h3>
                  <p className="text-xs text-ink-700/60 flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {u.place || u.city}</p>
                  <p className="mt-1 line-clamp-3 text-xs text-ink-700/75">{u.caption}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── My Next Trips ── */}
      <section id="trips" className="bg-cream-100 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="My Next Trips"
            subtitle="Places you've saved to visit. Plan your itinerary when you're ready to go."
            decorativeVariant="lotus"
            decorColor="#FF8C2A"
          />
          {savedTrips.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-10 text-center">
              <Bookmark className="mx-auto h-10 w-10 text-saffron-300" />
              <p className="mt-3 text-sm font-medium text-ink-700/70">No saved trips yet.</p>
              <p className="text-xs text-ink-700/50">Start exploring India and save places you want to visit.</p>
              <button onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })} className="mt-4 btn-primary">
                Start exploring India <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {savedTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onPlan={() => onPlanTrip(trip)}
                  onRemove={() => removeTrip(trip.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Help Preserve India's Stories (CTA) ── */}
      <section className="relative overflow-hidden bg-gradient-saffron px-4 py-20 sm:px-6">
        <MandalaMotif className="absolute -left-16 -top-16 h-64 w-64 text-white/8 animate-spin-slow" />
        <LotusMotif className="absolute bottom-8 right-8 h-20 w-20 text-white/15" />
        <div className="mx-auto max-w-3xl text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Help Preserve India's Stories</h2>
            <p className="mt-4 text-lg text-cream-200/90">Know a tradition, place or story that deserves to be remembered? Share it with India.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={onOpenUpload} className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-saffron-600 transition-all hover:scale-105 active:scale-95">
                <FileText className="h-5 w-5" /> Upload Story
              </button>
              <button onClick={onOpenUpload} className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95">
                <Upload className="h-5 w-5" /> Upload Photo
              </button>
              <button onClick={onOpenUpload} className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95">
                <Video className="h-5 w-5" /> Upload Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
