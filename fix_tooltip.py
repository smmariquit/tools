import os
import glob

files = glob.glob('src/app/[locale]/*/Client.tsx')
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # We want to replace the contentStyle block
    import re
    new_content = re.sub(
        r'contentStyle=\{\{\s*borderRadius: "8px",\s*border: "none",\s*boxShadow: "0 4px 12px rgba\(0,0,0,0\.1\)",\s*\}\}',
        'contentStyle={{\n\t\t\t\t\t\t\t\t\t\t\tborderRadius: "8px",\n\t\t\t\t\t\t\t\t\t\t\tborder: "1px solid var(--border-color)",\n\t\t\t\t\t\t\t\t\t\t\tbackgroundColor: "var(--surface-color)",\n\t\t\t\t\t\t\t\t\t\t\tcolor: "var(--text-primary)",\n\t\t\t\t\t\t\t\t\t\t\tboxShadow: "var(--shadow-md)",\n\t\t\t\t\t\t\t\t\t\t}}',
        content
    )
    
    with open(f, 'w') as file:
        file.write(new_content)
