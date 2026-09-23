# Namespace - Specification

The Namespace of publisher (`namespace`) of value type `string` with format `uri` contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party.
The URL SHALL be normalized.

An issuing party can choose any URL which fulfills the requirements state above. The URL MAY be dereferenceable.
If an issuing party has chosen a URL, it SHOULD NOT change.
Tools can make use of the combination of `/document/publisher/namespace` and `/document/tracking/id` as it identifies a CSAF document globally unique.

If an issuing party decides to change its Namespace it SHOULD reissue all CSAF documents with an incremented (patch) version which has no other changes than:

* the new publisher information
* the updated revision history
* the updated item in `/document/references[]` which points to the new version of the CSAF document
* an added item in `/document/references[]` which points to the previous version of the CSAF document (if the URL changed)

*Example:*

* `https://csaf.io`
* `https://www.example.com`
