# Category - Specification

Category of reference (`category`) of value type `string` and `enum` indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.
Valid `enum` values are:

* `external`
* `self`

The default value for `category` is `external`.

The value `external` indicates, that this document is an external reference to a document or vulnerability in focus
(depending on scope).

The value `self` indicates, that this document is a reference to this same document or vulnerability (also depending on scope).

> This includes links to documents with the same content but different file format (e.g. advisories as PDF or HTML).
