import os
import glob

files = glob.glob("src/app/[locale]/*/page.tsx")

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # The error is:
    # 	"description text"
    # ,
    # 	openGraph: {
    
    # We replace:
    # "
    # ,
    # \topenGraph
    
    # with:
    # ",
    # \topenGraph
    
    new_content = content.replace('",\n,\n\topenGraph', '",\n\topenGraph')
    new_content = new_content.replace('"\n,\n\topenGraph', '",\n\topenGraph')
    
    with open(filepath, 'w') as f:
        f.write(new_content)

print("Done fixing syntax")
