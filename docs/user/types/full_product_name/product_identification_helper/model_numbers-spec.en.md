# Model Numbers - Specification

The list of models (`model_numbers`) of value type `array` with 1 or more unique items contains a list of full or abbreviated (partial) model numbers.

A list of models SHOULD only be used if a certain range of model numbers with its corresponding software version is affected, or the model numbers change during update.

This can also be used to identify hardware. If necessary, the software, or any other related part, SHALL be bind to that via a product relationship.

```javascript
"model_numbers": {
    //...
  "items": {
    //...
  }
}
```

[Specification of Model Number items](types/full_product_name/product_identification_helper/model_numbers/model_number-spec.en.md)
