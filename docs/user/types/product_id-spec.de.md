# Product ID - Spezifikation

Der Produkt-ID-Typ (`product_id_t`) vom Werttyp `string` mit 1 oder mehr Zeichen ist ein Referenz-Token für Produktinstanzen.
Der Wert ist ein Token, das benötigt wird, um ein `full_product_name` zu identifizieren, so dass es von anderen Teilen des Dokuments aus referenziert werden kann.
Es gibt kein vordefiniertes oder vorgeschriebenes Format für die Produkt-ID (`product_id`), solange sie ein Produkt im Kontext des aktuellen Dokuments eindeutig identifiziert.

```javascript
"product_id_t": {
  // ...
}
```

*Beispiele:*

* `CSAFPID-0004`
* `CSAFPID-0008`

&gt; Auch wenn der Standard kein bestimmtes Format vorschreibt, wird empfohlen, unterschiedliche Präfixe für die
&gt; Produkt-ID und die Produktgruppen-ID zu verwenden, um das Lesen und Parsen des Dokuments zu unterstützen.
