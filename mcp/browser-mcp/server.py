#!/usr/bin/env python3
"""
Browser Agent MCP Server
Provides browser automation tools via HTTP using Playwright
"""
import asyncio
import base64
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from mcp.server import Server
from mcp.types import TextContent, ImageContent, Tool
from playwright.async_api import async_playwright, Browser, BrowserContext, Page
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global browser state
browser_instance: Optional[Browser] = None
browser_context: Optional[BrowserContext] = None
current_page: Optional[Page] = None
playwright_instance = None
console_logs: list = []


async def initialize_browser():
    """Initialize Playwright browser instance"""
    global browser_instance, browser_context, current_page, playwright_instance

    if browser_instance is None:
        logger.info("Initializing Playwright browser...")
        playwright_instance = await async_playwright().start()
        # Resolve localhost to the Docker gateway so the browser can reach
        # services exposed on the host (e.g. Keycloak on localhost:8080).
        import os
        host_rules = os.getenv("CHROMIUM_HOST_RULES", "")
        launch_args = []
        if host_rules:
            launch_args.append(f"--host-resolver-rules={host_rules}")
        browser_instance = await playwright_instance.chromium.launch(
            headless=True,
            args=launch_args
        )
        browser_context = await browser_instance.new_context(ignore_https_errors=True)
        current_page = await browser_context.new_page()
        # Capture console logs
        current_page.on("console", lambda msg: console_logs.append({
            "type": msg.type,
            "text": msg.text,
            "url": msg.location.get("url", "") if hasattr(msg, "location") and msg.location else ""
        }))
        current_page.set_default_timeout(30000)
        logger.info("Browser initialized successfully")


async def cleanup_browser():
    """Cleanup browser resources"""
    global browser_instance, browser_context, current_page, playwright_instance

    if current_page:
        await current_page.close()
        current_page = None
    if browser_context:
        await browser_context.close()
        browser_context = None
    if browser_instance:
        await browser_instance.close()
        browser_instance = None
    if playwright_instance:
        await playwright_instance.stop()
        playwright_instance = None
    logger.info("Browser cleaned up")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan"""
    await initialize_browser()
    yield
    await cleanup_browser()


# Create FastAPI app
app = FastAPI(lifespan=lifespan)

# Create MCP server
mcp_server = Server("browser-agent")


@mcp_server.list_tools()
async def list_tools() -> list[Tool]:
    """List available browser automation tools"""
    return [
        Tool(
            name="navigate",
            description="Navigate to a specific URL",
            inputSchema={
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "description": "The URL to navigate to"
                    },
                    "timeout": {
                        "type": "number",
                        "description": "Additional wait time in milliseconds after network idle (default: 5000)"
                    }
                },
                "required": ["url"]
            }
        ),
        Tool(
            name="screenshot",
            description="Take a screenshot of the current page and return as image",
            inputSchema={
                "type": "object",
                "properties": {
                    "full_page": {
                        "type": "boolean",
                        "description": "Take full page screenshot (default: false, viewport only for smaller size)"
                    }
                },
                "required": []
            }
        ),
        Tool(
            name="click",
            description="Click an element on the page using a CSS selector",
            inputSchema={
                "type": "object",
                "properties": {
                    "selector": {
                        "type": "string",
                        "description": "CSS selector for the element to click"
                    },
                    "force": {
                        "type": "boolean",
                        "description": "Force click even if element is not visible (default: false). Use sparingly - prefer hover + click for proper user simulation."
                    }
                },
                "required": ["selector"]
            }
        ),
        Tool(
            name="hover",
            description="Hover over an element to trigger hover states (like showing hidden buttons)",
            inputSchema={
                "type": "object",
                "properties": {
                    "selector": {
                        "type": "string",
                        "description": "CSS selector for the element to hover over"
                    }
                },
                "required": ["selector"]
            }
        ),
        Tool(
            name="fill",
            description="Fill out a form field with a value",
            inputSchema={
                "type": "object",
                "properties": {
                    "selector": {
                        "type": "string",
                        "description": "CSS selector for the input field"
                    },
                    "value": {
                        "type": "string",
                        "description": "Value to fill into the field"
                    }
                },
                "required": ["selector", "value"]
            }
        ),
        Tool(
            name="get_content",
            description="Get the text content of the current page",
            inputSchema={
                "type": "object",
                "properties": {},
                "required": []
            }
        ),
        Tool(
            name="get_console_logs",
            description="Get browser console logs (errors, warnings, info). Optionally filter by type and clear after reading.",
            inputSchema={
                "type": "object",
                "properties": {
                    "level": {
                        "type": "string",
                        "description": "Filter by log level: 'error', 'warning', 'info', 'log', or 'all' (default: 'all')"
                    },
                    "clear": {
                        "type": "boolean",
                        "description": "Clear logs after reading (default: true)"
                    }
                },
                "required": []
            }
        ),
        Tool(
            name="get_html",
            description="Get the HTML content of a specific element or the entire page",
            inputSchema={
                "type": "object",
                "properties": {
                    "selector": {
                        "type": "string",
                        "description": "CSS selector for the element (optional, omit to get full page HTML)"
                    }
                },
                "required": []
            }
        )
    ]


@mcp_server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Handle tool calls"""
    global current_page

    if current_page is None:
        await initialize_browser()

    try:
        if name == "navigate":
            url = arguments["url"]
            timeout = arguments.get("timeout", 5000)  # Default 5 seconds additional wait
            logger.info(f"Navigating to: {url}")
            await current_page.goto(url, wait_until="domcontentloaded")
            # Additional wait for SPAs to load data
            if timeout > 0:
                await current_page.wait_for_timeout(timeout)
            return [TextContent(
                type="text",
                text=f"Successfully navigated to {url}"
            )]

        elif name == "screenshot":
            full_page = arguments.get("full_page", False)
            logger.info(f"Taking screenshot (full_page={full_page})")
            screenshot_bytes = await current_page.screenshot(full_page=full_page)
            screenshot_base64 = base64.b64encode(screenshot_bytes).decode('utf-8')
            return [ImageContent(
                type="image",
                data=screenshot_base64,
                mimeType="image/png"
            )]

        elif name == "click":
            selector = arguments["selector"]
            force = arguments.get("force", False)
            logger.info(f"Clicking element: {selector} (force={force})")
            await current_page.click(selector, force=force)
            return [TextContent(
                type="text",
                text=f"Successfully clicked element: {selector}"
            )]

        elif name == "hover":
            selector = arguments["selector"]
            logger.info(f"Hovering over element: {selector}")
            await current_page.hover(selector)
            return [TextContent(
                type="text",
                text=f"Successfully hovered over element: {selector}"
            )]

        elif name == "fill":
            selector = arguments["selector"]
            value = arguments["value"]
            logger.info(f"Filling field {selector} with value")
            await current_page.fill(selector, value)
            return [TextContent(
                type="text",
                text=f"Successfully filled field: {selector}"
            )]

        elif name == "get_content":
            logger.info("Getting page content")
            # Get inner text for better readability
            text_content = await current_page.evaluate("document.body.innerText")
            return [TextContent(
                type="text",
                text=text_content
            )]

        elif name == "get_console_logs":
            level = arguments.get("level", "all")
            clear = arguments.get("clear", True)
            logger.info(f"Getting console logs (level={level}, clear={clear})")
            if level == "all":
                filtered = console_logs[:]
            else:
                filtered = [l for l in console_logs if l["type"] == level]
            if clear:
                console_logs.clear()
            if not filtered:
                return [TextContent(type="text", text="No console logs captured.")]
            lines = [f"[{l['type']}] {l['text']}" for l in filtered]
            return [TextContent(type="text", text="\n".join(lines))]

        elif name == "get_html":
            selector = arguments.get("selector")
            if selector:
                logger.info(f"Getting HTML for selector: {selector}")
                html_content = await current_page.evaluate(
                    f"document.querySelector('{selector}')?.outerHTML || 'Element not found'"
                )
            else:
                logger.info("Getting full page HTML")
                html_content = await current_page.content()
            return [TextContent(
                type="text",
                text=html_content
            )]

        else:
            raise ValueError(f"Unknown tool: {name}")

    except Exception as e:
        logger.error(f"Error executing tool {name}: {str(e)}")
        return [TextContent(
            type="text",
            text=f"Error: {str(e)}"
        )]


