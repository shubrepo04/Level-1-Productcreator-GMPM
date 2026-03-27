Start the Research Assistant server, then call POST /api/research
with these two test questions:
Q1: 'Who competes with Figma for UI design tools?'
Q2: 'What are the pain points in B2B SaaS onboarding?'
For each response check:- Response is valid JSON- competitors field has 3+ items- pain_points field has 3+ items- follow_up field has 2+ items
Score each check PASS or FAIL.
Report total score X/8. Flag if below 6/8 — list which checks failed