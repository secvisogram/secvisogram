import Ajv from 'ajv/dist/jtd.js'
import { execFile } from 'node:child_process'
import bcp47 from 'bcp47'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        lang: { type: 'string' },
      },
      optionalProperties: {
        acknowledgments: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              names: { elements: { type: 'string' } },
              organization: { type: 'string' },
              summary: { type: 'string' },
            },
          },
        },
        aggregate_severity: {
          additionalProperties: true,
          optionalProperties: {
            text: { type: 'string' },
          },
        },
        category: { type: 'string' },
        distribution: {
          additionalProperties: true,
          optionalProperties: {
            text: { type: 'string' },
          },
        },
        notes: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              audience: { type: 'string' },
              text: { type: 'string' },
              title: { type: 'string' },
            },
          },
        },
        publisher: {
          additionalProperties: true,
          optionalProperties: {
            issuing_authority: { type: 'string' },
            name: { type: 'string' },
          },
        },
        references: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              summary: { type: 'string' },
            },
          },
        },
        title: { type: 'string' },
        tracking: {
          additionalProperties: true,
          optionalProperties: {
            aliases: {
              elements: {
                type: 'string',
              },
            },
            generator: {
              additionalProperties: true,
              optionalProperties: {
                engine: {
                  additionalProperties: true,
                  optionalProperties: {
                    name: { type: 'string' },
                  },
                },
              },
            },
            revision_history: {
              elements: {
                additionalProperties: true,
                optionalProperties: {
                  summary: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  optionalProperties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: { elements: { additionalProperties: true, properties: {} } },
        full_product_names: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              name: { type: 'string' },
            },
          },
        },
        relationships: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              full_product_name: {
                additionalProperties: true,
                optionalProperties: {
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        product_groups: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              summary: { type: 'string' },
            },
          },
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          acknowledgments: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                names: {
                  elements: {
                    type: 'string',
                  },
                },
                organization: { type: 'string' },
                summary: { type: 'string' },
              },
            },
          },
          involvements: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                summary: { type: 'string' },
              },
            },
          },
          notes: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                audience: { type: 'string' },
                text: { type: 'string' },
                title: { type: 'string' },
              },
            },
          },
          references: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                summary: { type: 'string' },
              },
            },
          },
          remediations: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                entitlements: {
                  elements: {
                    type: 'string',
                  },
                },
                details: { type: 'string' },
                restart_required: {
                  additionalProperties: true,
                  optionalProperties: {
                    details: { type: 'string' },
                  },
                },
              },
            },
          },
          threats: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                details: { type: 'string' },
              },
            },
          },
          title: { type: 'string' },
        },
      },
    },
  },
})
const validateInput = ajv.compile(inputSchema)

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    name: { type: 'string' },
    product: {
      additionalProperties: true,
      optionalProperties: {
        name: { type: 'string' },
      },
    },
  },
})
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {any} doc
 * @param {object} [params]
 * @param {typeof runHunspell} params.hunspell
 */
