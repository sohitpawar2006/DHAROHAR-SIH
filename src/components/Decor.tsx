// Decorative folk-art inspired SVG elements for the DHAROHAR identity.
// Used subtly around section headings and cards.

type Props = { className?: string };

// Warli-inspired dancer
export function WarliDancer({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 60 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="30" cy="8" r="5" fill="currentColor" />
      <path d="M30 13 L30 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 20 L15 12 M30 20 L45 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 35 L20 55 M30 35 L40 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 55 L15 70 M40 55 L45 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Peacock silhouette
export function PeacockMotif({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="35" r="6" fill="currentColor" opacity="0.3" />
      <path d="M26 35 Q40 20 55 25 Q70 30 68 45 Q66 55 55 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M20 41 L20 55 M17 41 L17 53 M23 41 L23 53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="55" cy="33" r="4" fill="currentColor" opacity="0.15" />
      <circle cx="63" cy="38" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="68" cy="44" r="2.5" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

// Diya (oil lamp)
export function DiyaMotif({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 24 Q20 32 32 24 L28 28 Q20 34 12 28 Z" fill="currentColor" opacity="0.4" />
      <ellipse cx="20" cy="24" rx="14" ry="5" fill="currentColor" opacity="0.2" />
      <path d="M20 22 Q17 14 20 6 Q23 14 20 22" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );
}

// Mandala circular decoration
export function MandalaMotif({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="60" cy="60" r="14" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line key={i} x1={60} y1={60} x2={+(60 + Math.cos(a) * 56).toFixed(3)} y2={+(60 + Math.sin(a) * 56).toFixed(3)} stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <ellipse key={i} cx={+(60 + Math.cos(a) * 35).toFixed(3)} cy={+(60 + Math.sin(a) * 35).toFixed(3)} rx="10" ry="5" transform={`rotate(${i * 45} ${(60 + Math.cos(a) * 35).toFixed(3)} ${(60 + Math.sin(a) * 35).toFixed(3)})`} stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        );
      })}
    </svg>
  );
}

// Temple silhouette
export function TempleMotif({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 60 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 2 L30 12 M27 5 L33 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M22 14 L30 12 L38 14 L36 20 L24 20 Z" fill="currentColor" opacity="0.3" />
      <path d="M20 20 L40 20 L38 26 L22 26 Z" fill="currentColor" opacity="0.25" />
      <rect x="24" y="26" width="12" height="20" fill="currentColor" opacity="0.2" />
      <path d="M26 30 L26 42 M34 30 L34 42" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}

// Lotus
export function LotusMotif({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 60 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 38 Q15 30 10 18 Q18 22 30 28 Q42 22 50 18 Q45 30 30 38" fill="currentColor" opacity="0.15" />
      <path d="M30 34 Q22 20 20 8 Q26 16 30 24 Q34 16 40 8 Q38 20 30 34" fill="currentColor" opacity="0.25" />
      <path d="M30 32 Q30 18 30 6" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Decorative border divider with folk-art dots and lines
export function FolkDivider({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 200 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0" y1="10" x2="70" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="75" cy="10" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="85" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
      <path d="M95 10 Q100 3 105 10 Q110 17 115 10" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
      <circle cx="115" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="125" cy="10" r="2.5" fill="currentColor" opacity="0.4" />
      <line x1="130" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Camel silhouette
export function CamelMotif({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 60 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 35 L5 22 Q8 18 12 20 L15 15 Q18 10 22 14 L25 20 L35 18 Q40 12 44 16 L44 20 L52 22 L52 35" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 35 L12 28 M20 35 L20 26 M44 35 L44 26 M52 35 L52 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Tabla instrument
export function TablaMotif({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 50 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="15" cy="12" rx="10" ry="4" fill="currentColor" opacity="0.2" />
      <path d="M5 12 Q5 28 15 32 Q25 28 25 12" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.1" />
      <ellipse cx="35" cy="10" rx="12" ry="4" fill="currentColor" opacity="0.2" />
      <path d="M23 10 Q23 30 35 34 Q47 30 47 10" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

// Floating decorative cluster — picks motifs randomly
export function FloatingDecor({ className = '', variant = 'lotus' }: Props & { variant?: 'lotus' | 'peacock' | 'diya' | 'mandala' | 'temple' | 'camel' | 'tabla' | 'warli' }) {
  const Motif = {
    lotus: LotusMotif,
    peacock: PeacockMotif,
    diya: DiyaMotif,
    mandala: MandalaMotif,
    temple: TempleMotif,
    camel: CamelMotif,
    tabla: TablaMotif,
    warli: WarliDancer,
  }[variant];

  return <Motif className={className} />;
}
