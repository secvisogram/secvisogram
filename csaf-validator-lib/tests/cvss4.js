import {
  calculateCvss4_0_Score,
  Cvss4JsonWrapper,
} from '../lib/shared/cvss4.js'
import { expect } from 'chai'
import assert from 'node:assert'

describe('CVSS4Attribute', () => {
  describe('CVSSMetrics', () => {
    it('4.0 empty metric', () => {
      const wrapper = new Cvss4JsonWrapper({})

      const data = wrapper.data
      expect(data.baseScore).to.equal(0)
      expect(data.baseSeverity).to.equal('NONE')
      expect(data.environmentalScore).to.equal(0)
      expect(data.environmentalSeverity).to.equal('NONE')
      expect(data.threatScore).to.equal(0)
      expect(data.threatSeverity).to.equal('NONE')
    })

    it('4.0 metrics can be calculated', () => {
      const wrapper = new Cvss4JsonWrapper({
        attackVector: 'PHYSICAL',
        attackComplexity: 'HIGH',
        privilegesRequired: 'HIGH',
        userInteraction: 'ACTIVE',
        scope: 'UNCHANGED',
        vulnConfidentialityImpact: 'HIGH',
      })

      const data = wrapper.data
      expect(data.baseScore).to.equal(4.1)
      expect(data.baseSeverity).to.equal('MEDIUM')
      expect(data.environmentalScore).to.equal(4.1)
      expect(data.environmentalSeverity).to.equal('MEDIUM')
      expect(data.threatScore).to.equal(4.1)
      expect(data.threatSeverity).to.equal('MEDIUM')
    })

    it('4.0 set metrics by fields', () => {
      const wrapper = new Cvss4JsonWrapper({})
        .set('attackVector', 'PHYSICAL')
        .set('attackComplexity', 'HIGH')
        .set('privilegesRequired', 'HIGH')
        .set('userInteraction', 'ACTIVE')
        .set('scope', 'UNCHANGED')
        .set('vulnConfidentialityImpact', 'HIGH')

      const data = wrapper.data
      expect(data.baseScore).to.equal(4.1)
      expect(data.baseSeverity).to.equal('MEDIUM')
      expect(data.environmentalScore).to.equal(4.1)
      expect(data.environmentalSeverity).to.equal('MEDIUM')
      expect(data.threatScore).to.equal(4.1)
      expect(data.threatSeverity).to.equal('MEDIUM')
    })

    it('Metrics can be updated from a partly 4.0 vector-string', () => {
      const vector = new Cvss4JsonWrapper({
        vulnAvailabilityImpact: 'NONE',
      })
      vector.updateFromVectorString(
        'CVSS:4.0/AV:P/AC:L/AT:N/PR:H/UI:A/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N/CR:L'
      )

      expect(vector.data).to.contain({
        version: '4.0',
        attackVector: 'PHYSICAL',
        attackComplexity: 'LOW',
        attackRequirements: 'NONE',
        privilegesRequired: 'HIGH',
        userInteraction: 'ACTIVE',
        vulnConfidentialityImpact: 'NONE',
        vulnIntegrityImpact: 'NONE',
        vulnAvailabilityImpact: 'NONE',
        subConfidentialityImpact: 'NONE',
        subIntegrityImpact: 'NONE',
        subAvailabilityImpact: 'NONE',

        Safety: 'NOT_DEFINED',
        Automatable: 'NOT_DEFINED',
        Recovery: 'NOT_DEFINED',
        valueDensity: 'NOT_DEFINED',
        vulnerabilityResponseEffort: 'NOT_DEFINED',
        providerUrgency: 'NOT_DEFINED',

        modifiedAttackVector: 'NOT_DEFINED',
        modifiedAttackComplexity: 'NOT_DEFINED',
        modifiedAttackRequirements: 'NOT_DEFINED',
        modifiedPrivilegesRequired: 'NOT_DEFINED',
        modifiedUserInteraction: 'NOT_DEFINED',

        modifiedVulnConfidentialityImpact: 'NOT_DEFINED',
        modifiedVulnIntegrityImpact: 'NOT_DEFINED',
        modifiedVulnAvailabilityImpact: 'NOT_DEFINED',

        modifiedSubConfidentialityImpact: 'NOT_DEFINED',
        modifiedSubIntegrityImpact: 'NOT_DEFINED',
        modifiedSubAvailabilityImpact: 'NOT_DEFINED',

        confidentialityRequirement: 'LOW',
        integrityRequirement: 'NOT_DEFINED',
        availabilityRequirement: 'NOT_DEFINED',

        exploitMaturity: 'NOT_DEFINED',
      })
    })

    it('Metrics can be updated from a complete 4.0 vector-string', () => {
      const vector = new Cvss4JsonWrapper({
        vulnAvailabilityImpact: 'NONE',
      })
      vector.updateFromVectorString(
        'CVSS:4.0/AV:L/AC:H/AT:P/PR:H/UI:P/VC:L/VI:H/VA:L/SC:L/SI:H/SA:L/E:P/CR:H/IR:M/AR:L/MAV:N/MAC:L/MAT:P/MPR:L/MUI:N/MVC:H/MVI:L/MVA:N/MSC:H/MSI:L/MSA:N/AU:N/R:U/V:D/RE:M/U:Green'
      )

      expect(vector.data).to.contain({
        version: '4.0',
        attackVector: 'LOCAL',
        attackComplexity: 'HIGH',
        attackRequirements: 'PRESENT',
        privilegesRequired: 'HIGH',
        userInteraction: 'PASSIVE',

        vulnConfidentialityImpact: 'LOW',
        vulnIntegrityImpact: 'HIGH',
        vulnAvailabilityImpact: 'LOW',

        subConfidentialityImpact: 'LOW',
        subIntegrityImpact: 'HIGH',
        subAvailabilityImpact: 'LOW',

        Safety: 'NOT_DEFINED',
        Automatable: 'NO',
        Recovery: 'USER',
        valueDensity: 'DIFFUSE',
        vulnerabilityResponseEffort: 'MODERATE',
        providerUrgency: 'GREEN',

        modifiedAttackVector: 'NETWORK',
        modifiedAttackComplexity: 'LOW',
        modifiedAttackRequirements: 'PRESENT',
        modifiedPrivilegesRequired: 'LOW',
        modifiedUserInteraction: 'NONE',

        modifiedVulnConfidentialityImpact: 'HIGH',
        modifiedVulnIntegrityImpact: 'LOW',
        modifiedVulnAvailabilityImpact: 'NONE',

        modifiedSubConfidentialityImpact: 'HIGH',
        modifiedSubIntegrityImpact: 'LOW',
        modifiedSubAvailabilityImpact: 'NEGLIGIBLE',

        confidentialityRequirement: 'HIGH',
        integrityRequirement: 'MEDIUM',
        availabilityRequirement: 'LOW',

        exploitMaturity: 'PROOF_OF_CONCEPT',
      })
    })

    it('Updating from an invalid vector-string clears all fields', () => {
      const vector = new Cvss4JsonWrapper({
        vulnAvailabilityImpact: 'NONE',
        attackVector: '',
        attackComplexity: '',
        privilegesRequired: '',
        userInteraction: '',
        scope: '',
        vulnConfidentialityImpact: '',
        vulnIntegrityImpact: '',
      })
      // C is an invalid metric shortcut
      vector.updateFromVectorString('CVSS:4.0/AV:N/AC:L/PR:L/UI:N/C:H')

      expect(vector.data).to.contain({
        vectorString: 'CVSS:4.0/AV:N/AC:L/PR:L/UI:N/C:H',
        version: '4.0',
        attackVector: '',
        attackComplexity: '',
        privilegesRequired: '',
        userInteraction: '',
        scope: '',
        vulnConfidentialityImpact: '',
        vulnIntegrityImpact: '',
        vulnAvailabilityImpact: '',
      })
    })

    it('Updating from an invalid vector-string, fix vector string after set field', () => {
      const vector = new Cvss4JsonWrapper({
        vulnAvailabilityImpact: 'NONE',
        attackVector: '',
        attackComplexity: '',
        privilegesRequired: '',
        userInteraction: '',
        scope: '',
        vulnConfidentialityImpact: '',
        vulnIntegrityImpact: '',
      })

      vector.updateFromVectorString('1')

      expect(vector.data.vectorString).to.equal('1')
      vector.set('vulnConfidentialityImpact', 'HIGH')
      expect(vector.data.vectorString).to.equal(
        'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:N/VA:N/SC:N/SI:N/SA:N'
      )
    })

    it('Calculate score', () => {
      const score = calculateCvss4_0_Score(
        'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H/E:P'
      )

      assert.equal(score[0].scoreJsonName, 'baseScore')
      assert.equal(score[0].severityJsonName, 'baseSeverity')
      assert.equal(score[0].score, 10)
      assert.equal(score[1].scoreJsonName, 'threatScore')
      assert.equal(score[1].severityJsonName, 'threatSeverity')
      assert.equal(score[1].score, 9.3)
      assert.equal(score[2].scoreJsonName, 'environmentalScore')
      assert.equal(score[2].severityJsonName, 'environmentalSeverity')
      assert.equal(score[2].score, 10)
    })
  })
})
