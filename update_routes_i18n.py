import json
import re

with open("src/lib/routes.ts", "r") as f:
    content = f.read()

# Extract name, path, desc
tools = []
matches = re.finditer(r'name:\s*"([^"]+)",\s*path:\s*"([^"]+)",\s*desc:\s*"([^"]+)"', content)
for m in matches:
    name, path, desc = m.groups()
    key = path.replace("/", "")
    tools.append((key, name, desc))

en_routes = {key: {"name": name, "desc": desc} for key, name, desc in tools}

# English
with open("messages/en.json", "r") as f:
    en_json = json.load(f)

en_json["Routes"] = en_routes

with open("messages/en.json", "w") as f:
    json.dump(en_json, f, indent=4)

print("Updated en.json with Routes!")
