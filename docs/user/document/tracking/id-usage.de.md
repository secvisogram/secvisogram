**ID - Verwendung**

Der eindeutige Name des Dokuments innerhalb der ausstellenden Partei.

In Kombination mit dem Herausgeber-Namensraum (`/document/publisher/namespace`) ist das CSAF-Dokument global identifizierbar.
Wenn die Dokumentversion zu dieser Kombination hinzugefügt wird, wird eine einzelne Version des Dokuments global eindeutig identifiziert.

Die Tracking-ID bleibt konstant, wenn eine neue Version des Dokuments veröffentlicht wird.

Der Dateiname des Dokuments wird von dieser ID abgeleitet, wie in der [Spezifikation](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#51-filename) beschrieben.

Die ID ist in der Regel eine Kombination aus einer kurzen Kennung der herausgebenden Partei, dem Jahr und einer fortlaufenden Nummer.
Das empfohlene Format ist "CompanyAbbreviation-YYYY-#####".

*Beispiele:*

* `ECSA-2022-00123` (Beispiel eines Sicherheitshinweises des Unternehmens)
