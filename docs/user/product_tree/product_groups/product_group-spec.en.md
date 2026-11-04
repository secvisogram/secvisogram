# Product Groups - Specification

The product group items are of value type `object` with the 2 mandatory properties

* [Group ID](product_tree/product_groups/product_group/group_id-spec.en.md) (`group_id`)
* [Product IDs](product_tree/product_groups/product_group/product_ids-spec.en.md) (`product_ids`)

and the optional

* [Summary](product_tree/product_groups/product_group/summary-spec.en.md) (`summary`)

property.

```javascript
    "properties": {
      "group_id": {
        // ...
      },
      "product_ids": {
        // ...
      },
      "summary": {
        // ...
      }
    }
```
