---
name: create-adr
description: Create an Architecture Decision Record (ADR) for the current project. Determines the next ADR number, drafts the document, and saves it. Usage: /create-adr <title>
---

Create an Architecture Decision Record (ADR) with the title: $ARGUMENTS

## Steps

1. **Find the ADR directory**:
   - Check for `docs/adr/`, `adr/`, `docs/decisions/`, or `docs/architecture/` directories
   - If none exists, create `docs/adr/`

2. **Determine the next number**:
   - List existing ADR files (pattern: `NNN-*.md` or `ADR-NNN-*.md`)
   - Use the next sequential number (zero-padded to 4 digits, e.g. `0005`)

3. **Gather context** (ask the user if not clear):
   - What problem or decision needs to be documented?
   - What options were considered?
   - What was decided and why?
   - What are the consequences (positive and negative)?

4. **Use the `architect` agent** to draft the ADR using the standard format:

```markdown
# ADR-{NNN}: {Title}

**Date**: {today's date}
**Status**: Proposed

## Context
{Problem statement and why a decision is needed}

## Decision
{What was decided}

## Rationale
{Why this option was chosen over alternatives}

## Consequences

### Positive
- ...

### Negative
- ...

### Risks
- ...

## Alternatives Considered
{Brief description of other options considered and why they were not chosen}
```

5. **Save the file** as `docs/adr/{NNN}-{kebab-case-title}.md`

6. **Confirm** the file path and offer to update an index file if one exists (`docs/adr/README.md` or `docs/adr/index.md`).

## Notes

- If the `confluence` MCP server is available, offer to also create a Confluence page in the team's architecture space.
- The status starts as "Proposed". It should be changed to "Accepted" after team review.
