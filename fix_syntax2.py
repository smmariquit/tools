import os
import glob

files = glob.glob("src/app/[locale]/*/page.tsx")

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # We want to replace this:
    # 		"Compute your exact 2026 net take-home pay in the Philippines. Accurately deducts SSS (with WISP), PhilHealth, Pag-IBIG, and TRAIN Law income tax.",
    # ,
    # 	openGraph: {
    
    # To do this safely, let's remove any line that is just ","
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        if line.strip() == ',':
            continue
        new_lines.append(line)
        
    with open(filepath, 'w') as f:
        f.write('\n'.join(new_lines))

print("Done fixing syntax")
