# Version - Spezifikation

Der Typ Version (`version_t`) hat den Wertetyp `string` mit `pattern` (regulärer Ausdruck):

```regexp
^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$
```

Die Version gibt eine Versionszeichenkette an, um die Entwicklung des Inhalts des Dokuments deutlich zu kennzeichnen.
Es gibt zwei Möglichkeiten, wie sie verwendet werden kann:

* semantische Versionierung (bevorzugt; gemäß den unten stehenden Regeln)
* ganzzahlige Versionierung

Ein CSAF-Dokument MUSS nur ein Versionierungssystem verwenden.

*Beispiele:*

* `1`
* `4`
* `0.9.0`
* `1.4.3`
* `2.40.0+21AF26D3`

## Ganzzahlige Versionierung

Integer versioning erhöht für jede Version, wobei `/document/tracking/status` `final` die Versionsnummer um eins erhöht.
Der reguläre Ausdruck für diesen Typ ist:

```regexp
^(0|[1-9][0-9]*)$
```

Es gelten die folgenden Regeln:

1. Sobald ein Dokument in einer bestimmten Version freigegeben wurde, darf der Inhalt dieser Version NICHT mehr geändert werden.
   Jede Änderung MUSS als neue Version freigegeben werden.
2. Version Null (0) ist für die anfängliche Entwicklung vor der `initial_release_date`.
   Der Dokumentstatus MUSS `draft` lauten.
   Alles KANN sich jederzeit ändern.
   Das Dokument DARF NICHT als stabil angesehen werden.
3. Version 1 definiert die erste öffentliche Freigabe. Jede neue Version, bei der `/document/tracking/status` gleich `final` ist, hat eine um eins erhöhte Versionsnummer.
4. Vorabversionen (Dokumentstatus `draft`) MÜSSEN die neue Versionsnummer tragen.
   Einzige Ausnahme ist die Zeit vor der Erstveröffentlichung (siehe Regel 2).
   Die Kombination von Dokumentstatus `draft` und Version 1 KANN verwendet werden, um anzuzeigen, dass sich der Inhalt wahrscheinlich nicht ändern wird.
5. Build-Metadaten sind niemals in der Version enthalten.
6. Die Vorrangigkeit MUSS durch einen ganzzahligen Vergleich berechnet werden.

## Semantische Versionierung

