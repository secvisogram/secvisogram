import Ajv from 'ajv/dist/jtd.js'
import testURL from './shared/testURL.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    document: {
      additionalProperties: true,
      optionalProperties: {
        acknowledgments: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              urls: {
                elements: { type: 'string' },
              },
            },
          },
        },
        references: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              url: { type: 'string' },
              category: { type: 'string' },
            },
          },
        },
        aggregate_severity: {
          additionalProperties: true,
          optionalProperties: {
            namespace: { type: 'string' },
          },
        },
        distribution: {
          additionalProperties: true,
          optionalProperties: {
            tlp: {
              additionalProperties: true,
              optionalProperties: {
                url: { type: 'string' },
              },
            },
          },
        },
        publisher: {
          additionalProperties: true,
          optionalProperties: {
            namespace: { type: 'string' },
          },
        },
      },
    },
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        full_product_names: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              product_identification_helper: {
                additionalProperties: true,
                optionalProperties: {
                  sbom_urls: { elements: { type: 'string' } },
                  x_generic_uris: {
                    elements: {
                      additionalProperties: true,
                      optionalProperties: {
                        namespace: { type: 'string' },
                        uri: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        branches: {
          elements: {
            additionalProperties: true,
            properties: {},
          },
        },
        relationships: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              full_product_name: {
                additionalProperties: true,
                optionalProperties: {
                  product_identification_helper: {
                    additionalProperties: true,
                    optionalProperties: {
                      sbom_urls: { elements: { type: 'string' } },
                      x_generic_uris: {
                        elements: {
                          additionalProperties: true,
                          optionalProperties: {
                            namespace: { type: 'string' },
                            uri: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          remediations: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                url: { type: 'string' },
              },
            },
          },
          acknowledgments: {
            elements: {
              optionalProperties: {
                urls: {
                  elements: { type: 'string' },
                },
              },
            },
          },
          references: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                url: { type: 'string' },
                category: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
})

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product: {
      additionalProperties: true,
      optionalProperties: {
        product_identification_helper: {
          additionalProperties: true,
          optionalProperties: {
            sbom_urls: { elements: { type: 'string' } },
            x_generic_uris: {
              elements: {
                additionalProperties: true,
                optionalProperties: {
                  namespace: { type: 'string' },
                  uri: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    branches: {
      elements: {
        additionalProperties: true,
        properties: {},
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {unknown} doc
 * @returns
 */
export default async function informativeTest_6_3_6(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  const references = doc.document?.references ?? []
  for (let i = 0; i < references.length; ++i) {
    const reference = references[i]
    if (reference.category === 'self' || typeof reference.url !== 'string') {
      continue
    }
    await testURL(reference.url, () => {
      ctx.infos.push({
        instancePath: `/document/references/${i}/url`,
        message: 'use of non-self referencing urls failing to resolve',
      })
    })
  }

  const acknowledgments = doc.document?.acknowledgments ?? []
  for (
    let acknowledgmentIndex = 0;
    acknowledgmentIndex < acknowledgments.length;
    ++acknowledgmentIndex
  ) {
    const acknowledgment = acknowledgments[acknowledgmentIndex]

    const urls = acknowledgment.urls ?? []
    for (let urlIndex = 0; urlIndex < urls.length; ++urlIndex) {
      await testURL(urls[urlIndex], () => {
        ctx.infos.push({
          instancePath: `/document/acknowledgments/${acknowledgmentIndex}/urls/${urlIndex}`,
          message: 'use of non-self referencing urls failing to resolve',
        })
      })
    }
  }

  if (typeof doc.document?.aggregate_severity?.namespace === 'string') {
    await testURL(doc.document.aggregate_severity.namespace, () => {
      ctx.infos.push({
        instancePath: `/document/aggregate_severity/namespace`,
        message: 'use of non-self referencing urls failing to resolve',
      })
    })
  }

  if (typeof doc.document?.publisher?.namespace === 'string') {
    await testURL(doc.document.publisher.namespace, () => {
      ctx.infos.push({
        instancePath: `/document/publisher/namespace`,
        message: 'use of non-self referencing urls failing to resolve',
      })
    })
  }

  if (typeof doc.document?.distribution?.tlp?.url === 'string') {
    await testURL(doc.document.distribution.tlp.url, () => {
      ctx.infos.push({
        instancePath: `/document/distribution/tlp/url`,
        message: 'use of non-self referencing urls failing to resolve',
      })
    })
  }

  /**
   * @param {object} params
   * @param {string} params.path
   * @param {unknown[]} params.branches
   */
  async function checkBranches({ path, branches }) {
    for (let branchIndex = 0; branchIndex < branches.length; ++branchIndex) {
      const branch = branches[branchIndex]
      if (validateBranch(branch)) {
        const sbomURLs =
          branch.product?.product_identification_helper?.sbom_urls ?? []
        for (const [sbomURLIndex, sbomURL] of sbomURLs.entries()) {
          await testURL(sbomURL, () => {
            ctx.infos.push({
              instancePath: `${path}/${branchIndex}/product/product_identification_helper/sbom_urls/${sbomURLIndex}`,
              message: 'use of non-self referencing urls failing to resolve',
            })
          })
        }

        const xGenericURIs =
          branch.product?.product_identification_helper?.x_generic_uris ?? []
        for (const [xGenericURIIndex, xGenericURI] of xGenericURIs.entries()) {
          if (typeof xGenericURI.namespace === 'string') {
            await testURL(xGenericURI.namespace, () => {
              ctx.infos.push({
                instancePath: `${path}/${branchIndex}/product/product_identification_helper/x_generic_uris/${xGenericURIIndex}/namespace`,
                message: 'use of non-self referencing urls failing to resolve',
              })
            })
          }
          if (typeof xGenericURI.uri === 'string') {
            await testURL(xGenericURI.uri, () => {
              ctx.infos.push({
                instancePath: `${path}/${branchIndex}/product/product_identification_helper/x_generic_uris/${xGenericURIIndex}/uri`,
                message: 'use of non-self referencing urls failing to resolve',
              })
            })
          }
        }

        if (Array.isArray(branch.branches)) {
          await checkBranches({
            path: `${path}/${branchIndex}/branches`,
            branches: branch.branches,
          })
        }
      }
    }
  }

  await checkBranches({
    path: '/product_tree/branches',
    branches: doc.product_tree?.branches ?? [],
  })

  const fullProductNames = doc.product_tree?.full_product_names ?? []
  for (const [
    fullProductNameIndex,
    fullProductName,
  ] of fullProductNames.entries()) {
    const sbomURLs =
      fullProductName.product_identification_helper?.sbom_urls ?? []
    for (let sbomURLIndex = 0; sbomURLIndex < sbomURLs.length; ++sbomURLIndex) {
      const sbomURL = sbomURLs[sbomURLIndex]
      await testURL(sbomURL, () => {
        ctx.infos.push({
          instancePath: `/product_tree/full_product_names/${fullProductNameIndex}/product_identification_helper/sbom_urls/${sbomURLIndex}`,
          message: 'use of non-self referencing urls failing to resolve',
        })
      })
    }

    const xGenericURIs =
      fullProductName.product_identification_helper?.x_generic_uris ?? []
    for (const [xGenericURIIndex, xGenericURI] of xGenericURIs.entries()) {
      if (typeof xGenericURI.namespace === 'string') {
        await testURL(xGenericURI.namespace, () => {
          ctx.infos.push({
            instancePath: `/product_tree/full_product_names/${fullProductNameIndex}/product_identification_helper/x_generic_uris/${xGenericURIIndex}/namespace`,
            message: 'use of non-self referencing urls failing to resolve',
          })
        })
      }
      if (typeof xGenericURI.uri === 'string') {
        await testURL(xGenericURI.uri, () => {
          ctx.infos.push({
            instancePath: `/product_tree/full_product_names/${fullProductNameIndex}/product_identification_helper/x_generic_uris/${xGenericURIIndex}/uri`,
            message: 'use of non-self referencing urls failing to resolve',
          })
        })
      }
    }
  }

  const relationships = doc.product_tree?.relationships ?? []
  for (const [relationshipIndex, relationship] of relationships.entries()) {
    const sbomURLs =
      relationship.full_product_name?.product_identification_helper
        ?.sbom_urls ?? []
    for (let sbomURLIndex = 0; sbomURLIndex < sbomURLs.length; ++sbomURLIndex) {
      const sbomURL = sbomURLs[sbomURLIndex]
      await testURL(sbomURL, () => {
        ctx.infos.push({
          instancePath: `/product_tree/relationships/${relationshipIndex}/full_product_name/product_identification_helper/sbom_urls/${sbomURLIndex}`,
          message: 'use of non-self referencing urls failing to resolve',
        })
      })
    }

    const xGenericURIs =
      relationship.full_product_name?.product_identification_helper
        ?.x_generic_uris ?? []
    for (const [xGenericURIIndex, xGenericURI] of xGenericURIs.entries()) {
      if (typeof xGenericURI.namespace === 'string') {
        await testURL(xGenericURI.namespace, () => {
          ctx.infos.push({
            instancePath: `/product_tree/relationship/${relationshipIndex}/full_product_name/product_identification_helper/x_generic_uris/${xGenericURIIndex}/namespace`,
            message: 'use of non-self referencing urls failing to resolve',
          })
        })
      }
      if (typeof xGenericURI.uri === 'string') {
        await testURL(xGenericURI.uri, () => {
          ctx.infos.push({
            instancePath: `/product_tree/relationship/${relationshipIndex}/full_product_name/product_identification_helper/x_generic_uris/${xGenericURIIndex}/uri`,
            message: 'use of non-self referencing urls failing to resolve',
          })
        })
      }
    }
  }

  const vulnerabilities = doc.vulnerabilities ?? []
  for (const [vulnerabilityIndex, vulnerability] of vulnerabilities.entries()) {
    const acknowledgments = vulnerability.acknowledgments ?? []
    for (
      let acknowledgmentIndex = 0;
      acknowledgmentIndex < acknowledgments.length;
      ++acknowledgmentIndex
    ) {
      const acknowledgment = acknowledgments[acknowledgmentIndex]
      const urls = acknowledgment.urls ?? []
      for (let urlIndex = 0; urlIndex < urls.length; ++urlIndex) {
        await testURL(urls[urlIndex], () => {
          ctx.infos.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/acknowledgments/${acknowledgmentIndex}/urls/${urlIndex}`,
            message: 'use of non-self referencing urls failing to resolve',
          })
        })
      }
    }

    const references = vulnerability.references ?? []
    for (const [referenceIndex, reference] of references.entries()) {
      if (reference.category === 'self') {
        continue
      }
      if (typeof reference.url === 'string') {
        await testURL(reference.url, () => {
          ctx.infos.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/references/${referenceIndex}/url`,
            message: 'use of non-self referencing urls failing to resolve',
          })
        })
      }
    }

    const remediations = vulnerability.remediations ?? []
    for (const [remediationIndex, remediation] of remediations.entries()) {
      if (typeof remediation.url === 'string') {
        await testURL(remediation.url, () => {
          ctx.infos.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/remediations/${remediationIndex}/url`,
            message: 'use of non-self referencing urls failing to resolve',
          })
        })
      }
    }
  }

  return ctx
}
