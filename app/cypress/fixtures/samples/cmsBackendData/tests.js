export const advisoryIdV1 = '9690e3a3-614f-44be-8709-3aa8d58b6cb5'
export const latestRevisionHistorySummary = 'the latest revision history item'
export const latestRevisionHistoryLegacyVersion = '1.0.0-abc'

const revisionHistoryV1 = [
  {
    number: '1.0.1',
    date: '2022-08-08T12:34:56.789Z',
    summary: latestRevisionHistorySummary,
    legacy_version: latestRevisionHistoryLegacyVersion,
  },
  {
    number: '1.0.0',
    date: '2022-07-28T14:25:36.475Z',
    summary: 'not the latest revision history item without legacy version',
  },
]

const revisionHistoryDraft = [
  {
    number: '0.0.3',
    date: '2022-08-08T12:34:56.789Z',
    summary: 'final draft',
    legacy_version: '0',
  },
  {
    number: '0.0.2',
    date: '2022-07-28T14:25:36.475Z',
    summary: 'update to draft',
  },
  {
    number: '0.0.1',
    date: '2022-07-27T08:09:10.123Z',
    summary: 'initial draft',
  },
]

const testsSample = {
  advisories: [
    {
      advisoryId: advisoryIdV1,
      workflowState: 'Approved',
      documentTrackingId: 'RHBA-2019_0024',
      title: 'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
      owner: 'Mustermann',
      changeable: true,
      deletable: false,
      isValid: true,
      allowedStateChanges: /** @type {const} */ ([
        'Review',
        'Approved',
        'Published',
        'Draft',
        'RfPublication',
      ]),
      revision: '1-1e6381e13c091b5b0b8b523ce3d412ba',
      csaf: {
        document: {
          title: 'my first document',
          tracking: { revision_history: revisionHistoryV1, version: '1.0.1' },
        },
      },
    },
    {
      advisoryId: 'aa7a0cf7-893a-4009-aa2f-27e3fdd9a6b0',
      workflowState: 'Published',
      documentTrackingId: 'RHBA-2019_0025',
      title: 'Cisco IPv4 Crafted Packet Denial of Service Vulnerability',
      owner: 'Mustermann',
      changeable: true,
      deletable: false,
      allowedStateChanges: /** @type {const} */ ([]),
      revision: '1-1e6381e13c091b5b0b8b523ce3d412ba',
      csaf: {
        document: {
          title: 'my first document',
          tracking: {
            revision_history: revisionHistoryDraft,
            version: '0.0.3',
          },
        },
      },
    },
    {
      advisoryId: 'ab73d218-6b84-42e8-8ccf-804eac5a13e0',
      workflowState: 'Approved',
      documentTrackingId: 'RHBA-2019_0024',
      title: 'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
      owner: 'Mustermann',
      changeable: true,
      deletable: false,
      isValid: false,
      allowedStateChanges: /** @type {const} */ (['Published']),
      revision: '1-1e6381e13c091b5b0b8b523ce3d412ba',
      csaf: { document: { title: 'my first document' } },
    },
  ],
}

export default testsSample
