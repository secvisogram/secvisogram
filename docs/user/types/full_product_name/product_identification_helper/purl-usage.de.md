**Purl - Verwendung**

Ein purl ist eine URL, die aus sieben Komponenten besteht, die durch ein bestimmtes Zeichen getrennt sind, um eine eindeutige Analyse zu ermöglichen:

```text
scheme:type/namespace/name@version?qualifiers#subpath
```

Die Definition für jede Komponente lautet:

* `scheme`: Dies ist das URL-Schema mit dem konstanten Wert "pkg". Einer der Hauptgründe für dieses einzelne Schema ist die Erleichterung der zukünftigen offiziellen Registrierung des "pkg"-Schemas für Paket-URLs. Erforderlich.
* `type`: der Paket-"Typ" oder das Paket-"Protokoll" wie maven, npm, nuget, gem, pypi, etc. Erforderlich.
* `namespace`: ein Namenspräfix wie eine Maven-Gruppennummer, ein Docker-Image-Besitzer, ein GitHub-Benutzer oder eine Organisation. Optional und typspezifisch.
* `name`: der Name des Pakets. Erforderlich.
* `version`: die Version des Pakets. Optional.
* `qualifiers`: zusätzliche qualifizierende Daten für ein Paket, wie z. B. ein Betriebssystem, eine Architektur, eine Distribution, usw. Optional und typspezifisch.
* `subpath`: zusätzlicher Unterpfad innerhalb eines Pakets, relativ zum Stammverzeichnis des Pakets. Wahlweise.

Die Komponenten sind so aufgebaut, dass sie eine Hierarchie bilden, die von der höchstwertigen Komponente auf der linken Seite bis zur niedrigstwertigen Komponente auf der rechten Seite reicht.

Ein purl darf KEINE URL Authority enthalten, d.h. es gibt keine Unterstützung für die Komponenten Benutzername, Passwort, Host und Port.
Ein Namespace-Segment kann manchmal wie ein Host aussehen, aber seine Interpretation ist spezifisch für einen Typ.
Außerdem darf ein purl keine doppelten Schrägstriche `//` enthalten, d. h. das Schema ist `pkg:`.
Dort

Purls eignen sich besonders gut zur Identifizierung von Komponenten innerhalb der von purl unterstützten Pakettypen.
