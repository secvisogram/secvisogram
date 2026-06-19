import lodash from 'lodash'
import {
  removeTrailingComma,
  replaceUnderscores,
  secureHref,
  upperCase,
} from './mustacheHelpers.js'

const { cloneDeep } = lodash

/**
 * @typedef {Object} FullProductName
 * @property {string} name
 * @property {string} product_id
 */

/**
 * @typedef {Object} Branch
 * @property {Array<Branch>} branches
 * @property {FullProductName} product
 */

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * @param {Array<Branch>} branches
 * @param {{id: string, name: string, instancePath: string}[]} entries
 * @param {string} instancePath
 */
const traverseBranches = (branches, entries, instancePath) => {
  for (let i = 0; i < branches.length; ++i) {
    const branch = branches[i]
    const branchInstancePath = `${instancePath}/${i}`
    const fullProductName = branch.product
    if (fullProductName) {
      if (fullProductName.product_id) {
        entries.push({
          id: fullProductName.product_id,
          name: fullProductName.name ?? '',
          instancePath: `${branchInstancePath}/product/product_id`,
        })
      }
    }
    if (branch.branches)
      traverseBranches(
        branch.branches,
        entries,
        `${branchInstancePath}/branches`,
      )
  }
}

/**
 * @param {any} document
 * @returns {{id: string, name: string, instancePath: string}[]}
 */
const collectProductIds = (document) => {
  const entries =
    /** @type {{id: string, name: string, instancePath: string}[]} */ ([])

  const fullProductNames = document.product_tree?.full_product_names
  if (fullProductNames) {
    for (let i = 0; i < fullProductNames.length; ++i) {
      const fullProductName = fullProductNames[i]
      if (fullProductName.product_id) {
        entries.push({
          id: fullProductName.product_id,
          name: fullProductName.name ?? '',
          instancePath: `/product_tree/full_product_names/${i}/product_id`,
        })
      }
    }
  }

  const relationships = document.product_tree?.relationships
  if (relationships) {
    for (let i = 0; i < relationships.length; ++i) {
      const relationship = relationships[i]
      const fullProductName = relationship.full_product_name
      if (fullProductName) {
        if (fullProductName.product_id) {
          entries.push({
            id: fullProductName.product_id,
            name: fullProductName.name ?? '',
            instancePath: `/product_tree/relationships/${i}/full_product_name/product_id`,
          })
        }
      }
    }
  }

  const branches = document.product_tree?.branches
  if (branches) {
    traverseBranches(branches, entries, '/product_tree/branches')
  }

  return entries
}

/**
 * @param {any} document
 * @returns {{id: string, name: string, instancePath: string}[]}
 */
const collectGroupIds = (document) => {
  const entries =
    /** @type {{id: string, name: string, instancePath: string}[]} */ ([])

  const productGroups = document.product_tree?.product_groups
  if (productGroups) {
    for (let i = 0; i < productGroups.length; ++i) {
      const productGroup = productGroups[i]
      if (productGroup.group_id) {
        entries.push({
          id: productGroup.group_id,
          name: productGroup.summary ?? '',
          instancePath: `/product_tree/product_groups/${i}/group_id`,
        })
      }
    }
  }

  return entries
}

/**
 * @param {any} document
 */
const addDocumentNotesPreviewAttributes = (document) => {
  const summary = []
  const details = []
  const general = []
  const description = []
  const other = []
  const faq = []
  const legalDisclaimer = []
  const unknown = []

  const notes = document.notes
  if (notes) {
    for (let i = 0; i < notes.length; ++i) {
      const note = notes[i]
      switch (note.category) {
        case 'summary':
          summary.push(note)
          break
        case 'details':
          details.push(note)
          break
        case 'general':
          general.push(note)
          break
        case 'description':
          description.push(note)
          break
        case 'other':
          other.push(note)
          break
        case 'faq':
          faq.push(note)
          break
        case 'legal_disclaimer':
          legalDisclaimer.push(note)
          break
        default:
          unknown.push(note)
      }
    }
  }

  document.notes_summary = summary
  document.notes_details = details
  document.notes_general = general
  document.notes_description = description
  document.notes_other = other
  document.notes_faq = faq
  document.notes_legal_disclaimer = legalDisclaimer
  document.notes_unknown = unknown
}

/**
 * @param {any} vulnerability
 */
