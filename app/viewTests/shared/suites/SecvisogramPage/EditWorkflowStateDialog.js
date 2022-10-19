import React from 'react'
import EditWorkflowStateDialog from '../../../../lib/app/SecvisogramPage/DocumentsTab/View/EditWorkflowStateDialog.js'

export const title = 'SecvisogramPage-EditWorkflowStateDialog'

const props = {
  onSubmit() {},
  data: {
    advisoryId: 'my-advisory',
    allowedStateChanges: ['Draft', 'RfPublication'],
  },
  onClose() {},
}

export const tests = [
  {
    title: 'simple',
    render: () => <Wrapper {...props} />,
  },
]

/**
 * @param {React.ComponentProps<typeof EditWorkflowStateDialog>} props
 */
function Wrapper(props) {
  /** @type {React.MutableRefObject<any>} */
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current?.showModal()
  }, [])

  return <EditWorkflowStateDialog {...props} ref={ref} />
}
