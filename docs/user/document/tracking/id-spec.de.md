# ID - Spezifikation

Eindeutiger Bezeichner für das Dokument (`id`) der Wertart `string` mit 1 oder mehr Zeichen mit `pattern` (regulärer Ausdruck):

```regexp
^[\\S](.*[\\S])?$
```

Eindeutiger Bezeichner für das Dokument enthält den Bezeichner.

&gt; Er MUSS nicht mit einem Leerzeichen beginnen oder enden und darf keinen Zeilenumbruch enthalten.

Die ID ist eine einfache Kennzeichnung, die eine breite Palette von Nummerierungswerten, -typen und -schemata zulässt.
Ihr Wert MUSS von der Behörde, die das Originaldokument ausstellt, zugewiesen und gepflegt werden.
Sie MUSS für diese Organisation eindeutig sein.

*Beispiele:*

* `Example Company - 2019-YH3234`
* `RHBA-2019:0024`
* `cisco-sa-20190513-secureboot`

&gt; Die Kombination aus `/document/publisher/namespace` und `/document/tracking/id` identifiziert ein CSAF-Dokument weltweit
&gt; eindeutig.

Dieser Wert wird auch zur Bestimmung des Dateinamens des CSAF-Dokuments verwendet (vgl. Spezifikation Abschnitt 5.1).
