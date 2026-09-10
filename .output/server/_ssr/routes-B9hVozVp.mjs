import { n as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { t as supabase } from "./client-DszU2rkK.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, B as ArrowLeft, C as ListFilter, D as Gift, E as Heart, F as Calendar, I as CalendarDays, L as Bookmark, M as ChevronRight, N as ChevronLeft, O as FileText, P as ChevronDown, T as Image, _ as Menu, a as UtensilsCrossed, b as LogOut, c as Ticket, d as Shield, f as Search, g as Music, h as Navigation, i as Video, j as CircleCheck, k as Compass, l as Star, m as Play, n as ZoomOut, o as User, p as Plus, r as X, s as Upload, t as ZoomIn, u as Sparkles, v as MapPin, w as Info, x as Lock, z as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B9hVozVp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REWARD_THRESHOLD = 1e3;
var AppContext = (0, import_react.createContext)(null);
var EMPTY = {
	id: "",
	username: "",
	full_name: "",
	points: 0,
	explored_states: [],
	saved_trips: [],
	liked_items: [],
	uploads: [],
	redeemed_rewards: []
};
function makeCode() {
	return "DH-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}
function AppProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [authLoading, setAuthLoading] = (0, import_react.useState)(true);
	const [needsAuth, setNeedsAuth] = (0, import_react.useState)(false);
	const saveTimer = (0, import_react.useRef)(null);
	const loadProfile = (0, import_react.useCallback)(async (uid) => {
		const { data } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
		if (data) setProfile({
			id: data.id,
			username: data.username,
			full_name: data.full_name ?? "",
			points: data.points ?? 0,
			explored_states: data.explored_states ?? [],
			saved_trips: data.saved_trips ?? [],
			liked_items: data.liked_items ?? [],
			uploads: data.uploads ?? [],
			redeemed_rewards: data.redeemed_rewards ?? []
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
			if (!session?.user) {
				setProfile(null);
				setAuthLoading(false);
			} else {
				setNeedsAuth(false);
				setTimeout(() => {
					loadProfile(session.user.id).finally(() => setAuthLoading(false));
				}, 0);
			}
		});
		supabase.auth.getSession().then(({ data }) => {
			const session = data.session;
			setUser(session?.user ?? null);
			if (session?.user) loadProfile(session.user.id).finally(() => setAuthLoading(false));
			else setAuthLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, [loadProfile]);
	const persist = (0, import_react.useCallback)((next) => {
		if (!next.id) return;
		if (saveTimer.current) clearTimeout(saveTimer.current);
		saveTimer.current = setTimeout(() => {
			supabase.from("profiles").update({
				points: next.points,
				explored_states: next.explored_states,
				saved_trips: next.saved_trips,
				liked_items: next.liked_items,
				uploads: next.uploads,
				redeemed_rewards: next.redeemed_rewards
			}).eq("id", next.id);
		}, 400);
	}, []);
	const mutate = (0, import_react.useCallback)((fn) => {
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
	}, [persist]);
	const current = profile ?? EMPTY;
	const addPoints = (0, import_react.useCallback)((n) => mutate((p) => ({
		...p,
		points: p.points + n
	})), [mutate]);
	const exploreState = (0, import_react.useCallback)((stateId) => mutate((p) => p.explored_states.includes(stateId) ? p : {
		...p,
		explored_states: [...p.explored_states, stateId]
	}), [mutate]);
	const toggleTrip = (0, import_react.useCallback)((trip) => mutate((p) => {
		if (p.saved_trips.some((t) => t.id === trip.id)) return {
			...p,
			saved_trips: p.saved_trips.filter((t) => t.id !== trip.id)
		};
		return {
			...p,
			saved_trips: [...p.saved_trips, trip],
			points: p.points + 200
		};
	}), [mutate]);
	const removeTrip = (0, import_react.useCallback)((id) => mutate((p) => ({
		...p,
		saved_trips: p.saved_trips.filter((t) => t.id !== id)
	})), [mutate]);
	const toggleLike = (0, import_react.useCallback)((item) => mutate((p) => {
		const exists = p.liked_items.some((l) => l.id === item.id);
		return {
			...p,
			liked_items: exists ? p.liked_items.filter((l) => l.id !== item.id) : [...p.liked_items, item]
		};
	}), [mutate]);
	const addUpload = (0, import_react.useCallback)((content) => mutate((p) => ({
		...p,
		uploads: [content, ...p.uploads],
		points: p.points + 50
	})), [mutate]);
	const claimReward = (0, import_react.useCallback)((trip) => mutate((p) => {
		if (p.points < 1e3) return p;
		const reward = {
			id: `${trip.id}-${Date.now()}`,
			place: trip.place,
			city: trip.city,
			stateName: trip.stateName,
			code: makeCode(),
			claimedAt: Date.now()
		};
		return {
			...p,
			points: p.points - REWARD_THRESHOLD,
			redeemed_rewards: [reward, ...p.redeemed_rewards]
		};
	}), [mutate]);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		setProfile(null);
		setUser(null);
	}, []);
	const refreshProfile = (0, import_react.useCallback)(async () => {
		if (user) await loadProfile(user.id);
	}, [user, loadProfile]);
	const exploredStates = (0, import_react.useMemo)(() => new Set(current.explored_states), [current.explored_states]);
	const isLiked = (0, import_react.useCallback)((id) => current.liked_items.some((l) => l.id === id), [current.liked_items]);
	const isTripSaved = (0, import_react.useCallback)((id) => current.saved_trips.some((t) => t.id === id), [current.saved_trips]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContext.Provider, {
		value: {
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
			claimReward
		},
		children
	});
}
function useApp() {
	const ctx = (0, import_react.useContext)(AppContext);
	if (!ctx) throw new Error("useApp must be used within AppProvider");
	return ctx;
}
function AuthPrompt() {
	const { needsAuth, dismissAuthPrompt } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: needsAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: dismissAuthPrompt,
		className: "fixed inset-0 z-[95] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				y: 30,
				opacity: 0,
				scale: .97
			},
			animate: {
				y: 0,
				opacity: 1,
				scale: 1
			},
			exit: {
				y: 30,
				opacity: 0,
				scale: .97
			},
			onClick: (e) => e.stopPropagation(),
			className: "relative w-full max-w-sm rounded-3xl bg-cream-50 p-8 text-center shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: dismissAuthPrompt,
					"aria-label": "Close",
					className: "absolute right-4 top-4 rounded-full p-1.5 text-ink-700/60 hover:bg-saffron-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-saffron-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-7 w-7 text-saffron-600" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-extrabold text-ink-900",
					children: "Sign in to keep this"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-700/70",
					children: "Create a free account to save trips, earn points and share your own stories."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					className: "mt-5 btn-primary mx-auto",
					children: ["Sign in or create account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			]
		})
	}) });
}
var IMG = {
	taj: "https://images.pexels.com/photos/11948442/pexels-photo-11948442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	tajDome: "https://images.pexels.com/photos/37126715/pexels-photo-37126715.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	fortRaj: "https://images.pexels.com/photos/33797765/pexels-photo-33797765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	fortRaj2: "https://images.pexels.com/photos/33797768/pexels-photo-33797768.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	kerala: "https://images.pexels.com/photos/30778230/pexels-photo-30778230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	keralaBoat: "https://images.pexels.com/photos/17928231/pexels-photo-17928231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	kathakali: "https://images.pexels.com/photos/8566097/pexels-photo-8566097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	bharatanatyam: "https://images.pexels.com/photos/36121661/pexels-photo-36121661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	odissiDance: "https://images.pexels.com/photos/14602474/pexels-photo-14602474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	thali: "https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	thali2: "https://images.pexels.com/photos/17223838/pexels-photo-17223838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	holi: "https://images.pexels.com/photos/3913942/pexels-photo-3913942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	holi2: "https://images.pexels.com/photos/14546935/pexels-photo-14546935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	goldenTemple: "https://images.pexels.com/photos/18275890/pexels-photo-18275890.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	goldenTemple2: "https://images.pexels.com/photos/5818954/pexels-photo-5818954.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	market: "https://images.pexels.com/photos/38443540/pexels-photo-38443540.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	textiles: "https://images.pexels.com/photos/14707117/pexels-photo-14707117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	rugs: "https://images.pexels.com/photos/29625818/pexels-photo-29625818.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	pottery: "https://images.pexels.com/photos/37808898/pexels-photo-37808898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	pots: "https://images.pexels.com/photos/34545851/pexels-photo-34545851.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	figurines: "https://images.pexels.com/photos/37014220/pexels-photo-37014220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	mysore: "https://images.pexels.com/photos/34962788/pexels-photo-34962788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	mysore2: "https://images.pexels.com/photos/9882016/pexels-photo-9882016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	konark: "https://images.pexels.com/photos/6040175/pexels-photo-6040175.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	konarkWheel: "https://images.pexels.com/photos/31598958/pexels-photo-31598958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	tabla: "https://images.pexels.com/photos/18851187/pexels-photo-18851187.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	tabla2: "https://images.pexels.com/photos/13042108/pexels-photo-13042108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	harmonium: "https://images.pexels.com/photos/18870063/pexels-photo-18870063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	varanasi: "https://images.pexels.com/photos/38857186/pexels-photo-38857186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	varanasi2: "https://images.pexels.com/photos/17869831/pexels-photo-17869831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	indiaGate: "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	indiaGate2: "https://images.pexels.com/photos/16952108/pexels-photo-16952108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	hawaMahal: "https://images.pexels.com/photos/19867647/pexels-photo-19867647.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	hawaMahal2: "https://images.pexels.com/photos/34086724/pexels-photo-34086724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	hills: "https://images.pexels.com/photos/13529693/pexels-photo-13529693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	river: "https://images.pexels.com/photos/12435660/pexels-photo-12435660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	amberFort: "https://images.pexels.com/photos/19149588/pexels-photo-19149588.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	humayun: "https://images.pexels.com/photos/16348799/pexels-photo-16348799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	qutb: "https://images.pexels.com/photos/20789999/pexels-photo-20789999.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	mysoreTall: "https://images.pexels.com/photos/25384443/pexels-photo-25384443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
	varanasiTall: "https://images.pexels.com/photos/18887175/pexels-photo-18887175.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
};
var states = [
	{
		id: "rajasthan",
		name: "Rajasthan",
		capital: "Jaipur",
		tagline: "Where every fort tells a story",
		highlight: "Forts • Ghoomar • Dal Baati Churma",
		description: "The land of kings, where golden deserts meet towering forts and palaces painted in pink, blue, and gold. Rajasthan is India in its most regal, romantic, and colorful form.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Thar_Khuri.jpg/1280px-Thar_Khuri.jpg",
		color: "#C13A47",
		mapPath: "M180,280 L240,250 L300,240 L360,250 L400,280 L420,330 L400,380 L360,410 L300,420 L240,400 L200,360 L170,320 Z",
		mapLabelX: 295,
		mapLabelY: 340,
		places: [
			{
				id: "amber-fort",
				name: "Amber Fort",
				city: "Jaipur",
				stateId: "rajasthan",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Amer_City.jpg/1280px-Amer_City.jpg",
				description: "A majestic hilltop fort of yellow-pink sandstone, where Rajput kings once ruled.",
				significance: "UNESCO World Heritage Site showcasing Rajput-Mughal architecture with mirror palaces.",
				category: "fort"
			},
			{
				id: "hawa-mahal",
				name: "Hawa Mahal",
				city: "Jaipur",
				stateId: "rajasthan",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
				description: "The \"Palace of Winds\" with 953 tiny windows that let royal women watch street life unseen.",
				significance: "An architectural marvel of pink sandstone built in 1799 by Maharaja Sawai Pratap Singh.",
				category: "palace"
			},
			{
				id: "neemrana-fort",
				name: "Neemrana Fort-Palace",
				city: "Neemrana",
				stateId: "rajasthan",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Neemrana_Fort_Palace_terrace_and_the_town_below.jpg/1280px-Neemrana_Fort_Palace_terrace_and_the_town_below.jpg",
				description: "A 15th-century hill fort restored into a heritage hotel, spanning seven palace wings.",
				significance: "One of India’s oldest heritage resorts, preserving 600 years of Rajput history.",
				category: "heritage"
			}
		],
		traditions: [
			{
				name: "Kathputli",
				description: "Ancient string puppetry telling tales of Rajput valor and folklore.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/India_Mandawa_marionetas_01_ni.JPG/1280px-India_Mandawa_marionetas_01_ni.JPG"
			},
			{
				name: "Bandhani",
				description: "Tie-and-dye textile art creating intricate dot patterns on fabric.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bandhani_print_open.JPG/1280px-Bandhani_print_open.JPG"
			},
			{
				name: "Block Printing",
				description: "Hand-carved wooden blocks stamping patterns onto fabric — a 500-year craft.",
				image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Dabu_Printed_Fabric.jpg"
			}
		],
		dances: [{
			name: "Ghoomar",
			origin: "Rajput royal courts",
			description: "A graceful twirling dance where women’s flowing skirts bloom like flowers.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg/1280px-Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg"
		}, {
			name: "Kalbeliya",
			origin: "Snake-charmer community",
			description: "A sinuous, hypnotic dance mimicking serpent movements, recognized by UNESCO.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jogis%2C_snake_charmers%2C_Hindoos_of_low_caste%2C_Delhi_%28NYPL_b13409080-1125444%29.jpg/1280px-Jogis%2C_snake_charmers%2C_Hindoos_of_low_caste%2C_Delhi_%28NYPL_b13409080-1125444%29.jpg"
		}],
		music: [{
			name: "Rajasthani Folk",
			region: "Thar Desert",
			instruments: "Ravanahatha, Khartal, Dholak",
			description: "Ballads of valor and love carried across desert dunes for centuries.",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Tyagaraja.jpg"
		}, {
			name: "Manganiyar Music",
			region: "Western Rajasthan",
			instruments: "Sarangi, Dholak, Harmonium",
			description: "A hereditary musical tradition blending Hindu and Sufi devotional songs.",
			image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Folk_Phonic.jpg"
		}],
		foods: [
			{
				name: "Dal Baati Churma",
				origin: "Rajasthan",
				description: "Baked wheat balls served with lentil curry and sweet crumbled cereal — the state’s signature.",
				whereToTry: "Traditional Rajasthani thali restaurants in Jaipur",
				image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/DalBati.jpg"
			},
			{
				name: "Laal Maas",
				origin: "Mewar royal kitchens",
				description: "A fiery red mutton curry flavored with mathania chilies, once a royal hunt dish.",
				whereToTry: "Heritage restaurants in Udaipur",
				image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Laal-Maans.jpg"
			},
			{
				name: "Ghevar",
				origin: "Jaipur",
				description: "A disc-shaped honeycomb dessert made during Teej and Raksha Bandhan.",
				whereToTry: "Sweet shops in old Jaipur",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ghevar_with_Malai_Topping.jpg/1280px-Ghevar_with_Malai_Topping.jpg"
			}
		],
		festivals: [
			{
				name: "Pushkar Fair",
				description: "The world’s largest camel fair on the banks of Pushkar Lake.",
				month: "November",
				image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/%28A%29_Camel_Pushkar_fair.jpg"
			},
			{
				name: "Teej",
				description: "A monsoon festival celebrating Goddess Parvati with processions and swings.",
				month: "August",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Teej.jpg/1280px-Teej.jpg"
			},
			{
				name: "Desert Festival",
				description: "Three days of camel polo, turban tying, and folk music in Jaisalmer.",
				month: "February",
				image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Pohela_boishakh_2.jpg"
			}
		],
		artForms: [
			{
				name: "Phad Painting",
				description: "Long scroll paintings depicting heroic deeds of local deities.",
				image: "https://upload.wikimedia.org/wikipedia/commons/4/45/WLANL_-_MicheleLovesArt_-_Tropenmuseum_-_Pabuji-Verteldoek_%284669-1%29.jpg"
			},
			{
				name: "Blue Pottery",
				description: "Persian-inspired pottery using blue oxide — a Jaipur specialty.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Dr._Bhau_Daji_Lad_Museum_JEG1715.JPG/1280px-Dr._Bhau_Daji_Lad_Museum_JEG1715.JPG"
			},
			{
				name: "Mojaris",
				description: "Hand-stitched leather footwear embroidered with traditional motifs.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/AMRAPALI_MUSEUM%2C_JAIPUR.jpg/1280px-AMRAPALI_MUSEUM%2C_JAIPUR.jpg"
			}
		],
		restaurants: [{
			id: "r1",
			name: "Spice Court",
			city: "Jaipur",
			stateId: "rajasthan",
			cuisine: "Rajasthani",
			rating: 4.7,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/51/The_delicious_Rajasthani_food.png",
			description: "Royal Rajasthani thali in a heritage haveli setting."
		}, {
			id: "r2",
			name: "1135 AD",
			city: "Jaipur",
			stateId: "rajasthan",
			cuisine: "Mughlai-Rajasthani",
			rating: 4.6,
			priceRange: "₹₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Northwest_India_map.svg/1280px-Northwest_India_map.svg.png",
			description: "Dine inside Amer Fort with candlelit royal ambiance."
		}],
		events: [{
			id: "e1",
			name: "Pushkar Fair",
			location: "Pushkar, Rajasthan",
			stateId: "rajasthan",
			date: "Nov 9–17",
			month: "November",
			category: "Cultural Fair",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pushkar.jpg/1280px-Pushkar.jpg",
			description: "A legendary camel fair and cultural mela on Pushkar’s sacred lake."
		}, {
			id: "e2",
			name: "Jaipur Literature Festival",
			location: "Jaipur, Rajasthan",
			stateId: "rajasthan",
			date: "Jan 16–20",
			month: "January",
			category: "Literature",
			image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Jairangam_1.jpg",
			description: "The world’s largest free literary festival at Diggi Palace."
		}]
	},
	{
		id: "uttar-pradesh",
		name: "Uttar Pradesh",
		capital: "Lucknow",
		tagline: "The Land of the Taj & Kathak",
		highlight: "Taj Mahal • Kathak • Awadhi Cuisine",
		description: "The heartland of India, home to the Taj Mahal, the Ganges at Varanasi, and the elegant courts of Awadh. A state where poetry, devotion, and cuisine converge.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg",
		color: "#3D5AFE",
		mapPath: "M350,200 L430,190 L490,210 L520,260 L500,310 L460,340 L400,350 L350,330 L320,280 L330,230 Z",
		mapLabelX: 410,
		mapLabelY: 270,
		places: [
			{
				id: "taj-mahal",
				name: "Taj Mahal",
				city: "Agra",
				stateId: "uttar-pradesh",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Portrait_of_Mumtaz_Mahal_on_Ivory_%28cropped%29.jpg/1280px-Portrait_of_Mumtaz_Mahal_on_Ivory_%28cropped%29.jpg",
				description: "An ivory-white marble mausoleum built by Shah Jahan for Mumtaz Mahal.",
				significance: "One of the Seven New Wonders of the World and a UNESCO World Heritage Site.",
				category: "monument"
			},
			{
				id: "varanasi-ghats",
				name: "Varanasi Ghats",
				city: "Varanasi",
				stateId: "uttar-pradesh",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/1280px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg",
				description: "Eighty-eight riverside steps where pilgrims gather for prayer and cremation rites.",
				significance: "One of the world’s oldest continuously inhabited cities, sacred to Hindus.",
				category: "spiritual"
			},
			{
				id: "agra-taj-dome",
				name: "Taj Mahal Dome",
				city: "Agra",
				stateId: "uttar-pradesh",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Taj_Mahal%2C_Agra%2C_India.jpg/1280px-Taj_Mahal%2C_Agra%2C_India.jpg",
				description: "The central onion dome rises 73 meters, crowned with a gold finial.",
				significance: "The pinnacle of Mughal architecture, perfectly symmetrical in every dimension.",
				category: "monument"
			}
		],
		traditions: [{
			name: "Chikankari",
			description: "Delicate white-thread hand embroidery from Lucknow, dating to the Mughal era.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg"
		}, {
			name: "Zardozi",
			description: "Gold and silver metallic thread embroidery used on royal garments.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kala-Namakst-all-at-Siddharthnagar-Station.jpg/1280px-Kala-Namakst-all-at-Siddharthnagar-Station.jpg"
		}],
		dances: [{
			name: "Kathak",
			origin: "Awadh & Braj courts",
			description: "A classical dance of storytelling through rapid footwork and spins.",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Kathak_contemporary_03.jpg"
		}],
		music: [{
			name: "Hindustani Classical",
			region: "North India",
			instruments: "Sitar, Tabla, Sarangi",
			description: "The raga tradition nurtured in the courts of Awadh and Benares.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Suriname_Bhojpuri.jpg/1280px-Suriname_Bhojpuri.jpg"
		}, {
			name: "Thumri",
			region: "Varanasi & Lucknow",
			instruments: "Harmonium, Tabla",
			description: "Semi-classical romantic devotional songs born in the 19th century.",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Vidya_Rao_%28cropped%29.png"
		}],
		foods: [
			{
				name: "Awadhi Biryani",
				origin: "Lucknow",
				description: "Slow-cooked dum biryani from the royal Awadhi kitchens, fragrant with saffron.",
				whereToTry: "Old Lucknow eateries",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/1280px-Hyderabadi_Chicken_Biryani.jpg"
			},
			{
				name: "Petha",
				origin: "Agra",
				description: "A soft translucent candy made from ash gourd, created during Mughal times.",
				whereToTry: "Panchhi Petha, Agra",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg"
			},
			{
				name: "Chaat",
				origin: "Varanasi & Lucknow",
				description: "The spiritual home of Indian street food — kachori, samosa, and tamatar chaat.",
				whereToTry: "Kashi chaat lanes",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Dahi_puri%2C_Doi_phuchka.jpg/1280px-Dahi_puri%2C_Doi_phuchka.jpg"
			}
		],
		festivals: [{
			name: "Dev Deepawali",
			description: "Varanasi ghats lit with a million diyas, 15 days after Diwali.",
			month: "November",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/%27Dev_Deepavali%27_celebrations_in_Varanasi_on_Karthik_Purnima..jpg"
		}, {
			name: "Krishna Janmashtami",
			description: "Celebrating Krishna’s birth in Mathura-Vrindavan with raas leela.",
			month: "August",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Yesoda-krishna.jpg"
		}],
		artForms: [{
			name: "Varanasi Silk Weaving",
			description: "Brocade Banarasi saris woven with gold zari on handlooms.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Exhibit_in_Craft_Museum_New_Delhi-30.JPG/1280px-Exhibit_in_Craft_Museum_New_Delhi-30.JPG"
		}, {
			name: "Marble Inlay",
			origin: "Agra",
			description: "Pietra dura inlay work, the same craft used on the Taj Mahal.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ellora%2C_tempio_kailasanatha_%28grotta_16%29%2C_750-775_dc_ca.%2C_tempio_di_shiva_visto_dalla_terrazza_del_gopuram%2C_lato_dx_%28sud%29_01.jpg/1280px-Ellora%2C_tempio_kailasanatha_%28grotta_16%29%2C_750-775_dc_ca.%2C_tempio_di_shiva_visto_dalla_terrazza_del_gopuram%2C_lato_dx_%28sud%29_01.jpg"
		}],
		restaurants: [{
			id: "r3",
			name: "Tunday Kababi",
			city: "Lucknow",
			stateId: "uttar-pradesh",
			cuisine: "Awadhi",
			rating: 4.5,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Paya_Curry.JPG/1280px-Paya_Curry.JPG",
			description: "Legendary galouti kebabs since 1905."
		}, {
			id: "r4",
			name: "Chowk Chaat Corner",
			city: "Varanasi",
			stateId: "uttar-pradesh",
			cuisine: "Street Food",
			rating: 4.4,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/StreetfoodNY.jpg/1280px-StreetfoodNY.jpg",
			description: "Best tamatar chaat in the old city lanes."
		}],
		events: [{
			id: "e3",
			name: "Dev Deepawali",
			location: "Varanasi, UP",
			stateId: "uttar-pradesh",
			date: "Nov 26",
			month: "November",
			category: "Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Kartiki_Punam.JPG",
			description: "A million diyas illuminate the ghats of the holy city."
		}]
	},
	{
		id: "punjab",
		name: "Punjab",
		capital: "Chandigarh",
		tagline: "The Land of Five Rivers & Bhangra",
		highlight: "Golden Temple • Bhangra • Makki di Roti",
		description: "Where golden fields sway, the Golden Temple glows, and every celebration bursts into Bhangra. Punjab is joy, devotion, and the warmth of sarson da saag.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Golden_Temple%2C_Amritsar%2C_Punjab_UNAG.jpg/1280px-Golden_Temple%2C_Amritsar%2C_Punjab_UNAG.jpg",
		color: "#F5B800",
		mapPath: "M250,140 L340,130 L390,160 L380,200 L330,210 L270,200 L230,180 Z",
		mapLabelX: 310,
		mapLabelY: 170,
		places: [{
			id: "golden-temple",
			name: "Golden Temple",
			city: "Amritsar",
			stateId: "punjab",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg",
			description: "The holiest shrine of Sikhism, its gold-leafed sanctum mirrored in a sacred pool.",
			significance: "The spiritual center of Sikh faith, open to all regardless of religion or caste.",
			category: "spiritual"
		}, {
			id: "golden-temple-dusk",
			name: "Golden Temple at Dusk",
			city: "Amritsar",
			stateId: "punjab",
			image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Punjab_in_India_%281961%29.png",
			description: "At sunset the temple glows amber, reflected perfectly in the Amrit Sarovar.",
			significance: "The evening Palki Sahib ceremony is one of the most moving rituals in the world.",
			category: "spiritual"
		}],
		traditions: [{
			name: "Phulkari",
			description: "\"Flower work\" — dense, colorful thread embroidery on coarse fabric.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Contemporary_Phulkari_design.jpg/1280px-Contemporary_Phulkari_design.jpg"
		}, {
			name: "Bhangra",
			description: "A high-energy harvest dance with dhol drums and bright turbans.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Open_Hand_monument%2C_Chandigarh.jpg/1280px-Open_Hand_monument%2C_Chandigarh.jpg"
		}],
		dances: [{
			name: "Bhangra",
			origin: "Punjab harvest fields",
			description: "Punjab’s explosive harvest dance — leaps, shoulder shakes, and dhol beats.",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Bhangra-dance.jpg"
		}, {
			name: "Giddha",
			origin: "Punjab villages",
			description: "A women’s folk dance with rhythmic clapping and boli verses.",
			image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Giddha_1.jpg"
		}],
		music: [{
			name: "Punjabi Folk",
			region: "Punjab",
			instruments: "Dhol, Tumbi, Chimta",
			description: "Vibrant folk songs of love, harvest, and celebration.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Two_wandering_jogis_from_Punjab%2C_1875.jpg/1280px-Two_wandering_jogis_from_Punjab%2C_1875.jpg"
		}, {
			name: "Gurbani Kirtan",
			region: "Amritsar",
			instruments: "Harmonium, Tabla",
			description: "Devotional Sikh hymns sung in ragas at the Golden Temple.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Chaitanya_sankirtan.jpg/1280px-Chaitanya_sankirtan.jpg"
		}],
		foods: [{
			name: "Sarson da Saag & Makki di Roti",
			origin: "Punjab",
			description: "Mustard greens slow-cooked with spices, served with cornmeal flatbread and white butter.",
			whereToTry: "Dhabas across rural Punjab",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Makki_Di_Roti.JPG/1280px-Makki_Di_Roti.JPG"
		}, {
			name: "Amritsari Kulcha",
			origin: "Amritsar",
			description: "Stuffed bread baked in a tandoor, served with chole and mint chutney.",
			whereToTry: "All India Mash, Amritsar",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Tandoori_Chicken_with_oven.jpg/1280px-Tandoori_Chicken_with_oven.jpg"
		}],
		festivals: [{
			name: "Lohri",
			description: "Bonfire festival marking the end of winter, with peanuts, rewri, and Bhangra.",
			month: "January",
			image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Lohri_bonfire.png"
		}, {
			name: "Baisakhi",
			description: "Punjab’s harvest festival and the founding day of the Khalsa.",
			month: "April",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ramman_Festival_Celebration_in_Uttarakhand.jpg/1280px-Ramman_Festival_Celebration_in_Uttarakhand.jpg"
		}],
		artForms: [{
			name: "Punjabi Jutti",
			description: "Embroidered leather slippers with curled-up toes.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Punjabi_Traditional_Fashion_-_Cultural_Night_-_Wiki_Conference_India_-_CGC_-_Mohali_2016-08-05_7367.JPG/1280px-Punjabi_Traditional_Fashion_-_Cultural_Night_-_Wiki_Conference_India_-_CGC_-_Mohali_2016-08-05_7367.JPG"
		}, {
			name: "Phulkari",
			description: "Flower-work embroidery — each piece takes months to complete.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chachi_atro_da_ghar_at_virasti_mela%2C_bathinda.jpg/1280px-Chachi_atro_da_ghar_at_virasti_mela%2C_bathinda.jpg"
		}],
		restaurants: [{
			id: "r5",
			name: "Brothers Dhaba",
			city: "Amritsar",
			stateId: "punjab",
			cuisine: "Punjabi",
			rating: 4.6,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pakistani_Food_Karahi_Beef.jpg/1280px-Pakistani_Food_Karahi_Beef.jpg",
			description: "Authentic Punjabi thali near the Golden Temple."
		}, {
			id: "r6",
			name: "Bharawan da Dhaba",
			city: "Amritsar",
			stateId: "punjab",
			cuisine: "Vegetarian Punjabi",
			rating: 4.5,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vegetarian_diet.jpg/1280px-Vegetarian_diet.jpg",
			description: "A century-old vegetarian institution since 1912."
		}],
		events: [{
			id: "e4",
			name: "Lohri Celebrations",
			location: "Amritsar, Punjab",
			stateId: "punjab",
			date: "Jan 13",
			month: "January",
			category: "Harvest Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/74/POL_2007_09_2_dozynki_jasnogorskie2_01.jpg",
			description: "Bonfires, Bhangra, and winter sweets across Punjab."
		}]
	},
	{
		id: "kerala",
		name: "Kerala",
		capital: "Thiruvananthapuram",
		tagline: "God's Own Country",
		highlight: "Backwaters • Kathakali • Onam Sadhya",
		description: "Emerald backwaters, spice gardens, and ancient temples. Kerala is where Ayurveda, Kathakali, and coconut palms create a serene tropical paradise.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Boathouse_%287063399547%29.jpg/1280px-Boathouse_%287063399547%29.jpg",
		color: "#0BA884",
		mapPath: "M200,720 L180,750 L170,790 L190,830 L220,850 L260,840 L280,800 L270,760 L240,730 Z",
		mapLabelX: 225,
		mapLabelY: 785,
		places: [{
			id: "kerala-backwaters",
			name: "Kerala Backwaters",
			city: "Alleppey",
			stateId: "kerala",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/House_Boat_DSW.jpg/1280px-House_Boat_DSW.jpg",
			description: "A labyrinth of palm-fringed canals explored on traditional houseboats.",
			significance: "A unique ecosystem of 900 km of interconnected waterways, rice fields, and villages.",
			category: "nature"
		}, {
			id: "kerala-houseboat",
			name: "Houseboat Cruise",
			city: "Kumarakom",
			stateId: "kerala",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/LakeUnionHouseboat.jpg/1280px-LakeUnionHouseboat.jpg",
			description: "Glide through Vembanad Lake on a kettuvallam — a thatched rice barge converted to a floating home.",
			significance: "These boats were originally used to transport rice; now they preserve a vanishing way of life.",
			category: "nature"
		}],
		traditions: [{
			name: "Ayurveda",
			description: "A 5,000-year-old system of natural healing using herbs, oils, and diet.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kalari_Pattu.jpg/1280px-Kalari_Pattu.jpg"
		}, {
			name: "Kalaripayattu",
			description: "One of the world’s oldest martial arts, born in Kerala’s hills.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/%E0%B4%95%E0%B5%86%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%B5%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B4%99%E0%B5%8D%E0%B4%99%E0%B5%BE-%E0%B4%95%E0%B5%81%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%A8%E0%B4%BE%E0%B4%9F%E0%B4%BF%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86_%E0%B4%AE%E0%B5%81%E0%B4%96%E0%B4%AE%E0%B5%81%E0%B4%A6%E0%B5%8D%E0%B4%B0.jpg/1280px-%E0%B4%95%E0%B5%86%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%B5%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B4%99%E0%B5%8D%E0%B4%99%E0%B5%BE-%E0%B4%95%E0%B5%81%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%A8%E0%B4%BE%E0%B4%9F%E0%B4%BF%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86_%E0%B4%AE%E0%B5%81%E0%B4%96%E0%B4%AE%E0%B5%81%E0%B4%A6%E0%B5%8D%E0%B4%B0.jpg"
		}],
		dances: [{
			name: "Kathakali",
			origin: "Kerala temples",
			description: "A dance-drama with elaborate green and red makeup, telling epics through mudras.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Kathakali_-Play_with_Kaurava.jpg/1280px-Kathakali_-Play_with_Kaurava.jpg"
		}, {
			name: "Mohiniyattam",
			origin: "Kerala",
			description: "A graceful solo female dance, \"the dance of the enchantress.\"",
			image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mohiniyattom_performance.jpg"
		}],
		music: [{
			name: "Carnatic Music",
			region: "South India",
			instruments: "Veena, Mridangam, Violin",
			description: "One of India’s two great classical traditions, emphasizing devotional krithis.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tanjore-style_Carnatic_tambura.JPG/1280px-Tanjore-style_Carnatic_tambura.JPG"
		}, {
			name: "Sopanam",
			region: "Kerala temples",
			instruments: "Chenda, Edakka",
			description: "Temple music sung at the sanctum steps, accompanying Kathakali performances.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/010092022_Shri_Anantha_Padmanabha_Swamy_temple%2C_Kumbla_Kerala_124.jpg/1280px-010092022_Shri_Anantha_Padmanabha_Swamy_temple%2C_Kumbla_Kerala_124.jpg"
		}],
		foods: [
			{
				name: "Onam Sadhya",
				origin: "Kerala",
				description: "A grand vegetarian feast of 26+ dishes served on a banana leaf during Onam.",
				whereToTry: "During Onam festival statewide",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Onapookkalam.jpg/1280px-Onapookkalam.jpg"
			},
			{
				name: "Appam with Stew",
				origin: "Kerala Christian community",
				description: "Lacy rice pancakes with coconut milk stew — a breakfast classic.",
				whereToTry: "Kerala restaurants in Kochi",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Tamil_distribution.png/1280px-Tamil_distribution.png"
			},
			{
				name: "Puttu & Kadala",
				origin: "Kerala",
				description: "Steamed rice cylinders with black chickpea curry — the quintessential Kerala breakfast.",
				whereToTry: "Thatukadas (street stalls) statewide",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Puttu_%28Rice_Flour_steamed_cake%29.jpg/1280px-Puttu_%28Rice_Flour_steamed_cake%29.jpg"
			}
		],
		festivals: [{
			name: "Onam",
			description: "A ten-day harvest festival with flower carpets (pookalam) and boat races.",
			month: "August–September",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Thrikkakara_Temple_DSC09337.JPG/1280px-Thrikkakara_Temple_DSC09337.JPG"
		}, {
			name: "Thrissur Pooram",
			description: "A spectacular temple festival with 30 caparisoned elephants and percussion.",
			month: "April–May",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kudamatom_at_thrissur_pooram_2013_7618.JPG/1280px-Kudamatom_at_thrissur_pooram_2013_7618.JPG"
		}],
		artForms: [{
			name: "Mural Painting",
			description: "Ancient temple wall art using natural pigments — panchavarna (five colors).",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Malayali_women_wearing_Kerala_saree.jpg/1280px-Malayali_women_wearing_Kerala_saree.jpg"
		}, {
			name: "Coir Craft",
			description: "Rope and mat weaving from coconut husk fiber.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Government_of_Kerala_Logo.svg/1280px-Government_of_Kerala_Logo.svg.png"
		}],
		restaurants: [{
			id: "r7",
			name: "Malabar Cuisine",
			city: "Kochi",
			stateId: "kerala",
			cuisine: "Kerala",
			rating: 4.7,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg",
			description: "Seafood and sadhya on a waterfront terrace."
		}, {
			id: "r8",
			name: "Saravana Bhavan",
			city: "Thiruvananthapuram",
			stateId: "kerala",
			cuisine: "South Indian",
			rating: 4.4,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/%22Paddy_transplantation_in_Tamil_Nadu%22.jpg/1280px-%22Paddy_transplantation_in_Tamil_Nadu%22.jpg",
			description: "Crispy dosas and filter coffee since 1981."
		}],
		events: [{
			id: "e5",
			name: "Nehru Trophy Boat Race",
			location: "Alleppey, Kerala",
			stateId: "kerala",
			date: "Aug 10",
			month: "August",
			category: "Sport",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Kerala_boatrace.jpg",
			description: "Snake boat races on Punnamada Lake — 100+ oarsmen per boat."
		}]
	},
	{
		id: "maharashtra",
		name: "Maharashtra",
		capital: "Mumbai",
		tagline: "The Land of Caves & Cinema",
		highlight: "Ajanta-Ellora • Warli Art • Vada Pav",
		description: "From the rock-cut wonders of Ajanta-Ellora to the energy of Mumbai, Maharashtra is where ancient art meets modern dreams.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Cave_26%2C_Ajanta.jpg/1280px-Cave_26%2C_Ajanta.jpg",
		color: "#FF8C2A",
		mapPath: "M220,440 L300,430 L360,460 L370,520 L340,560 L280,570 L220,550 L200,500 Z",
		mapLabelX: 290,
		mapLabelY: 495,
		places: [{
			id: "india-gate-mumbai",
			name: "Gateway of India",
			city: "Mumbai",
			stateId: "maharashtra",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg",
			description: "A 26-meter basalt arch overlooking the Arabian Sea, built to welcome King George V.",
			significance: "Mumbai’s most iconic landmark, where the last British troops departed India.",
			category: "monument"
		}, {
			id: "india-gate-sunset",
			name: "Gateway at Sunset",
			city: "Mumbai",
			stateId: "maharashtra",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coastal_Road%2C_Mumbai%2C_November_2025.jpg/1280px-Coastal_Road%2C_Mumbai%2C_November_2025.jpg",
			description: "As the sun sets, the arch glows gold against Mumbai’s harbor.",
			significance: "The monument frames the city’s colonial past and its independent future.",
			category: "monument"
		}],
		traditions: [{
			name: "Warli Art",
			origin: "Thane tribes",
			description: "Tribal painting using white rice paste on mud walls — circles, triangles, squares.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Statuette_Mambia_Nig%C3%A9ria.jpg/1280px-Statuette_Mambia_Nig%C3%A9ria.jpg"
		}, {
			name: "Ganesh Festival",
			description: "A ten-day celebration with giant clay idols, music, and processions.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Building_of_Sir_J._J._School_of_Art%2C_Mumbai.jpg/1280px-Building_of_Sir_J._J._School_of_Art%2C_Mumbai.jpg"
		}],
		dances: [{
			name: "Lavani",
			origin: "Maharashtra",
			description: "A powerful folk dance with rapid rhythms, traditionally performed on stage.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Lavani_1.jpg/1280px-Lavani_1.jpg"
		}, {
			name: "Lezim",
			origin: "Rural Maharashtra",
			description: "A vigorous group dance with a small jingling instrument called lezim.",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Lezim-dancers.jpg"
		}],
		music: [{
			name: "Natya Sangeet",
			region: "Maharashtra",
			instruments: "Harmonium, Tabla",
			description: "A semi-classical musical theater tradition from the Marathi stage.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Ghasiram_Kotwal_play.JPG/1280px-Ghasiram_Kotwal_play.JPG"
		}, {
			name: "Bhavageet",
			region: "Maharashtra",
			instruments: "Harmonium, Tabla",
			description: "Expressive poetry set to music — the emotional voice of Marathi culture.",
			image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Jitendra_Abhisheki.png"
		}],
		foods: [{
			name: "Vada Pav",
			origin: "Mumbai street",
			description: "A spiced potato fritter in a bun with garlic chutney — Mumbai’s beloved burger.",
			whereToTry: "Ashok Vada Pav, Dadar",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/1280px-Vada_Pav-Indian_street_food.JPG"
		}, {
			name: "Maharashtrian Thali",
			origin: "Pune",
			description: "A balanced plate with bhakri, pithla, thecha, and solkadhi.",
			whereToTry: "Shreyas, Pune",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Vegetarian_Curry.jpeg"
		}],
		festivals: [{
			name: "Ganesh Chaturthi",
			description: "Mumbai’s biggest festival — giant idols, drumming, and sea immersions.",
			month: "August–September",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Khairathabad_Vinayakudu_2021.jpg/1280px-Khairathabad_Vinayakudu_2021.jpg"
		}, {
			name: "Kala Ghoda Festival",
			description: "A nine-day arts festival in Mumbai’s heritage district.",
			month: "February",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Kala_ghoda_2007_entrance.jpg"
		}],
		artForms: [{
			name: "Warli Painting",
			description: "A 2,500-year-old tribal art form using simple geometric shapes.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vajreshwari_Vogini_Mandir%2C_Maharashtra_-_panoramio_%2830%29.jpg/1280px-Vajreshwari_Vogini_Mandir%2C_Maharashtra_-_panoramio_%2830%29.jpg"
		}, {
			name: "Paithani Sarees",
			description: "Silk saris with gold zari peacock borders from Paithan.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Parrot_Peacock_border_paithani_saree.jpg"
		}],
		restaurants: [{
			id: "r9",
			name: "Cafe Madras",
			city: "Mumbai",
			stateId: "maharashtra",
			cuisine: "Udupi",
			rating: 4.5,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Udupi_Krishna_Temple.jpg/1280px-Udupi_Krishna_Temple.jpg",
			description: "Iconic South Indian breakfast in Matunga since 1930s."
		}, {
			id: "r10",
			name: "Shreyas",
			city: "Pune",
			stateId: "maharashtra",
			cuisine: "Maharashtrian",
			rating: 4.4,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg/1280px-Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg",
			description: "Authentic Maharashtrian thali on banana leaf."
		}],
		events: [{
			id: "e6",
			name: "Kala Ghoda Arts Festival",
			location: "Mumbai, Maharashtra",
			stateId: "maharashtra",
			date: "Feb 1–9",
			month: "February",
			category: "Arts",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kala_Ghoda_Statue.jpg/1280px-Kala_Ghoda_Statue.jpg",
			description: "Nine days of art, music, dance, and food in Mumbai’s heritage quarter."
		}]
	},
	{
		id: "gujarat",
		name: "Gujarat",
		capital: "Gandhinagar",
		tagline: "The Land of Garba & Lions",
		highlight: "Rann Utsav • Garba • Dhokla",
		description: "Where the white salt desert glows under the full moon and nine nights of Garba fill every courtyard with rhythm and color.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rani_ki_vav_02.jpg/1280px-Rani_ki_vav_02.jpg",
		color: "#3D5AFE",
		mapPath: "M130,360 L200,340 L260,360 L270,420 L240,460 L180,470 L140,450 L120,400 Z",
		mapLabelX: 195,
		mapLabelY: 405,
		places: [{
			id: "rann-of-kutch",
			name: "Rann of Kutch",
			city: "Bhuj",
			stateId: "gujarat",
			image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Gujarat_Gulfs.jpg",
			description: "A vast white salt desert that transforms into a moonlit wonderland in winter.",
			significance: "One of the largest salt deserts in the world, home to unique salt-flat ecosystems.",
			category: "nature"
		}],
		traditions: [{
			name: "Garba",
			description: "A circular dance around a lamp or Goddess image during Navratri.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/GARBA_DANCE_GUJARAT.jpg/1280px-GARBA_DANCE_GUJARAT.jpg"
		}, {
			name: "Patola Weaving",
			description: "Double-ikat silk weaving — so complex, one sari takes six months.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Hermann_Linde_-_Girl_standing_in_a_veranda_wearing_a_Pochampalli_sari_%28ca.1895%29.jpg"
		}],
		dances: [{
			name: "Garba",
			origin: "Gujarat",
			description: "A joyful circular dance performed during Navratri with sticks (dandiya).",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garba_%28dance%29.jpg/1280px-Garba_%28dance%29.jpg"
		}, {
			name: "Dandiya Raas",
			origin: "Gujarat",
			description: "A stick dance where partners strike dandiyas in rhythmic patterns.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Children_performing_Dandiya_in_Palace_Grounds%2C_Bangalore.jpg/1280px-Children_performing_Dandiya_in_Palace_Grounds%2C_Bangalore.jpg"
		}],
		music: [{
			name: "Gujarati Folk",
			region: "Gujarat",
			instruments: "Dhol, Dandiya, Manjira",
			description: "Festival songs for Navratri, weddings, and Holi.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Traditional_Folk_dance_garba_dress.jpg/1280px-Traditional_Folk_dance_garba_dress.jpg"
		}],
		foods: [{
			name: "Dhokla",
			origin: "Gujarat",
			description: "A fermented steamed batter cake, spongy and lightly sweet.",
			whereToTry: "Gujarati farsan shops",
			image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Dhokla_on_Gujrart.jpg"
		}, {
			name: "Khandvi",
			description: "Thin, rolled gram-flour snacks tempered with mustard and coconut.",
			whereToTry: "Ahmedabad sweet shops",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chole_Bhature_from_Nagpur.JPG/1280px-Chole_Bhature_from_Nagpur.JPG"
		}],
		festivals: [{
			name: "Rann Utsav",
			description: "A three-month festival on the white desert with tent cities and folk music.",
			month: "November–February",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Rann_of_Kutch_-_White_Desert.jpg/1280px-Rann_of_Kutch_-_White_Desert.jpg"
		}, {
			name: "Navratri",
			description: "Nine nights of Garba and Dandiya across every Gujarati town.",
			month: "September–October",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Shardiya_Navratri_Festival_in_Pune_2020.jpg/1280px-Shardiya_Navratri_Festival_in_Pune_2020.jpg"
		}],
		artForms: [{
			name: "Bandhani",
			description: "Fine tie-and-dye creating intricate dot patterns — a Gujarati specialty.",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Ahemdabad_Skyline.jpg"
		}, {
			name: "Kutch Embroidery",
			description: "Mirror-work embroidery with geometric patterns from Kutch villages.",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Antique_Kutch_Embroidery.jpg"
		}],
		restaurants: [{
			id: "r11",
			name: "Agashiye",
			city: "Ahmedabad",
			stateId: "gujarat",
			cuisine: "Gujarati",
			rating: 4.6,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gujrati_Thali.jpg/1280px-Gujrati_Thali.jpg",
			description: "Rooftop heritage dining with a 25-dish Gujarati thali."
		}],
		events: [{
			id: "e7",
			name: "Rann Utsav",
			location: "Bhuj, Gujarat",
			stateId: "gujarat",
			date: "Nov–Feb",
			month: "November",
			category: "Cultural Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Sunset_at_Rann_of_Kutch%2C_Dhordo%2C_Gujarat.jpg/1280px-Sunset_at_Rann_of_Kutch%2C_Dhordo%2C_Gujarat.jpg",
			description: "A tent city on the white salt desert with folk music and handicrafts."
		}]
	},
	{
		id: "west-bengal",
		name: "West Bengal",
		capital: "Kolkata",
		tagline: "The Land of Durga Puja & Rabindra Sangeet",
		highlight: "Durga Puja • Rabindra Sangeet • Rosogolla",
		description: "Where art, intellect, and devotion intertwine. From the grand pandals of Durga Puja to the misty tea gardens of Darjeeling, Bengal is a state of artists.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Howrah_bridge_betwixt_Lights.jpg/1280px-Howrah_bridge_betwixt_Lights.jpg",
		color: "#C13A47",
		mapPath: "M470,430 L540,420 L580,450 L570,500 L520,510 L480,490 L460,460 Z",
		mapLabelX: 520,
		mapLabelY: 465,
		places: [{
			id: "victoria-memorial",
			name: "Victoria Memorial",
			city: "Kolkata",
			stateId: "west-bengal",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/1280px-Victoria_Memorial_situated_in_Kolkata.jpg",
			description: "A grand marble palace blending British and Mughal architecture, built in memory of Queen Victoria.",
			significance: "Kolkata’s most iconic building, now a museum of colonial and Indian history.",
			category: "monument"
		}],
		traditions: [{
			name: "Durga Puja",
			description: "A five-day festival with elaborate clay idols and artistic pandals.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0_%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AC%E0%A6%9C%E0%A6%A8%E0%A7%80%E0%A6%A8_%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A7%8B%E0%A7%8E%E0%A6%B8%E0%A6%AC_%E0%A7%A8%E0%A7%A6%E0%A7%A7%E0%A7%AE.jpg/1280px-%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0_%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AC%E0%A6%9C%E0%A6%A8%E0%A7%80%E0%A6%A8_%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A7%8B%E0%A7%8E%E0%A6%B8%E0%A6%AC_%E0%A7%A8%E0%A7%A6%E0%A7%A7%E0%A7%AE.jpg"
		}, {
			name: "Kantha Stitch",
			description: "Running-stitch embroidery on layered old cloth, turning rags into art.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Nakshi_Kantha_craftswoman.jpg/1280px-Nakshi_Kantha_craftswoman.jpg"
		}],
		dances: [{
			name: "Chhau",
			origin: "Purulia",
			description: "A martial mask dance with acrobatic leaps, telling stories from the epics.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chhau_Nritya_%281%29.jpg/1280px-Chhau_Nritya_%281%29.jpg"
		}],
		music: [{
			name: "Rabindra Sangeet",
			region: "Bengal",
			instruments: "Esraj, Tabla, Harmonium",
			description: "2,000+ songs by Nobel laureate Rabindranath Tagore.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Valmiki_Pratibha_Indira_Devi_%26_Rabindranath_Tagore.jpg/1280px-Valmiki_Pratibha_Indira_Devi_%26_Rabindranath_Tagore.jpg"
		}, {
			name: "Baul Music",
			region: "Rural Bengal",
			instruments: "Ektara, Dotara, Khamak",
			description: "Mystic minstrel songs of wandering Baul singers, a UNESCO heritage.",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Ektara_player.jpg"
		}],
		foods: [{
			name: "Rosogolla",
			origin: "Kolkata",
			description: "Soft chenna balls soaked in light sugar syrup — Bengal’s sweet pride.",
			whereToTry: "K.C. Das, Kolkata",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/1280px-Rasgulla.jpg"
		}, {
			name: "Macher Jhol",
			origin: "Bengal",
			description: "A light fish curry with potatoes and eggplant — the everyday Bengali meal.",
			whereToTry: "Bhojohori Manna, Kolkata",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Alu_ar_dhonepata_diye_Boyal_machher_jhol.jpg/1280px-Alu_ar_dhonepata_diye_Boyal_machher_jhol.jpg"
		}],
		festivals: [{
			name: "Durga Puja",
			description: "A UNESCO-recognized festival with artistic pandals, drumming, and idol immersions.",
			month: "September–October",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Durga_Puja_1.jpg/1280px-Durga_Puja_1.jpg"
		}],
		artForms: [{
			name: "Kantha Embroidery",
			description: "Stitching old cloth into quilts and saris — a folk art of Bengali women.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Nakshi_kantha1.JPG/1280px-Nakshi_kantha1.JPG"
		}, {
			name: "Terracotta",
			description: "Red-clay temple sculpture and pottery from Bankura district.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Terracotta_panels_of_Char_Bangla_group_of_temples_of_Azimganj_in_Murshidabad_district_of_West_Bengal._56.jpg/1280px-Terracotta_panels_of_Char_Bangla_group_of_temples_of_Azimganj_in_Murshidabad_district_of_West_Bengal._56.jpg"
		}],
		restaurants: [{
			id: "r12",
			name: "Bhojohori Manna",
			city: "Kolkata",
			stateId: "west-bengal",
			cuisine: "Bengali",
			rating: 4.6,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bengali_dialects.png/1280px-Bengali_dialects.png",
			description: "Authentic home-style Bengali cuisine."
		}],
		events: [{
			id: "e8",
			name: "Durga Puja",
			location: "Kolkata, West Bengal",
			stateId: "west-bengal",
			date: "Oct 9–13",
			month: "October",
			category: "UNESCO Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Mahishasura-Mardini_Durga.jpg",
			description: "Five days of artistic pandals, dhak drums, and devotion."
		}]
	},
	{
		id: "tamil-nadu",
		name: "Tamil Nadu",
		capital: "Chennai",
		tagline: "The Land of Temples & Bharatanatyam",
		highlight: "Meenakshi Temple • Bharatanatyam • Filter Coffee",
		description: "Home to towering gopurams, ancient classical music, and the world’s oldest living language. Tamil Nadu is a civilization that has preserved its culture for two millennia.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mamallapuram_view.jpg/1280px-Mamallapuram_view.jpg",
		color: "#F5B800",
		mapPath: "M290,680 L350,670 L370,700 L360,740 L320,760 L280,750 L270,710 Z",
		mapLabelX: 320,
		mapLabelY: 715,
		places: [{
			id: "meenakshi-temple",
			name: "Meenakshi Temple",
			city: "Madurai",
			stateId: "tamil-nadu",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg",
			description: "A vast temple complex with 14 gopurams covered in thousands of colorful sculptures.",
			significance: "A 2,000-year-old temple that is the heart of Tamil culture and Dravidian architecture.",
			category: "temple"
		}],
		traditions: [{
			name: "Kolam",
			description: "Intricate rice-flour patterns drawn at doorsteps each dawn — math and art combined.",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Pongal_fest.jpg"
		}, {
			name: "Bharatanatyam",
			description: "India’s oldest classical dance, born in Tamil temple courts.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Thanjavur%2C_Brihadishwara_Temple%2C_dance_%286851706080%29.jpg/1280px-Thanjavur%2C_Brihadishwara_Temple%2C_dance_%286851706080%29.jpg"
		}],
		dances: [{
			name: "Bharatanatyam",
			origin: "Tamil Nadu temples",
			description: "India’s oldest classical dance, where geometry meets devotion in every pose.",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Murugashankari_Leo.jpg"
		}],
		music: [{
			name: "Carnatic Music",
			region: "Tamil Nadu",
			instruments: "Veena, Mridangam, Violin",
			description: "The south Indian classical tradition of devotional krithis and ragas.",
			image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Carnatic_violinist.jpg"
		}],
		foods: [{
			name: "Dosa & Idli",
			origin: "Tamil Nadu",
			description: "Crispy rice crepes and steamed rice cakes with sambar and chutney.",
			whereToTry: "Murugan Idli Shop, Madurai",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Masala_Dosa_2023.jpg/1280px-Masala_Dosa_2023.jpg"
		}, {
			name: "Filter Coffee",
			origin: "Tamil Nadu",
			description: "Strong, frothy coffee brewed in a steel filter and served in a dabara tumbler.",
			whereToTry: "Any Chennai tiffin room",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/John_Frederick_Lewis_004.jpg/1280px-John_Frederick_Lewis_004.jpg"
		}],
		festivals: [{
			name: "Pongal",
			description: "A four-day harvest thanksgiving with sweet pongal and bull-taming jallikattu.",
			month: "January",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ven_pongal_with_sambar_and_chutney.jpg/1280px-Ven_pongal_with_sambar_and_chutney.jpg"
		}],
		artForms: [{
			name: "Tanjore Painting",
			description: "Gold-leaf and gem-adorned classical paintings of gods and goddesses.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Thanjavur_art_from_south_India.jpg/1280px-Thanjavur_art_from_south_India.jpg"
		}, {
			name: "Kanchipuram Silk",
			description: "Pure silk saris woven with gold zari — a 400-year tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Parameswara_Vinnagaram.JPG/1280px-Parameswara_Vinnagaram.JPG"
		}],
		restaurants: [{
			id: "r13",
			name: "Murugan Idli Shop",
			city: "Madurai",
			stateId: "tamil-nadu",
			cuisine: "South Indian",
			rating: 4.5,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Tradtional_Thali.jpg",
			description: "The best idli-dosa in Tamil Nadu since 1981."
		}],
		events: [{
			id: "e9",
			name: "Pongal Festival",
			location: "Madurai, Tamil Nadu",
			stateId: "tamil-nadu",
			date: "Jan 14–17",
			month: "January",
			category: "Harvest Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pola_in_Chinawal_9.jpg/1280px-Pola_in_Chinawal_9.jpg",
			description: "Four days of harvest celebration with jallikattu and sweet pongal."
		}]
	},
	{
		id: "karnataka",
		name: "Karnataka",
		capital: "Bengaluru",
		tagline: "The Land of Palaces & Sandalwood",
		highlight: "Mysore Palace • Mysore Pak • Carnatic Music",
		description: "From the glittering Mysore Palace to the ruins of Hampi, Karnataka blends royal grandeur with ancient temple towns and vibrant tech cities.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hampi_virupaksha_temple.jpg/1280px-Hampi_virupaksha_temple.jpg",
		color: "#A02E3A",
		mapPath: "M200,560 L280,550 L330,580 L320,630 L270,650 L210,640 L180,600 Z",
		mapLabelX: 255,
		mapLabelY: 600,
		places: [{
			id: "mysore-palace",
			name: "Mysore Palace",
			city: "Mysore",
			stateId: "karnataka",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Mysuru_Montage.jpg",
			description: "A breathtaking Indo-Saracenic palace that glows with 97,000 bulbs on Sundays.",
			significance: "The former seat of the Wodeyar dynasty, one of India’s most visited monuments.",
			category: "palace"
		}, {
			id: "mysore-palace-detail",
			name: "Mysore Palace Domes",
			city: "Mysore",
			stateId: "karnataka",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/1280px-Mysore_Palace_Morning.jpg",
			description: "Intricate domes and arches blend Hindu, Islamic, and Gothic styles.",
			significance: "The palace architecture reflects Karnataka’s centuries of cultural synthesis.",
			category: "palace"
		}],
		traditions: [{
			name: "Yakshagana",
			description: "An all-night dance-drama with elaborate costumes and face paint.",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Yakshaganads.jpg"
		}, {
			name: "Sandalwood Carving",
			description: "Intricate carving from fragrant sandalwood, a Karnataka royal craft.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Wooden_toys.JPG/1280px-Wooden_toys.JPG"
		}],
		dances: [{
			name: "Kuchipudi",
			origin: "Andhra-Karnataka border",
			description: "A classical dance-drama with graceful movements and dramatic narration.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Kuchipudi_Performer_DS.jpg/1280px-Kuchipudi_Performer_DS.jpg"
		}],
		music: [{
			name: "Carnatic Music",
			region: "Karnataka",
			instruments: "Veena, Mridangam",
			description: "Karnataka is the birthplace of Carnatic music — Purandara Dasa, its father.",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Carnatic_Music_%28132527502%29.jpg"
		}],
		foods: [{
			name: "Mysore Pak",
			origin: "Mysore palace kitchens",
			description: "A rich, crumbly ghee-and-besan sweet invented by royal chef Kakasura Madappa.",
			whereToTry: "Guru Sweet Mart, Mysore",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mysore_pak.jpg/1280px-Mysore_pak.jpg"
		}, {
			name: "Bisi Bele Bath",
			origin: "Karnataka",
			description: "Hot rice with lentils, tamarind, and vegetables — \"hot lentil rice.\"",
			whereToTry: "MTR, Bengaluru",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Bisi_Bele_Bath_%28Bisibelebath%29.JPG/1280px-Bisi_Bele_Bath_%28Bisibelebath%29.JPG"
		}],
		festivals: [{
			name: "Mysore Dasara",
			description: "A ten-day festival with a caparisoned-elephant procession from the palace.",
			month: "September–October",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mysore_Palace_Dussera_%2829633564994%29.jpg/1280px-Mysore_Palace_Dussera_%2829633564994%29.jpg"
		}],
		artForms: [{
			name: "Mysore Painting",
			description: "Classical paintings with gold leaf and mineral pigments.",
			image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Mysorepalace.jpg"
		}, {
			name: "Channapatna Toys",
			description: "Lacquer-ware wooden toys made with vegetable dyes.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Kinnal_toys%2C_Karnataka.jpeg/1280px-Kinnal_toys%2C_Karnataka.jpeg"
		}],
		restaurants: [{
			id: "r14",
			name: "MTR",
			city: "Bengaluru",
			stateId: "karnataka",
			cuisine: "Karnataka",
			rating: 4.5,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Akki_Roti_-_A2B_-_Karnataka_-_Kae003.jpg",
			description: "The legendary Mavalli Tiffin Room since 1924."
		}],
		events: [{
			id: "e10",
			name: "Mysore Dasara",
			location: "Mysore, Karnataka",
			stateId: "karnataka",
			date: "Sep 26–Oct 5",
			month: "October",
			category: "Royal Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mysore_Dasara_procession.jpg",
			description: "A ten-day festival with the grand Jumboo Savari elephant procession."
		}]
	},
	{
		id: "odisha",
		name: "Odisha",
		capital: "Bhubaneswar",
		tagline: "The Land of Temples & Odissi",
		highlight: "Konark Sun Temple • Odissi • Pattachitra",
		description: "A state of ancient temples, exquisite dance, and living folk-art traditions. From the stone wheel of Konark to the painted scrolls of Pattachitra, Odisha is art in stone and color.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Brahmeswar_Temple%2C_Bhubaneswar.JPG/1280px-Brahmeswar_Temple%2C_Bhubaneswar.JPG",
		color: "#FF8C2A",
		mapPath: "M420,480 L490,470 L520,500 L510,540 L460,550 L420,530 L410,500 Z",
		mapLabelX: 465,
		mapLabelY: 510,
		places: [{
			id: "konark-sun-temple",
			name: "Konark Sun Temple",
			city: "Puri",
			stateId: "odisha",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg",
			description: "A 13th-century temple shaped like the Sun God’s chariot with twelve stone wheels.",
			significance: "A UNESCO World Heritage Site and the pinnacle of Kalinga architecture.",
			category: "temple"
		}, {
			id: "konark-wheel",
			name: "Konark Wheel",
			city: "Konark",
			stateId: "odisha",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Biranchinarayana_Temple_wooden_work.jpg/1280px-Biranchinarayana_Temple_wooden_work.jpg",
			description: "Each intricately carved wheel serves as a sundial, telling time to the minute.",
			significance: "The wheels are both artistic masterpieces and scientific instruments.",
			category: "heritage"
		}],
		traditions: [{
			name: "Pattachitra",
			description: "Painted scrolls on cloth depicting Jagannath and epic stories.",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Odisha_Pattachitara_Depicting_Unconditional_Love_between_Radha_Krushna.jpg"
		}, {
			name: "Applique Craft",
			description: "Colorful stitched fabric decorations for temple festivals, from Pipli.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Craft_Museum_01.jpg/1280px-Craft_Museum_01.jpg"
		}],
		dances: [{
			name: "Odissi",
			origin: "Odisha temples",
			description: "A classical dance of curving poses and fluid movements, born in temple sculptures.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Odissi_dance_at_Nishagandi_Dance_Festival_2024_%28207%29.jpg/1280px-Odissi_dance_at_Nishagandi_Dance_Festival_2024_%28207%29.jpg"
		}],
		music: [{
			name: "Odissi Music",
			region: "Odisha",
			instruments: "Manjira, Tabla, Harmonium",
			description: "A classical tradition accompanying Odissi dance, with roots in temple rituals.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Patitapaban.jpeg/1280px-Patitapaban.jpeg"
		}],
		foods: [{
			name: "Dahi Bara Aloo Dum",
			origin: "Cuttack",
			description: "Lentil fritters in yogurt with spicy potato curry — Odisha’s beloved street food.",
			whereToTry: "Cuttack street vendors",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Medu_Vadas.JPG/1280px-Medu_Vadas.JPG"
		}, {
			name: "Chhena Poda",
			origin: "Nayagarh",
			description: "A baked cottage-cheese dessert — \"burnt cheese\" — caramelized to perfection.",
			whereToTry: "Nayagarh bakeries",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Chhena_Haha_%E0%A5%A4_%E0%AC%9B%E0%AD%87%E0%AC%A8%E0%AC%BE_%E0%AC%97%E0%AC%9C%E0%AC%BE.jpg/1280px-Chhena_Haha_%E0%A5%A4_%E0%AC%9B%E0%AD%87%E0%AC%A8%E0%AC%BE_%E0%AC%97%E0%AC%9C%E0%AC%BE.jpg"
		}],
		festivals: [{
			name: "Rath Yatra",
			description: "The grand chariot festival of Lord Jagannath in Puri.",
			month: "July",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Rath_Yatra_Puri_07-11027.jpg/1280px-Rath_Yatra_Puri_07-11027.jpg"
		}],
		artForms: [{
			name: "Pattachitra",
			description: "Traditional cloth paintings with natural colors and fine borders.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Entrance_of_Raghurajpur.jpg/1280px-Entrance_of_Raghurajpur.jpg"
		}, {
			name: "Stone Carving",
			description: "Intricate soapstone carving in the Konark temple tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Stone_work_at_Konark_Orissa_India.jpg"
		}],
		restaurants: [{
			id: "r15",
			name: "Dalma",
			city: "Bhubaneswar",
			stateId: "odisha",
			cuisine: "Odia",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Traditional_Odial_Lunch_Thali.jpg/1280px-Traditional_Odial_Lunch_Thali.jpg",
			description: "Traditional Odia thali in a heritage setting."
		}],
		events: [{
			id: "e11",
			name: "Rath Yatra",
			location: "Puri, Odisha",
			stateId: "odisha",
			date: "Jul 7",
			month: "July",
			category: "Religious Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Rathyatra_Ahmedabad.jpg/1280px-Rathyatra_Ahmedabad.jpg",
			description: "Lord Jagannath’s chariot festival draws over a million pilgrims."
		}]
	},
	{
		id: "assam",
		name: "Assam",
		capital: "Dispur",
		tagline: "The Land of Tea & Bihu",
		highlight: "Tea Gardens • Bihu Dance • Muga Silk",
		description: "Misty tea gardens along the Brahmaputra, one-horned rhinos in Kaziranga, and the joyful rhythm of Bihu. Assam is the gateway to Northeast India.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/1280px-Beauty_of_Kaziranga_National_Park.jpg",
		color: "#0BA884",
		mapPath: "M580,280 L680,270 L720,300 L700,350 L640,360 L580,340 L560,310 Z",
		mapLabelX: 640,
		mapLabelY: 315,
		places: [{
			id: "kaziranga",
			name: "Kaziranga National Park",
			city: "Golaghat",
			stateId: "assam",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Rhinos_in_Kaziranga_National_Park.jpg/1280px-Rhinos_in_Kaziranga_National_Park.jpg",
			description: "A UNESCO park home to two-thirds of the world’s one-horned rhinos.",
			significance: "A conservation success story, protecting rhinos from near-extinction.",
			category: "nature"
		}],
		traditions: [{
			name: "Bihu",
			description: "Three festivals marking the agricultural cycle with dance and feasting.",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Women_of_Chutia_tribe_preparing_pithas.jpg"
		}, {
			name: "Muga Silk",
			description: "Golden silk unique to Assam, woven from semi-cultivated silkworms.",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/48/DWIJEN_%2843%29.jpg"
		}],
		dances: [{
			name: "Bihu",
			origin: "Assam",
			description: "A joyful spring dance with rapid hip movements and dhol beats.",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Bihu-Dance-assam.jpg"
		}],
		music: [{
			name: "Bihu Music",
			region: "Assam",
			instruments: "Dhol, Pepa, Gogona",
			description: "Songs of love and harvest accompanying Bihu celebrations.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bihu_on_Wheels_-_Rhythms_of_Assam_on_a_Rural_Ride.jpg/1280px-Bihu_on_Wheels_-_Rhythms_of_Assam_on_a_Rural_Ride.jpg"
		}],
		foods: [{
			name: "Assamese Thali",
			origin: "Assam",
			description: "A light meal centered on rice, fish tenga (sour curry), and khar.",
			whereToTry: "Khorikaa, Guwahati",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/South_Asia_%28orthographic_projection%29_without_national_boundaries%2C_with_ambiguities_indicated.svg/1280px-South_Asia_%28orthographic_projection%29_without_national_boundaries%2C_with_ambiguities_indicated.svg.png"
		}, {
			name: "Masor Tenga",
			origin: "Assam",
			description: "A tangy fish curry with elephant apple or lemon — summer comfort food.",
			whereToTry: "Assamese homes and restaurants in Guwahati",
			image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Assamese_Thali.jpg"
		}],
		festivals: [{
			name: "Bihu",
			description: "Three agricultural festivals — Bohag, Kati, and Magh — with dance and feasting.",
			month: "April",
			image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Buffalo_fight.jpg"
		}],
		artForms: [{
			name: "Muga Silk Weaving",
			description: "Weaving golden silk unique to Assam, durable for generations.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Colours_of_India_-_Silk_yarn_waiting_to_be_made_into_saris.jpg/1280px-Colours_of_India_-_Silk_yarn_waiting_to_be_made_into_saris.jpg"
		}, {
			name: "Bamboo Craft",
			description: "Baskets, mats, and decorative items from bamboo and cane.",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mukha_xilpa2.jpg"
		}],
		restaurants: [{
			id: "r16",
			name: "Khorikaa",
			city: "Guwahati",
			stateId: "assam",
			cuisine: "Assamese",
			rating: 4.5,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE%E0%A6%B0_%E0%A6%AB%E0%A7%81%E0%A6%9F%E0%A6%AA%E0%A6%BE%E0%A6%A4%E0%A7%87%E0%A6%B0_%E0%A6%9D%E0%A6%BE%E0%A6%B2%E0%A6%AE%E0%A7%81%E0%A6%A1%E0%A6%BC%E0%A6%BF.jpg/1280px-%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE%E0%A6%B0_%E0%A6%AB%E0%A7%81%E0%A6%9F%E0%A6%AA%E0%A6%BE%E0%A6%A4%E0%A7%87%E0%A6%B0_%E0%A6%9D%E0%A6%BE%E0%A6%B2%E0%A6%AE%E0%A7%81%E0%A6%A1%E0%A6%BC%E0%A6%BF.jpg",
			description: "Traditional Assamese thali with fish tenga and khar."
		}],
		events: [{
			id: "e12",
			name: "Bohag Bihu",
			location: "Guwahati, Assam",
			stateId: "assam",
			date: "Apr 14–16",
			month: "April",
			category: "Harvest Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bihu_dance_%E0%A6%B9%E0%A7%81%E0%A6%81%E0%A6%9A%E0%A7%B0%E0%A6%BF.jpg/1280px-Bihu_dance_%E0%A6%B9%E0%A7%81%E0%A6%81%E0%A6%9A%E0%A7%B0%E0%A6%BF.jpg",
			description: "Assamese New Year with Bihu dance, feasting, and bihu husori."
		}]
	},
	{
		id: "bihar",
		name: "Bihar",
		capital: "Patna",
		tagline: "The Cradle of Civilization",
		highlight: "Nalanda • Madhubani Art • Litti Chokha",
		description: "The land where Buddha attained enlightenment, where ancient Nalanda attracted scholars from across Asia, and where Madhubani art turns mud walls into masterpieces.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mahabodhi_temple_complex%2C_Bodhgaya_27.jpg/1280px-Mahabodhi_temple_complex%2C_Bodhgaya_27.jpg",
		color: "#A02E3A",
		mapPath: "M400,370 L470,360 L500,390 L490,430 L440,440 L400,420 L390,390 Z",
		mapLabelX: 445,
		mapLabelY: 400,
		places: [{
			id: "mahabodhi-temple",
			name: "Mahabodhi Temple",
			city: "Bodh Gaya",
			stateId: "bihar",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/1280px-Mahabodhitemple.jpg",
			description: "The sacred temple marking the spot where the Buddha attained enlightenment.",
			significance: "A UNESCO World Heritage Site and one of Buddhism’s holiest pilgrimage sites.",
			category: "temple"
		}, {
			id: "nalanda-ruins",
			name: "Nalanda University Ruins",
			city: "Nalanda",
			stateId: "bihar",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg/1280px-Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg",
			description: "Remains of the world’s oldest residential university, once housing 10,000 students.",
			significance: "A UNESCO site — the ancient center of learning that drew scholars from China, Tibet, and Persia.",
			category: "heritage"
		}],
		traditions: [{
			name: "Madhubani Art",
			description: "Intricate folk painting from Mithila, traditionally done by women on mud walls.",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Fort_of_Darbhanga.jpg"
		}, {
			name: "Manjusha Art",
			description: "Folk scroll painting depicting the Bihula legend, once nearly lost and now reviving.",
			image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Mahajanapadas_%28c._500_BCE%29.png"
		}],
		dances: [{
			name: "Jat-Jatin",
			origin: "Mithila region",
			description: "A duet folk dance expressing love and separation between Jat and Jatin.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Kankalini_Temple_5983.jpg/1280px-Kankalini_Temple_5983.jpg"
		}],
		music: [{
			name: "Bhojpuri Folk",
			region: "Bhojpur region",
			instruments: "Dholak, Harmonium, Manjira",
			description: "Vibrant folk songs of daily life, love, and seasonal festivals.",
			image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Bhojpuri_Speaking_region_%28Native%29.png"
		}],
		foods: [{
			name: "Litti Chokha",
			origin: "Bihar",
			description: "Roasted wheat balls stuffed with sattu, served with mashed spiced eggplant and tomato.",
			whereToTry: "Street vendors in Patna and Gaya",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Litti_Chokha_2.jpg/1280px-Litti_Chokha_2.jpg"
		}, {
			name: "Chaat Ka Pua",
			origin: "Patna",
			description: "A sweet lentil fritter made during festivals, soaked in sugar syrup.",
			whereToTry: "Patna sweet shops",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Malpoa_pitha.jpg/1280px-Malpoa_pitha.jpg"
		}],
		festivals: [{
			name: "Chhath Puja",
			description: "A four-day sun worship festival where devotees offer prayers at sunrise and sunset.",
			month: "November",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/JanakpurChhathParvaFestival.jpg/1280px-JanakpurChhathParvaFestival.jpg"
		}],
		artForms: [{
			name: "Madhubani Painting",
			description: "Natural-pigment folk art depicting mythology, nature, and daily life.",
			image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Maithil_Saree_Style_in_Kanyadan_Maithili_movie.jpg"
		}, {
			name: "Sikki Grass Craft",
			description: "Decorative items woven from golden sikki grass by Mithila women.",
			image: "https://upload.wikimedia.org/wikipedia/en/8/8f/Sikki_grass_craft.jpg"
		}],
		restaurants: [{
			id: "r17",
			name: "Bhojpuri Dhaba",
			city: "Patna",
			stateId: "bihar",
			cuisine: "Bihari",
			rating: 4.3,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg/1280px-Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg",
			description: "Authentic litti chokha and sattu paratha."
		}],
		events: [{
			id: "e13",
			name: "Chhath Puja",
			location: "Patna, Bihar",
			stateId: "bihar",
			date: "Nov 6–9",
			month: "November",
			category: "Religious Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Crackers_vishu_5.jpg/1280px-Crackers_vishu_5.jpg",
			description: "Devotees offer prayers to the Sun God at the Ganges at sunrise."
		}]
	},
	{
		id: "madhya-pradesh",
		name: "Madhya Pradesh",
		capital: "Bhopal",
		tagline: "The Heart of Incredible India",
		highlight: "Khajuraho • Gond Art • Poha",
		description: "At the geographic center of India, Madhya Pradesh holds the magnificent temples of Khajuraho, the tiger reserves of Kanha, and the ancient rock paintings of Bhimbetka.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/India-5749_-_Visvanatha_Temple_-_Flickr_-_archer10_%28Dennis%29.jpg/1280px-India-5749_-_Visvanatha_Temple_-_Flickr_-_archer10_%28Dennis%29.jpg",
		color: "#FF8C2A",
		mapPath: "M300,380 L380,370 L420,400 L410,460 L360,470 L310,450 L290,410 Z",
		mapLabelX: 355,
		mapLabelY: 420,
		places: [{
			id: "khajuraho",
			name: "Khajuraho Temples",
			city: "Khajuraho",
			stateId: "madhya-pradesh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/1_Khajuraho.jpg/1280px-1_Khajuraho.jpg",
			description: "A group of 25 surviving temples renowned for their intricate Nagara-style architecture.",
			significance: "A UNESCO World Heritage Site celebrating art, spirituality, and human emotion in stone.",
			category: "temple"
		}, {
			id: "bhimbetka",
			name: "Bhimbetka Rock Shelters",
			city: "Bhopal",
			stateId: "madhya-pradesh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rock_Shelter_8%2C_Bhimbetka_02.jpg/1280px-Rock_Shelter_8%2C_Bhimbetka_02.jpg",
			description: "Prehistoric rock paintings dating back 30,000 years, depicting early human life.",
			significance: "A UNESCO site showing the earliest traces of human art in India.",
			category: "heritage"
		}],
		traditions: [{
			name: "Gond Art",
			description: "Tribal painting with dots and dashes depicting nature and mythology in vivid colors.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Women_in_adivasi_village%2C_Umaria_district%2C_India.jpg/1280px-Women_in_adivasi_village%2C_Umaria_district%2C_India.jpg"
		}, {
			name: "Bagh Print",
			description: "Natural block printing on fabric using vegetable dyes in the Bagh village tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Traditional_Bagh_hand_block_print_master_craftsman-artisan-artist_Mohammed_Bilal_Khatri%2C_Madhya_Pradesh%2C_India.jpg/1280px-Traditional_Bagh_hand_block_print_master_craftsman-artisan-artist_Mohammed_Bilal_Khatri%2C_Madhya_Pradesh%2C_India.jpg"
		}],
		dances: [{
			name: "Tertali",
			origin: "Kamars tribe",
			description: "A ritual dance where women balance clay pots while crouching and moving to cymbals.",
			image: IMG.bharatanatyam
		}],
		music: [{
			name: "Bundeli Folk",
			region: "Bundelkhand",
			instruments: "Dholak, Sarangi",
			description: "Rustic folk songs of the Bundelkhand region, celebrating seasons and legends.",
			image: IMG.tabla2
		}],
		foods: [{
			name: "Poha",
			origin: "Indore",
			description: "Flattened rice tempered with mustard, turmeric, and sev — the beloved MP breakfast.",
			whereToTry: "Indore street vendors and Sarafa Bazaar",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Poha_at_Jal_Mahotsav%2C_Hanuwantiya%2C_Madhya_Pradesh_%281%29.jpg/1280px-Poha_at_Jal_Mahotsav%2C_Hanuwantiya%2C_Madhya_Pradesh_%281%29.jpg"
		}, {
			name: "Bhutte ka Kees",
			origin: "Indore",
			description: "Grated corn cooked with milk and spices — a monsoon specialty.",
			whereToTry: "Indore restaurants",
			image: IMG.thali2
		}],
		festivals: [{
			name: "Khajuraho Dance Festival",
			description: "A week of classical dance performances against the backdrop of the ancient temples.",
			month: "February",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shinjini_kathak_dance_indian_classical_khajuraho_festival.jpg/1280px-Shinjini_kathak_dance_indian_classical_khajuraho_festival.jpg"
		}],
		artForms: [{
			name: "Gond Painting",
			description: "Tribal art with intricate patterns of dots and lines in bright colors.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/JSS_at_BB.jpeg/1280px-JSS_at_BB.jpeg"
		}, {
			name: "Bell Metal Craft",
			description: "Tribal metal casting using the lost-wax technique from Bastar.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/30/022a-bastar_ladies_all_togather.jpg"
		}],
		restaurants: [{
			id: "r18",
			name: "Sarafa Bazaar Stalls",
			city: "Indore",
			stateId: "madhya-pradesh",
			cuisine: "Street Food",
			rating: 4.6,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Soul_Food_at_Powell%27s_Place.jpg/1280px-Soul_Food_at_Powell%27s_Place.jpg",
			description: "India’s best night street food market — poha, jalebi, and garadu."
		}],
		events: [{
			id: "e14",
			name: "Khajuraho Dance Festival",
			location: "Khajuraho, MP",
			stateId: "madhya-pradesh",
			date: "Feb 20–26",
			month: "February",
			category: "Dance Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kandaria_mahadev_Khajuraho_Temple.jpg/1280px-Kandaria_mahadev_Khajuraho_Temple.jpg",
			description: "Classical dance performed by India’s best artists at the ancient temples."
		}]
	},
	{
		id: "andhra-pradesh",
		name: "Andhra Pradesh",
		capital: "Amaravati",
		tagline: "The Land of Spices & Temples",
		highlight: "Tirupati • Kuchipudi • Spicy Biryani",
		description: "Home to the world’s richest temple at Tirupati, the birthplace of Kuchipudi dance, and some of India’s spiciest cuisine. A state where devotion and flavor run deep.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg",
		color: "#C13A47",
		mapPath: "M260,600 L320,590 L350,620 L350,670 L310,690 L270,680 L250,640 Z",
		mapLabelX: 300,
		mapLabelY: 640,
		places: [{
			id: "tirupati",
			name: "Tirumala Venkateswara Temple",
			city: "Tirupati",
			stateId: "andhra-pradesh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Tirumala_Venkateswara_temple_entrance_09062015.JPG/1280px-Tirumala_Venkateswara_temple_entrance_09062015.JPG",
			description: "The most visited Hindu temple in the world, atop the seven hills of Tirumala.",
			significance: "The richest temple on earth, receiving 50,000+ daily pilgrims dedicated to Lord Venkateswara.",
			category: "temple"
		}],
		traditions: [{
			name: "Kalamkari",
			description: "Hand-painted or block-printed cotton textile using natural dyes, depicting epics.",
			image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Kalamkari_painting_of_Lord_Vishnu_on_serpent_Ananta.jpg"
		}, {
			name: "Etikoppaka Toys",
			description: "Wooden lacquer toys made with vegetable dyes, a 400-year craft tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hanuman_and_Ravana_in_Tholu_Bommalata%2C_the_shadow_puppet_tradition_of_Andhra_Pradesh%2C_India.JPG/1280px-Hanuman_and_Ravana_in_Tholu_Bommalata%2C_the_shadow_puppet_tradition_of_Andhra_Pradesh%2C_India.JPG"
		}],
		dances: [{
			name: "Kuchipudi",
			origin: "Kuchipudi village",
			description: "A classical dance-drama known for its graceful movements and plate-balancing acts.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bhavana_Reddy_Kuchipudi.jpg/1280px-Bhavana_Reddy_Kuchipudi.jpg"
		}],
		music: [{
			name: "Carnatic Music",
			region: "Andhra",
			instruments: "Veena, Mridangam",
			description: "Home to some of Carnatic music’s greatest composers including Tyagaraja.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tanjore-style_Carnatic_tambura.JPG/1280px-Tanjore-style_Carnatic_tambura.JPG"
		}],
		foods: [{
			name: "Andhra Biryani",
			origin: "Andhra Pradesh",
			description: "A fiery green-chili biryani known for its intense spice and bold flavors.",
			whereToTry: "Andhra restaurants in Vijayawada",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Vegetarian_Andhra_Meal.jpg/1280px-Vegetarian_Andhra_Meal.jpg"
		}, {
			name: "Gongura Pappu",
			description: "Lentil curry with sour gongura (sorrel) leaves — a signature Andhra dish.",
			whereToTry: "Traditional Andhra mess halls",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg"
		}],
		festivals: [{
			name: "Brahmotsavam",
			description: "A nine-day festival at Tirumala with processions of the deity on various vahanas.",
			month: "September–October",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Lord_Venkateswara_on_Gaja_Vahanam..JPG/1280px-Lord_Venkateswara_on_Gaja_Vahanam..JPG"
		}],
		artForms: [{
			name: "Kalamkari",
			description: "Intricate hand-painted textile art using natural dyes and bamboo pens.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kalamkari_painting.jpg/1280px-Kalamkari_painting.jpg"
		}],
		restaurants: [{
			id: "r19",
			name: "Andhra Spice",
			city: "Vijayawada",
			stateId: "andhra-pradesh",
			cuisine: "Andhra",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nepali_dal-bhat-tarkari.jpg/1280px-Nepali_dal-bhat-tarkari.jpg",
			description: "Authentic spicy Andhra meals served on a banana leaf."
		}],
		events: []
	},
	{
		id: "telangana",
		name: "Telangana",
		capital: "Hyderabad",
		tagline: "The City of Nizams & Pearls",
		highlight: "Charminar • Perini Dance • Hyderabadi Biryani",
		description: "India’s youngest state, anchored by historic Hyderabad — a city of Nizams, pearls, biryani, and the iconic Charminar. A blend of Mughal, Persian, and Telugu cultures.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/f/f7/A_typical_charminar_evening.jpg",
		color: "#3D5AFE",
		mapPath: "M240,580 L300,570 L330,600 L320,640 L280,650 L240,630 L230,600 Z",
		mapLabelX: 280,
		mapLabelY: 610,
		places: [{
			id: "charminar",
			name: "Charminar",
			city: "Hyderabad",
			stateId: "telangana",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/1280px-Charminar_Hyderabad_1.jpg",
			description: "A 16th-century monument with four grand arches, built to commemorate the end of a plague.",
			significance: "The icon of Hyderabad, standing at the heart of the old city’s bustling bazaars.",
			category: "monument"
		}, {
			id: "golconda-fort",
			name: "Golconda Fort",
			city: "Hyderabad",
			stateId: "telangana",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/1280px-Golconda_Fort_005.jpg",
			description: "A massive hilltop fort once famous for its diamond trade, including the Koh-i-Noor.",
			significance: "Home to the legendary acoustics system where a hand clap at the gate is heard at the summit.",
			category: "fort"
		}],
		traditions: [{
			name: "Perini Shivatandavam",
			description: "A warrior dance from the Kakatiya era, revived in modern times.",
			image: IMG.kathakali
		}, {
			name: "Bidriware",
			description: "Metal handicraft with silver inlay on a black alloy, from Bidar tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Bidriware_Hookah.jpg"
		}],
		dances: [{
			name: "Perini Shivatandavam",
			origin: "Kakatiya dynasty",
			description: "A vigorous male warrior dance invoking Lord Shiva, lost for centuries and revived.",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/19/%E0%B0%AA%E0%B1%87%E0%B0%B0%E0%B0%BF%E0%B0%A3%E0%B1%80_%E0%B0%B6%E0%B0%BF%E0%B0%B5%E0%B0%A4%E0%B0%BE%E0%B0%82%E0%B0%A1%E0%B0%B5%E0%B0%82_.png"
		}],
		music: [{
			name: "Carnatic Music",
			region: "Telangana",
			instruments: "Veena, Mridangam",
			description: "A rich classical tradition, with Ramakrishna Theater keeping it alive in Hyderabad.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tanjore-style_Carnatic_tambura.JPG/1280px-Tanjore-style_Carnatic_tambura.JPG"
		}],
		foods: [{
			name: "Hyderabadi Biryani",
			origin: "Hyderabad Nizam kitchens",
			description: "A fragrant dum biryani of basmati, meat, and saffron, slow-cooked in a sealed pot.",
			whereToTry: "Paradise Restaurant, Hyderabad",
			image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hyderabadi_Mutton_Haleem.jpg"
		}, {
			name: "Haleem",
			origin: "Hyderabad",
			description: "A rich wheat-and-meat porridge served during Ramadan, a Hyderabadi specialty.",
			whereToTry: "Pista House, Hyderabad (during Ramadan)",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pakistani_Haleem_served_with_garnish.jpg/1280px-Pakistani_Haleem_served_with_garnish.jpg"
		}],
		festivals: [{
			name: "Bathukamma",
			description: "A floral festival where women arrange colorful flower stacks in concentric layers.",
			month: "September–October",
			image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/%E0%B0%AC%E0%B0%A4%E0%B1%81%E0%B0%95%E0%B0%AE%E0%B1%8D%E0%B0%AE.jpg"
		}],
		artForms: [{
			name: "Bidriware",
			description: "Silver-inlaid black metal craft, a Persian-influenced tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg/1280px-Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg"
		}],
		restaurants: [{
			id: "r20",
			name: "Paradise Restaurant",
			city: "Hyderabad",
			stateId: "telangana",
			cuisine: "Hyderabadi",
			rating: 4.5,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Coronation_portrait_of_the_VIIth_Nizam.jpg/1280px-Coronation_portrait_of_the_VIIth_Nizam.jpg",
			description: "The most famous Hyderabadi biryani since 1953."
		}],
		events: []
	},
	{
		id: "jharkhand",
		name: "Jharkhand",
		capital: "Ranchi",
		tagline: "The Land of Forests & Tribes",
		highlight: "Hundru Falls • Chhau Dance • Dhuska",
		description: "A state of dense forests, waterfalls, and over 30 indigenous tribes. Jharkhand is where nature and tribal heritage create a unique cultural mosaic.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg/1280px-Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg",
		color: "#0BA884",
		mapPath: "M430,370 L490,360 L510,390 L500,420 L460,430 L430,410 L420,390 Z",
		mapLabelX: 465,
		mapLabelY: 395,
		places: [{
			id: "hundru-falls",
			name: "Hundru Falls",
			city: "Ranchi",
			stateId: "jharkhand",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hundru_Falls%2C_Jharkhand%2C_India_4.jpg/1280px-Hundru_Falls%2C_Jharkhand%2C_India_4.jpg",
			description: "A spectacular 98-meter waterfall on the Subarnarekha River.",
			significance: "One of the most photographed waterfalls in eastern India, surrounded by tribal villages.",
			category: "nature"
		}],
		traditions: [{
			name: "Sohrai Painting",
			description: "Tribal wall art by Santhal women, featuring animals and harvest scenes.",
			image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Sanskritihzb.jpg"
		}, {
			name: "Paitkar Scroll Painting",
			description: "One of India’s oldest scroll painting traditions, depicting mythological stories.",
			image: IMG.textiles
		}],
		dances: [{
			name: "Chhau",
			origin: "Seraikela",
			description: "A masked martial dance blending combat movements with storytelling.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Folk_Dances_of_Jharkhand_-_Documentary_-_EZCC.webm/500px--Folk_Dances_of_Jharkhand_-_Documentary_-_EZCC.webm.jpg"
		}],
		music: [{
			name: "Tribal Folk",
			region: "Jharkhand",
			instruments: "Mandar, Tirio, Tumdak",
			description: "Songs of the Santhal, Munda, and Oraon tribes celebrating nature and seasons.",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Classical_dances_of_India.jpg"
		}],
		foods: [{
			name: "Dhuska",
			origin: "Jharkhand",
			description: "Deep-fried rice-and-lentil bread, served with spicy potato curry.",
			whereToTry: "Street stalls in Ranchi",
			image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Ghugni.jpg"
		}, {
			name: "Rugra",
			origin: "Jharkhand tribes",
			description: "A tribal mushroom delicacy from the forests, rich in protein.",
			whereToTry: "Tribal food stalls in Ranchi",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/India_Jharkhand_locator_map.svg/1280px-India_Jharkhand_locator_map.svg.png"
		}],
		festivals: [{
			name: "Sarhul",
			description: "The tribal spring festival worshipping trees and nature with dance and song.",
			month: "March–April",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Holy_Prayer.jpg/1280px-Holy_Prayer.jpg"
		}],
		artForms: [{
			name: "Sohrai Art",
			description: "Tribal painting with natural earth colors, done during the harvest festival.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg/1280px-Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg"
		}],
		restaurants: [{
			id: "r21",
			name: "Tribal Taste",
			city: "Ranchi",
			stateId: "jharkhand",
			cuisine: "Jharkhandi",
			rating: 4.2,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Nasi_Lemak_dengan_Ayam_Goreng_Krispy_dengan_Sos_chili.jpg/1280px-Nasi_Lemak_dengan_Ayam_Goreng_Krispy_dengan_Sos_chili.jpg",
			description: "Authentic tribal cuisine including dhuska and rugra."
		}],
		events: []
	},
	{
		id: "chhattisgarh",
		name: "Chhattisgarh",
		capital: "Raipur",
		tagline: "The Rice Bowl of India",
		highlight: "Chitrakote Falls • Pandwani • Tribal Art",
		description: "A state of magnificent waterfalls, ancient tribal traditions, and the widest waterfall in India. Chhattisgarh is one of the most culturally rich and least explored regions.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bhoramdeo_Temple%2C_Kawardha.jpg/1280px-Bhoramdeo_Temple%2C_Kawardha.jpg",
		color: "#0BA884",
		mapPath: "M340,440 L410,430 L440,460 L430,500 L380,510 L340,490 L330,460 Z",
		mapLabelX: 385,
		mapLabelY: 470,
		places: [{
			id: "chitrakote-falls",
			name: "Chitrakote Falls",
			city: "Jagdalpur",
			stateId: "chhattisgarh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Chitrakot_waterfalls.JPG/1280px-Chitrakot_waterfalls.JPG",
			description: "The widest waterfall in India, a horseshoe cascade on the Indravati River.",
			significance: "Called the \"Niagara of India,\" it spans 300 meters during monsoon season.",
			category: "nature"
		}],
		traditions: [{
			name: "Pandwani",
			description: "A musical storytelling tradition where a single performer narrates the Mahabharata.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Naya_Raipur%2C_Sector_19.png/1280px-Naya_Raipur%2C_Sector_19.png"
		}, {
			name: "Tribal Haat",
			description: "Weekly tribal markets where forest produce, crafts, and culture converge.",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Bhawanipatna_Shine.JPG"
		}],
		dances: [{
			name: "Raut Nacha",
			origin: "Yadav community",
			description: "A devotional dance-drama performed by cowherds during Diwali, celebrating Krishna.",
			image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Raut_Nacha.jpg"
		}],
		music: [{
			name: "Pandwani",
			region: "Chhattisgarh",
			instruments: "Ektara, Tambura",
			description: "A powerful oral tradition where one performer enacts the entire Mahabharata.",
			image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Language_Map_of_India.jpg"
		}],
		foods: [{
			name: "Chila",
			origin: "Chhattisgarh",
			description: "A savory rice-flour pancake, a staple breakfast across the state.",
			whereToTry: "Street vendors in Raipur",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Trombidium.jpg"
		}, {
			name: "Fara",
			origin: "Chhattisgarh",
			description: "Steamed rice dumplings with lentils — a humble tribal delicacy.",
			whereToTry: "Raipur traditional restaurants",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Bilaspur_Junction_Railway_Station_Building_001.jpg/1280px-Bilaspur_Junction_Railway_Station_Building_001.jpg"
		}],
		festivals: [{
			name: "Bastar Dussehra",
			description: "The world’s longest Dussehra festival, lasting 75 days with tribal rituals.",
			month: "October",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bastar_Dusshera_Unexplored_Bastar.jpg/1280px-Bastar_Dusshera_Unexplored_Bastar.jpg"
		}],
		artForms: [{
			name: "Dhokra Bell Metal",
			description: "Ancient lost-wax metal casting craft from Bastar, over 4,000 years old.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Village_lady_grinding_ants_for_her_family.jpg"
		}],
		restaurants: [{
			id: "r22",
			name: "Bastar Kitchen",
			city: "Raipur",
			stateId: "chhattisgarh",
			cuisine: "Chhattisgarhi",
			rating: 4.2,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chopsueywithrice.jpg/1280px-Chopsueywithrice.jpg",
			description: "Traditional tribal cuisine including chila and fara."
		}],
		events: []
	},
	{
		id: "uttarakhand",
		name: "Uttarakhand",
		capital: "Dehradun",
		tagline: "The Land of Gods & Himalayas",
		highlight: "Char Dham • Aipan Art • Bal Mithai",
		description: "The abode of the Himalayas, sacred rivers, and the Char Dham pilgrimage. Uttarakhand is where spirituality meets mountain grandeur, from Rishikesh to the Valley of Flowers.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Nanda_Devi_-_Hidden_Summit%2C_Uttarakhand_India_2013.jpg/1280px-Nanda_Devi_-_Hidden_Summit%2C_Uttarakhand_India_2013.jpg",
		color: "#3D5AFE",
		mapPath: "M310,90 L400,80 L440,120 L420,170 L370,180 L320,160 L300,120 Z",
		mapLabelX: 370,
		mapLabelY: 130,
		places: [{
			id: "valley-of-flowers",
			name: "Valley of Flowers",
			city: "Chamoli",
			stateId: "uttarakhand",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Badrinath_temple_-_Uttarakhand.jpg/1280px-Badrinath_temple_-_Uttarakhand.jpg",
			description: "A UNESCO-listed national park carpeted with 500+ species of alpine wildflowers.",
			significance: "A trekker’s paradise in the Himalayas, blooming from July to September.",
			category: "nature"
		}, {
			id: "rishikesh",
			name: "Rishikesh — Yoga Capital",
			city: "Rishikesh",
			stateId: "uttarakhand",
			image: IMG.varanasi,
			description: "The world capital of yoga, on the banks of the Ganges at the foothills of the Himalayas.",
			significance: "Home to ancient ashrams and the International Yoga Festival, drawing seekers worldwide.",
			category: "spiritual"
		}],
		traditions: [{
			name: "Aipan",
			description: "Traditional floor painting with red ochre and white rice paste, done during festivals.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Aipan_design_.jpg/1280px-Aipan_design_.jpg"
		}, {
			name: "Pahari Painting",
			description: "Hill-region miniature painting style depicting Krishna and Himalayan landscapes.",
			image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/DANCE_OF_HIMANCHAL_PRADESH.jpg"
		}],
		dances: [{
			name: "Chholiya",
			origin: "Kumaon",
			description: "A martial sword-and-shield dance performed at Kumaoni weddings.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cholliyar.jpg/1280px-Cholliyar.jpg"
		}],
		music: [{
			name: "Pahari Folk",
			region: "Garhwal & Kumaon",
			instruments: "Dhol, Daur, Thali",
			description: "Mountain songs reflecting the beauty and hardships of Himalayan life.",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jakhoo_Mandir_and_Moorti_drone_view.jpg"
		}],
		foods: [{
			name: "Bal Mithai",
			origin: "Almora",
			description: "A chocolate-colored fudge coated in white sugar balls — a Kumaoni favorite.",
			whereToTry: "Sweet shops in Almora",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Desserts.jpg/1280px-Desserts.jpg"
		}, {
			name: "Kafuli",
			origin: "Uttarakhand",
			description: "A thick gravy of leafy greens (spinach and fenugreek) with rice paste.",
			whereToTry: "Garhwali restaurants in Dehradun",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Uttarakhand_-_cuisines.jpg/1280px-Uttarakhand_-_cuisines.jpg"
		}],
		festivals: [{
			name: "Kumbh Mela",
			description: "The largest peaceful gathering on earth, held every 12 years at Haridwar.",
			month: "Every 12 years",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Allahabad_Kumbh_Mela_2013_by_shak.on.jpg/1280px-Allahabad_Kumbh_Mela_2013_by_shak.on.jpg"
		}],
		artForms: [{
			name: "Aipan",
			description: "Ritual floor painting with geometric and floral patterns in red and white.",
			image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Diya_deepak_Diwali_rangoli_in_goa.JPG"
		}, {
			name: "Ringal Craft",
			description: "Bamboo basketry and crafts from the hill regions.",
			image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Kedarnath_Temple_with_Snow_Covered_Mountains_in_Background.jpg"
		}],
		restaurants: [{
			id: "r23",
			name: "Garhwal Bhoj",
			city: "Dehradun",
			stateId: "uttarakhand",
			cuisine: "Garhwali",
			rating: 4.3,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Chaunkphoto.jpg/1280px-Chaunkphoto.jpg",
			description: "Authentic Garhwali cuisine including kafuli and bhatt ki chudkani."
		}],
		events: []
	},
	{
		id: "himachal-pradesh",
		name: "Himachal Pradesh",
		capital: "Shimla",
		tagline: "The Land of Snow & Pines",
		highlight: "Manali • Kinnauri Shawl • Siddu",
		description: "Snow-capped peaks, colonial hill stations, and Tibetan Buddhist monasteries. Himachal is where adventure, spirituality, and mountain culture meet in the Himalayas.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg/1280px-Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg",
		color: "#3D5AFE",
		mapPath: "M230,80 L320,70 L360,110 L340,150 L280,160 L230,140 L220,110 Z",
		mapLabelX: 290,
		mapLabelY: 115,
		places: [{
			id: "spiti-valley",
			name: "Spiti Valley",
			city: "Spiti",
			stateId: "himachal-pradesh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg/1280px-Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg",
			description: "A cold desert mountain valley with ancient monasteries perched on cliffs.",
			significance: "Home to Key Monastery, one of the oldest Tibetan Buddhist centers in the world.",
			category: "nature"
		}],
		traditions: [{
			name: "Kinnauri Shawl",
			description: "Handwoven wool shawls with geometric patterns, a heritage craft from Kinnaur.",
			image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/A_place_of_devotion.jpg"
		}, {
			name: "Kullu Cap",
			description: "Colorful woolen caps with bright border patterns, a symbol of Kullu valley.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/1280px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg"
		}],
		dances: [{
			name: "Nati",
			origin: "Kullu & Shimla",
			description: "A group folk dance in traditional attire, performed at festivals in slow circular patterns.",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kinnauri_Nati_dance.jpg"
		}],
		music: [{
			name: "Pahari Folk",
			region: "Himachal",
			instruments: "Karnal, Ranasingha, Dhol",
			description: "Mountain folk songs celebrating seasons, weddings, and harvests.",
			image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Miniature_painting_showing_Dushyant_and_Shakuntala%28_based_on_the_epic_Mahabharata%29%2C_circa_1840%2C_Nalagarh%2C_Himachal_Pradesh_National_Museum%2C_Delhi.jpg"
		}],
		foods: [{
			name: "Siddu",
			origin: "Himachal",
			description: "A steamed wheat bread stuffed with poppy seeds or lentil paste, served with ghee.",
			whereToTry: "Kullu and Manali restaurants",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Siddu_Ghee.JPG/1280px-Siddu_Ghee.JPG"
		}, {
			name: "Chha Gosht",
			origin: "Himachal",
			description: "A spiced mutton curry with chickpea flour and yogurt — a Himachali specialty.",
			whereToTry: "Shimla traditional restaurants",
			image: IMG.thali2
		}],
		festivals: [{
			name: "Kullu Dussehra",
			description: "A seven-day festival where 300+ village deities gather in the Kullu valley.",
			month: "October",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Raghunath_Ji_and_Mata_Sita.jpg"
		}],
		artForms: [{
			name: "Kinnauri Weaving",
			description: "Fine wool weaving with symbolic geometric patterns unique to Kinnaur.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Kardhang_Biling_Bhaga_Dhauladhar_Oct22_A7C_04645.jpg/1280px-Kardhang_Biling_Bhaga_Dhauladhar_Oct22_A7C_04645.jpg"
		}],
		restaurants: [{
			id: "r24",
			name: "Café Shimla",
			city: "Shimla",
			stateId: "himachal-pradesh",
			cuisine: "Himachali",
			rating: 4.3,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Fluffy_Poori_%28cropped%29.JPG/1280px-Fluffy_Poori_%28cropped%29.JPG",
			description: "Cozy hilltop café serving siddu and chha gosht."
		}],
		events: []
	},
	{
		id: "goa",
		name: "Goa",
		capital: "Panaji",
		tagline: "Pearl of the Orient",
		highlight: "Beaches • Fado Music • Bebinca",
		description: "India’s smallest state, where Portuguese heritage meets tropical beaches. Goa is sun, sand, seafood, and the sound of guitars — a unique Indo-European cultural blend.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/1280px-BeachFun.jpg",
		color: "#0BA884",
		mapPath: "M150,540 L190,530 L210,560 L200,590 L170,600 L150,580 L140,560 Z",
		mapLabelX: 175,
		mapLabelY: 565,
		places: [{
			id: "basilica-bom-jesus",
			name: "Basilica of Bom Jesus",
			city: "Old Goa",
			stateId: "goa",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/1280px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg",
			description: "A 16th-century baroque church housing the remains of St. Francis Xavier.",
			significance: "A UNESCO World Heritage Site and one of the most important Christian pilgrimage sites in Asia.",
			category: "heritage"
		}],
		traditions: [{
			name: "Fado",
			description: "Portuguese melancholic folk music kept alive in Goan homes and taverns.",
			image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Um_casal_de_Viana_%28Portugal%29.jpg"
		}, {
			name: "Carnival",
			description: "A four-day pre-Lenten festival with floats, music, and Portuguese-influenced pageantry.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lingelbach_Karneval_in_Rom_001.jpg/1280px-Lingelbach_Karneval_in_Rom_001.jpg"
		}],
		dances: [{
			name: "Fugdi",
			origin: "Goa",
			description: "A folk dance where women form circles and clap while swaying in rhythmic patterns.",
			image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Fugdi_Dancers_from_South_Goa.jpg"
		}],
		music: [{
			name: "Mando",
			region: "Goa",
			instruments: "Violin, Guitar",
			description: "A Indo-Portuguese musical form blending sad romantic lyrics with elegant dance.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Armand_Duplantis_wins_the_Pole_Vault_at_the_2026_Wanda_Diamond_League%E2%80%99s_Weltklasse_Z%C3%BCrich_athletics_competition.jpg/1280px-Armand_Duplantis_wins_the_Pole_Vault_at_the_2026_Wanda_Diamond_League%E2%80%99s_Weltklasse_Z%C3%BCrich_athletics_competition.jpg"
		}],
		foods: [{
			name: "Bebinca",
			origin: "Goa",
			description: "A multi-layered coconut and egg pudding, Goa’s most famous dessert.",
			whereToTry: "Bebinca bakeries in Panaji",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bebinca_com_gelado.jpg/1280px-Bebinca_com_gelado.jpg"
		}, {
			name: "Goan Fish Curry",
			origin: "Goa",
			description: "A tangy coconut-and-kokum fish curry with rice, a staple of Goan homes.",
			whereToTry: "Beach shacks across Goa",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bengali_Mutton_Curry.JPG/1280px-Bengali_Mutton_Curry.JPG"
		}],
		festivals: [{
			name: "Goa Carnival",
			description: "A four-day festival of floats, music, dancing, and feasting before Lent.",
			month: "February",
			image: "https://upload.wikimedia.org/wikipedia/en/1/1f/Goa_Carnaval.jpg"
		}],
		artForms: [{
			name: "Pottery & Terracotta",
			description: "Traditional red-clay pottery from Bicholim, a Goan craft heritage.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cavalcade_south_frieze_Parthenon_BM.jpg/1280px-Cavalcade_south_frieze_Parthenon_BM.jpg"
		}],
		restaurants: [{
			id: "r25",
			name: "Martin’s Beach Corner",
			city: "Panaji",
			stateId: "goa",
			cuisine: "Goan",
			rating: 4.5,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Goan_Xit_kodi.jpg",
			description: "Authentic Goan fish curry and bebinca by the riverside."
		}],
		events: []
	},
	{
		id: "haryana",
		name: "Haryana",
		capital: "Chandigarh",
		tagline: "The Land of Rotis & Wrestling",
		highlight: "Kurukshetra • Phulkari • Kachri",
		description: "An agricultural heartland known for its dairy, wrestlers, and folk traditions. Haryana is the mythological battlefield of Kurukshetra and a proud, rural culture.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Cyber_City_View.jpg/1280px-Cyber_City_View.jpg",
		color: "#F5B800",
		mapPath: "M220,160 L300,150 L330,180 L320,220 L270,230 L220,210 L210,180 Z",
		mapLabelX: 265,
		mapLabelY: 190,
		places: [{
			id: "kurukshetra",
			name: "Kurukshetra",
			city: "Kurukshetra",
			stateId: "haryana",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Kurukshetra_junction_kkde.jpg",
			description: "The battlefield of the Mahabharata, where the Bhagavad Gita was delivered.",
			significance: "One of Hinduism’s most sacred places, home to the Brahma Sarovar and Gita museum.",
			category: "spiritual"
		}],
		traditions: [{
			name: "Phulkari",
			description: "\"Flower work\" embroidery, shared across Punjab and Haryana, on coarse hand-spun cloth.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Khes.jpg/1280px-Khes.jpg"
		}, {
			name: "Chaupaal",
			description: "Traditional village gathering under a banyan tree for storytelling and community decisions.",
			image: IMG.market
		}],
		dances: [{
			name: "Ghoomar",
			origin: "Haryana",
			description: "A twirling dance in flowing skirts, shared with the Rajasthani tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Kruti_Mahesh_Choreographer.jpg"
		}],
		music: [{
			name: "Ragini",
			region: "Haryana",
			instruments: "Dholak, Ektara",
			description: "A folk musical form blending storytelling, social commentary, and devotional themes.",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Ragini_Khanna_on_Day_5_of_Lakme_Fashion_Week_2017_%2847%29_%28cropped%29.jpg"
		}],
		foods: [{
			name: "Kachri ki Sabzi",
			origin: "Haryana",
			description: "A tangy wild-melon curry, a rustic village dish of the Haryana plains.",
			whereToTry: "Haryanvi dhabas",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/51/The_delicious_Rajasthani_food.png"
		}, {
			name: "Bajra Khichdi",
			origin: "Haryana",
			description: "A hearty pearl-millet and lentil porridge, served with ghee and jaggery.",
			whereToTry: "Village dhabas across Haryana",
			image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Dall_Khichdi.jpg"
		}],
		festivals: [{
			name: "Gita Mahotsav",
			description: "A festival celebrating the Bhagavad Gita at Kurukshetra with fairs and discourses.",
			month: "November–December",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg/1280px-BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg"
		}],
		artForms: [{
			name: "Phulkari",
			description: "Dense thread embroidery creating floral patterns on coarse fabric.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Contemporary_Phulkari_design.jpg/1280px-Contemporary_Phulkari_design.jpg"
		}],
		restaurants: [{
			id: "r26",
			name: "Jat Dhaba",
			city: "Kurukshetra",
			stateId: "haryana",
			cuisine: "Haryanvi",
			rating: 4.2,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Northwest_India_map.svg/1280px-Northwest_India_map.svg.png",
			description: "Rustic Haryanvi dhaba serving bajra khichdi and fresh dairy."
		}],
		events: []
	},
	{
		id: "delhi",
		name: "Delhi",
		capital: "New Delhi",
		tagline: "The Capital of Many Empires",
		highlight: "Red Fort • Qutub Minar • Paratha Wali Gali",
		description: "A city where seven empires left their mark — from Mughal forts to colonial avenues. Delhi is a living museum of India’s layered history and a paradise for food lovers.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jama_Masjid_2011.jpg/1280px-Jama_Masjid_2011.jpg",
		color: "#C13A47",
		mapPath: "M270,220 L330,210 L360,240 L350,280 L300,290 L260,270 L255,240 Z",
		mapLabelX: 305,
		mapLabelY: 250,
		places: [
			{
				id: "red-fort",
				name: "Red Fort",
				city: "Delhi",
				stateId: "delhi",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Delhi_fort.jpg/1280px-Delhi_fort.jpg",
				description: "The massive red sandstone fort built by Shah Jahan, from where India’s PM addresses the nation.",
				significance: "A UNESCO World Heritage Site and the symbol of India’s independence.",
				category: "fort"
			},
			{
				id: "qutub-minar",
				name: "Qutub Minar",
				city: "Delhi",
				stateId: "delhi",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/1280px-Qutb_Minar_2022.jpg",
				description: "A 73-meter victory tower, the tallest brick minaret in the world, built in 1199.",
				significance: "A UNESCO site marking the beginning of Muslim rule in India.",
				category: "monument"
			},
			{
				id: "humayun-tomb",
				name: "Humayun’s Tomb",
				city: "Delhi",
				stateId: "delhi",
				image: IMG.humayun,
				description: "A garden-tomb that inspired the Taj Mahal, built in 1570 for the Mughal emperor.",
				significance: "A UNESCO World Heritage Site — the first garden-tomb in the Indian subcontinent.",
				category: "monument"
			}
		],
		traditions: [{
			name: "Qawwali",
			description: "Sufi devotional music performed at Nizamuddin Dargah every Thursday evening.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharat_Mata_by_Abanindranath_Tagore.jpg"
		}, {
			name: "Kite Flying",
			description: "A Delhi tradition on Independence Day, where rooftops fill with kite fighters.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gimbal_The_First_Official_UAP_Footage_from_the_USG_for_Public_Release.webm/500px--Gimbal_The_First_Official_UAP_Footage_from_the_USG_for_Public_Release.webm.jpg"
		}],
		dances: [{
			name: "Kathak",
			origin: "Delhi courts",
			description: "The Mughal courts of Delhi nurtured Kathak into its classical form.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Megharanjani.jpg/1280px-Megharanjani.jpg"
		}],
		music: [{
			name: "Qawwali",
			region: "Delhi",
			instruments: "Harmonium, Tabla, Dholak",
			description: "Sufi devotional singing at the dargah of Nizamuddin Auliya, a 700-year tradition.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Qawalli_at_Ajmer_Sharif_dargah.jpg/1280px-Qawalli_at_Ajmer_Sharif_dargah.jpg"
		}],
		foods: [{
			name: "Chole Bhature",
			origin: "Delhi",
			description: "Spiced chickpea curry with fluffy fried bread — Delhi’s iconic breakfast.",
			whereToTry: "Sita Ram Diwan Chand, Paharganj",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/1280px-Chana_masala.jpg"
		}, {
			name: "Paratha Wali Gali",
			origin: "Old Delhi",
			description: "A narrow lane in Chandni Chowk serving stuffed parathas for over 150 years.",
			whereToTry: "Gali Parathe Wali, Chandni Chowk",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/1280px-Triangle_paratha_%28cropped%29.JPG"
		}],
		festivals: [{
			name: "Republic Day Parade",
			description: "A grand parade down Rajpath showcasing India’s military and cultural diversity.",
			month: "January",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Double-tenth-symbol.svg/1280px-Double-tenth-symbol.svg.png"
		}],
		artForms: [{
			name: "Zardozi",
			description: "Gold-thread embroidery on fabric, a Mughal court craft still practiced in Old Delhi.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Close_Shot_of_the_Zardozi_%28Zardouzi%29_Embroidery_Cushion_Covers.jpg"
		}],
		restaurants: [{
			id: "r27",
			name: "Karim’s",
			city: "Delhi",
			stateId: "delhi",
			cuisine: "Mughlai",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Murgh_Musallam_Steamed.JPG/1280px-Murgh_Musallam_Steamed.JPG",
			description: "Legendary Mughlai restaurant since 1913, near Jama Masjid."
		}, {
			id: "r28",
			name: "Sita Ram Diwan Chand",
			city: "Delhi",
			stateId: "delhi",
			cuisine: "North Indian",
			rating: 4.5,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Manoomin_%28wild_rice%29.jpg/1280px-Manoomin_%28wild_rice%29.jpg",
			description: "The best chole bhature in Delhi, since 1950."
		}],
		events: [{
			id: "e15",
			name: "Republic Day Parade",
			location: "New Delhi",
			stateId: "delhi",
			date: "Jan 26",
			month: "January",
			category: "National Event",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Vista_de_la_Marcha_del_orgullo_LGBT_CDMX_2019_-_53.jpg/1280px-Vista_de_la_Marcha_del_orgullo_LGBT_CDMX_2019_-_53.jpg",
			description: "A spectacular parade down Kartavya Path showcasing India’s diversity."
		}]
	},
	{
		id: "jammu-kashmir",
		name: "Jammu & Kashmir",
		capital: "Srinagar",
		tagline: "Paradise on Earth",
		highlight: "Dal Lake • Pashmina • Wazwan",
		description: "The crown of India, where Mughal gardens, Himalayan lakes, and alpine meadows create a landscape so beautiful it inspired emperors. A blend of Kashmiri, Dogra, and Ladakhi cultures.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pahalgam_Valley.jpg/1280px-Pahalgam_Valley.jpg",
		color: "#3D5AFE",
		mapPath: "M250,30 L370,20 L420,50 L410,100 L340,120 L280,100 L240,60 Z",
		mapLabelX: 330,
		mapLabelY: 65,
		places: [{
			id: "dal-lake",
			name: "Dal Lake",
			city: "Srinagar",
			stateId: "jammu-kashmir",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/1280px-Dal_Lake_Hazratbal_Srinagar.jpg",
			description: "A Himalayan lake famous for its floating gardens, shikara boats, and houseboats.",
			significance: "The jewel of Kashmir, with Mughal gardens along its shores and life on the water.",
			category: "nature"
		}, {
			id: "mughal-gardens",
			name: "Shalimar Bagh",
			city: "Srinagar",
			stateId: "jammu-kashmir",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Shalimar_Bagh_1.jpg/1280px-Shalimar_Bagh_1.jpg",
			description: "A Mughal garden built by Emperor Jahangir in 1619, with terraced lawns and fountains.",
			significance: "A masterpiece of Persian-influenced garden design in the Himalayan valley.",
			category: "heritage"
		}],
		traditions: [{
			name: "Pashmina Weaving",
			description: "Ultra-fine cashmere wool weaving, creating shawls so soft they pass through a ring.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Two_Gurjar_men_from_Bhimber_district_Azad_Kashmir.png/1280px-Two_Gurjar_men_from_Bhimber_district_Azad_Kashmir.png"
		}, {
			name: "Kashmir Carpet",
			description: "Hand-knotted silk and wool carpets with Persian-influenced floral patterns.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pen_Box_%28qalamdan%29_LACMA_M.89.160a-b.jpg/1280px-Pen_Box_%28qalamdan%29_LACMA_M.89.160a-b.jpg"
		}],
		dances: [{
			name: "Rouf",
			origin: "Kashmir Valley",
			description: "A graceful folk dance where women in traditional dress sway in rows, greeting spring.",
			image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Jan_Mrkvi%C4%8Dka-Shopsko_horo.jpg"
		}],
		music: [{
			name: "Sufiana Kalam",
			region: "Kashmir",
			instruments: "Santoor, Saz, Tabla",
			description: "A classical Sufi music tradition blending Persian and Indian ragas.",
			image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Kashmiri.jpg"
		}],
		foods: [{
			name: "Wazwan",
			origin: "Kashmir",
			description: "A grand multi-course feast of 36 dishes, the pinnacle of Kashmiri cuisine.",
			whereToTry: "Traditional wazas (chefs) in Srinagar",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chicken_Korma.JPG/1280px-Chicken_Korma.JPG"
		}, {
			name: "Kahwa",
			origin: "Kashmir",
			description: "A saffron-and-cardamom green tea served with almonds, warming the Himalayan cold.",
			whereToTry: "Any Srinagar tea stall",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/1280px-Flag_of_Oman.svg.png"
		}],
		festivals: [{
			name: "Tulip Festival",
			description: "Asia’s largest tulip garden blooms in Srinagar every April.",
			month: "April",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/2013_Tulip_Festival_%40_Agassiz%2C_BC%2C_Canada_%288671444216%29.jpg/1280px-2013_Tulip_Festival_%40_Agassiz%2C_BC%2C_Canada_%288671444216%29.jpg"
		}],
		artForms: [{
			name: "Pashmina",
			description: "The finest cashmere wool, woven into shawls for centuries in Kashmir.",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/%DA%A9%D8%B4%D9%85%DB%8C%D8%B1_%D8%B3%DB%92_%DB%81%D8%A7%D8%AA%DA%BE_%D8%B3%DB%92_%D8%A8%D9%86%DB%8C_%DA%A9%D8%A7%D9%86%DB%8C_%D8%B4%D8%A7%D9%84.jpg"
		}, {
			name: "Paper Mache",
			description: "Hand-painted lacquered boxes and ornaments with floral Persian designs.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/JacmelMardiGras.jpg/1280px-JacmelMardiGras.jpg"
		}],
		restaurants: [{
			id: "r29",
			name: "Ahdoos",
			city: "Srinagar",
			stateId: "jammu-kashmir",
			cuisine: "Kashmiri",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Kashmiri_cuisine_waazwan.jpg",
			description: "Historic restaurant on the Bund serving authentic wazwan since 1918."
		}],
		events: []
	},
	{
		id: "manipur",
		name: "Manipur",
		capital: "Imphal",
		tagline: "The Jewel of the East",
		highlight: "Loktak Lake • Manipuri Dance • Eromba",
		description: "A northeastern gem with the only floating lake in the world, a UNESCO-recognized classical dance, and a distinctive cuisine of fermented fish and bamboo shoots.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/%EA%AF%85%EA%AF%A3%EA%AF%A1%EA%AF%83%EA%AF%A5%EA%AF%8F%EA%AF%86%EA%AF%A4%EA%AF%A1_%EA%AF%86%EA%AF%A4%EA%AF%A1%EA%AF%92%EA%AF%A4_%EA%AF%82%EA%AF%A5%EA%AF%8F%EA%AF%85%EA%AF%A4%EA%AF%A1%EA%AF%8A%EA%AF%A7_%EA%AF%81%EA%AF%85%EA%AF%A5%EA%AF%83%EA%AF%8D%EA%AF%A4_%EA%AF%82%EA%AF%A5%EA%AF%8F%EA%AF%81%EA%AF%AA_%28%EA%AF%81%EA%AF%85%EA%AF%A5%EA%AF%83%EA%AF%8D%EA%AF%A4_%EA%AF%80%EA%AF%A4%EA%AF%8C%EA%AF%A3%EA%AF%A1%29%EA%AF%92%EA%AF%A4_%EA%AF%91%EA%AF%8B%EA%AF%A5%EA%AF%A1_%EA%AF%85%EA%AF%A3%EA%AF%A1%EA%AF%86%EA%AF%A8%EA%AF%9E_%EA%AF%8A%EA%AF%AA%EA%AF%95_%EA%AF%83%EA%AF%A5%EA%AF%8F%EA%AF%80%EA%AF%A9%EA%AF%97%EA%AF%92%EA%AF%A4_%EA%AF%80%EA%AF%A5%EA%AF%9E%EA%AF%84_%EA%AF%83%EA%AF%83%EA%AF%A4.jpg/1280px-thumbnail.jpg",
		color: "#0BA884",
		mapPath: "M620,320 L680,310 L710,340 L700,380 L640,390 L610,360 L610,330 Z",
		mapLabelX: 660,
		mapLabelY: 350,
		places: [{
			id: "loktak-lake",
			name: "Loktak Lake",
			city: "Imphal",
			stateId: "manipur",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/The_Loktak_Lake.jpg/1280px-The_Loktak_Lake.jpg",
			description: "The largest freshwater lake in the Northeast, famous for floating circular phumdis.",
			significance: "Home to the endangered Sangai deer and the only floating national park in the world.",
			category: "nature"
		}],
		traditions: [{
			name: "Manipuri Dance",
			description: "A UNESCO-recognized classical dance with gentle, devotional movements and elaborate costumes.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Temple_of_God_Pakhangba_of_Sanamahi_religion_inside_the_Kangla_Fort%2C_Imphal_West%2C_Manipur.jpg/1280px-Temple_of_God_Pakhangba_of_Sanamahi_religion_inside_the_Kangla_Fort%2C_Imphal_West%2C_Manipur.jpg"
		}, {
			name: "Thang-Ta",
			description: "A traditional Manipuri martial art with sword and spear, now a competitive sport.",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Eastern_Zonal_Cultural_Centre_logo.png"
		}],
		dances: [{
			name: "Manipuri",
			origin: "Manipur temples",
			description: "A devotional classical dance of graceful, rounded movements — Ras Leela depicts Krishna.",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Stamp_of_Armenia_-_2018_-_Colnect_806145_-_Indian_Dance_Manipuri.jpeg"
		}],
		music: [{
			name: "Nat Sangeet",
			region: "Manipur",
			instruments: "Pena, Harmonium",
			description: "A classical music tradition accompanying Manipuri dance performances.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Sangeet_Natak_Akademi_Award_to_Sonam_Tshering_Lepcha.jpg/1280px-Sangeet_Natak_Akademi_Award_to_Sonam_Tshering_Lepcha.jpg"
		}],
		foods: [{
			name: "Eromba",
			origin: "Manipur",
			description: "A spicy mash of boiled vegetables, fermented fish, and fiery chilies — a Manipuri staple.",
			whereToTry: "Imphal local kitchens",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Yongchaak_eromba_%282%29.jpg/1280px-Yongchaak_eromba_%282%29.jpg"
		}, {
			name: "Chamthong",
			origin: "Manipur",
			description: "A light vegetable stew with fermented fish, served with rice.",
			whereToTry: "Imphal restaurants",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Chamthong_%28alias_Kangshoi_or_Kangsoi%29_dish_-_Traditional_Meitei_cuisine_-_Gastronomic_cultural_heritage_of_Manipur_%26_domestic_and_international_Meitei_diasporas.jpg"
		}],
		festivals: [{
			name: "Sangai Festival",
			description: "A ten-day cultural showcase of Manipur’s dance, sport, food, and crafts.",
			month: "November",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sangai_Deer_Replica_in_Manipur.jpg/1280px-Sangai_Deer_Replica_in_Manipur.jpg"
		}],
		artForms: [{
			name: "Kauna Mat Weaving",
			description: "Handwoven mats and baskets from water reed, a Manipuri craft.",
			image: IMG.rugs
		}],
		restaurants: [{
			id: "r30",
			name: "Ima Keithel Kitchen",
			city: "Imphal",
			stateId: "manipur",
			cuisine: "Manipuri",
			rating: 4.3,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Manipuri_woman_selling_glutinous_rice_at_Eema_Bazaar%2C_Imphal%2C_Manipur.JPG/1280px-Manipuri_woman_selling_glutinous_rice_at_Eema_Bazaar%2C_Imphal%2C_Manipur.JPG",
			description: "Traditional Manipuri meals near the all-women market."
		}],
		events: []
	},
	{
		id: "meghalaya",
		name: "Meghalaya",
		capital: "Shillong",
		tagline: "The Abode of Clouds",
		highlight: "Living Root Bridges • Khasi Music • Jadoh",
		description: "A state of waterfalls, caves, and living root bridges grown by Khasi tribes. Meghalaya is the wettest place on earth and a land of matrilineal societies and rock music.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Dawki_River%2C_Meghalaya%2C_India.jpg/1280px-Dawki_River%2C_Meghalaya%2C_India.jpg",
		color: "#0BA884",
		mapPath: "M590,330 L650,320 L680,350 L670,390 L610,400 L580,370 L580,340 Z",
		mapLabelX: 630,
		mapLabelY: 360,
		places: [{
			id: "living-root-bridges",
			name: "Living Root Bridges",
			city: "Cherrapunji",
			stateId: "meghalaya",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/1280px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg",
			description: "Bridges grown from the roots of rubber trees by Khasi tribes over generations.",
			significance: "A unique example of bioengineering, recognized as a UNESCO tentative heritage site.",
			category: "nature"
		}],
		traditions: [{
			name: "Matrilineal Society",
			description: "The Khasi and Garo tribes follow matrilineal inheritance — property passes to the youngest daughter.",
			image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Garo_Boy.jpg"
		}, {
			name: "Rock Music Culture",
			description: "Shillong is India’s rock music capital, with a thriving live music and festival scene.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Nuranang_Waterfall.jpg/1280px-Nuranang_Waterfall.jpg"
		}],
		dances: [{
			name: "Wangala",
			origin: "Garo tribe",
			description: "A harvest dance with drums and horns, celebrating the Sun God with 100 drummers.",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Wangala_drummer_of_garo_tribe.jpg"
		}],
		music: [{
			name: "Khasi Folk & Rock",
			region: "Shillong",
			instruments: "Guitar, Drums, Duitara",
			description: "A unique blend of traditional Khasi folk songs and Western rock music.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Shri_Neil_Herbert_Nongkynrih.jpg/1280px-Shri_Neil_Herbert_Nongkynrih.jpg"
		}],
		foods: [{
			name: "Jadoh",
			origin: "Khasi tribe",
			description: "Red rice cooked with pork and spices — the signature Khasi dish.",
			whereToTry: "Khasi restaurants in Shillong",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Pates_p1150435.jpg/1280px-Pates_p1150435.jpg"
		}, {
			name: "Dohneilong",
			origin: "Khasi tribe",
			description: "A smoked pork dish with black sesame and local greens.",
			whereToTry: "Shillong traditional kitchens",
			image: IMG.thali2
		}],
		festivals: [{
			name: "Wangala Festival",
			description: "A hundred-drum harvest festival of the Garo tribe, celebrating the end of the agricultural year.",
			month: "November",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Karam_puja_in_jharkhand.jpg"
		}],
		artForms: [{
			name: "Bamboo & Cane Craft",
			description: "Intricate basketry and furniture from bamboo, a Khasi and Jaintia craft.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Northeast_India_States.svg/1280px-Northeast_India_States.svg.png"
		}],
		restaurants: [{
			id: "r31",
			name: "Café Shillong",
			city: "Shillong",
			stateId: "meghalaya",
			cuisine: "Khasi",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Bhutan_%28dish%29.png",
			description: "Authentic jadoh and dohneilong in a cozy setting."
		}],
		events: []
	},
	{
		id: "nagaland",
		name: "Nagaland",
		capital: "Kohima",
		tagline: "The Land of Festivals",
		highlight: "Hornbill Festival • Tribal Weaving • Smoked Pork",
		description: "Home to 17 major tribes, each with distinct language, costume, and tradition. Nagaland is a mosaic of warrior heritage, vibrant textiles, and one of India’s greatest cultural festivals.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kapamodzu.jpg/1280px-Kapamodzu.jpg",
		color: "#C13A47",
		mapPath: "M640,330 L700,320 L730,350 L720,390 L660,400 L630,370 L630,340 Z",
		mapLabelX: 680,
		mapLabelY: 360,
		places: [{
			id: "kohima-war-cemetery",
			name: "Kohima War Cemetery",
			city: "Kohima",
			stateId: "nagaland",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/IND_003698_Garrison_Hill_Kohima.jpg/1280px-IND_003698_Garrison_Hill_Kohima.jpg",
			description: "A WWII memorial on the battlefield where the Japanese advance was halted in 1944.",
			significance: "Maintained by the Commonwealth War Graves Commission, overlooking Kohima.",
			category: "heritage"
		}],
		traditions: [{
			name: "Naga Weaving",
			description: "Backstrap loom weaving creating bold geometric shawls, each pattern unique to a tribe.",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Traditional-Karbi-Ornaments.jpg"
		}, {
			name: "Headhunting Memory",
			description: "Historical warrior tradition, now remembered through oral histories and festival reenactments.",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Anchor_tattoo_and_sketch.jpg"
		}],
		dances: [{
			name: "War Dance",
			origin: "Ao Naga tribe",
			description: "A powerful communal war dance with spears and shields, chanting in unison.",
			image: "https://upload.wikimedia.org/wikipedia/commons/7/79/FrankensteinBFILFF131025-87_%2854863424291%29_%28cropped%29.jpg"
		}],
		music: [{
			name: "Tribal Folk",
			region: "Nagaland",
			instruments: "Tati, Mouth Harp, Log Drum",
			description: "Songs of war, love, and harvest, accompanied by indigenous string and percussion instruments.",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Nag_folk_dance987.jpg"
		}],
		foods: [{
			name: "Smoked Pork with Akhuni",
			origin: "Nagaland",
			description: "Fermented soybean paste with smoked pork — a bold, pungent Naga delicacy.",
			whereToTry: "Naga restaurants in Kohima",
			image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Afghan_Palo.jpg"
		}, {
			name: "Bamboo Shoot Pork",
			origin: "Nagaland",
			description: "Pork cooked with fermented bamboo shoots and bhut jolokia (ghost pepper).",
			whereToTry: "Kohima during Hornbill Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bamboo_sprout2.JPG/1280px-Bamboo_sprout2.JPG"
		}],
		festivals: [{
			name: "Hornbill Festival",
			description: "A ten-day festival where all 17 tribes gather — the \"Festival of Festivals.\"",
			month: "December",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Great_hornbill_Photograph_by_Shantanu_Kuveskar.jpg"
		}],
		artForms: [{
			name: "Naga Shawl Weaving",
			description: "Each tribe’s shawl tells its story through patterns and colors on the backstrap loom.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Naga_traditional_shawl.jpg/1280px-Naga_traditional_shawl.jpg"
		}],
		restaurants: [{
			id: "r32",
			name: "Naga Heritage Kitchen",
			city: "Kohima",
			stateId: "nagaland",
			cuisine: "Naga",
			rating: 4.3,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Caracoles-del-restaurante-granero.jpg",
			description: "Traditional smoked pork and akhuni dishes during Hornbill Festival."
		}],
		events: [{
			id: "e16",
			name: "Hornbill Festival",
			location: "Kohima, Nagaland",
			stateId: "nagaland",
			date: "Dec 1–10",
			month: "December",
			category: "Tribal Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Buceros_rhinoceros_-Singapore_Zoo_-pair-8a.jpg/1280px-Buceros_rhinoceros_-Singapore_Zoo_-pair-8a.jpg",
			description: "Ten days of all 17 Naga tribes showcasing dance, music, food, and crafts."
		}]
	},
	{
		id: "sikkim",
		name: "Sikkim",
		capital: "Gangtok",
		tagline: "The Peaceful Kingdom",
		highlight: "Kanchenjunga • Momos • Thangka Art",
		description: "India’s first fully organic state, nestled in the Himalayas. Sikkim blends Tibetan Buddhist monasteries, snow-capped Kanchenjunga views, and a peaceful, eco-friendly way of life.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg/1280px-Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg",
		color: "#3D5AFE",
		mapPath: "M540,200 L610,190 L640,230 L620,270 L560,270 L530,240 Z",
		mapLabelX: 580,
		mapLabelY: 235,
		places: [{
			id: "pemayangtse",
			name: "Pemayangtse Monastery",
			city: "Pelling",
			stateId: "sikkim",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pemayangtse_Monastery%2C_Pelling%2C_West_Sikkim_15.jpg/1280px-Pemayangtse_Monastery%2C_Pelling%2C_West_Sikkim_15.jpg",
			description: "One of the oldest monasteries in Sikkim, founded in 1705, with panoramic Kanchenjunga views.",
			significance: "A three-storied monastery housing rare Buddhist sculptures and ancient thangkas.",
			category: "spiritual"
		}],
		traditions: [{
			name: "Thangka Painting",
			description: "Intricate Buddhist scroll paintings on cotton, depicting deities and mandalas.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rock_picture_of_Padmasambhava%2C_north_of_Thimphu.jpg/1280px-Rock_picture_of_Padmasambhava%2C_north_of_Thimphu.jpg"
		}, {
			name: "Organic Farming",
			description: "Sikkim became the world’s first fully organic state in 2016, banning chemical pesticides.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Casual_tea_set%40Japan.jpg/1280px-Casual_tea_set%40Japan.jpg"
		}],
		dances: [{
			name: "Mask Dance",
			origin: "Sikkim monasteries",
			description: "A Buddhist cham dance where monks in elaborate masks enact spiritual stories.",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Pertunjukkan_Nani_Tari_Topeng_Losari.jpg"
		}],
		music: [{
			name: "Nepali Folk",
			region: "Sikkim",
			instruments: "Madal, Sarangi, Bansuri",
			description: "Hill folk songs in Nepali, reflecting Sikkim’s Himalayan cultural identity.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Nepali_language_Devanagari.svg/1280px-Nepali_language_Devanagari.svg.png"
		}],
		foods: [{
			name: "Momos",
			origin: "Sikkim/Tibet",
			description: "Steamed dumplings filled with meat or cheese, served with fiery chili chutney.",
			whereToTry: "Momo stalls in Gangtok MG Marg",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/1280px-Momo_nepal.jpg"
		}, {
			name: "Gundruk Soup",
			origin: "Sikkim",
			description: "A soup of fermented leafy greens with a tangy, earthy flavor.",
			whereToTry: "Sikkimese restaurants in Gangtok",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Traditional_pizza_from_Napoli.jpg/1280px-Traditional_pizza_from_Napoli.jpg"
		}],
		festivals: [{
			name: "Losar",
			description: "Tibetan Buddhist New Year celebrated with cham dances and family gatherings.",
			month: "February–March",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Getting_ready_for_Losar.jpg/1280px-Getting_ready_for_Losar.jpg"
		}],
		artForms: [{
			name: "Thangka",
			description: "Religious scroll painting with mineral pigments, a sacred Buddhist art form.",
			image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Karma_Phuntsok.jpg"
		}],
		restaurants: [{
			id: "r33",
			name: "Rolling Momos",
			city: "Gangtok",
			stateId: "sikkim",
			cuisine: "Sikkimese",
			rating: 4.5,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nepali_dal-bhat-tarkari.jpg/1280px-Nepali_dal-bhat-tarkari.jpg",
			description: "The best momos and thukpa on MG Marg."
		}],
		events: []
	},
	{
		id: "tripura",
		name: "Tripura",
		capital: "Agartala",
		tagline: "The Hill Tippera",
		highlight: "Ujjayanta Palace • Garia Dance • Mui Borok",
		description: "A northeastern state with a royal past, blending Bengali and tribal cultures. Tripura is home to the grand Ujjayanta Palace and 19 indigenous tribes with distinct traditions.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg/1280px-Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg",
		color: "#0BA884",
		mapPath: "M640,380 L700,370 L730,400 L720,440 L660,450 L630,420 L630,390 Z",
		mapLabelX: 680,
		mapLabelY: 410,
		places: [{
			id: "ujjayanta-palace",
			name: "Ujjayanta Palace",
			city: "Agartala",
			stateId: "tripura",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/India_Tripura_Legislative_Assembly_June_2024.svg/1280px-India_Tripura_Legislative_Assembly_June_2024.svg.png",
			description: "A stunning Mughal-Greek style palace built in 1901, now the state museum.",
			significance: "The former royal residence of the Manikya dynasty, showcasing Tripura’s royal heritage.",
			category: "palace"
		}],
		traditions: [{
			name: "Garia Dance",
			description: "A tribal dance with bamboo, performed during the Garia festival for a good harvest.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg/1280px-Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg"
		}, {
			name: "Handloom Weaving",
			description: "Tribal women weave intricate designs on loin looms, each pattern with symbolic meaning.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aronai.jpg/1280px-Aronai.jpg"
		}],
		dances: [{
			name: "Hozagiri",
			origin: "Reang tribe",
			description: "A dance where women balance bottles and lamps on their heads while swaying gracefully.",
			image: IMG.bharatanatyam
		}],
		music: [{
			name: "Tribal Folk",
			region: "Tripura",
			instruments: "Sarinda, Khamb, Flute",
			description: "Songs of the 19 tribes, each with unique rhythms for festivals and daily life.",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Classical_dances_of_India.jpg"
		}],
		foods: [{
			name: "Mui Borok",
			origin: "Tripura tribes",
			description: "A traditional Tripuri meal of rice, fermented fish, and bamboo shoot — the tribal staple.",
			whereToTry: "Agartala tribal food stalls",
			image: IMG.thali
		}, {
			name: "Kosoi Bwtwi",
			origin: "Tripura",
			description: "A stir-fry of bamboo shoots with fermented fish and green chilies.",
			whereToTry: "Tripuri restaurants in Agartala",
			image: IMG.thali2
		}],
		festivals: [{
			name: "Kharchi Puja",
			description: "A week-long festival worshipping 14 deities, unique to Tripura’s tribal tradition.",
			month: "July",
			image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tripuri_dance.jpg"
		}],
		artForms: [{
			name: "Cane & Bamboo Craft",
			description: "Intricate baskets, mats, and furniture from the state’s abundant bamboo.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Flag_of_Kangleipak.svg/1280px-Flag_of_Kangleipak.svg.png"
		}],
		restaurants: [{
			id: "r34",
			name: "Agartala Tribal Kitchen",
			city: "Agartala",
			stateId: "tripura",
			cuisine: "Tripuri",
			rating: 4.2,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nepali_dal-bhat-tarkari.jpg/1280px-Nepali_dal-bhat-tarkari.jpg",
			description: "Authentic Mui Borok and Kosoi Bwtwi in a traditional setting."
		}],
		events: []
	},
	{
		id: "puducherry",
		name: "Puducherry",
		capital: "Puducherry",
		tagline: "India's French Riviera",
		highlight: "French Quarter • Auroville • Café Culture",
		description: "A former French colony with tree-lined boulevards, mustard-yellow colonial buildings, and a unique Franco-Tamil culture. Puducherry is where India and France blend seamlessly.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pondicherry-Rock_beach_aerial_view.jpg/1280px-Pondicherry-Rock_beach_aerial_view.jpg",
		color: "#3D5AFE",
		mapPath: "M320,690 L350,680 L365,700 L355,720 L330,720 L315,705 Z",
		mapLabelX: 338,
		mapLabelY: 700,
		places: [{
			id: "auroville",
			name: "Auroville Matrimandir",
			city: "Auroville",
			stateId: "puducherry",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Town_Hall_of_Auroville.jpg/1280px-Town_Hall_of_Auroville.jpg",
			description: "An experimental township centered on the golden Matrimandir, a place for inner silence.",
			significance: "A UNESCO-backed \"City of Dawn\" drawing residents from 50+ countries seeking unity.",
			category: "spiritual"
		}, {
			id: "french-quarter",
			name: "French Quarter",
			city: "Puducherry",
			stateId: "puducherry",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/India-locator-map-blank.svg/1280px-India-locator-map-blank.svg.png",
			description: "Cobbled streets lined with mustard-yellow colonial villas, wrought-iron balconies, and cafés.",
			significance: "A preserved slice of French India, unlike anywhere else in the country.",
			category: "heritage"
		}],
		traditions: [{
			name: "Franco-Tamil Culture",
			description: "A unique blend where French bakeries sit beside Tamil temples, and both languages coexist.",
			image: IMG.market
		}, {
			name: "Café Culture",
			description: "A legacy of French sidewalk cafés serving croissants and filter coffee side by side.",
			image: IMG.harmonium
		}],
		dances: [{
			name: "Bharatanatyam",
			origin: "Puducherry (Tamil tradition)",
			description: "The Tamil classical dance tradition, nurtured in Puducherry’s cultural institutions.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Shobhana_%28cropped%29.jpg/1280px-Shobhana_%28cropped%29.jpg"
		}],
		music: [{
			name: "Carnatic & French Fusion",
			region: "Puducherry",
			instruments: "Veena, Violin, Accordion",
			description: "A unique musical landscape where Carnatic classical meets French café melodies.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Jananiy.jpg/1280px-Jananiy.jpg"
		}],
		foods: [{
			name: "Puducherry Seafood",
			origin: "Puducherry",
			description: "Fresh catch prepared in Franco-Tamil style — think fish au gratin with curry leaves.",
			whereToTry: "Beach road restaurants in Puducherry",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Black_bovine_with_string_around_its_neck_%28Kerala%2C_2013%29.jpg/1280px-Black_bovine_with_string_around_its_neck_%28Kerala%2C_2013%29.jpg"
		}, {
			name: "Bakeries & Croissants",
			origin: "Puducherry",
			description: "French-style patisseries serving fresh baguettes, éclairs, and pains au chocolat.",
			whereToTry: "Baker Street, Puducherry",
			image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png"
		}],
		festivals: [{
			name: "Bastille Day",
			description: "A celebration of French heritage with parades along the promenade.",
			month: "July",
			image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg/1280px-Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg"
		}],
		artForms: [{
			name: "Pottery",
			description: "Handcrafted pottery from Auroville studios, blending Indian and European techniques.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Kumbakonam_Mahamaham_Tank.jpg"
		}],
		restaurants: [{
			id: "r35",
			name: "Baker Street",
			city: "Puducherry",
			stateId: "puducherry",
			cuisine: "French-Bakery",
			rating: 4.6,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Red_maple_leaf_food_icon.svg/1280px-Red_maple_leaf_food_icon.svg.png",
			description: "Authentic French bakery on Bussy Street — best croissants in India."
		}, {
			id: "r36",
			name: "Rendezvous",
			city: "Puducherry",
			stateId: "puducherry",
			cuisine: "Franco-Tamil",
			rating: 4.5,
			priceRange: "₹₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Mauritian_Dalpuri.jpg",
			description: "Fine-dining Franco-Tamil fusion in a heritage villa."
		}],
		events: []
	},
	{
		id: "ladakh",
		name: "Ladakh",
		capital: "Leh",
		tagline: "The Land of High Passes",
		highlight: "Pangong Lake • Hemis Monastery • Thukpa",
		description: "A high-altitude desert in the Himalayas, with turquoise lakes, ancient monasteries, and a Tibetan Buddhist culture. Ladakh is one of the most starkly beautiful places on earth.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg/1280px-Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg",
		color: "#3D5AFE",
		mapPath: "M300,10 L430,5 L480,40 L450,80 L370,90 L300,70 L280,35 Z",
		mapLabelX: 380,
		mapLabelY: 45,
		places: [{
			id: "pangong-lake",
			name: "Pangong Tso",
			city: "Leh",
			stateId: "ladakh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg/1280px-ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg",
			description: "A 134-km high-altitude lake that changes color through the day, at 4,350 meters.",
			significance: "One of the highest saltwater lakes in the world, spanning India and Tibet.",
			category: "nature"
		}, {
			id: "hemis-monastery",
			name: "Hemis Monastery",
			city: "Leh",
			stateId: "ladakh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Hemis_Monastery_02.jpg/1280px-Hemis_Monastery_02.jpg",
			description: "The largest and wealthiest monastery in Ladakh, housing ancient thangkas and a museum.",
			significance: "Site of the famous Hemis Festival with masked cham dances every July.",
			category: "spiritual"
		}],
		traditions: [{
			name: "Thangka Painting",
			description: "Sacred Buddhist scroll paintings on cotton, created with mineral pigments and gold.",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ajanta_Padmapani.jpg"
		}, {
			name: "Cham Dance",
			description: "Masked monastic dances performed during festivals, enacting the victory of good over evil.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Buddhist_monks_dancing_the_Cham_in_the_Himalayan_monastery_of_Lamayuru.jpg/1280px-Buddhist_monks_dancing_the_Cham_in_the_Himalayan_monastery_of_Lamayuru.jpg"
		}],
		dances: [{
			name: "Cham",
			origin: "Ladakh monasteries",
			description: "A masked ritual dance where monks in elaborate costumes perform sacred stories.",
			image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/ChamDance.jpg"
		}],
		music: [{
			name: "Buddhist Chant",
			region: "Ladakh",
			instruments: "Dungchen (long horn), Cymbals, Drums",
			description: "Deep monastic chanting and long-horn music during monastery festivals.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mani_Stones_-_Buddhist_Prayer_Stones%2C_Ladakh.jpg/1280px-Mani_Stones_-_Buddhist_Prayer_Stones%2C_Ladakh.jpg"
		}],
		foods: [{
			name: "Thukpa",
			origin: "Ladakh/Tibet",
			description: "A hearty noodle soup with vegetables and meat, perfect for the cold mountain climate.",
			whereToTry: "Tibetan kitchens in Leh",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Thukpa_%2827989841733%29.jpg/1280px-Thukpa_%2827989841733%29.jpg"
		}, {
			name: "Skyu",
			origin: "Ladakh",
			description: "A traditional Ladakhi pasta stew with root vegetables, a high-altitude comfort food.",
			whereToTry: "Leh traditional restaurants",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Skyu_2010.jpg/1280px-Skyu_2010.jpg"
		}],
		festivals: [{
			name: "Hemis Festival",
			description: "A two-day festival with masked cham dances, celebrating the birth of Guru Padmasambhava.",
			month: "July",
			image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Historical_Hemis_festival_IV.jpg"
		}],
		artForms: [{
			name: "Thangka",
			description: "Sacred scroll paintings with mineral pigments, a meditative Buddhist art form.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ladakh1981-221.jpg/1280px-Ladakh1981-221.jpg"
		}],
		restaurants: [{
			id: "r37",
			name: "Tibetan Kitchen",
			city: "Leh",
			stateId: "ladakh",
			cuisine: "Tibetan-Ladakhi",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Otsal_Restaurant_%2848975870326%29.jpg/1280px-Otsal_Restaurant_%2848975870326%29.jpg",
			description: "Best thukpa and momos in Leh old town."
		}],
		events: [{
			id: "e17",
			name: "Hemis Festival",
			location: "Leh, Ladakh",
			stateId: "ladakh",
			date: "Jul 10–11",
			month: "July",
			category: "Monastic Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Hamis_Gonpa_on_a_rainy_day.JPG/1280px-Hamis_Gonpa_on_a_rainy_day.JPG",
			description: "Masked cham dances and ancient rituals at Hemis Monastery."
		}]
	},
	{
		id: "arunachal-pradesh",
		name: "Arunachal Pradesh",
		capital: "Itanagar",
		tagline: "Land of the dawn-lit mountains",
		highlight: "Tawang Monastery • Losar • Thukpa",
		description: "India's easternmost state, where the first sunrise of the country touches snow peaks, orchid forests and 26 major tribes each with their own language and festival calendar.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bhavachakra_or_the_Buddhist_Wheel_of_Life_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg/1280px-Bhavachakra_or_the_Buddhist_Wheel_of_Life_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg",
		color: "#2E8B7A",
		mapPath: "M742.2,305.5 L740.4,304.6 L739.8,303.1 L740.6,301.5 L738.9,299.1 L740.3,298.3 L739.2,293.6 L740.7,294.0 L743.4,291.7 L746.4,290.8 L746.5,288.4 L748.0,286.7 L750.0,287.9 L756.0,286.0 L758.4,286.9 L761.8,283.5 L760.7,281.6 L759.0,281.3 L758.3,282.5 L758.2,281.3 L757.1,281.7 L758.0,277.9 L755.4,275.8 L755.7,273.8 L754.6,272.4 L760.6,265.1 L750.5,265.4 L748.0,267.8 L744.4,269.0 L742.6,268.1 L730.1,272.2 L729.5,273.3 L725.4,274.4 L719.1,277.8 L718.3,276.4 L716.6,277.2 L714.1,276.7 L713.4,275.2 L712.3,276.2 L713.6,278.9 L710.8,280.3 L705.3,285.9 L701.0,290.8 L702.0,292.7 L700.3,293.1 L697.7,295.9 L679.7,297.5 L675.7,294.7 L669.8,293.8 L669.5,295.4 L667.8,296.1 L664.4,296.1 L662.7,297.2 L657.1,298.3 L654.7,298.2 L654.6,294.7 L652.5,292.6 L652.5,289.7 L653.7,288.1 L652.9,286.8 L655.1,286.1 L653.4,284.9 L652.3,280.2 L650.1,280.8 L644.1,280.5 L643.3,279.5 L642.1,280.0 L639.9,277.3 L639.7,275.5 L641.9,271.4 L639.3,268.6 L642.5,268.5 L643.8,269.9 L647.0,270.0 L648.0,272.3 L649.6,272.9 L651.3,271.2 L653.3,271.6 L657.5,268.5 L659.0,268.5 L660.4,271.0 L662.9,269.6 L664.2,270.2 L665.5,269.0 L667.1,269.7 L672.0,264.4 L669.9,262.2 L670.6,260.2 L673.7,257.8 L674.4,258.8 L676.3,257.8 L678.2,256.0 L679.2,256.9 L680.1,255.9 L679.8,254.7 L685.1,253.7 L685.5,251.7 L684.2,250.4 L686.7,248.4 L688.4,244.2 L691.4,243.1 L692.1,243.8 L692.6,242.8 L693.8,243.6 L699.2,242.7 L700.4,243.3 L702.3,242.1 L704.5,243.2 L706.6,240.0 L706.4,237.9 L710.8,234.4 L712.4,230.3 L714.4,228.3 L716.3,228.2 L718.3,225.9 L721.8,225.8 L723.7,222.0 L727.8,225.4 L728.4,227.8 L730.4,227.2 L734.5,228.9 L733.8,227.5 L737.2,229.3 L740.8,229.5 L741.2,231.2 L746.1,231.8 L747.5,228.6 L748.9,228.9 L748.6,226.3 L749.9,226.1 L750.3,224.8 L751.4,225.1 L755.2,221.8 L755.7,222.4 L758.0,220.7 L760.1,221.0 L763.7,218.5 L767.9,225.6 L771.2,224.0 L772.0,224.9 L770.7,227.6 L768.4,227.9 L766.3,230.0 L764.4,230.5 L766.3,233.3 L765.2,234.9 L765.8,235.9 L770.8,232.0 L775.6,230.5 L774.3,233.2 L774.6,234.0 L775.5,233.9 L776.0,236.6 L778.1,239.9 L777.3,241.7 L774.2,242.7 L774.8,244.3 L770.2,247.5 L771.5,249.0 L768.5,251.3 L771.4,251.9 L772.2,253.4 L773.8,251.1 L779.3,249.6 L781.8,251.0 L782.7,252.6 L785.9,252.1 L788.5,254.3 L790.1,253.0 L792.1,253.0 L793.4,254.8 L796.4,255.5 L799.6,257.9 L797.7,259.1 L797.1,261.7 L798.9,261.9 L800.0,263.4 L799.0,264.5 L799.3,267.3 L797.4,267.5 L797.1,266.3 L795.7,266.9 L791.4,270.5 L791.3,271.9 L789.4,271.9 L785.8,275.8 L786.9,278.6 L786.2,280.7 L793.2,290.2 L792.6,291.8 L785.2,289.0 L785.5,286.7 L783.2,284.1 L780.8,283.3 L778.0,283.6 L775.6,285.9 L774.2,285.4 L767.7,286.2 L762.3,288.9 L759.5,293.3 L756.0,294.3 L753.9,298.4 L752.2,297.8 L750.6,300.5 L748.5,300.1 L745.6,304.2 L742.2,305.5Z",
		mapLabelX: 719.7,
		mapLabelY: 262,
		places: [
			{
				id: "tawang-monastery",
				name: "Tawang Monastery",
				city: "Tawang",
				stateId: "arunachal-pradesh",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/A_close_up_of_Tawang_Monastery.jpg/1280px-A_close_up_of_Tawang_Monastery.jpg",
				description: "The largest monastery in India and second largest in the world, perched at 3,000 m.",
				significance: "Birthplace region of the 6th Dalai Lama and the spiritual heart of Monpa Buddhism.",
				category: "spiritual"
			},
			{
				id: "sela-pass",
				name: "Sela Pass",
				city: "Tawang",
				stateId: "arunachal-pradesh",
				image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Blanford%27s_Rosefinch_-_Sela_Pass_-_Arunachal_Pradesh_-_India_FJ0A8105_%2834145295572%29.jpg",
				description: "A high mountain pass at 4,170 m guarded by a frozen lake and prayer flags.",
				significance: "The only road link to Tawang, sacred to local Buddhists as one of 101 holy lakes.",
				category: "nature"
			},
			{
				id: "ziro-valley",
				name: "Ziro Valley",
				city: "Ziro",
				stateId: "arunachal-pradesh",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/An_Apatani_Old_lady_in_Ziro_valley_of_Arunachal_Pradesh.jpg/1280px-An_Apatani_Old_lady_in_Ziro_valley_of_Arunachal_Pradesh.jpg",
				description: "A green bowl of paddy-cum-fish fields farmed by the Apatani people.",
				significance: "A UNESCO tentative World Heritage Site for its sustainable tribal agriculture.",
				category: "nature"
			}
		],
		traditions: [
			{
				name: "Apatani Tattoos",
				description: "Facial tattoos and nose plugs once worn by Apatani women, now a vanishing memory.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Apatani_Tribe.jpg/1280px-Apatani_Tribe.jpg"
			},
			{
				name: "Monpa Handmade Paper",
				description: "Shugu-sheng paper made from local bark for Buddhist scriptures.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Changdung%2C_Monpa_tribe%2C_Tawang_district-_RIWATCH_Museum.jpg/1280px-Changdung%2C_Monpa_tribe%2C_Tawang_district-_RIWATCH_Museum.jpg"
			},
			{
				name: "Bamboo Craft",
				description: "Baskets, hats and bridges woven entirely from cane and bamboo.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/%22Nadang%22_The_Adi_Basket.jpg/1280px-%22Nadang%22_The_Adi_Basket.jpg"
			}
		],
		dances: [{
			name: "Aji Lhamu",
			origin: "Monpa community",
			description: "A masked dance-drama of Tawang performed to bless the village.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mlengchung_ba%2C_Lumla_village%2C_Tawang_district-_RIWATCH_Museum.jpg/1280px-Mlengchung_ba%2C_Lumla_village%2C_Tawang_district-_RIWATCH_Museum.jpg"
		}, {
			name: "Bardo Chham",
			origin: "Sherdukpen tribe",
			description: "Dancers in animal masks act out the fight between good and evil.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Buddha_image_in_Tawang_monastery.jpg/1280px-Buddha_image_in_Tawang_monastery.jpg"
		}],
		music: [{
			name: "Monpa Chant",
			region: "Tawang",
			instruments: "Dungchen, Cymbals, Drums",
			description: "Deep monastic chanting that rolls through Tawang's prayer halls at dawn.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Front_fa%C3%A7ade_of_the_Buddha_Temple_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg/1280px-Front_fa%C3%A7ade_of_the_Buddha_Temple_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg"
		}, {
			name: "Nyishi Folk Song",
			region: "Central Arunachal",
			instruments: "Bamboo flute, Gong",
			description: "Story-songs of hunting, migration and harvest sung at community houses.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Local_meal_in_Nishi_tribe_served_in_the_capital_of_Arunachal_Pradesh_-_North_East_India.jpg/1280px-Local_meal_in_Nishi_tribe_served_in_the_capital_of_Arunachal_Pradesh_-_North_East_India.jpg"
		}],
		foods: [
			{
				name: "Thukpa",
				origin: "Tibetan-Monpa kitchens",
				description: "A hot noodle soup with vegetables or meat, eaten through freezing hill evenings.",
				whereToTry: "Monastery cafes in Tawang",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/A_bowl_of_Thukpa.jpg/1280px-A_bowl_of_Thukpa.jpg"
			},
			{
				name: "Zan",
				origin: "Monpa homes",
				description: "Millet or buckwheat porridge stirred with leafy greens and cheese.",
				whereToTry: "Home kitchens and homestays in Tawang",
				image: "https://upload.wikimedia.org/wikipedia/commons/8/87/07535_Buckwheat_burgers_aka_Hreczki.jpg"
			},
			{
				name: "Bamboo Shoot Curry",
				origin: "Tribal Arunachal",
				description: "Fermented bamboo shoot cooked with pork or fish for a sharp, smoky taste.",
				whereToTry: "Local dhabas in Itanagar and Ziro",
				image: "https://upload.wikimedia.org/wikipedia/commons/1/17/A_lunch_platter_of_Assamese_cuisine.jpg"
			}
		],
		festivals: [
			{
				name: "Losar",
				description: "The Monpa new year with monastery masked dances and butter lamps.",
				month: "February",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/2018_Leh_Dosmoche_festival_03.jpg/1280px-2018_Leh_Dosmoche_festival_03.jpg"
			},
			{
				name: "Ziro Music Festival",
				description: "An outdoor indie music festival held in the paddy fields of Ziro.",
				month: "September",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ziro_Festival_of_Music_-_2019_%28Arunachal_Pradesh%29_%2848868248663%29.jpg/1280px-Ziro_Festival_of_Music_-_2019_%28Arunachal_Pradesh%29_%2848868248663%29.jpg"
			},
			{
				name: "Nyokum Yullo",
				description: "The Nyishi harvest festival praying for prosperity and good crops.",
				month: "February",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nyokum_festival_Nyishi.JPG/1280px-Nyokum_festival_Nyishi.JPG"
			}
		],
		artForms: [
			{
				name: "Thangka Painting",
				description: "Scroll paintings of Buddhist deities made with mineral pigments.",
				image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Begtse_%28Mongolian_Thangka_Painting%29.jpg"
			},
			{
				name: "Carpet Weaving",
				description: "Monpa carpets with dragon and lotus motifs woven on hand looms.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Description-_Tibetan_carpet_weavers_from_Nepal_demonstrate_their_skills_during_the_2002_Smithsonian_Folklife_Festival_featuring_The_Silk_Road._%282548100217%29.jpg/1280px-Description-_Tibetan_carpet_weavers_from_Nepal_demonstrate_their_skills_during_the_2002_Smithsonian_Folklife_Festival_featuring_The_Silk_Road._%282548100217%29.jpg"
			},
			{
				name: "Wood Carving",
				description: "Carved masks and prayer wheels for monastery rituals.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Inside_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg/1280px-Inside_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg"
			}
		],
		restaurants: [{
			id: "arunachal-pradesh-r1",
			name: "Dawn Kitchen",
			city: "Itanagar",
			stateId: "arunachal-pradesh",
			cuisine: "Arunachali",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/20200304_211332_Traditional_Arunachal_Food_in_Tokri_Miao_Changlang%2C_Arunachal_Pradesh_01.jpg/1280px-20200304_211332_Traditional_Arunachal_Food_in_Tokri_Miao_Changlang%2C_Arunachal_Pradesh_01.jpg",
			description: "Tribal thalis with bamboo shoot, smoked pork and rice beer."
		}, {
			id: "arunachal-pradesh-r2",
			name: "Tawang View Cafe",
			city: "Tawang",
			stateId: "arunachal-pradesh",
			cuisine: "Tibetan-Monpa",
			rating: 4.5,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Kalachakra_Mandala_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg/1280px-Kalachakra_Mandala_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg",
			description: "Momos and thukpa with a window straight onto the monastery."
		}],
		events: [{
			id: "arunachal-pradesh-e1",
			name: "Tawang Festival",
			location: "Tawang, Arunachal Pradesh",
			stateId: "arunachal-pradesh",
			date: "Oct 20–22",
			month: "October",
			category: "Cultural Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Aerial_view_of_Tawang%2C_Arunachal_Pradesh.jpg",
			description: "Three days of yak dances, archery and Himalayan food stalls."
		}, {
			id: "arunachal-pradesh-e2",
			name: "Siang River Festival",
			location: "Pasighat, Arunachal Pradesh",
			stateId: "arunachal-pradesh",
			date: "Dec 1–3",
			month: "December",
			category: "Adventure",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/AR5Siang_banks_at_Pasighat.jpg/1280px-AR5Siang_banks_at_Pasighat.jpg",
			description: "River rafting, elephant races and tribal cuisine on the Siang."
		}]
	},
	{
		id: "mizoram",
		name: "Mizoram",
		capital: "Aizawl",
		tagline: "The songbird of the northeast hills",
		highlight: "Blue hills • Cheraw • Bamboo shoot",
		description: "A state of steep blue ridges and singing villages, where almost everyone plays an instrument, bamboo builds everything, and the Cheraw dance clacks out a rhythm older than memory.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Aizawl%2C_Mizoram_-_panoramio.jpg/1280px-Aizawl%2C_Mizoram_-_panoramio.jpg",
		color: "#3E7BB6",
		mapPath: "M676.7,447.0 L675.5,443.5 L671.4,440.9 L670.5,444.9 L668.5,446.1 L667.4,441.6 L668.5,441.8 L668.6,440.3 L666.2,425.4 L664.0,419.0 L662.1,417.7 L662.6,414.1 L661.7,408.7 L663.0,408.5 L659.5,397.0 L658.9,391.5 L660.8,388.6 L661.0,381.6 L659.9,378.4 L663.3,378.4 L663.7,381.4 L664.9,381.7 L666.3,380.6 L666.9,378.6 L668.5,378.4 L668.9,376.0 L670.7,375.3 L672.7,370.3 L674.5,374.6 L676.7,373.6 L679.8,374.2 L679.9,379.0 L678.5,382.5 L681.3,382.9 L681.9,384.6 L683.2,383.3 L685.1,384.5 L685.9,383.4 L686.1,385.2 L688.4,384.4 L688.3,386.3 L690.1,388.0 L690.2,393.1 L691.3,395.5 L690.5,404.2 L689.2,405.2 L689.9,411.7 L687.3,415.6 L684.5,414.0 L682.8,414.4 L683.8,418.2 L683.0,418.4 L681.9,421.4 L681.7,424.4 L683.1,427.7 L682.2,429.7 L684.4,432.8 L684.9,437.7 L683.2,438.1 L683.4,440.2 L680.4,439.6 L681.0,442.4 L679.5,442.4 L679.4,445.9 L677.9,444.5 L676.7,447.0Z",
		mapLabelX: 675.1,
		mapLabelY: 408.7,
		places: [
			{
				id: "reiek-hills",
				name: "Reiek Heritage Village",
				city: "Reiek",
				stateId: "mizoram",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/A_cave_on_the_way_to_Reiek_top.jpg/1280px-A_cave_on_the_way_to_Reiek_top.jpg",
				description: "A recreated Mizo village of thatched houses below a 1,465 m cliff.",
				significance: "Preserves traditional Mizo homes, granaries and community life for future generations.",
				category: "heritage"
			},
			{
				id: "phawngpui",
				name: "Phawngpui Blue Mountain",
				city: "Lawngtlai",
				stateId: "mizoram",
				image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/2007-blue-mtn-farpak.jpg",
				description: "Mizoram's highest peak, believed to be the home of the spirits.",
				significance: "A national park sheltering rare orchids and the blyth's tragopan.",
				category: "nature"
			},
			{
				id: "vantawng-falls",
				name: "Vantawng Falls",
				city: "Serchhip",
				stateId: "mizoram",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Tuirihiau_falls%2C_Mizoram.jpg/1280px-Tuirihiau_falls%2C_Mizoram.jpg",
				description: "A 229 m waterfall dropping in two silver steps through bamboo forest.",
				significance: "The tallest waterfall in Mizoram and a state emblem of its wild interior.",
				category: "nature"
			}
		],
		traditions: [
			{
				name: "Puanchei Weaving",
				description: "The ceremonial Mizo skirt woven in black, red and white on a loin loom.",
				image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Halam_Tribal_Girl.jpg"
			},
			{
				name: "Zawlbuk Spirit",
				description: "The old bachelors' dormitory that taught young men discipline and service.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/A_free_Medical_Camp_organised_by_NRHM%2C_during_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Sangau_village_in_Lawngtlai_Distt._Mizoram_on_February_07%2C_2012.jpg/1280px-thumbnail.jpg"
			},
			{
				name: "Bamboo Building",
				description: "Houses, bridges and baskets built entirely without nails.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Aizawl%2C_mizoram_-_panoramio.jpg/1280px-Aizawl%2C_mizoram_-_panoramio.jpg"
			}
		],
		dances: [{
			name: "Cheraw",
			origin: "Ancient Mizo ritual",
			description: "The bamboo dance — girls step between clapping bamboo poles without a miss.",
			image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/CHAPCHAR_KUT_2013.jpg"
		}, {
			name: "Khuallam",
			origin: "Guest welcome ceremony",
			description: "A swaying dance performed in puandum shawls to welcome visitors.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mizoram_Bango_Nirtya_performed_at_the_44th_India_International_Film_Festival_of_India_%28IFFI-2013%29%2C_in_Panaji%2C_Goa_on_November_26%2C_2013.jpg/1280px-Mizoram_Bango_Nirtya_performed_at_the_44th_India_International_Film_Festival_of_India_%28IFFI-2013%29%2C_in_Panaji%2C_Goa_on_November_26%2C_2013.jpg"
		}],
		music: [{
			name: "Mizo Choir",
			region: "Aizawl",
			instruments: "Voice, Guitar, Khuang drum",
			description: "Church choirs in near-perfect harmony echo across the hills every Sunday.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Aizawl_City.jpg/1280px-Aizawl_City.jpg"
		}, {
			name: "Khuang Drumming",
			region: "Mizo villages",
			instruments: "Khuang, Darbu gongs",
			description: "The hollow log drum that keeps time for every festival dance.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Aizawl_City_in_2023.jpg/1280px-Aizawl_City_in_2023.jpg"
		}],
		foods: [
			{
				name: "Bai",
				origin: "Mizo homes",
				description: "A steamed stew of local greens, bamboo shoot and pork boiled with soda.",
				whereToTry: "Home-style eateries in Aizawl",
				image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Mizo_food.jpg"
			},
			{
				name: "Vawksa Rep",
				origin: "Mizo hill kitchens",
				description: "Smoked pork slow-cooked with mustard leaves over a wood fire.",
				whereToTry: "Local restaurants in Aizawl",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bohnakern.jpg/1280px-Bohnakern.jpg"
			},
			{
				name: "Sanpiau",
				origin: "Aizawl street stalls",
				description: "A soft rice porridge topped with coriander, pepper and fish sauce.",
				whereToTry: "Evening street stalls in Aizawl",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2014_01_Khao_tom_pla_Uttaradit.jpg/1280px-2014_01_Khao_tom_pla_Uttaradit.jpg"
			}
		],
		festivals: [
			{
				name: "Chapchar Kut",
				description: "The spring festival after jhum clearing, with Cheraw and feasting.",
				month: "March",
				image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Bird%27s_eye_view_of_Sabual_village.jpg"
			},
			{
				name: "Mim Kut",
				description: "A maize harvest festival remembering the dead with grain offerings.",
				month: "September",
				image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Aizawl_Mizoram_Hills.jpg"
			},
			{
				name: "Pawl Kut",
				description: "A harvest thanksgiving of feasting and children's games.",
				month: "December",
				image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/A_group_of_dancers_from_Mizoram_performing_%22Khuallam%22_dance_at_the_Republic_Day_Folk_Dance_Festival_2004_which_was_inaugurated_by_the_President_Dr._A.P.J_Abdul_Kalam_in_New_Delhi_on_January_24%2C_2004.jpg"
			}
		],
		artForms: [
			{
				name: "Puandum Textile",
				description: "A striped shawl every Mizo bride carries to her new home.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Skansen_w_Maurzycach%2C_%C5%81owicki_Park_Etnograficzny_w_Maurzycach%2C_2025%2C_SOULinPIX%2C_KsP_208.jpg/1280px-Skansen_w_Maurzycach%2C_%C5%81owicki_Park_Etnograficzny_w_Maurzycach%2C_2025%2C_SOULinPIX%2C_KsP_208.jpg"
			},
			{
				name: "Cane Basketry",
				description: "Tightly woven carrying baskets slung from the forehead.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Phingaluk_%28Phingailuk_or_Philuk%29%2C_a_traditional_Meitei_basket_used_exclusively_for_Meitei_wedding_ceremonies_%E2%80%94_Classical_Meitei_basketry_handicraft_%E2%80%94_statue_of_a_Meitei_lady_wearing_Innaphi_%26_Phanek_clothes_and_holding_the_basket_01.jpg/1280px-thumbnail.jpg"
			},
			{
				name: "Bamboo Flute Making",
				description: "Hand-cut flutes tuned to Mizo folk scales.",
				image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/2019_Jan_15_-_Prayagraj_Kumbh_Mela_-_Buying_Flutes.jpg"
			}
		],
		restaurants: [{
			id: "mizoram-r1",
			name: "Hill Bowl",
			city: "Aizawl",
			stateId: "mizoram",
			cuisine: "Mizo",
			rating: 4.4,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Asian_weaver_ants_chutney_made_by_the_Lotha_Nagas.jpg/1280px-Asian_weaver_ants_chutney_made_by_the_Lotha_Nagas.jpg",
			description: "Bai, smoked pork and rice served hot in a hillside dining room."
		}, {
			id: "mizoram-r2",
			name: "Cafe Zawlbuk",
			city: "Aizawl",
			stateId: "mizoram",
			cuisine: "Cafe",
			rating: 4.3,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Abad_Nucleus_Mall_Food_court.jpg/1280px-Abad_Nucleus_Mall_Food_court.jpg",
			description: "Coffee, sanpiau and live guitar with a valley view."
		}],
		events: [{
			id: "mizoram-e1",
			name: "Anthurium Festival",
			location: "Reiek, Mizoram",
			stateId: "mizoram",
			date: "Sep 12–14",
			month: "September",
			category: "Flower Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/A_red_anthurium_flower.jpg/1280px-A_red_anthurium_flower.jpg",
			description: "Anthurium blooms, Cheraw performances and hill food at Reiek."
		}, {
			id: "mizoram-e2",
			name: "Chapchar Kut Celebration",
			location: "Aizawl, Mizoram",
			stateId: "mizoram",
			date: "Mar 6–7",
			month: "March",
			category: "Cultural Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Cheraw.jpg/1280px-Cheraw.jpg",
			description: "The whole city dances Cheraw in the stadium in ceremonial dress."
		}]
	},
	{
		id: "andaman-nicobar",
		name: "Andaman and Nicobar Islands",
		capital: "Port Blair",
		tagline: "Coral seas and a colonial memory",
		highlight: "Cellular Jail • Coral reefs • Sea food",
		description: "Five hundred islands scattered in the Bay of Bengal, holding white beaches, living coral, ancient tribes and the prison walls where India's freedom fighters were exiled.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Beautiful_Radhanagar_Beach_in_the_Havelock%2C_Andaman_and_Nicobar_Islands.jpg/1280px-Beautiful_Radhanagar_Beach_in_the_Havelock%2C_Andaman_and_Nicobar_Islands.jpg",
		color: "#0E8C9E",
		mapPath: "M701.8,877.6 L699.6,871.9 L698.1,870.4 L697.3,870.7 L697.1,867.4 L697.9,865.6 L701.1,865.3 L702.3,864.1 L703.3,865.3 L703.5,868.5 L705.1,870.9 L704.2,870.9 L705.0,872.1 L703.7,873.6 L703.8,876.0 L702.4,875.9 L701.8,877.6ZM696.9,864.2 L696.5,860.6 L698.7,860.0 L698.6,858.6 L699.8,860.9 L696.9,864.2ZM691.8,846.8 L690.7,845.8 L688.7,846.2 L689.0,844.9 L688.2,845.4 L687.7,844.5 L688.3,843.0 L690.3,843.0 L690.2,844.0 L691.9,845.2 L691.8,846.8ZM695.0,845.2 L693.0,843.7 L693.7,842.6 L695.1,843.5 L695.0,845.2ZM692.9,843.3 L692.4,842.0 L693.7,841.1 L692.4,841.8 L691.6,838.5 L693.4,836.8 L694.1,837.8 L692.9,839.2 L694.3,841.4 L692.9,843.3ZM684.3,837.9 L681.6,835.8 L682.1,833.6 L683.1,833.7 L682.6,835.6 L684.8,837.3 L684.3,837.9ZM673.4,812.3 L671.4,811.4 L671.5,809.6 L672.8,809.6 L673.0,808.5 L674.3,810.2 L675.2,810.0 L673.4,812.3ZM665.6,773.6 L664.2,772.7 L662.2,772.9 L663.3,770.7 L662.2,769.3 L662.1,766.1 L662.7,766.7 L665.9,762.8 L667.1,763.8 L668.2,768.4 L666.6,770.8 L667.3,771.8 L665.6,773.6ZM668.5,750.4 L667.7,749.7 L668.9,748.6 L669.2,745.6 L670.6,747.8 L669.6,748.6 L670.8,749.2 L668.5,750.4ZM658.9,745.6 L657.7,745.2 L657.7,743.4 L659.2,743.7 L658.9,745.6ZM680.2,735.4 L677.1,732.2 L678.2,730.7 L679.4,731.5 L680.2,735.4ZM680.4,730.8 L678.0,727.9 L679.3,728.9 L679.9,727.4 L680.4,730.8ZM681.2,729.7 L680.2,728.3 L681.0,726.1 L681.8,728.1 L681.2,729.7ZM671.3,746.7 L669.5,745.4 L669.5,744.0 L668.7,744.3 L668.4,742.7 L669.4,742.2 L668.4,742.3 L667.9,740.0 L667.2,740.6 L666.7,736.7 L665.8,736.3 L667.2,733.6 L668.5,735.7 L668.9,729.2 L670.9,725.4 L671.0,727.4 L672.5,727.1 L671.9,730.2 L673.2,730.8 L672.6,731.5 L672.0,730.9 L672.8,732.1 L671.7,732.2 L671.6,736.2 L670.4,737.1 L671.4,737.0 L672.2,734.0 L673.3,733.9 L673.4,734.8 L672.5,740.4 L671.0,740.3 L671.2,741.3 L670.0,741.7 L670.8,742.6 L671.5,740.8 L672.5,741.4 L671.3,746.7ZM672.7,730.3 L672.0,729.7 L672.9,726.5 L672.3,724.4 L673.2,724.1 L672.9,723.3 L675.5,723.5 L675.9,726.5 L675.0,726.5 L675.1,727.7 L674.3,727.4 L672.7,730.3ZM703.0,725.5 L702.8,724.6 L702.4,725.5 L702.5,724.5 L701.8,725.2 L701.5,724.5 L701.7,723.5 L702.4,724.0 L702.1,723.1 L703.2,724.2 L703.0,725.5ZM672.4,723.8 L670.9,722.9 L671.2,715.3 L670.5,715.0 L672.4,713.3 L673.3,714.7 L673.3,712.3 L671.8,713.2 L671.6,708.9 L672.0,709.4 L672.6,708.0 L673.2,709.4 L673.5,707.1 L675.7,707.4 L676.4,706.1 L678.6,712.2 L678.3,718.2 L677.3,718.6 L678.0,719.0 L676.8,720.7 L674.6,718.2 L676.4,720.4 L673.6,719.8 L673.5,718.9 L676.3,723.0 L672.4,723.8ZM670.1,710.1 L669.9,707.4 L669.0,707.3 L670.0,707.4 L670.1,706.5 L669.2,706.3 L670.1,706.3 L670.8,704.3 L671.5,707.2 L670.1,710.1ZM674.9,707.5 L673.5,706.4 L674.4,703.7 L673.4,703.5 L674.0,700.5 L675.0,700.1 L673.9,699.7 L675.2,696.8 L674.3,696.2 L675.5,693.2 L674.9,692.7 L676.0,691.9 L675.6,690.8 L677.2,689.9 L676.9,688.9 L678.9,689.2 L678.8,687.9 L679.4,688.8 L679.9,687.7 L679.7,691.9 L681.1,692.6 L679.9,693.5 L680.7,693.3 L681.6,694.6 L681.0,695.5 L680.3,693.7 L678.8,694.8 L678.3,693.9 L677.8,694.4 L679.4,695.0 L679.5,696.3 L681.0,696.4 L680.1,701.8 L678.5,703.7 L677.4,701.7 L676.3,702.4 L677.5,704.8 L676.8,705.5 L675.9,704.5 L675.2,706.1 L675.7,707.3 L674.9,707.5Z",
		mapLabelX: 674.6,
		mapLabelY: 714.9,
		places: [
			{
				id: "cellular-jail",
				name: "Cellular Jail",
				city: "Port Blair",
				stateId: "andaman-nicobar",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Cellular_Jail%2C_Andaman%2C_Port_Blair%2C_India.jpg/1280px-Cellular_Jail%2C_Andaman%2C_Port_Blair%2C_India.jpg",
				description: "The colonial prison of seven wings where freedom fighters served kala pani sentences.",
				significance: "A national memorial to India's independence struggle and its exiled prisoners.",
				category: "monument"
			},
			{
				id: "radhanagar-beach",
				name: "Radhanagar Beach",
				city: "Havelock Island",
				stateId: "andaman-nicobar",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Havelock_Island%2C_Radhanagar_Beach_before_sunset%2C_Andaman_Islands.jpg/1280px-Havelock_Island%2C_Radhanagar_Beach_before_sunset%2C_Andaman_Islands.jpg",
				description: "A long curve of powder-white sand backed by mahua trees.",
				significance: "Repeatedly ranked among Asia's finest beaches for its clear, shallow water.",
				category: "nature"
			},
			{
				id: "ross-island",
				name: "Ross Island",
				city: "Port Blair",
				stateId: "andaman-nicobar",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Andaman_sea.jpg/1280px-Andaman_sea.jpg",
				description: "The ruined British administrative capital now swallowed by banyan roots.",
				significance: "A living reminder of colonial rule, abandoned after the 1941 earthquake.",
				category: "heritage"
			}
		],
		traditions: [
			{
				name: "Nicobarese Hut Building",
				description: "Circular stilt huts of wood and thatch built to survive storms.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Havelock_Island%2C_Radhanagar_Beach%2C_Andaman_Islands.jpg/1280px-Havelock_Island%2C_Radhanagar_Beach%2C_Andaman_Islands.jpg"
			},
			{
				name: "Shell Craft",
				description: "Lamps, jewellery and inlay work made from island seashells.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Arts_and_crafts_of_Israel_-_Beads%2C_September_2024_01.jpg/1280px-Arts_and_crafts_of_Israel_-_Beads%2C_September_2024_01.jpg"
			},
			{
				name: "Coconut Culture",
				description: "Coconut in every meal, roof, rope and ritual across the islands.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/AndamansAndNicobarIslands.jpg/1280px-AndamansAndNicobarIslands.jpg"
			}
		],
		dances: [{
			name: "Nicobari Ossuary Dance",
			origin: "Nicobar Islands",
			description: "A circle dance performed under moonlight at pig festivals.",
			image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Construction_of_a_new_temporary_hutment_by_Nicobari_youth.jpg"
		}, {
			name: "Bengali Folk on Islands",
			origin: "Settler communities",
			description: "Mainland folk dances kept alive by settler families in Port Blair.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/An_ancient_Bengali_folk_martial_dance_Raibenshe_41.jpg/1280px-An_ancient_Bengali_folk_martial_dance_Raibenshe_41.jpg"
		}],
		music: [{
			name: "Nicobari Song",
			region: "Car Nicobar",
			instruments: "Voice, Coconut shell percussion",
			description: "Chorus songs about canoes, pigs and the sea sung in Nicobarese.",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/A_still_of_unique_Kuchet_%283_floored%29_family_hut_in_Kakana_village_in_Car_Nicobar_that_was_visited_by_the_Vice_President_Shri_Bhairon_Singh_Shekhawat_on_January_01%2C_2004.jpg"
		}, {
			name: "Island Fusion",
			region: "Port Blair",
			instruments: "Guitar, Dhol, Drums",
			description: "Bengali, Tamil and Nicobari melodies mixed by settler generations.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Birdwatchers_watching_Pied_Imperial_Pigeon_at_Chatham_Jetty%2C_Port_Blair_%2817852%29.jpg/1280px-Birdwatchers_watching_Pied_Imperial_Pigeon_at_Chatham_Jetty%2C_Port_Blair_%2817852%29.jpg"
		}],
		foods: [
			{
				name: "Grilled Lobster",
				origin: "Island coast",
				description: "Fresh lobster split and grilled with butter and island pepper.",
				whereToTry: "Beach shacks on Havelock Island",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cousins_Maine_Lobster_-_SF_Bay_Area_-_June_2023_-_Sarah_Stierch_03.jpg/1280px-Cousins_Maine_Lobster_-_SF_Bay_Area_-_June_2023_-_Sarah_Stierch_03.jpg"
			},
			{
				name: "Fish Curry with Coconut",
				origin: "Andaman kitchens",
				description: "Reef fish simmered in thick coconut milk and curry leaves.",
				whereToTry: "Local eateries in Port Blair",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Aavoli_%28Pomfret%29_Fish_Curry.jpg/1280px-Aavoli_%28Pomfret%29_Fish_Curry.jpg"
			},
			{
				name: "Amritsari Kulcha of Port Blair",
				origin: "Settler kitchens",
				description: "A mainland favourite reinvented by settler families on the islands.",
				whereToTry: "Aberdeen Bazaar, Port Blair",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Butter_kulcha_-_paneer_chana.jpg/1280px-Butter_kulcha_-_paneer_chana.jpg"
			}
		],
		festivals: [
			{
				name: "Island Tourism Festival",
				description: "Ten days of dance, food and water sports across Port Blair.",
				month: "January",
				image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/An_International_Food_Festival_organised_as_part_of_maiden_trilateral_exercise_between_Indian_Navy_Republic_of_Singapore_Navy_and_Royal_Thai_Navy_2.jpg"
			},
			{
				name: "Pongal on the Islands",
				description: "Tamil settlers cook the harvest pot on the beach.",
				month: "January",
				image: "https://upload.wikimedia.org/wikipedia/commons/9/95/2006_kolam_decoration_for_Pongal_festival_2.jpg"
			},
			{
				name: "Subhash Mela",
				description: "A fair marking Netaji's flag hoisting on Andaman soil.",
				month: "December",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Netaji_Subhas_Chandra_Bose_Statue.jpg/1280px-Netaji_Subhas_Chandra_Bose_Statue.jpg"
			}
		],
		artForms: [
			{
				name: "Shell Inlay",
				description: "Mother-of-pearl inlay set into wooden boxes and trays.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bagdad_Kiosk_Intarsia_detail_2.jpg/1280px-Bagdad_Kiosk_Intarsia_detail_2.jpg"
			},
			{
				name: "Cane Furniture",
				description: "Island cane bent into chairs and lamps by local workshops.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Artisan_producing_cane_furniture._Cova_Lima.jpg/1280px-Artisan_producing_cane_furniture._Cova_Lima.jpg"
			},
			{
				name: "Driftwood Sculpture",
				description: "Sea-worn wood carved into fish, birds and masks.",
				image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/A_driftwood_sculpture_at_The_Skipper_-_geograph.org.uk_-_6840696.jpg"
			}
		],
		restaurants: [{
			id: "andaman-nicobar-r1",
			name: "Full Moon Cafe",
			city: "Havelock Island",
			stateId: "andaman-nicobar",
			cuisine: "Seafood",
			rating: 4.6,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/%281%29Doyles_Beach_Restaurant_Watsons_Bay.jpg/1280px-%281%29Doyles_Beach_Restaurant_Watsons_Bay.jpg",
			description: "Fresh catch grilled by the water with the sunset on your plate."
		}, {
			id: "andaman-nicobar-r2",
			name: "Anju Coco Resto",
			city: "Port Blair",
			stateId: "andaman-nicobar",
			cuisine: "Multi-cuisine",
			rating: 4.5,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Gudbud_-_Diana_Restaurant%2C_Udupi_-_Karnataka_-_PXL6228.jpg/1280px-Gudbud_-_Diana_Restaurant%2C_Udupi_-_Karnataka_-_PXL6228.jpg",
			description: "Island seafood, thalis and coconut desserts in a garden setting."
		}],
		events: [{
			id: "andaman-nicobar-e1",
			name: "Island Tourism Festival",
			location: "Port Blair, Andaman",
			stateId: "andaman-nicobar",
			date: "Jan 5–14",
			month: "January",
			category: "Cultural Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Beautiful_Radha_Nagar_beach_beach%2C_Havelock._Andaman_and_Nicobar_Island.jpg/1280px-Beautiful_Radha_Nagar_beach_beach%2C_Havelock._Andaman_and_Nicobar_Island.jpg",
			description: "Island-wide dance, crafts and seafood carnival."
		}, {
			id: "andaman-nicobar-e2",
			name: "Beach Festival",
			location: "Havelock, Andaman",
			stateId: "andaman-nicobar",
			date: "Apr 12–14",
			month: "April",
			category: "Beach Carnival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Havelock_Island%2C_Andaman_Sea%2C_Andaman_Islands.jpg/1280px-Havelock_Island%2C_Andaman_Sea%2C_Andaman_Islands.jpg",
			description: "Snorkelling, sand art and beach music on Radhanagar."
		}]
	},
	{
		id: "chandigarh",
		name: "Chandigarh",
		capital: "Chandigarh",
		tagline: "The city Le Corbusier drew",
		highlight: "Rock Garden • Capitol Complex • Gol gappe",
		description: "India's first planned city — grid sectors, wide green avenues and raw concrete modernism, softened by rose gardens, lake sunsets and Punjabi appetite.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/7/7f/A_view_of_Open_hand_monument_part_of_Chandigarh_Capitol_Complex%2C_World_Heritage_Site.jpg",
		color: "#B07A2E",
		mapPath: "M235.6,180.3 L232.8,177.8 L234.6,176.2 L236.5,177.3 L236.8,178.9 L235.6,180.3Z",
		mapLabelX: 234.8,
		mapLabelY: 178.2,
		places: [
			{
				id: "rock-garden",
				name: "Rock Garden",
				city: "Chandigarh",
				stateId: "chandigarh",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Chandigarh_Rock_Garden_4.jpg/1280px-Chandigarh_Rock_Garden_4.jpg",
				description: "A secret garden of thousands of figures made from industrial waste and broken tiles.",
				significance: "Nek Chand's forty-acre self-taught masterpiece, built in secret for eighteen years.",
				category: "heritage"
			},
			{
				id: "capitol-complex",
				name: "Capitol Complex",
				city: "Chandigarh",
				stateId: "chandigarh",
				image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Architect_design_of_building_of_Palace_of_Assembly_%2Cpart_of_the_Capitol_Complex_%2CChandigarh_02.jpg",
				description: "Le Corbusier's concrete assembly, secretariat and high court around an open plaza.",
				significance: "A UNESCO World Heritage Site and the birthplace of Indian modernist architecture.",
				category: "monument"
			},
			{
				id: "sukhna-lake",
				name: "Sukhna Lake",
				city: "Chandigarh",
				stateId: "chandigarh",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/On_Sukhna_Lake_02.jpg/1280px-On_Sukhna_Lake_02.jpg",
				description: "A man-made lake where the city walks, rows and watches the Shivaliks at dusk.",
				significance: "Designed into the city plan itself as its shared outdoor living room.",
				category: "nature"
			}
		],
		traditions: [
			{
				name: "Sector Life",
				description: "Each numbered sector built as a self-sufficient neighbourhood with its own market.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/A_Young_Professional_Enjoys_her_Vacation_in_Sector_17_Market%2C_Chandigarh.jpg/1280px-A_Young_Professional_Enjoys_her_Vacation_in_Sector_17_Market%2C_Chandigarh.jpg"
			},
			{
				name: "Rose Garden Culture",
				description: "India's largest rose garden, with an annual festival of 50,000 bushes.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Rose_Garden_%2CChandigarh%2CIndia.jpg/1280px-Rose_Garden_%2CChandigarh%2CIndia.jpg"
			},
			{
				name: "Open Hand Symbol",
				description: "The rotating Open Hand monument — open to give, open to receive.",
				image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Chandigarh_Capitol_Complex_-_Le_Corbusier_-_Open_hand_monument.jpg"
			}
		],
		dances: [{
			name: "Bhangra",
			origin: "Punjab plains",
			description: "The harvest dance of dhol, shoulders and sheer joy, danced at every Chandigarh wedding.",
			image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/A_bhangra_Group_in_Dubai_%28United_Bhangra%29.jpg"
		}, {
			name: "Giddha",
			origin: "Punjabi women",
			description: "Clapping, boliyan couplets and quick footwork in a circle.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Giddha_2.jpg/1280px-Giddha_2.jpg"
		}],
		music: [{
			name: "Punjabi Pop",
			region: "Chandigarh studios",
			instruments: "Dhol, Tumbi, Synth",
			description: "The recording city that turned Punjabi folk into a global pop sound.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Ashoka_Chakra_imprint_on_martyr%27s_memorial.jpg/1280px-Ashoka_Chakra_imprint_on_martyr%27s_memorial.jpg"
		}, {
			name: "Sufi Kalam",
			region: "Punjab region",
			instruments: "Harmonium, Tabla",
			description: "Bulleh Shah's verses sung at college fests and city auditoriums.",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Fannafiallah_sufi_qawwali-7382441676.jpg"
		}],
		foods: [
			{
				name: "Chole Bhature",
				origin: "Punjab",
				description: "Fluffy fried bread with spiced chickpeas — the city's default breakfast.",
				whereToTry: "Sector 17 and Sector 22 dhabas",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/A_Plate_of_Chole_Bhature.JPG/1280px-A_Plate_of_Chole_Bhature.JPG"
			},
			{
				name: "Amritsari Fish",
				origin: "Amritsar",
				description: "Gram-flour battered fish fried crisp with ajwain and lemon.",
				whereToTry: "Sector 26 food street",
				image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Amritsari_Fried_Fish-_Amritsar-Punjab_IMG_04.jpg"
			},
			{
				name: "Gol Gappe",
				origin: "North India",
				description: "Crisp hollow puris filled with spiced tamarind water, eaten standing up.",
				whereToTry: "Sector 17 plaza carts",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Customers_enjoying_pani_puri_at_Shiva_Shankar_Chat_Bandar_in_Nyalakal_village%2C_Telangana%2C_India.jpg/1280px-Customers_enjoying_pani_puri_at_Shiva_Shankar_Chat_Bandar_in_Nyalakal_village%2C_Telangana%2C_India.jpg"
			}
		],
		festivals: [
			{
				name: "Rose Festival",
				description: "Three days of rose displays, music and food in the Rose Garden.",
				month: "February",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/At_fountain_of_Morocco_Royal_rose_garden_in_Flower_festival_commemorative_park._%288131033157%29.jpg/1280px-At_fountain_of_Morocco_Royal_rose_garden_in_Flower_festival_commemorative_park._%288131033157%29.jpg"
			},
			{
				name: "Baisakhi",
				description: "Harvest new year with bhangra, langar and gurdwara processions.",
				month: "April",
				image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_Rongali_Bihu_celebration_gathering_in_Assam%2C_traditional_Hindu_new_year.jpg"
			},
			{
				name: "Chandigarh Carnival",
				description: "A city carnival of parades, floats and street performers.",
				month: "November",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Glimpses_of_Carnival_parade_at_the_inauguration_of_the_National_Tribal_Carnival-2016%2C_in_New_Delhi_on_October_25%2C_2016.jpg/1280px-Glimpses_of_Carnival_parade_at_the_inauguration_of_the_National_Tribal_Carnival-2016%2C_in_New_Delhi_on_October_25%2C_2016.jpg"
			}
		],
		artForms: [
			{
				name: "Nek Chand Mosaic",
				description: "Broken bangles, tiles and sockets turned into sculpture.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bizzare_human_figurines_and_peacocks%2C_done_typically_Nek_Chand_style_%2830405095878%29.jpg/1280px-Bizzare_human_figurines_and_peacocks%2C_done_typically_Nek_Chand_style_%2830405095878%29.jpg"
			},
			{
				name: "Modernist Furniture",
				description: "Chandigarh chairs in teak and cane designed by Pierre Jeanneret.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Armchair_created_by_Pierre_Jeanneret_PJ-SI-01-C.jpg/1280px-Armchair_created_by_Pierre_Jeanneret_PJ-SI-01-C.jpg"
			},
			{
				name: "Phulkari",
				description: "Punjabi floral embroidery worked in silk floss on khaddar.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/%27Phulkari%27_%28bridal_shawl%29%2C_Punjab%2C_early_20th_century%2C_cotton%2C_silk_and_embroidery%2C_Honolulu_Academy_of_Arts.jpg/1280px-%27Phulkari%27_%28bridal_shawl%29%2C_Punjab%2C_early_20th_century%2C_cotton%2C_silk_and_embroidery%2C_Honolulu_Academy_of_Arts.jpg"
			}
		],
		restaurants: [{
			id: "chandigarh-r1",
			name: "Pal Dhaba",
			city: "Chandigarh",
			stateId: "chandigarh",
			cuisine: "Punjabi",
			rating: 4.5,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Aloo_Paratha_Thali.jpg",
			description: "Legendary butter-heavy Punjabi curries since 1963."
		}, {
			id: "chandigarh-r2",
			name: "Sector 26 Food Street",
			city: "Chandigarh",
			stateId: "chandigarh",
			cuisine: "Street Food",
			rating: 4.4,
			priceRange: "₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Authentic_Sylheti_Cuisine.jpg/1280px-Authentic_Sylheti_Cuisine.jpg",
			description: "Night rows of tandoors, chaat carts and kulfi stalls."
		}],
		events: [{
			id: "chandigarh-e1",
			name: "Rose Festival",
			location: "Chandigarh",
			stateId: "chandigarh",
			date: "Feb 21–23",
			month: "February",
			category: "Flower Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Colors_and_varieties_of_roses_in_Zakir_Hussain_Rose_Garden%2C_Chandigarh_05.jpg",
			description: "Fifty thousand rose bushes in bloom with concerts and food stalls."
		}, {
			id: "chandigarh-e2",
			name: "Chandigarh Carnival",
			location: "Chandigarh",
			stateId: "chandigarh",
			date: "Nov 15–17",
			month: "November",
			category: "Street Carnival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ariel_view_of_Chandigarh.jpg/1280px-Ariel_view_of_Chandigarh.jpg",
			description: "Floats, street theatre and a lake-side fair."
		}]
	},
	{
		id: "dadra-nagar-haveli",
		name: "Dadra and Nagar Haveli",
		capital: "Silvassa",
		tagline: "Tribal heartland in a teak forest",
		highlight: "Warli art • Tarpa dance • Silvassa",
		description: "A pocket of forested hills between Gujarat and Maharashtra, home to the Warli, Kokna and Dhodia tribes whose white stick-figure paintings now travel the world.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Dadra_and_Nagar_Haveli_Silvassa.jpg/1280px-Dadra_and_Nagar_Haveli_Silvassa.jpg",
		color: "#6B8E3D",
		mapPath: "M136.7,502.6 L133.4,501.2 L133.2,502.1 L132.0,500.0 L131.4,500.8 L131.1,497.5 L129.7,495.9 L131.3,496.1 L132.3,494.8 L133.0,495.6 L134.6,493.6 L134.8,495.2 L136.6,495.0 L133.5,498.1 L134.0,499.5 L135.9,499.0 L135.7,498.0 L138.0,498.6 L136.7,502.6Z",
		mapLabelX: 133.8,
		mapLabelY: 498.1,
		places: [
			{
				id: "vanganga-lake",
				name: "Vanganga Lake Garden",
				city: "Silvassa",
				stateId: "dadra-nagar-haveli",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dadra_and_Nagar_Haveli_Silvassa_2.jpg/1280px-Dadra_and_Nagar_Haveli_Silvassa_2.jpg",
				description: "An island garden with Japanese bridges, lotus ponds and boat rides.",
				significance: "Silvassa's best-loved public garden, built around a restored lake.",
				category: "nature"
			},
			{
				id: "tribal-museum",
				name: "Tribal Cultural Museum",
				city: "Silvassa",
				stateId: "dadra-nagar-haveli",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/A_Warli_painting_by_Jivya_Soma_Mashe%2C_Thane_district.jpg/1280px-A_Warli_painting_by_Jivya_Soma_Mashe%2C_Thane_district.jpg",
				description: "Masks, hunting tools and Warli murals of the region's tribes.",
				significance: "The main record of Warli, Kokna and Dhodia material culture.",
				category: "heritage"
			},
			{
				id: "dudhni-lake",
				name: "Dudhni Lake",
				city: "Dudhni",
				stateId: "dadra-nagar-haveli",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/A_Beautiful_Nature_of_Silvassa.jpg/1280px-A_Beautiful_Nature_of_Silvassa.jpg",
				description: "A backwater of the Madhuban dam ringed by hills, popular for kayaking.",
				significance: "The region's outdoor centre for boating and lakeside camping.",
				category: "nature"
			}
		],
		traditions: [
			{
				name: "Warli Wall Painting",
				description: "White rice-paste figures painted on mud walls for weddings and harvests.",
				image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Anonymous_Warli_painting_on_paper%2C_64_x_86_cm.jpg"
			},
			{
				name: "Tarpa Instrument",
				description: "A gourd-and-bamboo wind instrument that leads the village dance.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Bohada_in_Palghar_Tribe_Festival.jpg/1280px-Bohada_in_Palghar_Tribe_Festival.jpg"
			},
			{
				name: "Ghotul Gatherings",
				description: "Village youth gatherings where songs, dances and stories pass down.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Argyreia_nervosa_plant_in_village_Parala.jpg/1280px-Argyreia_nervosa_plant_in_village_Parala.jpg"
			}
		],
		dances: [{
			name: "Tarpa Dance",
			origin: "Warli tribe",
			description: "A spiral chain of dancers circling the tarpa player until dawn.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bohada_in_Palghar_Tribe_Festival_%2826313%29.jpg/1280px-Bohada_in_Palghar_Tribe_Festival_%2826313%29.jpg"
		}, {
			name: "Dhol Dance",
			origin: "Kokna tribe",
			description: "Rows of drummers and dancers marking the end of harvest.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Traditional_Tribal_Dance_of_India_014.jpg/1280px-Traditional_Tribal_Dance_of_India_014.jpg"
		}],
		music: [{
			name: "Tarpa Melody",
			region: "Warli villages",
			instruments: "Tarpa, Dhol",
			description: "A single droning reed that can be heard across three hills.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Traditional_Tribal_Dance_of_India_018.jpg/1280px-Traditional_Tribal_Dance_of_India_018.jpg"
		}, {
			name: "Kokna Harvest Song",
			region: "Nagar Haveli",
			instruments: "Dhol, Thali",
			description: "Call-and-response songs sung while threshing paddy.",
			image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/IMG-20170106-WA0000-01.jpg"
		}],
		foods: [
			{
				name: "Ubadiyu",
				origin: "Gujarat border villages",
				description: "Winter vegetables and beans steamed underground in an earthen pot.",
				whereToTry: "Roadside stalls around Silvassa in winter",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Undhiyu.jpg/1280px-Undhiyu.jpg"
			},
			{
				name: "Chicken Kadhi",
				origin: "Local kitchens",
				description: "Country chicken in a tangy buttermilk gravy with local spice.",
				whereToTry: "Family restaurants in Silvassa",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Butter_chicken_curry_of_Lawson.jpg/1280px-Butter_chicken_curry_of_Lawson.jpg"
			},
			{
				name: "Rice Bhakri",
				origin: "Tribal homes",
				description: "Hand-patted rice flatbread eaten with chutney and dal.",
				whereToTry: "Village homestays near Dudhni",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Bhakari2.jpg/1280px-Bhakari2.jpg"
			}
		],
		festivals: [
			{
				name: "Tarpa Festival",
				description: "A night of tarpa music and spiral dancing after harvest.",
				month: "October",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Traditional_Tribal_Dance_of_India_020.jpg/1280px-Traditional_Tribal_Dance_of_India_020.jpg"
			},
			{
				name: "Diwali Padwa",
				description: "Tribal cattle worship and lamp lighting across the villages.",
				month: "November",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Decorative_lamps_for_Diwali.jpg/1280px-Decorative_lamps_for_Diwali.jpg"
			},
			{
				name: "Holi in the Hamlets",
				description: "Bonfires, drums and colour in the forest villages.",
				month: "March",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Barsana_Holi_Festival.jpg/1280px-Barsana_Holi_Festival.jpg"
			}
		],
		artForms: [
			{
				name: "Warli Painting",
				description: "Circles, triangles and stick figures telling stories of village life.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Art_of_warli.jpg/1280px-Art_of_warli.jpg"
			},
			{
				name: "Bamboo Craft",
				description: "Fish traps, winnows and mats woven from forest bamboo.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/A_view_of_bamboo_basket_making.JPG/1280px-A_view_of_bamboo_basket_making.JPG"
			},
			{
				name: "Terracotta Votives",
				description: "Clay horses and figures offered at village shrines.",
				image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Art_of_BishnupurDSC06025.jpg"
			}
		],
		restaurants: [{
			id: "dadra-nagar-haveli-r1",
			name: "Silvassa Spice",
			city: "Silvassa",
			stateId: "dadra-nagar-haveli",
			cuisine: "Gujarati-Tribal",
			rating: 4.3,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ahmedabad-gujarati_thali.jpg/1280px-Ahmedabad-gujarati_thali.jpg",
			description: "Ubadiyu in winter and local thalis all year."
		}, {
			id: "dadra-nagar-haveli-r2",
			name: "Dudhni Lakeside",
			city: "Dudhni",
			stateId: "dadra-nagar-haveli",
			cuisine: "Multi-cuisine",
			rating: 4.2,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Dadra_and_Nagar_Haveli_Silvassa_3.jpg/1280px-Dadra_and_Nagar_Haveli_Silvassa_3.jpg",
			description: "Grilled fish and curries on a deck over the water."
		}],
		events: [{
			id: "dadra-nagar-haveli-e1",
			name: "Tarpa Festival",
			location: "Silvassa, Dadra and Nagar Haveli",
			stateId: "dadra-nagar-haveli",
			date: "Oct 18–19",
			month: "October",
			category: "Tribal Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bohada_in_Palghar_Tribe_Festival_%2840549%29.jpg/1280px-Bohada_in_Palghar_Tribe_Festival_%2840549%29.jpg",
			description: "Warli tarpa dancers from every village dance through the night."
		}, {
			id: "dadra-nagar-haveli-e2",
			name: "Monsoon Magic Festival",
			location: "Dudhni, Dadra and Nagar Haveli",
			stateId: "dadra-nagar-haveli",
			date: "Aug 9–11",
			month: "August",
			category: "Nature Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/A_waterfall_by_the_roadside-_many_of_these_occur_during_the_monsoons_%2828561900705%29.jpg/1280px-A_waterfall_by_the_roadside-_many_of_these_occur_during_the_monsoons_%2828561900705%29.jpg",
			description: "Waterfall treks, kayaking and tribal food stalls."
		}]
	},
	{
		id: "daman-diu",
		name: "Daman and Diu",
		capital: "Daman",
		tagline: "Portuguese forts on an Indian shore",
		highlight: "Sea forts • Baroque churches • Fresh catch",
		description: "Two former Portuguese enclaves on the Arabian Sea, where whitewashed churches, tiled houses and enormous sea forts stand over fishing harbours and quiet beaches.",
		heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Arabian_Sea_from_Diu_Fort_-_panoramio.jpg/1280px-Arabian_Sea_from_Diu_Fort_-_panoramio.jpg",
		color: "#C25A3C",
		mapPath: "M72.6,483.9 L68.1,481.9 L69.8,475.1 L73.7,476.2 L74.3,477.7 L72.0,479.2 L74.2,480.0 L72.7,481.9 L73.6,483.5 L72.6,483.9Z",
		mapLabelX: 71.2,
		mapLabelY: 479.5,
		places: [
			{
				id: "diu-fort",
				name: "Diu Fort",
				city: "Diu",
				stateId: "daman-diu",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Diu_Fort_-_panoramio.jpg/1280px-Diu_Fort_-_panoramio.jpg",
				description: "A vast sea fortress of 1535 with cannons still pointing at the water.",
				significance: "The strongest surviving Portuguese fortification in India.",
				category: "fort"
			},
			{
				id: "st-pauls-church",
				name: "St Paul's Church",
				city: "Diu",
				stateId: "daman-diu",
				image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Diu%2CGujarat%2CIndia_%2826%29.jpg",
				description: "A baroque church of carved wood and shell-white plaster, lit by chandeliers.",
				significance: "One of the finest Portuguese baroque interiors surviving in Asia.",
				category: "heritage"
			},
			{
				id: "moti-daman-fort",
				name: "Moti Daman Fort",
				city: "Daman",
				stateId: "daman-diu",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Daman_Freedom_Memorial.JPG/1280px-Daman_Freedom_Memorial.JPG",
				description: "A walled town of bastions, gates and a lighthouse over the Damanganga river.",
				significance: "The old Portuguese administrative capital, still lived in today.",
				category: "fort"
			}
		],
		traditions: [
			{
				name: "Fishing Fleet",
				description: "Painted wooden trawlers that leave the harbour before dawn.",
				image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Diu_Fort_1.jpg"
			},
			{
				name: "Portuguese Tiles",
				description: "Azulejo tiles and carved balconies on old town houses.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Azulejo_-_Igreja_de_S%C3%A3o_Bento_-_Ribeira_Brava.jpg/1280px-Azulejo_-_Igreja_de_S%C3%A3o_Bento_-_Ribeira_Brava.jpg"
			},
			{
				name: "Feast Day Processions",
				description: "Church statues carried through the streets on saints' days.",
				image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Altar_servers_getting_ready_for_the_procession.jpg"
			}
		],
		dances: [{
			name: "Mando",
			origin: "Indo-Portuguese heritage",
			description: "A slow ballroom-style dance in white and lace, sung in Konkani-Portuguese.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/A_singer_from_the_world_of_the_Mando%2C_the_song-dance_form_of_Konkani_music_from_Goa.jpg/1280px-A_singer_from_the_world_of_the_Mando%2C_the_song-dance_form_of_Konkani_music_from_Goa.jpg"
		}, {
			name: "Verdigo",
			origin: "Daman Catholic community",
			description: "A quick partnered folk dance at weddings and feast days.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dhaalo.jpg/1280px-Dhaalo.jpg"
		}],
		music: [{
			name: "Konkani Ballad",
			region: "Daman and Diu",
			instruments: "Violin, Guitar, Ghumot",
			description: "Portuguese-flavoured love songs sung at feast dinners.",
			image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Diu_Fort_2.jpg"
		}, {
			name: "Fishermen's Song",
			region: "Coastal villages",
			instruments: "Voice, Drum",
			description: "Rowing songs that time the pull of the nets.",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Classical_Meitei_sculptures_of_ancient_Meitei_fishermen_using_different_indigenous_Meitei_fishing_instruments_%26_tools_to_catch_fish_02.jpg/1280px-Classical_Meitei_sculptures_of_ancient_Meitei_fishermen_using_different_indigenous_Meitei_fishing_instruments_%26_tools_to_catch_fish_02.jpg"
		}],
		foods: [
			{
				name: "Prawn Balchao",
				origin: "Portuguese-Indian coast",
				description: "Prawns pickled in a hot vinegar and chilli masala.",
				whereToTry: "Seafront shacks in Diu",
				image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Balch%C3%A3o_de_camar%C3%A3o.JPG"
			},
			{
				name: "Grilled Pomfret",
				origin: "Arabian Sea coast",
				description: "Whole pomfret rubbed with green masala and grilled over coals.",
				whereToTry: "Harbour restaurants in Daman",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Tandoori_Pomfret.JPG/1280px-Tandoori_Pomfret.JPG"
			},
			{
				name: "Bebinca",
				origin: "Indo-Portuguese kitchens",
				description: "A layered coconut and egg pudding baked one layer at a time.",
				whereToTry: "Bakeries in Diu town",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Bebinca%2C_doce_de_Goa.jpg/1280px-Bebinca%2C_doce_de_Goa.jpg"
			}
		],
		festivals: [
			{
				name: "Nariyal Purnima",
				description: "Fishermen offer coconuts to the sea before the new season.",
				month: "August",
				image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/2022_jg_photography.jpg"
			},
			{
				name: "Feast of Our Lady of Sea",
				description: "Boat processions and church feasts in Diu.",
				month: "November",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Diu_Fort_Entrance.JPG/1280px-Diu_Fort_Entrance.JPG"
			},
			{
				name: "Diu Festival",
				description: "Beach concerts, food stalls and water sports through winter.",
				month: "December",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Before_Sunrise_at_Nagoa_Beach%2C_Diu-60-_28.06.2021.jpg/500px-Before_Sunrise_at_Nagoa_Beach%2C_Diu-60-_28.06.2021.jpg"
			}
		],
		artForms: [
			{
				name: "Shell Craft",
				description: "Wind chimes, lamps and boxes made from sea shells.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Diu_Fort_Entrance_-_panoramio.jpg/1280px-Diu_Fort_Entrance_-_panoramio.jpg"
			},
			{
				name: "Wood Carving",
				description: "Church altars and door frames carved in Burma teak.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Abbess_Roding_-_St_Edmund%27s_Church_-_Essex_England_-_chancel.jpg/1280px-Abbess_Roding_-_St_Edmund%27s_Church_-_Essex_England_-_chancel.jpg"
			},
			{
				name: "Lace and Embroidery",
				description: "Portuguese-taught lacework kept alive by Daman families.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Bodice%2C_infant%27s_%28AM_14507-6%29.jpg/1280px-Bodice%2C_infant%27s_%28AM_14507-6%29.jpg"
			}
		],
		restaurants: [{
			id: "daman-diu-r1",
			name: "O'Coqueiro",
			city: "Diu",
			stateId: "daman-diu",
			cuisine: "Seafood",
			rating: 4.5,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/0370_Varca_-_Zalor_Beach_2006-02-11_17-43-39_%2810543197555%29.jpg/1280px-0370_Varca_-_Zalor_Beach_2006-02-11_17-43-39_%2810543197555%29.jpg",
			description: "Balchao, grilled catch and cold drinks under coconut palms."
		}, {
			id: "daman-diu-r2",
			name: "Daman Harbour Grill",
			city: "Daman",
			stateId: "daman-diu",
			cuisine: "Coastal",
			rating: 4.3,
			priceRange: "₹₹",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Barbecue_Seafood_Platter_-_Sterling_Holidays_Bardez_-_North_Goa_-_20180913_152240.jpg/1280px-Barbecue_Seafood_Platter_-_Sterling_Holidays_Bardez_-_North_Goa_-_20180913_152240.jpg",
			description: "Pomfret, crab and prawn curry beside the fishing jetty."
		}],
		events: [{
			id: "daman-diu-e1",
			name: "Diu Festival",
			location: "Diu",
			stateId: "daman-diu",
			date: "Dec 20–31",
			month: "December",
			category: "Beach Carnival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Clean_coast_between_Ghoghla_and_Khodighar_Beach%2C_Diu-20-_29.06.2021.jpg/1280px-Clean_coast_between_Ghoghla_and_Khodighar_Beach%2C_Diu-20-_29.06.2021.jpg",
			description: "Ten nights of concerts, food and fireworks on Ghoghla beach."
		}, {
			id: "daman-diu-e2",
			name: "Daman Beach Fest",
			location: "Devka, Daman",
			stateId: "daman-diu",
			date: "Jan 10–12",
			month: "January",
			category: "Beach Festival",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Daman_01012012_155.JPG/1280px-Daman_01012012_155.JPG",
			description: "Sand sculpture, seafood stalls and Konkani music."
		}]
	}
];
var famousPlaces = states.flatMap((s) => s.places);
var allDances = states.flatMap((s) => s.dances.map((d) => ({
	...d,
	stateId: s.id,
	stateName: s.name
})));
var allMusic = states.flatMap((s) => s.music.map((m) => ({
	...m,
	stateId: s.id,
	stateName: s.name
})));
var allFoods = states.flatMap((s) => s.foods.map((f) => ({
	...f,
	stateId: s.id,
	stateName: s.name
})));
var allTraditions = states.flatMap((s) => s.traditions.map((t) => ({
	...t,
	stateId: s.id,
	stateName: s.name
})));
states.flatMap((s) => s.artForms.map((a) => ({
	...a,
	stateId: s.id,
	stateName: s.name
})));
var allEvents = states.flatMap((s) => s.events);
var allRestaurants = states.flatMap((s) => s.restaurants);
var reels = [];
var preservationItems = [
	{
		id: "p1",
		title: "Manjusha Art",
		state: "Bihar",
		category: "Folk Art",
		description: "A 300-year-old scroll painting tradition nearly lost, now being revived by a handful of artists in Bhagalpur.",
		status: "Reviving",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Thiksey_Monastery%2C_Ladakh_14.jpg/1280px-Thiksey_Monastery%2C_Ladakh_14.jpg"
	},
	{
		id: "p2",
		title: "Ravanahatha",
		state: "Rajasthan",
		category: "Instrument",
		description: "A 5,000-year-old bowed string instrument, ancestor of the violin, kept alive by a few Langa musicians.",
		status: "Declining",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg/1280px-Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg"
	},
	{
		id: "p3",
		title: "Pattachitra Scroll Singing",
		state: "Odisha",
		category: "Performance",
		description: "Patua painters who sing the stories depicted in their scrolls — an oral tradition fading with each generation.",
		status: "Endangered",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Thiksey_Monastery%2C_Ladakh_15.jpg/1280px-Thiksey_Monastery%2C_Ladakh_15.jpg"
	},
	{
		id: "p4",
		title: "Toda Embroidery",
		state: "Tamil Nadu",
		category: "Textile",
		description: "Intricate red-and-black embroidery by the Toda tribe of the Nilgiris, practiced by fewer than 1,000 people.",
		status: "Endangered",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Ladakh_International_Music_Festival_2022.jpg"
	},
	{
		id: "p5",
		title: "Baul Music",
		state: "West Bengal",
		category: "Music",
		description: "UNESCO-recognized mystic minstrel tradition of wandering Baul singers, struggling with modern livelihoods.",
		status: "Declining",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Ladakh_International_Music_Festival_2022.jpg"
	},
	{
		id: "p6",
		title: "Kathputli Puppetry",
		state: "Rajasthan",
		category: "Performance",
		description: "String puppetry tradition kept by the Bhat community, now competing with digital entertainment.",
		status: "Declining",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Ladakh_International_Music_Festival_2022.jpg"
	}
];
var getStateById = (id) => states.find((s) => s.id === id);
var getStateName = (id) => getStateById(id)?.name ?? id;
var NAV_ITEMS = [
	{
		id: "home",
		label: "Home"
	},
	{
		id: "explore",
		label: "Explore India"
	},
	{
		id: "culture",
		label: "Culture"
	},
	{
		id: "food",
		label: "Food"
	},
	{
		id: "reels",
		label: "Reels"
	},
	{
		id: "events",
		label: "Events"
	},
	{
		id: "trips",
		label: "My Trips"
	}
];
function Navbar({ onNavigate, onOpenSearch, onOpenUpload }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const { points, profile } = useApp();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 30);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.header, {
		initial: {
			y: -80,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			duration: .5,
			ease: "easeOut"
		},
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass card-shadow" : "bg-transparent"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onNavigate("home"),
					className: "flex items-center gap-2.5 transition-transform hover:scale-105",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-saffron",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-devanagari text-xl font-bold text-white",
							children: "ध"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-peacock-400 ring-2 ring-cream-100" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-lg font-extrabold leading-none tracking-tight ${scrolled ? "text-ink-900" : "text-ink-900"}`,
							children: "DHAROHAR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-medium uppercase tracking-widest text-saffron-600",
							children: "Explore • Experience • Preserve"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onNavigate(item.id),
						className: "rounded-full px-4 py-2 text-sm font-medium text-ink-800 transition-all duration-200 hover:bg-saffron-100/70 hover:text-saffron-700",
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onOpenSearch,
							"aria-label": "Search",
							className: "flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition-all hover:bg-saffron-100/70 active:scale-90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
						}),
						profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-1.5 rounded-full bg-saffron-100/80 px-3 py-1.5 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-saffron-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-saffron-700",
								children: points
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onOpenUpload,
							className: "hidden items-center gap-1.5 rounded-full bg-saffron-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-saffron-500/30 transition-all hover:bg-saffron-600 hover:shadow-lg active:scale-95 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Contribute"]
						}),
						profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onNavigate("profile"),
							"aria-label": "Profile",
							className: "flex h-10 items-center gap-2 rounded-full bg-ink-900 pl-1 pr-1 text-cream-100 transition-all hover:scale-105 active:scale-95 sm:pr-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-full bg-saffron-500 text-sm font-bold text-white",
								children: (profile.full_name || profile.username || "U").charAt(0).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden text-sm font-semibold sm:block",
								children: ["@", profile.username]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth",
							className: "flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-sm font-semibold text-cream-100 transition-all hover:scale-105 active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Sign in"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMobileOpen(true),
							"aria-label": "Menu",
							className: "flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition-all hover:bg-saffron-100/70 lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: () => setMobileOpen(false),
		className: "fixed inset-0 z-[60] bg-ink-900/40 backdrop-blur-sm lg:hidden"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 200
		},
		className: "fixed right-0 top-0 z-[70] flex h-full w-72 flex-col bg-cream-100 p-6 shadow-2xl lg:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl font-extrabold text-ink-900",
					children: "Menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setMobileOpen(false),
					className: "rounded-full p-2 hover:bg-saffron-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1",
				children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						onNavigate(item.id);
						setMobileOpen(false);
					},
					className: "rounded-xl px-4 py-3 text-left text-base font-medium text-ink-800 transition-colors hover:bg-saffron-100",
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						onOpenUpload();
						setMobileOpen(false);
					},
					className: "flex items-center justify-center gap-2 rounded-full bg-saffron-500 px-4 py-3 font-semibold text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" }), " Contribute"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						onNavigate("profile");
						setMobileOpen(false);
					},
					className: "flex items-center justify-center gap-2 rounded-full border-2 border-ink-900/15 px-4 py-3 font-semibold text-ink-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" }), " Profile"]
				})]
			})
		]
	})] }) })] });
}
function SearchOverlay({ open, onClose, onNavigate }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 100);
		else setQuery("");
	}, [open]);
	const q = query.toLowerCase().trim();
	const results = q ? {
		states: states.filter((s) => s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q)).slice(0, 3),
		places: famousPlaces.filter((p) => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)).slice(0, 5),
		dances: allDances.filter((d) => d.name.toLowerCase().includes(q)).slice(0, 3),
		foods: allFoods.filter((f) => f.name.toLowerCase().includes(q) || (f.origin ?? "").toLowerCase().includes(q)).slice(0, 4),
		traditions: allTraditions.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 3)
	} : null;
	const hasResults = results && Object.values(results).some((arr) => arr.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[80] flex items-start justify-center bg-ink-900/50 p-4 pt-24 backdrop-blur-md",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .96,
				y: -10
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .96,
				y: -10
			},
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-2xl overflow-hidden rounded-3xl bg-cream-100 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-saffron-200/50 px-5 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-saffron-500" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search a place, tradition, food, dance or story...",
						className: "flex-1 bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-700/40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-full p-1.5 text-ink-700 hover:bg-saffron-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[60vh] overflow-y-auto scrollbar-thin p-4",
				children: [
					!results && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink-700/60",
							children: "Try searching for \"Taj Mahal\", \"Bhangra\", \"Rajasthan food\", \"Madhubani\"..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap justify-center gap-2",
							children: [
								"Taj Mahal",
								"Bhangra",
								"Kerala festivals",
								"Warli Art",
								"Mysore Palace"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuery(s),
								className: "chip bg-saffron-100 text-saffron-700 hover:bg-saffron-200",
								children: s
							}, s))
						})]
					}),
					results && !hasResults && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-8 text-center text-sm text-ink-700/60",
						children: [
							"No results for \"",
							query,
							"\". Try another search."
						]
					}),
					results && hasResults && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							results.states.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "States",
								items: results.states.map((s) => ({
									id: s.id,
									label: s.name,
									sub: s.tagline,
									icon: Compass
								})),
								onSelect: (id) => {
									onNavigate("state", id);
									onClose();
								}
							}),
							results.places.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Places",
								items: results.places.map((p) => ({
									id: p.id,
									label: p.name,
									sub: `${p.city}, ${p.stateId}`,
									icon: Heart
								})),
								onSelect: (id) => {
									onNavigate("place", id);
									onClose();
								}
							}),
							results.dances.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Dance",
								items: results.dances.map((d) => ({
									id: d.stateId,
									label: d.name,
									sub: d.stateName,
									icon: Sparkles
								})),
								onSelect: (id) => {
									onNavigate("state", id);
									onClose();
								}
							}),
							results.foods.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Food",
								items: results.foods.map((f) => ({
									id: f.stateId,
									label: f.name,
									sub: f.origin ?? "",
									icon: Heart
								})),
								onSelect: (id) => {
									onNavigate("state", id);
									onClose();
								}
							}),
							results.traditions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
								title: "Traditions",
								items: results.traditions.map((t) => ({
									id: t.stateId,
									label: t.name,
									sub: t.stateName,
									icon: Sparkles
								})),
								onSelect: (id) => {
									onNavigate("state", id);
									onClose();
								}
							})
						]
					})
				]
			})]
		})
	}) });
}
function SearchGroup({ title, items, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
		className: "mb-2 px-2 text-xs font-bold uppercase tracking-wider text-saffron-600",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-1",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => onSelect(item.id),
			className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-saffron-100/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 text-saffron-600" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm font-semibold text-ink-900",
					children: item.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-xs text-ink-700/60",
					children: item.sub
				})]
			})]
		}, item.id + item.label))
	})] });
}
var geoStates = [
	{
		"id": "andaman-nicobar",
		"name": "Andaman and Nicobar",
		"path": "M701.8,877.6 L699.6,871.9 L698.1,870.4 L697.3,870.7 L697.1,867.4 L697.9,865.6 L701.1,865.3 L702.3,864.1 L703.3,865.3 L703.5,868.5 L705.1,870.9 L704.2,870.9 L705.0,872.1 L703.7,873.6 L703.8,876.0 L702.4,875.9 L701.8,877.6ZM696.9,864.2 L696.5,860.6 L698.7,860.0 L698.6,858.6 L699.8,860.9 L696.9,864.2ZM691.8,846.8 L690.7,845.8 L688.7,846.2 L689.0,844.9 L688.2,845.4 L687.7,844.5 L688.3,843.0 L690.3,843.0 L690.2,844.0 L691.9,845.2 L691.8,846.8ZM695.0,845.2 L693.0,843.7 L693.7,842.6 L695.1,843.5 L695.0,845.2ZM692.9,843.3 L692.4,842.0 L693.7,841.1 L692.4,841.8 L691.6,838.5 L693.4,836.8 L694.1,837.8 L692.9,839.2 L694.3,841.4 L692.9,843.3ZM684.3,837.9 L681.6,835.8 L682.1,833.6 L683.1,833.7 L682.6,835.6 L684.8,837.3 L684.3,837.9ZM673.4,812.3 L671.4,811.4 L671.5,809.6 L672.8,809.6 L673.0,808.5 L674.3,810.2 L675.2,810.0 L673.4,812.3ZM665.6,773.6 L664.2,772.7 L662.2,772.9 L663.3,770.7 L662.2,769.3 L662.1,766.1 L662.7,766.7 L665.9,762.8 L667.1,763.8 L668.2,768.4 L666.6,770.8 L667.3,771.8 L665.6,773.6ZM668.5,750.4 L667.7,749.7 L668.9,748.6 L669.2,745.6 L670.6,747.8 L669.6,748.6 L670.8,749.2 L668.5,750.4ZM658.9,745.6 L657.7,745.2 L657.7,743.4 L659.2,743.7 L658.9,745.6ZM680.2,735.4 L677.1,732.2 L678.2,730.7 L679.4,731.5 L680.2,735.4ZM680.4,730.8 L678.0,727.9 L679.3,728.9 L679.9,727.4 L680.4,730.8ZM681.2,729.7 L680.2,728.3 L681.0,726.1 L681.8,728.1 L681.2,729.7ZM671.3,746.7 L669.5,745.4 L669.5,744.0 L668.7,744.3 L668.4,742.7 L669.4,742.2 L668.4,742.3 L667.9,740.0 L667.2,740.6 L666.7,736.7 L665.8,736.3 L667.2,733.6 L668.5,735.7 L668.9,729.2 L670.9,725.4 L671.0,727.4 L672.5,727.1 L671.9,730.2 L673.2,730.8 L672.6,731.5 L672.0,730.9 L672.8,732.1 L671.7,732.2 L671.6,736.2 L670.4,737.1 L671.4,737.0 L672.2,734.0 L673.3,733.9 L673.4,734.8 L672.5,740.4 L671.0,740.3 L671.2,741.3 L670.0,741.7 L670.8,742.6 L671.5,740.8 L672.5,741.4 L671.3,746.7ZM672.7,730.3 L672.0,729.7 L672.9,726.5 L672.3,724.4 L673.2,724.1 L672.9,723.3 L675.5,723.5 L675.9,726.5 L675.0,726.5 L675.1,727.7 L674.3,727.4 L672.7,730.3ZM703.0,725.5 L702.8,724.6 L702.4,725.5 L702.5,724.5 L701.8,725.2 L701.5,724.5 L701.7,723.5 L702.4,724.0 L702.1,723.1 L703.2,724.2 L703.0,725.5ZM672.4,723.8 L670.9,722.9 L671.2,715.3 L670.5,715.0 L672.4,713.3 L673.3,714.7 L673.3,712.3 L671.8,713.2 L671.6,708.9 L672.0,709.4 L672.6,708.0 L673.2,709.4 L673.5,707.1 L675.7,707.4 L676.4,706.1 L678.6,712.2 L678.3,718.2 L677.3,718.6 L678.0,719.0 L676.8,720.7 L674.6,718.2 L676.4,720.4 L673.6,719.8 L673.5,718.9 L676.3,723.0 L672.4,723.8ZM670.1,710.1 L669.9,707.4 L669.0,707.3 L670.0,707.4 L670.1,706.5 L669.2,706.3 L670.1,706.3 L670.8,704.3 L671.5,707.2 L670.1,710.1ZM674.9,707.5 L673.5,706.4 L674.4,703.7 L673.4,703.5 L674.0,700.5 L675.0,700.1 L673.9,699.7 L675.2,696.8 L674.3,696.2 L675.5,693.2 L674.9,692.7 L676.0,691.9 L675.6,690.8 L677.2,689.9 L676.9,688.9 L678.9,689.2 L678.8,687.9 L679.4,688.8 L679.9,687.7 L679.7,691.9 L681.1,692.6 L679.9,693.5 L680.7,693.3 L681.6,694.6 L681.0,695.5 L680.3,693.7 L678.8,694.8 L678.3,693.9 L677.8,694.4 L679.4,695.0 L679.5,696.3 L681.0,696.4 L680.1,701.8 L678.5,703.7 L677.4,701.7 L676.3,702.4 L677.5,704.8 L676.8,705.5 L675.9,704.5 L675.2,706.1 L675.7,707.3 L674.9,707.5Z",
		"labelX": 674.6,
		"labelY": 714.9
	},
	{
		"id": "telangana",
		"name": "Telangana",
		"path": "M271.6,624.1 L269.6,622.0 L268.7,623.2 L265.5,622.2 L263.1,623.0 L255.2,621.5 L254.6,612.1 L257.4,611.0 L257.4,609.6 L254.8,608.5 L250.6,608.4 L247.7,605.9 L251.3,605.4 L252.6,604.4 L251.9,603.1 L253.9,602.5 L254.1,600.8 L252.6,600.3 L254.0,599.9 L254.0,598.9 L252.8,598.8 L253.2,596.9 L254.1,597.0 L253.6,593.3 L254.9,590.5 L253.9,587.7 L251.1,586.0 L251.6,584.4 L253.7,582.8 L253.6,580.0 L255.7,580.0 L255.2,578.4 L257.9,577.9 L259.1,576.2 L259.0,576.9 L260.0,576.6 L257.4,575.4 L257.4,574.5 L255.7,574.2 L255.0,575.2 L253.3,574.0 L253.6,570.8 L256.6,569.2 L255.2,567.7 L259.1,562.8 L256.2,560.4 L257.6,559.5 L256.7,556.2 L257.7,554.0 L256.3,553.6 L256.8,552.8 L255.5,551.9 L256.4,549.9 L255.7,549.3 L257.3,549.1 L256.2,548.6 L257.7,548.3 L257.6,546.2 L259.0,546.0 L259.2,546.8 L261.4,546.0 L261.2,542.8 L262.0,541.6 L262.8,542.2 L264.2,538.7 L267.0,538.2 L265.4,535.7 L264.2,535.7 L264.6,534.5 L262.2,533.6 L262.0,532.3 L262.1,531.3 L263.1,531.6 L263.2,530.1 L264.4,530.5 L264.4,527.4 L265.0,525.7 L266.0,525.4 L264.8,524.3 L267.2,523.2 L270.0,526.1 L273.3,526.3 L273.6,521.2 L277.1,519.9 L276.2,516.9 L277.1,515.6 L276.0,513.9 L278.1,512.4 L278.6,510.8 L277.9,508.7 L276.7,508.4 L277.6,506.5 L279.5,508.8 L282.1,510.1 L283.0,509.3 L285.1,509.4 L288.2,510.9 L291.7,511.1 L292.1,514.1 L295.1,514.3 L294.7,517.1 L298.8,517.8 L300.8,519.7 L302.1,519.5 L302.6,515.3 L308.8,518.7 L310.8,517.2 L312.3,518.5 L313.5,516.4 L317.5,515.9 L322.6,521.5 L321.2,526.5 L321.8,528.2 L319.5,530.1 L319.5,532.1 L321.0,531.7 L321.6,532.5 L321.7,537.2 L320.4,538.0 L320.9,538.7 L323.7,539.8 L326.4,542.5 L330.7,541.3 L332.7,545.1 L336.6,543.9 L340.7,547.0 L343.2,550.2 L343.7,553.3 L344.9,554.6 L343.4,555.7 L343.4,557.0 L345.2,557.2 L346.1,555.2 L347.1,556.0 L346.9,558.1 L350.0,557.1 L349.2,559.6 L351.6,568.0 L352.7,568.1 L355.1,566.2 L357.9,567.4 L363.5,567.0 L364.0,567.6 L367.4,567.3 L368.9,565.5 L370.0,566.0 L371.5,565.0 L372.5,566.4 L366.5,569.8 L364.5,573.8 L365.0,574.3 L364.2,577.8 L362.6,579.9 L361.3,580.5 L359.6,579.5 L358.0,581.5 L355.7,581.4 L355.2,584.0 L351.4,585.3 L348.1,584.9 L348.3,586.5 L347.2,586.5 L346.1,589.9 L343.2,588.8 L340.9,589.1 L341.3,588.1 L338.7,586.7 L336.9,587.6 L335.6,590.2 L334.2,588.4 L333.6,588.9 L334.0,590.5 L333.1,591.5 L336.7,593.0 L336.8,592.1 L339.3,592.8 L338.5,595.7 L339.9,596.7 L338.7,597.4 L335.8,596.7 L334.3,595.0 L333.6,596.1 L330.5,590.4 L328.9,590.3 L328.3,589.4 L327.0,591.1 L324.6,591.7 L323.6,593.3 L323.1,594.6 L325.3,596.0 L321.8,601.2 L317.2,598.4 L307.6,602.6 L303.3,603.2 L302.1,604.7 L301.7,612.6 L296.8,612.2 L294.4,613.2 L293.5,613.8 L293.5,616.2 L291.5,614.7 L291.5,616.7 L289.8,618.5 L288.1,618.4 L285.5,616.4 L283.9,617.6 L280.1,616.8 L275.6,618.3 L275.1,621.2 L271.6,624.1Z",
		"labelX": 310.1,
		"labelY": 565.3
	},
	{
		"id": "andhra-pradesh",
		"name": "Andhra Pradesh",
		"path": "M386.6,602.0 L385.2,599.5 L387.1,598.5 L387.3,599.5 L388.1,598.5 L386.6,602.0ZM278.7,714.9 L275.8,712.7 L273.8,713.0 L274.9,711.9 L275.2,708.3 L276.9,708.3 L278.1,706.1 L279.0,707.0 L280.5,706.8 L281.0,708.2 L280.2,704.9 L281.1,705.1 L281.0,703.1 L282.4,702.5 L282.5,700.7 L284.2,699.6 L283.4,698.8 L284.4,696.7 L283.8,695.6 L282.9,696.8 L281.5,695.4 L278.6,695.0 L279.5,694.7 L278.3,694.1 L279.3,687.8 L274.8,687.5 L273.6,688.4 L273.9,686.7 L272.9,685.8 L270.8,686.2 L270.2,685.3 L271.5,684.8 L271.5,680.0 L269.7,679.1 L269.6,680.0 L268.2,679.8 L267.1,681.0 L268.0,677.4 L266.2,678.8 L265.5,677.8 L263.6,677.7 L263.9,679.8 L260.7,681.8 L260.6,683.4 L259.0,682.2 L257.9,682.8 L258.4,683.5 L256.5,683.9 L255.5,683.1 L255.5,684.7 L254.6,684.1 L253.5,685.0 L253.8,681.6 L252.4,681.5 L252.9,680.5 L248.1,680.4 L247.6,678.8 L246.1,679.8 L246.1,678.2 L245.7,679.9 L244.6,680.1 L245.7,680.9 L245.8,682.8 L242.9,683.2 L242.0,682.3 L241.0,683.1 L240.4,681.1 L242.2,678.0 L239.3,675.2 L240.5,674.0 L239.2,672.3 L238.1,672.2 L238.3,671.4 L239.6,670.5 L241.8,671.0 L241.9,674.4 L244.5,674.7 L245.3,676.1 L249.8,675.2 L250.9,676.4 L250.8,678.8 L252.0,679.3 L252.9,678.6 L253.0,676.8 L251.5,676.8 L251.7,675.7 L250.2,675.2 L252.1,673.0 L250.7,673.2 L250.8,672.4 L251.9,671.2 L255.2,671.0 L254.8,668.2 L252.0,666.6 L251.5,667.6 L252.6,669.9 L251.9,670.5 L251.1,668.3 L248.9,668.1 L248.9,666.5 L244.9,666.5 L243.8,670.0 L242.6,669.1 L239.7,669.2 L239.2,668.2 L239.9,667.6 L237.9,666.1 L238.0,664.9 L239.6,664.6 L240.5,662.4 L237.7,662.7 L234.7,659.0 L235.7,655.1 L235.2,653.9 L237.1,653.2 L237.6,649.4 L237.5,648.6 L234.8,648.5 L235.1,645.6 L235.7,645.0 L237.9,646.8 L242.5,646.8 L243.4,647.6 L245.4,644.2 L244.8,643.6 L245.6,642.1 L244.5,641.3 L245.7,640.3 L244.2,638.3 L242.9,638.5 L242.0,635.3 L240.4,633.7 L242.0,633.4 L242.0,629.6 L244.5,629.5 L242.4,626.8 L243.0,624.2 L241.8,624.0 L243.0,622.1 L248.0,620.4 L263.1,623.0 L265.5,622.2 L268.7,623.2 L269.6,622.0 L271.6,624.1 L275.1,621.2 L275.6,618.3 L279.7,616.9 L283.9,617.6 L285.5,616.4 L288.1,618.4 L289.8,618.5 L291.5,616.7 L291.5,614.7 L293.5,616.2 L293.9,613.4 L296.8,612.2 L300.8,613.0 L302.0,612.4 L302.1,604.7 L303.3,603.2 L307.6,602.6 L317.2,598.4 L318.2,599.5 L319.6,599.3 L320.7,601.0 L322.2,600.9 L325.3,596.0 L323.1,594.6 L323.6,593.3 L324.6,591.7 L327.0,591.1 L328.3,589.4 L328.9,590.3 L330.5,590.4 L333.6,596.1 L334.3,595.0 L335.8,596.7 L338.7,597.4 L339.9,596.7 L338.5,595.7 L339.3,592.8 L336.8,592.1 L336.7,593.0 L333.1,591.5 L334.0,590.3 L333.4,589.0 L334.2,588.4 L335.6,590.2 L336.9,587.6 L338.7,586.7 L341.3,588.1 L340.9,589.1 L343.2,588.8 L346.1,589.9 L347.2,586.5 L348.3,586.5 L348.1,584.9 L350.5,585.5 L355.2,584.0 L355.7,581.4 L358.0,581.5 L359.6,579.5 L362.1,580.3 L364.2,577.8 L365.0,574.3 L364.5,573.8 L366.5,569.8 L372.1,566.8 L371.5,565.0 L372.6,563.8 L376.8,562.2 L378.8,560.3 L382.5,560.7 L384.7,562.5 L385.4,560.6 L387.3,560.6 L387.2,557.9 L388.1,557.9 L386.5,556.3 L388.8,553.1 L387.2,552.8 L388.6,551.3 L388.0,550.2 L391.1,546.5 L393.2,549.4 L392.7,550.7 L394.5,551.3 L394.0,554.2 L395.4,555.4 L396.1,553.7 L399.1,552.4 L400.0,549.3 L402.3,550.1 L402.8,551.7 L407.0,551.1 L407.1,549.6 L405.9,549.2 L407.9,546.5 L406.3,546.2 L406.9,545.1 L405.7,545.0 L405.7,543.6 L409.1,539.7 L411.1,541.3 L411.5,539.9 L412.7,540.1 L413.1,539.2 L416.3,538.0 L416.7,537.2 L414.9,535.2 L415.9,535.3 L414.9,534.3 L414.5,535.5 L413.8,533.4 L416.6,533.2 L417.9,534.7 L418.0,531.1 L419.3,531.2 L419.0,532.8 L420.0,532.9 L420.4,531.0 L421.3,531.7 L422.5,528.7 L425.3,532.8 L424.8,533.5 L425.9,535.5 L426.8,535.8 L425.7,533.7 L427.0,532.9 L429.3,538.4 L433.6,538.8 L435.1,540.5 L438.8,539.3 L441.4,539.5 L442.2,538.5 L442.0,537.0 L442.7,537.4 L442.4,536.5 L443.4,536.6 L442.8,536.1 L444.6,535.6 L444.2,532.7 L445.7,533.6 L448.3,531.2 L449.0,532.7 L451.0,531.2 L449.0,529.5 L452.1,528.8 L451.9,530.0 L453.7,531.0 L453.2,531.7 L442.6,545.9 L436.3,551.8 L436.2,553.1 L421.1,561.4 L419.9,563.4 L418.0,564.2 L414.9,569.9 L413.8,570.9 L412.7,570.3 L413.5,571.3 L411.3,573.7 L394.7,582.2 L388.2,587.3 L384.9,592.7 L386.6,595.2 L387.8,594.9 L387.9,592.3 L387.0,591.0 L387.9,591.7 L387.5,598.2 L384.3,598.8 L384.0,597.8 L382.9,598.5 L385.2,599.5 L386.1,601.8 L385.2,602.5 L386.3,602.3 L385.4,603.1 L386.6,603.0 L370.4,610.4 L365.5,609.0 L360.7,609.0 L360.2,609.8 L361.5,609.5 L357.0,612.5 L354.7,620.0 L350.8,623.8 L350.9,626.1 L349.2,627.2 L345.8,627.4 L344.7,625.5 L345.7,626.6 L345.4,623.7 L342.1,622.5 L335.1,624.7 L330.7,628.5 L328.8,634.4 L325.5,638.7 L324.7,645.4 L325.8,652.9 L325.0,652.7 L325.9,653.0 L328.8,659.3 L326.7,672.6 L330.0,681.0 L329.8,686.0 L332.0,691.8 L327.4,683.7 L327.1,686.8 L326.3,684.1 L324.7,687.5 L326.5,689.8 L330.5,690.7 L330.7,692.3 L331.9,692.0 L332.0,693.6 L329.6,690.6 L323.6,689.1 L323.1,689.7 L324.3,690.4 L322.3,691.3 L321.3,694.6 L315.7,696.4 L317.5,697.8 L316.3,698.6 L315.8,697.8 L314.8,698.2 L314.3,696.1 L311.9,697.1 L310.6,695.3 L307.7,694.9 L306.2,695.5 L307.6,696.1 L307.6,698.8 L305.5,699.5 L305.7,700.4 L304.4,701.3 L303.3,700.1 L301.9,700.2 L300.2,703.8 L297.9,703.6 L295.4,701.9 L293.6,702.1 L293.1,703.0 L293.9,703.5 L292.7,703.5 L292.6,701.6 L287.8,702.5 L287.6,703.9 L286.4,703.5 L285.4,704.6 L286.3,706.3 L283.5,711.2 L283.6,712.9 L281.9,711.5 L282.6,712.5 L281.1,713.5 L281.1,714.9 L278.7,714.9Z",
		"labelX": 344.2,
		"labelY": 621.8
	},
	{
		"id": "arunachal-pradesh",
		"name": "Arunachal Pradesh",
		"path": "M742.2,305.5 L740.4,304.6 L739.8,303.1 L740.6,301.5 L738.9,299.1 L740.3,298.3 L739.2,293.6 L740.7,294.0 L743.4,291.7 L746.4,290.8 L746.5,288.4 L748.0,286.7 L750.0,287.9 L756.0,286.0 L758.4,286.9 L761.8,283.5 L760.7,281.6 L759.0,281.3 L758.3,282.5 L758.2,281.3 L757.1,281.7 L758.0,277.9 L755.4,275.8 L755.7,273.8 L754.6,272.4 L760.6,265.1 L750.5,265.4 L748.0,267.8 L744.4,269.0 L742.6,268.1 L730.1,272.2 L729.5,273.3 L725.4,274.4 L719.1,277.8 L718.3,276.4 L716.6,277.2 L714.1,276.7 L713.4,275.2 L712.3,276.2 L713.6,278.9 L710.8,280.3 L705.3,285.9 L701.0,290.8 L702.0,292.7 L700.3,293.1 L697.7,295.9 L679.7,297.5 L675.7,294.7 L669.8,293.8 L669.5,295.4 L667.8,296.1 L664.4,296.1 L662.7,297.2 L657.1,298.3 L654.7,298.2 L654.6,294.7 L652.5,292.6 L652.5,289.7 L653.7,288.1 L652.9,286.8 L655.1,286.1 L653.4,284.9 L652.3,280.2 L650.1,280.8 L644.1,280.5 L643.3,279.5 L642.1,280.0 L639.9,277.3 L639.7,275.5 L641.9,271.4 L639.3,268.6 L642.5,268.5 L643.8,269.9 L647.0,270.0 L648.0,272.3 L649.6,272.9 L651.3,271.2 L653.3,271.6 L657.5,268.5 L659.0,268.5 L660.4,271.0 L662.9,269.6 L664.2,270.2 L665.5,269.0 L667.1,269.7 L672.0,264.4 L669.9,262.2 L670.6,260.2 L673.7,257.8 L674.4,258.8 L676.3,257.8 L678.2,256.0 L679.2,256.9 L680.1,255.9 L679.8,254.7 L685.1,253.7 L685.5,251.7 L684.2,250.4 L686.7,248.4 L688.4,244.2 L691.4,243.1 L692.1,243.8 L692.6,242.8 L693.8,243.6 L699.2,242.7 L700.4,243.3 L702.3,242.1 L704.5,243.2 L706.6,240.0 L706.4,237.9 L710.8,234.4 L712.4,230.3 L714.4,228.3 L716.3,228.2 L718.3,225.9 L721.8,225.8 L723.7,222.0 L727.8,225.4 L728.4,227.8 L730.4,227.2 L734.5,228.9 L733.8,227.5 L737.2,229.3 L740.8,229.5 L741.2,231.2 L746.1,231.8 L747.5,228.6 L748.9,228.9 L748.6,226.3 L749.9,226.1 L750.3,224.8 L751.4,225.1 L755.2,221.8 L755.7,222.4 L758.0,220.7 L760.1,221.0 L763.7,218.5 L767.9,225.6 L771.2,224.0 L772.0,224.9 L770.7,227.6 L768.4,227.9 L766.3,230.0 L764.4,230.5 L766.3,233.3 L765.2,234.9 L765.8,235.9 L770.8,232.0 L775.6,230.5 L774.3,233.2 L774.6,234.0 L775.5,233.9 L776.0,236.6 L778.1,239.9 L777.3,241.7 L774.2,242.7 L774.8,244.3 L770.2,247.5 L771.5,249.0 L768.5,251.3 L771.4,251.9 L772.2,253.4 L773.8,251.1 L779.3,249.6 L781.8,251.0 L782.7,252.6 L785.9,252.1 L788.5,254.3 L790.1,253.0 L792.1,253.0 L793.4,254.8 L796.4,255.5 L799.6,257.9 L797.7,259.1 L797.1,261.7 L798.9,261.9 L800.0,263.4 L799.0,264.5 L799.3,267.3 L797.4,267.5 L797.1,266.3 L795.7,266.9 L791.4,270.5 L791.3,271.9 L789.4,271.9 L785.8,275.8 L786.9,278.6 L786.2,280.7 L793.2,290.2 L792.6,291.8 L785.2,289.0 L785.5,286.7 L783.2,284.1 L780.8,283.3 L778.0,283.6 L775.6,285.9 L774.2,285.4 L767.7,286.2 L762.3,288.9 L759.5,293.3 L756.0,294.3 L753.9,298.4 L752.2,297.8 L750.6,300.5 L748.5,300.1 L745.6,304.2 L742.2,305.5Z",
		"labelX": 719.7,
		"labelY": 262
	},
	{
		"id": "assam",
		"name": "Assam",
		"path": "M664.5,381.9 L663.3,380.1 L663.3,378.4 L657.6,378.5 L659.2,374.6 L658.1,372.1 L658.2,369.1 L659.9,363.8 L658.4,358.9 L660.0,358.3 L662.5,360.4 L665.2,359.7 L665.2,357.3 L664.3,357.5 L664.7,357.0 L663.4,356.0 L665.0,352.6 L666.6,352.9 L666.1,351.6 L668.9,352.3 L670.0,350.5 L673.8,349.2 L672.7,348.3 L673.3,345.8 L669.7,342.7 L668.5,343.3 L668.2,341.6 L667.3,341.7 L669.4,339.6 L669.7,337.9 L667.5,338.9 L667.0,337.3 L665.5,337.0 L663.6,334.9 L663.6,333.7 L662.3,333.0 L656.2,335.5 L656.0,331.2 L658.0,328.4 L656.3,328.2 L656.1,327.2 L660.0,323.2 L656.7,323.1 L649.7,325.6 L648.2,324.0 L648.4,322.6 L646.8,321.9 L644.4,323.7 L644.1,326.9 L642.7,328.4 L641.1,327.4 L641.7,324.9 L640.2,324.5 L638.1,328.0 L639.0,327.9 L637.4,329.3 L638.8,329.4 L633.5,330.5 L632.0,333.2 L630.5,334.0 L629.3,332.4 L629.8,329.8 L624.4,331.0 L625.2,329.0 L623.5,329.0 L622.8,327.1 L622.2,328.2 L621.2,327.0 L619.2,327.0 L618.3,328.3 L617.3,328.1 L617.5,326.9 L615.8,327.0 L614.1,328.6 L614.3,327.5 L613.0,326.8 L611.1,328.7 L611.7,326.8 L610.1,325.1 L608.8,325.9 L607.0,325.2 L605.9,326.3 L602.0,327.2 L600.3,326.7 L597.2,329.2 L597.3,330.2 L595.5,330.9 L595.8,332.4 L594.1,333.6 L597.5,337.6 L593.5,339.4 L593.9,336.8 L592.0,331.1 L594.0,327.4 L592.3,327.3 L593.6,326.3 L592.7,325.2 L592.2,326.0 L591.9,324.3 L591.3,325.0 L591.3,322.4 L588.7,319.8 L589.7,319.1 L588.8,318.9 L589.6,318.3 L589.0,317.3 L589.9,317.3 L589.3,316.2 L590.4,316.7 L591.1,314.8 L593.1,313.8 L592.3,313.5 L593.5,311.9 L593.3,303.0 L600.5,302.7 L602.2,302.0 L602.9,299.5 L605.3,299.6 L608.3,298.0 L612.4,301.1 L616.2,302.1 L625.9,301.7 L627.1,300.5 L633.6,301.7 L635.6,300.0 L637.9,301.4 L641.5,300.5 L643.2,300.9 L646.4,299.5 L647.9,297.6 L653.3,299.6 L654.7,298.2 L667.8,296.1 L669.5,295.4 L669.8,293.8 L675.7,294.7 L679.7,297.5 L688.7,296.1 L692.6,296.9 L697.1,296.0 L700.3,293.1 L702.0,292.7 L701.3,290.3 L710.8,280.3 L713.6,278.9 L712.3,276.2 L713.4,275.2 L714.1,276.7 L716.6,277.2 L718.3,276.4 L719.1,277.8 L725.4,274.4 L729.5,273.3 L730.1,272.2 L742.6,268.1 L744.4,269.0 L748.0,267.8 L750.5,265.4 L760.6,265.1 L754.6,272.4 L755.7,273.8 L755.4,275.8 L758.0,277.9 L757.1,281.7 L758.2,281.3 L758.3,282.5 L759.0,281.3 L760.7,281.6 L761.8,283.6 L758.4,286.9 L756.0,286.0 L750.0,287.9 L747.9,286.8 L746.5,288.4 L746.4,290.8 L743.4,291.7 L740.7,294.0 L739.3,293.6 L734.5,297.3 L731.0,296.9 L727.2,302.0 L719.3,305.1 L719.2,306.1 L717.7,306.8 L717.5,309.3 L715.2,311.4 L714.1,308.5 L711.6,311.5 L711.3,315.1 L709.5,315.6 L706.7,320.3 L705.3,325.3 L706.0,328.0 L700.9,331.2 L700.3,326.6 L698.0,328.3 L698.5,330.2 L688.2,339.3 L690.0,341.8 L691.8,342.7 L692.1,346.5 L689.8,348.4 L688.3,353.0 L686.0,355.3 L686.3,357.3 L684.6,361.6 L683.3,362.2 L682.2,361.6 L681.2,364.6 L682.0,365.7 L681.2,368.0 L682.1,368.4 L680.8,368.7 L680.2,373.6 L676.7,373.6 L674.5,374.6 L672.7,370.3 L670.7,375.3 L668.9,376.0 L668.5,378.4 L666.9,378.6 L666.3,380.7 L664.5,381.9Z",
		"labelX": 675.2,
		"labelY": 323.5
	},
	{
		"id": "bihar",
		"name": "Bihar",
		"path": "M446.3,377.3 L440.9,372.4 L441.8,370.9 L440.8,369.0 L439.9,370.0 L438.0,369.3 L437.7,370.6 L436.8,369.7 L435.8,371.5 L434.1,367.6 L432.6,366.8 L431.0,369.4 L429.2,370.0 L425.1,370.8 L419.1,370.1 L420.3,367.1 L419.1,366.4 L418.6,363.8 L416.0,362.4 L414.9,355.6 L414.1,355.1 L415.2,352.1 L415.0,349.9 L420.2,346.3 L422.5,345.9 L424.5,343.9 L426.3,344.1 L428.4,342.7 L427.6,341.8 L428.8,341.5 L430.6,339.0 L434.9,336.6 L435.4,334.1 L436.9,333.7 L438.4,335.6 L440.6,335.8 L441.5,335.5 L441.9,333.3 L443.2,333.2 L443.8,334.7 L445.1,334.2 L446.2,335.3 L447.2,335.2 L447.5,333.9 L447.9,335.2 L448.0,333.6 L450.1,333.8 L449.3,332.8 L449.8,331.8 L447.2,330.6 L447.3,329.3 L444.4,328.8 L442.4,326.8 L440.9,327.2 L438.3,325.5 L437.4,325.8 L437.4,324.8 L434.2,322.5 L432.9,320.1 L433.1,318.2 L435.0,318.8 L435.9,317.6 L437.2,318.1 L437.5,314.1 L434.8,313.8 L433.1,311.9 L430.2,311.8 L430.1,309.7 L431.8,310.0 L434.1,309.0 L435.1,305.9 L440.3,307.3 L444.2,306.4 L443.8,305.1 L441.7,304.7 L441.0,302.5 L439.2,303.0 L439.4,299.2 L437.4,300.0 L436.4,299.4 L436.7,298.4 L434.2,298.3 L433.5,296.7 L433.9,293.6 L432.6,292.9 L433.4,292.0 L431.2,292.1 L432.4,289.4 L430.0,287.0 L430.7,285.2 L428.1,285.0 L430.2,283.4 L429.3,281.8 L433.6,281.6 L435.6,279.1 L436.9,279.0 L438.6,281.4 L439.8,281.1 L440.9,283.1 L449.8,284.6 L451.8,288.4 L450.5,293.5 L454.6,295.1 L455.6,294.4 L457.3,295.9 L459.2,296.2 L459.4,297.5 L461.9,298.4 L460.9,299.4 L465.6,299.1 L465.1,300.7 L466.1,302.4 L469.4,302.9 L477.6,298.9 L480.4,301.2 L480.3,305.6 L483.6,306.9 L483.5,308.2 L488.4,305.2 L493.6,307.6 L496.6,306.6 L502.5,309.1 L507.6,312.7 L508.6,311.6 L510.4,312.2 L512.1,311.5 L513.2,309.8 L515.4,309.3 L517.0,307.7 L517.5,311.8 L519.5,313.2 L522.0,313.0 L522.3,314.2 L524.3,315.0 L525.1,313.1 L527.8,312.1 L531.6,313.9 L533.6,312.3 L536.0,313.0 L536.6,311.2 L538.2,312.2 L539.3,310.7 L540.4,312.8 L543.2,314.4 L545.0,312.2 L545.2,309.2 L546.3,310.0 L548.6,308.7 L547.2,310.6 L549.6,312.7 L548.6,313.7 L549.8,314.0 L550.0,315.3 L542.7,321.3 L541.3,320.9 L541.5,323.0 L540.4,323.5 L539.9,322.8 L538.0,324.2 L536.9,328.0 L537.5,329.5 L539.9,330.1 L539.1,330.8 L539.9,331.2 L539.5,332.6 L543.6,335.0 L542.9,338.1 L544.2,341.3 L540.3,339.6 L539.0,340.3 L538.6,341.8 L536.3,342.4 L535.7,343.6 L536.4,345.8 L538.3,347.1 L537.8,349.9 L530.8,345.3 L529.7,347.4 L528.1,347.0 L527.9,350.0 L523.8,349.1 L522.9,353.2 L520.7,353.2 L519.0,355.1 L519.3,359.3 L517.1,361.2 L516.3,367.7 L513.0,366.6 L512.5,369.8 L509.5,369.0 L508.8,367.3 L505.9,369.1 L504.1,367.8 L501.4,370.4 L499.8,374.9 L495.2,372.1 L496.4,368.4 L491.2,367.8 L491.0,364.8 L489.9,363.5 L488.6,363.7 L488.9,362.5 L486.2,364.0 L484.2,361.9 L480.4,361.2 L479.3,364.5 L478.0,365.3 L478.4,368.5 L476.0,367.8 L474.4,370.2 L473.5,369.4 L467.9,370.1 L467.9,371.0 L464.3,372.1 L464.8,373.1 L462.6,374.6 L462.3,372.8 L459.3,374.7 L457.4,374.8 L456.9,372.1 L455.7,372.4 L455.6,370.6 L454.6,370.1 L451.4,372.3 L450.8,374.1 L448.5,373.6 L447.1,374.7 L446.3,377.3Z",
		"labelX": 482,
		"labelY": 328.2
	},
	{
		"id": "chandigarh",
		"name": "Chandigarh",
		"path": "M235.6,180.3 L232.8,177.8 L234.6,176.2 L236.5,177.3 L236.8,178.9 L235.6,180.3Z",
		"labelX": 234.8,
		"labelY": 178.2
	},
	{
		"id": "chhattisgarh",
		"name": "Chhattisgarh",
		"path": "M352.2,568.2 L350.8,566.6 L349.2,559.6 L350.0,557.1 L346.9,558.1 L347.1,556.0 L346.1,555.2 L345.2,557.2 L343.4,557.0 L343.4,555.7 L344.9,554.8 L343.2,550.2 L336.7,543.9 L332.6,545.0 L329.9,540.3 L332.9,538.4 L330.7,535.2 L330.7,533.5 L332.2,529.0 L333.9,527.6 L333.8,526.2 L338.9,521.5 L340.0,524.2 L341.7,523.6 L342.2,524.9 L343.9,524.8 L346.5,522.6 L344.9,520.7 L347.8,519.6 L346.0,516.8 L341.3,515.3 L341.6,513.0 L338.1,510.6 L338.2,509.3 L336.2,509.2 L336.4,510.7 L334.1,510.0 L337.0,507.9 L334.5,506.0 L335.5,505.4 L337.6,506.1 L338.3,502.2 L337.0,500.0 L334.1,499.9 L334.7,498.5 L333.8,497.0 L340.3,494.3 L339.4,492.5 L340.4,486.4 L337.4,487.0 L336.5,486.1 L339.2,484.1 L338.2,476.8 L335.9,477.0 L334.9,474.6 L335.8,469.9 L339.9,468.2 L341.8,466.1 L341.3,465.1 L343.3,461.0 L343.0,453.9 L343.7,452.6 L345.5,452.9 L346.4,449.7 L345.7,446.7 L346.5,446.6 L348.1,442.0 L349.4,442.1 L350.1,444.0 L350.8,443.4 L349.9,441.8 L351.1,441.5 L351.2,438.7 L353.0,438.1 L353.8,436.7 L353.7,432.4 L355.6,430.9 L356.7,432.1 L358.3,430.7 L359.0,431.2 L359.6,429.9 L361.1,430.5 L361.6,432.4 L364.9,429.5 L367.6,429.5 L368.7,426.7 L370.5,425.4 L371.0,426.3 L371.6,425.8 L371.8,419.6 L374.2,419.0 L376.4,417.1 L376.4,413.5 L381.3,412.7 L382.2,411.6 L382.0,409.0 L383.2,406.1 L381.1,405.2 L380.8,404.0 L379.3,404.5 L378.5,403.2 L377.4,403.5 L375.8,399.9 L373.4,400.6 L370.9,398.9 L367.9,401.2 L367.3,400.7 L366.3,398.3 L369.5,394.3 L367.1,390.3 L367.4,388.7 L368.8,388.2 L370.4,390.7 L372.1,391.6 L375.8,389.8 L378.1,390.1 L379.3,391.3 L382.5,391.3 L383.7,390.4 L384.3,391.7 L390.7,391.6 L392.2,392.4 L393.0,392.1 L392.5,391.2 L395.9,390.3 L396.1,388.7 L399.9,387.1 L404.1,389.8 L408.9,389.2 L410.6,388.3 L414.1,382.7 L415.9,383.0 L419.4,385.2 L420.8,390.1 L424.5,391.3 L425.4,393.3 L425.0,395.5 L426.7,397.9 L431.1,399.0 L431.1,397.3 L433.0,397.0 L433.4,399.6 L431.9,404.4 L433.0,405.3 L434.0,404.7 L434.7,406.0 L433.7,411.7 L436.4,413.4 L436.9,416.9 L438.0,415.1 L438.8,416.5 L443.0,416.5 L443.1,419.5 L439.0,423.7 L438.9,425.6 L435.0,426.6 L433.0,428.6 L432.2,430.6 L434.0,431.7 L432.9,434.6 L429.0,435.3 L426.1,438.3 L424.4,438.2 L422.4,439.6 L420.7,442.5 L421.9,443.5 L420.0,444.4 L420.1,446.5 L421.9,448.1 L421.5,450.0 L420.0,450.4 L420.1,451.5 L418.9,450.9 L418.2,451.8 L418.7,453.0 L416.9,455.0 L418.7,456.5 L417.8,457.1 L417.5,455.8 L415.9,456.8 L414.6,460.3 L416.5,464.6 L412.8,463.8 L413.0,466.5 L411.4,467.2 L410.7,470.9 L408.7,471.9 L404.3,469.7 L399.7,470.8 L395.5,470.5 L395.1,473.8 L391.4,477.7 L390.6,480.0 L387.6,478.2 L388.2,485.9 L387.0,487.9 L389.8,491.6 L388.9,494.3 L389.8,495.8 L388.5,499.9 L388.8,502.3 L394.5,504.5 L397.4,504.4 L397.5,508.5 L394.1,510.7 L394.3,508.0 L390.1,506.9 L387.4,509.0 L384.4,504.1 L383.0,504.7 L379.7,502.6 L378.8,503.8 L376.5,501.1 L374.6,502.7 L374.0,506.7 L377.0,508.3 L377.5,510.0 L379.7,510.4 L378.7,518.6 L380.6,518.3 L381.4,520.8 L383.1,521.0 L381.9,522.6 L383.1,523.8 L382.2,525.4 L382.5,529.4 L383.9,530.5 L383.4,531.4 L384.6,535.7 L382.8,536.1 L382.5,539.1 L380.3,540.2 L380.2,541.4 L377.2,542.0 L376.6,543.8 L374.9,543.2 L376.8,545.1 L376.6,545.8 L375.6,545.7 L374.2,547.2 L371.6,550.1 L371.1,552.0 L368.7,552.2 L368.7,553.0 L365.2,554.5 L363.8,562.8 L362.7,565.5 L361.5,565.3 L361.2,567.6 L355.1,566.2 L352.2,568.2Z",
		"labelX": 386.5,
		"labelY": 475.5
	},
	{
		"id": "dadra-nagar-haveli",
		"name": "Dadra and Nagar Haveli",
		"path": "M136.7,502.6 L133.4,501.2 L133.2,502.1 L132.0,500.0 L131.4,500.8 L131.1,497.5 L129.7,495.9 L131.3,496.1 L132.3,494.8 L133.0,495.6 L134.6,493.6 L134.8,495.2 L136.6,495.0 L133.5,498.1 L134.0,499.5 L135.9,499.0 L135.7,498.0 L138.0,498.6 L136.7,502.6Z",
		"labelX": 133.8,
		"labelY": 498.1
	},
	{
		"id": "daman-diu",
		"name": "Daman and Diu",
		"path": "M72.6,483.9 L68.1,481.9 L69.8,475.1 L73.7,476.2 L74.3,477.7 L72.0,479.2 L74.2,480.0 L72.7,481.9 L73.6,483.5 L72.6,483.9Z",
		"labelX": 71.2,
		"labelY": 479.5
	},
	{
		"id": "delhi",
		"name": "Delhi",
		"path": "M245.8,251.4 L243.2,247.9 L241.4,247.2 L241.4,248.1 L237.9,248.3 L236.8,246.8 L237.9,244.3 L239.4,244.3 L239.7,238.6 L242.1,238.1 L243.3,236.6 L245.0,237.9 L246.8,237.3 L246.6,239.4 L249.0,242.0 L250.1,241.8 L250.4,245.2 L249.3,246.5 L250.5,248.3 L247.9,249.1 L247.8,250.8 L245.8,251.4Z",
		"labelX": 243.6,
		"labelY": 244
	},
	{
		"id": "goa",
		"name": "Goa",
		"path": "M161.8,650.6 L160.3,649.9 L160.5,647.9 L156.7,645.2 L157.7,643.5 L156.2,638.2 L153.2,636.0 L156.3,635.8 L153.3,634.5 L153.8,633.6 L152.7,633.6 L151.8,630.9 L152.4,630.1 L150.3,627.1 L154.6,626.7 L155.4,625.0 L155.9,626.3 L157.6,626.6 L159.2,630.3 L164.3,628.3 L165.0,629.2 L165.8,628.7 L166.4,630.1 L166.1,631.6 L167.0,632.7 L166.1,633.7 L168.5,639.3 L166.2,640.3 L167.9,642.4 L166.7,644.9 L167.4,646.5 L164.9,649.8 L164.1,648.9 L163.9,650.2 L161.8,650.6Z",
		"labelX": 159.4,
		"labelY": 637.8
	},
	{
		"id": "gujarat",
		"name": "Gujarat",
		"path": "M10.6,408.5 L9.6,407.7 L10.4,407.4 L10.1,406.5 L11.7,407.0 L10.6,408.5ZM8.1,403.8 L7.4,403.4 L7.9,402.1 L6.2,402.9 L7.4,401.5 L8.4,402.2 L8.1,403.8ZM3.0,398.6 L2.4,397.3 L3.3,397.0 L1.3,398.3 L0.1,397.1 L3.4,396.4 L1.2,396.6 L4.5,394.0 L4.5,391.9 L6.5,392.0 L5.6,396.3 L5.6,395.4 L4.4,398.0 L3.0,398.6ZM2.4,394.9 L2.2,392.8 L3.4,391.2 L3.8,393.9 L2.9,394.1 L2.7,393.3 L2.4,394.9ZM8.2,393.8 L7.7,392.7 L8.0,393.7 L6.9,393.7 L7.2,391.7 L8.5,391.0 L9.2,392.8 L8.2,393.8ZM4.0,392.3 L5.2,389.7 L6.5,390.0 L6.2,392.1 L5.3,390.8 L5.9,392.2 L4.6,391.6 L4.0,392.3ZM4.5,390.6 L4.6,388.9 L7.4,387.9 L7.0,389.8 L6.5,389.1 L4.5,390.6ZM9.2,390.3 L8.2,389.3 L9.3,389.2 L9.6,387.6 L11.0,388.4 L9.2,390.3ZM7.1,390.5 L7.6,388.0 L6.6,387.8 L8.2,386.2 L9.1,388.2 L7.1,390.5ZM1.6,395.6 L0.2,394.0 L1.3,392.7 L0.7,390.9 L2.8,390.8 L1.7,390.3 L3.6,389.6 L2.0,389.7 L2.5,388.5 L4.1,388.4 L4.8,386.6 L5.7,387.0 L6.7,386.1 L6.2,388.1 L4.3,388.9 L4.1,391.4 L2.2,392.2 L1.6,395.6ZM137.8,500.5 L137.1,499.7 L138.0,498.7 L136.7,498.0 L135.6,498.1 L135.3,499.5 L133.7,499.3 L133.9,497.4 L136.7,495.6 L136.2,494.8 L134.8,495.2 L134.7,493.5 L133.0,495.6 L132.3,494.8 L131.3,496.1 L129.7,495.9 L130.9,497.9 L128.3,497.5 L127.2,499.9 L124.6,500.1 L125.6,494.3 L127.5,492.2 L128.3,493.0 L127.3,491.6 L128.8,488.6 L127.7,482.4 L128.7,482.2 L127.2,481.2 L126.1,476.5 L125.6,477.3 L125.0,476.4 L124.2,473.4 L125.5,472.9 L123.7,472.6 L124.1,470.6 L122.6,470.3 L122.4,472.3 L121.5,472.6 L121.3,468.3 L122.3,468.2 L121.1,468.1 L120.5,466.8 L123.5,461.2 L122.0,462.1 L122.8,459.6 L124.7,458.7 L121.5,460.4 L120.7,458.6 L121.6,456.7 L127.2,455.2 L124.5,454.6 L119.4,455.5 L118.3,454.6 L120.0,450.6 L118.6,449.6 L118.1,447.2 L119.9,439.9 L121.9,439.0 L125.1,440.3 L126.5,438.2 L128.4,438.8 L129.5,437.2 L128.7,438.2 L127.5,437.1 L125.0,438.6 L121.8,437.0 L119.2,438.2 L119.2,437.1 L117.7,439.6 L117.9,438.1 L115.0,436.3 L115.7,434.8 L114.3,434.3 L115.4,435.0 L114.6,436.1 L115.7,436.6 L115.8,438.7 L115.3,439.5 L114.1,437.4 L115.1,440.5 L114.7,441.0 L114.2,439.7 L113.8,441.7 L112.4,439.4 L113.2,441.6 L112.0,447.4 L111.0,444.0 L112.5,443.6 L112.6,442.2 L111.6,442.3 L110.8,444.9 L109.1,444.2 L110.7,445.2 L110.4,446.7 L109.6,447.1 L108.4,445.9 L108.4,446.8 L110.4,447.0 L111.3,448.5 L111.7,453.0 L111.1,451.6 L109.4,450.6 L111.0,451.7 L112.8,456.4 L110.5,462.0 L107.4,466.5 L106.5,466.0 L107.5,469.1 L104.6,471.0 L104.7,469.4 L103.7,471.3 L99.5,472.7 L99.1,473.7 L91.1,476.4 L89.0,478.7 L87.4,478.5 L79.0,482.6 L76.7,483.0 L76.7,482.3 L73.5,483.3 L74.8,482.6 L73.6,482.8 L72.7,481.9 L74.2,480.0 L72.0,479.2 L74.3,478.2 L73.7,476.2 L69.7,475.2 L67.9,482.1 L61.7,479.2 L52.4,471.8 L43.6,461.5 L44.3,461.2 L41.8,459.3 L43.2,457.8 L42.5,455.7 L40.8,456.1 L41.9,457.1 L41.3,457.4 L39.6,456.0 L42.1,458.0 L41.7,459.0 L38.8,456.1 L38.4,456.6 L23.8,441.6 L21.1,438.4 L20.5,436.2 L21.9,433.2 L24.1,431.2 L23.5,432.6 L24.2,433.7 L27.6,432.9 L26.6,436.2 L28.6,437.8 L31.0,436.8 L31.4,435.7 L35.6,435.4 L36.6,434.0 L35.9,432.5 L37.3,433.5 L37.6,434.9 L38.5,434.8 L38.0,436.0 L41.4,433.7 L40.7,432.1 L42.2,431.4 L44.1,433.6 L45.1,430.6 L45.2,432.0 L46.1,432.2 L47.3,431.9 L47.9,430.3 L48.5,430.8 L48.2,429.8 L49.0,429.4 L54.1,429.1 L63.1,413.6 L60.6,414.9 L60.2,417.3 L59.2,417.9 L55.1,415.8 L55.6,417.1 L53.0,417.0 L53.8,414.9 L53.1,417.4 L52.1,417.2 L53.3,418.0 L44.1,420.2 L41.5,423.9 L39.6,421.9 L39.8,422.7 L38.7,423.0 L37.5,422.0 L35.1,422.5 L32.0,420.9 L27.7,420.6 L12.9,411.3 L10.9,408.8 L12.2,409.5 L11.4,408.6 L13.3,407.8 L12.1,407.0 L14.7,407.0 L15.7,406.0 L14.7,407.0 L12.9,406.8 L13.2,406.1 L12.8,406.8 L11.5,404.5 L11.4,405.1 L10.2,404.3 L8.4,400.9 L8.3,396.9 L15.7,389.7 L11.4,390.4 L9.5,393.3 L9.0,391.2 L13.1,388.4 L11.9,388.8 L11.2,387.7 L10.2,388.2 L9.9,387.1 L15.4,387.1 L15.9,377.3 L17.5,376.7 L18.1,379.7 L19.2,380.1 L20.8,377.7 L22.3,379.2 L24.8,377.9 L27.7,378.9 L30.8,377.7 L36.0,378.3 L38.7,377.6 L42.1,380.7 L49.7,381.0 L51.3,380.2 L52.9,377.2 L65.4,373.3 L66.4,373.9 L65.3,375.6 L65.4,378.4 L71.7,379.3 L74.1,378.2 L73.9,377.2 L75.9,375.6 L78.3,375.5 L80.6,373.9 L80.3,373.0 L77.2,372.7 L77.0,369.7 L77.6,367.0 L79.9,365.5 L85.2,367.7 L86.6,366.3 L87.5,367.3 L90.4,365.7 L93.9,365.8 L95.1,366.9 L98.9,365.8 L99.2,367.3 L100.5,367.8 L101.0,365.7 L102.9,367.1 L105.8,364.8 L106.7,365.0 L106.7,366.3 L108.9,367.5 L114.1,367.4 L111.3,368.5 L112.5,369.8 L114.2,369.4 L115.0,370.9 L116.5,370.8 L117.1,373.7 L118.3,373.7 L119.3,370.7 L123.5,372.2 L124.4,375.1 L128.1,375.0 L129.7,376.2 L131.5,375.0 L130.8,374.2 L132.1,371.5 L133.2,372.0 L134.5,371.2 L134.1,374.1 L136.4,375.4 L138.1,375.0 L136.7,376.9 L135.7,376.7 L134.0,380.4 L134.9,381.8 L137.9,383.0 L137.2,384.4 L138.5,385.6 L142.0,382.1 L143.4,388.0 L141.7,390.1 L141.7,392.3 L143.3,392.6 L145.7,394.8 L145.8,397.4 L147.6,396.3 L149.8,397.2 L149.1,402.3 L151.0,402.2 L151.6,403.5 L152.7,402.1 L153.2,402.9 L154.5,402.5 L156.2,405.8 L157.5,405.6 L158.1,404.4 L160.3,407.0 L162.0,407.0 L162.8,407.9 L162.6,410.5 L164.1,411.3 L164.8,410.1 L165.9,410.2 L168.7,414.9 L169.0,417.8 L170.1,418.8 L171.5,418.1 L172.2,420.0 L169.6,426.5 L166.4,426.3 L163.3,430.1 L160.3,429.4 L160.1,430.9 L161.5,430.4 L161.3,431.7 L162.5,433.0 L163.1,431.9 L164.2,432.3 L164.3,431.3 L164.7,432.5 L167.2,433.8 L164.8,434.6 L164.4,435.9 L162.8,435.6 L162.2,434.4 L161.1,434.8 L161.2,438.9 L162.5,439.1 L162.7,442.5 L164.1,442.9 L161.8,445.0 L163.2,446.6 L153.9,450.6 L156.3,455.2 L153.3,456.5 L155.3,460.3 L159.8,458.6 L164.1,458.3 L164.7,459.3 L167.6,458.2 L168.1,460.3 L162.2,461.7 L161.0,460.7 L160.5,462.5 L157.8,463.0 L157.7,466.1 L154.5,467.0 L154.3,469.8 L149.2,471.0 L148.5,469.7 L147.9,469.9 L149.8,471.7 L152.4,471.5 L152.1,473.2 L153.0,474.5 L156.6,475.3 L157.7,482.4 L154.3,483.8 L154.7,486.1 L150.1,487.7 L148.4,485.5 L146.5,484.4 L145.4,485.0 L145.0,483.1 L144.2,483.3 L142.8,485.3 L145.5,488.3 L142.5,492.7 L143.3,493.8 L143.5,498.1 L140.3,498.0 L139.8,499.6 L137.8,500.5Z",
		"labelX": 90.3,
		"labelY": 432.6
	},
	{
		"id": "haryana",
		"name": "Haryana",
		"path": "M238.6,274.8 L238.1,272.4 L239.2,269.2 L239.0,264.2 L240.2,259.6 L237.5,257.1 L235.9,257.4 L235.5,259.2 L231.7,261.1 L231.9,263.5 L228.6,265.0 L228.6,262.9 L226.3,262.6 L227.5,262.1 L226.1,261.2 L227.5,260.8 L226.8,259.3 L224.2,259.8 L221.8,258.4 L223.6,260.1 L222.0,261.0 L223.6,261.8 L223.1,263.2 L222.0,263.3 L221.1,262.0 L218.7,262.3 L219.7,263.1 L218.1,264.1 L218.4,266.7 L220.0,269.0 L218.6,270.1 L216.3,268.2 L215.2,268.8 L212.9,268.3 L213.2,266.9 L211.8,266.2 L212.9,266.1 L213.5,264.6 L212.7,264.1 L213.6,263.8 L213.0,263.2 L214.8,261.8 L214.3,261.4 L213.4,262.5 L212.1,261.2 L214.6,258.8 L216.4,259.3 L211.7,252.7 L207.6,251.5 L207.8,249.9 L203.7,247.1 L203.4,245.4 L201.7,245.0 L199.3,235.3 L200.5,232.6 L198.4,232.4 L198.3,230.9 L196.9,230.8 L197.3,228.9 L196.4,228.5 L197.5,227.0 L197.3,224.8 L195.1,225.6 L195.2,223.8 L192.6,225.6 L191.4,224.5 L188.6,225.7 L187.6,224.0 L185.2,224.1 L184.5,221.5 L182.1,220.3 L179.8,221.8 L176.9,221.3 L176.7,222.6 L175.4,222.7 L173.6,218.9 L175.0,218.6 L175.9,216.4 L174.6,215.3 L175.7,209.3 L172.0,209.6 L171.9,208.2 L174.3,205.8 L172.9,204.4 L173.5,203.0 L176.8,204.5 L178.0,202.5 L181.1,201.8 L183.2,202.5 L183.4,203.4 L184.2,203.1 L186.2,206.1 L188.3,205.3 L188.8,204.2 L189.0,207.6 L190.7,208.4 L191.5,206.6 L192.8,209.3 L190.8,212.2 L192.5,213.9 L192.6,215.8 L194.6,215.1 L194.2,213.8 L195.2,211.9 L196.1,212.3 L195.7,211.2 L198.7,207.6 L202.1,209.6 L203.6,208.7 L205.6,209.2 L205.8,207.6 L207.6,207.0 L209.2,207.4 L210.6,209.5 L215.0,209.4 L216.0,207.6 L217.0,207.9 L220.5,205.7 L218.4,203.8 L219.4,203.3 L219.1,201.0 L220.8,198.2 L219.1,197.2 L219.4,196.5 L222.7,198.1 L223.4,197.5 L222.8,196.8 L224.5,197.5 L224.3,195.7 L225.1,195.1 L226.2,198.3 L230.3,199.0 L231.4,195.0 L229.8,193.4 L228.4,194.3 L228.9,193.1 L233.4,191.0 L234.1,190.1 L233.0,189.1 L234.6,187.6 L236.0,188.5 L236.6,187.8 L238.0,190.1 L239.3,189.1 L238.2,187.5 L238.9,182.5 L237.4,181.2 L237.5,180.0 L236.3,180.6 L237.0,176.4 L234.7,173.2 L236.0,172.0 L236.8,173.6 L238.6,173.0 L240.0,175.8 L241.1,175.6 L241.6,178.0 L243.3,177.9 L245.4,179.7 L245.5,182.5 L244.3,183.5 L246.3,184.9 L246.8,186.3 L250.7,186.9 L252.2,188.3 L253.6,186.8 L253.1,188.7 L255.2,187.3 L257.4,189.8 L254.2,195.6 L252.6,196.6 L252.6,198.1 L248.6,200.0 L244.4,208.7 L245.2,210.8 L243.6,216.2 L245.0,219.1 L244.5,222.0 L245.4,222.4 L244.6,229.7 L247.1,232.8 L246.4,234.4 L247.3,236.0 L245.1,237.9 L243.3,236.6 L242.1,238.1 L239.7,238.6 L239.4,244.3 L237.9,244.3 L236.7,246.0 L237.9,248.3 L241.4,248.1 L241.4,247.2 L243.2,247.9 L245.8,251.4 L247.8,250.8 L247.9,249.1 L250.4,248.2 L254.2,251.3 L254.8,253.0 L253.9,253.6 L254.8,255.0 L254.0,255.5 L256.0,256.2 L255.4,257.8 L254.6,257.5 L254.7,258.4 L256.1,258.5 L254.8,259.2 L254.1,261.4 L255.9,265.7 L254.3,266.0 L253.4,267.9 L252.5,267.3 L252.5,268.5 L250.5,268.5 L247.7,270.7 L246.5,269.6 L244.7,271.0 L242.3,269.7 L241.8,271.0 L243.4,272.2 L241.1,272.1 L240.4,274.7 L238.6,274.8Z",
		"labelX": 214.6,
		"labelY": 223.4
	},
	{
		"id": "himachal-pradesh",
		"name": "Himachal Pradesh",
		"path": "M257.0,189.3 L255.2,187.3 L254.6,188.4 L252.6,188.6 L253.6,186.8 L252.2,188.3 L250.7,186.9 L246.8,186.3 L246.3,184.9 L244.6,184.1 L245.6,182.4 L245.4,179.7 L243.3,177.9 L241.6,178.0 L241.2,175.7 L240.0,175.8 L238.6,173.0 L237.2,173.9 L236.0,172.0 L234.9,172.7 L230.6,169.6 L231.0,166.2 L230.0,165.7 L230.0,163.9 L231.2,162.9 L229.8,162.8 L230.3,161.7 L229.5,160.8 L228.5,161.6 L228.6,160.7 L228.0,161.4 L226.6,159.8 L225.7,160.7 L226.1,160.0 L223.8,155.6 L222.5,156.9 L223.1,158.5 L222.0,159.5 L218.6,159.9 L217.6,158.2 L218.1,156.5 L211.7,143.5 L213.1,143.5 L211.0,139.3 L205.4,135.7 L202.3,135.0 L204.6,132.3 L203.5,131.7 L203.5,130.1 L206.6,128.8 L212.1,123.9 L209.8,121.2 L211.8,116.8 L211.0,115.3 L211.5,113.1 L208.2,109.4 L208.3,107.8 L210.2,107.5 L212.1,109.0 L213.5,108.4 L216.4,105.0 L220.4,104.1 L221.4,101.8 L224.6,99.1 L229.8,98.4 L231.0,99.9 L233.8,99.3 L234.7,96.9 L236.5,97.1 L235.9,100.1 L237.9,101.5 L239.0,104.1 L241.2,105.5 L245.0,105.8 L245.2,108.0 L246.0,107.4 L250.2,111.1 L251.8,108.9 L253.7,109.7 L259.4,105.7 L260.7,106.1 L262.9,108.3 L262.1,109.6 L266.3,112.8 L266.0,115.2 L268.1,118.7 L269.6,118.5 L269.5,117.1 L270.4,117.4 L271.2,116.2 L271.9,116.8 L272.8,115.7 L274.4,116.0 L276.7,114.6 L276.5,113.7 L278.8,113.0 L279.2,117.5 L276.7,119.0 L276.2,121.2 L277.1,122.2 L279.1,120.5 L280.6,121.3 L280.6,122.9 L282.8,124.1 L281.3,126.3 L280.6,129.7 L283.4,129.6 L284.8,130.6 L285.0,133.7 L289.7,137.7 L287.5,144.3 L288.7,147.6 L289.9,147.6 L291.4,150.0 L287.9,153.2 L288.2,154.2 L290.4,155.3 L289.9,156.9 L291.4,157.8 L291.3,159.2 L295.2,163.9 L295.9,166.1 L292.5,166.3 L290.4,163.2 L286.3,163.5 L284.9,162.2 L281.5,163.2 L278.4,160.4 L269.4,163.8 L269.0,164.8 L267.4,164.0 L265.5,164.8 L263.1,167.8 L263.6,171.2 L262.1,170.5 L261.3,171.0 L261.6,172.2 L263.0,172.2 L262.8,174.3 L261.6,173.5 L261.6,175.2 L260.1,177.1 L262.6,180.5 L262.6,181.9 L261.2,182.5 L263.4,184.6 L259.8,187.2 L257.0,188.0 L257.0,189.3Z",
		"labelX": 249.1,
		"labelY": 143.1
	},
	{
		"id": "jammu-kashmir",
		"name": "Jammu and Kashmir",
		"path": "M200.1,128.8 L199.4,126.7 L195.3,126.7 L191.7,123.9 L190.0,124.0 L188.5,122.0 L187.3,121.7 L185.9,123.2 L182.0,121.6 L178.2,122.0 L176.7,117.9 L177.6,116.3 L176.9,114.4 L178.2,110.4 L176.7,111.0 L175.9,113.1 L173.7,113.6 L171.9,112.3 L170.5,108.3 L167.8,107.8 L168.7,104.7 L164.7,103.8 L162.2,99.8 L159.5,98.7 L159.7,96.7 L161.9,96.4 L163.8,93.9 L164.2,90.3 L161.7,86.5 L159.9,86.4 L157.9,81.6 L160.9,78.3 L165.1,76.8 L166.3,73.2 L165.0,71.1 L162.5,70.6 L159.3,71.6 L155.9,70.7 L158.5,65.4 L158.5,63.6 L156.4,60.5 L154.8,61.2 L152.6,60.5 L153.0,58.6 L156.4,56.0 L156.3,54.3 L157.7,53.4 L157.5,49.9 L159.5,48.8 L160.5,49.7 L163.0,49.5 L167.5,45.8 L169.4,45.7 L175.0,46.8 L178.4,49.4 L184.0,49.7 L187.0,51.1 L193.3,50.9 L193.7,52.1 L196.8,54.1 L207.0,55.3 L214.9,50.2 L218.2,51.1 L226.8,46.0 L229.2,47.2 L232.5,47.2 L234.2,44.5 L234.4,41.6 L237.7,40.1 L241.2,41.2 L241.7,37.9 L243.1,38.4 L245.5,37.3 L263.8,22.4 L265.9,24.8 L267.6,23.1 L271.5,22.9 L268.5,26.0 L268.4,27.5 L269.8,32.4 L272.0,34.6 L270.9,36.4 L274.9,48.6 L276.4,50.3 L279.5,50.9 L280.0,52.3 L284.2,52.1 L285.0,80.0 L285.0,118.0 L281.0,118.9 L279.9,119.6 L280.0,121.0 L279.1,120.5 L277.1,122.2 L276.2,121.2 L276.7,119.0 L279.2,117.5 L278.8,113.0 L276.5,113.7 L276.7,114.6 L274.4,116.0 L272.8,115.7 L271.9,116.8 L271.2,116.2 L270.4,117.4 L269.5,117.1 L269.6,118.5 L268.1,118.7 L266.0,115.2 L266.3,112.8 L262.1,109.6 L262.9,108.3 L260.7,106.1 L259.4,105.7 L253.7,109.7 L251.8,108.9 L250.2,111.1 L246.0,107.4 L245.2,108.0 L245.0,105.8 L241.2,105.5 L239.0,104.1 L237.9,101.5 L235.9,100.1 L236.5,97.1 L235.2,96.8 L233.8,99.3 L231.0,99.9 L228.8,98.4 L224.6,99.1 L221.4,101.8 L220.4,104.1 L216.4,105.0 L216.1,106.2 L212.4,108.9 L208.6,107.5 L208.1,109.1 L211.5,113.1 L211.0,115.3 L211.8,116.8 L208.5,121.9 L206.9,122.2 L205.2,124.7 L201.4,126.0 L200.1,128.8Z",
		"labelX": 231.8,
		"labelY": 75.6
	},
	{
		"id": "jharkhand",
		"name": "Jharkhand",
		"path": "M484.9,446.4 L481.0,445.7 L481.8,443.1 L482.9,443.2 L482.1,442.2 L478.8,444.0 L477.8,442.8 L476.4,443.2 L470.1,440.9 L466.5,445.4 L466.0,444.2 L462.8,442.5 L461.4,442.2 L459.9,443.2 L462.1,437.4 L463.3,436.8 L462.2,435.1 L461.9,431.3 L457.3,433.1 L454.9,432.2 L453.2,433.2 L447.2,433.0 L444.5,435.1 L440.7,435.5 L437.0,433.6 L436.5,431.5 L432.9,430.0 L433.0,428.6 L435.0,426.6 L438.9,425.6 L439.0,423.7 L440.6,422.8 L441.8,420.0 L442.9,419.8 L443.5,417.6 L443.0,416.5 L438.8,416.5 L438.0,415.1 L436.9,416.9 L436.4,413.4 L433.7,411.7 L434.7,406.0 L434.0,404.7 L433.0,405.3 L431.9,404.4 L433.4,399.6 L433.0,397.0 L431.1,397.3 L431.1,399.0 L426.7,397.9 L425.0,395.5 L425.4,393.3 L424.5,391.3 L420.8,390.1 L419.3,385.1 L417.7,384.7 L417.1,383.4 L414.3,382.9 L416.5,378.0 L415.7,376.5 L417.8,375.0 L416.4,373.7 L416.2,370.9 L429.2,370.0 L431.0,369.4 L432.6,366.8 L434.1,367.6 L435.8,371.5 L436.8,369.7 L437.7,370.6 L438.0,369.3 L439.9,370.0 L441.0,369.0 L441.8,370.9 L440.9,372.4 L446.3,377.3 L447.1,374.7 L448.5,373.6 L450.8,374.1 L451.4,372.3 L454.6,370.1 L455.6,370.6 L455.7,372.4 L456.9,372.1 L457.4,374.8 L459.3,374.7 L462.3,372.8 L462.6,374.6 L464.8,373.1 L464.3,372.1 L467.9,371.0 L467.9,370.1 L473.5,369.4 L474.4,370.2 L476.0,367.8 L478.4,368.5 L478.0,365.3 L479.3,364.5 L480.4,361.2 L484.2,361.9 L486.2,364.0 L488.9,362.5 L488.6,363.7 L489.9,363.5 L491.0,364.8 L491.2,367.8 L496.4,368.4 L495.2,372.1 L499.9,374.9 L501.4,370.4 L504.1,367.8 L505.9,369.1 L508.8,367.3 L509.5,369.0 L512.5,369.8 L513.0,366.6 L516.3,367.7 L517.1,361.4 L519.1,360.1 L518.9,355.3 L519.8,353.9 L521.8,352.7 L522.9,353.2 L523.8,349.1 L527.9,350.0 L528.3,346.6 L529.7,347.4 L530.8,345.3 L531.5,346.5 L533.7,346.5 L534.3,348.1 L536.4,348.4 L536.2,353.1 L538.9,355.0 L541.6,359.0 L539.3,360.3 L538.3,363.0 L537.9,362.3 L537.3,362.9 L539.6,364.3 L539.2,365.7 L539.9,366.2 L538.8,367.6 L539.8,368.1 L538.2,369.4 L536.0,368.5 L537.0,369.6 L536.7,371.2 L537.5,371.1 L536.4,373.5 L537.1,373.8 L535.6,376.8 L532.3,378.7 L533.8,381.5 L530.5,381.3 L531.6,382.1 L530.7,383.4 L528.4,382.5 L528.9,384.8 L526.8,385.7 L527.5,386.5 L521.4,384.7 L523.0,389.0 L522.3,389.8 L521.7,388.7 L521.6,391.2 L520.9,391.0 L521.4,390.4 L518.5,389.9 L519.5,391.4 L518.3,392.1 L512.1,389.5 L511.7,391.5 L511.4,390.6 L510.0,391.6 L509.3,391.0 L510.0,393.1 L509.2,395.3 L506.6,395.1 L502.0,397.1 L499.6,397.0 L497.4,399.6 L497.7,401.4 L495.8,403.3 L495.2,402.7 L494.2,403.3 L494.1,401.8 L491.5,401.7 L491.5,398.9 L488.8,398.4 L487.9,399.4 L488.9,401.1 L486.0,402.3 L484.1,401.6 L483.7,402.4 L484.7,404.8 L483.9,404.9 L484.2,406.2 L482.8,408.0 L483.0,410.0 L485.2,411.9 L488.6,411.5 L493.4,416.0 L495.7,415.4 L498.3,416.6 L502.4,416.2 L501.8,417.5 L499.4,418.1 L500.2,418.9 L499.0,422.4 L501.4,424.7 L502.3,424.1 L504.5,425.5 L505.4,428.4 L508.4,428.5 L509.4,431.1 L508.0,431.3 L508.1,432.1 L510.7,433.7 L510.3,435.8 L511.8,436.7 L511.8,438.0 L509.8,437.6 L509.5,438.3 L509.2,437.7 L509.5,439.1 L508.8,438.6 L508.0,439.3 L505.4,438.5 L501.2,435.3 L499.4,436.5 L497.2,435.2 L495.2,432.3 L490.5,431.1 L488.6,428.8 L486.3,431.9 L487.8,432.9 L487.4,435.4 L488.8,436.4 L486.7,438.2 L488.3,440.0 L484.9,446.4Z",
		"labelX": 477.9,
		"labelY": 395.9
	},
	{
		"id": "karnataka",
		"name": "Karnataka",
		"path": "M236.8,744.0 L234.3,743.0 L229.2,743.0 L227.7,740.5 L226.2,741.7 L225.1,741.4 L225.0,739.0 L223.0,739.6 L221.3,737.6 L219.8,737.7 L218.9,735.9 L216.8,736.2 L216.8,732.9 L213.8,734.2 L210.2,733.6 L208.4,730.1 L204.6,729.5 L203.9,728.1 L201.1,726.6 L199.7,724.1 L198.0,724.0 L198.0,721.8 L196.5,720.7 L196.5,719.4 L198.1,719.2 L197.8,718.2 L195.8,719.3 L193.9,716.9 L195.5,715.7 L194.1,714.9 L192.6,716.3 L192.0,714.6 L190.4,714.3 L190.6,713.1 L188.8,712.5 L187.8,713.6 L187.9,712.0 L186.1,711.6 L186.3,709.9 L182.9,710.9 L181.1,706.0 L180.7,701.3 L178.0,694.2 L179.3,695.9 L178.1,694.3 L177.5,686.2 L175.7,679.7 L176.5,680.1 L172.9,675.2 L168.8,661.7 L169.7,660.4 L168.4,659.8 L168.9,661.1 L167.6,661.2 L166.0,655.0 L164.7,655.6 L161.7,653.2 L162.7,652.1 L162.0,650.3 L163.9,650.2 L164.1,648.9 L164.9,649.8 L166.5,648.6 L167.4,646.5 L167.0,643.6 L167.9,642.4 L166.2,640.3 L168.5,639.3 L166.1,633.7 L167.0,632.7 L166.1,631.6 L166.1,629.0 L161.8,628.6 L165.3,625.3 L166.0,626.6 L169.1,625.6 L169.8,623.6 L168.6,623.4 L169.4,622.3 L170.4,623.4 L169.8,622.0 L172.0,618.1 L169.2,617.7 L171.0,616.1 L172.7,616.3 L172.9,612.6 L169.5,610.8 L168.2,611.4 L168.0,608.4 L169.0,608.8 L169.2,608.0 L168.4,606.3 L167.2,606.1 L167.3,604.9 L166.5,605.6 L166.1,605.1 L166.9,604.9 L166.7,603.7 L167.7,604.9 L168.1,603.4 L169.8,604.2 L170.2,602.7 L172.1,602.0 L172.2,600.4 L172.8,601.3 L174.2,601.1 L174.8,603.5 L176.7,601.9 L178.0,602.0 L177.2,601.0 L178.2,598.8 L184.4,597.2 L184.1,594.8 L185.6,593.4 L184.8,592.4 L189.0,592.1 L190.4,594.3 L192.4,595.2 L194.2,594.3 L194.4,592.0 L199.3,591.1 L200.0,592.3 L202.1,591.7 L202.3,590.4 L205.0,591.8 L204.9,589.6 L204.1,589.6 L205.1,588.0 L203.7,585.8 L204.6,583.2 L202.3,579.7 L203.3,579.4 L203.9,577.0 L205.4,578.8 L206.7,578.6 L208.5,580.1 L209.1,578.5 L210.1,579.6 L210.8,578.7 L212.0,581.4 L215.4,580.5 L216.0,581.2 L217.2,580.2 L218.7,582.1 L218.6,580.7 L220.6,579.9 L221.4,581.2 L223.3,580.6 L223.5,581.8 L224.3,581.7 L225.0,580.1 L223.8,579.9 L224.1,578.2 L223.0,578.3 L222.9,577.2 L224.1,576.5 L223.3,576.5 L223.9,575.7 L222.9,573.6 L225.2,573.3 L225.6,572.2 L227.3,571.7 L228.2,568.9 L229.6,568.9 L229.6,570.5 L230.7,568.6 L232.8,571.2 L233.8,569.5 L233.5,568.2 L235.4,567.0 L234.0,566.1 L234.1,564.9 L235.8,565.8 L238.9,564.4 L239.0,561.0 L240.0,560.8 L240.4,559.2 L239.1,558.6 L240.0,556.6 L244.2,557.6 L243.8,556.3 L245.3,555.7 L245.9,553.9 L246.9,554.0 L247.8,550.2 L250.1,548.8 L250.6,549.6 L251.4,549.1 L251.4,550.4 L252.5,550.8 L251.1,553.0 L253.2,553.1 L254.0,554.5 L255.2,553.1 L257.7,554.0 L256.7,556.2 L257.6,559.5 L256.2,560.4 L259.1,562.8 L255.2,567.7 L256.6,569.2 L253.6,570.8 L253.3,574.0 L255.0,575.2 L255.7,574.2 L257.4,574.5 L257.4,575.4 L260.1,576.4 L260.0,577.1 L259.1,576.2 L257.9,577.9 L255.2,578.4 L255.7,580.0 L253.6,580.0 L253.7,582.8 L251.6,584.4 L251.1,586.0 L253.9,587.7 L254.9,590.5 L253.6,593.3 L254.1,597.0 L253.2,596.9 L252.8,598.8 L254.0,598.9 L254.0,599.9 L252.6,600.3 L254.1,600.8 L253.9,602.5 L251.9,603.1 L252.6,604.4 L251.3,605.4 L247.7,605.9 L250.6,608.4 L254.8,608.5 L257.4,609.6 L257.4,610.9 L254.6,612.1 L255.2,621.5 L246.2,620.6 L243.3,621.8 L241.8,624.0 L243.0,624.2 L242.5,627.0 L244.7,628.9 L244.4,629.9 L243.5,629.1 L242.0,629.6 L242.0,633.4 L240.4,633.7 L242.0,635.3 L242.9,638.5 L244.2,638.3 L245.7,640.3 L244.5,641.3 L245.7,643.0 L243.4,647.6 L242.5,646.8 L237.9,646.8 L235.7,645.0 L235.1,645.6 L234.8,648.5 L237.5,648.6 L237.6,649.4 L237.1,653.2 L235.2,653.9 L235.7,655.1 L234.7,659.0 L237.7,662.7 L240.5,662.4 L239.6,664.6 L238.0,664.9 L237.9,666.1 L239.9,667.6 L239.2,668.2 L239.7,669.2 L244.1,669.9 L245.4,666.3 L247.6,667.1 L248.9,666.5 L248.9,668.1 L251.1,668.3 L251.7,670.5 L252.6,669.9 L251.8,666.7 L254.9,668.5 L254.9,671.6 L252.4,671.1 L250.8,672.4 L250.7,673.2 L252.1,673.0 L250.2,675.2 L251.7,675.7 L251.5,676.8 L253.0,676.8 L252.1,679.3 L250.8,678.8 L250.9,676.4 L249.8,675.2 L245.3,676.1 L244.5,674.7 L241.9,674.4 L241.8,671.0 L239.6,670.5 L238.3,671.4 L238.1,672.2 L239.2,672.3 L240.5,674.0 L239.3,675.2 L242.2,678.0 L240.4,681.1 L241.1,683.2 L242.0,682.3 L242.9,683.2 L245.8,682.8 L245.7,680.9 L244.6,680.1 L245.7,679.9 L246.1,678.2 L246.1,679.8 L247.6,678.8 L248.1,680.4 L252.9,680.5 L252.4,681.5 L253.8,681.6 L253.4,684.5 L254.3,685.0 L254.6,684.1 L255.5,684.7 L255.5,683.1 L258.2,683.6 L257.9,682.8 L259.0,682.2 L260.6,683.4 L260.7,681.8 L263.9,679.8 L263.6,677.7 L265.5,677.8 L266.2,678.8 L268.0,677.4 L267.1,681.0 L268.2,679.8 L269.6,680.0 L269.7,679.1 L271.7,680.4 L270.9,683.4 L271.5,684.8 L270.2,685.3 L270.8,686.2 L272.9,685.8 L273.9,686.7 L273.6,688.4 L274.8,687.5 L279.3,687.8 L278.3,694.1 L279.5,694.7 L278.6,695.0 L281.5,695.4 L282.9,696.8 L283.8,695.6 L284.4,696.7 L283.4,698.8 L284.2,699.6 L282.5,700.7 L282.4,702.5 L281.0,703.1 L281.1,705.1 L280.2,704.9 L281.0,708.2 L280.5,706.8 L279.0,707.0 L278.1,706.1 L276.9,708.3 L275.2,708.3 L274.6,711.0 L271.9,710.5 L269.9,708.5 L269.0,708.4 L268.6,709.8 L267.1,708.3 L266.2,709.1 L266.5,707.5 L263.8,708.0 L262.7,708.7 L263.1,710.0 L261.3,713.5 L257.4,713.6 L256.8,716.4 L257.8,718.1 L257.0,718.9 L258.3,718.7 L258.2,720.6 L256.1,724.1 L254.1,724.7 L254.0,726.4 L261.1,727.4 L262.3,729.1 L259.4,733.8 L254.5,734.0 L252.7,739.0 L247.9,737.6 L244.0,738.7 L244.2,740.1 L241.4,737.6 L240.1,738.6 L238.5,738.1 L236.5,742.0 L236.8,744.0Z",
		"labelX": 223,
		"labelY": 646.4
	},
	{
		"id": "kerala",
		"name": "Kerala",
		"path": "M243.7,835.0 L240.5,832.6 L231.2,820.1 L228.8,818.3 L226.5,811.9 L227.3,810.9 L226.7,811.6 L225.4,808.8 L226.5,811.7 L223.1,804.1 L220.3,788.9 L221.9,790.1 L222.0,790.8 L220.9,790.2 L221.2,791.6 L221.7,790.7 L221.7,792.5 L222.0,790.9 L222.6,791.3 L223.3,795.8 L222.6,791.4 L224.0,792.8 L223.7,796.2 L224.8,796.9 L223.6,801.0 L227.6,800.9 L225.3,800.1 L225.2,796.3 L224.3,796.1 L223.9,793.7 L224.7,792.9 L223.6,790.3 L222.6,790.9 L221.2,786.9 L221.1,788.3 L221.0,785.3 L220.0,784.3 L220.4,785.8 L219.4,783.9 L220.0,788.5 L218.4,783.0 L219.4,784.0 L219.1,782.4 L218.2,782.6 L214.8,773.2 L215.7,772.7 L215.0,771.8 L214.8,773.5 L211.4,765.8 L209.1,756.6 L210.0,756.1 L209.1,756.5 L208.4,755.6 L209.2,755.0 L208.4,755.5 L205.2,747.5 L203.4,746.7 L201.3,741.0 L199.4,738.7 L200.4,738.7 L199.5,738.6 L200.2,737.7 L198.9,738.5 L199.1,737.5 L198.7,738.2 L194.7,733.6 L197.4,734.4 L196.8,733.3 L196.3,734.0 L195.2,733.6 L193.8,731.9 L195.6,731.8 L194.7,731.6 L195.8,730.7 L194.9,731.1 L195.0,729.2 L197.5,728.2 L195.4,728.0 L194.0,729.3 L192.6,729.1 L192.8,731.4 L192.0,731.9 L191.4,729.9 L192.5,730.1 L191.2,729.7 L191.8,728.4 L191.7,729.4 L190.9,728.7 L182.9,710.9 L186.3,709.9 L186.1,711.6 L187.9,712.0 L187.8,713.6 L188.8,712.5 L190.6,713.1 L190.4,714.3 L192.0,714.6 L192.6,716.3 L194.1,714.9 L195.5,715.7 L193.9,716.9 L195.8,719.3 L197.8,718.2 L198.1,719.2 L196.5,719.4 L196.5,720.7 L198.0,721.8 L198.0,724.0 L199.7,724.1 L201.1,726.6 L203.9,728.1 L204.6,729.5 L208.4,730.1 L210.2,733.6 L213.8,734.2 L216.8,732.9 L217.1,736.5 L218.9,735.9 L219.8,737.7 L221.3,737.6 L223.0,739.6 L225.0,739.0 L224.7,740.4 L225.7,742.3 L222.0,744.2 L221.3,743.4 L220.0,744.2 L220.4,747.2 L225.1,747.9 L226.1,749.4 L228.6,750.2 L228.6,751.8 L226.1,753.6 L226.3,755.0 L230.9,754.8 L232.9,753.5 L233.7,754.2 L232.8,756.0 L234.1,756.6 L234.0,758.7 L235.6,758.8 L233.2,759.1 L231.6,762.1 L236.2,763.9 L238.4,766.4 L237.3,769.0 L237.7,770.3 L235.9,770.4 L236.6,771.6 L236.3,779.6 L240.4,782.0 L245.7,778.2 L247.3,778.4 L248.0,781.7 L248.9,782.1 L248.3,784.5 L246.4,785.3 L248.4,788.8 L246.8,790.8 L247.6,793.7 L245.4,798.8 L248.2,799.9 L249.6,799.1 L250.1,800.0 L250.6,799.1 L250.8,801.0 L252.1,801.8 L248.5,807.5 L248.1,811.6 L244.9,815.3 L247.8,819.3 L247.1,821.8 L245.5,822.9 L248.5,828.4 L248.0,829.4 L246.3,829.6 L247.0,831.2 L244.9,832.8 L245.6,834.6 L243.7,835.0Z",
		"labelX": 217.5,
		"labelY": 772.5
	},
	{
		"id": "madhya-pradesh",
		"name": "Madhya Pradesh",
		"path": "M221.6,472.6 L218.5,472.3 L217.6,471.1 L217.0,469.8 L218.6,469.3 L216.6,463.9 L215.3,464.5 L212.8,463.2 L194.8,463.4 L194.7,462.6 L192.5,462.8 L189.9,461.5 L188.1,458.2 L183.8,456.3 L180.7,456.9 L174.4,454.8 L174.2,453.7 L173.1,453.5 L173.6,448.1 L171.4,446.3 L171.3,444.6 L169.8,444.8 L167.1,447.3 L164.8,447.6 L161.9,445.4 L164.1,442.9 L162.7,442.5 L162.5,439.1 L161.2,438.9 L161.1,434.8 L162.2,434.4 L162.8,435.6 L164.4,435.9 L164.8,434.6 L167.2,433.8 L164.7,432.5 L164.3,431.3 L164.2,432.3 L163.1,431.9 L162.5,433.0 L161.3,431.7 L161.5,430.4 L160.1,430.9 L160.3,429.5 L161.3,429.1 L163.3,430.1 L166.4,426.3 L169.6,426.5 L172.2,420.0 L171.5,418.1 L170.1,418.8 L169.0,417.8 L168.5,416.9 L169.3,416.4 L168.0,413.9 L169.8,412.5 L173.1,413.2 L177.4,409.8 L179.5,409.5 L178.1,409.2 L178.9,408.6 L178.3,407.7 L174.3,407.4 L173.3,406.0 L175.9,402.1 L182.3,399.3 L184.8,397.0 L184.0,395.4 L184.9,393.9 L183.9,389.7 L186.3,385.1 L183.2,379.6 L183.6,378.1 L179.7,377.5 L182.6,371.9 L178.6,370.6 L181.5,365.8 L180.3,365.3 L181.0,362.0 L183.6,366.3 L186.5,364.7 L187.1,362.7 L183.2,361.5 L182.4,362.1 L181.9,356.9 L185.0,359.6 L187.7,360.1 L189.7,359.2 L189.7,356.9 L191.0,356.1 L190.8,354.5 L196.0,354.6 L195.1,358.9 L194.0,356.6 L194.5,358.2 L193.6,359.2 L195.0,359.8 L198.1,359.1 L197.9,360.0 L194.9,361.5 L194.1,360.3 L192.7,360.1 L193.3,359.0 L192.2,358.6 L193.4,360.8 L191.6,362.9 L192.4,364.2 L198.9,365.1 L202.4,364.2 L203.3,365.3 L207.3,363.0 L209.5,364.0 L209.2,367.5 L211.6,368.8 L211.4,372.3 L209.7,373.4 L208.1,371.7 L206.4,373.8 L209.1,378.6 L207.7,379.3 L206.8,381.8 L209.4,382.6 L209.3,383.7 L207.8,384.1 L207.4,386.0 L205.7,386.9 L204.8,384.9 L202.5,386.2 L200.6,384.5 L199.0,388.3 L201.8,390.1 L202.4,391.9 L204.3,391.9 L205.2,393.1 L205.3,391.4 L206.4,390.2 L205.7,388.8 L207.8,390.3 L213.2,388.0 L212.8,385.2 L217.6,383.1 L217.2,380.1 L218.9,376.0 L219.8,379.5 L221.6,379.5 L222.8,378.3 L225.2,379.7 L226.7,379.0 L228.4,381.1 L229.7,380.5 L230.0,378.5 L232.8,377.4 L232.3,380.2 L233.1,380.8 L234.5,380.8 L235.8,382.3 L238.5,382.0 L239.7,379.8 L236.9,375.8 L237.2,371.9 L236.2,369.9 L238.8,369.6 L238.9,371.3 L240.3,372.1 L243.0,368.8 L242.0,364.6 L239.9,363.0 L237.1,363.4 L235.8,361.3 L239.8,359.7 L237.2,355.6 L241.1,353.5 L244.4,353.8 L245.9,352.4 L248.4,352.3 L249.5,353.3 L252.1,352.5 L251.9,350.2 L252.7,350.0 L250.8,347.7 L251.4,346.2 L250.4,346.0 L251.1,343.4 L249.0,343.1 L247.3,344.6 L246.8,346.5 L243.3,345.6 L239.6,347.6 L238.3,346.1 L234.9,346.4 L234.8,345.7 L230.4,344.1 L229.3,342.5 L227.1,334.1 L228.4,333.6 L228.4,331.7 L230.1,329.4 L231.0,329.5 L231.5,328.3 L234.3,328.3 L235.9,327.0 L238.2,322.7 L243.7,319.7 L244.6,318.3 L246.8,318.3 L250.4,314.7 L253.2,314.3 L252.9,313.1 L255.5,312.9 L259.5,310.0 L263.5,308.6 L263.7,307.2 L265.3,306.6 L265.7,305.3 L268.4,304.1 L271.0,304.7 L271.5,301.1 L273.4,301.4 L273.2,300.1 L275.7,300.5 L276.3,299.1 L278.2,298.8 L279.3,300.3 L284.1,302.4 L288.9,301.3 L292.3,304.0 L294.6,304.3 L294.3,305.3 L295.9,304.8 L295.4,308.0 L297.6,310.2 L297.3,311.6 L299.4,312.0 L298.1,314.4 L299.6,315.0 L299.4,315.9 L297.0,317.4 L297.7,318.0 L296.4,318.5 L296.4,319.5 L295.4,319.6 L296.0,320.8 L294.4,321.3 L296.1,323.1 L294.5,324.4 L292.8,329.5 L291.8,329.8 L292.2,331.7 L290.8,330.7 L291.1,331.7 L289.0,333.2 L290.8,335.5 L290.6,337.0 L286.4,338.8 L285.3,338.0 L284.5,338.8 L280.4,338.8 L280.1,341.4 L278.1,342.1 L276.7,344.5 L279.2,350.0 L280.8,350.8 L280.1,351.2 L280.7,352.0 L277.6,353.2 L277.6,355.9 L273.1,360.2 L276.0,365.9 L275.7,369.2 L274.6,370.3 L275.9,372.5 L278.5,374.4 L277.5,376.1 L279.1,377.7 L282.4,374.1 L284.4,375.2 L286.9,378.6 L289.4,378.2 L290.3,380.6 L292.7,379.3 L295.1,375.3 L295.5,372.7 L293.5,371.9 L293.6,370.9 L295.1,371.0 L292.7,366.7 L289.1,367.8 L290.0,361.5 L289.5,360.1 L286.9,358.8 L285.6,356.9 L286.2,354.0 L284.9,352.9 L284.2,348.1 L280.3,347.1 L282.1,346.1 L283.0,346.6 L283.0,344.9 L284.4,345.2 L284.0,343.9 L285.8,343.6 L286.5,342.4 L287.8,342.9 L286.6,343.2 L286.6,344.1 L289.5,345.0 L288.9,343.4 L290.9,342.9 L289.3,342.8 L288.6,340.7 L291.3,341.8 L291.4,342.8 L292.1,341.7 L291.3,340.4 L292.6,340.0 L292.8,338.9 L294.4,339.2 L293.3,342.4 L294.9,342.6 L295.4,344.5 L294.0,345.2 L293.0,344.5 L294.6,343.8 L292.5,344.2 L290.0,346.7 L291.6,348.9 L292.6,345.5 L294.8,345.4 L295.2,347.3 L292.5,348.3 L292.6,351.0 L294.6,349.2 L295.9,350.0 L295.2,348.5 L296.1,347.5 L297.5,349.1 L296.6,351.5 L298.3,350.1 L299.4,352.5 L300.9,352.3 L301.0,351.3 L302.5,352.4 L301.8,351.4 L302.7,351.0 L303.5,352.2 L304.6,351.3 L303.5,348.4 L305.5,349.4 L305.3,347.6 L303.0,347.4 L304.3,345.6 L305.4,345.8 L305.6,347.9 L306.0,347.0 L307.3,348.0 L309.4,347.7 L306.5,350.7 L306.9,352.4 L308.8,351.8 L308.6,353.0 L309.4,353.4 L311.5,350.5 L312.3,351.9 L316.4,351.5 L319.2,352.9 L319.8,351.4 L319.2,348.6 L323.3,347.8 L323.9,345.5 L326.7,345.6 L328.7,343.3 L330.1,343.6 L330.3,342.9 L331.8,344.2 L331.7,347.1 L334.3,348.5 L334.9,350.6 L333.0,351.5 L331.1,354.0 L330.7,355.0 L331.9,355.8 L333.9,355.5 L333.4,354.1 L334.6,353.6 L336.9,354.5 L336.4,352.8 L340.0,353.7 L339.6,351.2 L340.7,352.2 L339.8,352.7 L341.9,353.4 L341.8,354.2 L344.6,354.0 L342.5,351.7 L345.2,351.5 L346.0,352.5 L346.2,350.1 L347.4,350.0 L348.1,351.0 L346.0,354.7 L346.6,355.9 L345.0,356.7 L345.3,357.6 L348.0,357.7 L349.0,356.7 L349.5,358.1 L352.8,357.3 L354.3,359.1 L355.1,357.1 L356.5,357.9 L356.2,356.0 L357.9,353.8 L358.1,350.8 L359.1,350.9 L359.3,352.4 L359.7,350.7 L361.4,352.2 L362.5,351.8 L362.7,352.5 L361.7,352.6 L364.0,353.6 L364.6,352.6 L363.7,351.7 L365.1,351.5 L364.7,350.2 L366.2,350.0 L367.7,351.1 L366.9,351.8 L367.2,352.8 L367.6,352.2 L368.0,352.8 L367.3,354.0 L368.7,353.5 L369.4,354.6 L372.3,355.6 L375.3,355.6 L375.3,359.1 L377.0,361.0 L378.2,360.4 L381.2,362.1 L383.4,361.2 L383.0,361.8 L383.8,362.5 L382.8,363.7 L383.9,364.1 L383.5,363.4 L384.8,362.6 L384.4,365.8 L386.2,365.8 L386.1,367.5 L389.3,368.0 L389.6,364.8 L392.6,366.4 L396.1,364.9 L397.1,366.6 L399.0,366.6 L398.9,367.9 L399.9,367.9 L400.0,369.4 L397.6,369.3 L398.2,371.0 L397.4,374.4 L398.9,374.8 L399.0,377.2 L397.8,381.8 L396.4,381.2 L396.1,381.9 L397.5,383.5 L399.1,383.6 L398.4,385.3 L399.9,385.8 L400.2,387.1 L396.1,388.7 L395.3,390.8 L392.5,391.2 L393.0,392.1 L391.7,392.4 L390.7,391.6 L384.3,391.7 L383.7,390.4 L382.5,391.3 L379.3,391.3 L378.1,390.1 L375.8,389.8 L372.9,391.7 L370.4,390.7 L368.8,388.2 L367.1,389.3 L369.5,394.3 L366.3,398.3 L367.3,400.7 L367.9,401.2 L370.9,398.9 L373.4,400.6 L375.8,399.9 L377.4,403.5 L378.5,403.2 L379.3,404.5 L380.8,404.0 L381.1,405.2 L383.2,406.1 L382.0,409.0 L382.2,411.6 L381.3,412.7 L376.4,413.5 L376.4,417.1 L374.2,419.0 L371.8,419.6 L371.6,425.8 L371.0,426.3 L370.5,425.4 L368.7,426.7 L367.6,429.5 L364.9,429.5 L361.6,432.4 L361.1,430.5 L359.6,429.9 L359.0,431.2 L358.3,430.7 L356.7,432.1 L355.6,430.9 L353.7,432.4 L353.8,436.7 L353.0,438.1 L351.2,438.7 L351.1,441.5 L349.9,442.0 L350.7,443.6 L349.7,443.7 L349.4,442.1 L348.3,441.9 L346.5,446.6 L345.7,446.7 L346.1,451.2 L345.5,452.9 L343.7,452.6 L343.0,453.9 L343.3,461.0 L341.3,465.1 L339.6,465.3 L336.6,463.2 L334.4,463.8 L333.5,459.5 L330.5,456.6 L328.5,456.2 L325.1,458.6 L323.2,459.1 L321.6,458.5 L321.0,459.4 L316.0,457.1 L310.7,458.9 L309.3,455.0 L305.5,454.9 L302.2,453.6 L302.0,455.7 L300.0,455.4 L298.4,457.2 L295.8,456.7 L293.6,457.4 L294.1,460.5 L289.7,461.1 L289.0,460.3 L288.4,461.2 L282.5,459.3 L280.4,460.1 L280.2,457.2 L279.0,456.7 L278.5,457.9 L275.9,457.4 L276.0,458.1 L273.6,458.4 L273.2,460.2 L266.9,463.5 L263.1,462.7 L261.3,464.1 L260.5,464.3 L260.2,463.2 L259.5,463.9 L257.7,463.3 L257.2,464.1 L254.6,463.8 L252.6,459.2 L253.8,458.5 L257.9,458.9 L256.9,458.3 L256.1,454.2 L254.2,452.2 L249.1,452.4 L249.0,453.6 L246.9,454.4 L245.9,453.5 L243.2,453.6 L238.5,457.2 L235.6,457.3 L234.7,459.5 L235.3,461.1 L231.0,465.0 L232.0,466.6 L230.9,469.2 L227.3,469.0 L226.3,471.5 L221.6,472.6Z",
		"labelX": 280.2,
		"labelY": 385.7
	},
	{
		"id": "maharashtra",
		"name": "Maharashtra",
		"path": "M159.9,630.5 L158.5,629.8 L157.6,626.6 L155.9,626.3 L155.7,625.0 L153.5,627.1 L149.5,626.4 L150.2,626.2 L149.9,624.8 L147.9,621.7 L145.7,621.0 L144.2,617.6 L144.0,612.8 L143.5,613.5 L143.0,611.4 L143.7,611.0 L143.0,611.3 L142.3,609.6 L143.0,608.9 L141.8,608.8 L142.8,607.7 L141.8,607.9 L140.2,603.9 L140.9,603.2 L141.3,604.8 L142.4,604.7 L141.2,603.3 L142.5,603.4 L140.4,602.1 L141.4,602.2 L140.1,598.4 L140.9,595.9 L139.8,595.9 L139.6,594.1 L140.3,593.8 L139.3,593.7 L139.8,591.1 L138.7,589.9 L139.0,589.3 L139.7,590.5 L139.5,589.5 L140.5,589.6 L139.4,589.5 L139.9,588.4 L136.9,582.1 L138.0,582.6 L138.4,581.9 L136.3,579.1 L137.4,578.1 L135.5,574.7 L136.4,574.0 L134.2,567.5 L134.2,566.5 L135.4,567.0 L133.1,564.6 L134.3,563.7 L132.6,563.6 L131.8,561.4 L133.0,560.8 L131.5,560.4 L131.4,556.3 L129.9,555.6 L130.0,553.9 L130.8,553.9 L131.2,555.0 L133.7,555.6 L134.1,557.6 L132.9,553.4 L134.1,553.7 L134.2,552.5 L132.5,554.4 L129.5,551.9 L128.9,548.6 L129.8,546.3 L127.8,541.9 L128.2,538.8 L131.3,538.6 L131.4,537.0 L129.7,537.4 L129.2,535.9 L130.6,535.8 L130.5,533.9 L132.6,533.1 L130.7,531.4 L129.3,533.4 L128.0,533.0 L126.5,536.3 L126.9,534.8 L126.1,534.5 L127.3,532.0 L126.4,529.0 L127.1,528.0 L126.1,529.3 L125.7,528.3 L127.4,525.4 L125.8,527.5 L126.3,523.5 L124.8,519.7 L125.9,517.9 L125.3,518.5 L124.0,517.5 L123.9,515.8 L124.6,515.8 L123.4,511.9 L124.1,511.2 L123.4,511.8 L123.4,509.7 L122.2,508.7 L123.3,505.3 L124.1,505.0 L125.0,506.2 L124.0,504.9 L123.8,502.0 L124.6,500.1 L127.2,499.9 L128.3,497.5 L130.9,497.9 L131.0,500.3 L132.2,500.1 L133.0,502.0 L134.4,501.3 L136.7,502.6 L140.3,498.0 L143.4,498.2 L143.7,495.8 L142.5,492.7 L145.5,488.3 L142.7,485.1 L144.3,483.2 L145.0,483.1 L145.4,485.0 L146.5,484.4 L150.1,487.7 L154.7,486.1 L154.3,483.8 L157.7,482.4 L156.6,475.3 L153.0,474.5 L152.1,473.2 L152.4,471.5 L149.8,471.7 L147.9,469.9 L148.5,469.7 L149.2,471.0 L154.3,469.8 L154.5,467.0 L157.7,466.1 L157.8,463.0 L160.5,462.5 L161.0,460.7 L162.1,461.7 L167.5,460.8 L168.3,459.0 L167.6,458.2 L164.7,459.3 L164.1,458.3 L161.0,458.4 L155.3,460.3 L153.3,456.5 L156.0,455.9 L156.3,454.3 L154.5,452.4 L154.1,450.5 L162.9,446.8 L164.6,447.6 L167.1,447.3 L171.0,444.5 L171.4,446.3 L173.6,448.1 L173.1,453.5 L175.3,455.3 L180.8,456.9 L183.8,456.3 L188.1,458.2 L189.9,461.5 L192.5,462.8 L194.7,462.6 L194.8,463.4 L212.8,463.2 L215.3,464.5 L216.6,463.9 L218.6,469.3 L217.0,469.8 L217.6,471.1 L218.5,472.3 L221.6,472.6 L226.3,471.5 L227.3,469.0 L230.9,469.2 L232.0,466.6 L231.0,465.0 L235.3,461.1 L234.7,459.5 L235.6,457.3 L238.5,457.2 L243.2,453.6 L245.9,453.5 L246.9,454.4 L249.0,453.6 L249.1,452.4 L254.2,452.2 L256.1,454.2 L256.9,458.3 L257.9,458.9 L253.8,458.5 L252.6,459.2 L254.6,463.8 L257.2,464.1 L257.7,463.3 L259.5,463.9 L260.2,463.2 L260.5,464.3 L261.3,464.1 L263.1,462.7 L266.9,463.5 L273.2,460.2 L273.6,458.4 L276.0,458.1 L275.9,457.4 L278.5,457.9 L279.0,456.7 L280.2,457.2 L280.4,460.1 L282.5,459.3 L288.4,461.2 L289.0,460.3 L289.7,461.1 L294.1,460.5 L293.6,457.4 L295.8,456.7 L298.4,457.2 L300.0,455.4 L302.0,455.7 L302.2,453.6 L305.5,454.9 L309.3,455.0 L310.7,458.9 L316.0,457.1 L321.0,459.4 L321.6,458.5 L323.2,459.1 L325.1,458.6 L328.5,456.2 L330.5,456.6 L333.5,459.5 L334.4,463.8 L336.6,463.2 L339.6,465.3 L341.5,465.3 L340.6,467.6 L335.9,469.8 L335.2,472.0 L335.8,476.8 L338.2,476.8 L339.2,484.1 L336.5,486.1 L337.4,487.0 L340.4,486.4 L339.4,492.5 L340.3,494.3 L333.8,497.0 L334.7,498.5 L334.1,499.9 L337.0,500.0 L338.3,502.2 L337.6,506.1 L335.5,505.4 L334.5,506.0 L337.0,507.9 L334.1,510.0 L336.4,510.7 L336.2,509.2 L338.2,509.3 L338.1,510.6 L341.6,513.0 L341.3,515.3 L346.0,516.8 L347.8,519.6 L344.9,520.7 L346.5,522.6 L343.9,524.8 L342.2,524.9 L341.7,523.6 L340.0,524.2 L338.9,521.5 L333.8,526.2 L333.9,527.6 L332.2,529.0 L330.7,533.5 L330.7,535.2 L332.9,538.2 L330.0,540.1 L330.7,541.3 L326.4,542.5 L320.4,538.0 L321.7,537.2 L321.6,532.5 L321.0,531.7 L319.5,532.1 L319.5,530.1 L321.8,528.2 L321.2,526.5 L322.6,521.5 L317.5,515.9 L313.5,516.4 L312.3,518.5 L310.8,517.2 L308.8,518.7 L302.6,515.3 L302.1,519.5 L300.8,519.7 L298.8,517.8 L294.7,517.1 L295.1,514.3 L292.1,514.1 L291.7,511.1 L288.2,510.9 L285.1,509.4 L283.0,509.3 L282.1,510.1 L277.1,506.6 L276.7,508.4 L277.9,508.7 L278.7,510.4 L278.1,512.4 L276.0,513.9 L277.1,515.6 L276.2,516.9 L277.1,519.9 L273.6,521.2 L273.3,526.3 L270.0,526.1 L267.2,523.2 L264.8,524.3 L266.0,525.4 L265.0,525.7 L264.4,527.4 L264.4,530.5 L263.2,530.1 L263.1,531.6 L262.1,531.3 L262.0,532.3 L262.2,533.6 L264.6,534.5 L264.2,535.7 L265.4,535.7 L267.0,538.2 L264.2,538.7 L262.8,542.2 L262.0,541.6 L261.3,542.5 L261.4,546.0 L259.2,546.8 L259.0,546.0 L257.6,546.2 L257.7,548.3 L256.2,548.6 L257.3,549.1 L255.6,549.6 L256.4,549.9 L255.5,551.9 L256.8,553.1 L255.2,553.1 L254.0,554.5 L253.2,553.1 L251.2,553.1 L252.5,550.8 L251.4,550.4 L251.4,549.1 L249.9,548.9 L247.8,550.2 L246.9,554.0 L245.9,553.9 L245.3,555.7 L243.8,556.3 L244.2,557.6 L240.0,556.6 L239.1,558.6 L240.4,559.2 L240.0,560.8 L239.0,561.0 L238.9,564.4 L235.8,565.8 L234.1,564.9 L234.0,566.1 L235.4,567.0 L233.5,568.2 L233.8,569.5 L232.8,571.2 L230.7,568.6 L229.6,570.5 L229.6,568.9 L228.2,568.9 L227.3,571.7 L225.6,572.2 L225.2,573.3 L222.9,573.6 L223.9,575.7 L223.3,576.5 L224.1,576.5 L222.9,577.2 L223.0,578.3 L224.1,578.2 L223.8,579.9 L225.0,580.1 L224.3,581.7 L223.5,581.8 L223.3,580.6 L221.4,581.2 L220.6,579.9 L218.6,580.7 L218.7,582.1 L217.2,580.2 L216.0,581.2 L215.4,580.5 L212.0,581.4 L210.8,578.7 L210.1,579.6 L209.1,578.5 L208.5,580.1 L206.7,578.6 L205.4,578.8 L203.9,577.0 L203.3,579.4 L202.3,579.7 L204.6,583.2 L203.7,585.8 L205.1,588.0 L204.1,589.6 L204.9,589.6 L205.0,591.8 L202.3,590.4 L202.1,591.7 L200.0,592.3 L199.3,591.1 L194.4,592.0 L194.2,594.3 L192.4,595.2 L190.4,594.3 L189.0,592.1 L184.8,592.4 L185.6,593.4 L184.1,594.8 L184.4,597.2 L178.2,598.8 L177.2,601.0 L178.0,602.0 L176.7,601.9 L174.8,603.5 L174.2,601.1 L172.8,601.3 L172.2,600.4 L172.1,602.0 L170.2,602.7 L169.8,604.2 L168.1,603.4 L167.7,604.9 L166.7,603.7 L166.9,604.9 L166.1,605.1 L166.5,605.6 L167.3,604.9 L167.2,606.1 L168.4,606.3 L169.2,608.0 L169.0,608.8 L168.0,608.4 L168.2,611.4 L169.5,610.8 L172.9,612.6 L172.7,616.3 L171.0,616.1 L169.2,617.7 L172.0,618.1 L169.8,622.0 L170.4,623.4 L169.4,622.3 L168.6,623.4 L169.8,623.6 L169.1,625.6 L166.0,626.6 L165.3,625.3 L162.7,627.2 L162.8,628.4 L161.8,628.6 L162.5,629.3 L159.9,630.5Z",
		"labelX": 235,
		"labelY": 537.5
	},
	{
		"id": "manipur",
		"name": "Manipur",
		"path": "M709.9,390.7 L709.2,389.1 L707.0,387.9 L704.2,387.2 L701.3,388.0 L699.9,385.7 L696.1,385.5 L695.7,386.9 L694.6,386.3 L693.1,387.5 L690.8,383.8 L688.8,382.6 L688.4,384.4 L686.1,385.2 L685.8,383.4 L685.1,384.5 L683.0,383.4 L681.9,384.6 L681.3,382.9 L678.5,382.4 L680.3,375.7 L679.2,373.9 L680.2,373.6 L680.8,368.7 L682.1,368.4 L681.2,368.0 L682.0,365.7 L681.2,364.6 L682.2,361.6 L683.3,362.2 L684.6,361.6 L686.3,357.3 L686.0,355.3 L688.3,353.0 L690.2,347.9 L692.1,346.5 L693.0,348.5 L694.3,348.3 L695.8,349.8 L698.1,344.9 L701.3,341.8 L701.2,340.8 L700.1,340.7 L700.3,339.5 L705.6,339.0 L706.9,337.8 L709.0,339.8 L711.9,339.2 L712.4,340.7 L715.1,340.9 L718.0,339.5 L718.3,337.9 L720.4,337.2 L722.2,334.7 L722.8,336.4 L721.7,338.1 L721.8,340.4 L725.2,342.0 L722.5,349.4 L726.9,351.7 L726.8,355.1 L724.0,360.6 L723.2,364.3 L721.6,364.4 L721.1,367.0 L717.6,371.3 L717.6,373.3 L715.5,375.8 L713.7,380.9 L713.2,384.6 L711.2,387.9 L710.9,390.4 L709.9,390.7Z",
		"labelX": 702.7,
		"labelY": 362.7
	},
	{
		"id": "meghalaya",
		"name": "Meghalaya",
		"path": "M663.4,354.9 L653.8,350.1 L645.0,350.4 L644.8,351.3 L642.1,352.2 L641.0,351.5 L641.3,350.6 L637.4,351.8 L631.9,349.7 L620.8,351.2 L618.5,350.3 L617.3,351.2 L615.5,350.8 L615.4,349.9 L609.4,351.5 L606.4,350.0 L600.2,349.0 L596.3,346.7 L593.1,347.2 L592.2,344.2 L593.8,341.1 L593.5,339.4 L597.6,337.5 L594.2,333.3 L595.2,333.3 L595.5,330.9 L597.3,330.2 L597.2,329.2 L600.3,326.7 L602.0,327.2 L605.9,326.3 L607.0,325.2 L608.8,325.9 L610.1,325.1 L611.7,326.8 L611.1,328.7 L613.0,326.8 L614.3,327.5 L614.1,328.6 L615.8,327.0 L617.5,326.9 L617.3,328.1 L618.3,328.3 L619.2,327.0 L621.2,327.0 L622.2,328.2 L622.8,327.1 L623.5,329.0 L625.2,329.0 L624.4,331.0 L629.8,329.8 L629.3,332.4 L630.5,334.0 L632.0,333.2 L633.5,330.5 L638.8,329.4 L637.4,329.3 L639.0,327.9 L638.1,328.0 L640.2,324.5 L641.7,324.9 L641.1,327.4 L642.7,328.4 L644.1,326.9 L644.4,323.7 L646.8,321.9 L648.4,322.6 L648.2,324.0 L649.7,325.6 L651.5,324.3 L659.9,323.1 L656.1,327.2 L656.3,328.2 L658.0,328.4 L656.0,331.2 L656.2,335.5 L662.3,333.0 L663.6,333.7 L663.6,334.9 L665.5,337.0 L667.0,337.3 L667.5,338.9 L669.7,337.9 L669.4,339.6 L667.3,341.7 L668.2,341.6 L668.5,343.3 L669.7,342.7 L673.3,345.8 L672.7,348.3 L673.8,349.2 L670.0,350.5 L668.8,352.3 L666.1,351.6 L666.6,352.9 L665.0,352.6 L664.5,354.8 L663.4,354.9Z",
		"labelX": 633,
		"labelY": 338.4
	},
	{
		"id": "mizoram",
		"name": "Mizoram",
		"path": "M676.7,447.0 L675.5,443.5 L671.4,440.9 L670.5,444.9 L668.5,446.1 L667.4,441.6 L668.5,441.8 L668.6,440.3 L666.2,425.4 L664.0,419.0 L662.1,417.7 L662.6,414.1 L661.7,408.7 L663.0,408.5 L659.5,397.0 L658.9,391.5 L660.8,388.6 L661.0,381.6 L659.9,378.4 L663.3,378.4 L663.7,381.4 L664.9,381.7 L666.3,380.6 L666.9,378.6 L668.5,378.4 L668.9,376.0 L670.7,375.3 L672.7,370.3 L674.5,374.6 L676.7,373.6 L679.8,374.2 L679.9,379.0 L678.5,382.5 L681.3,382.9 L681.9,384.6 L683.2,383.3 L685.1,384.5 L685.9,383.4 L686.1,385.2 L688.4,384.4 L688.3,386.3 L690.1,388.0 L690.2,393.1 L691.3,395.5 L690.5,404.2 L689.2,405.2 L689.9,411.7 L687.3,415.6 L684.5,414.0 L682.8,414.4 L683.8,418.2 L683.0,418.4 L681.9,421.4 L681.7,424.4 L683.1,427.7 L682.2,429.7 L684.4,432.8 L684.9,437.7 L683.2,438.1 L683.4,440.2 L680.4,439.6 L681.0,442.4 L679.5,442.4 L679.4,445.9 L677.9,444.5 L676.7,447.0Z",
		"labelX": 675.1,
		"labelY": 408.7
	},
	{
		"id": "nagaland",
		"name": "Nagaland",
		"path": "M695.8,349.8 L692.2,347.4 L691.8,342.7 L690.0,341.8 L688.3,339.3 L692.8,336.0 L694.8,332.8 L698.5,330.2 L698.0,328.3 L700.3,326.6 L700.9,331.2 L706.0,328.0 L705.3,325.3 L706.7,320.3 L709.5,315.6 L711.3,315.1 L711.6,311.5 L714.3,308.3 L715.2,311.4 L717.5,309.3 L717.7,306.8 L719.2,306.1 L719.3,305.1 L721.4,303.8 L722.3,304.4 L723.1,303.0 L725.3,303.2 L728.5,300.9 L730.8,297.0 L731.9,296.4 L734.5,297.3 L739.2,293.6 L740.3,298.3 L738.9,299.1 L740.6,301.5 L739.8,303.1 L740.4,304.6 L738.1,306.6 L735.7,311.6 L737.6,313.7 L737.2,322.2 L739.0,323.1 L734.5,328.3 L735.3,332.8 L732.2,335.6 L730.9,337.9 L731.3,338.7 L729.8,338.9 L728.8,340.9 L723.9,341.8 L721.8,340.4 L721.7,338.1 L722.8,336.4 L722.2,334.7 L720.4,337.2 L718.3,337.9 L718.0,339.5 L715.1,340.9 L712.4,340.7 L711.9,339.2 L709.0,339.8 L706.9,337.8 L705.6,339.0 L702.1,338.8 L700.2,339.5 L700.1,340.7 L701.2,340.8 L701.3,341.8 L698.1,344.9 L695.8,349.8Z",
		"labelX": 714.4,
		"labelY": 321.7
	},
	{
		"id": "odisha",
		"name": "Orissa",
		"path": "M509.9,485.5 L508.7,485.2 L510.5,481.7 L514.8,481.6 L514.9,483.3 L513.1,483.2 L511.1,484.7 L511.6,482.7 L510.9,484.9 L509.4,484.4 L509.9,485.5ZM364.0,567.6 L361.2,567.1 L361.5,565.3 L362.7,565.5 L363.8,562.8 L365.2,554.5 L368.7,553.0 L368.7,552.2 L371.1,552.0 L371.6,550.1 L374.2,547.2 L375.6,545.7 L376.6,545.8 L376.8,545.1 L374.9,543.2 L376.6,543.8 L377.2,542.0 L380.2,541.4 L380.3,540.2 L382.5,539.1 L382.8,536.1 L384.6,535.7 L383.4,531.4 L383.9,530.5 L382.5,529.4 L382.2,525.4 L383.1,523.8 L381.9,522.6 L383.1,521.0 L381.4,520.8 L380.6,518.3 L378.7,518.6 L379.7,510.4 L377.5,510.0 L377.0,508.3 L374.0,506.7 L374.4,503.0 L376.5,501.1 L378.8,503.8 L379.7,502.6 L383.0,504.7 L384.4,504.1 L387.4,509.0 L390.2,506.9 L394.3,508.0 L394.1,510.7 L397.3,509.0 L397.4,504.4 L394.5,504.5 L388.8,502.3 L388.5,499.9 L389.8,495.8 L388.9,494.3 L389.8,491.6 L387.0,487.9 L388.2,485.9 L387.6,478.2 L390.6,480.0 L391.4,477.7 L395.1,473.8 L395.5,470.5 L399.7,470.8 L404.3,469.7 L408.7,471.9 L410.7,470.8 L411.4,467.2 L412.8,467.0 L412.8,463.8 L416.5,464.6 L414.6,460.3 L415.9,456.8 L417.5,455.8 L417.8,457.1 L418.7,456.5 L416.9,455.0 L418.7,453.0 L418.2,451.8 L418.9,450.9 L420.1,451.5 L420.0,450.4 L421.5,450.0 L421.9,448.1 L420.1,446.5 L420.2,443.8 L421.9,443.5 L420.8,442.4 L423.1,438.8 L426.1,438.3 L429.0,435.3 L432.9,434.6 L434.0,431.7 L432.3,430.0 L436.5,431.5 L437.0,433.6 L440.7,435.5 L444.5,435.1 L447.2,433.0 L453.2,433.2 L454.9,432.2 L457.3,433.1 L461.9,431.3 L462.2,435.1 L463.3,436.8 L462.1,437.4 L459.9,443.2 L461.4,442.2 L462.8,442.5 L466.0,444.2 L466.5,445.4 L470.1,440.9 L476.4,443.2 L477.8,442.8 L478.8,444.0 L482.1,442.2 L482.9,443.2 L481.8,443.1 L481.0,445.7 L485.0,446.4 L488.3,440.0 L486.7,438.2 L488.8,436.4 L487.4,435.4 L487.8,432.9 L486.3,431.9 L488.6,428.8 L490.5,431.1 L495.2,432.3 L497.2,435.2 L499.4,436.5 L501.2,435.3 L502.1,436.6 L507.3,439.0 L507.1,441.2 L509.2,440.9 L510.3,442.6 L514.0,443.1 L515.6,444.6 L514.9,448.2 L515.8,449.4 L517.5,449.5 L517.5,448.1 L519.2,447.5 L519.6,446.2 L521.4,446.8 L522.4,451.2 L527.1,452.5 L528.1,457.0 L525.3,458.8 L520.4,458.7 L517.9,459.6 L511.1,467.2 L510.1,470.8 L514.1,480.0 L513.8,481.2 L510.2,481.5 L508.2,486.2 L508.7,485.2 L510.0,485.4 L509.5,484.4 L510.7,485.1 L513.1,483.3 L516.2,483.4 L509.0,488.4 L507.7,490.1 L507.5,492.3 L508.9,492.6 L508.9,494.0 L505.9,495.8 L506.2,496.5 L500.2,499.3 L501.0,499.5 L500.5,501.2 L502.9,498.2 L498.8,502.4 L498.2,504.7 L496.9,504.5 L495.5,502.3 L494.3,502.5 L494.0,503.3 L495.6,503.4 L496.9,504.9 L496.3,505.5 L497.5,505.4 L490.2,508.1 L485.0,508.9 L469.8,516.1 L457.6,525.3 L454.1,529.9 L452.7,530.3 L453.0,528.9 L452.1,529.6 L452.5,530.3 L452.1,528.8 L451.0,528.6 L450.9,529.6 L449.0,529.5 L451.0,531.2 L449.0,532.7 L448.3,531.2 L445.7,533.6 L444.2,532.7 L444.6,535.6 L442.8,536.1 L443.4,536.6 L442.4,536.5 L442.7,537.4 L442.0,537.0 L442.2,538.5 L441.4,539.5 L438.8,539.3 L435.1,540.5 L433.6,538.8 L429.7,538.7 L427.0,532.9 L425.7,533.7 L426.8,535.8 L425.9,535.5 L424.8,533.5 L425.3,532.8 L422.5,528.7 L421.3,531.7 L420.4,531.0 L420.0,532.9 L419.0,532.8 L419.3,531.2 L418.0,531.1 L417.9,534.7 L416.6,533.2 L413.8,533.4 L414.5,535.5 L414.9,534.3 L415.9,535.3 L414.9,535.2 L416.7,537.2 L416.3,538.0 L413.1,539.2 L412.7,540.1 L411.5,539.9 L411.1,541.3 L409.1,539.7 L405.7,543.6 L405.7,545.0 L406.9,545.1 L406.3,546.2 L407.9,546.5 L405.9,549.2 L407.1,549.6 L406.9,551.2 L402.8,551.7 L402.3,550.1 L400.0,549.3 L399.1,552.4 L396.1,553.7 L395.2,555.4 L394.0,554.2 L394.5,551.3 L392.7,550.7 L393.2,549.4 L391.1,546.5 L388.0,550.2 L388.6,551.3 L387.2,552.8 L388.8,553.1 L386.5,556.3 L388.1,558.1 L387.2,557.9 L387.1,560.8 L386.2,560.2 L385.2,561.0 L385.4,562.4 L381.2,560.3 L378.8,560.3 L370.0,566.0 L368.9,565.5 L367.4,567.3 L364.0,567.6Z",
		"labelX": 444.7,
		"labelY": 498.2
	},
	{
		"id": "puducherry",
		"name": "Puducherry",
		"path": "M318.4,765.3 L318.1,763.7 L315.2,762.3 L315.2,761.3 L316.4,761.6 L316.0,760.4 L319.4,760.7 L319.3,764.8 L318.5,765.1 L319.3,765.2 L318.4,765.3ZM317.9,737.4 L317.4,736.5 L316.6,737.0 L316.5,736.0 L315.9,736.8 L315.0,735.6 L314.0,735.8 L314.7,734.7 L314.9,735.5 L315.8,735.1 L314.5,733.8 L315.1,732.8 L313.6,732.7 L314.6,731.5 L315.3,732.7 L316.5,732.5 L315.6,733.0 L316.1,734.7 L317.9,733.1 L318.9,733.7 L318.5,735.4 L317.6,735.5 L318.4,735.6 L317.9,737.4ZM194.7,733.5 L192.6,731.2 L192.5,729.2 L197.3,728.0 L195.0,729.2 L194.7,731.4 L193.7,731.5 L194.7,733.5Z",
		"labelX": 316.2,
		"labelY": 734.5
	},
	{
		"id": "punjab",
		"name": "Punjab",
		"path": "M192.6,215.8 L192.5,213.9 L190.8,212.2 L192.8,209.3 L191.5,206.6 L190.7,208.4 L189.0,207.6 L188.8,204.2 L188.3,205.3 L186.2,206.1 L184.2,203.1 L183.4,203.4 L183.2,202.5 L181.1,201.8 L178.0,202.5 L176.6,204.6 L173.5,203.0 L156.1,202.5 L155.9,201.2 L158.2,197.7 L158.3,195.7 L158.0,193.2 L155.6,189.6 L158.8,185.5 L161.2,184.7 L161.6,182.1 L166.8,178.4 L166.3,177.1 L167.8,174.6 L169.1,174.7 L169.1,173.4 L173.9,170.0 L174.4,167.6 L176.2,168.2 L178.1,166.7 L177.7,165.6 L176.1,165.4 L175.3,165.5 L175.3,167.0 L174.2,167.0 L172.9,165.3 L173.1,161.0 L176.7,155.0 L174.6,153.7 L175.6,151.6 L173.3,146.6 L175.5,141.4 L178.4,140.1 L178.5,139.0 L179.3,139.7 L181.3,139.1 L182.7,136.2 L184.1,135.5 L186.6,136.7 L189.7,135.0 L191.0,135.5 L191.8,133.9 L193.0,134.8 L195.1,132.5 L195.1,130.7 L196.4,130.1 L195.4,126.6 L199.4,126.7 L200.2,128.7 L201.0,126.4 L206.0,124.1 L210.4,119.0 L209.8,121.2 L212.0,124.2 L209.6,125.4 L206.6,128.8 L203.5,130.1 L203.5,131.7 L204.6,132.3 L202.3,135.0 L205.4,135.7 L211.0,139.3 L213.1,143.5 L211.7,143.5 L218.1,156.5 L217.6,158.2 L218.6,159.9 L222.0,159.5 L223.1,158.5 L222.5,156.9 L223.8,155.6 L226.1,160.0 L225.7,160.7 L226.6,159.8 L228.0,161.4 L228.6,160.7 L228.5,161.6 L229.5,160.8 L230.3,161.7 L229.8,162.8 L231.0,162.5 L230.0,163.9 L230.0,165.7 L231.0,166.2 L230.6,169.6 L233.4,170.9 L237.0,176.4 L235.8,177.3 L234.4,176.2 L232.8,177.8 L234.1,179.7 L236.3,179.8 L236.7,180.7 L237.5,180.0 L237.4,181.2 L238.9,182.5 L238.2,187.5 L239.4,188.9 L238.0,190.1 L236.6,187.8 L236.0,188.5 L234.6,187.6 L233.0,189.1 L234.1,190.1 L233.4,191.0 L228.9,193.1 L228.4,194.3 L229.8,193.4 L231.4,195.0 L230.3,199.0 L226.2,198.3 L225.1,195.1 L224.3,195.7 L224.5,197.5 L222.8,196.8 L223.4,197.5 L222.7,198.1 L219.4,196.5 L219.1,197.2 L220.8,198.2 L219.1,201.0 L219.4,203.3 L218.4,203.8 L220.5,205.7 L217.0,207.9 L216.0,207.6 L215.0,209.4 L210.6,209.5 L209.2,207.4 L207.6,207.0 L205.8,207.6 L205.6,209.2 L203.6,208.7 L202.1,209.6 L198.7,207.6 L195.7,211.2 L196.1,212.3 L195.2,211.9 L194.2,213.8 L194.6,215.1 L192.6,215.8Z",
		"labelX": 197.5,
		"labelY": 167.4
	},
	{
		"id": "rajasthan",
		"name": "Rajasthan",
		"path": "M168.0,413.9 L165.9,410.2 L164.8,410.1 L164.1,411.3 L162.6,410.5 L162.8,407.8 L160.3,407.0 L158.3,404.6 L156.2,405.8 L154.5,402.5 L153.2,402.9 L152.7,402.1 L151.6,403.5 L151.0,402.2 L149.1,402.3 L149.8,397.2 L147.6,396.3 L145.8,397.4 L145.7,394.8 L143.3,392.6 L141.7,392.3 L141.7,390.1 L143.4,388.0 L142.0,382.1 L138.5,385.6 L137.2,384.4 L137.9,383.0 L134.9,381.8 L134.0,380.4 L135.7,376.7 L136.7,376.9 L138.1,375.0 L136.4,375.4 L134.1,374.1 L134.3,371.1 L131.8,371.8 L130.7,374.4 L131.5,375.0 L129.7,376.2 L128.1,375.0 L124.4,375.1 L123.5,372.2 L119.3,370.7 L118.3,373.7 L117.1,373.7 L116.5,370.8 L115.0,370.9 L114.2,369.4 L112.5,369.8 L111.3,368.5 L114.1,367.4 L108.9,367.5 L106.7,366.3 L106.7,365.0 L105.8,364.8 L102.9,367.1 L101.0,365.7 L100.5,367.8 L99.2,367.3 L98.9,365.8 L95.1,366.9 L93.9,365.8 L90.4,365.7 L87.5,367.3 L86.6,366.3 L85.2,367.7 L80.3,365.9 L75.5,357.9 L74.1,351.5 L68.1,344.1 L67.9,334.8 L60.6,335.8 L57.3,334.6 L52.3,327.2 L51.9,323.3 L54.4,318.1 L54.2,308.7 L51.5,307.3 L44.6,307.5 L36.4,302.9 L35.5,300.9 L36.3,294.4 L38.3,289.5 L50.1,277.8 L53.9,269.3 L59.7,263.9 L65.0,263.5 L68.0,266.8 L68.2,269.1 L70.4,272.9 L73.8,273.4 L84.5,269.0 L95.0,268.2 L101.6,265.4 L102.6,260.2 L109.4,253.0 L112.6,243.4 L114.9,240.3 L130.2,232.1 L139.2,215.5 L142.5,203.5 L153.3,199.4 L158.2,195.3 L158.2,197.7 L156.2,200.0 L156.1,202.5 L173.3,203.3 L172.9,204.4 L174.3,205.8 L171.9,208.2 L172.0,209.6 L175.7,209.3 L174.6,215.3 L175.9,216.4 L175.0,218.6 L173.6,218.9 L175.4,222.7 L176.7,222.6 L176.9,221.3 L179.8,221.8 L182.1,220.3 L184.5,221.5 L185.2,224.1 L187.6,224.0 L188.6,225.7 L191.4,224.5 L192.6,225.6 L195.2,223.8 L195.1,225.6 L197.3,224.8 L197.5,227.0 L196.4,228.5 L197.3,228.9 L196.9,230.8 L198.3,230.9 L198.4,232.4 L200.5,232.6 L199.3,235.3 L201.7,245.0 L203.4,245.4 L203.7,247.1 L207.8,249.9 L207.6,251.5 L211.7,252.7 L216.4,259.3 L214.6,258.8 L212.1,261.2 L213.4,262.5 L214.3,261.4 L214.8,261.8 L213.0,263.2 L213.6,263.8 L212.7,264.1 L213.5,264.6 L212.9,266.1 L211.8,266.2 L213.2,266.9 L212.9,268.3 L215.2,268.8 L216.3,268.2 L218.6,270.1 L220.0,269.0 L218.4,266.7 L218.1,264.1 L219.7,263.1 L218.7,262.3 L221.1,262.0 L222.0,263.3 L223.1,263.2 L223.6,261.8 L222.0,261.0 L223.6,260.1 L221.8,258.4 L224.2,259.8 L226.8,259.3 L227.5,260.8 L226.1,261.2 L227.5,262.1 L226.3,262.6 L228.6,262.9 L228.6,265.0 L231.9,263.5 L231.7,261.1 L235.5,259.2 L235.9,257.4 L237.5,257.1 L240.2,259.6 L239.0,264.2 L239.2,269.2 L238.1,272.4 L238.9,273.4 L238.0,273.4 L238.6,274.7 L240.4,274.7 L241.1,272.1 L243.4,272.2 L241.8,271.0 L242.3,269.7 L244.7,271.0 L246.5,269.6 L247.6,270.7 L248.4,269.8 L249.3,270.3 L249.4,272.8 L250.4,273.2 L250.6,274.7 L249.8,276.1 L250.8,276.7 L250.4,278.6 L253.0,280.7 L253.1,282.7 L257.0,284.9 L258.0,284.4 L257.4,285.7 L259.7,288.8 L257.8,289.8 L257.4,291.2 L254.9,292.0 L255.5,292.9 L256.7,292.6 L256.5,293.8 L258.4,294.5 L259.7,293.4 L260.5,295.0 L261.9,294.3 L261.4,295.3 L252.8,299.0 L253.5,302.7 L254.7,302.1 L254.9,299.6 L255.5,300.4 L257.8,300.1 L260.8,298.6 L261.9,296.9 L265.6,298.4 L265.9,297.3 L268.8,297.7 L269.2,299.2 L269.8,297.6 L271.4,297.9 L271.7,296.4 L274.5,296.4 L275.8,297.3 L274.8,298.6 L273.8,298.4 L274.5,299.6 L273.0,300.3 L273.5,301.3 L271.3,301.2 L271.0,304.7 L268.4,304.1 L265.7,305.3 L265.3,306.6 L263.7,307.2 L263.5,308.6 L259.5,310.0 L255.5,312.9 L252.9,313.1 L253.2,314.3 L250.4,314.7 L246.8,318.3 L244.6,318.3 L243.7,319.7 L238.2,322.7 L235.9,327.0 L234.3,328.3 L231.5,328.3 L231.0,329.5 L230.1,329.4 L228.4,331.7 L228.4,333.6 L227.1,334.1 L229.3,342.5 L230.4,344.1 L234.8,345.7 L234.9,346.4 L238.3,346.1 L239.6,347.6 L243.3,345.6 L246.8,346.5 L247.3,344.6 L249.0,343.1 L251.1,343.4 L250.4,346.0 L251.4,346.2 L250.8,347.7 L252.7,350.0 L251.9,350.2 L252.1,352.5 L249.5,353.3 L248.4,352.3 L245.9,352.4 L244.4,353.8 L241.1,353.5 L237.2,355.6 L239.8,359.7 L235.8,361.3 L237.1,363.4 L239.9,363.0 L242.0,364.6 L243.0,368.8 L240.3,372.1 L238.9,371.3 L238.8,369.6 L236.2,369.9 L237.2,371.9 L236.9,375.8 L239.7,379.8 L238.5,382.0 L235.8,382.3 L234.5,380.8 L233.1,380.8 L232.3,380.2 L232.8,377.4 L230.0,378.5 L229.7,380.5 L228.4,381.1 L226.7,379.0 L225.2,379.7 L222.8,378.3 L221.6,379.5 L219.8,379.5 L218.9,376.0 L217.2,380.1 L217.6,383.1 L212.8,385.2 L213.2,388.0 L207.8,390.3 L205.7,388.8 L206.4,390.2 L205.3,391.4 L205.2,393.1 L204.3,391.9 L202.4,391.9 L201.8,390.1 L199.0,388.3 L200.6,384.5 L202.5,386.2 L204.8,384.9 L205.7,386.9 L207.4,386.0 L207.8,384.1 L209.3,383.7 L209.4,382.6 L206.8,381.8 L207.7,379.3 L209.1,378.6 L206.4,373.8 L208.1,371.7 L209.7,373.4 L211.4,372.3 L211.6,368.8 L209.2,367.5 L209.5,364.0 L207.3,363.0 L203.3,365.3 L202.4,364.2 L198.9,365.1 L192.4,364.2 L191.6,362.9 L193.4,360.8 L192.2,358.6 L193.3,359.0 L192.7,360.1 L194.1,360.3 L194.9,361.5 L197.9,360.0 L198.1,359.1 L195.0,359.8 L193.6,359.2 L194.5,358.2 L194.0,356.6 L195.1,358.9 L196.0,354.6 L190.8,354.5 L191.0,356.1 L189.7,356.9 L189.7,359.2 L187.7,360.1 L184.3,359.1 L182.3,356.7 L181.7,358.0 L182.4,362.1 L182.6,361.5 L186.7,362.0 L187.0,363.3 L184.9,366.1 L183.6,366.3 L181.0,362.0 L180.3,365.3 L181.5,365.8 L178.6,370.6 L182.6,371.9 L179.7,377.5 L183.6,378.1 L183.2,379.6 L186.3,385.1 L183.9,389.7 L184.9,393.9 L184.0,395.4 L184.8,397.0 L182.3,399.3 L175.9,402.1 L173.3,406.0 L174.3,407.4 L178.3,407.7 L178.9,408.6 L178.1,409.2 L179.5,409.5 L177.4,409.8 L173.1,413.2 L169.8,412.5 L168.0,413.9Z",
		"labelX": 155.6,
		"labelY": 304.6
	},
	{
		"id": "sikkim",
		"name": "Sikkim",
		"path": "M554.1,292.5 L550.6,291.0 L546.0,291.4 L544.7,290.6 L544.4,288.8 L542.8,288.2 L544.2,284.6 L543.7,282.5 L544.6,281.8 L543.6,279.7 L547.8,270.6 L547.1,269.7 L547.7,268.6 L545.4,266.7 L546.0,265.3 L549.0,265.7 L551.6,264.5 L553.1,264.7 L555.7,262.6 L557.0,262.9 L559.3,260.0 L560.6,261.8 L562.9,261.8 L565.0,263.6 L565.2,266.2 L566.4,267.4 L565.5,274.4 L563.3,277.6 L564.5,282.5 L567.6,284.9 L566.9,286.5 L564.2,287.4 L562.5,290.7 L561.2,289.5 L557.6,289.2 L554.1,292.5Z",
		"labelX": 555.2,
		"labelY": 276.3
	},
	{
		"id": "tamil-nadu",
		"name": "Tamil Nadu",
		"path": "M308.0,811.2 L301.6,807.8 L304.8,806.6 L304.9,808.3 L308.0,811.2ZM256.3,841.1 L249.9,839.9 L243.7,835.0 L245.6,834.6 L244.9,832.8 L247.0,831.2 L246.3,829.6 L248.0,829.4 L248.5,828.4 L245.5,822.9 L247.1,821.8 L247.8,819.3 L244.9,815.3 L248.1,811.6 L248.5,807.5 L252.1,801.8 L250.8,801.0 L250.6,799.1 L250.1,800.0 L249.6,799.1 L248.2,799.9 L245.4,798.8 L247.6,793.7 L246.8,790.8 L248.4,788.8 L246.4,785.2 L248.3,784.5 L248.9,782.1 L248.0,781.7 L247.3,778.4 L245.7,778.2 L240.4,782.0 L236.3,779.6 L236.6,771.6 L235.9,770.4 L237.7,770.3 L237.3,769.0 L238.4,766.4 L236.2,763.9 L231.6,762.1 L233.2,759.1 L235.6,758.8 L234.0,758.7 L234.1,756.6 L232.8,756.0 L233.7,754.2 L232.9,753.5 L230.9,754.8 L226.3,755.0 L226.1,753.6 L228.6,751.8 L228.6,750.2 L226.1,749.4 L225.1,747.9 L220.4,747.2 L220.0,744.2 L221.3,743.4 L222.0,744.2 L223.4,743.7 L227.7,740.5 L229.2,743.0 L234.3,743.0 L236.8,744.0 L236.5,742.0 L238.5,738.1 L240.1,738.6 L241.4,737.6 L244.2,740.1 L244.0,738.7 L247.9,737.6 L252.7,739.0 L254.5,734.0 L259.4,733.8 L262.2,729.0 L260.9,727.3 L254.4,726.7 L253.9,725.2 L257.8,722.0 L258.3,718.7 L257.0,718.9 L257.8,718.1 L256.8,716.4 L257.4,713.6 L261.3,713.5 L263.1,710.0 L262.7,708.7 L263.8,708.0 L266.5,707.5 L266.2,709.1 L267.1,708.3 L268.1,709.8 L269.9,708.5 L271.9,710.5 L274.6,711.0 L273.8,713.0 L275.8,712.7 L278.7,714.9 L281.1,714.9 L281.1,713.5 L282.6,712.5 L281.9,711.5 L283.6,712.9 L283.5,711.2 L286.3,706.3 L285.4,704.6 L286.4,703.5 L287.6,703.9 L287.8,702.5 L292.6,701.6 L292.7,703.5 L293.9,703.5 L293.1,703.0 L293.6,702.1 L295.4,701.9 L297.9,703.6 L300.2,703.8 L301.9,700.2 L303.3,700.1 L304.4,701.3 L305.7,700.4 L305.5,699.5 L307.6,698.8 L307.6,696.1 L306.2,695.5 L307.7,694.9 L310.6,695.3 L311.9,697.1 L314.3,696.1 L314.8,698.2 L315.8,697.8 L316.3,698.6 L317.5,697.8 L315.7,696.4 L321.3,694.6 L322.3,691.3 L324.3,690.4 L323.2,689.1 L325.2,688.9 L327.5,690.6 L329.6,690.6 L331.9,693.6 L332.3,691.6 L332.8,696.4 L331.7,698.0 L332.5,697.4 L330.6,703.7 L330.1,709.5 L329.7,708.3 L330.3,710.2 L328.4,715.9 L327.9,715.2 L327.6,719.0 L324.7,722.9 L324.9,721.8 L323.8,722.5 L325.1,722.2 L323.6,724.9 L321.8,725.9 L323.5,725.0 L318.9,733.7 L317.9,733.1 L316.1,734.7 L315.6,733.0 L316.5,732.5 L315.3,732.7 L314.6,731.5 L313.6,732.3 L315.1,732.8 L314.5,733.8 L315.8,735.1 L314.9,735.5 L314.7,734.7 L314.0,735.8 L315.0,735.6 L315.9,736.8 L316.5,736.0 L316.6,737.0 L317.4,736.5 L317.9,737.4 L316.7,744.3 L318.9,750.0 L319.1,753.2 L318.0,753.4 L319.2,753.2 L319.4,760.6 L316.0,760.4 L316.4,761.6 L315.2,761.3 L315.2,762.3 L318.1,763.7 L318.2,765.2 L319.3,765.2 L320.1,779.4 L316.3,780.2 L317.3,779.4 L313.4,779.0 L313.2,777.7 L312.8,779.0 L311.1,779.2 L316.0,780.2 L310.4,779.3 L312.1,778.6 L310.9,778.2 L310.4,779.0 L308.5,778.3 L309.9,779.3 L306.5,779.0 L303.8,780.8 L302.2,783.8 L303.3,786.8 L295.5,796.4 L293.2,802.0 L296.9,806.8 L301.2,807.8 L291.5,808.8 L291.4,808.1 L288.3,810.3 L286.6,810.3 L286.6,811.2 L284.4,811.9 L281.9,812.0 L282.0,811.4 L275.7,815.1 L273.2,818.9 L272.9,821.9 L274.0,821.4 L274.9,822.5 L273.3,822.6 L271.5,825.2 L271.2,827.2 L272.3,826.9 L271.4,826.9 L272.1,825.6 L272.4,827.0 L272.2,829.5 L270.4,831.6 L270.4,833.0 L263.2,836.4 L261.7,838.4 L257.0,839.5 L256.3,841.1Z",
		"labelX": 276.4,
		"labelY": 765
	},
	{
		"id": "tripura",
		"name": "Tripura",
		"path": "M641.4,417.5 L639.4,416.0 L638.4,410.4 L637.4,410.2 L637.7,409.5 L635.9,407.5 L635.1,410.5 L636.0,414.0 L634.2,413.0 L632.6,406.2 L633.3,405.0 L632.5,405.2 L631.4,401.2 L629.0,398.0 L628.8,395.8 L629.9,396.5 L630.2,395.3 L628.7,395.2 L628.8,393.8 L630.6,393.7 L631.5,390.8 L630.9,388.1 L632.0,388.2 L632.2,386.5 L634.8,386.6 L634.7,382.7 L640.7,383.6 L641.9,382.7 L642.7,379.0 L643.4,381.2 L645.3,381.7 L644.8,378.5 L646.7,379.7 L647.6,379.1 L649.1,381.8 L650.2,377.9 L649.6,375.9 L650.6,375.3 L651.7,376.3 L651.1,374.3 L655.2,374.3 L656.5,373.0 L656.5,369.9 L658.2,370.9 L659.3,374.3 L657.6,378.5 L659.9,378.4 L660.8,380.2 L660.6,389.9 L659.3,390.5 L659.1,394.1 L657.9,396.2 L656.7,393.6 L653.8,396.6 L650.7,394.1 L650.2,395.5 L651.1,401.4 L647.6,403.9 L645.5,408.0 L647.3,413.0 L644.3,416.1 L642.3,416.0 L641.4,417.5Z",
		"labelX": 644.8,
		"labelY": 393.7
	},
	{
		"id": "uttar-pradesh",
		"name": "Uttar Pradesh",
		"path": "M404.2,389.8 L400.0,386.9 L399.9,385.8 L398.5,385.6 L399.1,383.6 L397.5,383.5 L396.1,381.9 L396.4,381.2 L397.8,381.8 L399.0,377.2 L398.9,374.8 L397.4,374.4 L398.2,371.0 L397.6,369.3 L400.0,369.4 L399.0,366.6 L397.1,366.6 L396.1,364.9 L392.6,366.4 L389.9,364.7 L389.1,365.4 L389.3,368.0 L386.1,367.5 L386.2,365.8 L384.4,365.8 L384.8,362.6 L383.5,363.4 L383.9,364.1 L382.8,363.7 L383.8,362.5 L383.0,361.8 L383.4,361.2 L381.2,362.1 L378.2,360.4 L377.0,361.0 L375.3,359.1 L375.3,355.6 L372.3,355.6 L369.4,354.6 L368.7,353.5 L367.3,354.0 L368.0,352.8 L367.6,352.2 L367.2,352.8 L367.7,351.1 L366.5,350.1 L364.6,350.3 L365.2,350.9 L363.6,351.8 L364.6,352.6 L364.0,353.6 L361.7,352.6 L362.7,352.5 L362.5,351.8 L361.4,352.2 L359.7,350.7 L359.3,352.4 L359.1,350.9 L358.1,350.8 L357.9,353.8 L356.2,356.0 L356.5,357.9 L355.1,357.1 L354.3,359.1 L352.8,357.3 L349.5,358.1 L349.0,356.7 L348.0,357.7 L345.3,357.6 L345.0,356.7 L346.6,355.9 L346.0,354.7 L348.1,351.0 L347.4,350.0 L346.2,350.1 L346.0,352.5 L345.2,351.5 L342.5,351.7 L344.6,354.0 L341.8,354.2 L341.9,353.4 L339.8,352.7 L340.7,352.2 L339.6,351.2 L340.0,353.7 L336.4,352.8 L336.9,354.5 L335.4,353.4 L333.4,354.1 L333.8,355.6 L331.0,355.2 L333.0,351.5 L334.9,350.6 L334.3,348.5 L331.7,347.1 L331.8,344.2 L330.3,342.9 L330.1,343.6 L328.7,343.3 L326.7,345.6 L323.9,345.5 L323.3,347.8 L319.2,348.6 L319.4,352.9 L316.4,351.5 L312.3,351.9 L311.5,350.5 L309.4,353.4 L308.6,353.0 L308.8,351.8 L306.9,352.4 L306.5,350.7 L309.4,347.7 L307.3,348.0 L306.0,347.0 L305.6,347.9 L305.4,345.8 L304.0,345.6 L303.1,347.7 L305.3,347.6 L305.5,349.4 L303.5,348.4 L304.3,351.8 L303.1,352.2 L302.4,351.0 L301.8,351.4 L302.5,352.4 L301.0,351.3 L300.9,352.3 L299.5,352.5 L298.3,350.1 L296.6,351.5 L297.5,349.1 L296.1,347.5 L295.2,348.5 L295.9,350.0 L294.6,349.2 L292.5,350.9 L292.6,348.1 L295.2,347.3 L294.7,345.3 L292.6,345.5 L291.6,348.9 L290.8,346.8 L290.0,346.9 L292.5,344.2 L294.6,343.8 L293.0,344.5 L294.0,345.2 L295.4,344.5 L294.9,342.6 L293.3,342.4 L294.2,341.4 L294.1,338.9 L292.5,339.0 L292.6,340.0 L291.3,340.4 L292.1,341.7 L291.4,342.8 L291.3,341.8 L288.6,340.7 L289.3,342.8 L290.9,342.9 L288.9,343.4 L289.5,345.0 L286.6,344.1 L286.6,343.2 L287.8,342.9 L286.5,342.4 L285.8,343.6 L284.0,343.9 L284.4,345.2 L283.0,344.9 L283.0,346.6 L282.1,346.1 L280.3,347.1 L284.2,348.1 L284.9,352.9 L286.2,354.0 L285.6,356.9 L286.9,358.8 L289.5,360.1 L290.0,361.5 L289.1,367.8 L292.7,366.7 L295.1,371.0 L293.6,370.9 L293.5,371.9 L295.5,372.7 L295.1,375.3 L292.7,379.3 L290.3,380.6 L289.4,378.2 L286.9,378.6 L284.4,375.2 L282.4,374.1 L279.7,377.6 L278.0,376.8 L277.5,375.9 L278.5,374.4 L275.9,372.5 L274.5,370.0 L275.7,369.2 L276.0,365.9 L273.1,360.2 L277.6,355.9 L277.6,353.2 L280.7,352.0 L280.1,351.2 L280.8,350.8 L279.2,350.0 L276.7,344.5 L278.1,342.1 L280.1,341.4 L280.4,338.8 L284.5,338.8 L285.3,338.0 L286.4,338.8 L290.6,337.0 L290.8,335.5 L289.0,333.2 L291.1,331.7 L290.8,330.7 L292.2,331.7 L291.8,329.8 L292.8,329.5 L294.5,324.4 L296.1,323.1 L294.4,321.3 L296.0,320.8 L295.4,319.6 L296.4,319.5 L296.4,318.5 L297.7,318.0 L297.0,317.4 L299.4,315.9 L299.6,315.0 L298.1,314.4 L299.4,312.0 L297.3,311.6 L297.6,310.2 L295.4,308.0 L295.8,304.6 L294.3,305.3 L294.6,304.3 L292.3,304.0 L290.8,302.2 L288.2,301.1 L284.1,302.4 L279.3,300.3 L278.2,298.8 L276.3,299.1 L275.7,300.5 L274.3,300.0 L273.8,298.4 L274.8,298.6 L275.8,297.3 L274.5,296.4 L271.7,296.4 L271.4,297.9 L269.8,297.6 L269.2,299.2 L268.8,297.7 L265.9,297.3 L265.6,298.4 L261.9,296.9 L260.8,298.6 L257.8,300.1 L255.5,300.4 L254.9,299.6 L254.4,302.5 L253.0,302.0 L252.8,299.0 L261.4,295.3 L261.9,294.3 L261.1,294.0 L260.8,295.0 L259.8,293.4 L258.4,294.5 L256.5,293.8 L256.7,292.6 L255.3,292.8 L255.0,291.9 L257.4,291.2 L257.8,289.8 L259.7,288.8 L257.4,285.7 L258.0,284.4 L257.0,284.9 L253.1,282.7 L253.0,280.7 L250.4,278.6 L250.8,276.7 L249.8,276.1 L250.4,273.5 L249.4,272.8 L249.6,270.7 L248.8,270.1 L250.5,268.5 L252.5,268.5 L252.5,267.3 L253.8,267.7 L254.3,266.0 L255.9,265.7 L254.1,261.4 L254.8,259.2 L256.1,258.5 L254.7,258.4 L254.6,257.5 L255.4,257.8 L256.0,256.4 L254.0,255.7 L254.8,254.6 L253.9,253.6 L254.8,253.0 L254.2,251.3 L249.3,246.7 L250.4,245.2 L250.1,241.8 L249.0,242.0 L246.6,239.1 L247.2,238.1 L246.1,236.5 L247.3,236.0 L246.4,234.4 L247.1,232.8 L244.6,229.7 L245.4,222.4 L244.5,221.8 L245.3,220.7 L243.6,214.1 L244.8,212.2 L244.4,208.7 L245.4,208.0 L246.4,204.0 L248.6,200.0 L252.6,198.1 L252.8,196.2 L256.8,191.7 L257.4,189.8 L256.6,188.7 L258.6,188.5 L260.7,190.8 L266.7,193.7 L264.2,198.0 L262.8,198.4 L260.5,205.0 L262.9,211.6 L263.9,212.0 L267.0,210.5 L268.0,212.8 L267.2,214.4 L268.2,214.5 L268.3,215.8 L269.6,215.6 L272.4,211.7 L274.9,210.9 L277.7,208.0 L281.9,209.7 L282.8,212.9 L284.4,214.7 L287.6,217.0 L293.9,218.7 L292.4,220.7 L290.7,221.0 L290.2,222.6 L289.3,222.0 L288.1,223.0 L290.5,224.9 L291.9,224.8 L293.2,228.2 L294.9,227.7 L296.4,229.3 L296.7,227.6 L299.6,228.9 L300.3,232.2 L301.6,232.1 L304.2,234.4 L305.8,233.9 L307.0,235.1 L307.2,237.5 L309.9,237.2 L310.7,236.3 L311.1,237.8 L312.8,237.1 L314.2,237.7 L317.2,236.3 L318.1,237.3 L317.4,239.0 L319.3,237.8 L319.9,238.6 L319.0,238.9 L320.6,239.2 L321.2,241.3 L322.5,241.9 L324.3,240.4 L324.9,238.1 L326.6,238.3 L330.6,240.8 L333.6,244.6 L335.7,244.6 L337.6,247.0 L337.2,243.4 L339.0,242.7 L339.5,244.0 L341.7,244.2 L342.3,245.9 L344.4,246.5 L345.0,247.8 L348.3,248.7 L348.5,249.9 L350.2,250.0 L350.2,250.6 L351.2,250.1 L351.6,251.7 L356.5,252.9 L357.1,255.1 L359.5,258.0 L359.5,260.0 L360.9,259.7 L361.0,258.6 L362.9,259.1 L363.9,261.6 L370.0,264.5 L375.0,268.5 L376.1,268.5 L377.3,266.3 L380.0,266.5 L390.4,274.1 L397.5,272.7 L398.8,276.9 L398.3,279.5 L403.6,279.5 L406.4,281.2 L410.7,281.0 L414.2,284.8 L416.7,282.3 L416.2,280.2 L422.3,280.5 L428.3,283.6 L429.0,284.2 L428.2,285.1 L430.5,285.0 L430.0,287.0 L432.4,289.4 L431.2,292.1 L433.4,292.0 L432.6,292.9 L433.9,293.6 L433.5,296.7 L434.2,298.3 L436.7,298.4 L436.4,299.4 L437.4,300.0 L439.4,299.2 L439.2,303.0 L441.0,302.5 L441.7,304.7 L443.8,305.1 L444.2,306.4 L440.3,307.3 L435.1,305.9 L434.1,309.0 L431.8,310.0 L430.1,309.7 L430.2,311.8 L433.1,311.9 L434.8,313.8 L437.5,314.1 L437.2,318.1 L435.9,317.6 L435.0,318.8 L433.1,318.2 L432.9,320.1 L434.2,322.5 L437.4,324.8 L437.4,325.8 L438.3,325.5 L440.9,327.2 L442.4,326.8 L444.4,328.8 L447.3,329.3 L447.2,330.6 L449.8,331.8 L449.3,332.8 L450.1,333.8 L448.0,333.6 L447.9,335.2 L447.5,333.9 L447.2,335.2 L446.2,335.3 L445.1,334.2 L443.8,334.7 L443.2,333.2 L441.9,333.3 L441.5,335.5 L440.6,335.8 L438.4,335.6 L436.9,333.7 L435.4,334.1 L434.9,336.6 L430.6,339.0 L428.8,341.5 L427.6,341.8 L428.4,342.7 L426.3,344.1 L424.5,343.9 L422.5,345.9 L420.2,346.3 L415.0,349.9 L415.2,352.1 L414.1,355.1 L414.9,355.6 L415.1,359.8 L416.0,362.4 L418.6,363.8 L419.1,366.4 L420.3,367.2 L419.1,370.1 L416.2,370.9 L416.4,373.7 L417.8,375.0 L415.7,376.5 L416.5,378.0 L413.0,385.3 L408.9,389.2 L404.2,389.8Z",
		"labelX": 346.8,
		"labelY": 289.1
	},
	{
		"id": "uttarakhand",
		"name": "Uttaranchal",
		"path": "M322.5,241.9 L321.2,241.3 L320.6,239.2 L319.0,238.9 L319.9,238.6 L319.3,237.8 L317.4,239.0 L318.1,237.3 L317.2,236.3 L314.2,237.7 L312.8,237.1 L311.1,237.8 L310.7,236.3 L309.9,237.2 L307.2,237.5 L307.0,235.1 L305.8,233.9 L304.2,234.4 L301.6,232.1 L300.3,232.2 L299.6,228.9 L296.7,227.6 L296.4,229.3 L294.9,227.7 L293.2,228.2 L291.9,224.8 L290.5,224.9 L288.1,223.0 L289.3,222.0 L290.2,222.6 L290.7,221.0 L292.4,220.7 L293.9,218.7 L290.1,218.0 L285.2,215.3 L283.0,213.4 L281.6,209.5 L277.7,208.0 L274.9,210.9 L272.4,211.7 L269.6,215.6 L268.3,215.8 L268.2,214.5 L267.2,214.4 L268.0,212.8 L267.0,210.5 L263.7,212.0 L262.0,210.6 L262.2,208.3 L260.4,205.6 L261.2,201.9 L262.8,198.4 L264.2,198.0 L266.7,193.7 L260.7,190.8 L258.6,188.5 L256.6,188.5 L263.4,184.6 L261.2,182.5 L262.6,181.9 L262.6,180.5 L260.1,177.1 L261.6,175.2 L261.6,173.5 L262.8,174.3 L263.0,172.2 L261.6,172.2 L261.3,171.0 L262.1,170.5 L263.6,171.2 L263.1,167.8 L265.5,164.8 L267.4,164.0 L269.0,164.8 L269.4,163.8 L278.4,160.4 L281.5,163.2 L284.9,162.2 L286.3,163.5 L290.4,163.2 L292.5,166.3 L295.9,166.1 L293.4,161.5 L293.9,159.1 L295.7,158.2 L297.5,154.6 L302.0,159.0 L303.8,164.3 L306.4,166.0 L307.3,168.6 L309.7,168.5 L310.5,170.6 L312.0,171.6 L316.3,169.5 L319.4,170.4 L321.0,173.2 L324.6,174.7 L326.2,176.8 L327.6,175.7 L329.5,177.3 L329.4,179.4 L328.3,180.3 L329.2,183.2 L334.3,184.7 L337.8,187.1 L339.3,186.1 L345.5,191.4 L351.1,193.3 L351.2,194.0 L348.0,194.8 L347.0,196.2 L347.4,197.5 L344.2,200.0 L343.6,201.5 L339.6,203.1 L337.0,207.9 L335.3,207.7 L333.5,209.4 L334.9,212.9 L334.6,214.3 L332.8,215.6 L333.0,216.7 L331.2,218.0 L331.7,218.8 L330.0,219.0 L332.1,223.1 L331.5,226.5 L330.2,226.1 L330.8,228.5 L329.8,229.3 L328.4,228.7 L327.3,229.7 L327.1,232.7 L325.0,235.6 L325.3,238.3 L322.5,241.9Z",
		"labelX": 303.9,
		"labelY": 198.2
	},
	{
		"id": "west-bengal",
		"name": "West Bengal",
		"path": "M566.3,458.7 L565.2,458.4 L565.1,457.0 L566.8,457.9 L566.3,458.7ZM557.4,458.3 L557.5,457.1 L556.3,457.2 L556.7,455.6 L558.4,457.0 L557.4,458.3ZM563.0,457.9 L562.3,456.0 L563.4,455.6 L564.1,457.5 L563.0,457.9ZM569.7,457.2 L568.4,454.2 L569.3,454.1 L569.4,455.7 L570.3,455.7 L570.7,456.8 L569.7,457.2ZM550.9,457.0 L550.6,454.0 L552.1,455.8 L550.9,457.0ZM554.4,456.8 L553.8,454.8 L554.7,454.0 L554.4,456.8ZM548.1,457.2 L547.3,454.7 L547.9,453.6 L548.6,455.9 L548.1,457.2ZM571.2,456.7 L569.9,454.1 L571.3,453.6 L572.3,455.8 L571.2,456.7ZM557.3,456.1 L556.5,454.0 L557.2,453.2 L558.5,454.5 L557.2,453.6 L558.0,454.4 L557.4,454.2 L557.3,456.1ZM567.5,456.3 L566.2,454.4 L566.5,452.9 L568.0,454.4 L567.5,456.3ZM553.3,457.3 L552.7,454.8 L553.4,453.8 L552.4,453.5 L553.1,452.7 L554.1,456.4 L553.3,457.3ZM549.7,458.5 L548.2,456.7 L548.7,455.2 L547.8,454.8 L548.3,452.4 L549.8,452.7 L550.8,455.1 L550.7,457.8 L549.7,458.5ZM565.4,456.6 L564.4,456.1 L564.6,454.0 L563.2,454.2 L565.1,452.3 L566.0,452.5 L565.4,456.6ZM554.2,454.1 L553.9,452.3 L555.2,451.5 L554.2,454.1ZM562.8,455.5 L561.3,453.0 L561.8,451.1 L563.5,453.6 L562.4,453.7 L562.8,455.5ZM556.7,453.7 L556.1,452.6 L557.0,451.6 L556.1,452.2 L557.3,451.0 L558.0,453.2 L556.7,453.7ZM551.0,454.0 L550.8,451.5 L550.4,452.1 L549.4,451.2 L551.5,449.5 L552.7,452.2 L551.0,454.0ZM567.3,453.5 L565.2,451.9 L565.7,449.4 L567.3,453.5ZM545.5,456.5 L543.3,455.0 L546.0,449.0 L547.0,452.9 L546.5,455.7 L545.5,456.5ZM564.1,451.6 L563.3,450.5 L563.9,449.0 L565.0,449.5 L564.1,451.6ZM568.9,452.1 L568.1,451.7 L569.0,451.2 L568.3,450.2 L569.1,448.6 L570.5,450.3 L568.9,452.1ZM559.8,451.8 L558.6,449.7 L559.3,448.4 L560.2,449.3 L559.8,451.8ZM554.9,451.6 L553.3,451.4 L553.8,448.3 L555.5,448.8 L554.9,451.6ZM563.0,451.9 L561.4,450.2 L562.0,448.2 L563.7,449.6 L563.0,451.9ZM566.7,451.0 L564.8,447.5 L569.0,448.5 L568.5,449.7 L568.1,448.9 L568.2,450.1 L567.1,449.0 L568.0,449.9 L566.7,451.0ZM563.9,449.4 L562.1,447.5 L564.2,447.8 L563.9,449.4ZM560.9,447.1 L559.5,446.7 L560.2,444.9 L561.9,445.4 L560.9,447.1ZM543.6,448.0 L544.3,445.6 L546.2,444.6 L543.6,448.0ZM565.8,447.8 L562.9,446.7 L562.9,445.9 L564.2,446.3 L562.9,445.8 L563.2,445.0 L567.0,445.1 L567.1,447.5 L565.8,447.8ZM570.6,447.6 L569.7,446.8 L570.6,445.4 L569.5,446.2 L569.7,445.2 L568.8,445.0 L570.1,443.6 L571.8,445.8 L570.6,447.6ZM563.7,444.0 L562.8,443.7 L564.1,442.2 L565.2,443.5 L563.9,443.3 L563.7,444.0ZM566.4,442.9 L565.0,441.7 L565.6,440.4 L567.6,442.2 L566.4,442.9ZM570.0,448.3 L568.8,447.8 L569.0,447.0 L567.9,447.3 L567.3,445.6 L567.0,443.5 L568.0,441.6 L566.8,440.5 L568.1,439.8 L569.3,441.4 L567.6,444.7 L568.2,445.4 L568.0,443.6 L569.0,444.3 L570.0,448.3ZM569.1,444.2 L569.6,441.4 L568.9,439.7 L569.8,439.5 L571.1,441.6 L570.1,442.1 L570.7,443.8 L570.3,443.1 L570.4,443.9 L569.1,444.2ZM562.0,445.3 L560.5,444.7 L559.7,442.3 L561.1,439.3 L563.9,440.4 L561.0,443.0 L562.4,444.5 L562.0,445.3ZM562.3,443.8 L561.5,443.1 L562.7,441.5 L565.8,439.4 L565.7,441.2 L562.3,443.8ZM565.1,440.5 L562.8,439.6 L564.4,437.1 L564.9,438.3 L564.2,438.8 L565.1,440.5ZM567.4,440.5 L566.2,440.4 L566.5,439.2 L565.3,439.1 L566.3,438.0 L565.3,439.1 L566.5,439.5 L564.4,439.2 L564.7,434.8 L566.1,434.9 L567.9,436.6 L568.4,438.8 L567.3,438.9 L565.4,436.9 L566.6,437.6 L567.4,440.5ZM571.4,441.6 L568.2,437.9 L568.8,433.4 L569.2,435.8 L570.3,436.6 L569.5,437.0 L571.5,439.6 L571.6,441.1 L572.3,440.8 L571.4,441.6ZM566.9,434.6 L565.4,430.4 L566.6,429.0 L567.5,433.6 L566.9,434.6ZM568.1,436.3 L566.8,434.2 L567.8,433.9 L566.8,431.6 L567.4,428.7 L568.6,429.2 L569.5,431.6 L568.5,434.6 L568.0,433.1 L568.1,436.3ZM528.1,457.0 L527.1,452.5 L525.1,452.5 L522.1,450.9 L521.4,446.8 L519.5,446.2 L519.3,447.5 L517.5,448.1 L517.5,449.5 L515.8,449.4 L514.9,448.2 L515.9,445.7 L515.4,444.2 L513.8,443.0 L510.3,442.6 L509.2,440.9 L507.1,441.2 L507.3,439.1 L509.5,439.1 L509.2,437.7 L509.5,438.3 L509.8,437.6 L511.8,438.0 L511.8,436.7 L510.3,435.8 L510.7,433.7 L508.4,432.9 L508.0,431.4 L509.4,430.7 L508.4,428.5 L505.4,428.4 L504.5,425.5 L502.3,424.1 L501.4,424.7 L499.0,422.4 L500.2,418.9 L499.4,418.1 L501.8,417.5 L502.4,416.2 L498.3,416.6 L495.7,415.4 L493.4,416.0 L488.6,411.5 L485.2,411.9 L483.0,410.0 L482.8,408.0 L484.2,406.2 L483.9,404.9 L484.7,404.8 L483.7,402.4 L484.1,401.6 L486.0,402.3 L488.9,401.1 L487.9,399.4 L488.8,398.4 L491.5,398.9 L491.5,401.7 L494.1,401.8 L494.2,403.3 L495.2,402.7 L495.8,403.3 L497.7,401.4 L497.4,399.6 L499.6,397.0 L502.0,397.1 L506.6,395.1 L509.2,395.3 L510.0,393.1 L509.3,391.0 L510.0,391.6 L511.4,390.6 L511.7,391.5 L512.1,389.5 L518.3,392.1 L519.5,391.4 L518.5,389.9 L521.4,390.4 L520.9,391.0 L521.6,391.2 L521.7,388.7 L522.3,389.8 L523.0,389.0 L521.4,384.7 L527.5,386.5 L526.8,385.7 L528.9,384.8 L528.4,382.5 L530.7,383.4 L531.6,382.1 L530.5,381.3 L533.8,381.5 L532.3,378.7 L535.6,376.8 L537.1,373.8 L536.4,373.5 L537.5,371.1 L536.7,371.2 L537.0,369.6 L536.0,368.5 L538.2,369.4 L539.8,368.1 L538.8,367.6 L539.9,366.2 L539.2,365.7 L539.6,364.3 L537.3,362.9 L537.9,362.3 L538.3,363.0 L539.3,360.3 L541.6,359.0 L538.9,355.0 L536.1,352.9 L536.5,349.2 L537.8,349.9 L537.5,348.8 L538.4,347.5 L536.4,345.8 L535.7,343.5 L540.2,339.7 L543.1,341.2 L544.2,341.3 L544.3,340.6 L542.9,338.1 L543.6,335.0 L539.5,332.6 L539.9,331.2 L539.1,330.8 L539.9,330.1 L537.5,329.5 L536.9,328.0 L538.0,324.2 L539.9,322.8 L541.4,323.1 L541.3,320.9 L542.7,321.3 L544.2,320.2 L550.3,314.8 L548.8,314.1 L549.6,312.7 L547.2,310.6 L548.6,308.7 L546.3,310.0 L545.2,309.2 L547.5,302.0 L545.7,296.5 L546.1,295.4 L543.4,293.9 L542.1,291.7 L542.7,288.3 L544.0,288.5 L544.7,290.6 L546.5,291.5 L547.2,290.8 L550.6,291.0 L554.1,292.5 L556.8,290.4 L556.6,289.5 L561.0,289.4 L562.1,290.7 L566.1,291.6 L566.3,296.5 L567.5,295.1 L568.6,297.3 L570.4,296.8 L572.1,298.2 L573.3,300.9 L576.7,300.6 L580.0,299.1 L582.2,300.9 L585.0,300.6 L587.3,301.7 L587.0,303.6 L590.4,303.1 L590.9,304.2 L593.1,304.1 L593.5,311.5 L592.3,313.5 L593.1,313.8 L591.1,314.8 L590.4,316.7 L589.3,316.2 L589.9,317.3 L589.0,317.3 L589.6,318.3 L588.8,318.9 L589.7,319.1 L588.7,319.8 L589.8,320.2 L589.1,320.9 L588.4,320.6 L589.0,320.3 L588.3,318.4 L587.1,318.6 L587.5,319.8 L586.9,319.9 L587.8,320.2 L586.0,320.8 L587.0,321.9 L586.0,322.5 L587.0,322.3 L587.5,323.7 L586.3,323.6 L585.8,326.3 L584.9,326.6 L584.8,325.5 L582.5,325.6 L581.4,324.2 L580.6,325.3 L579.3,325.2 L576.8,323.6 L577.1,322.8 L576.0,321.8 L574.3,321.5 L572.6,316.9 L573.6,315.8 L572.2,315.7 L572.2,313.4 L570.8,313.4 L568.7,311.4 L567.2,313.0 L567.5,314.3 L568.7,314.4 L568.7,315.4 L569.4,314.8 L569.5,316.3 L571.5,316.6 L571.6,317.8 L568.9,318.2 L567.9,316.8 L566.6,316.7 L566.5,318.3 L565.5,318.4 L564.8,316.4 L563.2,316.4 L562.8,314.8 L561.6,315.4 L561.5,313.7 L559.4,312.3 L559.3,311.2 L557.6,311.6 L557.7,310.6 L556.7,310.9 L555.6,309.0 L554.2,308.9 L553.7,306.2 L552.6,307.4 L551.5,310.9 L552.0,311.9 L552.4,310.7 L555.5,311.5 L556.7,314.6 L554.8,314.2 L551.9,317.0 L552.0,318.8 L547.2,321.1 L546.7,323.2 L547.4,324.8 L546.2,325.2 L544.7,328.2 L545.5,331.7 L546.5,332.4 L549.7,331.4 L553.4,335.6 L554.8,335.9 L554.5,337.8 L556.0,338.3 L557.2,340.5 L559.0,340.3 L561.4,341.7 L561.8,340.8 L563.4,341.0 L563.2,340.1 L564.5,340.1 L565.4,344.9 L567.6,346.7 L570.0,347.0 L568.5,348.0 L567.6,350.8 L565.4,349.5 L564.3,350.7 L561.7,349.5 L557.8,350.5 L556.0,349.5 L554.5,349.9 L554.7,354.8 L553.3,357.5 L551.7,357.7 L551.2,359.9 L549.9,359.0 L549.5,359.6 L548.5,357.1 L546.1,357.8 L547.1,360.1 L542.6,365.9 L546.4,370.8 L551.4,374.5 L554.6,374.6 L556.8,375.6 L557.5,377.1 L558.4,376.2 L561.5,376.6 L562.4,377.7 L561.3,382.6 L562.5,384.2 L562.2,386.1 L563.1,385.7 L563.4,386.4 L562.4,386.6 L562.3,388.6 L558.1,390.2 L558.8,391.4 L557.6,392.4 L557.7,396.7 L558.5,396.8 L558.2,397.9 L560.0,397.7 L560.3,399.3 L562.6,401.5 L564.2,401.1 L562.4,405.5 L562.7,406.6 L561.4,407.0 L562.0,408.3 L564.1,409.4 L564.7,408.3 L569.5,409.5 L566.1,413.0 L566.2,415.7 L565.5,415.7 L567.3,418.2 L567.2,419.4 L568.8,420.4 L567.5,422.9 L568.6,425.0 L567.8,426.3 L567.1,425.3 L566.0,425.8 L565.5,424.5 L564.4,424.4 L564.5,423.2 L565.5,423.2 L564.4,423.7 L568.5,427.4 L565.4,430.4 L565.6,432.6 L563.4,430.2 L563.3,428.8 L563.3,430.2 L561.2,429.9 L560.8,427.9 L561.2,429.9 L563.6,430.4 L566.3,434.9 L564.7,434.7 L564.3,437.1 L562.4,439.6 L559.7,439.0 L561.1,436.7 L560.5,435.4 L560.9,436.7 L559.6,438.9 L560.7,439.5 L559.3,442.2 L558.0,439.8 L559.7,444.1 L558.8,444.7 L558.6,443.5 L558.9,448.0 L558.1,448.7 L557.3,446.2 L557.9,448.3 L557.1,448.3 L556.8,449.8 L555.8,449.0 L556.7,447.5 L555.8,446.4 L557.2,446.0 L557.5,444.4 L557.1,446.0 L555.8,446.4 L556.6,447.9 L555.3,448.5 L554.9,445.1 L554.9,447.8 L553.5,448.8 L552.6,446.3 L553.4,447.8 L553.0,451.4 L552.0,450.7 L552.1,447.7 L552.0,449.6 L549.5,449.6 L549.6,448.9 L549.4,449.6 L550.9,450.0 L549.4,451.1 L550.0,452.5 L549.2,451.3 L549.8,453.4 L549.8,452.6 L548.3,452.4 L546.8,449.0 L546.5,446.6 L548.4,443.2 L547.9,440.5 L544.2,439.2 L545.2,436.4 L543.7,438.9 L541.9,438.2 L540.8,433.4 L539.1,432.4 L540.7,434.6 L540.7,437.7 L542.5,439.5 L546.0,440.0 L547.5,442.5 L544.0,445.0 L541.3,442.4 L543.8,445.1 L540.4,451.3 L536.6,454.4 L528.1,457.0Z",
		"labelX": 538.2,
		"labelY": 372.6
	},
	{
		"id": "ladakh",
		"name": "Ladakh",
		"path": "M284.2,52.1 L295.7,61.9 L294.4,65.6 L287.9,70.0 L289.7,71.7 L288.1,74.9 L290.1,79.9 L288.1,83.7 L291.1,89.4 L297.8,95.5 L298.0,97.7 L301.1,98.9 L307.2,99.4 L305.6,105.9 L310.8,113.4 L310.9,118.0 L308.2,118.7 L304.5,121.9 L303.0,120.7 L301.5,121.1 L299.4,122.6 L298.8,125.6 L297.3,125.3 L295.4,126.6 L290.0,122.3 L289.0,115.1 L285.0,107.0 L283.0,93.0 L282.0,78.0 L283.0,65.0 Z",
		"labelX": 296,
		"labelY": 92
	}
];
function PeacockMotif({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 60",
		className,
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "20",
				cy: "35",
				r: "6",
				fill: "currentColor",
				opacity: "0.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M26 35 Q40 20 55 25 Q70 30 68 45 Q66 55 55 50",
				stroke: "currentColor",
				strokeWidth: "1.5",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 41 L20 55 M17 41 L17 53 M23 41 L23 53",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "55",
				cy: "33",
				r: "4",
				fill: "currentColor",
				opacity: "0.15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "63",
				cy: "38",
				r: "3",
				fill: "currentColor",
				opacity: "0.15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "68",
				cy: "44",
				r: "2.5",
				fill: "currentColor",
				opacity: "0.15"
			})
		]
	});
}
function DiyaMotif({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className,
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 24 Q20 32 32 24 L28 28 Q20 34 12 28 Z",
				fill: "currentColor",
				opacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "20",
				cy: "24",
				rx: "14",
				ry: "5",
				fill: "currentColor",
				opacity: "0.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 22 Q17 14 20 6 Q23 14 20 22",
				fill: "currentColor",
				opacity: "0.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "20",
				cy: "10",
				r: "2.5",
				fill: "currentColor"
			})
		]
	});
}
function MandalaMotif({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 120 120",
		className,
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "56",
				stroke: "currentColor",
				strokeWidth: "1",
				opacity: "0.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "42",
				stroke: "currentColor",
				strokeWidth: "1",
				opacity: "0.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "28",
				stroke: "currentColor",
				strokeWidth: "1",
				opacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "14",
				stroke: "currentColor",
				strokeWidth: "1",
				opacity: "0.5"
			}),
			Array.from({ length: 12 }).map((_, i) => {
				const a = i * 30 * Math.PI / 180;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: 60,
					y1: 60,
					x2: +(60 + Math.cos(a) * 56).toFixed(3),
					y2: +(60 + Math.sin(a) * 56).toFixed(3),
					stroke: "currentColor",
					strokeWidth: "0.8",
					opacity: "0.15"
				}, i);
			}),
			Array.from({ length: 8 }).map((_, i) => {
				const a = i * 45 * Math.PI / 180;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: +(60 + Math.cos(a) * 35).toFixed(3),
					cy: +(60 + Math.sin(a) * 35).toFixed(3),
					rx: "10",
					ry: "5",
					transform: `rotate(${i * 45} ${(60 + Math.cos(a) * 35).toFixed(3)} ${(60 + Math.sin(a) * 35).toFixed(3)})`,
					stroke: "currentColor",
					strokeWidth: "0.6",
					opacity: "0.2"
				}, i);
			})
		]
	});
}
function TempleMotif({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 60 50",
		className,
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30 2 L30 12 M27 5 L33 5",
				stroke: "currentColor",
				strokeWidth: "1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 14 L30 12 L38 14 L36 20 L24 20 Z",
				fill: "currentColor",
				opacity: "0.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 20 L40 20 L38 26 L22 26 Z",
				fill: "currentColor",
				opacity: "0.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "26",
				width: "12",
				height: "20",
				fill: "currentColor",
				opacity: "0.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M26 30 L26 42 M34 30 L34 42",
				stroke: "currentColor",
				strokeWidth: "0.6",
				opacity: "0.3"
			})
		]
	});
}
function LotusMotif({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 60 40",
		className,
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30 38 Q15 30 10 18 Q18 22 30 28 Q42 22 50 18 Q45 30 30 38",
				fill: "currentColor",
				opacity: "0.15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30 34 Q22 20 20 8 Q26 16 30 24 Q34 16 40 8 Q38 20 30 34",
				fill: "currentColor",
				opacity: "0.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30 32 Q30 18 30 6",
				stroke: "currentColor",
				strokeWidth: "0.8",
				opacity: "0.3"
			})
		]
	});
}
function IndiaMap({ onSelectState }) {
	const [hovered, setHovered] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const containerRef = (0, import_react.useRef)(null);
	const hoveredState = hovered ? getStateById(hovered) : null;
	const selectedState = selected ? getStateById(selected) : null;
	const zoomIn = () => setZoom((z) => Math.min(z + .4, 2.5));
	const zoomOut = () => {
		setZoom((z) => {
			const nz = Math.max(z - .4, 1);
			if (nz === 1) setSelected(null);
			return nz;
		});
	};
	const handleStateClick = (stateId) => {
		setSelected(stateId);
		setZoom(2.25);
	};
	const focusTransform = (0, import_react.useMemo)(() => {
		const geo = selected ? geoStates.find((g) => g.id === selected) : null;
		if (!geo) return {
			x: 0,
			y: 0
		};
		return {
			x: 800 / 2 - geo.labelX * zoom,
			y: 900 / 2 - geo.labelY * zoom
		};
	}, [selected, zoom]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .6 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 inline-block rounded-full bg-saffron-100 px-4 py-1.5 text-sm font-semibold text-saffron-700",
							children: "Interactive Cultural Map"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl md:text-5xl",
							children: [
								"India is not just a country.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-gradient-saffron bg-clip-text text-transparent",
									children: "It is a collection of stories."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-base text-ink-700/70 sm:text-lg",
							children: "Pick a state and discover the traditions, places, food, music and people that make it unique."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: containerRef,
				className: "relative min-h-[520px] overflow-hidden rounded-3xl bg-gradient-warm card-shadow-lg sm:min-h-[620px] lg:min-h-[720px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMotif, { className: "absolute left-4 top-4 h-16 w-16 text-saffron-400/30 animate-float-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeacockMotif, { className: "absolute right-8 top-8 h-20 w-20 text-peacock-500/25 animate-float-medium" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaMotif, { className: "absolute bottom-4 right-4 h-24 w-24 text-maroon-500/15 animate-spin-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMotif, { className: "absolute bottom-8 left-8 h-14 w-14 text-royal-500/20 animate-float-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-4 top-20 z-20 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: zoomIn,
							"aria-label": "Zoom in",
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100/90 text-ink-800 shadow-md transition-all hover:bg-cream-200 active:scale-90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: zoomOut,
							"aria-label": "Zoom out",
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100/90 text-ink-800 shadow-md transition-all hover:bg-cream-200 active:scale-90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: `0 0 800 900`,
						className: "h-full w-full",
						preserveAspectRatio: "xMidYMid meet",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
								id: "stateGlow",
								x: "-20%",
								y: "-20%",
								width: "140%",
								height: "140%",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
									stdDeviation: "3",
									result: "blur"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
								id: "folkDots",
								x: "0",
								y: "0",
								width: "20",
								height: "20",
								patternUnits: "userSpaceOnUse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "10",
									cy: "10",
									r: "1.2",
									fill: "#FFB366",
									opacity: "0.25"
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								width: 800,
								height: 900,
								fill: "url(#folkDots)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${focusTransform.x}, ${focusTransform.y}) scale(${zoom})`,
								style: { transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" },
								children: [geoStates.map((geo) => {
									const data = getStateById(geo.id);
									const isHovered = hovered === geo.id;
									const isSelected = selected === geo.id;
									const hasData = Boolean(data);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: geo.path,
										fillRule: "evenodd",
										fill: isSelected && data ? data.color : isHovered ? "#FFCC99" : hasData ? "#FFE599" : "#F7EBCB",
										stroke: isSelected ? "#fff" : isHovered ? "#A02E3A" : "#B8860B",
										strokeWidth: isSelected ? 2 : isHovered ? 1.2 : .8,
										filter: isHovered || isSelected ? "url(#stateGlow)" : void 0,
										className: "india-state",
										style: {
											cursor: hasData ? "pointer" : "default",
											transition: "fill 0.3s ease, stroke 0.3s ease"
										},
										onMouseEnter: hasData ? () => setHovered(geo.id) : void 0,
										onMouseLeave: hasData ? () => setHovered(null) : void 0,
										onClick: hasData ? () => handleStateClick(geo.id) : void 0
									}), hasData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: geo.labelX,
										y: geo.labelY,
										textAnchor: "middle",
										className: "pointer-events-none select-none",
										style: {
											fontSize: isHovered || isSelected ? 11 : 8,
											fontWeight: isSelected ? 800 : 600,
											fill: isSelected ? "#fff" : "#80380A",
											opacity: zoom > 1.3 || isHovered || isSelected ? 1 : .65,
											transition: "all 0.3s ease"
										},
										children: data?.name ?? geo.name
									})] }, geo.id);
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									transform: "translate(680, 200)",
									opacity: "0.3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											r: "22",
											fill: "none",
											stroke: "#CC9900",
											strokeWidth: "1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M0,-20 L4,0 L0,20 L-4,0 Z",
											fill: "#CC9900"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
											y: "-26",
											textAnchor: "middle",
											fontSize: "10",
											fill: "#80380A",
											fontWeight: "bold",
											children: "N"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: hoveredState && !selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10,
							scale: .9
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						exit: {
							opacity: 0,
							y: 10,
							scale: .9
						},
						transition: { duration: .2 },
						className: "pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-2xl bg-ink-900/90 px-5 py-3 text-center text-white shadow-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold",
							children: hoveredState.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-cream-200/80",
							children: hoveredState.highlight
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selectedState && zoom > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 40,
							scale: .82
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						exit: {
							opacity: 0,
							y: 30,
							scale: .9
						},
						transition: {
							type: "spring",
							damping: 18,
							stiffness: 160
						},
						className: "absolute inset-x-3 bottom-3 z-30 bg-cream-100/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[360px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSelected(null);
									setZoom(1);
								},
								"aria-label": "Close state preview",
								className: "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-300 text-ink-800 transition-all hover:bg-saffron-100 active:scale-90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-3 w-3 rounded-full",
									style: { backgroundColor: selectedState.color }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-wider",
									style: { color: selectedState.color },
									children: selectedState.capital
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-extrabold text-ink-900",
								children: selectedState.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm italic text-ink-700/70",
								children: [
									"\"",
									selectedState.tagline,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm text-ink-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-saffron-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: "Iconic Highlight:"
										}),
										" ",
										selectedState.places[0]?.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1.5 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
											icon: MapPin,
											text: selectedState.places[0]?.city ?? ""
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
											icon: Heart,
											text: selectedState.dances[0]?.name ?? ""
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
											icon: Music,
											text: selectedState.music[0]?.name ?? ""
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
											icon: UtensilsCrossed,
											text: selectedState.foods[0]?.name ?? ""
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onSelectState(selectedState.id),
								className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-4 py-2.5 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4" }), "Explore famous places"]
							})
						]
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-700/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-saffron-500" }), " Hover to discover"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-4 w-4 text-saffron-500" }), " Select a state to zoom in"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4 text-saffron-500" }), " Open its famous places"]
					})
				]
			})
		]
	});
}
function Chip$1({ icon: Icon, text }) {
	if (!text) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-saffron-100/80 px-2.5 py-1 text-xs font-medium text-saffron-700",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), text]
	});
}
function SectionHeader({ title, subtitle, decorativeVariant, decorColor, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 flex flex-col items-center text-center sm:mb-10",
		children: [
			decorativeVariant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-3",
				style: { color: decorColor || "#FF8C2A" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecorLine, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecorIcon, {
						variant: decorativeVariant,
						color: decorColor || "#FF8C2A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecorLine, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section-title text-balance",
				children: title
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-subtitle text-balance",
				children: subtitle
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: action
			})
		]
	});
}
function DecorLine() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-12 bg-current opacity-30" });
}
function DecorIcon({ variant, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-lg",
		style: { color: color || "#FF8C2A" },
		children: {
			lotus: "✿",
			peacock: "❖",
			diya: "◆",
			mandala: "❉",
			temple: "☖",
			camel: "◆",
			tabla: "◉",
			warli: "✦"
		}[variant] || "✿"
	});
}
function HorizontalScroll({ children, className = "" }) {
	const scrollRef = (0, import_react.useRef)(null);
	const scroll = (dir) => {
		if (!scrollRef.current) return;
		const amount = scrollRef.current.clientWidth * .7;
		scrollRef.current.scrollBy({
			left: dir === "left" ? -amount : amount,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => scroll("left"),
				"aria-label": "Scroll left",
				className: "absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-100 text-ink-800 shadow-lg transition-all hover:bg-saffron-100 active:scale-90 md:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "h-scroll scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => scroll("right"),
				"aria-label": "Scroll right",
				className: "absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream-100 text-ink-800 shadow-lg transition-all hover:bg-saffron-100 active:scale-90 md:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
			})
		]
	});
}
function PlaceCard({ name, city, stateName, image, description, onOpen, onPlanTrip }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: { y: -8 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group relative w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow sm:w-80",
		onClick: onOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-48 overflow-hidden sm:h-52",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-3 right-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-white text-shadow-md",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 text-sm text-cream-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
							" ",
							city,
							", ",
							stateName
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-sm text-ink-700/80",
				children: description
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: (event) => {
						event.stopPropagation();
						onOpen?.();
					},
					className: "flex items-center gap-1 text-sm font-semibold text-saffron-600 transition-all group-hover:gap-2",
					children: ["Explore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				}), onPlanTrip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: (event) => {
						event.stopPropagation();
						onPlanTrip();
					},
					className: "flex items-center gap-1 rounded-full bg-saffron-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-3.5 w-3.5" }), " Plan Trip"]
				})]
			})]
		})]
	});
}
function CultureCard({ name, state, description, image, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: { y: -6 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow sm:w-72",
		onClick: onOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-40 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-cream-100/90 px-2.5 py-1 text-xs font-semibold text-saffron-700",
					children: state
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-ink-900",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 line-clamp-2 text-sm text-ink-700/75",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "mt-3 flex items-center gap-1 text-sm font-semibold text-peacock-600 transition-all group-hover:gap-2",
					children: ["Discover Story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			]
		})]
	});
}
function DanceCard({ name, origin, state, description, image, onWatch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		onClick: onWatch,
		whileHover: { y: -8 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl card-shadow sm:w-72",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-80 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-0 left-0 right-0 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 inline-block rounded-full bg-saffron-500/90 px-2.5 py-0.5 text-xs font-semibold text-white",
							children: state
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white text-shadow-md",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream-200/80",
							children: origin
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm text-cream-100/90",
							children: description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onWatch,
							className: "mt-3 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-white" }), " Watch Performance"]
						})
					]
				})
			]
		})
	});
}
function MusicCard({ name, region, instruments, description, image, onListen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		onClick: onListen,
		whileHover: { y: -6 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-royal-500 to-royal-700 p-5 text-white card-shadow sm:w-72",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "absolute right-4 top-4 h-8 w-8 text-white/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xl font-bold",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-cream-200/80",
				children: region
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }),
					" ",
					instruments
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 line-clamp-3 text-sm text-cream-100/85",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onListen,
				className: "mt-4 flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-white" }), " Watch / Listen"]
			})
		]
	});
}
function FoodCard({ name, origin, description, whereToTry, image, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		onClick: onOpen,
		whileHover: { y: -6 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-44 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute right-3 top-3 flex items-center gap-1 rounded-full bg-cream-100/90 px-2.5 py-1 text-xs font-semibold text-saffron-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-3 w-3" }),
						" ",
						origin
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold text-ink-900",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 line-clamp-2 text-sm text-ink-700/75",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-start gap-1.5 rounded-lg bg-saffron-50 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-ink-700/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Where to try:"
							}),
							" ",
							whereToTry
						]
					})]
				})
			]
		})]
	});
}
function RestaurantCard({ name, city, cuisine, rating, priceRange, image, description, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		onClick: onOpen,
		whileHover: { y: -4 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-cream-100 card-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-28 w-28 shrink-0 overflow-hidden sm:h-32 sm:w-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-ink-900",
							children: name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex shrink-0 items-center gap-1 rounded-full bg-mustard-100 px-2 py-0.5 text-xs font-bold text-mustard-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-mustard-500 text-mustard-500" }),
								" ",
								rating
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-1 text-xs text-ink-700/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
							" ",
							city
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs font-medium text-peacock-600",
						children: [
							cuisine,
							" · ",
							priceRange
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 line-clamp-2 text-xs text-ink-700/70",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-2 text-xs font-semibold text-saffron-600 transition-all group-hover:underline",
						children: "View Place →"
					})
				]
			})]
		})
	});
}
function EventCard({ name, location, date, category, image, description, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: { y: -6 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group relative w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl card-shadow sm:w-80",
		onClick: onOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-48 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/85 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-saffron-500 px-2.5 py-1 text-xs font-bold text-white",
					children: category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-3 right-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-mustard-300",
							children: date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-white text-shadow-md",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream-200/80",
							children: location
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-ink-900 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-sm text-cream-200/80",
				children: description
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "mt-2 flex items-center gap-1 text-sm font-semibold text-saffron-400 transition-all group-hover:gap-2",
				children: ["Explore Event ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})]
		})]
	});
}
function StateCard({ state, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		whileHover: { y: -8 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group relative cursor-pointer overflow-hidden rounded-2xl card-shadow",
		onClick: onOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-56 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: state.heroImage,
					alt: state.name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-0 left-0 right-0 h-1.5",
					style: { backgroundColor: state.color }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-4 left-4 right-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-extrabold text-white text-shadow-md",
							children: state.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs italic text-cream-200/85",
							children: [
								"\"",
								state.tagline,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-cream-200/70",
							children: state.highlight
						})
					]
				})
			]
		})
	});
}
function TripCard({ trip, onPlan, onRemove }) {
	const { toggleTrip, isTripSaved } = useApp();
	const saved = isTripSaved(trip.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		layout: true,
		whileHover: { y: -4 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20
		},
		className: "group relative w-72 shrink-0 overflow-hidden rounded-2xl bg-cream-100 card-shadow sm:w-80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-40 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: trip.image,
					alt: trip.place,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onRemove,
					"aria-label": "Remove trip",
					className: "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/40 text-white backdrop-blur-sm transition-all hover:bg-maroon-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${saved ? "fill-saffron-500 text-saffron-500" : ""}` })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-3 right-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream-200/80",
							children: trip.stateName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-white text-shadow-md",
							children: trip.city
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream-200/70",
							children: trip.place
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onPlan,
				className: "flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95",
				children: ["Plan Trip ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})
		})]
	});
}
function ReelCard({ reel, isActive }) {
	const { toggleLike, isLiked } = useApp();
	const liked = isLiked(reel.id);
	const [localLikes, setLocalLikes] = (0, import_react.useState)(reel.likes);
	const handleLike = () => {
		toggleLike({
			id: reel.id,
			type: "reel",
			title: reel.title
		});
		setLocalLikes((n) => liked ? n - 1 : n + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "reel-item relative flex h-full w-full items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-full w-full max-w-md overflow-hidden rounded-3xl bg-ink-900",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: reel.thumbnail,
					alt: reel.title,
					className: "h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-24 right-3 flex flex-col items-center gap-4 z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelAction, {
							icon: Heart,
							active: liked,
							onClick: handleLike,
							label: formatCount(localLikes)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelAction, {
							icon: Sparkles,
							label: formatCount(reel.comments)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelAction, {
							icon: Bookmark,
							label: formatCount(reel.saves)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-0 left-0 right-16 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: reel.avatar,
								alt: reel.creator,
								className: "h-8 w-8 rounded-full border-2 border-white/50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold text-white",
								children: reel.creator
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-white text-shadow-md",
							children: reel.caption
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 flex flex-wrap gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-2.5 w-2.5" }),
									" ",
									reel.city
								]
							}), reel.hashtags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-saffron-300",
								children: tag
							}, tag))]
						})
					]
				}),
				isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scale: 0 },
					animate: { scale: 1 },
					className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-7 w-7 fill-white text-white" })
					})
				})
			]
		})
	});
}
function ReelAction({ icon: Icon, active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "flex flex-col items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm transition-all active:scale-90 ${active ? "bg-saffron-500/30" : "bg-white/15 hover:bg-white/25"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 text-white ${active ? "fill-saffron-500 text-saffron-500" : ""}` })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold text-white text-shadow-md",
			children: label
		})]
	});
}
function formatCount(n) {
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
	return String(n);
}
var MONTHS = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december"
];
/** Works out when something happens and whether it is on right now. */
function getTiming(h) {
	const monthName = MONTHS[(/* @__PURE__ */ new Date()).getMonth()];
	if (h.kind === "event" && h.date) {
		const live = h.date.toLowerCase().includes(monthName);
		const hint = /fair|mela/i.test(h.name) ? "Mornings from about 8 AM, busiest after 4 PM." : /night|deepa|diwali|lantern|light/i.test(h.name) ? "Comes alive after sunset, around 6–10 PM." : "Main gatherings usually run from about 5 PM to 10 PM.";
		return {
			live,
			when: live ? `Happening now — ${h.date}` : h.date,
			note: hint
		};
	}
	if (h.kind === "restaurant") return {
		live: true,
		when: "Open most days, roughly 11 AM – 11 PM",
		note: "Timings change by season and day — do call ahead before you go."
	};
	if (h.kind === "food") return {
		live: true,
		when: "Available round the year",
		note: "Best enjoyed fresh — mornings for breakfast plates, 6–9 PM for evening street stalls."
	};
	if (h.kind === "dance" || h.kind === "music") return {
		live: false,
		when: "Happens casually here — exact date not known",
		note: "Most performances are put on during festivals and weddings, usually in the evening after 6 PM. Cultural centres in the region also hold shows through the year."
	};
	return {
		live: false,
		when: "Happens casually here — exact date not known",
		note: "This is a living everyday tradition rather than a scheduled show. Ask locals or a nearby craft centre when you visit — they will point you to the next one."
	};
}
var HappeningContext = (0, import_react.createContext)({ open: () => {} });
var useHappening = () => (0, import_react.useContext)(HappeningContext);
function HappeningProvider({ children }) {
	const [item, setItem] = (0, import_react.useState)(null);
	const timing = item ? getTiming(item) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HappeningContext.Provider, {
		value: { open: setItem },
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: item && timing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-[85] flex items-end justify-center bg-ink-900/70 p-0 backdrop-blur-sm sm:items-center sm:p-6",
			onClick: () => setItem(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					y: 40,
					opacity: 0,
					scale: .98
				},
				animate: {
					y: 0,
					opacity: 1,
					scale: 1
				},
				exit: {
					y: 40,
					opacity: 0,
					scale: .98
				},
				onClick: (e) => e.stopPropagation(),
				className: "max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream-50 scrollbar-thin sm:rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-52",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: item.name,
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setItem(null),
							className: "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/50 text-white backdrop-blur-sm transition-colors hover:bg-ink-900/70",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						timing.live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-maroon-500 px-3 py-1 text-xs font-bold text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-white" }), " LIVE NOW"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-4 left-4 right-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-extrabold text-white",
								children: item.name
							}), item.place && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1 text-sm text-cream-200/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
									" ",
									item.place
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-2xl p-4 ${timing.live ? "bg-maroon-50" : "bg-saffron-50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-sm font-bold text-ink-900",
								children: [timing.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-maroon-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 text-saffron-600" }), timing.when]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1.5 flex items-start gap-2 text-sm text-ink-700/75",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-700/50" }),
									" ",
									timing.note
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-ink-700/80",
							children: item.description
						}),
						item.extra && item.extra.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: item.extra.filter((x) => x.value).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-cream-100 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-wide text-ink-700/50",
									children: x.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-ink-900",
									children: x.value
								})]
							}, x.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-2 rounded-xl bg-cream-100 p-3 text-xs text-ink-700/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), "Timings are indicative and can shift with the local calendar and weather."]
						})
					]
				})]
			})
		}) })]
	});
}
function Homepage({ onSelectState, onOpenPlace, onOpenReels, onOpenUpload, onPlanTrip }) {
	const { savedTrips, removeTrip, addPoints, uploads } = useApp();
	const { open: openHappening } = useHappening();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-cream-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-folk-pattern px-4 pb-16 pt-24 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeacockMotif, { className: "absolute right-4 top-24 h-24 w-24 text-peacock-500/15 animate-float-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMotif, { className: "absolute left-4 top-32 h-20 w-20 text-saffron-400/15 animate-float-medium" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndiaMap, { onSelectState })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-cream-100 px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Explore India's Cultural Heart",
						subtitle: "Discover, Experience, Contribute, and Preserve the heritage of the world's most diverse civilization.",
						decorativeVariant: "lotus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							{
								icon: Compass,
								title: "Discover",
								desc: "Making India's cultural heritage accessible to every citizen.",
								bgClass: "bg-saffron-100",
								textClass: "text-saffron-600",
								barClass: "bg-saffron-500"
							},
							{
								icon: Sparkles,
								title: "Experience",
								desc: "Explore places, food, music, dance, and traditions interactively.",
								bgClass: "bg-peacock-100",
								textClass: "text-peacock-600",
								barClass: "bg-peacock-500"
							},
							{
								icon: Upload,
								title: "Contribute",
								desc: "Upload stories, photos, and videos to document culture.",
								bgClass: "bg-maroon-100",
								textClass: "text-maroon-600",
								barClass: "bg-maroon-500"
							},
							{
								icon: Shield,
								title: "Preserve",
								desc: "Building a digital repository of India's diverse heritage.",
								bgClass: "bg-royal-100",
								textClass: "text-royal-600",
								barClass: "bg-royal-500"
							}
						].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: i * .1 },
							className: "group relative overflow-hidden rounded-2xl bg-cream-50 p-6 card-shadow transition-all hover:-translate-y-2 hover:card-shadow-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${item.bgClass}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: `h-6 w-6 ${item.textClass}` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-ink-900",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-ink-700/70",
									children: item.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute bottom-0 left-0 h-1 w-full ${item.barClass} opacity-0 transition-opacity group-hover:opacity-100` })
							]
						}, item.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "explore",
				className: "bg-folk-pattern px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Popular States",
						subtitle: "Ten states, a thousand stories. Start your journey from any corner of India.",
						decorativeVariant: "mandala",
						decorColor: "#C13A47"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
						children: states.map((state, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: i % 5 * .08 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateCard, {
								state,
								onOpen: () => onSelectState(state.id)
							})
						}, state.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "places",
				className: "bg-cream-100 px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Places That Tell India's Story",
						subtitle: "From the Taj Mahal to Kerala's backwaters — monuments, temples, and wonders across the land.",
						decorativeVariant: "temple",
						decorColor: "#3D5AFE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: famousPlaces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
						id: p.id,
						name: p.name,
						city: p.city,
						stateName: getStateName(p.stateId),
						image: p.image,
						description: p.description,
						onOpen: () => onOpenPlace(p.id)
					}, p.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "culture",
				className: "bg-folk-pattern px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Living Traditions",
						subtitle: "Art forms and customs kept alive by generations of artisans, storytellers, and communities.",
						decorativeVariant: "warli",
						decorColor: "#0BA884"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: allTraditions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CultureCard, {
						name: t.name,
						state: t.stateName,
						description: t.description,
						image: t.image,
						onOpen: () => openHappening({
							kind: "tradition",
							name: t.name,
							place: t.stateName,
							image: t.image,
							description: t.description
						})
					}, t.name + t.stateId)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-ink-900 px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaMotif, { className: "absolute right-4 top-4 h-32 w-32 text-saffron-500/10 animate-spin-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiyaMotif, { className: "absolute bottom-8 left-8 h-16 w-16 text-saffron-500/15" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-center gap-3 text-saffron-400",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-12 bg-saffron-400/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg",
											children: "❉"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-12 bg-saffron-400/40" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-extrabold text-white sm:text-4xl md:text-5xl",
									children: "India in Motion"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-2xl text-base text-cream-200/70 sm:text-lg",
									children: "From Kathak to Bharatanatyam, Bhangra to Odissi — eight classical and folk dances that tell India's stories."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: allDances.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DanceCard, {
							name: d.name,
							origin: d.origin,
							state: d.stateName,
							description: d.description,
							image: d.image,
							onWatch: () => openHappening({
								kind: "dance",
								name: d.name,
								place: d.stateName,
								image: d.image,
								description: d.description,
								extra: [{
									label: "Origin",
									value: d.origin
								}]
							})
						}, d.name + d.stateId)) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-cream-100 px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Sounds of India",
						subtitle: "Classical ragas, mystic Baul songs, desert ballads — the musical soul of a civilization.",
						decorativeVariant: "tabla",
						decorColor: "#3D5AFE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: allMusic.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MusicCard, {
						name: m.name,
						region: m.region,
						instruments: m.instruments,
						description: m.description,
						image: m.image,
						onListen: () => openHappening({
							kind: "music",
							name: m.name,
							place: m.region,
							image: m.image,
							description: m.description,
							extra: [{
								label: "Instruments",
								value: m.instruments
							}]
						})
					}, m.name + m.stateId)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "food",
				className: "bg-folk-pattern px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Taste India",
						subtitle: "Every dish carries a story — of royal kitchens, street corners, harvest festivals, and home hearths.",
						decorativeVariant: "lotus",
						decorColor: "#C13A47"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
						children: allFoods.slice(0, 8).map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: i % 4 * .08 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodCard, {
								name: f.name,
								origin: f.origin ?? "",
								description: f.description,
								whereToTry: f.whereToTry,
								image: f.image,
								onOpen: () => openHappening({
									kind: "food",
									name: f.name,
									place: f.origin ?? "",
									image: f.image,
									description: f.description,
									extra: [{
										label: "Where to try",
										value: f.whereToTry
									}]
								})
							})
						}, f.name + i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-cream-100 px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Where Should We Eat?",
						subtitle: "Sample restaurant data for prototype purposes — ratings shown are demo data, not real reviews.",
						decorativeVariant: "diya",
						decorColor: "#F5B800"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: allRestaurants.slice(0, 9).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantCard, {
							name: r.name,
							city: r.city,
							cuisine: r.cuisine,
							rating: r.rating,
							priceRange: r.priceRange,
							image: r.image,
							description: r.description,
							onOpen: () => openHappening({
								kind: "restaurant",
								name: r.name,
								place: r.city,
								image: r.image,
								description: r.description,
								extra: [{
									label: "Cuisine",
									value: r.cuisine
								}, {
									label: "Price",
									value: r.priceRange
								}]
							})
						}, r.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "events",
				className: "bg-folk-pattern px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Happening Across India",
						subtitle: "Festivals, fairs, and cultural events you can experience across the country.",
						decorativeVariant: "mandala",
						decorColor: "#FF8C2A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: allEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
						name: e.name,
						location: e.location,
						date: e.date,
						category: e.category,
						image: e.image,
						description: e.description,
						onOpen: () => openHappening({
							kind: "event",
							name: e.name,
							place: e.location,
							image: e.image,
							description: e.description,
							date: e.date,
							extra: [{
								label: "Category",
								value: e.category
							}]
						})
					}, e.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-ink-900 px-4 py-16 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeacockMotif, { className: "absolute left-4 bottom-4 h-24 w-24 text-peacock-400/10 animate-float-slow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-3 text-saffron-400",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-12 bg-saffron-400/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: "✦"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-12 bg-saffron-400/40" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-extrabold text-white sm:text-4xl md:text-5xl",
								children: "Explore Reels"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-base text-cream-200/70 sm:text-lg",
								children: "Vertical short videos from travelers, creators, and culture enthusiasts across India."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: onOpenReels,
								className: "mt-5 flex items-center gap-2 rounded-full bg-saffron-500 px-6 py-3 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95",
								children: ["Open Reels Feed ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-md rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mx-auto h-10 w-10 text-white/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold text-white",
								children: "No videos posted yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-cream-200/60",
								children: "Reels shared by the community will appear here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onOpenUpload,
								className: "mt-4 rounded-full bg-saffron-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-saffron-600",
								children: "Post the first reel"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-cream-100 px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Stories Worth Preserving",
						subtitle: "Lesser-known traditions, endangered folk arts, and vanishing crafts that deserve to be remembered.",
						decorativeVariant: "temple",
						decorColor: "#A02E3A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: preservationItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: i % 3 * .1 },
							className: "group overflow-hidden rounded-2xl bg-cream-50 card-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-44 overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.image,
										alt: item.title,
										loading: "lazy",
										className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white ${item.status === "Endangered" ? "bg-maroon-500" : item.status === "Declining" ? "bg-saffron-500" : item.status === "Reviving" ? "bg-peacock-500" : "bg-royal-500"}`,
										children: item.status
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-1 flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "chip bg-saffron-100 text-saffron-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3" }), " Cultural Preservation"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-ink-900",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-ink-700/60",
										children: [
											item.state,
											" · ",
											item.category
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-ink-700/75",
										children: item.description
									})
								]
							})]
						}, item.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-folk-pattern px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "India Through Your Eyes",
						subtitle: "Photos, videos, and stories shared by our community of cultural explorers.",
						decorativeVariant: "warli",
						decorColor: "#0BA884"
					}), uploads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-md rounded-2xl border-2 border-dashed border-peacock-200 bg-cream-50 p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto h-10 w-10 text-peacock-300" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-medium text-ink-700/70",
								children: "Nothing shared yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-ink-700/50",
								children: "Be the first to post a photo, video, or story from your travels."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: onOpenUpload,
								className: "mt-4 btn-primary",
								children: ["Share something ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
						children: uploads.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-cream-50 p-4 card-shadow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip bg-peacock-100 text-peacock-700",
									children: [
										u.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-3 w-3" }) : u.type === "photo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" }),
										" ",
										u.type
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-sm font-bold text-ink-900",
									children: u.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-ink-700/60 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-2.5 w-2.5" }),
										" ",
										u.place || u.city
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-3 text-xs text-ink-700/75",
									children: u.caption
								})
							]
						}, u.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "trips",
				className: "bg-cream-100 px-4 py-16 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "My Next Trips",
						subtitle: "Places you've saved to visit. Plan your itinerary when you're ready to go.",
						decorativeVariant: "lotus",
						decorColor: "#FF8C2A"
					}), savedTrips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-md rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mx-auto h-10 w-10 text-saffron-300" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-medium text-ink-700/70",
								children: "No saved trips yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-ink-700/50",
								children: "Start exploring India and save places you want to visit."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" }),
								className: "mt-4 btn-primary",
								children: ["Start exploring India ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-4 overflow-x-auto scrollbar-hide pb-4",
						children: savedTrips.map((trip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripCard, {
							trip,
							onPlan: () => onPlanTrip(trip),
							onRemove: () => removeTrip(trip.id)
						}, trip.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-gradient-saffron px-4 py-20 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaMotif, { className: "absolute -left-16 -top-16 h-64 w-64 text-white/8 animate-spin-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMotif, { className: "absolute bottom-8 right-8 h-20 w-20 text-white/15" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-3xl text-center text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-extrabold sm:text-4xl md:text-5xl",
									children: "Help Preserve India's Stories"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-lg text-cream-200/90",
									children: "Know a tradition, place or story that deserves to be remembered? Share it with India."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap justify-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: onOpenUpload,
											className: "flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-saffron-600 transition-all hover:scale-105 active:scale-95",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" }), " Upload Story"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: onOpenUpload,
											className: "flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" }), " Upload Photo"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: onOpenUpload,
											className: "flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-5 w-5" }), " Upload Video"]
										})
									]
								})
							]
						})
					})
				]
			})
		]
	});
}
function Footer({ onNavigate, onOpenUpload }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-ink-900 text-cream-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaMotif, { className: "absolute -right-20 -top-20 h-64 w-64 text-saffron-500/8 animate-spin-slow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMotif, { className: "absolute left-8 top-8 h-16 w-16 text-saffron-500/15" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeacockMotif, { className: "absolute bottom-8 right-8 h-20 w-20 text-peacock-400/15" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-10 md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-saffron",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-devanagari text-2xl font-bold text-white",
											children: "ध"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xl font-extrabold text-white",
										children: "DHAROHAR"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-saffron-400",
										children: "Explore • Experience • Preserve"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-cream-200/60",
									children: "An interactive journey through India's rich cultural heritage, traditions, dance, music, food and stories."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-4 text-sm font-bold uppercase tracking-wider text-saffron-400",
								children: "Quick Links"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm",
								children: [
									{
										id: "explore",
										label: "Explore India",
										icon: Compass
									},
									{
										id: "culture",
										label: "Culture",
										icon: Sparkles
									},
									{
										id: "food",
										label: "Food",
										icon: UtensilsCrossed
									},
									{
										id: "reels",
										label: "Reels",
										icon: Video
									},
									{
										id: "events",
										label: "Events",
										icon: Calendar
									},
									{
										id: "trips",
										label: "My Trips",
										icon: MapPin
									}
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => onNavigate(item.id),
									className: "flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-3.5 w-3.5" }),
										" ",
										item.label
									]
								}) }, item.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-4 text-sm font-bold uppercase tracking-wider text-saffron-400",
								children: "Community"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: onOpenUpload,
										className: "flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Upload Story"]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: onOpenUpload,
										className: "flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-3.5 w-3.5" }), " Upload Video"]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: onOpenUpload,
										className: "flex items-center gap-2 text-cream-200/70 transition-colors hover:text-saffron-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5" }), " Become a Contributor"]
									}) })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-4 text-sm font-bold uppercase tracking-wider text-saffron-400",
								children: "About"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => onNavigate("home"),
										className: "text-cream-200/70 transition-colors hover:text-saffron-400",
										children: "Our Mission"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => onNavigate("home"),
										className: "text-cream-200/70 transition-colors hover:text-saffron-400",
										children: "Cultural Preservation"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-cream-200/70",
										children: "SIH 2026"
									}) })
								]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 rounded-2xl bg-gradient-saffron p-5 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-white",
							children: "Built for Smart India Hackathon — Problem Statement 26197"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-cream-200/80",
							children: "Student Innovation — Ideas that showcase the rich cultural heritage and traditions of India"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream-200/10 pt-8 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream-200/50",
							children: "© 2026 DHAROHAR. Made with care for India's heritage."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 text-xs text-cream-200/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Discover" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Experience" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contribute" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preserve" })
							]
						})]
					})
				]
			})
		]
	});
}
function StateDetail({ stateId, onBack, onOpenPlace, onPlanTrip }) {
	const state = getStateById(stateId);
	const { profile, toggleTrip, isTripSaved, exploreState } = useApp();
	const { open: openHappening } = useHappening();
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	(0, import_react.useEffect)(() => {
		if (state && profile) exploreState(stateId);
	}, [
		state,
		stateId,
		profile,
		exploreState
	]);
	const stateGeo = (0, import_react.useMemo)(() => geoStates.find((item) => item.id === stateId), [stateId]);
	if (!state) return null;
	const tripFor = (place) => ({
		id: `trip-${place.id}`,
		stateId: state.id,
		stateName: state.name,
		city: place.city,
		place: place.name,
		image: place.image
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "min-h-screen bg-cream-100 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-[60vh] min-h-[400px] w-full overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						initial: { scale: 1.1 },
						animate: { scale: 1 },
						transition: {
							duration: 1.5,
							ease: "easeOut"
						},
						src: state.heroImage,
						alt: state.name,
						className: "h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/40 to-ink-900/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CulturalBackdrop, { stateId: state.id }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 right-0 h-2",
						style: { backgroundColor: state.color }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onBack,
						className: "absolute left-4 top-20 z-20 flex items-center gap-2 rounded-full bg-ink-900/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-ink-900/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Map"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							y: 30,
							opacity: 0
						},
						animate: {
							y: 0,
							opacity: 1
						},
						transition: {
							delay: .3,
							duration: .6
						},
						className: "absolute bottom-0 left-0 right-0 p-6 sm:p-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-5xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-sm font-semibold uppercase tracking-widest",
									style: { color: state.color },
									children: state.capital
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-4xl font-extrabold text-white text-shadow-lg sm:text-6xl md:text-7xl",
									children: state.name.toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-lg italic text-cream-200/90 sm:text-xl",
									children: [
										"\"",
										state.tagline,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-sm text-cream-100/80",
									children: "Choose a famous place below to build a visit around that exact destination."
								})
							]
						})
					}),
					stateGeo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.svg, {
						initial: {
							opacity: 0,
							scale: .45,
							rotate: -4
						},
						animate: {
							opacity: .42,
							scale: 1,
							rotate: 0
						},
						transition: {
							duration: 1.1,
							type: "spring",
							damping: 16
						},
						viewBox: `${stateGeo.labelX - 105} ${stateGeo.labelY - 120} 210 240`,
						className: "pointer-events-none absolute right-[4%] top-[12%] hidden h-[68%] w-[42%] text-cream-100 lg:block",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: stateGeo.path,
							fill: "currentColor",
							stroke: "currentColor",
							strokeWidth: "2",
							vectorEffect: "non-scaling-stroke"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-16 z-30 glass border-b border-saffron-200/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-5xl gap-1 px-4 overflow-x-auto scrollbar-hide",
					children: [
						{
							id: "overview",
							label: "Overview"
						},
						{
							id: "places",
							label: "Places"
						},
						{
							id: "culture",
							label: "Culture"
						},
						{
							id: "food",
							label: "Food"
						}
					].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `relative whitespace-nowrap px-5 py-4 text-sm font-semibold transition-colors ${activeTab === tab.id ? "text-saffron-600" : "text-ink-700/60 hover:text-ink-900"}`,
						children: [tab.label, activeTab === tab.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "stateTab",
							className: "absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-saffron-500"
						})]
					}, tab.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-10 sm:px-6",
				children: [
					activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "space-y-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl bg-gradient-warm p-6 card-shadow sm:p-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg leading-relaxed text-ink-800 sm:text-xl",
									children: state.description
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: ["Explore ", state.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
								children: [
									{
										label: "Heritage & Places",
										icon: MapPin,
										count: state.places.length
									},
									{
										label: "Traditions",
										icon: Sparkles,
										count: state.traditions.length
									},
									{
										label: "Dance",
										icon: Heart,
										count: state.dances.length
									},
									{
										label: "Music",
										icon: Music,
										count: state.music.length
									},
									{
										label: "Famous Food",
										icon: UtensilsCrossed,
										count: state.foods.length
									},
									{
										label: "Festivals",
										icon: Calendar,
										count: state.festivals.length
									},
									{
										label: "Folk Art",
										icon: Sparkles,
										count: state.artForms.length
									},
									{
										label: "Restaurants",
										icon: Star,
										count: state.restaurants.length
									}
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveTab(item.label.includes("Place") ? "places" : item.label.includes("Food") ? "food" : "culture"),
									className: "flex items-center gap-3 rounded-xl bg-cream-100 p-4 text-left card-shadow transition-all hover:-translate-y-1 hover:card-shadow-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 items-center justify-center rounded-lg bg-saffron-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5 text-saffron-600" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold text-ink-900",
										children: item.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-ink-700/60",
										children: [item.count, " items"]
									})] })]
								}, item.label))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "Famous Places"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: state.places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
								id: p.id,
								name: p.name,
								city: p.city,
								stateName: state.name,
								image: p.image,
								description: p.description,
								onOpen: () => onOpenPlace(p.id),
								onPlanTrip: () => onPlanTrip(tripFor(p))
							}, p.id)) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "Dance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: state.dances.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DanceCard, {
								name: d.name,
								origin: d.origin,
								state: state.name,
								description: d.description,
								image: d.image,
								onWatch: () => openHappening({
									kind: "dance",
									name: d.name,
									place: state.name,
									image: d.image,
									description: d.description,
									extra: [{
										label: "Origin",
										value: d.origin
									}]
								})
							}, d.name)) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "Food"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: state.foods.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodCard, {
									name: f.name,
									origin: f.origin ?? "",
									description: f.description,
									whereToTry: f.whereToTry,
									image: f.image,
									onOpen: () => openHappening({
										kind: "food",
										name: f.name,
										place: f.origin ?? state.name,
										image: f.image,
										description: f.description,
										extra: [{
											label: "Where to try",
											value: f.whereToTry
										}]
									})
								}, f.name))
							})] })
						]
					}),
					activeTab === "places" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-2xl font-bold text-ink-900",
								children: ["Places to Visit in ", state.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-ink-700/70",
								children: [
									"Explore the heritage, monuments, and natural wonders of ",
									state.name,
									"."
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
							children: state.places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
								id: p.id,
								name: p.name,
								city: p.city,
								stateName: state.name,
								image: p.image,
								description: p.description,
								onOpen: () => onOpenPlace(p.id),
								onPlanTrip: () => onPlanTrip(tripFor(p))
							}, p.id))
						})]
					}),
					activeTab === "culture" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "space-y-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "Living Traditions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: state.traditions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CultureCard, {
									name: t.name,
									state: state.name,
									description: t.description,
									image: t.image,
									onOpen: () => openHappening({
										kind: "tradition",
										name: t.name,
										place: state.name,
										image: t.image,
										description: t.description
									})
								}, t.name))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "India in Motion — Dance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: state.dances.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DanceCard, {
								name: d.name,
								origin: d.origin,
								state: state.name,
								description: d.description,
								image: d.image,
								onWatch: () => openHappening({
									kind: "dance",
									name: d.name,
									place: state.name,
									image: d.image,
									description: d.description,
									extra: [{
										label: "Origin",
										value: d.origin
									}]
								})
							}, d.name)) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: ["Sounds of ", state.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: state.music.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MusicCard, {
								name: m.name,
								region: m.region,
								instruments: m.instruments,
								description: m.description,
								image: m.image,
								onListen: () => openHappening({
									kind: "music",
									name: m.name,
									place: m.region,
									image: m.image,
									description: m.description,
									extra: [{
										label: "Instruments",
										value: m.instruments
									}]
								})
							}, m.name)) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "Festivals"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: state.festivals.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-2xl bg-cream-100 card-shadow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: f.image,
											alt: f.name,
											loading: "lazy",
											className: "h-full w-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute right-3 top-3 rounded-full bg-saffron-500 px-2.5 py-1 text-xs font-bold text-white",
											children: f.month
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-lg font-bold text-ink-900",
											children: f.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-ink-700/75",
											children: f.description
										})]
									})]
								}, f.name))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "Folk Art & Handicrafts"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: state.artForms.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-2xl bg-cream-100 card-shadow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative h-36",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: a.image,
											alt: a.name,
											loading: "lazy",
											className: "h-full w-full object-cover"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-ink-900",
											children: a.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-ink-700/70",
											children: a.description
										})]
									})]
								}, a.name))
							})] })
						]
					}),
					activeTab === "food" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "space-y-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-4 text-2xl font-bold text-ink-900",
							children: ["Taste ", state.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: state.foods.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodCard, {
								name: f.name,
								origin: f.origin ?? "",
								description: f.description,
								whereToTry: f.whereToTry,
								image: f.image,
								onOpen: () => openHappening({
									kind: "food",
									name: f.name,
									place: f.origin ?? state.name,
									image: f.image,
									description: f.description,
									extra: [{
										label: "Where to try",
										value: f.whereToTry
									}]
								})
							}, f.name))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-4 text-2xl font-bold text-ink-900",
								children: "Where Should We Eat?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 text-sm text-ink-700/60",
								children: "Sample restaurant data for prototype purposes — not real ratings."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: state.restaurants.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantCard, {
									name: r.name,
									city: r.city,
									cuisine: r.cuisine,
									rating: r.rating,
									priceRange: r.priceRange,
									image: r.image,
									description: r.description,
									onOpen: () => openHappening({
										kind: "restaurant",
										name: r.name,
										place: r.city,
										image: r.image,
										description: r.description,
										extra: [{
											label: "Cuisine",
											value: r.cuisine
										}, {
											label: "Price",
											value: r.priceRange
										}]
									})
								}, r.id))
							})
						] })]
					})
				]
			})
		]
	});
}
function CulturalBackdrop({ stateId }) {
	const group = stateId.length % 4;
	const Main = group === 0 ? TempleMotif : group === 1 ? PeacockMotif : group === 2 ? LotusMotif : DiyaMotif;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: {
				y: [
					0,
					-16,
					0
				],
				rotate: [
					-2,
					2,
					-2
				]
			},
			transition: {
				duration: 8,
				repeat: Infinity,
				ease: "easeInOut"
			},
			className: "absolute right-8 top-16 text-cream-100/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Main, { className: "h-28 w-28 sm:h-40 sm:w-40" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: { rotate: 360 },
			transition: {
				duration: 38,
				repeat: Infinity,
				ease: "linear"
			},
			className: "absolute -bottom-24 -left-16 text-saffron-300/20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaMotif, { className: "h-72 w-72" })
		})]
	});
}
function PlaceDetailModal({ place, onClose, onPlanTrip }) {
	const { toggleTrip, isTripSaved } = useApp();
	if (!place) return null;
	const stateName = getStateName(place.stateId);
	const state = getStateById(place.stateId);
	const tripData = {
		id: `trip-${place.id}`,
		stateId: place.stateId,
		stateName,
		city: place.city,
		place: place.name,
		image: place.image
	};
	const saved = isTripSaved(tripData.id);
	const nearby = state?.places.filter((p) => p.id !== place.id) ?? [];
	const localFood = state?.foods.slice(0, 3) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: place && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[85] flex items-start justify-center overflow-y-auto bg-ink-900/60 p-0 backdrop-blur-md sm:p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				y: 50,
				opacity: 0,
				scale: .98
			},
			animate: {
				y: 0,
				opacity: 1,
				scale: 1
			},
			exit: {
				y: 50,
				opacity: 0,
				scale: .98
			},
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 250
			},
			onClick: (e) => e.stopPropagation(),
			className: "relative w-full max-w-3xl overflow-hidden rounded-none bg-cream-100 shadow-2xl sm:rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-64 sm:h-80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: place.image,
						alt: place.name,
						className: "h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/40 text-white backdrop-blur-sm transition-all hover:bg-ink-900/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-0 left-0 right-0 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-sm text-cream-200/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
								" ",
								place.city,
								", ",
								stateName
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-extrabold text-white text-shadow-lg sm:text-4xl",
							children: place.name
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[50vh] overflow-y-auto scrollbar-thin p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-lg font-bold text-ink-900",
							children: "About"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base leading-relaxed text-ink-800",
							children: place.description
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 rounded-2xl bg-peacock-50 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-2 flex items-center gap-2 text-lg font-bold text-peacock-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }), " Why It Matters"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-ink-800",
							children: place.significance
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggleTrip(tripData),
							className: `flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 ${saved ? "bg-saffron-500 text-white" : "border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `h-4 w-4 ${saved ? "fill-white" : ""}` }), saved ? "Saved!" : "Save to Trip"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onPlanTrip(tripData),
							className: "flex items-center gap-2 rounded-full bg-saffron-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4" }), " Plan Visit"]
						})]
					}),
					nearby.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-lg font-bold text-ink-900",
							children: "Explore Nearby"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalScroll, { children: nearby.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
							id: p.id,
							name: p.name,
							city: p.city,
							stateName,
							image: p.image,
							description: p.description
						}, p.id)) })]
					}),
					localFood.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-lg font-bold text-ink-900",
							children: "Local Food"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: localFood.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-xl bg-cream-50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: f.image,
									alt: f.name,
									loading: "lazy",
									className: "h-16 w-16 rounded-lg object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-ink-900",
									children: f.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-ink-700/70 line-clamp-1",
									children: f.description
								})] })]
							}, f.name))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-lg font-bold text-ink-900",
							children: "Community Videos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border-2 border-dashed border-saffron-200 bg-saffron-50/50 p-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mx-auto h-8 w-8 text-saffron-400" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-ink-700/60",
									children: [
										"Community videos tagged to ",
										place.name,
										" will appear here."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-ink-700/40",
									children: "Be the first to share your experience!"
								})
							]
						})]
					})
				]
			})]
		})
	}) });
}
function ReelsView({ open, onClose }) {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const containerRef = (0, import_react.useRef)(null);
	const filtered = filter === "all" ? reels : reels.filter((r) => r.stateId === filter || r.city === filter);
	(0, import_react.useEffect)(() => {
		if (!open || !containerRef.current) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && entry.intersectionRatio > .6) {
					const idx = Number(entry.target.dataset["index"]);
					setActiveIndex(idx);
				}
			});
		}, { threshold: [.6] });
		containerRef.current.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [open, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[75] bg-ink-900",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Explore Reels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-cream-200/60",
							children: [filtered.length, " videos"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowFilters((s) => !s),
					className: "flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "h-4 w-4" }),
						filter === "all" ? "All India" : states.find((s) => s.id === filter)?.name || filter,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: -10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -10
				},
				className: "absolute right-4 top-20 z-40 max-h-80 w-56 overflow-y-auto rounded-2xl bg-cream-100 p-2 shadow-2xl scrollbar-thin",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setFilter("all");
							setShowFilters(false);
						},
						className: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${filter === "all" ? "bg-saffron-100 text-saffron-700" : "text-ink-800 hover:bg-saffron-50"}`,
						children: "All India"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px bg-saffron-200/40" }),
					states.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setFilter(s.id);
							setShowFilters(false);
						},
						className: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${filter === s.id ? "bg-saffron-100 text-saffron-700" : "text-ink-800 hover:bg-saffron-50"}`,
						children: s.name
					}, s.id))
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "reels-container h-full overflow-y-auto scrollbar-hide",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-8 w-8 text-white/40" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold text-white",
								children: "No videos posted yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-cream-200/60",
								children: filter === "all" ? "Be the first to share a reel from your corner of India." : "Nothing from this state yet — try All India."
							}),
							filter !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFilter("all"),
								className: "mt-4 rounded-full bg-saffron-500 px-5 py-2 text-sm font-semibold text-white",
								children: "Show All India"
							})
						]
					})
				}) : filtered.map((reel, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-index": idx,
					className: "h-screen w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelCard, {
						reel,
						isActive: idx === activeIndex
					})
				}, reel.id))
			})
		]
	}) });
}
var STEPS = [
	"type",
	"details",
	"location",
	"done"
];
var TYPES = [
	{
		id: "story",
		label: "Story",
		icon: FileText,
		desc: "Share a tradition, oral history, or cultural memory"
	},
	{
		id: "photo",
		label: "Photo",
		icon: Image,
		desc: "Upload a photo of a place, art form, or festival"
	},
	{
		id: "video",
		label: "Video",
		icon: Video,
		desc: "Upload a short video of a cultural experience"
	}
];
function UploadModal({ open, onClose }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const [type, setType] = (0, import_react.useState)("story");
	const [title, setTitle] = (0, import_react.useState)("");
	const [caption, setCaption] = (0, import_react.useState)("");
	const [stateId, setStateId] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [place, setPlace] = (0, import_react.useState)("");
	const { addUpload } = useApp();
	const reset = () => {
		setStep(0);
		setType("story");
		setTitle("");
		setCaption("");
		setStateId("");
		setCity("");
		setPlace("");
	};
	const handleClose = () => {
		onClose();
		setTimeout(reset, 300);
	};
	const handleDone = () => {
		handleClose();
	};
	const handleSubmit = () => {
		const content = {
			id: `upload-${Date.now()}`,
			type,
			title: title || "Untitled Story",
			stateId,
			city,
			place,
			caption: caption || "",
			timestamp: Date.now()
		};
		addUpload(content);
		setStep(3);
	};
	const selectedState = states.find((s) => s.id === stateId);
	step === 0 || step === 1 && title.trim() || step === 2 && stateId && city.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[90] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-md",
		onClick: handleClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				y: 20
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .95,
				y: 20
			},
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 300
			},
			onClick: (e) => e.stopPropagation(),
			className: "relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream-100 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative bg-gradient-saffron px-6 py-5 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleClose,
						className: "absolute right-4 top-4 rounded-full p-1.5 transition-colors hover:bg-white/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold",
							children: step < 3 ? "Share Your Story" : "Thank You!"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-cream-200/90",
						children: step < 3 ? "Help preserve India’s cultural heritage" : "Your contribution matters"
					}),
					step < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-1.5",
						children: STEPS.slice(0, 3).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 rounded-full transition-all ${i <= step ? "w-8 bg-white" : "w-4 bg-white/30"}` }, i))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[60vh] overflow-y-auto scrollbar-thin p-6",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-ink-700/80",
							children: "What would you like to contribute?"
						}), TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setType(t.id);
								setStep(1);
							},
							className: "flex w-full items-center gap-4 rounded-2xl border-2 border-saffron-200/50 bg-cream-50 p-4 text-left transition-all hover:border-saffron-400 hover:bg-saffron-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-6 w-6 text-saffron-600" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-ink-900",
										children: t.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-ink-700/70",
										children: t.desc
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 text-saffron-400" })
							]
						}, t.id))]
					}),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium text-ink-700/80",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "e.g., The Lost Art of Manjusha Painting",
								className: "w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-saffron-400"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium text-ink-700/80",
								children: "Story / Caption"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: caption,
								onChange: (e) => setCaption(e.target.value),
								placeholder: "Tell us about this tradition, place, or experience...",
								rows: 4,
								className: "w-full resize-none rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-saffron-400"
							})] }),
							(type === "photo" || type === "video") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border-2 border-dashed border-saffron-200 bg-saffron-50/50 py-8 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto h-8 w-8 text-saffron-400" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm text-ink-700/60",
										children: [
											"Drag your ",
											type,
											" here or click to browse"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-ink-700/40",
										children: "Demo mode — no actual file upload"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStep(0),
									className: "btn-ghost",
									children: "Back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStep(2),
									disabled: !title.trim(),
									className: "btn-primary flex-1 disabled:opacity-40",
									children: "Continue"
								})]
							})
						]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium text-ink-700/80",
								children: "Tag a State"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: stateId,
								onChange: (e) => setStateId(e.target.value),
								className: "w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-saffron-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select a state..."
								}), states.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: s.name
								}, s.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium text-ink-700/80",
								children: "City"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: city,
								onChange: (e) => setCity(e.target.value),
								placeholder: "e.g., Jaipur",
								className: "w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-saffron-400"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium text-ink-700/80",
								children: "Place (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: place,
								onChange: (e) => setPlace(e.target.value),
								placeholder: "e.g., Amber Fort",
								className: "w-full rounded-xl border-2 border-saffron-200/50 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-saffron-400"
							})] }),
							selectedState && city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-xl bg-peacock-50 px-4 py-3 text-sm text-peacock-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedState.name }),
									" → ",
									city,
									place && ` → ${place}`
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStep(1),
									className: "btn-ghost",
									children: "Back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleSubmit,
									disabled: !stateId || !city.trim(),
									className: "btn-primary flex-1 disabled:opacity-40",
									children: "Share with India"
								})]
							})
						]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .9
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						className: "py-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { scale: 0 },
								animate: { scale: 1 },
								transition: {
									type: "spring",
									delay: .1,
									damping: 12
								},
								className: "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-peacock-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12 text-peacock-500" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold text-ink-900",
								children: "Your story has been added to India\\u2019s cultural map"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-ink-700/70",
								children: "You just helped preserve India\\u2019s heritage. Thank you for your contribution."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 inline-flex items-center gap-2 rounded-full bg-saffron-100 px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-saffron-700",
									children: [
										"+",
										type === "video" ? 15 : type === "story" ? 20 : 10,
										" Dharohar Points"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleDone,
								className: "mt-6 btn-primary w-full",
								children: "Continue Exploring"
							})
						]
					})
				]
			})]
		})
	}) });
}
function TripPlanner({ trip, onClose }) {
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const [ref, setRef] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setConfirmed(false);
		setRef("DH" + Math.random().toString(36).slice(2, 7).toUpperCase());
	}, [trip?.id]);
	if (!trip) return null;
	const state = getStateById(trip.stateId);
	const selectedPlace = state?.places.find((place) => place.name === trip.place);
	const nearbyPlaces = state?.places.filter((place) => place.name !== trip.place).slice(0, 2) ?? [];
	const itinerary = [
		{
			day: 1,
			title: "Arrival & Heritage",
			activities: [
				{
					time: "Morning",
					icon: MapPin,
					text: `Arrive at ${selectedPlace?.name ?? trip.place} and explore its main sights`
				},
				{
					time: "Afternoon",
					icon: MapPin,
					text: selectedPlace?.significance ?? `Discover the story of ${trip.place}`
				},
				{
					time: "Evening",
					icon: UtensilsCrossed,
					text: `Try ${state?.foods[0]?.name ?? "local cuisine"} for dinner`
				}
			]
		},
		{
			day: 2,
			title: "Culture & Food",
			activities: [
				{
					time: "Morning",
					icon: MapPin,
					text: nearbyPlaces[0] ? `Visit nearby ${nearbyPlaces[0].name}` : `Take a guided walk around ${trip.place}`
				},
				{
					time: "Afternoon",
					icon: UtensilsCrossed,
					text: `Lunch: ${state?.foods[1]?.name ?? "regional specialty"}`
				},
				{
					time: "Evening",
					icon: Sparkles,
					text: `Watch ${state?.dances[0]?.name ?? "folk dance"} performance`
				}
			]
		},
		{
			day: 3,
			title: "Markets & Crafts",
			activities: [
				{
					time: "Morning",
					icon: MapPin,
					text: nearbyPlaces[1] ? `Explore ${nearbyPlaces[1].name}` : `Explore ${trip.city}'s local market`
				},
				{
					time: "Afternoon",
					icon: Sparkles,
					text: `Discover ${state?.artForms[0]?.name ?? "local art form"}`
				},
				{
					time: "Evening",
					icon: Calendar,
					text: state?.festivals[0] ? `${state.festivals[0].name} (seasonal)` : "Cultural museum visit"
				}
			]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: trip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[85] flex items-start justify-center overflow-y-auto bg-ink-900/60 p-0 backdrop-blur-md sm:p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				y: 50,
				opacity: 0,
				scale: .98
			},
			animate: {
				y: 0,
				opacity: 1,
				scale: 1
			},
			exit: {
				y: 50,
				opacity: 0,
				scale: .98
			},
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 250
			},
			onClick: (e) => e.stopPropagation(),
			className: "relative w-full max-w-2xl overflow-hidden rounded-none bg-cream-100 shadow-2xl sm:rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-48",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: trip.image,
						alt: trip.place,
						className: "h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-900/90 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/40 text-white backdrop-blur-sm hover:bg-ink-900/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-0 left-0 right-0 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-cream-200/80",
								children: trip.stateName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-3xl font-extrabold text-white text-shadow-lg",
								children: ["3 Days in ", trip.city]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-cream-200/70",
								children: ["Featuring ", trip.place]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[55vh] overflow-y-auto scrollbar-thin p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								icon: Clock,
								text: "3 Days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								icon: MapPin,
								text: trip.place
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								icon: UtensilsCrossed,
								text: `${state?.foods.length ?? 0} Foods`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								icon: Sparkles,
								text: `${state?.traditions.length ?? 0} Experiences`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-6 text-sm text-ink-700/70",
						children: [
							"A place-first itinerary centred on ",
							trip.place,
							". Adjust based on your travel dates and seasonal events."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-saffron-200",
						children: itinerary.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: day.day * .1 },
							className: "relative pl-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-saffron-500 text-sm font-bold text-white shadow-md",
									children: day.day
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-ink-900",
									children: [
										"Day ",
										day.day,
										" — ",
										day.title
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 space-y-2",
									children: day.activities.map((act, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-xl bg-cream-50 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-saffron-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(act.icon, { className: "h-4 w-4 text-saffron-600" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold uppercase tracking-wide text-saffron-600",
											children: act.time
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm text-ink-800",
											children: act.text
										})] })]
									}, i))
								})
							]
						}, day.day))
					}),
					state && state.events.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl bg-peacock-50 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-2 flex items-center gap-2 font-bold text-peacock-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5" }), " Events Happening"]
						}), state.events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-ink-800",
								children: e.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-peacock-600",
								children: e.date
							})]
						}, e.id))]
					}),
					confirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "mt-6 rounded-2xl bg-peacock-50 p-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-10 w-10 text-peacock-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg font-bold text-ink-900",
								children: "Itinerary confirmed!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-ink-700/70",
								children: [
									"Your 3-day plan for ",
									trip.city,
									" is locked in. Booking ref",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-peacock-700",
										children: ref
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setConfirmed(false),
									className: "rounded-full border border-peacock-300 px-4 py-2 text-sm font-semibold text-peacock-700 transition-all hover:bg-peacock-100 active:scale-95",
									children: "Edit plan"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onClose,
									className: "rounded-full bg-peacock-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-peacock-600 active:scale-95",
									children: "Done"
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setConfirmed(true),
						className: "mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-5 py-3 font-semibold text-white transition-all hover:bg-saffron-600 active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-5 w-5" }), " Confirm This Itinerary"]
					})
				]
			})]
		})
	}) });
}
function Chip({ icon: Icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-full bg-saffron-100 px-3 py-1.5 text-sm font-medium text-saffron-700",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
			" ",
			text
		]
	});
}
function Profile({ onNavigate }) {
	const { profile, authLoading, signOut, points, exploredStates, savedTrips, likedItems, uploads, rewards, claimReward } = useApp();
	const [picked, setPicked] = (0, import_react.useState)("");
	if (authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-saffron-200 border-t-saffron-500" })
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream-100 px-4 pt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm rounded-3xl bg-cream-50 p-10 text-center card-shadow-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-8 w-8 text-saffron-600" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-2xl font-extrabold text-ink-900",
					children: "Your profile awaits"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-700/70",
					children: "Sign in to collect points, save trips and share your own stories from across India."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					className: "mt-6 btn-primary mx-auto",
					children: ["Sign in or create account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			]
		})
	});
	const explorePct = Math.round(exploredStates.size / states.length * 100);
	const progressPct = Math.min(100, Math.round(points / REWARD_THRESHOLD * 100));
	const canClaim = points >= 1e3 && savedTrips.length > 0;
	const badges = [
		{
			id: "heritage",
			icon: Compass,
			label: "Heritage Explorer",
			desc: "Explore 5+ states",
			bgClass: "bg-saffron-100",
			textClass: "text-saffron-600",
			earned: exploredStates.size >= 5
		},
		{
			id: "food",
			icon: UtensilsCrossed,
			label: "Food Explorer",
			desc: "Like 10+ things",
			bgClass: "bg-peacock-100",
			textClass: "text-peacock-600",
			earned: likedItems.length >= 10
		},
		{
			id: "culture",
			icon: Sparkles,
			label: "Culture Keeper",
			desc: "Share 3+ stories",
			bgClass: "bg-maroon-100",
			textClass: "text-maroon-600",
			earned: uploads.length >= 3
		},
		{
			id: "explorer",
			icon: MapPin,
			label: "Trip Planner",
			desc: "Save 3+ trips",
			bgClass: "bg-royal-100",
			textClass: "text-royal-600",
			earned: savedTrips.length >= 3
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-cream-100 pb-20 pt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "relative overflow-hidden rounded-3xl bg-gradient-saffron p-8 text-white card-shadow-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-6 sm:flex-row sm:items-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold backdrop-blur-sm",
									children: (profile.full_name || profile.username).charAt(0).toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-peacock-500 ring-4 ring-saffron-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-white" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 text-center sm:text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-2xl font-extrabold sm:text-3xl",
										children: profile.full_name || profile.username
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-cream-200/80",
										children: [
											"@",
											profile.username,
											" · Cultural Explorer"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap justify-center gap-3 sm:justify-start",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												label: "Points",
												value: points,
												icon: Star
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												label: "States",
												value: exploredStates.size,
												icon: MapPin
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												label: "Saved",
												value: savedTrips.length,
												icon: Bookmark
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												label: "Uploads",
												value: uploads.length,
												icon: Video
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => void signOut(),
								className: "flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "India Explorer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [explorePct, "% explored"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-3 overflow-hidden rounded-full bg-white/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { width: 0 },
								animate: { width: `${explorePct}%` },
								transition: {
									duration: 1,
									ease: "easeOut"
								},
								className: "h-full rounded-full bg-white"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 overflow-hidden rounded-3xl bg-cream-50 p-6 card-shadow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-maroon-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-6 w-6 text-maroon-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-ink-900",
									children: "Free Ticket Reward"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-ink-700/70",
									children: [
										"Earn ",
										50,
										" points per post or video and ",
										200,
										" points per saved trip. At",
										" ",
										REWARD_THRESHOLD,
										" points you get one free ticket to any place from your saved trips — on us."
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1.5 flex items-center justify-between text-sm font-semibold text-ink-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									points,
									" / ",
									REWARD_THRESHOLD,
									" points"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-maroon-600",
									children: [Math.max(0, REWARD_THRESHOLD - points), " to go"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-3 overflow-hidden rounded-full bg-maroon-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: { width: 0 },
									animate: { width: `${progressPct}%` },
									transition: {
										duration: .8,
										ease: "easeOut"
									},
									className: "h-full rounded-full bg-gradient-to-r from-maroon-400 to-saffron-500"
								})
							})]
						}),
						points >= 1e3 ? savedTrips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 rounded-xl bg-saffron-100 px-4 py-3 text-sm text-saffron-700",
							children: "You've unlocked a free ticket! Save a trip first and then pick the place you want to visit."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-ink-900",
									children: "Pick the place for your free ticket:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2 sm:grid-cols-2",
									children: savedTrips.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setPicked(t.id),
										className: `flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all active:scale-95 ${picked === t.id ? "border-saffron-500 bg-saffron-50" : "border-cream-200 bg-cream-100 hover:border-saffron-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: t.image,
											alt: t.place,
											loading: "lazy",
											className: "h-12 w-12 rounded-xl object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-sm font-bold text-ink-900",
												children: t.place
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "truncate text-xs text-ink-700/60",
												children: [
													t.city,
													", ",
													t.stateName
												]
											})]
										})]
									}, t.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: !picked || !canClaim,
									onClick: () => {
										const trip = savedTrips.find((t) => t.id === picked);
										if (trip) {
											claimReward(trip);
											setPicked("");
										}
									},
									className: "flex w-full items-center justify-center gap-2 rounded-full bg-maroon-500 px-5 py-3 font-semibold text-white transition-all hover:bg-maroon-600 active:scale-95 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-5 w-5" }), " Claim my free ticket"]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-center gap-2 text-sm text-ink-700/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), " Keep contributing to unlock your free ticket."]
						}),
						rewards.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold text-ink-900",
								children: "My free tickets"
							}), rewards.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-2xl border-2 border-dashed border-maroon-300 bg-maroon-50 px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-ink-900",
									children: r.place
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-ink-700/60",
									children: [
										r.city,
										", ",
										r.stateName,
										" · ",
										new Date(r.claimedAt).toLocaleDateString()
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-maroon-500 px-3 py-1 font-mono text-xs font-bold text-white",
									children: r.code
								})]
							}, r.id))]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xl font-bold text-ink-900",
						children: "Badges"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
						children: badges.map((badge, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .9
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: { delay: i * .1 },
							className: `rounded-2xl bg-cream-50 p-4 text-center card-shadow ${badge.earned ? "" : "opacity-50 grayscale"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${badge.bgClass}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(badge.icon, { className: `h-6 w-6 ${badge.textClass}` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-ink-900",
									children: badge.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-ink-700/60",
									children: badge.desc
								})
							]
						}, badge.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xl font-bold text-ink-900",
						children: "My Contributions"
					}), uploads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mx-auto h-10 w-10 text-saffron-300" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-ink-700/60",
								children: "You haven't shared any stories yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onNavigate("home"),
								className: "mt-4 btn-primary",
								children: ["Start Exploring India ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: uploads.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-cream-50 p-4 card-shadow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "chip bg-saffron-100 text-saffron-700 capitalize",
										children: u.type
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-700/50",
										children: new Date(u.timestamp).toLocaleDateString()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-bold text-ink-900",
									children: u.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-ink-700/70",
									children: u.caption
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-peacock-600",
									children: [
										"📍 ",
										getStateName(u.stateId),
										" → ",
										u.city,
										u.place && ` → ${u.place}`
									]
								})
							]
						}, u.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xl font-bold text-ink-900",
						children: "Saved Trips"
					}), savedTrips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mx-auto h-10 w-10 text-saffron-300" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-ink-700/60",
								children: "No saved trips yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onNavigate("home"),
								className: "mt-4 btn-primary",
								children: ["Start exploring India ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: savedTrips.map((trip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-2xl bg-cream-50 card-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: trip.image,
								alt: trip.place,
								loading: "lazy",
								className: "h-32 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-ink-700/60",
										children: trip.stateName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-ink-900",
										children: trip.city
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-ink-700/60",
										children: trip.place
									})
								]
							})]
						}, trip.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-xl font-bold text-ink-900",
						children: "Liked Content"
					}), likedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border-2 border-dashed border-saffron-200 bg-cream-50 p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mx-auto h-8 w-8 text-saffron-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink-700/60",
							children: "Content you like will appear here."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: likedItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "chip bg-maroon-100 text-maroon-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 fill-maroon-500" }),
								" ",
								item.title
							]
						}, item.id))
					})]
				})
			]
		})
	});
}
function Stat({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-cream-200/70",
				children: label
			})
		]
	});
}
function AppContent() {
	const [view, setView] = (0, import_react.useState)("home");
	const [selectedStateId, setSelectedStateId] = (0, import_react.useState)(null);
	const [selectedPlace, setSelectedPlace] = (0, import_react.useState)(null);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [uploadOpen, setUploadOpen] = (0, import_react.useState)(false);
	const [reelsOpen, setReelsOpen] = (0, import_react.useState)(false);
	const [tripPlanTarget, setTripPlanTarget] = (0, import_react.useState)(null);
	const { profile, promptAuth } = useApp();
	const openUpload = (0, import_react.useCallback)(() => {
		if (profile) setUploadOpen(true);
		else promptAuth();
	}, [profile, promptAuth]);
	const handleNavigate = (0, import_react.useCallback)((target, payload) => {
		if (target === "home") {
			setView("home");
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else if (target === "state") {
			const stateId = payload;
			if (stateId) {
				setSelectedStateId(stateId);
				setView("state");
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}
		} else if (target === "place") {
			const place = famousPlaces.find((p) => p.id === payload);
			if (place) setSelectedPlace(place);
		} else if (target === "profile") {
			setView("profile");
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else {
			setView("home");
			setTimeout(() => {
				document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
			}, 100);
		}
	}, []);
	const handleSelectState = (0, import_react.useCallback)((stateId) => {
		setSelectedStateId(stateId);
		setView("state");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, []);
	const handleOpenPlace = (0, import_react.useCallback)((placeId) => {
		const place = famousPlaces.find((p) => p.id === placeId);
		if (place) setSelectedPlace(place);
	}, []);
	const handlePlanTrip = (0, import_react.useCallback)((trip) => {
		setTripPlanTarget(trip);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cream-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				onNavigate: handleNavigate,
				onOpenSearch: () => setSearchOpen(true),
				onOpenUpload: openUpload
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
				mode: "wait",
				children: [
					view === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						transition: { duration: .3 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Homepage, {
							onSelectState: handleSelectState,
							onOpenPlace: handleOpenPlace,
							onOpenReels: () => setReelsOpen(true),
							onOpenUpload: openUpload,
							onPlanTrip: handlePlanTrip
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {
							onNavigate: handleNavigate,
							onOpenUpload: openUpload
						})]
					}, "home"),
					view === "state" && selectedStateId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.main, {
						initial: {
							opacity: 0,
							scale: .98
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .98
						},
						transition: {
							duration: .4,
							ease: "easeOut"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateDetail, {
							stateId: selectedStateId,
							onBack: () => {
								setView("home");
								window.scrollTo({
									top: 0,
									behavior: "smooth"
								});
							},
							onOpenPlace: handleOpenPlace,
							onPlanTrip: handlePlanTrip
						})
					}, "state"),
					view === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.main, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						transition: { duration: .3 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, { onNavigate: handleNavigate })
					}, "profile")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {
				open: searchOpen,
				onClose: () => setSearchOpen(false),
				onNavigate: handleNavigate
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
				open: uploadOpen,
				onClose: () => setUploadOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelsView, {
				open: reelsOpen,
				onClose: () => setReelsOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceDetailModal, {
				place: selectedPlace,
				onClose: () => setSelectedPlace(null),
				onPlanTrip: handlePlanTrip
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripPlanner, {
				trip: tripPlanTarget,
				onClose: () => setTripPlanTarget(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPrompt, {})
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HappeningProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContent, {}) }) });
}
//#endregion
export { Index as component };
