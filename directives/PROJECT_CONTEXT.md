# PROJECT CONTEXT: Content Research & Draft

## High-Level Architecture
- Anti-Gravity 3-Layer Framework
- Focus: Researching and drafting content using automated pipelines.

```mermaid
flowchart TD
    subgraph User_HITL [Swimlane: Human-in-the-Loop]
        U1[Gate: Approve Research]
        U2[Gate: Edit/Approve Outline]
        U3[Gate: Review Draft]
        U4[Gate: Final Sign-off]
    end

    subgraph Process [Swimlane: LangGraph Compute Nodes]
        N1[Gemini 1.5: Research Node]
        N2[Claude 3.5: Outlining Node]
        N3[Claude 3.5: Drafting Node]
        N4[Gemini 1.5: QA / Validator Node]
    end

    subgraph Data_Infra [Swimlane: State & Data Infrastructure]
        DB1[(Pinecone Vector DB)]
        STATE{{Shared State Object}}
        DB2[(Redis Checkpointer)]
    end

    %% Main Process Flow with Hard Stops
    N1 --> U1
    U1 -- "Resume Graph" --> N2
    N2 --> U2
    U2 -- "Resume Graph" --> N3
    N3 --> N4
    N4 -- "Quality Fail (Loop)" --> N3
    N4 -- "Pass" --> U3
    U3 -- "Proceed" --> U4

    %% Data & Memory Connections
    N1 <-->|"1. Search Vectors"| DB1
    N1 -->|"2. Inject Findings"| STATE
    
    N2 <-->|"3. Read Findings / Write Outline"| STATE
    N3 <-->|"4. Read Outline / Write Draft"| STATE
    N4 <-->|"5. Read Draft / Write QA Score"| STATE
    
    %% Infrastructure Backup
    STATE <-->|"Continuous Save/Load"| DB2
    
    %% HITL direct interaction with State
    U1 -.->|"Manual State Overwrite"| STATE
    U2 -.->|"Manual State Overwrite"| STATE
    U3 -.->|"Manual State Overwrite"| STATE
```

## Tech Stack
- [Frameworks/Tools identified in project]

## Persistent State & Status
- **Current Goal**: Setting up standardized project structure and directives.
- **Status**: Active development.
- **Verified Scopes**: N/A

## Machine Setup
When cloning this project on a new device, run the following to restore external asset access:
- **Run Setup Script**: `powershell execution/setup_workspace.ps1`
- **Goal**: Reconstructs `.lnk` pointers to local Google Drive paths and verifies agent configuration.

## Standard Patterns
- Modular directive/execution separation.
