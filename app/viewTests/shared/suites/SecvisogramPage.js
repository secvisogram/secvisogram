import React from 'react'
import DocumentsTabView from '../../../lib/app/SecvisogramPage/DocumentsTab/View.js'
import View from '../../../lib/app/SecvisogramPage/View.js'
import AppConfigContext from '../../../lib/app/shared/context/AppConfigContext.js'
import UserInfoContext from '../../../lib/app/shared/context/UserInfoContext.js'
import seed1 from '../../../seeds/documents/valid-1.json'
import seed2 from '../../../seeds/documents/valid-2.json'
import {
  documentsTabViewSample,
  secvisogramPageViewSample,
} from '../../../viewSamples.js'

export const title = 'SecvisogramPage'

const props = secvisogramPageViewSample.basic.props

export const tests = [
  {
    title: 'Is loading',
    render: () => <View {...props} data={null} isLoading={true} />,
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
    title: 'With loaded advisory',
    render: () => (
      <View
        {...props}
        data={null}
        defaultAdvisoryState={{
          type: 'ADVISORY',
          advisory: {
            csaf: {},
            changeable: true,
            advisoryId: 'my-advisory',
            revision: 'my-revision',
            documentTrackingId: 'My_document',
          },
        }}
      />
    ),
  },
  {
    title: 'Empty document tracking id',
    render: () => (
      <View
        {...props}
        data={null}
        defaultAdvisoryState={{
          type: 'ADVISORY',
          advisory: {
            csaf: {},
            changeable: true,
            advisoryId: 'my-advisory',
            revision: 'my-revision',
            documentTrackingId: '',
          },
        }}
      />
    ),
  },
  {
    title: 'Editor',
    render: () => <View {...props} />,
  },
  {
    title: 'Editor logged in',
    render: () => (
      <AppConfigContext.Provider
        value={{
          loginAvailable: true,
          loginUrl: '',
          logoutUrl: '',
          userInfoUrl: '',
          validatorUrl: '',
        }}
      >
        <UserInfoContext.Provider
          value={{
            email: 'foo@bar.de',
            groups: ['editor', 'author'],
            preferredUsername: 'foo-bar',
            user: 'foo-bar',
          }}
        >
          <View
            {...props}
            data={null}
            defaultAdvisoryState={{
              advisory: {
                advisoryId: '123',
                changeable: true,
                csaf: {},
                documentTrackingId: 'my-doc',
                revision: '1-1',
              },
              type: 'ADVISORY',
            }}
          />
        </UserInfoContext.Provider>
      </AppConfigContext.Provider>
    ),
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
    title: 'PREVIEW',
    render: () => <View {...props} activeTab="PREVIEW" />,
  },
  {
    title: 'PREVIEW (seed-1)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed1) }}
        activeTab="PREVIEW"
      />
    ),
  },
  {
    title: 'PREVIEW (seed-2)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed2) }}
        activeTab="PREVIEW"
      />
    ),
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
  {
    title: 'DOCUMENTS tab',
    render: () => <View {...secvisogramPageViewSample.documentsTab.props} />,
  },
  {
    title: 'DOCUMENTS tab (loading)',
    render: () => (
      <View
        {...secvisogramPageViewSample.documentsTab.props}
        DocumentsTab={(props) => (
          <DocumentsTabView
            {...documentsTabViewSample.withoutData.props}
            {...props}
            onGetData={() => new Promise(() => {})}
          />
        )}
      />
    ),
  },
]
