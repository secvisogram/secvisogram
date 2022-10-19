# Revision - Spezifikation

Jede Revision enthält alle Informationselemente, die erforderlich sind, um die Entwicklung eines CSAF-Dokuments zu verfolgen.
Einträge zur Revisionshistorie sind vom Wertetyp `object` mit den drei obligatorischen Eigenschaften:

* [Datum](document/tracking/revision_history/revision/date-spec.de.md) (`date`)
* [Nummer](document/tracking/revision_history/revision/number-spec.de.md) (`number`)
* [Zusammenfassung](document/tracking/revision_history/revision/summary-spec.de.md) (`summary`)

Darüber hinaus KANN eine Revision die optionale Eigenschaft

* [Legacy Version](document/tracking/revision_history/revision/legacy_version-spec.de.md) `legacy_version`

```javascript
"properties": {
  "date": {
    // ...
  },
  "legacy_version": {
    // ...
  },
  "number": {
    // ...
  },
  "summary": {
    // ...
  }
}
```

Jedes Revisionselement, das einen `number` von `0` oder `0.y.z` hat, MUSS aus dem Dokument entfernt werden, wenn der Dokumentstatus
`final`. Versionen des Dokuments, die noch nicht freigegeben sind, MÜSSEN KEIN eigenes Revisionselement haben. Alle Änderungen MÜSSEN in dem Element für die nächste Freigabeversion nachverfolgt werden. Build-Metadaten MÜSSEN NICHT in die `number` eines Revisionseintrags aufgenommen werden.
