# Cpe - Specification

Common Platform Enumeration representation (`cpe`) of value type `string` of 5 or more characters with `pattern` (regular expression):

```regexp
^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!\"#\\$%&'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!\"#\\$%&'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$
```

The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.
See [[CPE23-N]](#cpe23-n) for details.

___

<a name="cpe23-n"/>**[CPE23-N]**

_Common Platform Enumeration: Naming Specification Version 2.3_, B. Cheikes, D. Waltermire, K. Scarfone, Editors, NIST Interagency Report 7695, August 2011,
[https://dx.doi.org/10.6028/NIST.IR.7695](https://dx.doi.org/10.6028/NIST.IR.7695).
