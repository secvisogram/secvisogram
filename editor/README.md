# `@secvisogram/editor`

`@secvisogram/editor` provides the `<secvisogram-editor>` custom element as a static asset tree.

## Install and host

Install the package, then expose the complete `dist/` directory as static files. Keep its contents and relative paths together; the bundle loads its chunks, workers, locale data, and CVSS assets from that tree.

```sh
npm install @secvisogram/editor
```

For example, configure your web server to expose `node_modules/@secvisogram/editor/dist/` at `https://static.example.com/secvisogram-editor/`, then use:

```html
<script
  type="module"
  src="https://static.example.com/secvisogram-editor/secvisogram-editor.js"
></script>
<secvisogram-editor></secvisogram-editor>
```

The same layout works at a nested base path. Serve the page over HTTP(S); `file://` is not supported. The editor script must be the last script with an absolute `http(s)` URL in the document when it evaluates, because Webpack uses that script URL to locate the asset tree.

When the asset tree is hosted on a different origin from the page, configure that host to allow cross-origin requests for the module workers (`editor.worker.js` and `json.worker.js`). Public CDNs commonly permit these requests; self-hosted storage must provide suitable CORS headers.

See the [embedding contract](https://github.com/secvisogram/secvisogram/blob/main/scripts/concepts/csaf-cms-frontend/CONCEPT.md#3-embedding-contract) for the element's properties and events.
