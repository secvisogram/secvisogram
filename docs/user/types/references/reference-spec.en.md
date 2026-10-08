# Reference - Specification

Value type of every such Reference item is `object` with the mandatory properties

* [URL](types/references/reference/url-spec.en.md) (`url`)
* [Summary](types/references/reference/summary-spec.en.md) (`summary`)

holding any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.
A reference `object` MAY provide the optional property

* [Category](types/references/reference/category-spec.en.md) (`category`)

```javascript
"properties": {
  "category": {
    // ...
  },
  "summary": {
    // ...
  },
  "url": {
    // ...
  }
}
```
