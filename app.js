/**
 * Iceland Summer 2026 Expedition Master App Script
 * Features persistent state (localStorage), interactive Day & Stop editor,
 * interactive calculators, search & filtering, and photo explorer.
 */

const STORAGE_KEY = 'ICELAND_EXPEDITION_DATA_2026';
const PACKING_KEY = 'ICELAND_EXPEDITION_PACKING_2026';

// Master Default Data Set extracted from Reference Data
const DEFAULT_ITINERARY = [
  {
    id: 1,
    dayNum: 1,
    date: "July 24, 2026",
    title: "Arrival & Late-Night Launch",
    phase: "Phase 1: Arrival & Geothermal Beginnings",
    category: "south",
    drivingTime: "~35 min (~35 km)",
    walkDistance: "~1 km",
    route: "Keflavík Airport ➔ Kópavogur ➔ Sandgerði",
    campsite: "Sandgerði Campsite (Camping Card)",
    poolShower: "Sandgerðislaug (Geothermal pool, hot tubs & indoor showers right in Sandgerði)",
    summary: "Land in Keflavík at 18:20 on flight FI507. Collect 3 hard cases & 3 carry-ons, put on thermal shell, take Flybus to Kópavogur and taxi to Cozy Campers HQ. Pick up vehicle via self-service keybox.",
    notes: "Mandatory: Complete online check-in 48h prior to ensure keybox programming. Windchill drops to 6°C-9°C at night.",
    completed: false,
    stops: [
      {
        name: "Keflavík International Airport (KEF)",
        desc: "Landing pad at 18:20 (Flight FI507). Border control & baggage pickup.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/01_keflavik_international_airport.jpg"
      },
      {
        name: "Cozy Campers HQ (Kópavogur)",
        desc: "Van pickup point (Kársnesbraut 106). Keybox code pickup & digital vehicle check.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/02_cozy_campers_hq_kopavogur.jpg"
      },
      {
        name: "Sandgerði Campsite",
        desc: "First-night resting spot located just 10 minutes from KEF terminal.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/55_sandgerdi_campsite.jpg"
      }
    ]
  },
  {
    id: 2,
    dayNum: 2,
    date: "July 25, 2026",
    title: "Volcanic Soaks & Golden Circle Sprint",
    phase: "Phase 1: Arrival & Geothermal Beginnings",
    category: "highlights",
    drivingTime: "~2.5 hours (~190 km)",
    walkDistance: "~6 km",
    route: "Sandgerði ➔ Blue Lagoon ➔ Kópavogur ➔ Thingvellir ➔ Strokkur ➔ Gullfoss ➔ Gjáin ➔ Hella",
    campsite: "Gaddstaðaflatir Hella Campsite (Camping Card)",
    poolShower: "Sundlaugin Hella (Geothermal heated pool, water slides & hot tubs right next to camp)",
    summary: "09:00 Blue Lagoon geothermal soak, stock up on vegetarian food at Krónan/Bónus in Kópavogur, explore Thingvellir, Strokkur, Gullfoss, and hike into fairytale Gjáin Valley before camping at Hella.",
    notes: "Park at Stöng ruins for Gjáin Valley to avoid ground ruts with 2WD van.",
    completed: false,
    stops: [
      {
        name: "The Blue Lagoon",
        desc: "Volcanic geothermal silica soak to kick off Day 2 (Booked for 09:00).",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg"
      },
      {
        name: "Krónan or Bónus (Kópavogur)",
        desc: "Major vegetarian grocery haul (Oumph!, plant milks, dry staples).",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/05_kronan_or_bonus.jpg"
      },
      {
        name: "Thingvellir National Park",
        desc: "Continental tectonic rift walk between Eurasian and North American plates.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/06_thingvellir_national_park.jpg"
      },
      {
        name: "Strokkur Geyser",
        desc: "Erupting boiling water tower firing every 6-10 minutes.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/08_strokkur_geyser.jpg"
      },
      {
        name: "Gullfoss Falls",
        desc: "Golden Circle's roaring double waterfall plunging into Hvítá canyon.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/09_gullfoss_falls.jpg"
      },
      {
        name: "Gjáin Valley",
        desc: "The 'fairytale oasis' emerald volcanic valley.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/07_gjain_valley.jpg"
      },
      {
        name: "Hella Campsite",
        desc: "Operational base camp for Highlands exploration.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/11_hella_campsite.jpg"
      }
    ]
  },
  {
    id: 3,
    dayNum: 3,
    date: "July 26, 2026",
    title: "Landmannalaugar Highland Odyssey",
    phase: "Phase 2: The Highlands & The South Coast Coastline",
    category: "highlands",
    drivingTime: "0 min (Camper parked at Hella; 4x4 Bus day)",
    walkDistance: "~8.5 km",
    route: "Hella ➔ Landmannalaugar (4x4 Bus) ➔ Hella",
    campsite: "Gaddstaðaflatir Hella Campsite (Night 2 - Camping Card)",
    poolShower: "Landmannalaugar Natural Hot River Bath or Sundlaugin Hvolsvelli / Hella Pool",
    summary: "Park 2WD camper securely at Hella. Board 08:45 4x4 Highland Bus at Olís station into Landmannalaugar. Hike rhyolite mountains & soak in natural warm thermal river. Return by 18:00.",
    notes: "Bring waterproof shell, trail boots, swimwear, towel, and packed lunch.",
    completed: false,
    stops: [
      {
        name: "Landmannalaugar Highlands",
        desc: "Multi-colored rhyolite mountains, lava fields, and natural hot spring river soak.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/12_landmannalaugar.jpg"
      },
      {
        name: "Hella Base Camp",
        desc: "Safe 2WD parking location & campsite.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/11_hella_campsite.jpg"
      }
    ]
  },
  {
    id: 4,
    dayNum: 4,
    date: "July 27, 2026",
    title: "Thundering Waterfalls & Secret Cliffs",
    phase: "Phase 2: The Highlands & The South Coast Coastline",
    category: "highlights",
    drivingTime: "~2 hours (~140 km)",
    walkDistance: "~6.5 km",
    route: "Hella ➔ Seljalandsfoss ➔ Gljúfrabúi ➔ Kvernufoss ➔ Skógafoss ➔ Dyrhólaey ➔ Reynisfjara ➔ Vík ➔ Kleifarmörk",
    campsite: "Kleifarmörk Campsite (Kirkjubæjarklaustur) (Camping Card)",
    poolShower: "Sundlaugin Kirkjubæjarklaustri (Geothermal pool & hot tubs 5 min from Kleifarmörk camp)",
    summary: "Walk behind Seljalandsfoss curtain & cave waterfall Gljúfrabúi. Discover hidden canyon waterfall Kvernufoss. Marvel at Skógafoss. View puffins at Dyrhólaey & walk Reynisfjara black sands.",
    notes: "⚠️ Safety Warning: Reynisfjara sneaker waves. Never turn your back to the sea!",
    completed: false,
    stops: [
      {
        name: "Seljalandsfoss & Gljúfrabúi",
        desc: "Walk-behind waterfall curtain & hidden cave waterfall.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/13_seljalandsfoss_and_gljufrabui.jpg"
      },
      {
        name: "Kvernufoss",
        desc: "Secret walk-behind canyon waterfall next to Skógafoss (20-min flat hike).",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/14_kvernufoss.jpg"
      },
      {
        name: "Skógafoss",
        desc: "Iconic 60m thunderous wall of water.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/15_skogafoss.jpg"
      },
      {
        name: "Dyrhólaey Cliffs",
        desc: "High vantage viewpoint for spotting nesting puffins & coastline.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/16_dyrholaey_cliffs.jpg"
      },
      {
        name: "Reynisfjara Black Sand Beach",
        desc: "Geometric basalt columns and volcanic black sand coast.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/17_reynisfjara_beach.jpg"
      },
      {
        name: "The Soup Company (Vík)",
        desc: "Home of the famous Red Hot Lava Soup bowl.",
        image: "iceland_trip_photos/phase_2_the_highlands_and_the_south_coast/18_vik_campsite_or_the_soup_company.png"
      },
      {
        name: "Kleifarmörk Campsite",
        desc: "Tranquil green campsite near Kirkjubæjarklaustur.",
        image: "iceland_trip_photos/extra_photos/kleifarmork_campsite.jpg"
      }
    ]
  },
  {
    id: 5,
    dayNum: 5,
    date: "July 28, 2026",
    title: "Deep Canyons & Basalt Columns",
    phase: "Phase 3: Canyons & Glaciers",
    category: "south",
    drivingTime: "~1.5 hours (~100 km)",
    walkDistance: "~5.5 km",
    route: "Kleifarmörk ➔ Fjaðrárgljúfur Canyon ➔ Skaftafell",
    campsite: "Skaftafell Campground (Camping Card)",
    poolShower: "Sundlaugin Kirkjubæjarklaustri (Morning) or Höfn Geothermal Swimming Pool (Evening)",
    summary: "Hike the winding green rim trails of Fjaðrárgljúfur Canyon in the morning. Drive across sandur plains to Skaftafell for a short trek to Svartifoss (basalt column waterfall). Overnight among glaciers.",
    notes: "Book Glacier Adventure ice trek at HQ for Day 6 morning.",
    completed: false,
    stops: [
      {
        name: "Fjaðrárgljúfur Canyon",
        desc: "Winding green mossy rim trail hike with dramatic serpent canyons.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/19_fjadrargljufur_canyon.jpg"
      },
      {
        name: "Svartifoss (Skaftafell NP)",
        desc: "Trek to Svartifoss waterfall, framed by hanging dark basalt columns.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/20_skaftafell_national_park_svartifoss.jpg"
      },
      {
        name: "Glacier Adventure HQ",
        desc: "Gathering point for pre-booked ice trekking hike.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/22_glacier_adventure_hq.jpg"
      },
      {
        name: "Skaftafell Campground",
        desc: "Overnight base set right below Vatnajökull glacier tongues.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/21_skaftafell_campground.jpg"
      }
    ]
  },
  {
    id: 6,
    dayNum: 6,
    date: "July 29, 2026",
    title: "Icebergs, Hidden Canyons & Horn Reflection",
    phase: "Phase 3: Canyons & Glaciers",
    category: "highlights",
    drivingTime: "~2.5 hours (~200 km)",
    walkDistance: "~7.5 km",
    route: "Skaftafell ➔ Jökulsárlón ➔ Diamond Beach ➔ Múlagljúfur ➔ Vestrahorn ➔ Djúpivogur",
    campsite: "Djúpivogur Campsite (Camping Card)",
    poolShower: "Sundlaug Djúpavogs (Quiet village geothermal pool & hot tubs right in Djúpivogur)",
    summary: "Morning Glacier Trek with Glacier Adventure. Watch floating icebergs at Jökulsárlón Glacier Lagoon & crystal ice on Diamond Beach. Hike Jurassic-style Múlagljúfur Canyon. Photograph Vestrahorn at Stokksnes.",
    notes: "Múlagljúfur canyon trail is breathtaking—allow 2.5 hours for full rim hike.",
    completed: false,
    stops: [
      {
        name: "Jökulsárlón Glacier Lagoon",
        desc: " Sapphire icebergs drifting out to sea from Vatnajökull.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/23_jokulsarlon_glacier_lagoon.jpg"
      },
      {
        name: "Diamond Beach",
        desc: "Crystal-clear ice blocks glowing on black volcanic sand.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/24_diamond_beach.jpg"
      },
      {
        name: "Múlagljúfur Canyon",
        desc: "Spectacular 'Jurassic Park-style' hidden canyon trail with twin waterfalls.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/25_mulagljufur_canyon.jpg"
      },
      {
        name: "Vestrahorn Mountain (Stokksnes)",
        desc: "Dramatic black sand dunes and jagged mountain reflection peaks.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/26_vestrahorn_mountain_stokksnes.jpg"
      },
      {
        name: "Southern East Fjords Coastline",
        desc: "Scenic coastal driving route winding around deep fjords.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/27_southern_east_fjords_coastline.jpg"
      },
      {
        name: "Djúpivogur Campsite",
        desc: "Quiet harbor village overnight camp.",
        image: "iceland_trip_photos/phase_3_canyons_and_glaciers/28_djupivogur_campsite.jpg"
      }
    ]
  },
  {
    id: 7,
    dayNum: 7,
    date: "July 30, 2026",
    title: "Winding East Fjords & Floating Geothermal Pools",
    phase: "Phase 4: East Fjords to the Volcanic North",
    category: "south",
    drivingTime: "~3 hours (~220 km)",
    walkDistance: "~4.5 km",
    route: "Djúpivogur ➔ Hengifoss ➔ Egilsstaðir ➔ Vök Baths ➔ Seyðisfjörður",
    campsite: "Egilsstaðir Campsite (Camping Card)",
    poolShower: "Vök Baths (Floating geothermal pools) or Sundlaug Egilsstaða (Town pool & steam bath)",
    summary: "Drive scenic East Fjords. Hike to black basalt cliffs striped with red clay at Hengifoss. Restock in Egilsstaðir and unwind in floating geothermal pools at Vök Baths on Lake Urriðavatn.",
    notes: "Egilsstaðir campsite has premium heated indoor kitchens and laundry.",
    completed: false,
    stops: [
      {
        name: "Hengifoss Waterfall",
        desc: "Highland hike to black basalt cliffs striped with red clay layers.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/29_hengifoss.jpg"
      },
      {
        name: "Litlanesfoss",
        desc: "Stunning basalt column waterfall along the Hengifoss trail.",
        image: "iceland_trip_photos/extra_photos/litlanesfoss_waterfall.jpg"
      },
      {
        name: "Egilsstaðir Town & Campsite",
        desc: "Top-tier campsite facility hub with heated indoor kitchens.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/30_egilsstadir_town_and_campsite.jpg"
      },
      {
        name: "Vök Baths",
        desc: "Floating geothermal pools on Lake Urriðavatn.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/31_vok_baths.jpg"
      },
      {
        name: "Seyðisfjörður Fjord Town",
        desc: "Historic fjord town with colorful rainbow street.",
        image: "iceland_trip_photos/extra_photos/seydisfjordur_town.jpg"
      }
    ]
  },
  {
    id: 8,
    dayNum: 8,
    date: "July 31, 2026",
    title: "Basalt Canyon Floor & Highland Wilderness",
    phase: "Phase 4: East Fjords to the Volcanic North",
    category: "highlights",
    drivingTime: "~2.5 hours (~160 km)",
    walkDistance: "~5 km",
    route: "Seyðisfjörður ➔ Road 923 ➔ Stuðlagil ➔ Möðrudalur",
    campsite: "Möðrudalur - Fjalladýrð Campsite (Camping Card)",
    poolShower: "Sundlaug Egilsstaða (Before highland drive) or Möðrudalur Farmstead Showers",
    summary: "Take Gravel Road 923 (East Side Approach) to hike directly onto Stuðlagil Canyon floor by the turquoise river. Continue across highland tundra to Möðrudalur, Iceland's highest farmstead.",
    notes: "Dettifoss dropped from route to optimize driving speed and prevent van fatigue.",
    completed: false,
    stops: [
      {
        name: "Stuðlagil Canyon (East Side)",
        desc: "Hike directly onto the basalt column canyon floor next to the glacier river.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/32_studlagil_canyon.jpg"
      },
      {
        name: "Möðrudalur - Fjalladýrð",
        desc: "Remote highland wilderness farmstead camp with turf houses.",
        image: "iceland_trip_photos/extra_photos/modrudalur_fjalladyrd.jpg"
      }
    ]
  },
  {
    id: 9,
    dayNum: 9,
    date: "August 1, 2026",
    title: "Mývatn Volcanics & Northern Soaks",
    phase: "Phase 4: East Fjords to the Volcanic North",
    category: "north",
    drivingTime: "~1.5 hours (~110 km)",
    walkDistance: "~5.5 km",
    route: "Möðrudalur ➔ Hverir ➔ Grjótagjá ➔ Dimmuborgir ➔ Mývatn Earth Lagoon ➔ Daddi's Pizza ➔ Húsavík",
    campsite: "Húsavík Campsite / Vogar Campsite (Camping Card)",
    poolShower: "Mývatn Earth Lagoon Soak or Húsavíkurlaug (Town geothermal pool & hot tubs)",
    summary: "Explore steaming sulfur mud vents at Hverir, step inside thermal Grjótagjá Cave, navigate Dimmuborgir lava maze, soak at Mývatn Earth Lagoon, have vegetarian pizza at Daddi's Pizza, and camp in Húsavík.",
    notes: "Grjótagjá water is too hot for swimming; enjoy the cave view.",
    completed: false,
    stops: [
      {
        name: "Hverir Geothermal Area",
        desc: "Smoking sulfur vents and boiling gray mud pots.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/34_hverir.jpg"
      },
      {
        name: "Grjótagjá Cave",
        desc: "Intimate volcanic cave filled with thermal blue water.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/35_grjotagja_cave.jpg"
      },
      {
        name: "Dimmuborgir Lava Maze",
        desc: "Jagged, twisted volcanic rock fortresses.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/36_dimmuborgir_lava_maze.jpg"
      },
      {
        name: "Earth Lagoon Mývatn",
        desc: "Therapeutic northern mineral silica soak.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/37_earth_lagoon_myvatn.jpg"
      },
      {
        name: "Daddi’s Pizza",
        desc: "Popular restaurant for vegetarian pizza night.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/38_daddis_pizza.jpg"
      },
      {
        name: "Húsavík Harbor",
        desc: "Whale-watching capital of Iceland.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/39_husavik_harbor.webp"
      }
    ]
  },
  {
    id: 10,
    dayNum: 10,
    date: "August 2, 2026",
    title: "Electric Whale Watching & Forest Base",
    phase: "Phase 4: East Fjords to the Volcanic North",
    category: "north",
    drivingTime: "~3.5 hours (~240 km)",
    walkDistance: "~3.5 km",
    route: "Húsavík ➔ Goðafoss ➔ Akureyri ➔ Skagaströnd / Hamrar",
    campsite: "Skagaströnd Campsite / Camping Hamrar (Camping Card)",
    poolShower: "Sundlaug Akureyrar (Iconic geothermal water park, slides & hot tubs) or Skagastrandarlaug",
    summary: "09:00 carbon-neutral electric boat tour with North Sailing out of Húsavík to watch humpbacks. Visit historical Goðafoss waterfall. Pass Akureyri to stay at Camping Hamrar or coastal Skagaströnd.",
    notes: "Hvítserkur basalt stack skipped to conserve driving energy.",
    completed: false,
    stops: [
      {
        name: "North Sailing Electric Boat",
        desc: "Carbon-neutral silent electric boat tour for humpback whales.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/40_north_sailing.jpg"
      },
      {
        name: "Goðafoss Waterfall",
        desc: "Wide, historical 'Waterfall of the Gods'.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/41_godafoss_waterfall.jpg"
      },
      {
        name: "Camping Hamrar (Akureyri)",
        desc: "Premium forest campsite outside Akureyri with playgrounds.",
        image: "iceland_trip_photos/phase_4_east_fjords_to_the_volcanic_north/42_camping_hamrar.jpg"
      },
      {
        name: "Skagaströnd Campsite",
        desc: "Quiet coastal campsite in the northwest.",
        image: "iceland_trip_photos/extra_photos/skagastrond_campsite.jpg"
      }
    ]
  },
  {
    id: 11,
    dayNum: 11,
    date: "August 3, 2026",
    title: "The Fjords Highway to Ísafjörður",
    phase: "Phase 5: The Remote Westfjords Detour",
    category: "westfjords",
    drivingTime: "~4.5 hours (~350 km)",
    walkDistance: "~2.5 km",
    route: "Skagaströnd ➔ Route 61 ➔ Seal Lookouts ➔ Ísafjörður",
    campsite: "Tungudalur Campsite (Ísafjörður) (Camping Card)",
    poolShower: "Sundhöll Ísafjarðar (Ísafjörður pool) or Reykjanes Geothermal Pool (Fjord warm pool along Route 61)",
    summary: "Depart Ring Road for the spectacular Westfjords loop. Drive paved Route 61 (Djúpvegur) winding around deep fjords. Stop at laybys near Hvítanes to watch wild harbor seals on rocks.",
    notes: "Route 61 is 100% paved and safe. Fill diesel before entering Westfjords.",
    completed: false,
    stops: [
      {
        name: "Route 61 (Djúpvegur)",
        desc: "Fully paved, highly scenic deep fjord highway.",
        image: "iceland_trip_photos/phase_5_the_remote_westfjords_detour/43_route_61_djupvegur.jpg"
      },
      {
        name: "Roadside Seal Lookouts (Hvítanes)",
        desc: "Marked laybys along the fjords to watch wild harbor seals.",
        image: "iceland_trip_photos/phase_5_the_remote_westfjords_detour/44_roadside_seal_lookouts.jpg"
      },
      {
        name: "Ísafjörður Town & Tungudalur Campsite",
        desc: "Historic capital town of the Westfjords with a waterfall right at camp.",
        image: "iceland_trip_photos/phase_5_the_remote_westfjords_detour/45_isafjordur_town_and_campsite.jpg"
      }
    ]
  },
  {
    id: 12,
    dayNum: 12,
    date: "August 4, 2026",
    title: "The Bridal Veil of the Westfjords",
    phase: "Phase 5: The Remote Westfjords Detour",
    category: "westfjords",
    drivingTime: "~2.5 hours (~160 km)",
    walkDistance: "~3.5 km",
    route: "Ísafjörður ➔ Dynjandisheiði ➔ Dynjandi ➔ Tálknafjörður",
    campsite: "Tálknafjörður / Flókalundur Campsite (Camping Card)",
    poolShower: "Pollurinn Geothermal Hot Tubs (Fjordview hot tubs in Tálknafjörður) or Sundlaugin Tálknafirði",
    summary: "Buy fresh sourdough at Nettó Ísafjörður. Drive carefully over Dynjandisheiði pass. Marvel at Dynjandi, a massive 100m tiered bridal veil waterfall. Overnight at coastal Tálknafjörður.",
    notes: "⚠️ Active construction on Route 60 Dynjandisheiði mountain pass.",
    completed: false,
    stops: [
      {
        name: "Dynjandi Waterfall",
        desc: "Tiered 100-meter-wide bridal veil masterpiece of the northwest.",
        image: "iceland_trip_photos/phase_5_the_remote_westfjords_detour/46_dynjandi_waterfall.jpg"
      },
      {
        name: "Flókalundur / Tálknafjörður Campsite",
        desc: "Southern Westfjords coastal camp with thermal hot tubs.",
        image: "iceland_trip_photos/phase_5_the_remote_westfjords_detour/47_flokalundur_or_talknafjordur_campsites.jpg"
      }
    ]
  },
  {
    id: 13,
    dayNum: 13,
    date: "August 5, 2026",
    title: "Ferry Baldur Crossing to Fjord Base",
    phase: "Phase 5: The Remote Westfjords Detour",
    category: "westfjords",
    drivingTime: "~2.5 hours camper (~120 km) + 2.5 hr Ferry",
    walkDistance: "~2 km",
    route: "Tálknafjörður ➔ Brjánslækur ➔ Ferry Baldur ➔ Stykkishólmur ➔ Hvalfjörður",
    campsite: "Tjaldsvæði að Hlöðum (Hvalfjörður) (Camping Card)",
    poolShower: "Stykkishólmslaug (Geothermal pool with carbonated mineral hot tubs at Stykkishólmur harbor) or Hlaðir Pool",
    summary: "Board Ferry Baldur at 12:00 from Brjánslækur to Stykkishólmur (2.5 hr scenic cruise). Drive inland past Snæfellsnes directly to quiet greenhouse campsite at Hvalfjörður.",
    notes: "Snæfellsnes loop dropped to minimize long driving hours.",
    completed: false,
    stops: [
      {
        name: "Ferry Baldur Crossing",
        desc: "Relaxing 2.5-hour bay crossing across Breiðafjörður.",
        image: "iceland_trip_photos/extra_photos/ferry_baldur.jpg"
      },
      {
        name: "Tjaldsvæði að Hlöðum (Hvalfjörður)",
        desc: "Peaceful greenhouse-lined campsite in Hvalfjörður.",
        image: "iceland_trip_photos/extra_photos/tjaldsvaedi_ad_hlodum.jpg"
      }
    ]
  },
  {
    id: 14,
    dayNum: 14,
    date: "August 6, 2026",
    title: "The Silver Circle & Lava Falls",
    phase: "Phase 6: Capital Celebrations & Departure",
    category: "south",
    drivingTime: "~2 hours (~150 km)",
    walkDistance: "~3 km",
    route: "Hvalfjörður ➔ Hraunfossar ➔ Deildartunguhver ➔ Hvalfjörður",
    campsite: "Tjaldsvæði að Hlöðum (Night 2 - Camping Card)",
    poolShower: "Hlaðir Geothermal Pool (Located directly at Tjaldsvæði að Hlöðum campsite) or Krauma Geothermal Baths",
    summary: "Unwind with a scenic loop of the Silver Circle. See Hraunfossar (waterfalls springing out of lava rock) & Barnafoss. Visit Deildartunguhver, Europe's most powerful boiling hot spring.",
    notes: "No need to re-pack van tonight; staying 2nd night at Hvalfjörður base.",
    completed: false,
    stops: [
      {
        name: "Hraunfossar & Barnafoss",
        desc: "Series of springs flowing directly out of the Hallmundarhraun lava field.",
        image: "iceland_trip_photos/extra_photos/hraunfossar_waterfall.jpg"
      },
      {
        name: "Deildartunguhver",
        desc: "Europe's most powerful roaring hot spring producing 180 liters/sec boiling water.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/48_deildartunguhver.jpg"
      },
      {
        name: "Mosskogar Greenhouse Oasis",
        desc: "Quiet campsite greenhouse garden area near capital limits.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/49_mosskogar_camping.jpg"
      }
    ]
  },
  {
    id: 15,
    dayNum: 15,
    date: "August 7, 2026",
    title: "Capital Exploration & Departure Prep",
    phase: "Phase 6: Capital Celebrations & Departure",
    category: "capital",
    drivingTime: "~1.5 hours (~110 km)",
    walkDistance: "~4.5 km",
    route: "Hvalfjörður ➔ Hveragerði ➔ Reykjavík ➔ Sandgerði",
    campsite: "Sandgerði Campsite (Camping Card)",
    poolShower: "Laugardalslaug (Reykjavík's flagship geothermal pool complex with 50m pool, thermal tubs & slides)",
    summary: "Morning surprise activity in Hveragerði at 09:30. Spend afternoon in downtown Reykjavík: eat Vegan Pylsa hot dogs, ride FlyOver Iceland 5D flight, play at Laugardalslaug pool & slides. Van prep & clean.",
    notes: "Fuel diesel top-up at Orkan/Olís before returning van.",
    completed: false,
    stops: [
      {
        name: "Morning Surprise Activity (Hveragerði)",
        desc: "Special surprise planned for the morning.",
        image: ""
      },
      {
        name: "Downtown Reykjavík",
        desc: "Gló veggie bowls or Vegan Pylsa soy hot dogs.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/51_downtown_reykjavik.jpg"
      },
      {
        name: "FlyOver Iceland",
        desc: "Immersive multi-sensory flight simulator ride in Grandi harbor.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/52_flyover_iceland.jpg"
      },
      {
        name: "Laugardalslaug Leisure Pool",
        desc: "Premium city pool complex with thermal hot tubs and giant water slides.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/53_laugardalslaug_leisure_pool.png"
      },
      {
        name: "Orkan / Olís Station",
        desc: "Final diesel fuel stop.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/54_orkan_olis_station.jpg"
      },
      {
        name: "Sandgerði Campsite",
        desc: "Final overnight camp located just 10 minutes away from terminal.",
        image: "iceland_trip_photos/phase_6_capital_celebrations_and_departure/55_sandgerdi_campsite.jpg"
      }
    ]
  },
  {
    id: 16,
    dayNum: 16,
    date: "August 8, 2026",
    title: "Dawn Drop-Off & Departure",
    phase: "Phase 6: Capital Celebrations & Departure",
    category: "capital",
    drivingTime: "~1.2 hours (~65 km)",
    walkDistance: "~1 km",
    route: "Sandgerði ➔ Kópavogur (Cozy HQ) ➔ KEF Airport",
    campsite: "Home Flight (FI1500 to AMS)",
    poolShower: "Sandgerðislaug (Morning refresh option before KEF airport departure)",
    summary: "Drive to Cozy Campers HQ in Kópavogur at 04:30. Lock keys inside after-hours keybox at 05:00. Take pre-booked Hreyfill taxi to KEF airport for 07:40 flight FI1500 to Amsterdam.",
    notes: "Flight FI1500 departs at 07:40 AM. Be at KEF by 05:30 AM.",
    completed: false,
    stops: [
      {
        name: "Cozy Campers HQ Keybox",
        desc: "05:00 keybox drop-off at Kársnesbraut 106.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/02_cozy_campers_hq_kopavogur.jpg"
      },
      {
        name: "KEF Departure Gate",
        desc: "07:40 Flight FI1500 to Amsterdam.",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/01_keflavik_international_airport.jpg"
      }
    ]
  }
];

