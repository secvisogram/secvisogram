# File Hash - Specification

Each File hash of value type `object` contains one hash value and algorithm of the file to be identified.
Any File hash object has the 2 mandatory properties

* [Algorithm](types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.en.md) (`algorithm`)
* [Value](types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.en.md) (`value`)

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
