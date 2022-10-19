import React from 'react'
import VersionSummaryDialog from '../../../../lib/app/SecvisogramPage/View/VersionSummaryDialog.js'

export const title = 'SecvisogramPage-VersionSummaryDialog'

const props = {
  prefilledData: {
    summary: 'a revision summary',
    legacyVersion: 'a legacy version'
  },
  onSubmit() {},
  onClose() {},
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
