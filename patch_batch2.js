const fs = require('fs');
// Patch Translations
const tools = [
	{ id: 'valorant-vp-calculator', name: 'Valorant VP to PHP Calculator', desc: 'Convert VP to PHP and find the best top-up.', tl: 'Kwentahin ang VP to PHP.', ceb: 'Kwenthaha ang VP to PHP.' },
	{ id: 'gaming-edpi-calculator', name: 'Gaming eDPI Converter', desc: 'Convert sensitivity between Valorant, CS2, and Apex.', tl: 'I-convert ang eDPI at sensitivity.', ceb: 'I-convert ang eDPI ug sensitivity.' },
	{ id: 'dota2-mmr-calculator', name: 'Dota 2 MMR to Rank Calculator', desc: 'Convert MMR to Medal and calculate wins needed.', tl: 'Kwentahin ang MMR to Medal at wins needed.', ceb: 'Kwenthaha ang MMR to Medal ug wins needed.' },
	{ id: 'dota2-battlepass-calculator', name: 'Dota 2 Battle Pass PHP Calculator', desc: 'Estimate PHP cost to reach Aegis/Arcana.', tl: 'Kwentahin ang gastos para sa Dota Battle Pass.', ceb: 'Kwenthaha ang gasto sa Dota Battle Pass.' }
];

['en', 'tl', 'ceb'].forEach(lang => {
  const data = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
  tools.forEach(t => {
	data.Routes[t.id] = { name: t.name, desc: lang === 'en' ? t.desc : lang === 'tl' ? t.tl : t.ceb };
  });
  fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(data, null, '\t') + '\n');
});

// Patch Footer
let footer = fs.readFileSync('src/app/components/ToolFooter.tsx', 'utf8');
const mapping = `	"/valorant-vp-calculator": "/blog/valorant-vp-guide",
	"/gaming-edpi-calculator": "/blog/gaming-edpi-guide",
	"/dota2-mmr-calculator": "/blog/dota2-mmr-guide",
	"/dota2-battlepass-calculator": "/blog/dota2-battlepass-guide",
`;
footer = footer.replace('};', mapping + '};\n');
fs.writeFileSync('src/app/components/ToolFooter.tsx', footer);

console.log('Batch 2 Patched');
