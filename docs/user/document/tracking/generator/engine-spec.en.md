# Engine - Specification

Engine of document generation (`engine`) of value type `object` with mandatory property

* [Engine Name](document/tracking/generator/engine/name-spec.en.md) (`name`)

and optional property

* [Engine version](document/tracking/generator/engine/version-spec.en.md) (`version`)

contains information about the engine that generated the CSAF document.

```javascript
"engine": {
  // ...
  "properties": {
    "name": {
      // ...
    },
    "version": {
      // ...
    }
  }
}
```
