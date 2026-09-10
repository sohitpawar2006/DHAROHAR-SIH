import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider, useApp, type SavedTrip } from "@/context/AppContext";
import AuthPrompt from "@/components/AuthPrompt";
import Navbar, { SearchOverlay } from "@/components/Navbar";
import Homepage from "@/components/Homepage";
import Footer from "@/components/Footer";
import StateDetail, { PlaceDetailModal } from "@/components/StateDetail";
import ReelsView from "@/components/ReelsView";
import UploadModal from "@/components/UploadModal";
import TripPlanner from "@/components/TripPlanner";
import Profile from "@/components/Profile";
import { HappeningProvider } from "@/components/HappeningModal";
import { famousPlaces } from "@/data/states";
import type { Place } from "@/data/images";

const title = "DHAROHAR — Explore India's Cultural Heritage";
const description =
  "An interactive journey through India's culture, heritage, food, dance, music and stories — state by state.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type View = "home" | "state" | "profile";

function AppContent() {
  const [view, setView] = useState<View>("home");
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [reelsOpen, setReelsOpen] = useState(false);
  const [tripPlanTarget, setTripPlanTarget] = useState<SavedTrip | null>(null);
  const { profile, promptAuth } = useApp();

  const openUpload = useCallback(() => {
    if (profile) setUploadOpen(true);
    else promptAuth();
  }, [profile, promptAuth]);


  const handleNavigate = useCallback((target: string, payload?: unknown) => {
    if (target === "home") {
      setView("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "state") {
      const stateId = payload as string;
      if (stateId) {
        setSelectedStateId(stateId);
        setView("state");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (target === "place") {
      const place = famousPlaces.find((p) => p.id === (payload as string));
      if (place) setSelectedPlace(place);
    } else if (target === "profile") {
      setView("profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setView("home");
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const handleSelectState = useCallback((stateId: string) => {
    setSelectedStateId(stateId);
    setView("state");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOpenPlace = useCallback((placeId: string) => {
    const place = famousPlaces.find((p) => p.id === placeId);
    if (place) setSelectedPlace(place);
  }, []);

  const handlePlanTrip = useCallback((trip: SavedTrip) => {
    setTripPlanTarget(trip);
  }, []);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenUpload={openUpload}
      />

      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Homepage
              onSelectState={handleSelectState}
              onOpenPlace={handleOpenPlace}
              onOpenReels={() => setReelsOpen(true)}
              onOpenUpload={openUpload}
              onPlanTrip={handlePlanTrip}
            />
            <Footer onNavigate={handleNavigate} onOpenUpload={openUpload} />
          </motion.main>
        )}

        {view === "state" && selectedStateId && (
          <motion.main
            key="state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <StateDetail
              stateId={selectedStateId}
              onBack={() => {
                setView("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenPlace={handleOpenPlace}
              onPlanTrip={handlePlanTrip}
            />
          </motion.main>
        )}

        {view === "profile" && (
          <motion.main
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Profile onNavigate={handleNavigate} />
          </motion.main>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <ReelsView open={reelsOpen} onClose={() => setReelsOpen(false)} />
      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onPlanTrip={handlePlanTrip}
      />
      <TripPlanner trip={tripPlanTarget} onClose={() => setTripPlanTarget(null)} />
      <AuthPrompt />
    </div>
  );
}

function Index() {
  return (
    <AppProvider>
      <HappeningProvider>
        <AppContent />
      </HappeningProvider>
    </AppProvider>
  );
}
