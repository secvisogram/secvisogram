# Name - Spezifikation

Name des Zweigs (`name`) vom Wertetyp `string` mit 1 oder mehr Zeichen enthält den kanonischen Deskriptor oder
'freundlicher Name' des Zweigs.

*Beispiele:*

* `10`
* `365`
* `Microsoft`
* `Office`
* `PCS 7`
* `SIMATIC`
* `Siemens`
* `Windows`

Ein führender `v` oder `V` im Wert von `name` SOLLTE nur dann für die Kategorien `product_version` oder `product_version_range` vorhanden sein, wenn er Teil der vom Hersteller angegebenen Produktversion ist.

## Name unter Produktversion

Wenn die benachbarte Eigenschaft `category` den Wert `product_version` hat, DARF der Wert von `name` KEINE Versionsbereiche irgendeiner Art enthalten.

*Beispiele für `name` bei Verwendung von `product_version`:*

* `10`
* `17.4`
* `v3`

&gt; Die `product_version` ist der einfachste Weg für Benutzer, um festzustellen, ob ihre Version gemeint ist (vorausgesetzt, dass die
&gt; gegebenen Vorfahren im Produktbaum übereinstimmen): Wenn beide Versionsstrings gleich sind, ist es eine Übereinstimmung - sonst nicht.
&gt; Daher ist es immer empfehlenswert, Produktversionen aufzuzählen, anstatt Versionsbereiche anzugeben.

*Beispiele für `name` bei Verwendung von `product_version`, die ungültig sind:*

* `8.0.0 - 8.0.1`
* `8.1.5 and later`
* `<= 2`
* `prior to 4.2`
* `All versions < V3.0.29`
* `V3.0, V4.0, V4.1, V4.2`

&gt; Alle obigen Beispiele enthalten irgendeine Art von Versionsbereich und sind daher unter der Kategorie
&gt; `product_version`.

## Name unter Produktversionsbereich

Wenn die benachbarte Eigenschaft `category` den Wert `product_version_range` hat, MUSS der Wert von `name` Versionsbereiche enthalten.
Der Wert von MUSS genau einer der folgenden Optionen entsprechen:

1. Version Range Specifier (vers)

   &gt; vers ist ein laufendes Gemeinschaftsprojekt, das sich mit dem Problem der Versionsbereiche befasst. Der Entwurf der Spezifikation ist verfügbar
   &gt; unter [[VERS]](#vers).

   vers MUSS in seiner kanonischen Form verwendet werden. Um den Begriff "alle Versionen" zu übermitteln, MUSS der spezielle String `vers:all/*` verwendet werden.

   *Beispiele für `name` bei Verwendung von `product_version_range` mit vers:*

   * `vers:gem/>=2.2.0|!= 2.2.1|<2.3.0`
   * `vers:npm/1.2.3|>=2.0.0|<5.0.0`
   * `vers:pypi/0.0.0|0.0.1|0.0.2|0.0.3|1.0|2.0pre1`
   * `vers:tomee/>=8.0.0-M1|<=8.0.1`

   &gt; Anhand der Definitionen in der Vers-Spezifikation kann ein Benutzer berechnen, ob eine bestimmte Version in einem bestimmten Bereich liegt.

2. Vers-ähnlicher Spezifizierer (vls)

   Diese Option verwendet nur den `<version-constraint>` Teil aus der Vers-Spezifikation. Sie MUSS weder einen URI noch die
   `<versioning-scheme>` Teil. Sie ist eine Fallback-Option und SOLLTE NICHT verwendet werden, wenn es nicht wirklich notwendig ist.
   &gt; Der Grund dafür ist, dass es für Werkzeuge fast unmöglich ist, zuverlässig festzustellen, ob eine bestimmte Version im
   &gt; dem Bereich liegt oder nicht.

   Werkzeuge KÖNNEN dies nach bestem Bemühen unterstützen.

   *Beispiele für `name` bei Verwendung von `product_version_range` mit vls:*

   * `<=2`
   * `<4.2`
   * `<V3.0.29`
   * `>=8.1.5`

___

<a name="vers"/>**[VERS]**

_vers: a mostly universal version range specifier_, Teil des PURL GitHub Projekts,
[https://github.com/package-url/purl-spec/blob/version-range-spec/VERSION-RANGE-SPEC.rst](https://github.com/package-url/purl-spec/blob/version-range-spec/VERSION-RANGE-SPEC.rst).
