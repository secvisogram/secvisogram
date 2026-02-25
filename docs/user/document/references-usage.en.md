# References - Usage

There should be one reference item that provides a canonical URL for this document:
It has the category `self`, the `url` starts with `https://` and ends with a valid filename for the CSAF document according to the rules in [section 5.1. of the specification](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#51-filename).

All links that have any relevance in the overall context of the document should be listed here.
This could include original advisories, advisories of the manufacturer or advisories of the coordinator.
If other advisories (especially from suppliers) are referenced, they should be listed here.

It is recommended to include links to the recommended cybersecurity best practices documents of the organization and the website which lists the advisories.

CVE entries should only be linked in the corresponding vulnerability item.

Further description of this type can be found under [types](types/references-usage.en.md).

_Additional details for profile CSAF Informational Advisory_

For the `csaf_informational_advisory` profile at least one reference must exist which has links to an `external` source.
The sources linked in such external references may be documents or websites providing more details about the issue or its remediation (if possible).
This could be a hardening guide, a manual, best practices or any other helpful information.

_Additional details for profile CSAF Security Incident Response_

For the `csaf_security_incident_response` profile at least one reference must exist which has links to an `external` source.
The sources linked in such external references may be documents or websites providing more details about the incident.
