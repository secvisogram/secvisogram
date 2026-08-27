**Category - Verwendung**

Dieser Wert bestimmt den Profilnamen für das CSAF-Dokument.
Es sollte immer der Wert des in der [Spezifikation](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#4-profiles) definierten Profils sein.

Das gewählte Profil hat Auswirkungen darauf, wie das Dokument validiert wird.
Es wird dringend empfohlen, die definierten CSAF-Profile zu verwenden.

Die verfügbaren Profile sind:

* `csaf_base`
* `csaf_informational_advisory`
* `csaf_security_incident_response`
* `csaf_security_advisory`
* `csaf_vex`

Da Advisories mit der Kategorie `csaf_base` keinen großen Nutzen bringen, wird empfohlen, ein höheres Profil zu verwenden.
Für die Validierung wird immer das Profil `csaf_base` als Fallback verwendet. Mit diesem Profil werden weniger Validierungen durchgeführt.
Im Zweifelsfall sollten Sie ein höheres Profil mit mehr Informationen verwenden.

Ein Unternehmen kann benutzerdefinierte Kategorien einführen, was ebenfalls dazu führt, dass `csaf_base` als Fallback für die Validierung verwendet wird.

Für ein Dokument mit dem Profil `csaf_base` darf der Kategoriewert nicht gleich dem (Groß- und Kleinschreibung nicht berücksichtigenden) Namen (ohne das Präfix `csaf_`) oder dem Wert eines anderen Profils als "CSAF Base" sein.
Jedes Vorkommen von Bindestrichen, Leerzeichen und Unterstrichen wird vor der Übereinstimmung aus den Werten auf beiden Seiten entfernt.
Außerdem darf der Wert nicht mit dem reservierten Präfix `csaf_` beginnen, außer wenn der Wert `csaf_base` ist.
