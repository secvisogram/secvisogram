# Purl - Spezifikation

Die Darstellung der Paket-URL (PURL) (`purl`) ist eine `string` von 7 oder mehr Zeichen mit `pattern` (regulärer Ausdruck):

```regexp
^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+
```

&gt; Das angegebene Muster bewertet nicht vollständig, ob eine PURL gemäß der Spezifikation [[PURL]](#purl) gültig ist.
&gt; Es bietet einen allgemeineren Ansatz und eine allgemeine Anleitung, um Vorwärtskompatibilität zu ermöglichen. CSAF verwendet nur die kanonische
&gt; Form von PURL, um mit Abschnitt 3.3 von [[RFC3986]](#rfc3986) konform zu sein. Daher werden URLs, die mit `pkg://` beginnen
&gt; als ungültig betrachtet.

Dieses Paket-URL (PURL)-Attribut bezieht sich auf eine Methode zur zuverlässigen Identifizierung und Lokalisierung von Softwarepaketen außerhalb dieser Spezifikation.
Siehe [[PURL]](#purl) für Details.

___

<a name="purl"/>**[PURL]**

*Package URL (PURL)*, GitHub Projekt, [https://github.com/package-url/purl-spec](https://github.com/package-url/purl-spec).

<a name="rfc3986"/>[RFC3986]

Berners-Lee, T., Fielding, R., und L. Masinter, "Uniform Resource Identifier (URI): Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, Januar 2005, [https://www.rfc-editor.org/info/rfc3986](https://www.rfc-editor.org/info/rfc3986).
