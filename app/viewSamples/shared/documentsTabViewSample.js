const defaultData = {
  advisories: [
    {
      advisoryId: '9690e3a3-614f-44be-8709-3aa8d58b6cb5',
      title: 'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
      owner: 'Mustermann',
      workflowState: 'Approved',
      deletable: true,
      allowedStateChanges: ['Review', 'Draft'],
      canCreateVersion: false,
    },
  ],
}

const props = {
  defaultData: defaultData,
  onGetData: async () => defaultData,
  async onDeleteAdvisory() {},
  onChangeWorkflowState: async () => (new Promise(() => {})),
  async onCreateNewVersion() {},
}

export default {
  basic: {
    props: {
      ...props,
    },
  },
  withoutData: {
    props: {
      ...props,
      defaultData: null,
    },
  },
}
