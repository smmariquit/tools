import fs from 'fs';
import path from 'path';

const localeDir = path.resolve('src/app/[locale]');
const dirs = fs.readdirSync(localeDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

for (const dir of dirs) {
    const pagePath = path.join(localeDir, dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf8');
    
    if (content.includes('<Suspense')) {
        continue;
    }

    if (!content.includes('import { Suspense }')) {
        content = 'import { Suspense } from "react";\n' + content;
    }

    const returnRegex = /return\s+<([a-zA-Z0-9_]+Client)\s*\/>;/g;
    content = content.replace(returnRegex, 'return <Suspense fallback={<div className="loading">Loading...</div>}><$1 /></Suspense>;');
    
    const returnPropsRegex = /return\s+<([a-zA-Z0-9_]+Client)([^>]*)>;/g;
    content = content.replace(returnPropsRegex, 'return <Suspense fallback={<div className="loading">Loading...</div>}><$1$2></Suspense>;');

    fs.writeFileSync(pagePath, content, 'utf8');
}
console.log('Fixed Suspense in page.tsx files');
