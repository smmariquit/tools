const fs = require('fs');

const routesCode = fs.readFileSync('src/lib/routes.ts', 'utf8');
const paths = [...routesCode.matchAll(/path:\s*["'](\/[^"']+)["']/g)].map(m => m[1]);
const toolPaths = paths.filter(p => p !== '/search');

const footerCode = fs.readFileSync('src/app/components/ToolFooter.tsx', 'utf8');
const footerMapLines = [...footerCode.matchAll(/["'](\/[^"']+)["']:\s*["'](\/blog\/[^"']+)["']/g)];
const footerMappedPaths = footerMapLines.map(m => m[1]);

const unmappedFooter = toolPaths.filter(p => !footerMappedPaths.includes(p));

const blogDir = 'src/content/blog';
const blogs = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
const stubs = blogs.map(f => {
    return { name: f, lines: fs.readFileSync(blogDir + '/' + f, 'utf8').split('\n').length };
}).filter(b => b.lines <= 16);

const enJson = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const trKeys = Object.keys(enJson.Routes);
const missingTr = toolPaths.map(p => p.replace('/', '')).filter(id => !trKeys.includes(id));

const report = `# PHTools Project Audit

## 1. ToolFooter Mappings (Missing or Broken)
The following tools do not have a registered blog link in \`ToolFooter.tsx\`:
${unmappedFooter.length ? unmappedFooter.map(p => '- ' + p).join('\n') : '- All tools are properly mapped.'}

## 2. Missing Translations (i18n)
The following tools do not have an entry in \`messages/en.json\` (and therefore likely missing tl/ceb as well):
${missingTr.length ? missingTr.map(p => '- ' + p).join('\n') : '- All tools have translations.'}

## 3. SEO Blog Stubs (Action Required)
The following ${stubs.length} blog posts are considered 'stubs' (16 lines or fewer). They need comprehensive, localized SEO content to rank on Google.

${stubs.sort((a,b) => a.lines - b.lines).map(s => `- [ ] ${s.name} (${s.lines} lines)`).join('\n')}
`;

fs.writeFileSync('audit.mdd', report);
console.log('Audit generated at audit.mdd');
