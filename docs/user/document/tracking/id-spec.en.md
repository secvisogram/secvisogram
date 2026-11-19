# ID - Specification

Unique identifier for the document (`id`) of value type `string` with 1 or more characters with `pattern` (regular expression):

```regexp
^[\\S](.*[\\S])?$
```

Unique identifier for the document holds the Identifier.

> It SHALL NOT start or end with a white space and SHALL NOT contain a line break.

The ID is a simple label that provides for a wide range of numbering values, types, and schemes.
Its value SHOULD be assigned and maintained by the original document issuing authority.
It MUST be unique for that organization.

*Examples:*

* `Example Company - 2019-YH3234`
* `RHBA-2019:0024`
* `cisco-sa-20190513-secureboot`

> The combination of `/document/publisher/namespace` and `/document/tracking/id` identifies a CSAF document globally
> unique.

This value is also used to determine the filename for the CSAF document (cf. specification section 5.1).
