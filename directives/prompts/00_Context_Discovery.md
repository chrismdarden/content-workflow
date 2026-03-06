# Node 0: Context Discovery (Tailored for Content Workflow PoC)

Using the attached local context files and identified NotebookLM data, provide a complete client context extraction for the current task.

**CONTEXT SOURCES:**
- [Brand Voice Guide](file:///c:/Projects/Content/Workflow/directives/context_library/brand_voice_guide.md)
- [Standard Operating Procedures](file:///c:/Projects/Content/Workflow/directives/context_library/standard_operating_procedures.md)
- NotebookLM: `Local U Global` (ID: `9534231f-e3fe-4583-b879-d97d0a7f515f`)

**EXTRACTION REQUIREMENTS:**

1. BRANDING & VOICE
- Brand voice: list every tone descriptor from the placeholder guide.
- Writing style: extraction of specific SOP drafting rules (H1/H2 hierarchy, sentence length).
- Vocabulary: identifying specific vertical-relevant terms.

2. SERVICES & SUBJECT MATTER
- Specifically identify the "Big Idea" and "Key Takeaways" from the most recent NotebookLM slide deck (`2026 Trust First Strategy`).
- Map these takeaways to the project goals in `directives/workflow_state.json`.

3. STATE VERIFICATION
- Confirm `current_node` in [workflow_state.json](file:///c:/Projects/Content/Workflow/directives/workflow_state.json) is "research".
- Flag any missing inputs required for Node 1.

Return each section fully before moving to the next.
