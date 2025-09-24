# Developing CSAF Validator Lib

## Table of Contents

- [Code Style](#code-style)
  - [Formatting with prettier](#formatting-with-prettier)
  - [Quoting Strings](#quoting-strings)

## Code Style

### Formatting with prettier

JavaScript code must be formatted with Prettier before it can be pushed to the repository.
A prettier.config.cjs is provided.

### Quoting Strings

Strings have to be quoted in the following way:

- **Single quotes ''**

  - We use `''` (single quotes) when the string has no expressions inside.

- **Template literals (backticks)**

  - We use ` `` ` (template literals) when there is an expression to resolve in the string, e.g. ${metricIndex}

- **Quotation mark in string**
  - We use `""` (double quotation marks) in strings to mark text in messages

**Examples:**

Simple Message:

```
message: 'value is not consistent with the vector string',
```

Message with expression inside

```
message: `branch structure nesting exceeds "${MAX_DEPTH}" branches (it is ${count} levels deep)`
```

Message with "" inside

```
message:
  'the ssvc id does neither match the "cve" nor it '+
  'matches the "text" of any item in the "ids" array',
```
