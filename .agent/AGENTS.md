# AGENTS.md — Content Workflow Project

> **Canonical global rules live at:** `C:\Users\Chris\.gemini\AGENTS.md`
> This file extends those rules with project-specific context.

## Project Identity
- **Name**: Content Workflow
- **Repo**: `https://github.com/chrismdarden/content-workflow.git`
- **Branch**: `master`
- **Workspace URI**: `c:\Projects\Content Workflow`

## Project Purpose
A PoC content pipeline using multi-model AI (Gemini + Claude) to research, outline, draft, and QA content pieces. NotebookLM MCP serves as the knowledge retrieval layer (semantic RAG substitute).

## Folder Structure
- `directives/` — `PROJECT_CONTEXT.md`, `PROJECT_LOG.md` (persistent state)
- `execution/` — Python/JS scripts and automation tools
- `artifacts/` — Session walkthroughs, deliverables
- `.agent/` — Agent rules, skills, workflows (this folder)

## Secrets
- **No local `.env`**. Resolve via global pointer: `C:\Users\Chris\.gemini\.env - Shortcut.lnk`
- Source of truth: `G:\My Drive\Work Files\G Google Antigravity\.env`

## External Assets
- **Prompt Library**: `Prompt Library.lnk` → Google Drive (git-ignored)
- Run `execution\setup_workspace.ps1` on a new machine to restore shortcuts.

## Key Directives
See `directives/PROJECT_CONTEXT.md` for architecture and `directives/PROJECT_LOG.md` for session history.
