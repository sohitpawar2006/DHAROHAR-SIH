export type Place = {
  id: string;
  name: string;
  city: string;
  stateId: string;
  image: string;
  description: string;
  significance: string;
  category: 'heritage' | 'spiritual' | 'nature' | 'monument' | 'palace' | 'temple' | 'fort';
};

export type Restaurant = {
  id: string;
  name: string;
  city: string;
  stateId: string;
  cuisine: string;
  rating: number;
  priceRange: '₹' | '₹₹' | '₹₹₹';
  image: string;
  description: string;
};

export type EventItem = {
  id: string;
  name: string;
  location: string;
  stateId: string;
  date: string;
  month: string;
  category: string;
  image: string;
  description: string;
};

export type Reel = {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  stateId: string;
  city: string;
  place: string;
  category: string;
  thumbnail: string;
  likes: number;
  comments: number;
  saves: number;
  caption: string;
  hashtags: string[];
};

export type PreservationItem = {
  id: string;
  title: string;
  state: string;
  category: string;
  description: string;
  status: 'Endangered' | 'Declining' | 'Reviving' | 'Preserved';
  image: string;
};

export type StateData = {
  id: string;
  name: string;
  capital: string;
  tagline: string;
  highlight: string;
  description: string;
  heroImage: string;
  color: string;
  // Simplified SVG path approximating state position on India map grid
  mapPath: string;
  mapLabelX: number;
  mapLabelY: number;
  places: Place[];
  traditions: { name: string; description: string; image: string; origin?: string }[];
  dances: { name: string; origin: string; description: string; image: string }[];
  music: { name: string; region: string; instruments: string; description: string; image: string }[];
  foods: { name: string; origin?: string; description: string; whereToTry: string; image: string }[];
  festivals: { name: string; description: string; month: string; image: string }[];
  artForms: { name: string; description: string; image: string; origin?: string }[];
  restaurants: Restaurant[];
  events: EventItem[];
};

// ─────────────────────────────────────────────
// Image URLs from Pexels (royalty-free)
// ─────────────────────────────────────────────
const IMG = {
  taj: 'https://images.pexels.com/photos/11948442/pexels-photo-11948442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tajDome: 'https://images.pexels.com/photos/37126715/pexels-photo-37126715.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  fortRaj: 'https://images.pexels.com/photos/33797765/pexels-photo-33797765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  fortRaj2: 'https://images.pexels.com/photos/33797768/pexels-photo-33797768.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kerala: 'https://images.pexels.com/photos/30778230/pexels-photo-30778230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  keralaBoat: 'https://images.pexels.com/photos/17928231/pexels-photo-17928231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kathakali: 'https://images.pexels.com/photos/8566097/pexels-photo-8566097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bharatanatyam: 'https://images.pexels.com/photos/36121661/pexels-photo-36121661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  odissiDance: 'https://images.pexels.com/photos/14602474/pexels-photo-14602474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  thali: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  thali2: 'https://images.pexels.com/photos/17223838/pexels-photo-17223838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  holi: 'https://images.pexels.com/photos/3913942/pexels-photo-3913942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  holi2: 'https://images.pexels.com/photos/14546935/pexels-photo-14546935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  goldenTemple: 'https://images.pexels.com/photos/18275890/pexels-photo-18275890.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  goldenTemple2: 'https://images.pexels.com/photos/5818954/pexels-photo-5818954.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  market: 'https://images.pexels.com/photos/38443540/pexels-photo-38443540.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  textiles: 'https://images.pexels.com/photos/14707117/pexels-photo-14707117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rugs: 'https://images.pexels.com/photos/29625818/pexels-photo-29625818.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  pottery: 'https://images.pexels.com/photos/37808898/pexels-photo-37808898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  pots: 'https://images.pexels.com/photos/34545851/pexels-photo-34545851.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  figurines: 'https://images.pexels.com/photos/37014220/pexels-photo-37014220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mysore: 'https://images.pexels.com/photos/34962788/pexels-photo-34962788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mysore2: 'https://images.pexels.com/photos/9882016/pexels-photo-9882016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  konark: 'https://images.pexels.com/photos/6040175/pexels-photo-6040175.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  konarkWheel: 'https://images.pexels.com/photos/31598958/pexels-photo-31598958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tabla: 'https://images.pexels.com/photos/18851187/pexels-photo-18851187.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tabla2: 'https://images.pexels.com/photos/13042108/pexels-photo-13042108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  harmonium: 'https://images.pexels.com/photos/18870063/pexels-photo-18870063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  varanasi: 'https://images.pexels.com/photos/38857186/pexels-photo-38857186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  varanasi2: 'https://images.pexels.com/photos/17869831/pexels-photo-17869831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  indiaGate: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  indiaGate2: 'https://images.pexels.com/photos/16952108/pexels-photo-16952108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hawaMahal: 'https://images.pexels.com/photos/19867647/pexels-photo-19867647.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hawaMahal2: 'https://images.pexels.com/photos/34086724/pexels-photo-34086724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hills: 'https://images.pexels.com/photos/13529693/pexels-photo-13529693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  river: 'https://images.pexels.com/photos/12435660/pexels-photo-12435660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  amberFort: 'https://images.pexels.com/photos/19149588/pexels-photo-19149588.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  humayun: 'https://images.pexels.com/photos/16348799/pexels-photo-16348799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  qutb: 'https://images.pexels.com/photos/20789999/pexels-photo-20789999.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mysoreTall: 'https://images.pexels.com/photos/25384443/pexels-photo-25384443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  varanasiTall: 'https://images.pexels.com/photos/18887175/pexels-photo-18887175.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

// Avatar gradients (CSS-based, no external images needed)
const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ff8c2a,c13a47,0ba884,3d5afe,f5b800&textColor=fff`;

export { IMG, avatar };
