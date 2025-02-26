# Status - Specification

Document status (`status`) of value type `string` and `enum` defines the draft status of the document.
The value MUST be one of the following:

* `draft`
* `final`
* `interim`

The value `draft` indicates, that this is a pre-release, intended for issuing party's internal use only, or possibly used externally when the party is seeking feedback or indicating its intentions regarding a specific issue.

The value `final` indicates, that the issuing party asserts the content is unlikely to change.
“Final” status is an indication only, and does not preclude updates.
This SHOULD be used if the issuing party expects no, slow or few changes.

The value `interim` indicates, that the issuing party expects rapid updates.
This SHOULD be used if the expected rate of release for this document is significant higher than for other documents.
Once the rate slows down it MUST be changed to `final`.
This MAY be done in a patch version.

> This is extremely useful for downstream vendors to constantly inform the end users about ongoing investigation. It can
> be used as an indication to pull the CSAF document more frequently.
