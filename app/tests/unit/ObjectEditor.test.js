import { describe, expect, it } from 'vitest'
import { getObjectMenuPaths } from '../../lib/app/SecvisogramPage/View/FormEditor/editors/GenericEditor/ObjectEditor.js'
import { uiSchemas } from '../../lib/uiSchemas.js'

describe('ObjectEditor.js', function () {
  describe('getMenuPaths()', function () {
    it('can calculate the menu structure for the top level sidebar', function () {
      expect(
        getObjectMenuPaths(
          /** @type {import('../../lib/app/SecvisogramPage/shared/types.js').Property} */ (
            uiSchemas['v2.0'].content
          ),
        ),
      ).toEqual([
        { instancePath: ['document'] },
        { instancePath: ['document', 'acknowledgments'] },
        { instancePath: ['document', 'aggregate_severity'] },
        { instancePath: ['document', 'distribution'] },
        { instancePath: ['document', 'notes'] },
        { instancePath: ['document', 'publisher'] },
        { instancePath: ['document', 'references'] },
        { instancePath: ['document', 'tracking'] },
        { instancePath: ['product_tree'] },
        { instancePath: ['product_tree', 'branches'] },
        { instancePath: ['product_tree', 'full_product_names'] },
        { instancePath: ['product_tree', 'product_groups'] },
        { instancePath: ['product_tree', 'relationships'] },
        { instancePath: ['vulnerabilities'] },
      ])
    })
  })
})
