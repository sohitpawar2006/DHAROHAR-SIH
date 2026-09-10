import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const UPLOAD_POINTS = 50;
export const TRIP_POINTS = 200;
export const REWARD_THRESHOLD = 1000;

export type SavedTrip = {
  id: string;
  stateId: string;
  stateName: string;
  city: string;
  place: string;
  image: string;
};

export type LikedItem = {
  id: string;
  type: 'reel' | 'place' | 'food' | 'event';
  title: string;
};

export type UploadedContent = {
  id: string;
  type: 'story' | 'photo' | 'video';
  title: string;
  stateId: string;
  city: string;
  place: string;
  caption: string;
  timestamp: number;
};

export type Reward = {
  id: string;
  place: string;
  city: string;
  stateName: string;
  code: string;
  claimedAt: number;
};

export type Profile = {
  id: string;
  username: string;
  full_name: string;
  points: number;
  explored_states: string[];
  saved_trips: SavedTrip[];
  liked_items: LikedItem[];
  uploads: UploadedContent[];
  redeemed_rewards: Reward[];
};

export type AppState = {
  // auth
  user: User | null;
  profile: Profile | null;
  authLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  // gate
  needsAuth: boolean;
  promptAuth: () => void;
  dismissAuthPrompt: () => void;
  // data
  points: number;
  exploredStates: Set<string>;
  savedTrips: SavedTrip[];
  likedItems: LikedItem[];
  uploads: UploadedContent[];
  rewards: Reward[];
  addPoints: (n: number) => void;
  exploreState: (stateId: string) => void;
  toggleTrip: (trip: SavedTrip) => void;
  removeTrip: (id: string) => void;
  toggleLike: (item: LikedItem) => void;
  isLiked: (id: string) => boolean;
  addUpload: (content: UploadedContent) => void;
  isTripSaved: (id: string) => boolean;
  claimReward: (trip: SavedTrip) => void;
};

const AppContext = createContext<AppState | null>(null);

const EMPTY: Profile = {
  id: '',
  username: '',
  full_name: '',
  points: 0,
  explored_states: [],
  saved_trips: [],
  liked_items: [],
  uploads: [],
  redeemed_rewards: [],
};

function makeCode() {
  return 'DH-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadProfile = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();
    if (data) {
      setProfile({
        id: data.id,
        username: data.username,
        full_name: data.full_name ?? '',
        points: data.points ?? 0,
        explored_states: (data.explored_states as string[]) ?? [],
        saved_trips: (data.saved_trips as unknown as SavedTrip[]) ?? [],
        liked_items: (data.liked_items as unknown as LikedItem[]) ?? [],
        uploads: (data.uploads as unknown as UploadedContent[]) ?? [],
        redeemed_rewards: (data.redeemed_rewards as unknown as Reward[]) ?? [],
      });
    }
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setProfile(null);
        setAuthLoading(false);
      } else {
        setNeedsAuth(false);
        setTimeout(() => {
          void loadProfile(session.user.id).finally(() => setAuthLoading(false));
        }, 0);
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      setUser(session?.user ?? null);
      if (session?.user) {
        void loadProfile(session.user.id).finally(() => setAuthLoading(false));
      } else {
        setAuthLoading(false);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  // Persist profile changes (debounced)
  const persist = useCallback((next: Profile) => {
    if (!next.id) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void supabase
        .from('profiles')
        .update({
          points: next.points,
          explored_states: next.explored_states,
          saved_trips: next.saved_trips as unknown as never,
          liked_items: next.liked_items as unknown as never,
          uploads: next.uploads as unknown as never,
          redeemed_rewards: next.redeemed_rewards as unknown as never,
        })
        .eq('id', next.id);
    }, 400);
  }, []);

  const mutate = useCallback(
    (fn: (p: Profile) => Profile) => {
      setProfile((prev) => {
        if (!prev) {
          setNeedsAuth(true);
          return prev;
        }
        const next = fn(prev);
        if (next === prev) return prev;
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const current = profile ?? EMPTY;

  const addPoints = useCallback(
    (n: number) => mutate((p) => ({ ...p, points: p.points + n })),
    [mutate],
  );

  const exploreState = useCallback(
    (stateId: string) =>
      mutate((p) =>
        p.explored_states.includes(stateId)
          ? p
          : { ...p, explored_states: [...p.explored_states, stateId] },
      ),
    [mutate],
  );

  const toggleTrip = useCallback(
    (trip: SavedTrip) =>
      mutate((p) => {
        const exists = p.saved_trips.some((t) => t.id === trip.id);
        if (exists) {
          return { ...p, saved_trips: p.saved_trips.filter((t) => t.id !== trip.id) };
        }
        return {
          ...p,
          saved_trips: [...p.saved_trips, trip],
          points: p.points + TRIP_POINTS,
        };
      }),
    [mutate],
  );

  const removeTrip = useCallback(
    (id: string) => mutate((p) => ({ ...p, saved_trips: p.saved_trips.filter((t) => t.id !== id) })),
    [mutate],
  );

  const toggleLike = useCallback(
    (item: LikedItem) =>
      mutate((p) => {
        const exists = p.liked_items.some((l) => l.id === item.id);
        return {
          ...p,
          liked_items: exists ? p.liked_items.filter((l) => l.id !== item.id) : [...p.liked_items, item],
        };
      }),
    [mutate],
  );

  const addUpload = useCallback(
    (content: UploadedContent) =>
      mutate((p) => ({
        ...p,
        uploads: [content, ...p.uploads],
        points: p.points + UPLOAD_POINTS,
      })),
    [mutate],
  );

  const claimReward = useCallback(
    (trip: SavedTrip) =>
      mutate((p) => {
        if (p.points < REWARD_THRESHOLD) return p;
        const reward: Reward = {
          id: `${trip.id}-${Date.now()}`,
          place: trip.place,
          city: trip.city,
          stateName: trip.stateName,
          code: makeCode(),
          claimedAt: Date.now(),
        };
        return {
          ...p,
          points: p.points - REWARD_THRESHOLD,
          redeemed_rewards: [reward, ...p.redeemed_rewards],
        };
      }),
    [mutate],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user.id);
  }, [user, loadProfile]);

  const exploredStates = useMemo(() => new Set(current.explored_states), [current.explored_states]);

  const isLiked = useCallback((id: string) => current.liked_items.some((l) => l.id === id), [current.liked_items]);
  const isTripSaved = useCallback((id: string) => current.saved_trips.some((t) => t.id === id), [current.saved_trips]);

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        authLoading,
        signOut,
        refreshProfile,
        needsAuth,
        promptAuth: () => setNeedsAuth(true),
        dismissAuthPrompt: () => setNeedsAuth(false),
        points: current.points,
        exploredStates,
        savedTrips: current.saved_trips,
        likedItems: current.liked_items,
        uploads: current.uploads,
        rewards: current.redeemed_rewards,
        addPoints,
        exploreState,
        toggleTrip,
        removeTrip,
        toggleLike,
        isLiked,
        addUpload,
        isTripSaved,
        claimReward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
