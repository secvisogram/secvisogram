# Serial Number - Specification

Any given serial number of value type `string` with at least 1 character represents a full or abbreviated (partial) serial number of the component to identify.

If a part of a serial number of the component to identify is given, it SHOULD begin with the first character of the serial number and stop at any point.
Characters which SHOULD NOT be matched MUST be replaced by either `?` (for a single character) or `*` (for zero or more characters).
Two `*` MUST NOT follow each other.
