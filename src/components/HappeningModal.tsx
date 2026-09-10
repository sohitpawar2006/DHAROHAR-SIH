import { createContext, useContext, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CalendarDays, MapPin, Sparkles, Info } from 'lucide-react';

export type HappeningKind = 'event' | 'dance' | 'music' | 'food' | 'tradition' | 'art' | 'restaurant';

export type Happening = {
  kind: HappeningKind;
  name: string;
  place?: string;
  image: string;
  description: string;
  date?: string;
  extra?: { label: string; value: string }[];
};

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** Works out when something happens and whether it is on right now. */
export function getTiming(h: Happening): { live: boolean; when: string; note: string } {
  const now = new Date();
  const monthName = MONTHS[now.getMonth()] as string;

  if (h.kind === 'event' && h.date) {
    const lower = h.date.toLowerCase();
    const live = lower.includes(monthName);
    const hint = /fair|mela/i.test(h.name) ? 'Mornings from about 8 AM, busiest after 4 PM.'
      : /night|deepa|diwali|lantern|light/i.test(h.name) ? 'Comes alive after sunset, around 6–10 PM.'
      : 'Main gatherings usually run from about 5 PM to 10 PM.';
    return {
      live,
      when: live ? `Happening now — ${h.date}` : h.date,
      note: hint,
    };
  }

  if (h.kind === 'restaurant') {
    return { live: true, when: 'Open most days, roughly 11 AM – 11 PM', note: 'Timings change by season and day — do call ahead before you go.' };
  }

  if (h.kind === 'food') {
    return { live: true, when: 'Available round the year', note: 'Best enjoyed fresh — mornings for breakfast plates, 6–9 PM for evening street stalls.' };
  }

  if (h.kind === 'dance' || h.kind === 'music') {
    return {
      live: false,
      when: 'Happens casually here — exact date not known',
      note: 'Most performances are put on during festivals and weddings, usually in the evening after 6 PM. Cultural centres in the region also hold shows through the year.',
    };
  }

  return {
    live: false,
    when: 'Happens casually here — exact date not known',
    note: 'This is a living everyday tradition rather than a scheduled show. Ask locals or a nearby craft centre when you visit — they will point you to the next one.',
  };
}

type Ctx = { open: (h: Happening) => void };
const HappeningContext = createContext<Ctx>({ open: () => {} });
export const useHappening = () => useContext(HappeningContext);

export function HappeningProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<Happening | null>(null);
  const timing = item ? getTiming(item) : null;

  return (
    <HappeningContext.Provider value={{ open: setItem }}>
      {children}
      <AnimatePresence>
        {item && timing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-end justify-center bg-ink-900/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setItem(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream-50 scrollbar-thin sm:rounded-3xl"
            >
              <div className="relative h-52">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
                <button
                  onClick={() => setItem(null)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/50 text-white backdrop-blur-sm transition-colors hover:bg-ink-900/70"
                >
                  <X className="h-4 w-4" />
                </button>
                {timing.live && (
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-maroon-500 px-3 py-1 text-xs font-bold text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> LIVE NOW
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-extrabold text-white">{item.name}</h3>
                  {item.place && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-cream-200/80">
                      <MapPin className="h-3.5 w-3.5" /> {item.place}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className={`rounded-2xl p-4 ${timing.live ? 'bg-maroon-50' : 'bg-saffron-50'}`}>
                  <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                    {timing.live ? <Sparkles className="h-4 w-4 text-maroon-500" /> : <CalendarDays className="h-4 w-4 text-saffron-600" />}
                    {timing.when}
                  </p>
                  <p className="mt-1.5 flex items-start gap-2 text-sm text-ink-700/75">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-700/50" /> {timing.note}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-ink-700/80">{item.description}</p>

                {item.extra && item.extra.length > 0 && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {item.extra.filter((x) => x.value).map((x) => (
                      <div key={x.label} className="rounded-xl bg-cream-100 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-700/50">{x.label}</p>
                        <p className="text-sm font-medium text-ink-900">{x.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="flex items-start gap-2 rounded-xl bg-cream-100 p-3 text-xs text-ink-700/60">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Timings are indicative and can shift with the local calendar and weather.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </HappeningContext.Provider>
  );
}
