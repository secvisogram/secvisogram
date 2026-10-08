# Branch - Usage

The branches are used to model a hierarchical product tree.

Branches are preferred over `full_product_names`.

Products should be listed according to their version.
Specifying exact product versions is preferred over specifying version ranges.
Enumerating the products is usually easier to match on the recipients side.
Additionally, not all version ranges are deterministic.

Since not all required data may yet be available, version ranges are still supported.
If version ranges are used, the Version Range Specifier (VERS) should be preferred.
If this is not possible, the rules of the Version Range Like Specifier (VLS) apply.

It is possible that the exact version that is affected is not known. In this case a version range can be used.

*Example:*

Version 4.2 of a product may be affected and version 4.3 contains a patch.

- Version 4.3 listed as fixed product version
  - if it is not known since which version the product is affected
    - <=4.2 (range) listed as affected
    - or all versions below listed individually
  - if it is known since which version the product is affected, the given range or listed versions should be adjusted accordingly

Hotfixes should be represented through the relationships. The product without and with hotfix are listed, the first in the `affected` product status group, the latter in the `fixed` group.
