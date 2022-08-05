import React from 'react'
import VersionSummaryDialog from '../../../../lib/app/SecvisogramPage/View/VersionSummaryDialog.js'

export const title = 'SecvisogramPage-VersionSummaryDialog'

const props = {
  onSubmit() {},
  latestRevision: {
    summary: 'a revision summary',
    legacy_version: 'a legacy version'
  },
  data: {
    advisoryId: 'my-advisory',
    allowedStateChanges: ['Draft', 'Published'],
  },
}

export const tests = [
  {
    title: 'simple',
    render: () => <Wrapper {...props} />,
  },
]

/**
 * @param {React.ComponentProps<typeof VersionSummaryDialog>} props
 */
function Wrapper(props) {
  /** @type {React.MutableRefObject<any>} */
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current?.showModal()
  }, [])

  return <VersionSummaryDialog {...props} ref={ref} />
}
