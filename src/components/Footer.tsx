import { Heart, Compass, UtensilsCrossed, Music, Video, Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { LotusMotif, MandalaMotif, PeacockMotif } from '@/components/Decor';

type FooterProps = {
  onNavigate: (view: string) => void;
  onOpenUpload: () => void;
};

export default function Footer({ onNavigate, onOpenUpload }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-cream-200">
      <MandalaMotif className="absolute -right-20 -top-20 h-64 w-64 text-saffron-500/8 animate-spin-slow" />
      <LotusMotif className="absolute left-8 top-8 h-16 w-16 text-saffron-500/15" />
      <PeacockMotif className="absolute bottom-8 right-8 h-20 w-20 text-peacock-400/15" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-saffron">
                <span className="font-devanagari text-2xl font-bold text-white">ध</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">DHAROHAR</div>
                <div className="text-[10px] uppercase tracking-widest text-saffron-400">Explore • Experience • Preserve</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-cream-200/60">
              An interactive journey through India's rich cultural heritage, traditions, dance, music, food and stories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-saffron-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'explore', label: 'Explore India', icon: Compass },
                { id: 'culture', label: 'Culture', icon: Sparkles },
                { id: 'food', label: 'Food', icon: UtensilsCrossed },
                { id: 'reels', label: 'Reels', icon: Video },
                { id: 'events', label: 'Events', icon: Calendar },
                { id: 'trips', label: 'My Trips', icon: MapPin },
              ].map((item) => (
                <li key={item.id}>
                  <button onClick={() => onNavigate(item.id)} className="flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400">
                    <item.icon className="h-3.5 w-3.5" /> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-saffron-400">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onOpenUpload} className="flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400"><Sparkles className="h-3.5 w-3.5" /> Upload Story</button></li>
              <li><button onClick={onOpenUpload} className="flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400"><Video className="h-3.5 w-3.5" /> Upload Video</button></li>
              <li><button onClick={onOpenUpload} className="flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400"><Heart className="h-3.5 w-3.5" /> Become a Contributor</button></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-saffron-400">About</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="text-cream-200/70 transition-colors hover:text-saffron-400">Our Mission</button></li>
              <li><button onClick={() => onNavigate('home')} className="text-cream-200/70 transition-colors hover:text-saffron-400">Cultural Preservation</button></li>
              <li><span className="text-cream-200/70">SIH 2026</span></li>
            </ul>
          </div>
        </div>

        {/* SIH banner */}
        <div className="mt-12 rounded-2xl bg-gradient-saffron p-5 text-center">
          <p className="text-sm font-semibold text-white">
            Built for Smart India Hackathon — Problem Statement 26197
          </p>
          <p className="mt-1 text-xs text-cream-200/80">
            Student Innovation — Ideas that showcase the rich cultural heritage and traditions of India
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream-200/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream-200/50">© 2026 DHAROHAR. Made with care for India's heritage.</p>
          <div className="flex gap-4 text-xs text-cream-200/50">
            <span>Discover</span><span>•</span><span>Experience</span><span>•</span><span>Contribute</span><span>•</span><span>Preserve</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
