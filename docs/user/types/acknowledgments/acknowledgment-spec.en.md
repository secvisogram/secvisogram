# Acknowledgment - Specification

The value type of Acknowledgment is `object` with at least 1 and at most 4 properties.
Every such element acknowledges contributions by describing those that contributed.
The properties are:

* [Names](types/acknowledgments/acknowledgment/names-spec.en.md) (`names`)
* [Organization](types/acknowledgments/acknowledgment/organization-spec.en.md) (`organization`)
* [Summary](types/acknowledgments/acknowledgment/summary-spec.en.md) (`summary`)
* [URLs](types/acknowledgments/acknowledgment/urls-spec.en.md) (`urls`)

```javascript
"properties": {
  "names": {
    // ...
  },
  "organization": {
    // ...
  },
  "summary": {
    // ...
  },
  "urls": {
    // ...
  }
}
```

*Example:*

```javascript
"acknowledgments": [
  {
    "names": [
      "Johann Sebastian Bach",
      "Georg Philipp Telemann",
      "Georg Friedrich Händel"
    ],
    "organization": "Baroque composers",
    "summary": "wonderful music"
  },
  {
    "organization": "CISA",
    "summary": "coordination efforts",
    "urls": [
      "https://cisa.gov"
    ]
  },
  {
    "organization": "BSI",
    "summary": "assistance in coordination"
  },
  {
    "names": [
      "Antonio Vivaldi"
    ],
    "summary": "influencing other composers"
  },
]
```

The example above SHOULD lead to the following outcome in a human-readable advisory:

> We thank the following parties for their efforts:
>
> * Johann Sebastian Bach, Georg Philipp Telemann, Georg Friedrich Händel from Baroque composers for wonderful music
> * CISA for coordination efforts (see: [https://cisa.gov](https://cisa.gov))
> * BSI for assistance in coordination
> * Antonio Vivaldi for influencing other composers
