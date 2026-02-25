**Lang - Usage**

The language the document is written in.

Must not be the same as `/document/source_lang`.

Helps the consumer to automatically filter the documents according to his language.
Can also be used to sort the documents by language within the distribution mechanism (see section 7 of the specification).

As part of the document creation process, the language helps to run a spell checker.
Therefore, it should be as specific as possible and reasonable: e.g. use `en-US` or `en-GB` instead of just `en`.

Further description of this type can be found under [types](types/lang-usage.en.md).
