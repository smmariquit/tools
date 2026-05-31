import glob
import re

for filepath in glob.glob("src/app/[locale]/*/page.tsx"):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the broken metadata block and replace it entirely
    # It currently looks like:
    # export const metadata: Metadata = {
    #   title: "...",
    #   description: "..."
    # ,
    #   openGraph: {
    #       ...
    #   },
    # };
    
    # We can match `export const metadata: Metadata = { ... };` with regex dotall
    match = re.search(r'(export const metadata: Metadata = \{.*?\};)', content, re.DOTALL)
    if not match:
        continue
        
    meta_str = match.group(1)
    
    # Clean it up: replace `"\n,\n\topenGraph:` with `",\n\topenGraph:`
    cleaned = meta_str.replace('",\n,\n\topenGraph:', '",\n\topenGraph:')
    cleaned = cleaned.replace('"\n,\n\topenGraph:', '",\n\topenGraph:')
    # In case there are multiple commas
    cleaned = re.sub(r'",\n\s*,\n\s*openGraph:', '",\n\topenGraph:', cleaned)
    
    # Let's just do a blanket regex: replace any `\n\s*,\n\s*openGraph:` with `,\n\topenGraph:`
    cleaned = re.sub(r'\n\s*,\n\s*openGraph:', ',\n\topenGraph:', cleaned)
    
    content = content.replace(meta_str, cleaned)
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Done")
