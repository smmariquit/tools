const fs = require('fs');

const enPath = './messages/en.json';
const cebPath = './messages/ceb.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const cebData = JSON.parse(fs.readFileSync(cebPath, 'utf8'));

// Deep merge function
function deepMergeFallback(target, source) {
    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (!target[key] || typeof target[key] !== 'object') {
                target[key] = {};
            }
            deepMergeFallback(target[key], source[key]);
        } else {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }
    }
}

deepMergeFallback(cebData, enData);

fs.writeFileSync(cebPath, JSON.stringify(cebData, null, 2) + '\n');
console.log('Synced ceb.json with fallbacks from en.json');
