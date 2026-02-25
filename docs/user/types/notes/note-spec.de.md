# Note - Spezifikation

Der Wertetyp eines jeden solchen Notiz-Elements ist `object` mit den obligatorischen Eigenschaften

* [Kategorie](types/notes/note/category-spec.de.md) (`category`)
* [Text](types/notes/note/text-spec.de.md) (`text`)

die einen Platz für alle Arten von Textblöcken in Bezug auf den aktuellen Kontext bieten.
Eine Notiz `object` KANN die folgenden optionalen Eigenschaften aufweisen

* [Publikum](types/notes/note/audience-spec.de.md) (`audience`)
* [Titel](types/notes/note/title-spec.de.md) (`title`)

```javascript
"properties": {
  "audience": {
    // ...
  },
  "category": {
    // ...
  },
  "text": {
    // ...
  },
  "title": {
    // ...
  }
}
```
