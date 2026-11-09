# Serial Numbers - Specification

The list of serial numbers (`serial_numbers`) of value type `array` with 1 or more unique items contains a list of full or abbreviated (partial) serial numbers.

A list of serial numbers SHOULD only be used if a certain range of serial numbers with its corresponding software version is affected, or the serial numbers change during update.

```javascript
"serial_numbers": {
    //...
  "items": {
    //...
  }
}
```

[Specification of Serial Number items](types/full_product_name/product_identification_helper/serial_numbers/serial_number-spec.en.md)
