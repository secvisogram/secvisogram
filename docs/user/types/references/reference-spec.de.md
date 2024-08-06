# Reference - Spezifikation

Der Wertetyp jedes solchen Referenzobjekts ist `object` mit den obligatorischen Eigenschaften

* [URL](types/references/reference/url-spec.de.md) (`url`)
* [Zusammenfassung](types/references/reference/summary-spec.de.md) (`summary`)

mit Verweisen auf Konferenzen, Papiere, Ratschläge und andere Ressourcen, die entweder mit einem umgebenden Teil des Dokuments oder mit dem gesamten Dokument in Verbindung stehen und für den Verbraucher des Dokuments von Wert sind.
Ein Verweis `object` KANN die optionale Eigenschaft

* [Kategorie](types/references/reference/category-spec.de.md) (`category`)

```javascript
"properties": {
  "category": {
    // ...
  },
  "summary": {
    // ...
  },
  "url": {
    // ...
  }
}
```
