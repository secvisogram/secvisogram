#!/usr/bin/env node

import { writeFile, readFile } from 'node:fs/promises'
import prettier from 'prettier'
import xml2js from 'xml2js'

/**
 * The registry file of the newest cwe version can be downloaded from https://cwe.mitre.org/data/xml/cwec_latest.xml.zip
 * If a new cwe version is available and added to the catalogue with this script,
 * add the respective entry to the cwecMap ('../lib/cwec.js') afterward.
 *
 * The registry files for older cwe versions can be downloaded from https://cwe.mitre.org/data/archive.html
 * */

const fileNameRegex = /^cwec_v(?<version>.+)\.xml/

const [, , REGISTRY_FILE] = process.argv
const fileNameMatch = fileNameRegex.exec(REGISTRY_FILE)
if (!fileNameMatch) throw new Error('Failed to parse filename')
const version = fileNameMatch.groups?.version
const OUTPUT_FILE = `lib/cwec/${version}.js`

/**
 * @typedef {{ ID: string; Name: string, Status: string, Mapping_Notes: {Usage: string} }} Weakness
 * @typedef {{Weaknesses: {Weakness: Array<Weakness>}}} Weaknesses
 * @typedef {{Date: string}} Date
 * @typedef {{Catalog_Date: string}} Catalog_Date
 */

const parser = new xml2js.Parser({
  explicitArray: false,
  mergeAttrs: true,
  explicitRoot: false,
})

const fileXML = await parser.parseStringPromise(
  await readFile(REGISTRY_FILE, 'utf-8')
)

/*
 * The release date of CWE v1.0 is missing in the .xml file describing its content.
 * Therefore, its release date is hard coded here.
 * */
let firstCweVersionReleaseDate = undefined
if (version === '1.0') {
  firstCweVersionReleaseDate = '2008-09-09'
}
const json = {
  /*
   * For v3.0 and newer, the respective property is named "Date", for older versions its "Catalog_Date".
   * For v1.0 its missing, use firstCweVersionReleaseDate (see above).
   * */
  date: fileXML.Date || fileXML.Catalog_Date || firstCweVersionReleaseDate,
  weaknesses: fileXML.Weaknesses.Weakness.map(
    (/** @type {Weakness} */ weakness) => {
      return {
        id: `CWE-${weakness.ID}`,
        name: weakness.Name.trim(),
        status: weakness.Status,
        /* Please note that the Usage property only exists in cwe v4.12 and newer. */
        usage: weakness.Mapping_Notes?.Usage,
      }
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