const DEFAULT_PACKING = [
  // 🇳🇱 BRING FROM AMSTERDAM - Clothing & Footwear
  { id: "ams-clothing-1", name: "Waterproof & windproof hardshell jacket with hood (GORE-TEX)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-2", name: "Waterproof rain pants (essential for waterfall spray & heavy rain)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-3", name: "Fleece or down insulator mid-layer jacket", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-4", name: "Thermal base layer tops & bottoms (Merino wool / synthetic)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-5", name: "Quick-dry trekking pants & fleece-lined leggings", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-6", name: "Merino wool hiking socks (4-5 pairs) & daily socks", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-7", name: "Thermal wool beanie, headband & neck gaiter / Buff (against arctic wind)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-8", name: "Windproof gloves / mittens & waterproof overgloves", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-clothing-9", name: "Swimwear (2 sets for natural hot springs & pools)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-footwear-1", name: "Waterproof, broken-in trail hiking boots (ankle support)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-footwear-2", name: "Slip-on campsite shoes / Crocs / sandals (for van & communal pool showers)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-footwear-3", name: "Water shoes / neoprene booties (for hot spring river beds & rocky soaks)", cat: "ams", group: "Clothing & Footwear", checked: false },
  { id: "ams-footwear-4", name: "Collapsible trekking poles & microspikes / crampons", cat: "ams", group: "Clothing & Footwear", checked: false },

  // 🇳🇱 BRING FROM AMSTERDAM - Hygiene, Toiletries & Personal Care
  { id: "ams-hygiene-1", name: "Toothbrushes & biodegradable toothpaste", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-2", name: "Microfiber quick-dry bath towels & hand towels (2 per person)", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-3", name: "Toilet paper rolls (2-3 stored in Ziploc bags for emergency stops)", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-4", name: "Biodegradable body wash & travel shampoo / soap bar", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-5", name: "Wet wipes & eco-friendly flushable wet tissues", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-6", name: "High-SPF 50 broad spectrum sunscreen & SPF 30 lip balm (windburn protection)", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-7", name: "Moisturizing skin cream / Nivea tin (dry arctic wind remedy)", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-8", name: "Hand sanitizer gel bottles (pocket size + van size)", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-9", name: "Compact hairbrush / comb, hair ties & nail clippers / tweezers", cat: "ams", group: "Hygiene & Toiletries", checked: false },
  { id: "ams-hygiene-10", name: "Feminine hygiene supplies & Ziploc disposal bags", cat: "ams", group: "Hygiene & Toiletries", checked: false },

  // 🇳🇱 BRING FROM AMSTERDAM - Campervan Living, Tech & Electronics
  { id: "ams-tech-1", name: "Premium contoured sleep eye masks (CRITICAL for 24-hour Midnight Sun!)", cat: "ams", group: "Camper Living & Tech", checked: false },
  { id: "ams-tech-2", name: "Noise-blocking earplugs (for windy campsite nights & van rain noise)", cat: "ams", group: "Camper Living & Tech", checked: false },
  { id: "ams-tech-3", name: "Soft duffel bags & color-coded packing cubes (NO hard suitcases!)", cat: "ams", group: "Camper Living & Tech", checked: false },
  { id: "ams-tech-4", name: "12V circular car adapter & 2m long USB charging cords (reaches bed & seats)", cat: "ams", group: "Camper Living & Tech", checked: false },
  { id: "ams-tech-5", name: "Multi-port fast wall charger block & Euro plug adapters (Type C/F 230V)", cat: "ams", group: "Camper Living & Tech", checked: false },
  { id: "ams-tech-6", name: "Portable power bank (20,000mAh+) for long hikes", cat: "ams", group: "Camper Living & Tech", checked: false },
  { id: "ams-tech-7", name: "Headlamp with red light mode & compact hanging LED lantern", cat: "ams", group: "Camper Living & Tech", checked: false },
  { id: "ams-tech-8", name: "Waterproof phone pouch with neck lanyard (for Blue Lagoon & pool soaks)", cat: "ams", group: "Camper Living & Tech", checked: false },

  // 🇳🇱 BRING FROM AMSTERDAM - First Aid & Medical
  { id: "ams-medical-1", name: "First aid kit (bandages, antiseptic wipes, sterile gauze, medical tape)", cat: "ams", group: "First Aid & Health", checked: false },
  { id: "ams-medical-2", name: "Blister plasters / Compeed pads & Moleskin (essential for canyon hikes)", cat: "ams", group: "First Aid & Health", checked: false },
  { id: "ams-medical-3", name: "Motion sickness tablets / Sea-Bands (for Ferry Baldur & whale boat)", cat: "ams", group: "First Aid & Health", checked: false },
  { id: "ams-medical-4", name: "Pain relievers (Ibuprofen / Paracetamol)", cat: "ams", group: "First Aid & Health", checked: false },
  { id: "ams-medical-5", name: "Personal prescription medications & antihistamines / allergy tablets", cat: "ams", group: "First Aid & Health", checked: false },
  { id: "ams-medical-6", name: "Electrolyte hydration powder packets / tablets", cat: "ams", group: "First Aid & Health", checked: false },

  // 🛒 BUY DAY 1 (KÓPAVOGUR) - Groceries & Kitchen Supplies
  { id: "d1-water", name: "5L mineral water jugs (reusable refills for van tank)", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-vegan", name: "Vegetarian protein staples (Oumph!, tofu, canned chickpeas, beans, lentils)", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-staples", name: "Staple grains (oats, pasta, rice, quinoa) & wraps from budget Bónus", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-soap", name: "Biodegradable dish soap & soft non-scratch sponge", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-ziploc", name: "Ziploc bags (various sizes) & heavy-duty trash bags", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-containers", name: "Aluminum foil & reusable plastic food container boxes / Tupperware", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-drinks", name: "Coffee / tea bags, plant milks (oat/soy), condiments (salt, pepper, olive oil)", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-produce", name: "Fruit & produce haul (apples, bananas, carrots, cucumbers, bell peppers)", cat: "d1", group: "Groceries & Kitchen", checked: false },
  { id: "d1-snacks", name: "Road trip snacks (nuts, trail mix, dried fruit, dark chocolate bars)", cat: "d1", group: "Groceries & Kitchen", checked: false },

  // 🛣️ BUY ALONG THE WAY - Road Trip Supplies & Maintenance
  { id: "rd-diesel", name: "Diesel fuel top-ups (frequent checks in Westfjords & Highlands)", cat: "rd", group: "Road Supplies", checked: false },
  { id: "rd-gas", name: "Camping gas canisters (EN 417 screw-on threads for van stove)", cat: "rd", group: "Road Supplies", checked: false },
  { id: "rd-bread", name: "Fresh local sourdough bakery loaves & pastries", cat: "rd", group: "Road Supplies", checked: false },
  { id: "rd-midgenets", name: "Bug head-nets (essential protection against Mývatn midges!)", cat: "rd", group: "Road Supplies", checked: false },
  { id: "rd-washer", name: "Windshield washer mud-clearing fluid", cat: "rd", group: "Road Supplies", checked: false },
  { id: "rd-wipes", name: "Microfiber glass cleaning cloth & dashboard interior wipes", cat: "rd", group: "Road Supplies", checked: false }
];

// App State
let itineraryData = [];
let packingData = [];
let journalNotes = {};
let currentFilter = 'all';
let currentSearch = '';
let activeTab = 'itinerary';
let editingDayId = null;
let viewDayId = null;
let leafletMap = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
  renderApp();
  setupEventListeners();
  updateCalculators();
  registerServiceWorker();
});