export default async function informativeTest_6_3_8(
  doc,
  params = { hunspell: runHunspell }
) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  const lang = bcp47.parse(doc.document.lang)
  if (!lang?.langtag.language.language) return ctx
  const dictionary = `${lang.langtag.language.language}${
    typeof lang.langtag.region === 'string' ? `_${lang.langtag.region}` : ''
  }`

  for (const path of [
    '/document/acknowledgments[]/names[]',
    '/document/acknowledgments[]/organization',
    '/document/acknowledgments[]/summary',
    '/document/aggregate_severity/text',
    '/document/distribution/text',
    '/document/notes[]/audience',
    '/document/notes[]/text',
    '/document/notes[]/title',
    '/document/publisher/issuing_authority',
    '/document/publisher/name',
    '/document/references[]/summary',
    '/document/title',
    '/document/tracking/aliases[]',
    '/document/tracking/generator/engine/name',
    '/document/tracking/revision_history[]/summary',
    '/product_tree/full_product_names[]/name',
    '/product_tree/product_groups[]/summary',
    '/product_tree/relationships[]/full_product_name/name',
    '/vulnerabilities[]/acknowledgments[]/names[]',
    '/vulnerabilities[]/acknowledgments[]/organization',
    '/vulnerabilities[]/acknowledgments[]/summary',
    '/vulnerabilities[]/involvements[]/summary',
    '/vulnerabilities[]/notes[]/audience',
    '/vulnerabilities[]/notes[]/text',
    '/vulnerabilities[]/notes[]/title',
    '/vulnerabilities[]/references[]/summary',
    '/vulnerabilities[]/remediations[]/details',
    '/vulnerabilities[]/remediations[]/entitlements[]',
    '/vulnerabilities[]/remediations[]/restart_required/details',
    '/vulnerabilities[]/threats[]/details',
    '/vulnerabilities[]/title',
  ]) {
    await checkPath(
      [],
      path.split('/').slice(1),
      doc,
      async (instancePath, value) => {
        await checkField(instancePath, value)
      }
    )
  }

  /**
   * @param {string} prefix
   * @param {unknown[]} branches
   */
  const checkBranches = async (prefix, branches) => {
    for (const [branchIndex, branch] of branches.entries()) {
      if (!validateBranch(branch)) {
        continue
      }

      await checkField(`${prefix}${branchIndex}/name`, branch.name)
      await checkField(
        `${prefix}${branchIndex}/product/name`,
        branch.product?.name
      )
      checkBranches(
        `${prefix}${branchIndex}/branches/`,
        Array.isArray(branch.branches) ? branch.branches : []
      )
    }
  }

  await checkBranches(
    '/product_tree/branches/',
    doc.product_tree?.branches ?? []
  )

  /**
   * @param {string[]} reminder
   * @param {string[]} path
   * @param {any} value
   * @param {(instancePath: string, value: string) => Promise<void>} onCheck
   */
  async function checkPath(reminder, path, value, onCheck) {
    if (value == null) return
    const nextKey = path[0]

    if (!nextKey) {
      if (typeof value === 'string') {
        await onCheck('/' + reminder.join('/'), value)
      }
    } else if (nextKey.endsWith('[]')) {
      const arrayName = nextKey.split('[')[0]
      const array = value[arrayName]
      for (const [elementIndex, element] of array?.entries() ?? []) {
        await checkPath(
          [...reminder, arrayName, String(elementIndex)],
          [...path.slice(1)],
          element,
          onCheck
        )
      }
    } else {
      await checkPath(
        [...reminder, nextKey],
        path.slice(1),
        value[nextKey],
        onCheck
      )
    }
  }

  /**
   * @param {string} instancePath
   * @param {string} [text]
   */
  async function checkField(instancePath, text) {
    if (typeof text !== 'string') return
    const result = await spellCheckString({
      text,
      dictionary,
      hunspell: params.hunspell,
    })
    if (!result.ok) {
      ctx.infos.push({
        instancePath,
        message: `there are spelling mistakes in: ${result.mistakes
          .map((m) => m.word)
          .join(', ')}`,
      })
    }
  }

  return ctx
}

/**
 * @param {object} params
 * @param {(params: { dictionary: string; input: string }) => Promise<string>} params.hunspell
 * @param {string} params.text
 * @param {string} params.dictionary
 */
async function spellCheckString({ text, dictionary, hunspell }) {
  /** @type {string} */
  const result = await hunspell({ dictionary, input: text })
  const lines = result.split('\n').slice(1)
  const errors = lines
    .filter((l) => l.startsWith('# ') || l.startsWith('& '))
    .map((l) => {
      if (l.startsWith('& ')) {
        const regex = new RegExp(/^& ([^\s]+)/)
        const regexR = regex.exec(l)
        if (!regexR) throw new Error('Error while parsing hunspell output')
        return { word: regexR[1] }
      } else {
        const regex = new RegExp(/^# ([^\s]+)/)
        const regexR = regex.exec(l)
        if (!regexR) throw new Error('Error while parsing hunspell output')
        return { word: regexR[1] }
      }
    })
  return { mistakes: errors, ok: !errors.length }
}

/**
 * @param {object} params
 * @param {string} params.dictionary
 * @param {string} params.input
 * @returns
 */
async function runHunspell({ dictionary, input }) {
  /** @type {string} */
  const result = await new Promise((resolve, reject) => {
    const child = execFile('hunspell', ['-d', dictionary], (err, stdout) => {
      if (err) return reject(err)
      resolve(stdout)
    })
    child.stdin?.end(input)
  })
  return result
}
