# Engine - Spezifikation

Engine der Dokumentenerzeugung (`engine`) vom Wertetyp `object` mit obligatorischer Eigenschaft

* [Engine Name](document/tracking/generator/engine/name-spec.de.md) (`name`)

und optionaler Eigenschaft

* [Motorversion](document/tracking/generator/engine/version-spec.de.md) (`version`)

enthält Informationen über die Engine, die das CSAF-Dokument erzeugt hat.

```javascript
"engine": {
  // ...
  "properties": {
    "name": {
      // ...
    },
    "version": {
      // ...
    }
  }
}
```
