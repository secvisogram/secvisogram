import React from 'react'
import { resolve } from '#lib/shared/ssvc/engine.js'
import {
  decisionPointIds,
  getRoleModel,
  roleModels,
} from '#lib/shared/ssvc/models.js'
import {
  inferRole,
  parseSelectionList,
} from '#lib/shared/ssvc/selectionList.js'

/**
 * @typedef {{
 *  roleId: string
 *  answers: import('#lib/shared/ssvc/types.js').Answers
 * }} SsvcState
 */

/**
 * @param {SsvcState} state
 * @param {{ type: 'role', roleId: string } | { type: 'answer', id: string, value: string }} action
 * @returns {SsvcState}
 */
function reducer(state, action) {
  switch (action.type) {
    case 'role':
      // answers are keyed by decision point id, so shared answers survive
      return { ...state, roleId: action.roleId }
    case 'answer':
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
      }
  }
}

/**
 * @param {any} value the current `ssvc_v2` value of the document
 * @returns {SsvcState}
 */
function initialState(value) {
  const roleId = inferRole(value) ?? roleModels[0].id
  const answers = roleModels.reduce(
    (all, model) => ({
      ...all,
      ...parseSelectionList(value, model.id).answers,
    }),
    /** @type {import('#lib/shared/ssvc/types.js').Answers} */ ({}),
  )
  return { roleId, answers }
}

/**
 * Local state of the SSVC dialog. The document is not touched until Apply.
 *
 * @param {any} value the current `ssvc_v2` value of the document
 */
export default function useSsvcState(value) {
  const [state, dispatch] = React.useReducer(reducer, value, initialState)
  const model = getRoleModel(state.roleId)
  const resolution = React.useMemo(
    () => resolve(model, state.answers),
    [model, state.answers],
  )
  const existing = React.useMemo(
    () => parseSelectionList(value, state.roleId),
    [value, state.roleId],
  )
  return {
    state,
    model,
    resolution,
    existing,
    ids: decisionPointIds(model),
    setRole: (/** @type {string} */ roleId) =>
      dispatch({ type: 'role', roleId }),
    setAnswer: (/** @type {string} */ id, /** @type {string} */ answer) =>
      dispatch({ type: 'answer', id, value: answer }),
  }
}
