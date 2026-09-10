import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader as Loader2, Mail, Lock, User as UserIcon, AtSign, CircleCheck as CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const title = "Sign in — DHAROHAR";
const description =
  "Create your DHAROHAR account to collect points, save trips and share your own stories from across India.";

export const Route = createFileRoute("/auth")({
  ssr: false,
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
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const cleanUsername = username.trim().replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
        if (!fullName.trim()) throw new Error("Please enter your name.");
        if (cleanUsername.length < 3) throw new Error("Username needs at least 3 letters or numbers.");
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName.trim(), username: cleanUsername },
          },
        });
        if (signUpError) throw signUpError;
        setSentTo(email.trim());
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
        void navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in did not work. Please try again.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-cream-50 card-shadow-lg"
      >
        <div className="bg-gradient-saffron px-8 py-8 text-white">
          <Link to="/" className="mb-4 inline-flex items-center gap-1.5 text-sm text-cream-200/90 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to DHAROHAR
          </Link>
          <h1 className="text-3xl font-extrabold">
            {mode === "signin" ? "Welcome back" : "Join DHAROHAR"}
          </h1>
          <p className="mt-1 text-sm text-cream-200/85">
            {mode === "signin"
              ? "Sign in to see your points, trips and stories."
              : "Create an account to earn points and save your journeys."}
          </p>
        </div>

        <div className="p-8">
          {sentTo ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-peacock-500" />
              <h2 className="mt-3 text-xl font-bold text-ink-900">Check your email</h2>
              <p className="mt-2 text-sm text-ink-700/70">
                We sent a confirmation link to <span className="font-semibold">{sentTo}</span>. Click it and you
                will be signed in.
              </p>
              <button
                onClick={() => {
                  setSentTo(null);
                  setMode("signin");
                }}
                className="mt-5 btn-primary mx-auto"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-saffron-200 bg-cream-50 px-5 py-3 font-semibold text-ink-900 transition-all hover:bg-saffron-50 active:scale-95 disabled:opacity-60"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
                  <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
                  <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.7l4-3z" />
                  <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 7 8.9 4.8 12 4.8z" />
                </svg>
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-ink-700/40">
                <span className="h-px flex-1 bg-saffron-200" /> or <span className="h-px flex-1 bg-saffron-200" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === "signup" && (
                  <>
                    <Field icon={UserIcon} placeholder="Your name" value={fullName} onChange={setFullName} />
                    <Field icon={AtSign} placeholder="Username" value={username} onChange={setUsername} />
                  </>
                )}
                <Field icon={Mail} type="email" placeholder="Email" value={email} onChange={setEmail} />
                <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />

                {error && (
                  <p className="rounded-xl bg-maroon-100 px-3 py-2 text-sm text-maroon-700">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-5 py-3 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95 disabled:opacity-60"
                >
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                  {mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-ink-700/70">
                {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setError(null);
                  }}
                  className="font-bold text-saffron-600 hover:text-saffron-700"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: typeof Mail;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-saffron-200 bg-cream-100 px-4 py-3 focus-within:border-saffron-400">
      <Icon className="h-4 w-4 shrink-0 text-saffron-500" />
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-700/40"
      />
    </label>
  );
}
