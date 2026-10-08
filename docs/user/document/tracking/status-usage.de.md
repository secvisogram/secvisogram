**Status - Verwendung**

Der Arbeitsstatus des Dokuments. Mögliche Werte sind `draft`, `interim` und `final`.

Muss für alle Entwurfsversionen auf `draft` gesetzt werden, d. h. immer dann, wenn die Version `0` oder `0.x.y` ist oder einen Vorabversionsteil enthält.

Wenn absehbar ist, dass in den nächsten Tagen sehr häufig Aktualisierungen erfolgen werden, sollte der Wert `interim` gewählt werden.
Der Status `interim` fordert den Verbraucher auf, den Hinweis häufiger auf Aktualisierungen zu prüfen.
Dies gilt insbesondere für Schwachstellen, bei denen es häufig Aktualisierungen gibt, während die Analyse noch läuft (z. B. bei Log4Shell).

Der Wert `final` sollte für alle Versionen gewählt werden, bei denen keine außergewöhnlich hohe Häufigkeit von Aktualisierungen zu erwarten ist.
Wenn z.B. einmal im Monat an einem regelmäßigen Patch-Tag Advisories veröffentlicht werden, kann der Wert `final` angegeben werden.
Wenn generell nicht absehbar ist, dass zum Zeitpunkt der Veröffentlichung Änderungen vorgenommen werden, sollte der Wert `final` gewählt werden.
