# SKUs - Spezifikation

Die Liste der Lagermengeneinheiten (`skus`) vom Werttyp `array` mit 1 oder mehreren Positionen enthält eine Liste der vollständigen oder abgekürzten (Teil-)Lagermengeneinheiten.

Eine Liste von Lagerhaltungseinheiten SOLLTE nur verwendet werden, wenn die Liste der Beziehungen dazu dient, z. B. die Hardware von der Software zu entkoppeln, oder wenn sich die Lagerhaltungseinheiten während der Aktualisierung ändern.
In letzterem Fall MÜSSEN die Abhilfemaßnahmen die neuen Lagerhaltungseinheiten oder eine Beschreibung, wie diese zu erhalten sind, enthalten.

&gt; Die Verwendung der Liste der Beziehungen im ersten Fall ist wichtig. Andernfalls ist der Endbenutzer nicht in der Lage zu erkennen
&gt; welche Version (die betroffene oder die nicht betroffene/fixierte) verwendet wird.

```javascript
"skus": {
    //...
  "items": {
    //...
  }
}
```

[Spezifikation von SKU-Positionen](types/full_product_name/product_identification_helper/skus/sku-spec.de.md)
