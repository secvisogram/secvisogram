# Relationships - Usage

Used to model relationships between two products of the `product_tree`.
This could be for example a connection of hard- and software or firmware.

Hardware and corresponding software shall be listed separately with a relationship to connect them.

As a model number (usually) does not change as a result of an update it cannot be determined automatically whether an affected or unaffected part is present.
Thus, a relationship is required to model corresponding software.

A relationship can also be used in cases of OS dependent vulnerabilities or to represent hotfixes.
