/**
 * Coordinates and Map Metadata for all Iceland 2026 Expedition Stops
 */

const ICELAND_MAP_LOCATIONS = [
  // Phase 1
  { name: "Keflavík International Airport (KEF)", day: 1, lat: 63.9850, lng: -22.6056, phase: 1, desc: "Landing pad & airport terminal." },
  { name: "Cozy Campers HQ (Kópavogur)", day: 1, lat: 64.1118, lng: -21.9125, phase: 1, desc: "Van pickup HQ (Kársnesbraut 106)." },
  { name: "Sandgerði Campsite", day: 1, lat: 64.0375, lng: -22.7064, phase: 1, desc: "First night campsite." },
  { name: "The Blue Lagoon", day: 2, lat: 63.8804, lng: -22.4495, phase: 1, desc: "Geothermal silica soak." },
  { name: "Krónan or Bónus (Kópavogur)", day: 2, lat: 64.1100, lng: -21.9000, phase: 1, desc: "Grocery haul." },
  { name: "Thingvellir National Park", day: 2, lat: 64.2559, lng: -21.1299, phase: 1, desc: "Continental rift walk." },
  { name: "Gjáin Valley", day: 2, lat: 64.1493, lng: -19.7369, phase: 1, desc: "Fairytale oasis valley." },
  { name: "Strokkur Geyser", day: 2, lat: 64.3128, lng: -20.3023, phase: 1, desc: "Boiling geyser tower." },
  { name: "Gullfoss Falls", day: 2, lat: 64.3271, lng: -20.1199, phase: 1, desc: "Golden Circle double waterfall." },
  { name: "Hella Campsite", day: 2, lat: 63.8340, lng: -20.4010, phase: 1, desc: "Highlands base camp." },

  // Phase 2
  { name: "Landmannalaugar Highlands", day: 3, lat: 63.9908, lng: -19.0607, phase: 2, desc: "Rhyolite mountains & hot river." },
  { name: "Seljalandsfoss & Gljúfrabúi", day: 4, lat: 63.6156, lng: -19.9886, phase: 2, desc: "Walk-behind & cave waterfalls." },
  { name: "Kvernufoss", day: 4, lat: 63.5283, lng: -19.4810, phase: 2, desc: "Secret walk-behind canyon fall." },
  { name: "Skógafoss", day: 4, lat: 63.5321, lng: -19.5113, phase: 2, desc: "60m thunderous waterfall wall." },
  { name: "Dyrhólaey Cliffs", day: 4, lat: 63.4024, lng: -19.1303, phase: 2, desc: "Puffin watching cliffs." },
  { name: "Reynisfjara Black Sand Beach", day: 4, lat: 63.4057, lng: -19.0448, phase: 2, desc: "Basalt column beach." },
  { name: "The Soup Company (Vík)", day: 4, lat: 63.4194, lng: -19.0060, phase: 2, desc: "Red Hot Lava soup." },
  { name: "Kleifarmörk Campsite", day: 4, lat: 63.7912, lng: -18.0614, phase: 2, desc: "Campsite near Kirkjubæjarklaustur." },

  // Phase 3
  { name: "Fjaðrárgljúfur Canyon", day: 5, lat: 63.7713, lng: -18.1718, phase: 3, desc: "Serpentine green canyon rim hike." },
  { name: "Svartifoss (Skaftafell NP)", day: 5, lat: 64.0275, lng: -16.9753, phase: 3, desc: "Dark basalt column waterfall." },
  { name: "Skaftafell Campground", day: 5, lat: 64.0163, lng: -16.9664, phase: 3, desc: "Overnight base below glaciers." },
  { name: "Jökulsárlón Glacier Lagoon", day: 6, lat: 64.0784, lng: -16.2306, phase: 3, desc: "Sapphire iceberg lagoon." },
  { name: "Diamond Beach", day: 6, lat: 64.0443, lng: -16.1777, phase: 3, desc: "Glacier ice blocks on black sand." },
  { name: "Múlagljúfur Canyon", day: 6, lat: 63.9904, lng: -16.3956, phase: 3, desc: "Hidden Jurassic-style canyon." },
  { name: "Vestrahorn Mountain (Stokksnes)", day: 6, lat: 64.2562, lng: -14.9982, phase: 3, desc: "Jagged mountain reflection beach." },
  { name: "Djúpivogur Campsite", day: 6, lat: 64.6567, lng: -14.2933, phase: 3, desc: "East fjords coastal camp." },

  // Phase 4
  { name: "Hengifoss Waterfall", day: 7, lat: 65.0961, lng: -14.8872, phase: 4, desc: "Black basalt cliffs with red clay." },
  { name: "Egilsstaðir Town & Campsite", day: 7, lat: 65.2669, lng: -14.3948, phase: 4, desc: "Heated kitchen facilities camp." },
  { name: "Vök Baths", day: 7, lat: 65.2981, lng: -14.4264, phase: 4, desc: "Floating geothermal pools." },
  { name: "Stuðlagil Canyon (East Side)", day: 8, lat: 65.1634, lng: -15.3072, phase: 4, desc: "Turquoise river basalt floor hike." },
  { name: "Möðrudalur - Fjalladýrð", day: 8, lat: 65.3742, lng: -15.8833, phase: 4, desc: "Highland farmstead camp." },
  { name: "Hverir Geothermal Area", day: 9, lat: 65.6418, lng: -16.8080, phase: 4, desc: "Steaming sulfur vents & mud pots." },
  { name: "Grjótagjá Cave", day: 9, lat: 65.6264, lng: -16.8828, phase: 4, desc: "Thermal water volcanic cave." },
  { name: "Dimmuborgir Lava Maze", day: 9, lat: 65.5908, lng: -16.9125, phase: 4, desc: "Volcanic lava rock castles." },
  { name: "Earth Lagoon Mývatn", day: 9, lat: 65.6310, lng: -16.8475, phase: 4, desc: "Mineral silica baths." },
  { name: "Húsavík Harbor", day: 10, lat: 66.0449, lng: -17.3389, phase: 4, desc: "Electric whale watching boat." },
  { name: "Goðafoss Waterfall", day: 10, lat: 65.6828, lng: -17.5502, phase: 4, desc: "Waterfall of the Gods." },
  { name: "Camping Hamrar (Akureyri)", day: 10, lat: 65.6450, lng: -18.0900, phase: 4, desc: "Akureyri forest campsite." },

  // Phase 5 - Westfjords
  { name: "Route 61 (Djúpvegur)", day: 11, lat: 65.9800, lng: -22.5000, phase: 5, desc: "Paved fjord highway." },
  { name: "Roadside Seal Lookouts (Hvítanes)", day: 11, lat: 65.9261, lng: -22.7844, phase: 5, desc: "Wild seal colonies." },
  { name: "Ísafjörður Town & Tungudalur Campsite", day: 11, lat: 66.0620, lng: -23.1500, phase: 5, desc: "Westfjords capital & campsite." },
  { name: "Dynjandi Waterfall", day: 12, lat: 65.7328, lng: -23.1998, phase: 5, desc: "100m bridal veil waterfall." },
  { name: "Flókalundur / Tálknafjörður Campsite", day: 12, lat: 65.5764, lng: -23.8271, phase: 5, desc: "Thermal pool campsite." },
  { name: "Ferry Baldur Crossing", day: 13, lat: 65.5264, lng: -23.1936, phase: 5, desc: "Brjánslækur to Stykkishólmur ferry." },

  // Phase 6
  { name: "Hraunfossar & Barnafoss", day: 14, lat: 64.7028, lng: -20.9772, phase: 6, desc: "Waterfalls flowing out of lava." },
  { name: "Deildartunguhver", day: 14, lat: 64.6631, lng: -21.4114, phase: 6, desc: "Europe's most powerful hot spring." },
  { name: "Tjaldsvæði að Hlöðum (Hvalfjörður)", day: 14, lat: 64.3333, lng: -21.7500, phase: 6, desc: "Greenhouse campsite." },
  { name: "Surprise Activity (Hveragerði)", day: 15, lat: 63.9986, lng: -21.1870, phase: 6, desc: "Morning surprise activity." },
  { name: "Downtown Reykjavík", day: 15, lat: 64.1466, lng: -21.9426, phase: 6, desc: "FlyOver Iceland & city walks." }
];

/**
 * Generate KML String for Google Maps / OsmAnd / MAPS.ME
 */
function generateKMLString() {
  let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Iceland Expedition 2026 Route & Sights</name>
    <description>Complete 16-Day Ring Road, Highlands & Westfjords Itinerary</description>
`;

  ICELAND_MAP_LOCATIONS.forEach(loc => {
    kml += `    <Placemark>
      <name>Day ${loc.day}: ${escapeXml(loc.name)}</name>
      <description>${escapeXml(loc.desc)}</description>
      <Point>
        <coordinates>${loc.lng},${loc.lat},0</coordinates>
      </Point>
    </Placemark>\n`;
  });

  kml += `  </Document>\n</kml>`;
  return kml;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
