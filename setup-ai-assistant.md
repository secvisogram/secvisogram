# Setup Claude Code

## Installation

Follow this guide to install claude:

### Windows

#### Prerequisites

- [Git for Windows](https://git-scm.com/downloads/win) (required)

#### Install

**PowerShell:**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Command Prompt:**

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Native installs **update automatically** in the background.

Add the following path to the PATH variable in your system variables as instructed by the installer: `C:\Users\<username>\.local\bin`

Verify:

```powershell
claude --version
```
### Linux

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

The installer places the `claude` binary in `~/.local/bin` (or similar) and adds it to your PATH automatically.
Native installs **update automatically** in the background.

Verify the installation:

```bash
claude --version
```

## Settings

There should be a directory `~/.claude`. If not, create one.
Create/Edit `settings.json` in this directory:
Be sure that `NODE_EXTRA_CA_CERTS` points to the current root ca of XX.

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://litellm.prod.ki-plattform.exxcellent.de/",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "eu/claude-4.6-opus",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "eu/claude-4.6-sonnet",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "eu/gpt-5.1",
    "CLAUDE_CODE_SUBAGENT_MODEL": "eu/claude-4.6-sonnet",
    "NODE_EXTRA_CA_CERTS": "C:\\Users\\xx\\certs\\xx_root_2024.crt"
  },
  "includeCoAuthoredBy": false,
  "permissions": {
    "allow": [
      "Bash(git:*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(grep:*)",
      "Bash(find:*)",
      "WebSearch",
      "WebFetch(domain:github.com)",
      "WebFetch(domain:docs.anthropic.com)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | bash:*)",
      "Bash(wget *)",
      "Bash(ssh *)",
      "Bash(scp *)",
      "Bash(sftp *)",
      "Read(**/.env)",
      "Read(**/secrets/**)",
      "Read(**/*.pem)",
      "Read(**/*.key)",
      "Read(**/.ssh/**)",
      "Read(**/id_rsa)"
    ],
    "disableBypassPermissionsMode": "disable",
    "_comment": "The 'disableBypassPermissionsMode' disables the --dangerously-skip-permissions command-line flag. You can customize the allow and deny lists as needed."
  },
  "statusLine": {
    "type": "command",
    "command": "branch=$(git branch --show-current 2>/dev/null || echo 'no-git'); echo \"$(basename $(pwd)) ($branch)\""
  },
  "disableAutoMode": "disable",
  "theme": "light",
  "_comment": "The 'disableAutoMode' setting prevents the model from using auto mode. Auto mode lets Claude execute without permission prompts.",
  "statsigFeatureGates": {
    "telemetry_disabled": true
  }
}

```

In the project you can find a directory `.claude`. Here, create a `settings.local.json`
of the following form:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://litellm.prod.ki-plattform.exxcellent.de/",
    "ANTHROPIC_AUTH_TOKEN": "...",
    "GITHUB_PERSONAL_ACCESS_TOKEN": "..."
  },
  "permissions": {
    "allow": []
  }
}
```

## MCP

Switch to directory `/mcp` and create a `.env` copying the content of the `.env.example`.
You need to get some API keys. If not described otherwise, these need to be set in the `.env` in the directory `mcp`.

### Context7

Go to https://context7.com/dashboard and create some API key.

### Github

Go to https://gitlab-ext.exxcellent.de/-/user_settings/personal_access_tokens?page=1&state=active&sort=expires_asc and
create a new personal access token. You need read & write access. This access token must be setup in
`.claude/settings.local.json`:

## Token Permissions

The token requires these GitHub permissions:
- `repo` — Full repository access
- `read:org` — Read organization data
- `read:user` — Read user profile
- `workflow` — Manage GitHub Actions (if using `actions` toolset)


```
"env": {
    "ANTHROPIC_BASE_URL": "...",
    "ANTHROPIC_AUTH_TOKEN": "...",
    "GITLAB_PERSONAL_ACCESS_TOKEN": "..."
  }
```

### Verify

On the first startup, you must export properties as env vars:

Windows:

```shell
$env:ANTHROPIC_AUTH_TOKEN = "your_token_here"
$env:GITLAB_PERSONAL_ACCESS_TOKEN = "gitlab personal access token"
```

Linux:

```shell
export ANTHROPIC_AUTH_TOKEN=<your-litellm-api-key>
export GITLAB_PERSONAL_ACCESS_TOKEN=<gitlab personal access token>
```

The command

```
claude mcp list
```

lists all (pending) mcp servers.

Start claude with the command

```
claude
```



