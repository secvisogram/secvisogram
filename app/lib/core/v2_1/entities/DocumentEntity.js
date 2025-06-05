/* eslint-disable react/no-is-mounted */
import { cloneDeep } from 'lodash'

/**
 * This class abstracts central logic regarding the json-document used
 * multiple times within the `Core`.
 */
export default class DocumentEntity {
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

  /**
   * This method collects definitions of product ids and corresponding names and instancePaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, name: string, instancePath: string}[]}
   */
  collectProductIds({ document }) {
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
   * This method collects references to product ids and corresponding instancePaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, instancePath: string}[]}
   */
  collectProductIdRefs({ document }) {
    const entries = /** @type {{id: string, instancePath: string}[]} */ ([])

    const productGroups = document.product_tree?.product_groups
    if (productGroups) {
      for (let i = 0; i < productGroups.length; ++i) {
        const productGroup = productGroups[i]
        const productIds = productGroup.product_ids
        if (productIds) {
          for (let j = 0; j < productIds.length; ++j) {
            const productId = productIds[j]
            if (productId) {
              entries.push({
                id: productId,
                instancePath: `/product_tree/product_groups/${i}/product_ids/${j}`,
              })
            }
          }
        }
      }
    }

    const relationshipGroups = document.product_tree?.relationships
    if (relationshipGroups) {
      for (let i = 0; i < relationshipGroups.length; ++i) {
        const relationshipGroup = relationshipGroups[i]
        const productRef = relationshipGroup.product_reference
        if (productRef) {
          entries.push({
            id: productRef,
            instancePath: `/product_tree/relationships/${i}/product_reference`,
          })
        }
        const relToProductRef = relationshipGroup.relates_to_product_reference
        if (relToProductRef) {
          entries.push({
            id: relToProductRef,
            instancePath: `/product_tree/relationships/${i}/relates_to_product_reference`,
          })
        }
      }
    }

    const vulnerabilities = document.vulnerabilities
    if (vulnerabilities) {
      for (let i = 0; i < vulnerabilities.length; ++i) {
        const vulnerability = vulnerabilities[i]
        collectRefsInProductStatus(
          `/vulnerabilities/${i}/product_status`,
          vulnerability,
          entries
        )
        collectProductRefsInRemediations(
          `/vulnerabilities/${i}/remediations`,
          vulnerability,
          entries
        )
        collectRefsInMetrics(
          `/vulnerabilities/${i}/metrics`,
          vulnerability,
          entries
        )
        collectProductRefsInThreats(
          `/vulnerabilities/${i}/threats`,
          vulnerability,
          entries
        )
      }
    }

    return entries
  }

  /**
   * This method collects group ids and corresponding instancePaths in the given document and returns a result object.
   *
   * @param {any} document
   * @returns {{id: string, name: string, instancePath: string}[]}
   */
  collectGroupIds({ document }) {
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
   * This method collects references to group ids and corresponding instancePaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, instancePath: string}[]}
   */
  collectGroupIdRefs({ document }) {
    const entries = /** @type {{id: string, instancePath: string}[]} */ ([])

    const vulnerabilities = document.vulnerabilities
    if (vulnerabilities) {
      for (let i = 0; i < vulnerabilities.length; ++i) {
        const vulnerability = vulnerabilities[i]
        collectGroupRefsInRemediations(
          `/vulnerabilities/${i}/remediations`,
          vulnerability,
          entries
        )
        collectGroupRefsInThreats(
          `/vulnerabilities/${i}/threats`,
          vulnerability,
          entries
        )
      }
    }

    return entries
  }

  /**
   * This method extends a copy of the current document with data required for the preview and returns the copy.
   *
   * @param {{ document: any }} params
   */
  preview({ document }) {
    const templateDoc = cloneDeep(document)
    const productIds = this.collectProductIds({ document: templateDoc })
    const groupIds = this.collectGroupIds({ document: templateDoc })

    if (templateDoc.document) {
      const maxBaseScoreV3 = retrieveMaxBaseScoreCvss3(
        templateDoc.vulnerabilities
      )
      templateDoc.document.max_base_score_v3 = maxBaseScoreV3.toString()
      const maxBaseScoreV4 = retrieveMaxBaseScoreCvss4(
        templateDoc.vulnerabilities
      )
      templateDoc.document.max_base_score_v4 = maxBaseScoreV4.toString()
      templateDoc.document.max_base_score = maxBaseScoreV4
        ? maxBaseScoreV4.toString()
        : maxBaseScoreV3.toString()
      templateDoc.document.max_base_score_version = maxBaseScoreV4
        ? '4.0'
        : '3.1'
      addDocumentNotesPreviewAttributes(templateDoc.document)
    }

    if (templateDoc.product_tree) {
      addProductTreePreviewAttributes(templateDoc.product_tree, productIds)
    }

    const vulnerabilities = templateDoc.vulnerabilities
    if (vulnerabilities) {
      for (let i = 0; i < vulnerabilities.length; ++i) {
        const vulnerability = vulnerabilities[i]
        addProductStatusPreviewAttributes(
          vulnerability,
          productIds,
          document.product_tree?.product_groups
        )
        addRemediationsPreviewAttributes(vulnerability, productIds, groupIds)
        addThreatsPreviewAttributes(vulnerability, productIds, groupIds)
        addVulnerabilityNotesPreviewAttributes(vulnerability)
      }
    }

    templateDoc.removeTrailingComma = () => {
      return function (
        /** @type {string} */ text,
        /** @type {function} */ render
      ) {
        var textWithTrailingComma = /** @type {string} */ (render(text))
        const lastIndex = textWithTrailingComma.lastIndexOf(',')
        return lastIndex > 0
          ? textWithTrailingComma.substring(0, lastIndex)
          : textWithTrailingComma
      }
    }

    templateDoc.upperCase = () => {
      return function (
        /** @type {string} */ text,
        /** @type {function} */ render
      ) {
        var renderedText = /** @type {string} */ (render(text))
        return renderedText.charAt(0).toUpperCase() + renderedText.slice(1)
      }
    }

    templateDoc.replaceUnderscores = () => {
      return function (
        /** @type {string} */ text,
        /** @type {function} */ render
      ) {
        var renderedText = /** @type {string} */ (render(text))
        return renderedText.replaceAll('_', ' ')
      }
    }

    templateDoc.secureHref = () => {
      return function (
        /** @type {string} */ text,
        /** @type {function} */ render
      ) {
        const href = render(text)
        let isValid = false

        const validStarts = ['#', 'mailto', 'tel', 'http', 'ftp']
        const validMimeTypes = [
          'image/png;base64,',
          'image/jpeg;base64,',
          'image/gif;base64,',
        ].map((x) => x.replaceAll('/', '&#x2F;'))
        validStarts.forEach((x) => (isValid = isValid || href.startsWith(x)))
        const isBase64 = (/** @type {string} */ value) =>
          /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
            value
          )
        validMimeTypes.forEach((mimeType) => {
          const isValidDataHref =
            href.startsWith(`data:${mimeType}`) &&
            isBase64(href.split(',')[1]?.replaceAll('&#x3D;', '='))
          isValid = isValid || isValidDataHref
        })

        return isValid ? `href="${href}"` : ''
      }
    }

    return { document: templateDoc }
  }
}

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
        `${branchInstancePath}/branches`
      )
  }
}

