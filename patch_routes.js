const fs = require('fs');
let code = fs.readFileSync('src/lib/routes.ts', 'utf8');

const gamingCategory = `	{
		category: "Gaming & Esports Utilities",
		items: [
			{
				name: "MLBB Diamond Top-Up Optimizer",
				path: "/mlbb-diamond-calculator",
				desc: "Find the best PHP-to-Diamond ratio across top-up sites.",
				priority: 0.9,
			},
			{
				name: "MLBB Win Rate Calculator",
				path: "/mlbb-winrate-calculator",
				desc: "Calculate consecutive wins needed for your target win rate.",
				priority: 0.9,
			},
			{
				name: "CODM Lucky Draw Estimator",
				path: "/codm-lucky-draw-calculator",
				desc: "Calculate the total CP and PHP cost of a Lucky Draw.",
				priority: 0.9,
			},
			{
				name: "Genshin Pity & Primogem Calculator",
				path: "/genshin-pity-calculator",
				desc: "Calculate pulls and PHP needed to guarantee a 5-star character.",
				priority: 0.9,
			}
		],
	},
];`;

code = code.replace('];', gamingCategory);
fs.writeFileSync('src/lib/routes.ts', code);
console.log('Patched routes.ts');
