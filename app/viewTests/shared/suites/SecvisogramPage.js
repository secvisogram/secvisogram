import React from 'react'
import View from '../../../lib/SecvisogramPage/View.js'
import seed1 from '../../../seeds/documents/valid-1.json'
import seed2 from '../../../seeds/documents/valid-2.json'

export const title = 'SecvisogramPage'

const props = {
  isLoading: false,
  isSaving: false,
  isTabLocked: false,
  errors: [],
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
  onNewDoc: () => {
    console.log('onNewDoc')
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
        500
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
}

export const tests = [
  {
    title: 'Is loading',
    render: () => <View {...props} data={null} isLoading={true} />,
  },
  {
    title: 'Is saving',
    render: () => <View {...props} isSaving={true} />,
  },
  {
    title: 'With alert',
    render: () => (
      <View
        {...props}
        alert={{
          label: 'Sure?',
          description: 'Are you sure you wanna do this?',
          confirmLabel: 'Yep',
          cancelLabel: 'Nope',
          onConfirm: console.log.bind(console, 'onConfirm'),
          onCancel: console.log.bind(console, 'onCancel'),
        }}
      />
    ),
  },
  {
    title: 'With valid document',
    render: () => <View {...props} data={{ ...props.data }} errors={[]} />,
  },
  {
    title: 'With invalid document',
    render: () => (
      <View
        {...props}
        data={{
          ...props.data,
        }}
        errors={[
          { instancePath: '/document', message: '' },
          { instancePath: '/document/acknowledgments', message: '' },
          { instancePath: '/document/acknowledgments/0', message: '' },
          { instancePath: '/document/acknowledgments/0/names', message: '' },
          {
            instancePath: '/document/acknowledgments/0/organizations',
            message: '',
          },
          {
            instancePath: '/document/acknowledgments/0/urls',
            message: '',
          },
          {
            instancePath: '/document/publisher',
            message: '',
          },
          {
            instancePath: '/document/tracking',
            message: '',
          },
          {
            instancePath: '/document/tracking/revision_history',
            message: '',
          },
          {
            instancePath: '/document/tracking/revision_history/0',
            message: '',
          },
        ]}
      />
    ),
  },
  {
    title: 'Editor',
    render: () => <View {...props} />,
  },
  {
    title: 'Editor with invalid object',
    render: () => (
      <View
        {...props}
        data={{
          ...props.data,
          doc: { ...props.data.doc, document: /** @type {any} */ ([]) },
        }}
        errors={[{ instancePath: '/document', message: 'should be object' }]}
      />
    ),
  },
  {
    title: 'Editor with invalid array',
    render: () => (
      <View
        {...props}
        data={{
          ...props.data,
          doc: {
            ...props.data.doc,
            document: {
              ...props.data.doc.document,
              acknowledgments: /** @type {any} */ ({}),
            },
          },
        }}
        errors={[
          {
            instancePath: '/document/acknowledgments',
            message: 'should be array',
          },
        ]}
      />
    ),
  },
  {
    title: 'Editor with object array with null value',
    render: () => (
      <View
        {...props}
        data={{
          ...props.data,
          doc: {
            ...props.data.doc,
            document: {
              ...props.data.doc.document,
              acknowledgments: /** @type {any} */ ([null]),
            },
          },
        }}
      />
    ),
  },
  {
    title: 'Editor with an invalid current_release_date value',
    render: () => (
      <View
        {...props}
        data={{
          ...props.data,
          doc: {
            ...props.data.doc,
            document: {
              ...props.data.doc.document,
              tracking: {
                ...props.data.doc.document.tracking,
                current_release_date: '2020-01-01T',
              },
            },
          },
        }}
      />
    ),
  },
  {
    title: 'Editor (seed-1)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed1) }}
      />
    ),
  },
  {
    title: 'Editor (seed-2)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed2) }}
      />
    ),
  },
  {
    title: 'Source',
    render: () => <View {...props} activeTab="SOURCE" />,
  },
  {
    title: 'Source (locked)',
    render: () => <View {...props} activeTab="SOURCE" isTabLocked={true} />,
  },
  {
    title: 'CSAF-JSON',
    render: () => <View {...props} activeTab="CSAF-JSON" />,
  },
  {
    title: 'CSAF-JSON without deletions',
    render: () => (
      <View
        {...props}
        activeTab="CSAF-JSON"
        onStrip={async () => {
          return { document: seed1, strippedPaths: [] }
        }}
      />
    ),
  },
]
