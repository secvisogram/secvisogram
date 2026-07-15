# Summary - Verwendung

Ein aussagekräftiger Titel oder eine kurze Zusammenfassung der Referenz.

Bei Webseiten ist dies oft der Seitentitel aus den HTML-Metadaten.
Bei anderen Dokumenten ist es der Titel des Dokuments.

Bei verschiedenen Formaten von Hinweisen hat der Titel oder die Zusammenfassung das folgende Format:

 `ID: TITLE - FORMAT`

wobei `ID` der Wert von `/document/tracking/id` ist, `TITLE` optional ist und der Wert von `/document/title` und `FORMAT` einer von `PDF`, `TXT`, `CSAF` oder `HTML` ist.

Wenn verschiedene Versionen des Dokuments unter verschiedenen URLs zu finden sind, sollte der Wert von `/document/tracking/version` als `- version VERSION` nach `FORMAT` angefügt werden.
Wenn die neueste Version immer unter derselben URL zu finden ist, kann der Teil `VERSION` wie folgt identifiziert werden `- latest version`
