import { IMG, avatar, type StateData, type Reel, type PreservationItem } from './images';
export type { StateData, Place, Reel, PreservationItem, Restaurant, EventItem } from './images';

// ─────────────────────────────────────────────
// State map paths — simplified polygon approximations
// on a 0-1000 x 0-1100 viewBox. Recognizable shapes,
// not geographically perfect but clearly "India".
// ─────────────────────────────────────────────

export const states: StateData[] = [
  // ══════════════════ RAJASTHAN ══════════════════
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    capital: 'Jaipur',
    tagline: 'Where every fort tells a story',
    highlight: 'Forts • Ghoomar • Dal Baati Churma',
    description:
      'The land of kings, where golden deserts meet towering forts and palaces painted in pink, blue, and gold. Rajasthan is India in its most regal, romantic, and colorful form.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Thar_Khuri.jpg/1280px-Thar_Khuri.jpg',
    color: '#C13A47',
    mapPath: 'M180,280 L240,250 L300,240 L360,250 L400,280 L420,330 L400,380 L360,410 L300,420 L240,400 L200,360 L170,320 Z',
    mapLabelX: 295,
    mapLabelY: 340,
    places: [
      { id: 'amber-fort', name: 'Amber Fort', city: 'Jaipur', stateId: 'rajasthan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Amer_City.jpg/1280px-Amer_City.jpg', description: 'A majestic hilltop fort of yellow-pink sandstone, where Rajput kings once ruled.', significance: 'UNESCO World Heritage Site showcasing Rajput-Mughal architecture with mirror palaces.', category: 'fort' as const },
      { id: 'hawa-mahal', name: 'Hawa Mahal', city: 'Jaipur', stateId: 'rajasthan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg', description: 'The "Palace of Winds" with 953 tiny windows that let royal women watch street life unseen.', significance: 'An architectural marvel of pink sandstone built in 1799 by Maharaja Sawai Pratap Singh.', category: 'palace' as const },
      { id: 'neemrana-fort', name: 'Neemrana Fort-Palace', city: 'Neemrana', stateId: 'rajasthan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Neemrana_Fort_Palace_terrace_and_the_town_below.jpg/1280px-Neemrana_Fort_Palace_terrace_and_the_town_below.jpg', description: 'A 15th-century hill fort restored into a heritage hotel, spanning seven palace wings.', significance: 'One of India\u2019s oldest heritage resorts, preserving 600 years of Rajput history.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Kathputli', description: 'Ancient string puppetry telling tales of Rajput valor and folklore.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/India_Mandawa_marionetas_01_ni.JPG/1280px-India_Mandawa_marionetas_01_ni.JPG' },
      { name: 'Bandhani', description: 'Tie-and-dye textile art creating intricate dot patterns on fabric.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bandhani_print_open.JPG/1280px-Bandhani_print_open.JPG' },
      { name: 'Block Printing', description: 'Hand-carved wooden blocks stamping patterns onto fabric \u2014 a 500-year craft.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Dabu_Printed_Fabric.jpg' },
    ],
    dances: [
      { name: 'Ghoomar', origin: 'Rajput royal courts', description: 'A graceful twirling dance where women\u2019s flowing skirts bloom like flowers.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg/1280px-Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg' },
      { name: 'Kalbeliya', origin: 'Snake-charmer community', description: 'A sinuous, hypnotic dance mimicking serpent movements, recognized by UNESCO.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jogis%2C_snake_charmers%2C_Hindoos_of_low_caste%2C_Delhi_%28NYPL_b13409080-1125444%29.jpg/1280px-Jogis%2C_snake_charmers%2C_Hindoos_of_low_caste%2C_Delhi_%28NYPL_b13409080-1125444%29.jpg' },
    ],
    music: [
      { name: 'Rajasthani Folk', region: 'Thar Desert', instruments: 'Ravanahatha, Khartal, Dholak', description: 'Ballads of valor and love carried across desert dunes for centuries.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Tyagaraja.jpg' },
      { name: 'Manganiyar Music', region: 'Western Rajasthan', instruments: 'Sarangi, Dholak, Harmonium', description: 'A hereditary musical tradition blending Hindu and Sufi devotional songs.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Folk_Phonic.jpg' },
    ],
    foods: [
      { name: 'Dal Baati Churma', origin: 'Rajasthan', description: 'Baked wheat balls served with lentil curry and sweet crumbled cereal \u2014 the state\u2019s signature.', whereToTry: 'Traditional Rajasthani thali restaurants in Jaipur', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/DalBati.jpg' },
      { name: 'Laal Maas', origin: 'Mewar royal kitchens', description: 'A fiery red mutton curry flavored with mathania chilies, once a royal hunt dish.', whereToTry: 'Heritage restaurants in Udaipur', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Laal-Maans.jpg' },
      { name: 'Ghevar', origin: 'Jaipur', description: 'A disc-shaped honeycomb dessert made during Teej and Raksha Bandhan.', whereToTry: 'Sweet shops in old Jaipur', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ghevar_with_Malai_Topping.jpg/1280px-Ghevar_with_Malai_Topping.jpg' },
    ],
    festivals: [
      { name: 'Pushkar Fair', description: 'The world\u2019s largest camel fair on the banks of Pushkar Lake.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/%28A%29_Camel_Pushkar_fair.jpg' },
      { name: 'Teej', description: 'A monsoon festival celebrating Goddess Parvati with processions and swings.', month: 'August', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Teej.jpg/1280px-Teej.jpg' },
      { name: 'Desert Festival', description: 'Three days of camel polo, turban tying, and folk music in Jaisalmer.', month: 'February', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Pohela_boishakh_2.jpg' },
    ],
    artForms: [
      { name: 'Phad Painting', description: 'Long scroll paintings depicting heroic deeds of local deities.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/WLANL_-_MicheleLovesArt_-_Tropenmuseum_-_Pabuji-Verteldoek_%284669-1%29.jpg' },
      { name: 'Blue Pottery', description: 'Persian-inspired pottery using blue oxide \u2014 a Jaipur specialty.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Dr._Bhau_Daji_Lad_Museum_JEG1715.JPG/1280px-Dr._Bhau_Daji_Lad_Museum_JEG1715.JPG' },
      { name: 'Mojaris', description: 'Hand-stitched leather footwear embroidered with traditional motifs.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/AMRAPALI_MUSEUM%2C_JAIPUR.jpg/1280px-AMRAPALI_MUSEUM%2C_JAIPUR.jpg' },
    ],
    restaurants: [
      { id: 'r1', name: 'Spice Court', city: 'Jaipur', stateId: 'rajasthan', cuisine: 'Rajasthani', rating: 4.7, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/The_delicious_Rajasthani_food.png', description: 'Royal Rajasthani thali in a heritage haveli setting.' },
      { id: 'r2', name: '1135 AD', city: 'Jaipur', stateId: 'rajasthan', cuisine: 'Mughlai-Rajasthani', rating: 4.6, priceRange: '\u20B9\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Northwest_India_map.svg/1280px-Northwest_India_map.svg.png', description: 'Dine inside Amer Fort with candlelit royal ambiance.' },
    ],
    events: [
      { id: 'e1', name: 'Pushkar Fair', location: 'Pushkar, Rajasthan', stateId: 'rajasthan', date: 'Nov 9\u201317', month: 'November', category: 'Cultural Fair', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Pushkar.jpg/1280px-Pushkar.jpg', description: 'A legendary camel fair and cultural mela on Pushkar\u2019s sacred lake.' },
      { id: 'e2', name: 'Jaipur Literature Festival', location: 'Jaipur, Rajasthan', stateId: 'rajasthan', date: 'Jan 16\u201320', month: 'January', category: 'Literature', image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Jairangam_1.jpg', description: 'The world\u2019s largest free literary festival at Diggi Palace.' },
    ],
  },

  // ══════════════════ UTTAR PRADESH ══════════════════
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    tagline: 'The Land of the Taj & Kathak',
    highlight: 'Taj Mahal • Kathak • Awadhi Cuisine',
    description:
      'The heartland of India, home to the Taj Mahal, the Ganges at Varanasi, and the elegant courts of Awadh. A state where poetry, devotion, and cuisine converge.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg',
    color: '#3D5AFE',
    mapPath: 'M350,200 L430,190 L490,210 L520,260 L500,310 L460,340 L400,350 L350,330 L320,280 L330,230 Z',
    mapLabelX: 410,
    mapLabelY: 270,
    places: [
      { id: 'taj-mahal', name: 'Taj Mahal', city: 'Agra', stateId: 'uttar-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Portrait_of_Mumtaz_Mahal_on_Ivory_%28cropped%29.jpg/1280px-Portrait_of_Mumtaz_Mahal_on_Ivory_%28cropped%29.jpg', description: 'An ivory-white marble mausoleum built by Shah Jahan for Mumtaz Mahal.', significance: 'One of the Seven New Wonders of the World and a UNESCO World Heritage Site.', category: 'monument' as const },
      { id: 'varanasi-ghats', name: 'Varanasi Ghats', city: 'Varanasi', stateId: 'uttar-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/1280px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg', description: 'Eighty-eight riverside steps where pilgrims gather for prayer and cremation rites.', significance: 'One of the world\u2019s oldest continuously inhabited cities, sacred to Hindus.', category: 'spiritual' as const },
      { id: 'agra-taj-dome', name: 'Taj Mahal Dome', city: 'Agra', stateId: 'uttar-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Taj_Mahal%2C_Agra%2C_India.jpg/1280px-Taj_Mahal%2C_Agra%2C_India.jpg', description: 'The central onion dome rises 73 meters, crowned with a gold finial.', significance: 'The pinnacle of Mughal architecture, perfectly symmetrical in every dimension.', category: 'monument' as const },
    ],
    traditions: [
      { name: 'Chikankari', description: 'Delicate white-thread hand embroidery from Lucknow, dating to the Mughal era.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg' },
      { name: 'Zardozi', description: 'Gold and silver metallic thread embroidery used on royal garments.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kala-Namakst-all-at-Siddharthnagar-Station.jpg/1280px-Kala-Namakst-all-at-Siddharthnagar-Station.jpg' },
    ],
    dances: [
      { name: 'Kathak', origin: 'Awadh & Braj courts', description: 'A classical dance of storytelling through rapid footwork and spins.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Kathak_contemporary_03.jpg' },
    ],
    music: [
      { name: 'Hindustani Classical', region: 'North India', instruments: 'Sitar, Tabla, Sarangi', description: 'The raga tradition nurtured in the courts of Awadh and Benares.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Suriname_Bhojpuri.jpg/1280px-Suriname_Bhojpuri.jpg' },
      { name: 'Thumri', region: 'Varanasi & Lucknow', instruments: 'Harmonium, Tabla', description: 'Semi-classical romantic devotional songs born in the 19th century.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Vidya_Rao_%28cropped%29.png' },
    ],
    foods: [
      { name: 'Awadhi Biryani', origin: 'Lucknow', description: 'Slow-cooked dum biryani from the royal Awadhi kitchens, fragrant with saffron.', whereToTry: 'Old Lucknow eateries', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/1280px-Hyderabadi_Chicken_Biryani.jpg' },
      { name: 'Petha', origin: 'Agra', description: 'A soft translucent candy made from ash gourd, created during Mughal times.', whereToTry: 'Panchhi Petha, Agra', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg' },
      { name: 'Chaat', origin: 'Varanasi & Lucknow', description: 'The spiritual home of Indian street food \u2014 kachori, samosa, and tamatar chaat.', whereToTry: 'Kashi chaat lanes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Dahi_puri%2C_Doi_phuchka.jpg/1280px-Dahi_puri%2C_Doi_phuchka.jpg' },
    ],
    festivals: [
      { name: 'Dev Deepawali', description: 'Varanasi ghats lit with a million diyas, 15 days after Diwali.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/%27Dev_Deepavali%27_celebrations_in_Varanasi_on_Karthik_Purnima..jpg' },
      { name: 'Krishna Janmashtami', description: 'Celebrating Krishna\u2019s birth in Mathura-Vrindavan with raas leela.', month: 'August', image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Yesoda-krishna.jpg' },
    ],
    artForms: [
      { name: 'Varanasi Silk Weaving', description: 'Brocade Banarasi saris woven with gold zari on handlooms.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Exhibit_in_Craft_Museum_New_Delhi-30.JPG/1280px-Exhibit_in_Craft_Museum_New_Delhi-30.JPG' },
      { name: 'Marble Inlay', origin: 'Agra', description: 'Pietra dura inlay work, the same craft used on the Taj Mahal.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ellora%2C_tempio_kailasanatha_%28grotta_16%29%2C_750-775_dc_ca.%2C_tempio_di_shiva_visto_dalla_terrazza_del_gopuram%2C_lato_dx_%28sud%29_01.jpg/1280px-Ellora%2C_tempio_kailasanatha_%28grotta_16%29%2C_750-775_dc_ca.%2C_tempio_di_shiva_visto_dalla_terrazza_del_gopuram%2C_lato_dx_%28sud%29_01.jpg' },
    ],
    restaurants: [
      { id: 'r3', name: 'Tunday Kababi', city: 'Lucknow', stateId: 'uttar-pradesh', cuisine: 'Awadhi', rating: 4.5, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Paya_Curry.JPG/1280px-Paya_Curry.JPG', description: 'Legendary galouti kebabs since 1905.' },
      { id: 'r4', name: 'Chowk Chaat Corner', city: 'Varanasi', stateId: 'uttar-pradesh', cuisine: 'Street Food', rating: 4.4, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/StreetfoodNY.jpg/1280px-StreetfoodNY.jpg', description: 'Best tamatar chaat in the old city lanes.' },
    ],
    events: [
      { id: 'e3', name: 'Dev Deepawali', location: 'Varanasi, UP', stateId: 'uttar-pradesh', date: 'Nov 26', month: 'November', category: 'Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Kartiki_Punam.JPG', description: 'A million diyas illuminate the ghats of the holy city.' },
    ],
  },

  // ══════════════════ PUNJAB ══════════════════
  {
    id: 'punjab',
    name: 'Punjab',
    capital: 'Chandigarh',
    tagline: 'The Land of Five Rivers & Bhangra',
    highlight: 'Golden Temple • Bhangra • Makki di Roti',
    description:
      'Where golden fields sway, the Golden Temple glows, and every celebration bursts into Bhangra. Punjab is joy, devotion, and the warmth of sarson da saag.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Golden_Temple%2C_Amritsar%2C_Punjab_UNAG.jpg/1280px-Golden_Temple%2C_Amritsar%2C_Punjab_UNAG.jpg',
    color: '#F5B800',
    mapPath: 'M250,140 L340,130 L390,160 L380,200 L330,210 L270,200 L230,180 Z',
    mapLabelX: 310,
    mapLabelY: 170,
    places: [
      { id: 'golden-temple', name: 'Golden Temple', city: 'Amritsar', stateId: 'punjab', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg', description: 'The holiest shrine of Sikhism, its gold-leafed sanctum mirrored in a sacred pool.', significance: 'The spiritual center of Sikh faith, open to all regardless of religion or caste.', category: 'spiritual' as const },
      { id: 'golden-temple-dusk', name: 'Golden Temple at Dusk', city: 'Amritsar', stateId: 'punjab', image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Punjab_in_India_%281961%29.png', description: 'At sunset the temple glows amber, reflected perfectly in the Amrit Sarovar.', significance: 'The evening Palki Sahib ceremony is one of the most moving rituals in the world.', category: 'spiritual' as const },
    ],
    traditions: [
      { name: 'Phulkari', description: '"Flower work" \u2014 dense, colorful thread embroidery on coarse fabric.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Contemporary_Phulkari_design.jpg/1280px-Contemporary_Phulkari_design.jpg' },
      { name: 'Bhangra', description: 'A high-energy harvest dance with dhol drums and bright turbans.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Open_Hand_monument%2C_Chandigarh.jpg/1280px-Open_Hand_monument%2C_Chandigarh.jpg' },
    ],
    dances: [
      { name: 'Bhangra', origin: 'Punjab harvest fields', description: 'Punjab\u2019s explosive harvest dance \u2014 leaps, shoulder shakes, and dhol beats.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Bhangra-dance.jpg' },
      { name: 'Giddha', origin: 'Punjab villages', description: 'A women\u2019s folk dance with rhythmic clapping and boli verses.', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Giddha_1.jpg' },
    ],
    music: [
      { name: 'Punjabi Folk', region: 'Punjab', instruments: 'Dhol, Tumbi, Chimta', description: 'Vibrant folk songs of love, harvest, and celebration.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Two_wandering_jogis_from_Punjab%2C_1875.jpg/1280px-Two_wandering_jogis_from_Punjab%2C_1875.jpg' },
      { name: 'Gurbani Kirtan', region: 'Amritsar', instruments: 'Harmonium, Tabla', description: 'Devotional Sikh hymns sung in ragas at the Golden Temple.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Chaitanya_sankirtan.jpg/1280px-Chaitanya_sankirtan.jpg' },
    ],
    foods: [
      { name: 'Sarson da Saag & Makki di Roti', origin: 'Punjab', description: 'Mustard greens slow-cooked with spices, served with cornmeal flatbread and white butter.', whereToTry: 'Dhabas across rural Punjab', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Makki_Di_Roti.JPG/1280px-Makki_Di_Roti.JPG' },
      { name: 'Amritsari Kulcha', origin: 'Amritsar', description: 'Stuffed bread baked in a tandoor, served with chole and mint chutney.', whereToTry: 'All India Mash, Amritsar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Tandoori_Chicken_with_oven.jpg/1280px-Tandoori_Chicken_with_oven.jpg' },
    ],
    festivals: [
      { name: 'Lohri', description: 'Bonfire festival marking the end of winter, with peanuts, rewri, and Bhangra.', month: 'January', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Lohri_bonfire.png' },
      { name: 'Baisakhi', description: 'Punjab\u2019s harvest festival and the founding day of the Khalsa.', month: 'April', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ramman_Festival_Celebration_in_Uttarakhand.jpg/1280px-Ramman_Festival_Celebration_in_Uttarakhand.jpg' },
    ],
    artForms: [
      { name: 'Punjabi Jutti', description: 'Embroidered leather slippers with curled-up toes.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Punjabi_Traditional_Fashion_-_Cultural_Night_-_Wiki_Conference_India_-_CGC_-_Mohali_2016-08-05_7367.JPG/1280px-Punjabi_Traditional_Fashion_-_Cultural_Night_-_Wiki_Conference_India_-_CGC_-_Mohali_2016-08-05_7367.JPG' },
      { name: 'Phulkari', description: 'Flower-work embroidery \u2014 each piece takes months to complete.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chachi_atro_da_ghar_at_virasti_mela%2C_bathinda.jpg/1280px-Chachi_atro_da_ghar_at_virasti_mela%2C_bathinda.jpg' },
    ],
    restaurants: [
      { id: 'r5', name: 'Brothers Dhaba', city: 'Amritsar', stateId: 'punjab', cuisine: 'Punjabi', rating: 4.6, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pakistani_Food_Karahi_Beef.jpg/1280px-Pakistani_Food_Karahi_Beef.jpg', description: 'Authentic Punjabi thali near the Golden Temple.' },
      { id: 'r6', name: 'Bharawan da Dhaba', city: 'Amritsar', stateId: 'punjab', cuisine: 'Vegetarian Punjabi', rating: 4.5, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vegetarian_diet.jpg/1280px-Vegetarian_diet.jpg', description: 'A century-old vegetarian institution since 1912.' },
    ],
    events: [
      { id: 'e4', name: 'Lohri Celebrations', location: 'Amritsar, Punjab', stateId: 'punjab', date: 'Jan 13', month: 'January', category: 'Harvest Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/POL_2007_09_2_dozynki_jasnogorskie2_01.jpg', description: 'Bonfires, Bhangra, and winter sweets across Punjab.' },
    ],
  },

  // ══════════════════ KERALA ══════════════════
  {
    id: 'kerala',
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    tagline: "God's Own Country",
    highlight: 'Backwaters • Kathakali • Onam Sadhya',
    description:
      'Emerald backwaters, spice gardens, and ancient temples. Kerala is where Ayurveda, Kathakali, and coconut palms create a serene tropical paradise.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Boathouse_%287063399547%29.jpg/1280px-Boathouse_%287063399547%29.jpg',
    color: '#0BA884',
    mapPath: 'M200,720 L180,750 L170,790 L190,830 L220,850 L260,840 L280,800 L270,760 L240,730 Z',
    mapLabelX: 225,
    mapLabelY: 785,
    places: [
      { id: 'kerala-backwaters', name: 'Kerala Backwaters', city: 'Alleppey', stateId: 'kerala', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/House_Boat_DSW.jpg/1280px-House_Boat_DSW.jpg', description: 'A labyrinth of palm-fringed canals explored on traditional houseboats.', significance: 'A unique ecosystem of 900 km of interconnected waterways, rice fields, and villages.', category: 'nature' as const },
      { id: 'kerala-houseboat', name: 'Houseboat Cruise', city: 'Kumarakom', stateId: 'kerala', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/LakeUnionHouseboat.jpg/1280px-LakeUnionHouseboat.jpg', description: 'Glide through Vembanad Lake on a kettuvallam \u2014 a thatched rice barge converted to a floating home.', significance: 'These boats were originally used to transport rice; now they preserve a vanishing way of life.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Ayurveda', description: 'A 5,000-year-old system of natural healing using herbs, oils, and diet.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kalari_Pattu.jpg/1280px-Kalari_Pattu.jpg' },
      { name: 'Kalaripayattu', description: 'One of the world\u2019s oldest martial arts, born in Kerala\u2019s hills.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/%E0%B4%95%E0%B5%86%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%B5%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B4%99%E0%B5%8D%E0%B4%99%E0%B5%BE-%E0%B4%95%E0%B5%81%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%A8%E0%B4%BE%E0%B4%9F%E0%B4%BF%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86_%E0%B4%AE%E0%B5%81%E0%B4%96%E0%B4%AE%E0%B5%81%E0%B4%A6%E0%B5%8D%E0%B4%B0.jpg/1280px-%E0%B4%95%E0%B5%86%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%B5%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B4%99%E0%B5%8D%E0%B4%99%E0%B5%BE-%E0%B4%95%E0%B5%81%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%A8%E0%B4%BE%E0%B4%9F%E0%B4%BF%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86_%E0%B4%AE%E0%B5%81%E0%B4%96%E0%B4%AE%E0%B5%81%E0%B4%A6%E0%B5%8D%E0%B4%B0.jpg' },
    ],
    dances: [
      { name: 'Kathakali', origin: 'Kerala temples', description: 'A dance-drama with elaborate green and red makeup, telling epics through mudras.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Kathakali_-Play_with_Kaurava.jpg/1280px-Kathakali_-Play_with_Kaurava.jpg' },
      { name: 'Mohiniyattam', origin: 'Kerala', description: 'A graceful solo female dance, "the dance of the enchantress."', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Mohiniyattom_performance.jpg' },
    ],
    music: [
      { name: 'Carnatic Music', region: 'South India', instruments: 'Veena, Mridangam, Violin', description: 'One of India\u2019s two great classical traditions, emphasizing devotional krithis.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tanjore-style_Carnatic_tambura.JPG/1280px-Tanjore-style_Carnatic_tambura.JPG' },
      { name: 'Sopanam', region: 'Kerala temples', instruments: 'Chenda, Edakka', description: 'Temple music sung at the sanctum steps, accompanying Kathakali performances.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/010092022_Shri_Anantha_Padmanabha_Swamy_temple%2C_Kumbla_Kerala_124.jpg/1280px-010092022_Shri_Anantha_Padmanabha_Swamy_temple%2C_Kumbla_Kerala_124.jpg' },
    ],
    foods: [
      { name: 'Onam Sadhya', origin: 'Kerala', description: 'A grand vegetarian feast of 26+ dishes served on a banana leaf during Onam.', whereToTry: 'During Onam festival statewide', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Onapookkalam.jpg/1280px-Onapookkalam.jpg' },
      { name: 'Appam with Stew', origin: 'Kerala Christian community', description: 'Lacy rice pancakes with coconut milk stew \u2014 a breakfast classic.', whereToTry: 'Kerala restaurants in Kochi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Tamil_distribution.png/1280px-Tamil_distribution.png' },
      { name: 'Puttu & Kadala', origin: 'Kerala', description: 'Steamed rice cylinders with black chickpea curry \u2014 the quintessential Kerala breakfast.', whereToTry: 'Thatukadas (street stalls) statewide', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Puttu_%28Rice_Flour_steamed_cake%29.jpg/1280px-Puttu_%28Rice_Flour_steamed_cake%29.jpg' },
    ],
    festivals: [
      { name: 'Onam', description: 'A ten-day harvest festival with flower carpets (pookalam) and boat races.', month: 'August\u2013September', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Thrikkakara_Temple_DSC09337.JPG/1280px-Thrikkakara_Temple_DSC09337.JPG' },
      { name: 'Thrissur Pooram', description: 'A spectacular temple festival with 30 caparisoned elephants and percussion.', month: 'April\u2013May', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kudamatom_at_thrissur_pooram_2013_7618.JPG/1280px-Kudamatom_at_thrissur_pooram_2013_7618.JPG' },
    ],
    artForms: [
      { name: 'Mural Painting', description: 'Ancient temple wall art using natural pigments \u2014 panchavarna (five colors).', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Malayali_women_wearing_Kerala_saree.jpg/1280px-Malayali_women_wearing_Kerala_saree.jpg' },
      { name: 'Coir Craft', description: 'Rope and mat weaving from coconut husk fiber.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Government_of_Kerala_Logo.svg/1280px-Government_of_Kerala_Logo.svg.png' },
    ],
    restaurants: [
      { id: 'r7', name: 'Malabar Cuisine', city: 'Kochi', stateId: 'kerala', cuisine: 'Kerala', rating: 4.7, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg', description: 'Seafood and sadhya on a waterfront terrace.' },
      { id: 'r8', name: 'Saravana Bhavan', city: 'Thiruvananthapuram', stateId: 'kerala', cuisine: 'South Indian', rating: 4.4, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/%22Paddy_transplantation_in_Tamil_Nadu%22.jpg/1280px-%22Paddy_transplantation_in_Tamil_Nadu%22.jpg', description: 'Crispy dosas and filter coffee since 1981.' },
    ],
    events: [
      { id: 'e5', name: 'Nehru Trophy Boat Race', location: 'Alleppey, Kerala', stateId: 'kerala', date: 'Aug 10', month: 'August', category: 'Sport', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Kerala_boatrace.jpg', description: 'Snake boat races on Punnamada Lake \u2014 100+ oarsmen per boat.' },
    ],
  },

  // ══════════════════ MAHARASHTRA ══════════════════
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    capital: 'Mumbai',
    tagline: 'The Land of Caves & Cinema',
    highlight: 'Ajanta-Ellora • Warli Art • Vada Pav',
    description:
      'From the rock-cut wonders of Ajanta-Ellora to the energy of Mumbai, Maharashtra is where ancient art meets modern dreams.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Cave_26%2C_Ajanta.jpg/1280px-Cave_26%2C_Ajanta.jpg',
    color: '#FF8C2A',
    mapPath: 'M220,440 L300,430 L360,460 L370,520 L340,560 L280,570 L220,550 L200,500 Z',
    mapLabelX: 290,
    mapLabelY: 495,
    places: [
      { id: 'india-gate-mumbai', name: 'Gateway of India', city: 'Mumbai', stateId: 'maharashtra', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg', description: 'A 26-meter basalt arch overlooking the Arabian Sea, built to welcome King George V.', significance: 'Mumbai\u2019s most iconic landmark, where the last British troops departed India.', category: 'monument' as const },
      { id: 'india-gate-sunset', name: 'Gateway at Sunset', city: 'Mumbai', stateId: 'maharashtra', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coastal_Road%2C_Mumbai%2C_November_2025.jpg/1280px-Coastal_Road%2C_Mumbai%2C_November_2025.jpg', description: 'As the sun sets, the arch glows gold against Mumbai\u2019s harbor.', significance: 'The monument frames the city\u2019s colonial past and its independent future.', category: 'monument' as const },
    ],
    traditions: [
      { name: 'Warli Art', origin: 'Thane tribes', description: 'Tribal painting using white rice paste on mud walls \u2014 circles, triangles, squares.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Statuette_Mambia_Nig%C3%A9ria.jpg/1280px-Statuette_Mambia_Nig%C3%A9ria.jpg' },
      { name: 'Ganesh Festival', description: 'A ten-day celebration with giant clay idols, music, and processions.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Building_of_Sir_J._J._School_of_Art%2C_Mumbai.jpg/1280px-Building_of_Sir_J._J._School_of_Art%2C_Mumbai.jpg' },
    ],
    dances: [
      { name: 'Lavani', origin: 'Maharashtra', description: 'A powerful folk dance with rapid rhythms, traditionally performed on stage.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Lavani_1.jpg/1280px-Lavani_1.jpg' },
      { name: 'Lezim', origin: 'Rural Maharashtra', description: 'A vigorous group dance with a small jingling instrument called lezim.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Lezim-dancers.jpg' },
    ],
    music: [
      { name: 'Natya Sangeet', region: 'Maharashtra', instruments: 'Harmonium, Tabla', description: 'A semi-classical musical theater tradition from the Marathi stage.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Ghasiram_Kotwal_play.JPG/1280px-Ghasiram_Kotwal_play.JPG' },
      { name: 'Bhavageet', region: 'Maharashtra', instruments: 'Harmonium, Tabla', description: 'Expressive poetry set to music \u2014 the emotional voice of Marathi culture.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Jitendra_Abhisheki.png' },
    ],
    foods: [
      { name: 'Vada Pav', origin: 'Mumbai street', description: 'A spiced potato fritter in a bun with garlic chutney \u2014 Mumbai\u2019s beloved burger.', whereToTry: 'Ashok Vada Pav, Dadar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/1280px-Vada_Pav-Indian_street_food.JPG' },
      { name: 'Maharashtrian Thali', origin: 'Pune', description: 'A balanced plate with bhakri, pithla, thecha, and solkadhi.', whereToTry: 'Shreyas, Pune', image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Vegetarian_Curry.jpeg' },
    ],
    festivals: [
      { name: 'Ganesh Chaturthi', description: 'Mumbai\u2019s biggest festival \u2014 giant idols, drumming, and sea immersions.', month: 'August\u2013September', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Khairathabad_Vinayakudu_2021.jpg/1280px-Khairathabad_Vinayakudu_2021.jpg' },
      { name: 'Kala Ghoda Festival', description: 'A nine-day arts festival in Mumbai\u2019s heritage district.', month: 'February', image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Kala_ghoda_2007_entrance.jpg' },
    ],
    artForms: [
      { name: 'Warli Painting', description: 'A 2,500-year-old tribal art form using simple geometric shapes.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vajreshwari_Vogini_Mandir%2C_Maharashtra_-_panoramio_%2830%29.jpg/1280px-Vajreshwari_Vogini_Mandir%2C_Maharashtra_-_panoramio_%2830%29.jpg' },
      { name: 'Paithani Sarees', description: 'Silk saris with gold zari peacock borders from Paithan.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Parrot_Peacock_border_paithani_saree.jpg' },
    ],
    restaurants: [
      { id: 'r9', name: 'Cafe Madras', city: 'Mumbai', stateId: 'maharashtra', cuisine: 'Udupi', rating: 4.5, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Udupi_Krishna_Temple.jpg/1280px-Udupi_Krishna_Temple.jpg', description: 'Iconic South Indian breakfast in Matunga since 1930s.' },
      { id: 'r10', name: 'Shreyas', city: 'Pune', stateId: 'maharashtra', cuisine: 'Maharashtrian', rating: 4.4, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg/1280px-Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg', description: 'Authentic Maharashtrian thali on banana leaf.' },
    ],
    events: [
      { id: 'e6', name: 'Kala Ghoda Arts Festival', location: 'Mumbai, Maharashtra', stateId: 'maharashtra', date: 'Feb 1\u20139', month: 'February', category: 'Arts', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kala_Ghoda_Statue.jpg/1280px-Kala_Ghoda_Statue.jpg', description: 'Nine days of art, music, dance, and food in Mumbai\u2019s heritage quarter.' },
    ],
  },

  // ══════════════════ GUJARAT ══════════════════
  {
    id: 'gujarat',
    name: 'Gujarat',
    capital: 'Gandhinagar',
    tagline: 'The Land of Garba & Lions',
    highlight: 'Rann Utsav • Garba • Dhokla',
    description:
      'Where the white salt desert glows under the full moon and nine nights of Garba fill every courtyard with rhythm and color.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rani_ki_vav_02.jpg/1280px-Rani_ki_vav_02.jpg',
    color: '#3D5AFE',
    mapPath: 'M130,360 L200,340 L260,360 L270,420 L240,460 L180,470 L140,450 L120,400 Z',
    mapLabelX: 195,
    mapLabelY: 405,
    places: [
      { id: 'rann-of-kutch', name: 'Rann of Kutch', city: 'Bhuj', stateId: 'gujarat', image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Gujarat_Gulfs.jpg', description: 'A vast white salt desert that transforms into a moonlit wonderland in winter.', significance: 'One of the largest salt deserts in the world, home to unique salt-flat ecosystems.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Garba', description: 'A circular dance around a lamp or Goddess image during Navratri.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/GARBA_DANCE_GUJARAT.jpg/1280px-GARBA_DANCE_GUJARAT.jpg' },
      { name: 'Patola Weaving', description: 'Double-ikat silk weaving \u2014 so complex, one sari takes six months.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Hermann_Linde_-_Girl_standing_in_a_veranda_wearing_a_Pochampalli_sari_%28ca.1895%29.jpg' },
    ],
    dances: [
      { name: 'Garba', origin: 'Gujarat', description: 'A joyful circular dance performed during Navratri with sticks (dandiya).', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garba_%28dance%29.jpg/1280px-Garba_%28dance%29.jpg' },
      { name: 'Dandiya Raas', origin: 'Gujarat', description: 'A stick dance where partners strike dandiyas in rhythmic patterns.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Children_performing_Dandiya_in_Palace_Grounds%2C_Bangalore.jpg/1280px-Children_performing_Dandiya_in_Palace_Grounds%2C_Bangalore.jpg' },
    ],
    music: [
      { name: 'Gujarati Folk', region: 'Gujarat', instruments: 'Dhol, Dandiya, Manjira', description: 'Festival songs for Navratri, weddings, and Holi.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Traditional_Folk_dance_garba_dress.jpg/1280px-Traditional_Folk_dance_garba_dress.jpg' },
    ],
    foods: [
      { name: 'Dhokla', origin: 'Gujarat', description: 'A fermented steamed batter cake, spongy and lightly sweet.', whereToTry: 'Gujarati farsan shops', image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Dhokla_on_Gujrart.jpg' },
      { name: 'Khandvi', description: 'Thin, rolled gram-flour snacks tempered with mustard and coconut.', whereToTry: 'Ahmedabad sweet shops', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chole_Bhature_from_Nagpur.JPG/1280px-Chole_Bhature_from_Nagpur.JPG' },
    ],
    festivals: [
      { name: 'Rann Utsav', description: 'A three-month festival on the white desert with tent cities and folk music.', month: 'November\u2013February', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Rann_of_Kutch_-_White_Desert.jpg/1280px-Rann_of_Kutch_-_White_Desert.jpg' },
      { name: 'Navratri', description: 'Nine nights of Garba and Dandiya across every Gujarati town.', month: 'September\u2013October', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Shardiya_Navratri_Festival_in_Pune_2020.jpg/1280px-Shardiya_Navratri_Festival_in_Pune_2020.jpg' },
    ],
    artForms: [
      { name: 'Bandhani', description: 'Fine tie-and-dye creating intricate dot patterns \u2014 a Gujarati specialty.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Ahemdabad_Skyline.jpg' },
      { name: 'Kutch Embroidery', description: 'Mirror-work embroidery with geometric patterns from Kutch villages.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Antique_Kutch_Embroidery.jpg' },
    ],
    restaurants: [
      { id: 'r11', name: 'Agashiye', city: 'Ahmedabad', stateId: 'gujarat', cuisine: 'Gujarati', rating: 4.6, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gujrati_Thali.jpg/1280px-Gujrati_Thali.jpg', description: 'Rooftop heritage dining with a 25-dish Gujarati thali.' },
    ],
    events: [
      { id: 'e7', name: 'Rann Utsav', location: 'Bhuj, Gujarat', stateId: 'gujarat', date: 'Nov\u2013Feb', month: 'November', category: 'Cultural Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Sunset_at_Rann_of_Kutch%2C_Dhordo%2C_Gujarat.jpg/1280px-Sunset_at_Rann_of_Kutch%2C_Dhordo%2C_Gujarat.jpg', description: 'A tent city on the white salt desert with folk music and handicrafts.' },
    ],
  },

  // ══════════════════ WEST BENGAL ══════════════════
  {
    id: 'west-bengal',
    name: 'West Bengal',
    capital: 'Kolkata',
    tagline: 'The Land of Durga Puja & Rabindra Sangeet',
    highlight: 'Durga Puja • Rabindra Sangeet • Rosogolla',
    description:
      'Where art, intellect, and devotion intertwine. From the grand pandals of Durga Puja to the misty tea gardens of Darjeeling, Bengal is a state of artists.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Howrah_bridge_betwixt_Lights.jpg/1280px-Howrah_bridge_betwixt_Lights.jpg',
    color: '#C13A47',
    mapPath: 'M470,430 L540,420 L580,450 L570,500 L520,510 L480,490 L460,460 Z',
    mapLabelX: 520,
    mapLabelY: 465,
    places: [
      { id: 'victoria-memorial', name: 'Victoria Memorial', city: 'Kolkata', stateId: 'west-bengal', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/1280px-Victoria_Memorial_situated_in_Kolkata.jpg', description: 'A grand marble palace blending British and Mughal architecture, built in memory of Queen Victoria.', significance: 'Kolkata\u2019s most iconic building, now a museum of colonial and Indian history.', category: 'monument' as const },
    ],
    traditions: [
      { name: 'Durga Puja', description: 'A five-day festival with elaborate clay idols and artistic pandals.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0_%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AC%E0%A6%9C%E0%A6%A8%E0%A7%80%E0%A6%A8_%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A7%8B%E0%A7%8E%E0%A6%B8%E0%A6%AC_%E0%A7%A8%E0%A7%A6%E0%A7%A7%E0%A7%AE.jpg/1280px-%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0_%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AC%E0%A6%9C%E0%A6%A8%E0%A7%80%E0%A6%A8_%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A7%8B%E0%A7%8E%E0%A6%B8%E0%A6%AC_%E0%A7%A8%E0%A7%A6%E0%A7%A7%E0%A7%AE.jpg' },
      { name: 'Kantha Stitch', description: 'Running-stitch embroidery on layered old cloth, turning rags into art.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Nakshi_Kantha_craftswoman.jpg/1280px-Nakshi_Kantha_craftswoman.jpg' },
    ],
    dances: [
      { name: 'Chhau', origin: 'Purulia', description: 'A martial mask dance with acrobatic leaps, telling stories from the epics.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chhau_Nritya_%281%29.jpg/1280px-Chhau_Nritya_%281%29.jpg' },
    ],
    music: [
      { name: 'Rabindra Sangeet', region: 'Bengal', instruments: 'Esraj, Tabla, Harmonium', description: '2,000+ songs by Nobel laureate Rabindranath Tagore.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Valmiki_Pratibha_Indira_Devi_%26_Rabindranath_Tagore.jpg/1280px-Valmiki_Pratibha_Indira_Devi_%26_Rabindranath_Tagore.jpg' },
      { name: 'Baul Music', region: 'Rural Bengal', instruments: 'Ektara, Dotara, Khamak', description: 'Mystic minstrel songs of wandering Baul singers, a UNESCO heritage.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Ektara_player.jpg' },
    ],
    foods: [
      { name: 'Rosogolla', origin: 'Kolkata', description: 'Soft chenna balls soaked in light sugar syrup \u2014 Bengal\u2019s sweet pride.', whereToTry: 'K.C. Das, Kolkata', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/1280px-Rasgulla.jpg' },
      { name: 'Macher Jhol', origin: 'Bengal', description: 'A light fish curry with potatoes and eggplant \u2014 the everyday Bengali meal.', whereToTry: 'Bhojohori Manna, Kolkata', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Alu_ar_dhonepata_diye_Boyal_machher_jhol.jpg/1280px-Alu_ar_dhonepata_diye_Boyal_machher_jhol.jpg' },
    ],
    festivals: [
      { name: 'Durga Puja', description: 'A UNESCO-recognized festival with artistic pandals, drumming, and idol immersions.', month: 'September\u2013October', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Durga_Puja_1.jpg/1280px-Durga_Puja_1.jpg' },
    ],
    artForms: [
      { name: 'Kantha Embroidery', description: 'Stitching old cloth into quilts and saris \u2014 a folk art of Bengali women.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Nakshi_kantha1.JPG/1280px-Nakshi_kantha1.JPG' },
      { name: 'Terracotta', description: 'Red-clay temple sculpture and pottery from Bankura district.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Terracotta_panels_of_Char_Bangla_group_of_temples_of_Azimganj_in_Murshidabad_district_of_West_Bengal._56.jpg/1280px-Terracotta_panels_of_Char_Bangla_group_of_temples_of_Azimganj_in_Murshidabad_district_of_West_Bengal._56.jpg' },
    ],
    restaurants: [
      { id: 'r12', name: 'Bhojohori Manna', city: 'Kolkata', stateId: 'west-bengal', cuisine: 'Bengali', rating: 4.6, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bengali_dialects.png/1280px-Bengali_dialects.png', description: 'Authentic home-style Bengali cuisine.' },
    ],
    events: [
      { id: 'e8', name: 'Durga Puja', location: 'Kolkata, West Bengal', stateId: 'west-bengal', date: 'Oct 9\u201313', month: 'October', category: 'UNESCO Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Mahishasura-Mardini_Durga.jpg', description: 'Five days of artistic pandals, dhak drums, and devotion.' },
    ],
  },

  // ══════════════════ TAMIL NADU ══════════════════
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    capital: 'Chennai',
    tagline: 'The Land of Temples & Bharatanatyam',
    highlight: 'Meenakshi Temple • Bharatanatyam • Filter Coffee',
    description:
      'Home to towering gopurams, ancient classical music, and the world\u2019s oldest living language. Tamil Nadu is a civilization that has preserved its culture for two millennia.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mamallapuram_view.jpg/1280px-Mamallapuram_view.jpg',
    color: '#F5B800',
    mapPath: 'M290,680 L350,670 L370,700 L360,740 L320,760 L280,750 L270,710 Z',
    mapLabelX: 320,
    mapLabelY: 715,
    places: [
      { id: 'meenakshi-temple', name: 'Meenakshi Temple', city: 'Madurai', stateId: 'tamil-nadu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg', description: 'A vast temple complex with 14 gopurams covered in thousands of colorful sculptures.', significance: 'A 2,000-year-old temple that is the heart of Tamil culture and Dravidian architecture.', category: 'temple' as const },
    ],
    traditions: [
      { name: 'Kolam', description: 'Intricate rice-flour patterns drawn at doorsteps each dawn \u2014 math and art combined.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pongal_fest.jpg' },
      { name: 'Bharatanatyam', description: 'India\u2019s oldest classical dance, born in Tamil temple courts.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Thanjavur%2C_Brihadishwara_Temple%2C_dance_%286851706080%29.jpg/1280px-Thanjavur%2C_Brihadishwara_Temple%2C_dance_%286851706080%29.jpg' },
    ],
    dances: [
      { name: 'Bharatanatyam', origin: 'Tamil Nadu temples', description: 'India\u2019s oldest classical dance, where geometry meets devotion in every pose.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Murugashankari_Leo.jpg' },
    ],
    music: [
      { name: 'Carnatic Music', region: 'Tamil Nadu', instruments: 'Veena, Mridangam, Violin', description: 'The south Indian classical tradition of devotional krithis and ragas.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Carnatic_violinist.jpg' },
    ],
    foods: [
      { name: 'Dosa & Idli', origin: 'Tamil Nadu', description: 'Crispy rice crepes and steamed rice cakes with sambar and chutney.', whereToTry: 'Murugan Idli Shop, Madurai', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Masala_Dosa_2023.jpg/1280px-Masala_Dosa_2023.jpg' },
      { name: 'Filter Coffee', origin: 'Tamil Nadu', description: 'Strong, frothy coffee brewed in a steel filter and served in a dabara tumbler.', whereToTry: 'Any Chennai tiffin room', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/John_Frederick_Lewis_004.jpg/1280px-John_Frederick_Lewis_004.jpg' },
    ],
    festivals: [
      { name: 'Pongal', description: 'A four-day harvest thanksgiving with sweet pongal and bull-taming jallikattu.', month: 'January', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ven_pongal_with_sambar_and_chutney.jpg/1280px-Ven_pongal_with_sambar_and_chutney.jpg' },
    ],
    artForms: [
      { name: 'Tanjore Painting', description: 'Gold-leaf and gem-adorned classical paintings of gods and goddesses.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Thanjavur_art_from_south_India.jpg/1280px-Thanjavur_art_from_south_India.jpg' },
      { name: 'Kanchipuram Silk', description: 'Pure silk saris woven with gold zari \u2014 a 400-year tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Parameswara_Vinnagaram.JPG/1280px-Parameswara_Vinnagaram.JPG' },
    ],
    restaurants: [
      { id: 'r13', name: 'Murugan Idli Shop', city: 'Madurai', stateId: 'tamil-nadu', cuisine: 'South Indian', rating: 4.5, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Tradtional_Thali.jpg', description: 'The best idli-dosa in Tamil Nadu since 1981.' },
    ],
    events: [
      { id: 'e9', name: 'Pongal Festival', location: 'Madurai, Tamil Nadu', stateId: 'tamil-nadu', date: 'Jan 14\u201317', month: 'January', category: 'Harvest Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pola_in_Chinawal_9.jpg/1280px-Pola_in_Chinawal_9.jpg', description: 'Four days of harvest celebration with jallikattu and sweet pongal.' },
    ],
  },

  // ══════════════════ KARNATAKA ══════════════════
  {
    id: 'karnataka',
    name: 'Karnataka',
    capital: 'Bengaluru',
    tagline: 'The Land of Palaces & Sandalwood',
    highlight: 'Mysore Palace • Mysore Pak • Carnatic Music',
    description:
      'From the glittering Mysore Palace to the ruins of Hampi, Karnataka blends royal grandeur with ancient temple towns and vibrant tech cities.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hampi_virupaksha_temple.jpg/1280px-Hampi_virupaksha_temple.jpg',
    color: '#A02E3A',
    mapPath: 'M200,560 L280,550 L330,580 L320,630 L270,650 L210,640 L180,600 Z',
    mapLabelX: 255,
    mapLabelY: 600,
    places: [
      { id: 'mysore-palace', name: 'Mysore Palace', city: 'Mysore', stateId: 'karnataka', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Mysuru_Montage.jpg', description: 'A breathtaking Indo-Saracenic palace that glows with 97,000 bulbs on Sundays.', significance: 'The former seat of the Wodeyar dynasty, one of India\u2019s most visited monuments.', category: 'palace' as const },
      { id: 'mysore-palace-detail', name: 'Mysore Palace Domes', city: 'Mysore', stateId: 'karnataka', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/1280px-Mysore_Palace_Morning.jpg', description: 'Intricate domes and arches blend Hindu, Islamic, and Gothic styles.', significance: 'The palace architecture reflects Karnataka\u2019s centuries of cultural synthesis.', category: 'palace' as const },
    ],
    traditions: [
      { name: 'Yakshagana', description: 'An all-night dance-drama with elaborate costumes and face paint.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Yakshaganads.jpg' },
      { name: 'Sandalwood Carving', description: 'Intricate carving from fragrant sandalwood, a Karnataka royal craft.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Wooden_toys.JPG/1280px-Wooden_toys.JPG' },
    ],
    dances: [
      { name: 'Kuchipudi', origin: 'Andhra-Karnataka border', description: 'A classical dance-drama with graceful movements and dramatic narration.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Kuchipudi_Performer_DS.jpg/1280px-Kuchipudi_Performer_DS.jpg' },
    ],
    music: [
      { name: 'Carnatic Music', region: 'Karnataka', instruments: 'Veena, Mridangam', description: 'Karnataka is the birthplace of Carnatic music \u2014 Purandara Dasa, its father.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Carnatic_Music_%28132527502%29.jpg' },
    ],
    foods: [
      { name: 'Mysore Pak', origin: 'Mysore palace kitchens', description: 'A rich, crumbly ghee-and-besan sweet invented by royal chef Kakasura Madappa.', whereToTry: 'Guru Sweet Mart, Mysore', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mysore_pak.jpg/1280px-Mysore_pak.jpg' },
      { name: 'Bisi Bele Bath', origin: 'Karnataka', description: 'Hot rice with lentils, tamarind, and vegetables \u2014 "hot lentil rice."', whereToTry: 'MTR, Bengaluru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Bisi_Bele_Bath_%28Bisibelebath%29.JPG/1280px-Bisi_Bele_Bath_%28Bisibelebath%29.JPG' },
    ],
    festivals: [
      { name: 'Mysore Dasara', description: 'A ten-day festival with a caparisoned-elephant procession from the palace.', month: 'September\u2013October', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mysore_Palace_Dussera_%2829633564994%29.jpg/1280px-Mysore_Palace_Dussera_%2829633564994%29.jpg' },
    ],
    artForms: [
      { name: 'Mysore Painting', description: 'Classical paintings with gold leaf and mineral pigments.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Mysorepalace.jpg' },
      { name: 'Channapatna Toys', description: 'Lacquer-ware wooden toys made with vegetable dyes.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Kinnal_toys%2C_Karnataka.jpeg/1280px-Kinnal_toys%2C_Karnataka.jpeg' },
    ],
    restaurants: [
      { id: 'r14', name: 'MTR', city: 'Bengaluru', stateId: 'karnataka', cuisine: 'Karnataka', rating: 4.5, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Akki_Roti_-_A2B_-_Karnataka_-_Kae003.jpg', description: 'The legendary Mavalli Tiffin Room since 1924.' },
    ],
    events: [
      { id: 'e10', name: 'Mysore Dasara', location: 'Mysore, Karnataka', stateId: 'karnataka', date: 'Sep 26\u2013Oct 5', month: 'October', category: 'Royal Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Mysore_Dasara_procession.jpg', description: 'A ten-day festival with the grand Jumboo Savari elephant procession.' },
    ],
  },

  // ══════════════════ ODISHA ══════════════════
  {
    id: 'odisha',
    name: 'Odisha',
    capital: 'Bhubaneswar',
    tagline: 'The Land of Temples & Odissi',
    highlight: 'Konark Sun Temple • Odissi • Pattachitra',
    description:
      'A state of ancient temples, exquisite dance, and living folk-art traditions. From the stone wheel of Konark to the painted scrolls of Pattachitra, Odisha is art in stone and color.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Brahmeswar_Temple%2C_Bhubaneswar.JPG/1280px-Brahmeswar_Temple%2C_Bhubaneswar.JPG',
    color: '#FF8C2A',
    mapPath: 'M420,480 L490,470 L520,500 L510,540 L460,550 L420,530 L410,500 Z',
    mapLabelX: 465,
    mapLabelY: 510,
    places: [
      { id: 'konark-sun-temple', name: 'Konark Sun Temple', city: 'Puri', stateId: 'odisha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg', description: 'A 13th-century temple shaped like the Sun God\u2019s chariot with twelve stone wheels.', significance: 'A UNESCO World Heritage Site and the pinnacle of Kalinga architecture.', category: 'temple' as const },
      { id: 'konark-wheel', name: 'Konark Wheel', city: 'Konark', stateId: 'odisha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Biranchinarayana_Temple_wooden_work.jpg/1280px-Biranchinarayana_Temple_wooden_work.jpg', description: 'Each intricately carved wheel serves as a sundial, telling time to the minute.', significance: 'The wheels are both artistic masterpieces and scientific instruments.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Pattachitra', description: 'Painted scrolls on cloth depicting Jagannath and epic stories.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Odisha_Pattachitara_Depicting_Unconditional_Love_between_Radha_Krushna.jpg' },
      { name: 'Applique Craft', description: 'Colorful stitched fabric decorations for temple festivals, from Pipli.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Craft_Museum_01.jpg/1280px-Craft_Museum_01.jpg' },
    ],
    dances: [
      { name: 'Odissi', origin: 'Odisha temples', description: 'A classical dance of curving poses and fluid movements, born in temple sculptures.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Odissi_dance_at_Nishagandi_Dance_Festival_2024_%28207%29.jpg/1280px-Odissi_dance_at_Nishagandi_Dance_Festival_2024_%28207%29.jpg' },
    ],
    music: [
      { name: 'Odissi Music', region: 'Odisha', instruments: 'Manjira, Tabla, Harmonium', description: 'A classical tradition accompanying Odissi dance, with roots in temple rituals.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Patitapaban.jpeg/1280px-Patitapaban.jpeg' },
    ],
    foods: [
      { name: 'Dahi Bara Aloo Dum', origin: 'Cuttack', description: 'Lentil fritters in yogurt with spicy potato curry \u2014 Odisha\u2019s beloved street food.', whereToTry: 'Cuttack street vendors', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Medu_Vadas.JPG/1280px-Medu_Vadas.JPG' },
      { name: 'Chhena Poda', origin: 'Nayagarh', description: 'A baked cottage-cheese dessert \u2014 "burnt cheese" \u2014 caramelized to perfection.', whereToTry: 'Nayagarh bakeries', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Chhena_Haha_%E0%A5%A4_%E0%AC%9B%E0%AD%87%E0%AC%A8%E0%AC%BE_%E0%AC%97%E0%AC%9C%E0%AC%BE.jpg/1280px-Chhena_Haha_%E0%A5%A4_%E0%AC%9B%E0%AD%87%E0%AC%A8%E0%AC%BE_%E0%AC%97%E0%AC%9C%E0%AC%BE.jpg' },
    ],
    festivals: [
      { name: 'Rath Yatra', description: 'The grand chariot festival of Lord Jagannath in Puri.', month: 'July', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Rath_Yatra_Puri_07-11027.jpg/1280px-Rath_Yatra_Puri_07-11027.jpg' },
    ],
    artForms: [
      { name: 'Pattachitra', description: 'Traditional cloth paintings with natural colors and fine borders.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Entrance_of_Raghurajpur.jpg/1280px-Entrance_of_Raghurajpur.jpg' },
      { name: 'Stone Carving', description: 'Intricate soapstone carving in the Konark temple tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Stone_work_at_Konark_Orissa_India.jpg' },
    ],
    restaurants: [
      { id: 'r15', name: 'Dalma', city: 'Bhubaneswar', stateId: 'odisha', cuisine: 'Odia', rating: 4.4, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Traditional_Odial_Lunch_Thali.jpg/1280px-Traditional_Odial_Lunch_Thali.jpg', description: 'Traditional Odia thali in a heritage setting.' },
    ],
    events: [
      { id: 'e11', name: 'Rath Yatra', location: 'Puri, Odisha', stateId: 'odisha', date: 'Jul 7', month: 'July', category: 'Religious Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Rathyatra_Ahmedabad.jpg/1280px-Rathyatra_Ahmedabad.jpg', description: 'Lord Jagannath\u2019s chariot festival draws over a million pilgrims.' },
    ],
  },

  // ══════════════════ ASSAM ══════════════════
  {
    id: 'assam',
    name: 'Assam',
    capital: 'Dispur',
    tagline: 'The Land of Tea & Bihu',
    highlight: 'Tea Gardens • Bihu Dance • Muga Silk',
    description:
      'Misty tea gardens along the Brahmaputra, one-horned rhinos in Kaziranga, and the joyful rhythm of Bihu. Assam is the gateway to Northeast India.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/1280px-Beauty_of_Kaziranga_National_Park.jpg',
    color: '#0BA884',
    mapPath: 'M580,280 L680,270 L720,300 L700,350 L640,360 L580,340 L560,310 Z',
    mapLabelX: 640,
    mapLabelY: 315,
    places: [
      { id: 'kaziranga', name: 'Kaziranga National Park', city: 'Golaghat', stateId: 'assam', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Rhinos_in_Kaziranga_National_Park.jpg/1280px-Rhinos_in_Kaziranga_National_Park.jpg', description: 'A UNESCO park home to two-thirds of the world\u2019s one-horned rhinos.', significance: 'A conservation success story, protecting rhinos from near-extinction.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Bihu', description: 'Three festivals marking the agricultural cycle with dance and feasting.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Women_of_Chutia_tribe_preparing_pithas.jpg' },
      { name: 'Muga Silk', description: 'Golden silk unique to Assam, woven from semi-cultivated silkworms.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/DWIJEN_%2843%29.jpg' },
    ],
    dances: [
      { name: 'Bihu', origin: 'Assam', description: 'A joyful spring dance with rapid hip movements and dhol beats.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Bihu-Dance-assam.jpg' },
    ],
    music: [
      { name: 'Bihu Music', region: 'Assam', instruments: 'Dhol, Pepa, Gogona', description: 'Songs of love and harvest accompanying Bihu celebrations.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bihu_on_Wheels_-_Rhythms_of_Assam_on_a_Rural_Ride.jpg/1280px-Bihu_on_Wheels_-_Rhythms_of_Assam_on_a_Rural_Ride.jpg' },
    ],
    foods: [
      { name: 'Assamese Thali', origin: 'Assam', description: 'A light meal centered on rice, fish tenga (sour curry), and khar.', whereToTry: 'Khorikaa, Guwahati', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/South_Asia_%28orthographic_projection%29_without_national_boundaries%2C_with_ambiguities_indicated.svg/1280px-South_Asia_%28orthographic_projection%29_without_national_boundaries%2C_with_ambiguities_indicated.svg.png' },
      { name: 'Masor Tenga', origin: 'Assam', description: 'A tangy fish curry with elephant apple or lemon \u2014 summer comfort food.', whereToTry: 'Assamese homes and restaurants in Guwahati', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Assamese_Thali.jpg' },
    ],
    festivals: [
      { name: 'Bihu', description: 'Three agricultural festivals \u2014 Bohag, Kati, and Magh \u2014 with dance and feasting.', month: 'April', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Buffalo_fight.jpg' },
    ],
    artForms: [
      { name: 'Muga Silk Weaving', description: 'Weaving golden silk unique to Assam, durable for generations.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Colours_of_India_-_Silk_yarn_waiting_to_be_made_into_saris.jpg/1280px-Colours_of_India_-_Silk_yarn_waiting_to_be_made_into_saris.jpg' },
      { name: 'Bamboo Craft', description: 'Baskets, mats, and decorative items from bamboo and cane.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mukha_xilpa2.jpg' },
    ],
    restaurants: [
      { id: 'r16', name: 'Khorikaa', city: 'Guwahati', stateId: 'assam', cuisine: 'Assamese', rating: 4.5, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE%E0%A6%B0_%E0%A6%AB%E0%A7%81%E0%A6%9F%E0%A6%AA%E0%A6%BE%E0%A6%A4%E0%A7%87%E0%A6%B0_%E0%A6%9D%E0%A6%BE%E0%A6%B2%E0%A6%AE%E0%A7%81%E0%A6%A1%E0%A6%BC%E0%A6%BF.jpg/1280px-%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE%E0%A6%B0_%E0%A6%AB%E0%A7%81%E0%A6%9F%E0%A6%AA%E0%A6%BE%E0%A6%A4%E0%A7%87%E0%A6%B0_%E0%A6%9D%E0%A6%BE%E0%A6%B2%E0%A6%AE%E0%A7%81%E0%A6%A1%E0%A6%BC%E0%A6%BF.jpg', description: 'Traditional Assamese thali with fish tenga and khar.' },
    ],
    events: [
      { id: 'e12', name: 'Bohag Bihu', location: 'Guwahati, Assam', stateId: 'assam', date: 'Apr 14\u201316', month: 'April', category: 'Harvest Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bihu_dance_%E0%A6%B9%E0%A7%81%E0%A6%81%E0%A6%9A%E0%A7%B0%E0%A6%BF.jpg/1280px-Bihu_dance_%E0%A6%B9%E0%A7%81%E0%A6%81%E0%A6%9A%E0%A7%B0%E0%A6%BF.jpg', description: 'Assamese New Year with Bihu dance, feasting, and bihu husori.' },
    ],
  },

  // ══════════════════ BIHAR ══════════════════
  {
    id: 'bihar',
    name: 'Bihar',
    capital: 'Patna',
    tagline: 'The Cradle of Civilization',
    highlight: 'Nalanda • Madhubani Art • Litti Chokha',
    description:
      'The land where Buddha attained enlightenment, where ancient Nalanda attracted scholars from across Asia, and where Madhubani art turns mud walls into masterpieces.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mahabodhi_temple_complex%2C_Bodhgaya_27.jpg/1280px-Mahabodhi_temple_complex%2C_Bodhgaya_27.jpg',
    color: '#A02E3A',
    mapPath: 'M400,370 L470,360 L500,390 L490,430 L440,440 L400,420 L390,390 Z',
    mapLabelX: 445,
    mapLabelY: 400,
    places: [
      { id: 'mahabodhi-temple', name: 'Mahabodhi Temple', city: 'Bodh Gaya', stateId: 'bihar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/1280px-Mahabodhitemple.jpg', description: 'The sacred temple marking the spot where the Buddha attained enlightenment.', significance: 'A UNESCO World Heritage Site and one of Buddhism\u2019s holiest pilgrimage sites.', category: 'temple' as const },
      { id: 'nalanda-ruins', name: 'Nalanda University Ruins', city: 'Nalanda', stateId: 'bihar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg/1280px-Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg', description: 'Remains of the world\u2019s oldest residential university, once housing 10,000 students.', significance: 'A UNESCO site \u2014 the ancient center of learning that drew scholars from China, Tibet, and Persia.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Madhubani Art', description: 'Intricate folk painting from Mithila, traditionally done by women on mud walls.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Fort_of_Darbhanga.jpg' },
      { name: 'Manjusha Art', description: 'Folk scroll painting depicting the Bihula legend, once nearly lost and now reviving.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Mahajanapadas_%28c._500_BCE%29.png' },
    ],
    dances: [
      { name: 'Jat-Jatin', origin: 'Mithila region', description: 'A duet folk dance expressing love and separation between Jat and Jatin.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Kankalini_Temple_5983.jpg/1280px-Kankalini_Temple_5983.jpg' },
    ],
    music: [
      { name: 'Bhojpuri Folk', region: 'Bhojpur region', instruments: 'Dholak, Harmonium, Manjira', description: 'Vibrant folk songs of daily life, love, and seasonal festivals.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Bhojpuri_Speaking_region_%28Native%29.png' },
    ],
    foods: [
      { name: 'Litti Chokha', origin: 'Bihar', description: 'Roasted wheat balls stuffed with sattu, served with mashed spiced eggplant and tomato.', whereToTry: 'Street vendors in Patna and Gaya', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Litti_Chokha_2.jpg/1280px-Litti_Chokha_2.jpg' },
      { name: 'Chaat Ka Pua', origin: 'Patna', description: 'A sweet lentil fritter made during festivals, soaked in sugar syrup.', whereToTry: 'Patna sweet shops', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Malpoa_pitha.jpg/1280px-Malpoa_pitha.jpg' },
    ],
    festivals: [
      { name: 'Chhath Puja', description: 'A four-day sun worship festival where devotees offer prayers at sunrise and sunset.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/JanakpurChhathParvaFestival.jpg/1280px-JanakpurChhathParvaFestival.jpg' },
    ],
    artForms: [
      { name: 'Madhubani Painting', description: 'Natural-pigment folk art depicting mythology, nature, and daily life.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Maithil_Saree_Style_in_Kanyadan_Maithili_movie.jpg' },
      { name: 'Sikki Grass Craft', description: 'Decorative items woven from golden sikki grass by Mithila women.', image: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Sikki_grass_craft.jpg' },
    ],
    restaurants: [
      { id: 'r17', name: 'Bhojpuri Dhaba', city: 'Patna', stateId: 'bihar', cuisine: 'Bihari', rating: 4.3, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg/1280px-Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg', description: 'Authentic litti chokha and sattu paratha.' },
    ],
    events: [
      { id: 'e13', name: 'Chhath Puja', location: 'Patna, Bihar', stateId: 'bihar', date: 'Nov 6\u20139', month: 'November', category: 'Religious Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Crackers_vishu_5.jpg/1280px-Crackers_vishu_5.jpg', description: 'Devotees offer prayers to the Sun God at the Ganges at sunrise.' },
    ],
  },

  // ══════════════════ MADHYA PRADESH ══════════════════
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    capital: 'Bhopal',
    tagline: 'The Heart of Incredible India',
    highlight: 'Khajuraho • Gond Art • Poha',
    description:
      'At the geographic center of India, Madhya Pradesh holds the magnificent temples of Khajuraho, the tiger reserves of Kanha, and the ancient rock paintings of Bhimbetka.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/India-5749_-_Visvanatha_Temple_-_Flickr_-_archer10_%28Dennis%29.jpg/1280px-India-5749_-_Visvanatha_Temple_-_Flickr_-_archer10_%28Dennis%29.jpg',
    color: '#FF8C2A',
    mapPath: 'M300,380 L380,370 L420,400 L410,460 L360,470 L310,450 L290,410 Z',
    mapLabelX: 355,
    mapLabelY: 420,
    places: [
      { id: 'khajuraho', name: 'Khajuraho Temples', city: 'Khajuraho', stateId: 'madhya-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/1_Khajuraho.jpg/1280px-1_Khajuraho.jpg', description: 'A group of 25 surviving temples renowned for their intricate Nagara-style architecture.', significance: 'A UNESCO World Heritage Site celebrating art, spirituality, and human emotion in stone.', category: 'temple' as const },
      { id: 'bhimbetka', name: 'Bhimbetka Rock Shelters', city: 'Bhopal', stateId: 'madhya-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rock_Shelter_8%2C_Bhimbetka_02.jpg/1280px-Rock_Shelter_8%2C_Bhimbetka_02.jpg', description: 'Prehistoric rock paintings dating back 30,000 years, depicting early human life.', significance: 'A UNESCO site showing the earliest traces of human art in India.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Gond Art', description: 'Tribal painting with dots and dashes depicting nature and mythology in vivid colors.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Women_in_adivasi_village%2C_Umaria_district%2C_India.jpg/1280px-Women_in_adivasi_village%2C_Umaria_district%2C_India.jpg' },
      { name: 'Bagh Print', description: 'Natural block printing on fabric using vegetable dyes in the Bagh village tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Traditional_Bagh_hand_block_print_master_craftsman-artisan-artist_Mohammed_Bilal_Khatri%2C_Madhya_Pradesh%2C_India.jpg/1280px-Traditional_Bagh_hand_block_print_master_craftsman-artisan-artist_Mohammed_Bilal_Khatri%2C_Madhya_Pradesh%2C_India.jpg' },
    ],
    dances: [
      { name: 'Tertali', origin: 'Kamars tribe', description: 'A ritual dance where women balance clay pots while crouching and moving to cymbals.', image: IMG.bharatanatyam },
    ],
    music: [
      { name: 'Bundeli Folk', region: 'Bundelkhand', instruments: 'Dholak, Sarangi', description: 'Rustic folk songs of the Bundelkhand region, celebrating seasons and legends.', image: IMG.tabla2 },
    ],
    foods: [
      { name: 'Poha', origin: 'Indore', description: 'Flattened rice tempered with mustard, turmeric, and sev \u2014 the beloved MP breakfast.', whereToTry: 'Indore street vendors and Sarafa Bazaar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Poha_at_Jal_Mahotsav%2C_Hanuwantiya%2C_Madhya_Pradesh_%281%29.jpg/1280px-Poha_at_Jal_Mahotsav%2C_Hanuwantiya%2C_Madhya_Pradesh_%281%29.jpg' },
      { name: 'Bhutte ka Kees', origin: 'Indore', description: 'Grated corn cooked with milk and spices \u2014 a monsoon specialty.', whereToTry: 'Indore restaurants', image: IMG.thali2 },
    ],
    festivals: [
      { name: 'Khajuraho Dance Festival', description: 'A week of classical dance performances against the backdrop of the ancient temples.', month: 'February', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shinjini_kathak_dance_indian_classical_khajuraho_festival.jpg/1280px-Shinjini_kathak_dance_indian_classical_khajuraho_festival.jpg' },
    ],
    artForms: [
      { name: 'Gond Painting', description: 'Tribal art with intricate patterns of dots and lines in bright colors.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/JSS_at_BB.jpeg/1280px-JSS_at_BB.jpeg' },
      { name: 'Bell Metal Craft', description: 'Tribal metal casting using the lost-wax technique from Bastar.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/022a-bastar_ladies_all_togather.jpg' },
    ],
    restaurants: [
      { id: 'r18', name: 'Sarafa Bazaar Stalls', city: 'Indore', stateId: 'madhya-pradesh', cuisine: 'Street Food', rating: 4.6, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Soul_Food_at_Powell%27s_Place.jpg/1280px-Soul_Food_at_Powell%27s_Place.jpg', description: 'India\u2019s best night street food market \u2014 poha, jalebi, and garadu.' },
    ],
    events: [
      { id: 'e14', name: 'Khajuraho Dance Festival', location: 'Khajuraho, MP', stateId: 'madhya-pradesh', date: 'Feb 20\u201326', month: 'February', category: 'Dance Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kandaria_mahadev_Khajuraho_Temple.jpg/1280px-Kandaria_mahadev_Khajuraho_Temple.jpg', description: 'Classical dance performed by India\u2019s best artists at the ancient temples.' },
    ],
  },

  // ══════════════════ ANDHRA PRADESH ══════════════════
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    capital: 'Amaravati',
    tagline: 'The Land of Spices & Temples',
    highlight: 'Tirupati • Kuchipudi • Spicy Biryani',
    description:
      'Home to the world\u2019s richest temple at Tirupati, the birthplace of Kuchipudi dance, and some of India\u2019s spiciest cuisine. A state where devotion and flavor run deep.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg',
    color: '#C13A47',
    mapPath: 'M260,600 L320,590 L350,620 L350,670 L310,690 L270,680 L250,640 Z',
    mapLabelX: 300,
    mapLabelY: 640,
    places: [
      { id: 'tirupati', name: 'Tirumala Venkateswara Temple', city: 'Tirupati', stateId: 'andhra-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Tirumala_Venkateswara_temple_entrance_09062015.JPG/1280px-Tirumala_Venkateswara_temple_entrance_09062015.JPG', description: 'The most visited Hindu temple in the world, atop the seven hills of Tirumala.', significance: 'The richest temple on earth, receiving 50,000+ daily pilgrims dedicated to Lord Venkateswara.', category: 'temple' as const },
    ],
    traditions: [
      { name: 'Kalamkari', description: 'Hand-painted or block-printed cotton textile using natural dyes, depicting epics.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Kalamkari_painting_of_Lord_Vishnu_on_serpent_Ananta.jpg' },
      { name: 'Etikoppaka Toys', description: 'Wooden lacquer toys made with vegetable dyes, a 400-year craft tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hanuman_and_Ravana_in_Tholu_Bommalata%2C_the_shadow_puppet_tradition_of_Andhra_Pradesh%2C_India.JPG/1280px-Hanuman_and_Ravana_in_Tholu_Bommalata%2C_the_shadow_puppet_tradition_of_Andhra_Pradesh%2C_India.JPG' },
    ],
    dances: [
      { name: 'Kuchipudi', origin: 'Kuchipudi village', description: 'A classical dance-drama known for its graceful movements and plate-balancing acts.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bhavana_Reddy_Kuchipudi.jpg/1280px-Bhavana_Reddy_Kuchipudi.jpg' },
    ],
    music: [
      { name: 'Carnatic Music', region: 'Andhra', instruments: 'Veena, Mridangam', description: 'Home to some of Carnatic music\u2019s greatest composers including Tyagaraja.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tanjore-style_Carnatic_tambura.JPG/1280px-Tanjore-style_Carnatic_tambura.JPG' },
    ],
    foods: [
      { name: 'Andhra Biryani', origin: 'Andhra Pradesh', description: 'A fiery green-chili biryani known for its intense spice and bold flavors.', whereToTry: 'Andhra restaurants in Vijayawada', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Vegetarian_Andhra_Meal.jpg/1280px-Vegetarian_Andhra_Meal.jpg' },
      { name: 'Gongura Pappu', description: 'Lentil curry with sour gongura (sorrel) leaves \u2014 a signature Andhra dish.', whereToTry: 'Traditional Andhra mess halls', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg' },
    ],
    festivals: [
      { name: 'Brahmotsavam', description: 'A nine-day festival at Tirumala with processions of the deity on various vahanas.', month: 'September\u2013October', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Lord_Venkateswara_on_Gaja_Vahanam..JPG/1280px-Lord_Venkateswara_on_Gaja_Vahanam..JPG' },
    ],
    artForms: [
      { name: 'Kalamkari', description: 'Intricate hand-painted textile art using natural dyes and bamboo pens.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kalamkari_painting.jpg/1280px-Kalamkari_painting.jpg' },
    ],
    restaurants: [
      { id: 'r19', name: 'Andhra Spice', city: 'Vijayawada', stateId: 'andhra-pradesh', cuisine: 'Andhra', rating: 4.4, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nepali_dal-bhat-tarkari.jpg/1280px-Nepali_dal-bhat-tarkari.jpg', description: 'Authentic spicy Andhra meals served on a banana leaf.' },
    ],
    events: [],
  },

  // ══════════════════ TELANGANA ══════════════════
  {
    id: 'telangana',
    name: 'Telangana',
    capital: 'Hyderabad',
    tagline: 'The City of Nizams & Pearls',
    highlight: 'Charminar • Perini Dance • Hyderabadi Biryani',
    description:
      'India\u2019s youngest state, anchored by historic Hyderabad \u2014 a city of Nizams, pearls, biryani, and the iconic Charminar. A blend of Mughal, Persian, and Telugu cultures.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/A_typical_charminar_evening.jpg',
    color: '#3D5AFE',
    mapPath: 'M240,580 L300,570 L330,600 L320,640 L280,650 L240,630 L230,600 Z',
    mapLabelX: 280,
    mapLabelY: 610,
    places: [
      { id: 'charminar', name: 'Charminar', city: 'Hyderabad', stateId: 'telangana', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/1280px-Charminar_Hyderabad_1.jpg', description: 'A 16th-century monument with four grand arches, built to commemorate the end of a plague.', significance: 'The icon of Hyderabad, standing at the heart of the old city\u2019s bustling bazaars.', category: 'monument' as const },
      { id: 'golconda-fort', name: 'Golconda Fort', city: 'Hyderabad', stateId: 'telangana', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/1280px-Golconda_Fort_005.jpg', description: 'A massive hilltop fort once famous for its diamond trade, including the Koh-i-Noor.', significance: 'Home to the legendary acoustics system where a hand clap at the gate is heard at the summit.', category: 'fort' as const },
    ],
    traditions: [
      { name: 'Perini Shivatandavam', description: 'A warrior dance from the Kakatiya era, revived in modern times.', image: IMG.kathakali },
      { name: 'Bidriware', description: 'Metal handicraft with silver inlay on a black alloy, from Bidar tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Bidriware_Hookah.jpg' },
    ],
    dances: [
      { name: 'Perini Shivatandavam', origin: 'Kakatiya dynasty', description: 'A vigorous male warrior dance invoking Lord Shiva, lost for centuries and revived.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/%E0%B0%AA%E0%B1%87%E0%B0%B0%E0%B0%BF%E0%B0%A3%E0%B1%80_%E0%B0%B6%E0%B0%BF%E0%B0%B5%E0%B0%A4%E0%B0%BE%E0%B0%82%E0%B0%A1%E0%B0%B5%E0%B0%82_.png' },
    ],
    music: [
      { name: 'Carnatic Music', region: 'Telangana', instruments: 'Veena, Mridangam', description: 'A rich classical tradition, with Ramakrishna Theater keeping it alive in Hyderabad.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tanjore-style_Carnatic_tambura.JPG/1280px-Tanjore-style_Carnatic_tambura.JPG' },
    ],
    foods: [
      { name: 'Hyderabadi Biryani', origin: 'Hyderabad Nizam kitchens', description: 'A fragrant dum biryani of basmati, meat, and saffron, slow-cooked in a sealed pot.', whereToTry: 'Paradise Restaurant, Hyderabad', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Hyderabadi_Mutton_Haleem.jpg' },
      { name: 'Haleem', origin: 'Hyderabad', description: 'A rich wheat-and-meat porridge served during Ramadan, a Hyderabadi specialty.', whereToTry: 'Pista House, Hyderabad (during Ramadan)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pakistani_Haleem_served_with_garnish.jpg/1280px-Pakistani_Haleem_served_with_garnish.jpg' },
    ],
    festivals: [
      { name: 'Bathukamma', description: 'A floral festival where women arrange colorful flower stacks in concentric layers.', month: 'September\u2013October', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/%E0%B0%AC%E0%B0%A4%E0%B1%81%E0%B0%95%E0%B0%AE%E0%B1%8D%E0%B0%AE.jpg' },
    ],
    artForms: [
      { name: 'Bidriware', description: 'Silver-inlaid black metal craft, a Persian-influenced tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg/1280px-Aerial_view_of_Durgam_cheruvu_and_Hitech_CIty.jpg' },
    ],
    restaurants: [
      { id: 'r20', name: 'Paradise Restaurant', city: 'Hyderabad', stateId: 'telangana', cuisine: 'Hyderabadi', rating: 4.5, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Coronation_portrait_of_the_VIIth_Nizam.jpg/1280px-Coronation_portrait_of_the_VIIth_Nizam.jpg', description: 'The most famous Hyderabadi biryani since 1953.' },
    ],
    events: [],
  },

  // ══════════════════ JHARKHAND ══════════════════
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    capital: 'Ranchi',
    tagline: 'The Land of Forests & Tribes',
    highlight: 'Hundru Falls • Chhau Dance • Dhuska',
    description:
      'A state of dense forests, waterfalls, and over 30 indigenous tribes. Jharkhand is where nature and tribal heritage create a unique cultural mosaic.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg/1280px-Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg',
    color: '#0BA884',
    mapPath: 'M430,370 L490,360 L510,390 L500,420 L460,430 L430,410 L420,390 Z',
    mapLabelX: 465,
    mapLabelY: 395,
    places: [
      { id: 'hundru-falls', name: 'Hundru Falls', city: 'Ranchi', stateId: 'jharkhand', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hundru_Falls%2C_Jharkhand%2C_India_4.jpg/1280px-Hundru_Falls%2C_Jharkhand%2C_India_4.jpg', description: 'A spectacular 98-meter waterfall on the Subarnarekha River.', significance: 'One of the most photographed waterfalls in eastern India, surrounded by tribal villages.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Sohrai Painting', description: 'Tribal wall art by Santhal women, featuring animals and harvest scenes.', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Sanskritihzb.jpg' },
      { name: 'Paitkar Scroll Painting', description: 'One of India\u2019s oldest scroll painting traditions, depicting mythological stories.', image: IMG.textiles },
    ],
    dances: [
      { name: 'Chhau', origin: 'Seraikela', description: 'A masked martial dance blending combat movements with storytelling.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Folk_Dances_of_Jharkhand_-_Documentary_-_EZCC.webm/500px--Folk_Dances_of_Jharkhand_-_Documentary_-_EZCC.webm.jpg' },
    ],
    music: [
      { name: 'Tribal Folk', region: 'Jharkhand', instruments: 'Mandar, Tirio, Tumdak', description: 'Songs of the Santhal, Munda, and Oraon tribes celebrating nature and seasons.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Classical_dances_of_India.jpg' },
    ],
    foods: [
      { name: 'Dhuska', origin: 'Jharkhand', description: 'Deep-fried rice-and-lentil bread, served with spicy potato curry.', whereToTry: 'Street stalls in Ranchi', image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Ghugni.jpg' },
      { name: 'Rugra', origin: 'Jharkhand tribes', description: 'A tribal mushroom delicacy from the forests, rich in protein.', whereToTry: 'Tribal food stalls in Ranchi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/India_Jharkhand_locator_map.svg/1280px-India_Jharkhand_locator_map.svg.png' },
    ],
    festivals: [
      { name: 'Sarhul', description: 'The tribal spring festival worshipping trees and nature with dance and song.', month: 'March\u2013April', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Holy_Prayer.jpg/1280px-Holy_Prayer.jpg' },
    ],
    artForms: [
      { name: 'Sohrai Art', description: 'Tribal painting with natural earth colors, done during the harvest festival.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg/1280px-Views_of_Shikharji_on_way_to_Anantnatha_Tonk_3.jpg' },
    ],
    restaurants: [
      { id: 'r21', name: 'Tribal Taste', city: 'Ranchi', stateId: 'jharkhand', cuisine: 'Jharkhandi', rating: 4.2, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Nasi_Lemak_dengan_Ayam_Goreng_Krispy_dengan_Sos_chili.jpg/1280px-Nasi_Lemak_dengan_Ayam_Goreng_Krispy_dengan_Sos_chili.jpg', description: 'Authentic tribal cuisine including dhuska and rugra.' },
    ],
    events: [],
  },

  // ══════════════════ CHHATTISGARH ══════════════════
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    capital: 'Raipur',
    tagline: 'The Rice Bowl of India',
    highlight: 'Chitrakote Falls • Pandwani • Tribal Art',
    description:
      'A state of magnificent waterfalls, ancient tribal traditions, and the widest waterfall in India. Chhattisgarh is one of the most culturally rich and least explored regions.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bhoramdeo_Temple%2C_Kawardha.jpg/1280px-Bhoramdeo_Temple%2C_Kawardha.jpg',
    color: '#0BA884',
    mapPath: 'M340,440 L410,430 L440,460 L430,500 L380,510 L340,490 L330,460 Z',
    mapLabelX: 385,
    mapLabelY: 470,
    places: [
      { id: 'chitrakote-falls', name: 'Chitrakote Falls', city: 'Jagdalpur', stateId: 'chhattisgarh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Chitrakot_waterfalls.JPG/1280px-Chitrakot_waterfalls.JPG', description: 'The widest waterfall in India, a horseshoe cascade on the Indravati River.', significance: 'Called the "Niagara of India," it spans 300 meters during monsoon season.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Pandwani', description: 'A musical storytelling tradition where a single performer narrates the Mahabharata.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Naya_Raipur%2C_Sector_19.png/1280px-Naya_Raipur%2C_Sector_19.png' },
      { name: 'Tribal Haat', description: 'Weekly tribal markets where forest produce, crafts, and culture converge.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Bhawanipatna_Shine.JPG' },
    ],
    dances: [
      { name: 'Raut Nacha', origin: 'Yadav community', description: 'A devotional dance-drama performed by cowherds during Diwali, celebrating Krishna.', image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Raut_Nacha.jpg' },
    ],
    music: [
      { name: 'Pandwani', region: 'Chhattisgarh', instruments: 'Ektara, Tambura', description: 'A powerful oral tradition where one performer enacts the entire Mahabharata.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Language_Map_of_India.jpg' },
    ],
    foods: [
      { name: 'Chila', origin: 'Chhattisgarh', description: 'A savory rice-flour pancake, a staple breakfast across the state.', whereToTry: 'Street vendors in Raipur', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Trombidium.jpg' },
      { name: 'Fara', origin: 'Chhattisgarh', description: 'Steamed rice dumplings with lentils \u2014 a humble tribal delicacy.', whereToTry: 'Raipur traditional restaurants', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Bilaspur_Junction_Railway_Station_Building_001.jpg/1280px-Bilaspur_Junction_Railway_Station_Building_001.jpg' },
    ],
    festivals: [
      { name: 'Bastar Dussehra', description: 'The world\u2019s longest Dussehra festival, lasting 75 days with tribal rituals.', month: 'October', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bastar_Dusshera_Unexplored_Bastar.jpg/1280px-Bastar_Dusshera_Unexplored_Bastar.jpg' },
    ],
    artForms: [
      { name: 'Dhokra Bell Metal', description: 'Ancient lost-wax metal casting craft from Bastar, over 4,000 years old.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Village_lady_grinding_ants_for_her_family.jpg' },
    ],
    restaurants: [
      { id: 'r22', name: 'Bastar Kitchen', city: 'Raipur', stateId: 'chhattisgarh', cuisine: 'Chhattisgarhi', rating: 4.2, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chopsueywithrice.jpg/1280px-Chopsueywithrice.jpg', description: 'Traditional tribal cuisine including chila and fara.' },
    ],
    events: [],
  },

  // ══════════════════ UTTARAKHAND ══════════════════
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    capital: 'Dehradun',
    tagline: 'The Land of Gods & Himalayas',
    highlight: 'Char Dham • Aipan Art • Bal Mithai',
    description:
      'The abode of the Himalayas, sacred rivers, and the Char Dham pilgrimage. Uttarakhand is where spirituality meets mountain grandeur, from Rishikesh to the Valley of Flowers.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Nanda_Devi_-_Hidden_Summit%2C_Uttarakhand_India_2013.jpg/1280px-Nanda_Devi_-_Hidden_Summit%2C_Uttarakhand_India_2013.jpg',
    color: '#3D5AFE',
    mapPath: 'M310,90 L400,80 L440,120 L420,170 L370,180 L320,160 L300,120 Z',
    mapLabelX: 370,
    mapLabelY: 130,
    places: [
      { id: 'valley-of-flowers', name: 'Valley of Flowers', city: 'Chamoli', stateId: 'uttarakhand', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Badrinath_temple_-_Uttarakhand.jpg/1280px-Badrinath_temple_-_Uttarakhand.jpg', description: 'A UNESCO-listed national park carpeted with 500+ species of alpine wildflowers.', significance: 'A trekker\u2019s paradise in the Himalayas, blooming from July to September.', category: 'nature' as const },
      { id: 'rishikesh', name: 'Rishikesh \u2014 Yoga Capital', city: 'Rishikesh', stateId: 'uttarakhand', image: IMG.varanasi, description: 'The world capital of yoga, on the banks of the Ganges at the foothills of the Himalayas.', significance: 'Home to ancient ashrams and the International Yoga Festival, drawing seekers worldwide.', category: 'spiritual' as const },
    ],
    traditions: [
      { name: 'Aipan', description: 'Traditional floor painting with red ochre and white rice paste, done during festivals.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Aipan_design_.jpg/1280px-Aipan_design_.jpg' },
      { name: 'Pahari Painting', description: 'Hill-region miniature painting style depicting Krishna and Himalayan landscapes.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/DANCE_OF_HIMANCHAL_PRADESH.jpg' },
    ],
    dances: [
      { name: 'Chholiya', origin: 'Kumaon', description: 'A martial sword-and-shield dance performed at Kumaoni weddings.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cholliyar.jpg/1280px-Cholliyar.jpg' },
    ],
    music: [
      { name: 'Pahari Folk', region: 'Garhwal & Kumaon', instruments: 'Dhol, Daur, Thali', description: 'Mountain songs reflecting the beauty and hardships of Himalayan life.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Jakhoo_Mandir_and_Moorti_drone_view.jpg' },
    ],
    foods: [
      { name: 'Bal Mithai', origin: 'Almora', description: 'A chocolate-colored fudge coated in white sugar balls \u2014 a Kumaoni favorite.', whereToTry: 'Sweet shops in Almora', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Desserts.jpg/1280px-Desserts.jpg' },
      { name: 'Kafuli', origin: 'Uttarakhand', description: 'A thick gravy of leafy greens (spinach and fenugreek) with rice paste.', whereToTry: 'Garhwali restaurants in Dehradun', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Uttarakhand_-_cuisines.jpg/1280px-Uttarakhand_-_cuisines.jpg' },
    ],
    festivals: [
      { name: 'Kumbh Mela', description: 'The largest peaceful gathering on earth, held every 12 years at Haridwar.', month: 'Every 12 years', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Allahabad_Kumbh_Mela_2013_by_shak.on.jpg/1280px-Allahabad_Kumbh_Mela_2013_by_shak.on.jpg' },
    ],
    artForms: [
      { name: 'Aipan', description: 'Ritual floor painting with geometric and floral patterns in red and white.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Diya_deepak_Diwali_rangoli_in_goa.JPG' },
      { name: 'Ringal Craft', description: 'Bamboo basketry and crafts from the hill regions.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Kedarnath_Temple_with_Snow_Covered_Mountains_in_Background.jpg' },
    ],
    restaurants: [
      { id: 'r23', name: 'Garhwal Bhoj', city: 'Dehradun', stateId: 'uttarakhand', cuisine: 'Garhwali', rating: 4.3, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Chaunkphoto.jpg/1280px-Chaunkphoto.jpg', description: 'Authentic Garhwali cuisine including kafuli and bhatt ki chudkani.' },
    ],
    events: [],
  },

  // ══════════════════ HIMACHAL PRADESH ══════════════════
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    capital: 'Shimla',
    tagline: 'The Land of Snow & Pines',
    highlight: 'Manali • Kinnauri Shawl • Siddu',
    description:
      'Snow-capped peaks, colonial hill stations, and Tibetan Buddhist monasteries. Himachal is where adventure, spirituality, and mountain culture meet in the Himalayas.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg/1280px-Kullu_Valley_near_Manali%2C_Himachal_Pradesh%2C_India.jpg',
    color: '#3D5AFE',
    mapPath: 'M230,80 L320,70 L360,110 L340,150 L280,160 L230,140 L220,110 Z',
    mapLabelX: 290,
    mapLabelY: 115,
    places: [
      { id: 'spiti-valley', name: 'Spiti Valley', city: 'Spiti', stateId: 'himachal-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg/1280px-Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg', description: 'A cold desert mountain valley with ancient monasteries perched on cliffs.', significance: 'Home to Key Monastery, one of the oldest Tibetan Buddhist centers in the world.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Kinnauri Shawl', description: 'Handwoven wool shawls with geometric patterns, a heritage craft from Kinnaur.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/A_place_of_devotion.jpg' },
      { name: 'Kullu Cap', description: 'Colorful woolen caps with bright border patterns, a symbol of Kullu valley.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/1280px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg' },
    ],
    dances: [
      { name: 'Nati', origin: 'Kullu & Shimla', description: 'A group folk dance in traditional attire, performed at festivals in slow circular patterns.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Kinnauri_Nati_dance.jpg' },
    ],
    music: [
      { name: 'Pahari Folk', region: 'Himachal', instruments: 'Karnal, Ranasingha, Dhol', description: 'Mountain folk songs celebrating seasons, weddings, and harvests.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Miniature_painting_showing_Dushyant_and_Shakuntala%28_based_on_the_epic_Mahabharata%29%2C_circa_1840%2C_Nalagarh%2C_Himachal_Pradesh_National_Museum%2C_Delhi.jpg' },
    ],
    foods: [
      { name: 'Siddu', origin: 'Himachal', description: 'A steamed wheat bread stuffed with poppy seeds or lentil paste, served with ghee.', whereToTry: 'Kullu and Manali restaurants', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Siddu_Ghee.JPG/1280px-Siddu_Ghee.JPG' },
      { name: 'Chha Gosht', origin: 'Himachal', description: 'A spiced mutton curry with chickpea flour and yogurt \u2014 a Himachali specialty.', whereToTry: 'Shimla traditional restaurants', image: IMG.thali2 },
    ],
    festivals: [
      { name: 'Kullu Dussehra', description: 'A seven-day festival where 300+ village deities gather in the Kullu valley.', month: 'October', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Raghunath_Ji_and_Mata_Sita.jpg' },
    ],
    artForms: [
      { name: 'Kinnauri Weaving', description: 'Fine wool weaving with symbolic geometric patterns unique to Kinnaur.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Kardhang_Biling_Bhaga_Dhauladhar_Oct22_A7C_04645.jpg/1280px-Kardhang_Biling_Bhaga_Dhauladhar_Oct22_A7C_04645.jpg' },
    ],
    restaurants: [
      { id: 'r24', name: 'Caf\u00e9 Shimla', city: 'Shimla', stateId: 'himachal-pradesh', cuisine: 'Himachali', rating: 4.3, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Fluffy_Poori_%28cropped%29.JPG/1280px-Fluffy_Poori_%28cropped%29.JPG', description: 'Cozy hilltop caf\u00e9 serving siddu and chha gosht.' },
    ],
    events: [],
  },

  // ══════════════════ GOA ══════════════════
  {
    id: 'goa',
    name: 'Goa',
    capital: 'Panaji',
    tagline: 'Pearl of the Orient',
    highlight: 'Beaches • Fado Music • Bebinca',
    description:
      'India\u2019s smallest state, where Portuguese heritage meets tropical beaches. Goa is sun, sand, seafood, and the sound of guitars \u2014 a unique Indo-European cultural blend.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/1280px-BeachFun.jpg',
    color: '#0BA884',
    mapPath: 'M150,540 L190,530 L210,560 L200,590 L170,600 L150,580 L140,560 Z',
    mapLabelX: 175,
    mapLabelY: 565,
    places: [
      { id: 'basilica-bom-jesus', name: 'Basilica of Bom Jesus', city: 'Old Goa', stateId: 'goa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/1280px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg', description: 'A 16th-century baroque church housing the remains of St. Francis Xavier.', significance: 'A UNESCO World Heritage Site and one of the most important Christian pilgrimage sites in Asia.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Fado', description: 'Portuguese melancholic folk music kept alive in Goan homes and taverns.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Um_casal_de_Viana_%28Portugal%29.jpg' },
      { name: 'Carnival', description: 'A four-day pre-Lenten festival with floats, music, and Portuguese-influenced pageantry.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lingelbach_Karneval_in_Rom_001.jpg/1280px-Lingelbach_Karneval_in_Rom_001.jpg' },
    ],
    dances: [
      { name: 'Fugdi', origin: 'Goa', description: 'A folk dance where women form circles and clap while swaying in rhythmic patterns.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Fugdi_Dancers_from_South_Goa.jpg' },
    ],
    music: [
      { name: 'Mando', region: 'Goa', instruments: 'Violin, Guitar', description: 'A Indo-Portuguese musical form blending sad romantic lyrics with elegant dance.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Armand_Duplantis_wins_the_Pole_Vault_at_the_2026_Wanda_Diamond_League%E2%80%99s_Weltklasse_Z%C3%BCrich_athletics_competition.jpg/1280px-Armand_Duplantis_wins_the_Pole_Vault_at_the_2026_Wanda_Diamond_League%E2%80%99s_Weltklasse_Z%C3%BCrich_athletics_competition.jpg' },
    ],
    foods: [
      { name: 'Bebinca', origin: 'Goa', description: 'A multi-layered coconut and egg pudding, Goa\u2019s most famous dessert.', whereToTry: 'Bebinca bakeries in Panaji', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bebinca_com_gelado.jpg/1280px-Bebinca_com_gelado.jpg' },
      { name: 'Goan Fish Curry', origin: 'Goa', description: 'A tangy coconut-and-kokum fish curry with rice, a staple of Goan homes.', whereToTry: 'Beach shacks across Goa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bengali_Mutton_Curry.JPG/1280px-Bengali_Mutton_Curry.JPG' },
    ],
    festivals: [
      { name: 'Goa Carnival', description: 'A four-day festival of floats, music, dancing, and feasting before Lent.', month: 'February', image: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Goa_Carnaval.jpg' },
    ],
    artForms: [
      { name: 'Pottery & Terracotta', description: 'Traditional red-clay pottery from Bicholim, a Goan craft heritage.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cavalcade_south_frieze_Parthenon_BM.jpg/1280px-Cavalcade_south_frieze_Parthenon_BM.jpg' },
    ],
    restaurants: [
      { id: 'r25', name: 'Martin\u2019s Beach Corner', city: 'Panaji', stateId: 'goa', cuisine: 'Goan', rating: 4.5, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Goan_Xit_kodi.jpg', description: 'Authentic Goan fish curry and bebinca by the riverside.' },
    ],
    events: [],
  },

  // ══════════════════ HARYANA ══════════════════
  {
    id: 'haryana',
    name: 'Haryana',
    capital: 'Chandigarh',
    tagline: 'The Land of Rotis & Wrestling',
    highlight: 'Kurukshetra • Phulkari • Kachri',
    description:
      'An agricultural heartland known for its dairy, wrestlers, and folk traditions. Haryana is the mythological battlefield of Kurukshetra and a proud, rural culture.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Cyber_City_View.jpg/1280px-Cyber_City_View.jpg',
    color: '#F5B800',
    mapPath: 'M220,160 L300,150 L330,180 L320,220 L270,230 L220,210 L210,180 Z',
    mapLabelX: 265,
    mapLabelY: 190,
    places: [
      { id: 'kurukshetra', name: 'Kurukshetra', city: 'Kurukshetra', stateId: 'haryana', image: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Kurukshetra_junction_kkde.jpg', description: 'The battlefield of the Mahabharata, where the Bhagavad Gita was delivered.', significance: 'One of Hinduism\u2019s most sacred places, home to the Brahma Sarovar and Gita museum.', category: 'spiritual' as const },
    ],
    traditions: [
      { name: 'Phulkari', description: '"Flower work" embroidery, shared across Punjab and Haryana, on coarse hand-spun cloth.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Khes.jpg/1280px-Khes.jpg' },
      { name: 'Chaupaal', description: 'Traditional village gathering under a banyan tree for storytelling and community decisions.', image: IMG.market },
    ],
    dances: [
      { name: 'Ghoomar', origin: 'Haryana', description: 'A twirling dance in flowing skirts, shared with the Rajasthani tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Kruti_Mahesh_Choreographer.jpg' },
    ],
    music: [
      { name: 'Ragini', region: 'Haryana', instruments: 'Dholak, Ektara', description: 'A folk musical form blending storytelling, social commentary, and devotional themes.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Ragini_Khanna_on_Day_5_of_Lakme_Fashion_Week_2017_%2847%29_%28cropped%29.jpg' },
    ],
    foods: [
      { name: 'Kachri ki Sabzi', origin: 'Haryana', description: 'A tangy wild-melon curry, a rustic village dish of the Haryana plains.', whereToTry: 'Haryanvi dhabas', image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/The_delicious_Rajasthani_food.png' },
      { name: 'Bajra Khichdi', origin: 'Haryana', description: 'A hearty pearl-millet and lentil porridge, served with ghee and jaggery.', whereToTry: 'Village dhabas across Haryana', image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Dall_Khichdi.jpg' },
    ],
    festivals: [
      { name: 'Gita Mahotsav', description: 'A festival celebrating the Bhagavad Gita at Kurukshetra with fairs and discourses.', month: 'November\u2013December', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg/1280px-BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg' },
    ],
    artForms: [
      { name: 'Phulkari', description: 'Dense thread embroidery creating floral patterns on coarse fabric.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Contemporary_Phulkari_design.jpg/1280px-Contemporary_Phulkari_design.jpg' },
    ],
    restaurants: [
      { id: 'r26', name: 'Jat Dhaba', city: 'Kurukshetra', stateId: 'haryana', cuisine: 'Haryanvi', rating: 4.2, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Northwest_India_map.svg/1280px-Northwest_India_map.svg.png', description: 'Rustic Haryanvi dhaba serving bajra khichdi and fresh dairy.' },
    ],
    events: [],
  },

  // ══════════════════ DELHI (UT) ══════════════════
  {
    id: 'delhi',
    name: 'Delhi',
    capital: 'New Delhi',
    tagline: 'The Capital of Many Empires',
    highlight: 'Red Fort • Qutub Minar • Paratha Wali Gali',
    description:
      'A city where seven empires left their mark \u2014 from Mughal forts to colonial avenues. Delhi is a living museum of India\u2019s layered history and a paradise for food lovers.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jama_Masjid_2011.jpg/1280px-Jama_Masjid_2011.jpg',
    color: '#C13A47',
    mapPath: 'M270,220 L330,210 L360,240 L350,280 L300,290 L260,270 L255,240 Z',
    mapLabelX: 305,
    mapLabelY: 250,
    places: [
      { id: 'red-fort', name: 'Red Fort', city: 'Delhi', stateId: 'delhi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Delhi_fort.jpg/1280px-Delhi_fort.jpg', description: 'The massive red sandstone fort built by Shah Jahan, from where India\u2019s PM addresses the nation.', significance: 'A UNESCO World Heritage Site and the symbol of India\u2019s independence.', category: 'fort' as const },
      { id: 'qutub-minar', name: 'Qutub Minar', city: 'Delhi', stateId: 'delhi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/1280px-Qutb_Minar_2022.jpg', description: 'A 73-meter victory tower, the tallest brick minaret in the world, built in 1199.', significance: 'A UNESCO site marking the beginning of Muslim rule in India.', category: 'monument' as const },
      { id: 'humayun-tomb', name: 'Humayun\u2019s Tomb', city: 'Delhi', stateId: 'delhi', image: IMG.humayun, description: 'A garden-tomb that inspired the Taj Mahal, built in 1570 for the Mughal emperor.', significance: 'A UNESCO World Heritage Site \u2014 the first garden-tomb in the Indian subcontinent.', category: 'monument' as const },
    ],
    traditions: [
      { name: 'Qawwali', description: 'Sufi devotional music performed at Nizamuddin Dargah every Thursday evening.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharat_Mata_by_Abanindranath_Tagore.jpg' },
      { name: 'Kite Flying', description: 'A Delhi tradition on Independence Day, where rooftops fill with kite fighters.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gimbal_The_First_Official_UAP_Footage_from_the_USG_for_Public_Release.webm/500px--Gimbal_The_First_Official_UAP_Footage_from_the_USG_for_Public_Release.webm.jpg' },
    ],
    dances: [
      { name: 'Kathak', origin: 'Delhi courts', description: 'The Mughal courts of Delhi nurtured Kathak into its classical form.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Megharanjani.jpg/1280px-Megharanjani.jpg' },
    ],
    music: [
      { name: 'Qawwali', region: 'Delhi', instruments: 'Harmonium, Tabla, Dholak', description: 'Sufi devotional singing at the dargah of Nizamuddin Auliya, a 700-year tradition.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Qawalli_at_Ajmer_Sharif_dargah.jpg/1280px-Qawalli_at_Ajmer_Sharif_dargah.jpg' },
    ],
    foods: [
      { name: 'Chole Bhature', origin: 'Delhi', description: 'Spiced chickpea curry with fluffy fried bread \u2014 Delhi\u2019s iconic breakfast.', whereToTry: 'Sita Ram Diwan Chand, Paharganj', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/1280px-Chana_masala.jpg' },
      { name: 'Paratha Wali Gali', origin: 'Old Delhi', description: 'A narrow lane in Chandni Chowk serving stuffed parathas for over 150 years.', whereToTry: 'Gali Parathe Wali, Chandni Chowk', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/1280px-Triangle_paratha_%28cropped%29.JPG' },
    ],
    festivals: [
      { name: 'Republic Day Parade', description: 'A grand parade down Rajpath showcasing India\u2019s military and cultural diversity.', month: 'January', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Double-tenth-symbol.svg/1280px-Double-tenth-symbol.svg.png' },
    ],
    artForms: [
      { name: 'Zardozi', description: 'Gold-thread embroidery on fabric, a Mughal court craft still practiced in Old Delhi.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Close_Shot_of_the_Zardozi_%28Zardouzi%29_Embroidery_Cushion_Covers.jpg' },
    ],
    restaurants: [
      { id: 'r27', name: 'Karim\u2019s', city: 'Delhi', stateId: 'delhi', cuisine: 'Mughlai', rating: 4.4, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Murgh_Musallam_Steamed.JPG/1280px-Murgh_Musallam_Steamed.JPG', description: 'Legendary Mughlai restaurant since 1913, near Jama Masjid.' },
      { id: 'r28', name: 'Sita Ram Diwan Chand', city: 'Delhi', stateId: 'delhi', cuisine: 'North Indian', rating: 4.5, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Manoomin_%28wild_rice%29.jpg/1280px-Manoomin_%28wild_rice%29.jpg', description: 'The best chole bhature in Delhi, since 1950.' },
    ],
    events: [
      { id: 'e15', name: 'Republic Day Parade', location: 'New Delhi', stateId: 'delhi', date: 'Jan 26', month: 'January', category: 'National Event', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Vista_de_la_Marcha_del_orgullo_LGBT_CDMX_2019_-_53.jpg/1280px-Vista_de_la_Marcha_del_orgullo_LGBT_CDMX_2019_-_53.jpg', description: 'A spectacular parade down Kartavya Path showcasing India\u2019s diversity.' },
    ],
  },

  // ══════════════════ JAMMU & KASHMIR (UT) ══════════════════
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    capital: 'Srinagar',
    tagline: 'Paradise on Earth',
    highlight: 'Dal Lake • Pashmina • Wazwan',
    description:
      'The crown of India, where Mughal gardens, Himalayan lakes, and alpine meadows create a landscape so beautiful it inspired emperors. A blend of Kashmiri, Dogra, and Ladakhi cultures.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pahalgam_Valley.jpg/1280px-Pahalgam_Valley.jpg',
    color: '#3D5AFE',
    mapPath: 'M250,30 L370,20 L420,50 L410,100 L340,120 L280,100 L240,60 Z',
    mapLabelX: 330,
    mapLabelY: 65,
    places: [
      { id: 'dal-lake', name: 'Dal Lake', city: 'Srinagar', stateId: 'jammu-kashmir', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/1280px-Dal_Lake_Hazratbal_Srinagar.jpg', description: 'A Himalayan lake famous for its floating gardens, shikara boats, and houseboats.', significance: 'The jewel of Kashmir, with Mughal gardens along its shores and life on the water.', category: 'nature' as const },
      { id: 'mughal-gardens', name: 'Shalimar Bagh', city: 'Srinagar', stateId: 'jammu-kashmir', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Shalimar_Bagh_1.jpg/1280px-Shalimar_Bagh_1.jpg', description: 'A Mughal garden built by Emperor Jahangir in 1619, with terraced lawns and fountains.', significance: 'A masterpiece of Persian-influenced garden design in the Himalayan valley.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Pashmina Weaving', description: 'Ultra-fine cashmere wool weaving, creating shawls so soft they pass through a ring.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Two_Gurjar_men_from_Bhimber_district_Azad_Kashmir.png/1280px-Two_Gurjar_men_from_Bhimber_district_Azad_Kashmir.png' },
      { name: 'Kashmir Carpet', description: 'Hand-knotted silk and wool carpets with Persian-influenced floral patterns.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pen_Box_%28qalamdan%29_LACMA_M.89.160a-b.jpg/1280px-Pen_Box_%28qalamdan%29_LACMA_M.89.160a-b.jpg' },
    ],
    dances: [
      { name: 'Rouf', origin: 'Kashmir Valley', description: 'A graceful folk dance where women in traditional dress sway in rows, greeting spring.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Jan_Mrkvi%C4%8Dka-Shopsko_horo.jpg' },
    ],
    music: [
      { name: 'Sufiana Kalam', region: 'Kashmir', instruments: 'Santoor, Saz, Tabla', description: 'A classical Sufi music tradition blending Persian and Indian ragas.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Kashmiri.jpg' },
    ],
    foods: [
      { name: 'Wazwan', origin: 'Kashmir', description: 'A grand multi-course feast of 36 dishes, the pinnacle of Kashmiri cuisine.', whereToTry: 'Traditional wazas (chefs) in Srinagar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chicken_Korma.JPG/1280px-Chicken_Korma.JPG' },
      { name: 'Kahwa', origin: 'Kashmir', description: 'A saffron-and-cardamom green tea served with almonds, warming the Himalayan cold.', whereToTry: 'Any Srinagar tea stall', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/1280px-Flag_of_Oman.svg.png' },
    ],
    festivals: [
      { name: 'Tulip Festival', description: 'Asia\u2019s largest tulip garden blooms in Srinagar every April.', month: 'April', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/2013_Tulip_Festival_%40_Agassiz%2C_BC%2C_Canada_%288671444216%29.jpg/1280px-2013_Tulip_Festival_%40_Agassiz%2C_BC%2C_Canada_%288671444216%29.jpg' },
    ],
    artForms: [
      { name: 'Pashmina', description: 'The finest cashmere wool, woven into shawls for centuries in Kashmir.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/%DA%A9%D8%B4%D9%85%DB%8C%D8%B1_%D8%B3%DB%92_%DB%81%D8%A7%D8%AA%DA%BE_%D8%B3%DB%92_%D8%A8%D9%86%DB%8C_%DA%A9%D8%A7%D9%86%DB%8C_%D8%B4%D8%A7%D9%84.jpg' },
      { name: 'Paper Mache', description: 'Hand-painted lacquered boxes and ornaments with floral Persian designs.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/JacmelMardiGras.jpg/1280px-JacmelMardiGras.jpg' },
    ],
    restaurants: [
      { id: 'r29', name: 'Ahdoos', city: 'Srinagar', stateId: 'jammu-kashmir', cuisine: 'Kashmiri', rating: 4.4, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Kashmiri_cuisine_waazwan.jpg', description: 'Historic restaurant on the Bund serving authentic wazwan since 1918.' },
    ],
    events: [],
  },

  // ══════════════════ MANIPUR ══════════════════
  {
    id: 'manipur',
    name: 'Manipur',
    capital: 'Imphal',
    tagline: 'The Jewel of the East',
    highlight: 'Loktak Lake • Manipuri Dance • Eromba',
    description:
      'A northeastern gem with the only floating lake in the world, a UNESCO-recognized classical dance, and a distinctive cuisine of fermented fish and bamboo shoots.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/%EA%AF%85%EA%AF%A3%EA%AF%A1%EA%AF%83%EA%AF%A5%EA%AF%8F%EA%AF%86%EA%AF%A4%EA%AF%A1_%EA%AF%86%EA%AF%A4%EA%AF%A1%EA%AF%92%EA%AF%A4_%EA%AF%82%EA%AF%A5%EA%AF%8F%EA%AF%85%EA%AF%A4%EA%AF%A1%EA%AF%8A%EA%AF%A7_%EA%AF%81%EA%AF%85%EA%AF%A5%EA%AF%83%EA%AF%8D%EA%AF%A4_%EA%AF%82%EA%AF%A5%EA%AF%8F%EA%AF%81%EA%AF%AA_%28%EA%AF%81%EA%AF%85%EA%AF%A5%EA%AF%83%EA%AF%8D%EA%AF%A4_%EA%AF%80%EA%AF%A4%EA%AF%8C%EA%AF%A3%EA%AF%A1%29%EA%AF%92%EA%AF%A4_%EA%AF%91%EA%AF%8B%EA%AF%A5%EA%AF%A1_%EA%AF%85%EA%AF%A3%EA%AF%A1%EA%AF%86%EA%AF%A8%EA%AF%9E_%EA%AF%8A%EA%AF%AA%EA%AF%95_%EA%AF%83%EA%AF%A5%EA%AF%8F%EA%AF%80%EA%AF%A9%EA%AF%97%EA%AF%92%EA%AF%A4_%EA%AF%80%EA%AF%A5%EA%AF%9E%EA%AF%84_%EA%AF%83%EA%AF%83%EA%AF%A4.jpg/1280px-thumbnail.jpg',
    color: '#0BA884',
    mapPath: 'M620,320 L680,310 L710,340 L700,380 L640,390 L610,360 L610,330 Z',
    mapLabelX: 660,
    mapLabelY: 350,
    places: [
      { id: 'loktak-lake', name: 'Loktak Lake', city: 'Imphal', stateId: 'manipur', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/The_Loktak_Lake.jpg/1280px-The_Loktak_Lake.jpg', description: 'The largest freshwater lake in the Northeast, famous for floating circular phumdis.', significance: 'Home to the endangered Sangai deer and the only floating national park in the world.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Manipuri Dance', description: 'A UNESCO-recognized classical dance with gentle, devotional movements and elaborate costumes.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Temple_of_God_Pakhangba_of_Sanamahi_religion_inside_the_Kangla_Fort%2C_Imphal_West%2C_Manipur.jpg/1280px-Temple_of_God_Pakhangba_of_Sanamahi_religion_inside_the_Kangla_Fort%2C_Imphal_West%2C_Manipur.jpg' },
      { name: 'Thang-Ta', description: 'A traditional Manipuri martial art with sword and spear, now a competitive sport.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Eastern_Zonal_Cultural_Centre_logo.png' },
    ],
    dances: [
      { name: 'Manipuri', origin: 'Manipur temples', description: 'A devotional classical dance of graceful, rounded movements \u2014 Ras Leela depicts Krishna.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Stamp_of_Armenia_-_2018_-_Colnect_806145_-_Indian_Dance_Manipuri.jpeg' },
    ],
    music: [
      { name: 'Nat Sangeet', region: 'Manipur', instruments: 'Pena, Harmonium', description: 'A classical music tradition accompanying Manipuri dance performances.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Sangeet_Natak_Akademi_Award_to_Sonam_Tshering_Lepcha.jpg/1280px-Sangeet_Natak_Akademi_Award_to_Sonam_Tshering_Lepcha.jpg' },
    ],
    foods: [
      { name: 'Eromba', origin: 'Manipur', description: 'A spicy mash of boiled vegetables, fermented fish, and fiery chilies \u2014 a Manipuri staple.', whereToTry: 'Imphal local kitchens', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Yongchaak_eromba_%282%29.jpg/1280px-Yongchaak_eromba_%282%29.jpg' },
      { name: 'Chamthong', origin: 'Manipur', description: 'A light vegetable stew with fermented fish, served with rice.', whereToTry: 'Imphal restaurants', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Chamthong_%28alias_Kangshoi_or_Kangsoi%29_dish_-_Traditional_Meitei_cuisine_-_Gastronomic_cultural_heritage_of_Manipur_%26_domestic_and_international_Meitei_diasporas.jpg' },
    ],
    festivals: [
      { name: 'Sangai Festival', description: 'A ten-day cultural showcase of Manipur\u2019s dance, sport, food, and crafts.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sangai_Deer_Replica_in_Manipur.jpg/1280px-Sangai_Deer_Replica_in_Manipur.jpg' },
    ],
    artForms: [
      { name: 'Kauna Mat Weaving', description: 'Handwoven mats and baskets from water reed, a Manipuri craft.', image: IMG.rugs },
    ],
    restaurants: [
      { id: 'r30', name: 'Ima Keithel Kitchen', city: 'Imphal', stateId: 'manipur', cuisine: 'Manipuri', rating: 4.3, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Manipuri_woman_selling_glutinous_rice_at_Eema_Bazaar%2C_Imphal%2C_Manipur.JPG/1280px-Manipuri_woman_selling_glutinous_rice_at_Eema_Bazaar%2C_Imphal%2C_Manipur.JPG', description: 'Traditional Manipuri meals near the all-women market.' },
    ],
    events: [],
  },

  // ══════════════════ MEGHALAYA ══════════════════
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    capital: 'Shillong',
    tagline: 'The Abode of Clouds',
    highlight: 'Living Root Bridges • Khasi Music • Jadoh',
    description:
      'A state of waterfalls, caves, and living root bridges grown by Khasi tribes. Meghalaya is the wettest place on earth and a land of matrilineal societies and rock music.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Dawki_River%2C_Meghalaya%2C_India.jpg/1280px-Dawki_River%2C_Meghalaya%2C_India.jpg',
    color: '#0BA884',
    mapPath: 'M590,330 L650,320 L680,350 L670,390 L610,400 L580,370 L580,340 Z',
    mapLabelX: 630,
    mapLabelY: 360,
    places: [
      { id: 'living-root-bridges', name: 'Living Root Bridges', city: 'Cherrapunji', stateId: 'meghalaya', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/1280px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg', description: 'Bridges grown from the roots of rubber trees by Khasi tribes over generations.', significance: 'A unique example of bioengineering, recognized as a UNESCO tentative heritage site.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Matrilineal Society', description: 'The Khasi and Garo tribes follow matrilineal inheritance \u2014 property passes to the youngest daughter.', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Garo_Boy.jpg' },
      { name: 'Rock Music Culture', description: 'Shillong is India\u2019s rock music capital, with a thriving live music and festival scene.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Nuranang_Waterfall.jpg/1280px-Nuranang_Waterfall.jpg' },
    ],
    dances: [
      { name: 'Wangala', origin: 'Garo tribe', description: 'A harvest dance with drums and horns, celebrating the Sun God with 100 drummers.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Wangala_drummer_of_garo_tribe.jpg' },
    ],
    music: [
      { name: 'Khasi Folk & Rock', region: 'Shillong', instruments: 'Guitar, Drums, Duitara', description: 'A unique blend of traditional Khasi folk songs and Western rock music.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Shri_Neil_Herbert_Nongkynrih.jpg/1280px-Shri_Neil_Herbert_Nongkynrih.jpg' },
    ],
    foods: [
      { name: 'Jadoh', origin: 'Khasi tribe', description: 'Red rice cooked with pork and spices \u2014 the signature Khasi dish.', whereToTry: 'Khasi restaurants in Shillong', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Pates_p1150435.jpg/1280px-Pates_p1150435.jpg' },
      { name: 'Dohneilong', origin: 'Khasi tribe', description: 'A smoked pork dish with black sesame and local greens.', whereToTry: 'Shillong traditional kitchens', image: IMG.thali2 },
    ],
    festivals: [
      { name: 'Wangala Festival', description: 'A hundred-drum harvest festival of the Garo tribe, celebrating the end of the agricultural year.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Karam_puja_in_jharkhand.jpg' },
    ],
    artForms: [
      { name: 'Bamboo & Cane Craft', description: 'Intricate basketry and furniture from bamboo, a Khasi and Jaintia craft.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Northeast_India_States.svg/1280px-Northeast_India_States.svg.png' },
    ],
    restaurants: [
      { id: 'r31', name: 'Caf\u00e9 Shillong', city: 'Shillong', stateId: 'meghalaya', cuisine: 'Khasi', rating: 4.4, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Bhutan_%28dish%29.png', description: 'Authentic jadoh and dohneilong in a cozy setting.' },
    ],
    events: [],
  },

  // ══════════════════ NAGALAND ══════════════════
  {
    id: 'nagaland',
    name: 'Nagaland',
    capital: 'Kohima',
    tagline: 'The Land of Festivals',
    highlight: 'Hornbill Festival • Tribal Weaving • Smoked Pork',
    description:
      'Home to 17 major tribes, each with distinct language, costume, and tradition. Nagaland is a mosaic of warrior heritage, vibrant textiles, and one of India\u2019s greatest cultural festivals.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kapamodzu.jpg/1280px-Kapamodzu.jpg',
    color: '#C13A47',
    mapPath: 'M640,330 L700,320 L730,350 L720,390 L660,400 L630,370 L630,340 Z',
    mapLabelX: 680,
    mapLabelY: 360,
    places: [
      { id: 'kohima-war-cemetery', name: 'Kohima War Cemetery', city: 'Kohima', stateId: 'nagaland', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/IND_003698_Garrison_Hill_Kohima.jpg/1280px-IND_003698_Garrison_Hill_Kohima.jpg', description: 'A WWII memorial on the battlefield where the Japanese advance was halted in 1944.', significance: 'Maintained by the Commonwealth War Graves Commission, overlooking Kohima.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Naga Weaving', description: 'Backstrap loom weaving creating bold geometric shawls, each pattern unique to a tribe.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Traditional-Karbi-Ornaments.jpg' },
      { name: 'Headhunting Memory', description: 'Historical warrior tradition, now remembered through oral histories and festival reenactments.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Anchor_tattoo_and_sketch.jpg' },
    ],
    dances: [
      { name: 'War Dance', origin: 'Ao Naga tribe', description: 'A powerful communal war dance with spears and shields, chanting in unison.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/FrankensteinBFILFF131025-87_%2854863424291%29_%28cropped%29.jpg' },
    ],
    music: [
      { name: 'Tribal Folk', region: 'Nagaland', instruments: 'Tati, Mouth Harp, Log Drum', description: 'Songs of war, love, and harvest, accompanied by indigenous string and percussion instruments.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Nag_folk_dance987.jpg' },
    ],
    foods: [
      { name: 'Smoked Pork with Akhuni', origin: 'Nagaland', description: 'Fermented soybean paste with smoked pork \u2014 a bold, pungent Naga delicacy.', whereToTry: 'Naga restaurants in Kohima', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Afghan_Palo.jpg' },
      { name: 'Bamboo Shoot Pork', origin: 'Nagaland', description: 'Pork cooked with fermented bamboo shoots and bhut jolokia (ghost pepper).', whereToTry: 'Kohima during Hornbill Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bamboo_sprout2.JPG/1280px-Bamboo_sprout2.JPG' },
    ],
    festivals: [
      { name: 'Hornbill Festival', description: 'A ten-day festival where all 17 tribes gather \u2014 the "Festival of Festivals."', month: 'December', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Great_hornbill_Photograph_by_Shantanu_Kuveskar.jpg' },
    ],
    artForms: [
      { name: 'Naga Shawl Weaving', description: 'Each tribe\u2019s shawl tells its story through patterns and colors on the backstrap loom.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Naga_traditional_shawl.jpg/1280px-Naga_traditional_shawl.jpg' },
    ],
    restaurants: [
      { id: 'r32', name: 'Naga Heritage Kitchen', city: 'Kohima', stateId: 'nagaland', cuisine: 'Naga', rating: 4.3, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Caracoles-del-restaurante-granero.jpg', description: 'Traditional smoked pork and akhuni dishes during Hornbill Festival.' },
    ],
    events: [
      { id: 'e16', name: 'Hornbill Festival', location: 'Kohima, Nagaland', stateId: 'nagaland', date: 'Dec 1\u201310', month: 'December', category: 'Tribal Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Buceros_rhinoceros_-Singapore_Zoo_-pair-8a.jpg/1280px-Buceros_rhinoceros_-Singapore_Zoo_-pair-8a.jpg', description: 'Ten days of all 17 Naga tribes showcasing dance, music, food, and crafts.' },
    ],
  },

  // ══════════════════ SIKKIM ══════════════════
  {
    id: 'sikkim',
    name: 'Sikkim',
    capital: 'Gangtok',
    tagline: 'The Peaceful Kingdom',
    highlight: 'Kanchenjunga • Momos • Thangka Art',
    description:
      'India\u2019s first fully organic state, nestled in the Himalayas. Sikkim blends Tibetan Buddhist monasteries, snow-capped Kanchenjunga views, and a peaceful, eco-friendly way of life.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg/1280px-Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg',
    color: '#3D5AFE',
    mapPath: 'M540,200 L610,190 L640,230 L620,270 L560,270 L530,240 Z',
    mapLabelX: 580,
    mapLabelY: 235,
    places: [
      { id: 'pemayangtse', name: 'Pemayangtse Monastery', city: 'Pelling', stateId: 'sikkim', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pemayangtse_Monastery%2C_Pelling%2C_West_Sikkim_15.jpg/1280px-Pemayangtse_Monastery%2C_Pelling%2C_West_Sikkim_15.jpg', description: 'One of the oldest monasteries in Sikkim, founded in 1705, with panoramic Kanchenjunga views.', significance: 'A three-storied monastery housing rare Buddhist sculptures and ancient thangkas.', category: 'spiritual' as const },
    ],
    traditions: [
      { name: 'Thangka Painting', description: 'Intricate Buddhist scroll paintings on cotton, depicting deities and mandalas.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rock_picture_of_Padmasambhava%2C_north_of_Thimphu.jpg/1280px-Rock_picture_of_Padmasambhava%2C_north_of_Thimphu.jpg' },
      { name: 'Organic Farming', description: 'Sikkim became the world\u2019s first fully organic state in 2016, banning chemical pesticides.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Casual_tea_set%40Japan.jpg/1280px-Casual_tea_set%40Japan.jpg' },
    ],
    dances: [
      { name: 'Mask Dance', origin: 'Sikkim monasteries', description: 'A Buddhist cham dance where monks in elaborate masks enact spiritual stories.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Pertunjukkan_Nani_Tari_Topeng_Losari.jpg' },
    ],
    music: [
      { name: 'Nepali Folk', region: 'Sikkim', instruments: 'Madal, Sarangi, Bansuri', description: 'Hill folk songs in Nepali, reflecting Sikkim\u2019s Himalayan cultural identity.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Nepali_language_Devanagari.svg/1280px-Nepali_language_Devanagari.svg.png' },
    ],
    foods: [
      { name: 'Momos', origin: 'Sikkim/Tibet', description: 'Steamed dumplings filled with meat or cheese, served with fiery chili chutney.', whereToTry: 'Momo stalls in Gangtok MG Marg', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/1280px-Momo_nepal.jpg' },
      { name: 'Gundruk Soup', origin: 'Sikkim', description: 'A soup of fermented leafy greens with a tangy, earthy flavor.', whereToTry: 'Sikkimese restaurants in Gangtok', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Traditional_pizza_from_Napoli.jpg/1280px-Traditional_pizza_from_Napoli.jpg' },
    ],
    festivals: [
      { name: 'Losar', description: 'Tibetan Buddhist New Year celebrated with cham dances and family gatherings.', month: 'February\u2013March', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Getting_ready_for_Losar.jpg/1280px-Getting_ready_for_Losar.jpg' },
    ],
    artForms: [
      { name: 'Thangka', description: 'Religious scroll painting with mineral pigments, a sacred Buddhist art form.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Karma_Phuntsok.jpg' },
    ],
    restaurants: [
      { id: 'r33', name: 'Rolling Momos', city: 'Gangtok', stateId: 'sikkim', cuisine: 'Sikkimese', rating: 4.5, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nepali_dal-bhat-tarkari.jpg/1280px-Nepali_dal-bhat-tarkari.jpg', description: 'The best momos and thukpa on MG Marg.' },
    ],
    events: [],
  },

  // ══════════════════ TRIPURA ══════════════════
  {
    id: 'tripura',
    name: 'Tripura',
    capital: 'Agartala',
    tagline: 'The Hill Tippera',
    highlight: 'Ujjayanta Palace • Garia Dance • Mui Borok',
    description:
      'A northeastern state with a royal past, blending Bengali and tribal cultures. Tripura is home to the grand Ujjayanta Palace and 19 indigenous tribes with distinct traditions.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg/1280px-Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg',
    color: '#0BA884',
    mapPath: 'M640,380 L700,370 L730,400 L720,440 L660,450 L630,420 L630,390 Z',
    mapLabelX: 680,
    mapLabelY: 410,
    places: [
      { id: 'ujjayanta-palace', name: 'Ujjayanta Palace', city: 'Agartala', stateId: 'tripura', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/India_Tripura_Legislative_Assembly_June_2024.svg/1280px-India_Tripura_Legislative_Assembly_June_2024.svg.png', description: 'A stunning Mughal-Greek style palace built in 1901, now the state museum.', significance: 'The former royal residence of the Manikya dynasty, showcasing Tripura\u2019s royal heritage.', category: 'palace' as const },
    ],
    traditions: [
      { name: 'Garia Dance', description: 'A tribal dance with bamboo, performed during the Garia festival for a good harvest.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg/1280px-Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg' },
      { name: 'Handloom Weaving', description: 'Tribal women weave intricate designs on loin looms, each pattern with symbolic meaning.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aronai.jpg/1280px-Aronai.jpg' },
    ],
    dances: [
      { name: 'Hozagiri', origin: 'Reang tribe', description: 'A dance where women balance bottles and lamps on their heads while swaying gracefully.', image: IMG.bharatanatyam },
    ],
    music: [
      { name: 'Tribal Folk', region: 'Tripura', instruments: 'Sarinda, Khamb, Flute', description: 'Songs of the 19 tribes, each with unique rhythms for festivals and daily life.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Classical_dances_of_India.jpg' },
    ],
    foods: [
      { name: 'Mui Borok', origin: 'Tripura tribes', description: 'A traditional Tripuri meal of rice, fermented fish, and bamboo shoot \u2014 the tribal staple.', whereToTry: 'Agartala tribal food stalls', image: IMG.thali },
      { name: 'Kosoi Bwtwi', origin: 'Tripura', description: 'A stir-fry of bamboo shoots with fermented fish and green chilies.', whereToTry: 'Tripuri restaurants in Agartala', image: IMG.thali2 },
    ],
    festivals: [
      { name: 'Kharchi Puja', description: 'A week-long festival worshipping 14 deities, unique to Tripura\u2019s tribal tradition.', month: 'July', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tripuri_dance.jpg' },
    ],
    artForms: [
      { name: 'Cane & Bamboo Craft', description: 'Intricate baskets, mats, and furniture from the state\u2019s abundant bamboo.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Flag_of_Kangleipak.svg/1280px-Flag_of_Kangleipak.svg.png' },
    ],
    restaurants: [
      { id: 'r34', name: 'Agartala Tribal Kitchen', city: 'Agartala', stateId: 'tripura', cuisine: 'Tripuri', rating: 4.2, priceRange: '\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nepali_dal-bhat-tarkari.jpg/1280px-Nepali_dal-bhat-tarkari.jpg', description: 'Authentic Mui Borok and Kosoi Bwtwi in a traditional setting.' },
    ],
    events: [],
  },

  // ══════════════════ PUDUCHERRY (UT) ══════════════════
  {
    id: 'puducherry',
    name: 'Puducherry',
    capital: 'Puducherry',
    tagline: "India's French Riviera",
    highlight: 'French Quarter • Auroville • Caf\u00e9 Culture',
    description:
      'A former French colony with tree-lined boulevards, mustard-yellow colonial buildings, and a unique Franco-Tamil culture. Puducherry is where India and France blend seamlessly.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pondicherry-Rock_beach_aerial_view.jpg/1280px-Pondicherry-Rock_beach_aerial_view.jpg',
    color: '#3D5AFE',
    mapPath: 'M320,690 L350,680 L365,700 L355,720 L330,720 L315,705 Z',
    mapLabelX: 338,
    mapLabelY: 700,
    places: [
      { id: 'auroville', name: 'Auroville Matrimandir', city: 'Auroville', stateId: 'puducherry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Town_Hall_of_Auroville.jpg/1280px-Town_Hall_of_Auroville.jpg', description: 'An experimental township centered on the golden Matrimandir, a place for inner silence.', significance: 'A UNESCO-backed "City of Dawn" drawing residents from 50+ countries seeking unity.', category: 'spiritual' as const },
      { id: 'french-quarter', name: 'French Quarter', city: 'Puducherry', stateId: 'puducherry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/India-locator-map-blank.svg/1280px-India-locator-map-blank.svg.png', description: 'Cobbled streets lined with mustard-yellow colonial villas, wrought-iron balconies, and caf\u00e9s.', significance: 'A preserved slice of French India, unlike anywhere else in the country.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Franco-Tamil Culture', description: 'A unique blend where French bakeries sit beside Tamil temples, and both languages coexist.', image: IMG.market },
      { name: 'Caf\u00e9 Culture', description: 'A legacy of French sidewalk caf\u00e9s serving croissants and filter coffee side by side.', image: IMG.harmonium },
    ],
    dances: [
      { name: 'Bharatanatyam', origin: 'Puducherry (Tamil tradition)', description: 'The Tamil classical dance tradition, nurtured in Puducherry\u2019s cultural institutions.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Shobhana_%28cropped%29.jpg/1280px-Shobhana_%28cropped%29.jpg' },
    ],
    music: [
      { name: 'Carnatic & French Fusion', region: 'Puducherry', instruments: 'Veena, Violin, Accordion', description: 'A unique musical landscape where Carnatic classical meets French caf\u00e9 melodies.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Jananiy.jpg/1280px-Jananiy.jpg' },
    ],
    foods: [
      { name: 'Puducherry Seafood', origin: 'Puducherry', description: 'Fresh catch prepared in Franco-Tamil style \u2014 think fish au gratin with curry leaves.', whereToTry: 'Beach road restaurants in Puducherry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Black_bovine_with_string_around_its_neck_%28Kerala%2C_2013%29.jpg/1280px-Black_bovine_with_string_around_its_neck_%28Kerala%2C_2013%29.jpg' },
      { name: 'Bakeries & Croissants', origin: 'Puducherry', description: 'French-style patisseries serving fresh baguettes, \u00e9clairs, and pains au chocolat.', whereToTry: 'Baker Street, Puducherry', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png' },
    ],
    festivals: [
      { name: 'Bastille Day', description: 'A celebration of French heritage with parades along the promenade.', month: 'July', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg/1280px-Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg' },
    ],
    artForms: [
      { name: 'Pottery', description: 'Handcrafted pottery from Auroville studios, blending Indian and European techniques.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Kumbakonam_Mahamaham_Tank.jpg' },
    ],
    restaurants: [
      { id: 'r35', name: 'Baker Street', city: 'Puducherry', stateId: 'puducherry', cuisine: 'French-Bakery', rating: 4.6, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Red_maple_leaf_food_icon.svg/1280px-Red_maple_leaf_food_icon.svg.png', description: 'Authentic French bakery on Bussy Street \u2014 best croissants in India.' },
      { id: 'r36', name: 'Rendezvous', city: 'Puducherry', stateId: 'puducherry', cuisine: 'Franco-Tamil', rating: 4.5, priceRange: '\u20B9\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Mauritian_Dalpuri.jpg', description: 'Fine-dining Franco-Tamil fusion in a heritage villa.' },
    ],
    events: [],
  },

  // ══════════════════ LADAKH (UT) ══════════════════
  {
    id: 'ladakh',
    name: 'Ladakh',
    capital: 'Leh',
    tagline: 'The Land of High Passes',
    highlight: 'Pangong Lake • Hemis Monastery • Thukpa',
    description:
      'A high-altitude desert in the Himalayas, with turquoise lakes, ancient monasteries, and a Tibetan Buddhist culture. Ladakh is one of the most starkly beautiful places on earth.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg/1280px-Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg',
    color: '#3D5AFE',
    mapPath: 'M300,10 L430,5 L480,40 L450,80 L370,90 L300,70 L280,35 Z',
    mapLabelX: 380,
    mapLabelY: 45,
    places: [
      { id: 'pangong-lake', name: 'Pangong Tso', city: 'Leh', stateId: 'ladakh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg/1280px-ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg', description: 'A 134-km high-altitude lake that changes color through the day, at 4,350 meters.', significance: 'One of the highest saltwater lakes in the world, spanning India and Tibet.', category: 'nature' as const },
      { id: 'hemis-monastery', name: 'Hemis Monastery', city: 'Leh', stateId: 'ladakh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Hemis_Monastery_02.jpg/1280px-Hemis_Monastery_02.jpg', description: 'The largest and wealthiest monastery in Ladakh, housing ancient thangkas and a museum.', significance: 'Site of the famous Hemis Festival with masked cham dances every July.', category: 'spiritual' as const },
    ],
    traditions: [
      { name: 'Thangka Painting', description: 'Sacred Buddhist scroll paintings on cotton, created with mineral pigments and gold.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Ajanta_Padmapani.jpg' },
      { name: 'Cham Dance', description: 'Masked monastic dances performed during festivals, enacting the victory of good over evil.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Buddhist_monks_dancing_the_Cham_in_the_Himalayan_monastery_of_Lamayuru.jpg/1280px-Buddhist_monks_dancing_the_Cham_in_the_Himalayan_monastery_of_Lamayuru.jpg' },
    ],
    dances: [
      { name: 'Cham', origin: 'Ladakh monasteries', description: 'A masked ritual dance where monks in elaborate costumes perform sacred stories.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/ChamDance.jpg' },
    ],
    music: [
      { name: 'Buddhist Chant', region: 'Ladakh', instruments: 'Dungchen (long horn), Cymbals, Drums', description: 'Deep monastic chanting and long-horn music during monastery festivals.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mani_Stones_-_Buddhist_Prayer_Stones%2C_Ladakh.jpg/1280px-Mani_Stones_-_Buddhist_Prayer_Stones%2C_Ladakh.jpg' },
    ],
    foods: [
      { name: 'Thukpa', origin: 'Ladakh/Tibet', description: 'A hearty noodle soup with vegetables and meat, perfect for the cold mountain climate.', whereToTry: 'Tibetan kitchens in Leh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Thukpa_%2827989841733%29.jpg/1280px-Thukpa_%2827989841733%29.jpg' },
      { name: 'Skyu', origin: 'Ladakh', description: 'A traditional Ladakhi pasta stew with root vegetables, a high-altitude comfort food.', whereToTry: 'Leh traditional restaurants', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Skyu_2010.jpg/1280px-Skyu_2010.jpg' },
    ],
    festivals: [
      { name: 'Hemis Festival', description: 'A two-day festival with masked cham dances, celebrating the birth of Guru Padmasambhava.', month: 'July', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Historical_Hemis_festival_IV.jpg' },
    ],
    artForms: [
      { name: 'Thangka', description: 'Sacred scroll paintings with mineral pigments, a meditative Buddhist art form.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ladakh1981-221.jpg/1280px-Ladakh1981-221.jpg' },
    ],
    restaurants: [
      { id: 'r37', name: 'Tibetan Kitchen', city: 'Leh', stateId: 'ladakh', cuisine: 'Tibetan-Ladakhi', rating: 4.4, priceRange: '\u20B9\u20B9', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Otsal_Restaurant_%2848975870326%29.jpg/1280px-Otsal_Restaurant_%2848975870326%29.jpg', description: 'Best thukpa and momos in Leh old town.' },
    ],
    events: [
      { id: 'e17', name: 'Hemis Festival', location: 'Leh, Ladakh', stateId: 'ladakh', date: 'Jul 10\u201311', month: 'July', category: 'Monastic Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Hamis_Gonpa_on_a_rainy_day.JPG/1280px-Hamis_Gonpa_on_a_rainy_day.JPG', description: 'Masked cham dances and ancient rituals at Hemis Monastery.' },
    ],
  },


  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    capital: 'Itanagar',
    tagline: 'Land of the dawn-lit mountains',
    highlight: 'Tawang Monastery • Losar • Thukpa',
    description:
      'India\'s easternmost state, where the first sunrise of the country touches snow peaks, orchid forests and 26 major tribes each with their own language and festival calendar.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bhavachakra_or_the_Buddhist_Wheel_of_Life_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg/1280px-Bhavachakra_or_the_Buddhist_Wheel_of_Life_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg',
    color: '#2E8B7A',
    mapPath: 'M742.2,305.5 L740.4,304.6 L739.8,303.1 L740.6,301.5 L738.9,299.1 L740.3,298.3 L739.2,293.6 L740.7,294.0 L743.4,291.7 L746.4,290.8 L746.5,288.4 L748.0,286.7 L750.0,287.9 L756.0,286.0 L758.4,286.9 L761.8,283.5 L760.7,281.6 L759.0,281.3 L758.3,282.5 L758.2,281.3 L757.1,281.7 L758.0,277.9 L755.4,275.8 L755.7,273.8 L754.6,272.4 L760.6,265.1 L750.5,265.4 L748.0,267.8 L744.4,269.0 L742.6,268.1 L730.1,272.2 L729.5,273.3 L725.4,274.4 L719.1,277.8 L718.3,276.4 L716.6,277.2 L714.1,276.7 L713.4,275.2 L712.3,276.2 L713.6,278.9 L710.8,280.3 L705.3,285.9 L701.0,290.8 L702.0,292.7 L700.3,293.1 L697.7,295.9 L679.7,297.5 L675.7,294.7 L669.8,293.8 L669.5,295.4 L667.8,296.1 L664.4,296.1 L662.7,297.2 L657.1,298.3 L654.7,298.2 L654.6,294.7 L652.5,292.6 L652.5,289.7 L653.7,288.1 L652.9,286.8 L655.1,286.1 L653.4,284.9 L652.3,280.2 L650.1,280.8 L644.1,280.5 L643.3,279.5 L642.1,280.0 L639.9,277.3 L639.7,275.5 L641.9,271.4 L639.3,268.6 L642.5,268.5 L643.8,269.9 L647.0,270.0 L648.0,272.3 L649.6,272.9 L651.3,271.2 L653.3,271.6 L657.5,268.5 L659.0,268.5 L660.4,271.0 L662.9,269.6 L664.2,270.2 L665.5,269.0 L667.1,269.7 L672.0,264.4 L669.9,262.2 L670.6,260.2 L673.7,257.8 L674.4,258.8 L676.3,257.8 L678.2,256.0 L679.2,256.9 L680.1,255.9 L679.8,254.7 L685.1,253.7 L685.5,251.7 L684.2,250.4 L686.7,248.4 L688.4,244.2 L691.4,243.1 L692.1,243.8 L692.6,242.8 L693.8,243.6 L699.2,242.7 L700.4,243.3 L702.3,242.1 L704.5,243.2 L706.6,240.0 L706.4,237.9 L710.8,234.4 L712.4,230.3 L714.4,228.3 L716.3,228.2 L718.3,225.9 L721.8,225.8 L723.7,222.0 L727.8,225.4 L728.4,227.8 L730.4,227.2 L734.5,228.9 L733.8,227.5 L737.2,229.3 L740.8,229.5 L741.2,231.2 L746.1,231.8 L747.5,228.6 L748.9,228.9 L748.6,226.3 L749.9,226.1 L750.3,224.8 L751.4,225.1 L755.2,221.8 L755.7,222.4 L758.0,220.7 L760.1,221.0 L763.7,218.5 L767.9,225.6 L771.2,224.0 L772.0,224.9 L770.7,227.6 L768.4,227.9 L766.3,230.0 L764.4,230.5 L766.3,233.3 L765.2,234.9 L765.8,235.9 L770.8,232.0 L775.6,230.5 L774.3,233.2 L774.6,234.0 L775.5,233.9 L776.0,236.6 L778.1,239.9 L777.3,241.7 L774.2,242.7 L774.8,244.3 L770.2,247.5 L771.5,249.0 L768.5,251.3 L771.4,251.9 L772.2,253.4 L773.8,251.1 L779.3,249.6 L781.8,251.0 L782.7,252.6 L785.9,252.1 L788.5,254.3 L790.1,253.0 L792.1,253.0 L793.4,254.8 L796.4,255.5 L799.6,257.9 L797.7,259.1 L797.1,261.7 L798.9,261.9 L800.0,263.4 L799.0,264.5 L799.3,267.3 L797.4,267.5 L797.1,266.3 L795.7,266.9 L791.4,270.5 L791.3,271.9 L789.4,271.9 L785.8,275.8 L786.9,278.6 L786.2,280.7 L793.2,290.2 L792.6,291.8 L785.2,289.0 L785.5,286.7 L783.2,284.1 L780.8,283.3 L778.0,283.6 L775.6,285.9 L774.2,285.4 L767.7,286.2 L762.3,288.9 L759.5,293.3 L756.0,294.3 L753.9,298.4 L752.2,297.8 L750.6,300.5 L748.5,300.1 L745.6,304.2 L742.2,305.5Z',
    mapLabelX: 719.7,
    mapLabelY: 262.0,
    places: [
      { id: 'tawang-monastery', name: 'Tawang Monastery', city: 'Tawang', stateId: 'arunachal-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/A_close_up_of_Tawang_Monastery.jpg/1280px-A_close_up_of_Tawang_Monastery.jpg', description: 'The largest monastery in India and second largest in the world, perched at 3,000 m.', significance: 'Birthplace region of the 6th Dalai Lama and the spiritual heart of Monpa Buddhism.', category: 'spiritual' as const },
      { id: 'sela-pass', name: 'Sela Pass', city: 'Tawang', stateId: 'arunachal-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Blanford%27s_Rosefinch_-_Sela_Pass_-_Arunachal_Pradesh_-_India_FJ0A8105_%2834145295572%29.jpg', description: 'A high mountain pass at 4,170 m guarded by a frozen lake and prayer flags.', significance: 'The only road link to Tawang, sacred to local Buddhists as one of 101 holy lakes.', category: 'nature' as const },
      { id: 'ziro-valley', name: 'Ziro Valley', city: 'Ziro', stateId: 'arunachal-pradesh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/An_Apatani_Old_lady_in_Ziro_valley_of_Arunachal_Pradesh.jpg/1280px-An_Apatani_Old_lady_in_Ziro_valley_of_Arunachal_Pradesh.jpg', description: 'A green bowl of paddy-cum-fish fields farmed by the Apatani people.', significance: 'A UNESCO tentative World Heritage Site for its sustainable tribal agriculture.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Apatani Tattoos', description: 'Facial tattoos and nose plugs once worn by Apatani women, now a vanishing memory.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Apatani_Tribe.jpg/1280px-Apatani_Tribe.jpg' },
      { name: 'Monpa Handmade Paper', description: 'Shugu-sheng paper made from local bark for Buddhist scriptures.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Changdung%2C_Monpa_tribe%2C_Tawang_district-_RIWATCH_Museum.jpg/1280px-Changdung%2C_Monpa_tribe%2C_Tawang_district-_RIWATCH_Museum.jpg' },
      { name: 'Bamboo Craft', description: 'Baskets, hats and bridges woven entirely from cane and bamboo.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/%22Nadang%22_The_Adi_Basket.jpg/1280px-%22Nadang%22_The_Adi_Basket.jpg' },
    ],
    dances: [
      { name: 'Aji Lhamu', origin: 'Monpa community', description: 'A masked dance-drama of Tawang performed to bless the village.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mlengchung_ba%2C_Lumla_village%2C_Tawang_district-_RIWATCH_Museum.jpg/1280px-Mlengchung_ba%2C_Lumla_village%2C_Tawang_district-_RIWATCH_Museum.jpg' },
      { name: 'Bardo Chham', origin: 'Sherdukpen tribe', description: 'Dancers in animal masks act out the fight between good and evil.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Buddha_image_in_Tawang_monastery.jpg/1280px-Buddha_image_in_Tawang_monastery.jpg' },
    ],
    music: [
      { name: 'Monpa Chant', region: 'Tawang', instruments: 'Dungchen, Cymbals, Drums', description: 'Deep monastic chanting that rolls through Tawang\'s prayer halls at dawn.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Front_fa%C3%A7ade_of_the_Buddha_Temple_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg/1280px-Front_fa%C3%A7ade_of_the_Buddha_Temple_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg' },
      { name: 'Nyishi Folk Song', region: 'Central Arunachal', instruments: 'Bamboo flute, Gong', description: 'Story-songs of hunting, migration and harvest sung at community houses.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Local_meal_in_Nishi_tribe_served_in_the_capital_of_Arunachal_Pradesh_-_North_East_India.jpg/1280px-Local_meal_in_Nishi_tribe_served_in_the_capital_of_Arunachal_Pradesh_-_North_East_India.jpg' },
    ],
    foods: [
      { name: 'Thukpa', origin: 'Tibetan-Monpa kitchens', description: 'A hot noodle soup with vegetables or meat, eaten through freezing hill evenings.', whereToTry: 'Monastery cafes in Tawang', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/A_bowl_of_Thukpa.jpg/1280px-A_bowl_of_Thukpa.jpg' },
      { name: 'Zan', origin: 'Monpa homes', description: 'Millet or buckwheat porridge stirred with leafy greens and cheese.', whereToTry: 'Home kitchens and homestays in Tawang', image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/07535_Buckwheat_burgers_aka_Hreczki.jpg' },
      { name: 'Bamboo Shoot Curry', origin: 'Tribal Arunachal', description: 'Fermented bamboo shoot cooked with pork or fish for a sharp, smoky taste.', whereToTry: 'Local dhabas in Itanagar and Ziro', image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/A_lunch_platter_of_Assamese_cuisine.jpg' },
    ],
    festivals: [
      { name: 'Losar', description: 'The Monpa new year with monastery masked dances and butter lamps.', month: 'February', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/2018_Leh_Dosmoche_festival_03.jpg/1280px-2018_Leh_Dosmoche_festival_03.jpg' },
      { name: 'Ziro Music Festival', description: 'An outdoor indie music festival held in the paddy fields of Ziro.', month: 'September', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ziro_Festival_of_Music_-_2019_%28Arunachal_Pradesh%29_%2848868248663%29.jpg/1280px-Ziro_Festival_of_Music_-_2019_%28Arunachal_Pradesh%29_%2848868248663%29.jpg' },
      { name: 'Nyokum Yullo', description: 'The Nyishi harvest festival praying for prosperity and good crops.', month: 'February', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nyokum_festival_Nyishi.JPG/1280px-Nyokum_festival_Nyishi.JPG' },
    ],
    artForms: [
      { name: 'Thangka Painting', description: 'Scroll paintings of Buddhist deities made with mineral pigments.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Begtse_%28Mongolian_Thangka_Painting%29.jpg' },
      { name: 'Carpet Weaving', description: 'Monpa carpets with dragon and lotus motifs woven on hand looms.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Description-_Tibetan_carpet_weavers_from_Nepal_demonstrate_their_skills_during_the_2002_Smithsonian_Folklife_Festival_featuring_The_Silk_Road._%282548100217%29.jpg/1280px-Description-_Tibetan_carpet_weavers_from_Nepal_demonstrate_their_skills_during_the_2002_Smithsonian_Folklife_Festival_featuring_The_Silk_Road._%282548100217%29.jpg' },
      { name: 'Wood Carving', description: 'Carved masks and prayer wheels for monastery rituals.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Inside_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg/1280px-Inside_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India.jpg' },
    ],
    restaurants: [
      { id: 'arunachal-pradesh-r1', name: 'Dawn Kitchen', city: 'Itanagar', stateId: 'arunachal-pradesh', cuisine: 'Arunachali', rating: 4.4, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/20200304_211332_Traditional_Arunachal_Food_in_Tokri_Miao_Changlang%2C_Arunachal_Pradesh_01.jpg/1280px-20200304_211332_Traditional_Arunachal_Food_in_Tokri_Miao_Changlang%2C_Arunachal_Pradesh_01.jpg', description: 'Tribal thalis with bamboo shoot, smoked pork and rice beer.' },
      { id: 'arunachal-pradesh-r2', name: 'Tawang View Cafe', city: 'Tawang', stateId: 'arunachal-pradesh', cuisine: 'Tibetan-Monpa', rating: 4.5, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Kalachakra_Mandala_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg/1280px-Kalachakra_Mandala_at_Tawang_Monastery%2C_Tawang%2C_Arunachal_Pradesh%2C_India._01.jpg', description: 'Momos and thukpa with a window straight onto the monastery.' },
    ],
    events: [
      { id: 'arunachal-pradesh-e1', name: 'Tawang Festival', location: 'Tawang, Arunachal Pradesh', stateId: 'arunachal-pradesh', date: 'Oct 20–22', month: 'October', category: 'Cultural Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Aerial_view_of_Tawang%2C_Arunachal_Pradesh.jpg', description: 'Three days of yak dances, archery and Himalayan food stalls.' },
      { id: 'arunachal-pradesh-e2', name: 'Siang River Festival', location: 'Pasighat, Arunachal Pradesh', stateId: 'arunachal-pradesh', date: 'Dec 1–3', month: 'December', category: 'Adventure', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/AR5Siang_banks_at_Pasighat.jpg/1280px-AR5Siang_banks_at_Pasighat.jpg', description: 'River rafting, elephant races and tribal cuisine on the Siang.' },
    ],
  },

  {
    id: 'mizoram',
    name: 'Mizoram',
    capital: 'Aizawl',
    tagline: 'The songbird of the northeast hills',
    highlight: 'Blue hills • Cheraw • Bamboo shoot',
    description:
      'A state of steep blue ridges and singing villages, where almost everyone plays an instrument, bamboo builds everything, and the Cheraw dance clacks out a rhythm older than memory.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Aizawl%2C_Mizoram_-_panoramio.jpg/1280px-Aizawl%2C_Mizoram_-_panoramio.jpg',
    color: '#3E7BB6',
    mapPath: 'M676.7,447.0 L675.5,443.5 L671.4,440.9 L670.5,444.9 L668.5,446.1 L667.4,441.6 L668.5,441.8 L668.6,440.3 L666.2,425.4 L664.0,419.0 L662.1,417.7 L662.6,414.1 L661.7,408.7 L663.0,408.5 L659.5,397.0 L658.9,391.5 L660.8,388.6 L661.0,381.6 L659.9,378.4 L663.3,378.4 L663.7,381.4 L664.9,381.7 L666.3,380.6 L666.9,378.6 L668.5,378.4 L668.9,376.0 L670.7,375.3 L672.7,370.3 L674.5,374.6 L676.7,373.6 L679.8,374.2 L679.9,379.0 L678.5,382.5 L681.3,382.9 L681.9,384.6 L683.2,383.3 L685.1,384.5 L685.9,383.4 L686.1,385.2 L688.4,384.4 L688.3,386.3 L690.1,388.0 L690.2,393.1 L691.3,395.5 L690.5,404.2 L689.2,405.2 L689.9,411.7 L687.3,415.6 L684.5,414.0 L682.8,414.4 L683.8,418.2 L683.0,418.4 L681.9,421.4 L681.7,424.4 L683.1,427.7 L682.2,429.7 L684.4,432.8 L684.9,437.7 L683.2,438.1 L683.4,440.2 L680.4,439.6 L681.0,442.4 L679.5,442.4 L679.4,445.9 L677.9,444.5 L676.7,447.0Z',
    mapLabelX: 675.1,
    mapLabelY: 408.7,
    places: [
      { id: 'reiek-hills', name: 'Reiek Heritage Village', city: 'Reiek', stateId: 'mizoram', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/A_cave_on_the_way_to_Reiek_top.jpg/1280px-A_cave_on_the_way_to_Reiek_top.jpg', description: 'A recreated Mizo village of thatched houses below a 1,465 m cliff.', significance: 'Preserves traditional Mizo homes, granaries and community life for future generations.', category: 'heritage' as const },
      { id: 'phawngpui', name: 'Phawngpui Blue Mountain', city: 'Lawngtlai', stateId: 'mizoram', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/2007-blue-mtn-farpak.jpg', description: 'Mizoram\'s highest peak, believed to be the home of the spirits.', significance: 'A national park sheltering rare orchids and the blyth\'s tragopan.', category: 'nature' as const },
      { id: 'vantawng-falls', name: 'Vantawng Falls', city: 'Serchhip', stateId: 'mizoram', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Tuirihiau_falls%2C_Mizoram.jpg/1280px-Tuirihiau_falls%2C_Mizoram.jpg', description: 'A 229 m waterfall dropping in two silver steps through bamboo forest.', significance: 'The tallest waterfall in Mizoram and a state emblem of its wild interior.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Puanchei Weaving', description: 'The ceremonial Mizo skirt woven in black, red and white on a loin loom.', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Halam_Tribal_Girl.jpg' },
      { name: 'Zawlbuk Spirit', description: 'The old bachelors\' dormitory that taught young men discipline and service.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/A_free_Medical_Camp_organised_by_NRHM%2C_during_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Sangau_village_in_Lawngtlai_Distt._Mizoram_on_February_07%2C_2012.jpg/1280px-thumbnail.jpg' },
      { name: 'Bamboo Building', description: 'Houses, bridges and baskets built entirely without nails.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Aizawl%2C_mizoram_-_panoramio.jpg/1280px-Aizawl%2C_mizoram_-_panoramio.jpg' },
    ],
    dances: [
      { name: 'Cheraw', origin: 'Ancient Mizo ritual', description: 'The bamboo dance — girls step between clapping bamboo poles without a miss.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/CHAPCHAR_KUT_2013.jpg' },
      { name: 'Khuallam', origin: 'Guest welcome ceremony', description: 'A swaying dance performed in puandum shawls to welcome visitors.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mizoram_Bango_Nirtya_performed_at_the_44th_India_International_Film_Festival_of_India_%28IFFI-2013%29%2C_in_Panaji%2C_Goa_on_November_26%2C_2013.jpg/1280px-Mizoram_Bango_Nirtya_performed_at_the_44th_India_International_Film_Festival_of_India_%28IFFI-2013%29%2C_in_Panaji%2C_Goa_on_November_26%2C_2013.jpg' },
    ],
    music: [
      { name: 'Mizo Choir', region: 'Aizawl', instruments: 'Voice, Guitar, Khuang drum', description: 'Church choirs in near-perfect harmony echo across the hills every Sunday.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Aizawl_City.jpg/1280px-Aizawl_City.jpg' },
      { name: 'Khuang Drumming', region: 'Mizo villages', instruments: 'Khuang, Darbu gongs', description: 'The hollow log drum that keeps time for every festival dance.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Aizawl_City_in_2023.jpg/1280px-Aizawl_City_in_2023.jpg' },
    ],
    foods: [
      { name: 'Bai', origin: 'Mizo homes', description: 'A steamed stew of local greens, bamboo shoot and pork boiled with soda.', whereToTry: 'Home-style eateries in Aizawl', image: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Mizo_food.jpg' },
      { name: 'Vawksa Rep', origin: 'Mizo hill kitchens', description: 'Smoked pork slow-cooked with mustard leaves over a wood fire.', whereToTry: 'Local restaurants in Aizawl', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bohnakern.jpg/1280px-Bohnakern.jpg' },
      { name: 'Sanpiau', origin: 'Aizawl street stalls', description: 'A soft rice porridge topped with coriander, pepper and fish sauce.', whereToTry: 'Evening street stalls in Aizawl', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2014_01_Khao_tom_pla_Uttaradit.jpg/1280px-2014_01_Khao_tom_pla_Uttaradit.jpg' },
    ],
    festivals: [
      { name: 'Chapchar Kut', description: 'The spring festival after jhum clearing, with Cheraw and feasting.', month: 'March', image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Bird%27s_eye_view_of_Sabual_village.jpg' },
      { name: 'Mim Kut', description: 'A maize harvest festival remembering the dead with grain offerings.', month: 'September', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Aizawl_Mizoram_Hills.jpg' },
      { name: 'Pawl Kut', description: 'A harvest thanksgiving of feasting and children\'s games.', month: 'December', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/A_group_of_dancers_from_Mizoram_performing_%22Khuallam%22_dance_at_the_Republic_Day_Folk_Dance_Festival_2004_which_was_inaugurated_by_the_President_Dr._A.P.J_Abdul_Kalam_in_New_Delhi_on_January_24%2C_2004.jpg' },
    ],
    artForms: [
      { name: 'Puandum Textile', description: 'A striped shawl every Mizo bride carries to her new home.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Skansen_w_Maurzycach%2C_%C5%81owicki_Park_Etnograficzny_w_Maurzycach%2C_2025%2C_SOULinPIX%2C_KsP_208.jpg/1280px-Skansen_w_Maurzycach%2C_%C5%81owicki_Park_Etnograficzny_w_Maurzycach%2C_2025%2C_SOULinPIX%2C_KsP_208.jpg' },
      { name: 'Cane Basketry', description: 'Tightly woven carrying baskets slung from the forehead.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Phingaluk_%28Phingailuk_or_Philuk%29%2C_a_traditional_Meitei_basket_used_exclusively_for_Meitei_wedding_ceremonies_%E2%80%94_Classical_Meitei_basketry_handicraft_%E2%80%94_statue_of_a_Meitei_lady_wearing_Innaphi_%26_Phanek_clothes_and_holding_the_basket_01.jpg/1280px-thumbnail.jpg' },
      { name: 'Bamboo Flute Making', description: 'Hand-cut flutes tuned to Mizo folk scales.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/2019_Jan_15_-_Prayagraj_Kumbh_Mela_-_Buying_Flutes.jpg' },
    ],
    restaurants: [
      { id: 'mizoram-r1', name: 'Hill Bowl', city: 'Aizawl', stateId: 'mizoram', cuisine: 'Mizo', rating: 4.4, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Asian_weaver_ants_chutney_made_by_the_Lotha_Nagas.jpg/1280px-Asian_weaver_ants_chutney_made_by_the_Lotha_Nagas.jpg', description: 'Bai, smoked pork and rice served hot in a hillside dining room.' },
      { id: 'mizoram-r2', name: 'Cafe Zawlbuk', city: 'Aizawl', stateId: 'mizoram', cuisine: 'Cafe', rating: 4.3, priceRange: '₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Abad_Nucleus_Mall_Food_court.jpg/1280px-Abad_Nucleus_Mall_Food_court.jpg', description: 'Coffee, sanpiau and live guitar with a valley view.' },
    ],
    events: [
      { id: 'mizoram-e1', name: 'Anthurium Festival', location: 'Reiek, Mizoram', stateId: 'mizoram', date: 'Sep 12–14', month: 'September', category: 'Flower Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/A_red_anthurium_flower.jpg/1280px-A_red_anthurium_flower.jpg', description: 'Anthurium blooms, Cheraw performances and hill food at Reiek.' },
      { id: 'mizoram-e2', name: 'Chapchar Kut Celebration', location: 'Aizawl, Mizoram', stateId: 'mizoram', date: 'Mar 6–7', month: 'March', category: 'Cultural Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Cheraw.jpg/1280px-Cheraw.jpg', description: 'The whole city dances Cheraw in the stadium in ceremonial dress.' },
    ],
  },

  {
    id: 'andaman-nicobar',
    name: 'Andaman and Nicobar Islands',
    capital: 'Port Blair',
    tagline: 'Coral seas and a colonial memory',
    highlight: 'Cellular Jail • Coral reefs • Sea food',
    description:
      'Five hundred islands scattered in the Bay of Bengal, holding white beaches, living coral, ancient tribes and the prison walls where India\'s freedom fighters were exiled.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Beautiful_Radhanagar_Beach_in_the_Havelock%2C_Andaman_and_Nicobar_Islands.jpg/1280px-Beautiful_Radhanagar_Beach_in_the_Havelock%2C_Andaman_and_Nicobar_Islands.jpg',
    color: '#0E8C9E',
    mapPath: 'M701.8,877.6 L699.6,871.9 L698.1,870.4 L697.3,870.7 L697.1,867.4 L697.9,865.6 L701.1,865.3 L702.3,864.1 L703.3,865.3 L703.5,868.5 L705.1,870.9 L704.2,870.9 L705.0,872.1 L703.7,873.6 L703.8,876.0 L702.4,875.9 L701.8,877.6ZM696.9,864.2 L696.5,860.6 L698.7,860.0 L698.6,858.6 L699.8,860.9 L696.9,864.2ZM691.8,846.8 L690.7,845.8 L688.7,846.2 L689.0,844.9 L688.2,845.4 L687.7,844.5 L688.3,843.0 L690.3,843.0 L690.2,844.0 L691.9,845.2 L691.8,846.8ZM695.0,845.2 L693.0,843.7 L693.7,842.6 L695.1,843.5 L695.0,845.2ZM692.9,843.3 L692.4,842.0 L693.7,841.1 L692.4,841.8 L691.6,838.5 L693.4,836.8 L694.1,837.8 L692.9,839.2 L694.3,841.4 L692.9,843.3ZM684.3,837.9 L681.6,835.8 L682.1,833.6 L683.1,833.7 L682.6,835.6 L684.8,837.3 L684.3,837.9ZM673.4,812.3 L671.4,811.4 L671.5,809.6 L672.8,809.6 L673.0,808.5 L674.3,810.2 L675.2,810.0 L673.4,812.3ZM665.6,773.6 L664.2,772.7 L662.2,772.9 L663.3,770.7 L662.2,769.3 L662.1,766.1 L662.7,766.7 L665.9,762.8 L667.1,763.8 L668.2,768.4 L666.6,770.8 L667.3,771.8 L665.6,773.6ZM668.5,750.4 L667.7,749.7 L668.9,748.6 L669.2,745.6 L670.6,747.8 L669.6,748.6 L670.8,749.2 L668.5,750.4ZM658.9,745.6 L657.7,745.2 L657.7,743.4 L659.2,743.7 L658.9,745.6ZM680.2,735.4 L677.1,732.2 L678.2,730.7 L679.4,731.5 L680.2,735.4ZM680.4,730.8 L678.0,727.9 L679.3,728.9 L679.9,727.4 L680.4,730.8ZM681.2,729.7 L680.2,728.3 L681.0,726.1 L681.8,728.1 L681.2,729.7ZM671.3,746.7 L669.5,745.4 L669.5,744.0 L668.7,744.3 L668.4,742.7 L669.4,742.2 L668.4,742.3 L667.9,740.0 L667.2,740.6 L666.7,736.7 L665.8,736.3 L667.2,733.6 L668.5,735.7 L668.9,729.2 L670.9,725.4 L671.0,727.4 L672.5,727.1 L671.9,730.2 L673.2,730.8 L672.6,731.5 L672.0,730.9 L672.8,732.1 L671.7,732.2 L671.6,736.2 L670.4,737.1 L671.4,737.0 L672.2,734.0 L673.3,733.9 L673.4,734.8 L672.5,740.4 L671.0,740.3 L671.2,741.3 L670.0,741.7 L670.8,742.6 L671.5,740.8 L672.5,741.4 L671.3,746.7ZM672.7,730.3 L672.0,729.7 L672.9,726.5 L672.3,724.4 L673.2,724.1 L672.9,723.3 L675.5,723.5 L675.9,726.5 L675.0,726.5 L675.1,727.7 L674.3,727.4 L672.7,730.3ZM703.0,725.5 L702.8,724.6 L702.4,725.5 L702.5,724.5 L701.8,725.2 L701.5,724.5 L701.7,723.5 L702.4,724.0 L702.1,723.1 L703.2,724.2 L703.0,725.5ZM672.4,723.8 L670.9,722.9 L671.2,715.3 L670.5,715.0 L672.4,713.3 L673.3,714.7 L673.3,712.3 L671.8,713.2 L671.6,708.9 L672.0,709.4 L672.6,708.0 L673.2,709.4 L673.5,707.1 L675.7,707.4 L676.4,706.1 L678.6,712.2 L678.3,718.2 L677.3,718.6 L678.0,719.0 L676.8,720.7 L674.6,718.2 L676.4,720.4 L673.6,719.8 L673.5,718.9 L676.3,723.0 L672.4,723.8ZM670.1,710.1 L669.9,707.4 L669.0,707.3 L670.0,707.4 L670.1,706.5 L669.2,706.3 L670.1,706.3 L670.8,704.3 L671.5,707.2 L670.1,710.1ZM674.9,707.5 L673.5,706.4 L674.4,703.7 L673.4,703.5 L674.0,700.5 L675.0,700.1 L673.9,699.7 L675.2,696.8 L674.3,696.2 L675.5,693.2 L674.9,692.7 L676.0,691.9 L675.6,690.8 L677.2,689.9 L676.9,688.9 L678.9,689.2 L678.8,687.9 L679.4,688.8 L679.9,687.7 L679.7,691.9 L681.1,692.6 L679.9,693.5 L680.7,693.3 L681.6,694.6 L681.0,695.5 L680.3,693.7 L678.8,694.8 L678.3,693.9 L677.8,694.4 L679.4,695.0 L679.5,696.3 L681.0,696.4 L680.1,701.8 L678.5,703.7 L677.4,701.7 L676.3,702.4 L677.5,704.8 L676.8,705.5 L675.9,704.5 L675.2,706.1 L675.7,707.3 L674.9,707.5Z',
    mapLabelX: 674.6,
    mapLabelY: 714.9,
    places: [
      { id: 'cellular-jail', name: 'Cellular Jail', city: 'Port Blair', stateId: 'andaman-nicobar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Cellular_Jail%2C_Andaman%2C_Port_Blair%2C_India.jpg/1280px-Cellular_Jail%2C_Andaman%2C_Port_Blair%2C_India.jpg', description: 'The colonial prison of seven wings where freedom fighters served kala pani sentences.', significance: 'A national memorial to India\'s independence struggle and its exiled prisoners.', category: 'monument' as const },
      { id: 'radhanagar-beach', name: 'Radhanagar Beach', city: 'Havelock Island', stateId: 'andaman-nicobar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Havelock_Island%2C_Radhanagar_Beach_before_sunset%2C_Andaman_Islands.jpg/1280px-Havelock_Island%2C_Radhanagar_Beach_before_sunset%2C_Andaman_Islands.jpg', description: 'A long curve of powder-white sand backed by mahua trees.', significance: 'Repeatedly ranked among Asia\'s finest beaches for its clear, shallow water.', category: 'nature' as const },
      { id: 'ross-island', name: 'Ross Island', city: 'Port Blair', stateId: 'andaman-nicobar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Andaman_sea.jpg/1280px-Andaman_sea.jpg', description: 'The ruined British administrative capital now swallowed by banyan roots.', significance: 'A living reminder of colonial rule, abandoned after the 1941 earthquake.', category: 'heritage' as const },
    ],
    traditions: [
      { name: 'Nicobarese Hut Building', description: 'Circular stilt huts of wood and thatch built to survive storms.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Havelock_Island%2C_Radhanagar_Beach%2C_Andaman_Islands.jpg/1280px-Havelock_Island%2C_Radhanagar_Beach%2C_Andaman_Islands.jpg' },
      { name: 'Shell Craft', description: 'Lamps, jewellery and inlay work made from island seashells.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Arts_and_crafts_of_Israel_-_Beads%2C_September_2024_01.jpg/1280px-Arts_and_crafts_of_Israel_-_Beads%2C_September_2024_01.jpg' },
      { name: 'Coconut Culture', description: 'Coconut in every meal, roof, rope and ritual across the islands.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/AndamansAndNicobarIslands.jpg/1280px-AndamansAndNicobarIslands.jpg' },
    ],
    dances: [
      { name: 'Nicobari Ossuary Dance', origin: 'Nicobar Islands', description: 'A circle dance performed under moonlight at pig festivals.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Construction_of_a_new_temporary_hutment_by_Nicobari_youth.jpg' },
      { name: 'Bengali Folk on Islands', origin: 'Settler communities', description: 'Mainland folk dances kept alive by settler families in Port Blair.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/An_ancient_Bengali_folk_martial_dance_Raibenshe_41.jpg/1280px-An_ancient_Bengali_folk_martial_dance_Raibenshe_41.jpg' },
    ],
    music: [
      { name: 'Nicobari Song', region: 'Car Nicobar', instruments: 'Voice, Coconut shell percussion', description: 'Chorus songs about canoes, pigs and the sea sung in Nicobarese.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/A_still_of_unique_Kuchet_%283_floored%29_family_hut_in_Kakana_village_in_Car_Nicobar_that_was_visited_by_the_Vice_President_Shri_Bhairon_Singh_Shekhawat_on_January_01%2C_2004.jpg' },
      { name: 'Island Fusion', region: 'Port Blair', instruments: 'Guitar, Dhol, Drums', description: 'Bengali, Tamil and Nicobari melodies mixed by settler generations.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Birdwatchers_watching_Pied_Imperial_Pigeon_at_Chatham_Jetty%2C_Port_Blair_%2817852%29.jpg/1280px-Birdwatchers_watching_Pied_Imperial_Pigeon_at_Chatham_Jetty%2C_Port_Blair_%2817852%29.jpg' },
    ],
    foods: [
      { name: 'Grilled Lobster', origin: 'Island coast', description: 'Fresh lobster split and grilled with butter and island pepper.', whereToTry: 'Beach shacks on Havelock Island', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cousins_Maine_Lobster_-_SF_Bay_Area_-_June_2023_-_Sarah_Stierch_03.jpg/1280px-Cousins_Maine_Lobster_-_SF_Bay_Area_-_June_2023_-_Sarah_Stierch_03.jpg' },
      { name: 'Fish Curry with Coconut', origin: 'Andaman kitchens', description: 'Reef fish simmered in thick coconut milk and curry leaves.', whereToTry: 'Local eateries in Port Blair', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Aavoli_%28Pomfret%29_Fish_Curry.jpg/1280px-Aavoli_%28Pomfret%29_Fish_Curry.jpg' },
      { name: 'Amritsari Kulcha of Port Blair', origin: 'Settler kitchens', description: 'A mainland favourite reinvented by settler families on the islands.', whereToTry: 'Aberdeen Bazaar, Port Blair', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Butter_kulcha_-_paneer_chana.jpg/1280px-Butter_kulcha_-_paneer_chana.jpg' },
    ],
    festivals: [
      { name: 'Island Tourism Festival', description: 'Ten days of dance, food and water sports across Port Blair.', month: 'January', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/An_International_Food_Festival_organised_as_part_of_maiden_trilateral_exercise_between_Indian_Navy_Republic_of_Singapore_Navy_and_Royal_Thai_Navy_2.jpg' },
      { name: 'Pongal on the Islands', description: 'Tamil settlers cook the harvest pot on the beach.', month: 'January', image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/2006_kolam_decoration_for_Pongal_festival_2.jpg' },
      { name: 'Subhash Mela', description: 'A fair marking Netaji\'s flag hoisting on Andaman soil.', month: 'December', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Netaji_Subhas_Chandra_Bose_Statue.jpg/1280px-Netaji_Subhas_Chandra_Bose_Statue.jpg' },
    ],
    artForms: [
      { name: 'Shell Inlay', description: 'Mother-of-pearl inlay set into wooden boxes and trays.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bagdad_Kiosk_Intarsia_detail_2.jpg/1280px-Bagdad_Kiosk_Intarsia_detail_2.jpg' },
      { name: 'Cane Furniture', description: 'Island cane bent into chairs and lamps by local workshops.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Artisan_producing_cane_furniture._Cova_Lima.jpg/1280px-Artisan_producing_cane_furniture._Cova_Lima.jpg' },
      { name: 'Driftwood Sculpture', description: 'Sea-worn wood carved into fish, birds and masks.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/A_driftwood_sculpture_at_The_Skipper_-_geograph.org.uk_-_6840696.jpg' },
    ],
    restaurants: [
      { id: 'andaman-nicobar-r1', name: 'Full Moon Cafe', city: 'Havelock Island', stateId: 'andaman-nicobar', cuisine: 'Seafood', rating: 4.6, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/%281%29Doyles_Beach_Restaurant_Watsons_Bay.jpg/1280px-%281%29Doyles_Beach_Restaurant_Watsons_Bay.jpg', description: 'Fresh catch grilled by the water with the sunset on your plate.' },
      { id: 'andaman-nicobar-r2', name: 'Anju Coco Resto', city: 'Port Blair', stateId: 'andaman-nicobar', cuisine: 'Multi-cuisine', rating: 4.5, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Gudbud_-_Diana_Restaurant%2C_Udupi_-_Karnataka_-_PXL6228.jpg/1280px-Gudbud_-_Diana_Restaurant%2C_Udupi_-_Karnataka_-_PXL6228.jpg', description: 'Island seafood, thalis and coconut desserts in a garden setting.' },
    ],
    events: [
      { id: 'andaman-nicobar-e1', name: 'Island Tourism Festival', location: 'Port Blair, Andaman', stateId: 'andaman-nicobar', date: 'Jan 5–14', month: 'January', category: 'Cultural Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Beautiful_Radha_Nagar_beach_beach%2C_Havelock._Andaman_and_Nicobar_Island.jpg/1280px-Beautiful_Radha_Nagar_beach_beach%2C_Havelock._Andaman_and_Nicobar_Island.jpg', description: 'Island-wide dance, crafts and seafood carnival.' },
      { id: 'andaman-nicobar-e2', name: 'Beach Festival', location: 'Havelock, Andaman', stateId: 'andaman-nicobar', date: 'Apr 12–14', month: 'April', category: 'Beach Carnival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Havelock_Island%2C_Andaman_Sea%2C_Andaman_Islands.jpg/1280px-Havelock_Island%2C_Andaman_Sea%2C_Andaman_Islands.jpg', description: 'Snorkelling, sand art and beach music on Radhanagar.' },
    ],
  },

  {
    id: 'chandigarh',
    name: 'Chandigarh',
    capital: 'Chandigarh',
    tagline: 'The city Le Corbusier drew',
    highlight: 'Rock Garden • Capitol Complex • Gol gappe',
    description:
      'India\'s first planned city — grid sectors, wide green avenues and raw concrete modernism, softened by rose gardens, lake sunsets and Punjabi appetite.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/A_view_of_Open_hand_monument_part_of_Chandigarh_Capitol_Complex%2C_World_Heritage_Site.jpg',
    color: '#B07A2E',
    mapPath: 'M235.6,180.3 L232.8,177.8 L234.6,176.2 L236.5,177.3 L236.8,178.9 L235.6,180.3Z',
    mapLabelX: 234.8,
    mapLabelY: 178.2,
    places: [
      { id: 'rock-garden', name: 'Rock Garden', city: 'Chandigarh', stateId: 'chandigarh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Chandigarh_Rock_Garden_4.jpg/1280px-Chandigarh_Rock_Garden_4.jpg', description: 'A secret garden of thousands of figures made from industrial waste and broken tiles.', significance: 'Nek Chand\'s forty-acre self-taught masterpiece, built in secret for eighteen years.', category: 'heritage' as const },
      { id: 'capitol-complex', name: 'Capitol Complex', city: 'Chandigarh', stateId: 'chandigarh', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Architect_design_of_building_of_Palace_of_Assembly_%2Cpart_of_the_Capitol_Complex_%2CChandigarh_02.jpg', description: 'Le Corbusier\'s concrete assembly, secretariat and high court around an open plaza.', significance: 'A UNESCO World Heritage Site and the birthplace of Indian modernist architecture.', category: 'monument' as const },
      { id: 'sukhna-lake', name: 'Sukhna Lake', city: 'Chandigarh', stateId: 'chandigarh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/On_Sukhna_Lake_02.jpg/1280px-On_Sukhna_Lake_02.jpg', description: 'A man-made lake where the city walks, rows and watches the Shivaliks at dusk.', significance: 'Designed into the city plan itself as its shared outdoor living room.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Sector Life', description: 'Each numbered sector built as a self-sufficient neighbourhood with its own market.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/A_Young_Professional_Enjoys_her_Vacation_in_Sector_17_Market%2C_Chandigarh.jpg/1280px-A_Young_Professional_Enjoys_her_Vacation_in_Sector_17_Market%2C_Chandigarh.jpg' },
      { name: 'Rose Garden Culture', description: 'India\'s largest rose garden, with an annual festival of 50,000 bushes.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Rose_Garden_%2CChandigarh%2CIndia.jpg/1280px-Rose_Garden_%2CChandigarh%2CIndia.jpg' },
      { name: 'Open Hand Symbol', description: 'The rotating Open Hand monument — open to give, open to receive.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Chandigarh_Capitol_Complex_-_Le_Corbusier_-_Open_hand_monument.jpg' },
    ],
    dances: [
      { name: 'Bhangra', origin: 'Punjab plains', description: 'The harvest dance of dhol, shoulders and sheer joy, danced at every Chandigarh wedding.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/A_bhangra_Group_in_Dubai_%28United_Bhangra%29.jpg' },
      { name: 'Giddha', origin: 'Punjabi women', description: 'Clapping, boliyan couplets and quick footwork in a circle.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Giddha_2.jpg/1280px-Giddha_2.jpg' },
    ],
    music: [
      { name: 'Punjabi Pop', region: 'Chandigarh studios', instruments: 'Dhol, Tumbi, Synth', description: 'The recording city that turned Punjabi folk into a global pop sound.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Ashoka_Chakra_imprint_on_martyr%27s_memorial.jpg/1280px-Ashoka_Chakra_imprint_on_martyr%27s_memorial.jpg' },
      { name: 'Sufi Kalam', region: 'Punjab region', instruments: 'Harmonium, Tabla', description: 'Bulleh Shah\'s verses sung at college fests and city auditoriums.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Fannafiallah_sufi_qawwali-7382441676.jpg' },
    ],
    foods: [
      { name: 'Chole Bhature', origin: 'Punjab', description: 'Fluffy fried bread with spiced chickpeas — the city\'s default breakfast.', whereToTry: 'Sector 17 and Sector 22 dhabas', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/A_Plate_of_Chole_Bhature.JPG/1280px-A_Plate_of_Chole_Bhature.JPG' },
      { name: 'Amritsari Fish', origin: 'Amritsar', description: 'Gram-flour battered fish fried crisp with ajwain and lemon.', whereToTry: 'Sector 26 food street', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Amritsari_Fried_Fish-_Amritsar-Punjab_IMG_04.jpg' },
      { name: 'Gol Gappe', origin: 'North India', description: 'Crisp hollow puris filled with spiced tamarind water, eaten standing up.', whereToTry: 'Sector 17 plaza carts', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Customers_enjoying_pani_puri_at_Shiva_Shankar_Chat_Bandar_in_Nyalakal_village%2C_Telangana%2C_India.jpg/1280px-Customers_enjoying_pani_puri_at_Shiva_Shankar_Chat_Bandar_in_Nyalakal_village%2C_Telangana%2C_India.jpg' },
    ],
    festivals: [
      { name: 'Rose Festival', description: 'Three days of rose displays, music and food in the Rose Garden.', month: 'February', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/At_fountain_of_Morocco_Royal_rose_garden_in_Flower_festival_commemorative_park._%288131033157%29.jpg/1280px-At_fountain_of_Morocco_Royal_rose_garden_in_Flower_festival_commemorative_park._%288131033157%29.jpg' },
      { name: 'Baisakhi', description: 'Harvest new year with bhangra, langar and gurdwara processions.', month: 'April', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/A_Rongali_Bihu_celebration_gathering_in_Assam%2C_traditional_Hindu_new_year.jpg' },
      { name: 'Chandigarh Carnival', description: 'A city carnival of parades, floats and street performers.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Glimpses_of_Carnival_parade_at_the_inauguration_of_the_National_Tribal_Carnival-2016%2C_in_New_Delhi_on_October_25%2C_2016.jpg/1280px-Glimpses_of_Carnival_parade_at_the_inauguration_of_the_National_Tribal_Carnival-2016%2C_in_New_Delhi_on_October_25%2C_2016.jpg' },
    ],
    artForms: [
      { name: 'Nek Chand Mosaic', description: 'Broken bangles, tiles and sockets turned into sculpture.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bizzare_human_figurines_and_peacocks%2C_done_typically_Nek_Chand_style_%2830405095878%29.jpg/1280px-Bizzare_human_figurines_and_peacocks%2C_done_typically_Nek_Chand_style_%2830405095878%29.jpg' },
      { name: 'Modernist Furniture', description: 'Chandigarh chairs in teak and cane designed by Pierre Jeanneret.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Armchair_created_by_Pierre_Jeanneret_PJ-SI-01-C.jpg/1280px-Armchair_created_by_Pierre_Jeanneret_PJ-SI-01-C.jpg' },
      { name: 'Phulkari', description: 'Punjabi floral embroidery worked in silk floss on khaddar.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/%27Phulkari%27_%28bridal_shawl%29%2C_Punjab%2C_early_20th_century%2C_cotton%2C_silk_and_embroidery%2C_Honolulu_Academy_of_Arts.jpg/1280px-%27Phulkari%27_%28bridal_shawl%29%2C_Punjab%2C_early_20th_century%2C_cotton%2C_silk_and_embroidery%2C_Honolulu_Academy_of_Arts.jpg' },
    ],
    restaurants: [
      { id: 'chandigarh-r1', name: 'Pal Dhaba', city: 'Chandigarh', stateId: 'chandigarh', cuisine: 'Punjabi', rating: 4.5, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Aloo_Paratha_Thali.jpg', description: 'Legendary butter-heavy Punjabi curries since 1963.' },
      { id: 'chandigarh-r2', name: 'Sector 26 Food Street', city: 'Chandigarh', stateId: 'chandigarh', cuisine: 'Street Food', rating: 4.4, priceRange: '₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Authentic_Sylheti_Cuisine.jpg/1280px-Authentic_Sylheti_Cuisine.jpg', description: 'Night rows of tandoors, chaat carts and kulfi stalls.' },
    ],
    events: [
      { id: 'chandigarh-e1', name: 'Rose Festival', location: 'Chandigarh', stateId: 'chandigarh', date: 'Feb 21–23', month: 'February', category: 'Flower Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Colors_and_varieties_of_roses_in_Zakir_Hussain_Rose_Garden%2C_Chandigarh_05.jpg', description: 'Fifty thousand rose bushes in bloom with concerts and food stalls.' },
      { id: 'chandigarh-e2', name: 'Chandigarh Carnival', location: 'Chandigarh', stateId: 'chandigarh', date: 'Nov 15–17', month: 'November', category: 'Street Carnival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ariel_view_of_Chandigarh.jpg/1280px-Ariel_view_of_Chandigarh.jpg', description: 'Floats, street theatre and a lake-side fair.' },
    ],
  },

  {
    id: 'dadra-nagar-haveli',
    name: 'Dadra and Nagar Haveli',
    capital: 'Silvassa',
    tagline: 'Tribal heartland in a teak forest',
    highlight: 'Warli art • Tarpa dance • Silvassa',
    description:
      'A pocket of forested hills between Gujarat and Maharashtra, home to the Warli, Kokna and Dhodia tribes whose white stick-figure paintings now travel the world.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Dadra_and_Nagar_Haveli_Silvassa.jpg/1280px-Dadra_and_Nagar_Haveli_Silvassa.jpg',
    color: '#6B8E3D',
    mapPath: 'M136.7,502.6 L133.4,501.2 L133.2,502.1 L132.0,500.0 L131.4,500.8 L131.1,497.5 L129.7,495.9 L131.3,496.1 L132.3,494.8 L133.0,495.6 L134.6,493.6 L134.8,495.2 L136.6,495.0 L133.5,498.1 L134.0,499.5 L135.9,499.0 L135.7,498.0 L138.0,498.6 L136.7,502.6Z',
    mapLabelX: 133.8,
    mapLabelY: 498.1,
    places: [
      { id: 'vanganga-lake', name: 'Vanganga Lake Garden', city: 'Silvassa', stateId: 'dadra-nagar-haveli', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dadra_and_Nagar_Haveli_Silvassa_2.jpg/1280px-Dadra_and_Nagar_Haveli_Silvassa_2.jpg', description: 'An island garden with Japanese bridges, lotus ponds and boat rides.', significance: 'Silvassa\'s best-loved public garden, built around a restored lake.', category: 'nature' as const },
      { id: 'tribal-museum', name: 'Tribal Cultural Museum', city: 'Silvassa', stateId: 'dadra-nagar-haveli', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/A_Warli_painting_by_Jivya_Soma_Mashe%2C_Thane_district.jpg/1280px-A_Warli_painting_by_Jivya_Soma_Mashe%2C_Thane_district.jpg', description: 'Masks, hunting tools and Warli murals of the region\'s tribes.', significance: 'The main record of Warli, Kokna and Dhodia material culture.', category: 'heritage' as const },
      { id: 'dudhni-lake', name: 'Dudhni Lake', city: 'Dudhni', stateId: 'dadra-nagar-haveli', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/A_Beautiful_Nature_of_Silvassa.jpg/1280px-A_Beautiful_Nature_of_Silvassa.jpg', description: 'A backwater of the Madhuban dam ringed by hills, popular for kayaking.', significance: 'The region\'s outdoor centre for boating and lakeside camping.', category: 'nature' as const },
    ],
    traditions: [
      { name: 'Warli Wall Painting', description: 'White rice-paste figures painted on mud walls for weddings and harvests.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Anonymous_Warli_painting_on_paper%2C_64_x_86_cm.jpg' },
      { name: 'Tarpa Instrument', description: 'A gourd-and-bamboo wind instrument that leads the village dance.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Bohada_in_Palghar_Tribe_Festival.jpg/1280px-Bohada_in_Palghar_Tribe_Festival.jpg' },
      { name: 'Ghotul Gatherings', description: 'Village youth gatherings where songs, dances and stories pass down.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Argyreia_nervosa_plant_in_village_Parala.jpg/1280px-Argyreia_nervosa_plant_in_village_Parala.jpg' },
    ],
    dances: [
      { name: 'Tarpa Dance', origin: 'Warli tribe', description: 'A spiral chain of dancers circling the tarpa player until dawn.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bohada_in_Palghar_Tribe_Festival_%2826313%29.jpg/1280px-Bohada_in_Palghar_Tribe_Festival_%2826313%29.jpg' },
      { name: 'Dhol Dance', origin: 'Kokna tribe', description: 'Rows of drummers and dancers marking the end of harvest.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Traditional_Tribal_Dance_of_India_014.jpg/1280px-Traditional_Tribal_Dance_of_India_014.jpg' },
    ],
    music: [
      { name: 'Tarpa Melody', region: 'Warli villages', instruments: 'Tarpa, Dhol', description: 'A single droning reed that can be heard across three hills.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Traditional_Tribal_Dance_of_India_018.jpg/1280px-Traditional_Tribal_Dance_of_India_018.jpg' },
      { name: 'Kokna Harvest Song', region: 'Nagar Haveli', instruments: 'Dhol, Thali', description: 'Call-and-response songs sung while threshing paddy.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/IMG-20170106-WA0000-01.jpg' },
    ],
    foods: [
      { name: 'Ubadiyu', origin: 'Gujarat border villages', description: 'Winter vegetables and beans steamed underground in an earthen pot.', whereToTry: 'Roadside stalls around Silvassa in winter', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Undhiyu.jpg/1280px-Undhiyu.jpg' },
      { name: 'Chicken Kadhi', origin: 'Local kitchens', description: 'Country chicken in a tangy buttermilk gravy with local spice.', whereToTry: 'Family restaurants in Silvassa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Butter_chicken_curry_of_Lawson.jpg/1280px-Butter_chicken_curry_of_Lawson.jpg' },
      { name: 'Rice Bhakri', origin: 'Tribal homes', description: 'Hand-patted rice flatbread eaten with chutney and dal.', whereToTry: 'Village homestays near Dudhni', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Bhakari2.jpg/1280px-Bhakari2.jpg' },
    ],
    festivals: [
      { name: 'Tarpa Festival', description: 'A night of tarpa music and spiral dancing after harvest.', month: 'October', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Traditional_Tribal_Dance_of_India_020.jpg/1280px-Traditional_Tribal_Dance_of_India_020.jpg' },
      { name: 'Diwali Padwa', description: 'Tribal cattle worship and lamp lighting across the villages.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Decorative_lamps_for_Diwali.jpg/1280px-Decorative_lamps_for_Diwali.jpg' },
      { name: 'Holi in the Hamlets', description: 'Bonfires, drums and colour in the forest villages.', month: 'March', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Barsana_Holi_Festival.jpg/1280px-Barsana_Holi_Festival.jpg' },
    ],
    artForms: [
      { name: 'Warli Painting', description: 'Circles, triangles and stick figures telling stories of village life.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Art_of_warli.jpg/1280px-Art_of_warli.jpg' },
      { name: 'Bamboo Craft', description: 'Fish traps, winnows and mats woven from forest bamboo.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/A_view_of_bamboo_basket_making.JPG/1280px-A_view_of_bamboo_basket_making.JPG' },
      { name: 'Terracotta Votives', description: 'Clay horses and figures offered at village shrines.', image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Art_of_BishnupurDSC06025.jpg' },
    ],
    restaurants: [
      { id: 'dadra-nagar-haveli-r1', name: 'Silvassa Spice', city: 'Silvassa', stateId: 'dadra-nagar-haveli', cuisine: 'Gujarati-Tribal', rating: 4.3, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ahmedabad-gujarati_thali.jpg/1280px-Ahmedabad-gujarati_thali.jpg', description: 'Ubadiyu in winter and local thalis all year.' },
      { id: 'dadra-nagar-haveli-r2', name: 'Dudhni Lakeside', city: 'Dudhni', stateId: 'dadra-nagar-haveli', cuisine: 'Multi-cuisine', rating: 4.2, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Dadra_and_Nagar_Haveli_Silvassa_3.jpg/1280px-Dadra_and_Nagar_Haveli_Silvassa_3.jpg', description: 'Grilled fish and curries on a deck over the water.' },
    ],
    events: [
      { id: 'dadra-nagar-haveli-e1', name: 'Tarpa Festival', location: 'Silvassa, Dadra and Nagar Haveli', stateId: 'dadra-nagar-haveli', date: 'Oct 18–19', month: 'October', category: 'Tribal Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bohada_in_Palghar_Tribe_Festival_%2840549%29.jpg/1280px-Bohada_in_Palghar_Tribe_Festival_%2840549%29.jpg', description: 'Warli tarpa dancers from every village dance through the night.' },
      { id: 'dadra-nagar-haveli-e2', name: 'Monsoon Magic Festival', location: 'Dudhni, Dadra and Nagar Haveli', stateId: 'dadra-nagar-haveli', date: 'Aug 9–11', month: 'August', category: 'Nature Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/A_waterfall_by_the_roadside-_many_of_these_occur_during_the_monsoons_%2828561900705%29.jpg/1280px-A_waterfall_by_the_roadside-_many_of_these_occur_during_the_monsoons_%2828561900705%29.jpg', description: 'Waterfall treks, kayaking and tribal food stalls.' },
    ],
  },

  {
    id: 'daman-diu',
    name: 'Daman and Diu',
    capital: 'Daman',
    tagline: 'Portuguese forts on an Indian shore',
    highlight: 'Sea forts • Baroque churches • Fresh catch',
    description:
      'Two former Portuguese enclaves on the Arabian Sea, where whitewashed churches, tiled houses and enormous sea forts stand over fishing harbours and quiet beaches.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Arabian_Sea_from_Diu_Fort_-_panoramio.jpg/1280px-Arabian_Sea_from_Diu_Fort_-_panoramio.jpg',
    color: '#C25A3C',
    mapPath: 'M72.6,483.9 L68.1,481.9 L69.8,475.1 L73.7,476.2 L74.3,477.7 L72.0,479.2 L74.2,480.0 L72.7,481.9 L73.6,483.5 L72.6,483.9Z',
    mapLabelX: 71.2,
    mapLabelY: 479.5,
    places: [
      { id: 'diu-fort', name: 'Diu Fort', city: 'Diu', stateId: 'daman-diu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Diu_Fort_-_panoramio.jpg/1280px-Diu_Fort_-_panoramio.jpg', description: 'A vast sea fortress of 1535 with cannons still pointing at the water.', significance: 'The strongest surviving Portuguese fortification in India.', category: 'fort' as const },
      { id: 'st-pauls-church', name: 'St Paul\'s Church', city: 'Diu', stateId: 'daman-diu', image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Diu%2CGujarat%2CIndia_%2826%29.jpg', description: 'A baroque church of carved wood and shell-white plaster, lit by chandeliers.', significance: 'One of the finest Portuguese baroque interiors surviving in Asia.', category: 'heritage' as const },
      { id: 'moti-daman-fort', name: 'Moti Daman Fort', city: 'Daman', stateId: 'daman-diu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Daman_Freedom_Memorial.JPG/1280px-Daman_Freedom_Memorial.JPG', description: 'A walled town of bastions, gates and a lighthouse over the Damanganga river.', significance: 'The old Portuguese administrative capital, still lived in today.', category: 'fort' as const },
    ],
    traditions: [
      { name: 'Fishing Fleet', description: 'Painted wooden trawlers that leave the harbour before dawn.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Diu_Fort_1.jpg' },
      { name: 'Portuguese Tiles', description: 'Azulejo tiles and carved balconies on old town houses.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Azulejo_-_Igreja_de_S%C3%A3o_Bento_-_Ribeira_Brava.jpg/1280px-Azulejo_-_Igreja_de_S%C3%A3o_Bento_-_Ribeira_Brava.jpg' },
      { name: 'Feast Day Processions', description: 'Church statues carried through the streets on saints\' days.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Altar_servers_getting_ready_for_the_procession.jpg' },
    ],
    dances: [
      { name: 'Mando', origin: 'Indo-Portuguese heritage', description: 'A slow ballroom-style dance in white and lace, sung in Konkani-Portuguese.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/A_singer_from_the_world_of_the_Mando%2C_the_song-dance_form_of_Konkani_music_from_Goa.jpg/1280px-A_singer_from_the_world_of_the_Mando%2C_the_song-dance_form_of_Konkani_music_from_Goa.jpg' },
      { name: 'Verdigo', origin: 'Daman Catholic community', description: 'A quick partnered folk dance at weddings and feast days.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dhaalo.jpg/1280px-Dhaalo.jpg' },
    ],
    music: [
      { name: 'Konkani Ballad', region: 'Daman and Diu', instruments: 'Violin, Guitar, Ghumot', description: 'Portuguese-flavoured love songs sung at feast dinners.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Diu_Fort_2.jpg' },
      { name: 'Fishermen\'s Song', region: 'Coastal villages', instruments: 'Voice, Drum', description: 'Rowing songs that time the pull of the nets.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Classical_Meitei_sculptures_of_ancient_Meitei_fishermen_using_different_indigenous_Meitei_fishing_instruments_%26_tools_to_catch_fish_02.jpg/1280px-Classical_Meitei_sculptures_of_ancient_Meitei_fishermen_using_different_indigenous_Meitei_fishing_instruments_%26_tools_to_catch_fish_02.jpg' },
    ],
    foods: [
      { name: 'Prawn Balchao', origin: 'Portuguese-Indian coast', description: 'Prawns pickled in a hot vinegar and chilli masala.', whereToTry: 'Seafront shacks in Diu', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Balch%C3%A3o_de_camar%C3%A3o.JPG' },
      { name: 'Grilled Pomfret', origin: 'Arabian Sea coast', description: 'Whole pomfret rubbed with green masala and grilled over coals.', whereToTry: 'Harbour restaurants in Daman', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Tandoori_Pomfret.JPG/1280px-Tandoori_Pomfret.JPG' },
      { name: 'Bebinca', origin: 'Indo-Portuguese kitchens', description: 'A layered coconut and egg pudding baked one layer at a time.', whereToTry: 'Bakeries in Diu town', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Bebinca%2C_doce_de_Goa.jpg/1280px-Bebinca%2C_doce_de_Goa.jpg' },
    ],
    festivals: [
      { name: 'Nariyal Purnima', description: 'Fishermen offer coconuts to the sea before the new season.', month: 'August', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/2022_jg_photography.jpg' },
      { name: 'Feast of Our Lady of Sea', description: 'Boat processions and church feasts in Diu.', month: 'November', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Diu_Fort_Entrance.JPG/1280px-Diu_Fort_Entrance.JPG' },
      { name: 'Diu Festival', description: 'Beach concerts, food stalls and water sports through winter.', month: 'December', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Before_Sunrise_at_Nagoa_Beach%2C_Diu-60-_28.06.2021.jpg/500px-Before_Sunrise_at_Nagoa_Beach%2C_Diu-60-_28.06.2021.jpg' },
    ],
    artForms: [
      { name: 'Shell Craft', description: 'Wind chimes, lamps and boxes made from sea shells.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Diu_Fort_Entrance_-_panoramio.jpg/1280px-Diu_Fort_Entrance_-_panoramio.jpg' },
      { name: 'Wood Carving', description: 'Church altars and door frames carved in Burma teak.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Abbess_Roding_-_St_Edmund%27s_Church_-_Essex_England_-_chancel.jpg/1280px-Abbess_Roding_-_St_Edmund%27s_Church_-_Essex_England_-_chancel.jpg' },
      { name: 'Lace and Embroidery', description: 'Portuguese-taught lacework kept alive by Daman families.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Bodice%2C_infant%27s_%28AM_14507-6%29.jpg/1280px-Bodice%2C_infant%27s_%28AM_14507-6%29.jpg' },
    ],
    restaurants: [
      { id: 'daman-diu-r1', name: 'O\'Coqueiro', city: 'Diu', stateId: 'daman-diu', cuisine: 'Seafood', rating: 4.5, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/0370_Varca_-_Zalor_Beach_2006-02-11_17-43-39_%2810543197555%29.jpg/1280px-0370_Varca_-_Zalor_Beach_2006-02-11_17-43-39_%2810543197555%29.jpg', description: 'Balchao, grilled catch and cold drinks under coconut palms.' },
      { id: 'daman-diu-r2', name: 'Daman Harbour Grill', city: 'Daman', stateId: 'daman-diu', cuisine: 'Coastal', rating: 4.3, priceRange: '₹₹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Barbecue_Seafood_Platter_-_Sterling_Holidays_Bardez_-_North_Goa_-_20180913_152240.jpg/1280px-Barbecue_Seafood_Platter_-_Sterling_Holidays_Bardez_-_North_Goa_-_20180913_152240.jpg', description: 'Pomfret, crab and prawn curry beside the fishing jetty.' },
    ],
    events: [
      { id: 'daman-diu-e1', name: 'Diu Festival', location: 'Diu', stateId: 'daman-diu', date: 'Dec 20–31', month: 'December', category: 'Beach Carnival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Clean_coast_between_Ghoghla_and_Khodighar_Beach%2C_Diu-20-_29.06.2021.jpg/1280px-Clean_coast_between_Ghoghla_and_Khodighar_Beach%2C_Diu-20-_29.06.2021.jpg', description: 'Ten nights of concerts, food and fireworks on Ghoghla beach.' },
      { id: 'daman-diu-e2', name: 'Daman Beach Fest', location: 'Devka, Daman', stateId: 'daman-diu', date: 'Jan 10–12', month: 'January', category: 'Beach Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Daman_01012012_155.JPG/1280px-Daman_01012012_155.JPG', description: 'Sand sculpture, seafood stalls and Konkani music.' },
    ],
  },
];

// ─────────────────────────────────────────────
// Famous places — cross-state for "Places That Tell India's Story"
// ─────────────────────────────────────────────
export const famousPlaces = states.flatMap((s) => s.places);

// ─────────────────────────────────────────────
// All dances, music, foods, traditions, events
// ─────────────────────────────────────────────
export const allDances = states.flatMap((s) => s.dances.map((d) => ({ ...d, stateId: s.id, stateName: s.name })));
export const allMusic = states.flatMap((s) => s.music.map((m) => ({ ...m, stateId: s.id, stateName: s.name })));
export const allFoods = states.flatMap((s) => s.foods.map((f) => ({ ...f, stateId: s.id, stateName: s.name })));
export const allTraditions = states.flatMap((s) => s.traditions.map((t) => ({ ...t, stateId: s.id, stateName: s.name })));
export const allArtForms = states.flatMap((s) => s.artForms.map((a) => ({ ...a, stateId: s.id, stateName: s.name })));
export const allEvents = states.flatMap((s) => s.events);
export const allRestaurants = states.flatMap((s) => s.restaurants);

// ─────────────────────────────────────────────
// Reels — vertical short-video feed data
// ─────────────────────────────────────────────
export const reels: Reel[] = [];

// ─────────────────────────────────────────────
// Preservation — endangered and reviving heritage
// ─────────────────────────────────────────────
export const preservationItems: PreservationItem[] = [
  { id: 'p1', title: 'Manjusha Art', state: 'Bihar', category: 'Folk Art', description: 'A 300-year-old scroll painting tradition nearly lost, now being revived by a handful of artists in Bhagalpur.', status: 'Reviving', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Thiksey_Monastery%2C_Ladakh_14.jpg/1280px-Thiksey_Monastery%2C_Ladakh_14.jpg' },
  { id: 'p2', title: 'Ravanahatha', state: 'Rajasthan', category: 'Instrument', description: 'A 5,000-year-old bowed string instrument, ancestor of the violin, kept alive by a few Langa musicians.', status: 'Declining', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg/1280px-Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg' },
  { id: 'p3', title: 'Pattachitra Scroll Singing', state: 'Odisha', category: 'Performance', description: 'Patua painters who sing the stories depicted in their scrolls \u2014 an oral tradition fading with each generation.', status: 'Endangered', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Thiksey_Monastery%2C_Ladakh_15.jpg/1280px-Thiksey_Monastery%2C_Ladakh_15.jpg' },
  { id: 'p4', title: 'Toda Embroidery', state: 'Tamil Nadu', category: 'Textile', description: 'Intricate red-and-black embroidery by the Toda tribe of the Nilgiris, practiced by fewer than 1,000 people.', status: 'Endangered', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Ladakh_International_Music_Festival_2022.jpg' },
  { id: 'p5', title: 'Baul Music', state: 'West Bengal', category: 'Music', description: 'UNESCO-recognized mystic minstrel tradition of wandering Baul singers, struggling with modern livelihoods.', status: 'Declining', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Ladakh_International_Music_Festival_2022.jpg' },
  { id: 'p6', title: 'Kathputli Puppetry', state: 'Rajasthan', category: 'Performance', description: 'String puppetry tradition kept by the Bhat community, now competing with digital entertainment.', status: 'Declining', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Ladakh_International_Music_Festival_2022.jpg' },
];

// ─────────────────────────────────────────────
// State name lookup helper
// ─────────────────────────────────────────────
export const getStateById = (id: string): StateData | undefined => states.find((s) => s.id === id);
export const getStateName = (id: string): string => getStateById(id)?.name ?? id;
