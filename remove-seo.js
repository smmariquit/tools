const fs = require('fs');

const files = [
	"src/app/[locale]/13th-month-pay-calculator/Client.tsx",
	"src/app/[locale]/amilyar-calculator/Client.tsx",
	"src/app/[locale]/freelance-tax-calculator/Client.tsx",
	"src/app/[locale]/fuel-cost-calculator/Client.tsx",
	"src/app/[locale]/gwa-calculator/Client.tsx",
	"src/app/[locale]/holiday-calculator/Client.tsx",
	"src/app/[locale]/id-photo-maker/Client.tsx",
	"src/app/[locale]/income-tax-calculator/Client.tsx",
	"src/app/[locale]/lto-penalty-calculator/Client.tsx",
	"src/app/[locale]/pagibig-foreclosed-roi-calculator/Client.tsx",
	"src/app/[locale]/philhealth-calculator/Client.tsx",
	"src/app/[locale]/salary-calculator/Client.tsx",
	"src/app/[locale]/shopee-lazada-fee-calculator/Client.tsx",
];

let changedCount = 0;

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    let index = content.indexOf('marginTop: "48px"');
    if (index === -1) {
		console.log(`Skipped ${file} - no marginTop: "48px"`);
		continue;
	}
    
    let startDiv = content.lastIndexOf('<div', index);
    
    // Check for SEO comment
    let possibleSEOComment = content.lastIndexOf('{/* SEO Content */}', startDiv);
    if (possibleSEOComment !== -1 && (startDiv - possibleSEOComment) < 50) {
        startDiv = possibleSEOComment;
    }

    let divToBalance = content.indexOf('<div', startDiv);
    
    let count = 0;
    let i = divToBalance;
    while (i < content.length) {
        if (content.substring(i, i + 4) === '<div') {
            count++;
            i += 4;
        } else if (content.substring(i, i + 6) === '</div') {
            count--;
            if (count === 0) {
                i += 6; // Include the closing >
                // we need to include the `>` of `</div>`
                let closeBracket = content.indexOf('>', i - 6);
                if (closeBracket !== -1) {
                    i = closeBracket + 1;
                }
                break;
            }
            i += 6;
        } else {
            i++;
        }
    }
    
    let block = content.substring(startDiv, i);
    
    if (/(how|understanding|what is|methodology|t\("howComputedTitle"\))/i.test(block)) {
        content = content.substring(0, startDiv) + content.substring(i);
        fs.writeFileSync(file, content);
        changedCount++;
        console.log(`Updated ${file}`);
    } else {
        console.log(`Skipped ${file} - block didn't match keywords`);
    }
}
console.log(`Changed ${changedCount} files.`);
