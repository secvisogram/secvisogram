import path from 'node:path'
import { execFile } from 'node:child_process'

export default async function getHunspellAvailableLangs() {
  /** @type {string[]} */
  return await new Promise((resolve, reject) => {
    const child = execFile('hunspell', ['-D'], (err, stdout, stderr) => {
      if (err) reject(err)
      resolve(
        stderr
          .split('\n')
          .slice(3, -1)
          .map((dct) => dct.split(path.sep).slice(-1))
      )
    })
    child.stdin?.end()
  })
}
