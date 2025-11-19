# Source Lang - Spezifikation

Die Ausgangssprache (`source_lang`) des Werttyps Language Type (`lang_t`) gibt an, ob es sich bei dieser Kopie des Dokuments um eine Übersetzung handelt. Der Wert dieser Eigenschaft beschreibt, aus welcher Sprache das Dokument übersetzt wurde.

Die Eigenschaft MUSS für jedes CSAF-Dokument mit dem Wert `translator` in `/document/publisher/category` vorhanden und gesetzt sein.
Die Eigenschaft MUSS NICHT vorhanden sein, wenn das Dokument nicht übersetzt wurde.

Wenn eine ausstellende Partei ein CSAF-Dokument mit demselben Inhalt in mehr als einer Sprache veröffentlicht, &gt; MUSS eines dieser Dokumente
&gt; eines dieser Dokumente als "Original" betrachtet werden, die anderen SOLLTEN als Übersetzungen des "Originals" betrachtet werden. Die ausstellende
Die ausstellende &gt; Partei kann ihre ursprünglichen Verlagsinformationen einschließlich der `category` beibehalten. Andere Regeln, die in der
&gt; Konformitätsklausel "CSAF-Übersetzer" definierten Regeln SOLLTEN angewendet werden.

[Spezifikation des Sprachtyps](types/lang-spec.de.md)