Für die semantische Versionierung wurden die Regeln von [[SemVer]](#semver) abgeleitet. Der reguläre Ausdruck für diesen Typ ist:

```regexp
^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$
```

Das Ziel dieser Struktur ist es, dem Endbenutzer zusätzliche Informationen darüber zu liefern, ob ein neuer Abgleich mit der Asset-Datenbank erforderlich ist. Die "öffentliche API" in Bezug auf das CSAF ist das CSAF-Dokument mit seiner Struktur und seinem Inhalt. Daraus ergeben sich die folgenden Regeln:

1. Eine normale Versionsnummer MUSS die Form X.Y.Z haben, wobei X, Y und Z nicht-negative ganze Zahlen sind und KEINE führenden Nullen enthalten MÜSSEN.
   X ist die Hauptversion, Y ist die Nebenversion und Z ist die Patch-Version.
   Jedes Element MUSS numerisch zunehmen. Zum Beispiel: 1.9.0 -&gt; 1.10.0 -&gt; 1.11.0.
2. Nach der Freigabe eines versionierten Dokuments darf der Inhalt dieser Version NICHT mehr geändert werden.
   Jede Änderung MUSS als neue Version freigegeben werden.
3. Die Hauptversion Null (0.y.z) ist für die anfängliche Entwicklung vor der `initial_release_date`.
   Der Dokumentstatus MUSS `draft` sein. Alles KANN sich jederzeit ändern.
   Das Dokument SOLLTE NICHT als stabil angesehen werden.
   Änderungen, die die Hauptversion gemäß Regel 7 erhöhen würden, werden in diesem Stadium mit (0.y.z) verfolgt, indem stattdessen die Nebenversion y erhöht wird.
   Änderungen, die die Minor- oder Patch-Version gemäß Regel 6 oder 5 erhöhen würden, werden in dieser Phase mit (0.y.z) verfolgt, indem stattdessen die Patch-Version z erhöht wird.
4. Version 1.0.0 definiert die erste öffentliche Freigabe.
   Die Art und Weise, wie die Versionsnummer nach dieser Freigabe inkrementiert wird, hängt vom Inhalt und der Struktur des Dokuments ab und davon, wie es sich verändert.
5. Die Patch-Version Z (x.y.Z | x &gt; 0) MUSS erhöht werden, wenn nur rückwärtskompatible Fehlerbehebungen eingeführt werden.
   Eine Fehlerbehebung ist definiert als eine interne Änderung, die ein fehlerhaftes Verhalten korrigiert.

   &gt; Im Kontext des Dokuments ist dies z.B. bei Rechtschreibfehlern der Fall.

6. Die Nebenversion Y (x.Y.z | x &gt; 0) MUSS erhöht werden, wenn sich der Inhalt eines bestehenden Elements ändert, mit Ausnahme derjenigen, die durch Regel 7 verdeckt werden.
   Sie MUSS inkrementiert werden, wenn wesentliche neue Informationen eingeführt oder neue Elemente bereitgestellt werden. Sie KANN Änderungen der Patch-Ebene enthalten.
   Die Patch-Version MUSS auf 0 zurückgesetzt werden, wenn die Minor-Version inkrementiert wird.
7. Die Hauptversion X (X.y.z | X &gt; 0) MUSS erhöht werden, wenn ein neuer Vergleich mit der Asset-Datenbank des Endnutzers erforderlich ist.
   Dies schließt ein:

   * Änderungen (Hinzufügen, Entfernen von Elementen oder Ändern von Inhalten) in `/product_tree` oder Elementen, die `/product_tree` in ihrem Pfad enthalten
   * Hinzufügen oder Entfernen von Elementen in `/vulnerabilities`
   * Hinzufügen oder Entfernen von Elementen in:
     * `/vulnerabilities[]/product_status/first_affected`
     * `/vulnerabilities[]/product_status/known_affected`
     * `/vulnerabilities[]/product_status/last_affected`
   * Entfernen von Elementen aus:
     * `/vulnerabilities[]/product_status/first_fixed`
     * `/vulnerabilities[]/product_status/fixed`
     * `/vulnerabilities[]/product_status/known_not_affected`

   Sie KANN auch Änderungen auf Minor- und Patch-Ebene enthalten. Patch- und Minor-Version MÜSSEN auf 0 zurückgesetzt werden, wenn die Major-Version erhöht wird.
8. Eine Vorabversion (Dokumentstatus `draft`) KANN durch Anhängen eines Bindestrichs und einer Reihe von durch Punkte getrennten Bezeichnern unmittelbar nach der Patch-Version angegeben werden.
   Die Bezeichner MÜSSEN nur aus alphanumerischen ASCII-Zeichen und Bindestrichen [0-9A-Za-z-] bestehen. Bezeichner MÜSSEN NICHT leer sein.
   Numerische Bezeichner MÜSSEN KEINE führenden Nullen enthalten. Vorabversionen haben einen geringeren Vorrang als die zugehörige normale Version.
   Eine Vorabversion zeigt an, dass die Version instabil ist und möglicherweise nicht die beabsichtigten Kompatibilitätsanforderungen erfüllt, wie sie in der zugehörigen Normalversion angegeben sind.

   *Beispiele:*

   * `1.0.0-0.3.7`
   * `1.0.0-alpha`
   * `1.0.0-alpha.1`
   * `1.0.0-x-y-z.–`
   * `1.0.0-x.7.z.92`

9. Die Vorabfreigabe MUSS NICHT enthalten sein, wenn `/document/tracking/status` `final` ist.
10. Build-Metadaten KÖNNEN durch Anhängen eines Pluszeichens und einer Reihe von durch Punkte getrennten Bezeichnern unmittelbar nach dem Patch oder der Vorabversion angegeben werden.
    Bezeichner MÜSSEN nur aus alphanumerischen ASCII-Zeichen und Bindestrichen [0-9A-Za-z-] bestehen.
    Bezeichner MÜSSEN NICHT leer sein. Build-Metadaten MÜSSEN bei der Bestimmung des Versionsvorrangs ignoriert werden.
    Somit haben zwei Versionen, die sich nur in den Build-Metadaten unterscheiden, den gleichen Vorrang.

    *Beispiele:*

    * `1.0.0+20130313144700`
    * `1.0.0+21AF26D3—-117B344092BD`
    * `1.0.0-alpha+001`
    * `1.0.0-beta+exp.sha.5114f85`

11. Der Begriff "Vorrang" bezieht sich darauf, wie die Versionen in der Reihenfolge miteinander verglichen werden.

12. Die Rangfolge MUSS berechnet werden, indem die Version in Major-, Minor-, Patch- und Pre-Release-Kennungen in dieser Reihenfolge aufgeteilt wird (Build-Metadaten spielen bei der Rangfolge keine Rolle).
13. Die Vorrangigkeit wird durch die erste Differenz beim Vergleich jeder dieser Kennungen von links nach rechts wie folgt bestimmt: Major-, Minor- und Patch-Versionen werden immer numerisch verglichen.

    *Beispiel:*

    * `1.0.0 < 2.0.0 < 2.1.0 < 2.1.1`

14. Wenn Major, Minor und Patch gleich sind, hat eine Vorabversion einen geringeren Vorrang als eine normale Version:

    *Beispiel:*

    * `1.0.0-alpha < 1.0.0`

15. Die Vorrangigkeit zweier Vorabversionen mit derselben Haupt-, Neben- und Patch-Version MUSS bestimmt werden, indem jeder durch Punkte getrennte Bezeichner von links nach rechts verglichen wird, bis ein Unterschied wie folgt festgestellt wird:

16. Kennungen, die nur aus Ziffern bestehen, werden numerisch verglichen.
17. Bezeichner mit Buchstaben oder Bindestrichen werden lexikalisch in ASCII-Sortierreihenfolge verglichen.
18. Numerische Bezeichner haben immer einen niedrigeren Vorrang als nicht-numerische Bezeichner.
19. Ein größerer Satz von Vorab-Freigabefeldern hat eine höhere Priorität als ein kleinerer Satz, wenn alle vorangehenden Bezeichner gleich sind.

    *Beispiel:*

    * `1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0`

___

<a name="semver"/>**[SemVer]**

*Semantic Versioning 2.0.0*, T. Preston-Werner, Juni 2013, [https://semver.org/](https://semver.org/).
