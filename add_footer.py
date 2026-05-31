import os

tools = [
    "/salary-calculator",
    "/sss-contribution-calculator",
    "/philhealth-calculator",
    "/income-tax-calculator",
    "/13th-month-pay-calculator",
    "/freelance-tax-calculator",
    "/shopee-lazada-fee-calculator",
    "/electric-bill-calculator",
    "/amilyar-calculator",
    "/pagibig-calculator",
    "/pagibig-foreclosed-roi-calculator",
    "/gwa-calculator",
    "/id-photo-maker",
    "/holiday-calculator",
    "/fuel-cost-calculator",
    "/lto-penalty-calculator",
    "/toll-calculator"
]

for tool in tools:
    path = f"src/app/[locale]{tool}/page.tsx"
    if not os.path.exists(path):
        continue
    
    with open(path, "r") as f:
        content = f.read()
        
    if "ToolFooter" in content:
        continue
        
    # Inject import
    import_statement = 'import ToolFooter from "../../components/ToolFooter";\n'
    # Put it after the first import or at top
    content = import_statement + content
    
    # Inject <ToolFooter /> before the last </Fragment> or </div>
    # Actually, look for `<Client />` or `<Client`
    
    if "<Client />" in content:
        content = content.replace("<Client />", f'<Client />\n\t\t\t<ToolFooter currentPath="{tool}" />')
    elif "<Client" in content:
        # It has props
        content = content.replace("/>\n\t\t</>", f'/>\n\t\t\t<ToolFooter currentPath="{tool}" />\n\t\t</>')
        
    with open(path, "w") as f:
        f.write(content)

print("Done")