const addVulnerabilityNotesPreviewAttributes = (vulnerability) => {
  const summary = []
  const details = []
  const general = []
  const description = []
  const other = []
  const faq = []
  const legalDisclaimer = []
  const unknown = []

  const notes = vulnerability.notes
  if (notes) {
    for (let i = 0; i < notes.length; ++i) {
      const note = notes[i]
      switch (note.category) {
        case 'summary':
          summary.push(note)
          break
        case 'details':
          details.push(note)
          break
        case 'general':
          general.push(note)
          break
        case 'description':
          description.push(note)
          break
        case 'other':
          other.push(note)
          break
        case 'faq':
          faq.push(note)
          break
        case 'legal_disclaimer':
          legalDisclaimer.push(note)
          break
        default:
          unknown.push(note)
      }
    }
  }

  vulnerability.notes_summary = summary
  vulnerability.notes_details = details
  vulnerability.notes_general = general
  vulnerability.notes_description = description
  vulnerability.notes_other = other
  vulnerability.notes_faq = faq
  vulnerability.notes_legal_disclaimer = legalDisclaimer
  vulnerability.notes_unknown = unknown
}

/**
 * @param {{product_groups: []}} productTree
 * @param {{id: string, name: string}[]} productIds
 */
const addProductTreePreviewAttributes = (productTree, productIds) => {
  const productGroups = productTree.product_groups
  if (productGroups) {
    for (let i = 0; i < productGroups.length; ++i) {
      const productGroup = productGroups[i]
      extendProductGroup(productGroup, productIds)
    }
  }
}

/**
 * @param {{product_ids: any}} productGroup
 * @param {{id: string, name: string}[]} extProductIds
 */
const extendProductGroup = (productGroup, extProductIds) => {
  if (productGroup) {
    const extendedProductIds = []
    let productIds = productGroup.product_ids
    if (productIds) {
      for (let i = 0; i < productIds.length; ++i) {
        let productId = productIds[i]
        if (productId) {
          extendedProductIds.push({
            id: productId,
            name: extProductIds.find((e) => e.id === productId)?.name ?? '',
          })
        }
      }
    }
    productGroup.product_ids = extendedProductIds
  }
}

/**
 * @param {any} refs
 * @param {{id: string}[]} extendedScoreIds
 * @param {{id: string; name: string}[]} productIds
 */
const extendProductStatus = (refs, extendedScoreIds, productIds) => {
  const extendedProductStatus = []
  if (refs) {
    for (let i = 0; i < refs.length; ++i) {
      let ref = refs[i]
      if (ref) {
        extendedProductStatus.push(
          extendedScoreIds.find((e) => e.id === ref) ?? {
            id: ref,
            name:
              productIds.find((productId) => productId.id === ref)?.name ?? '',
          },
        )
      }
    }
  }
  return extendedProductStatus
}

/**
 * @param {{id: string; name: string}[]} extendedProductStatusList
 * @param {{flags?: {label: string; product_ids?: string[]; group_ids?: string[]}[]}} vulnerability
 * @param {{group_id: string; product_ids?: string[]}[]} productGroups
 */
const addFlags = (extendedProductStatusList, vulnerability, productGroups) => {
  extendedProductStatusList?.forEach((/** @type {any} */ eps) => {
    const groups = productGroups
      ?.filter((group) => group.product_ids?.includes(eps.id))
      .map((group) => group.group_id)
    eps.flags = vulnerability.flags
      ?.filter(
        (f) =>
          f.product_ids?.includes(eps.id) ||
          f.group_ids?.some((id) => groups?.includes(id)),
      )
      .map((f) => f.label)
  })
}

/**
 * @param {{product_ids: any, group_ids: any}} remediationOrThreat
 * @param {{id: string, name: string}[]} extProductIds
 * @param {{id: string, name: string}[]} extGroupIds
 */
const extendRemediationOrThreat = (
  remediationOrThreat,
  extProductIds,
  extGroupIds,
) => {
  if (remediationOrThreat) {
    const extendedProductIds = []
    let productIds = remediationOrThreat.product_ids
    if (productIds) {
      for (let i = 0; i < productIds.length; ++i) {
        let productId = productIds[i]
        if (productId) {
          extendedProductIds.push({
            id: productId,
            name: extProductIds.find((e) => e.id === productId)?.name ?? '',
          })
        }
      }
    }
    remediationOrThreat.product_ids = extendedProductIds

    const extendedGroupIds = []
    let groupIds = remediationOrThreat.group_ids
    if (groupIds) {
      for (let i = 0; i < groupIds.length; ++i) {
        let groupId = groupIds[i]
        if (groupId) {
          extendedGroupIds.push({
            id: groupId,
            name: extGroupIds.find((e) => e.id === groupId)?.name ?? '',
          })
        }
      }
    }
    remediationOrThreat.group_ids = extendedGroupIds
  }
}

