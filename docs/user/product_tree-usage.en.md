# Product Tree - Usage

The product tree holds all definitions of products referenced later on in the CSAF document.
This is independent of the products' status.

It is recommended to model a hierarchical structure by means of branches in the `product_tree`.
The branch structure typically consists of vendor, product name and product version.
A product family can also be listed between the vendor and product name. This simplifies grouping and display in a human-readable advisory.
The structure depends strongly on the structure of the products and how they are known by the consumers of the advisories.

*Examples:*

* There is a product family with only 2 products that are relevant for the advisory, then the product family does not necessarily have to be listed.
* For a product family with 120 products for which the advisory applies, the strong recommendation is to list the family as well.

In principle software and hardware components are to be represented separately, since hardware remains the same, even if software is updated.
This also allows separation of software that may run on multiple hardware installations.
The connections of hardware and software are to be represented over `/product_tree/relationships`.

The `product_identification_helper` facilitates the matching between the advisory and the asset or SBOM database.

*Example:*

* If the name of a company changes due to an acquisition, the name would in principle be changed from a certain version of the product.
  In fact, however, other more far-reaching name changes may occur, which should be modelled here.

_Additional for profile CSAF Informational Advisory_

If a `product_tree` is listed in an advisory with profile `CSAF Informational Advisory`, then the listed products are all products to which the advisory applies.
