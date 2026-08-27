# Relationship - Spezifikation

Das Element "Beziehung" hat den Werttyp `object` und vier obligatorische Eigenschaften:

* [Beziehungskategorie](product_tree/relationships/relationship/category-spec.de.md) (`category`)
* [Vollständiger Produktname](product_tree/relationships/relationship/full_product_name-spec.de.md) (`full_product_name`)
* [Produktreferenz](product_tree/relationships/relationship/product_reference-spec.de.md) (`product_reference`)
* [Bezieht sich auf die Produktreferenz](product_tree/relationships/relationship/relates_to_product_reference-spec.de.md) (`relates_to_product_reference`)

Das Element Beziehung stellt eine Verbindung zwischen zwei bestehenden `full_product_name_t` Elementen her und ermöglicht es dem Dokumentenersteller, eine Kombination von zwei Produkten zu definieren, die einen neuen `full_product_name` Eintrag bilden.

```javascript
"properties": {
  "category": {
    // ...
  },
  "full_product_name": {
    // ...
  },
  "product_reference": {
    // ...
  },
  "relates_to_product_reference": {
    // ...
  }
}
```

&gt; Die Situation, in der eine Beziehung deklariert werden muss, ist gegeben, wenn ein Produkt z.B. nur angreifbar ist, wenn es zusammen mit einem anderen
&gt; zusammen mit einem anderen installiert wird, oder um Betriebssystemkomponenten zu beschreiben.
