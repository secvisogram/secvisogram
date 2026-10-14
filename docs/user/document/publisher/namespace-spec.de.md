# Namespace - Spezifikation

Der Namespace des Herausgebers (`namespace`) vom Wertetyp `string` mit dem Format `uri` enthält eine URL, die unter der Kontrolle der ausstellenden Partei steht und als weltweit eindeutiger Bezeichner für diese ausstellende Partei verwendet werden kann.
Die URL MUSS normalisiert sein.

Eine ausstellende Partei kann jede URL wählen, die die oben genannten Anforderungen erfüllt. Die URL KANN dereferenzierbar sein.
Wenn eine ausstellende Partei eine URL gewählt hat, SOLLTE sie sich NICHT ändern.
Werkzeuge können die Kombination aus `/document/publisher/namespace` und `/document/tracking/id` nutzen, da sie ein CSAF-Dokument global eindeutig identifiziert.

Wenn eine ausstellende Partei beschließt, ihren Namespace zu ändern, SOLLTE sie alle CSAF-Dokumente mit einer inkrementierten (gepatchten) Version neu ausgeben, die keine anderen Änderungen als diese aufweist:

* die neuen Herausgeberinformationen
* die aktualisierte Revisionsgeschichte
* den aktualisierten Eintrag in `/document/references[]`, der auf die neue Version des CSAF-Dokuments verweist
* einen hinzugefügten Eintrag in `/document/references[]`, der auf die vorherige Version des CSAF-Dokuments verweist (falls sich die URL geändert hat)

*Beispiel:*

* `https://csaf.io`
* `https://www.example.com`
