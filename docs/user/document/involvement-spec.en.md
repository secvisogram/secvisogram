# Involvement - Specification

Involvement (`involvement`) is an optional object that records the coordinated
activities described by the document. It contains the following properties:

* Actions (`actions`): a timeline of coordination actions.
* Entities (`entities`): the parties involved in the coordination.
* Entity Groups (`entity_groups`): named groups of entities that can be
  referenced together.

```javascript
"involvement": {
  "actions": [
    // ...
  ],
  "entities": [
    // ...
  ],
  "entity_groups": [
    // ...
  ]
}
```
