#!/usr/bin/env node

import {
  enrichDocumentV2_0,
  enrichDocumentV2_1,
  HTMLTemplate2_0,
  HTMLTemplate2_1,
  renderMarkdown,
} from '@secvisogram/html-template'
import { readFile, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'
import { parseArgs } from 'node:util'

const args = parseArgs({
  allowPositionals: true,
  strict: false,
})

const [cmd] = args.positionals
const argv = process.argv.slice(2).filter((a) => a !== cmd)

if (cmd === 'render') {
  const args = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      output: {
        type: 'string',
        short: 'o',
      },
    },
  })
  const input = args.positionals[0]

  const inputPath = input
  const outputPath = args.values.output

  const raw = await readFile(inputPath, 'utf8')
  const csafDoc = JSON.parse(raw)

  const version = csafDoc.document?.csaf_version
  let html

  if (version === '2.0') {
    const { document: enrichedDoc } = enrichDocumentV2_0(csafDoc)
    const parsedDoc = renderMarkdown(enrichedDoc)
    html = HTMLTemplate2_0({ document: parsedDoc })
  } else if (version === '2.1') {
    const enriched = enrichDocumentV2_1(csafDoc)
    html = HTMLTemplate2_1(enriched)
  } else {
    throw new Error(
      `Unsupported or missing csaf_version: ${JSON.stringify(version)}. Expected "2.0" or "2.1".`,
    )
  }

  if (outputPath) {
    await writeFile(outputPath, html, 'utf8')
  } else {
    process.stdout.write(html)
  }
} else {
  console.error(`unknown command: ${cmd}`)
  renderHelp()
  process.exit(1)
}

function renderHelp() {
  console.log(`
usage: ${basename(process.argv[1])} render [-o <output-file.html>] <input-file.json>

    <input-file.json>
        Path to the CSAF JSON file
    
    --output, -o <output-file.html>
        Path to write the HTML output (default: stdout)
`)
}
