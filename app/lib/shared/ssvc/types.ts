export interface DecisionPointValue {
  key: string
  name: string
  definition: string
}

export interface DecisionPoint {
  namespace: string
  key: string
  version: string
  name: string
  definition: string
  schemaVersion: string
  values: DecisionPointValue[]
}

export interface DecisionTable {
  namespace: string
  key: string
  version: string
  name: string
  definition: string
  schemaVersion: string
  /** Id (`namespace:key:version`) of the outcome decision point */
  outcome: string
  decision_points: Record<string, DecisionPoint>
  mapping: Record<string, string>[]
}

/** Decision point ids (`namespace:key:version`) mapped to a value key */
export type Answers = Record<string, string>

/**
 * Computes the value of one decision point from other decision points.
 * Every row maps input value keys (by decision point id) to the value key of
 * the decision point `id`.
 */
export interface Derivation {
  id: string
  inputs: string[]
  rows: Record<string, string>[]
  /** Where the rows come from, e.g. `ssvc:DT_HI:1.0.0` or `rule:MWI` */
  source: string
}

export interface RoleModel {
  id: 'coordinator' | 'patchApplier' | 'developer'
  /** Name of the role in the SSVC documentation */
  upstreamName: string
  /** Decision points the user answers, in display order */
  inputs: string[]
  /** Derived decision points, in dependency order */
  derived: Derivation[]
  /** The decision table that yields the outcome */
  root: Derivation
}

export interface Resolution {
  /** Values of derived decision points that could be determined */
  derived: Answers
  /** Outcome value key. Only set when all inputs are answered */
  outcome?: string
  complete: boolean
  /** Outcome value keys that are still possible with the current answers */
  reachable: string[]
}

export interface SelectionValue {
  key: string
  name?: string
  definition?: string
}

export interface Selection {
  namespace: string
  key: string
  version: string
  name?: string
  definition?: string
  values: SelectionValue[]
}

export interface SelectionList {
  timestamp: string
  schemaVersion: '2.0.0'
  target_ids?: string[]
  selections: Selection[]
  decision_point_resources?: unknown[]
  references?: unknown[]
}
