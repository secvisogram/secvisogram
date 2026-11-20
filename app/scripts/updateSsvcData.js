/**
 * Compares the vendored SSVC data in `lib/shared/ssvc/data` with the upstream
 * repository https://github.com/CERTCC/SSVC.
 *
 *   node scripts/updateSsvcData.js                check against `main`
 *   node scripts/updateSsvcData.js --ref <sha>    check against a commit or tag
 *   node scripts/updateSsvcData.js --write        also overwrite vendored files
 *                                                 whose content changed
 *
 * It reports
 * - vendored files (decision points, decision tables, schemas) whose content
 *   differs from upstream (same version),
 * - newer versions of a vendored decision point or table.
 *
 * `--write` never adds, renames or removes files. A new version needs the
 * imports in `lib/shared/ssvc/registry.js` and the ids in
 * `lib/shared/ssvc/models.js` to be changed by hand, see the README in the
 * data folder. Exit code 1 if there is anything to look at.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const REPO = 'CERTCC/SSVC'
const DIRECTORIES = ['decision_points', 'decision_tables']
// upstream folders of the namespaces that the dialog uses
const SCHEMA_FILES = [
  'SelectionList_2_0_0.schema.json',
  'DecisionPoint_2_0_0.schema.json',
  'DecisionTable_2_0_0.schema.json',
]
const NAMESPACE_FOLDERS = ['ssvc', 'cisa']

const dataDir = fileURLToPath(
  new URL('../lib/shared/ssvc/data/', import.meta.url),
)

const args = process.argv.slice(2)
const write = args.includes('--write')
const refIndex = args.indexOf('--ref')
const ref = refIndex >= 0 ? args[refIndex + 1] : 'main'
if (refIndex >= 0 && !ref) {
  console.error('--ref needs a value')
  process.exit(2)
}

/** @param {string} url */
async function getJson(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'secvisogram-update-ssvc-data' },
  })
  if (!response.ok) {
    throw new Error(`${url}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

/** @param {{ namespace: string, key: string, version: string }} o */
const idOf = (o) => `${o.namespace}:${o.key}:${o.version}`

/** @param {string} version */
const versionParts = (version) => version.split('.').map(Number)

/**
 * @param {string} a
 * @param {string} b
 */
function compareVersions(a, b) {
  const pa = versionParts(a)
  const pb = versionParts(b)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

/** Key order and whitespace must not matter for the comparison. */
function canonical(/** @type {unknown} */ value) {
  return JSON.stringify(value, (_key, v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(
          Object.entries(v).sort(([a], [b]) => (a < b ? -1 : 1)),
        )
      : v,
  )
}

/**
 * @param {string} directory
 * @returns {Promise<Map<string, { file: string, json: any }>>}
 */
async function readVendored(directory) {
  const entries = new Map()
  for (const file of await readdir(`${dataDir}${directory}`)) {
    const path = `${dataDir}${directory}/${file}`
    const json = JSON.parse(await readFile(path, 'utf8'))
    entries.set(idOf(json), { file: path, json })
  }
  return entries
}

const commit = await getJson(
  `https://api.github.com/repos/${REPO}/commits/${ref}`,
)
const tree = await getJson(
  `https://api.github.com/repos/${REPO}/git/trees/${commit.sha}?recursive=1`,
)
if (tree.truncated) throw new Error('The upstream file list is truncated')

console.log(
  `Upstream ${REPO} @ ${commit.sha} (${commit.commit.committer.date})`,
)

let findings = 0

for (const directory of DIRECTORIES) {
  const vendored = await readVendored(directory)
  const paths = /** @type {{ path: string }[]} */ (tree.tree)
    .map((entry) => entry.path)
    .filter((path) =>
      NAMESPACE_FOLDERS.some((folder) =>
        path.startsWith(`data/json/${directory}/${folder}/`),
      ),
    )
    .filter((path) => path.endsWith('.json'))

  /** @type {Map<string, { id: string, version: string, json: any }[]>} */
  const upstreamByName = new Map()
  for (const path of paths) {
    const json = await getJson(
      `https://raw.githubusercontent.com/${REPO}/${commit.sha}/${path}`,
    )
    const name = `${json.namespace}:${json.key}`
    upstreamByName.set(name, [
      ...(upstreamByName.get(name) ?? []),
      { id: idOf(json), version: json.version, json },
    ])
  }

  for (const [id, { file, json }] of vendored) {
    const name = `${json.namespace}:${json.key}`
    const candidates = upstreamByName.get(name) ?? []
    const same = candidates.find((c) => c.id === id)

    if (!same) {
      findings++
      console.log(`[${directory}] ${id}: no longer present upstream`)
    } else if (canonical(same.json) !== canonical(json)) {
      findings++
      console.log(`[${directory}] ${id}: content differs from upstream`)
      if (write) {
        await writeFile(file, JSON.stringify(same.json, null, 2) + '\n')
        console.log(`    updated ${file}`)
      }
    }

    const newer = candidates
      .filter((c) => compareVersions(c.version, json.version) > 0)
      .map((c) => c.version)
      .sort(compareVersions)
    if (newer.length > 0) {
      findings++
      console.log(
        `[${directory}] ${id}: newer version(s) upstream: ${newer.join(', ')}`,
      )
    }
  }
}

for (const file of SCHEMA_FILES) {
  const path = `${dataDir}schema/${file}`
  const upstream = await getJson(
    `https://raw.githubusercontent.com/${REPO}/${commit.sha}/data/schema/v2/${file}`,
  )
  const vendored = JSON.parse(await readFile(path, 'utf8'))
  if (canonical(upstream) !== canonical(vendored)) {
    findings++
    console.log(`[schema] ${file}: content differs from upstream`)
    if (write) {
      await writeFile(path, JSON.stringify(upstream, null, 2) + '\n')
      console.log(`    updated ${path}`)
    }
  }
}

if (findings === 0) {
  console.log('The vendored data is up to date.')
} else {
  console.log(
    `\n${findings} finding(s). New versions need manual changes in ` +
      'lib/shared/ssvc/registry.js, models.js and the data README.',
  )
  process.exitCode = 1
}
