import { describe, expect, it } from 'vitest'
import {
  vectorGetVectorString,
  vectorUpdateFromVectorString,
} from '../../lib/shared/cvss2Tools.js'

describe('cvss2Tools', function () {
  describe('updateVectorFromString()', function () {
    it('updates a vector', function () {
      const vector = {
        accessVector: 'NETWORK',
        vectorString: 'AV:A',
      }

      const updatedVector = vectorUpdateFromVectorString(vector)

      expect(updatedVector.accessVector).to.equal('ADJACENT_NETWORK')
    })

    it('updates a vector', function () {
      const vector = {
        accessVector: '',
        vectorString: 'AV:A',
      }

      const updatedVector = vectorUpdateFromVectorString(vector)

      expect(updatedVector).not.to.be.equal(vector)
      expect(updatedVector.accessVector).to.equal('ADJACENT_NETWORK')
    })

    it('does not change the vector if not necessary', function () {
      const vector = {
        vectorString: 'A',
      }

      const updatedVector = vectorUpdateFromVectorString(vector)

      expect(updatedVector).to.equal(vector)
    })

    it('does not change the vector if not necessary', function () {
      const vector = {
        vectorString: 'AV:N',
        accessVector: 'NETWORK',
      }

      const updatedVector = vectorUpdateFromVectorString(vector)

      expect(updatedVector).to.equal(vector)
    })
  })

  describe('vectorGetVectorString()', function () {
    it('can generate a vector string', function () {
      const vector = {
        accessVector: 'NETWORK',
      }

      const vectorString = vectorGetVectorString(vector)

      expect(vectorString).to.equal('AV:N')
    })
  })
})
