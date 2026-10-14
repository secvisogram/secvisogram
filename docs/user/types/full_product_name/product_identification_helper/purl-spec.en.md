# Purl - Specification

The package URL (PURL) representation (`purl`) is a `string` of 7 or more characters with `pattern` (regular expression):

```regexp
^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+
```

> The given pattern does not completely evaluate whether a PURL is valid according to the [[PURL]](#purl) specification.
> It provides a more generic approach and general guidance to enable forward compatibility. CSAF uses only the canonical
> form of PURL to conform with section 3.3 of [[RFC3986]](#rfc3986). Therefore, URLs starting with `pkg://` are
> considered invalid.

This package URL (PURL) attribute refers to a method for reliably identifying and locating software packages external to this specification.
See [[PURL]](#purl) for details.

___

<a name="purl"/>**[PURL]**

*Package URL (PURL)*, GitHub Project, [https://github.com/package-url/purl-spec](https://github.com/package-url/purl-spec).

<a name="rfc3986"/>[RFC3986]

Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier (URI): Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, January 2005, [https://www.rfc-editor.org/info/rfc3986](https://www.rfc-editor.org/info/rfc3986).
