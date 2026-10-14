# Branch - Specification

Every Branch holds exactly 3 properties and is a part of the hierarchical structure of the product tree.
The properties

* [Name](types/branches/branch/name-spec.en.md) (`name`)
* [Category](types/branches/branch/category-spec.en.md) (`category`)

are mandatory.
In addition, the object contains either a

* [Branches](product_tree/branches-spec.en.md) (`branches`)

or a

* [Product](types/branches/branch/product-spec.en.md) `product` property.

```javascript
"properties": {
  "branches": {
    // ...
  },
  "category": {
    // ...
  },
  "name": {
    // ...
  },
  "product": {
    // ...
  }
}
```

> `branches_t` supports building a hierarchical structure of products that allows to indicate the relationship of
> products to each other and enables grouping for simpler referencing. As an example, the structure MAY use the
> following levels: `vendor` -> `product_family` -> `product_name` -> `product_version`.
> It is recommended to use the hierarchical structure of `vendor` -> `product_name` -> `product_version` whenever
> possible to support the identification and matching of products on the consumer side.
