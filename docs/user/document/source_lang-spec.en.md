# Source Lang - Specification

Source language (`source_lang`) of value type Language Type (`lang_t`) identifies if this copy of the document is a translation then the value of this property describes from which language this document was translated.

The property MUST be present and set for any CSAF document with the value `translator` in `/document/publisher/category`.
The property SHALL NOT be present if the document was not translated.

> If an issuing party publishes a CSAF document with the same content in more than one language, one of these documents
> SHOULD be deemed the "original", the other ones SHOULD be considered translations from the "original". The issuing
> party can retain its original publisher information including the `category`. However, other rules defined in the
> conformance clause "CSAF translator" SHOULD be applied.

[Specification of Language Type](types/lang-spec.en.md)
