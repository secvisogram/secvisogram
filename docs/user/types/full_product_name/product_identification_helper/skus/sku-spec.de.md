# SKU - Spezifikation

Jede beliebige Lagermengeneinheit des Werttyps `string` mit mindestens 1 Zeichen stellt eine vollständige oder abgekürzte (Teil-)Lagermengeneinheit (SKU) der zu identifizierenden Komponente dar.

&gt; Manchmal wird dies auch als "Positionsnummer", "Artikelnummer" oder "Produktnummer" bezeichnet.

Wenn ein Teil einer Lagermengeneinheit des zu identifizierenden Bauteils angegeben wird, SOLLTE er mit dem ersten Zeichen der Lagermengeneinheit beginnen und an einer beliebigen Stelle enden.
Zeichen, die NICHT übereinstimmen SOLLTEN, MÜSSEN entweder durch `?` (für ein einzelnes Zeichen) oder `*` (für null oder mehr Zeichen) ersetzt werden.
Zwei `*` MÜSSEN NICHT aufeinander folgen.
