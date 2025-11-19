**Version - Verwendung**

Verschiedene Versionen des Generators können CSAF-Dokumente mit möglicherweise unterschiedlicher Struktur erzeugen.
Basierend auf diesem Wert müssen möglicherweise unterschiedliche Pfade für den Abgleich verwendet werden.

*Beispiele:*

* Ein Unternehmen kann seinen Namen ändern und infolgedessen ändert sich `full_product_name`und die Generierung des Dokuments.
  Dies würde eine Anpassung des Abgleichs erfordern.

Eine Änderung der Versionierung (z. B. Wechsel von der [ganzzahligen Versionierung](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31112-version-type---semantic-versioning) zu
[semantische Versionierung](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31111-version-type---integer-versioning)) erfordert eine Änderung des Abgleichs.

*Beispiele:*

* `0.6.0`
* `1.0.0-beta+exp.sha.a1c44f85`
* `2`
