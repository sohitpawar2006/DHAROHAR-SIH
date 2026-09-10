import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Video, FileText, MapPin, CircleCheck as CheckCircle2, ChevronRight } from 'lucide-react';
import { states } from '@/data/states';
import { useApp, type UploadedContent } from '@/context/AppContext';

type UploadModalProps = {
  open: boolean;
  onClose: () => void;
};

const STEPS = ['type', 'details', 'location', 'done'] as const;
const TYPES = [
  { id: 'story', label: 'Story', icon: FileText, desc: 'Share a tradition, oral history, or cultural memory' },
  { id: 'photo', label: 'Photo', icon: ImageIcon, desc: 'Upload a photo of a place, art form, or festival' },
  { id: 'video', label: 'Video', icon: Video, desc: 'Upload a short video of a cultural experience' },
] as const;

export default function UploadModal({ open, onClose }: UploadModalProps) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<'story' | 'photo' | 'video'>('story');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [stateId, setStateId] = useState('');
  const [city, setCity] = useState('');
  const [place, setPlace] = useState('');
  const { addUpload } = useApp();

  const reset = () => {
    setStep(0);
    setType('story');
    setTitle('');
    setCaption('');
    setStateId('');
    setCity('');
    setPlace('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleDone = () => {
    handleClose();
  };

  const handleSubmit = () => {
    const content: UploadedContent = {
      id: `upload-${Date.now()}`,
      type,
      title: title || 'Untitled Story',
      stateId,
      city,
      place,
      caption: caption || '',
      timestamp: Date.now(),
    };
    addUpload(content);
    setStep(3);
  };

  const selectedState = states.find((s) => s.id === stateId);
  const canProceed = step === 0 || (step === 1 && title.trim()) || (step === 2 && stateId && city.trim());

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream-100 shadow-2xl"
          >
            {/* Header */}
            <div className="relative bg-gradient-saffron px-6 py-5 text-white">
              <button onClick={handleClose} className="absolute right-4 top-4 rounded-full p-1.5 transition-colors hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <Upload className="h-6 w-6" />
                <h3 className="text-xl font-bold">
                  {step < 3 ? 'Share Your Story' : 'Thank You!'}
                </h3>
              </div>
              <p className="mt-1 text-sm text-cream-200/90">
                {step < 3 ? 'Help preserve India\u2019s cultural heritage' : 'Your contribution matters'}
              </p>
              {/* Progress dots */}
              {step < 3 && (
                <div className="mt-3 flex gap-1.5">
                  {STEPS.slice(0, 3).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i <= step ? 'w-8 bg-white' : 'w-4 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin p-6">
              {step === 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-ink-700/80">What would you like to contribute?</p>
                  {TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setType(t.id); setStep(1); }}
                      className="flex w-full items-center gap-4 rounded-2xl border-2 border-saffron-200/50 bg-cream-50 p-4 text-left transition-all hover:border-saffron-400 hover:bg-saffron-50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-100">
                        <t.icon className="h-6 w-6 text-saffron-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-ink-900">{t.label}</div>
                        <div className="text-sm text-ink-700/70">{t.desc}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-saffron-400" />
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700/80">Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., The Lost Art of Manjusha Painting"
                      className="w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-saffron-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700/80">Story / Caption</label>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Tell us about this tradition, place, or experience..."
                      rows={4}
                      className="w-full resize-none rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-saffron-400"
                    />
                  </div>
                  {(type === 'photo' || type === 'video') && (
                    <div className="rounded-xl border-2 border-dashed border-saffron-200 bg-saffron-50/50 py-8 text-center">
                      <Upload className="mx-auto h-8 w-8 text-saffron-400" />
                      <p className="mt-2 text-sm text-ink-700/60">Drag your {type} here or click to browse</p>
                      <p className="text-xs text-ink-700/40">Demo mode — no actual file upload</p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="btn-ghost">Back</button>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!title.trim()}
                      className="btn-primary flex-1 disabled:opacity-40"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700/80">Tag a State</label>
                    <select
                      value={stateId}
                      onChange={(e) => setStateId(e.target.value)}
                      className="w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-saffron-400"
                    >
                      <option value="">Select a state...</option>
                      {states.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700/80">City</label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Jaipur"
                      className="w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-saffron-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700/80">Place (optional)</label>
                    <input
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      placeholder="e.g., Amber Fort"
                      className="w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-saffron-400"
                    />
                  </div>
                  {selectedState && city && (
                    <div className="flex items-center gap-2 rounded-xl bg-peacock-50 px-4 py-3 text-sm text-peacock-700">
                      <MapPin className="h-4 w-4" />
                      <span><strong>{selectedState.name}</strong> → {city}{place && ` → ${place}`}</span>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-ghost">Back</button>
                    <button
                      onClick={handleSubmit}
                      disabled={!stateId || !city.trim()}
                      className="btn-primary flex-1 disabled:opacity-40"
                    >
                      Share with India
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1, damping: 12 }}
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-peacock-100"
                  >
                    <CheckCircle2 className="h-12 w-12 text-peacock-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-ink-900">Your story has been added to India\u2019s cultural map</h3>
                  <p className="mt-2 text-sm text-ink-700/70">
                    You just helped preserve India\u2019s heritage. Thank you for your contribution.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-saffron-100 px-4 py-2">
                    <span className="font-bold text-saffron-700">+{type === 'video' ? 15 : type === 'story' ? 20 : 10} Dharohar Points</span>
                  </div>
                  <button onClick={handleDone} className="mt-6 btn-primary w-full">
                    Continue Exploring
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
