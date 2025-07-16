**Status - Usage**

The working status of the document. Possible values are `draft`, `interim` and `final`.

Must be set to `draft` for all draft versions, i.e. whenever the version is `0` or `0.x.y`, or contains a pre-release part.

If it is foreseeable that updates will come in high frequency within the next days, then the value `interim` should be selected.
The status `interim` asks the consumer to check the advisory more often for updates.
This is especially the case for vulnerabilities where there are frequent updates while the analysis is still running (e.g. like Log4Shell).

The value `final` should be chosen for all versions where no exceptionally high frequency of updates is expected.
For example, if advisories are released once a month on a regular patch day, the value `final` can be specified.
If it is generally not foreseeable that changes will be made at the time of release, the value `final` should be selected.
