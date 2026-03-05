import os
from dotenv import load_dotenv
from pathlib import Path

def load_global_config():
    """
    Loads environment variables from 00_GLOBAL/.env first, 
    then overrides with local .env if present.
    """
    # 1. Start from this file's directory
    # Expected location: workspace/01_PROJECTS/project_name/execution/config.py
    current_dir = Path(__file__).resolve().parent
    
    # 2. Find project root (one level up)
    project_root = current_dir.parent
    
    # 3. Find 00_GLOBAL (two levels up from project root)
    # 00_GLOBAL is sibling to 01_PROJECTS
    # workspace/01_PROJECTS/project_name -> workspace/01_PROJECTS -> workspace -> workspace/00_GLOBAL
    global_env_path = project_root.parent.parent / "00_GLOBAL" / ".env"

    if global_env_path.exists():
        # print(f"[config] Loading GLOBAL env from: {global_env_path}")
        load_dotenv(dotenv_path=global_env_path)
    else:
        print(f"[config] WARNING: Global env not found at {global_env_path}")

    # 4. Load Local .env (overrides global)
    local_env_path = project_root / ".env"
    if local_env_path.exists():
        # print(f"[config] Loading LOCAL env from: {local_env_path}")
        load_dotenv(dotenv_path=local_env_path, override=True)
    # else:
        # print("[config] No local .env found (using only global/defaults)")

if __name__ == "__main__":
    import sys
    import io
    if sys.stdout.encoding != 'utf-8':
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    load_global_config()
    # print("--- Global Config Loaded ---")
