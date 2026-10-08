# Publisher - Spezifikation

Publisher (`publisher`) hat den Wertetyp `object` mit den obligatorischen Eigenschaften

* [Kategorie](document/publisher/category-spec.de.md) (`category`)
* [Name](document/publisher/name-spec.de.md) (`name`)
* [Namespace](document/publisher/namespace-spec.de.md) (`namespace`)

und liefert Informationen über die veröffentlichende Entität. Die 2 anderen optionalen Eigenschaften sind:

* [Kontaktangaben](document/publisher/issuing_authority-spec.de.md) (`contact_details`)
* [Ausstellende Behörde](document/publisher/issuing_authority-spec.de.md) (`issuing_authority`)

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
