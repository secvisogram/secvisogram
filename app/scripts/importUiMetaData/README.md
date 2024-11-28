# Editor Metadata Script

## About

The Secvisogram editor generates its UI based on the input from
[schema.js](../../lib/app/SecvisogramPage/View/FormEditor/schema.js).
This file contains information from two sources. The CSAF JSON Schema and
additional properties from [metaData.js](metaData.js) like the order of
elements, paths to documentation or i18n translation strings.

## Generating the schema file

To merge the CSAF schema with metadata into the schema file required
for generating the UI, use the [importUiMetaData.js](../importUiMetaData.js)
script.

```
$ node importUiMetaData.js
```

## Properties

The following properties can be added in the metadata file.

### `addMenuItemsForChildObjects`

The UI can combine parent and child in one menu. This can make sense if
there are many nested objects, each having only a few or no fields.

Example:

```json
"addMenuItemsForChildObjects": true
```

### `uiType`

Some fields need additional logic that can not be derived from the CSAF schema.
This field specifies the correct input component for the given json path.

Available uiTypes:

| uiType                                | type of input values                                                                                                                                |
| :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| STRING_DATETIME                       | datetime values                                                                                                                                     |
| STRING_URI                            | strings matching the URI pattern                                                                                                                    |
| STRING_ENUM                           | strings with predefined values to select from<br/> the values are defined in the schema file                                                        |
| STRING_WITH_OPTIONS                   | strings with predefined values to select from, still allowing other user input<br/> the values can be added via the `options` property, see below   |
| STRING_MULTI_LINE                     | strings that are potentially larger                                                                                                                 |
| STRING_GENERATE_PRODUCT_ID            | strings with the option to generate a unique product id as value via button                                                                         |
| STRING_PRODUCT_ID                     | strings referencing a product ID<br/> allows selecting from matching product IDs in the frontend                                                    |
| WITH_GENERATED_GROUP_ID               | objects with a unique `group_id` prefilled                                                                                                          |
| STRING_GROUP_ID                       | strings referencing a group ID<br/> allows selecting from matching group IDs in the frontend                                                        |
| STRING_BRANCH_FULL_PRODUCT_NAME       | string with the option to generate a name from the corresponding branch<br/> specific to `/product_tree(/branches)+/product/name`                   |
| STRING_RELATIONSHIP_FULL_PRODUCT_NAME | string with the option to generate a name from the corresponding relationship<br/> specific to `/product_tree/relationships/full_product_name/name` |
| OBJECT_CWE                            | special type for CWE objects ensuring that ID and name match                                                                                        |
| OBJECT_CVSS_2                         | special CVSS v2 object                                                                                                                              |
| OBJECT_CVSS_3                         | special CVSS v3.0 / v3.1 object                                                                                                                     |
| OBJECT_CVSS_4                         | special CVSS v4 object                                                                                                                              |
| ARRAY_REVISION_HISTORY                | special type of array, disabling some input values when the revision history is managed in the backend                                              |

The `importUiMetaData.js` script can detect `STRING_DATETIME`, `STRING_URI`
and `STRING_ENUM` on its own. All other uiTypes must be provided in the
`metaData.js` file.

### `options`

Provides values to select from for `uiType` `STRING_WITH_OPTIONS`.

```json
"options": ["option A", "option B", "option C"]
```

### `propertyOrder`

By default, the input fields and menu entries will use the order provided by
the CSAF JSON schema. If you want to change this you can specify the new
order here. You can only specify a subset since all remaining fields will be
displayed in the previous order at the end.

If we have the following object:

```json
{
  "field_a": "",
  "field_b": "",
  "field_c": "",
  "field_d": "",
  "field_e": ""
}
```

You could change the order like so:

```json
"propertyOrder": [
  "field_c",
  "field_a",
  "field_b"
]
```

This would result in the following order `field_c, field_a, field_b, field_d, field_e`

### `i18n`

The editor will use the translation string specified here to display the
title and description.

```json
"i18n": {
  "title": "",
  "description": ""
},
```

### `userDocumentation`

Specifies the path to user documentation. Currently only the 'usage' file is
displayed in the sidebar.

```json
"userDocumentation": {
  "specification": "docs/user/fileName-spec.en.md",
  "usage": "docs/user/fileName-usage.en.md"
},
```

### `relevanceLevels`

The editor can disable input fields depending on the currently active editor
levels and the selected document profile.

Available profiles:

- csaf_base
- csaf_security_incident_response
- csaf_informational_advisory
- csaf_security_advisory
- csaf_vex

Available relevance levels:

- mandatory
- best_practice
- want_to_have
- nice_to_know
- optional

Example:

```json
"relevanceLevels": {
  "csaf_base": "optional",
  "csaf_security_incident_response": "optional",
  "csaf_informational_advisory": "optional",
  "csaf_security_advisory": "best_practice",
  "csaf_vex": "want_to_have"
}
```

### `disable`

Some fields need to be disabled depending on the current mode of the Editor.

```json
"disable": {
  "ifStandaloneMode": false,
  "ifServerMode": true
}
```

### `itemName`

A name can be given that is shown in the list of items for items in an array.
This can be a translation string or a value of a field in a sub-object.
For a translation string use `itemNameTranslationKey`, for a field value use `itemNameField`.
The `itemNameTranslationKey` should be given but will be overwritten when a value is found in the `itemNameField`.
In case no data is provided, the fallback will be retrieved from the translation string `arrays.defaultItemName`.
Translated strings (from `itemName` and `defaultItemName`) will automatically be completed with the item's index.

```json
"itemName": {
  "itemNameTranslationKey": ""
  "itemNameField": ""
}
```
