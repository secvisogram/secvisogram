import assert from 'node:assert/strict'
import { mandatoryTest_6_1_13 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_13.js'

describe('mandatoryTest_6_1_13', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_13({ product_tree: 'mydoc' }).isValid, true)
  })

  it('skips invalid full product names', function () {
    assert.equal(
      mandatoryTest_6_1_13({
        product_tree: {
          full_product_names: [
            {
              product_identification_helper: 'invalid',
            },
          ],
        },
      }).isValid,
      true
    )
  })

  it('validates branches and skips invalid ones', function () {
    assert.equal(
      mandatoryTest_6_1_13({
        product_tree: {
          branches: [
            {
              product: {
                product_identification_helper: {
                  purls: [
                    'pkg:oci/product-A@sha256%3Add134261219b2?repository_url=https://registry.example.com',
                  ],
                },
              },
              branches: [
                {
                  product: 'invalid',
                },
                {
                  branches: [{}],
                },
              ],
            },
          ],
        },
      }).isValid,
      true
    )
  })

  it('validates relationships and skips invalid ones', function () {
    assert.equal(
      mandatoryTest_6_1_13({
        product_tree: {
          relationships: [
            {
              full_product_name: {
                purls: [
                  'pkg:oci/product-A@sha256%3Add134261219b2?repository_url=https://registry.example.com',
                ],
              },
            },
            {},
          ],
        },
      }).isValid,
      true
    )
  })
})
