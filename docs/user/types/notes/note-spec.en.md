# Note - Specification

Value type of every such Note item is `object` with the mandatory properties

* [Category](types/notes/note/category-spec.en.md) (`category`)
* [Text](types/notes/note/text-spec.en.md) (`text`)

providing a place to put all manner of text blobs related to the current context.
A Note `object` MAY provide the optional properties

* [Audience](types/notes/note/audience-spec.en.md) (`audience`)
* [Title](types/notes/note/title-spec.en.md) (`title`)

```javascript
"properties": {
  "audience": {
    // ...
  },
  "category": {
    // ...
  },
  "text": {
    // ...
  },
  "title": {
    // ...
  }
}
```
