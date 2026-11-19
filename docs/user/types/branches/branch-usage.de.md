# Branch - Verwendung

Die Zweige werden zur Modellierung eines hierarchischen Produktbaums verwendet.

Zweige werden gegenüber `full_product_names` bevorzugt.

Die Produkte sollten entsprechend ihrer Version aufgelistet werden.
Die Angabe von genauen Produktversionen ist der Angabe von Versionsbereichen vorzuziehen.
Die Aufzählung der Produkte ist in der Regel auf der Empfängerseite leichter abzugleichen.
Außerdem sind nicht alle Versionsbereiche deterministisch.

Da möglicherweise noch nicht alle erforderlichen Daten verfügbar sind, werden Versionsbereiche weiterhin unterstützt.
Wenn Versionsbereiche verwendet werden, sollte der Version Range Specifier (VERS) bevorzugt werden.
Wenn dies nicht möglich ist, gelten die Regeln des Version Range Like Specifier (VLS).

Es ist möglich, dass die genaue Version, die betroffen ist, nicht bekannt ist. In diesem Fall kann ein Versionsbereich verwendet werden.

*Beispiel:*

Version 4.2 eines Produkts kann betroffen sein und Version 4.3 enthält einen Patch.

- Version 4.3 wird als behobene Produktversion aufgeführt
  - wenn nicht bekannt ist, seit welcher Version das Produkt betroffen ist
    - &lt;=4.2 (Bereich) als betroffen aufgeführt
    - oder alle folgenden Versionen einzeln aufgeführt
  - wenn bekannt ist, seit welcher Version das Produkt betroffen ist, sollte der angegebene Bereich oder die aufgeführten Versionen entsprechend angepasst werden

Hotfixes sollten durch die Beziehungen dargestellt werden. Das Produkt ohne und mit Hotfix wird aufgelistet, ersteres in der Produktstatusgruppe `affected`, letzteres in der Gruppe `fixed`.