// Load from LocalStorage
function loadStoredData() {
  const storedItinerary = localStorage.getItem(STORAGE_KEY);
  if (storedItinerary) {
    try {
      itineraryData = JSON.parse(storedItinerary);
      const day15 = itineraryData.find(d => d.id === 15);
      if (day15 && (day15.title.toLowerCase().includes('birthday') || day15.summary.toLowerCase().includes('zipline') || (day15.stops && day15.stops.some(s => s.name.toLowerCase().includes('zipline'))))) {
        const defaultDay15 = DEFAULT_ITINERARY.find(d => d.id === 15);
        if (defaultDay15) {
          Object.assign(day15, JSON.parse(JSON.stringify(defaultDay15)));
        }
      }
      // Migration / Sanitization for categories & stop names
      if (itineraryData && Array.isArray(itineraryData)) {
        itineraryData.forEach(d => {
          if (d.category === 'gems') d.category = 'highlights';
          if (d.category === 'standard') {
            if (d.dayNum === 1 || d.dayNum === 5 || d.dayNum === 7 || d.dayNum === 14) d.category = 'south';
            else if (d.dayNum === 9 || d.dayNum === 10) d.category = 'north';
            else if (d.dayNum === 15 || d.dayNum === 16) d.category = 'capital';
          }
          if (d.stops && Array.isArray(d.stops)) {
            d.stops.forEach(s => {
              if (s.name) s.name = s.name.replace(/\s*\(NEW GEM\)/gi, '');
            });
          }
          const defDay = DEFAULT_ITINERARY.find(def => def.id === d.id);
          if (defDay) {
            if (!d.poolShower || d.poolShower.trim() === '') {
              d.poolShower = defDay.poolShower;
            }
            if (!d.walkDistance || d.walkDistance.trim() === '') {
              d.walkDistance = defDay.walkDistance;
            }
          }
        });
      }
    } catch (e) {
      itineraryData = JSON.parse(JSON.stringify(DEFAULT_ITINERARY));
    }
  } else {
    itineraryData = JSON.parse(JSON.stringify(DEFAULT_ITINERARY));
  }

  const storedPacking = localStorage.getItem(PACKING_KEY);
  if (storedPacking) {
    try {
      packingData = JSON.parse(storedPacking);
      DEFAULT_PACKING.forEach(defItem => {
        if (!packingData.some(item => item.id === defItem.id)) {
          packingData.push(JSON.parse(JSON.stringify(defItem)));
        }
      });
    } catch (e) {
      packingData = JSON.parse(JSON.stringify(DEFAULT_PACKING));
    }
  } else {
    packingData = JSON.parse(JSON.stringify(DEFAULT_PACKING));
  }

  const storedJournal = localStorage.getItem('EXPEDITION_JOURNAL_NOTES');
  if (storedJournal) {
    try {
      journalNotes = JSON.parse(storedJournal);
    } catch (e) {
      journalNotes = {};
    }
  }
}

