# Full Product Name - Specification

Full Product Name (`full_product_name_t`) with value type `object` specifies information about the product and assigns the product ID. The properties

* [Name](types/full_product_name/name-spec.en.md) (`name`)
* [Product ID](types/full_product_name/product_id-spec.en.md) (`product_id`)

are required. The property

* [Product Identification Helper](types/full_product_name/product_identification_helper-spec.en.md)
  (`product_identification_helper`)

is optional.

```javascript
"full_product_name_t": {
  // ...
  "properties": {
    "name": {
      // ...
    },
    "product_id": {
      // ...
    },
    "product_identification_helper": {
      // ...
    }
  }
}
```
