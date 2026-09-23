# Category - Spezifikation

Der Beziehungstyp (`category`) vom Werttyp `string` und `enum` definiert den Beziehungstyp für die referenzierte Komponente. Die gültigen Werte sind:

* `default_component_of`
* `external_component_of`
* `installed_on`
* `installed_with`
* `optional_component_of`

Der Wert `default_component_of` zeigt an, dass die mit einer Produkt-ID (z. B. CSAFPID-0001) gekennzeichnete Einheit eine Standardkomponente einer Einheit mit einer anderen Produkt-ID (z. B. CSAFPID-0002) ist. Diese Produkt-IDs SOLLTEN NICHT identisch sein, um ein Minimum an Redundanz zu gewährleisten.

Der Wert `external_component_of` zeigt an, dass die mit einer Produkt-ID (z. B. CSAFPID-0001) gekennzeichnete Einheit eine externe Komponente einer Einheit mit einer anderen Produkt-ID (z. B. CSAFPID-0002) ist. Diese Produkt-IDs SOLLTEN NICHT identisch sein, um eine minimale Redundanz zu gewährleisten.

Der Wert `installed_on` gibt an, dass die mit einer Produkt-ID (z. B. CSAFPID-0001) gekennzeichnete Einheit auf einer Plattformeinheit mit einer anderen Produkt-ID (z. B. CSAFPID-0002) installiert ist. Diese Produkt-IDs SOLLTEN NICHT identisch sein, um eine minimale Redundanz zu gewährleisten.

Der Wert `installed_with` gibt an, dass die mit einer Produkt-ID (z. B. CSAFPID-0001) gekennzeichnete Einheit neben einer Einheit mit einer anderen Produkt-ID (z. B. CSAFPID-0002) installiert ist. Diese Produkt-IDs SOLLTEN NICHT identisch sein, um eine minimale Redundanz zu gewährleisten.

Der Wert `optional_component_of` gibt an, dass die mit einer Produkt-ID (z. B. CSAFPID-0001) gekennzeichnete Einheit eine optionale Komponente einer Einheit mit einer anderen Produkt-ID (z. B. CSAFPID-0002) ist. Diese Produkt-IDs SOLLTEN NICHT identisch sein, um eine minimale Redundanz zu gewährleisten.
