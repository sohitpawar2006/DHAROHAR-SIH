import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, UtensilsCrossed, Sparkles, Calendar, Clock, Navigation, Plus, CheckCircle2 } from 'lucide-react';
import { getStateById } from '@/data/states';

type TripPlannerProps = {
  trip: { id: string; stateId: string; stateName: string; city: string; place: string; image: string } | null;
  onClose: () => void;
};

type Day = {
  day: number;
  title: string;
  activities: { time: string; icon: typeof MapPin; text: string }[];
};

export default function TripPlanner({ trip, onClose }: TripPlannerProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [ref, setRef] = useState('');

  useEffect(() => {
    setConfirmed(false);
    setRef('DH' + Math.random().toString(36).slice(2, 7).toUpperCase());
  }, [trip?.id]);

  if (!trip) return null;
  const state = getStateById(trip.stateId);

  const selectedPlace = state?.places.find((place) => place.name === trip.place);
  const nearbyPlaces = state?.places.filter((place) => place.name !== trip.place).slice(0, 2) ?? [];

  // Every itinerary is anchored to the place the visitor selected.
  const itinerary: Day[] = [
    {
      day: 1,
      title: 'Arrival & Heritage',
      activities: [
        { time: 'Morning', icon: MapPin, text: `Arrive at ${selectedPlace?.name ?? trip.place} and explore its main sights` },
        { time: 'Afternoon', icon: MapPin, text: selectedPlace?.significance ?? `Discover the story of ${trip.place}` },
        { time: 'Evening', icon: UtensilsCrossed, text: `Try ${state?.foods[0]?.name ?? 'local cuisine'} for dinner` },
      ],
    },
    {
      day: 2,
      title: 'Culture & Food',
      activities: [
        { time: 'Morning', icon: MapPin, text: nearbyPlaces[0] ? `Visit nearby ${nearbyPlaces[0].name}` : `Take a guided walk around ${trip.place}` },
        { time: 'Afternoon', icon: UtensilsCrossed, text: `Lunch: ${state?.foods[1]?.name ?? 'regional specialty'}` },
        { time: 'Evening', icon: Sparkles, text: `Watch ${state?.dances[0]?.name ?? 'folk dance'} performance` },
      ],
    },
    {
      day: 3,
      title: 'Markets & Crafts',
      activities: [
        { time: 'Morning', icon: MapPin, text: nearbyPlaces[1] ? `Explore ${nearbyPlaces[1].name}` : `Explore ${trip.city}'s local market` },
        { time: 'Afternoon', icon: Sparkles, text: `Discover ${state?.artForms[0]?.name ?? 'local art form'}` },
        { time: 'Evening', icon: Calendar, text: state?.festivals[0] ? `${state.festivals[0].name} (seasonal)` : 'Cultural museum visit' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {trip && (
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
            className="relative w-full max-w-2xl overflow-hidden rounded-none bg-cream-100 shadow-2xl sm:rounded-3xl"
          >
            {/* Hero */}
            <div className="relative h-48">
              <img src={trip.image} alt={trip.place} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 to-transparent" />
              <button onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/40 text-white backdrop-blur-sm hover:bg-ink-900/60">
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sm text-cream-200/80">{trip.stateName}</p>
                <h2 className="text-3xl font-extrabold text-white text-shadow-lg">3 Days in {trip.city}</h2>
                <p className="text-sm text-cream-200/70">Featuring {trip.place}</p>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[55vh] overflow-y-auto scrollbar-thin p-6">
              {/* Summary chips */}
              <div className="mb-6 flex flex-wrap gap-2">
                <Chip icon={Clock} text="3 Days" />
                 <Chip icon={MapPin} text={trip.place} />
                <Chip icon={UtensilsCrossed} text={`${state?.foods.length ?? 0} Foods`} />
                <Chip icon={Sparkles} text={`${state?.traditions.length ?? 0} Experiences`} />
              </div>

              <p className="mb-6 text-sm text-ink-700/70">
                 A place-first itinerary centred on {trip.place}. Adjust based on your travel dates and seasonal events.
              </p>

              {/* Timeline */}
              <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-saffron-200">
                {itinerary.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: day.day * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-saffron-500 text-sm font-bold text-white shadow-md">
                      {day.day}
                    </div>
                    <h3 className="text-lg font-bold text-ink-900">Day {day.day} — {day.title}</h3>
                    <div className="mt-2 space-y-2">
                      {day.activities.map((act, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-xl bg-cream-50 p-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-saffron-100">
                            <act.icon className="h-4 w-4 text-saffron-600" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-saffron-600">{act.time}</div>
                            <div className="text-sm text-ink-800">{act.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Events */}
              {state && state.events.length > 0 && (
                <div className="mt-6 rounded-2xl bg-peacock-50 p-4">
                  <h3 className="mb-2 flex items-center gap-2 font-bold text-peacock-700">
                    <Calendar className="h-5 w-5" /> Events Happening
                  </h3>
                  {state.events.map((e) => (
                    <div key={e.id} className="flex items-center justify-between py-1.5 text-sm">
                      <span className="font-medium text-ink-800">{e.name}</span>
                      <span className="text-peacock-600">{e.date}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              {confirmed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl bg-peacock-50 p-5 text-center"
                >
                  <CheckCircle2 className="mx-auto h-10 w-10 text-peacock-500" />
                  <h3 className="mt-2 text-lg font-bold text-ink-900">Itinerary confirmed!</h3>
                  <p className="mt-1 text-sm text-ink-700/70">
                    Your 3-day plan for {trip.city} is locked in. Booking ref{' '}
                    <span className="font-mono font-bold text-peacock-700">{ref}</span>
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => setConfirmed(false)}
                      className="rounded-full border border-peacock-300 px-4 py-2 text-sm font-semibold text-peacock-700 transition-all hover:bg-peacock-100 active:scale-95"
                    >
                      Edit plan
                    </button>
                    <button
                      onClick={onClose}
                      className="rounded-full bg-peacock-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-peacock-600 active:scale-95"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setConfirmed(true)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-5 py-3 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95"
                >
                  <Navigation className="h-5 w-5" /> Confirm This Itinerary
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Chip({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-100 px-3 py-1.5 text-sm font-medium text-saffron-700">
      <Icon className="h-3.5 w-3.5" /> {text}
    </span>
  );
}
