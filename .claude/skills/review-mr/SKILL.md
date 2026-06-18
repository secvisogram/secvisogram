---
name: review-mr
description: Review a GitLab merge request. Fetches the MR diff, description, and linked issues, then runs a structured code review. Usage: /review-mr <MR_URL_or_ID>
---

Review the GitLab merge request specified in the arguments: $ARGUMENTS

## Steps

1. **Fetch MR details** using the `gitlab` MCP server:
   - Get the MR title, description, labels, and target branch
   - Get the full diff / list of changed files
   - Get any linked issues or related MRs
   - Get any existing review comments

2. **Understand the context**:
   - What is the purpose of this MR? (from description and linked issue)
   - What is the scope of changes? (files changed, lines added/removed)
   - Are there any special flags in the description (e.g. "skip tests", "hotfix")?

3. **Run the code review** using the `code-reviewer` agent:
   - Pass the diff and context to the agent
   - Focus on CRITICAL and HIGH severity issues first
   - Check for security issues, correctness bugs, and missing test coverage

4. **Check SonarQube** (if `sonarqube` MCP is available):
   - Look for any open issues in the changed files
   - Note if new code would introduce quality gate failures

5. **Produce the review** in the structured format from the `code-reviewer` agent.

6. **Optionally post the review** as a comment on the MR using the `gitlab` MCP server — ask the user before posting.

## Output Format

```
## MR Review: !<ID> — <Title>

**Target branch**: <branch>
**Files changed**: <N> files, +<added> -<removed> lines

### Summary
...

### Issues
...

### Checklist
...
```
