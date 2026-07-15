# SKUs - Specification

The list of stock keeping units (`skus`) of value type `array` with 1 or more items contains a list of full or abbreviated (partial) stock keeping units.

A list of stock keeping units SHOULD only be used if the list of relationships is used to decouple e.g. hardware from the software, or the stock keeping units change during update.
In the latter case the remediations SHALL include the new stock keeping units or a description how it can be obtained.

> The use of the list of relationships in the first case is important. Otherwise, the end user is unable to identify
> which version (the affected or the not affected / fixed one) is used.

```javascript
"skus": {
    //...
  "items": {
    //...
  }
}
```

[Specification of SKU items](types/full_product_name/product_identification_helper/skus/sku-spec.en.md)
