# Document - Specification

Document level meta-data (`document`) of value type `object` with the 5 mandatory properties

* [Category](document/category-spec.en.md) (`category`)
* [CSAF Version](document/csaf_version-spec.en.md) (`csaf_version`)
* [Publisher](document/publisher-spec.en.md) (`publisher`)
* [Title](document/title-spec.en.md) (`title`)
* [Tracking](document/tracking-spec.en.md) (`tracking`)

captures the meta-data about this document describing a particular set of security advisories.
In addition, the `document` object MAY provide the 7 optional properties

* [Acknowledgments](document/acknowledgments-spec.en.md) (`acknowledgments`)
* [Aggregate Severity](document/aggregate_severity-spec.en.md) (`aggregate_severity`)
* [Distribution](document/distribution-spec.en.md) (`distribution`)
* [Language](document/lang-spec.en.md) (`lang`)
* [Notes](document/notes-spec.en.md) (`notes`)
* [References](document/references-spec.en.md) (`references`)
* [Source Language](document/source_lang-spec.en.md) (`source_lang`)

```javascript
"document": {
  // ...
  "properties": {
    "acknowledgments": {
      // ...
    },
    "aggregate_severity" : {
      // ...
    },
    "category": {
      // ...
    },
    "csaf_version": {
      // ...
    },
    "distribution": {
      // ...
    },
    "lang": {
      // ...
    },
    "notes": {
      // ...
    },
    "publisher": {
      // ...
    },
    "references": {
      // ...
    },
    "source_lang": {
      // ...
    },
    "title": {
      // ...
    },
    "tracking": {
      // ...
    }
  }
}
```
