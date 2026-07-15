# File Hash - Spezifikation

Jeder File-Hash vom Wertetyp `object` enthält einen Hashwert und einen Algorithmus der zu identifizierenden Datei.
Jedes File hash Objekt hat die 2 obligatorischen Eigenschaften

* [Algorithmus](types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.de.md) (`algorithm`)
* [Wert](types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.de.md) (`value`)

```javascript
"properties": {
  "algorithm": {
    // ...
  },
  "value": {
    // ...
  }
}
```
