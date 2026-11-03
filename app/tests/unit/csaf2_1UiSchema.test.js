import { describe, expect, it } from 'vitest'
import { content, jsonSchema } from '../../lib/uiSchemas/csaf_2_1.js'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { newDocMax } from '../../lib/core/v2_1.js'
import metaSchema from '../../lib/uiSchemas/csaf_2_1/jsonSchema/csaf_meta.js'
import extensionContent from '../../lib/uiSchemas/csaf_2_1/jsonSchema/extension-content.js'
import extensionMetaSchema from '../../lib/uiSchemas/csaf_2_1/jsonSchema/extension-metaschema.js'
import cvssV2 from '../../lib/uiSchemas/cvss-v2.0.js'
import cvssV3 from '../../lib/uiSchemas/cvss-v3.0.js'
import cvssV31 from '../../lib/uiSchemas/cvss-v3.1.js'
import cvssV4 from '../../scripts/importUiMetaData/csaf_2_1/cvss-v4.0.json' with { type: 'json' }
import ssvcV2 from '../../lib/uiSchemas/csaf_2_1/jsonSchema/SelectionList_2_0_0.schema.js'
import translations from '../../locales/en/translation.json' with { type: 'json' }
import validDoc from '../fixtures/csaf2_1-csd04-valid.json' with { type: 'json' }

/**
 * @param {ReadonlyArray<import('../../lib/app/SecvisogramPage/shared/types.js').Property>} properties
 * @param {string[]} path
 * @returns {import('../../lib/app/SecvisogramPage/shared/types.js').Property}
 */
function findProperty(properties, path) {
  if (path.length === 0) throw new Error('Expected a non-empty property path')

  const [key, ...rest] = path
  const property = properties.find((item) => item.key === key)
  if (!property) throw new Error(`Property not found: ${path.join('.')}`)
  if (rest.length === 0) return property

  const children =
    property.metaInfo.propertyList ??
    property.metaInfo.arrayType?.metaInfo.propertyList ??
    []
  return findProperty(children, rest)
}

/**
 * @param {import('../../lib/app/SecvisogramPage/shared/types.js').Property} property
 * @returns {import('../../lib/app/SecvisogramPage/shared/types.js').Property[]}
 */
function allProperties(property) {
  return [
    property,
    ...(property.metaInfo.propertyList ?? []).flatMap(allProperties),
    ...(property.metaInfo.arrayType
      ? allProperties(property.metaInfo.arrayType)
      : []),
  ]
}

