import os

tools_dir = 'src/app/[locale]'

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file == 'page.tsx':
            page_path = os.path.join(root, file)
            with open(page_path, 'r') as f:
                content = f.read()
            
            if 'import Client from "./Client";' in content or "import Client from './Client';" in content:
                if '<Client />' in content and '<Suspense' not in content:
                    if 'import { Suspense }' not in content:
                        content = 'import { Suspense } from "react";\n' + content
                    
                    content = content.replace('<Client />', '<Suspense fallback={<div className="tool-grid card" style={{textAlign: "center", padding: "40px"}}>Loading calculator...</div>}>\n\t\t\t\t<Client />\n\t\t\t</Suspense>')
                    
                    with open(page_path, 'w') as f:
                        f.write(content)
                    print(f"Fixed {page_path}")
