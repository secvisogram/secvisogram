import { getDecisionPoint } from './registry.js'

/**
 * @param {import('./types.js').Derivation} derivation
 * @param {Record<string, Set<string> | undefined>} known value keys that are
 *   still possible per decision point id. Missing ids are unconstrained.
 */
function matchingRows(derivation, known) {
  return derivation.rows.filter((row) =>
    derivation.inputs.every((id) => known[id]?.has(row[id]) ?? true),
  )
}

/**
 * Evaluates a role model with the answers given so far.
 * Answers for decision points that don't belong to the model are ignored, as
 * are values that the decision point doesn't define.
 *
 * @param {import('./types.js').RoleModel} model
 * @param {import('./types.js').Answers} answers
 * @returns {import('./types.js').Resolution}
 */
export function resolve(model, answers) {
  /** @type {Record<string, Set<string> | undefined>} */
  const possible = {}
  /** @type {import('./types.js').Answers} */
  const derived = {}

  for (const id of model.inputs) {
    const value = answers[id]
    if (
      value !== undefined &&
      getDecisionPoint(id).values.some((v) => v.key === value)
    ) {
      possible[id] = new Set([value])
    }
  }

  for (const derivation of model.derived) {
    const outcomes = new Set(
      matchingRows(derivation, possible).map((row) => row[derivation.id]),
    )
    possible[derivation.id] = outcomes
    if (outcomes.size === 1) {
      derived[derivation.id] = [...outcomes][0]
    }
  }

  const reachable = new Set(
    matchingRows(model.root, possible).map((row) => row[model.root.id]),
  )
  const complete =
    model.inputs.every((id) => possible[id]?.size === 1) && reachable.size === 1

  return {
    derived,
    outcome: complete ? [...reachable][0] : undefined,
    complete,
    reachable: getDecisionPoint(model.root.id)
      .values.map((v) => v.key)
      .filter((key) => reachable.has(key)),
  }
}
