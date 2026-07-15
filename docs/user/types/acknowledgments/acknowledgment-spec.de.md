# Acknowledgment - Spezifikation

Der Wertetyp von Acknowledgment ist `object` mit mindestens 1 und höchstens 4 Eigenschaften.
Jedes dieser Elemente erkennt Beiträge an, indem es die Personen beschreibt, die einen Beitrag geleistet haben.
Die Eigenschaften sind:

* [Namen](types/acknowledgments/acknowledgment/names-spec.de.md) (`names`)
* [Organisation](types/acknowledgments/acknowledgment/organization-spec.de.md) (`organization`)
* [Zusammenfassung](types/acknowledgments/acknowledgment/summary-spec.de.md) (`summary`)
* [URLs](types/acknowledgments/acknowledgment/urls-spec.de.md) (`urls`)

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

*Beispiel:*

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

Das obige Beispiel SOLLTE zu folgendem Ergebnis in einem für Menschen lesbaren Gutachten führen:

> Wir danken den folgenden Parteien für ihre Bemühungen:
>
> * Johann Sebastian Bach, Georg Philipp Telemann, Georg Friedrich Händel von den Barockkomponisten für die wunderbare Musik
> * CISA für die Koordinierungsbemühungen (siehe: [https://cisa.gov](https://cisa.gov))
> * BSI für die Unterstützung bei der Koordination
> * Antonio Vivaldi für die Beeinflussung anderer Komponisten
