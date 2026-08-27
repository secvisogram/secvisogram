# Publisher - Specification

Publisher (`publisher`) has value type `object` with the mandatory properties

* [Category](document/publisher/category-spec.en.md) (`category`)
* [Name](document/publisher/name-spec.en.md) (`name`)
* [Namespace](document/publisher/namespace-spec.en.md) (`namespace`)

and provides information on the publishing entity. The 2 other optional properties are:

* [Contact Details](document/publisher/issuing_authority-spec.en.md) (`contact_details`)
* [Issuing Authority](document/publisher/issuing_authority-spec.en.md) (`issuing_authority`)

```javascript
"publisher": {
  // ...
  "properties": {
    "category": {
      // ...
    },
    "contact_details": {
      // ...
    },
    "issuing_authority": {
      // ...
    },
    "name": {
      // ...
    }
    "namespace": {
      // ...
    }
  }
}
```
