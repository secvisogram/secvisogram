import minimalDoc from './shared/minimalDoc.js'

export default {
  ...minimalDoc,
  document: {
    ...minimalDoc.document,
    category: 'csaf_security_advisory',
  },
  product_tree: {
    full_product_names: [
      {
        name: 'Some sample product',
        product_id: 'CSAFPID-0001',
        product_identification_helper: {
          purl: 'pkg:maven/org.apache.commons/commons-lang3@3.12.0',
        },
      },
    ],
  },
  vulnerabilities: [
    {
      notes: [
        {
          category: 'description',
          text: 'This is a sample note',
        },
      ],
      product_status: {
        fixed: ['CSAFPID-0001'],
      },
    },
  ],
}
