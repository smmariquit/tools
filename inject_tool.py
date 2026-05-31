import os
import re

mapping = {
    "amilyar-real-property-tax-guide.mdx": "amilyar-calculator",
    "how-to-compute-13th-month-pay.mdx": "13th-month-pay-calculator",
    "income-tax-brackets-2026.mdx": "income-tax-calculator",
    "lto-late-registration-penalty.mdx": "lto-penalty-calculator",
    "meralco-electric-bill-guide.mdx": "electric-bill-calculator",
    "pagibig-foreclosed-property-roi.mdx": "pagibig-foreclosed-roi-calculator",
    "pagibig-mp2-dividend-calculator.mdx": "pagibig-calculator",
    "philhealth-contribution-table-2026.mdx": "philhealth-calculator",
    "philippine-toll-fees-guide.mdx": "toll-calculator",
    "salary-tax-deductions-guide.mdx": "salary-calculator",
    "shopee-lazada-seller-fees-explained.mdx": "shopee-lazada-fee-calculator",
    "sss-contribution-table-2026.mdx": "sss-contribution-calculator",
    "upwork-freelance-tax-guide.mdx": "freelance-tax-calculator"
}

for filename, tool in mapping.items():
    filepath = f"src/content/blog/{filename}"
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # We look for a line starting with 👉 **[Try the Free
    # and replace it with <ToolEmbed tool="tool-name" />\n\n👉 **[Try the Free ... in Full Screen
    
    pattern = r"(👉 \*\*\[Try the Free.*?\]\([^)]+\)\*\*)"
    replacement = f"<ToolEmbed tool=\"{tool}\" />\n\n\\1"
    
    new_content = re.sub(pattern, replacement, content)
    # Also change "here!" to "in Full Screen here!" if we want to match the other 4, but let's just do it simple:
    new_content = new_content.replace("here!]", "in Full Screen here!]")
    
    with open(filepath, 'w') as f:
        f.write(new_content)

print("Done injecting tools!")
