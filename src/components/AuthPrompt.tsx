import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AuthPrompt() {
  const { needsAuth, dismissAuthPrompt } = useApp();

  return (
    <AnimatePresence>
      {needsAuth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismissAuthPrompt}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl bg-cream-50 p-8 text-center shadow-2xl"
          >
            <button
              onClick={dismissAuthPrompt}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-ink-700/60 hover:bg-saffron-100"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-saffron-100">
              <Sparkles className="h-7 w-7 text-saffron-600" />
            </div>
            <h2 className="mt-4 text-xl font-extrabold text-ink-900">Sign in to keep this</h2>
            <p className="mt-2 text-sm text-ink-700/70">
              Create a free account to save trips, earn points and share your own stories.
            </p>
            <Link to="/auth" className="mt-5 btn-primary mx-auto">
              Sign in or create account <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
