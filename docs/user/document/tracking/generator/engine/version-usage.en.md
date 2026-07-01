**Version - Usage**

Different versions of the generator may generate CSAF documents with potentially different structure.
Based on this value, different paths may need to be used for matching.

*Examples:*

* A company may change their name and in consequence `full_product_name`s and the generation of document changes.
  This would require an adjustment of matching.

A change in versioning (e.g. switching from [integer versioning](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31112-version-type---semantic-versioning) to
[semantic versioning](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31111-version-type---integer-versioning)) requires a change in matching.

*Examples:*

* `0.6.0`
* `1.0.0-beta+exp.sha.a1c44f85`
* `2`
