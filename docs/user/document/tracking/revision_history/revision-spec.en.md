# Revision - Specification

Each Revision contains all the information elements required to track the evolution of a CSAF document.
Revision History Entry items are of value type `object` with the three mandatory properties:

* [Date](document/tracking/revision_history/revision/date-spec.en.md) (`date`)
* [Number](document/tracking/revision_history/revision/number-spec.en.md) (`number`)
* [Summary](document/tracking/revision_history/revision/summary-spec.en.md) (`summary`)

In addition, a Revision MAY expose the optional property

* [Legacy Version](document/tracking/revision_history/revision/legacy_version-spec.en.md) `legacy_version`

```javascript
"properties": {
  "date": {
    // ...
  },
  "legacy_version": {
    // ...
  },
  "number": {
    // ...
  },
  "summary": {
    // ...
  }
}
```

Each Revision item which has a `number` of `0` or `0.y.z` MUST be removed from the document if the document status is
`final`. Versions of the document which are pre-release SHALL NOT have its own revision item. All changes MUST be tracked in the item for the next release version. Build metadata SHOULD NOT be included in the `number` of any revision item.