// Save to LocalStorage
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itineraryData));
  localStorage.setItem(PACKING_KEY, JSON.stringify(packingData));
  localStorage.setItem('EXPEDITION_JOURNAL_NOTES', JSON.stringify(journalNotes));
}

// Service Worker for Android Offline PWA
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      console.log('Iceland Expedition Service Worker Registered.');
      reg.update();
    }).catch(err => {
      console.log('Service Worker registration skipped:', err);
    });
  }
}

// Global Render Engine
function renderApp() {
  renderItineraryGrid();
  renderPackingLists();
  renderJournalList();
  updateStatsHeader();
}

// Update Stats in Header
function updateStatsHeader() {
  const completedCount = itineraryData.filter(d => d.completed).length;
  const totalDays = itineraryData.length;
  const totalStops = itineraryData.reduce((acc, d) => acc + (d.stops ? d.stops.length : 0), 0);

  document.getElementById('stat-completed-days').innerText = `${completedCount} / ${totalDays}`;
  document.getElementById('stat-total-stops').innerText = `${totalStops} Sights`;
}

// Feature / Terrain Filter Helper
function matchesFeatureFilter(day, filterKey) {
  const allText = (day.title + " " + day.summary + " " + day.notes + " " + day.route + " " + (day.stops ? day.stops.map(s => s.name + " " + s.desc).join(" ") : "")).toLowerCase();
  
  if (filterKey === 'waterfall') {
    return allText.includes('waterfall') || allText.includes('foss') || allText.includes('falls');
  }
  if (filterKey === 'canyon') {
    return allText.includes('canyon') || allText.includes('gjáin') || allText.includes('gljúfur');
  }
  if (filterKey === 'geothermal') {
    return allText.includes('geothermal') || allText.includes('bath') || allText.includes('soak') || allText.includes('lagoon') || allText.includes('hot spring') || allText.includes('tub') || allText.includes('pool');
  }
  if (filterKey === 'volcanic') {
    return allText.includes('volcanic') || allText.includes('lava') || allText.includes('geyser') || allText.includes('mud') || allText.includes('crater') || allText.includes('sulfur');
  }
  if (filterKey === 'beach_glacier') {
    return allText.includes('beach') || allText.includes('glacier') || allText.includes('ice') || allText.includes('sand') || allText.includes('berg');
  }
  if (filterKey === 'wildlife') {
    return allText.includes('whale') || allText.includes('puffin') || allText.includes('seal') || allText.includes('bird') || allText.includes('wildlife');
  }
  return false;
}

