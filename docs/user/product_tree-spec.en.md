# Product Tree - Specification

Product Tree (`product_tree`) has value type `object` with 1 or more properties is a container for all fully qualified product names that can be referenced elsewhere in the document.
The properties are

* [Branches](product_tree/branches-spec.en.md) (`branches`)
* [Full Product Names](product_tree/full_product_names-spec.en.md) (`full_product_names`)
* [Product Groups](product_tree/product_groups-spec.en.md) (`product_groups`)
* [Relationships](product_tree/relationships-spec.en.md) (`relationships`)

```javascript
"product_tree": {
  // ...
  "properties": {
    "branches": {
      // ...
    },
    "full_product_names": {
      // ...
    },
    "product_groups": {
      // ...
    },
    "relationships": {
      // ...
    }
  }
}
```
