# File Hashes - Verwendung

Da es Kollisionsangriffe auf `md5` und `sha1` gibt, sollten diese nicht die einzigen vorhandenen Hash-Algorithmen sein.
Jeder dieser Algorithmen sollte von einem zweiten, kryptographisch stärkeren Hash-Algorithmus begleitet werden.

Derselbe Hash-Algorithmus darf nicht in mehreren Elementen in einem Element von Hashes verwendet werden, die zu einer Datei gehören.
