# Product Group ID - Spezifikation

Der Produktgruppen-ID-Typ (`product_group_id_t`) des Werttyps `string` mit 1 oder mehr Zeichen ist ein Referenz-Token für Produktgruppen-Instanzen.
Der Wert ist ein Token, das zur Identifizierung einer Produktgruppe erforderlich ist, damit von anderen Teilen des Dokuments auf sie verwiesen werden kann.
Es gibt kein vordefiniertes oder erforderliches Format für die Produktgruppen-ID (`product_group_id`), solange sie eine Produktgruppe im Kontext des aktuellen Dokuments eindeutig identifiziert.

```javascript
"product_group_id_t": {
  // ...
}
```

*Beispiele:*

* `CSAFGID-0001`
* `CSAFGID-0002`
* `CSAFGID-0020`

&gt; Auch wenn der Standard kein bestimmtes Format vorschreibt, wird empfohlen, unterschiedliche Präfixe für die
&gt; Produkt-ID und die Produktgruppen-ID zu verwenden, um das Lesen und Parsen des Dokuments zu unterstützen.
