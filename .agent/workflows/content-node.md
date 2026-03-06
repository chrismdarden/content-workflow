---
description: Execute a specific node in the Content Workflow via Implementation Plan.
---

# /content-node [node_name]

Use this workflow to initiate any node in the standardized content pipeline.

## Steps

1. **Read Current State**
   - Read `directives/workflow_state.json` to verify `current_node`.
   - Ensure `project_name` and `metadata` are populated.

2. **Model Verification**
   - **Remind User**: Explicitly ask the user in chat: "Please confirm you are using the correct model for this node (e.g., Gemini 1.5 Pro for Research)."
   - Wait for confirmation or proceed if the policy allows.

3. **Load Node Prompt**
   - Access the tailored prompt from `directives/prompts/[node_id]_[node_name].md`.

3. **Initialize Implementation Plan**
   - Create a new Implementation Plan in the brain directory.
   - **Goal**: Clear execution of the specific node.
   - **Proposed Changes**: Mock up the expected output (Research, Outline, or Draft) based on available context.

4. **Notify for Review**
   - Use `notify_user` to request review of the IP.
   - Do not proceed to the next node until the user provides an "LGTM" or explicit approval.

5. **Update State**
   - Upon approval, update `workflow_state.json` with the node output and increment `current_node`.
