---
name: create-skill
description: >-
  Guides through creating a new OpenCode-compatible skill with interactive
  interview, best-practice enforcement, and validation. Use when the user says
  "create a skill", "new skill", "build a skill", or wants to create an
  OpenCode SKILL.md file.
user-invocable: true
allowed-tools: AskFollowupQuestion, Task, Read, Write, Edit, Glob, Grep
---

# Create OpenCode Skill

Guide the user through creating a new OpenCode-compatible skill file. Gather requirements via interactive questions, generate a properly formatted `SKILL.md`, and place it in the correct location.

## Critical Rules

- Use the `AskFollowupQuestion` tool for ALL questions to the user. Never ask questions through regular text output.
- Text output is only for summaries and presenting results.

---

## Phase 1: Interview

Ask the following questions to gather requirements. Group related questions together using `AskFollowupQuestion`.

**Round 1 — Basics:**

1. **Skill name** — What should the skill be named? Use kebab-case (e.g. `code-review`, `deploy-check`).
2. **Purpose** — What does the skill do? Describe its main function in one sentence.
3. **User-invocable** — Should users be able to invoke this skill directly (e.g. via the skill dialog)?

**Round 2 — Details:**

4. **Variables** — Does the skill need user input via `$VARIABLE` placeholders (e.g. `$FILE_PATH`, `$BRANCH`)? If yes, which ones?
5. **Complexity** — How complex is the workflow? (simple single-phase / multi-phase / spawns subagents)
6. **Tools** — Which tools should the skill primarily use? (read-only / read+write / full access including bash)

**Round 3 — Location:**

7. **Location** — Where should the skill be created?
   - Project-level: `.agents/skills/<name>/SKILL.md` (available only in this project)
   - Global: `~/.config/opencode/skills/<name>/SKILL.md` (available in all projects)

---

## Phase 2: Summary and Confirmation

Present a summary of what will be created:

```
Skill name:      <name>
Description:     <derived from purpose>
User-invocable:  <yes/no>
Variables:       <list or "none">
Complexity:      <simple/multi-phase/complex>
Tools:           <tool set>
Location:        <path>
```

Ask the user to confirm before proceeding.

---

## Phase 3: Generate

Write the `SKILL.md` to the target path with:

1. **Frontmatter** (YAML block between `---` delimiters):
   - `name` — kebab-case skill name (required)
   - `description` — one or two sentences describing when and how to invoke the skill (required)
   - `user-invocable: true` if the user should be able to invoke it directly
   - `allowed-tools` — comma-separated list of tools the skill may use

2. **Body** — Clear, actionable instructions in Markdown:
   - Describe each phase of the workflow
   - Use `$VARIABLE` placeholders where user input is needed
   - Reference specific files or directories if relevant
   - Keep instructions precise and unambiguous — the model executing the skill has no additional context

**Example structure:**

```markdown
---
name: my-skill
description: >-
  Does X when the user asks to Y. Use when <trigger condition>.
user-invocable: true
allowed-tools: Read, Glob, Grep, Write, Edit
---

# My Skill

<Brief intro explaining what this skill accomplishes.>

## Phase 1 — <Phase name>

<Instructions for this phase.>

## Phase 2 — <Phase name>

<Instructions for this phase.>
```

---

## Phase 4: Present

After writing the file:

1. Show the generated `SKILL.md` contents.
2. Explain how to invoke the skill in OpenCode.
3. Confirm the file was written to the correct path.
