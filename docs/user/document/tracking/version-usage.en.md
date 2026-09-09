**Version - Usage**

The version of the present document.

The version may still contain pre-release information (e.g. 1.0.0-17) or build metadata for documents in `draft` status.
For documents in `interim` or `final` status no pre-release information must be included.

In general, a distinction is made between integer versioning and semantic versioning.
With integer versioning the version number is incremented by one for every public release.
With semantic versioning the version number has the form `MAJOR.MINOR.PATCH` and the individual parts are incremented under certain conditions.
Whenever the operator needs to do a new matching run on his asset database (matching the products from the CSAF product tree with deployed products) the `MAJOR` version is incremented.
For small changes such as correcting typos, the `PATCH` version is incremented.
All changes in between trigger an increase of the `MINOR` version.
The exact rules of the versioning schemes are defined in [section 3.1.11 of the specification](https://docs.oasis-open.org/csaf/csaf/v2.0/cs02/csaf-v2.0-cs02.html#3111-version-type).

Further description of this type can be found under [types](types/version-usage.en.md).
