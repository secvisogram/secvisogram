# Lang - Spezifikation

Die Sprachart (`lang_t`) hat den Wertetyp `string` mit `pattern` (regulärer Ausdruck):

```regexp
^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$
```

Der Wert identifiziert eine Sprache, entsprechend IETF BCP 47 / RFC 5646. Siehe IETF-Sprachregistrierung: [https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)

&gt; CSAF überspringt diejenigen Sprachkennzeichnungen, die zum Zeitpunkt der Erstellung der Spezifikation veraltet sind. Auch wenn
&gt; die Sprach-Tags für den privaten Gebrauch unterstützt werden, sollten sie nicht verwendet werden, um die Lesbarkeit im gesamten Ökosystem zu gewährleisten.
&gt; Es wird empfohlen, die Konventionen für die Großschreibung der Subtags zu befolgen, auch wenn dies nicht zwingend ist, da
&gt; die meisten Benutzer daran gewöhnt sind.

*Beispiele:*

* `de`
* `en`
* `fr`
* `frc`
* `jp`
