**Initial Release Date - Usage**

The date when the first version of the document was published.
In pre-release versions the planned publication date is used.

The value should not be older than the `date` of the oldest item in Revision History (`/document/tracking/revision_history`).
Typically, this is identical to the oldest element in the revision history.
For published documents, the oldest item has the `number` value of `1` for [integer versioning](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31112-version-type---semantic-versioning)
and `1.0.0` for [semantic versioning](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31111-version-type---integer-versioning).
The value of initial release date does not change anymore after publication of that first version.

The time should reference the point in time of the actual (planned) publication.
