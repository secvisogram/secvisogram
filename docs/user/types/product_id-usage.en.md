**Product ID - Usage**

The product ID is used to reference the product later in the document and there is no specified format.
The value is usually assigned by the generator.
To make it easier to find errors, it is recommended to use a prefix to distinguish from product group IDs.

The same `product_id` must not be defined more than once in the same document.

The `product_id` should be referenced somewhere within the same documents.

_Additional for profile CSAF Informational Advisory_

The requirement for the `product_id` to be referenced somewhere within the same documents does not hold for the `csaf_informational_advisory` profile.
Per profile definition the information mentioned in such a CSAF document is applicable to all products listed in the product tree.
