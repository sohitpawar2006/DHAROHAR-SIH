import { n as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion+[...].mjs";
import { t as supabase } from "./client-DszU2rkK.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowLeft, R as AtSign, S as Loader, j as CircleCheck, o as User, x as Lock, y as Mail } from "../_libs/lucide-react.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CJmY46l9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [sentTo, setSentTo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/" });
		});
	}, [navigate]);
	async function handleSubmit(e) {
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
						data: {
							full_name: fullName.trim(),
							username: cleanUsername
						}
					}
				});
				if (signUpError) throw signUpError;
				setSentTo(email.trim());
			} else {
				const { error: signInError } = await supabase.auth.signInWithPassword({
					email: email.trim(),
					password
				});
				if (signInError) throw signInError;
				navigate({ to: "/" });
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
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
		if (result.error) {
			setError("Google sign-in did not work. Please try again.");
			setBusy(false);
			return;
		}
		if (result.redirected) return;
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream-100 px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "w-full max-w-md overflow-hidden rounded-3xl bg-cream-50 card-shadow-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-saffron px-8 py-8 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-4 inline-flex items-center gap-1.5 text-sm text-cream-200/90 hover:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to DHAROHAR"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-extrabold",
						children: mode === "signin" ? "Welcome back" : "Join DHAROHAR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-cream-200/85",
						children: mode === "signin" ? "Sign in to see your points, trips and stories." : "Create an account to earn points and save your journeys."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8",
				children: sentTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-12 w-12 text-peacock-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-xl font-bold text-ink-900",
							children: "Check your email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-ink-700/70",
							children: [
								"We sent a confirmation link to ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: sentTo
								}),
								". Click it and you will be signed in."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSentTo(null);
								setMode("signin");
							},
							className: "mt-5 btn-primary mx-auto",
							children: "Back to sign in"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleGoogle,
						disabled: busy,
						className: "flex w-full items-center justify-center gap-3 rounded-full border-2 border-saffron-200 bg-cream-50 px-5 py-3 font-semibold text-ink-900 transition-all hover:bg-saffron-50 active:scale-95 disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "h-5 w-5",
							viewBox: "0 0 24 24",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#4285F4",
									d: "M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#34A853",
									d: "M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#FBBC05",
									d: "M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.7l4-3z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#EA4335",
									d: "M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 7 8.9 4.8 12 4.8z"
								})
							]
						}), "Continue with Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-ink-700/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-saffron-200" }),
							" or ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-saffron-200" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-3",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								icon: User,
								placeholder: "Your name",
								value: fullName,
								onChange: setFullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								icon: AtSign,
								placeholder: "Username",
								value: username,
								onChange: setUsername
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								icon: Mail,
								type: "email",
								placeholder: "Email",
								value: email,
								onChange: setEmail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								icon: Lock,
								type: "password",
								placeholder: "Password",
								value: password,
								onChange: setPassword
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl bg-maroon-100 px-3 py-2 text-sm text-maroon-700",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: busy,
								className: "flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-5 py-3 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95 disabled:opacity-60",
								children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }), mode === "signin" ? "Sign in" : "Create account"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-center text-sm text-ink-700/70",
						children: [
							mode === "signin" ? "New here?" : "Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setMode(mode === "signin" ? "signup" : "signin");
									setError(null);
								},
								className: "font-bold text-saffron-600 hover:text-saffron-700",
								children: mode === "signin" ? "Create an account" : "Sign in"
							})
						]
					})
				] })
			})]
		})
	});
}
function Field({ icon: Icon, placeholder, value, onChange, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-3 rounded-2xl border border-saffron-200 bg-cream-100 px-4 py-3 focus-within:border-saffron-400",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0 text-saffron-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			required: true,
			placeholder,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-700/40"
		})]
	});
}
//#endregion
export { AuthPage as component };
