const fs = require('fs');

const tools = [
	{ id: 'mlbb-diamond-calculator', name: 'MLBB Diamond Top-Up Optimizer', desc: 'Find the best PHP-to-Diamond ratio across top-up sites.', tl: 'Hanapin ang pinakamurang bentahan ng MLBB Diamonds.', ceb: 'Pangitaa ang pinakabarato nga MLBB Diamonds.' },
	{ id: 'mlbb-winrate-calculator', name: 'MLBB Win Rate Calculator', desc: 'Calculate consecutive wins needed for your target win rate.', tl: 'Kwentahin kung ilang panalo kailangan para sa target win rate.', ceb: 'Kwenthaha pila ka daog para makuha ang target win rate.' },
	{ id: 'codm-lucky-draw-calculator', name: 'CODM Lucky Draw Estimator', desc: 'Calculate the total CP and PHP cost of a Lucky Draw.', tl: 'Kwentahin ang total na gastos sa CODM Lucky Draw.', ceb: 'Kwenthaha ang gasto para sa CODM Lucky Draw.' },
	{ id: 'genshin-pity-calculator', name: 'Genshin Pity & Primogem Calculator', desc: 'Calculate pulls and PHP needed to guarantee a 5-star character.', tl: 'Kwentahin ang kailangang primogems para sa 5-star character.', ceb: 'Kwenthaha ang primogems para makuha ang 5-star character.' }
];

['en', 'tl', 'ceb'].forEach(lang => {
  const data = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
  
  tools.forEach(t => {
	data.Routes[t.id] = {
	  name: t.name,
	  desc: lang === 'en' ? t.desc : lang === 'tl' ? t.tl : t.ceb
	};
  });
  
  fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(data, null, '\t') + '\n');
});

let footer = fs.readFileSync('src/app/components/ToolFooter.tsx', 'utf8');
const mapping = `	"/mlbb-diamond-calculator": "/blog/mlbb-diamond-topup-guide",
	"/mlbb-winrate-calculator": "/blog/mlbb-winrate-guide",
	"/codm-lucky-draw-calculator": "/blog/codm-lucky-draw-guide",
	"/genshin-pity-calculator": "/blog/genshin-pity-guide",
`;
footer = footer.replace('};', mapping + '};\n');
fs.writeFileSync('src/app/components/ToolFooter.tsx', footer);

console.log('Patched translations and ToolFooter');
