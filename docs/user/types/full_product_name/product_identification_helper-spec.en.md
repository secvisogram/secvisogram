# Product Identification Helper - Specification

Helper to identify the product (`product_identification_helper`) of value type `object` provides in its properties at least one method which aids in identifying the product in an asset database.
Of the given eight properties

* [CPE](types/full_product_name/product_identification_helper/cpe-spec.en.md) (`cpe`)
* [Hashes](types/full_product_name/product_identification_helper/hashes-spec.en.md) (`hashes`)
* [Model Numbers](types/full_product_name/product_identification_helper/model_numbers-spec.en.md) (`model_numbers`)
* [Package URL](types/full_product_name/product_identification_helper/purl-spec.en.md) (`purl`)
* [SBOM URLs](types/full_product_name/product_identification_helper/sbom_urls-spec.en.md) (`sbom_urls`)
* [Serial Numbers](types/full_product_name/product_identification_helper/serial_numbers-spec.en.md) (`serial_numbers`)
* [SKUs](types/full_product_name/product_identification_helper/skus-spec.en.md) (`skus`)
* [Generic URIs](types/full_product_name/product_identification_helper/x_generic_uris-spec.en.md) (`x_generic_uris`)

one is mandatory.

```javascript
"product_identification_helper": {
  // ...
  "properties": {
    "cpe": {
      // ...
    },
    "hashes": {
      // ...
    },
    "model_numbers": {
      // ...
    },
    "purl": {
      // ...
    },
    "sbom_urls": {
      // ...
    },
    "serial_numbers": {
      // ...
    },
    "skus": {
      // ...
    },
    "x_generic_uris": {
      // ...
    }
  }
```
