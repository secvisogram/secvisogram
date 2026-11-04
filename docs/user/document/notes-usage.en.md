# Notes - Usage

For CSAF advisories that contain a `product_tree`, a short description of the products should be included.
This should have the category `description` and the title "Product Description".
In this note, the product should be described in more detail in terms of functionality and benefits in a few sentences.
This applies analogously to product families.

Another element with title "General Security Recommendations" and category `general` should be created.

Another element of the category `summary` that summarizes vulnerabilities should be created.

Adding a legal disclaimer for the document is encouraged.

FAQs, if not vulnerability specific, belong in this section.

Further description of this type can be found under [types](types/notes-usage.en.md).

_Additional details for profile CSAF Informational Advisory_

For the `csaf_informational_advisory` profile at least one note must exist which has a `category` of `description`, `details`, `general` or `summary`.
It should contain information what the "issue" is about and describe it as well as countermeasures or recommended actions.

_Additional details for profile CSAF Security Incident Response_

For the `csaf_security_incident_response` profile at least one note must exist which has a `category` of `description`, `details`, `general` or `summary`.
The response should be detailed. It may touch on impacts and recommended actions.
The response should be clearly marked as such - e.g. through the title of the note.
