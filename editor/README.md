# `@secvisogram/editor`

`@secvisogram/editor` provides the `<secvisogram-editor>` custom element as a static asset tree.

## Install and host

Install the package, then expose the complete `dist/` directory as static files. Keep its contents and relative paths together; the bundle loads its chunks, workers, locale data, CVSS assets, and field-help Markdown from that tree.

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

When the asset tree is hosted on a different origin from the page, configure that host to allow cross-origin requests for the module workers (`editor.worker.js` and `json.worker.js`) and fetched assets such as locales and field-help Markdown. Public CDNs commonly permit these requests; self-hosted storage must provide suitable CORS headers.

## Embedded behavior

The host owns the document lifecycle, so the embedded editor restricts the features that would conflict with it:

- The tracking fields (`document.tracking.id`, the revision-history `date`, `legacy_version`, `number` and `summary`, and the generator engine `name` and `version`) are read-only. The host CMS owns their values.
- Revision-history entries can be neither added nor deleted.
- The export dialog does not show the "unsaved file" notice.
- **New** is not offered, neither as a button nor through its hotkey (`keyBindings.keyNew`, default `ctrl+o`). Load content through `doc` instead. If `doc` is omitted, the editor starts on its empty initial document. Opening files or URLs inside the editor is not available. The JSON tab and the form can still be used for editing.

See the [embedding contract](https://github.com/secvisogram/csaf-cms-frontend/blob/main/docs/embedding-contract.md) for the element's properties and events.
