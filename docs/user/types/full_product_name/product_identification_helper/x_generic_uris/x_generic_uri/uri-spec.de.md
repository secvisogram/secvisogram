# Uri - Spezifikation

Der URI (`uri`) vom Wertetyp `string` mit dem Format `uri` enthält den Bezeichner selbst.

&gt; Diese Elemente können verwendet werden, um auf eine bestimmte Komponente in einer SBOM zu verweisen:

*Beispiel für die Verknüpfung einer Komponente aus einer CycloneDX SBOM unter Verwendung des bomlink-Mechanismus:*

```javascript
"x_generic_uris": [
  {
    "namespace": "https://cyclonedx.org/capabilities/bomlink/",
    "uri": "urn:cdx:411dafd2-c29f-491a-97d7-e97de5bc2289/1#pkg:maven/org.jboss.logging/jboss-logging@3.4.1.Final?type=jar"
  }
]
```

*Beispiel für das Verknüpfen einer Komponente aus einer SPDX-SBOM:*

```javascript
"x_generic_uris": [
  {
    "namespace": "https://spdx.github.io/spdx-spec/document-creation-information/#65-spdx-document-namespace-field",
    "uri": "https://swinslow.net/spdx-examples/example4/main-bin-v2#SPDXRef-libc"
  }
]
```
