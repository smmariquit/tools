import os

for root, dirs, files in os.walk("src/app"):
    if "page.tsx" in files:
        filepath = os.path.join(root, "page.tsx")
        with open(filepath, "r") as f:
            content = f.read()
            
        new_lines = []
        for line in content.split("\n"):
            if line.strip() == ",":
                continue
            new_lines.append(line)
            
        with open(filepath, "w") as f:
            f.write("\n".join(new_lines))
