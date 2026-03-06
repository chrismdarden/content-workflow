# Node 3: QA Review & Export (Tailored for Content Workflow PoC)

Perform the final QA check on the draft to ensure readiness for export.

**QA CHECKS:**
1. **AI-ISMS**: Identify overused filler phrases and direct-to-reader AI "pleasantries".
2. **SEO**: Keyword presence in H1/H2 and natural term variety.
3. **E-E-A-T**: Presence of specific "Strategic Shifts" from the 2026 conference data.
4. **READABILITY**: Grade against the [Drafting SOP](file:///c:/Projects/Content/Workflow/directives/context_library/standard_operating_procedures.md).

**OUTPUT:**
- **PASS/FAIL** status.
- Grading table (1-10) for AI-Isms, SEO, E-E-A-T, and Quality.
- If PASS: Return final HTML-ready markdown.
- **STATE UPDATE**: Provide JSON for the `qa` node in [workflow_state.json](file:///c:/Projects/Content/Workflow/directives/workflow_state.json).
