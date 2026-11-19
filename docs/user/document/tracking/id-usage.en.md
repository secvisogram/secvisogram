**ID - Usage**

The unique name of the document within the issuing party.

In combination with the publisher namespace (`/document/publisher/namespace`) the CSAF document is globally identifiable.
If the document version is added to that combination, a single version of the document is globally uniquely identified.

The tracking ID remains constant when a new version of the document is released.

The filename of the document is derived from this ID as described in the [specification](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#51-filename).

The ID is typically a combination of a short identifier of the issuing party, year and a sequential number.
The recommended format is "CompanyAbbreviation-YYYY-#####"

*Examples:*

* `ECSA-2022-00123` (Example Company Security Advisory)
