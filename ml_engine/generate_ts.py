import json
import os

with open("c:/Users/as/Desktop/CC++/.vscode/trekmonk/src/data/unifiedTrekData.json", "r") as f:
    data = json.load(f)

ts_content = "import type { Trek } from './trekData';\n\n"
ts_content += "const VALID_IMAGES = ['1506905925346-21bda4d32df4', '1586348943529-beaae6c28db9', '1470770841072-f978cf4d019e', '1564507592333-c60657eea523', '1622308644420-b20142dc993c', '1477587458883-47145ed94245', '1598091383021-15ddea10925d', '1602216056096-3b40cc0c9944', '1558618666-fcd25c85cd64', '1507525428034-b723cf961d3e', '1507003211169-0a1dd7228f2d', '1533107862482-0e6974b06ec4'];\n"
ts_content += "const img = (i: number) => `https://images.unsplash.com/photo-${VALID_IMAGES[i % VALID_IMAGES.length]}?w=600&h=800&fit=crop&q=80&auto=format`;\n\n"

ts_content += "export const unifiedTrekData: Trek[] = [\n"

region_map = {
    "North India": "north",
    "South India": "south",
    "North East": "north-east",
    "Rajasthan": "rajasthan"
}

diff_map = {
    "Weekend": "easy",
    "Group Trip": "moderate",
    "Backpacking": "hard",
    "Spiritual": "moderate"
}

for i, t in enumerate(data):
    # Map to Trek format
    region = region_map.get(t["region"], "north")
    diff = diff_map.get(t["type"], "moderate")
    dur = 3 if diff == "easy" else (5 if diff == "moderate" else 8)
    price = 6999 if dur == 3 else (10999 if dur == 5 else 16999)
    rating = 4.7 if i % 2 == 0 else 4.9
    pop = 100 - (i % 20)
    
    ts_content += "  {\n"
    ts_content += f"    id: '{t['id']}',\n"
    ts_content += f"    name: '{t['name']}',\n"
    ts_content += f"    slug: '{t['name'].lower().replace(' ', '-').replace('(', '').replace(')', '')}',\n"
    ts_content += f"    location: '{t['name']}, {t['region']}',\n"
    ts_content += f"    region: '{region}',\n"
    ts_content += f"    difficulty: '{diff}',\n"
    ts_content += f"    duration: {dur},\n"
    ts_content += f"    altitude: {2000 if region == 'north' else 500},\n"
    ts_content += f"    season: ['summer', 'winter', 'spring', 'monsoon'],\n"
    ts_content += f"    tags: {json.dumps(t['tags'])},\n"
    ts_content += f"    price: {price},\n"
    ts_content += f"    rating: {rating},\n"
    ts_content += f"    popularityScore: {pop},\n"
    ts_content += f"    image: img({i}),\n"
    ts_content += "  },\n"

ts_content += "];\n"

with open("c:/Users/as/Desktop/CC++/.vscode/trekmonk/src/data/unifiedTrekData.ts", "w") as f:
    f.write(ts_content)
