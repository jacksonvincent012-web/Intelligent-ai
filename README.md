# V-Mind AI

**A super-intelligent AI agent that controls your PC, writes code, searches the web, and manages projects — all through an elegant chat interface.**
<img width="1920" height="1032" alt="Screenshot 2026-06-27 140343" src="https://github.com/user-attachments/assets/84d8f0fc-4c55-4259-ab00-beefd79d296a" />


V-Mind is a production-grade desktop AI agent built with a Python/FastAPI backend and a feature-rich browser-based frontend. It combines local LLM inference (Ollama) with cloud model access (OpenRouterI) to deliver autonomous task execution across files, git, shell, system control, web search, code analysis, and more.
---
https://vm-deploy.vercel.app/
## Features

**AI Core**
- Multi-backend LLM (Ollama local + OpenRouter/OpenAI cloud)
- Streaming token-by-token responses
- Two interaction modes: Vibe (conversational) and Spec (plan-then-execute)
- Tool-calling loop with chain-of-thought reasoning
- Multi-session management with persistent history

**Development & Code**
- Full git integration: status, diff, commit, push, pull, branches, clone
- Project indexing with semantic code search (embedding-based)
- Regex grep via ripgrep across codebases
- Auto-fix loop: lint → fix → test, iteratively until clean
- Code viewer with syntax highlighting and line numbers
- AI-powered project generation from natural language descriptions

**System & PC Control**
- Launch applications, manage processes, kill tasks
- Mouse control, keyboard simulation, screenshot capture
- Window management (list, focus, switch)
- System monitoring: CPU, RAM, disk, battery, network
- Volume control, clipboard read/write, toast notifications
- Power commands: shutdown, restart, sleep, hibernate, lock

**File Operations**
- Read, write, edit files with auto-create directories
- Multi-format document reader: PDF, DOCX, XLSX, CSV
- File upload with 30+ supported extensions
- File tree browser with expandable directory navigation

**Web & Knowledge**
- Web search (text, images, videos, news via DuckDuckGo)
- Page fetching with HTML-to-text extraction
- Wikipedia knowledge panel integration
- Autocomplete suggestions for search-as-you-type
- Built-in web browser with iframe and text-rendering fallback
<img width="960" height="1032" alt="Screenshot 2026-06-18 174307" src="https://github.com/user-attachments/assets/ecc0b695-0b44-4a5d-bf4f-e0586ef6feba" />
  the testing stage

**The Layer**
- Integrated Kali Linux command reference
- 20+ penetration testing tools across 6 categories
- Interactive terminal UI with simulated Kali environment
- Real tool execution when available

**Library**
- Curated reference guides (Python, Git, Linux, Algorithms)
- Book reader with markdown rendering
- Web catalog search with cover art from Open Library
- Upload and download books directly

**Monitoring**
- Resource monitoring: CPU/RAM spike detection
- File system watcher (create, modify, delete)
- Proactive browser notifications for system events
- Vision-based screen monitoring with AI analysis
- Live system events feed

**Voice & Accessibility**
- Speech-to-text via browser SpeechRecognition API
- Text-to-speech via Windows TTS and browser SpeechSynthesis
- Hands-free interaction with voice commands

<img width="469" height="186" alt="image" src="https://github.com/user-attachments/assets/8e534a12-2541-47b9-909f-cb20270b4547" />

**Privacy & Anti-AI-Detection**
- Local AI-score detector (perplexity, burstiness, repetition, flatness) — no API, no network.
- **Humanize (H)** button rewrites any answer until the measured AI score drops to **≤3%**.
- **Privacy mode** redacts text (default 5%) and strips PII before it leaves your PC.

**Whiteboard**
- Hand-written overlay that types the answer word-by-word with a pen cursor.
- Global pen (✎) button replays the last answer on the whiteboard anytime.
---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend (HTML/CSS/JS)         │
│  ┌───────┐ ┌──────┐ ┌──────┐ ┌──────────┐      │
│  │ Chat  │ │Layer │ │Browser│ │Settings  │      │
│  └───┬───┘ └──┬───┘ └──┬───┘ └──────────┘      │
│  ┌───┴───┐ ┌──┴──┐ ┌──┴───┐ ┌───┐ ┌──────┐    │
│  │Files  │ │ Git │ │Search│ │Lib│ │System │    │
│  └───┬───┘ └──┬──┘ └──┬───┘ └───┘ └──────┘    │
└──────┼─────────┼───────┼────────────────────────┘
       │         │       │
       ▲ HTTP/SSE ▲      │
       │         │       │
┌──────┼─────────┼───────┼────────────────────────┐
│      ▼         ▼       ▼                        │
│            FastAPI Web Server (uvicorn)          │
│  ┌──────────┐ ┌──────────┐ ┌───────────────┐   │
│  │ Agent    │ │ Tools    │ │ System Monitor │   │
│  │ (LLM     │ │ (26+)    │ │ (File, Proc,  │   │
│  │  Router) │ │          │ │  Clipboard)   │   │
│  └────┬─────┘ └──────────┘ └───────────────┘   │
│       │                                          │
│  ┌────▼─────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Ollama   │  │OpenRouter│  │ DuckDuckGo   │  │
│  │ (Local)  │  │ (Cloud)  │  │ / Wikipedia  │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
--

---


```
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/ae48c867-0d28-4c3a-9335-318c230c10ab" />

AM SORRY NO CODE FOR U TO CLONE😁
<img width="198" height="102" alt="Screenshot 2026-07-17 112600" src="https://github.com/user-attachments/assets/39df02fe-e8e1-4ce5-b1e8-85996e8d7408" />


---

## Distribution

- `V-Mind-Setup.zip` bundles the compiled `V-Mind.exe` + `install.ps1` + `update.ps1`. No source included.
- Run `install.ps1` (elevated) to install to `C:\Program Files\V-Mind` with a Start Menu shortcut.
- Auto-starts Ollama, auto-restarts the server if it crashes, falls back to the browser if the window fails.

---

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
