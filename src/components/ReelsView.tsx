import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ListFilter as Filter, ChevronDown, Video } from 'lucide-react';
import { reels, states } from '@/data/states';
import { ReelCard } from '@/components/Cards';

type ReelsViewProps = {
  open: boolean;
  onClose: () => void;
};

export default function ReelsView({ open, onClose }: ReelsViewProps) {
  const [filter, setFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'all' ? reels : reels.filter((r) => r.stateId === filter || r.city === filter);

  // Track which reel is centered
  useEffect(() => {
    if (!open || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number((entry.target as HTMLElement).dataset['index']);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: [0.6] }
    );
    containerRef.current.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [open, filter]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] bg-ink-900"
        >
          {/* Header */}
          <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
              <div className="text-white">
                <h2 className="text-lg font-bold">Explore Reels</h2>
                <p className="text-xs text-cream-200/60">{filtered.length} videos</p>
              </div>
            </div>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Filter className="h-4 w-4" />
              {filter === 'all' ? 'All India' : states.find((s) => s.id === filter)?.name || filter}
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Filter dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-4 top-20 z-40 max-h-80 w-56 overflow-y-auto rounded-2xl bg-cream-100 p-2 shadow-2xl scrollbar-thin"
              >
                <button
                  onClick={() => { setFilter('all'); setShowFilters(false); }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    filter === 'all' ? 'bg-saffron-100 text-saffron-700' : 'text-ink-800 hover:bg-saffron-50'
                  }`}
                >
                  All India
                </button>
                <div className="my-1 h-px bg-saffron-200/40" />
                {states.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setFilter(s.id); setShowFilters(false); }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      filter === s.id ? 'bg-saffron-100 text-saffron-700' : 'text-ink-800 hover:bg-saffron-50'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reels feed */}
          <div
            ref={containerRef}
            className="reels-container h-full overflow-y-auto scrollbar-hide"
          >
            {filtered.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center">
                <div className="px-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                    <Video className="h-8 w-8 text-white/40" />
                  </div>
                  <p className="text-lg font-semibold text-white">No videos posted yet</p>
                  <p className="mt-1 text-sm text-cream-200/60">
                    {filter === 'all'
                      ? 'Be the first to share a reel from your corner of India.'
                      : 'Nothing from this state yet — try All India.'}
                  </p>
                  {filter !== 'all' && (
                    <button onClick={() => setFilter('all')} className="mt-4 rounded-full bg-saffron-500 px-5 py-2 text-sm font-semibold text-white">
                      Show All India
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filtered.map((reel, idx) => (
                <div
                  key={reel.id}
                  data-index={idx}
                  className="h-screen w-full"
                >
                  <ReelCard reel={reel} isActive={idx === activeIndex} />
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
