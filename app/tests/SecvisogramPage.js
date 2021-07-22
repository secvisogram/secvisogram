import { expect } from 'chai'
import CVSSVector from '../lib/SecvisogramPage/View/FormEditorTab/Vulnerabilities/Scores/CVSS3Editor/CVSSVector'
import ViewReducer from '../lib/SecvisogramPage/View/Reducer'

suite('SecvisogramPage', () => {
  suite('View', () => {
    suite('Reducer', () => {
      const generatorEngineData = {
        name: 'Secvisogram',
        version: 'some-version',
      }

      test('The document can be updated', () => {
        let { state } = Fixture()
        const timestamp = new Date('2020-01-01')

        state = ViewReducer(state, {
          type: 'CHANGE_FORM_DOC',
          update: { foo: { $set: 42 } },
          timestamp,
          generatorEngineData,
        })

        expect(state.formValues.doc.foo).to.equal(42)
        expect(state.formValues.doc.document.tracking.generator.date).to.equal(
          timestamp.toISOString()
        )
      })

      test('The document can be reset', () => {
        let { state } = Fixture()
        const doc = {}

        state = ViewReducer(state, {
          type: 'RESET_FORM_DOC',
          doc,
        })

        expect(state.formValues.doc).to.equal(doc)
      })

      test('The document can be updated using a data-path', () => {
        let { state } = Fixture()
        state.formValues.doc = { foobar: {} }
        const timestamp = new Date('2020-01-01')

        state = ViewReducer(state, {
          type: 'CHANGE_FORM_DOC',
          dataPath: '/foobar/test',
          timestamp,
          update: { $set: 42 },
          generatorEngineData,
        })

        expect(state.formValues.doc.foobar.test).to.equal(42)
        expect(state.formValues.doc.document.tracking.generator.date).to.equal(
          timestamp.toISOString()
        )
        expect(
          state.formValues.doc.document.tracking.generator.engine.name
        ).to.equal(generatorEngineData.name)
        expect(
          state.formValues.doc.document.tracking.generator.engine.version
        ).to.equal(generatorEngineData.version)
      })

      test('The form can be reset', () => {
        let { state } = Fixture()
        const values = /** @type {ReturnType<typeof ViewReducer>['formValues']} */ ({
          doc: { test: 'it' },
        })

        state = ViewReducer(state, {
          type: 'RESET_FORM',
          values,
        })

        expect(state.formValues).to.equal(values)
      })

      function Fixture() {
        return {
          state: {
            formValues: {
              doc: /** @type {any} */ ({}),
            },
          },
        }
      }
    })

    suite('CVSSMetrics', () => {
      test('3.1 metrics can be calculated', () => {
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

      test('3.0 metrics can be calculated', () => {
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

      test('Metrics can be updated from a 3.1 vector-string', () => {
        const vector = new CVSSVector({
          availabilityImpact: 'NONE',
        }).updateFromVectorString(
          'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )

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

      test('Metrics can be updated from a 3.0 vector-string', () => {
        const vector = new CVSSVector({
          availabilityImpact: 'NONE',
        }).updateFromVectorString(
          'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )

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

      test('Updating from an invalid vector-string clears all fields', () => {
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

      test('CVSS3.0 metrics can be calculated', () => {
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

      test('A 3.0 valid vector-string can be upgraded', () => {
        const vector = new CVSSVector({
          vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N',
        }).updateFromVectorString(
          'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )

        expect(vector.canBeUpgraded).to.be.true
        const upgradedVector = vector.updateVectorStringTo31()
        expect(upgradedVector.data.vectorString).to.equal(
          'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )
        expect(upgradedVector.data.version).to.equal('3.1')
      })

      test('An invalid vector-string can not be upgraded', () => {
        const vector = new CVSSVector({})

        expect(vector.canBeUpgraded).to.be.false
      })

      test('A 3.1 valid vector-string can not be upgraded', () => {
        const vector = new CVSSVector({})
          .updateFromVectorString(
            'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
          )
          .updateVectorStringTo31()

        expect(vector.canBeUpgraded).to.be.false
      })
    })
  })
})
