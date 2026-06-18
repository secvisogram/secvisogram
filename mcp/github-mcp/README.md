# GitHub MCP Server

Official GitHub MCP Server from GitHub, providing GitHub API integration via Docker.

## Purpose

Enables AI assistants to interact with GitHub repositories, issues, pull requests, and GitHub Actions.

## Docker Configuration

**Image**: `ghcr.io/github/github-mcp-server`
**Port**: 3344 (internal: 8082)
**Authentication**: Personal Access Token via `Authorization: Bearer` header

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_PERSONAL_ACCESS_TOKEN` | Yes | GitHub Personal Access Token (classic or fine-grained) |
| `GITHUB_HOST` | No | Custom GitHub Enterprise host (leave empty for github.com) |
| `GITHUB_TOOLSETS` | No | Comma-separated list of toolsets to enable (default: all). Options: `repos`, `issues`, `pull_requests`, `actions`, `code_security`, `experiments` |
| `GITHUB_READ_ONLY` | No | Set to `true` to disable write operations (default: `false`) |

## Token Permissions

The token requires these GitHub permissions:
- `repo` — Full repository access
- `read:org` — Read organization data
- `read:user` — Read user profile
- `workflow` — Manage GitHub Actions (if using `actions` toolset)

## Available Toolsets

| Toolset | Tools |
|---------|-------|
| `repos` | Create/list/get/fork/delete repos, manage branches, commits, tags, releases |
| `issues` | Create/list/get/update/close issues, manage labels and assignees |
| `pull_requests` | Create/list/get/merge PRs, manage reviews and comments |
| `actions` | List/get/trigger/cancel workflow runs |
| `code_security` | List code scanning alerts and secret scanning alerts |
| `experiments` | Experimental features |

## Usage Examples

```
# List open issues
List all open issues in repository owner/repo

# Create a pull request
Create a PR from branch feature/xyz to main with title "Add feature XYZ"

# Check workflow runs
Show the latest workflow runs for the repository
```

## Troubleshooting

- **401 Unauthorized**: Check that `GITHUB_PERSONAL_ACCESS_TOKEN` is valid and not expired
- **403 Forbidden**: Token lacks required permissions — add `repo` scope
- **Container not starting**: Check that port 3344 is not in use: `docker ps -a`
