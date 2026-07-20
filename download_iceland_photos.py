import os
import sys
import json
import re
import urllib.request
import urllib.parse
import time
from pathlib import Path

BASE_DIR = Path("/home/ashwin/ai/temp/iceland_trip_photos")

# Define all phases and locations
ITINERARY = [
    {
        "phase_folder": "phase_1_arrival_and_geothermal_beginnings",
        "phase_name": "Phase 1: Arrival & Geothermal Beginnings",
        "items": [
            ("01_keflavik_international_airport", "Keflavík International Airport (KEF)", "Keflavik International Airport Iceland exterior"),
            ("02_cozy_campers_hq_kopavogur", "Cozy Campers HQ (Kópavogur)", "Cozy Campers Kopavogur campervan Iceland"),
            ("03_mosskogar_camping_or_grindavik", "Mosskogar Camping or Grindavík", "Mosskogar Camping Grindavik Iceland"),
            ("04_the_blue_lagoon", "The Blue Lagoon", "Blue Lagoon geothermal spa Iceland"),
            ("05_kronan_or_bonus", "Krónan or Bónus", "Bonus supermarket Iceland storefront"),
            ("06_thingvellir_national_park", "Thingvellir National Park", "Thingvellir National Park tectonic rift Iceland"),
            ("07_gjain_valley", "Gjáin Valley", "Gjain valley waterfall oasis Iceland"),
            ("08_strokkur_geyser", "Strokkur Geyser", "Strokkur geyser eruption Iceland"),
            ("09_gullfoss_falls", "Gullfoss Falls", "Gullfoss waterfall Iceland golden circle"),
            ("10_skjol_camping", "Skjól Camping", "Skjol Camping Geysir Iceland"),
        ]
    },
    {
        "phase_folder": "phase_2_the_highlands_and_the_south_coast",
        "phase_name": "Phase 2: The Highlands & The South Coast Coastline",
        "items": [
            ("11_hella_campsite", "Hella Campsite", "Hella campsite river Iceland"),
            ("12_landmannalaugar", "Landmannalaugar", "Landmannalaugar colorful mountains Iceland"),
            ("13_seljalandsfoss_and_gljufrabui", "Seljalandsfoss & Gljúfrabúi", "Seljalandsfoss and Gljufrabui waterfall Iceland"),
            ("14_kvernufoss", "Kvernufoss", "Kvernufoss waterfall hidden canyon Iceland"),
            ("15_skogafoss", "Skógafoss", "Skogafoss waterfall rainbow Iceland"),
            ("16_dyrholaey_cliffs", "Dyrhólaey Cliffs", "Dyrholaey arch cliffs puffins Iceland"),
            ("17_reynisfjara_beach", "Reynisfjara Beach", "Reynisfjara black sand beach basalt columns Iceland"),
            ("18_vik_campsite_or_the_soup_company", "Vík Campsite / The Soup Company", "The Soup Company Vik Iceland red hot lava soup"),
        ]
    },
    {
        "phase_folder": "phase_3_canyons_and_glaciers",
        "phase_name": "Phase 3: Canyons & Glaciers",
        "items": [
            ("19_fjadrargljufur_canyon", "Fjaðrárgljúfur Canyon", "Fjadrargljufur canyon mossy rim trail Iceland"),
            ("20_skaftafell_national_park_svartifoss", "Skaftafell National Park (Svartifoss)", "Svartifoss basalt column waterfall Skaftafell Iceland"),
            ("21_skaftafell_campground", "Skaftafell Campground", "Skaftafell campground glacier view Iceland"),
            ("22_glacier_adventure_hq", "Glacier Adventure HQ", "Glacier Adventure Ice Trekking Skaftafell Vatnajokull Iceland"),
            ("23_jokulsarlon_glacier_lagoon", "Jökulsárlón Glacier Lagoon", "Jokulsarlon glacier lagoon icebergs Iceland"),
            ("24_diamond_beach", "Diamond Beach", "Diamond beach ice blocks black sand Iceland"),
            ("25_mulagljufur_canyon", "Múlagljúfur Canyon", "Mulagljufur canyon waterfall jurassic park Iceland"),
            ("26_vestrahorn_mountain_stokksnes", "Vestrahorn Mountain (Stokksnes)", "Vestrahorn Stokksnes black sand dunes reflection Iceland"),
            ("27_southern_east_fjords_coastline", "Southern East Fjords Coastline", "East Fjords scenic coastal road driving Iceland"),
            ("28_djupivogur_campsite", "Djúpivogur Campsite", "Djupivogur harbor village campsite Iceland"),
        ]
    },
    {
        "phase_folder": "phase_4_east_fjords_to_the_volcanic_north",
        "phase_name": "Phase 4: East Fjords to the Volcanic North",
        "items": [
            ("29_hengifoss", "Hengifoss", "Hengifoss waterfall red clay basalt Iceland"),
            ("30_egilsstadir_town_and_campsite", "Egilsstaðir Town & Campsite", "Egilsstadir campsite town Iceland"),
            ("31_vok_baths", "Vök Baths", "Vok Baths floating geothermal pools Urridavatn Iceland"),
            ("32_studlagil_canyon", "Stuðlagil Canyon (East Side Approach)", "Studlagil Canyon basalt columns turquoise river Iceland"),
            ("33_vogar_campsite", "Vogar Campsite", "Vogar campsite Lake Myvatn Iceland"),
            ("34_hverir", "Hverir", "Hverir smoking sulfur vents mud pots Myvatn Iceland"),
            ("35_grjotagja_cave", "Grjótagjá Cave", "Grjotagja thermal blue water lava cave Iceland"),
            ("36_dimmuborgir_lava_maze", "Dimmuborgir Lava Maze", "Dimmuborgir lava rock formations Myvatn Iceland"),
            ("37_earth_lagoon_myvatn", "Earth Lagoon Mývatn", "Myvatn Nature Baths geothermal pool Iceland"),
            ("38_daddis_pizza", "Daddi’s Pizza", "Daddi's Pizza Myvatn restaurant Iceland"),
            ("39_husavik_harbor", "Húsavík Harbor", "Husavik harbor whale watching capital Iceland"),
            ("40_north_sailing", "North Sailing", "North Sailing electric boat humpback whale watching Husavik"),
            ("41_godafoss_waterfall", "Goðafoss Waterfall", "Godafoss waterfall of the gods Iceland"),
            ("42_camping_hamrar", "Camping Hamrar", "Camping Hamrar Akureyri forest playground Iceland"),
        ]
    },
    {
        "phase_folder": "phase_5_the_remote_westfjords_detour",
        "phase_name": "Phase 5: The Remote Westfjords Detour",
        "items": [
            ("43_route_61_djupvegur", "Route 61 (Djúpvegur)", "Route 61 Djupvegur Westfjords highway scenic driving Iceland"),
            ("44_roadside_seal_lookouts", "Roadside Seal Lookouts", "Wild harbor seals layby Westfjords Iceland"),
            ("45_isafjordur_town_and_campsite", "Ísafjörður Town & Campsite (Tungudalur)", "Isafjordur Tungudalur campsite waterfall Westfjords Iceland"),
            ("46_dynjandi_waterfall", "Dynjandi Waterfall", "Dynjandi waterfall Westfjords bridal veil Iceland"),
            ("47_flokalundur_or_talknafjordur_campsites", "Flókalundur or Tálknafjordur Campsites", "Flokalundur campsite coastal Westfjords Iceland"),
        ]
    },
    {
        "phase_folder": "phase_6_capital_celebrations_and_departure",
        "phase_name": "Phase 6: Capital Celebrations & Departure",
        "items": [
            ("48_deildartunguhver", "Deildartunguhver", "Deildartunguhver hot spring steaming Europe Iceland"),
            ("49_mosskogar_camping", "Mosskogar Camping", "Mosskogar greenhouse camping Iceland"),
            ("50_hveragerdi_town", "Hveragerði Town", "Hveragerdi geothermal town Iceland"),
            ("51_downtown_reykjavik", "Downtown Reykjavík", "Downtown Reykjavik streets colorful houses Hallgrimskirkja Iceland"),
            ("52_flyover_iceland", "FlyOver Iceland", "FlyOver Iceland Grandi harbor flight simulator Reykjavik"),
            ("53_laugardalslaug_leisure_pool", "Laugardalslaug Leisure Pool", "Laugardalslaug swimming pool hot tubs slide Reykjavik Iceland"),
            ("54_orkan_olis_station", "Orkan / Olís Station", "Olis gas station Iceland petrol station"),
            ("55_sandgerdi_campsite", "Sandgerði Campsite", "Sandgerdi campsite Reykjanes Peninsula Iceland"),
        ]
    }
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def search_ddg_image_urls(query, limit=5):
    """Fetches image search result URLs from DuckDuckGo."""
    try:
        url = f'https://duckduckgo.com/?q={urllib.parse.quote(query)}'
        req = urllib.request.Request(url, headers=HEADERS)
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        
        vqd_match = re.search(r'vqd=([\d-]+)', html)
        if not vqd_match:
            vqd_match = re.search(r'vqd=\"([\d-]+)\"', html)
        
        if vqd_match:
            vqd = vqd_match.group(1)
            img_url = f'https://duckduckgo.com/i.js?q={urllib.parse.quote(query)}&o=json&vqd={vqd}'
            req_img = urllib.request.Request(img_url, headers=HEADERS)
            res = urllib.request.urlopen(req_img, timeout=10).read().decode('utf-8')
            res_img = json.loads(res)
            results = res_img.get('results', [])
            urls = [r['image'] for r in results if 'image' in r]
            return urls[:limit]
    except Exception as e:
        print(f"Error searching DDG for '{query}': {e}")
    return []

def download_image(urls, target_path):
    """Try downloading from a list of URLs until a valid image is downloaded."""
    for img_url in urls:
        try:
            # Avoid downloading html/error pages or huge binaries
            req = urllib.request.Request(img_url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=12) as response:
                content_type = response.headers.get('Content-Type', '')
                data = response.read()
                if len(data) > 5000 and ('image' in content_type or data.startswith(b'\xff\xd8') or data.startswith(b'\x89PNG') or data.startswith(b'RIFF')):
                    # Determine extension
                    ext = ".jpg"
                    if "png" in content_type or data.startswith(b'\x89PNG'):
                        ext = ".png"
                    elif "webp" in content_type:
                        ext = ".webp"
                    
                    final_path = target_path.with_suffix(ext)
                    with open(final_path, 'wb') as f:
                        f.write(data)
                    return final_path, len(data)
        except Exception as e:
            continue
    return None, 0

def main():
    BASE_DIR.mkdir(parents=True, exist_ok=True)
    summary_data = []

    total_items = sum(len(phase["items"]) for phase in ITINERARY)
    count = 0

    print(f"Starting download of {total_items} photos for Iceland itinerary...")

    for phase in ITINERARY:
        phase_dir = BASE_DIR / phase["phase_folder"]
        phase_dir.mkdir(parents=True, exist_ok=True)
        print(f"\n--- {phase['phase_name']} ---")

        for file_prefix, display_name, search_query in phase["items"]:
            count += 1
            target_path_base = phase_dir / file_prefix
            
            # Check if file already exists with any extension
            existing = list(phase_dir.glob(f"{file_prefix}.*"))
            if existing and existing[0].stat().st_size > 5000:
                print(f"[{count}/{total_items}] Skipped (Already exists): {display_name}")
                summary_data.append({
                    "phase": phase["phase_name"],
                    "name": display_name,
                    "file": str(existing[0].relative_to(BASE_DIR)),
                    "status": "Success"
                })
                continue

            print(f"[{count}/{total_items}] Searching photo for: {display_name}...")
            img_urls = search_ddg_image_urls(search_query, limit=8)
            
            saved_path, size = download_image(img_urls, target_path_base)
            
            if saved_path:
                rel_path = str(saved_path.relative_to(BASE_DIR))
                print(f"    ✓ Downloaded: {rel_path} ({size // 1024} KB)")
                summary_data.append({
                    "phase": phase["phase_name"],
                    "name": display_name,
                    "file": rel_path,
                    "status": "Success"
                })
            else:
                print(f"    ✗ Failed to download image for: {display_name}")
                summary_data.append({
                    "phase": phase["phase_name"],
                    "name": display_name,
                    "file": "",
                    "status": "Failed"
                })

            time.sleep(0.5)

    # Save summary index.json
    with open(BASE_DIR / "index.json", "w") as f:
        json.dump(summary_data, f, indent=2)

    print("\nDownload completed!")

if __name__ == "__main__":
    main()
