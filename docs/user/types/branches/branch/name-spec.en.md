# Name - Specification

Name of the branch (`name`) of value type `string` with 1 or more characters contains the canonical descriptor or
'friendly name' of the branch.

*Examples:*

* `10`
* `365`
* `Microsoft`
* `Office`
* `PCS 7`
* `SIMATIC`
* `Siemens`
* `Windows`

A leading `v` or `V` in the value of `name` SHOULD only exist for the categories `product_version` or `product_version_range` if it is part of the product version as given by the vendor.

## Name under Product Version

If adjacent property `category` has the value `product_version`, the value of `name` MUST NOT contain version ranges of any kind.

*Examples for `name` when using `product_version`:*

* `10`
* `17.4`
* `v3`

> The `product_version` is the easiest way for users to determine whether their version is meant (provided that the
> given ancestors in the product tree matched): If both version strings are the same, it is a match - otherwise not.
> Therefore, it is always recommended to enumerate product versions instead of providing version ranges.

*Examples for `name` when using `product_version` which are invalid:*

* `8.0.0 - 8.0.1`
* `8.1.5 and later`
* `<= 2`
* `prior to 4.2`
* `All versions < V3.0.29`
* `V3.0, V4.0, V4.1, V4.2`

> All the examples above contain some kind of a version range and are therefore invalid under the category
> `product_version`.

## Name under Product Version Range

If adjacent property `category` has the value `product_version_range`, the value of `name` MUST contain version ranges.
The value of MUST obey to exactly one of the following options:

1. Version Range Specifier (vers)

   > vers is an ongoing community effort to address the problem of version ranges. Its draft specification is available
   > at [[VERS]](#vers).

   vers MUST be used in its canonical form. To convey the term "all versions" the special string `vers:all/*` MUST be used.

   *Examples for `name` when using `product_version_range` with vers:*

   * `vers:gem/>=2.2.0|!= 2.2.1|<2.3.0`
   * `vers:npm/1.2.3|>=2.0.0|<5.0.0`
   * `vers:pypi/0.0.0|0.0.1|0.0.2|0.0.3|1.0|2.0pre1`
   * `vers:tomee/>=8.0.0-M1|<=8.0.1`

   > Through the definitions of the vers specification a user can compute whether a given version is in a given range.

2. Vers-like Specifier (vls)

   This option uses only the `<version-constraint>` part from the vers specification. It MUST NOT have an URI nor the
   `<versioning-scheme>` part. It is a fallback option and SHOULD NOT be used unless really necessary.
   > The reason for that is, that it is nearly impossible for tools to reliable determine whether a given version is in
   > the range or not.

   Tools MAY support this on best effort basis.

   *Examples for `name` when using `product_version_range` with vls:*

   * `<=2`
   * `<4.2`
   * `<V3.0.29`
   * `>=8.1.5`

___

<a name="vers"/>**[VERS]**

_vers: a mostly universal version range specifier_, Part of the PURL GitHub Project,
[https://github.com/package-url/purl-spec/blob/version-range-spec/VERSION-RANGE-SPEC.rst](https://github.com/package-url/purl-spec/blob/version-range-spec/VERSION-RANGE-SPEC.rst).
