# Generator - Specification

Document Generator (`generator`) of value type `object` with mandatory property

* [Engine](document/tracking/generator/engine-spec.en.md) (`engine`)

and optional property

* [Date](document/tracking/generator/date-spec.en.md) (`date`)

is a container to hold all elements related to the generation of the document.
These items will reference when the document was actually created, including the date it was generated and the entity that generated it.

```javascript
"generator": {
  // ...
  "properties": {
    "date": {
      // ...
    },
    "engine": {
      // ...
    }
  }
}
```
