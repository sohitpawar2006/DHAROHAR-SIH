import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, User, Menu, X, Compass, Heart, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useApp } from '@/context/AppContext';
import { states, famousPlaces, allDances, allFoods, allTraditions } from '@/data/states';

type NavbarProps = {
  onNavigate: (view: string, payload?: unknown) => void;
  onOpenSearch: () => void;
  onOpenUpload: () => void;
};

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore India' },
  { id: 'culture', label: 'Culture' },
  { id: 'food', label: 'Food' },
  { id: 'reels', label: 'Reels' },
  { id: 'events', label: 'Events' },
  { id: 'trips', label: 'My Trips' },
];

export default function Navbar({ onNavigate, onOpenSearch, onOpenUpload }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { points, profile } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass card-shadow' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 transition-transform hover:scale-105">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-saffron">
              <span className="font-devanagari text-xl font-bold text-white">ध</span>
              <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-peacock-400 ring-2 ring-cream-100" />
            </div>
            <div className="text-left">
              <div className={`text-lg font-extrabold leading-none tracking-tight ${scrolled ? 'text-ink-900' : 'text-ink-900'}`}>
                DHAROHAR
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-saffron-600">
                Explore • Experience • Preserve
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-800 transition-all duration-200 hover:bg-saffron-100/70 hover:text-saffron-700"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition-all hover:bg-saffron-100/70 active:scale-90"
            >
              <Search className="h-5 w-5" />
            </button>

            {profile && (
              <div className="hidden items-center gap-1.5 rounded-full bg-saffron-100/80 px-3 py-1.5 sm:flex">
                <Sparkles className="h-4 w-4 text-saffron-600" />
                <span className="text-sm font-bold text-saffron-700">{points}</span>
              </div>
            )}

            <button
              onClick={onOpenUpload}
              className="hidden items-center gap-1.5 rounded-full bg-saffron-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-saffron-500/30 transition-all hover:bg-saffron-600 hover:shadow-lg active:scale-95 sm:flex"
            >
              <Plus className="h-4 w-4" />
              Contribute
            </button>

            {profile ? (
              <button
                onClick={() => onNavigate('profile')}
                aria-label="Profile"
                className="flex h-10 items-center gap-2 rounded-full bg-ink-900 pl-1 pr-1 text-cream-100 transition-all hover:scale-105 active:scale-95 sm:pr-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron-500 text-sm font-bold text-white">
                  {(profile.full_name || profile.username || 'U').charAt(0).toUpperCase()}
                </span>
                <span className="hidden text-sm font-semibold sm:block">@{profile.username}</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-sm font-semibold text-cream-100 transition-all hover:scale-105 active:scale-95"
              >
                <User className="h-4 w-4" /> Sign in
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition-all hover:bg-saffron-100/70 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-ink-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-72 flex-col bg-cream-100 p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xl font-extrabold text-ink-900">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-saffron-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileOpen(false);
                    }}
                    className="rounded-xl px-4 py-3 text-left text-base font-medium text-ink-800 transition-colors hover:bg-saffron-100"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => { onOpenUpload(); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-2 rounded-full bg-saffron-500 px-4 py-3 font-semibold text-white"
                >
                  <Plus className="h-5 w-5" /> Contribute
                </button>
                <button
                  onClick={() => { onNavigate('profile'); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-ink-900/15 px-4 py-3 font-semibold text-ink-800"
                >
                  <User className="h-5 w-5" /> Profile
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────
// Global Search overlay
// ─────────────────────────────────────────────
type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (view: string, payload?: unknown) => void;
};

export function SearchOverlay({ open, onClose, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery('');
  }, [open]);

  const q = query.toLowerCase().trim();
  const results = q
    ? {
        states: states.filter((s) => s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q)).slice(0, 3),
        places: famousPlaces.filter((p) => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)).slice(0, 5),
        dances: allDances.filter((d) => d.name.toLowerCase().includes(q)).slice(0, 3),
        foods: allFoods.filter((f) => f.name.toLowerCase().includes(q) || (f.origin ?? '').toLowerCase().includes(q)).slice(0, 4),
        traditions: allTraditions.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 3),
      }
    : null;

  const hasResults = results && Object.values(results).some((arr) => arr.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink-900/50 p-4 pt-24 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-cream-100 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-saffron-200/50 px-5 py-4">
              <Search className="h-5 w-5 text-saffron-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a place, tradition, food, dance or story..."
                className="flex-1 bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-700/40"
              />
              <button onClick={onClose} className="rounded-full p-1.5 text-ink-700 hover:bg-saffron-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin p-4">
              {!results && (
                <div className="px-3 py-8 text-center">
                  <p className="text-sm text-ink-700/60">Try searching for "Taj Mahal", "Bhangra", "Rajasthan food", "Madhubani"...</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['Taj Mahal', 'Bhangra', 'Kerala festivals', 'Warli Art', 'Mysore Palace'].map((s) => (
                      <button key={s} onClick={() => setQuery(s)} className="chip bg-saffron-100 text-saffron-700 hover:bg-saffron-200">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results && !hasResults && (
                <div className="px-3 py-8 text-center text-sm text-ink-700/60">
                  No results for "{query}". Try another search.
                </div>
              )}

              {results && hasResults && (
                <div className="space-y-4">
                  {results.states.length > 0 && (
                    <SearchGroup title="States" items={results.states.map((s) => ({ id: s.id, label: s.name, sub: s.tagline, icon: Compass }))} onSelect={(id) => { onNavigate('state', id); onClose(); }} />
                  )}
                  {results.places.length > 0 && (
                    <SearchGroup title="Places" items={results.places.map((p) => ({ id: p.id, label: p.name, sub: `${p.city}, ${p.stateId}`, icon: Heart }))} onSelect={(id) => { onNavigate('place', id); onClose(); }} />
                  )}
                  {results.dances.length > 0 && (
                    <SearchGroup title="Dance" items={results.dances.map((d) => ({ id: d.stateId, label: d.name, sub: d.stateName, icon: Sparkles }))} onSelect={(id) => { onNavigate('state', id); onClose(); }} />
                  )}
                  {results.foods.length > 0 && (
                    <SearchGroup title="Food" items={results.foods.map((f) => ({ id: f.stateId, label: f.name, sub: f.origin ?? '', icon: Heart }))} onSelect={(id) => { onNavigate('state', id); onClose(); }} />
                  )}
                  {results.traditions.length > 0 && (
                    <SearchGroup title="Traditions" items={results.traditions.map((t) => ({ id: t.stateId, label: t.name, sub: t.stateName, icon: Sparkles }))} onSelect={(id) => { onNavigate('state', id); onClose(); }} />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchGroup({ title, items, onSelect }: { title: string; items: { id: string; label: string; sub: string; icon: typeof Compass }[]; onSelect: (id: string) => void }) {
  return (
    <div>
      <h4 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-saffron-600">{title}</h4>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id + item.label}
            onClick={() => onSelect(item.id)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-saffron-100/60"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron-100">
              <item.icon className="h-4 w-4 text-saffron-600" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-ink-900">{item.label}</div>
              <div className="truncate text-xs text-ink-700/60">{item.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
