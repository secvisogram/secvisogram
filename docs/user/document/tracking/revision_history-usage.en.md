# Revision History - Usage

The revision history is used to track the development of the document in at least all published versions.
There must be an entry in the revision history for each published version.
For pre-release versions there are no entries in the version history. However, before the first release, the field can be used to record changes.

The revision items sorted by date must have `number` values in ascending order.

The `number` of the revision item with the most recent `date` value must be the same as in `/document/tracking/version`.
For this comparison build metadata is ignored.
If the document status is `draft` any pre-release part is also ignored.

The revision items sorted by date must not omit a version `number`.
In case of [semantic versioning](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31111-version-type---integer-versioning),
this applies only to the major version.
This sorted list of version numbers must start with (major) version `0` for documents in `draft` status or `1` in `final` or `interim` status.

The same version `number` must not be repeated for multiple revision items.

The oldest revision item should not have a newer `date` than the initial release date `/document/tracking/initial_release_date`.
