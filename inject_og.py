import os
import re
import urllib.parse

tools = {
    "salary-calculator": "s1l=Gross&s1v=₱50k&s2l=Tax&s2v=₱4.1k&s3l=Net&s3v=₱43.2k",
    "13th-month-pay-calculator": "s1l=Basic&s1v=₱30k&s2l=Months&s2v=12&s3l=13th%20Month&s3v=₱30k",
    "amilyar-calculator": "s1l=Assessed&s1v=₱1M&s2l=Rate&s2v=2%25&s3l=Tax&s3v=₱20k",
    "electric-bill-calculator": "s1l=Usage&s1v=200kWh&s2l=Rate&s2v=₱11.5&s3l=Bill&s3v=₱2.3k",
    "freelance-tax-calculator": "s1l=Income&s1v=₱80k&s2l=Rate&s2v=8%25&s3l=Tax&s3v=₱4.3k",
    "fuel-cost-calculator": "s1l=Dist&s1v=250km&s2l=Efficiency&s2v=12km/L&s3l=Cost&s3v=₱1.3k",
    "gwa-calculator": "s1l=Math&s1v=1.50&s2l=Science&s2v=2.00&s3l=GWA&s3v=1.65",
    "holiday-calculator": "s1l=Rate&s1v=₱1k&s2l=Multiplier&s2v=200%25&s3l=Pay&s3v=₱2k",
    "id-photo-maker": "s1l=Format&s1v=1x1&s2l=Format&s2v=2x2&s3l=Format&s3v=Passport",
    "income-tax-calculator": "s1l=Income&s1v=₱500k&s2l=Bracket&s2v=20%25&s3l=Tax&s3v=₱55k",
    "lto-penalty-calculator": "s1l=Vehicle&s1v=Car&s2l=Delay&s2v=1%20Mo&s3l=Penalty&s3v=₱200",
    "pagibig-calculator": "s1l=Savings&s1v=₱10k&s2l=Rate&s2v=7%25&s3l=Dividend&s3v=₱700",
    "pagibig-foreclosed-roi-calculator": "s1l=Price&s1v=₱1M&s2l=Rent&s2v=₱10k&s3l=ROI&s3v=12%25",
    "philhealth-calculator": "s1l=Salary&s1v=₱30k&s2l=Rate&s2v=5%25&s3l=Share&s3v=₱750",
    "shopee-lazada-fee-calculator": "s1l=Price&s1v=₱1k&s2l=Fees&s2v=10%25&s3l=Payout&s3v=₱900",
    "sss-contribution-calculator": "s1l=Salary&s1v=₱20k&s2l=Rate&s2v=14%25&s3l=Share&s3v=₱900",
    "toll-calculator": "s1l=Entry&s1v=Balintawak&s2l=Exit&s2v=Baguio&s3l=Fee&s3v=₱1.3k",
}

for tool, stats in tools.items():
    filepath = f"src/app/[locale]/{tool}/page.tsx"
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # If already has openGraph, skip
    if "openGraph:" in content:
        continue
        
    # Extract title and desc
    title_match = re.search(r'title:\s*"([^"]+)"', content)
    desc_match = re.search(r'description:\s*"([^"]+)"', content)
    
    if not title_match or not desc_match:
        continue
        
    title = urllib.parse.quote(title_match.group(1))
    desc = urllib.parse.quote(desc_match.group(1))
    
    og_str = f"""openGraph: {{
		images: [
			{{
				url: `/api/og?title={title}&desc={desc}&{stats}`,
				width: 1200,
				height: 630,
			}},
		],
	}},"""
    
    # Replace the last `};` of metadata with `, og_str };`
    # A bit hacky but it works for standard metadata objects
    content = re.sub(r'(export const metadata: Metadata = \{[^}]+)\s*};', r'\1,\n\t' + og_str + '\n};', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Done OG generation")