// Render Itinerary Grid
function renderItineraryGrid() {
  const container = document.getElementById('itinerary-grid');
  if (!container) return;

  const filtered = itineraryData.filter(day => {
    // Filter matching (Region vs Feature)
    if (currentFilter !== 'all') {
      const regionFilters = ['highlights', 'south', 'highlands', 'north', 'westfjords', 'capital'];
      if (regionFilters.includes(currentFilter)) {
        if (day.category !== currentFilter) return false;
      } else {
        if (!matchesFeatureFilter(day, currentFilter)) return false;
      }
    }

    // Search filter
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      const matchTitle = day.title.toLowerCase().includes(q);
      const matchPhase = day.phase.toLowerCase().includes(q);
      const matchRoute = day.route.toLowerCase().includes(q);
      const matchStops = day.stops && day.stops.some(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
      return matchTitle || matchPhase || matchRoute || matchStops;
    }

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--glass-border);">
        <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 0.5rem;">No matching days found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try clearing your search term or switching filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(day => {
    const mainImg = (day.stops && day.stops.length > 0 && day.stops.find(s => s.image && s.image.trim() !== '')?.image) ? day.stops.find(s => s.image && s.image.trim() !== '').image : 'iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg';
    
    let catBadge = '';
    if (day.category === 'highlights') catBadge = '<span class="badge badge-amber">⭐ TOP HIGHLIGHT</span>';
    else if (day.category === 'highlands') catBadge = '<span class="badge badge-ice">🏔️ HIGHLANDS</span>';
    else if (day.category === 'westfjords') catBadge = '<span class="badge badge-aurora">🌊 WESTFJORDS</span>';
    else if (day.category === 'north') catBadge = '<span class="badge badge-ice">🌋 NORTH ICELAND</span>';
    else if (day.category === 'south') catBadge = '<span class="badge badge-aurora">📍 SOUTH & EAST</span>';
    else if (day.category === 'capital') catBadge = '<span class="badge badge-amber">🏙️ CAPITAL REGION</span>';

    const stopsHtml = day.stops ? day.stops.slice(0, 5).map(stop => (stop.image && stop.image.trim() !== '') ? `
      <div class="stop-thumb-item" title="${escapeHtml(stop.name)}" onclick="event.stopPropagation(); openPhotoModal('${escapeHtml(stop.name)}', '${escapeHtml(stop.image)}')">
        <img src="${stop.image}" alt="${escapeHtml(stop.name)}" class="stop-thumb-img" onerror="this.src='iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg'">
      </div>
    ` : `
      <div class="stop-thumb-item" title="${escapeHtml(stop.name)}" style="background: rgba(30, 41, 59, 0.8); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; border: 1px dashed var(--glass-border);">
        ✨
      </div>
    `).join('') : '';

    return `
      <div class="day-card ${day.completed ? 'completed' : ''}" id="day-card-${day.id}" onclick="openDayViewModal(${day.id})" style="cursor: pointer;">
        <div class="day-card-header">
          <img src="${mainImg}" alt="${escapeHtml(day.title)}" class="day-card-img" onerror="this.src='iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg'">
          <div class="day-card-overlay">
            <div class="day-top-badges">
              <span class="day-num-badge">DAY ${day.dayNum}</span>
              ${catBadge}
            </div>
            <div class="day-meta-info">
              <div class="day-date">${day.date}</div>
              <h3 class="day-title">${escapeHtml(day.title)}</h3>
            </div>
          </div>
        </div>

        <div class="day-card-body">
          <div class="day-route-bar">
            <span>🚗</span>
            <span class="day-route-text" title="${escapeHtml(day.route)}">${escapeHtml(day.route)}</span>
          </div>

          <p class="day-summary-text">${escapeHtml(day.summary)}</p>

          ${day.stops && day.stops.length > 0 ? `
            <div>
              <div class="stops-preview-title">${day.stops.length} STOPS & HIGHLIGHTS</div>
              <div class="stops-thumbnails">${stopsHtml}</div>
            </div>
          ` : ''}

          <div class="campsite-info-box">
            <div style="width: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 0.25rem;">
                <span style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">Overnight Camp</span>
                <div style="display: flex; gap: 0.5rem; font-size: 0.73rem; font-weight: 600;">
                  <span style="color: var(--ice-600);" title="Driving distance">🚗 ${escapeHtml(day.drivingTime)}</span>
                  <span style="color: #2563eb;" title="Walking/Hiking distance">🥾 ${escapeHtml(day.walkDistance || '~2-4 km')}</span>
                </div>
              </div>
              <div class="campsite-name">⛺ ${escapeHtml(day.campsite)}</div>
              ${day.poolShower ? `
                <div style="margin-top: 0.45rem; padding-top: 0.45rem; border-top: 1px dashed rgba(203, 213, 225, 0.7); font-size: 0.78rem; color: #059669; font-weight: 600; display: flex; align-items: flex-start; gap: 0.35rem; line-height: 1.35;">
                  <span>🏊</span>
                  <span><strong>Alt Pool Shower (Optional):</strong> ${escapeHtml(day.poolShower)}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="card-actions-row" onclick="event.stopPropagation();">
            <button class="btn-secondary" onclick="openDayViewModal(${day.id})">
              <span>👁️ View Details</span>
            </button>
            <button class="btn-secondary" style="padding: 0.5rem 0.75rem;" onclick="openDayModal(${day.id})" title="Edit Day">
              <span>✏️ Edit</span>
            </button>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; font-size: 0.8rem; color: var(--text-muted); margin-left: auto;">
              <input type="checkbox" ${day.completed ? 'checked' : ''} onchange="toggleDayComplete(${day.id})" class="checkbox-custom">
              <span>${day.completed ? 'Done' : 'Mark'}</span>
            </label>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Toggle Day Completion
function toggleDayComplete(id) {
  const day = itineraryData.find(d => d.id === id);
  if (day) {
    day.completed = !day.completed;
    saveData();
    renderApp();
  }
}

// Open Day View Modal (Read-Only Interactive Viewer)
function openDayViewModal(id) {
  viewDayId = id;
  const day = itineraryData.find(d => d.id === id);
  if (!day) return;

  document.getElementById('view-modal-day-num').innerText = `DAY ${day.dayNum}`;
  document.getElementById('view-modal-title').innerText = day.title;
  document.getElementById('view-modal-date').innerText = day.date;
  document.getElementById('view-modal-phase').innerText = day.phase;
  document.getElementById('view-modal-driving').innerText = day.drivingTime;
  const walkEl = document.getElementById('view-modal-walking');
  if (walkEl) walkEl.innerText = day.walkDistance || 'Moderate walking (~2-4 km)';
  document.getElementById('view-modal-route').innerText = day.route;
  document.getElementById('view-modal-campsite').innerText = day.campsite;
  const poolEl = document.getElementById('view-modal-pool');
  if (poolEl) poolEl.innerText = day.poolShower || 'Campsite showers available';
  document.getElementById('view-modal-summary').innerText = day.summary;
  
  const notesContainer = document.getElementById('view-modal-notes-box');
  if (day.notes && day.notes.trim() !== '') {
    notesContainer.style.display = 'block';
    document.getElementById('view-modal-notes').innerText = day.notes;
  } else {
    notesContainer.style.display = 'none';
  }

  // Render Stops & Location Journaling
  const stopsContainer = document.getElementById('view-modal-stops-list');
  if (day.stops && day.stops.length > 0) {
    stopsContainer.innerHTML = day.stops.map(stop => {
      const savedNote = journalNotes[stop.name] || '';
      return `
        <div style="background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--glass-border); overflow: hidden; margin-bottom: 1.25rem; box-shadow: var(--glass-shadow);">
          <div style="position: relative; ${stop.image ? 'height: 180px;' : 'padding: 1.25rem 1rem 0.5rem 1rem;'} overflow: hidden; background: #0f172a;">
            ${stop.image ? `
              <img src="${stop.image}" alt="${escapeHtml(stop.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg'">
              <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(15, 23, 42, 0.9)); padding: 0.75rem 1rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: #fff;">${escapeHtml(stop.name)}</h4>
              </div>
            ` : `
              <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--ice-500); font-style: italic;">✨ ${escapeHtml(stop.name)}</h4>
            `}
          </div>

          <div style="padding: 1rem;">
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">${escapeHtml(stop.desc)}</p>

            <!-- Location Journal Note Input -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.85rem; border-radius: var(--radius-md); margin-top: 0.75rem; width: 100%; box-sizing: border-box;">
              <label style="font-size: 0.8rem; font-weight: 700; color: var(--ice-600); display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.5rem;">
                <span>📝 Personal Location Journal & Notes (Auto-Saved)</span>
              </label>
              <textarea class="form-textarea" style="width: 100% !important; box-sizing: border-box !important; display: block !important; min-height: 100px; font-size: 0.9rem; line-height: 1.5; padding: 0.75rem;" placeholder="Record memories, photos taken, weather, or tips for ${escapeHtml(stop.name)}..." onchange="saveJournalNote('${escapeHtml(stop.name)}', this.value)" oninput="saveJournalNote('${escapeHtml(stop.name)}', this.value)">${escapeHtml(savedNote)}</textarea>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } else {
    stopsContainer.innerHTML = '<p class="text-muted">No specific sights listed for this day.</p>';
  }

  document.getElementById('day-view-modal').classList.add('active');
}

function switchToEditFromView() {
  closeModal('day-view-modal');
  if (viewDayId) {
    openDayModal(viewDayId);
  }
}

// Journal Entry Saver
function saveJournalNote(stopName, text) {
  journalNotes[stopName] = text;
  saveData();
  renderJournalList();
}

function renderJournalList() {
  const container = document.getElementById('journal-entries-container');
  if (!container) return;

  const entries = Object.entries(journalNotes).filter(([_, text]) => text && text.trim() !== '');

  if (entries.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--glass-border); box-shadow: var(--glass-shadow);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📓</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">No Journal Entries Yet</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 500px; margin: 0 auto;">Open any Day or Map Marker popup to add notes, memories, and observations for that location!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = entries.map(([stopName, text]) => `
    <div style="background: #ffffff; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--glass-border); margin-bottom: 1rem; box-shadow: var(--glass-shadow);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <div style="font-weight: 700; color: var(--ice-600); font-size: 1rem; font-family: var(--font-heading);">📍 ${escapeHtml(stopName)}</div>
        <button onclick="deleteJournalNote('${escapeHtml(stopName)}')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.8rem;" title="Delete Note">🗑️ Delete</button>
      </div>
      <div style="font-size: 0.9rem; color: var(--text-main); white-space: pre-wrap; line-height: 1.6; background: #f8fafc; padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid #e2e8f0;">${escapeHtml(text)}</div>
    </div>
  `).join('');
}

function deleteJournalNote(stopName) {
  if (confirm(`Delete journal note for "${stopName}"?`)) {
    delete journalNotes[stopName];
    saveData();
    renderJournalList();
  }
}

// Render Leaflet Map
function initOrUpdateMap() {
  if (typeof L === 'undefined') return;

  if (!leafletMap) {
    const mapElement = document.getElementById('expedition-map');
    if (!mapElement) return;

    leafletMap = L.map('expedition-map').setView([64.9631, -19.0208], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap);

    const latLngs = [];

    ICELAND_MAP_LOCATIONS.forEach(loc => {
      latLngs.push([loc.lat, loc.lng]);

      const marker = L.marker([loc.lat, loc.lng]).addTo(leafletMap);
      
      const popupContent = `
        <div style="font-family: sans-serif; min-width: 210px; color: #0f172a; padding: 2px;">
          <div style="font-size: 0.7rem; font-weight: 700; color: #0284c7; margin-bottom: 2px;">DAY ${loc.day} • PHASE ${loc.phase}</div>
          <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.35rem; color: #0f172a;">${escapeHtml(loc.name)}</div>
          <div style="font-size: 0.8rem; color: #475569; margin-bottom: 0.65rem; line-height: 1.3;">${escapeHtml(loc.desc)}</div>
          <div style="display: flex; gap: 0.35rem; flex-direction: column;">
            <button style="background: #0284c7; color: #ffffff; border: none; padding: 0.45rem 0.65rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; width: 100%;" onclick="openDayViewModal(${loc.day})">
              👁️ Day ${loc.day} Details
            </button>
            <a href="https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}" target="_blank" rel="noopener" style="background: #059669; color: #ffffff; border: none; padding: 0.45rem 0.65rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; text-decoration: none; text-align: center; display: block; width: 100%; box-sizing: border-box;">
              📍 Open in Google Maps
            </a>
          </div>
        </div>
      `;
      marker.bindPopup(popupContent);
    });

    // Draw route polyline connecting points
    L.polyline(latLngs, { color: '#38bdf8', weight: 3, opacity: 0.8, dashArray: '5, 10' }).addTo(leafletMap);
  } else {
    setTimeout(() => {
      leafletMap.invalidateSize();
    }, 200);
  }
}

// Download KML Map File
function downloadKMLFile() {
  const kmlContent = generateKMLString();
  const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'iceland_expedition_2026_route.kml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Open Day Editor Modal
function openDayModal(id) {
  closeModal('day-view-modal');
  editingDayId = id;
  const day = itineraryData.find(d => d.id === id);
  if (!day) return;

  document.getElementById('modal-day-num').innerText = `DAY ${day.dayNum}`;
  document.getElementById('edit-day-title').value = day.title;
  document.getElementById('edit-day-date').value = day.date;
  document.getElementById('edit-day-phase').value = day.phase;
  document.getElementById('edit-day-category').value = day.category || 'standard';
  document.getElementById('edit-day-driving').value = day.drivingTime;
  const editWalkEl = document.getElementById('edit-day-walking');
  if (editWalkEl) editWalkEl.value = day.walkDistance || '';
  document.getElementById('edit-day-route').value = day.route;
  document.getElementById('edit-day-campsite').value = day.campsite;
  const editPoolEl = document.getElementById('edit-day-pool');
  if (editPoolEl) editPoolEl.value = day.poolShower || '';
  document.getElementById('edit-day-summary').value = day.summary;
  document.getElementById('edit-day-notes').value = day.notes || '';

  renderModalStopsList(day.stops || []);

  const modal = document.getElementById('day-editor-modal');
  modal.classList.add('active');
}

function renderModalStopsList(stops) {
  const container = document.getElementById('modal-stops-container');
  container.innerHTML = stops.map((stop, index) => `
    <div style="background: rgba(30, 41, 59, 0.6); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--glass-border); margin-bottom: 0.75rem;">
      <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
        <img src="${stop.image}" style="width: 70px; height: 50px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);" onerror="this.src='iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg'">
        <div style="flex-grow: 1;">
          <input type="text" class="form-input" style="padding: 0.4rem 0.6rem; font-size: 0.85rem; margin-bottom: 0.35rem; width: 100%;" value="${escapeHtml(stop.name)}" onchange="updateStopField(${index}, 'name', this.value)">
          <input type="text" class="form-input" style="padding: 0.4rem 0.6rem; font-size: 0.8rem; color: var(--text-muted); width: 100%;" value="${escapeHtml(stop.desc)}" onchange="updateStopField(${index}, 'desc', this.value)">
        </div>
        <button class="btn-outline-danger" onclick="removeStop(${index})">✕</button>
      </div>
    </div>
  `).join('');
}

function updateStopField(index, field, value) {
  const day = itineraryData.find(d => d.id === editingDayId);
  if (day && day.stops && day.stops[index]) {
    day.stops[index][field] = value;
  }
}

function removeStop(index) {
  const day = itineraryData.find(d => d.id === editingDayId);
  if (day && day.stops) {
    day.stops.splice(index, 1);
    renderModalStopsList(day.stops);
  }
}

function addStopToEditingDay() {
  const name = prompt("Enter stop or sight name (e.g., Hidden Hot Spring):");
  if (!name) return;
  const desc = prompt("Enter brief description:") || "";
  const day = itineraryData.find(d => d.id === editingDayId);
  if (day) {
    if (!day.stops) day.stops = [];
    day.stops.push({
      name: name,
      desc: desc,
      image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg"
    });
    renderModalStopsList(day.stops);
  }
}

// Save Modal Changes
function saveDayModalChanges() {
  const day = itineraryData.find(d => d.id === editingDayId);
  if (!day) return;

  day.title = document.getElementById('edit-day-title').value;
  day.date = document.getElementById('edit-day-date').value;
  day.phase = document.getElementById('edit-day-phase').value;
  day.category = document.getElementById('edit-day-category').value;
  day.drivingTime = document.getElementById('edit-day-driving').value;
  const editWalkElSave = document.getElementById('edit-day-walking');
  if (editWalkElSave) day.walkDistance = editWalkElSave.value.trim();
  day.route = document.getElementById('edit-day-route').value;
  day.campsite = document.getElementById('edit-day-campsite').value;
  const editPoolElSave = document.getElementById('edit-day-pool');
  if (editPoolElSave) day.poolShower = editPoolElSave.value.trim();
  day.summary = document.getElementById('edit-day-summary').value;
  day.notes = document.getElementById('edit-day-notes').value;

  saveData();
  closeModal('day-editor-modal');
  renderApp();
}

function closeDayModal() {
  closeModal('day-editor-modal');
}

// Add Brand New Custom Day
function addNewCustomDay() {
  const newId = itineraryData.length > 0 ? Math.max(...itineraryData.map(d => d.id)) + 1 : 1;
  const nextNum = itineraryData.length + 1;

  const newDay = {
    id: newId,
    dayNum: nextNum,
    date: `August ${7 + nextNum}, 2026`,
    title: `Custom Expedition Day ${nextNum}`,
    phase: "Phase 6: Capital Celebrations & Departure",
    category: "standard",
    drivingTime: "~1 hour (~50 km)",
    route: "Reykjavík ➔ Custom Scenic Detour",
    campsite: "Local Campsite",
    summary: "New custom itinerary day added by traveler.",
    notes: "",
    completed: false,
    stops: [
      {
        name: "Custom Scenic Spot",
        desc: "Added by user",
        image: "iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg"
      }
    ]
  };

  itineraryData.push(newDay);
  saveData();
  renderApp();
  openDayModal(newId);
}

let packingSearchQuery = '';

// Packing List Render
function renderPackingLists() {
  const amsContainer = document.getElementById('pack-ams-list');
  const d1Container = document.getElementById('pack-d1-list');
  const rdContainer = document.getElementById('pack-rd-list');

  if (!amsContainer || !d1Container || !rdContainer) return;

  // Update progress badge
  const total = packingData.length;
  const checked = packingData.filter(i => i.checked).length;
  const badge = document.getElementById('packing-progress-badge');
  if (badge) {
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
    badge.innerText = `${checked} / ${total} Items Packed (${pct}%)`;
  }

  amsContainer.innerHTML = renderChecklistCategory('ams', packingSearchQuery);
  d1Container.innerHTML = renderChecklistCategory('d1', packingSearchQuery);
  rdContainer.innerHTML = renderChecklistCategory('rd', packingSearchQuery);
}

function renderChecklistCategory(cat, query = '') {
  let items = packingData.filter(i => i.cat === cat);
  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    items = items.filter(i => i.name.toLowerCase().includes(q) || (i.group && i.group.toLowerCase().includes(q)));
  }

  if (items.length === 0) {
    return `<p style="font-size: 0.825rem; color: var(--text-muted); padding: 0.5rem 0;">No items match "${escapeHtml(query)}"</p>`;
  }

  // Group items by group if present
  const groups = {};
  items.forEach(item => {
    const grp = item.group || 'General Items';
    if (!groups[grp]) groups[grp] = [];
    groups[grp].push(item);
  });

  return Object.entries(groups).map(([groupName, groupItems]) => `
    <div style="margin-bottom: 0.85rem;">
      <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--ice-600); border-bottom: 1px solid #e2e8f0; padding-bottom: 0.2rem; margin-bottom: 0.4rem; letter-spacing: 0.5px;">${escapeHtml(groupName)}</div>
      ${groupItems.map(item => `
        <div class="checklist-item ${item.checked ? 'checked' : ''}">
          <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="togglePackingItem('${item.id}')" class="checkbox-custom">
          <span class="checklist-label" onclick="togglePackingItem('${item.id}')">${escapeHtml(item.name)}</span>
          <button onclick="deletePackingItem('${item.id}')" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0.2rem;" title="Delete Item">✕</button>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function filterPackingItems(val) {
  packingSearchQuery = val;
  renderPackingLists();
}

function resetPackingFilter() {
  packingSearchQuery = '';
  const input = document.getElementById('packing-search-input');
  if (input) input.value = '';
  renderPackingLists();
}

function togglePackingItem(id) {
  const item = packingData.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    saveData();
    renderPackingLists();
  }
}

function deletePackingItem(id) {
  packingData = packingData.filter(i => i.id !== id);
  saveData();
  renderPackingLists();
}

function addPackingItem(cat) {
  const text = prompt("Enter new packing item:");
  if (!text) return;
  const newId = 'custom-' + Date.now();
  packingData.push({ id: newId, name: text, cat: cat, checked: false });
  saveData();
  renderPackingLists();
}

// Photo Gallery Render
function renderGallery() {
  const container = document.getElementById('gallery-grid-container');
  if (!container) return;

  const allStops = [];
  itineraryData.forEach(d => {
    if (d.stops) {
      d.stops.forEach(s => {
        if (s.image && s.image.trim() !== '') {
          allStops.push({ day: d.dayNum, name: s.name, image: s.image, desc: s.desc });
        }
      });
    }
  });

  container.innerHTML = allStops.map(s => `
    <div class="gallery-card" onclick="openPhotoModal('${escapeHtml(s.name)}', '${escapeHtml(s.image)}')">
      <img src="${s.image}" alt="${escapeHtml(s.name)}" class="gallery-img" onerror="this.src='iceland_trip_photos/phase_1_arrival_and_geothermal_beginnings/04_the_blue_lagoon.jpg'">
      <div class="gallery-caption">
        <div>
          <div style="font-size: 0.7rem; color: var(--ice-400); font-weight: 700;">DAY ${s.day}</div>
          <div>${escapeHtml(s.name)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Open Lightbox Photo Modal
function openPhotoModal(title, imgSrc) {
  document.getElementById('lightbox-title').innerText = title;
  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('photo-lightbox-modal').classList.add('active');
}

// Interactive Calculators
function calculateLuggageTetris() {
  const hards = parseInt(document.getElementById('calc-hard').value) || 0;
  const softs = parseInt(document.getElementById('calc-soft').value) || 0;
  const resBox = document.getElementById('tetris-result');

  let alertStyle = "background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #a7f3d0;";
  let msg = `<strong>Perfect Fit:</strong> Suitcases fit neatly under Cozy 3 M bed platform cabinets!`;

  if (hards === 3 && softs <= 3) {
    alertStyle = "background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #fde68a;";
    msg = `<strong>Warning - Night Tetris Required:</strong> With 3 hard cases, you will need to stack suitcases onto driver/passenger seats at night to fold down the sofa bed.`;
  } else if (hards > 3 || (hards + softs) > 6) {
    alertStyle = "background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5;";
    msg = `<strong>Overload Alert:</strong> High cabin clutter! Soft duffels are strongly recommended.`;
  }

  resBox.style = alertStyle + " padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; line-height: 1.5; margin-top: 1rem;";
  resBox.innerHTML = msg;
}

function calculateFerryFare() {
  const len = parseFloat(document.getElementById('ferry-len').value) || 5.4;
  const adults = parseInt(document.getElementById('ferry-adults').value) || 2;
  const childAge = parseInt(document.getElementById('ferry-child-age').value) || 11;

  let vehBase = 11300;
  if (len > 5.0) {
    vehBase += Math.ceil(len - 5.0) * 2500;
  }

  const adultFare = adults * 7700;
  const childFare = childAge >= 12 ? 3850 : 0;
  const total = vehBase + adultFare + childFare;

  document.getElementById('ferry-veh-fare').innerText = `${vehBase.toLocaleString()} ISK`;
  document.getElementById('ferry-adult-fare').innerText = `${adultFare.toLocaleString()} ISK`;
  document.getElementById('ferry-child-fare').innerText = childAge >= 12 ? `${childFare.toLocaleString()} ISK` : '0 ISK (Free)';
  document.getElementById('ferry-total-fare').innerText = `${total.toLocaleString()} ISK (~€${(total / 150).toFixed(0)})`;
}

function updateCalculators() {
  calculateLuggageTetris();
  calculateFerryFare();
}

// Tab Switching
function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');

      const tabId = target.getAttribute('data-tab');
      activeTab = tabId;

      document.querySelectorAll('.tab-content-panel').forEach(panel => panel.classList.add('hidden'));
      document.getElementById(`tab-panel-${tabId}`).classList.remove('hidden');

      if (tabId === 'map') {
        initOrUpdateMap();
      }
    });
  });

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.getAttribute('data-filter');
      renderItineraryGrid();
    });
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderItineraryGrid();
    });
  }

  // Close modal when clicking outside on backdrop overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

// Modal Helpers
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Export / Import Data
function exportDataJSON() {
  const exportPayload = {
    version: "2026.1",
    exportedAt: new Date().toISOString(),
    itinerary: itineraryData,
    journalNotes: journalNotes,
    packing: packingData
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `iceland_expedition_full_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function exportJournalTXT() {
  const entries = Object.entries(journalNotes).filter(([_, text]) => text && text.trim() !== '');
  if (entries.length === 0) {
    alert("No journal notes saved yet. Add notes to any location first!");
    return;
  }

  let textContent = "ICELAND EXPEDITION 2026 - PERSONAL LOCATION JOURNAL\n";
  textContent += "=====================================================\n\n";

  entries.forEach(([stopName, text], idx) => {
    textContent += `${idx + 1}. LOCATION: ${stopName}\n`;
    textContent += `-----------------------------------------------------\n`;
    textContent += `${text}\n\n`;
  });

  const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `iceland_expedition_journal_${new Date().toISOString().slice(0,10)}.txt`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function resetToDefaultData() {
  if (confirm("Reset itinerary and packing data to defaults? Any custom edits will be reverted.")) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PACKING_KEY);
    loadStoredData();
    renderApp();
    alert("Data reset successfully!");
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
