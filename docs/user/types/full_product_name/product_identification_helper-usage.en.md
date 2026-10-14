# Product Identification Helper - Usage

A collection of different possibilities to identify a product in the asset database or SBOM.

When it is used to identify a new product formed by a relationship no value must be the same to any of the products that make up the relationship.
Otherwise, a matching would return misleading results.

*Example*:

There is an application (`Product A`) that has the same hash on Linux and Windows and a vulnerability is found that affects the program when being executed on Windows but not on Linux.
If the same hash would be linked in the relationship that forms the products `Product A installed on Windows` and `Product A installed on Linux`, a matching algorithm would return the same list of assets for all 3 product IDs.
However, that is an ambiguous match.
