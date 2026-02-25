# Model Number - Specification

Any given model number of value type `string` with at least 1 character represents a full or abbreviated (partial) model number of the component to identify.

> The terms "model", "model number" and "model variant" are mostly used synonymously. Often it is abbreviated as "MN",
> M/N" or "model no.".

If a part of a model number of the component to identify is given, it SHOULD begin with the first character of the model number and stop at any point.
Characters which SHOULD NOT be matched MUST be replaced by either `?` (for a single character) or `*` (for zero or more characters).
Two `*` MUST NOT follow each other.

*Examples:*

* `6RA8096-4MV62-0AA0`
* `6RA801?-??V62-0AA0`
* `IC25T060ATCS05-0`
