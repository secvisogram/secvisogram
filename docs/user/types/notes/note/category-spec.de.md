# Category - Spezifikation

Die Notizkategorie (`category`) der Wertart `string` und `enum` enthält die Information, um welche Art von Notiz es sich handelt.

* `description`
* `details`
* `faq`
* `general`
* `legal_disclaimer`
* `other`
* `summary`

Der Wert `description` zeigt an, dass die Notiz eine Beschreibung von etwas ist. Die optionale Geschwister-Eigenschaft `title` KANN in diesem Fall weitere Informationen enthalten.

Der Wert `details` zeigt an, dass es sich bei der Notiz um eine detaillierte Diskussion auf niedriger Ebene handelt. Die optionale Geschwister-Eigenschaft `title` KANN in diesem Fall weitere Informationen enthalten.

Der Wert `faq` gibt an, dass es sich bei dem Hinweis um eine Liste häufig gestellter Fragen handelt.

Der Wert `general` zeigt an, dass es sich um einen allgemeinen, übergeordneten Hinweis handelt. Die optionale geschwisterliche Eigenschaft `title` KANN in diesem Fall weitere Informationen enthalten.

Der Wert `legal_disclaimer` gibt an, dass es sich bei dem Hinweis um eine mögliche rechtliche Diskussion, einschließlich Einschränkungen, im Zusammenhang mit dem Dokument handelt.

Der Wert `other` zeigt an, dass es sich um einen Hinweis handelt, der nicht in die anderen Kategorien passt. Das optionale Geschwisterattribut `title` SOLLTE mehr Informationen enthalten, um deutlich zu machen, welche Art von Hinweis in diesem Fall zu erwarten ist.

Der Wert `summary` zeigt an, dass die Notiz eine Zusammenfassung von etwas ist. Die optionale Geschwistereigenschaft `title` KANN in diesem Fall weitere Informationen enthalten.