/**
 * @param {{date: string}} a
 * @param {{date: string}} b
 */
const sortByDate = (a, b) => {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

/**
 * @param {any} vulnerability
 * @param {any} productIds
 * @param {any} groupIds
 */
const addRemediationsPreviewAttributes = (
  vulnerability,
  productIds,
  groupIds,
) => {
  const vendorFix = []
  const mitigation = []
  const workaround = []
  const noneAvailable = []
  const noFixPlanned = []
  const unknown = []
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      extendRemediationOrThreat(remediation, productIds, groupIds)
      switch (remediation.category) {
        case 'vendor_fix':
          vendorFix.push(remediation)
          break
        case 'mitigation':
          mitigation.push(remediation)
          break
        case 'workaround':
          workaround.push(remediation)
          break
        case 'none_available':
          noneAvailable.push(remediation)
          break
        case 'no_fix_planned':
          noFixPlanned.push(remediation)
          break
        default:
          unknown.push(remediation)
      }
    }
  }

  vulnerability.remediations_vendor_fix = vendorFix.sort(sortByDate)
  vulnerability.remediations_mitigation = mitigation.sort(sortByDate)
  vulnerability.remediations_workaround = workaround.sort(sortByDate)
  vulnerability.remediations_none_available = noneAvailable.sort(sortByDate)
  vulnerability.remediations_no_fix_planned = noFixPlanned.sort(sortByDate)
  vulnerability.remediations_unknown = unknown.sort(sortByDate)
}

/**
 * @param {any} vulnerability
 * @param {any} productIds
 * @param {any} groupIds
 */
const addThreatsPreviewAttributes = (vulnerability, productIds, groupIds) => {
  const exploitStatus = []
  const impact = []
  const targetSet = []
  const unknown = []
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      extendRemediationOrThreat(threat, productIds, groupIds)
      switch (threat.category) {
        case 'exploit_status':
          exploitStatus.push(threat)
          break
        case 'impact':
          impact.push(threat)
          break
        case 'target_set':
          targetSet.push(threat)
          break
        default:
          unknown.push(threat)
      }
    }
  }

  vulnerability.threats_exploit_status = exploitStatus.sort(sortByDate)
  vulnerability.threats_impact = impact.sort(sortByDate)
  vulnerability.threats_target_set = targetSet.sort(sortByDate)
  vulnerability.threats_unknown = unknown.sort(sortByDate)
}

// ---------------------------------------------------------------------------
// V2.0-specific helpers
// ---------------------------------------------------------------------------

/**
 * Retrieve the maximum baseScore from vulnerability.scores[i].cvss_v3 (CSAF 2.0)
 *
 * @param {{scores: {cvss_v3: {baseScore: string}}[]}[]} vulnerabilities
 */
const retrieveMaxBaseScoreV2_0 = (vulnerabilities) => {
  if (!vulnerabilities) return '0'
  let maxBaseScore = 0
  for (let i = 0; i < vulnerabilities.length; ++i) {
    const vulnerability = vulnerabilities[i]
    const scores = vulnerability.scores
    if (scores) {
      for (let j = 0; j < scores.length; ++j) {
        const score = scores[j]
        const baseScore = Number(score.cvss_v3?.baseScore)
        if (maxBaseScore < baseScore) {
          maxBaseScore = baseScore
        }
      }
    }
  }
  return maxBaseScore.toString()
}

/**
 * Collect all product ids with CVSS data from vulnerability.scores (CSAF 2.0)
 *
 * @param {any} scores
 * @param {{id: string, name: string}[]} productIds
 */
const createExtendedScoreIds = (scores, productIds) => {
  const extendedProductIds = []
  if (scores) {
    for (let i = 0; i < scores.length; ++i) {
      const score = scores[i]
      const products = score.products
      if (products) {
        for (let j = 0; j < products.length; ++j) {
          const productId = products[j]
          if (productId) {
            extendedProductIds.push({
              id: productId,
              name: productIds.find((e) => e.id === productId)?.name ?? '',
              vectorString: score.cvss_v3?.vectorString ?? '',
              baseScore: score.cvss_v3?.baseScore ?? '',
            })
          }
        }
      }
    }
  }
  return extendedProductIds
}

