# Document - Spezifikation

Metadaten auf Dokumentebene (`document`) vom Wertetyp `object` mit den 5 obligatorischen Eigenschaften

* [Kategorie](document/category-spec.de.md) (`category`)
* [CSAF-Version](document/csaf_version-spec.de.md) (`csaf_version`)
* [Herausgeber](document/publisher-spec.de.md) (`publisher`)
* [Titel](document/title-spec.de.md) (`title`)
* [Verfolgung](document/tracking-spec.de.md) (`tracking`)

erfasst die Metadaten zu diesem Dokument, das einen bestimmten Satz von Sicherheitshinweisen beschreibt.
Darüber hinaus KANN das Objekt `document` die folgenden 7 optionalen Eigenschaften aufweisen

* [Danksagungen](document/acknowledgments-spec.de.md) (`acknowledgments`)
* [Aggregierter Schweregrad](document/aggregate_severity-spec.de.md) (`aggregate_severity`)
* [Verteilung](document/distribution-spec.de.md) (`distribution`)
* [Sprache](document/lang-spec.de.md) (`lang`)
* [Hinweise](document/notes-spec.de.md) (`notes`)
* [Referenzen](document/references-spec.de.md) (`references`)
* [Ausgangssprache](document/source_lang-spec.de.md) (`source_lang`)

```javascript
"document": {
  // ...
  "properties": {
    "acknowledgments": {
      // ...
    },
    "aggregate_severity" : {
      // ...
    },
    "category": {
      // ...
    },
    "csaf_version": {
      // ...
    },
    "distribution": {
      // ...
    },
    "lang": {
      // ...
    },
    "notes": {
      // ...
    },
    "publisher": {
      // ...
    },
    "references": {
      // ...
    },
    "source_lang": {
      // ...
    },
    "title": {
      // ...
    },
    "tracking": {
      // ...
    }
  }
}
```
