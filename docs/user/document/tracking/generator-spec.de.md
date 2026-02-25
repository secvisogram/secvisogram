# Generator - Spezifikation

Dokumentgenerator (`generator`) vom Wertetyp `object` mit obligatorischer Eigenschaft

* [Motor](document/tracking/generator/engine-spec.de.md) (`engine`)

und optionaler Eigenschaft

* [Datum](document/tracking/generator/date-spec.de.md) (`date`)

ist ein Container, der alle Elemente enthält, die sich auf die Erstellung des Dokuments beziehen.
Diese Elemente verweisen darauf, wann das Dokument tatsächlich erstellt wurde, einschließlich des Datums der Erstellung und der Entität, die es erstellt hat.

```javascript
"generator": {
  // ...
  "properties": {
    "date": {
      // ...
    },
    "engine": {
      // ...
    }
  }
}
```
