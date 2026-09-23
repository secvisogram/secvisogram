# Tracking - Spezifikation

Tracking (`tracking`) der Wertart `object` mit den sechs obligatorischen Eigenschaften:

* [Aktuelles Veröffentlichungsdatum](document/tracking/current_release_date-spec.de.md) (`current_release_date`)
* [Bezeichner](document/tracking/id-spec.de.md) (`id`)
* [Datum der Erstveröffentlichung](document/tracking/initial_release_date-spec.de.md) (`initial_release_date`)
* [Versionsgeschichte](document/tracking/revision_history-spec.de.md) (`revision_history`)
* [Status](document/tracking/status-spec.de.md) (`status`)
* [Version](document/tracking/version-spec.de.md) (`version`)

ist ein Container, der alle Verwaltungsattribute enthält, die notwendig sind, um ein CSAF-Dokument als Ganzes zu verfolgen. Die beiden optionalen zusätzlichen Eigenschaften sind

* [Aliasen](document/tracking/aliases-spec.de.md) (`aliases`)
* [Generator](document/tracking/generator-spec.de.md) (`generator`).

```javascript
"tracking": {
  // ...
  "properties": {
    "aliases": {
      // ...
    },
    "current_release_date": {
      // ...
    },
    "generator": {
      // ...
    },
    "id": {
      // ...
    },
    "initial_release_date": {
      // ...
    },
    "revision_history": {
      // ...
    },
    "status": {
      // ...
    },
    "version": {
      // ...
    }
  }
}
```
