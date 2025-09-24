import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

/**
 * @typedef {'workaround'
 *  | 'mitigation'
 *  | 'vendor_fix'
 *  | 'optional_patch'
 *  | 'none_available'
 *  | 'fix_planned'
 *  | 'no_fix_planned'} Category
 */

/**
 * @typedef {'first_affected'
 *  | 'known_affected'
 *  | 'last_affected'
 *  | 'known_not_affected'
 *  | 'first_fixed'
 *  | 'fixed'
 *  | 'under_investigation'} ProductStatus
 */

/*
  The spec groups the product statuses in groups. This grouping is
  expressed in this object.
 */
const productStatus = /**
 * @type {const}
 * @satisfies {Record<string, ProductStatus[]>}
 */ ({
  affected: ['first_affected', 'known_affected', 'last_affected'],
  notAffected: ['known_not_affected'],
  fixed: ['first_fixed', 'fixed'],
  underInvestigation: ['under_investigation'],
})

/**
 * This map holds prohibited category / product status combinations.
 * See https://github.com/oasis-tcs/csaf/blob/master/csaf_2.1/prose/share/csaf-v2.1-draft.md#324131-vulnerabilities-property---remediations---category-
 *
 * @type {Map<string, Set<string>>}
 */
const prohibitionRuleMap = new Map(
  /** @satisfies {Array<[Category, ProductStatus[]]>} */ ([
    ['workaround', [...productStatus.notAffected, ...productStatus.fixed]],
    ['mitigation', [...productStatus.notAffected, ...productStatus.fixed]],
    ['vendor_fix', [...productStatus.notAffected, ...productStatus.fixed]],
    ['optional_patch', [...productStatus.affected]],
    ['none_available', [...productStatus.notAffected, ...productStatus.fixed]],
    ['fix_planned', [...productStatus.fixed]],
    ['no_fix_planned', [...productStatus.fixed]],
  ]).map((e) => [e[0], new Set(e[1])])
)

const remediationSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    group_ids: {
      elements: {
        type: 'string',
      },
    },
    product_ids: {
      elements: {
        type: 'string',
      },
    },
    category: { type: 'string' },
  },
})

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        product_groups: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              group_id: { type: 'string' },
              product_ids: {
                elements: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          remediations: {
            elements: remediationSchema,
          },
          product_status: {
            additionalProperties: true,
            optionalProperties: {
              first_affected: { elements: { type: 'string' } },
              known_affected: { elements: { type: 'string' } },
              last_affected: { elements: { type: 'string' } },
              known_not_affected: { elements: { type: 'string' } },
              first_fixed: { elements: { type: 'string' } },
              fixed: { elements: { type: 'string' } },
              under_investigation: { elements: { type: 'string' } },
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.36 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_36(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test ran and is
    finally returned by the function.
   */
  const ctx = {
    /** @type {Array<{ instancePath: string; message: string }>} */
    errors: [],
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  for (const [
    vulnerabilityIndex,
    vulnerability,
  ] of doc.vulnerabilities.entries()) {
    vulnerability.remediations?.forEach((remediation, remediationIndex) => {
      const category = remediation.category
      if (!category) return

      /**
       * This map holds the discovered product ids for the remediation and maps them to
       * the set of corresponding product status names. Later we can check this map to
       * find out if there are any contradicting remediations.
       *
       * @type {Map<string, Set<string>>}
       */
      const productToProductStatusNamesMap = new Map()

      /**
       * This function adds all product status names for the given product id to the
       * `productMap`. If the product does not yet exist in the map, it is added.
       *
       * @param {string} id
       */
      const collectProductStatusNames = (id) => {
        const productStatusNames =
          /*
            To speed things up we first check if the product status names where already
            collected and do not search again. The product names are always for a
            product in the same vulnerability.
           */
          productToProductStatusNamesMap.get(id) ??
          new Set(
            /** @type {string[]} */ (
              Object.entries(vulnerability.product_status ?? {})
                .filter((e) =>
                  Array.isArray(e[1]) ? e[1].includes(id) : false
                )
                .map((e) => e[0])
            )
          )
        productToProductStatusNamesMap.set(id, productStatusNames)
      }

      remediation.product_ids?.forEach(collectProductStatusNames)

      remediation.group_ids?.forEach((id) => {
        const group = doc.product_tree?.product_groups?.find(
          (g) => g.group_id === id
        )
        if (!group) return
        group.product_ids?.forEach(collectProductStatusNames)
      })

      for (const [
        productId,
        productStatusNames,
      ] of productToProductStatusNamesMap) {
        for (const productStatus of productStatusNames) {
          if (prohibitionRuleMap.get(category)?.has(productStatus)) {
            ctx.errors.push({
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/remediations/${remediationIndex}`,
              message: `contradicting combination of product status ${productStatus} and remediation category ${category} for product id "${productId}"`,
            })
            ctx.isValid = false
          }
        }
      }
    })
  }

  return ctx
}
