**Category - Usage**

This value determines the profile name for the CSAF document.
It should always be the value of the profile defined in the [specification](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#4-profiles).

The selected profile has an impact on how the document is validated.
It is highly encouraged to use the defined CSAF profiles.

The available profiles are:

* `csaf_base`
* `csaf_informational_advisory`
* `csaf_security_incident_response`
* `csaf_security_advisory`
* `csaf_vex`

As advisories with category `csaf_base` do not provide much value, it is recommended to use a higher profile.
For validation, the profile `csaf_base` is always used as fallback. With this profile, fewer validations are carried out.
In general, if in doubt, use a higher profile containing more information.

A company may introduce custom categories, which will also lead to `csaf_base` being used as fallback for validation.

For a document with the profile `csaf_base` the category value must not be equal to the (case insensitive) name (without the prefix `csaf_`) or value of any other profile than "CSAF Base".
Any occurrences of dash, whitespace, and underscore characters are removed from the values on both sides before the match.
Also, the value must not start with the reserved prefix `csaf_` except if the value is `csaf_base`.
