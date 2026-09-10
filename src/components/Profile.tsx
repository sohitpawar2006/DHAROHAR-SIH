import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import {
  Compass, UtensilsCrossed, Sparkles, Shield, ArrowRight, MapPin, Star, Bookmark,
  Video, Heart, Ticket, LogOut, Gift, Lock, User as UserIcon,
} from 'lucide-react';
import { useApp, REWARD_THRESHOLD, UPLOAD_POINTS, TRIP_POINTS, type SavedTrip } from '@/context/AppContext';
import { states, getStateName } from '@/data/states';

type ProfileProps = {
  onNavigate: (view: string) => void;
};

export default function Profile({ onNavigate }: ProfileProps) {
  const {
    profile, authLoading, signOut, points, exploredStates, savedTrips,
    likedItems, uploads, rewards, claimReward,
  } = useApp();
  const [picked, setPicked] = useState<string>('');

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-saffron-200 border-t-saffron-500" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4 pt-24">
        <div className="max-w-sm rounded-3xl bg-cream-50 p-10 text-center card-shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100">
            <UserIcon className="h-8 w-8 text-saffron-600" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-ink-900">Your profile awaits</h1>
          <p className="mt-2 text-sm text-ink-700/70">
            Sign in to collect points, save trips and share your own stories from across India.
          </p>
          <Link to="/auth" className="mt-6 btn-primary mx-auto">
            Sign in or create account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const explorePct = Math.round((exploredStates.size / states.length) * 100);
  const progressPct = Math.min(100, Math.round((points / REWARD_THRESHOLD) * 100));
  const canClaim = points >= REWARD_THRESHOLD && savedTrips.length > 0;

  const badges = [
    { id: 'heritage', icon: Compass, label: 'Heritage Explorer', desc: 'Explore 5+ states', bgClass: 'bg-saffron-100', textClass: 'text-saffron-600', earned: exploredStates.size >= 5 },
    { id: 'food', icon: UtensilsCrossed, label: 'Food Explorer', desc: 'Like 10+ things', bgClass: 'bg-peacock-100', textClass: 'text-peacock-600', earned: likedItems.length >= 10 },
    { id: 'culture', icon: Sparkles, label: 'Culture Keeper', desc: 'Share 3+ stories', bgClass: 'bg-maroon-100', textClass: 'text-maroon-600', earned: uploads.length >= 3 },
    { id: 'explorer', icon: MapPin, label: 'Trip Planner', desc: 'Save 3+ trips', bgClass: 'bg-royal-100', textClass: 'text-royal-600', earned: savedTrips.length >= 3 },
  ];

  return (
    <div className="min-h-screen bg-cream-100 pb-20 pt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-saffron p-8 text-white card-shadow-lg"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold backdrop-blur-sm">
                {(profile.full_name || profile.username).charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-peacock-500 ring-4 ring-saffron-500">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-extrabold sm:text-3xl">{profile.full_name || profile.username}</h1>
              <p className="text-sm text-cream-200/80">@{profile.username} · Cultural Explorer</p>
              <div className="mt-3 flex flex-wrap justify-center gap-3 sm:justify-start">
                <Stat label="Points" value={points} icon={Star} />
                <Stat label="States" value={exploredStates.size} icon={MapPin} />
                <Stat label="Saved" value={savedTrips.length} icon={Bookmark} />
                <Stat label="Uploads" value={uploads.length} icon={Video} />
              </div>
            </div>
            <button
              onClick={() => void signOut()}
              className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-semibold">India Explorer</span>
              <span>{explorePct}% explored</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${explorePct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Free ticket reward */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-cream-50 p-6 card-shadow">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-maroon-100">
              <Gift className="h-6 w-6 text-maroon-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-ink-900">Free Ticket Reward</h2>
              <p className="text-sm text-ink-700/70">
                Earn {UPLOAD_POINTS} points per post or video and {TRIP_POINTS} points per saved trip. At{' '}
                {REWARD_THRESHOLD} points you get one free ticket to any place from your saved trips — on us.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-ink-800">
              <span>{points} / {REWARD_THRESHOLD} points</span>
              <span className="text-maroon-600">{Math.max(0, REWARD_THRESHOLD - points)} to go</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-maroon-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-maroon-400 to-saffron-500"
              />
            </div>
          </div>

          {points >= REWARD_THRESHOLD ? (
            savedTrips.length === 0 ? (
              <p className="mt-4 rounded-xl bg-saffron-100 px-4 py-3 text-sm text-saffron-700">
                You've unlocked a free ticket! Save a trip first and then pick the place you want to visit.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                <p className="text-sm font-semibold text-ink-900">Pick the place for your free ticket:</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {savedTrips.map((t: SavedTrip) => (
                    <button
                      key={t.id}
                      onClick={() => setPicked(t.id)}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all active:scale-95 ${
                        picked === t.id ? 'border-saffron-500 bg-saffron-50' : 'border-cream-200 bg-cream-100 hover:border-saffron-300'
                      }`}
                    >
                      <img src={t.image} alt={t.place} loading="lazy" className="h-12 w-12 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-ink-900">{t.place}</div>
                        <div className="truncate text-xs text-ink-700/60">{t.city}, {t.stateName}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  disabled={!picked || !canClaim}
                  onClick={() => {
                    const trip = savedTrips.find((t) => t.id === picked);
                    if (trip) {
                      claimReward(trip);
                      setPicked('');
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon-500 px-5 py-3 font-semibold text-white transition-all hover:bg-maroon-600 active:scale-95 disabled:opacity-50"
                >
                  <Ticket className="h-5 w-5" /> Claim my free ticket
                </button>
              </div>
            )
          ) : (
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-700/60">
              <Lock className="h-4 w-4" /> Keep contributing to unlock your free ticket.
            </p>
          )}

          {rewards.length > 0 && (
            <div className="mt-5 space-y-2">
              <h3 className="text-sm font-bold text-ink-900">My free tickets</h3>
              {rewards.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-2xl border-2 border-dashed border-maroon-300 bg-maroon-50 px-4 py-3">
                  <div>
                    <div className="text-sm font-bold text-ink-900">{r.place}</div>
                    <div className="text-xs text-ink-700/60">{r.city}, {r.stateName} · {new Date(r.claimedAt).toLocaleDateString()}</div>
                  </div>
                  <span className="rounded-full bg-maroon-500 px-3 py-1 font-mono text-xs font-bold text-white">{r.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-ink-900">Badges</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl bg-cream-50 p-4 text-center card-shadow ${badge.earned ? '' : 'opacity-50 grayscale'}`}
              >
                <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${badge.bgClass}`}>
                  <badge.icon className={`h-6 w-6 ${badge.textClass}`} />
                </div>
                <div className="text-sm font-bold text-ink-900">{badge.label}</div>
                <div className="text-xs text-ink-700/60">{badge.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Uploads */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-ink-900">My Contributions</h2>
          {uploads.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-10 text-center">
              <Video className="mx-auto h-10 w-10 text-saffron-300" />
              <p className="mt-3 text-sm text-ink-700/60">You haven't shared any stories yet.</p>
              <button onClick={() => onNavigate('home')} className="mt-4 btn-primary">
                Start Exploring India <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {uploads.map((u) => (
                <div key={u.id} className="rounded-2xl bg-cream-50 p-4 card-shadow">
                  <div className="flex items-center gap-2">
                    <span className="chip bg-saffron-100 text-saffron-700 capitalize">{u.type}</span>
                    <span className="text-xs text-ink-700/50">{new Date(u.timestamp).toLocaleDateString()}</span>
                  </div>
                  <h3 className="mt-2 font-bold text-ink-900">{u.title}</h3>
                  <p className="text-sm text-ink-700/70">{u.caption}</p>
                  <p className="mt-1 text-xs text-peacock-600">📍 {getStateName(u.stateId)} → {u.city}{u.place && ` → ${u.place}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved trips */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-ink-900">Saved Trips</h2>
          {savedTrips.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-10 text-center">
              <Bookmark className="mx-auto h-10 w-10 text-saffron-300" />
              <p className="mt-3 text-sm text-ink-700/60">No saved trips yet.</p>
              <button onClick={() => onNavigate('home')} className="mt-4 btn-primary">Start exploring India <ArrowRight className="h-4 w-4" /></button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedTrips.map((trip) => (
                <div key={trip.id} className="overflow-hidden rounded-2xl bg-cream-50 card-shadow">
                  <img src={trip.image} alt={trip.place} loading="lazy" className="h-32 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-xs text-ink-700/60">{trip.stateName}</p>
                    <h3 className="font-bold text-ink-900">{trip.city}</h3>
                    <p className="text-xs text-ink-700/60">{trip.place}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Liked content */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-ink-900">Liked Content</h2>
          {likedItems.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-8 text-center">
              <Heart className="mx-auto h-8 w-8 text-saffron-300" />
              <p className="mt-2 text-sm text-ink-700/60">Content you like will appear here.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {likedItems.map((item) => (
                <span key={item.id} className="chip bg-maroon-100 text-maroon-700">
                  <Heart className="h-3 w-3 fill-maroon-500" /> {item.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Star }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
      <Icon className="h-3.5 w-3.5" />
      <span className="text-sm font-bold">{value}</span>
      <span className="text-xs text-cream-200/70">{label}</span>
    </div>
  );
}
