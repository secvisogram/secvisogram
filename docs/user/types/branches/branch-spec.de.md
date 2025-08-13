# Branch - Spezifikation

Jeder Zweig enthält genau 3 Eigenschaften und ist Teil der hierarchischen Struktur des Produktbaums.
Die Eigenschaften

* [Name](types/branches/branch/name-spec.de.md) (`name`)
* [Kategorie](types/branches/branch/category-spec.de.md) (`category`)

sind obligatorisch.
Darüber hinaus enthält das Objekt entweder eine

* [Verzweigungen](product_tree/branches-spec.de.md) (`branches`)

oder eine

* [Produkt](types/branches/branch/product-spec.de.md) `product` Eigenschaft.

```javascript
"properties": {
  "branches": {
    // ...
  },
  "category": {
    // ...
  },
  "name": {
    // ...
  },
  "product": {
    // ...
  }
}
```

&gt; `branches_t` unterstützt den Aufbau einer hierarchischen Struktur von Produkten, die es erlaubt, die Beziehung von
&gt; Produkten zueinander und ermöglicht die Gruppierung für eine einfachere Referenzierung. Als Beispiel kann die Struktur die folgenden
&gt; folgende Ebenen verwenden: `vendor` -&gt; `product_family` -&gt; `product_name` -&gt; `product_version`.
&gt; Es wird empfohlen, die hierarchische Struktur `vendor` -&gt; `product_name` -&gt; `product_version` zu verwenden, wann immer
&gt; zu verwenden, um die Identifizierung und Zuordnung von Produkten auf der Verbraucherseite zu unterstützen.
