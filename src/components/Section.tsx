import { useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SectionWrapperProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  decorativeVariant?: 'lotus' | 'peacock' | 'diya' | 'mandala' | 'temple' | 'camel' | 'tabla' | 'warli';
  decorColor?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, decorativeVariant, decorColor, action }: Omit<SectionWrapperProps, 'children' | 'id'>) {
  return (
    <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
      {/* will be used with decorative elements */}
      {decorativeVariant && (
        <div className="mb-3 flex items-center gap-3" style={{ color: decorColor || '#FF8C2A' }}>
          <DecorLine />
          <DecorIcon variant={decorativeVariant} color={decorColor || '#FF8C2A'} />
          <DecorLine />
        </div>
      )}
      <h2 className="section-title text-balance">{title}</h2>
      {subtitle && <p className="section-subtitle text-balance">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

function DecorLine() {
  return <div className="h-px w-12 bg-current opacity-30" />;
}

function DecorIcon({ variant, color }: { variant: string; color?: string }) {
  const icons: Record<string, string> = {
    lotus: '✿',
    peacock: '❖',
    diya: '◆',
    mandala: '❉',
    temple: '☖',
    camel: '◆',
    tabla: '◉',
    warli: '✦',
  };
  return <span className="text-lg" style={{ color: color || '#FF8C2A' }}>{icons[variant] || '✿'}</span>;
}

// Horizontal scroll container with arrow controls
export function HorizontalScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-100 text-ink-800 shadow-lg transition-all hover:bg-saffron-100 active:scale-90 md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={scrollRef}
        className="h-scroll scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {children}
      </div>
      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-100 text-ink-800 shadow-lg transition-all hover:bg-saffron-100 active:scale-90 md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

// Scroll-reveal wrapper
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return null; // placeholder — using framer-motion whileInView inline instead
}
