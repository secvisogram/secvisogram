/// <reference types="cypress" />

import { expect } from 'chai'
import * as core from '../../lib/core/v2_0.js'
import fixture from '../fixtures/coreFixture.js'
import documentTests from '../fixtures/documentTests.js'

describe('Core', () => {
  describe('documentTests', () => {
    documentTests.forEach((documentTest, i) => {
      it(documentTest.title ?? `Test #${i + 1}`, async () => {
        const result = await core.validate({
          document: documentTest.content,
        })
        expect(result.isValid).to.equal(documentTest.valid)
        if (typeof documentTest.expectedNumberOfErrors === 'number') {
          expect(
            result.errors.length,
            'Document has the correct number of errors'
          ).to.equal(documentTest.expectedNumberOfErrors)
        }
        if (documentTest.valid) {
          expect(result.errors).to.have.lengthOf(0)
        } else {
          expect(result.errors).have.length.greaterThan(0)
        }
      })
    })
  })

  describe('DocumentService', () => {
    it('The document can be validated against the JSON-schema', async () => {
      for (const document of fixture.documents) {
        const result = await core.validate({
          document: document.content,
        })
        expect(result.isValid).to.equal(document.valid)
        if (document.valid) {
          expect(result.errors).to.have.lengthOf(0)
        } else {
          expect(result.errors).have.length.greaterThan(0)
        }
      }
    })

    it('The document can be minified using the CSAF-strip algorithm', async () => {
      for (const document of fixture.documents) {
        if (document.strippedVersion === undefined) continue
        const result = await core.strip({
          document: document.content,
        })

        expect(result.document).to.deep.equal(document.strippedVersion)
      }
    })
  })
})
