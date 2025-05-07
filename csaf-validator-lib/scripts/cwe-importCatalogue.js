#!/usr/bin/env node

import { writeFile, readFile } from 'node:fs/promises'
import prettier from 'prettier'
import xml2js from 'xml2js'

// The registry file can be downloaded from https://cwe.mitre.org/data/xml/cwec_latest.xml.zip

const fileNameRegex = /^cwec_v(?<version>.+)\.xml/

const [, , REGISTRY_FILE] = process.argv
const fileNameMatch = fileNameRegex.exec(REGISTRY_FILE)
if (!fileNameMatch) throw new Error('Failed to parse filename')
const version = fileNameMatch.groups?.version
const OUTPUT_FILE = `lib/cwec/${version}.js`

/**
 * @typedef {{ ID: string; Name: string }} Weakness
 * @typedef {{Weaknesses: {Weakness: Array<Weakness>}}} Weaknesses
 */

const parser = new xml2js.Parser({
  explicitArray: false,
  mergeAttrs: true,
  explicitRoot: false,
})

const fileXML = await parser.parseStringPromise(
  await readFile(REGISTRY_FILE, 'utf-8')
)

const json = {
  weaknesses: fileXML.Weaknesses.Weakness.map(
    (/** @type {Weakness} */ weakness) => {
      return { id: `CWE-${weakness.ID}`, name: weakness.Name }
    }
  ),
}

await writeFile(
  OUTPUT_FILE,
  prettier.format(`export default (${JSON.stringify(json)})`, {
    ...(await prettier.resolveConfig(OUTPUT_FILE)),
    filepath: OUTPUT_FILE,
  })
)
