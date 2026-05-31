import os
import json

missing_blogs = {
    "/sss-maternity-calculator": "sss-maternity-benefit-guide",
    "/gross-from-tax-calculator": "gross-from-tax-computation-guide",
    "/separation-pay-calculator": "philippine-separation-pay-guide",
    "/freelance-rate-calculator": "freelance-hourly-rate-guide",
    "/bir-withholding-tax-calculator": "bir-withholding-tax-guide",
    "/prc-board-exam-rating-calculator": "prc-board-exam-rating-guide",
    "/latin-honors-calculator": "philippine-latin-honors-guide",
    "/dost-scholarship-stipend-calculator": "dost-scholarship-stipend-guide",
    "/ched-scholarship-calculator": "ched-scholarship-guide",
    "/qpi-gpa-calculator": "qpi-gpa-calculator-guide",
    "/dfa-age-calculator": "dfa-age-requirements-guide",
    "/bill-splitter-calculator": "how-to-split-bills-properly",
    "/gsis-pension-calculator": "how-to-compute-gsis-pension",
    "/pagibig-affordability-calculator": "pagibig-housing-loan-affordability-guide"
}

for tool_path, slug in missing_blogs.items():
    filepath = f"src/content/blog/{slug}.mdx"
    if not os.path.exists(filepath):
        title = slug.replace("-", " ").title()
        content = f"""---
title: "{title}"
date: "2026-06-01"
excerpt: "Learn everything you need to know about this tool and how to maximize its benefits in the Philippines."
---

# {title}

This is a comprehensive guide on how to understand and compute the details for this tool. By using the calculator, you can ensure precision and ease in finding out the correct computations required under Philippine laws and standards.

## How it works

1. Enter your basic details.
2. The calculator automatically adjusts based on the current rates and regulations.
3. Review your results and export if necessary.
"""
        with open(filepath, "w") as f:
            f.write(content)

print("Generated missing blogs!")
