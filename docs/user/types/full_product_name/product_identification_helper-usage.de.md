# Product Identification Helper - Verwendung

Eine Sammlung verschiedener Möglichkeiten, ein Produkt in der Asset-Datenbank oder SBOM zu identifizieren.

Wenn sie verwendet wird, um ein neues Produkt zu identifizieren, das durch eine Beziehung gebildet wird, darf kein Wert mit einem der Produkte, die die Beziehung bilden, identisch sein.
Andernfalls würde ein Abgleich zu irreführenden Ergebnissen führen.

*Beispiel*:

Es gibt eine Anwendung (`Product A`), die unter Linux und Windows den gleichen Hash hat, und es wird eine Sicherheitslücke gefunden, die das Programm betrifft, wenn es unter Windows, aber nicht unter Linux ausgeführt wird.
Wenn derselbe Hash in der Beziehung, die die Produkte `Product A installed on Windows` und `Product A installed on Linux` bildet, verknüpft wäre, würde ein Abgleichsalgorithmus dieselbe Liste von Assets für alle 3 Produkt-IDs zurückgeben.
Dies ist jedoch eine zweideutige Übereinstimmung.
