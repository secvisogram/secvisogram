# Category - Spezifikation

Die Kategorie des Verweises (`category`) vom Wertetyp `string` und `enum` gibt an, ob der Verweis auf dasselbe Dokument oder die Schwachstelle im Fokus (je nach Umfang) oder auf eine externe Ressource verweist.
Gültige `enum` Werte sind:

* `external`
* `self`

Der Standardwert für `category` ist `external`.

Der Wert `external` zeigt an, dass dieses Dokument ein externer Verweis auf ein Dokument oder eine Schwachstelle im Fokus ist
ist (je nach Bereich).

Der Wert `self` gibt an, dass dieses Dokument ein Verweis auf dasselbe Dokument oder dieselbe Sicherheitslücke ist (ebenfalls abhängig vom Anwendungsbereich).

&gt; Dies gilt auch für Verweise auf Dokumente mit gleichem Inhalt, aber anderem Dateiformat (z. B. Hinweise im PDF- oder HTML-Format).
