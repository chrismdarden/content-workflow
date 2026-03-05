# Antigravity — Workspace Agent Rules

> **This is the Antigravity-specific configuration file.**
> Canonical rules for all models are in `C:\Users\Chris\.gemini\AGENTS.md`.
> This file extends those rules with Antigravity-specific behavior.

## Antigravity-Specific Behavior

- **Workspace Registration**: Only the repo root should be registered as a workspace URI in Antigravity Settings. Never register sub-folders.
- **Conversation Scoping**: Conversations are scoped to the registered workspace URI. Keeping one root URI ensures all chat history stays accessible after restarts.
- **Task Artifacts**: All session artifacts (`task.md`, `walkthrough.md`, `implementation_plan.md`) are written to the Antigravity brain directory automatically.
- **Skills Discovery**: Antigravity reads skills from `.agent/skills/`. Legacy skills in `00_GLOBAL/.agent/skills/` still function for existing projects during the transition period.
- **Workflow Discovery**: Antigravity reads workflows from `.agent/workflows/`. Use `/workflow-name` slash commands to invoke.

## Refer to Canonical Rules

See [AGENTS.md](file:///C:/Users/Chris/.gemini/AGENTS.md) for the full instruction set including workspace structure, the 3-layer architecture, operating principles, and migration status.
