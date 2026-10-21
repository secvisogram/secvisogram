# Category - Specification

Document category (`category`) with value type `string` of 1 or more characters with `pattern` (regular expression):

```regexp
^[^\\s\\-_\\.](.*[^\\s\\-_\\.])?$
```

Document category defines a short canonical name, chosen by the document producer, which will inform the end user as to the category of document.

> It is directly related to the profiles defined in section 4 of the specification.

```javascript
"category"
:
{
  // ...
}
```

*Examples*:

* `csaf_base`
* `csaf_security_advisory`
* `csaf_vex`
* `Example Company Security Notice`
