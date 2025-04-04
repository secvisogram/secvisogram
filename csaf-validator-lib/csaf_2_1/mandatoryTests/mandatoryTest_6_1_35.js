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
 * This map holds prohibited category combinations.
 * See https://github.com/oasis-tcs/csaf/blob/master/csaf_2.1/prose/share/csaf-v2.1-draft.md#324131-vulnerabilities-property---remediations---category-
 *
 * @type {Map<string, Set<string>>}
 */
const prohibitionRuleMap = new Map(
  /** @satisfies {Array<[Category, Category[]]>} */ ([
    ['workaround', ['optional_patch', 'none_available']],
    ['mitigation', ['optional_patch', 'none_available']],
    [
      'vendor_fix',
      ['optional_patch', 'none_available', 'fix_planned', 'no_fix_planned'],
    ],
    [
      'optional_patch',
      [
        'workaround',
        'mitigation',
        'vendor_fix',
        'none_available',
        'fix_planned',
        'no_fix_planned',
      ],
    ],
    [
      'none_available',
      [
        'workaround',
        'mitigation',
        'vendor_fix',
        'optional_patch',
        'fix_planned',
        'no_fix_planned',
      ],
    ],
    [
      'fix_planned',
      ['vendor_fix', 'optional_patch', 'none_available', 'no_fix_planned'],
    ],
    [
      'no_fix_planned',
      ['vendor_fix', 'optional_patch', 'none_available', 'fix_planned'],
    ],
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
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_35(doc) {
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

  for (const [vulnerabilityIndex, vulnerability] of Object.entries(
    doc.vulnerabilities
  )) {
    /**
     * This map holds all discovered product ids and maps them to the set of corresponding
     * remediation categories. Later we can check this map to find out if there are any
     * contradicting remediations.
     *
     * @type {Map<string, Set<string>>}
     */
    const productToCategoriesMap = new Map()

    vulnerability.remediations?.forEach((remediation, remediationIndex) => {
      const category = remediation.category
      if (!category) return

      /**
       * This function adds the current category to the given product id in the
       * `productMap`. If the product does not yet exist in the map, it is added.
       *
       * @param {string} id
       */
      const collectCategory = (id) => {
        productToCategoriesMap.set(
          id,
          new Set(productToCategoriesMap.get(id)).add(category)
        )
      }

      remediation.product_ids?.forEach(collectCategory)

      remediation.group_ids?.forEach((id) => {
        const group = doc.product_tree?.product_groups?.find(
          (g) => g.group_id === id
        )
        if (!group) return
        group.product_ids?.forEach(collectCategory)
      })

      for (const [productId, categories] of productToCategoriesMap) {
        /**
         * This set will hold all already checked categories to avoid double checks
         * and doubled error messages.
         */
        const checkedCategories = new Set()

        for (const categoryA of categories) {
          checkedCategories.add(categoryA)

          for (const categoryB of categories) {
            if (checkedCategories.has(categoryB)) continue

            if (prohibitionRuleMap.get(categoryA)?.has(categoryB)) {
              ctx.errors.push({
                instancePath: `/vulnerabilities/${vulnerabilityIndex}/remediations/${remediationIndex}`,
                message: `contradicting remediation categories for product id "${productId}": ${categoryA}, ${categoryB}`,
              })
              ctx.isValid = false
            }
          }
        }
      }
    })
  }

  return ctx
}
