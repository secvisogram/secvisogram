# Secvisogram Preview Templating

<!-- TOC depthfrom:2 depthto:3 -->

- [HTML Templating Overview](#html-templating-overview)
- [How to create a custom HTML template](#how-to-create-a-custom-html-template)
- [Technical Overview](#technical-overview)
  - [Mustache template example](#mustache-template-example)
- [Full list of template attributes](#full-list-of-template-attributes)
- [Full list of extended template attributes](#full-list-of-extended-template-attributes)

<!-- /TOC -->

## HTML Templating Overview

Secvisogram offers functionality to render a CSAF JSON document as an HTML document. Therefore, the Secvisogram "Preview" function offers the possibility to view the CSAF document as a rendered HTML document as well as the underlying HTML source code.

The rendered HTML file is self-sufficient so that it may be saved as standalone HTML file, i.e. for printing or PDF export. For this purpose, Secvisogram offers the possiblity to save the generated HTML content.

Another use-case might be addressed by the Preview Source, which displays a preview of the HTML source code of the rendered document. This might be helpful for users who wish to copy-paste the source HTML content for inclusion in their content management system (CMS).

This document describes how to create and integrate custom Preview Templates.

## How to create a custom HTML template

To create a custom Preview HTML template:

1. Start the development server as described in the ["Getting started" section of the `README.md`](README.md#getting-started)
2. Open http://localhost:8080/?tab=PREVIEW in your browser to see a preview of the changes.
3. Edit & modify the `lib/SecvisogramPage/View/shared/HTMLTemplate/Template.html` file according to the instructions in this file
4. The preview in your browser should refresh automatically and display your latest changes

## Technical Overview

Secvisogram uses the popular [{{ mustache }} library](https://mustache.github.io/) for the templating mechanism. Currently, the template can only be changed at build-time.

### Mustache template example

The following code example illustrates the basic templating mechanism. For a detailed introduction, please refer to the [mustache man page](https://mustache.github.io/mustache.5.html).

```
<h3>List of acknowledgments</h3>
{{#data.json.document.acknowledgments}}
    <h4>Acknowledgment</h4>
    <h5>List of acknowledged names</h5>
    {{#names}}{{#.}}
            <h6>Name of entity being recognized</h6>
            <p>{{.}}</p>
        {{/.}} {{/names}}
    <h5>List of contributing organizations</h5>
    {{#organizations}}{{#.}}
            <h6>Contributing organization</h6>
            <p>{{.}}</p>
        {{/.}} {{/organizations}}
    {{#summary}}
        <h5>Summary of the acknowledgment</h5>
        <p>{{summary}}</p>
    {{/summary}}
    <h5>List of URLs</h5>
    {{#urls}}{{#.}}
            <h6>URL of acknowledgment</h6>
            <p>{{.}}</p>
        {{/.}} {{/urls}}
{{/data.json.document.acknowledgments}}
```

- `{{#attribute}} … {{/attribute}}` opens a section, referring to the template attribute `attribute`.
- All CSAF document values are provided by the `data.json` object, as `data.json.document` does for the CSAF `document` node/attribute.
- By nesting mustache statements, you can navigate down the CSAF object graph. Please be aware that many fields are optional and must be handled properly in your template.
- `data.json.document.acknowledgments.names` refers to a list. Hence, mustache will loop over every element in the list.
- You can use `{{.}}` to refer to the current element. By wrapping this into a `{{#.}} … {{/.}}`, you can also include content to be repeated on every loop.

## Full list of template attributes

### CSAF 2.0

See [`CSAF-2.0-TEMPLATE-ATTRIBUTES.md`](CSAF-2.0-TEMPLATE-ATTRIBUTES.md)

### CSAF 2.1

See [`CSAF-2.1-TEMPLATE-ATTRIBUTES.md`](CSAF-2.1-TEMPLATE-ATTRIBUTES.md)