@app.post("/mcp")
async def handle_mcp(request: Request):
    """Handle MCP protocol messages via HTTP"""
    body = await request.json()
    logger.info(f"Received MCP request: {body.get('method', 'unknown')}")

    # Create a simple in-memory session for HTTP transport
    async def read_message():
        return body

    results = []
    async def write_message(msg):
        results.append(msg)

    # Handle the request based on method
    method = body.get("method")

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": body.get("id"),
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {}
                },
                "serverInfo": {
                    "name": "browser-agent",
                    "version": "1.0.0"
                }
            }
        }

    elif method == "tools/list":
        tools = await list_tools()
        return {
            "jsonrpc": "2.0",
            "id": body.get("id"),
            "result": {
                "tools": [
                    {
                        "name": tool.name,
                        "description": tool.description,
                        "inputSchema": tool.inputSchema
                    }
                    for tool in tools
                ]
            }
        }

    elif method == "tools/call":
        params = body.get("params", {})
        tool_name = params.get("name")
        arguments = params.get("arguments", {})

        result = await call_tool(tool_name, arguments)

        # Serialize content based on type
        content_list = []
        for content in result:
            if content.type == "image":
                content_list.append({
                    "type": "image",
                    "data": content.data,
                    "mimeType": content.mimeType
                })
            else:
                content_list.append({
                    "type": content.type,
                    "text": content.text
                })

        return {
            "jsonrpc": "2.0",
            "id": body.get("id"),
            "result": {
                "content": content_list
            }
        }

    else:
        return {
            "jsonrpc": "2.0",
            "id": body.get("id"),
            "error": {
                "code": -32601,
                "message": f"Method not found: {method}"
            }
        }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "browser_initialized": browser_instance is not None}


if __name__ == "__main__":
    import uvicorn
    import os

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "3002"))

    logger.info(f"Starting Browser Agent MCP Server on {host}:{port}")
    uvicorn.run(app, host=host, port=port)