/**
 * @param {{scores: [], product_status: any, flags?: {label: string; product_ids?: string[]}[]}} vulnerability
 * @param {any} productIds
 * @param {any} productGroups
 */
const addProductStatusPreviewAttributesV2_0 = (
  vulnerability,
  productIds,
  productGroups,
) => {
  const extendedScoreIds = createExtendedScoreIds(
    vulnerability.scores,
    productIds,
  )
  const productStatus = vulnerability.product_status
  if (productStatus) {
    productStatus.known_affected = extendProductStatus(
      productStatus.known_affected,
      extendedScoreIds,
      productIds,
    )
    productStatus.first_affected = extendProductStatus(
      productStatus.first_affected,
      extendedScoreIds,
      productIds,
    )
    productStatus.last_affected = extendProductStatus(
      productStatus.last_affected,
      extendedScoreIds,
      productIds,
    )
    productStatus.known_not_affected = extendProductStatus(
      productStatus.known_not_affected,
      extendedScoreIds,
      productIds,
    )
    addFlags(productStatus.known_not_affected, vulnerability, productGroups)
    productStatus.recommended = extendProductStatus(
      productStatus.recommended,
      extendedScoreIds,
      productIds,
    )
    productStatus.fixed = extendProductStatus(
      productStatus.fixed,
      extendedScoreIds,
      productIds,
    )
    productStatus.first_fixed = extendProductStatus(
      productStatus.first_fixed,
      extendedScoreIds,
      productIds,
    )
    productStatus.under_investigation = extendProductStatus(
      productStatus.under_investigation,
      extendedScoreIds,
      productIds,
    )
  }
}

// ---------------------------------------------------------------------------
// V2.1-specific helpers
// ---------------------------------------------------------------------------

/**
 * Retrieve the maximum baseScore from vulnerability.metrics[i].content.cvss_v3 (CSAF 2.1)
 *
 * @param {{metrics: {content: {cvss_v3: {baseScore: string}}}[]}[]} vulnerabilities
 */
const retrieveMaxBaseScoreV2_1 = (vulnerabilities) => {
  let maxBaseScore = 0
  if (vulnerabilities) {
    for (let i = 0; i < vulnerabilities.length; ++i) {
      const vulnerability = vulnerabilities[i]
      const metrics = vulnerability.metrics
      if (metrics) {
        for (let j = 0; j < metrics.length; ++j) {
          const metric = metrics[j]
          const baseScore = Number(metric?.content.cvss_v3?.baseScore)
          if (maxBaseScore < baseScore) {
            maxBaseScore = baseScore
          }
        }
      }
    }
  }
  return maxBaseScore.toString()
}

/**
 * Collect all product ids with CVSS data from vulnerability.metrics (CSAF 2.1)
 *
 * @param {any} metrics
 * @param {{id: string, name: string}[]} productIds
 */
const createExtendedMetricsIds = (metrics, productIds) => {
  const extendedProductIds = []
  if (metrics) {
    for (let i = 0; i < metrics.length; ++i) {
      const metric = metrics[i]
      const products = metric.products
      if (products) {
        for (let j = 0; j < products.length; ++j) {
          const productId = products[j]
          if (productId) {
            extendedProductIds.push({
              id: productId,
              name: productIds.find((e) => e.id === productId)?.name ?? '',
              vectorString: metric.content?.cvss_v3?.vectorString ?? '',
              baseScore: metric.content?.cvss_v3?.baseScore ?? '',
            })
          }
        }
      }
    }
  }
  return extendedProductIds
}

/**
 * @param {{metrics: [], product_status: any, flags?: {label: string; product_ids?: string[]}[]}} vulnerability
 * @param {any} productIds
 * @param {any} productGroups
 */
