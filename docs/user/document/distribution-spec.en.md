# Distribution - Specification

Rules for sharing document (`distribution`) of value type `object` with at least 1 of the 2 properties

* [Text](document/distribution/text-spec.en.md) (`text`)
* [Traffic Light Protocol (TLP)](document/distribution/tlp-spec.en.md) (`tlp`)

describes any constraints on how this document might be shared.

```javascript
"distribution": {
  // ...
  "properties": {
    "text": {
      // ...
    },
    "tlp": {
      // ...
    }
  }
}
```

If both values are present, the TLP information SHOULD be preferred as this aids in automation.
