# Product Tree - Spezifikation

Product Tree (`product_tree`) hat den Werttyp `object` mit 1 oder mehreren Eigenschaften ist ein Container für alle voll qualifizierten Produktnamen, auf die an anderer Stelle im Dokument verwiesen werden kann.
Die Eigenschaften sind

* [Verzweigungen](product_tree/branches-spec.de.md) (`branches`)
* [Vollständige Produktnamen](product_tree/full_product_names-spec.de.md) (`full_product_names`)
* [Produktgruppen](product_tree/product_groups-spec.de.md) (`product_groups`)
* [Beziehungen](product_tree/relationships-spec.de.md) (`relationships`)

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