/**
 * @param {string[]} refs
 * @param {string} instancePath
 * @param {{id: string, instancePath: string}[]} entries
 */
const findRefsInProductStatus = (refs, instancePath, entries) => {
  if (refs) {
    for (let i = 0; i < refs.length; ++i) {
      const ref = refs[i]
      if (ref) {
        entries.push({
          id: ref,
          instancePath: `${instancePath}/${i}`,
        })
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{product_status: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInProductStatus = (instancePath, vulnerability, entries) => {
  findRefsInProductStatus(
    vulnerability.product_status?.first_affected,
    `${instancePath}/first_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.first_fixed,
    `${instancePath}/first_fixed`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.fixed,
    `${instancePath}/fixed`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_affected,
    `${instancePath}/known_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_not_affected,
    `${instancePath}/known_not_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.last_affected,
    `${instancePath}/last_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.recommended,
    `${instancePath}/recommended`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.under_investigation,
    `${instancePath}/under_investigation`,
    entries
  )
}

/**
 * @param {string} instancePath
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectProductRefsInRemediations = (
  instancePath,
  vulnerability,
  entries
) => {
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      const productIds = remediation.product_ids
      if (productIds) {
        for (let j = 0; j < productIds.length; ++j) {
          const productId = productIds[j]
          if (productId) {
            entries.push({
              id: productId,
              instancePath: `${instancePath}/${i}/product_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{metrics: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInMetrics = (instancePath, vulnerability, entries) => {
  const metrics = vulnerability.metrics
  if (vulnerability.metrics) {
    for (let i = 0; i < metrics.length; ++i) {
      const metric = metrics[i]
      const products = metric.products
      if (products) {
        for (let j = 0; j < products.length; ++j) {
          const productId = products[j]
          if (productId) {
            entries.push({
              id: productId,
              instancePath: `${instancePath}/${i}/products/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{threats: any}} vulnerability
 * @param {*} entries
 */
const collectProductRefsInThreats = (instancePath, vulnerability, entries) => {
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      const productIds = threat.product_ids
      if (productIds) {
        for (let j = 0; j < productIds.length; ++j) {
          const productId = productIds[j]
          if (productId) {
            entries.push({
              id: productId,
              instancePath: `${instancePath}/${i}/product_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInRemediations = (
  instancePath,
  vulnerability,
  entries
) => {
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      const groupIds = remediation.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              instancePath: `${instancePath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{threats: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInThreats = (instancePath, vulnerability, entries) => {
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      const groupIds = threat.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              instancePath: `${instancePath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * Retrieve the maximum baseScore of all CVSS 3  scores
 *
 * @param {{metrics: {content: {cvss_v3: {baseScore: string}}}[]}[]} vulnerabilities
 */
const retrieveMaxBaseScoreCvss3 = (vulnerabilities) => {
  let maxBaseScore = 0
  if (vulnerabilities) {
    for (let i = 0; i < vulnerabilities.length; ++i) {
      const vulnerability = vulnerabilities[i]
      const metrics = vulnerability.metrics
      if (metrics) {
        for (let i = 0; i < metrics.length; ++i) {
          const metric = metrics[i]
          const baseScore = Number(metric?.content.cvss_v3?.baseScore) ?? 0
          if (maxBaseScore < baseScore) {
            maxBaseScore = baseScore
          }
        }
      }
    }
  }
  return maxBaseScore
}

/**
 * Retrieve the maximum baseScore of all CVSS 4 scores
 *
 * @param {{metrics: {content: {cvss_v4: {baseScore: string}}}[]}[]} vulnerabilities
 */
const retrieveMaxBaseScoreCvss4 = (vulnerabilities) => {
  let maxBaseScore = 0
  if (vulnerabilities) {
    for (let i = 0; i < vulnerabilities.length; ++i) {
      const vulnerability = vulnerabilities[i]
      const metrics = vulnerability.metrics
      if (metrics) {
        for (let i = 0; i < metrics.length; ++i) {
          const metric = metrics[i]
          const baseScore = Number(metric?.content.cvss_v4?.baseScore) ?? 0
          if (maxBaseScore < baseScore) {
            maxBaseScore = baseScore
          }
        }
      }
    }
  }
  return maxBaseScore
}
/**
 * Categorize all document notes by category
 *
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
 * Add attributes to all product groups
 *
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
 * Add the full product name to all product groups
 *
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
 * Add the full product name to all products in product status
 *
 * @param {{metrics: [],
 *          product_status: any,
 *          flags?: {
 *            label: string;
 *            product_ids?: string[]
 *          }[]
 *        }} vulnerability
 * @param {*} productIds
 * @param {*} productGroups
 */
const addProductStatusPreviewAttributes = (
  vulnerability,
  productIds,
  productGroups
) => {
  const extendedMetricIds = createExtendedMetricsIds(
    vulnerability.metrics,
    productIds
  )
  const productStatus = vulnerability.product_status
  if (productStatus) {
    productStatus.known_affected = extendProductStatus(
      productStatus.known_affected,
      extendedMetricIds,
      productIds
    )
    productStatus.first_affected = extendProductStatus(
      productStatus.first_affected,
      extendedMetricIds,
      productIds
    )
    productStatus.last_affected = extendProductStatus(
      productStatus.last_affected,
      extendedMetricIds,
      productIds
    )
    productStatus.known_not_affected = extendProductStatus(
      productStatus.known_not_affected,
      extendedMetricIds,
      productIds
    )
    addFlags(productStatus.known_not_affected, vulnerability, productGroups)
    productStatus.recommended = extendProductStatus(
      productStatus.recommended,
      extendedMetricIds,
      productIds
    )
    productStatus.fixed = extendProductStatus(
      productStatus.fixed,
      extendedMetricIds,
      productIds
    )
    productStatus.first_fixed = extendProductStatus(
      productStatus.first_fixed,
      extendedMetricIds,
      productIds
    )
    productStatus.under_investigation = extendProductStatus(
      productStatus.under_investigation,
      extendedMetricIds,
      productIds
    )
  }
}

/**
 * Collect all product ids with the matching name, vectorString and baseScore
 *
 * @param {*} metrics
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
 * Add full product name to product status
 *
 * @param {any} refs
 * @param {{id: string}[]} extendedMetricIds
 * @param {{id: string;
 *          name: string;
 *        }[]} productIds
 */
const extendProductStatus = (refs, extendedMetricIds, productIds) => {
  const extendedProductStatus = []
  if (refs) {
    for (let i = 0; i < refs.length; ++i) {
      let ref = refs[i]
      if (ref) {
        extendedProductStatus.push(
          extendedMetricIds.find((e) => e.id === ref) ?? {
            id: ref,
            name:
              productIds.find((productId) => productId.id === ref)?.name ?? '',
          }
        )
      }
    }
  }
  return extendedProductStatus
}

/**
 * Add flags information to product status
 *
 * @param {{id: string;
 *          name: string;
 *        }[]} extendedProductStatusList
 * @param {{flags?: {
 *            label: string;
 *            product_ids?: string[];
 *            group_ids?: string[];
 *          }[];
 *        }} vulnerability
 * @param {{group_id: string;
 *          product_ids?: string[];
 *        }[]} productGroups
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
          f.group_ids?.some((id) => groups?.includes(id))
      )
      .map((f) => f.label)
  })
}

/**
 * Categorize all remediations by category
 *
 * @param {any} vulnerability
 * @param {any} productIds
 * @param {any} groupIds
 */
const addRemediationsPreviewAttributes = (
  vulnerability,
  productIds,
  groupIds
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
 * Categorize all threats by category
 *
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

/**
 * Add full product name to remediations or threats
 *
 * @param {{product_ids: any, group_ids: any}} remediationOrThreat
 * @param {{id: string, name: string}[]} extProductIds
 * @param {{id: string, name: string}[]} extGroupIds
 */
const extendRemediationOrThreat = (
  remediationOrThreat,
  extProductIds,
  extGroupIds
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
        let productId = groupIds[i]
        if (productId) {
          extendedGroupIds.push({
            id: productId,
            name: extGroupIds.find((e) => e.id === productId)?.name ?? '',
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
 * Categorize all vulnerability notes by category
 *
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
