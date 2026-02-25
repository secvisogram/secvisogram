import React from 'react'
import DocumentsTabView from '../lib/app/SecvisogramPage/DocumentsTab/View.js'
import seed1 from '../seeds/documents/valid-1.json'
import documentsTabViewSample from './shared/documentsTabViewSample.js'

/** @typedef {React.ComponentProps<typeof import('../lib/app/SecvisogramPage/View.js').default>} Props */

const props = {
  isLoading: false,
  isTabLocked: false,
  errors: [],
  alert: null,
  stripResult: null,
  previewResult: null,
  strict: true,
  data: {
    documentIsValid: null,
    doc: {
      document: {
        csaf_version: '',
        title: '',
        publisher: {
          type: '',
        },
        type: '',
        tracking: {
          current_release_date: '',
          id: '',
          initial_release_date: '',
          revision_history: [
            {
              number: '',
              date: '',
              summary: '',
            },
          ],
          status: '',
          version: '',
        },
        acknowledgments: [
          {
            names: [],
            organizations: [],
            summary: '',
            urls: [],
          },
        ],
        aggregate_severity: {
          namespace: '',
          text: '',
        },
        notes: [],
      },
      product_tree: {},
      vulnerabilities: [
        {
          notes: [
            {
              type: '',
              text: '',
            },
          ],
          scores: [{ cvss_v3: { vectorString: '', baseScore: 0 } }],
        },
      ],
    },
  },
  activeTab: /** @type {'EDITOR'} */ ('EDITOR'),
  generatorEngineData: { name: 'Secvisogram', version: 'unidentified version' },
  DocumentsTab: /** @type {Props['DocumentsTab']} */ (
    (props) => (
      <DocumentsTabView {...documentsTabViewSample.basic.props} {...props} />
    )
  ),
  async onUpdateAdvisory() {},
  onLoadAdvisory: async () => ({
    advisoryId: '123',
    revision: '1-123',
    changeable: true,
    csaf: {
      document: {
        title: 'asd asd',
      },
    },
    documentTrackingId: 'document-tracking-id',
  }),
  onSetStrict: console.log.bind(console, 'onSetStrict'),
  onNew: console.log.bind(console, 'onNew'),
  onDownload: console.log.bind(console, 'onDownload'),
  onOpen: () => {
    console.log('onOpen')
    return new Promise(() => {})
  },
  onSave: console.log.bind(console, 'onSave'),
  onChangeTab: console.log.bind(console, 'onChangeTab'),
  onValidate: console.log.bind(console, 'onValidate'),
  onNewDocMin: () => {
    console.log('onNewDocMin')
    return new Promise(() => {})
  },
  onNewDocMax: () => {
    console.log('onNewDocMax')
    return new Promise(() => {})
  },
  onStrip: (/** @type {any[]} */ ...args) => {
    console.log('onStrip', ...args)
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            document: seed1,
            strippedPaths: [
              {
                message: 'value is empty',
                instancePath: '/my/data/path',
                error: false,
              },
              {
                message: 'value is invalid',
                instancePath: '/my/data/path',
                error: true,
              },
            ],
          }),
        500,
      )
    })
  },
  onPreview: () => {
    console.log('onPreview')
    return new Promise(() => {})
  },
  onExportCSAF: console.log.bind(console, 'onExportCSAF'),
  onExportHTML: console.log.bind(console, 'onExportHTML'),
  onLockTab: console.log.bind(console, 'onLockTab'),
  onUnlockTab: console.log.bind(console, 'onUnlockTab'),
  onCollectProductIds: () => {
    console.log('onCollectProductIds')
    return new Promise(() => {})
  },
  onCollectGroupIds: () => {
    console.log('onCollectGroupIds')
    return new Promise(() => {})
  },
  onServiceValidate: async () => ({ tests: [], isValid: true }),
  onPrepareDocumentForTemplate: async () => ({ document: {} }),
  onGetDocMin: async () => ({}),
  onGetDocMax: async () => ({}),
  onCreateAdvisory: async () => ({ id: 'my-id', revision: '1-123' }),
  onGetTemplates: async () => [],
  onGetTemplateContent: async () => ({}),
  onGetBackendInfo: async () => ({ version: 'testBackendVersion' }),
}

export const basic = { props }

export const documentsTab = {
  props: { ...props, activeTab: /** @type {const} */ ('DOCUMENTS') },
}