const addProductStatusPreviewAttributesV2_1 = (
  vulnerability,
  productIds,
  productGroups,
) => {
  const extendedMetricIds = createExtendedMetricsIds(
    vulnerability.metrics,
    productIds,
  )
  const productStatus = vulnerability.product_status
  if (productStatus) {
    productStatus.known_affected = extendProductStatus(
      productStatus.known_affected,
      extendedMetricIds,
      productIds,
    )
    productStatus.first_affected = extendProductStatus(
      productStatus.first_affected,
      extendedMetricIds,
      productIds,
    )
    productStatus.last_affected = extendProductStatus(
      productStatus.last_affected,
      extendedMetricIds,
      productIds,
    )
    productStatus.known_not_affected = extendProductStatus(
      productStatus.known_not_affected,
      extendedMetricIds,
      productIds,
    )
    addFlags(productStatus.known_not_affected, vulnerability, productGroups)
    productStatus.recommended = extendProductStatus(
      productStatus.recommended,
      extendedMetricIds,
      productIds,
    )
    productStatus.fixed = extendProductStatus(
      productStatus.fixed,
      extendedMetricIds,
      productIds,
    )
    productStatus.first_fixed = extendProductStatus(
      productStatus.first_fixed,
      extendedMetricIds,
      productIds,
    )
    productStatus.under_investigation = extendProductStatus(
      productStatus.under_investigation,
      extendedMetricIds,
      productIds,
    )
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Enriches a CSAF 2.0 document for use with HTMLTemplate2_0.
 * Uses `vulnerability.scores[i].cvss_v3` for CVSS data.
 *
 * @param {any} document
 * @returns {{ document: any }}
 */
export function enrichDocumentV2_0(document) {
  const templateDoc = cloneDeep(document)
  const productIds = collectProductIds(templateDoc)
  const groupIds = collectGroupIds(templateDoc)

  if (templateDoc.document) {
    templateDoc.document.max_base_score = retrieveMaxBaseScoreV2_0(
      templateDoc.vulnerabilities,
    )
    addDocumentNotesPreviewAttributes(templateDoc.document)
  }

  if (templateDoc.product_tree) {
    addProductTreePreviewAttributes(templateDoc.product_tree, productIds)
  }

  const vulnerabilities = templateDoc.vulnerabilities
  if (vulnerabilities) {
    for (let i = 0; i < vulnerabilities.length; ++i) {
      const vulnerability = vulnerabilities[i]
      addProductStatusPreviewAttributesV2_0(
        vulnerability,
        productIds,
        document.product_tree?.product_groups,
      )
      addRemediationsPreviewAttributes(vulnerability, productIds, groupIds)
      addThreatsPreviewAttributes(vulnerability, productIds, groupIds)
      addVulnerabilityNotesPreviewAttributes(vulnerability)
    }
  }

  templateDoc.removeTrailingComma = removeTrailingComma
  templateDoc.upperCase = upperCase
  templateDoc.replaceUnderscores = replaceUnderscores
  templateDoc.secureHref = secureHref

  return { document: templateDoc }
}

/**
 * Enriches a CSAF 2.1 document for use with HTMLTemplate2_1.
 * Uses `vulnerability.metrics[i].content.cvss_v3` for CVSS data.
 *
 * @param {any} document
 * @returns {{ document: any }}
 */
export function enrichDocumentV2_1(document) {
  const templateDoc = cloneDeep(document)
  const productIds = collectProductIds(templateDoc)
  const groupIds = collectGroupIds(templateDoc)

  if (templateDoc.document) {
    templateDoc.document.max_base_score = retrieveMaxBaseScoreV2_1(
      templateDoc.vulnerabilities,
    )
    addDocumentNotesPreviewAttributes(templateDoc.document)
  }

  if (templateDoc.product_tree) {
    addProductTreePreviewAttributes(templateDoc.product_tree, productIds)
  }

  const vulnerabilities = templateDoc.vulnerabilities
  if (vulnerabilities) {
    for (let i = 0; i < vulnerabilities.length; ++i) {
      const vulnerability = vulnerabilities[i]
      addProductStatusPreviewAttributesV2_1(
        vulnerability,
        productIds,
        document.product_tree?.product_groups,
      )
      addRemediationsPreviewAttributes(vulnerability, productIds, groupIds)
      addThreatsPreviewAttributes(vulnerability, productIds, groupIds)
      addVulnerabilityNotesPreviewAttributes(vulnerability)
    }
  }

  templateDoc.removeTrailingComma = removeTrailingComma
  templateDoc.upperCase = upperCase
  templateDoc.replaceUnderscores = replaceUnderscores
  templateDoc.secureHref = secureHref

  return { document: templateDoc }
}
