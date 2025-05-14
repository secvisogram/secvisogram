/// <reference types="cypress" />

import CVSSVector from '../../lib/app/SecvisogramPage/View/FormEditor/editors/GenericEditor/Attributes/CVSS3Attribute/CVSSVector.js'

describe('CVSS3Attribute', () => {
  beforeEach(function () {
    cy.task('rm', Cypress.config('downloadsFolder'))
  })

  describe('CVSSMetrics', () => {
    it('3.1 metrics can be calculated', () => {
      const vector = new CVSSVector({
        version: '3.1',
        attackVector: 'NETWORK',
        attackComplexity: 'HIGH',
        privilegesRequired: 'LOW',
        userInteraction: 'REQUIRED',
        scope: 'UNCHANGED',
        confidentialityImpact: 'HIGH',
        integrityImpact: 'HIGH',
        availabilityImpact: 'NONE',
      })
        .set('attackComplexity', 'LOW')
        .set('exploitCodeMaturity', 'NONE')
        .remove('exploitCodeMaturity')
        .set('reportConfidence', 'NOT_DEFINED')

      const data = vector.data
      expect(data.version).to.equal('3.1')
      expect(data.vectorString).to.equal(
        'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
      )
      expect(data.baseScore).to.equal(7.3)
      expect(data.baseSeverity).to.equal('HIGH')
    })

    it('3.0 metrics can be calculated', () => {
      const vector = new CVSSVector({
        version: '3.0',
        attackVector: 'NETWORK',
        attackComplexity: 'HIGH',
        privilegesRequired: 'LOW',
        userInteraction: 'REQUIRED',
        scope: 'UNCHANGED',
        confidentialityImpact: 'HIGH',
        integrityImpact: 'HIGH',
        availabilityImpact: 'NONE',
      })
        .set('attackComplexity', 'LOW')
        .set('exploitCodeMaturity', 'NONE')
        .remove('exploitCodeMaturity')
        .set('reportConfidence', 'NOT_DEFINED')

      const data = vector.data
      expect(data.version).to.equal('3.0')
      expect(data.vectorString).to.equal(
        'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
      )
      expect(data.baseScore).to.equal(7.3)
      expect(data.baseSeverity).to.equal('HIGH')
    })

    it('Metrics can be updated from a 3.1 vector-string', () => {
      const vector = new CVSSVector({
        availabilityImpact: 'NONE',
      }).updateFromVectorString('CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N')

      expect(vector.data).to.contain({
        version: '3.1',
        attackVector: 'NETWORK',
        attackComplexity: 'LOW',
        privilegesRequired: 'LOW',
        userInteraction: 'REQUIRED',
        scope: 'UNCHANGED',
        confidentialityImpact: 'HIGH',
        integrityImpact: 'HIGH',
        availabilityImpact: 'NONE',
      })
    })

    it('Metrics can be updated from a 3.0 vector-string', () => {
      const vector = new CVSSVector({
        availabilityImpact: 'NONE',
      }).updateFromVectorString('CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N')

      expect(vector.data).to.contain({
        version: '3.0',
        attackVector: 'NETWORK',
        attackComplexity: 'LOW',
        privilegesRequired: 'LOW',
        userInteraction: 'REQUIRED',
        scope: 'UNCHANGED',
        confidentialityImpact: 'HIGH',
        integrityImpact: 'HIGH',
        availabilityImpact: 'NONE',
      })
    })

    it('Updating from an invalid vector-string clears all fields', () => {
      const vector = new CVSSVector({
        availabilityImpact: 'NONE',
        attackVector: '',
        attackComplexity: '',
        privilegesRequired: '',
        userInteraction: '',
        scope: '',
        confidentialityImpact: '',
        integrityImpact: '',
      }).updateFromVectorString('CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:x')

      expect(vector.data).to.contain({
        vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:x',
        version: '',
        attackVector: '',
        attackComplexity: '',
        privilegesRequired: '',
        userInteraction: '',
        scope: '',
        confidentialityImpact: '',
        integrityImpact: '',
        availabilityImpact: '',
      })
      expect(vector.data).to.not.contain({ exploitCodeMaturity: '' })
    })

    it('CVSS3.0 metrics can be calculated', () => {
      const vector = new CVSSVector({
        version: '3.0',
        attackVector: 'NETWORK',
        attackComplexity: 'HIGH',
        privilegesRequired: 'LOW',
        userInteraction: 'REQUIRED',
        scope: 'UNCHANGED',
        confidentialityImpact: 'HIGH',
        integrityImpact: 'HIGH',
        availabilityImpact: 'NONE',
        vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N',
      })
        .set('attackComplexity', 'LOW')
        .set('exploitCodeMaturity', 'NONE')
        .remove('exploitCodeMaturity')
        .set('reportConfidence', 'NOT_DEFINED')

      const data = vector.data
      expect(data.vectorString).to.equal(
        'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
      )
      expect(data.baseScore).to.equal(7.3)
      expect(data.baseSeverity).to.equal('HIGH')
      expect(data.version).to.equal('3.0')
    })

    it('A 3.0 valid vector-string can be upgraded', () => {
      const vector = new CVSSVector({
        vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N',
      }).updateFromVectorString('CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N')

      expect(vector.canBeUpgraded).to.be.true
      const upgradedVector = vector.updateVectorStringTo31()
      expect(upgradedVector.data.vectorString).to.equal(
        'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
      )
      expect(upgradedVector.data.version).to.equal('3.1')
    })

    it('An invalid vector-string can not be upgraded', () => {
      const vector = new CVSSVector({})

      expect(vector.canBeUpgraded).to.be.false
    })

    it('A 3.1 valid vector-string can not be upgraded', () => {
      const vector = new CVSSVector({})
        .updateFromVectorString('CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N')
        .updateVectorStringTo31()

      expect(vector.canBeUpgraded).to.be.false
    })
  })
})
