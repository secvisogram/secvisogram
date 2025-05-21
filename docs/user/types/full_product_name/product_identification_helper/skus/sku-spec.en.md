# SKU - Specification

Any given stock keeping unit of value type `string` with at least 1 character represents a full or abbreviated (partial) stock keeping unit (SKU) of the component to identify.

> Sometimes this is also called "item number", "article number" or "product number".

If a part of a stock keeping unit of the component to identify is given, it SHOULD begin with the first character of the stock keeping unit and stop at any point.
Characters which SHOULD NOT be matched MUST be replaced by either `?` (for a single character) or `*` (for zero or more characters).
Two `*` MUST NOT follow each other.
