# Filename - Spezifikation

Die Dateinamensdarstellung (`filename`) vom Wertetyp `string` mit einem oder mehreren Zeichen enthält den Namen der Datei, die durch die Hash-Werte identifiziert wird.

*Beispiele:*

* `WINWORD.EXE`
* `msotadddin.dll`
* `sudoers.so`

Wenn der Wert des Hashes übereinstimmt und der Dateiname nicht, SOLLTE ein Benutzer den Hashwert bevorzugen.
In solchen Fällen SOLLTE der Dateiname als Informationseigenschaft verwendet werden.
