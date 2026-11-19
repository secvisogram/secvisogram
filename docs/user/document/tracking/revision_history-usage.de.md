# Revision History - Verwendung

Die Revisionshistorie dient dazu, die Entwicklung des Dokuments zumindest in allen veröffentlichten Versionen zu verfolgen.
Für jede veröffentlichte Version muss ein Eintrag in der Revisionshistorie vorhanden sein.
Für Vorabversionen gibt es keine Einträge in der Versionshistorie. Vor der ersten Freigabe kann das Feld jedoch verwendet werden, um Änderungen zu erfassen.

Die nach Datum sortierten Revisionseinträge müssen die Werte `number` in aufsteigender Reihenfolge aufweisen.

Der `number` des Revisionseintrags mit dem jüngsten `date` Wert muss mit dem Wert in `/document/tracking/version` übereinstimmen.
Für diesen Vergleich werden Build-Metadaten ignoriert.
Wenn der Dokumentstatus `draft` ist, wird auch jeder Vorabversionsteil ignoriert.

Die nach Datum sortierten Revisionselemente dürfen keine Version `number` auslassen.
Im Falle der [semantischen Versionierung](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31111-version-type---integer-versioning),
gilt dies nur für die Hauptversion.
Diese sortierte Liste der Versionsnummern muss mit der (Haupt-)Version `0` für Dokumente im Status `draft` oder `1` im Status `final` oder `interim` beginnen.

Die gleiche Version `number` darf nicht für mehrere Revisionspunkte wiederholt werden.

Die älteste Revision darf nicht neuer sein als das Datum der Erstveröffentlichung `date` `/document/tracking/initial_release_date` .
