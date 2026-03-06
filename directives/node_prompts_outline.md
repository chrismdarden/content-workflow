# Content Workflow Node Prompts (Phase 1 Outline)

## Node 1: Research (Gemini)
**Goal**: Identify key topics and sources.
**Input**: Shared State (metadata).
**Prompt Snippet**: "Analyze the target audience and keywords in `workflow_state.json`. Perform web research to find 3-5 high-authority sources. Output a research report in Markdown."

## Node 2: Outline (Claude)
**Goal**: Structure the content.
**Input**: Research Report + Brand Voice Guide.
**Prompt Snippet**: "Using the research report and the `brand_voice_guide.md`, create a detailed content outline with H1-H3 headers. Ensure alignment with the target audience."

## Node 3: Drafting (Claude)
**Goal**: Write the full content.
**Input**: Outline + SOP + Brand Voice Guide.
**Prompt Snippet**: "Write the full article based on the provided outline. Apply the rules in `brand_voice_guide.md` and follow the `standard_operating_procedures.md`. Inject specific branding nuances provided in local context."

## Node 4: QA (Gemini)
**Goal**: Verify quality and alignment.
**Input**: Draft + SOP + Original Requirements.
**Prompt Snippet**: "Review the draft against the quality checklist in `standard_operating_procedures.md`. Verify keyword density and brand voice alignment. Suggest 3 specific improvements."
