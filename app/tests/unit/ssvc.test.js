import { Ajv2020 } from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { describe, expect, it } from 'vitest'
import { mandatoryTest_6_1_37 } from '@secvisogram/csaf-validator-lib/csaf_2_1/mandatoryTests/mandatoryTest_6_1_37.js'
import { mandatoryTest_6_1_46 } from '@secvisogram/csaf-validator-lib/csaf_2_1/mandatoryTests/mandatoryTest_6_1_46.js'
import { mandatoryTest_6_1_47 } from '@secvisogram/csaf-validator-lib/csaf_2_1/mandatoryTests/mandatoryTest_6_1_47.js'
import { mandatoryTest_6_1_49 } from '@secvisogram/csaf-validator-lib/csaf_2_1/mandatoryTests/mandatoryTest_6_1_49.js'
import { recommendedTest_6_2_34 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_34.js'
import { recommendedTest_6_2_35 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_35.js'
import { recommendedTest_6_2_36 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_36.js'
import { recommendedTest_6_2_37 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_37.js'
import { informativeTest_6_3_14 } from '@secvisogram/csaf-validator-lib/csaf_2_1/informativeTests/informativeTest_6_3_14.js'
import { informativeTest_6_3_15 } from '@secvisogram/csaf-validator-lib/csaf_2_1/informativeTests/informativeTest_6_3_15.js'
import decisionPointSchema from '../../lib/shared/ssvc/data/schema/DecisionPoint_2_0_0.schema.json'
import decisionTableSchema from '../../lib/shared/ssvc/data/schema/DecisionTable_2_0_0.schema.json'
import selectionListSchema from '../../lib/shared/ssvc/data/schema/SelectionList_2_0_0.schema.json'
import { resolve } from '../../lib/shared/ssvc/engine.js'
import { mwi } from '../../lib/shared/ssvc/mwi.js'
import {
  decisionPointIds,
  getRoleModel,
  roleModels,
} from '../../lib/shared/ssvc/models.js'
import {
  decisionPoints,
  decisionTables,
  getDecisionPoint,
  idOf,
  latestVersions,
} from '../../lib/shared/ssvc/registry.js'
import {
  buildSelectionList,
  formatTimestamp,
  inferRole,
  isNewerThanRevisionHistory,
  mergeIntoExisting,
  parseSelectionList,
  targetIdsOf,
} from '../../lib/shared/ssvc/selectionList.js'

const ajv = new Ajv2020({ strict: false, allErrors: true })
addFormats.default(ajv)
const validateSelectionList = ajv.compile(selectionListSchema)
const validateDecisionPoint = ajv.compile(decisionPointSchema)
const validateDecisionTable = ajv.compile(decisionTableSchema)

const NOW = new Date('2026-11-06T10:15:30.789Z')

/**
 * All combinations of the user inputs of a model.
 *
 * @param {import('../../lib/shared/ssvc/types.js').RoleModel} model
 * @returns {import('../../lib/shared/ssvc/types.js').Answers[]}
 */
function allAnswers(model) {
  return model.inputs.reduce(
    (combinations, id) =>
      combinations.flatMap((combination) =>
        getDecisionPoint(id).values.map((v) => ({
          ...combination,
          [id]: v.key,
        })),
      ),
    /** @type {import('../../lib/shared/ssvc/types.js').Answers[]} */ ([{}]),
  )
}

/**
 * @param {any} ssvc_v2
 * @param {{ status?: string, tlp?: string, cve?: string, ids?: string[] }} [options]
 */
function documentWith(ssvc_v2, options = {}) {
  const {
    status = 'draft',
    tlp = 'AMBER',
    cve = 'CVE-2026-1234',
    ids,
  } = options
  return {
    document: {
      distribution: { tlp: { label: tlp } },
      tracking: {
        id: 'ID-1',
        status,
        revision_history: [
          { number: '1', date: '2026-01-01T00:00:00Z', summary: 'x' },
        ],
      },
    },
    vulnerabilities: [
      {
        ...(cve ? { cve } : {}),
        ...(ids
          ? { ids: ids.map((text) => ({ system_name: 's', text })) }
          : {}),
        metrics: [{ content: { ssvc_v2 } }],
      },
    ],
  }
}

/**
 * Runs a validator test and returns all errors, warnings and infos.
 *
 * @param {(doc: any) => any} test
 * @param {any} doc
 * @returns {unknown[]}
 */
function findings(test, doc) {
  const result = test(doc)
  return [
    ...(result.errors ?? []),
    ...(result.warnings ?? []),
    ...(result.infos ?? []),
  ]
}

const OTHER_NAMESPACE = {
  namespace: 'x_example.test#test',
  key: 'F',
  version: '1.0.0',
  values: [{ key: 'A' }],
}

describe('ssvc data', () => {
  it('has 15 decision points and 6 decision tables', () => {
    expect(decisionPoints.size).toBe(15)
    expect(decisionTables.size).toBe(6)
  })

  it.each([...decisionPoints.entries()])(
    'decision point %s is valid against DecisionPoint_2_0_0',
    (id, dp) => {
      expect(
        validateDecisionPoint(dp),
        JSON.stringify(validateDecisionPoint.errors),
      ).toBe(true)
      expect(idOf(dp)).toBe(id)
    },
  )

  it.each([...decisionTables.entries()])(
    'decision table %s is complete and consistent',
    (_, table) => {
      expect(
        validateDecisionTable(table),
        JSON.stringify(validateDecisionTable.errors),
      ).toBe(true)
      const inputs = Object.keys(table.decision_points).filter(
        (id) => id !== table.outcome,
      )
      const expected = inputs.reduce(
        (n, id) => n * getDecisionPoint(id).values.length,
        1,
      )
      const combinations = new Set(
        table.mapping.map((row) => inputs.map((id) => row[id]).join('|')),
      )
      expect(table.mapping).toHaveLength(expected)
      expect(combinations.size).toBe(expected)
      for (const row of table.mapping) {
        for (const id of [...inputs, table.outcome]) {
          expect(
            getDecisionPoint(id).values.map((v) => v.key),
            `${id}=${row[id]}`,
          ).toContain(row[id])
        }
      }
    },
  )

  it('uses the latest version of every decision point in the models', () => {
    for (const model of roleModels) {
      for (const id of decisionPointIds(model)) {
        const dp = getDecisionPoint(id)
        expect(latestVersions.get(`${dp.namespace}:${dp.key}`)).toBe(dp.version)
      }
    }
  })

  it('has exactly one version per decision point', () => {
    const names = [...decisionPoints.values()].map(
      (dp) => `${dp.namespace}:${dp.key}`,
    )
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('mwi()', () => {
  const expected = {
    M: { M: 'L', MA: 'M', I: 'H' },
    S: { M: 'M', MA: 'M', I: 'H' },
    E: { M: 'H', MA: 'H', I: 'H' },
  }
  for (const [mp, row] of Object.entries(expected)) {
    for (const [pwi, result] of Object.entries(row)) {
      it(`Mission Prevalence ${mp} + Public Well-Being Impact ${pwi} -> ${result}`, () => {
        expect(mwi(mp, pwi)).toBe(result)
      })
    }
  }

  it('maps Minimal + Material to Medium', () => {
    expect(mwi('M', 'MA')).toBe('M')
  })

  it('returns undefined for unknown values', () => {
    expect(mwi('X', 'M')).toBeUndefined()
  })
})

describe('resolve()', () => {
  const expectedCounts = { coordinator: 108, patchApplier: 288, developer: 96 }

  for (const model of roleModels) {
    describe(model.id, () => {
      const combinations = allAnswers(model)

      it(`covers ${expectedCounts[model.id]} combinations`, () => {
        expect(combinations).toHaveLength(expectedCounts[model.id])
      })

      it('resolves every combination to an outcome of the upstream table', () => {
        for (const answers of combinations) {
          const result = resolve(model, answers)
          expect(result.complete).toBe(true)
          const derived = { ...answers, ...result.derived }
          const row = model.root.rows.filter((r) =>
            model.root.inputs.every((id) => r[id] === derived[id]),
          )
          expect(row).toHaveLength(1)
          expect(result.outcome).toBe(row[0][model.root.id])
          expect(result.reachable).toEqual([result.outcome])
        }
      })

      it('is incomplete without answers and reaches every outcome', () => {
        const result = resolve(model, {})
        expect(result.complete).toBe(false)
        expect(result.outcome).toBeUndefined()
        expect(result.derived).toEqual({})
        expect(result.reachable).toHaveLength(
          getDecisionPoint(model.root.id).values.length,
        )
      })

      it('narrows the reachable outcomes with partial answers', () => {
        const [first] = model.inputs
        const total = resolve(model, {}).reachable
        for (const value of getDecisionPoint(first).values) {
          const partial = resolve(model, { [first]: value.key })
          expect(partial.complete).toBe(false)
          for (const key of partial.reachable) expect(total).toContain(key)
        }
      })

      it('ignores answers that the model does not know', () => {
        const answers = { ...combinations[0], 'ssvc:E:1.1.0': 'ZZ', foo: 'x' }
        expect(resolve(model, answers).complete).toBe(false)
      })
    })
  }

  it('Coordinator: Active exploitation, Automatable, Total and Essential is Act', () => {
    const result = resolve(getRoleModel('coordinator'), {
      'ssvc:E:1.1.0': 'A',
      'ssvc:A:2.0.0': 'Y',
      'ssvc:TI:1.0.0': 'T',
      'cisa:MP:1.0.0': 'E',
      'ssvc:PWI:1.1.0': 'I',
    })
    expect(result.derived).toEqual({ 'ssvc:MWI:1.0.0': 'H' })
    expect(result.outcome).toBe('AC')
  })

  it('Coordinator: derives MWI as soon as Mission Prevalence and Public Well-Being Impact are known', () => {
    const result = resolve(getRoleModel('coordinator'), {
      'cisa:MP:1.0.0': 'M',
      'ssvc:PWI:1.1.0': 'MA',
    })
    expect(result.derived).toEqual({ 'ssvc:MWI:1.0.0': 'M' })
  })

  it('Patch Applier: derives Human Impact from Safety and Mission Impact', () => {
    const result = resolve(getRoleModel('patchApplier'), {
      'ssvc:SI:2.0.1': 'R',
      'ssvc:MI:2.0.0': 'MSC',
    })
    expect(result.derived).toEqual({ 'ssvc:HI:2.0.2': 'H' })
  })

  it('Developer: derives Utility and Public Safety Impact', () => {
    const result = resolve(getRoleModel('developer'), {
      'ssvc:A:2.0.0': 'Y',
      'ssvc:VD:1.0.0': 'C',
      'ssvc:SI:2.0.1': 'C',
    })
    expect(result.derived).toEqual({
      'ssvc:U:1.0.1': 'S',
      'ssvc:PSI:2.0.1': 'S',
    })
  })
})

describe('buildSelectionList()', () => {
  const coordinatorAnswers = {
    'ssvc:E:1.1.0': 'P',
    'ssvc:A:2.0.0': 'N',
    'ssvc:TI:1.0.0': 'T',
    'cisa:MP:1.0.0': 'S',
    'ssvc:PWI:1.1.0': 'MA',
  }

  it('builds the documented Coordinator example', () => {
    const result = buildSelectionList({
      roleId: 'coordinator',
      answers: coordinatorAnswers,
      now: NOW,
      targetIds: ['CVE-2026-1234'],
    })
    expect(result).toEqual({
      timestamp: '2026-11-06T10:15:30Z',
      schemaVersion: '2.0.0',
      target_ids: ['CVE-2026-1234'],
      selections: [
        {
          namespace: 'ssvc',
          key: 'E',
          version: '1.1.0',
          name: 'Exploitation',
          values: [{ key: 'P', name: 'Public PoC' }],
        },
        {
          namespace: 'ssvc',
          key: 'A',
          version: '2.0.0',
          name: 'Automatable',
          values: [{ key: 'N', name: 'No' }],
        },
        {
          namespace: 'ssvc',
          key: 'TI',
          version: '1.0.0',
          name: 'Technical Impact',
          values: [{ key: 'T', name: 'Total' }],
        },
        {
          namespace: 'cisa',
          key: 'MP',
          version: '1.0.0',
          name: 'Mission Prevalence',
          values: [{ key: 'S', name: 'Support' }],
        },
        {
          namespace: 'ssvc',
          key: 'PWI',
          version: '1.1.0',
          name: 'Public Well-Being Impact',
          values: [{ key: 'MA', name: 'Material' }],
        },
        {
          namespace: 'ssvc',
          key: 'MWI',
          version: '1.0.0',
          name: 'Mission and Well-Being Impact',
          values: [{ key: 'M', name: 'Medium' }],
        },
        {
          namespace: 'cisa',
          key: 'CISA',
          version: '1.1.0',
          name: 'CISA Levels',
          values: [{ key: 'T*', name: 'Track*' }],
        },
      ],
    })
  })

  it('emits 7, 7 and 8 selections', () => {
    const counts = roleModels.map(
      (model) =>
        buildSelectionList({
          roleId: model.id,
          answers: allAnswers(model)[0],
          now: NOW,
        }).selections.length,
    )
    expect(counts).toEqual([7, 7, 8])
  })

  it('throws when the decision is incomplete', () => {
    expect(() =>
      buildSelectionList({ roleId: 'coordinator', answers: {}, now: NOW }),
    ).toThrow()
  })

  it('omits target_ids when there are none', () => {
    const list = buildSelectionList({
      roleId: 'coordinator',
      answers: coordinatorAnswers,
      now: NOW,
      targetIds: [],
    })
    expect(list).not.toHaveProperty('target_ids')
  })

  it('does not emit references or decision_point_resources', () => {
    const list = buildSelectionList({
      roleId: 'coordinator',
      answers: coordinatorAnswers,
      now: NOW,
    })
    expect(list).not.toHaveProperty('references')
    expect(list).not.toHaveProperty('decision_point_resources')
  })

  for (const model of roleModels) {
    describe(`${model.id}: every combination`, () => {
      const lists = allAnswers(model).map((answers) =>
        buildSelectionList({
          roleId: model.id,
          answers,
          now: NOW,
          targetIds: ['CVE-2026-1234'],
        }),
      )

      it('is valid against SelectionList_2_0_0', () => {
        for (const list of lists) {
          expect(
            validateSelectionList(list),
            JSON.stringify(validateSelectionList.errors),
          ).toBe(true)
        }
      })

      it('passes the CSAF validator tests for SSVC', () => {
        const tests = [
          mandatoryTest_6_1_37,
          mandatoryTest_6_1_46,
          mandatoryTest_6_1_47,
          mandatoryTest_6_1_49,
          recommendedTest_6_2_34,
          recommendedTest_6_2_35,
          recommendedTest_6_2_36,
          recommendedTest_6_2_37,
          informativeTest_6_3_14,
          informativeTest_6_3_15,
        ]
        for (const list of lists) {
          for (const tlp of ['CLEAR', 'AMBER']) {
            const doc = documentWith(list, { tlp })
            for (const test of tests) {
              expect(
                findings(test, doc),
                `${test.name} ${JSON.stringify(list.selections.map((s) => s.values[0].key))}`,
              ).toEqual([])
            }
          }
        }
      })

      // Own equivalent of 6.1.48 and 6.3.13/6.3.25, which the installed
      // csaf-validator-lib does not implement
      it('uses existing, latest decision points with valid values (6.1.48, 6.3.13, 6.3.25)', () => {
        for (const list of lists) {
          for (const selection of list.selections) {
            const dp = decisionPoints.get(idOf(selection))
            expect(dp, idOf(selection)).toBeDefined()
            expect(
              latestVersions.get(`${selection.namespace}:${selection.key}`),
            ).toBe(selection.version)
            const order = dp?.values.map((v) => v.key) ?? []
            const indexes = selection.values.map((v) => order.indexOf(v.key))
            expect(indexes.every((i) => i >= 0)).toBe(true)
            expect(indexes).toEqual([...indexes].sort((a, b) => a - b))
            for (const value of selection.values) {
              expect(value.name).toBe(
                dp?.values.find((v) => v.key === value.key)?.name,
              )
            }
            expect(selection.name).toBe(dp?.name)
          }
        }
      })

      it('only uses the registered base namespaces ssvc and cisa', () => {
        for (const list of lists) {
          for (const selection of list.selections) {
            expect(['ssvc', 'cisa']).toContain(selection.namespace)
          }
        }
      })
    })
  }

  it('creates the Track* outcome with the grandfathered key T*', () => {
    const list = buildSelectionList({
      roleId: 'coordinator',
      answers: coordinatorAnswers,
      now: NOW,
    })
    expect(list.selections.at(-1)?.values[0].key).toBe('T*')
    expect(validateSelectionList(list)).toBe(true)
  })
})

describe('compliance gates detect bad output', () => {
  const good = buildSelectionList({
    roleId: 'coordinator',
    answers: {
      'ssvc:E:1.1.0': 'N',
      'ssvc:A:2.0.0': 'N',
      'ssvc:TI:1.0.0': 'P',
      'cisa:MP:1.0.0': 'M',
      'ssvc:PWI:1.1.0': 'M',
    },
    now: NOW,
    targetIds: ['CVE-2026-1234'],
  })

  it('schema: missing selections', () => {
    const { selections, ...rest } = good
    expect(selections).toBeDefined()
    expect(validateSelectionList(rest)).toBe(false)
  })

  it('6.1.47: target id of another vulnerability', () => {
    const doc = documentWith({ ...good, target_ids: ['CVE-2000-1'] })
    expect(findings(mandatoryTest_6_1_47, doc)).not.toEqual([])
  })

  it('6.2.34: unregistered namespace', () => {
    const doc = documentWith({
      ...good,
      selections: [{ ...good.selections[0], namespace: 'foo' }],
    })
    expect(findings(recommendedTest_6_2_34, doc)).not.toEqual([])
  })

  it('6.3.14/6.3.15: extension namespace in a TLP:AMBER document', () => {
    const doc = documentWith({
      ...good,
      selections: [
        { ...good.selections[0], namespace: 'ssvc/de-DE/.example.org#x' },
      ],
    })
    expect([
      ...findings(informativeTest_6_3_14, doc),
      ...findings(informativeTest_6_3_15, doc),
    ]).not.toEqual([])
  })

  it('DecisionPoint schema: value without name', () => {
    const dp = structuredClone(getDecisionPoint('ssvc:A:2.0.0'))
    dp.values[0] = /** @type {any} */ ({ key: dp.values[0].key })
    expect(validateDecisionPoint(dp)).toBe(false)
  })
})

describe('test 6.1.49', () => {
  const list = buildSelectionList({
    roleId: 'coordinator',
    answers: {
      'ssvc:E:1.1.0': 'N',
      'ssvc:A:2.0.0': 'N',
      'ssvc:TI:1.0.0': 'P',
      'cisa:MP:1.0.0': 'M',
      'ssvc:PWI:1.1.0': 'M',
    },
    now: NOW,
  })

  it('passes in draft documents', () => {
    expect(
      mandatoryTest_6_1_49(documentWith(list, { status: 'draft' })).errors,
    ).toEqual([])
  })

  it('reports a timestamp that is newer than the last revision in final documents', () => {
    expect(
      mandatoryTest_6_1_49(documentWith(list, { status: 'final' })).errors,
    ).toHaveLength(1)
  })
})

describe('isNewerThanRevisionHistory()', () => {
  const doc = (/** @type {string} */ status) => ({
    document: {
      tracking: {
        status,
        revision_history: [
          { date: '2026-01-01T00:00:00Z' },
          { date: '2026-03-01T00:00:00Z' },
        ],
      },
    },
  })

  it('is true for final and interim documents with a newer timestamp', () => {
    expect(
      isNewerThanRevisionHistory(doc('final'), '2026-11-06T10:15:30Z'),
    ).toBe(true)
    expect(
      isNewerThanRevisionHistory(doc('interim'), '2026-11-06T10:15:30Z'),
    ).toBe(true)
  })

  it('is false for draft documents', () => {
    expect(
      isNewerThanRevisionHistory(doc('draft'), '2026-11-06T10:15:30Z'),
    ).toBe(false)
  })

  it('is false if the timestamp is not newer', () => {
    expect(
      isNewerThanRevisionHistory(doc('final'), '2026-03-01T00:00:00Z'),
    ).toBe(false)
  })

  it('is false without a revision history or document', () => {
    expect(
      isNewerThanRevisionHistory(
        { document: { tracking: { status: 'final' } } },
        '2026-11-06T10:15:30Z',
      ),
    ).toBe(false)
    expect(isNewerThanRevisionHistory({}, '2026-11-06T10:15:30Z')).toBe(false)
  })

  it('agrees with test 6.1.49', () => {
    const list = buildSelectionList({
      roleId: 'developer',
      answers: allAnswers(getRoleModel('developer'))[0],
      now: NOW,
    })
    const full = documentWith(list, { status: 'final' })
    expect(isNewerThanRevisionHistory(full, list.timestamp)).toBe(
      findings(mandatoryTest_6_1_49, full).length > 0,
    )
  })
})

describe('formatTimestamp()', () => {
  it('formats RFC 3339 UTC with second precision', () => {
    expect(formatTimestamp(NOW)).toBe('2026-11-06T10:15:30Z')
    expect(formatTimestamp(new Date('2026-01-02T03:04:05.000Z'))).toBe(
      '2026-01-02T03:04:05Z',
    )
  })

  it('does not round up to the next hour', () => {
    expect(formatTimestamp(new Date('2026-11-06T10:00:01.000Z'))).toBe(
      '2026-11-06T10:00:01Z',
    )
  })
})

describe('targetIdsOf()', () => {
  it('prefers the cve', () => {
    expect(targetIdsOf({ cve: 'CVE-1', ids: [{ text: 'X' }] })).toEqual([
      'CVE-1',
    ])
  })
  it('falls back to ids[].text', () => {
    expect(targetIdsOf({ ids: [{ text: 'A' }, { text: 'B' }] })).toEqual([
      'A',
      'B',
    ])
  })
  it('is undefined without identifiers', () => {
    expect(targetIdsOf({})).toBeUndefined()
    expect(targetIdsOf(undefined)).toBeUndefined()
    expect(targetIdsOf({ cve: '', ids: [] })).toBeUndefined()
  })
  it('passes test 6.1.47 for ids[].text', () => {
    const list = buildSelectionList({
      roleId: 'developer',
      answers: allAnswers(getRoleModel('developer'))[0],
      now: NOW,
      targetIds: targetIdsOf({ ids: [{ text: 'GHSA-1' }] }),
    })
    expect(
      mandatoryTest_6_1_47(documentWith(list, { cve: '', ids: ['GHSA-1'] }))
        .errors,
    ).toEqual([])
  })
})

describe('inferRole()', () => {
  for (const model of roleModels) {
    it(`detects ${model.id}`, () => {
      const list = buildSelectionList({
        roleId: model.id,
        answers: allAnswers(model)[0],
        now: NOW,
      })
      expect(inferRole(list)).toBe(model.id)
    })
  }

  it('is undefined for DSOI only', () => {
    expect(
      inferRole({
        selections: [
          {
            namespace: 'ssvc',
            key: 'DSOI',
            version: '1.0.0',
            values: [{ key: 'D' }],
          },
        ],
      }),
    ).toBeUndefined()
  })

  it('is undefined for conflicting markers', () => {
    expect(
      inferRole({
        selections: [
          {
            namespace: 'ssvc',
            key: 'MWI',
            version: '1.0.0',
            values: [{ key: 'L' }],
          },
          {
            namespace: 'ssvc',
            key: 'HI',
            version: '2.0.2',
            values: [{ key: 'L' }],
          },
        ],
      }),
    ).toBeUndefined()
  })

  it('is undefined for empty or invalid values', () => {
    expect(inferRole(undefined)).toBeUndefined()
    expect(inferRole({})).toBeUndefined()
    expect(inferRole({ selections: 'x' })).toBeUndefined()
  })
})

describe('parseSelectionList()', () => {
  for (const model of roleModels) {
    it(`round-trips ${model.id}`, () => {
      const answers = allAnswers(model).at(-1) ?? {}
      const list = buildSelectionList({ roleId: model.id, answers, now: NOW })
      const parsed = parseSelectionList(list, model.id)
      expect(parsed.answers).toEqual(answers)
      expect(parsed.outdated).toEqual([])
      expect(parsed.foreign).toEqual([])
    })
  }

  it('keeps answers that are shared with another role', () => {
    const list = buildSelectionList({
      roleId: 'coordinator',
      answers: allAnswers(getRoleModel('coordinator'))[5],
      now: NOW,
    })
    const parsed = parseSelectionList(list, 'developer')
    expect(Object.keys(parsed.answers).sort()).toEqual([
      'ssvc:A:2.0.0',
      'ssvc:E:1.1.0',
      'ssvc:TI:1.0.0',
    ])
  })

  it('reports foreign selections and outdated versions', () => {
    const parsed = parseSelectionList(
      {
        selections: [
          OTHER_NAMESPACE,
          {
            namespace: 'ssvc',
            key: 'E',
            version: '1.0.0',
            values: [{ key: 'N' }],
          },
        ],
      },
      'coordinator',
    )
    expect(parsed.answers).toEqual({})
    expect(parsed.foreign).toEqual([OTHER_NAMESPACE])
    expect(parsed.outdated).toEqual(['ssvc:E:1.0.0'])
  })

  it('ignores selections with several values', () => {
    const parsed = parseSelectionList(
      {
        selections: [
          {
            namespace: 'ssvc',
            key: 'E',
            version: '1.1.0',
            values: [{ key: 'N' }, { key: 'P' }],
          },
        ],
      },
      'coordinator',
    )
    expect(parsed.answers).toEqual({})
  })
})

describe('malformed existing values', () => {
  const broken = [
    null,
    'text',
    42,
    [],
    {},
    { selections: 'x' },
    { selections: [null, 1, 'a', {}, { namespace: 'ssvc' }] },
    {
      selections: [
        { namespace: 'ssvc', key: 'E', version: '1.1.0', values: 'N' },
        { namespace: 'ssvc', key: 'A', version: '2.0.0', values: [] },
        { namespace: 'ssvc', key: 'TI', version: '1.0.0', values: [null] },
      ],
    },
  ]

  for (const [index, value] of broken.entries()) {
    it(`does not throw for case ${index}`, () => {
      for (const model of roleModels) {
        expect(() => parseSelectionList(value, model.id)).not.toThrow()
      }
      expect(() => inferRole(value)).not.toThrow()
      const built = buildSelectionList({
        roleId: 'coordinator',
        answers: allAnswers(getRoleModel('coordinator'))[0],
        now: NOW,
      })
      expect(() => mergeIntoExisting(value, built)).not.toThrow()
    })
  }
})

describe('mergeIntoExisting()', () => {
  const answers = {
    'ssvc:E:1.1.0': 'N',
    'ssvc:A:2.0.0': 'N',
    'ssvc:TI:1.0.0': 'P',
    'cisa:MP:1.0.0': 'M',
    'ssvc:PWI:1.1.0': 'M',
  }
  const built = buildSelectionList({
    roleId: 'coordinator',
    answers,
    now: NOW,
    targetIds: ['CVE-2026-1234'],
  })

  it('returns the built value when nothing exists', () => {
    expect(mergeIntoExisting(undefined, built)).toEqual(built)
  })

  it('keeps foreign selections, resources and references', () => {
    const existing = {
      timestamp: '2020-01-01T00:00:00Z',
      schemaVersion: '2.0.0',
      selections: [
        OTHER_NAMESPACE,
        {
          namespace: 'ssvc',
          key: 'E',
          version: '1.0.0',
          values: [{ key: 'N' }],
        },
      ],
      decision_point_resources: [{ uri: 'https://example.com', summary: 's' }],
      references: [{ uri: 'https://example.com/r', summary: 'r' }],
    }
    const merged = mergeIntoExisting(existing, built)
    expect(merged.timestamp).toBe(built.timestamp)
    expect(merged.decision_point_resources).toEqual(
      existing.decision_point_resources,
    )
    expect(merged.references).toEqual(existing.references)
    expect(merged.selections[0]).toEqual(OTHER_NAMESPACE)
    expect(merged.selections.slice(1)).toEqual(built.selections)
  })

  it('replaces selections of another role', () => {
    const developer = getRoleModel('developer')
    const old = buildSelectionList({
      roleId: 'developer',
      answers: allAnswers(developer)[0],
      now: NOW,
    })
    const merged = mergeIntoExisting(old, built)
    expect(merged.selections).toEqual(built.selections)
    expect(inferRole(merged)).toBe('coordinator')
  })

  it('keeps the position of foreign selections around ours', () => {
    const other2 = { ...OTHER_NAMESPACE, key: 'G' }
    const old = buildSelectionList({
      roleId: 'coordinator',
      answers,
      now: NOW,
    })
    const existing = {
      ...old,
      selections: [OTHER_NAMESPACE, ...old.selections, other2],
    }
    const merged = mergeIntoExisting(existing, built)
    expect(merged.selections[0]).toEqual(OTHER_NAMESPACE)
    expect(merged.selections.at(-1)).toEqual(other2)
    expect(merged.selections).toHaveLength(built.selections.length + 2)
  })

  it('keeps existing target_ids when none are given', () => {
    const noIds = buildSelectionList({
      roleId: 'coordinator',
      answers,
      now: NOW,
    })
    const merged = mergeIntoExisting({ ...built, target_ids: ['X-1'] }, noIds)
    expect(merged.target_ids).toEqual(['X-1'])
  })

  it('is valid against the schema with kept content', () => {
    const merged = mergeIntoExisting(
      {
        ...built,
        selections: [{ ...OTHER_NAMESPACE }],
        references: [{ uri: 'https://example.com/r', summary: 'r' }],
      },
      built,
    )
    expect(
      validateSelectionList(merged),
      JSON.stringify(validateSelectionList.errors),
    ).toBe(true)
  })
})
