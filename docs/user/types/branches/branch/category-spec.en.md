# Category - Specification

Category of the branch (`category`) of value type `string` and `enum` describes the characteristics of the labeled branch.
Valid `enum` values are:

* `architecture`
* `host_name`
* `language`
* `legacy`
* `patch_level`
* `product_family`
* `product_name`
* `product_version`
* `product_version_range`
* `service_pack`
* `specification`
* `vendor`

The value `architecture` indicates the architecture for which the product is intended.

The value `host_name` indicates the host name of a system/service.

The value `language` indicates the language of the product.

The value `legacy` indicates an entry that has reached its end of life.

The value `patch_level` indicates the patch level of the product.

The value `product_family` indicates the product family that the product falls into.

The value `product_name` indicates the name of the product.

The value `product_version` indicates exactly a single version of the product.
The value of the adjacent `name` property can be numeric or some other descriptor.
However, it MUST NOT contain version ranges of any kind.

> It is recommended to enumerate versions wherever possible. Nevertheless, the TC understands that this is sometimes
> impossible. To reflect that in the specification and aid in automatic processing of CSAF documents the value
> `product_version_range` was introduced.

The value `product_version_range` indicates a range of versions for the product. The value of the adjacent `name` property SHOULD NOT be used to convey a single version.

The value `service_pack` indicates the service pack of the product.

The value `specification` indicates the specification such as a standard, best common practice, etc.

The value `vendor` indicates the name of the vendor or manufacturer that makes the product.
