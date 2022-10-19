# Distribution - Spezifikation

Regeln für die gemeinsame Nutzung eines Dokuments (`distribution`) vom Werttyp `object` mit mindestens 1 der 2 Eigenschaften

* [Text](document/distribution/text-spec.de.md) (`text`)
* [Ampelprotokoll (TLP)](document/distribution/tlp-spec.de.md) (`tlp`)

beschreibt alle Einschränkungen, wie dieses Dokument gemeinsam genutzt werden kann.

```javascript
"distribution": {
  // ...
  "properties": {
    "text": {
      // ...
    },
    "tlp": {
      // ...
    }
  }
}
```

Wenn beide Werte vorhanden sind, SOLLTEN die TLP-Informationen bevorzugt werden, da dies die Automatisierung erleichtert.
