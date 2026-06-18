# Chrome DevTools MCP

Chrome DevTools MCP provides deep browser automation via the Chrome DevTools Protocol — beyond standard Playwright navigation: performance profiling, network inspection, console access, and device emulation.

## Type

**stdio (npx)** — no Docker container needed. Runs on-demand via npx.

## Installation

No installation required. The server starts automatically via npx when your AI client connects.

**Prerequisite**: Chrome or Chromium must be installed on the system and accessible in PATH, or launched separately on a known debugging port.

## Client Configuration

### Claude Desktop / Claude Code (`.mcp.json`)

```json
"chrome-devtools": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "chrome-devtools-mcp@latest", "--no-usage-statistics"]
}
```

### Opencode (`opencode.json`)

```json
"chrome-devtools": {
  "type": "local",
  "command": ["npx", "-y", "chrome-devtools-mcp@latest", "--no-usage-statistics"]
}
```

### GitHub Copilot VS Code (`mcp.json`)

```json
"chrome-devtools": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "chrome-devtools-mcp@latest", "--no-usage-statistics"]
}
```

## Environment Variables

No environment variables required.

## Available Tools

| Tool | Description |
|------|-------------|
| `navigate` | Navigate to a URL |
| `screenshot` | Take a full-page or viewport screenshot |
| `click` | Click on a page element |
| `hover` | Hover over a page element |
| `fill` | Fill an input field |
| `get_content` | Extract text content from the page |
| `get_html` | Get the full HTML source |
| `get_console_messages` | Retrieve browser console output |
| `get_network_requests` | Inspect network requests and responses |
| `performance_start_trace` | Start a performance trace |
| `performance_stop_trace` | Stop trace and retrieve results |
| `performance_analyze_insight` | AI-powered performance analysis |
| `emulate` | Emulate a device (mobile, tablet, etc.) |
| `evaluate_script` | Execute arbitrary JavaScript in the page |
| `lighthouse_audit` | Run a Lighthouse audit on a URL |
| `take_memory_snapshot` | Capture a heap memory snapshot |

## Comparison with Browser MCP

| Feature | Browser MCP (port 3336) | Chrome DevTools MCP |
|---------|------------------------|---------------------|
| Type | HTTP/Docker | stdio/npx |
| Navigation & interaction | Yes | Yes |
| Screenshots | Yes | Yes |
| Console logs | Yes | Yes |
| Network inspection | No | Yes |
| Performance traces | No | Yes |
| Lighthouse audits | No | Yes |
| Memory snapshots | No | Yes |
| Device emulation | No | Yes |
| JavaScript execution | No | Yes |

Use **Browser MCP** for standard web automation. Use **Chrome DevTools MCP** when you need deep DevTools access (performance, network, memory, emulation).

## Troubleshooting

- **Chrome not found**: Install Chrome or Chromium and ensure it is on the system PATH
- **Connection refused**: The server may need to launch Chrome with `--remote-debugging-port=9222`
- **Timeout errors**: Some operations (performance traces, Lighthouse) take longer — these are expected

## References

- [GitHub: ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [npm: chrome-devtools-mcp](https://www.npmjs.com/package/chrome-devtools-mcp)