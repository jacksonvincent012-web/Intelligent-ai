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
<img width="1920" height="1032" alt="Screenshot 2026-06-27 000719" src="https://github.com/user-attachments/assets/ca80530d-aec3-4edb-aa57-eca2dcc9b654" />

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
---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `V_MIND_API_KEY` | API key for OpenRouter/OpenAI cloud models |
| `V_MIND_API_BASE` | Custom API base URL (default: OpenRouter) |
| `V_MIND_SHARE_TOKEN` | Optional auth token for sharing over network |
| `OPENAI_API_KEY` | Alternative API key (fallback) |

---


```

---

## License

MIT
