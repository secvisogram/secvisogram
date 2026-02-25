# Product Identification Helper - Spezifikation

Das Hilfsmittel zur Identifizierung des Produkts (`product_identification_helper`) vom Werttyp `object` bietet in seinen Eigenschaften mindestens eine Methode, die bei der Identifizierung des Produkts in einer Anlagendatenbank hilft.
Von den angegebenen acht Eigenschaften

* [CPE](types/full_product_name/product_identification_helper/cpe-spec.de.md) (`cpe`)
* [Hashes](types/full_product_name/product_identification_helper/hashes-spec.de.md) (`hashes`)
* [Modell-Nummern](types/full_product_name/product_identification_helper/model_numbers-spec.de.md) (`model_numbers`)
* [Paket-URL](types/full_product_name/product_identification_helper/purl-spec.de.md) (`purl`)
* [SBOM-URLs](types/full_product_name/product_identification_helper/sbom_urls-spec.de.md) (`sbom_urls`)
* [Seriennummern](types/full_product_name/product_identification_helper/serial_numbers-spec.de.md) (`serial_numbers`)
* [SKUs](types/full_product_name/product_identification_helper/skus-spec.de.md) (`skus`)
* [Allgemeine URIs](types/full_product_name/product_identification_helper/x_generic_uris-spec.de.md) (`x_generic_uris`)

eine ist obligatorisch.

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
