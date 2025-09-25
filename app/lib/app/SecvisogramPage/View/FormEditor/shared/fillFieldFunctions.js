import { max } from 'lodash'
import { useCallback, useContext, useEffect, useState } from 'react'
import DocumentEditorContext from '../../shared/DocumentEditorContext.js'

export const PRODUCT_PREFIX = 'CSAFPID-'
export const GROUP_PREFIX = 'CSAFGID-'

/**
 * Search document recursively for a specific key, find the maximal value and return the next id
 *
 * @param {string} prefix
 * @param {string} idKey
 * @param {Record<string, any>} doc
 * @returns {number} id
 */
const getNextIdForPrefix = (prefix, idKey, doc) => {
  // searches the object recursively and returns all values of the given idKey, which start with the given prefix
  const getIds = (/** @type {object} */ obj) => {
    /** @type {string[]} */
    const ids = []
    for (const [key, value] of Object.entries(obj)) {
      if (
        key === idKey &&
        typeof value === 'string' &&
        value.indexOf(prefix) === 0
      ) {
        ids.push(value.substring(prefix.length))
      }
      if (typeof value === 'object') {
        getIds(value).forEach((id) => ids.push(id))
      }
    }
    return ids
  }
  const foundIds = doc ? getIds(doc.product_tree || {}) : []
  // parse ids to numbers
  const numberIds = foundIds
    .map((id) => {
      try {
        return parseInt(id)
      } catch (e) {
        return undefined
      }
    })
    .filter((id) => !!id)

  const maxId = Math.max(max(numberIds) || 0, 0)
  return maxId + 1
}

/** @type {{[key: string]: number}} */
const counters = {}

function useUniqueId(
  /** @type {string} */ prefix,
  /** @type {string} */ idKey
) {
  const { doc } = useContext(DocumentEditorContext)
  const [scanTrigger, setScanTrigger] = useState(false)

  const scanDoc = useCallback(() => {
    counters[idKey] = getNextIdForPrefix(prefix, idKey, doc)
  }, [prefix, idKey, doc])

  // enable rescan trigger on reset
  const resetCounter = () => {
    counters[idKey] = 0
    setScanTrigger(true)
  }

  // rescan document after it changed if scan trigger is set
  useEffect(() => {
    if (scanTrigger) {
      scanDoc()
      setScanTrigger(false)
    }
  }, [doc]) // eslint-disable-line react-hooks/exhaustive-deps

  // scan document if idKey hasn't been scanned before
  useEffect(() => {
    if (counters[idKey] === undefined || counters[idKey] <= 0) {
      scanDoc()
    }
  }, [idKey, scanDoc])

  // return current counter value and increment it for next usage
  const uniqueId = () => {
    const id = counters[idKey]
    counters[idKey] = id + 1 // increment counter
    return prefix + id.toString().padStart(4, '0')
  }

  return { uniqueId, resetCounter }
}

function useUniqueProductId() {
  const { uniqueId, resetCounter } = useUniqueId(PRODUCT_PREFIX, 'product_id')
  return {
    uniqueProductId: uniqueId,
    resetProductIdCounter: resetCounter,
  }
}

function useUniqueGroupId() {
  const { uniqueId, resetCounter } = useUniqueId(GROUP_PREFIX, 'group_id')
  return {
    uniqueGroupId: uniqueId,
    resetGroupIdCounter: resetCounter,
  }
}

/**
 * function to generate a name for a branch item based on the parent branch items
 *
 * @param {Record<string, any>} doc
 * @param {string[]} instancePath
 * @return {string}
 */
const getBranchName = function (doc, instancePath) {
  /** @type {string[]} */
  let acc = []

  instancePath.slice().reduce((value, pathSegment) => {
    if (value) {
      if ('name' in value) {
        acc.push(value['name'])
      }
      return value[pathSegment]
    }
  }, doc)

  return acc.join(' ')
}

/**
 * function to generate a name for a relationship based on the products it is composed of and the category
 *
 * @param {Record<string, any>} doc
 * @param {string[]} instancePath
 * @param {() => Promise<void | { id: string; name: string; }[]>} collectProductIds
 * @return {Promise<string | undefined>}
 */
const getRelationshipName = async function (
  doc,
  instancePath,
  collectProductIds
) {
  const relationship = instancePath.slice(0, 3).reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, doc)
  if (relationship) {
    const productReference = relationship['product_reference']
    const category = relationship['category']
    const relatesToProductReference =
      relationship['relates_to_product_reference']
    if (productReference && category && relatesToProductReference) {
      return collectProductIds().then((entries) => {
        if (entries) {
          const productReferenceName =
            entries.find((e) => e.id === productReference)?.name ?? ''
          const relatesToProductReferenceName =
            entries.find((e) => e.id === relatesToProductReference)?.name ?? ''

          return `${productReferenceName} ${category.replaceAll(
            '_',
            ' '
          )} ${relatesToProductReferenceName}`
        }
      })
    } else {
      throw Error(
        'Could not find values in relationship to generate name from.'
      )
    }
  }
  throw Error('Could not find relationship to generate name from.')
}

/**
 * function to get the current Date rounded to the next full hour
 *
 * @return string|undefined
 */
const getCurrentDateRounded = function () {
  const p = 60 * 60 * 1000 // milliseconds in an hour
  const roundedDate = new Date(Math.ceil(new Date().getTime() / p) * p)
  return roundedDate.toISOString()
}

/**
 * function to extract current release date from revision history
 *
 * @param {Record<string, any>} doc
 * @return string|undefined
 */
const getCurrentReleaseDate = function (doc) {
  /** @type {{date: string, number: string}[]} */
  const revisionHistory = doc?.document?.tracking?.revision_history
  return revisionHistory
    ?.map((x) => x.date)
    .sort()
    .reverse()?.[0]
}

/**
 * function to extract initial release date from revision history
 *
 * @param {Record<string, any>} doc
 * @return string|undefined
 */
const getInitialReleaseDate = function (doc) {
  /** @type {{date: string, number: string}[]} */
  const revisionHistory = doc?.document?.tracking?.revision_history
  return revisionHistory?.filter(
    (x) => x.number === '1' || x.number === '1.0.0'
  )?.[0]?.date
}

export {
  getNextIdForPrefix,
  useUniqueProductId,
  useUniqueGroupId,
  getBranchName,
  getRelationshipName,
  getCurrentDateRounded,
  getCurrentReleaseDate,
  getInitialReleaseDate,
}
