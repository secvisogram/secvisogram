# Category - Spezifikation

Die Kategorie des Zweigs (`category`) vom Wertetyp `string` und `enum` beschreibt die Merkmale des beschrifteten Zweigs.
Gültige `enum` Werte sind:

* `architecture`
* `host_name`
* `language`
* `legacy`
* `patch_level`
* `product_family`
* `product_name`
* `product_version`
* `product_version_range`
* `service_pack`
* `specification`
* `vendor`

Der Wert `architecture` gibt die Architektur an, für die das Produkt bestimmt ist.

Der Wert `host_name` gibt den Hostnamen eines Systems/Dienstes an.

Der Wert `language` gibt die Sprache des Produkts an.

Der Wert `legacy` gibt einen Eintrag an, der das Ende seiner Lebensdauer erreicht hat.

Der Wert `patch_level` gibt den Patch-Level des Produkts an.

Der Wert `product_family` gibt die Produktfamilie an, in die das Produkt fällt.

Der Wert `product_name` gibt den Namen des Produkts an.

Der Wert `product_version` gibt genau eine einzige Version des Produkts an.
Der Wert der benachbarten Eigenschaft `name` kann numerisch oder ein anderer Deskriptor sein.
Er MUSS jedoch KEINE Versionsbereiche irgendeiner Art enthalten.

&gt; Es wird empfohlen, wo immer möglich, Versionen aufzuzählen. Der TC ist sich jedoch bewusst, dass dies manchmal
&gt; unmöglich ist. Um dies in der Spezifikation zu berücksichtigen und die automatische Verarbeitung von CSAF-Dokumenten zu unterstützen, wurde der Wert
&gt; `product_version_range` eingeführt.

Der Wert `product_version_range` gibt einen Versionsbereich für das Produkt an. Der Wert der benachbarten Eigenschaft `name` DARF NICHT verwendet werden, um eine einzelne Version zu übermitteln.

Der Wert `service_pack` gibt das Service Pack des Produkts an.

Der Wert `specification` gibt die Spezifikation an, wie z. B. einen Standard, eine bewährte Praxis usw.

Der Wert `vendor` gibt den Namen des Anbieters oder Herstellers an, der das Produkt herstellt.
