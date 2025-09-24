const yargs = require('yargs/yargs')
const generateHTMLTemplate = require('./cli/generateHTMLTemplate')
const generateICANNList = require('./cli/generateICANNList')
const generatePreviewTemplatingTable = require('./cli/generatePreviewTemplatingTable')
const parseLanguageTagExtensionList = require('./cli/parseLanguageTagExtensionList')

yargs(process.argv.slice(2))
  .command(
    'generate-html-template2.0',
    '',
    /** @type {any} */ (
      (/** @type {import('yargs').Argv} */ command) =>
        command
          .option('csaf20Schema', { alias: 'csaf', type: 'string' })
          .option('cvss31Schema', { alias: 'cvss-3.1', type: 'string' })
          .demandOption(['csaf20Schema', 'cvss31Schema'])
    ),
    /** @type {any} */ (generateHTMLTemplate)
  )
  .command(
    'generate-icann-list',
    '',
    (/** @type {import('yargs').Argv} */ command) =>
      command.option('registry', { type: 'string' }).demandOption('registry'),
    generateICANNList
  )
  .command(
    'parse-language-tag-extension-list',
    '',
    (/** @type {import('yargs').Argv} */ command) =>
      command.option('registry', { type: 'string' }).demandOption('registry'),
    parseLanguageTagExtensionList
  )
  .command(
    'generate-preview-templating-table',
    '',
    /** @type {any} */ (
      (/** @type {import('yargs').Argv} */ command) =>
        command
          .option('csaf20Schema', { alias: 'csaf', type: 'string' })
          .option('cvss31Schema', { alias: 'cvss-3.1', type: 'string' })
          .option('cvss20Schema', { alias: 'cvss-2', type: 'string' })
          .demandOption(['csaf20Schema', 'cvss31Schema', 'cvss20Schema'])
    ),
    /** @type {any} */ (generatePreviewTemplatingTable)
  )
  .demandCommand(1)
  .help()
  .version(false).argv
