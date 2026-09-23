# Hash - Spezifikation

Cryptographic Hashes vom Wertetyp `object` enthält alle Informationen zur Identifizierung einer Datei auf der Grundlage ihrer kryptographischen Hash-Werte.
Jedes kryptografische Hash-Objekt hat die 2 obligatorischen Eigenschaften

* [Datei-Hashes](types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.de.md) (`file_hashes`)
* [Dateiname](types/full_product_name/product_identification_helper/hashes/hash/filename-spec.de.md) (`filename`)

```javascript
"properties": {
  "file_hashes": {
    // ...
  },
  "filename": {
    // ...
  }
}
```
