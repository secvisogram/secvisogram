# Cpe - Spezifikation

Gemeinsame Plattformaufzählungsdarstellung (`cpe`) der Wertart `string` von 5 oder mehr Zeichen mit `pattern` (regulärer Ausdruck):

```regexp
^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!\"#\\$%&'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!\"#\\$%&'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$
```

Das Attribut Common Platform Enumeration (CPE) bezieht sich auf eine Methode zur Benennung von Plattformen außerhalb dieser Spezifikation.
Siehe [[CPE23-N]](#cpe23-n) für Details.

___

<a name="cpe23-n"/>**[CPE23-N]**

_Common Platform Enumeration: Naming Specification Version 2.3_, B. Cheikes, D. Waltermire, K. Scarfone, Editors, NIST Interagency Report 7695, August 2011,
[https://dx.doi.org/10.6028/NIST.IR.7695](https://dx.doi.org/10.6028/NIST.IR.7695).
