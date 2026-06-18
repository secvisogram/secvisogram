---
name: generate-agents-md
description: Analyze the project structure, tech stack, conventions, and OpenCode configuration to generate or fully regenerate a comprehensive AGENTS.md tailored to this codebase
license: MIT
compatibility: opencode
---

Generate an `AGENTS.md` file for this project. This file is the primary source of context for every OpenCode agent and sub-task that runs in this repository. A high-quality `AGENTS.md` dramatically improves the accuracy of AI-assisted development.

Thoroughly explore the repository and then write a complete, accurate `AGENTS.md` to the project root. If an `AGENTS.md` already exists, replace it entirely — do not append to stale content.

---

## Phase 1 — Explore the repository

Work through each of the following discovery steps. Use the available tools (file reads, directory listings, bash commands, MCP servers) to gather real data. Do not guess or invent details.

### 1.1 Repository structure
- List the top-level directory tree (2–3 levels deep).
- Identify whether this is a monorepo, multi-module project, or single-module project.
- Note the purpose of key top-level directories (e.g. `src/`, `packages/`, `apps/`, `infra/`, `tests/`, `docs/`).

### 1.2 Tech stack detection
Look for: `package.json`, `pom.xml`, `build.gradle`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `requirements.txt`, `Gemfile`, `composer.json`, `*.csproj`, `*.sln`, `Dockerfile`, `docker-compose.yml`, `.nvmrc`, `.python-version`, `*.tf` (Terraform), `sst.config.ts`, `angular.json`, `next.config.*`, `vite.config.*`, etc.

Determine:
- Primary programming language(s) and versions
- Key frameworks and libraries (e.g. Spring Boot, React, Django, Express)
- Build tool(s) (Maven, Gradle, npm, Bun, Cargo, etc.)
- Runtime environment (Node.js, JVM, Python, etc.)
- Containerization or cloud platform if present

### 1.3 How to run, test, and build
Check `package.json` scripts, `Makefile`, `Taskfile`, CI configuration files (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`), and `README.md` for commands. Extract the canonical commands for:
- **Install dependencies**
- **Run locally / start dev server**
- **Run tests** (unit, integration, e2e)
- **Build / compile**
- **Lint / format**
- **Deploy** (if applicable)

### 1.4 Code conventions and patterns
- Check for linter/formatter config: `.eslintrc*`, `prettier.config.*`, `checkstyle.xml`, `.editorconfig`, `ruff.toml`, `rustfmt.toml`, etc.
- Look for a `CONTRIBUTING.md`, `docs/contributing.md`, or similar.
- Identify naming conventions used in existing code (camelCase, snake_case, kebab-case for files/symbols).
- Note any architectural patterns in use (e.g. hexagonal architecture, feature-based structure, MVC, clean architecture).

### 1.5 OpenCode configuration
- Read `.agents/agents/*.md` — list each agent, its mode, and its purpose.
- Read `.agents/skills/*/SKILL.md` — list each skill name and its description.
- Read `opencode.json` — extract enabled MCP servers and any `instructions` entries.

### 1.6 Security and secrets handling
- Check `.gitignore` for patterns that indicate sensitive files.
- Look for `.env.example` or similar to understand what secrets are required.
- Note any existing permission rules in `opencode.json`.

---

## Phase 2 — Write AGENTS.md

Using only what you discovered above, write the complete `AGENTS.md`. Follow this structure exactly. Omit sections that are genuinely not applicable to this project; do not add placeholder or speculative content.

```markdown
# <Project Name>

<1–3 sentence description of what this project is and does.>

---

## Repository Structure

<Brief description of the top-level layout. Use a code block for the tree if it aids clarity.>

---

## Tech Stack

- **Language**: <language and version>
- **Framework**: <primary framework>
- **Build tool**: <tool>
- **Package manager**: <tool>
- **Runtime**: <e.g. Node.js 22, JVM 21, Python 3.12>
- <any other relevant entries>

---

## Development Commands

| Task | Command |
|------|---------|
| Install | `<command>` |
| Dev server | `<command>` |
| Test | `<command>` |
| Build | `<command>` |
| Lint | `<command>` |

---

## Code Conventions

- <Naming conventions for files, classes, functions, variables>
- <Import style (absolute vs. relative paths)>
- <Any project-specific architectural patterns>
- <Where shared/reusable code lives>
- <Where tests live and what naming convention they use>

---

## MCP Servers

<List only the servers that are actually configured and enabled in opencode.json.>

| Server | Purpose |
|--------|---------|
| `<name>` | <what it provides> |

---

## Agents

<List only the agents found in .agents/agents/.>

- **`<name>`** — <one-sentence description of when and why to use this agent>

---

## Skills

<List only the skills found in .agents/skills/.>

| Skill | Description |
|-------|-------------|
| `<name>` | <what it does> |

---

## Security Rules

- Never commit secrets, API keys, or credentials. Use environment variables.
- Never run destructive commands (`rm -rf`, `DROP TABLE`, `git push --force`) without explicit user confirmation.
- Check for OWASP Top 10 vulnerabilities in any code written or reviewed.
- <Any project-specific security rules discovered>

---

## Project-Specific Rules

<Rules derived from CONTRIBUTING.md, linter config, CI gates, or architectural decisions found during exploration. Only include rules with evidence — do not invent generic advice.>

- <Rule 1>
- <Rule 2>
```

---

## Phase 3 — Write the file

Write the completed `AGENTS.md` to the project root. After writing, briefly summarize what was discovered and what was written to the file.
