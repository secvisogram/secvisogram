# BSI CSAF Validator Lib

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
- [How to use](#how-to-use)
  - [Strict Mode](#strict-mode)
  - [API](#api)
    - [Interfaces](#interfaces)
    - [Module `csaf-validator-lib.js`](#module-csafvalidatorlibjs)
- [Testing](#testing)
- [Contributing](#contributing)
- [Dependencies](#dependencies)

## About The Project

This JavaScript library is intended to include logic that can be shared across application working with CSAF.

[(back to top)](#bsi-csaf-validator-lib)

## Getting Started

Add the library to your project by using one of the following methods.
After that you can reference the modules from within your JavaScript application.

### Using the official npm package

There is an [official package](https://www.npmjs.com/package/@secvisogram/csaf-validator-lib) in the npm registry.

You can add it to your project using the following command:

```sh
npm install @secvisogram/csaf-validator-lib
```

### Using a git subtree

You can also include this library as a subtree in your repository.

- include as git subtree

  ```sh
  git subtree add --prefix csaf-validator-lib https://github.com/secvisogram/csaf-validator-lib.git main --squash
  ```

- install dependencies

  ```sh
  cd csaf-validator-lib && npm ci --prod
  ```

- This repository includes git submodules. Make sure to initialize and update
  the submodules before you start working with the repository.

  ```sh
  git submodule update --init --recursive
  ```

- For test 6.3.8 an installation of hunspell as well as all languages that
  you want to spell check is required.

### Managing Hunspell languages

A CSAF Document can contain a [language](https://docs.oasis-open.org/csaf/csaf/v2.0/cs02/csaf-v2.0-cs02.html#3216-document-property---language).
For example, valid entries could be `en` or `en-US`. When running test 6.3.8 we
try to match this language to the list of installed hunspell languages. If the
region is specified (like in `en-US`) and the corresponding language is
installed the test will run. If you want/need to check a `en` language
specifically with `en-US` (or any other variant) you need to make sure that you
link `en` to `en-US` using a symlink.

Example of linking `en` to `en-US`:

```sh
ln -s /usr/share/hunspell/en_US.aff /usr/share/hunspell/en.aff
ln -s /usr/share/hunspell/en_US.dic /usr/share/hunspell/en.dic
```

You can find out what languages you have installed by running `hunspell -D`.

If you need additional languages they are most likely available in the
repository of your distribution. If you have a custom dictionary
copy them in the directory provided by the command above. Hunspell should
automatically recognize them.

[(back to top)](#bsi-csaf-validator-lib)

## How to use

- example usage

  ```js
  import { validateStrict } from './csaf-validator-lib.js'
  import {
    getMandatoryTests,
    getOptionalTests,
    getSchemaTestByVersion,
  } from './lib/tests.js'

  const document = {}
  const tests = [
    getSchemaTestByVersion('2.0', true),
    ...Object.values(await getMandatoryTests()),
    (await getOptionalTests())?.find(
      (test) => test.name === 'optionalTest_6_2_1'
    ),
  ]

  const result = await validateStrict(tests, document)
  ```

[(back to top)](#bsi-csaf-validator-lib)

### Strict Mode

The library has two validate functions, `validate` and `validateStrict`.
`validateStrict` checks whether the test that should be executed was defined in
the library. Otherwise, it throws an error. To extend the library you can use
the `validate` function instead. In such case, **the calling function is
responsible for checking** whether the test function passed to the
`csaf-validator-lib` is benign. **Calling arbitrary** functions (especially
those resulting from user input) may result in a **code execution
vulnerability**. Therefore, the check of the test function to determine whether
it is benign **MUST be done before calling** it.
To proceed this dangerous path, use the `validate` function.

[(back to top)](#bsi-csaf-validator-lib)

### API

#### Interfaces

```typescript
interface Result {
  isValid: boolean
  warnings: Array<{ message: string; instancePath: string }>
  errors: Array<{ message: string; instancePath: string }>
  infos: Array<{ message: string; instancePath: string }>
}
```

```typescript
interface TestResult {
  isValid?: boolean
  warnings?: Array<{ message: string; instancePath: string }>
  errors?: Array<{ message: string; instancePath: string }>
  infos?: Array<{ message: string; instancePath: string }>
}
```

```typescript
/**
 * Every document test has its identifier set as the functions name. You can access
 * it using `<myTest>.name`
 */
type DocumentTest = (doc: any) => TestResult | Promise<TestResult>
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `csaf-validator-lib.js`

```typescript
export const tests: {
  getSupportedCSAFVersions: () => string[]

  getMandatoryTests: (
    csafVersion?: string
  ) => Promise<DocumentTest[] | undefined>
  getInformativeTests: (
    csafVersion?: string
  ) => Promise<DocumentTest[] | undefined>
  getOptionalTests: (
    csafVersion?: string
  ) => Promise<DocumentTest[] | undefined>
  getBasicTests: (csafVersion?: string) => Promise<DocumentTest[] | undefined>
  getExtendedTests: (
    csafVersion?: string
  ) => Promise<DocumentTest[] | undefined>
  getFullTests: (csafVersion?: string) => Promise<DocumentTest[] | undefined>
  getAllTests: (csafVersion?: string) => Promise<DocumentTest[] | undefined>

  getSchemaTestByVersion: (
    csafVersion: string,
    strict?: boolean
  ) => Promise<DocumentTest | undefined>
  getSchemaTests: (csafVersion: string) => Promise<DocumentTest[] | undefined>
}

export const cwe: {
  weaknesses: Array<{ id: string; name: string }>
  getWeaknessById: (id: string) => { id: string; name: string } | undefined
}

// This function validates the given document against the given tests.
export const validate: Promise<{
  tests: ({
    name: string
  } & Result)[]
  isValid: boolean
}>
// Like `validate`, but throws an error if an unknown test function was passed.
export const validateStrict: Promise<{
  tests: ({
    name: string
  } & Result)[]
  isValid: boolean
}>

export const strip: (
  tests: DocumentTest[],
  document: any,
  options?: { strict?: boolean }
) => Promise<{
  document: any
  strippedPaths: {
    instancePath: string
    message: string
    error: boolean
  }[]
}>

export const hunspell: Promise<any>
```

[(back to top)](#bsi-csaf-validator-lib)

## Testing

Tests are implemented using [mocha](https://mochajs.org/). The minimal supported Node.js version is **14**. They can be run using the following command:

```sh
npm test
```

[(back to top)](#bsi-csaf-validator-lib)

## Contributing

You can find our guidelines here [CONTRIBUTING.md](https://github.com/secvisogram/secvisogram/blob/main/CONTRIBUTING.md)

[(back to top)](#bsi-csaf-validator-lib)

## Dependencies

For the complete list of dependencies please take a look at [package.json](https://github.com/secvisogram/csaf-validator-lib/blob/main/package.json)

- [Ajv JSON schema validator](https://github.com/ajv-validator/ajv)
- [JSON Schema formats for Ajv](https://github.com/ajv-validator/ajv-formats)
- [bcp47](https://github.com/gagle/node-bcp47)
- [cvss2js](https://github.com/sparticvs/cvss2js)
- [json-pointer](https://github.com/manuelstofer/json-pointer)
- [lodash](https://lodash.com/)

[(back to top)](#bsi-csaf-validator-lib)
