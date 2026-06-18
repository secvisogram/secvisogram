# Browser Agent MCP Server

A Model Context Protocol (MCP) server that provides browser automation capabilities using Playwright. This server enables AI assistants to interact with web applications through a persistent headless browser instance.

## Purpose

This MCP server allows AI assistants to:
- Navigate to web pages and wait for dynamic content to load
- Take screenshots of pages (viewport or full-page)
- Interact with page elements (click, hover, fill forms)
- Extract text and HTML content from pages
- Monitor browser console logs (errors, warnings, info)
- Automate user workflows for testing and validation

## Available Tools

### navigate
Navigate to a specific URL with optional timeout for SPA data loading.

**Parameters:**
- `url` (required): The URL to navigate to
- `timeout` (optional): Additional wait time in milliseconds after network idle (default: 5000)

### screenshot
Take a screenshot of the current page and return as image.

**Parameters:**
- `full_page` (optional): Take full page screenshot (default: false for viewport-only)

### click
Click an element on the page using a CSS selector.

**Parameters:**
- `selector` (required): CSS selector for the element to click
- `force` (optional): Force click even if element is not visible (default: false)

### hover
Hover over an element to trigger hover states (like showing hidden buttons).

**Parameters:**
- `selector` (required): CSS selector for the element to hover over

### fill
Fill out a form field with a value.

**Parameters:**
- `selector` (required): CSS selector for the input field
- `value` (required): Value to fill into the field

### get_content
Get the text content of the current page.

**Parameters:** None

### get_console_logs
Get browser console logs (errors, warnings, info).

**Parameters:**
- `level` (optional): Filter by log level: 'error', 'warning', 'info', 'log', or 'all' (default: 'all')
- `clear` (optional): Clear logs after reading (default: true)

### get_html
Get the HTML content of a specific element or the entire page.

**Parameters:**
- `selector` (optional): CSS selector for the element (omit to get full page HTML)

## Architecture

- **Framework**: FastAPI for HTTP server
- **Browser**: Playwright with Chromium (headless mode)
- **Protocol**: MCP over HTTP using JSON-RPC 2.0
- **Internal Port**: 3002
- **Default External Port**: 3336 (configurable via `BROWSER_MCP_PORT`)

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `HOST` | `0.0.0.0` | Server listen address |
| `PORT` | `3002` | Server listen port (internal) |
| `BROWSER_MCP_PORT` | `3336` | External port mapping (docker-compose) |
| `BROWSER_CHROMIUM_HOST_RULES` | _(empty)_ | Chromium `--host-resolver-rules` flag value |

### `BROWSER_CHROMIUM_HOST_RULES`

This variable controls how Chromium resolves hostnames inside the container. It maps directly to Chromium's `--host-resolver-rules` launch flag.

**When to use it:**
- When the app under test relies on hostnames that resolve differently inside Docker vs. on the host
- Commonly needed when authentication services (Keycloak, etc.) run in Docker

**Examples:**

| Scenario | Value |
|----------|-------|
| App runs locally, no Docker networking needed | _(leave empty)_ |
| Keycloak in Docker network, app redirects to `localhost` | `MAP localhost keycloak` |
| Custom auth server in Docker | `MAP auth.myapp.local my-auth-container` |
| Multiple host mappings | `MAP localhost keycloak, MAP api.local api-server` |

## Configuration

### Standalone (no Docker network needed)

For apps running on the host machine (accessible via `host.docker.internal` or `localhost`):

```yaml
# .env
BROWSER_CHROMIUM_HOST_RULES=
```

No `docker-compose.override.yml` needed.

### With Docker network (e.g. Keycloak)

When the browser needs to reach services in another Docker Compose network, create a `docker-compose.override.yml`:

```yaml
# docker-compose.override.yml
services:
  browser-mcp:
    networks:
      - my_project_default

networks:
  my_project_default:
    external: true
```

And set the host rules in `.env`:
```env
BROWSER_CHROMIUM_HOST_RULES=MAP localhost keycloak
```

### MCP Client Configuration

In your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "browser": {
      "type": "http",
      "url": "http://localhost:3336/mcp"
    }
  }
}
```

## Docker Commands

Build and start:
```bash
docker-compose build browser-mcp
docker-compose up -d browser-mcp
```

View logs:
```bash
docker-compose logs -f browser-mcp
```

Restart:
```bash
docker-compose restart browser-mcp
```

## Troubleshooting

### Timeout Issues
- Default timeout is 30 seconds
- Use `get_html` to inspect actual DOM structure instead of guessing selectors
- For hover-triggered elements, use `hover` first, then `click`
- Use `force: true` on click only when necessary

### Connection Refused
- Ensure the dev server listens on `0.0.0.0`, not `127.0.0.1`
- If running in Docker without `network_mode: host`, use `host.docker.internal` or the correct container hostname
- Verify the container is running: `docker ps | grep browser-mcp`

### Authentication Redirects Fail
- If the app redirects to an auth server running in Docker (e.g. Keycloak), set `BROWSER_CHROMIUM_HOST_RULES` to map the hostname
- Ensure the browser-mcp container is on the same Docker network as the auth server (via `docker-compose.override.yml`)

### Screenshot Token Overflow
- Use viewport-only screenshots (default) instead of full-page

## Health Check

GET `/health` - Returns server health status and browser initialization state