describe('CSAF 2.1 CSD04 UI schema', () => {
  it('removes obsolete properties and provides translated metadata for new fields', () => {
    const properties = content.metaInfo.propertyList ?? []
    const publisher = findProperty(properties, ['document', 'publisher'])
    const vulnerabilities = findProperty(properties, ['vulnerabilities'])
    const vulnerability = vulnerabilities.metaInfo.arrayType
    if (!vulnerability) throw new Error('Expected vulnerability array type')
    const publisherProperties = publisher.metaInfo.propertyList ?? []
    const vulnerabilityProperties = vulnerability.metaInfo.propertyList ?? []

    expect(
      publisherProperties.some(
        (property) => property.key === 'contact_details',
      ),
    ).toBe(false)
    expect(
      vulnerabilityProperties.some(
        (property) => property.key === 'involvements',
      ),
    ).toBe(false)
    expect(translations.csaf.v2_1).not.toHaveProperty(
      'DocumentPublisherContactDetailsTitle',
    )
    expect(translations.csaf.v2_1).not.toHaveProperty(
      'VulnerabilitiesItemsInvolvementsTitle',
    )

    for (const path of [
      ['document', 'involvement'],
      ['document', 'publisher', 'contact'],
      ['vulnerabilities', 'dl_vuln_id'],
      ['document', 'involvement', 'entities'],
      ['document', 'involvement', 'entity_groups'],
      ['document', 'involvement', 'actions'],
    ]) {
      const property = findProperty(properties, path)
      const i18n = property.metaData?.i18n
      expect(i18n?.title, path.join('.')).toMatch(/^v2_1\./)
      expect(i18n?.description, path.join('.')).toMatch(/^v2_1\./)
    }
  })

  it('exposes the CSD04 vulnerability report profile and schema fields', () => {
    const properties = content.metaInfo.propertyList ?? []
    const category = findProperty(properties, ['document', 'category'])
    const cvssV4 = findProperty(properties, [
      'vulnerabilities',
      'metrics',
      'content',
      'cvss_v4',
    ])

    expect(category.metaData?.options).toContain('csaf_vulnerability_report')
    expect(cvssV4.metaData?.uiType).toBe('OBJECT_CVSS_4')
    expect(jsonSchema.properties.document.properties.involvement).toBeDefined()
    expect(jsonSchema.$defs.dl_vuln_id_t).toBeDefined()
  })

  it('has a translated title for every property', () => {
    const nonRootProperties = allProperties(content).slice(1)

    for (const property of nonRootProperties) {
      expect(
        property.metaData?.i18n?.title,
        property.fullName.join('.'),
      ).toBeDefined()
      for (const key of Object.values(property.metaData?.i18n ?? {})) {
        expect(
          /** @type {Record<string, string>} */ (translations.csaf.v2_1)[
            key.replace(/^v2_1\./, '')
          ],
          key,
        ).toBeDefined()
      }
    }
  })

  it('assigns the CSD04 section 4.9 relevance levels to the vulnerability report profile', () => {
    const properties = content.metaInfo.propertyList ?? []
    const profileLevels = {
      mandatory: [
        ['product_tree'],
        ['vulnerabilities'],
        ['vulnerabilities', 'cve'],
        ['vulnerabilities', 'ids'],
        ['vulnerabilities', 'notes'],
        ['vulnerabilities', 'product_status'],
        ['vulnerabilities', 'product_status', 'known_affected'],
      ],
      best_practice: [
        ['document', 'acknowledgments'],
        ['document', 'aggregate_severity'],
        ['vulnerabilities', 'metrics'],
        ['vulnerabilities', 'references'],
      ],
    }
    for (const [level, paths] of Object.entries(profileLevels)) {
      for (const path of paths) {
        expect(
          findProperty(properties, path).metaData?.relevanceLevels
            ?.csaf_vulnerability_report,
          path.join('.'),
        ).toBe(level)
      }
    }
  })

  it('builds a maximal CSD04 template with blank values', async () => {
    const doc = await newDocMax()
    expect(doc.document.category).toBe('')
    expect(doc.document.involvement.entities[0].entity_id).toBe('')
    expect(doc.document.publisher.contact).toBeDefined()
    expect(doc.vulnerabilities[0].dl_vuln_id).toBe('')
    expect(doc.document.publisher.contact_details).toBeUndefined()
    expect(doc.vulnerabilities[0].involvements).toBeUndefined()
  })

  it('validates a populated document against the CSD04 schema', () => {
    const ajv = new Ajv2020({ strict: false, validateSchema: false })
    addFormats(ajv)
    ajv.addSchema(metaSchema)
    ajv.addSchema(extensionContent)
    ajv.addSchema(extensionMetaSchema)
    ajv.addSchema(
      extensionMetaSchema.$defs.content_schema_t,
      `${extensionMetaSchema.$id}#/$defs/content_schema_t`,
    )
    ajv.addSchema(cvssV2, 'https://www.first.org/cvss/cvss-v2.0.json')
    ajv.addSchema(cvssV3, 'https://www.first.org/cvss/cvss-v3.0.json')
    ajv.addSchema(cvssV31, 'https://www.first.org/cvss/cvss-v3.1.json')
    ajv.addSchema(cvssV4, 'https://www.first.org/cvss/cvss-v4.0.json')
    ajv.addSchema(
      ssvcV2,
      'https://certcc.github.io/SSVC/data/schema/v2/SelectionList_2_0_0.schema.json',
    )
    const validate = ajv.compile(jsonSchema)
    expect(validate(validDoc), JSON.stringify(validate.errors, null, 2)).toBe(
      true,
    )
  })
})
